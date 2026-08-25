export function getTasks(tasks, filters = {}) {
    let filteredTasks = tasks.map(task => ({
        ...task,
        priority: task.priority || "Medium"
    }));

    // TODO: Apply filters here based on the filters object
    // Developers will add priority, search, status, and assignee filters here.

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
