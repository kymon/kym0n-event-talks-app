document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('categorySearch');
    const talkRows = document.querySelectorAll('.talk-row'); // Each row in the schedule table

    searchInput.addEventListener('keyup', (event) => {
        const searchTerm = event.target.value.toLowerCase();

        talkRows.forEach(row => {
            // Check if it's a lunch break row, which should always be visible
            if (row.classList.contains('lunch-break')) {
                row.style.display = ''; // Ensure lunch break is always visible
                return;
            }

            const categoriesElement = row.querySelector('.category');
            if (categoriesElement) {
                const categoriesText = categoriesElement.textContent.toLowerCase();
                if (categoriesText.includes(searchTerm)) {
                    row.style.display = ''; // Show the talk
                } else {
                    row.style.display = 'none'; // Hide the talk
                }
            }
        });
    });
});
