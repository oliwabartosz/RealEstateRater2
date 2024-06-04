const selectAllCheckboxes = (header) => {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });

  header.setAttribute('onclick', 'unselectAllCheckboxes(this)');
};

const unselectAllCheckboxes = (header) => {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  header.setAttribute('onclick', 'selectAllCheckboxes(this)');
};
