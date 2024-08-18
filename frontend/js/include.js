// Function to load HTML content into an element by ID
function includeHTML() {
    document.querySelectorAll('[data-include]').forEach(async (element) => {
        const file = element.getAttribute('data-include');
        if (file) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const html = await response.text();
                    element.innerHTML = html;
                } else {
                    console.error(`Error loading ${file}: ${response.statusText}`);
                }
            } catch (error) {
                console.error(`Fetch error: ${error}`);
            }
        }
    });
}

// Load header and footer when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', includeHTML);
