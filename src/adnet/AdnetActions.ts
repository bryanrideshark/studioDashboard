import {
    Injectable,
    Inject
} from "@angular/core";
import {
    Actions,
    AppStore
} from "angular2-redux-util";
import {List} from "immutable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/finally";
import "rxjs/add/observable/throw";
import {
    Http,
    Response
} from "@angular/http";
import * as _ from "lodash";
import {AdnetCustomerModel} from "./AdnetCustomerModel";
import {AdnetRateModel} from "./AdnetRateModel";
import {AdnetTargetModel} from "./AdnetTargetModel";
import {AdnetPairModel} from "./AdnetPairModel";
import {AdnetPackageModel} from "./AdnetPackageModel";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Lib} from "../Lib";
import {AdnetContentModel} from "./AdnetContentModel";
import {Observable} from "rxjs/Observable";
import {CommBroker} from "../services/CommBroker";
import {Consts} from "../Conts";
import * as xml2js from 'xml2js'
import {BusinessModel} from "../business/BusinessModel";

export const RESET_ADNET = 'RESET_ADNET';
export const RECEIVE_ADNET = 'RECEIVE_ADNET';
export const RECEIVE_CUSTOMERS = 'RECEIVE_CUSTOMERS';
export const RECEIVE_RATES = 'RECEIVE_RATES';
export const RECEIVE_TARGETS = 'RECEIVE_TARGETS';
export const RECEIVE_TARGETS_SEARCH = 'RECEIVE_TARGETS_SEARCH';
export const RECEIVE_PAIRS = 'RECEIVE_PAIRS';
export const RECEIVE_PACKAGES = 'RECEIVE_PACKAGES';
export const UPDATE_ADNET_CUSTOMER = 'UPDATE_ADNET_CUSTOMER';
export const UPDATE_ADNET_RATE_TABLE = 'UPDATE_ADNET_RATE_TABLE';
export const UPDATE_ADNET_PACKAGE = 'UPDATE_ADNET_PACKAGE';
export const UPDATE_ADNET_PACKAGE_CONTENT = 'UPDATE_ADNET_PACKAGE_CONTENT';
export const UPDATE_ADNET_TARGET = 'UPDATE_ADNET_TARGET';
export const ADD_ADNET_TARGET = 'ADD_ADNET_TARGET';
export const ADD_ADNET_PACKAGE = 'ADD_ADNET_PACKAGE';
export const ADD_ADNET_PACKAGE_CONTENT = 'ADD_ADNET_PACKAGE_CONTENT';
export const ADD_ADNET_RATE_TABLE = 'ADD_ADNET_RATE_TABLE';
export const REMOVE_ADNET_RATE_TABLE = 'REMOVE_ADNET_RATE_TABLE';
export const REMOVE_ADNET_TARGET = 'REMOVE_ADNET_TARGET';
export const REMOVE_ADNET_PACKAGE = 'REMOVE_ADNET_PACKAGE';
export const REMOVE_ADNET_PACKAGE_CONTENT = 'REMOVE_ADNET_PACKAGE_CONTENT';
export const RENAME_ADNET_RATE_TABLE = 'RENAME_ADNET_RATE_TABLE';

export enum ContentTypeEnum {
    RESOURCE,
    GOOGLE,
    DROPBOX
}

@Injectable()
export class AdnetActions extends Actions {

    constructor(@Inject('OFFLINE_ENV') private offlineEnv, private appStore: AppStore, private _http: Http, private commBroker: CommBroker) {
        super(appStore);
        this.m_parseString = xml2js.parseString;
        this.adnetRouteReady$ = new ReplaySubject(2 /* buffer size */);
        this.adnetDataReady$ = new ReplaySubject(2 /* buffer size */);
    }

    private m_parseString;
    private adnetRouteReady$: ReplaySubject<any>;
    private adnetDataReady$: ReplaySubject<any>;

    public onAdnetRouteReady(): ReplaySubject<any> {
        return this.adnetRouteReady$;
    }

    public onAdnetDataReady(): ReplaySubject<any> {
        return this.adnetDataReady$;
    }

    private saveToServer(i_data, i_customerId, i_callBack?: (jData)=>void) {
        var businesses: List<BusinessModel> = this.appStore.getState().business.getIn(['businesses']);
        var businessModel: BusinessModel = businesses.filter((i_businessModel: BusinessModel) => i_businessModel.getAdnetCustomerId() == i_customerId).first() as BusinessModel;
        var adnetTokenId = businessModel.getAdnetTokenId();
        const data = JSON.stringify(i_data);
        const baseUrl = this.appStore.getState().appdb.get('appBaseUrlAdnetSave').replace(':ADNET_CUSTOMER_ID:', i_customerId).replace(':ADNET_TOKEN_ID:', adnetTokenId).replace(':DATA:', data);
        this._http.get(baseUrl)
            .map(result => {
                var jData: Object = result.json()
                if (i_callBack) i_callBack(jData);
            }).subscribe()
    }

    public getAdnet(adnetCustomerId?, adnetTokenId?) {
        if (!Lib.Exists(adnetCustomerId)) {
            this.adnetRouteReady$.next('adNetReady');
            this.adnetDataReady$.next('adnetData');
            this.adnetRouteReady$.complete();
            return (dispatch) => {
            };
        } else {
            return (dispatch) => {
                var baseUrl = this.appStore.getState().appdb.get('appBaseUrlAdnet');
                baseUrl = baseUrl.replace(/:ADNET_CUSTOMER_ID:/, adnetCustomerId);
                baseUrl = baseUrl.replace(/:ADNET_TOKEN_ID:/, adnetTokenId);

                const url = `${baseUrl}`;
                // offline not being used currently
                if (this.offlineEnv) {
                    this._http.get('offline/customerRequest.json').subscribe((result) => {
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
                                const adnetTargetModel: AdnetTargetModel = new AdnetTargetModel(target);
                                adnetTargets = adnetTargets.push(adnetTargetModel)
                            }
                            dispatch(this.receivedTargets(adnetTargets));

                            /** Pairs **/
                            var adnetPairModels: List<AdnetPairModel> = List<AdnetPairModel>();
                            for (var pair of jData['pairs']) {
                                const adnetPairModel: AdnetPairModel = new AdnetPairModel(pair);
                                adnetPairModels = adnetPairModels.push(adnetPairModel)
                            }
                            dispatch(this.receivedPairs(adnetPairModels));

                            /** Packages **/
                            var adnetPackageModels: List<AdnetPackageModel> = List<AdnetPackageModel>();
                            for (var pkg of jData['packages']) {
                                if (pkg.Value.deleted == true)
                                    continue;
                                const adnetPackageModel: AdnetPackageModel = new AdnetPackageModel(pkg);
                                adnetPackageModels = adnetPackageModels.push(adnetPackageModel)
                            }
                            dispatch(this.receivedPackages(adnetPackageModels));

                            // enable timer to checkout slow network for loading adnet data
                            // setTimeout(()=>{
                            this.adnetRouteReady$.next('adNetReady');
                            this.adnetDataReady$.next({
                                adnetCustomerId,
                                adnetTokenId
                            });
                            this.adnetRouteReady$.complete();
                            // },10000)


                        }).subscribe()
                }
            };

        }
    }

    public saveCustomerInfo(data: Object, adnetCustomerId: string) {
        return (dispatch) => {
            const payload = {
                Value: {},
                Key: adnetCustomerId
            };
            payload.Value = {"customerInfo": data};
            this.saveToServer(payload.Value, adnetCustomerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem saving customer info to server');
                payload.Value = data;
                dispatch(this.updateAdnetCustomer(payload))
            })
        };
    }

    public saveTargetInfo(data: Object, adnetTargetId: string, adnetCustomerId: string) {
        return (dispatch) => {
            if (_.isUndefined(data['rateId']) || data['rateId'].length == 0) data['rateId'] = -1;

            const payload = {
                Value: data,
                Key: adnetTargetId
            };
            var payloadToServer = {
                "targets": {
                    "update": [{
                        Key: adnetTargetId,
                        Value: _.extend(payload.Value, {
                            id: adnetTargetId,
                            handle: 0,
                            modified: 1,
                            hRate: -1
                        })
                    }]
                }
            }
            this.saveToServer(payloadToServer, adnetCustomerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem updating targets table on server');
                dispatch(this.updateAdnetTarget(payload))
            })
        };
    }


    public searchAdnet(i_customerId, type = 0, customer = '', target = '', keys = '', global = 1, lat = 0, lng = 0, radios = -1) {
        return (dispatch) => {
            var businesses: List<BusinessModel> = this.appStore.getState().business.getIn(['businesses']);
            var businessModel: BusinessModel = businesses.filter((i_businessModel: BusinessModel) => i_businessModel.getAdnetCustomerId() == i_customerId).first() as BusinessModel;
            var adnetTokenId = businessModel.getAdnetTokenId();
            var data = `&type=${type}&customer=${customer}&target=${target}&keys=${keys}&global=${global}&lat=${lat}&lng=${lng}&radios=${radios}`;
            const baseUrl = this.appStore.getState().appdb.get('appBaseUrlAdnetSearch').replace(':ADNET_CUSTOMER_ID:', i_customerId).replace(':ADNET_TOKEN_ID:', adnetTokenId).replace(':DATA:', data);

            this._http.get(baseUrl)
                .map(result => {
                    var jData: Object = result.json()

                    /** Customers **/
                    var adnetCustomers: List<AdnetCustomerModel> = List<AdnetCustomerModel>();
                    for (var adnetCustomer of jData['customers']) {
                        const adnetCustomerModel: AdnetCustomerModel = new AdnetCustomerModel(adnetCustomer);
                        adnetCustomers = adnetCustomers.push(adnetCustomerModel)
                    }
                    // dispatch(this.receivedCustomers(adnetCustomers));

                    /** Rates **/
                    var adnetRates: List<AdnetRateModel> = List<AdnetRateModel>();
                    for (var adnetRate of jData['rates']) {
                        if (adnetRate.Value.deleted == true)
                            continue;
                        const adnetRateModel: AdnetRateModel = new AdnetRateModel(adnetRate);
                        adnetRates = adnetRates.push(adnetRateModel)
                    }
                    // dispatch(this.receivedRates(adnetRates));

                    /** Targets **/
                    var adnetTargets: List<AdnetTargetModel> = List<AdnetTargetModel>();
                    for (var target of jData['targets']) {
                        if (target.Value.deleted == true)
                            continue;
                        const adnetTargetModel: AdnetTargetModel = new AdnetTargetModel(target);
                        adnetTargets = adnetTargets.push(adnetTargetModel)
                    }
                    dispatch(this.adnetTargetsSearch({
                        adnetTargets,
                        adnetCustomers,
                        adnetRates
                    }));

                }).subscribe()
        }
    }

    public addAdnetPackages(customerId) {
        return (dispatch) => {
            var payload = {
                Key: -1,
                Value: {
                    "handle": 0,
                    "modified": 1,
                    "customerId": customerId,
                    "label": "My Package",
                    "enabled": true,
                    "playMode": 0,
                    "channel": 0,
                    "startDate": "/Date(1476191180439)/",
                    "endDate": "/Date(1476191180439)/",
                    "daysMask": 127,
                    "hourStart": 0,
                    "hourEnd": 23,
                    "autoAddSiblings": false,
                    "siblingsKey": "",
                    "contents": [],
                    "targets": []
                }
            }

            var payloadToServer = {
                "packages": {
                    "add": [payload.Value]
                }
            }
            this.saveToServer(payloadToServer, customerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem adding package to server');
                var packageId = jData.packages.add["0"].packageId;
                payload.Key = packageId;
                // payload.Value.id = packageId;
                var model: AdnetPackageModel = new AdnetPackageModel(payload);
                dispatch({
                    type: ADD_ADNET_PACKAGE,
                    model: model
                });
            })
        };
    }

    public removeAdnetPackage(payload: any, customerId: string) {
        return (dispatch) => {
            var payloadToServer = {
                "packages": {
                    "delete": [payload]
                }
            }
            // var model: AdnetRateModel = new AdnetRateModel(payloadToServer);
            this.saveToServer(payloadToServer, customerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem removing package from server');
                // model = model.setId(jData.rates.add["0"]) as AdnetRateModel;
                dispatch({
                    type: REMOVE_ADNET_PACKAGE,
                    id: payload
                });
            })
        };
    }

    public removeAdnetPackageContent(adnetPackageModel: AdnetPackageModel, contentId: number) {
        return (dispatch) => {
            var customerId = adnetPackageModel.getCustomerId();
            var value = {
                "id": adnetPackageModel.getId(),
                "handle": "0",
                "modified": "0",
                "customerId": customerId,
                "packageContents": {"delete": [contentId]}
            }
            var payloadToServer = {
                "packages": {
                    "update": [{
                        "Key": adnetPackageModel.getId(),
                        "Value": value
                    }]
                }
            }
            var payloadToSave = {
                Key: adnetPackageModel.getId(),
                Value: value
            }
            this.saveToServer(payloadToServer, customerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem removing package content on server');
                dispatch(this.removePackageContent(payloadToSave))
            })
        };
    }

    public addAdnetTarget(customerId) {
        return (dispatch) => {
            var payload = {
                Key: -1,
                Value: {
                    "id": "-1",
                    "handle": "0",
                    "modified": "1",
                    "customerId": customerId,
                    "label": "www.yourdomain.com",
                    "targetType": "2",
                    "enabled": "false",
                    "locationLat": "0",
                    "locationLng": "0",
                    "targetDomain": "www.yourdomain.com",
                    "rateId": "-1",
                    "hRate": "-1",
                    "keys": "",
                    "comments": "",
                    "url": ""
                }
            }
            var model: AdnetTargetModel = new AdnetTargetModel(payload);
            var payloadToServer = {
                "targets": {
                    "add": [payload.Value]
                }
            }
            this.saveToServer(payloadToServer, customerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem saving rate table to server');
                model = model.setId(jData.targets.add["0"]) as AdnetTargetModel;
                dispatch({
                    type: ADD_ADNET_TARGET,
                    model: model
                });
            })
        };
    }


    public addAdnetRateTable(customerId) {
        return (dispatch) => {
            var payload = {
                Key: -1,
                Value: {
                    customerId: customerId,
                    deleted: false,
                    id: 0,
                    handle: 0,
                    modified: 1,
                    hourRate0: 1,
                    hourRate1: 2,
                    hourRate2: 3,
                    hourRate3: 4,
                    label: 'new rate',
                    rateMap: '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
                }
            }
            var model: AdnetRateModel = new AdnetRateModel(payload);
            var payloadToServer = {
                "rates": {
                    "add": [payload.Value]
                }
            }
            this.saveToServer(payloadToServer, customerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem saving rate table to server');
                model = model.setId(jData.rates.add["0"]) as AdnetRateModel;
                dispatch({
                    type: ADD_ADNET_RATE_TABLE,
                    model: model
                });
            })
        };
    }

    public removeAdnetRateTable(adnetId, customerId: string) {
        return (dispatch) => {
            var payLoad = {"rates": {"delete": [adnetId]}}
            this.saveToServer(payLoad, customerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem removing rate table on server');
                dispatch({
                    type: REMOVE_ADNET_RATE_TABLE,
                    id: adnetId
                });
            })
        };
    }

    public removeAdnetTarget(payload: any, customerId: string) {
        return (dispatch) => {
            var payloadToServer = {
                "targets": {
                    "delete": [payload]
                }
            }
            this.saveToServer(payloadToServer, customerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem updating rate table to server');
                dispatch({
                    type: REMOVE_ADNET_TARGET,
                    id: payload
                });
            })
        };
    }

    public updAdnetPackageProps(payload, adnetPackageModel: AdnetPackageModel) {
        return (dispatch) => {
            var customerId = adnetPackageModel.getCustomerId();
            var value = {
                "id": adnetPackageModel.getId(),
                "handle": 1,
                "modified": 1,
                "customerId": customerId,
                "label": payload.label,
                "enabled": payload.enabled,
                "playMode": payload.playMode,
                "channel": payload.channel,
                "startDate": `/Date(${Lib.ProcessDateFieldToUnix(payload.startDate, true)})/`,
                "endDate": `/Date(${Lib.ProcessDateFieldToUnix(payload.endDate, true)})/`,
                "daysMask": payload.daysMask,
                "hourStart": payload.hourStart,
                "hourEnd": payload.hourEnd,
                "autoAddSiblings": payload.autoAddSiblings,
                "siblingsKey": payload.siblingsKey

            }
            var payloadToServer = {
                "packages": {
                    "update": [{
                        "Key": adnetPackageModel.getId(),
                        "Value": value
                    }]
                }
            }
            var payloadToSave = {
                Key: adnetPackageModel.getId(),
                Value: value
            }

            this.saveToServer(payloadToServer, customerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem updating package on server');
                payloadToSave.Value['startDate'] = `/Date(${Lib.ProcessDateFieldToUnix(payload.startDate, false)})/`;
                payloadToSave.Value['endDate'] = `/Date(${Lib.ProcessDateFieldToUnix(payload.endDate, false)})/`;
                payloadToSave.Value['targets'] = adnetPackageModel.getTargets();
                payloadToSave.Value['contents'] = adnetPackageModel.getContents();
                dispatch(this.updatePackage(payloadToSave))
            })
        };
    }

    public updAdnetRateTable(payload: any, customerId: string, renamed?: boolean) {
        return (dispatch) => {
            var value = {
                "id": payload.rateId,
                "handle": "0",
                "modified": "1",
                "customerId": customerId,
                "label": payload.label,
                "hourRate0": payload.adHourlyRate["0"],
                "hourRate1": payload.adHourlyRate["1"],
                "hourRate2": payload.adHourlyRate["2"],
                "hourRate3": payload.adHourlyRate["3"],
                "rateMap": payload.rateTable
            }
            var payloadToSave = {
                Key: payload.rateId,
                Value: value
            }
            var payloadToServer = {
                "rates": {
                    "update": [{
                        "Key": payload.rateId,
                        "Value": value
                    }]
                }
            }
            var model: AdnetRateModel = new AdnetRateModel(payloadToSave);
            this.saveToServer(payloadToServer, customerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem updating rate table to server');
                model = model.setId(jData.rates.add["0"]) as AdnetRateModel;
                dispatch(this.updateAdnetRateTable(payload))
                if (renamed) {
                    dispatch({
                        type: RENAME_ADNET_RATE_TABLE,
                        payload: {
                            rateId: payload.rateId,
                            newLabel: payload.label
                        }
                    });
                }
            })
        };
    }

    public updAdnetContentProps(i_payload: any, i_adnetContentModels: AdnetContentModel, i_adnetPackageModel: AdnetPackageModel) {
        return (dispatch) => {
            var customerId = i_adnetPackageModel.getCustomerId();
            var packageId = i_adnetPackageModel.getId();
            var contentId = i_adnetContentModels.getId();
            var payloadToServer = {
                "packages": {
                    "update": [{
                        "Key": packageId,
                        "Value": {
                            "id": packageId,
                            "handle": 0,
                            "modified": 0,
                            "customerId": customerId,
                            "packageContents": {
                                "update": [{
                                    "Key": contentId,
                                    "Value": {
                                        "id": contentId,
                                        "handle": 1,
                                        "modified": 1,
                                        "duration": i_payload.duration,
                                        "contentLabel": i_adnetContentModels.getName(),
                                        "reparationsPerHour": i_payload.reparationsPerHour,
                                        "contentUrl": i_adnetContentModels.getContentUrl(),
                                        "contentType": i_adnetContentModels.getType(),
                                        "contentExt": i_adnetContentModels.getExtension(),
                                        "maintainAspectRatio": i_payload.maintainAspectRatio,
                                        "contentVolume": i_adnetContentModels.getVolume(),
                                        "locationLat": i_payload.locationLat,
                                        "locationLng": i_payload.locationLng,
                                        "locationRadios": i_payload.locationRadios
                                    }
                                }]
                            }
                        }
                    }]
                }
            }
            var payloadToSave = payloadToServer.packages.update["0"].Value.packageContents.update["0"];

            this.saveToServer(payloadToServer, customerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem updating package content table to server');
                // model = model.setId(jData.rates.add["0"]) as AdnetRateModel;
                dispatch(this.updatePackageContentProps(packageId, payloadToSave))
            })
        };
    }

    public addAdnetPackageContent(payload, adnetPackageModel: AdnetPackageModel, contentType: ContentTypeEnum) {
        return (dispatch) => {
            var customerId = adnetPackageModel.getCustomerId();
            var value = {
                "id": adnetPackageModel.getId(),
                "handle": 0,
                "modified": 0,
                "customerId": customerId,
                "packageContents": {
                    "add": [{
                        "id": "-1",
                        "handle": "0",
                        "modified": "1",
                        "contentLabel": Lib.FileTailName(payload.url, 2).replace(/%20/, ' '),
                        "duration": 10,
                        "reparationsPerHour": 60,
                        "contentUrl": payload.url,
                        "contentType": contentType,
                        "contentExt": "",
                        "maintainAspectRatio": "false",
                        "contentVolume": "1",
                        "locationLat": 0,
                        "locationLng": 0,
                        "locationRadios": 0
                    }]
                }
            }
            var payloadToServer = {
                "packages": {
                    "update": [{
                        "Key": adnetPackageModel.getId(),
                        "Value": value
                    }]
                }
            }
            var payloadToSave = {
                Key: adnetPackageModel.getId(),
                Value: value.packageContents.add[0]
            }
            this.saveToServer(payloadToServer, customerId, (jData) => {
                if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                    return alert('problem adding package on server');
                payloadToSave.Key = jData.packages.update["0"].contentIds["0"];
                payloadToSave.Value.id = jData.packages.update["0"].contentIds["0"];
                dispatch(this.addPackageContent(adnetPackageModel.getId(), payloadToSave))
            })
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

    private updatePackageContentProps(packageId, payload) {
        return {
            type: UPDATE_ADNET_PACKAGE_CONTENT,
            packageId,
            payload
        }
    }

    private addPackageContent(packageId, payload) {
        return {
            type: ADD_ADNET_PACKAGE_CONTENT,
            payload,
            packageId
        }
    }

    private updatePackage(payload) {
        return {
            type: UPDATE_ADNET_PACKAGE,
            payload
        }
    }

    private adnetTargetsSearch(payload) {
        return {
            type: RECEIVE_TARGETS_SEARCH,
            payload
        }
    }

    private removePackageContent(payload) {
        return {
            type: REMOVE_ADNET_PACKAGE_CONTENT,
            payload
        }
    }

    private updateAdnetCustomer(payload) {
        return {
            type: UPDATE_ADNET_CUSTOMER,
            payload
        }
    }

    private updateAdnetTarget(payload) {
        return {
            type: UPDATE_ADNET_TARGET,
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

    private receivedPairs(pairs: List<AdnetPairModel>) {
        return {
            type: RECEIVE_PAIRS,
            pairs
        }
    }

    private receivedPackages(packages: List<AdnetPackageModel>) {
        return {
            type: RECEIVE_PACKAGES,
            packages
        }
    }

    private receivedCustomers(customers: List<AdnetCustomerModel>) {
        return {
            type: RECEIVE_CUSTOMERS,
            customers
        }
    }

    public resetAdnet() {
        return (dispatch) => {
            dispatch({
                type: RESET_ADNET,
                payload: {}
            });
        };
    }
}

// var a = {
//     "packages": {
//         "update": [{
//             "Key": 3422,
//             "Value": {
//                 "id": "3422",
//                 "handle": "17",
//                 "modified": "0",
//                 "customerId": "13111",
//                 "packageContents": {
//                     "add": [{
//                         "id": "-1",
//                         "handle": "205",
//                         "modified": "1",
//                         "contentLabel": "/icons/336.png",
//                         "duration": 10,
//                         "reparationsPerHour": 60,
//                         "contentUrl": "http://secure.digitalsignage.com/DropboxFileLink/ff990135-ffe7-4c1e-b5ee-fddfdb203775/icons/336.png",
//                         "contentType": 2,
//                         "contentExt": "",
//                         "maintainAspectRatio": "false",
//                         "contentVolume": "1",
//                         "locationLat": 0,
//                         "locationLng": 0,
//                         "locationRadios": 0
//                     }]
//                 }
//             }
//         }]
//     }
// }
//

// var a = {
//     "packages": {
//         "update": [{
//             "Key": 3422,
//             "Value": {
//                 "id": "3422",
//                 "handle": "17",
//                 "modified": "0",
//                 "customerId": "13111",
//                 "packageContents": {
//                     "add": [{
//                         "id": "-1",
//                         "handle": "205",
//                         "modified": "1",
//                         "contentLabel": "/icons/336.png",
//                         "duration": 10,
//                         "reparationsPerHour": 60,
//                         "contentUrl": "http://secure.digitalsignage.com/DropboxFileLink/ff990135-ffe7-4c1e-b5ee-fddfdb203775/icons/336.png",
//                         "contentType": 2,
//                         "contentExt": "",
//                         "maintainAspectRatio": "false",
//                         "contentVolume": "1",
//                         "locationLat": 0,
//                         "locationLng": 0,
//                         "locationRadios": 0
//                     }]
//                 }
//             }
//         }]
//     }
// }
// const baseUrl = `https://adnet.signage.me/adNetService.ashx?command=search&customerId=13110&customerToken=d6639711-f86e-44f6-8b35-762c80a7a412&type=0&customer=""&target=""&keys=""&global=0&lat=0&lng=0&radios=-1`;
// const baseUrl = `https://adnet.signage.me/adNetService.ashx?command=search&customerId=29238&customerToken=00be859c-fafb-4d69-bbf7-15ba73d8c7fc&type=0&customer=sea&target=&keys=&global=1&lat=0&lng=0&radios=-1`;