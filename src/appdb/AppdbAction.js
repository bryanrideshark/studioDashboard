System.register(["@angular/core", "angular2-redux-util", "@angular/http", "../services/AuthService", "rxjs/add/operator/map", "rxjs/add/operator/mergeMap", "rxjs/add/operator/merge", "rxjs/add/operator/debounceTime", "xml2js", '../appdb/AppdbReducer'], function(exports_1, context_1) {
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
    var core_1, angular2_redux_util_1, http_1, AuthService_1, xml2js, AppdbReducer_1;
    var APP_INIT, SERVERS_STATUS, CLOUD_SERVERS, AUTH_PASS, AUTH_PASS_WAIT_TWO_FACTOR, AUTH_FAIL, TWO_FACTOR_SERVER_RESULT, AuthState, AppdbAction;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {},
            function (xml2js_1) {
                xml2js = xml2js_1;
            },
            function (AppdbReducer_1_1) {
                AppdbReducer_1 = AppdbReducer_1_1;
            }],
        execute: function() {
            exports_1("APP_INIT", APP_INIT = 'APP_INIT');
            exports_1("SERVERS_STATUS", SERVERS_STATUS = 'SERVERS_STATUS');
            exports_1("CLOUD_SERVERS", CLOUD_SERVERS = 'CLOUD_SERVERS');
            exports_1("AUTH_PASS", AUTH_PASS = 'AUTH_PASS');
            exports_1("AUTH_PASS_WAIT_TWO_FACTOR", AUTH_PASS_WAIT_TWO_FACTOR = 'AUTH_PASS_WAIT_TWO_FACTOR');
            exports_1("AUTH_FAIL", AUTH_FAIL = 'AUTH_FAIL');
            exports_1("TWO_FACTOR_SERVER_RESULT", TWO_FACTOR_SERVER_RESULT = 'TWO_FACTOR_SERVER_RESULT');
            (function (AuthState) {
                AuthState[AuthState["FAIL"] = 0] = "FAIL";
                AuthState[AuthState["PASS"] = 1] = "PASS";
                AuthState[AuthState["TWO_FACTOR"] = 2] = "TWO_FACTOR";
            })(AuthState || (AuthState = {}));
            exports_1("AuthState", AuthState);
            AppdbAction = (function (_super) {
                __extends(AppdbAction, _super);
                function AppdbAction(offlineEnv, appStore, _http) {
                    _super.call(this, appStore);
                    this.offlineEnv = offlineEnv;
                    this.appStore = appStore;
                    this._http = _http;
                    this.parseString = xml2js.parseString;
                }
                AppdbAction.prototype.initAppDb = function () {
                    return {
                        type: APP_INIT,
                        value: Date.now()
                    };
                };
                AppdbAction.prototype.serverStatus = function () {
                    var _this = this;
                    return function (dispatch) {
                        _this._http.get("https://secure.digitalsignage.com/msPingServersGuest")
                            .map(function (result) {
                            result = result.json();
                            dispatch({
                                type: SERVERS_STATUS,
                                payload: result
                            });
                        }).subscribe();
                        return;
                    };
                };
                AppdbAction.prototype.getCloudServers = function () {
                    var _this = this;
                    return function (dispatch) {
                        _this._http.get('https://secure.digitalsignage.com/getActiveCloudServers')
                            .map(function (result) {
                            result = result.json();
                            dispatch({
                                type: CLOUD_SERVERS,
                                payload: result
                            });
                        }).subscribe();
                        return;
                    };
                };
                AppdbAction.prototype.authenticateTwoFactor = function (i_token, i_enable, i_cb) {
                    var _this = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var url = appdb.get('appBaseUrlCloud').replace('END_POINT', 'twoFactor') + ("/" + i_token + "/" + i_enable);
                        _this._http.get(url)
                            .map(function (result) {
                            dispatch({
                                type: TWO_FACTOR_SERVER_RESULT,
                                status: result.json().result
                            });
                        }).subscribe();
                    };
                };
                AppdbAction.prototype.getQrCodeTwoFactor = function (i_cb) {
                    var appdb = this.appStore.getState().appdb;
                    var url = appdb.get('appBaseUrlCloud').replace('END_POINT', 'twoFactorGenQr');
                    this._http.get(url)
                        .map(function (result) {
                        var qr = result.text();
                        i_cb(qr);
                    }).subscribe();
                };
                AppdbAction.prototype.authenticateUser = function (i_user, i_pass, i_remember) {
                    var _this = this;
                    var self = this;
                    return function (dispatch) {
                        var processXml = function (xmlData) {
                            _this.parseString(xmlData, { attrkey: 'attr' }, function (err, result) {
                                if (!result) {
                                    dispatch({
                                        type: AUTH_FAIL,
                                        authenticated: AuthState.FAIL,
                                        user: i_user,
                                        pass: i_pass,
                                        remember: i_remember,
                                        reason: AuthService_1.FlagsAuth.WrongPass
                                    });
                                }
                                else if (result && !result.Businesses) {
                                    dispatch({
                                        type: AUTH_FAIL,
                                        authenticated: AuthState.FAIL,
                                        user: i_user,
                                        pass: i_pass,
                                        remember: i_remember,
                                        reason: AuthService_1.FlagsAuth.NotEnterprise
                                    });
                                }
                                else {
                                    self.twoFactorCheck(i_user, i_pass).subscribe(function (twoFactorResult) {
                                        if (twoFactorResult.enabled == false) {
                                            var eventType = AUTH_PASS;
                                            var authState = AuthState.PASS;
                                        }
                                        else {
                                            var eventType = AUTH_PASS_WAIT_TWO_FACTOR;
                                            var authState = AuthState.TWO_FACTOR;
                                        }
                                        dispatch({
                                            type: eventType,
                                            authenticated: authState,
                                            user: i_user,
                                            pass: i_pass,
                                            businessId: twoFactorResult.businessId,
                                            remember: i_remember,
                                            reason: AuthService_1.FlagsAuth.Enterprise
                                        });
                                    });
                                }
                            });
                        };
                        var baseUrl = _this.appStore.getState().appdb.get('appBaseUrl');
                        var url = baseUrl + "?command=GetCustomers&resellerUserName=" + i_user + "&resellerPassword=" + i_pass;
                        if (_this.offlineEnv) {
                            _this._http.get('offline/getCustomers.xml').subscribe(function (result) {
                                var xmlData = result.text();
                                processXml(xmlData);
                            });
                            _this._http.get('offline/customerRequest.json').subscribe(function (result) {
                                var jData = result.json();
                            });
                        }
                        else {
                            _this._http.get(url)
                                .map(function (result) {
                                var xmlData = result.text();
                                processXml(xmlData);
                            }).subscribe();
                        }
                    };
                };
                AppdbAction.prototype.twoFactorCheck = function (i_user, i_pass) {
                    var url = AppdbReducer_1.appBaseUrlCloud + "/twoFactorCheck/" + i_user + "/" + i_pass;
                    return this._http.get(url)
                        .map(function (result) { return result = result.json(); });
                };
                AppdbAction = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject('OFFLINE_ENV')), 
                    __metadata('design:paramtypes', [Object, angular2_redux_util_1.AppStore, http_1.Http])
                ], AppdbAction);
                return AppdbAction;
            }(angular2_redux_util_1.Actions));
            exports_1("AppdbAction", AppdbAction);
        }
    }
});
