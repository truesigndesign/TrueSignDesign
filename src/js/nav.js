// nav.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Navigation script initialized.');

    // Event delegation for the hamburger toggle
    document.addEventListener('click', (event) => {
        const toggleButton = event.target.closest('.cs-toggle');
        if (toggleButton) {
            const CSbody = document.querySelector("body");
            const CSnavbarMenu = document.querySelector("#cs-navigation");
            toggleButton.classList.toggle("cs-active");
            CSnavbarMenu.classList.toggle("cs-active");
            CSbody.classList.toggle("cs-open");
            // Run the function to check the aria-expanded value
            ariaExpanded();
        }

        // Event delegation for dropdowns (if any)
        const dropdownToggle = event.target.closest('.cs-dropdown');
        if (dropdownToggle) {
            dropdownToggle.classList.toggle('cs-active');
        }
    });

    // Checks the value of aria-expanded on the cs-ul and changes it accordingly
    function ariaExpanded() {
        const csUL = document.querySelector('#cs-expanded');
        if (!csUL) {
            console.warn('#cs-expanded element not found.');
            return;
        }

        const csExpanded = csUL.getAttribute('aria-expanded');

        if (csExpanded === 'false') {
            csUL.setAttribute('aria-expanded', 'true');
        } else {
            csUL.setAttribute('aria-expanded', 'false');
        }
    }

    // Highlight the active navigation link based on the current URL
    highlightActiveLink();
});

// Function to highlight the active link
function highlightActiveLink() {
    const navLinks = document.querySelectorAll('.cs-li-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('cs-active');
        } else {
            link.classList.remove('cs-active');
        }
    });
}

// Optional: Re-highlight active link on popstate (browser navigation)
window.addEventListener('popstate', () => {
    highlightActiveLink();
});
