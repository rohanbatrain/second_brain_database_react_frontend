"use client"
import React, { useState, useEffect } from 'react';
import { FaHome, FaBook, FaCalendarAlt, FaCog, FaBars, FaBell, FaTasks, FaProjectDiagram, FaPen, FaChevronUp, FaTimes, FaCoffee, FaPlus } from 'react-icons/fa';
import './sidebar.css';
import logoLight from '../../../assets/logo_light.png'; // Import the light mode logo
import logoDark from '../../../assets/logo_dark_tp.png'; // Import the dark mode logo
import logoCollapsedLight from '../../../assets/mental-health.png'; // Import the collapsed light mode logo
import logoCollapsedDark from '../../../assets/mental-health.png'; // Import the collapsed dark mode logo

const logoLightUrl: string = logoLight.src;
const logoDarkUrl: string = logoDark.src;
const logoCollapsedLightUrl: string = logoCollapsedLight.src;
const logoCollapsedDarkUrl: string = logoCollapsedDark.src;
const profilePicUrl: string = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Profile picture URL

const Sidebar: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [activeSetting, setActiveSetting] = useState<string>('Appearance');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isBuyMeCoffeeEmbedded, setIsBuyMeCoffeeEmbedded] = useState<boolean>(false);
    const [isCreateTeamOpen, setIsCreateTeamOpen] = useState<boolean>(false);
    const [newTeamName, setNewTeamName] = useState<string>('');

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('dark_mode') === 'true';
        setIsDarkMode(storedDarkMode);
    }, []);

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : '';
    }, [isDarkMode]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (isSettingsOpen) {
                    closeSettings();
                }
                if (isCreateTeamOpen) {
                    closeCreateTeam();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isSettingsOpen, isCreateTeamOpen]);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('dark_mode', (!isDarkMode).toString());
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openSettings = () => {
        setIsSettingsOpen(true);
    };

    const closeSettings = () => {
        setIsSettingsOpen(false);
    };

    const getLogo = () => {
        if (isCollapsed) {
            return isDarkMode ? logoCollapsedDarkUrl : logoCollapsedLightUrl;
        }
        return isDarkMode ? logoDarkUrl : logoLightUrl;
    };

    const handleBuyMeCoffeeClick = () => {
        const viewport = document.querySelector('.settings-content-area');
        if (viewport && viewport.innerHTML.trim() === '') {
            setIsBuyMeCoffeeEmbedded(true);
        } else {
            window.open('https://buymeacoffee.com/rohanbatrain', '_blank', 'noopener,noreferrer');
        }
    };

    const openCreateTeam = () => {
        setIsCreateTeamOpen(true);
    };

    const closeCreateTeam = () => {
        setIsCreateTeamOpen(false);
    };

    const handleCreateTeamSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle team creation logic here
        closeCreateTeam();
    };

    const renderSettingsContent = () => {
        if (isBuyMeCoffeeEmbedded) {
            return (
                <iframe
                    src="https://buymeacoffee.com/rohanbatrain"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="Buy Me a Coffee"
                ></iframe>
            );
        }

        switch (activeSetting) {
            case 'Appearance':
                return (
                    <div className="settings-content">
                        <h2 className="settings-category-heading">Appearance</h2>
                        <div className="settings-option">
                            <span>Toggle dark mode for a better visual experience.</span>
                            <label className="toggle-switch">
                                <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="settings-option">
                            <span>Another feature</span>
                            <label className="toggle-switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                );
            case 'Activity Log':
                return (
                    <div className="settings-content">
                        <h2 className="settings-category-heading">Activity Log</h2>
                        <p>View your recent activities.</p>
                        {/* Add more content for Activity Log here */}
                    </div>
                );
            case 'Upgrade Your Plan':
                return (
                    <div className="settings-content">
                        <h2 className="settings-category-heading">Upgrade Your Plan</h2>
                        <div className="plan-tiles">
                            <div className="plan-tile">
                                <h3>Free</h3>
                                <p className="price">$0/month</p>
                                <ul>
                                    <li>Feature 1</li>
                                    <li>Feature 2</li>
                                    <li>Feature 3</li>
                                </ul>
                                <p>Currently</p>
                            </div>
                            <div className="plan-tile coming-soon">
                                <h3>Basic</h3>
                                <p className="price">$10/month</p>
                                <ul>
                                    <li>Feature 1</li>
                                    <li>Feature 2</li>
                                    <li>Feature 3</li>
                                </ul>
                                <p>Coming Soon</p>
                            </div>
                            <div className="plan-tile coming-soon">
                                <h3>Premium</h3>
                                <p className="price">$20/month</p>
                                <ul>
                                    <li>Feature 1</li>
                                    <li>Feature 2</li>
                                    <li>Feature 3</li>
                                </ul>
                                <p>Coming Soon</p>
                            </div>
                        </div>
                    </div>
                );
            // Add more cases for other settings here
            default:
                return null;
        }
    };

    const filteredSettings = ['Appearance', 'Activity Log', 'Upgrade Your Plan', 'Account'].filter(setting =>
        setting.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className={`sidebar ${isDarkMode ? 'dark-mode' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <FaBars className="collapse-icon" onClick={toggleCollapse} />
                    <FaBell className="notification-icon" />
                </div>
                <div className="sidebar-logo">
                    <img src={getLogo()} alt="Logo" className="logo" />
                </div>
                <ul className="sidebar-menu">
                    <li className="sidebar-category">Personal Space</li>
                    <li className="sidebar-item">
                        <FaHome className="sidebar-icon" />
                        <span className="sidebar-text">Home</span>
                    </li>
                    <li className={`sidebar-category ${isCollapsed ? 'space' : ''}`}>
                        Team Space <FaPlus className="create-team-icon" onClick={openCreateTeam} />
                    </li>
                    <li className={`sidebar-item placeholder ${isCollapsed ? 'hidden' : ''}`}>No Team Spaces</li> {/* Placeholder for empty Team Space */}
                </ul>
                <div className="sidebar-profile">
                    <img src={profilePicUrl} alt="Profile" className="profile-pic" />
                    <span className={`profile-name ${isCollapsed ? 'hidden' : ''}`}>John</span>
                    <FaChevronUp className="profile-menu-icon" onClick={toggleMenu} />
                    {isMenuOpen && (
                        <div className="profile-menu">
                            <ul>
                                <li onClick={openSettings}><FaCog className="menu-icon" /> Settings</li>
                                <li onClick={handleBuyMeCoffeeClick}>
                                    <FaCoffee className="menu-icon" /> <span>Buy Me a Coffee</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {isSettingsOpen && (
                <div className={`settings-popup ${isDarkMode ? 'dark-mode' : ''}`}>
                    <div className="settings-header">
                        <FaTimes className="close-icon" onClick={closeSettings} />
                    </div>
                    <div className="settings-container">
                        <div className="settings-sidebar">
                            <h2>Settings</h2>
                            <input
                                type="text"
                                placeholder="Search settings..."
                                className="settings-search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <ul>
                                {filteredSettings.map(setting => (
                                    <li key={setting} onClick={() => setActiveSetting(setting)}>
                                        {setting}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="settings-content-area">
                            {renderSettingsContent()}
                        </div>
                    </div>
                </div>
            )}
            {isCreateTeamOpen && (
                <div className={`create-team-popup ${isDarkMode ? 'dark-mode' : ''}`}>
                    <div className="create-team-header">
                        <FaTimes className="close-icon" onClick={closeCreateTeam} />
                    </div>
                    <div className="create-team-container">
                        <form onSubmit={handleCreateTeamSubmit}>
                            <div className="create-team-question">
                                <label>Please tell us your new team name</label>
                                <input
                                    type="text"
                                    value={newTeamName}
                                    onChange={(e) => setNewTeamName(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="create-team-submit">Create Team</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export const renderSidebar = (isVisible: boolean) => {
    return isVisible ? <Sidebar /> : null;
};

export default Sidebar;
