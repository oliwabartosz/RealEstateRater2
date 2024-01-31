const replaceAllWithAIAnswers = () => {
    const elements = ['technology', 'legalStatus', 'balcony', 'elevator', 'basement', 'garage', 'garden', 'alarm', 'outbuilding', 'modernization', 'kitchen', 'quality'];
    const answers = {};

    for (const element of elements) {
        const elementAI = `ai-${element}-rate`;
        const rate = getValue(elementAI);
        checkRadioButton(rate, element);
    }
}

const replaceOneWithAIAnswer = (elementName) => {
    const rate = getValue(`ai-${elementName}-rate`);
    checkRadioButton(rate, elementName)

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

