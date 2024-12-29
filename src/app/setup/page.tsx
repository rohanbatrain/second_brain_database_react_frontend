"use client"
import React, { useState } from 'react';

const SetupPage: React.FC = () => {
    const [apiUrl, setApiUrl] = useState<string>('');

    const handleSave = () => {
        localStorage.setItem('backend_api', apiUrl);
        alert('API URL saved successfully!');
    };

    return (
        <div>
            <h1>Setup Backend API URL</h1>
            <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="Enter backend API URL"
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default SetupPage;