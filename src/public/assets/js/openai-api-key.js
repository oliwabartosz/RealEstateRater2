function storeOpenAIKey() {
    const apiKey = document.getElementById('apikey').value;
    removeOpenAIKey()
    document.cookie = `openai_api_key=${apiKey}; max-age=86400; path=/`;
    window.href = './';
}

function removeOpenAIKey() {
    document.cookie = `openai_api_key=; max-age=0; path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = parts.pop().split(';').shift();
        if (cookieValue && cookieValue.length >= 2) {
            return cookieValue.substring(0, 2) + '-******';
        } else {
            return cookieValue;
        }
    }
}

window.onload = function () {
    const apiKey = getCookie('openai_api_key');
    if (apiKey) {
        document.getElementById('apiKeyDisplay').textContent = apiKey;
    } else {
        document.getElementById('apiKeyDisplay').textContent = 'nie ustawiono';
    }
}