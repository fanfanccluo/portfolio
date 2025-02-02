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
