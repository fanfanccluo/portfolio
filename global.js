console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let navLinks=$$("nav a")
let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
  );

let pages = [
    { url: '/portfolio/', title: 'Home' },
    { url: '/portfolio/projects/', title: 'Projects' },
    { url: '/portfolio/contact/', title: 'Contact' },
    { url: '/portfolio/cv/', title: 'CV' },
    { url: 'https://github.com/fanfanccluo/', title: 'GitHub' },
  ];
  
let nav = document.createElement('nav');
  document.body.prepend(nav);
  
  for (let p of pages) {
      let a = document.createElement('a');
      a.href = p.url;
      a.textContent = p.title;
  
      a.classList.toggle(
        'current',
        a.host === location.host && a.pathname === location.pathname
      );
  
      a.toggleAttribute('target', a.host !== location.host);
      nav.append(a);
  }
  
document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
      Theme:
      <select id="theme-select">
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>`
  );
  
  // Set theme based on dropdown selection
  const select = document.getElementById('theme-select');
  const root = document.documentElement;
  
  // Function to set theme
  function setTheme(theme) {
    root.style.colorScheme = theme;
    localStorage.setItem('theme', theme); // Save user preference
  }
  
  // Load saved theme or default to "Automatic"
  const savedTheme = localStorage.getItem('theme') || 'light dark';
  setTheme(savedTheme);
  select.value = savedTheme;
  
  // Add event listener for theme changes
  select.addEventListener('change', () => setTheme(select.value));
  


const form = document.querySelector('#contact-form');

form?.addEventListener('submit', function (event) {
  event.preventDefault();
  const data = new FormData(form);
  let mailtoUrl = 'mailto:z9luo@ucsd.edu?';
  let params = [];

  for (let [name, value] of data) {
    params.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
  }
  mailtoUrl += params.join('&');
  location.href = mailtoUrl;
});





// Fetch JSON data
export async function fetchJSON(url) {
  try {
      // Fetch the JSON file from the given URL
      const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    // Parse the response as JSON
    const data = await response.json();
    return data; 


  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
  }
}

// Render projects
export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  containerElement.innerHTML = '';

  projects.forEach(project => {
      const article = document.createElement('article');

      const heading = document.createElement(headingLevel);
      heading.textContent = project.title;

      const image = document.createElement('img');
      image.src = project.image || 'default.jpg';
      image.alt = project.title;

      const description = document.createElement('p');
      description.textContent = project.description;

      article.appendChild(heading);
      article.appendChild(image);
      article.appendChild(description);
      containerElement.appendChild(article);
  });
}

// Fetch GitHub data
export async function fetchGitHubData(username) {
  try {
      const response = await fetch(`https://api.github.com/users/fanfanccluo`);
      if (!response.ok) {
          throw new Error(`GitHub API Error: ${response.statusText}`);
      }
      return await response.json();

  } catch (error) {
      console.error('Failed to fetch GitHub data:', error);
      return null;
  }
}
