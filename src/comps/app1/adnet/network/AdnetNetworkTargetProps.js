System.register(["@angular/core", "@angular/forms", "angular2-redux-util", "../../../../Lib", "lodash", "../../../../adnet/AdnetTargetModel", "../../../ng2-bs3-modal/components/modal", './AdnetNetworkTargetProps.html!text'], function(exports_1, context_1) {
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
    var core_1, forms_1, angular2_redux_util_1, Lib_1, _, AdnetTargetModel_1, modal_1, AdnetNetworkTargetProps_html_text_1;
    var AdnetNetworkTargetProps;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (AdnetTargetModel_1_1) {
                AdnetTargetModel_1 = AdnetTargetModel_1_1;
            },
            function (modal_1_1) {
                modal_1 = modal_1_1;
            },
            function (AdnetNetworkTargetProps_html_text_1_1) {
                AdnetNetworkTargetProps_html_text_1 = AdnetNetworkTargetProps_html_text_1_1;
            }],
        execute: function() {
            AdnetNetworkTargetProps = (function () {
                function AdnetNetworkTargetProps(fb, appStore) {
                    var _this = this;
                    this.fb = fb;
                    this.appStore = appStore;
                    this.formInputs = {};
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                    this.contGroup = fb.group({
                        'keys': [''],
                        'comments': [''],
                        'rate': ['']
                    });
                    _.forEach(this.contGroup.controls, function (value, key) {
                        _this.formInputs[key] = _this.contGroup.controls[key];
                    });
                }
                Object.defineProperty(AdnetNetworkTargetProps.prototype, "setAdnetTargetModel", {
                    set: function (i_adnetTargetModel) {
                        this.adnetTargetModel = i_adnetTargetModel;
                        if (!this.adnetTargetModel)
                            return;
                        var customerId = this.adnetTargetModel.getCustomerId();
                        var customersList = this.appStore.getState().adnet.getIn(['customers']) || {};
                        this.adnetCustomerModel = customersList.filter(function (adnetCustomerModel) {
                            return customerId == adnetCustomerModel.customerId();
                        }).first();
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetNetworkTargetProps.prototype.getReviewIcon = function (item, index) {
                    var reviewRate = this.adnetCustomerModel.reviewRate();
                    reviewRate = reviewRate - index;
                    if (reviewRate <= 0)
                        return 'fa-star-o';
                    if (reviewRate > 0 && reviewRate < 1)
                        return 'fa-star-half-o';
                    return 'fa-star';
                };
                AdnetNetworkTargetProps.prototype.onModalClose = function (event) { };
                AdnetNetworkTargetProps.prototype.onShowRates = function () {
                    var rateId = this.adnetTargetModel.getRateId();
                    if (rateId == 0)
                        return;
                    var customersList = this.appStore.getState().adnet.getIn(['rates']) || {};
                    this.adnetRateModel = customersList.filter(function (adnetRateTable) {
                        return rateId == adnetRateTable.getId();
                    }).first();
                    this.modalRateTable.open('lg');
                };
                AdnetNetworkTargetProps.prototype.updateSore = function () {
                    var _this = this;
                    setTimeout(function () {
                        console.log(_this.contGroup.status + ' ' + JSON.stringify(Lib_1.Lib.CleanCharForXml(_this.contGroup.value)));
                    }, 1);
                };
                AdnetNetworkTargetProps.prototype.renderFormInputs = function () {
                    var _this = this;
                    if (!this.adnetTargetModel)
                        return;
                    _.forEach(this.formInputs, function (value, key) {
                        var data = _this.adnetTargetModel.getKey('Value')[key];
                        _this.formInputs[key].setValue(data);
                    });
                };
                ;
                __decorate([
                    core_1.ViewChild('modalRateTable'), 
                    __metadata('design:type', modal_1.ModalComponent)
                ], AdnetNetworkTargetProps.prototype, "modalRateTable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetTargetModel_1.AdnetTargetModel), 
                    __metadata('design:paramtypes', [AdnetTargetModel_1.AdnetTargetModel])
                ], AdnetNetworkTargetProps.prototype, "setAdnetTargetModel", null);
                AdnetNetworkTargetProps = __decorate([
                    core_1.Component({
                        selector: 'AdnetNetworkTargetProps',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        host: {
                            '(input-blur)': 'onFormChange($event)'
                        },
                        moduleId: __moduleName,
                        template: AdnetNetworkTargetProps_html_text_1.default,
                        styles: ["        \n        input.ng-invalid {\n            border-right: 10px solid red;\n        }\n        .material-switch {\n            position: relative;\n            padding-top: 10px;\n        }\n        .input-group {\n            padding-top: 10px;\n        }\n        i {\n            width: 20px;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, angular2_redux_util_1.AppStore])
                ], AdnetNetworkTargetProps);
                return AdnetNetworkTargetProps;
            }());
            exports_1("AdnetNetworkTargetProps", AdnetNetworkTargetProps);
        }
    }
});
