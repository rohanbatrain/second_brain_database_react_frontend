"use client"
import React, { useEffect, useState } from 'react';
import './page.css';

interface Plan {
    _id: string;
    description: string;
    name: string;
    project_limit: number;
    task_limit_per_project: number;
    team_limit: number;
}

const AllPlansPage: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const token = localStorage.getItem('Token');
                if (!token) {
                    window.location.href = '/auth/login';
                    return;
                }

                const response = await fetch('http://localhost:5000/admin/plan/read_all_plans', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch plans');
                }

                const data = await response.json();
                setPlans(data.plans);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        };

        fetchPlans();
    }, []);

    return (
        <div className="plans-page">
            <h1 className="title">All Plans</h1>
            {error && <p className="error">{error}</p>}
            <div className="plans-container">
                {plans.map(plan => (
                    <div key={plan._id} className="plan-card">
                        <h2 className="plan-name">{plan.name}</h2>
                        <p className="plan-id">ID: {plan._id}</p>
                        <p className="plan-description">{plan.description}</p>
                        <div className="plan-limits">
                            <p>Project Limit: {plan.project_limit}</p>
                            <p>Task Limit per Project: {plan.task_limit_per_project}</p>
                            <p>Team Limit: {plan.team_limit}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPlansPage;
