const sendLogin = async () => {
    hideError();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("http://localhost:3001/api/auth/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({email, password}),
        });

        if (!response.ok) {
            handleErrorResponse(response);

        } else {
            window.location.href = window.location.origin;
        }

    } catch (error) {
        handleGeneralError();
    }
};

const deleteRecords = async (realEstateType, ids) => {
    try {
        const response = await fetch(`http://localhost:3001/api/${realEstateType}/`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({ids}),
        });

        location.reload();

        if (!response.ok) {
            handleErrorResponse(response);
        }

    } catch (error) {
        handleGeneralError();
    }

};

const logout = async () => {

    const response = await fetch("http://localhost:3001/api/auth/logout", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',

    });
    window.location.href = window.location.origin;
};

const handleErrorResponse = (response) => {
    if (response.status === 400 || response.status === 401) {
        showError('Wpisano złe dane!');
    } else if (response.status === 429) {
        showError('Za dużo prób. Spróbuj za 60 sekund.');
    } else {
        showError('Coś poszło nie tak.');
    }
};

const handleGeneralError = () => {
    console.log('An error occurred.');
};

