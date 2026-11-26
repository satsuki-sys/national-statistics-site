// Japan in Figures — router and page shell. Reads the hash, renders the
// matching page from views.js, and keeps the navigation state in sync.
import { ROUTES } from './views.js';

const app = document.getElementById('app');
const navLinks = Array.from(document.querySelectorAll('header nav a'));

function currentRoute() {
  const hash = window.location.hash || '#/';
  const path = hash.slice(1).split('?')[0] || '/';
  return ROUTES[path] ? path : '/';
}

function render() {
  const path = currentRoute();
  const route = ROUTES[path];
  document.title = route.title;
  route.render(app);
  navLinks.forEach((a) => {
    const href = a.getAttribute('href');
    const active = href === '#' + path || (path === '/' && href === '#/');
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
