document.addEventListener('DOMContentLoaded', () => {
    const appTitle = document.getElementById('app-title');
    const appHeaderTitle = document.getElementById('app-header-title');
    const appDescription = document.getElementById('app-description');
    const appIframe = document.getElementById('app-iframe');

    // Get the app title from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const appUrl = urlParams.get('app');

    // Find the corresponding app in our apps array
    const app = apps.find(a => a.url === `webapps/${appUrl}`);

    if (app) {
        // Update the page with the app's data
        appTitle.textContent = app.title;
        appHeaderTitle.textContent = app.title;
        appDescription.textContent = app.description;
        appIframe.src = `../${app.url}`;
    } else {
        // Handle case where app is not found
        appHeaderTitle.textContent = 'App not found';
        appDescription.textContent = 'The requested webapp could not be found.';
    }
});