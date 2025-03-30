import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import Animals from './animals.js'

interface RouteConfig {
    page: string;
    code: any;
}

interface Routes {
    [key: string]: RouteConfig;
}

const rootDiv = document.querySelector("#root") as HTMLDivElement;
const navbarItems = document.querySelectorAll("a[data-href]");
const PAGES = '/pages/';

const routes: Routes = {
    '/': { page: 'home.html', code: null },
    '/allatok': { page: 'animals.html', code: Animals },
    '/Keresés': { page: 'searching.html', code: null },
    '/rolunk': { page: 'aboutus.html', code: null },
    '/kapcsolat': { page: 'contact.html', code: null }
};

const loadPage = async (page: string): Promise<string> => {
    const response = await fetch(PAGES + page);
    return await response.text();
}

const dynamicClass = (code: any): void => {
    if (code != null) {
        const DynamicClassName = code;
        new DynamicClassName();
    }
}

const onNavClick = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    const pathName = target.dataset.href || '/';
    window.history.pushState({}, '', pathName);
    const data = await loadPage(routes[pathName].page);
    rootDiv.innerHTML = data;
    dynamicClass(routes[pathName].code);
}

window.addEventListener('load', async () => {
    const pathName = window.location.pathname;
    const data = await loadPage(routes[pathName].page);
    rootDiv.innerHTML = data;
    dynamicClass(routes[pathName].code);
});

window.addEventListener('popstate', async (event: PopStateEvent) => {
    const pathName = window.location.pathname;
    const data = await loadPage(routes[pathName].page);
    rootDiv.innerHTML = data;
    dynamicClass(routes[pathName].code);
});

navbarItems.forEach(item => {
    item.addEventListener('click', onNavClick as EventListener);
});