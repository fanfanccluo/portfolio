console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'cv/', title: 'CV' },
    { url: 'https://github.com/fanfanccluo', title: 'GitHub' },
  ];

const ARE_WE_HOME = document.documentElement.classList.contains('home');
let nav = document.createElement('nav');
  document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;

    // Adjust relative URLs for non-home pages
    if (!ARE_WE_HOME && !url.startsWith('http')) {
      url = '../' + url;
    }

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);
  }

  let navLinks = $$('nav a');
  let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
  );

  if (currentLink) {
    currentLink.classList.add('current');
  }
