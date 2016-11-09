System.register(["@angular/core", "lodash", "angular2-google-maps/core/core.umd.js"], function(exports_1, context_1) {
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
    var core_1, _, core_umd_js_1;
    var StationsMap;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (core_umd_js_1_1) {
                core_umd_js_1 = core_umd_js_1_1;
            }],
        execute: function() {
            StationsMap = (function () {
                function StationsMap(cdr) {
                    var _this = this;
                    this.cdr = cdr;
                    this.onStationSelected = new core_1.EventEmitter();
                    this.onMapClicked = new core_1.EventEmitter();
                    this.markers = [];
                    this.zoom = 4;
                    this.lat = 39.8282;
                    this.lng = 98.5795;
                    this.chartMap = {};
                    setInterval(function () {
                        _this.forceUpdateUi();
                    }, 3000);
                }
                StationsMap.prototype.ngAfterViewInit = function () {
                    console.log(this.googleMaps);
                };
                StationsMap.prototype.getMarkerIcon = function (m) {
                    this.cdr.detach();
                    return "assets/screen_" + m.color + ".png";
                };
                StationsMap.prototype.clickedMarker = function (marker, index) {
                    this.onStationSelected.emit(marker.instance);
                };
                StationsMap.prototype.mapClicked = function ($event) {
                    this.onMapClicked.emit($event);
                };
                Object.defineProperty(StationsMap.prototype, "stations", {
                    set: function (i_stations) {
                        this.m_stations = i_stations;
                        this.updateStations();
                    },
                    enumerable: true,
                    configurable: true
                });
                StationsMap.prototype.onInit = function (event) {
                    this.updateStations();
                };
                StationsMap.prototype.getStationConnection = function (i_value) {
                    if (i_value == 0)
                        return 'red';
                    if (i_value == 1)
                        return 'green';
                    if (i_value == 2)
                        return 'yellow';
                    return 'black';
                };
                StationsMap.prototype.forceUpdateUi = function () {
                    var _this = this;
                    this.cdr.reattach();
                    setTimeout(function () {
                        _this.cdr.detach();
                    }, 1000);
                };
                StationsMap.prototype.updateStations = function () {
                    var _this = this;
                    if (!this.m_stations)
                        return;
                    var c = 0;
                    this.markers = [];
                    this.m_stations.forEach(function (i_station) {
                        var geoLocation = i_station.getLocation();
                        if (_.isEmpty(geoLocation) || geoLocation.lat == 0 && geoLocation.lon == 0)
                            return;
                        _this.markers.push({
                            instance: i_station,
                            id: i_station.getStationId(),
                            name: i_station.getKey('name'),
                            color: i_station.getConnectionIcon('color'),
                            lat: +geoLocation.lat,
                            lng: +geoLocation.lon,
                            label: '',
                            draggable: false
                        });
                    });
                    this.forceUpdateUi();
                };
                StationsMap.prototype.clear = function () {
                    this.markers = [];
                    this.forceUpdateUi();
                };
                StationsMap.prototype.setCenter = function (lat, lng) {
                    this.googleMaps['_mapsWrapper'].setCenter({
                        lat: lat,
                        lng: lng,
                    });
                };
                __decorate([
                    core_1.ViewChild('googleMaps'), 
                    __metadata('design:type', core_umd_js_1.SebmGoogleMap)
                ], StationsMap.prototype, "googleMaps", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], StationsMap.prototype, "onStationSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], StationsMap.prototype, "onMapClicked", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], StationsMap.prototype, "stations", null);
                StationsMap = __decorate([
                    core_1.Component({
                        selector: 'stationsMap',
                        template: "\n        <sebm-google-map #googleMaps style=\"width: 100% ; height: 100%\"\n              (mapClick)=\"mapClicked($event)\"\n              [latitude]=\"38.2500\"\n              [longitude]=\"-96.7500\"\n              [zoom]=\"zoom\"\n              [disableDefaultUI]=\"false\"\n              [zoomControl]=\"false\">\n            \n              <sebm-google-map-marker style=\"width: 300px ; height: 400px\" \n                  *ngFor=\"let m of markers; let i = index\"\n                  (markerClick)=\"clickedMarker(m, i)\"\n                  [latitude]=\"m.lat\"\n                  [longitude]=\"m.lng\"\n                  [iconUrl]=\"getMarkerIcon(m)\"\n                  [label]=\"m.label\">\n                <!--<sebm-google-map-info-window>-->\n                  <!--<strong>InfoWindow content</strong>-->\n                <!--</sebm-google-map-info-window>-->\n        \n      </sebm-google-map-marker>\n    </sebm-google-map>\n    "
                    }), 
                    __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
                ], StationsMap);
                return StationsMap;
            }());
            exports_1("StationsMap", StationsMap);
        }
    }
});
