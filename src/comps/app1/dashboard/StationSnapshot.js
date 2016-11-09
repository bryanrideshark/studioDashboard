System.register(["@angular/core", "angular2-redux-util", "rxjs/Rx", "rxjs/add/operator/do", "rxjs/add/observable/fromEvent", "rxjs/add/observable/interval", "../../../business/BusinessAction"], function(exports_1, context_1) {
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
    var core_1, angular2_redux_util_1, Rx_1, BusinessAction_1;
    var StationSnapshot;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (BusinessAction_1_1) {
                BusinessAction_1 = BusinessAction_1_1;
            }],
        execute: function() {
            StationSnapshot = (function () {
                function StationSnapshot(appStore, businessActions, elRef, renderer) {
                    this.appStore = appStore;
                    this.businessActions = businessActions;
                    this.elRef = elRef;
                    this.renderer = renderer;
                }
                StationSnapshot.prototype.sendSnapshot = function (selectedStation) {
                    var _this = this;
                    var stationId = selectedStation.getStationId();
                    var businessId = selectedStation.getKey('businessId');
                    var fileName = Date.now();
                    var source = selectedStation.getSource(this.appStore);
                    var customerUserName = selectedStation.getCustomerName(this.appStore);
                    this.businessActions.getUserPass(customerUserName, function (i_pass) {
                        var pass = i_pass;
                        var url = "https://" + source + "/WebService/sendCommand.ashx?i_user=" + customerUserName + "&i_password=" + pass + "&i_stationId=" + stationId + "&i_command=captureScreen2&i_param1=" + fileName + "&i_param2=0.2&callback=?";
                        jQuery.getJSON(url, function () {
                            var path = "https://" + source + "/Snapshots/business" + businessId + "/station" + stationId + "/" + fileName + ".jpg";
                            jQuery(_this.elRef.nativeElement).find('.newImage').fadeOut(200);
                            var img = _this.renderer.createElement(_this.elRef.nativeElement, 'img', null);
                            jQuery(img).addClass('snap');
                            var int$ = Rx_1.Observable.interval(500).do(function () {
                                img.src = path;
                            });
                            var $err = Rx_1.Observable.fromEvent(img, 'error').do(function () {
                                jQuery(_this.elRef.nativeElement).find('.snap').remove();
                            });
                            var load$ = Rx_1.Observable.fromEvent(img, 'load');
                            var subscription = Rx_1.Observable.merge(int$, $err).takeUntil(load$).delay(500).subscribe(function (res) {
                                subscription.unsubscribe();
                            });
                        });
                    });
                };
                StationSnapshot = __decorate([
                    core_1.Directive({
                        selector: 'StationSnapshot',
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, BusinessAction_1.BusinessAction, core_1.ElementRef, core_1.Renderer])
                ], StationSnapshot);
                return StationSnapshot;
            }());
            exports_1("StationSnapshot", StationSnapshot);
        }
    }
});
