function showError(errorText) {
  document.getElementById('errorBox').style.display = 'block';
  document.getElementById('errorBox').innerText = errorText;
}

function hideError() {
  document.getElementById('errorBox').style.display = 'none';
}
