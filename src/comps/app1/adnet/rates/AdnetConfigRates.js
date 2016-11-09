System.register(["@angular/core", "angular2-redux-util", "immutable", "lodash", "../../../simplelist/Simplelist", "../../../../adnet/AdnetActions", "../../../../adnet/AdnetCustomerModel", "./AdnetConfigRates.html!text", "./AdnetConfigRates.css!text", "bootbox", "../../../../Lib"], function(exports_1, context_1) {
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
    var core_1, angular2_redux_util_1, immutable_1, _, Simplelist_1, AdnetActions_1, AdnetCustomerModel_1, AdnetConfigRates_html_text_1, AdnetConfigRates_css_text_1, bootbox, Lib_1;
    var AdnetConfigRates;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (Simplelist_1_1) {
                Simplelist_1 = Simplelist_1_1;
            },
            function (AdnetActions_1_1) {
                AdnetActions_1 = AdnetActions_1_1;
            },
            function (AdnetCustomerModel_1_1) {
                AdnetCustomerModel_1 = AdnetCustomerModel_1_1;
            },
            function (AdnetConfigRates_html_text_1_1) {
                AdnetConfigRates_html_text_1 = AdnetConfigRates_html_text_1_1;
            },
            function (AdnetConfigRates_css_text_1_1) {
                AdnetConfigRates_css_text_1 = AdnetConfigRates_css_text_1_1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            }],
        execute: function() {
            AdnetConfigRates = (function () {
                function AdnetConfigRates(appStore, adnetAction) {
                    var _this = this;
                    this.appStore = appStore;
                    this.adnetAction = adnetAction;
                    this.rates = immutable_1.List();
                    this.filteredRates = immutable_1.List();
                    var i_adnet = this.appStore.getState().adnet;
                    this.rates = i_adnet.getIn(['rates']);
                    this.unsub = this.appStore.sub(function (i_rates) {
                        _this.rates = i_rates;
                        _this.updFilteredRates();
                    }, 'adnet.rates');
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                }
                Object.defineProperty(AdnetConfigRates.prototype, "adnetCustomerModel", {
                    set: function (i_adnetCustomerModel) {
                        this.resetSelection();
                        this.selectedAdnetCustomerModel = i_adnetCustomerModel;
                        this.updFilteredRates();
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetConfigRates.prototype.resetSelection = function () {
                    this.selectedAdnetRateModel = null;
                    if (this.simpleList)
                        this.simpleList.deselect();
                };
                AdnetConfigRates.prototype.onSelection = function () {
                    var _this = this;
                    if (!this.filteredRates)
                        return;
                    var selected = this.simpleList.getSelected();
                    _.forEach(selected, function (simpleItem) {
                        if (simpleItem.selected) {
                            _this.selectedAdnetRateModel = simpleItem.item;
                            return;
                        }
                    });
                };
                AdnetConfigRates.prototype.onAddRate = function () {
                    this.appStore.dispatch(this.adnetAction.addAdnetRateTable(this.selectedAdnetCustomerModel.getId()));
                };
                AdnetConfigRates.prototype.isAdnetUsed = function () {
                    var isUsed = false;
                    var rateId = this.selectedAdnetRateModel.getId();
                    var targets = this.appStore.getState().adnet.getIn(['targets']) || {};
                    targets.forEach(function (i_adnetTargetModel) {
                        if (i_adnetTargetModel.getDeleted() != true && i_adnetTargetModel.getRateId() == rateId)
                            isUsed = true;
                    });
                    return isUsed;
                };
                AdnetConfigRates.prototype.onRemoveRate = function () {
                    if (!this.selectedAdnetRateModel)
                        return;
                    if (this.isAdnetUsed())
                        return bootbox.alert('Cant remove a rating table that is currently assigned');
                    this.appStore.dispatch(this.adnetAction.removeAdnetRateTable(this.selectedAdnetRateModel.getId(), this.selectedAdnetCustomerModel.getId()));
                    this.simpleList.deselect();
                    this.selectedAdnetRateModel = null;
                };
                AdnetConfigRates.prototype.onRateChange = function (event) {
                    this.appStore.dispatch(this.adnetAction.updAdnetRateTable(event, this.selectedAdnetCustomerModel.getId()));
                };
                AdnetConfigRates.prototype.onRateRenamed = function (event) {
                    var adnetRateModel = event.item;
                    var updData = {
                        adHourlyRate: adnetRateModel.rateLevels(),
                        rateId: adnetRateModel.getId(),
                        rateTable: adnetRateModel.rateMap(),
                        label: event.value
                    };
                    this.appStore.dispatch(this.adnetAction.updAdnetRateTable(updData, this.selectedAdnetCustomerModel.getId(), true));
                };
                AdnetConfigRates.prototype.updFilteredRates = function () {
                    var _this = this;
                    if (this.rates && this.selectedAdnetCustomerModel) {
                        this.filteredRates = immutable_1.List();
                        this.rates.forEach(function (i_adnetRateModel) {
                            if (i_adnetRateModel.customerId() == _this.selectedAdnetCustomerModel.customerId()) {
                                _this.filteredRates = _this.filteredRates.push(i_adnetRateModel);
                            }
                        });
                    }
                };
                AdnetConfigRates.prototype.getContent = function (adnetRateModel) {
                    return adnetRateModel.getName();
                };
                AdnetConfigRates.prototype.ngOnDestroy = function () {
                    this.unsub();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetCustomerModel_1.AdnetCustomerModel), 
                    __metadata('design:paramtypes', [AdnetCustomerModel_1.AdnetCustomerModel])
                ], AdnetConfigRates.prototype, "adnetCustomerModel", null);
                __decorate([
                    core_1.ViewChild(Simplelist_1.SimpleList), 
                    __metadata('design:type', Simplelist_1.SimpleList)
                ], AdnetConfigRates.prototype, "simpleList", void 0);
                AdnetConfigRates = __decorate([
                    core_1.Component({
                        selector: 'AdnetConfigRates',
                        moduleId: __moduleName,
                        styles: [AdnetConfigRates_css_text_1.default],
                        template: AdnetConfigRates_html_text_1.default
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, AdnetActions_1.AdnetActions])
                ], AdnetConfigRates);
                return AdnetConfigRates;
            }());
            exports_1("AdnetConfigRates", AdnetConfigRates);
        }
    }
});
