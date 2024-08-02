document.addEventListener('DOMContentLoaded', () => {
    fetchCatalogueData();
    addCheckboxListeners();
});

function fetchCatalogueData() {
    fetch('build/catalogue.json')
        .then(response => response.text())
        .then(data => {
            console.log('Raw data:', data);
            const sanitizedData = data.replace(/NaN/g, 'null');
            return JSON.parse(sanitizedData);
        })
        .then(jsonData => {
            console.log('Parsed data:', jsonData);
            displayCatalogueData(jsonData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayCatalogueData(data) {
    const tbody = document.querySelector('#catalogueTable tbody');
    if (!tbody) {
        console.error('Table body not found');
        return;
    }

    tbody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-column="Title">${item.Title || ''}</td>
            <td data-column="Author">${item.Author || ''}</td>
            <td data-column="Year">${item.Year || ''}</td>
            <td data-column="Series">${item.Series || ''}</td>
            <td data-column="Edition">${item.Edition || ''}</td>
            <td data-column="ISBN">${item.ISBN || ''}</td>
            <td data-column="Book Website"><a href="${item['Book Website'] || '#'}" target="_blank">${item['Book Website'] || ''}</a></td>
            <td data-column="Owner">${item.Owner || ''}</td>
            <td data-column="Format">${item.Format || ''}</td>
            <td data-column="Subject Matter">${item['Subject Matter'] || ''}</td>
            <td data-column="Shelf">${item.Shelf || ''}</td>
        `;
        tbody.appendChild(row);
    });

    updateColumnVisibility();
}

function addCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.column-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateColumnVisibility);
    });
}

function updateColumnVisibility() {
    const checkboxes = document.querySelectorAll('.column-checkbox');
    checkboxes.forEach(checkbox => {
        const column = checkbox.getAttribute('data-column');
        const isVisible = checkbox.checked;
        const header = document.querySelector(`th[data-column="${column}"]`);
        const cells = document.querySelectorAll(`td[data-column="${column}"]`);

        if (header) {
            header.style.display = isVisible ? '' : 'none';
        }
        cells.forEach(cell => {
            cell.style.display = isVisible ? '' : 'none';
        });
    });
}

function searchCatalogue() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#catalogueTable tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let match = false;
        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(input)) {
                match = true;
            }
        });
        row.style.display = match ? '' : 'none';
    });
}
