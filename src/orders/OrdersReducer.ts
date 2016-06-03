import {List} from 'immutable';
import {Map} from 'immutable';
import * as OrderActions from './OrdersAction';
import {OrderModel} from "./OrderModel";

export function orders(state:Map<string,any> = Map<string,any>(), action:any):Map<string,any> {

    switch (action.type) {
        case OrderActions.REQUEST_ORDERS:
            return state;

        case OrderActions.RECEIVED_ORDERS:
            return state.setIn(['customerOrders'], action.orders);

        default:
            return state;
    }
}