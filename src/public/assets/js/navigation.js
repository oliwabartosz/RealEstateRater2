function goToNextOffer(number) {
    const nextNumber = Number(number) + 1;
    window.location.href = `./${nextNumber}`;
}

function goToPreviousOffer(number) {
    const previousNumber = Number(number) - 1;
    window.location.href = `./${previousNumber}`;
}