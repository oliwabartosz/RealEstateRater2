const site = 'http://localhost:3000'

async function postData(data) {
    try {
        const response = await fetch(`${site}/rer/flats/answers/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
        const offerNumber = getOfferNumber()
        // goToNextOffer(offerNumber)
    } catch (error) {
        console.error("Error:", error);
    }
}

function getData() {
    const answers = {}

    // Get offer number
    const offerNumber = getOfferNumber()

    // Get username
    const username = document.querySelector('span#username').textContent;

    // Get data
    radioButtonNames = ['technology', 'lawStatus', 'balcony', 'elevator', 'basement', 'garage', 'garden', 'alarm', 'outbuilding',
        'modernization', 'kitchen', 'quality']
    textFieldNames = ['rent', 'comments']

    const radioButtons = radioButtonNames.flatMap(name => document.querySelectorAll(`input[type="radio"][name="${name}"]`));
    const textFields = textFieldNames.flatMap(name => document.querySelectorAll(`input[name='${name}']`));

    // Get status of delete offer checkbox
    const deleteCheckboxStatus = isCheckboxChecked('delete')

    if (!deleteCheckboxStatus) {

    }

    answers["number"] = offerNumber
    collectRadioValues(radioButtons, answers);
    collectTextValues(textFields, answers);
    answers["user"] = username
    answers["rateStatus"] = "done"
    deleteCheckboxStatus ? answers['deleteAns'] = 'tak' : answers['deleteAns'] = 'nie'

    return answers
}
// Get offer number from HTML string
function getOfferNumber() {
    const offerElement = document.querySelector('h1#offer-no');
    const offerNumberHTML = offerElement ? offerElement.outerHTML : null;
    if (offerNumberHTML) {
        const regex = /#(\d+)/;
        const match = offerNumberHTML.match(regex);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
}

// <h1 style="background-color:rgb(255, 99, 71);">...</h1>
function collectRadioValues(radioButtons, answers) {
    radioButtons.forEach((radioButton, i) => {
        let isChecked = false; // Track if any option is checked
        radioButton.forEach(radio => {
            if (radio.checked) {
                const name = radio.name + "Ans";
                const value = radio.value;
                answers[name] = value;
                isChecked = true;
            }
        });

        const questionDiv = radioButton[i].closest('.question');
        console.log(radioButton)
        if (!isChecked) {
            // If no option is checked, highlight the parent div in red
            questionDiv.style.color = "red";
        } else {
            // If at least one option is checked, remove the red highlight from the parent div
            questionDiv.style.color = "";
        }
    });
}

// Collect text field values
function collectTextValues(textFields, answers) {
    textFields.forEach(textField => {
        textField.forEach(text => {
            if (text.value) {
                const name = text.name + "Ans";
                const value = text.value;
                answers[name] = value;
            }
        });
    });
}

function isCheckboxChecked(checkboxName) {
    const checkbox = document.querySelector(`input[type="checkbox"][name="${checkboxName}"]`);
    return checkbox.checked;
}

function goToNextOffer(number) {
    const nextNumber = Number(number) + 1;
    window.location.href = `${site}/rer/flats/${nextNumber}`;
}