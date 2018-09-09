const moment = require('moment');

export default (state = [], action) => {
    switch (action.type) {
        case 'GET_RATE':
            return action.rates.map(rate => {
                return { date: moment(rate.Date).format('MMMM DD'), rate: rate.Cur_OfficialRate }
            });
        default:
            return state;
    }
};