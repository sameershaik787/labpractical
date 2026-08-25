export function calculateStats(projects = [], tasks = [], users = []) {
    // Developer B: Task Overview (Total, Active, Completed)
    const totalTasks = tasks.length;
    const activeTasks = tasks.filter(t => (t.status || "").toLowerCase() === "active").length;
    const completedTasks = tasks.filter(t => (t.status || "").toLowerCase() === "completed").length;

    // Developer D: High-Priority Tasks Count
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

    // Developer D: Team Performance Statistics
    const userWorkloadMap = {};
    const userActiveTasksMap = {};
    const userCompletedTasksMap = {};

    tasks.forEach(t => {
        const assignee = t.assignee || 'Unassigned';
        if (assignee !== 'Unassigned') {
            userWorkloadMap[assignee] = (userWorkloadMap[assignee] || 0) + 1;
            if ((t.status || '').toLowerCase() === 'active') {
                userActiveTasksMap[assignee] = (userActiveTasksMap[assignee] || 0) + 1;
            }
            if ((t.status || '').toLowerCase() === 'completed') {
                userCompletedTasksMap[assignee] = (userCompletedTasksMap[assignee] || 0) + 1;
            }
        }
    });

    let highestWorkloadUser = 'None';
    let maxWorkload = 0;
    Object.entries(userWorkloadMap).forEach(([user, count]) => {
        if (count > maxWorkload) {
            maxWorkload = count;
            highestWorkloadUser = `${user} (${count} tasks)`;
        }
    });

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
        usersWithTasks,
        highestWorkloadUser,
        userActiveTasksMap,
        userCompletedTasksMap
    };
}
