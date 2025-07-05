(function() {
    // Function to apply the theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    // Immediately apply the theme on initial load
    let savedTheme = localStorage.getItem('color-theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
        }
    }

    // Add listener after the DOM is loaded to handle the toggle button
    document.addEventListener('DOMContentLoaded', () => {
        const themeToggleBtn = document.getElementById('theme-toggle');
        if (themeToggleBtn) {
            // Set the toggle's initial state based on the current theme
            if (document.documentElement.classList.contains('dark')) {
                themeToggleBtn.checked = true;
            }

            // Add event listener for the toggle
            themeToggleBtn.addEventListener('change', function() {
                const theme = this.checked ? 'dark' : 'light';
                localStorage.setItem('color-theme', theme);
                applyTheme(theme);
            });
        }
    });
})();
