document.addEventListener('DOMContentLoaded', () => {
    fetchCatalogueData();
});

function fetchCatalogueData() {
    fetch('catalogue.json')
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

        for (const key in item) {
            const cell = document.createElement('td');
            cell.textContent = item[key]; 
            row.appendChild(cell);
        }

        tbody.appendChild(row); 
    });
}

tbody.innerHTML = ''; 
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.Title || ''}</td>
            <td>${item.Author || ''}</td>
            <td>${item.Year || ''}</td>
            <td>${item.Series || ''}</td>
            <td>${item.Edition || ''}</td>
            <td>${item.ISBN || ''}</td>
            <td><a href="${item['Book Website'] || '#'}" target="_blank">${item['Book Website'] || ''}</a></td>
            <td>${item.Owner || ''}</td>
            <td>${item.Format || ''}</td>
            <td>${item['Subject Matter'] || ''}</td>
            <td>${item.Shelf || ''}</td>
        `;
        console.log('Adding row:', row); 
        tbody.appendChild(row);
    });


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
