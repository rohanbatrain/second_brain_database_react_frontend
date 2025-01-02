"use client"
import React, { useState, useEffect } from 'react';
import { FaHome, FaBook, FaCalendarAlt, FaCog, FaBars, FaMoon, FaSun, FaTasks, FaProjectDiagram, FaPen } from 'react-icons/fa';
import './sidebar.css';
import logoLight from './logo_light_tp.png'; // Import the light mode logo
import logoDark from './logo_dark_tp.png'; // Import the dark mode logo
import logoCollapsedLight from './mental-health.png'; // Import the collapsed light mode logo
import logoCollapsedDark from './mental-health.png'; // Import the collapsed dark mode logo

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

    const getLogo = () => {
        if (isCollapsed) {
            return isDarkMode ? logoCollapsedDark : logoCollapsedLight;
        }
        return isDarkMode ? logoDark : logoLight;
    };

    return (
        <div className={`sidebar ${isDarkMode ? 'dark-mode' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-logo">
                <img src={getLogo().src} alt="Logo" className="logo" />
            </div>
            <div className="sidebar-header">
                <FaBars className="collapse-icon" onClick={toggleCollapse} />
                {isDarkMode ? (
                    <FaSun className="toggle-dark-mode-icon" onClick={toggleDarkMode} />
                ) : (
                    <FaMoon className="toggle-dark-mode-icon" onClick={toggleDarkMode} />
                )}
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-item">
                    <FaPen className="sidebar-icon" />
                    <span className="sidebar-text">Quick Capture</span>
                </li>
                <li className="sidebar-category">Private</li>
                <li className="sidebar-item">
                    <FaHome className="sidebar-icon" />
                    <span className="sidebar-text">Home</span>
                </li>
                <li className="sidebar-item">
                    <FaBook className="sidebar-icon" />
                    <span className="sidebar-text">Capture</span>
                </li>
                <li className="sidebar-item">
                    <FaCalendarAlt className="sidebar-icon" />
                    <span className="sidebar-text">Calendar</span>
                </li>
                <li className="sidebar-item">
                    <FaTasks className="sidebar-icon" />
                    <span className="sidebar-text">Tasks</span>
                </li>
                <li className="sidebar-item">
                    <FaProjectDiagram className="sidebar-icon" />
                    <span className="sidebar-text">Projects</span>
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
