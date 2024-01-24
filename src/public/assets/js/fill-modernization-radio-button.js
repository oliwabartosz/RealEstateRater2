// If technology is clicked as 'Udoskonalna', modernization gets the 'Puste' value.

const radioTechnology2 = document.getElementById('technology_2');
const radioModernization1 = document.getElementById('modernization_1');
const radioModernization2 = document.getElementById('modernization_2');
const radioModernization3 = document.getElementById('modernization_3');
const radioModernizationUnClick = document.getElementById('modernization_unclick');

radioTechnology2.addEventListener('click', function () {
    radioModernization3.checked = true;
});

function unclickRadioButton() {
    radioModernization1.checked = false;
    radioModernization2.checked = false;
    radioModernization3.checked = false;
    radioModernizationUnClick.checked = false;
}
