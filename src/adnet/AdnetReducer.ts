import {List, Map} from "immutable";
import * as AdnetActions from "./AdnetActions";
import {AdnetCustomerModel} from "./AdnetCustomerModel";

export function adnet(state: Map<string,any> = Map<string,any>(), action: any): Map<string,any> {
    switch (action.type) {
        case AdnetActions.RECEIVE_CUSTOMERS: {
            return state.setIn(['customers'], action.customers);
        }
        case AdnetActions.RECEIVE_RATES: {
            return state.setIn(['rates'], action.rates);
        }
        case AdnetActions.UPDATE_ADNET_CUSTOMER: {
            var customers:List<AdnetCustomerModel> = state.getIn(['customers'])
            var indexOf = function(i_adnetCustomerId:string) {
                return customers.findIndex((i:AdnetCustomerModel) => i.customerId() === i_adnetCustomerId);
            }
            customers = customers.update(indexOf(action.payload.Key), (customer:AdnetCustomerModel) => {
                return customer.setData<AdnetCustomerModel>(AdnetCustomerModel, action.payload)
            });
            return state.setIn(['customers'], customers);
        }
        default:
            return state;
    }
}
