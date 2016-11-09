System.register(["@angular/core", "@angular/forms", "lodash", "../../../../Lib", "../../../../adnet/AdnetActions", "angular2-redux-util", "../../../../adnet/AdnetCustomerModel", './AdnetConfigCustomer.html!text', './AdnetConfigCustomer.css!text'], function(exports_1, context_1) {
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
    var core_1, forms_1, _, Lib_1, AdnetActions_1, angular2_redux_util_1, AdnetCustomerModel_1, AdnetConfigCustomer_html_text_1, AdnetConfigCustomer_css_text_1;
    var AdnetConfigCustomer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (AdnetActions_1_1) {
                AdnetActions_1 = AdnetActions_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (AdnetCustomerModel_1_1) {
                AdnetCustomerModel_1 = AdnetCustomerModel_1_1;
            },
            function (AdnetConfigCustomer_html_text_1_1) {
                AdnetConfigCustomer_html_text_1 = AdnetConfigCustomer_html_text_1_1;
            },
            function (AdnetConfigCustomer_css_text_1_1) {
                AdnetConfigCustomer_css_text_1 = AdnetConfigCustomer_css_text_1_1;
            }],
        execute: function() {
            AdnetConfigCustomer = (function () {
                function AdnetConfigCustomer(fb, appStore, adnetAction) {
                    var _this = this;
                    this.fb = fb;
                    this.appStore = appStore;
                    this.adnetAction = adnetAction;
                    this.formInputs = {};
                    this.contGroup = fb.group({
                        'label': [''],
                        'contactPerson': [''],
                        'contactCell': [''],
                        'contactPhone': [''],
                        'contactEmail': [''],
                        'website': [''],
                        'comments': [''],
                        'customerNetwork': [''],
                        'accountNetwork': [''],
                        'globalNetwork': [''],
                        'defaultAutoActivate': ['']
                    });
                    _.forEach(this.contGroup.controls, function (value, key) {
                        _this.formInputs[key] = _this.contGroup.controls[key];
                    });
                }
                Object.defineProperty(AdnetConfigCustomer.prototype, "adnetCustomerModel", {
                    set: function (i_adnetCustomerModel) {
                        this.customerModel = i_adnetCustomerModel;
                        this.renderFormInputs();
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetConfigCustomer.prototype.onInputBlur = function (event) {
                    this.updateSore();
                };
                AdnetConfigCustomer.prototype.onChangeSharing = function (event) {
                    this.updateSore();
                };
                AdnetConfigCustomer.prototype.updateSore = function () {
                    var _this = this;
                    setTimeout(function () {
                        _this.appStore.dispatch(_this.adnetAction.saveCustomerInfo(Lib_1.Lib.CleanCharForXml(_this.contGroup.value), _this.customerModel.customerId()));
                    }, 1);
                };
                AdnetConfigCustomer.prototype.renderFormInputs = function () {
                    var _this = this;
                    if (!this.customerModel)
                        return;
                    _.forEach(this.formInputs, function (value, key) {
                        var data = _this.customerModel.getKey('Value')[key];
                        _this.formInputs[key].setValue(data);
                    });
                };
                ;
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetCustomerModel_1.AdnetCustomerModel), 
                    __metadata('design:paramtypes', [AdnetCustomerModel_1.AdnetCustomerModel])
                ], AdnetConfigCustomer.prototype, "adnetCustomerModel", null);
                AdnetConfigCustomer = __decorate([
                    core_1.Component({
                        selector: 'AdnetConfigCustomer',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        host: {
                            '(input-blur)': 'onInputBlur($event)'
                        },
                        moduleId: __moduleName,
                        template: AdnetConfigCustomer_html_text_1.default,
                        styles: [AdnetConfigCustomer_css_text_1.default]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, angular2_redux_util_1.AppStore, AdnetActions_1.AdnetActions])
                ], AdnetConfigCustomer);
                return AdnetConfigCustomer;
            }());
            exports_1("AdnetConfigCustomer", AdnetConfigCustomer);
        }
    }
});
