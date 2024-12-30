"use client"
import React, { useState, useEffect } from 'react';
import './page.css'; // Import the CSS file

const SetupPage: React.FC = () => {
    const [apiUrl, setApiUrl] = useState<string>('');
    const [isApiSet, setIsApiSet] = useState<boolean>(false);

    useEffect(() => {
        const storedApiUrl = localStorage.getItem('backend_api');
        if (storedApiUrl) {
            setApiUrl(storedApiUrl);
            setIsApiSet(true);
        }
    }, []);

    const sanitizeUrl = (url: string) => {
        // Remove trailing slash if present
        return url.replace(/\/$/, '');
    };

    const handleSave = () => {
        const sanitizedUrl = sanitizeUrl(apiUrl);
        localStorage.setItem('backend_api', sanitizedUrl);
        alert('API URL saved successfully!');
        setIsApiSet(true);
    };

    const handleEdit = () => {
        setIsApiSet(false);
    };

    return (
        <div className="page-background">
            <div className="card">
                {isApiSet ? (
                    <div>
                        <h1>API URL</h1>
                        <p>{apiUrl}</p>
                        <button onClick={handleEdit} className="edit-button">Edit</button>
                    </div>
                ) : (
                    <div>
                        <h1>Setup Backend API URL</h1>
                        <p>Please don't include a trailing slash (/) at the end of the URL.</p>
                        <input
                            type="text"
                            value={apiUrl}
                            onChange={(e) => setApiUrl(e.target.value)}
                            placeholder="Enter backend API URL"
                            className="api-input"
                        />
                        <button onClick={handleSave} className="save-button">Save</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SetupPage;