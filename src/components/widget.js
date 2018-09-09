import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import { loadCurrencies, loadRate } from '../api-services/services';
import { getCurencies, getRate } from '../actions/action';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import 'react-dates/initialize';
import '../helpers/http-helper';
import 'react-dates/lib/css/_datepicker.css';
import '../styles/index.scss';
const moment = require('moment');

class Widget extends React.Component {

    constructor(props) {
        super(props);
        this.getRates = this.getRates.bind(this);
        this.currencyChanged = this.currencyChanged.bind(this);

        this.state = {
            currencyLable: 'USD',
            startDate: moment(new Date('2016-6-1')),
            endDate: moment(new Date('2016-6-7')),
            currency: '145',
        }
    }
    componentDidMount() {
        loadCurrencies().then(response => {
            var currencies = JSON.parse(response);

            this.props.loadCurrenciesAction(currencies);
        });

        var startDate = moment(this.state.startDate).format('YYYY-M-D');
        var endDate = moment(this.state.endDate).format('YYYY-M-D');

        loadRate(startDate, endDate, this.state.currency).then(response => {
            var rates = JSON.parse(response);
            this.props.loadRatesAction(rates);
        });
    }

    currencyChanged(event) {
        this.setState({ currency: event.target.value, currencyLable: event.target.selectedOptions[0].label });
    }

    getRates() {
        var startDate = moment(this.state.startDate).format('YYYY-M-D');
        var endDate = moment(this.state.endDate).format('YYYY-M-D');

        loadRate(startDate, endDate, this.state.currency).then(response => {
            var rates = JSON.parse(response);
            this.props.loadRatesAction(rates);
        });
    }

    render() {
        return (
            <div className="container">
                <p className="title"><span>BYN</span><i className="material-icons">repeat</i><span>{this.state.currencyLable}</span></p>
                <div className="contain_date-range">
                    <select className="drop_down-list" onChange={this.currencyChanged}>
                        {this.props.currencies.map((currency, index) => {
                            return (<option value={currency.Cur_ID} key={index}>{currency.Cur_Abbreviation}</option>);
                        })}
                    </select>
                    <DateRangePicker
                        displayFormat="DD.MM.YYYY"
                        isOutsideRange={() => false}
                        startDate={this.state.startDate}
                        startDateId="start-date"
                        endDate={this.state.endDate}
                        endDateId="end-date"
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={focusedInput => this.setState({ focusedInput })}
                    />
                    <button onClick={this.getRates} className="but_send">Send</button>
                </div>
                <div>
                    <LineChart width={700} height={300} data={this.props.rates}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="2 2" />
                        <Tooltip />
                        <Legend />
                        <Line name="BYN" type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    var currencies = state.сurrencies;
    var rates = state.rates;
    return {
        currencies: currencies,
        rates: state.rates,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadCurrenciesAction: (currencies) => dispatch(getCurencies(currencies)),
        loadRatesAction: (rates) => dispatch(getRate(rates))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Widget);

