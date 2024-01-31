const replaceWithAIAnswers = () => {
    const elements = ['technology', 'legalStatus', 'balcony', 'elevator', 'basement', 'garage', 'garden', 'alarm', 'outbuilding', 'modernization', 'kitchen', 'quality'];
    const answers = {};

    for (const element of elements) {
        const elementAI = `ai-${element}-rate`;
        const rate = getValue(elementAI);
        checkRadioButton(rate, element);
    }
}

function checkRadioButton(rate, element) {
    let radios = document.getElementsByName(element);

    for (const radio of radios) {
        if (radio.value === String(rate)) {
            radio.checked = true;
        }
    }


}


function getValue(elementName) {
        const nodes = document.getElementsByClassName(elementName);
        if (!(typeof nodes[0] === "undefined")){
            return Number(nodes[0].innerText.replace("Ocena GPT: ", ""));
        }


}