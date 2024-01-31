function goToNextOffer(number, lastNumber) {
    if (number < lastNumber) {
        const nextNumber = Number(number) + 1;
        window.location.href = `./${nextNumber}`;
    } else {
        window.location.href = `./`
    }

}

function goToPreviousOffer(number) {
    if (number > 1) {
        const previousNumber = Number(number) - 1;
        window.location.href = `./${previousNumber}`;
    } else {
        window.location.href = `./`
    }


}