
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');

// Restore saved theme
toggle.checked = root.dataset.theme === 'dark';

// Save theme when changed
toggle.addEventListener('change', () => {
    const theme = toggle.checked ? 'dark' : 'light';

    const updateTheme = () => {
        root.dataset.theme = theme;

        try {
            localStorage.setItem('theme', theme);
        } catch {}
    };

    if (document.startViewTransition) {
        document.startViewTransition(updateTheme);
    } else {
        updateTheme();
    }
    
});
