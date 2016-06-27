import {Map} from "immutable";
import * as AdnetActions from "./AdnetActions";

export function adnet(state:Map<string,any> = Map<string,any>(), action:any):Map<string,any> {

    switch (action.type) {
        case AdnetActions.RECEIVE_ADNET:
        {
            return state.setIn(['adnet'], action.payload);
        }
        default:
            return state;
    }
}