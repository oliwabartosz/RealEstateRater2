const replaceAllWithAIAnswers = () => {
    const elements = ['technology', 'legalStatus', 'balcony', 'elevator', 'basement', 'garage', 'garden', 'alarm', 'outbuilding', 'rent', 'modernization', 'kitchen', 'quality'];
    const answers = {};

    for (const element of elements) {
        const elementAI = `ai-${element}-rate`;
        const rate = getValue(elementAI);

        if (element !== 'rent') {
            checkRadioButton(rate, element);
        } else {
            writeAIRateToRentInput(rate);
        }
    }
}

const replaceOneWithAIAnswer = (elementName) => {
    const rate = getValue(`ai-${elementName}-rate`);
    checkRadioButton(rate, elementName)

}

const alwaysReplaceWithAIAnswers = () => {
    document.getElementById('flexSwitchCheckDefault').addEventListener('change', function () {
        if (this.checked) {
            document.cookie = "alwaysAI=on; path=/; SameSite=Lax";
        } else {
            document.cookie = "alwaysAI=off; path=/; SameSite=Lax";
        }
    });
}

function writeAIRateToRentInput(property) {
    const rentInput = document.querySelector('input[name="rent"]');
    rentInput.value = property;

}

function checkRadioButton(rate, elementName) {
    let radios = document.getElementsByName(elementName);

    for (const radio of radios) {
        if (radio.value === String(rate)) {
            radio.checked = true;
        }
    }
}

function getValue(elementName) {
    const nodes = document.getElementsByClassName(elementName);
    if (!(typeof nodes[0] === "undefined")) {
        return Number(nodes[0].innerText.replace("Ocena GPT: ", ""));
    }
}

window.onload = function () {
    const cookies = document.cookie.split('; ');
    const alwaysAICookie = cookies.find(row => row.startsWith('alwaysAI='));
    const alwaysAI = alwaysAICookie ? alwaysAICookie.split('=')[1] : null;
    if (alwaysAI) {
        if (alwaysAI === 'on') {
            document.getElementById('flexSwitchCheckDefault').checked = true;
            replaceAllWithAIAnswers();
        }
    }


};