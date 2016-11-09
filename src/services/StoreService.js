System.register(["@angular/core", "../business/BusinessAction", "../adnet/AdnetActions", "../reseller/ResellerAction", "../appdb/AppdbAction", "angular2-redux-util", "../stations/StationsAction", "./CommBroker", "../Conts", "../Lib", "../comps/app1/orders/OrdersAction", "./LocalStorage"], function(exports_1, context_1) {
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
    var core_1, BusinessAction_1, AdnetActions_1, ResellerAction_1, AppdbAction_1, angular2_redux_util_1, StationsAction_1, CommBroker_1, Conts_1, Lib_1, OrdersAction_1, LocalStorage_1;
    var StoreService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (BusinessAction_1_1) {
                BusinessAction_1 = BusinessAction_1_1;
            },
            function (AdnetActions_1_1) {
                AdnetActions_1 = AdnetActions_1_1;
            },
            function (ResellerAction_1_1) {
                ResellerAction_1 = ResellerAction_1_1;
            },
            function (AppdbAction_1_1) {
                AppdbAction_1 = AppdbAction_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (StationsAction_1_1) {
                StationsAction_1 = StationsAction_1_1;
            },
            function (CommBroker_1_1) {
                CommBroker_1 = CommBroker_1_1;
            },
            function (Conts_1_1) {
                Conts_1 = Conts_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (OrdersAction_1_1) {
                OrdersAction_1 = OrdersAction_1_1;
            },
            function (LocalStorage_1_1) {
                LocalStorage_1 = LocalStorage_1_1;
            }],
        execute: function() {
            StoreService = (function () {
                function StoreService(appStore, businessActions, adnetActions, ordersActions, resellerAction, stationsAction, appDbActions, offlineEnv, commBroker, localStorage) {
                    this.appStore = appStore;
                    this.businessActions = businessActions;
                    this.adnetActions = adnetActions;
                    this.ordersActions = ordersActions;
                    this.resellerAction = resellerAction;
                    this.stationsAction = stationsAction;
                    this.appDbActions = appDbActions;
                    this.offlineEnv = offlineEnv;
                    this.commBroker = commBroker;
                    this.localStorage = localStorage;
                    this.singleton = false;
                    this.knownServers = [];
                    this.running = false;
                    this.appStore.dispatch(this.appDbActions.initAppDb());
                }
                StoreService.prototype.loadServices = function () {
                    if (this.singleton)
                        return;
                    this.singleton = true;
                    this.listenServices();
                    var adnetCustomerId = this.localStorage.getItem('adnet_customer_id');
                    var adnetTokenId = this.localStorage.getItem('adnet_token_id');
                    if (!Lib_1.Lib.Exists(adnetCustomerId)) {
                        this.appStore.dispatch(this.adnetActions.getAdnet(null));
                    }
                    else {
                        this.appStore.dispatch(this.adnetActions.getAdnet(adnetCustomerId, adnetTokenId));
                    }
                    this.appStore.dispatch(this.resellerAction.getResellerInfo());
                    this.appStore.dispatch(this.resellerAction.getAccountInfo());
                    this.appStore.dispatch(this.businessActions.fetchBusinesses());
                    this.appStore.dispatch(this.businessActions.getSamples());
                };
                StoreService.prototype.initPollServices = function () {
                    var _this = this;
                    console.log('starting poll services...');
                    if (this.running)
                        return;
                    this.running = true;
                    setInterval(function () {
                        _this.appStore.dispatch(_this.appDbActions.serverStatus());
                        _this.fetchStations();
                    }, 5000);
                };
                StoreService.prototype.listenServices = function () {
                    var _this = this;
                    this.appStore.sub(function () {
                        if (_this.commBroker.getValue(Conts_1.Consts.Values().SERVER_MODE) == 0) {
                            _this.appStore.dispatch(_this.appDbActions.getCloudServers());
                        }
                        else {
                            _this.fetchStations();
                        }
                    }, 'business.businessStats');
                    this.appStore.sub(function (servers) {
                        _this.knownServers = servers.toArray();
                        _this.fetchStations();
                        _this.appStore.dispatch(_this.ordersActions.fetchAccountType());
                    }, 'appdb.cloudServers');
                    this.appStore.sub(function (stations) {
                    }, 'stations');
                    this.appStore.sub(function (totalStationsReceived) {
                        _this.appStore.dispatch(_this.appDbActions.serverStatus());
                        _this.appStore.dispatch(_this.stationsAction.getStationsIps());
                    }, 'appdb.totalStations');
                    this.appStore.sub(function (serversStatus) {
                        if (!Lib_1.Lib.DevMode())
                            _this.initPollServices();
                    }, 'appdb.serversStatus', false);
                };
                StoreService.prototype.fetchStations = function () {
                    var _this = this;
                    var sources = this.appStore.getState().business.getIn(['businessSources']).getData();
                    var config = {};
                    sources.forEach(function (i_businesses, source) {
                        var businesses = i_businesses.toArray();
                        if (_this.knownServers.indexOf(source) > -1)
                            config[source] = businesses;
                    });
                    this.appStore.dispatch(this.stationsAction.getStationsInfo(config));
                };
                StoreService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return angular2_redux_util_1.AppStore; }))),
                    __param(1, core_1.Inject(core_1.forwardRef(function () { return BusinessAction_1.BusinessAction; }))),
                    __param(2, core_1.Inject(core_1.forwardRef(function () { return AdnetActions_1.AdnetActions; }))),
                    __param(3, core_1.Inject(core_1.forwardRef(function () { return OrdersAction_1.OrdersAction; }))),
                    __param(4, core_1.Inject(core_1.forwardRef(function () { return ResellerAction_1.ResellerAction; }))),
                    __param(5, core_1.Inject(core_1.forwardRef(function () { return StationsAction_1.StationsAction; }))),
                    __param(6, core_1.Inject(core_1.forwardRef(function () { return AppdbAction_1.AppdbAction; }))),
                    __param(7, core_1.Inject('OFFLINE_ENV')),
                    __param(8, core_1.Inject(core_1.forwardRef(function () { return CommBroker_1.CommBroker; }))),
                    __param(9, core_1.Inject(core_1.forwardRef(function () { return LocalStorage_1.LocalStorage; }))), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, BusinessAction_1.BusinessAction, AdnetActions_1.AdnetActions, OrdersAction_1.OrdersAction, ResellerAction_1.ResellerAction, StationsAction_1.StationsAction, AppdbAction_1.AppdbAction, Object, CommBroker_1.CommBroker, LocalStorage_1.LocalStorage])
                ], StoreService);
                return StoreService;
            }());
            exports_1("StoreService", StoreService);
        }
    }
});
