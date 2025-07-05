document.addEventListener('DOMContentLoaded', () => {
    const featuredGrid = document.getElementById('featured-apps-grid');

    // You can define which apps to feature here by their title
    const featuredAppTitles = ["Fuel Calculator", "Global TV"]; // Add the titles of your best apps

    const featuredApps = apps.filter(app => featuredAppTitles.includes(app.title));

    function renderFeaturedApps() {
        featuredGrid.innerHTML = '';
        featuredApps.forEach(app => {
            const appFileName = app.url.split('/').pop();
            const appCard = `
                <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                    <img src="${app.image}" alt="${app.title}" class="w-full h-48 object-cover rounded-md mx-auto">
                    <h3 class="text-xl font-bold mt-4">${app.title}</h3>
                    <p class="mt-2 h-16 overflow-hidden">${app.description}</p>
                    <div class="mt-4">
                        <a href="/apps/app.html?app=${appFileName}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            View App
                        </a>
                    </div>
                </div>
            `;
            featuredGrid.innerHTML += appCard;
        });
    }

    renderFeaturedApps();
});