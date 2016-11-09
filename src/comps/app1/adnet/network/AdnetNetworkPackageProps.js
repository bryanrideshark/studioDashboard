System.register(["@angular/core", "@angular/forms", "../../../../adnet/AdnetActions", "angular2-redux-util", "../../../../Lib", "lodash", "../../../../adnet/AdnetPackageModel", "immutable", './AdnetNetworkPackageProps.html!text', './AdnetNetworkPackageCommonStyles.css!text'], function(exports_1, context_1) {
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
    var core_1, forms_1, AdnetActions_1, angular2_redux_util_1, Lib_1, _, AdnetPackageModel_1, immutable_1, AdnetNetworkPackageProps_html_text_1, AdnetNetworkPackageCommonStyles_css_text_1;
    var AdnetNetworkPackageProps;
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
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (AdnetPackageModel_1_1) {
                AdnetPackageModel_1 = AdnetPackageModel_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (AdnetNetworkPackageProps_html_text_1_1) {
                AdnetNetworkPackageProps_html_text_1 = AdnetNetworkPackageProps_html_text_1_1;
            },
            function (AdnetNetworkPackageCommonStyles_css_text_1_1) {
                AdnetNetworkPackageCommonStyles_css_text_1 = AdnetNetworkPackageCommonStyles_css_text_1_1;
            }],
        execute: function() {
            AdnetNetworkPackageProps = (function () {
                function AdnetNetworkPackageProps(fb, appStore, adnetAction) {
                    var _this = this;
                    this.fb = fb;
                    this.appStore = appStore;
                    this.adnetAction = adnetAction;
                    this.playModeChanged = new core_1.EventEmitter();
                    this.adnetPackageDays = immutable_1.List();
                    this.formInputs = {};
                    this.packageName = '';
                    this.hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                    this.contGroup = fb.group({
                        'autoAddSiblings': [''],
                        'channel': [''],
                        'contents': [''],
                        'customerId': [''],
                        'daysMask': [''],
                        'deleted': [''],
                        'enabled': [''],
                        'endDate': [''],
                        'hourEnd': [''],
                        'hourStart': [''],
                        'label': [''],
                        'modified': [''],
                        'playMode': [''],
                        'siblingsKey': [''],
                        'startDate': [''],
                    });
                    _.forEach(this.contGroup.controls, function (value, key) {
                        _this.formInputs[key] = _this.contGroup.controls[key];
                    });
                }
                Object.defineProperty(AdnetNetworkPackageProps.prototype, "setAdnetPackageModels", {
                    set: function (i_adnetPackageModels) {
                        this.adnetPackageModels = i_adnetPackageModels;
                        if (!i_adnetPackageModels)
                            return;
                        this.adnetPackageDays = Lib_1.Lib.GetADaysMask(this.adnetPackageModels.daysMask());
                        this.renderFormInputs();
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetNetworkPackageProps.prototype.onFormChange = function (event) {
                    this.updateSore();
                };
                AdnetNetworkPackageProps.prototype.onModelChanged = function (event) {
                    this.playModeChanged.emit(event.target.value);
                };
                AdnetNetworkPackageProps.prototype.numToDay = function (num) {
                    var days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
                    return days[num];
                };
                AdnetNetworkPackageProps.prototype.updateSore = function () {
                    var _this = this;
                    setTimeout(function () {
                        var payload = Lib_1.Lib.CleanCharForXml(_this.contGroup.value);
                        payload.daysMask = _this.getUpdatedDays();
                        _this.appStore.dispatch(_this.adnetAction.updAdnetPackageProps(payload, _this.adnetPackageModels));
                    }, 1);
                };
                AdnetNetworkPackageProps.prototype.getUpdatedDays = function () {
                    var values = [];
                    this.inputs.map(function (v) {
                        values.push(v.nativeElement.checked);
                    });
                    var updateDaysMask = Lib_1.Lib.ComputeMask(values);
                    return updateDaysMask;
                };
                AdnetNetworkPackageProps.prototype.getOptionField = function (key, index) {
                    if (!this.adnetPackageModels)
                        return;
                    var value = this.adnetPackageModels.getKey('Value')[key];
                    if (value == index) {
                        return 'selected';
                    }
                    return '';
                };
                AdnetNetworkPackageProps.prototype.renderFormInputs = function () {
                    var _this = this;
                    if (!this.adnetPackageModels)
                        return;
                    _.forEach(this.formInputs, function (value, key) {
                        var data;
                        switch (key) {
                            case 'startDate': {
                            }
                            case 'endDate': {
                                var data = _this.adnetPackageModels.getKey('Value')[key];
                                data = Lib_1.Lib.ProcessDateField(data, false);
                                break;
                            }
                            default: {
                                data = _this.adnetPackageModels.getKey('Value')[key];
                            }
                        }
                        _this.formInputs[key].setValue(data);
                    });
                };
                ;
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkPackageProps.prototype, "playModeChanged", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetPackageModel_1.AdnetPackageModel), 
                    __metadata('design:paramtypes', [AdnetPackageModel_1.AdnetPackageModel])
                ], AdnetNetworkPackageProps.prototype, "setAdnetPackageModels", null);
                __decorate([
                    core_1.ViewChildren('checkInputs'), 
                    __metadata('design:type', core_1.QueryList)
                ], AdnetNetworkPackageProps.prototype, "inputs", void 0);
                AdnetNetworkPackageProps = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'AdnetNetworkPackageProps',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        host: { '(input-blur)': 'onFormChange($event)' },
                        template: AdnetNetworkPackageProps_html_text_1.default,
                        styles: [AdnetNetworkPackageCommonStyles_css_text_1.default]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, angular2_redux_util_1.AppStore, AdnetActions_1.AdnetActions])
                ], AdnetNetworkPackageProps);
                return AdnetNetworkPackageProps;
            }());
            exports_1("AdnetNetworkPackageProps", AdnetNetworkPackageProps);
        }
    }
});
