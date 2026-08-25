import React, { useState } from 'react';

function TaskList({ tasks, onCreateTask, projects, users }) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskProjectId, setNewTaskProjectId] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('Medium');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateTask({
            title: newTaskTitle,
            projectId: newTaskProjectId,
            priority: newTaskPriority,
            status: "Active"
        });
        setNewTaskTitle('');
        setNewTaskProjectId('');
        setNewTaskPriority('Medium');
    };

    return (
        <div className="task-section">
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
                                <p><strong>Assignee:</strong> {task.assignee || 'Unassigned'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaskList;
