System.register(["@angular/core", "../../../stations/StationModel", "angular2-redux-util", "lodash", "../../../business/BusinessAction", "./StationSnapshot", './StationDetails.html!text', './StationDetails.css!text'], function(exports_1, context_1) {
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
    var core_1, StationModel_1, angular2_redux_util_1, _, BusinessAction_1, StationSnapshot_1, StationDetails_html_text_1, StationDetails_css_text_1;
    var StationDetails;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (StationModel_1_1) {
                StationModel_1 = StationModel_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (BusinessAction_1_1) {
                BusinessAction_1 = BusinessAction_1_1;
            },
            function (StationSnapshot_1_1) {
                StationSnapshot_1 = StationSnapshot_1_1;
            },
            function (StationDetails_html_text_1_1) {
                StationDetails_html_text_1 = StationDetails_html_text_1_1;
            },
            function (StationDetails_css_text_1_1) {
                StationDetails_css_text_1 = StationDetails_css_text_1_1;
            }],
        execute: function() {
            StationDetails = (function () {
                function StationDetails(appStore, businessActions, elRef, renderer) {
                    this.appStore = appStore;
                    this.businessActions = businessActions;
                    this.elRef = elRef;
                    this.renderer = renderer;
                    this.snapshots = [];
                }
                StationDetails.prototype.sendSnapshot = function () {
                    this.stationSnapshot.sendSnapshot(this.m_selectedStation);
                };
                StationDetails.prototype.onModalClose = function ($event) {
                };
                StationDetails.prototype.sendCommand = function (i_command, i_param) {
                    var source = this.m_selectedStation.getSource(this.appStore);
                    var customerUserName = this.m_selectedStation.getCustomerName(this.appStore);
                    var stationId = this.m_selectedStation.getStationId();
                    var businessId = this.m_selectedStation.getKey('businessId');
                    this.businessActions.getUserPass(customerUserName, function (i_pass) {
                        var url = "https://" + source + "/WebService/sendCommand.ashx?i_user=" + customerUserName + "&i_password=" + i_pass + "&i_stationId=" + stationId + "&i_command=" + i_command + "&i_param1=" + i_param + "&i_param2=''&callback=?";
                        console.log(url);
                        jQuery.getJSON(url, function (res) {
                            console.log(res);
                        });
                    });
                };
                Object.defineProperty(StationDetails.prototype, "station", {
                    set: function (i_selectedStation) {
                        if (_.isUndefined(i_selectedStation))
                            return;
                        this.m_selectedStation = i_selectedStation;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.ViewChild(StationSnapshot_1.StationSnapshot), 
                    __metadata('design:type', StationSnapshot_1.StationSnapshot)
                ], StationDetails.prototype, "stationSnapshot", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', StationModel_1.StationModel), 
                    __metadata('design:paramtypes', [StationModel_1.StationModel])
                ], StationDetails.prototype, "station", null);
                StationDetails = __decorate([
                    core_1.Component({
                        selector: 'stationDetails',
                        moduleId: __moduleName,
                        template: StationDetails_html_text_1.default,
                        styles: [StationDetails_css_text_1.default],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, BusinessAction_1.BusinessAction, core_1.ElementRef, core_1.Renderer])
                ], StationDetails);
                return StationDetails;
            }());
            exports_1("StationDetails", StationDetails);
        }
    }
});
