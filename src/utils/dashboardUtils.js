export function calculateStats(projects = [], tasks = [], users = []) {
    // Developer B: Task Overview (Total, Active, Completed, High Priority)
    const totalTasks = tasks.length;
    const activeTasks = tasks.filter(t => (t.status || "").toLowerCase() === "active").length;
    const completedTasks = tasks.filter(t => (t.status || "").toLowerCase() === "completed").length;
    const highPriorityTasks = tasks.filter(t => (t.priority || "").toLowerCase() === "high").length;

    // Developer A: Project Overview
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => (p.status || "").toLowerCase() === "active").length;
    const completedProjects = projects.filter(p => (p.status || "").toLowerCase() === "completed").length;

    // Developer C: User Overview
    const totalUsers = users.length;
    const activeUsers = users.filter(u => (u.status || "").toLowerCase() === "active").length;
    const assignedUserNames = new Set(tasks.map(t => t.assignee).filter(Boolean));
    const usersWithTasks = users.filter(u => assignedUserNames.has(u.name)).length;

    return {
        totalProjects,
        activeProjects,
        completedProjects,
        totalTasks,
        activeTasks,
        completedTasks,
        highPriorityTasks,
        totalUsers,
        activeUsers,
        usersWithTasks
    };
}
