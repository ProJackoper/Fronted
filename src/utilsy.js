export function czyPoprawnyNumer(e) {
    const isNumericKey = !isNaN(parseInt(e.key, 10));

    if (!isNumericKey) {
        e.preventDefault();
        showErrorMessage('Użyto niewłaściwego klawisza! Tylko cyfry są dozwolone.');
    }

    return isNumericKey;
}

export function czyNazwaIstnieje(val) {
    if(val.length > 0)
    return true;
    return false;
}

export function czyGodzinaJestPrawidlowa(val) {
    if(val.length >0 && val.length <=2 && val <=23)
    return true;
    return false;
}

export function czyMinutaJestPrawidlowa(val) {
    if(val.length >0 && val.length <=2 && val <=59)
    return true;
    return false;
}

export function czyPoprawnyNumer1(e) {
    const isNumericKey = /^\d$/.test(e.key);
    if (!isNumericKey) {
        e.preventDefault();
        showErrorMessage('Użyto niewłaściwego klawisza! Tylko cyfry są dozwolone.');
    }
    return isNumericKey;
}

export function godzinaMinutaDoSekund(g, m, s) {
    return g * 3600 + m * 60 + s;
}

export function sekundyDoGodzinMinutSekund(s) {
    let tmpSekundy = s;
    const godziny = Math.floor(tmpSekundy/3600).toString().padStart(2, 0);
    tmpSekundy -= godziny * 3600;
    const minuty = Math.floor(tmpSekundy/60).toString().padStart(2, 0);
    tmpSekundy -= minuty * 60;
    const sekundy = tmpSekundy.toString().padStart(2, 0);
    return `${godziny}:${minuty}:${sekundy}`
}

function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;

    document.body.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 2000); 
}
