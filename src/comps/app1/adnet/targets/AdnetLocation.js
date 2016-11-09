System.register(["@angular/core", "../../../../adnet/AdnetTargetModel", "../../../../stations/StationModel", 'immutable', "../../dashboard/StationsMap", "angular2-redux-util", "../../../../adnet/AdnetActions", "../../../mapaddress/MapAddress", "../../../../adnet/AdnetCustomerModel", 'lodash', "../../../../Lib"], function(exports_1, context_1) {
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
    var core_1, AdnetTargetModel_1, StationModel_1, immutable_1, StationsMap_1, angular2_redux_util_1, AdnetActions_1, MapAddress_1, AdnetCustomerModel_1, _, Lib_1;
    var AdnetLocation;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (AdnetTargetModel_1_1) {
                AdnetTargetModel_1 = AdnetTargetModel_1_1;
            },
            function (StationModel_1_1) {
                StationModel_1 = StationModel_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (StationsMap_1_1) {
                StationsMap_1 = StationsMap_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (AdnetActions_1_1) {
                AdnetActions_1 = AdnetActions_1_1;
            },
            function (MapAddress_1_1) {
                MapAddress_1 = MapAddress_1_1;
            },
            function (AdnetCustomerModel_1_1) {
                AdnetCustomerModel_1 = AdnetCustomerModel_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            }],
        execute: function() {
            AdnetLocation = (function () {
                function AdnetLocation(appStore, adnetAction) {
                    this.appStore = appStore;
                    this.adnetAction = adnetAction;
                    this.stations = immutable_1.List();
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                }
                Object.defineProperty(AdnetLocation.prototype, "adnetTargetModel", {
                    set: function (i_adnetTargetModel) {
                        if (!i_adnetTargetModel) {
                            this.stations = null;
                            if (this.stationsMap)
                                this.stationsMap.clear();
                            this.mapAddress.clear();
                            return;
                        }
                        this.selectedAdnetTargetModel = i_adnetTargetModel;
                        this.onUpdateMap();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdnetLocation.prototype, "activated", {
                    set: function (value) {
                        if (value)
                            this.stationComponentMode = 'map';
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetLocation.prototype.onUpdateMap = function () {
                    var lat = this.selectedAdnetTargetModel ? this.selectedAdnetTargetModel.getCoordinates().lat : 0;
                    var lon = this.selectedAdnetTargetModel ? this.selectedAdnetTargetModel.getCoordinates().lng : 0;
                    var name = this.selectedAdnetTargetModel ? this.selectedAdnetTargetModel.getName() : '';
                    var stationData = {
                        businessId: this.adnetCustomerModel.customerId(),
                        id: _.uniqueId(),
                        geoLocation: {
                            lat: lat,
                            lon: lon
                        },
                        source: -1,
                        airVersion: -1,
                        appVersion: -1,
                        caching: -1,
                        localIp: -1,
                        publicIp: -1,
                        cameraStatus: -1,
                        connection: -1,
                        lastCameraTest: -1,
                        lastUpdate: -1,
                        name: name,
                        os: '',
                        peakMemory: '',
                        runningTime: '',
                        socket: '',
                        startTime: '',
                        status: '',
                        totalMemory: '',
                        watchDogConnection: ''
                    };
                    this.stations = immutable_1.List();
                    var stationModel = new StationModel_1.StationModel(stationData);
                    this.stations = this.stations.push(stationModel);
                    if (this.stationsMap) {
                        this.stationsMap.setCenter(stationModel.getLocation().lat, stationModel.getLocation().lon);
                    }
                };
                AdnetLocation.prototype.onUpdatedStationCoords = function (event) {
                    var payload = this.selectedAdnetTargetModel.getKey('Value');
                    payload.locationLat = event['coords'].lat;
                    payload.locationLng = event['coords'].lng;
                    this.appStore.dispatch(this.adnetAction.saveTargetInfo(payload, this.selectedAdnetTargetModel.getId(), this.adnetCustomerModel.customerId()));
                };
                __decorate([
                    core_1.ViewChild(StationsMap_1.StationsMap), 
                    __metadata('design:type', StationsMap_1.StationsMap)
                ], AdnetLocation.prototype, "stationsMap", void 0);
                __decorate([
                    core_1.ViewChild(MapAddress_1.MapAddress), 
                    __metadata('design:type', MapAddress_1.MapAddress)
                ], AdnetLocation.prototype, "mapAddress", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetTargetModel_1.AdnetTargetModel), 
                    __metadata('design:paramtypes', [AdnetTargetModel_1.AdnetTargetModel])
                ], AdnetLocation.prototype, "adnetTargetModel", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], AdnetLocation.prototype, "activated", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetCustomerModel_1.AdnetCustomerModel)
                ], AdnetLocation.prototype, "adnetCustomerModel", void 0);
                AdnetLocation = __decorate([
                    core_1.Component({
                        selector: 'AdnetLocation',
                        moduleId: __moduleName,
                        template: "\n                <small class=\"debug\">{{me}}</small>\n                <MapAddress #mapAddress (onChange)=\"onUpdatedStationCoords($event)\"></MapAddress>\n                <stationsMap #stationsMap (onMapClicked)=\"onUpdatedStationCoords($event)\" \n                   *ngIf=\"stationComponentMode=='map'\" [stations]=\"stations\">\n                </stationsMap>"
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, AdnetActions_1.AdnetActions])
                ], AdnetLocation);
                return AdnetLocation;
            }());
            exports_1("AdnetLocation", AdnetLocation);
        }
    }
});
