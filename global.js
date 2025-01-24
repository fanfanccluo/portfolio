console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let navLinks=$$("nav a")
let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
  );

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'cv/', title: 'CV' },
  { url: 'https://github.com/fanfanccluo', title: 'GitHub' },
];

let nav = document.createElement('nav');
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains('home');

for (let p of pages) {
    let url = p.url;
    let title = p.title;
  
    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
  

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
  