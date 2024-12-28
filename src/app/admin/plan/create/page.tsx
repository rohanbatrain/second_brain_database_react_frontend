"use client";

import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './page.css'; // Assuming you have a global.css file

const initialState = {
    name: '',
    teamLimit: 0,
    projectLimit: 0,
    taskLimitPerProject: 0,
    description: ''
};

function reducer(state: typeof initialState, action: { type: string; payload: any }) {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_TEAM_LIMIT':
            return { ...state, teamLimit: action.payload };
        case 'SET_PROJECT_LIMIT':
            return { ...state, projectLimit: action.payload };
        case 'SET_TASK_LIMIT_PER_PROJECT':
            return { ...state, taskLimitPerProject: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

const CreatePlanWidget = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [planId, setPlanId] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (!token) {
            router.push('/login'); // Redirect to login if no token is found
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('Token');
        if (!token) {
            console.error('No JWT token found');
            return;
        }
        setLoading(true);
        setMessage('');
        setPlanId('');
        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/admin/plan/create_plan',
                {
                    name: state.name,
                    team_limit: state.teamLimit,
                    project_limit: state.projectLimit,
                    task_limit_per_project: state.taskLimitPerProject,
                    description: state.description,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            const data = response.data;
            setMessage(data.message);
            setPlanId(data.plan_id);
            dispatch({ type: 'RESET', payload: null });
        } catch (error) {
            setMessage('Error creating plan. Please try again.');
            console.error('Error creating plan:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Create Plan</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label">Name:</label>
                    <input className="input" type="text" value={state.name} onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label className="label">Team Limit:</label>
                    <input className="input" type="number" value={state.teamLimit} onChange={(e) => dispatch({ type: 'SET_TEAM_LIMIT', payload: Number(e.target.value) })} required />
                </div>
                <div className="form-group">
                    <label className="label">Project Limit:</label>
                    <input className="input" type="number" value={state.projectLimit} onChange={(e) => dispatch({ type: 'SET_PROJECT_LIMIT', payload: Number(e.target.value) })} required />
                </div>
                <div className="form-group">
                    <label className="label">Task Limit Per Project:</label>
                    <input className="input" type="number" value={state.taskLimitPerProject} onChange={(e) => dispatch({ type: 'SET_TASK_LIMIT_PER_PROJECT', payload: Number(e.target.value) })} required />
                </div>
                <div className="form-group">
                    <label className="label">Description:</label>
                    <textarea className="textarea" value={state.description} onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })} required />
                </div>
                <button className="button" type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Plan'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
            {planId && <p className="plan-id">Plan ID: {planId}</p>}
        </div>
    );
};

export default CreatePlanWidget;