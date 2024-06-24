const replaceAllWithAIAnswers = () => {
  const elements = [
    'technology',
    'legalStatus',
    'balcony',
    'elevator',
    'basement',
    'garage',
    'garden',
    'monitoring',
    'outbuilding',
    'rent',
    'modernization',
    'kitchen' /*'quality' */,
  ];
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
};

const replaceOneWithAIAnswer = (elementName) => {
  const rate = getValue(`ai-${elementName}-rate`);
  checkRadioButton(rate, elementName);
};

const alwaysReplaceWithAIAnswers = () => {
  document
    .getElementById('flexSwitchCheckDefault')
    .addEventListener('change', function () {
      if (this.checked) {
        document.cookie = 'alwaysAI=on; path=/; SameSite=Lax';
      } else {
        document.cookie = 'alwaysAI=off; path=/; SameSite=Lax';
      }
    });
};

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

    console.log(elementName);

    if (rate === -9) {
      const year = Number(document.getElementsByName('yearBuilt')[0].value);
      const numberOfFloors = Number(
        document.querySelector('.numberOfFloors').textContent.match(/\d+/)[0],
      );

      if (elementName === 'technology') {
        if (year < 1960) {
          radios[0].checked = true;
        }
        if (year >= 1990) {
          radios[1].checked = true;
        }
        if (year >= 1960 && year < 1990) {
          radios[2].checked = true;
        }
      }

      if (numberOfFloors > 15) radios[3].checked = true;

      if (elementName === 'legalStatus') {
        const technologyRadios = document.querySelectorAll(
          'input[name="technology"]:checked',
        );
        let selectedTechnologyValue = null;

        if (technologyRadios.length > 0) {
          selectedTechnologyValue = Number(technologyRadios[0].value);
        }

        if (selectedTechnologyValue === 7) {
          radios[1].checked = true;
        } else {
          radios[0].checked = true;
        }
      }

      if (elementName === 'modernization') {
        console.log(radios);
        radios[2].checked = true;
    }

    if (elementName === 'rent') {
        const rentFromDb = Number(document.getElementsByName('rent')[0].value);

        if (!isNaN(rentFromDb)) {
          document.getElementsByName('rent')[0].value = rentFromDb;
        }
      }
      
      if (
        [
          'balcony',
          'elevator',
          'basement',
          'garage',
          'garden',
          'monitoring',
          'outbuilding',
          'kitchen',
        ].includes(elementName)
      ) {
        radios[1].checked = true;
      }

     
    }
  }
}

function getValue(elementName) {
  const nodes = document.getElementsByClassName(elementName);
  if (!(typeof nodes[0] === 'undefined')) {
    return Number(nodes[0].innerText.replace('Ocena GPT: ', ''));
  }
}

window.onload = function () {
  const cookies = document.cookie.split('; ');
  const alwaysAICookie = cookies.find((row) => row.startsWith('alwaysAI='));
  const alwaysAI = alwaysAICookie ? alwaysAICookie.split('=')[1] : null;
  if (alwaysAI) {
    if (alwaysAI === 'on') {
      document.getElementById('flexSwitchCheckDefault').checked = true;
      replaceAllWithAIAnswers();
    }
  }
};
