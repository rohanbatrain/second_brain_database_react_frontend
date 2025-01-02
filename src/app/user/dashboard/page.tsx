"use client"
import React from 'react';
import Sidebar from './components/sidebar';
import './styles.css';

const DashboardPage: React.FC = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                {/* Add your main content here */}
            </div>
        </div>
    );
};

export default DashboardPage;