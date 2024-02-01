const sortColumn = (tableClass, columnIndex) => {
    const table = document.querySelector(tableClass);
    const rows = Array.from(table.rows).slice(1); // Exclude the header row
    let sortedRows;

    // Determine the current sort order and sort the rows accordingly
    if (table.dataset.sortOrder === 'asc') {
        sortedRows = rows.sort((a, b) => a.cells[columnIndex].textContent.localeCompare(b.cells[columnIndex].textContent));
        table.dataset.sortOrder = 'desc';
    } else {
        sortedRows = rows.sort((a, b) => b.cells[columnIndex].textContent.localeCompare(a.cells[columnIndex].textContent));
        table.dataset.sortOrder = 'asc';
    }

    // Remove the current rows and add the sorted rows
    rows.forEach(row => table.deleteRow(row.rowIndex));
    sortedRows.forEach(row => table.appendChild(row));
};
