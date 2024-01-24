selectedRecordsIDs = () => {
    let selectedRecords = document.querySelectorAll('.form-check-input:checked');
    let selectedRecordsArray = Array.from(selectedRecords);
    let selectedIds = selectedRecordsArray.map(record => record.value);

    return selectedIds;

}