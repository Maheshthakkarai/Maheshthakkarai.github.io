// Function to apply the theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// Get saved theme from localStorage or default to system preference
let savedTheme = localStorage.getItem('color-theme');
if (!savedTheme) {
    savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply the theme immediately
applyTheme(savedTheme);

// Add listener for the toggle button after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        // Set the toggle's initial state based on the applied theme
        themeToggleBtn.checked = document.documentElement.classList.contains('dark');

        // Add event listener for the toggle
        themeToggleBtn.addEventListener('change', function() {
            const theme = this.checked ? 'dark' : 'light';
            localStorage.setItem('color-theme', theme);
            applyTheme(theme);
        });
    }
});