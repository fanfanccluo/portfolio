import { fetchJSON, renderProjects } from './global.js';

async function loadLatestProjects() {
    try {
        const projects = await fetchJSON('./lib/projects.json'); // Adjust the path if necessary
        const latestProjects = projects.slice(0, 3); // Get the first 3 projects

        const projectsContainer = document.querySelector('.projects');
        if (!projectsContainer) {
            console.error("Element with class 'projects' not found in index.html");
            return;
        }

        renderProjects(latestProjects, projectsContainer, 'h2');
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

loadLatestProjects(); 
















import { fetchGitHubData } from './global.js';

async function loadGitHubStats() {
    const githubData = await fetchGitHubData('fanfanccluo'); 
    const profileStats = document.querySelector('#profile-stats');

    if (profileStats && githubData) {
        profileStats.innerHTML = `
            <dl>
                <dt>Followers:</dt><dd>${githubData.followers}</dd>
                <dt>Following:</dt><dd>${githubData.following}</dd>
                <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
                <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
            </dl>
        `;
    } else {
        console.error('GitHub data not found or element missing.');
    }
}

loadGitHubStats(); 
