import {Map} from "immutable";
import * as AdnetActions from "./AdnetActions";

export function adnet(state:Map<string,any> = Map<string,any>(), action:any):Map<string,any> {
    switch (action.type) {
        case AdnetActions.RECEIVE_CUSTOMERS:
        {
            return state.setIn(['customer'], action.customers);
        }
        default:
            return state;
    }
}
