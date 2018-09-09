export default (state = [], action) => {
    switch (action.type) {
        case 'GET_CURRENCY':
            return action.currencies; 
        default:
            return state;
    }
};