System.register(["@angular/core", "@angular/forms", "../../../../adnet/AdnetActions", "angular2-redux-util", "../../../../adnet/AdnetContentModel", "../../../../Lib", "lodash", './AdnetNetworkPackageContentProps.html!text', './AdnetNetworkPackageCommonStyles.css!text', "../../../../adnet/AdnetPackageModel"], function(exports_1, context_1) {
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
    var core_1, forms_1, AdnetActions_1, angular2_redux_util_1, AdnetContentModel_1, Lib_1, _, AdnetNetworkPackageContentProps_html_text_1, AdnetNetworkPackageCommonStyles_css_text_1, AdnetPackageModel_1;
    var AdnetNetworkPackageContentProps;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (AdnetActions_1_1) {
                AdnetActions_1 = AdnetActions_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (AdnetContentModel_1_1) {
                AdnetContentModel_1 = AdnetContentModel_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (AdnetNetworkPackageContentProps_html_text_1_1) {
                AdnetNetworkPackageContentProps_html_text_1 = AdnetNetworkPackageContentProps_html_text_1_1;
            },
            function (AdnetNetworkPackageCommonStyles_css_text_1_1) {
                AdnetNetworkPackageCommonStyles_css_text_1 = AdnetNetworkPackageCommonStyles_css_text_1_1;
            },
            function (AdnetPackageModel_1_1) {
                AdnetPackageModel_1 = AdnetPackageModel_1_1;
            }],
        execute: function() {
            AdnetNetworkPackageContentProps = (function () {
                function AdnetNetworkPackageContentProps(fb, appStore, adnetAction) {
                    var _this = this;
                    this.fb = fb;
                    this.appStore = appStore;
                    this.adnetAction = adnetAction;
                    this.showResourceOnly = false;
                    this.formInputs = {};
                    this.resource = '';
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                    this.contGroup = fb.group({
                        'maintainAspectRatio': [''],
                        'duration': ['10'],
                        'reparationsPerHour': ['60'],
                        'locationLat': [''],
                        'locationLng': [''],
                        'locationRadios': [''],
                    });
                    _.forEach(this.contGroup.controls, function (value, key) {
                        _this.formInputs[key] = _this.contGroup.controls[key];
                    });
                }
                Object.defineProperty(AdnetNetworkPackageContentProps.prototype, "setAdnetPackageModels", {
                    set: function (i_adnetPackageModels) {
                        if (!i_adnetPackageModels)
                            return;
                        this.adnetPackageModels = i_adnetPackageModels;
                        this.renderFormInputs();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdnetNetworkPackageContentProps.prototype, "setAdnetContentModels", {
                    set: function (i_adnetContentModels) {
                        this.adnetContentModels = i_adnetContentModels;
                        if (!i_adnetContentModels)
                            return;
                        this.renderFormInputs();
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetNetworkPackageContentProps.prototype.onFormChange = function (event) {
                    this.updateSore();
                };
                AdnetNetworkPackageContentProps.prototype.updateSore = function () {
                    var _this = this;
                    setTimeout(function () {
                        var payload = Lib_1.Lib.CleanCharForXml(_this.contGroup.value);
                        _this.appStore.dispatch(_this.adnetAction.updAdnetContentProps(payload, _this.adnetContentModels, _this.adnetPackageModels));
                    }, 1);
                };
                AdnetNetworkPackageContentProps.prototype.renderFormInputs = function () {
                    var _this = this;
                    if (!this.adnetContentModels)
                        return;
                    this.resource = this.adnetContentModels.getContentUrl();
                    _.forEach(this.formInputs, function (value, key) {
                        var data = _this.adnetContentModels.getKey('Value')[key];
                        _this.formInputs[key].setValue(data);
                    });
                };
                ;
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetPackageModel_1.AdnetPackageModel), 
                    __metadata('design:paramtypes', [AdnetPackageModel_1.AdnetPackageModel])
                ], AdnetNetworkPackageContentProps.prototype, "setAdnetPackageModels", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetContentModel_1.AdnetContentModel), 
                    __metadata('design:paramtypes', [AdnetContentModel_1.AdnetContentModel])
                ], AdnetNetworkPackageContentProps.prototype, "setAdnetContentModels", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], AdnetNetworkPackageContentProps.prototype, "showResourceOnly", void 0);
                AdnetNetworkPackageContentProps = __decorate([
                    core_1.Component({
                        selector: 'AdnetNetworkPackageContentProps',
                        moduleId: __moduleName,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        host: { '(input-blur)': 'onFormChange($event)' },
                        template: AdnetNetworkPackageContentProps_html_text_1.default,
                        styles: [AdnetNetworkPackageCommonStyles_css_text_1.default]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, angular2_redux_util_1.AppStore, AdnetActions_1.AdnetActions])
                ], AdnetNetworkPackageContentProps);
                return AdnetNetworkPackageContentProps;
            }());
            exports_1("AdnetNetworkPackageContentProps", AdnetNetworkPackageContentProps);
        }
    }
});
