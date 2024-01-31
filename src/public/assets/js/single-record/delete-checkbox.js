function changeRadioButtonsRequired(arr, bool) {
    const arrButtons = arr.flatMap(name => Array.from(document.querySelectorAll(`input[type="radio"][name="${name}"]`)));

    arrButtons.forEach(btn => {
        btn.required = bool;
    });
}

const deleteCheckBox = document.getElementById("delete")
const radioButtonNamesFlats = ['technology', 'lawStatus', 'balcony', 'elevator', 'basement', 'garage', 'garden', 'alarm', 'outbuilding', 'modernization', 'kitchen', 'quality'];

deleteCheckBox.addEventListener("change", function () {
    if (deleteCheckBox.checked) {
        changeRadioButtonsRequired(radioButtonNamesFlats, false)
    } else {
        changeRadioButtonsRequired(radioButtonNamesFlats, true)
    }
});