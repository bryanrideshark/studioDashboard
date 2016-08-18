import {List, Map} from "immutable";
import * as AdnetActions from "./AdnetActions";
import {AdnetCustomerModel} from "./AdnetCustomerModel";
import {AdnetRateModel} from "./AdnetRateModel";
import {AdnetTargetModel} from "./AdnetTargetModel";

export function adnet(state: Map<string,any> = Map<string,any>(), action: any): Map<string,any> {

    var indexOfRateId = function (id: string) {
        return rates.findIndex((i: AdnetRateModel) => i.getId() === id);
    }
    var indexOfCustomerId = function (i_adnetCustomerId: string) {
        return customers.findIndex((i: AdnetCustomerModel) => i.customerId() === i_adnetCustomerId);
    }
    switch (action.type) {
        case AdnetActions.RECEIVE_CUSTOMERS: {
            return state.setIn(['customers'], action.customers);
        }
        case AdnetActions.RECEIVE_RATES: {
            return state.setIn(['rates'], action.rates);
        }
        case AdnetActions.RECEIVE_TARGETS: {
            return state.setIn(['targets'], action.targets);
        }
        case AdnetActions.UPDATE_ADNET_RATE_TABLE: {
            var rates: List<AdnetRateModel> = state.getIn(['rates']);

            rates = rates.update(indexOfRateId(action.payload.rateId), (rate: AdnetRateModel) => {
                return rate.setField('rateMap', action.payload.rateTable)
            });
            rates = rates.update(indexOfRateId(action.payload.rateId), (rate: AdnetRateModel) => {
                rate = rate.setField('hourRate0', action.payload.adHourlyRate["0"])
                rate = rate.setField('hourRate1', action.payload.adHourlyRate["1"])
                rate = rate.setField('hourRate2', action.payload.adHourlyRate["2"])
                rate = rate.setField('hourRate3', action.payload.adHourlyRate["3"])
                return rate;
            });
            return state.setIn(['rates'], rates);
        }
        // case AdnetActions.UPDATE_ADNET_TARGET: {
        //     var targets: List<AdnetRateModel> = state.getIn(['targets']);
        //
        //     rates = rates.update(indexOfRateId(action.payload.rateId), (rate: AdnetRateModel) => {
        //         return rate.setField('rateMap', action.payload.rateTable)
        //     });
        //     return state.setIn(['rates'], rates);
        // }
        case AdnetActions.ADD_ADNET_RATE_TABLE: {
            var rates: List<AdnetRateModel> = state.getIn(['rates']);
            rates = rates.push(action.adnetRateModel);
            return state.setIn(['rates'], rates);
        }
        case AdnetActions.REMOVE_ADNET_RATE_TABLE: {
            var rates: List<AdnetRateModel> = state.getIn(['rates']);
            var updatedRates:List<AdnetRateModel> = rates.filter((adnetRateModel:AdnetRateModel) => adnetRateModel.getId() !== action.getId) as List<AdnetRateModel>;
            return state.setIn(['rates'], updatedRates);
        }
        case AdnetActions.UPDATE_ADNET_CUSTOMER: {
            var customers: List<AdnetCustomerModel> = state.getIn(['customers'])
            customers = customers.update(indexOfCustomerId(action.payload.Key), (customer: AdnetCustomerModel) => {
                return customer.setData<AdnetCustomerModel>(AdnetCustomerModel, action.payload)
            });
            return state.setIn(['customers'], customers);
        }
        case AdnetActions.RENAME_ADNET_RATE_TABLE: {
            var rates: List<AdnetRateModel> = state.getIn(['rates']);
            rates = rates.update(indexOfRateId(action.payload.rateId), (rate: AdnetRateModel) => {
                return rate.setField('label', action.payload.newLabel)
            });
            return state.setIn(['rates'], rates);
        }
        default:
            return state;
    }
}
