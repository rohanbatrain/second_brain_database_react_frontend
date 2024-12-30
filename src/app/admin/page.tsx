"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaEye, FaEdit, FaTrash, FaBars, FaArrowLeft, FaMoneyBill } from 'react-icons/fa';
import './sidebar.css'; // Make sure to create and style this CSS file
import PlanCreatePage from './plan/create/page'; // Import the PlanCreatePage component
import AllPlansPage from './plan/read/read_all/page'; // Import the PlansPage component
import PlanReadPage from './plan/read/read_by_id/page'; // Import the PlanReadPage component
import ReadPlanPage from './plan/read/read_by_name/page'; // Import the ReadPlanPage component
import UpdatePlanByIdPage from './plan/update/update_by_id/page'; // Import the UpdatePlanByIdPage component
import UpdatePlanByNamePage from './plan/update/update_by_name/page'; // Import the UpdatePlanByNamePage component

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [selectedForm, setSelectedForm] = useState<string | null>(null);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const sidebarRef = useRef(null);
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setIsLandscape(window.innerWidth > window.innerHeight);
            };

            handleResize(); // Set initial state
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    if (!isLandscape) {
        return (
            <div className="rotate-device">
                <div className="rotate-message">
                    <h1>Please Rotate Your Device</h1>
                    <p>This application is best viewed in landscape mode. Please rotate your device to continue.</p>
                </div>
            </div>
        );
    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubMenu = (menu: string) => {
        setActiveMenu(activeMenu === menu ? null : menu);
        setActiveSubMenu(null);
    };

    const toggleReadMenu = () => {
        setSelectedForm(null);
        setActiveMenu('read');
    };

    const toggleUpdateMenu = () => {
        setSelectedForm(null);
        setActiveMenu('update');
    };

    const goBack = () => {
        if (activeMenu === 'read' || activeMenu === 'update') {
            setActiveMenu('plan');
        } else {
            setActiveMenu(null);
        }
        setSelectedForm(null);
        setActiveSubMenu(null);
    };

    const renderForm = () => {
        switch (selectedForm) {
            case 'create':
                return <PlanCreatePage />;
            case 'readAll':
                return <AllPlansPage />;
            case 'readById':
                return <PlanReadPage />;
            case 'readByName':
                return <ReadPlanPage />;
            case 'updateById':
                return <UpdatePlanByIdPage />;
            case 'updateByName':
                return <UpdatePlanByNamePage />;
            case 'delete':
                return <div>Delete Form</div>;
            default:
                return null;
        }
    };

    return (
        <div className="admin-container">
            <button className="toggle-button" onClick={toggleSidebar}>
                <FaBars style={{ color: 'var(--background)' }} />
            </button>
            <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                {isOpen && <h2>Admin Menu</h2>}
                <ul>
                    {activeMenu === null ? (
                        <>
                            <li className={`parent-menu ${activeMenu === 'plan' ? 'active' : ''}`} onClick={() => toggleSubMenu('plan')}>
                                <Link href="#">
                                    {isOpen ? 'Plan' : <FaMoneyBill style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />}
                                </Link>
                            </li>
                        </>
                    ) : activeMenu === 'plan' ? (
                        <>
                            <li className="back-button" onClick={goBack}>
                                <FaArrowLeft style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />
                                {isOpen && 'Back'}
                            </li>
                            <ul className="sub-menu">
                                <li onClick={() => setSelectedForm('create')}>
                                    <Link href="#">
                                        {isOpen ? 'Create' : <FaPlus style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />}
                                    </Link>
                                </li>
                                <li onClick={toggleReadMenu}>
                                    <Link href="#">
                                        {isOpen ? 'Read' : <FaEye style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />}
                                    </Link>
                                </li>
                                <li onClick={toggleUpdateMenu}>
                                    <Link href="#">
                                        {isOpen ? 'Update' : <FaEdit style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />}
                                    </Link>
                                </li>
                                <li onClick={() => setSelectedForm('delete')}>
                                    <Link href="#">
                                        {isOpen ? 'Delete' : <FaTrash style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />}
                                    </Link>
                                </li>
                            </ul>
                        </>
                    ) : activeMenu === 'read' ? (
                        <>
                            <li className="back-button" onClick={goBack}>
                                <FaArrowLeft style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />
                                {isOpen && 'Back'}
                            </li>
                            <ul className="sub-menu">
                                <li onClick={() => setSelectedForm('readAll')}>
                                    <Link href="#">
                                        {isOpen ? 'Read All' : <FaEye style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />}
                                    </Link>
                                </li>
                                <li onClick={() => setSelectedForm('readById')}>
                                    <Link href="#">
                                        {isOpen ? 'Read by ID' : <FaEye style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />}
                                    </Link>
                                </li>
                                <li onClick={() => setSelectedForm('readByName')}>
                                    <Link href="#">
                                        {isOpen ? 'Read by Name' : <FaEye style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />}
                                    </Link>
                                </li>
                            </ul>
                        </>
                    ) : activeMenu === 'update' ? (
                        <>
                            <li className="back-button" onClick={goBack}>
                                <FaArrowLeft style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />
                                {isOpen && 'Back'}
                            </li>
                            <ul className="sub-menu">
                                <li onClick={() => setSelectedForm('updateById')}>
                                    <Link href="#">
                                        {isOpen ? 'Update by ID' : <FaEdit style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />}
                                    </Link>
                                </li>
                                <li onClick={() => setSelectedForm('updateByName')}>
                                    <Link href="#">
                                        {isOpen ? 'Update by Name' : <FaEdit style={{ color: 'var(--background)', margin: '0 auto', display: 'block' }} />}
                                    </Link>
                                </li>
                            </ul>
                        </>
                    ) : null}
                </ul>
            </div>
            <div className="form-container">
                {renderForm()}
            </div>
        </div>
    );
};

export default Sidebar;