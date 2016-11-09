System.register(["@angular/core", "../../../../adnet/AdnetCustomerModel"], function(exports_1, context_1) {
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
    var core_1, AdnetCustomerModel_1;
    var AdnetConfig;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (AdnetCustomerModel_1_1) {
                AdnetCustomerModel_1 = AdnetCustomerModel_1_1;
            }],
        execute: function() {
            AdnetConfig = (function () {
                function AdnetConfig() {
                    this.adnetCustomerId = -1;
                }
                Object.defineProperty(AdnetConfig.prototype, "setAdnetCustomerModel", {
                    set: function (i_adnetCustomerModel) {
                        this.adnetCustomerModel = i_adnetCustomerModel;
                        if (this.adnetCustomerModel)
                            this.adnetCustomerId = this.adnetCustomerModel.customerId();
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetCustomerModel_1.AdnetCustomerModel), 
                    __metadata('design:paramtypes', [AdnetCustomerModel_1.AdnetCustomerModel])
                ], AdnetConfig.prototype, "setAdnetCustomerModel", null);
                AdnetConfig = __decorate([
                    core_1.Component({
                        selector: 'AdnetConfig',
                        moduleId: __moduleName,
                        template: "\n         <div>\n             <tabs *ngIf=\"adnetCustomerId != -1\">\n                <tab [tabtitle]=\"'Setup'\">                      \n                  <AdnetConfigCustomer [adnetCustomerModel]=\"adnetCustomerModel\"></AdnetConfigCustomer>\n                </tab>          \n                <tab [tabtitle]=\"'Rates'\">\n                  <AdnetConfigRates [adnetCustomerModel]=\"adnetCustomerModel\"></AdnetConfigRates>\n                </tab>\n                <tab [tabtitle]=\"'Targets'\">\n                    <AdnetConfigTargets [adnetCustomerModel]=\"adnetCustomerModel\"></AdnetConfigTargets>                    \n                </tab>\n            </tabs>\n         </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AdnetConfig);
                return AdnetConfig;
            }());
            exports_1("AdnetConfig", AdnetConfig);
        }
    }
});
