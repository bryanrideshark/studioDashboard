System.register(["@angular/core", "angular2-redux-util", "rxjs/Observable", 'immutable', 'rxjs/add/operator/catch', 'rxjs/add/operator/finally', 'rxjs/add/observable/throw', '@angular/http', "./StationModel", "../services/CommBroker", "../Conts", 'lodash', 'bootbox', 'xml2js'], function(exports_1, context_1) {
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
    var core_1, angular2_redux_util_1, Observable_1, immutable_1, http_1, StationModel_1, CommBroker_1, Conts_1, _, bootbox, xml2js;
    var RECEIVE_STATIONS, RECEIVE_STATIONS_GEO, RECEIVE_TOTAL_STATIONS, StationsAction;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
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
            function (StationModel_1_1) {
                StationModel_1 = StationModel_1_1;
            },
            function (CommBroker_1_1) {
                CommBroker_1 = CommBroker_1_1;
            },
            function (Conts_1_1) {
                Conts_1 = Conts_1_1;
            },
            function (_4) {
                _ = _4;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (xml2js_1) {
                xml2js = xml2js_1;
            }],
        execute: function() {
            exports_1("RECEIVE_STATIONS", RECEIVE_STATIONS = 'RECEIVE_STATIONS');
            exports_1("RECEIVE_STATIONS_GEO", RECEIVE_STATIONS_GEO = 'RECEIVE_STATIONS_GEO');
            exports_1("RECEIVE_TOTAL_STATIONS", RECEIVE_TOTAL_STATIONS = 'RECEIVE_TOTAL_STATIONS');
            StationsAction = (function (_super) {
                __extends(StationsAction, _super);
                function StationsAction(appStore, _http, commBroker) {
                    _super.call(this, appStore);
                    this.appStore = appStore;
                    this._http = _http;
                    this.commBroker = commBroker;
                    this.m_parseString = xml2js.parseString;
                }
                StationsAction.prototype.getStationGeoLocation = function (i_source, i_businessId, i_stationId) {
                    var stations = this.appStore.getState().stations.get(i_source);
                    if (_.isUndefined(stations))
                        return '';
                    var stationIndex = stations.findIndex(function (stationModel) {
                        return stationModel.getKey('businessId') === i_businessId && stationModel.getKey('id') == i_stationId;
                    });
                    var station = stations.get(stationIndex);
                    return station.getLocation();
                };
                StationsAction.prototype.getStationsInfo = function (config) {
                    var _this = this;
                    var self = this;
                    return function (dispatch) {
                        var totalStations = 0;
                        var observables = [];
                        var _loop_1 = function(i_source) {
                            i_businesses = config[i_source];
                            businesses = i_businesses.join(',');
                            url = "https://" + i_source + "/WebService/StationService.asmx/getSocketStatusList?i_businessList=" + businesses;
                            observables.push(_this._http.get(url).retry(0).map(function (res) {
                                return { xml: res.text(), source: i_source };
                            }));
                        };
                        var i_businesses, businesses, url;
                        for (var i_source in config) {
                            _loop_1(i_source);
                        }
                        Observable_1.Observable.forkJoin(observables).subscribe(function (data) {
                            data.forEach(function (i_data) {
                                var source = i_data.source;
                                var xmlData = i_data.xml;
                                xmlData = xmlData.replace(/&lt;/ig, '<').replace(/&gt;/ig, '>');
                                _this.m_parseString(xmlData, { attrkey: '_attr' }, function (err, result) {
                                    if (err) {
                                        bootbox.alert('problem loading station info');
                                        return;
                                    }
                                    var stations = immutable_1.List();
                                    if (result.string.SocketStatus["0"].Business) {
                                        result.string.SocketStatus["0"].Business.forEach(function (business) {
                                            var businessId = business._attr.businessId;
                                            if (business.Stations["0"].Station) {
                                                business.Stations["0"].Station.forEach(function (station) {
                                                    var stationId = station._attr.id;
                                                    var geoLocation = self.getStationGeoLocation(source, businessId, stationId);
                                                    var stationData = {
                                                        businessId: businessId,
                                                        id: stationId,
                                                        geoLocation: geoLocation,
                                                        source: source,
                                                        airVersion: station._attr.airVersion,
                                                        appVersion: station._attr.appVersion,
                                                        caching: station._attr.caching,
                                                        localIp: station._attr.localAddress,
                                                        publicIp: station._attr.publicIp,
                                                        cameraStatus: station._attr.cameraStatus,
                                                        connection: station._attr.connection,
                                                        lastCameraTest: station._attr.lastCameraTest,
                                                        lastUpdate: station._attr.lastUpdate,
                                                        name: station._attr.name,
                                                        os: station._attr.os,
                                                        peakMemory: station._attr.peakMemory,
                                                        runningTime: station._attr.runningTime,
                                                        socket: station._attr.socket,
                                                        startTime: station._attr.startTime,
                                                        status: station._attr.status,
                                                        totalMemory: station._attr.totalMemory,
                                                        watchDogConnection: station._attr.watchDogConnection
                                                    };
                                                    var stationModel = new StationModel_1.StationModel(stationData);
                                                    stations = stations.push(stationModel);
                                                });
                                            }
                                        });
                                    }
                                    totalStations = totalStations + stations.size;
                                    dispatch(self.receiveStations(stations, source));
                                });
                            });
                        }, function (err) {
                            err = err.json();
                            var status = err['currentTarget'].status;
                            var statusText = err['currentTarget'].statusText;
                            _this.commBroker.fire({
                                fromInstance: _this,
                                event: Conts_1.Consts.Events().STATIONS_NETWORK_ERROR,
                                context: _this,
                                message: ''
                            });
                        }, function () {
                            dispatch(self.receiveTotalStations(totalStations));
                        });
                    };
                };
                StationsAction.prototype.getStationsIps = function () {
                    var _this = this;
                    return function (dispatch) {
                        var stationsIps = [];
                        var stations = _this.appStore.getState().stations;
                        stations.forEach(function (stationList, source) {
                            stationList.forEach(function (i_station) {
                                var ip = i_station.getKey('publicIp');
                                var geoLocation = i_station.getLocation();
                                var id = i_station.getKey('id');
                                var businessId = i_station.getKey('businessId');
                                var source = i_station.getKey('source');
                                if (!_.isUndefined(ip) && _.isEmpty(geoLocation))
                                    stationsIps.push({ id: id, businessId: businessId, ip: ip, source: source });
                            });
                        });
                        var body = JSON.stringify(stationsIps);
                        var basicOptions = {
                            url: 'https://secure.digitalsignage.com/getGeoByIp',
                            headers: new http_1.Headers({ 'Content-Type': 'application/json' }),
                            method: http_1.RequestMethod.Post,
                            body: body
                        };
                        var reqOptions = new http_1.RequestOptions(basicOptions);
                        var req = new http_1.Request(reqOptions);
                        _this._http.request(req)
                            .catch(function (err) {
                            bootbox.alert('Error loading station IPs 1');
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                        })
                            .map(function (result) {
                            var stations = result.json();
                            for (var station in stations) {
                                var i_station = stations[station];
                                var rand = _.random(0, 30) / 100;
                                i_station.lat = (i_station.lat + rand).toFixed(4);
                                i_station.lon = (i_station.lon + rand).toFixed(4);
                                i_station['city'] = i_station.city;
                                i_station['country'] = i_station.country;
                            }
                            dispatch(_this.receiveStationsGeo(stations));
                        }).subscribe();
                    };
                };
                StationsAction.prototype.receiveStations = function (stations, source) {
                    return {
                        type: RECEIVE_STATIONS,
                        stations: stations,
                        source: source
                    };
                };
                StationsAction.prototype.receiveStationsGeo = function (payload) {
                    return {
                        type: RECEIVE_STATIONS_GEO,
                        payload: payload
                    };
                };
                StationsAction.prototype.receiveTotalStations = function (totalStations) {
                    return {
                        type: RECEIVE_TOTAL_STATIONS,
                        totalStations: totalStations
                    };
                };
                StationsAction = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, http_1.Http, CommBroker_1.CommBroker])
                ], StationsAction);
                return StationsAction;
            }(angular2_redux_util_1.Actions));
            exports_1("StationsAction", StationsAction);
        }
    }
});
