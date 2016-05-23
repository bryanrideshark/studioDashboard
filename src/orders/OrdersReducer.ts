import {List} from 'immutable';
import {Map} from 'immutable';
import * as OrderActions from './OrdersAction';
import {OrderModel} from "./OrderModel";

export function orders(state:Map<string,any> = Map<string,any>(), action:any):Map<string,any> {

    switch (action.type) {
        case OrderActions.REQUEST_ORDERS:
            return state;

        case OrderActions.RECEIVE_ORDERS:
            // var businesses:List<OrderModel> = state.getIn(['businesses'])
            // return state.setIn(['businesses'], list);
            return state;

        default:
            return state;
    }
}