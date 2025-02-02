import { fetchJSON, renderProjects } from '../global.js';

async function loadProjects() {
    try {
        const projects = await fetchJSON('../lib/projects.json'); // Fetch data
        const projectsContainer = document.querySelector('.projects'); // Select container

        if (projectsContainer) {
            renderProjects(projects, projectsContainer, 'h2');
        } else {
            console.error("Container element '.projects' not found.");
        }
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

// Call the function to load projects
loadProjects();
