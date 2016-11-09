System.register(["@angular/core", "angular2-redux-util", "immutable", "rxjs/add/operator/catch", "rxjs/add/operator/finally", "rxjs/add/observable/throw", "@angular/http", "lodash", "./AdnetCustomerModel", "./AdnetRateModel", "./AdnetTargetModel", "./AdnetPairModel", "./AdnetPackageModel", "rxjs/ReplaySubject", "../Lib", "../services/CommBroker", 'xml2js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, angular2_redux_util_1, immutable_1, http_1, _, AdnetCustomerModel_1, AdnetRateModel_1, AdnetTargetModel_1, AdnetPairModel_1, AdnetPackageModel_1, ReplaySubject_1, Lib_1, CommBroker_1, xml2js;
    var RESET_ADNET, RECEIVE_ADNET, RECEIVE_CUSTOMERS, RECEIVE_RATES, RECEIVE_TARGETS, RECEIVE_PAIRS, RECEIVE_PACKAGES, UPDATE_ADNET_CUSTOMER, UPDATE_ADNET_RATE_TABLE, UPDATE_ADNET_PACKAGE, UPDATE_ADNET_PACKAGE_CONTENT, UPDATE_ADNET_TARGET, ADD_ADNET_TARGET, ADD_ADNET_PACKAGE, ADD_ADNET_PACKAGE_CONTENT, ADD_ADNET_RATE_TABLE, REMOVE_ADNET_RATE_TABLE, REMOVE_ADNET_TARGET, REMOVE_ADNET_PACKAGE, REMOVE_ADNET_PACKAGE_CONTENT, RENAME_ADNET_RATE_TABLE, ContentTypeEnum, AdnetActions, a;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_4) {
                _ = _4;
            },
            function (AdnetCustomerModel_1_1) {
                AdnetCustomerModel_1 = AdnetCustomerModel_1_1;
            },
            function (AdnetRateModel_1_1) {
                AdnetRateModel_1 = AdnetRateModel_1_1;
            },
            function (AdnetTargetModel_1_1) {
                AdnetTargetModel_1 = AdnetTargetModel_1_1;
            },
            function (AdnetPairModel_1_1) {
                AdnetPairModel_1 = AdnetPairModel_1_1;
            },
            function (AdnetPackageModel_1_1) {
                AdnetPackageModel_1 = AdnetPackageModel_1_1;
            },
            function (ReplaySubject_1_1) {
                ReplaySubject_1 = ReplaySubject_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (CommBroker_1_1) {
                CommBroker_1 = CommBroker_1_1;
            },
            function (xml2js_1) {
                xml2js = xml2js_1;
            }],
        execute: function() {
            exports_1("RESET_ADNET", RESET_ADNET = 'RESET_ADNET');
            exports_1("RECEIVE_ADNET", RECEIVE_ADNET = 'RECEIVE_ADNET');
            exports_1("RECEIVE_CUSTOMERS", RECEIVE_CUSTOMERS = 'RECEIVE_CUSTOMERS');
            exports_1("RECEIVE_RATES", RECEIVE_RATES = 'RECEIVE_RATES');
            exports_1("RECEIVE_TARGETS", RECEIVE_TARGETS = 'RECEIVE_TARGETS');
            exports_1("RECEIVE_PAIRS", RECEIVE_PAIRS = 'RECEIVE_PAIRS');
            exports_1("RECEIVE_PACKAGES", RECEIVE_PACKAGES = 'RECEIVE_PACKAGES');
            exports_1("UPDATE_ADNET_CUSTOMER", UPDATE_ADNET_CUSTOMER = 'UPDATE_ADNET_CUSTOMER');
            exports_1("UPDATE_ADNET_RATE_TABLE", UPDATE_ADNET_RATE_TABLE = 'UPDATE_ADNET_RATE_TABLE');
            exports_1("UPDATE_ADNET_PACKAGE", UPDATE_ADNET_PACKAGE = 'UPDATE_ADNET_PACKAGE');
            exports_1("UPDATE_ADNET_PACKAGE_CONTENT", UPDATE_ADNET_PACKAGE_CONTENT = 'UPDATE_ADNET_PACKAGE_CONTENT');
            exports_1("UPDATE_ADNET_TARGET", UPDATE_ADNET_TARGET = 'UPDATE_ADNET_TARGET');
            exports_1("ADD_ADNET_TARGET", ADD_ADNET_TARGET = 'ADD_ADNET_TARGET');
            exports_1("ADD_ADNET_PACKAGE", ADD_ADNET_PACKAGE = 'ADD_ADNET_PACKAGE');
            exports_1("ADD_ADNET_PACKAGE_CONTENT", ADD_ADNET_PACKAGE_CONTENT = 'ADD_ADNET_PACKAGE_CONTENT');
            exports_1("ADD_ADNET_RATE_TABLE", ADD_ADNET_RATE_TABLE = 'ADD_ADNET_RATE_TABLE');
            exports_1("REMOVE_ADNET_RATE_TABLE", REMOVE_ADNET_RATE_TABLE = 'REMOVE_ADNET_RATE_TABLE');
            exports_1("REMOVE_ADNET_TARGET", REMOVE_ADNET_TARGET = 'REMOVE_ADNET_TARGET');
            exports_1("REMOVE_ADNET_PACKAGE", REMOVE_ADNET_PACKAGE = 'REMOVE_ADNET_PACKAGE');
            exports_1("REMOVE_ADNET_PACKAGE_CONTENT", REMOVE_ADNET_PACKAGE_CONTENT = 'REMOVE_ADNET_PACKAGE_CONTENT');
            exports_1("RENAME_ADNET_RATE_TABLE", RENAME_ADNET_RATE_TABLE = 'RENAME_ADNET_RATE_TABLE');
            (function (ContentTypeEnum) {
                ContentTypeEnum[ContentTypeEnum["RESOURCE"] = 0] = "RESOURCE";
                ContentTypeEnum[ContentTypeEnum["GOOGLE"] = 1] = "GOOGLE";
                ContentTypeEnum[ContentTypeEnum["DROPBOX"] = 2] = "DROPBOX";
            })(ContentTypeEnum || (ContentTypeEnum = {}));
            exports_1("ContentTypeEnum", ContentTypeEnum);
            AdnetActions = (function (_super) {
                __extends(AdnetActions, _super);
                function AdnetActions(offlineEnv, appStore, _http, commBroker) {
                    _super.call(this, appStore);
                    this.offlineEnv = offlineEnv;
                    this.appStore = appStore;
                    this._http = _http;
                    this.commBroker = commBroker;
                    this.m_parseString = xml2js.parseString;
                    this.adnetRouteReady$ = new ReplaySubject_1.ReplaySubject(2);
                    this.adnetDataReady$ = new ReplaySubject_1.ReplaySubject(2);
                }
                AdnetActions.prototype.onAdnetRouteReady = function () {
                    return this.adnetRouteReady$;
                };
                AdnetActions.prototype.onAdnetDataReady = function () {
                    return this.adnetDataReady$;
                };
                AdnetActions.prototype.saveToServer = function (i_data, i_customerId, i_callBack) {
                    var businesses = this.appStore.getState().business.getIn(['businesses']);
                    var businessModel = businesses.filter(function (i_businessModel) { return i_businessModel.getAdnetCustomerId() == i_customerId; }).first();
                    var adnetTokenId = businessModel.getAdnetTokenId();
                    var data = JSON.stringify(i_data);
                    var baseUrl = this.appStore.getState().appdb.get('appBaseUrlAdnetSave').replace(':ADNET_CUSTOMER_ID:', i_customerId).replace(':ADNET_TOKEN_ID:', adnetTokenId).replace(':DATA:', data);
                    this._http.get(baseUrl)
                        .map(function (result) {
                        var jData = result.json();
                        if (i_callBack)
                            i_callBack(jData);
                    }).subscribe();
                };
                AdnetActions.prototype.resetAdnet = function () {
                    return function (dispatch) {
                        dispatch({
                            type: RESET_ADNET,
                            payload: {}
                        });
                    };
                };
                AdnetActions.prototype.getAdnet = function (adnetCustomerId, adnetTokenId) {
                    var _this = this;
                    if (!Lib_1.Lib.Exists(adnetCustomerId)) {
                        this.adnetRouteReady$.next('adNetReady');
                        this.adnetDataReady$.next('adnetData');
                        this.adnetRouteReady$.complete();
                        return function (dispatch) {
                        };
                    }
                    else {
                        return function (dispatch) {
                            var baseUrl = _this.appStore.getState().appdb.get('appBaseUrlAdnet');
                            baseUrl = baseUrl.replace(/:ADNET_CUSTOMER_ID:/, adnetCustomerId);
                            baseUrl = baseUrl.replace(/:ADNET_TOKEN_ID:/, adnetTokenId);
                            var url = "" + baseUrl;
                            if (_this.offlineEnv) {
                                _this._http.get('offline/customerRequest.json').subscribe(function (result) {
                                    var jData = result.json();
                                });
                            }
                            else {
                                _this._http.get(url)
                                    .map(function (result) {
                                    var jData = result.json();
                                    dispatch(_this.receivedAdnet(jData));
                                    var adnetCustomers = immutable_1.List();
                                    for (var _i = 0, _a = jData['customers']; _i < _a.length; _i++) {
                                        var adnetCustomer = _a[_i];
                                        var adnetCustomerModel = new AdnetCustomerModel_1.AdnetCustomerModel(adnetCustomer);
                                        adnetCustomers = adnetCustomers.push(adnetCustomerModel);
                                    }
                                    dispatch(_this.receivedCustomers(adnetCustomers));
                                    var adnetRates = immutable_1.List();
                                    for (var _b = 0, _c = jData['rates']; _b < _c.length; _b++) {
                                        var adnetRate = _c[_b];
                                        if (adnetRate.Value.deleted == true)
                                            continue;
                                        var adnetRateModel = new AdnetRateModel_1.AdnetRateModel(adnetRate);
                                        adnetRates = adnetRates.push(adnetRateModel);
                                    }
                                    dispatch(_this.receivedRates(adnetRates));
                                    var adnetTargets = immutable_1.List();
                                    for (var _d = 0, _e = jData['targets']; _d < _e.length; _d++) {
                                        var target = _e[_d];
                                        if (target.Value.deleted == true)
                                            continue;
                                        var adnetTargetModel = new AdnetTargetModel_1.AdnetTargetModel(target);
                                        adnetTargets = adnetTargets.push(adnetTargetModel);
                                    }
                                    dispatch(_this.receivedTargets(adnetTargets));
                                    var adnetPairModels = immutable_1.List();
                                    for (var _f = 0, _g = jData['pairs']; _f < _g.length; _f++) {
                                        var pair = _g[_f];
                                        var adnetPairModel = new AdnetPairModel_1.AdnetPairModel(pair);
                                        adnetPairModels = adnetPairModels.push(adnetPairModel);
                                    }
                                    dispatch(_this.receivedPairs(adnetPairModels));
                                    var adnetPackageModels = immutable_1.List();
                                    for (var _h = 0, _j = jData['packages']; _h < _j.length; _h++) {
                                        var pkg = _j[_h];
                                        if (pkg.Value.deleted == true)
                                            continue;
                                        var adnetPackageModel = new AdnetPackageModel_1.AdnetPackageModel(pkg);
                                        adnetPackageModels = adnetPackageModels.push(adnetPackageModel);
                                    }
                                    dispatch(_this.receivedPackages(adnetPackageModels));
                                    _this.adnetRouteReady$.next('adNetReady');
                                    _this.adnetDataReady$.next({
                                        adnetCustomerId: adnetCustomerId,
                                        adnetTokenId: adnetTokenId
                                    });
                                    _this.adnetRouteReady$.complete();
                                }).subscribe();
                            }
                        };
                    }
                };
                AdnetActions.prototype.saveCustomerInfo = function (data, adnetCustomerId) {
                    var _this = this;
                    return function (dispatch) {
                        var payload = {
                            Value: {},
                            Key: adnetCustomerId
                        };
                        payload.Value = { "customerInfo": data };
                        _this.saveToServer(payload.Value, adnetCustomerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem saving customer info to server');
                            payload.Value = data;
                            dispatch(_this.updateAdnetCustomer(payload));
                        });
                    };
                };
                AdnetActions.prototype.saveTargetInfo = function (data, adnetTargetId, adnetCustomerId) {
                    var _this = this;
                    return function (dispatch) {
                        if (_.isUndefined(data['rateId']) || data['rateId'].length == 0)
                            data['rateId'] = -1;
                        var payload = {
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
                        };
                        _this.saveToServer(payloadToServer, adnetCustomerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem updating targets table on server');
                            dispatch(_this.updateAdnetTarget(payload));
                        });
                    };
                };
                AdnetActions.prototype.addAdnetPackages = function (customerId) {
                    var _this = this;
                    return function (dispatch) {
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
                        };
                        var payloadToServer = {
                            "packages": {
                                "add": [payload.Value]
                            }
                        };
                        _this.saveToServer(payloadToServer, customerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem adding package to server');
                            var packageId = jData.packages.add["0"].packageId;
                            payload.Key = packageId;
                            var model = new AdnetPackageModel_1.AdnetPackageModel(payload);
                            dispatch({
                                type: ADD_ADNET_PACKAGE,
                                model: model
                            });
                        });
                    };
                };
                AdnetActions.prototype.removeAdnetPackage = function (payload, customerId) {
                    var _this = this;
                    return function (dispatch) {
                        var payloadToServer = {
                            "packages": {
                                "delete": [payload]
                            }
                        };
                        _this.saveToServer(payloadToServer, customerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem removing package from server');
                            dispatch({
                                type: REMOVE_ADNET_PACKAGE,
                                id: payload
                            });
                        });
                    };
                };
                AdnetActions.prototype.removeAdnetPackageContent = function (adnetPackageModel, contentId) {
                    var _this = this;
                    return function (dispatch) {
                        var customerId = adnetPackageModel.getCustomerId();
                        var value = {
                            "id": adnetPackageModel.getId(),
                            "handle": "0",
                            "modified": "0",
                            "customerId": customerId,
                            "packageContents": { "delete": [contentId] }
                        };
                        var payloadToServer = {
                            "packages": {
                                "update": [{
                                        "Key": adnetPackageModel.getId(),
                                        "Value": value
                                    }]
                            }
                        };
                        var payloadToSave = {
                            Key: adnetPackageModel.getId(),
                            Value: value
                        };
                        _this.saveToServer(payloadToServer, customerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem removing package content on server');
                            dispatch(_this.removePackageContent(payloadToSave));
                        });
                    };
                };
                AdnetActions.prototype.addAdnetTarget = function (customerId) {
                    var _this = this;
                    return function (dispatch) {
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
                        };
                        var model = new AdnetTargetModel_1.AdnetTargetModel(payload);
                        var payloadToServer = {
                            "targets": {
                                "add": [payload.Value]
                            }
                        };
                        _this.saveToServer(payloadToServer, customerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem saving rate table to server');
                            model = model.setId(jData.targets.add["0"]);
                            dispatch({
                                type: ADD_ADNET_TARGET,
                                model: model
                            });
                        });
                    };
                };
                AdnetActions.prototype.addAdnetRateTable = function (customerId) {
                    var _this = this;
                    return function (dispatch) {
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
                        };
                        var model = new AdnetRateModel_1.AdnetRateModel(payload);
                        var payloadToServer = {
                            "rates": {
                                "add": [payload.Value]
                            }
                        };
                        _this.saveToServer(payloadToServer, customerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem saving rate table to server');
                            model = model.setId(jData.rates.add["0"]);
                            dispatch({
                                type: ADD_ADNET_RATE_TABLE,
                                model: model
                            });
                        });
                    };
                };
                AdnetActions.prototype.removeAdnetRateTable = function (adnetId, customerId) {
                    var _this = this;
                    return function (dispatch) {
                        var payLoad = { "rates": { "delete": [adnetId] } };
                        _this.saveToServer(payLoad, customerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem removing rate table on server');
                            dispatch({
                                type: REMOVE_ADNET_RATE_TABLE,
                                id: adnetId
                            });
                        });
                    };
                };
                AdnetActions.prototype.removeAdnetTarget = function (payload, customerId) {
                    var _this = this;
                    return function (dispatch) {
                        var payloadToServer = {
                            "targets": {
                                "delete": [payload]
                            }
                        };
                        _this.saveToServer(payloadToServer, customerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem updating rate table to server');
                            dispatch({
                                type: REMOVE_ADNET_TARGET,
                                id: payload
                            });
                        });
                    };
                };
                AdnetActions.prototype.updAdnetPackageProps = function (payload, adnetPackageModel) {
                    var _this = this;
                    return function (dispatch) {
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
                            "startDate": "/Date(" + Lib_1.Lib.ProcessDateFieldToUnix(payload.startDate, true) + ")/",
                            "endDate": "/Date(" + Lib_1.Lib.ProcessDateFieldToUnix(payload.endDate, true) + ")/",
                            "daysMask": payload.daysMask,
                            "hourStart": payload.hourStart,
                            "hourEnd": payload.hourEnd,
                            "autoAddSiblings": payload.autoAddSiblings,
                            "siblingsKey": payload.siblingsKey
                        };
                        var payloadToServer = {
                            "packages": {
                                "update": [{
                                        "Key": adnetPackageModel.getId(),
                                        "Value": value
                                    }]
                            }
                        };
                        var payloadToSave = {
                            Key: adnetPackageModel.getId(),
                            Value: value
                        };
                        _this.saveToServer(payloadToServer, customerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem updating package on server');
                            payloadToSave.Value['startDate'] = "/Date(" + Lib_1.Lib.ProcessDateFieldToUnix(payload.startDate, false) + ")/";
                            payloadToSave.Value['endDate'] = "/Date(" + Lib_1.Lib.ProcessDateFieldToUnix(payload.endDate, false) + ")/";
                            payloadToSave.Value['targets'] = adnetPackageModel.getTargets();
                            payloadToSave.Value['contents'] = adnetPackageModel.getContents();
                            dispatch(_this.updatePackage(payloadToSave));
                        });
                    };
                };
                AdnetActions.prototype.updAdnetRateTable = function (payload, customerId, renamed) {
                    var _this = this;
                    return function (dispatch) {
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
                        };
                        var payloadToSave = {
                            Key: payload.rateId,
                            Value: value
                        };
                        var payloadToServer = {
                            "rates": {
                                "update": [{
                                        "Key": payload.rateId,
                                        "Value": value
                                    }]
                            }
                        };
                        var model = new AdnetRateModel_1.AdnetRateModel(payloadToSave);
                        _this.saveToServer(payloadToServer, customerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem updating rate table to server');
                            model = model.setId(jData.rates.add["0"]);
                            dispatch(_this.updateAdnetRateTable(payload));
                            if (renamed) {
                                dispatch({
                                    type: RENAME_ADNET_RATE_TABLE,
                                    payload: {
                                        rateId: payload.rateId,
                                        newLabel: payload.label
                                    }
                                });
                            }
                        });
                    };
                };
                AdnetActions.prototype.updAdnetContentProps = function (i_payload, i_adnetContentModels, i_adnetPackageModel) {
                    var _this = this;
                    return function (dispatch) {
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
                        };
                        var payloadToSave = payloadToServer.packages.update["0"].Value.packageContents.update["0"];
                        _this.saveToServer(payloadToServer, customerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem updating package content table to server');
                            dispatch(_this.updatePackageContentProps(packageId, payloadToSave));
                        });
                    };
                };
                AdnetActions.prototype.addAdnetPackageContent = function (payload, adnetPackageModel, contentType) {
                    var _this = this;
                    return function (dispatch) {
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
                                        "contentLabel": Lib_1.Lib.FileTailName(payload.url, 2).replace(/%20/, ' '),
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
                        };
                        var payloadToServer = {
                            "packages": {
                                "update": [{
                                        "Key": adnetPackageModel.getId(),
                                        "Value": value
                                    }]
                            }
                        };
                        var payloadToSave = {
                            Key: adnetPackageModel.getId(),
                            Value: value.packageContents.add[0]
                        };
                        _this.saveToServer(payloadToServer, customerId, function (jData) {
                            if (_.isUndefined(!jData) || _.isUndefined(jData.fromChangelistId))
                                return alert('problem adding package on server');
                            payloadToSave.Key = jData.packages.update["0"].contentIds["0"];
                            payloadToSave.Value.id = jData.packages.update["0"].contentIds["0"];
                            dispatch(_this.addPackageContent(adnetPackageModel.getId(), payloadToSave));
                        });
                    };
                };
                AdnetActions.prototype.receivedAdnet = function (payload) {
                    return {
                        type: RECEIVE_ADNET,
                        payload: payload
                    };
                };
                AdnetActions.prototype.updateAdnetRateTable = function (payload) {
                    return {
                        type: UPDATE_ADNET_RATE_TABLE,
                        payload: payload
                    };
                };
                AdnetActions.prototype.updatePackageContentProps = function (packageId, payload) {
                    return {
                        type: UPDATE_ADNET_PACKAGE_CONTENT,
                        packageId: packageId,
                        payload: payload
                    };
                };
                AdnetActions.prototype.addPackageContent = function (packageId, payload) {
                    return {
                        type: ADD_ADNET_PACKAGE_CONTENT,
                        payload: payload,
                        packageId: packageId
                    };
                };
                AdnetActions.prototype.updatePackage = function (payload) {
                    return {
                        type: UPDATE_ADNET_PACKAGE,
                        payload: payload
                    };
                };
                AdnetActions.prototype.removePackageContent = function (payload) {
                    return {
                        type: REMOVE_ADNET_PACKAGE_CONTENT,
                        payload: payload
                    };
                };
                AdnetActions.prototype.updateAdnetCustomer = function (payload) {
                    return {
                        type: UPDATE_ADNET_CUSTOMER,
                        payload: payload
                    };
                };
                AdnetActions.prototype.updateAdnetTarget = function (payload) {
                    return {
                        type: UPDATE_ADNET_TARGET,
                        payload: payload
                    };
                };
                AdnetActions.prototype.receivedRates = function (rates) {
                    return {
                        type: RECEIVE_RATES,
                        rates: rates
                    };
                };
                AdnetActions.prototype.receivedTargets = function (targets) {
                    return {
                        type: RECEIVE_TARGETS,
                        targets: targets
                    };
                };
                AdnetActions.prototype.receivedPairs = function (pairs) {
                    return {
                        type: RECEIVE_PAIRS,
                        pairs: pairs
                    };
                };
                AdnetActions.prototype.receivedPackages = function (packages) {
                    return {
                        type: RECEIVE_PACKAGES,
                        packages: packages
                    };
                };
                AdnetActions.prototype.receivedCustomers = function (customers) {
                    return {
                        type: RECEIVE_CUSTOMERS,
                        customers: customers
                    };
                };
                AdnetActions = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject('OFFLINE_ENV')), 
                    __metadata('design:paramtypes', [Object, angular2_redux_util_1.AppStore, http_1.Http, CommBroker_1.CommBroker])
                ], AdnetActions);
                return AdnetActions;
            }(angular2_redux_util_1.Actions));
            exports_1("AdnetActions", AdnetActions);
            a = {
                "packages": {
                    "update": [{
                            "Key": 3422,
                            "Value": {
                                "id": "3422",
                                "handle": "17",
                                "modified": "0",
                                "customerId": "13111",
                                "packageContents": {
                                    "add": [{
                                            "id": "-1",
                                            "handle": "205",
                                            "modified": "1",
                                            "contentLabel": "/icons/336.png",
                                            "duration": 10,
                                            "reparationsPerHour": 60,
                                            "contentUrl": "http://secure.digitalsignage.com/DropboxFileLink/ff990135-ffe7-4c1e-b5ee-fddfdb203775/icons/336.png",
                                            "contentType": 2,
                                            "contentExt": "",
                                            "maintainAspectRatio": "false",
                                            "contentVolume": "1",
                                            "locationLat": 0,
                                            "locationLng": 0,
                                            "locationRadios": 0
                                        }]
                                }
                            }
                        }]
                }
            };
        }
    }
});
