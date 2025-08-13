document.addEventListener('DOMContentLoaded', () => {
    const appsGrid = document.getElementById('apps-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    let apps = [];

    // Fetch app data
    fetch('../assets/data/apps.json')
        .then(response => response.json())
        .then(data => {
            apps = data;
            if (appsGrid) {
                // Populate categories
                const categories = [...new Set(apps.map(app => app.category))];
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    categoryFilter.appendChild(option);
                });

                // Initial render
                renderApps(apps);

                // Event Listeners
                searchInput.addEventListener('keyup', () => filterApps());
                categoryFilter.addEventListener('change', () => filterApps());
            }
        })
        .catch(error => console.error('Error fetching app data:', error));

    function renderApps(filteredApps) {
        appsGrid.innerHTML = ''; // Clear existing content
        if (filteredApps.length === 0) {
            appsGrid.innerHTML = '<p class="text-center text-xl col-span-full">No apps found matching your criteria.</p>';
            return;
        }
        let content = '';
        filteredApps.forEach(app => {
            content += `
                <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center flex flex-col">
                    <img src="${app.image}" alt="${app.title}" class="w-full h-48 object-cover rounded-md mx-auto">
                    <h3 class="text-xl font-bold mt-4">${app.title}</h3>
                    <p class="mt-2 flex-grow overflow-hidden">${app.description}</p>
                    <div class="mt-4">
                        <a href="${app.url}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" target="_blank" rel="noopener noreferrer">
                            View App
                        </a>
                    </div>
                </div>
            `;
        });
        appsGrid.innerHTML = content;
    }

    function filterApps() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filtered = apps.filter(app => {
            const matchesSearch = app.title.toLowerCase().includes(searchTerm) ||
                                  app.description.toLowerCase().includes(searchTerm) ||
                                  app.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        renderApps(filtered);
    }
});
