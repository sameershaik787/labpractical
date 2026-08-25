export function getTasks(tasks, filters = {}) {
    let filteredTasks = tasks.map(task => ({
        ...task,
        priority: task.priority || "Medium"
    }));

    // Developer B: Filter by Priority (Low, Medium, High)
    if (filters.priority && filters.priority !== "All") {
        filteredTasks = filteredTasks.filter(
            task => task.priority && task.priority.toLowerCase() === filters.priority.toLowerCase()
        );
    }

    // Developer D: Filter by Task Status (All, Active, Completed)
    if (filters.status && filters.status !== "All") {
        filteredTasks = filteredTasks.filter(
            task => task.status && task.status.toLowerCase() === filters.status.toLowerCase()
        );
    }
    if (filters.search) {
        const query = filters.search.toLowerCase();
        filteredTasks = filteredTasks.filter(
            task => (task.title && task.title.toLowerCase().includes(query)) ||
                    (task.description && task.description.toLowerCase().includes(query))
        );
    }
    if (filters.assignee) {
        filteredTasks = filteredTasks.filter(
            task => task.assignee === filters.assignee
        );
    }

    return filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function createTask(taskData, existingTasks) {
    // Basic validation
    if (!taskData.title) {
        throw new Error("Task title is required");
    }

    // Validate priority
    const validPriorities = ["Low", "Medium", "High"];
    const priority = validPriorities.includes(taskData.priority) ? taskData.priority : "Medium";

    const newTask = {
        id: `T-${Date.now()}`,
        ...taskData,
        priority,
        status: taskData.status || "Active",
        createdAt: new Date().toISOString()
    };
    
    // TODO: Add side effects here (e.g. trigger notifications)

    return [...existingTasks, newTask];
}

export function updateTaskPriority(taskId, newPriority, existingTasks) {
    const validPriorities = ["Low", "Medium", "High"];
    if (!validPriorities.includes(newPriority)) {
        throw new Error(`Invalid priority: ${newPriority}. Must be Low, Medium, or High`);
    }

    return existingTasks.map(task => 
        task.id === taskId ? { ...task, priority: newPriority } : task
    );
}

export function assignTask(taskId, newAssignee, existingTasks) {
    return existingTasks.map(task => 
        task.id === taskId ? { ...task, assignee: newAssignee || 'Unassigned' } : task
    );
}

export function completeTask(taskId, existingTasks, createNotificationCallback) {
    let completedTask = null;

    const updatedTasks = existingTasks.map(task => {
        if (task.id === taskId) {
            completedTask = { ...task, status: "Completed" };
            return completedTask;
        }
        return task;
    });

    if (completedTask && createNotificationCallback) {
        const assignee = completedTask.assignee || 'Unassigned';
        createNotificationCallback({
            id: `N-${Date.now()}`,
            message: `${assignee} completed the ${completedTask.title} task.`,
            type: "success",
            read: false,
            createdAt: new Date().toISOString()
        });
    }

    return updatedTasks;
}

export function verifyTaskIntegration(tasks) {
    const priorities = ["Low", "Medium", "High"];
    const statuses = ["Active", "Completed"];
    
    return {
        total: tasks.length,
        hasValidPriorities: tasks.every(t => priorities.includes(t.priority)),
        hasValidStatuses: tasks.every(t => statuses.includes(t.status) || t.status === "Archived"),
        allAssignedOrUnassigned: tasks.every(t => typeof t.assignee === 'string' || t.assignee === undefined)
    };
}
