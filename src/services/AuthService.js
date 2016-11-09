System.register(["@angular/core", "@angular/router", "angular2-redux-util", "./LocalStorage", "./StoreService", "../appdb/AppdbAction", 'rxjs/add/observable/fromPromise', 'rxjs/Observable', "bootbox", "../Lib"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var core_1, router_1, angular2_redux_util_1, LocalStorage_1, StoreService_1, AppdbAction_1, Observable_1, bootbox, Lib_1;
    var Map, FlagsAuth, AuthService, AUTH_PROVIDERS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (LocalStorage_1_1) {
                LocalStorage_1 = LocalStorage_1_1;
            },
            function (StoreService_1_1) {
                StoreService_1 = StoreService_1_1;
            },
            function (AppdbAction_1_1) {
                AppdbAction_1 = AppdbAction_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            }],
        execute: function() {
            (function (FlagsAuth) {
                FlagsAuth[FlagsAuth["AuthPass"] = 0] = "AuthPass";
                FlagsAuth[FlagsAuth["AuthFailEnterprise"] = 1] = "AuthFailEnterprise";
                FlagsAuth[FlagsAuth["WrongPass"] = 2] = "WrongPass";
                FlagsAuth[FlagsAuth["NotEnterprise"] = 3] = "NotEnterprise";
                FlagsAuth[FlagsAuth["Enterprise"] = 4] = "Enterprise";
                FlagsAuth[FlagsAuth["WrongTwoFactor"] = 5] = "WrongTwoFactor";
            })(FlagsAuth || (FlagsAuth = {}));
            exports_1("FlagsAuth", FlagsAuth);
            AuthService = (function () {
                function AuthService(router, appStore, appdbAction, localStorage, storeService) {
                    this.router = router;
                    this.appStore = appStore;
                    this.appdbAction = appdbAction;
                    this.localStorage = localStorage;
                    this.storeService = storeService;
                    this.listenStore();
                }
                AuthService.prototype.listenStore = function () {
                    var _this = this;
                    this.ubsub = this.appStore.sub(function (credentials) {
                        _this.m_authState = credentials.get('authenticated');
                        var user = credentials.get('user');
                        var pass = credentials.get('pass');
                        var remember = credentials.get('remember');
                        switch (_this.m_authState) {
                            case AppdbAction_1.AuthState.FAIL: {
                                _this.onAuthFail();
                                break;
                            }
                            case AppdbAction_1.AuthState.PASS: {
                                _this.onAuthPass(user, pass, remember);
                                break;
                            }
                            case AppdbAction_1.AuthState.TWO_FACTOR: {
                                _this.onAuthPass(user, pass, remember);
                                console.log('doing two factor');
                                break;
                            }
                        }
                        if (_this.m_pendingNotify)
                            _this.m_pendingNotify(_this.m_authState);
                    }, 'appdb.credentials', false);
                };
                AuthService.prototype.onAuthPass = function (i_user, i_pass, i_remember) {
                    Lib_1.Lib.BootboxHide();
                    if (i_remember) {
                        this.localStorage.setItem('remember_me', {
                            u: i_user,
                            p: i_pass,
                            r: i_remember
                        });
                    }
                    else {
                        this.localStorage.setItem('remember_me', {
                            u: '',
                            p: '',
                            r: i_remember
                        });
                    }
                    this.storeService.loadServices();
                };
                AuthService.prototype.onAuthFail = function () {
                    var _this = this;
                    setTimeout(function () {
                        Lib_1.Lib.BootboxHide();
                        _this.localStorage.setItem('remember_me', {
                            u: '',
                            p: '',
                            r: ''
                        });
                    }, 1000);
                    return false;
                };
                AuthService.prototype.authServerTwoFactor = function (i_token) {
                    this.appStore.dispatch(this.appdbAction.authenticateTwoFactor(i_token, false));
                };
                AuthService.prototype.authUser = function (i_user, i_pass, i_remember) {
                    bootbox.dialog({
                        closeButton: false,
                        title: "Please wait, Authenticating...",
                        message: " "
                    });
                    if (!i_user) {
                        var credentials = this.localStorage.getItem('remember_me');
                        if (credentials && (credentials && credentials.u != '')) {
                            i_user = credentials.u;
                            i_pass = credentials.p;
                            i_remember = credentials.r;
                        }
                    }
                    this.appdbAction.createDispatcher(this.appdbAction.authenticateUser)(i_user.trim(), i_pass.trim(), i_remember);
                };
                AuthService.prototype.getLocalstoreCred = function () {
                    var credentials = this.localStorage.getItem('remember_me');
                    if (!credentials)
                        return {
                            u: '',
                            p: '',
                            r: ''
                        };
                    return {
                        u: credentials.u,
                        p: credentials.p,
                        r: credentials.r,
                    };
                };
                AuthService.prototype.checkAccess = function () {
                    var _this = this;
                    var target = ['/Login'];
                    switch (this.m_authState) {
                        case AppdbAction_1.AuthState.FAIL: {
                            break;
                        }
                        case AppdbAction_1.AuthState.PASS: {
                            return Promise.resolve(true);
                        }
                        case AppdbAction_1.AuthState.TWO_FACTOR: {
                            return Promise.resolve(true);
                        }
                    }
                    if (this.getLocalstoreCred().u == '') {
                        this.router.navigate(target);
                        return Promise.resolve(false);
                    }
                    return new Promise(function (resolve) {
                        var credentials = _this.localStorage.getItem('remember_me');
                        var user = credentials.u;
                        var pass = credentials.p;
                        var remember = credentials.r;
                        _this.appdbAction.createDispatcher(_this.appdbAction.authenticateUser)(user, pass, remember);
                        _this.m_pendingNotify = function (i_authState) {
                            switch (i_authState) {
                                case AppdbAction_1.AuthState.FAIL: {
                                    resolve(false);
                                    break;
                                }
                                case AppdbAction_1.AuthState.PASS: {
                                    _this.router.navigate(target);
                                    resolve(true);
                                    break;
                                }
                                case AppdbAction_1.AuthState.TWO_FACTOR: {
                                    console.log(3333);
                                    break;
                                }
                            }
                        };
                    });
                };
                AuthService.prototype.canActivate = function (activatedRouteSnapshot, routerStateSnapshot) {
                    var _this = this;
                    return Observable_1.Observable
                        .fromPromise(this.checkAccess())
                        .do(function (result) {
                        if (!result)
                            _this.router.navigate(['/Login']);
                    });
                };
                AuthService.prototype.ngOnDestroy = function () {
                    this.ubsub();
                };
                AuthService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject(core_1.forwardRef(function () { return angular2_redux_util_1.AppStore; }))),
                    __param(2, core_1.Inject(core_1.forwardRef(function () { return AppdbAction_1.AppdbAction; }))),
                    __param(3, core_1.Inject(core_1.forwardRef(function () { return LocalStorage_1.LocalStorage; }))),
                    __param(4, core_1.Inject(core_1.forwardRef(function () { return StoreService_1.StoreService; }))), 
                    __metadata('design:paramtypes', [router_1.Router, angular2_redux_util_1.AppStore, AppdbAction_1.AppdbAction, LocalStorage_1.LocalStorage, StoreService_1.StoreService])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
            exports_1("AUTH_PROVIDERS", AUTH_PROVIDERS = [{
                    provide: AuthService,
                    useClass: AuthService
                }]);
        }
    }
});
