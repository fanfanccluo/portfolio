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


// Reference the <select> element
const select = document.querySelector('#theme-select');

// Function to set the color scheme
function setTheme(theme) {
  // Set the color-scheme property on the root element
  document.documentElement.style.setProperty('color-scheme', theme);

  // Save the user's preference in localStorage
  localStorage.setItem('theme', theme);
}

// Add an event listener for the input event
select.addEventListener('input', function (event) {
  const theme = event.target.value;
  console.log('Color scheme changed to', theme);
  setTheme(theme);
});

// Load saved theme or default to "Automatic"
const savedTheme = localStorage.getItem('theme') || 'light dark';
setTheme(savedTheme); // Apply the saved theme
select.value = savedTheme; // Set the dropdown value
