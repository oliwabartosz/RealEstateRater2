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
    const currentID = document.querySelector('h1').id;
    const currentNumber = document.querySelector('h2').id;
    const currentYear = new Date().getFullYear()

    const elements = ['yearBuilt', 'technology', 'legalStatus', 'balcony', 'elevator', 'basement', 'garage', 'garden', 'alarm', 'outbuilding', 'rent', 'modernization', 'kitchen', 'quality'];
    const answers = {};

    const deleteCheckbox = document.querySelector('input[name="delete"]');
    const isDeleteChecked = deleteCheckbox && deleteCheckbox.checked;
    answers.deleteAns = isDeleteChecked;

    for (const element of elements) {
        const result = await getSelectedValue(element);
        if (result.value === null && !isDeleteChecked) {
            result.element.scrollIntoView({behavior: 'smooth', block: 'center'});

            const existingError = document.getElementById('errorAnswer');
            if (existingError) {
                existingError.remove();
            }

            const errorDiv = document.createElement('div');
            errorDiv.id = 'errorAnswer';

            if (element === 'yearBuilt') {
                errorDiv.textContent = `❗ Nie podano roku budowy lub jest poza przedziałem lat 1700-${currentYear}`;
            } else if (element === 'rent') {
                errorDiv.textContent = `❗ Nie podano liczby lub wartość jest mniejsza od 0`;
            } else {
                errorDiv.textContent = `❗ Nie wybrano odpowiedzi!`;

            }

            result.parentElement.appendChild(errorDiv);

            return;
        }

        answers[`${element}Ans`] = result.value ? Number(result.value) : null;
    }

    const commentInput = document.querySelector('input[name="comments"]');
    answers['commentsAns'] = commentInput.value ? commentInput.value : null;


    try {
        const response = await fetch("http://localhost:3001/api/flats/answers/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                flatID: currentID,
                ...answers
            }),
        });
        window.location.href = `./${Number(currentNumber) + 1}`
    } catch (err) {
        console.log("Something went wrong");
    }

}

const postAnswerWithoutValidation = async () => {
    const currentYear = new Date().getFullYear()
    const currentID = document.querySelector('h1').id;
    const currentNumber = document.querySelector('h2').id;


    const elements = ['yearBuilt', 'technology', 'modernization', 'balcony', 'garden', 'kitchen', 'quality'];
    const answers = {};

    const deleteCheckbox = document.querySelector('input[name="delete"]');
    const isDeleteChecked = deleteCheckbox && deleteCheckbox.checked;
    answers.deleteAns = isDeleteChecked;

    for (const element of elements) {
        const result = await getSelectedValue(element);
        alert(result.value)

        answers[`${element}GPT`] = result.value ? Number(result.value) : null;
        answers[`${element}Summary`] = result.value ? "Oceniono przez użytkownika." : null;
    }


    try {
        const response = await fetch("http://localhost:3001/api/flats/quick-rate/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                flatID: currentID,
                ...answers
            }),
        });
        window.location.href = `./${Number(currentNumber) + 1}`
    } catch (err) {
        console.log("Something went wrong");
    }
}

function getSelectedValue(elementName, currentYear = new Date().getFullYear()) {
    if (elementName === 'yearBuilt') {

        const yearBuiltInput = document.querySelector('input[name="yearBuilt"]');
        if (Number(yearBuiltInput.value) < 1700 || Number(yearBuiltInput.value) > currentYear) return {
            value: null,
            element: yearBuiltInput,
            parentElement: yearBuiltInput.parentNode
        };
        return yearBuiltInput.value ? {value: yearBuiltInput.value, element: null} : {
            value: null,
            element: yearBuiltInput,
            parentElement: yearBuiltInput.parentNode
        };
    } else if (elementName === 'rent') {

        const rentInput = document.querySelector('input[name="rent"]');
        if (Number(rentInput.value) < -9) return {
            value: null,
            element: rentInput,
            parentElement: rentInput.parentNode
        };
        return rentInput.value ? {value: rentInput.value, element: null} : {
            value: null,
            element: rentInput,
            parentElement: rentInput.parentNode
        };
    } else {
        let radios = document.getElementsByName(elementName);
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return {value: radios[i].value, element: null};
            }
        }
        return {value: null, element: radios[0], parentElement: radios[0].parentNode.parentNode};
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

