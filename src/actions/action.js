export const getRate = (rates) => {
    return {
        type: 'GET_RATE',
        rates,
    }
};

export const getCurencies = (currencies) => {
    return {
        type: 'GET_CURRENCY',
        currencies
    }
}

