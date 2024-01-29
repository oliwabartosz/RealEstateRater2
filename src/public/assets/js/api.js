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

        console.log(response);

        if (!response.ok) {
            handleErrorResponse(response);

        } else {
            window.location.href = window.location.origin;
        }

    } catch (error) {
        handleGeneralError();
    }
};

const postAnswer = async () => {
    function getSelectedValue(elementName) {
        let radios = document.getElementsByName(elementName);

        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return {value: radios[i].value, element: null};
            }
        }

        // If no radio button is checked, return the first radio button and its grandparent element
        return {value: null, element: radios[0], parentElement: radios[0].parentNode.parentNode};
    }

    const id = document.querySelector('h1').id;
    const elements = ['technology', 'legalStatus', 'balcony', 'elevator', 'basement', 'garage', 'garden', 'alarm', 'outbuilding', 'modernization', 'kitchen', 'quality', 'delete'];
    const answers = {};

    // Check if the 'delete' checkbox is checked
    const deleteCheckbox = document.querySelector('input[name="delete"]');
    const isDeleteChecked = deleteCheckbox && deleteCheckbox.checked;

    for (const element of elements) {
        const result = await getSelectedValue(element);

        if (result.value === null && !isDeleteChecked) {
            // Scroll to the radio button
            result.element.scrollIntoView({behavior: 'smooth', block: 'center'});

            // If an error message already exists, remove it
            const existingError = document.getElementById('errorAnswer');
            if (existingError) {
                existingError.remove();
            }

            // Create a new div element for the error message
            const errorDiv = document.createElement('div');
            errorDiv.id = 'errorAnswer'; // Assign the id
            errorDiv.textContent = `❗ Nie wybrano odpowiedzi!`;

            // Append the error message to the grandparent element of the radio buttons
            result.parentElement.appendChild(errorDiv);

            return;
        }

        answers[`${element}Ans`] = Number(result.value);
    }

    try {
        const response = await fetch("http://localhost:3001/api/flats/answers/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                flatID: id,
                ...answers
            }),
        });

        const recordNumber = document.querySelector('h2').id;
        window.location.href = `./${Number(recordNumber) + 1}`;
    } catch(error) {
        console.log(error)
    }

}
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

