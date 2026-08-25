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

    // Team integration: Support status, search, and assignee filters
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
