import {List, Map} from "immutable";
import * as AdnetActions from "./AdnetActions";
import {AdnetCustomerModel} from "./AdnetCustomerModel";
import {AdnetRateModel} from "./AdnetRateModel";

export function adnet(state: Map<string,any> = Map<string,any>(), action: any): Map<string,any> {
    switch (action.type) {
        case AdnetActions.RECEIVE_CUSTOMERS: {
            return state.setIn(['customers'], action.customers);
        }
        case AdnetActions.RECEIVE_RATES: {
            return state.setIn(['rates'], action.rates);
        }
        case AdnetActions.UPDATE_ADNET_RATE_TABLE: {
            var rates: List<AdnetRateModel> = state.getIn(['rates']);
            var indexOf = function (i_rateId: string) {
                return rates.findIndex((i: AdnetRateModel) => i.rateId() === i_rateId);
            }
            rates = rates.update(indexOf(action.payload.rateId), (rate: AdnetRateModel) => {
                return rate.setField('rateMap', action.payload.rateTable)
            });
            rates = rates.update(indexOf(action.payload.rateId), (rate: AdnetRateModel) => {
                rate = rate.setField('hourRate0', action.payload.adHourlyRate["0"])
                rate = rate.setField('hourRate1', action.payload.adHourlyRate["1"])
                rate = rate.setField('hourRate2', action.payload.adHourlyRate["2"])
                rate = rate.setField('hourRate3', action.payload.adHourlyRate["3"])
                return rate;
            });
            return state.setIn(['rates'], rates);
        }
        case AdnetActions.UPDATE_ADNET_CUSTOMER: {
            var customers: List<AdnetCustomerModel> = state.getIn(['customers'])
            var indexOf = function (i_adnetCustomerId: string) {
                return customers.findIndex((i: AdnetCustomerModel) => i.customerId() === i_adnetCustomerId);
            }
            customers = customers.update(indexOf(action.payload.Key), (customer: AdnetCustomerModel) => {
                return customer.setData<AdnetCustomerModel>(AdnetCustomerModel, action.payload)
            });
            return state.setIn(['customers'], customers);
        }
        default:
            return state;
    }
}
