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
        }

    } catch (error) {
        handleGeneralError();
    }
};

const handleErrorResponse = (response) => {
        if (response.status === 400 || response.status === 401) {
            showError('Wpisano niepoprawne login lub hasło!');
        } else if (response.status === 429) {
            showError('Za dużo prób. Spróbuj za 60 sekund.');
        } else {
            showError('Coś poszło nie tak.');
        }
    }
;

const handleGeneralError = () => {
    console.log('An error occurred during login');
};
