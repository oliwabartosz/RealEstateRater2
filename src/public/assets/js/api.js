const sendLogin = async () => {
    hideError();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("http:/localhost:3001/api/auth/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({email, password}),
        });

        console.log(response);

        if (!response.ok) {
            handleErrorResponse(response);
        }

        return await response.json();
    } catch (error) {
        handleGeneralError(error);
    }
};

const handleErrorResponse = (response) => {
    if (response.status === 401) {
        showError();
    } else {
        console.log('Login request failed:', response);
    }
};

const handleGeneralError = (error) => {
    console.log('An error occurred during login');
};
