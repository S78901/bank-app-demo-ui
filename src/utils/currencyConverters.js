// Utils to convert values to currency types by locale

export const convertToUSD = (numVal) => {
    return Number(numVal).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
}

export const convertToEUR = (numVal) => {
    return Number(numVal).toLocaleString('en-EU', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });
}

export const convertToGBP = (numVal) => {
    return Number(numVal).toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2
    });
}