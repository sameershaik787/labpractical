import React, { useState } from 'react';

function TaskList({ tasks, onCreateTask, onAssignTask, projects, users, onFilterChange, currentFilters = {} }) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskProjectId, setNewTaskProjectId] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('Medium');
    const [newTaskAssignee, setNewTaskAssignee] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('All');

    const handlePriorityFilterChange = (priority) => {
        setPriorityFilter(priority);
        if (onFilterChange) {
            onFilterChange({ ...currentFilters, priority });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateTask({
            title: newTaskTitle,
            projectId: newTaskProjectId,
            priority: newTaskPriority,
            assignee: newTaskAssignee || 'Unassigned',
            status: "Active"
        });
        setNewTaskTitle('');
        setNewTaskProjectId('');
        setNewTaskPriority('Medium');
        setNewTaskAssignee('');
    };

    return (
        <div className="task-section">
            <div className="task-filter-bar card" style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <label><strong>Filter by Priority:</strong></label>
                <select 
                    value={priorityFilter} 
                    onChange={(e) => handlePriorityFilterChange(e.target.value)}
                >
                    <option value="All">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="task-creation-form card">
                <h3>Create New Task</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Task Title..." 
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        required
                    />
                    <select 
                        value={newTaskProjectId} 
                        onChange={(e) => setNewTaskProjectId(e.target.value)}
                    >
                        <option value="">Select Project</option>
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    <select
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value)}
                    >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                    </select>
                    <select
                        value={newTaskAssignee}
                        onChange={(e) => setNewTaskAssignee(e.target.value)}
                    >
                        <option value="">Assign User (Optional)</option>
                        {users.map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                    </select>
                    <button type="submit" className="btn-primary">Create Task</button>
                </form>
            </div>

            {tasks.length === 0 ? (
                <p className="empty-message">No tasks found.</p>
            ) : (
                <div className="list-container task-list">
                    {tasks.map(task => (
                        <div key={task.id} className="list-item card">
                            <div className="card-header">
                                <h4>{task.title}</h4>
                                <div className="badges">
                                    <span className={`badge priority-${(task.priority || 'medium').toLowerCase()}`}>
                                        {task.priority || 'Medium'}
                                    </span>
                                    <span className={`badge status-${task.status.toLowerCase()}`}>
                                        {task.status}
                                    </span>
                                </div>
                            </div>
                            <div className="card-body">
                                <p><strong>Project:</strong> {projects.find(p => p.id === task.projectId)?.name || 'Unknown'}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <strong>Assignee:</strong>
                                    {onAssignTask ? (
                                        <select
                                            value={task.assignee || 'Unassigned'}
                                            onChange={(e) => onAssignTask(task.id, e.target.value)}
                                            style={{ padding: '0.2rem 0.5rem', fontSize: '0.85rem' }}
                                        >
                                            <option value="Unassigned">Unassigned</option>
                                            {users.map(u => (
                                                <option key={u.id} value={u.name}>{u.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span>{task.assignee || 'Unassigned'}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaskList;
