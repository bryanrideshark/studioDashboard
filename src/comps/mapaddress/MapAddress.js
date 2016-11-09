System.register(["@angular/core", "@angular/forms"], function(exports_1, context_1) {
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
    var core_1, forms_1;
    var MapAddress;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            MapAddress = (function () {
                function MapAddress() {
                    this.searchControl = new forms_1.FormControl();
                    this.onChange = new core_1.EventEmitter();
                }
                MapAddress.prototype.ngOnInit = function () {
                    var _this = this;
                    this.unsub = this.searchControl.valueChanges
                        .debounceTime(400)
                        .distinctUntilChanged()
                        .filter(function (address) {
                        return address.length > 3;
                    }).do(function (address) {
                        if (!_this.geocoder)
                            _this.geocoder = new google.maps.Geocoder();
                        _this.geocoder.geocode({ 'address': address }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                                    var event = {
                                        coords: {
                                            lat: results[0].geometry.location.lat(),
                                            lng: results[0].geometry.location.lng()
                                        }
                                    };
                                    _this.onChange.emit(event);
                                }
                                else {
                                }
                            }
                            else {
                            }
                        });
                    }).subscribe(function () {
                    });
                };
                MapAddress.prototype.clear = function () {
                    this.searchControl.setValue('');
                };
                MapAddress.prototype.ngOnDestroy = function () {
                    this.unsub.unsubscribe();
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], MapAddress.prototype, "onChange", void 0);
                MapAddress = __decorate([
                    core_1.Component({
                        selector: 'MapAddress',
                        moduleId: __moduleName,
                        template: "\n                <input class=\"form-control\" placeholder=\"enter address\" \n                type=\"text\" [formControl]=\"searchControl\"/>\n              ",
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [])
                ], MapAddress);
                return MapAddress;
            }());
            exports_1("MapAddress", MapAddress);
        }
    }
});
