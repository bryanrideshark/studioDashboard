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

export const RECEIVE_ADNET = 'RECEIVE_ADNET';
export const RECEIVE_CUSTOMERS = 'RECEIVE_CUSTOMERS';
export const RECEIVE_RATES = 'RECEIVE_RATES';
export const UPDATE_ADNET_CUSTOMER = 'UPDATE_ADNET_CUSTOMER';
export const UPDATE_ADNET_RATE_TABLE = 'UPDATE_ADNET_RATE_TABLE';

@Injectable()
export class AdnetActions extends Actions {

    constructor(@Inject('OFFLINE_ENV') private offlineEnv,
                private appStore: AppStore,
                private _http: Http) {
        super(appStore);
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

                        // adnet customers
                        var adnetCustomers: List<AdnetCustomerModel> = List<AdnetCustomerModel>();
                        for (var adnetCustomer of jData['customers']) {
                            const adnetCustomerModel: AdnetCustomerModel = new AdnetCustomerModel(adnetCustomer);
                            adnetCustomers = adnetCustomers.push(adnetCustomerModel)
                        }
                        dispatch(this.receivedCustomers(adnetCustomers));

                        // adnet rates
                        var adnetRates: List<AdnetRateModel> = List<AdnetRateModel>();
                        for (var adnetRate of jData['rates']) {
                            if (adnetRate.Value.deleted==true)
                                continue;
                            const adnetRateModel: AdnetRateModel = new AdnetRateModel(adnetRate);
                            adnetRates = adnetRates.push(adnetRateModel)
                        }
                        dispatch(this.receivedRates(adnetRates));

                    }).subscribe()
            }
        };
    }

    public saveCustomerInfo(data: Object, adnetCustomerId:string) {
        return (dispatch) => {
            //todo: save to server
            const payload = {
                Value: data,
                Key: adnetCustomerId
            };
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
            dispatch(this.updateAdnetCustomerInfo(payload))
        };
    }

    public saveAdnetRateTable(data: Object, adnetCustomerId:string) {
        return (dispatch) => {
            //todo: save to server
            const payload = {
                Value: data,
                Key: adnetCustomerId
            };
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
            dispatch(this.updateAdnetRateTable(payload))
        };
    }

    public receivedAdnet(payload: any) {
        return {
            type: RECEIVE_ADNET,
            payload
        }
    }

    public updateAdnetRateTable(payload) {
        return {
            type: UPDATE_ADNET_RATE_TABLE,
            payload
        }
    }

    public updateAdnetCustomerInfo(payload) {
        return {
            type: UPDATE_ADNET_CUSTOMER,
            payload
        }
    }

    public receivedRates(rates: List<AdnetRateModel>) {
        return {
            type: RECEIVE_RATES,
            rates
        }
    }

    public receivedCustomers(customers: List<AdnetCustomerModel>) {
        return {
            type: RECEIVE_CUSTOMERS,
            customers
        }
    }
}
