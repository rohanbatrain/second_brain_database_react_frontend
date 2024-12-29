"use client"
import React, { useState } from 'react';
import './page.css';    
const UpdatePlanPage: React.FC = () => {
    const [name, setName] = useState('');
    const [newName, setNewName] = useState('');
    const [teamLimit, setTeamLimit] = useState<number | null>(null);
    const [projectLimit, setProjectLimit] = useState<number | null>(null);
    const [taskLimitPerProject, setTaskLimitPerProject] = useState<number | null>(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null); // Reset error state
        setSuccess(null); // Reset success state
        setIsSubmitting(true); // Disable submit button
        const token = localStorage.getItem('Token'); // Fetch token from local storage
        try {
            const response = await fetch('http://localhost:5000/admin/plan/update_plan/name/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add token to headers
                },
                body: JSON.stringify({
                    name,
                    new_name: newName || undefined, // Allow new name to be empty
                    team_limit: teamLimit,
                    project_limit: projectLimit,
                    task_limit_per_project: taskLimitPerProject,
                    description,
                }),
            });
            const result = await response.json();
            if (result.status === 'error') {
                throw new Error(result.message);
            }
            if (!response.ok) {
                throw new Error(result.message || `HTTP error! status: ${response.status}`);
            }
            setSuccess(result.message);
            console.log(result);
            // Clear form on success
            setName('');
            setNewName('');
            setTeamLimit(null);
            setProjectLimit(null);
            setTaskLimitPerProject(null);
            setDescription('');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message || 'Failed to update plan. Please try again.');
            } else {
                setError('Failed to update plan. Please try again.');
            }
            console.error(error);
        } finally {
            setIsSubmitting(false); // Re-enable submit button
        }
    };

    return (
        <div>
            <h1>Update Plan</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} />
                    </label>
                </div>
                <div>
                    <label>
                        New Name:
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} disabled={isSubmitting} />
                    </label>
                </div>
                <div>
                    <label>
                        Team Limit:
                        <input type="number" value={teamLimit ?? ''} onChange={(e) => setTeamLimit(Number(e.target.value))} disabled={isSubmitting} />
                    </label>
                </div>
                <div>
                    <label>
                        Project Limit:
                        <input type="number" value={projectLimit ?? ''} onChange={(e) => setProjectLimit(Number(e.target.value))} disabled={isSubmitting} />
                    </label>
                </div>
                <div>
                    <label>
                        Task Limit Per Project:
                        <input type="number" value={taskLimitPerProject ?? ''} onChange={(e) => setTaskLimitPerProject(Number(e.target.value))} disabled={isSubmitting} />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ color: 'black' }}
                            disabled={isSubmitting}
                        />
                    </label>
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Plan'}
                </button>
            </form>
        </div>
    );
};

export default UpdatePlanPage;