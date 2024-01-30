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
    const currentYear = new Date().getFullYear()
    function getSelectedValue(elementName) {
        if (elementName === 'year-built') {

            const yearBuiltInput = document.querySelector('input[name="year-built"]');
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

    const id = document.querySelector('h1').id;
    const elements = ['year-built', 'technology', 'legalStatus', 'balcony', 'elevator', 'basement', 'garage', 'garden', 'alarm', 'outbuilding', 'modernization', 'kitchen', 'quality', 'delete'];
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

            if (element === 'year-built') {
                errorDiv.textContent = `❗ Nie podano roku budowy lub jest poza przedziałem lat 1700-${currentYear}`;
            } else {
                errorDiv.textContent = `❗ Nie wybrano odpowiedzi!`;

            }

            result.parentElement.appendChild(errorDiv);

            return;
        }

        answers[`${element}Ans`] = Number(result.value);
    }


    const response = await fetch("http://localhost:3001/api/flats/answers/", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            flatID: id,
            ...answers
        }),
    });
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

