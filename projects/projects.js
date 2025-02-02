import { fetchJSON, renderProjects } from "../global.js";

async function loadProjects() {
    const projects = await fetchJSON("../lib/projects.json");

    const projectsContainer = document.querySelector(".projects");
    renderProjects(projects, projectsContainer, "h2");

    // Update the project count in the header
    const projectCountElement = document.querySelector("#project-count");
    if (projectCountElement) {
        projectCountElement.textContent = projects.length; 
    }
}


loadProjects();
