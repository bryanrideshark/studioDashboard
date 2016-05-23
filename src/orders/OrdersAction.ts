import {Http, Jsonp} from "angular2/http";
import {Injectable} from "angular2/core";
import {Actions, AppStore} from "angular2-redux-util";
import {OrderModel} from "./OrderModel";
import {Map, List} from 'immutable';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import {SampleModel} from "../business/SampleModel";
import {Lib} from "../Lib";
import * as _ from 'lodash'
import * as xml2js from 'xml2js'
import * as bootbox from 'bootbox';

export const REQUEST_ORDERS = 'REQUEST_ORDERS';
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS';
export const RECEIVE_ACCOUNT_TYPE = 'RECEIVE_ACCOUNT_TYPE';

@Injectable()
export class OrdersAction extends Actions {
    parseString;

    constructor(private _http:Http, private appStore:AppStore) {
        super();
        this.parseString = xml2js.parseString;
    }

    public fetchOrders(dispatch, accountType:string) {
        dispatch(this.requestOrders());
        var appdb:Map<string,any> = this.appStore.getState().appdb;
        var url;
        url = appdb.get('appBaseUrlCloud').replace('END_POINT', 'orders') + `/${accountType}`
        console.log(url);
        this._http.get(url)
            .catch((err) => {
                bootbox.alert('Error updating account');
                return Observable.throw(err);
            })
            .finally(() => {
            })
            .map(result => {
                var orders:any = result.json();
            }).subscribe();
    }

    public fetchAccountType() {
        return (dispatch)=> {
            var appdb:Map<string,any> = this.appStore.getState().appdb;
            var url;
            url = appdb.get('appBaseUrlCloud').replace('END_POINT', 'getAccountType');
            console.log(url);
            this._http.get(url)
                .catch((err) => {
                    bootbox.alert('Error updating account');
                    return Observable.throw(err);
                })
                .finally(() => {
                })
                .map(result => {
                    var accountType = result.json().accountType
                    dispatch(this.receiveAccountType(accountType))
                    if (accountType == 'UNKNOWN') {
                        bootbox.alert('Problem getting account type');
                        return;
                    }
                    this.fetchOrders(dispatch, accountType);
                }).subscribe();
        }
    }

    public requestOrders() {
        return {
            type: REQUEST_ORDERS
        }
    }

    public receiveOrders(orders:List<OrderModel>) {
        return {
            type: RECEIVE_ORDERS,
            orders
        }
    }

    public receiveAccountType(accountType:string) {
        return {
            type: RECEIVE_ACCOUNT_TYPE,
            accountType
        }
    }

    ngOnDestroy() {
    }

}
