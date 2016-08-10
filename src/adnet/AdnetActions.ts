import {Injectable, Inject} from "@angular/core";
import {Actions, AppStore} from "angular2-redux-util";
import {Map, List} from "immutable";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/finally";
import "rxjs/add/observable/throw";
import {Http} from "@angular/http";
import * as bootbox from "bootbox";
import * as _ from 'lodash';
import {AdnetCustomerModel} from "./AdnetCustomerModel";
import {AdnetRateModel} from "./AdnetRateModel";
import {AdnetTargetModel} from "./AdnetTargetModel";

export const RECEIVE_ADNET = 'RECEIVE_ADNET';
export const RECEIVE_CUSTOMERS = 'RECEIVE_CUSTOMERS';
export const RECEIVE_RATES = 'RECEIVE_RATES';
export const RECEIVE_TARGETS = 'RECEIVE_TARGETS';
export const UPDATE_ADNET_CUSTOMER = 'UPDATE_ADNET_CUSTOMER';
export const UPDATE_ADNET_RATE_TABLE = 'UPDATE_ADNET_RATE_TABLE';
export const ADD_ADNET_RATE_TABLE = 'ADD_ADNET_RATE_TABLE';
export const REMOVE_ADNET_RATE_TABLE = 'REMOVE_ADNET_RATE_TABLE';
export const RENAME_ADNET_RATE_TABLE = 'RENAME_ADNET_RATE_TABLE';

@Injectable()
export class AdnetActions extends Actions {

    constructor(@Inject('OFFLINE_ENV') private offlineEnv,
                private appStore: AppStore,
                private _http: Http) {
        super(appStore);
    }

    private saveToServer(data) {
        // const baseUrl = this.appStore.getState().appdb.get('appBaseUrlAdnet');
        // const url = `${baseUrl}`;
        // this._http.get(url)
        //     .map(result => {
        //         var jData: Object = result.json()
        //         dispatch(this.receivedAdnet(jData));
        //         var adnetCustomers: List<AdnetCustomerModel> = List<AdnetCustomerModel>();
        //         for (var adnetCustomer of jData['customers']) {
        //             const adnetCustomerModel: AdnetCustomerModel = new AdnetCustomerModel(adnetCustomer);
        //             adnetCustomers = adnetCustomers.push(adnetCustomerModel)
        //         }
        //         dispatch(this.receivedCustomers(adnetCustomers));
        //     }).subscribe()
    }

    public getAdnet() {
        return (dispatch) => {
            const adnetCustomerId = this.appStore.getState().appdb.get('adnetCustomerId');
            const baseUrl = this.appStore.getState().appdb.get('appBaseUrlAdnet');
            const url = `${baseUrl}`;
            // offline not being used currently
            if (this.offlineEnv) {
                this._http.get('offline/customerRequest.json').subscribe((result)=> {
                    var jData: Object = result.json();
                })
            } else {
                this._http.get(url)
                    .map(result => {
                        var jData: Object = result.json()
                        dispatch(this.receivedAdnet(jData));

                        /** Customers **/
                        var adnetCustomers: List<AdnetCustomerModel> = List<AdnetCustomerModel>();
                        for (var adnetCustomer of jData['customers']) {
                            const adnetCustomerModel: AdnetCustomerModel = new AdnetCustomerModel(adnetCustomer);
                            adnetCustomers = adnetCustomers.push(adnetCustomerModel)
                        }
                        dispatch(this.receivedCustomers(adnetCustomers));

                        /** Rates **/
                        var adnetRates: List<AdnetRateModel> = List<AdnetRateModel>();
                        for (var adnetRate of jData['rates']) {
                            if (adnetRate.Value.deleted == true)
                                continue;
                            const adnetRateModel: AdnetRateModel = new AdnetRateModel(adnetRate);
                            adnetRates = adnetRates.push(adnetRateModel)
                        }
                        dispatch(this.receivedRates(adnetRates));

                        /** Targets **/
                        var adnetTargets: List<AdnetTargetModel> = List<AdnetTargetModel>();
                        for (var target of jData['targets']) {
                            if (target.Value.deleted == true)
                                continue;
                            const adnetTargetModel: AdnetTargetModel = new AdnetTargetModel(adnetRate);
                            adnetTargets = adnetTargets.push(adnetTargetModel)
                        }
                        dispatch(this.receivedTargets(adnetTargets));
                    }).subscribe()
            }
        };
    }

    public saveCustomerInfo(data: Object, adnetCustomerId: string) {
        return (dispatch) => {
            //todo: save to server
            const payload = {
                Value: data,
                Key: adnetCustomerId
            };
            dispatch(this.updateAdnetCustomerInfo(payload))
        };
    }

    public addAdnetRateTable(customerId) {
        return (dispatch) => {
            //todo: save to server
            //todo: get handle and id back from server on save
            var key = _.uniqueId();
            const adnetRateModel: AdnetRateModel = new AdnetRateModel({
                Key: key,
                Value: {
                    customerId: customerId,
                    deleted: false,
                    id: key,
                    handle: _.uniqueId(),
                    hourRate0: 1,
                    hourRate1: 2,
                    hourRate2: 3,
                    hourRate3: 4,
                    label: 'new rate',
                    rateMap: '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
                }
            });
            dispatch({
                type: ADD_ADNET_RATE_TABLE,
                adnetRateModel: adnetRateModel
            });
        };
    }

    public removeAdnetRateTable(rateId) {
        return (dispatch) => {
            //todo: save to server
            dispatch({
                type: REMOVE_ADNET_RATE_TABLE,
                rateId: rateId
            });
        };
    }

    public updAdnetRateTable(payload) {
        return (dispatch) => {
            //todo: save to server
            dispatch(this.updateAdnetRateTable(payload))
        };
    }

    public renameAdnetRateTable(rateId: string, newLabel: string) {
        return (dispatch) => {
            //todo: save to server
            dispatch({
                type: RENAME_ADNET_RATE_TABLE,
                payload: {rateId, newLabel}
            });
        };
    }

    public receivedAdnet(payload: any) {
        return {
            type: RECEIVE_ADNET,
            payload
        }
    }

    private updateAdnetRateTable(payload) {
        return {
            type: UPDATE_ADNET_RATE_TABLE,
            payload
        }
    }

    private updateAdnetCustomerInfo(payload) {
        return {
            type: UPDATE_ADNET_CUSTOMER,
            payload
        }
    }

    private receivedRates(rates: List<AdnetRateModel>) {
        return {
            type: RECEIVE_RATES,
            rates
        }
    }

    private receivedTargets(targets: List<AdnetTargetModel>) {
        return {
            type: RECEIVE_TARGETS,
            targets
        }
    }

    private receivedCustomers(customers: List<AdnetCustomerModel>) {
        return {
            type: RECEIVE_CUSTOMERS,
            customers
        }
    }
}
