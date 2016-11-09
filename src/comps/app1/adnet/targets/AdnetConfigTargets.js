System.register(["@angular/core", "../../../../adnet/AdnetCustomerModel", "angular2-redux-util", "./AdnetConfigTargets.html!text", "../../../compbaser/Compbaser"], function(exports_1, context_1) {
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
    var core_1, AdnetCustomerModel_1, angular2_redux_util_1, AdnetConfigTargets_html_text_1, Compbaser_1;
    var AdnetConfigTargets;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (AdnetCustomerModel_1_1) {
                AdnetCustomerModel_1 = AdnetCustomerModel_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (AdnetConfigTargets_html_text_1_1) {
                AdnetConfigTargets_html_text_1 = AdnetConfigTargets_html_text_1_1;
            },
            function (Compbaser_1_1) {
                Compbaser_1 = Compbaser_1_1;
            }],
        execute: function() {
            AdnetConfigTargets = (function (_super) {
                __extends(AdnetConfigTargets, _super);
                function AdnetConfigTargets(appStore) {
                    _super.call(this);
                    this.appStore = appStore;
                }
                AdnetConfigTargets.prototype.ngOnInit = function () {
                    var _this = this;
                    this.callOnDestroy(this.appStore.sub(function (i_adTargets) {
                        i_adTargets.forEach(function (i_adTarget) {
                            if (_this.adnetTargetModel && i_adTarget.getId() == _this.adnetTargetModel.getId()) {
                                _this.adnetTargetModel = i_adTarget;
                                return;
                            }
                        });
                    }, 'adnet.targets'));
                };
                Object.defineProperty(AdnetConfigTargets.prototype, "adnetCustomerModel", {
                    set: function (i_adnetCustomerModel) {
                        this.customerModel = i_adnetCustomerModel;
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetConfigTargets.prototype.onTargetSelected = function (event) {
                    this.adnetTargetModel = event;
                };
                AdnetConfigTargets.prototype.destroy = function () {
                    console.log('on destroy sub-class');
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetCustomerModel_1.AdnetCustomerModel), 
                    __metadata('design:paramtypes', [AdnetCustomerModel_1.AdnetCustomerModel])
                ], AdnetConfigTargets.prototype, "adnetCustomerModel", null);
                AdnetConfigTargets = __decorate([
                    core_1.Component({
                        selector: 'AdnetConfigTargets',
                        moduleId: __moduleName,
                        template: AdnetConfigTargets_html_text_1.default
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore])
                ], AdnetConfigTargets);
                return AdnetConfigTargets;
            }(Compbaser_1.Compbaser));
            exports_1("AdnetConfigTargets", AdnetConfigTargets);
        }
    }
});
