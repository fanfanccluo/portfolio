import { fetchGitHubData } from './global.js';

async function loadGitHubStats() {
    const githubUsername = 'fanfanccluo'; 
    const githubData = await fetchGitHubData(fanfanccluo);
    const profileStats = document.querySelector('#profile-stats');

    if (githubData && profileStats) {
        profileStats.innerHTML = `
            <h2>My GitHub Stats</h2>
            <dl>
                <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
                <dt>Followers:</dt><dd>${githubData.followers}</dd>
                <dt>Following:</dt><dd>${githubData.following}</dd>
            </dl>
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadGitHubStats);
