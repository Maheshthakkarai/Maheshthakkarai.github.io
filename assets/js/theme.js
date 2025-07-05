document.addEventListener('DOMContentLoaded', () => {
    console.log("theme.js loaded and executing.");
    const themeToggleBtn = document.getElementById('theme-toggle');
    console.log("themeToggleBtn element:", themeToggleBtn);

    // Check if the button exists before trying to use it
    if (themeToggleBtn) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let currentTheme = localStorage.getItem('color-theme');

        // If no theme is stored, use system preference
        if (!currentTheme) {
            currentTheme = prefersDark ? 'dark' : 'light';
        }

        if (currentTheme === 'dark') {
            document.documentElement.classList.add('dark');
            themeToggleBtn.checked = true;
            console.log("Initial theme set to Dark.");
        } else {
            document.documentElement.classList.remove('dark');
            themeToggleBtn.checked = false;
            console.log("Initial theme set to Light.");
        }
        localStorage.setItem('color-theme', currentTheme); // Ensure localStorage is set on initial load
        console.log("Initial localStorage color-theme:", localStorage.getItem('color-theme'));

        themeToggleBtn.addEventListener('change', function() {
            console.log("Toggle changed. Checkbox checked state:", this.checked);
            if (this.checked) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
            console.log("Theme toggled. Current HTML classList:", document.documentElement.classList.contains('dark') ? 'dark' : 'light');
            console.log("Current localStorage color-theme:", localStorage.getItem('color-theme'));
        });
    } else {
        console.error("Error: Theme toggle button with ID 'theme-toggle' not found in the DOM.");
    }
});