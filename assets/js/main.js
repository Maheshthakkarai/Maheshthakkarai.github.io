document.addEventListener('DOMContentLoaded', () => {
    const appsGrid = document.getElementById('apps-grid');
    const searchInput = document.getElementById('searchInput');
    const categoryDropdownButton = document.getElementById('categoryDropdownButton');
    const categoryDropdown = document.getElementById('categoryDropdown');
    let selectedTags = [];
    let selectedCategory = '';

    // Toggle dropdown visibility
    if (categoryDropdownButton && categoryDropdown) {
        categoryDropdownButton.addEventListener('click', () => {
            categoryDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!categoryDropdown.contains(event.target) && !categoryDropdownButton.contains(event.target)) {
                categoryDropdown.classList.add('hidden');
            }
        });
    }

    function renderApps(appsToRender) {
        appsGrid.innerHTML = '';
        appsToRender.forEach(app => {
            const appFileName = app.url.split('/').pop();
            const appCard = `
                <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <img src="../${app.image}" alt="${app.title}" class="w-full h-48 object-cover rounded-md">
                    <h3 class="text-xl font-bold mt-4">${app.title}</h3>
                    <p class="mt-2">${app.description}</p>
                    <div class="mt-4">
                        <a href="app.html?app=${appFileName}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            View App
                        </a>
                    </div>
                </div>
            `;
            appsGrid.innerHTML += appCard;
        });
    }

    function filterApps() {
        const searchTerm = searchInput.value.toLowerCase();

        const filteredApps = apps.filter(app => {
            const titleMatch = app.title.toLowerCase().includes(searchTerm);
            const descriptionMatch = app.description.toLowerCase().includes(searchTerm);
            const categoryMatch = selectedCategory ? app.category === selectedCategory : true;
            const tagsMatch = true;

            return (titleMatch || descriptionMatch) && categoryMatch && tagsMatch;
        });

        renderApps(filteredApps);
    }

    function populateFilters() {
        const categories = ["", ...new Set(apps.map(app => app.category))]; // Add empty string for "All Categories"
        categoryDropdown.innerHTML = ''; // Clear existing items

        categories.forEach(category => {
            const categoryName = category === "" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1);
            const categoryItem = document.createElement('a');
            categoryItem.href = "#";
            categoryItem.classList.add('block', 'px-4', 'py-2', 'text-gray-800', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-600', 'category-item');
            categoryItem.dataset.category = category;
            categoryItem.textContent = categoryName;
            categoryItem.addEventListener('click', (e) => {
                e.preventDefault();
                selectedCategory = category;
                categoryDropdownButton.querySelector('span').textContent = categoryName;
                categoryDropdown.classList.add('hidden');
                filterApps();
            });
            categoryDropdown.appendChild(categoryItem);
        });

        }

    searchInput.addEventListener('input', filterApps);

    populateFilters();
    renderApps(apps);
});