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
    if (response.status === 400 || response.status === 401 ) {
        showError();
    } else {
        console.log('Login request failed.');
    }
};

const handleGeneralError = () => {
    console.log('An error occurred during login');
};
