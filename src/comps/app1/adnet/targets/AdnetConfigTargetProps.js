System.register(["@angular/core", "@angular/forms", "lodash", 'immutable', "../../../../Lib", "../../../../adnet/AdnetActions", "angular2-redux-util", "../../../../adnet/AdnetCustomerModel", "../../../../adnet/AdnetTargetModel", './AdnetConfigTargetProps.html!text'], function(exports_1, context_1) {
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
    var core_1, forms_1, _, immutable_1, Lib_1, AdnetActions_1, angular2_redux_util_1, AdnetCustomerModel_1, AdnetTargetModel_1, AdnetConfigTargetProps_html_text_1;
    var AdnetConfigTargetProps;
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
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
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
            function (AdnetTargetModel_1_1) {
                AdnetTargetModel_1 = AdnetTargetModel_1_1;
            },
            function (AdnetConfigTargetProps_html_text_1_1) {
                AdnetConfigTargetProps_html_text_1 = AdnetConfigTargetProps_html_text_1_1;
            }],
        execute: function() {
            AdnetConfigTargetProps = (function () {
                function AdnetConfigTargetProps(fb, appStore, cd, adnetAction) {
                    var _this = this;
                    this.fb = fb;
                    this.appStore = appStore;
                    this.cd = cd;
                    this.adnetAction = adnetAction;
                    this.rates = immutable_1.List();
                    this.filteredRates = immutable_1.List();
                    this.formInputs = {};
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                    this.contGroup = fb.group({
                        'enabled': [''],
                        'label': [''],
                        'rateId': [''],
                        'keys': [''],
                        'targetDomain': [''],
                        'locationLat': [''],
                        'locationLng': [''],
                        'targetType': [''],
                        'comments': [''],
                        'standardTimeOffset': [''],
                        'url': ['']
                    });
                    _.forEach(this.contGroup.controls, function (value, key) {
                        _this.formInputs[key] = _this.contGroup.controls[key];
                    });
                }
                AdnetConfigTargetProps.prototype.ngOnInit = function () {
                    var _this = this;
                    var i_adnet = this.appStore.getState().adnet;
                    this.rates = i_adnet.getIn(['rates']);
                    this.unsub = this.appStore.sub(function (i_rates) {
                        _this.rates = i_rates;
                        _this.updFilteredRates();
                    }, 'adnet.rates');
                    this.updFilteredRates();
                };
                Object.defineProperty(AdnetConfigTargetProps.prototype, "adnetTargetModel", {
                    set: function (i_adnetTargetModel) {
                        this.targetModel = i_adnetTargetModel;
                        this.renderFormInputs();
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetConfigTargetProps.prototype.isWebLocation = function () {
                    if (!this.targetModel || this.targetModel.getTargetType() == "0")
                        return true;
                    return false;
                };
                AdnetConfigTargetProps.prototype.updFilteredRates = function () {
                    var _this = this;
                    if (this.rates && this.adnetCustomerModel) {
                        this.filteredRates = immutable_1.List();
                        this.rates.forEach(function (i_adnetRateModel) {
                            if (i_adnetRateModel.customerId() == _this.adnetCustomerModel.customerId()) {
                                _this.filteredRates = _this.filteredRates.push(i_adnetRateModel);
                            }
                        });
                    }
                    this.cd.markForCheck();
                };
                AdnetConfigTargetProps.prototype.getRateId = function (adnetRateModel) {
                    if (!adnetRateModel)
                        return;
                    return adnetRateModel.getId();
                };
                AdnetConfigTargetProps.prototype.getSelectedRate = function (adnetRateModel) {
                    if (!adnetRateModel)
                        return '';
                    if (adnetRateModel.getId() == this.targetModel.getRateId())
                        return 'selected';
                    return '';
                };
                AdnetConfigTargetProps.prototype.onChangeSharing = function (event) {
                    this.updateSore();
                };
                AdnetConfigTargetProps.prototype.updateSore = function () {
                    var _this = this;
                    setTimeout(function () {
                        var payload = Lib_1.Lib.CleanCharForXml(_this.contGroup.value);
                        payload.customerId = _this.adnetCustomerModel.customerId();
                        _this.appStore.dispatch(_this.adnetAction.saveTargetInfo(payload, _this.targetModel.getId(), _this.adnetCustomerModel.customerId()));
                    }, 1);
                };
                AdnetConfigTargetProps.prototype.renderFormInputs = function () {
                    var _this = this;
                    if (!this.targetModel)
                        return;
                    _.forEach(this.formInputs, function (value, key) {
                        var data = _this.targetModel.getKey('Value')[key];
                        _this.formInputs[key].setValue(data);
                    });
                };
                ;
                AdnetConfigTargetProps.prototype.ngOnDestroy = function () {
                    this.unsub();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetTargetModel_1.AdnetTargetModel), 
                    __metadata('design:paramtypes', [AdnetTargetModel_1.AdnetTargetModel])
                ], AdnetConfigTargetProps.prototype, "adnetTargetModel", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetCustomerModel_1.AdnetCustomerModel)
                ], AdnetConfigTargetProps.prototype, "adnetCustomerModel", void 0);
                AdnetConfigTargetProps = __decorate([
                    core_1.Component({
                        selector: 'AdnetConfigTargetProps',
                        moduleId: __moduleName,
                        template: AdnetConfigTargetProps_html_text_1.default,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        host: {
                            '(input-blur)': 'onChangeSharing($event)'
                        },
                        styles: ["\n        .material-switch {\n            position: relative;\n            padding-top: 10px;\n        }\n        .btn-group {\n            width: 100%;\n        }\n        .input-group {\n            padding-top: 10px;\n        }\n        \n        i {\n            width: 20px;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, angular2_redux_util_1.AppStore, core_1.ChangeDetectorRef, AdnetActions_1.AdnetActions])
                ], AdnetConfigTargetProps);
                return AdnetConfigTargetProps;
            }());
            exports_1("AdnetConfigTargetProps", AdnetConfigTargetProps);
        }
    }
});
