async function storeOpenAIKey() {
  const apiKey = document.getElementById('apikey').value;
  const response = await fetch(`${process.env.DOMAIN}/gpt/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ apiKey }),
  });
  if (response.ok) {
    window.location.reload();
  } else {
    handleErrorResponse(response);
  }
}

async function removeOpenAIKey() {
  const response = await fetch(`${process.env.DOMAIN}/gpt/remove-key`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    window.location.reload();
  }
}

async function getCookie() {
  const response = await fetch(`${process.env.DOMAIN}/gpt/get-key`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const data = await response.json();
    return data.apiKey;
  }
}

window.onload = async function () {
  let apiKey = await getCookie();
  if (apiKey) {
    apiKey = apiKey.slice(0, 2) + '-********************************';
    document.getElementById('apiKeyDisplay').textContent = apiKey;
  } else {
    document.getElementById('apiKeyDisplay').textContent = 'nie ustawiono';
  }
};
