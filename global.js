console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let navLinks = $$("nav a");
let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
  );

currentLink.classList.add('current');

if (currentLink) {
    // or if (currentLink !== undefined)
    currentLink.classList.add('current');
  }


let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    // add the rest of your pages here
    {url: 'contact/', title:'Contact'},
    {url: 'cv/',title: 'CV'},
    {url: 'https://github.com/fanfanccluo', title: 'GitHub' }
  ];


let nav = document.createElement('nav');
document.body.prepend(nav)

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // TODO create link and add it to nav
    nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
  }
  
