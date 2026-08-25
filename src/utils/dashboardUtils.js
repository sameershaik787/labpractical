export function calculateStats(projects = [], tasks = []) {
    const stats = {
        totalProjects: projects.length,
        totalTasks: tasks.length,
        activeTasks: tasks.filter(t => (t.status || "").toLowerCase() === "active").length,
        completedTasks: tasks.filter(t => (t.status || "").toLowerCase() === "completed").length,
        highPriorityTasks: tasks.filter(t => (t.priority || "").toLowerCase() === "high").length
    };

    return stats;
}
