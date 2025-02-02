import { fetchJSON, renderProjects } from '../global.js';

async function loadProjects() {
    const projects = await fetchJSON('../lib/projects.json');
    const projectsContainer = document.querySelector('.projects');

    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p>No projects available.</p>';
        return;
    }

    renderProjects(projects, projectsContainer, 'h2');
}

document.addEventListener('DOMContentLoaded', loadProjects);
