"use client"
import React, { useState, useEffect } from 'react';
import { FaHome, FaBook, FaCalendarAlt, FaCog, FaBars, FaMoon, FaSun } from 'react-icons/fa';
import './user_sidebar.css';

const Sidebar: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [team, setTeam] = useState<string>('Default Team');
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('dark_mode') === 'true';
        setIsDarkMode(storedDarkMode);
    }, []);

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : '';
    }, [isDarkMode]);

    const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTeam(event.target.value);
    };

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
            <select value={team} onChange={handleTeamChange} className="team-select">
                <option value="Default Team">Default Team</option>
                <option value="Team 1">Team 1</option>
                <option value="Team 2">Team 2</option>
            </select>
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
                <li className="sidebar-item">
                    <FaHome className="sidebar-icon" />
                    <span className="sidebar-text">{team}</span>
                </li>
            </ul>
        </div>
    );
};

export const renderSidebar = (isVisible: boolean) => {
    return isVisible ? <Sidebar /> : null;
};

export default Sidebar;