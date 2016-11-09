System.register(["@angular/core", "src/Lib", "../../../../adnet/AdnetPackageModel", './AdnetNetworkPackageViewProps.html!text'], function(exports_1, context_1) {
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
    var core_1, Lib_1, AdnetPackageModel_1, AdnetNetworkPackageViewProps_html_text_1;
    var AdnetNetworkPackageViewProps;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (AdnetPackageModel_1_1) {
                AdnetPackageModel_1 = AdnetPackageModel_1_1;
            },
            function (AdnetNetworkPackageViewProps_html_text_1_1) {
                AdnetNetworkPackageViewProps_html_text_1 = AdnetNetworkPackageViewProps_html_text_1_1;
            }],
        execute: function() {
            AdnetNetworkPackageViewProps = (function () {
                function AdnetNetworkPackageViewProps() {
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                }
                Object.defineProperty(AdnetNetworkPackageViewProps.prototype, "setAdnetPackageModel", {
                    set: function (i_adnetPackageModels) {
                        this.adnetPackageModels = i_adnetPackageModels;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetPackageModel_1.AdnetPackageModel), 
                    __metadata('design:paramtypes', [AdnetPackageModel_1.AdnetPackageModel])
                ], AdnetNetworkPackageViewProps.prototype, "setAdnetPackageModel", null);
                AdnetNetworkPackageViewProps = __decorate([
                    core_1.Component({
                        template: AdnetNetworkPackageViewProps_html_text_1.default,
                        selector: 'AdnetNetworkPackageViewProps',
                        styles: ["\n        \n    "],
                        moduleId: __moduleName
                    }), 
                    __metadata('design:paramtypes', [])
                ], AdnetNetworkPackageViewProps);
                return AdnetNetworkPackageViewProps;
            }());
            exports_1("AdnetNetworkPackageViewProps", AdnetNetworkPackageViewProps);
        }
    }
});
