import React, { useState, useEffect, useRef } from "react";
import { FaCog, FaTimes } from "react-icons/fa";
import "./settings.css"; // Import the new CSS file

const Settings: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const offset = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('dark_mode') === 'true';
        setIsDarkMode(storedDarkMode);
    }, []);

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : '';
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('dark_mode', (!isDarkMode).toString());
        window.location.reload(); // Refresh the page when the setting changes
    };

    const openSettings = () => {
        setIsSettingsOpen(true);
    };

    const closeSettings = () => {
        setIsSettingsOpen(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (popupRef.current) {
            offset.current = {
                x: e.clientX - popupRef.current.getBoundingClientRect().left,
                y: e.clientY - popupRef.current.getBoundingClientRect().top,
            };
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (popupRef.current) {
            popupRef.current.style.left = `${e.clientX - offset.current.x}px`;
            popupRef.current.style.top = `${e.clientY - offset.current.y}px`;
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <>
            <button className="settings-button" onClick={openSettings}>
                <FaCog />
            </button>
            {isSettingsOpen && (
                <div 
                    className={`settings-popup ${isDarkMode ? 'dark-mode' : ''}`} 
                    ref={popupRef}
                    onMouseDown={handleMouseDown}
                >
                    <div className="settings-header">
                        <FaTimes className="close-icon" onClick={closeSettings} />
                    </div>
                    <div className="settings-content">
                        <h2 className="settings-category-heading">Appearance</h2>
                        <div className="settings-option">
                            <span>Toggle dark mode for a better visual experience.</span>
                            <label className="toggle-switch">
                                <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Settings;
