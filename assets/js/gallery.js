document.addEventListener('DOMContentLoaded', () => {
    const appsGrid = document.getElementById('apps-grid');

    if (appsGrid && typeof apps !== 'undefined') {
        appsGrid.innerHTML = ''; // Clear existing content
        apps.forEach(app => {
            const appCard = `
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
            appsGrid.innerHTML += appCard;
        });
    }
});
