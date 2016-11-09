System.register(["@angular/core", "immutable", "angular2-redux-util", "../../../business/BusinessAction", "../../../appdb/AppdbAction", "../../../services/AuthService", "../../../services/CommBroker", "../../../Conts", "../../ng2-bs3-modal/components/modal", "lodash", "@angular/forms", './Dashboard.html!text'], function(exports_1, context_1) {
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
    var core_1, immutable_1, angular2_redux_util_1, BusinessAction_1, AppdbAction_1, AuthService_1, CommBroker_1, Conts_1, modal_1, _, forms_1, Dashboard_html_text_1;
    var Dashboard;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (BusinessAction_1_1) {
                BusinessAction_1 = BusinessAction_1_1;
            },
            function (AppdbAction_1_1) {
                AppdbAction_1 = AppdbAction_1_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            },
            function (CommBroker_1_1) {
                CommBroker_1 = CommBroker_1_1;
            },
            function (Conts_1_1) {
                Conts_1 = Conts_1_1;
            },
            function (modal_1_1) {
                modal_1 = modal_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (Dashboard_html_text_1_1) {
                Dashboard_html_text_1 = Dashboard_html_text_1_1;
            }],
        execute: function() {
            Dashboard = (function () {
                function Dashboard(authService, appStore, appDbActions, cd, commBroker) {
                    this.authService = authService;
                    this.appStore = appStore;
                    this.appDbActions = appDbActions;
                    this.cd = cd;
                    this.commBroker = commBroker;
                    this.screensOnline = 'screens online: 0';
                    this.screensOffline = 'screens offline: 0';
                    this.stationComponentMode = 'grid';
                    this.totalFilteredPlayers = 0;
                    this.businessNameControl = new forms_1.FormControl();
                    this.unsubs = [];
                    this.businessStats = {};
                    this.errorLoadingStations = false;
                    this.stationsFilteredBy = {
                        connection: 'all',
                        name: 'all',
                        os: 'all',
                        airVersion: 'all',
                        appVersion: 'all'
                    };
                    this.stationsFilter = {
                        os: [],
                        airVersion: [],
                        appVersion: []
                    };
                    this.serverStats = [];
                    this.serverStatsCategories = [];
                    this.serverAvgResponse = 0;
                    this.listenBusinessNameFilter();
                    this.listenStore();
                    this.listenStationsErrors();
                }
                Dashboard.prototype.listenStationsErrors = function () {
                    var _this = this;
                    this.commBroker.onEvent(Conts_1.Consts.Events().STATIONS_NETWORK_ERROR).subscribe(function (e) {
                        _this.errorLoadingStations = true;
                    });
                };
                Dashboard.prototype.onModalClose = function (event) {
                };
                Dashboard.prototype.listenStore = function () {
                    var _this = this;
                    var unsub;
                    this.stations = this.appStore.getState().stations;
                    this.initStationsFilter();
                    this.onStationsFilterSelected('connection', 'all', 1000);
                    unsub = this.appStore.sub(function (stations) {
                        _this.stations = stations;
                        _this.initStationsFilter();
                        _this.setStationsFiltered();
                    }, 'stations');
                    this.unsubs.push(unsub);
                    this.businessStats = this.appStore.getState().business.getIn(['businessStats']) || {};
                    unsub = this.appStore.sub(function (i_businesses) {
                        _this.businessStats = i_businesses;
                    }, 'business.businessStats');
                    this.unsubs.push(unsub);
                    var serversStatus = this.appStore.getState().appdb.getIn(['serversStatus']);
                    this.loadServerStats(serversStatus);
                    unsub = this.appStore.sub(function (serversStatus) {
                        _this.loadServerStats(serversStatus);
                    }, 'appdb.serversStatus', false);
                    this.unsubs.push(unsub);
                };
                Dashboard.prototype.loadServerStats = function (serversStatus) {
                    if (!serversStatus)
                        return;
                    var self = this;
                    var c = 0;
                    var t = 0;
                    this.serverStats = [];
                    this.serverStatsCategories = [];
                    var servers = ['galaxy'];
                    this.appStore.getState().stations.forEach(function (v, server) {
                        servers.push(server.split('.')[0]);
                    });
                    serversStatus.forEach(function (value, key) {
                        if (servers.indexOf(key) > -1) {
                            self.serverStatsCategories.push(key);
                            c++;
                            t = t + Number(value);
                            self.serverStats.push(Number(value));
                        }
                    });
                    this.serverAvgResponse = t / c;
                };
                Dashboard.prototype.onStationComponentSelect = function (stationComponentMode) {
                    this.stationComponentMode = stationComponentMode;
                    switch (stationComponentMode) {
                        case 'map': {
                            break;
                        }
                        case 'grid': {
                            break;
                        }
                    }
                };
                Dashboard.prototype.initStationsFilter = function () {
                    var _this = this;
                    this.stations.forEach(function (stationList, source) {
                        stationList.forEach(function (i_station) {
                            _this.stationsFilter['os'].push(i_station.getKey('os'));
                            _this.stationsFilter['appVersion'].push(i_station.getKey('appVersion'));
                            _this.stationsFilter['airVersion'].push(i_station.getKey('airVersion'));
                        });
                    });
                    this.stationsFilter['os'] = _.uniq(this.stationsFilter['os']).filter(function (n) {
                        return n != '';
                    });
                    this.stationsFilter['appVersion'] = _.uniq(this.stationsFilter['appVersion']).filter(function (n) {
                        return n != '';
                    });
                    this.stationsFilter['airVersion'] = _.uniq(this.stationsFilter['airVersion']).filter(function (n) {
                        return n != '';
                    });
                };
                Dashboard.prototype.setStationsFiltered = function () {
                    var _this = this;
                    setTimeout(function () {
                        var stationsFiltered = immutable_1.List();
                        var screensOnline = 0;
                        var screensOffline = 0;
                        var score;
                        var STATION_SCORE = 5;
                        _this.stations.forEach(function (stationList, source) {
                            stationList.forEach(function (i_station) {
                                score = 0;
                                var os = i_station.getKey('os');
                                var appVersion = i_station.getKey('appVersion');
                                var airVersion = i_station.getKey('airVersion');
                                var connection = i_station.getKey('connection');
                                var name = i_station.getKey('name');
                                connection == 0 ? screensOffline++ : screensOnline++;
                                if ((_this.stationsFilteredBy['os'] == 'all' || _this.stationsFilteredBy['os'] == os))
                                    score++;
                                if (_this.stationsFilteredBy['name'] == 'all' || name.toLowerCase().match(_this.stationsFilteredBy['name'].toLowerCase()))
                                    score++;
                                if (_this.stationsFilteredBy['appVersion'] == 'all' || _this.stationsFilteredBy['appVersion'] == appVersion)
                                    score++;
                                if (_this.stationsFilteredBy['airVersion'] == 'all' || _this.stationsFilteredBy['airVersion'] == airVersion)
                                    score++;
                                if (_this.stationsFilteredBy['connection'] == 'all' || _this.stationsFilteredBy['connection'] == connection || (_this.stationsFilteredBy['connection'] == '1' && connection > 0))
                                    score++;
                                if (score == STATION_SCORE)
                                    stationsFiltered = stationsFiltered.push(i_station);
                            });
                        });
                        _this.screensOffline = 'screens offline ' + screensOffline;
                        _this.screensOnline = 'screens online ' + screensOnline;
                        _this.stationsFiltered = stationsFiltered;
                        _this.totalFilteredPlayers = _this.stationsFiltered.size;
                        _this.cd.markForCheck();
                    }, 1000);
                };
                Dashboard.prototype.onStationsFilterSelected = function (filterType, filterValue, delay) {
                    if (filterType == 'connection') {
                        if (filterValue == 'connected') {
                            filterValue = '1';
                        }
                        else if (filterValue == 'disconnected') {
                            filterValue = '0';
                        }
                    }
                    if (filterType == 'name') {
                        if (filterValue == '')
                            filterValue = 'all';
                    }
                    this.stationsFilteredBy[filterType] = filterValue.match('all') ? 'all' : filterValue;
                    this.setStationsFiltered();
                };
                Dashboard.prototype.onStationModalOpen = function (i_stationModel) {
                    this.selectedStation = i_stationModel;
                    this.modalStationDetails.open('lg');
                };
                Dashboard.prototype.listenBusinessNameFilter = function () {
                    var _this = this;
                    return this.businessNameControl.valueChanges
                        .debounceTime(250)
                        .distinctUntilChanged()
                        .subscribe(function (value) {
                        _this.onStationsFilterSelected('name', value, 100);
                    });
                };
                Dashboard.prototype.ngOnDestroy = function () {
                    this.unsubs.forEach(function (unsub) {
                        unsub();
                    });
                };
                __decorate([
                    core_1.ViewChild('modalStationDetails'), 
                    __metadata('design:type', modal_1.ModalComponent)
                ], Dashboard.prototype, "modalStationDetails", void 0);
                Dashboard = __decorate([
                    core_1.Component({
                        selector: 'Dashboard',
                        moduleId: __moduleName,
                        host: {
                            '[style.display]': "'block'"
                        },
                        animations: [],
                        styles: ["      \n      * {\n             border-radius: 0 !important;\n        }\n        input {\n             border-radius: 0 !important;\n        }  \n    "],
                        providers: [BusinessAction_1.BusinessAction],
                        template: Dashboard_html_text_1.default
                    }), 
                    __metadata('design:paramtypes', [AuthService_1.AuthService, angular2_redux_util_1.AppStore, AppdbAction_1.AppdbAction, core_1.ChangeDetectorRef, CommBroker_1.CommBroker])
                ], Dashboard);
                return Dashboard;
            }());
            exports_1("Dashboard", Dashboard);
        }
    }
});
