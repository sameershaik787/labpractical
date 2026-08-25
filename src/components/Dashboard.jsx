import React, { useState, useEffect } from 'react';
import ProjectList from './ProjectList';
import TaskList from './TaskList';
import UserList from './UserList';
import NotificationPanel from './NotificationPanel';
import { projects as initialProjects, tasks as initialTasks, users as initialUsers, notifications as initialNotifications } from '../data/data';
import { getProjects } from '../utils/projectUtils';
import { getTasks, createTask, assignTask, completeTask } from '../utils/taskUtils';
import { calculateStats } from '../utils/dashboardUtils';

function Dashboard() {
    const [projects, setProjects] = useState(initialProjects);
    const [tasks, setTasks] = useState(initialTasks);
    const [users, setUsers] = useState(initialUsers);
    const [notifications, setNotifications] = useState(initialNotifications);

    // Filters state
    const [projectFilters, setProjectFilters] = useState({});
    const [taskFilters, setTaskFilters] = useState({});

    // Processed Data
    const displayedProjects = getProjects(projects, projectFilters);
    const displayedTasks = getTasks(tasks, taskFilters);
    const stats = calculateStats(displayedProjects, displayedTasks, users);

    const handleCreateTask = (taskData) => {
        try {
            const updatedTasks = createTask(taskData, tasks);
            setTasks(updatedTasks);
            
            // Note: Dev C might add notification logic here or in createTask directly
        } catch (error) {
            alert(error.message);
        }
    };

    const handleAssignTask = (taskId, newAssignee) => {
        const updatedTasks = assignTask(taskId, newAssignee, tasks);
        setTasks(updatedTasks);
    };

    const handleCompleteTask = (taskId) => {
        const updatedTasks = completeTask(taskId, tasks, (newNotification) => {
            setNotifications(prev => [newNotification, ...prev]);
        });
        setTasks(updatedTasks);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Project Management Dashboard</h1>
                
                {/* CONFLICT ZONE 5: DASHBOARD CONTROLS */}
                <div className="dashboard-controls" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="stats-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div className="stat-card">
                            <span>Total Projects: {stats.totalProjects}</span>
                        </div>
                        <div className="stat-card">
                            <span>Total Tasks: {stats.totalTasks}</span>
                        </div>
                        <div className="stat-card">
                            <span>Active Tasks: {stats.activeTasks}</span>
                        </div>
                        <div className="stat-card">
                            <span>Completed Tasks: {stats.completedTasks}</span>
                        </div>
                        <div className="stat-card stat-card-high-priority">
                            <span>High Priority Tasks: {stats.highPriorityTasks}</span>
                        </div>
                    </div>

                    <div className="controls-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        {/* Search UI (Dev A) */}
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={projectFilters.search || ''}
                            onChange={(e) => setProjectFilters(prev => ({ ...prev, search: e.target.value }))}
                        />

                        {/* Project Status Filter UI (Dev B) */}
                        <select
                            value={projectFilters.status || 'All'}
                            onChange={(e) => setProjectFilters(prev => ({ ...prev, status: e.target.value }))}
                        >
                            <option value="All">All Project Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                            <option value="Archived">Archived</option>
                        </select>

                        {/* Project Category Filter UI (Dev B) */}
                        <select
                            value={projectFilters.category || 'All'}
                            onChange={(e) => setProjectFilters(prev => ({ ...prev, category: e.target.value }))}
                        >
                            <option value="All">All Categories</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Operations">Operations</option>
                        </select>

                        {/* Sorting UI (Dev D) */}
                        <select
                            value={projectFilters.sortBy || ''}
                            onChange={(e) => setProjectFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                        >
                            <option value="">Sort Projects: Default</option>
                            <option value="A-Z">Project Name (A-Z)</option>
                            <option value="Z-A">Project Name (Z-A)</option>
                        </select>

                        {/* Team Member Filter UI (Dev D) */}
                        <select
                            value={projectFilters.member || 'All'}
                            onChange={(e) => {
                                const selectedUser = e.target.value;
                                setProjectFilters(prev => ({ ...prev, member: selectedUser }));
                                setTaskFilters(prev => ({ ...prev, assignee: selectedUser }));
                            }}
                        >
                            <option value="All">All Team Members</option>
                            {users.map(u => (
                                <option key={u.id} value={u.name}>{u.name}</option>
                            ))}
                        </select>

                        {/* Reset Dashboard Controls (Dev D) */}
                        {(projectFilters.search || (projectFilters.status && projectFilters.status !== 'All') || (projectFilters.category && projectFilters.category !== 'All') || (projectFilters.member && projectFilters.member !== 'All') || projectFilters.sortBy) && (
                            <button
                                className="btn-secondary"
                                style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', cursor: 'pointer' }}
                                onClick={() => {
                                    setProjectFilters({});
                                    setTaskFilters({});
                                }}
                            >
                                Reset Controls
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                <main className="main-content">
                    <section className="dashboard-section">
                        <h2>Projects</h2>
                        <ProjectList projects={displayedProjects} />
                    </section>

                    <section className="dashboard-section">
                        <h2>Tasks</h2>
                        <TaskList 
                            tasks={displayedTasks} 
                            onCreateTask={handleCreateTask} 
                            onAssignTask={handleAssignTask}
                            onCompleteTask={handleCompleteTask}
                            projects={projects} 
                            users={users}
                            onFilterChange={setTaskFilters}
                            currentFilters={taskFilters}
                        />
                    </section>

                    <section className="dashboard-section">
                        <h2>Team Members</h2>
                        <UserList users={users} />
                    </section>
                </main>

                <aside className="sidebar">
                    <NotificationPanel notifications={notifications} />
                </aside>
            </div>
        </div>
    );
}

export default Dashboard;
