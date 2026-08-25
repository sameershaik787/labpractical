export function getProjects(projects, filters = {}) {
    let filteredProjects = [...projects];

    // Project search (Dev A)
    if (filters.search) {
        const query = filters.search.toLowerCase();
        filteredProjects = filteredProjects.filter(p => 
            (p.name && p.name.toLowerCase().includes(query)) ||
            (p.category && p.category.toLowerCase().includes(query))
        );
    }

    // Project status filter (Dev B)
    if (filters.status && filters.status !== 'All') {
        filteredProjects = filteredProjects.filter(p => 
            p.status && p.status.toLowerCase() === filters.status.toLowerCase()
        );
    }

    // Project category filter (Dev B)
    if (filters.category && filters.category !== 'All') {
        filteredProjects = filteredProjects.filter(p => 
            p.category && p.category.toLowerCase() === filters.category.toLowerCase()
        );
    }

    // Developer D: Project sorting (A-Z, Z-A)
    if (filters.sortBy === 'A-Z' || filters.sortBy === 'name-asc') {
        filteredProjects.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (filters.sortBy === 'Z-A' || filters.sortBy === 'name-desc') {
        filteredProjects.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    } else {
        filteredProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filteredProjects;
}
