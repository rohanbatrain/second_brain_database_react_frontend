"use client"
import React, { useState, useEffect } from 'react';
import { FaHome, FaBook, FaCalendarAlt, FaCog, FaBars, FaMoon, FaSun } from 'react-icons/fa';
import './sidebar.css';

const Sidebar: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('dark_mode') === 'true';
        setIsDarkMode(storedDarkMode);
    }, []);

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : '';
    }, [isDarkMode]);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('dark_mode', (!isDarkMode).toString());
    };

    return (
        <div className={`sidebar ${isDarkMode ? 'dark-mode' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <FaBars className="collapse-icon" onClick={toggleCollapse} />
                {isDarkMode ? (
                    <FaSun className="toggle-dark-mode-icon" onClick={toggleDarkMode} />
                ) : (
                    <FaMoon className="toggle-dark-mode-icon" onClick={toggleDarkMode} />
                )}
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-category">Private</li>
                <li className="sidebar-item">
                    <FaHome className="sidebar-icon" />
                    <span className="sidebar-text">Home</span>
                </li>
                <li className="sidebar-item">
                    <FaBook className="sidebar-icon" />
                    <span className="sidebar-text">Notes</span>
                </li>
                <li className="sidebar-item">
                    <FaCalendarAlt className="sidebar-icon" />
                    <span className="sidebar-text">Calendar</span>
                </li>
                <li className="sidebar-item">
                    <FaCog className="sidebar-icon" />
                    <span className="sidebar-text">Settings</span>
                </li>
                <li className={`sidebar-category ${isCollapsed ? 'space' : ''}`}>Team Space</li>
                {/* No entries for Team Space */}
            </ul>
        </div>
    );
};

export const renderSidebar = (isVisible: boolean) => {
    return isVisible ? <Sidebar /> : null;
};

export default Sidebar;
