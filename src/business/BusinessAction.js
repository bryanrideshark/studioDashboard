System.register(["@angular/http", "@angular/core", "angular2-redux-util", "./BusinessModel", 'immutable', "./BusinessUser", "rxjs/Subject", "./BusinessSourcesModel", "rxjs/Observable", 'rxjs/add/operator/catch', 'rxjs/add/operator/finally', 'rxjs/add/observable/throw', "../business/SampleModel", "../Lib", 'bootbox', 'lodash', 'xml2js'], function(exports_1, context_1) {
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
    var http_1, core_1, angular2_redux_util_1, BusinessModel_1, immutable_1, BusinessUser_1, Subject_1, BusinessSourcesModel_1, Observable_1, SampleModel_1, Lib_1, bootbox, _, xml2js;
    var REQUEST_BUSINESS_USER, RECEIVE_BUSINESSES_SOURCES, RECEIVE_BUSINESS_USER, RECEIVE_BUSINESS_SAMPLES, REQUEST_BUSINESSES, RECEIVE_BUSINESSES, RECEIVE_BUSINESSES_STATS, SET_BUSINESS_DATA, SET_BUSINESS_ACCOUNT_DATA, CHANGE_BUSINESS_USER_NAME, SET_BUSINESS_USER_ACCESS, ADD_BUSINESS_USER, REMOVE_BUSINESS, REMOVE_BUSINESS_USER, BusinessAction;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (BusinessModel_1_1) {
                BusinessModel_1 = BusinessModel_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (BusinessUser_1_1) {
                BusinessUser_1 = BusinessUser_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (BusinessSourcesModel_1_1) {
                BusinessSourcesModel_1 = BusinessSourcesModel_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (SampleModel_1_1) {
                SampleModel_1 = SampleModel_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (_4) {
                _ = _4;
            },
            function (xml2js_1) {
                xml2js = xml2js_1;
            }],
        execute: function() {
            exports_1("REQUEST_BUSINESS_USER", REQUEST_BUSINESS_USER = 'REQUEST_BUSINESS_USER');
            exports_1("RECEIVE_BUSINESSES_SOURCES", RECEIVE_BUSINESSES_SOURCES = 'RECEIVE_BUSINESSES_SOURCES');
            exports_1("RECEIVE_BUSINESS_USER", RECEIVE_BUSINESS_USER = 'RECEIVE_BUSINESS_USER');
            exports_1("RECEIVE_BUSINESS_SAMPLES", RECEIVE_BUSINESS_SAMPLES = 'RECEIVE_BUSINESS_SAMPLES');
            exports_1("REQUEST_BUSINESSES", REQUEST_BUSINESSES = 'REQUEST_BUSINESSES');
            exports_1("RECEIVE_BUSINESSES", RECEIVE_BUSINESSES = 'RECEIVE_BUSINESSES');
            exports_1("RECEIVE_BUSINESSES_STATS", RECEIVE_BUSINESSES_STATS = 'RECEIVE_BUSINESSES_STATS');
            exports_1("SET_BUSINESS_DATA", SET_BUSINESS_DATA = 'SET_BUSINESS_DATA');
            exports_1("SET_BUSINESS_ACCOUNT_DATA", SET_BUSINESS_ACCOUNT_DATA = 'SET_BUSINESS_ACCOUNT_DATA');
            exports_1("CHANGE_BUSINESS_USER_NAME", CHANGE_BUSINESS_USER_NAME = 'CHANGE_BUSINESS_USER_NAME');
            exports_1("SET_BUSINESS_USER_ACCESS", SET_BUSINESS_USER_ACCESS = 'SET_BUSINESS_USER_ACCESS');
            exports_1("ADD_BUSINESS_USER", ADD_BUSINESS_USER = 'ADD_BUSINESS_USER');
            exports_1("REMOVE_BUSINESS", REMOVE_BUSINESS = 'REMOVE_BUSINESS');
            exports_1("REMOVE_BUSINESS_USER", REMOVE_BUSINESS_USER = 'REMOVE_BUSINESS_USER');
            BusinessAction = (function (_super) {
                __extends(BusinessAction, _super);
                function BusinessAction(_http, appStore) {
                    _super.call(this);
                    this._http = _http;
                    this.appStore = appStore;
                    this.parseString = xml2js.parseString;
                    this.listenFetchBusinessUser();
                }
                BusinessAction.prototype.listenFetchBusinessUser = function () {
                    var _this = this;
                    var self = this;
                    this.businessesRequest$ = new Subject_1.Subject();
                    this.unsub = this.businessesRequest$
                        .map(function (v) {
                        return v;
                    })
                        .debounceTime(100)
                        .switchMap(function (values) {
                        if (values.businessIds.length == 0)
                            return 'CANCEL_PENDING_NET_CALLS';
                        var businessIds = values.businessIds.join('.');
                        var dispatch = values.dispatch;
                        var appdb = _this.appStore.getState().appdb;
                        var url = appdb.get('appBaseUrlUser') + ("&command=GetBusinessUsers&businessList=" + businessIds);
                        return _this._http.get(url)
                            .map(function (result) {
                            var xmlData = result.text();
                            _this.parseString(xmlData, { attrkey: '_attr' }, function (err, result) {
                                var businessUsers = immutable_1.List();
                                for (var _i = 0, _a = result.Users.User; _i < _a.length; _i++) {
                                    var business = _a[_i];
                                    var businessUser = new BusinessUser_1.BusinessUser({
                                        accessMask: business._attr.accessMask,
                                        privilegeId: business._attr.privilegeId,
                                        password: '',
                                        name: business._attr.name,
                                        businessId: business._attr.businessId,
                                    });
                                    businessUsers = businessUsers.push(businessUser);
                                }
                                dispatch(self.receiveBusinessUsers(businessUsers));
                            });
                        });
                    }).publish().connect();
                };
                BusinessAction.prototype.fetchBusinessUser = function (businessIds) {
                    var _this = this;
                    return function (dispatch) {
                        dispatch(_this.requestBusinessUser());
                        _this.businessesRequest$.next({ businessIds: businessIds, dispatch: dispatch });
                    };
                };
                BusinessAction.prototype.findBusinessIndex = function (business, businesses) {
                    return businesses.findIndex(function (i_business) {
                        return i_business.getBusinessId() === business.getBusinessId();
                    });
                };
                BusinessAction.prototype.findBusinessIndexById = function (businessId, businesses) {
                    return businesses.findIndex(function (i_business) {
                        return businessId === i_business.getBusinessId();
                    });
                };
                BusinessAction.prototype.getSamples = function () {
                    var _this = this;
                    var self = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var sampleData = Lib_1.Lib.GetSamples();
                        var samples = [];
                        _.forEach(sampleData, function (v, businessId) {
                            var name = v.split(',')[0];
                            var type = v.split(',')[1];
                            var sampleModel = new SampleModel_1.SampleModel({ businessId: businessId, name: name, type: type });
                            samples.push(sampleModel);
                        });
                        var sampleModels = immutable_1.List(samples);
                        dispatch(_this.receiveBusinessSamples(sampleModels));
                    };
                };
                BusinessAction.prototype.updateAccount = function (businessId, name, maxMonitors, allowSharing) {
                    var _this = this;
                    return function (dispatch) {
                        dispatch(_this.saveAccountInfo({ businessId: businessId, name: name, maxMonitors: maxMonitors, allowSharing: allowSharing }));
                        var appdb = _this.appStore.getState().appdb;
                        var url;
                        url = appdb.get('appBaseUrlUser') + ("&command=UpdateAccount&buinessId=" + businessId + "&businessName=" + name + "&maxMonitors=" + maxMonitors + "&allowSharing=" + allowSharing);
                        _this._http.get(url)
                            .catch(function (err) {
                            bootbox.alert('Error updating account');
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                        })
                            .map(function (result) {
                            var reply = result.text();
                            if (reply == 'True') {
                            }
                            else {
                                bootbox.alert('Problem updating the selected account');
                            }
                        }).subscribe();
                    };
                };
                BusinessAction.prototype.getStudioProUrl = function (customerUserName, cb) {
                    var appdb = this.appStore.getState().appdb;
                    var url;
                    url = appdb.get('appBaseUrlUser') + ("&command=GetLoginUrl&customerUserName=" + customerUserName);
                    this._http.get(url)
                        .catch(function (err) {
                        bootbox.alert('Problem launching StudioPro');
                        return Observable_1.Observable.throw(err);
                    })
                        .finally(function () {
                    })
                        .map(function (result) {
                        var reply = result.text();
                        cb(reply);
                    }).subscribe();
                };
                BusinessAction.prototype.getUserPass = function (customerUserName, cb) {
                    var appdb = this.appStore.getState().appdb;
                    var url;
                    url = appdb.get('appBaseUrlUser') + ("&command=GetUserPass&customerUserName=" + customerUserName);
                    console.log(url);
                    this._http.get(url)
                        .catch(function (err) {
                        bootbox.alert('Problem getting user password');
                        return Observable_1.Observable.throw(err);
                    })
                        .finally(function () {
                    })
                        .map(function (result) {
                        var reply = result.text();
                        cb(reply);
                    }).subscribe();
                };
                BusinessAction.prototype.removeBusiness = function (businessId) {
                    var _this = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var url;
                        url = appdb.get('appBaseUrlUser') + ("&command=DeleteAccount&buinessId=" + businessId);
                        _this._http.get(url)
                            .catch(function (err) {
                            bootbox.alert('Error removing account');
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                        })
                            .map(function (result) {
                            var reply = result.text();
                        }).subscribe();
                        dispatch({ type: REMOVE_BUSINESS, businessId: businessId });
                    };
                };
                BusinessAction.prototype.fetchBusinesses = function () {
                    var _this = this;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    var self = this;
                    return function (dispatch) {
                        dispatch(_this.requestBusinesses());
                        var accountStats = {
                            lites: 0,
                            pros: 0,
                            activeAccounts: 0,
                            inactiveAccounts: 0,
                            lastLogin: 0,
                            totalBusinesses: 0
                        };
                        var businessServerSources = new BusinessSourcesModel_1.BusinessSourcesModel({});
                        var appdb = _this.appStore.getState().appdb;
                        var url = appdb.get('appBaseUrlUser') + '&command=GetCustomers';
                        _this._http.get(url)
                            .map(function (result) {
                            var xmlData = result.text();
                            _this.parseString(xmlData, { attrkey: '_attr' }, function (err, result) {
                                var businesses = [], businessIds = [];
                                result.Businesses.BusinessInfo.forEach(function (business) {
                                    var source = business._attr.domain;
                                    var businessId = business._attr.businessId;
                                    var bus = new BusinessModel_1.BusinessModel({
                                        businessId: businessId,
                                        source: source,
                                        name: business._attr.name,
                                        accountStatus: business._attr.accountStatus,
                                        applicationId: business._attr.applicationId,
                                        archiveState: business._attr.archiveState,
                                        fromTemplateId: business._attr.fromTemplateId,
                                        maxMonitors: business._attr.maxMonitors,
                                        maxDataStorage: business._attr.maxDataStorage,
                                        allowSharing: business._attr.allowSharing,
                                        studioLite: business._attr.studioLite,
                                        lastLogin: business._attr.lastLogin,
                                        resellerId: business._attr.resellerId,
                                        businessDescription: business._attr.businessDescription,
                                        adnetToken: business.AdNet["0"]._attr.customerToken,
                                        adnetCustomerId: business.AdNet["0"]._attr.customerId
                                    });
                                    businessServerSources = businessServerSources.listPush(BusinessSourcesModel_1.BusinessSourcesModel, source, businessId);
                                    business._attr.accountStatus == 2 ? accountStats.activeAccounts++ : accountStats.inactiveAccounts++;
                                    business._attr.studioLite == 0 ? accountStats.pros++ : accountStats.lites++;
                                    business._attr.accountStatus == 2 ? accountStats.activeAccounts++ : accountStats.inactiveAccounts++;
                                    var lastLogin = Number(business._attr.lastLogin);
                                    if (lastLogin > accountStats.lastLogin) {
                                        accountStats.lastLogin = business._attr.lastLogin;
                                    }
                                    businessIds.push(business._attr.businessId);
                                    businesses.push(bus);
                                });
                                accountStats.totalBusinesses = businesses.length;
                                dispatch(self.receiveBusinessesSources(businessServerSources));
                                dispatch(self.receiveBusinesses(businesses));
                                dispatch(self.receiveBusinessesStats(accountStats));
                                dispatch(self.fetchBusinessUser(businessIds));
                            });
                        }).subscribe();
                    };
                };
                BusinessAction.prototype.setBusinessField = function (businessId, key, value) {
                    return {
                        type: SET_BUSINESS_DATA,
                        businessId: businessId,
                        key: key,
                        value: value
                    };
                };
                BusinessAction.prototype.setBusinessUserName = function (businessId, key, value) {
                    return {
                        type: CHANGE_BUSINESS_USER_NAME,
                        businessId: businessId,
                        key: key,
                        value: value
                    };
                };
                BusinessAction.prototype.updateBusinessUserAccess = function (businessId, name, accessMask, privilegeId) {
                    var _this = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var url = appdb.get('appBaseUrlUser') + ("&command=UpdateUserPrivilege&privilegeId=" + privilegeId + "&accessMask=" + accessMask + "&customerUserName=" + name);
                        _this._http.get(url)
                            .map(function (result) {
                            var xmlData = result.text();
                            dispatch(_this.savedBusinessUserAccess({
                                businessId: businessId,
                                privilegeId: privilegeId,
                                accessMask: accessMask,
                                name: name
                            }));
                        }).subscribe();
                    };
                };
                BusinessAction.prototype.associateUser = function (user, pass) {
                    var _this = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var url;
                        url = appdb.get('appBaseUrlUser') + ("&command=AssociateAccount&customerUserName=" + user + "&customerPassword=" + pass);
                        _this._http.get(url)
                            .catch(function (err) {
                            bootbox.alert('Error when updating App mode');
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                        })
                            .map(function (result) {
                            var reply = result.text();
                            if (reply == 'True') {
                                bootbox.alert('User imported successfully');
                                dispatch(_this.fetchBusinesses());
                            }
                            else {
                                bootbox.alert('User could not be imported, either the credentials supplied were wrong or the user is already associated with another enterprise account');
                            }
                        }).subscribe();
                    };
                };
                BusinessAction.prototype.duplicateAccount = function (businessUser) {
                    var _this = this;
                    var businessId = businessUser.getBusinessId();
                    var name = businessUser.getName();
                    var businessName = businessUser.businessName();
                    var password = businessUser.getPassword();
                    var accessMask = businessUser.getAccessMask();
                    var privilegeId = businessUser.privilegeId();
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var url;
                        url = appdb.get('appBaseUrlUser') + ("&command=DuplicateAccount&customerBusinessName=" + businessName + "&customerUserName=" + name + "&customerPassword=" + password + "&templateBusinessId=" + businessId + "&privilegeId=" + privilegeId + "&accessMask=" + accessMask);
                        _this._http.get(url)
                            .catch(function (err) {
                            bootbox.alert('Error creating a new account from samples');
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                        })
                            .map(function (result) {
                            var reply = result.text();
                            if (reply == 'True') {
                                dispatch(_this.fetchBusinesses());
                            }
                            else {
                                bootbox.alert('User could not be imported, either the credentials supplied were wrong or the user is already associated with another enterprise account');
                            }
                        }).subscribe();
                    };
                };
                BusinessAction.prototype.addNewBusinessUser = function (businessUser) {
                    var _this = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var businessId = businessUser.getBusinessId();
                        var name = businessUser.getName();
                        var password = businessUser.getPassword();
                        var accessMask = businessUser.getAccessMask();
                        var privilegeId = businessUser.privilegeId();
                        var url = appdb.get('appBaseUrlUser') + ("&command=AddBusinessUser&businessId=" + businessId + "&newUserName=" + name + "&newUserPassword=" + password + "&privilegeId=" + privilegeId + "&accessMask=" + accessMask);
                        _this._http.get(url)
                            .map(function (result) {
                            var jData = result.text();
                            if (jData.indexOf('true') > -1) {
                                dispatch({ type: ADD_BUSINESS_USER, BusinessUser: businessUser });
                            }
                            else {
                                bootbox.alert('Problem adding user, this user name may be already taken');
                            }
                        }).subscribe();
                    };
                };
                BusinessAction.prototype.updateBusinessPassword = function (userName, newPassword) {
                    var _this = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var url = appdb.get('appBaseUrlUser') + ("&command=ChangePassword&userName=" + userName + "&newPassword=" + newPassword);
                        _this._http.get(url)
                            .map(function (result) {
                            var jData = result.text();
                            if (jData.indexOf('true') == -1) {
                                bootbox.alert('Problem changing password');
                            }
                        }).subscribe();
                    };
                };
                BusinessAction.prototype.removeBusinessUser = function (businessUser) {
                    var _this = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var url = appdb.get('appBaseUrlUser') + ("&command=RemoveBusinessUser&customerUserName=" + businessUser.getName());
                        _this._http.get(url)
                            .map(function (result) {
                            var jData = result.text();
                            if (jData.indexOf('true') > -1) {
                                dispatch({ type: REMOVE_BUSINESS_USER, BusinessUser: businessUser });
                            }
                            else {
                                bootbox.alert('Problem removing user');
                            }
                        }).subscribe();
                    };
                };
                BusinessAction.prototype.savedBusinessUserAccess = function (i_payload) {
                    return {
                        type: SET_BUSINESS_USER_ACCESS,
                        payload: i_payload
                    };
                };
                BusinessAction.prototype.saveAccountInfo = function (payload) {
                    return {
                        type: SET_BUSINESS_ACCOUNT_DATA,
                        payload: payload
                    };
                };
                BusinessAction.prototype.requestBusinessUser = function () {
                    return { type: REQUEST_BUSINESS_USER };
                };
                BusinessAction.prototype.requestBusinesses = function () {
                    return { type: REQUEST_BUSINESSES };
                };
                BusinessAction.prototype.receiveBusinesses = function (businesses) {
                    return {
                        type: RECEIVE_BUSINESSES,
                        businesses: businesses
                    };
                };
                BusinessAction.prototype.receiveBusinessesSources = function (businessSources) {
                    return {
                        type: RECEIVE_BUSINESSES_SOURCES,
                        businessSources: businessSources
                    };
                };
                BusinessAction.prototype.receiveBusinessUsers = function (businessUsers) {
                    return {
                        type: RECEIVE_BUSINESS_USER,
                        businessUsers: businessUsers
                    };
                };
                BusinessAction.prototype.receiveBusinessSamples = function (sampleModels) {
                    return {
                        type: RECEIVE_BUSINESS_SAMPLES,
                        sampleModels: sampleModels
                    };
                };
                BusinessAction.prototype.receiveBusinessesStats = function (stats) {
                    return {
                        type: RECEIVE_BUSINESSES_STATS,
                        stats: stats
                    };
                };
                BusinessAction.prototype.ngOnDestroy = function () {
                    this.unsub.unsubscribe();
                };
                BusinessAction = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, angular2_redux_util_1.AppStore])
                ], BusinessAction);
                return BusinessAction;
            }(angular2_redux_util_1.Actions));
            exports_1("BusinessAction", BusinessAction);
        }
    }
});
