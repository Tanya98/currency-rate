import { httpGet } from '../helpers/http-helper';

const API_BASE_URL = 'http://www.nbrb.by/API/ExRates';

export const loadCurrencies = () => {
    return httpGet(API_BASE_URL + '/currencies')
        .then(response=> response, error => alert(`Rejected: ${error}`));
}

export const loadRate = (startDate, endDate, currency) => {
    return httpGet(API_BASE_URL + `/rates/dynamics/${currency}?startDate=${startDate}&endDate=${endDate}`)
        .then(response => response, error => alert(`Rejected: ${error}`));
}