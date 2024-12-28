"use client"
import React, { useState } from 'react';
import './page.css'; // Import the CSS file

const ReadPlanPage: React.FC = () => {
    const [planId, setPlanId] = useState('');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('Token');

        if (!token) {
            setError('No token found in local storage');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/admin/plan/read_plan/${planId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch plan');
            }

            const data = await response.json();
            setResult(data);
            setError(null);
        } catch (err) {
            setError((err as Error).message);
            setResult(null);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="planId">Plan ID:</label>
                    <input
                        type="text"
                        id="planId"
                        value={planId}
                        onChange={(e) => setPlanId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Read Plan</button>
            </form>
            {error && <p className="error">{error}</p>}
            {result && result.plan && (
                <div className="table-container">
                    <h2>Plan Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Project Limit</th>
                                <th>Task Limit per Project</th>
                                <th>Team Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{result.plan.name}</td>
                                <td>{result.plan.description}</td>
                                <td>{result.plan.project_limit}</td>
                                <td>{result.plan.task_limit_per_project}</td>
                                <td>{result.plan.team_limit}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReadPlanPage;