System.register(["@angular/core", "../../../../adnet/AdnetCustomerModel", "immutable", "angular2-redux-util", "../../../../adnet/AdnetTargetModel", "../../../../Lib", "./AdnetNetwork", "../../../simplegridmodule/SimpleGridTable", "./AdnetNetworkPackageViewer.html!text"], function(exports_1, context_1) {
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
    var core_1, AdnetCustomerModel_1, immutable_1, angular2_redux_util_1, AdnetTargetModel_1, Lib_1, AdnetNetwork_1, SimpleGridTable_1, AdnetNetworkPackageViewer_html_text_1;
    var AdnetNetworkPackageViewer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (AdnetCustomerModel_1_1) {
                AdnetCustomerModel_1 = AdnetCustomerModel_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (AdnetTargetModel_1_1) {
                AdnetTargetModel_1 = AdnetTargetModel_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (AdnetNetwork_1_1) {
                AdnetNetwork_1 = AdnetNetwork_1_1;
            },
            function (SimpleGridTable_1_1) {
                SimpleGridTable_1 = SimpleGridTable_1_1;
            },
            function (AdnetNetworkPackageViewer_html_text_1_1) {
                AdnetNetworkPackageViewer_html_text_1 = AdnetNetworkPackageViewer_html_text_1_1;
            }],
        execute: function() {
            AdnetNetworkPackageViewer = (function () {
                function AdnetNetworkPackageViewer(appStore) {
                    this.appStore = appStore;
                    this.filterByTargetModel = false;
                    this.onAdnetPackageViewSelected = new core_1.EventEmitter();
                    this.onAdnetTargetsSelected = new core_1.EventEmitter();
                    this.onPropSelected = new core_1.EventEmitter();
                    this.sort = {
                        field: null,
                        desc: false
                    };
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                }
                AdnetNetworkPackageViewer.prototype.ngOnInit = function () {
                    var _this = this;
                    this.packages = this.appStore.getState().adnet.getIn(['packages']) || {};
                    this.unsub1 = this.appStore.sub(function (i_adPackages) {
                        _this.packages = i_adPackages;
                        _this.onFilterPackages();
                    }, 'adnet.packages');
                    this.targets = this.appStore.getState().adnet.getIn(['targets']) || {};
                    this.unsub2 = this.appStore.sub(function (i_adTargets) {
                        _this.targets = i_adTargets;
                        _this.onFilterPackages();
                    }, 'adnet.targets');
                    this.onFilterPackages();
                };
                Object.defineProperty(AdnetNetworkPackageViewer.prototype, "setPairOutgoing", {
                    set: function (i_setPairOutgoing) {
                        this.pairOutgoing = i_setPairOutgoing;
                        this.onFilterPackages();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdnetNetworkPackageViewer.prototype, "setAdnetCustomerModel", {
                    set: function (i_adnetCustomerModel) {
                        this.adnetCustomerModel = i_adnetCustomerModel;
                        this.onFilterPackages();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdnetNetworkPackageViewer.prototype, "setAdnetPairModels", {
                    set: function (i_adnetPairModels) {
                        this.simpleGridTable.deselect();
                        this.adnetPairModels = i_adnetPairModels;
                        this.onFilterPackages();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdnetNetworkPackageViewer.prototype, "setAdnetTargetModel", {
                    set: function (i_adnetTargetModel) {
                        this.simpleGridTable.deselect();
                        this.adnetTargetModel = i_adnetTargetModel;
                        if (!this.adnetTargetModel)
                            return;
                        this.onFilterPackages();
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetNetworkPackageViewer.prototype.setAccessMask = function (event) {
                };
                AdnetNetworkPackageViewer.prototype.getAccessMask = function (i_adnetPackageModel) {
                    var accessMask = i_adnetPackageModel.daysMask();
                    return Lib_1.Lib.GetADaysMask(accessMask);
                };
                AdnetNetworkPackageViewer.prototype.onAdd = function (event) {
                };
                AdnetNetworkPackageViewer.prototype.onRemove = function (event) {
                };
                AdnetNetworkPackageViewer.prototype.onFilterPackages = function () {
                    var _this = this;
                    if (!this.targets || !this.packages || !this.adnetCustomerModel || !this.adnetPairModels)
                        return;
                    if (this.filterByTargetModel && !this.adnetTargetModel)
                        return;
                    this.packagesFiltered = immutable_1.List();
                    var uniqueIds = [];
                    if (this.pairOutgoing) {
                        this.packages.forEach(function (i_package) {
                            if (i_package.deleted() == true)
                                return;
                            if (i_package.enabled() != true)
                                return;
                            var targetsIds = i_package.getTargetIds();
                            _this.targets.forEach(function (i_adnetTargetModel) {
                                if (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1) {
                                    var adnetTargetCustomerId = i_adnetTargetModel.getCustomerId();
                                    _this.adnetPairModels.forEach(function (i_adnetPairModels) {
                                        if (adnetTargetCustomerId == i_adnetPairModels.getToCustomerId()) {
                                            if (uniqueIds.indexOf(i_package.getId()) == -1) {
                                                uniqueIds.push(i_package.getId());
                                                if (_this.filterByTargetModel) {
                                                    if (i_package.getTargetIds().indexOf(_this.adnetTargetModel.getId()) > -1)
                                                        _this.packagesFiltered = _this.packagesFiltered.push(i_package);
                                                }
                                                else {
                                                    _this.packagesFiltered = _this.packagesFiltered.push(i_package);
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                        });
                    }
                    else {
                        this.packages.forEach(function (i_package) {
                            if (i_package.deleted() == true)
                                return;
                            if (i_package.enabled() != true)
                                return;
                            var targetsIds = i_package.getTargetIds();
                            _this.targets.forEach(function (i_adnetTargetModel) {
                                if (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1) {
                                    _this.adnetPairModels.forEach(function (i_adnetPairModels) {
                                        var cusTotId = i_adnetPairModels.getToCustomerId();
                                        var custId = i_adnetPairModels.getCustomerId();
                                        var custIdSel = _this.adnetCustomerModel.customerId();
                                        var pkgCustId = i_package.getCustomerId();
                                        if (pkgCustId == custId && cusTotId == custIdSel) {
                                            if (uniqueIds.indexOf(i_package.getId()) == -1) {
                                                uniqueIds.push(i_package.getId());
                                                if (_this.filterByTargetModel) {
                                                    if (i_package.getTargetIds().indexOf(_this.adnetTargetModel.getId()) > -1)
                                                        _this.packagesFiltered = _this.packagesFiltered.push(i_package);
                                                }
                                                else {
                                                    _this.packagesFiltered = _this.packagesFiltered.push(i_package);
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                        });
                    }
                };
                Object.defineProperty(AdnetNetworkPackageViewer.prototype, "getCustomerName", {
                    get: function () {
                        var _this = this;
                        return function (i_adnetPackageModel) {
                            var customerId = i_adnetPackageModel.getCustomerId();
                            var customersList = _this.appStore.getState().adnet.getIn(['customers']) || {};
                            var adnetCustomerModel = customersList.filter(function (adnetCustomerModel) {
                                return customerId == adnetCustomerModel.customerId();
                            }).first();
                            return adnetCustomerModel.getName();
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetNetworkPackageViewer.prototype.processAdnetPackageField = function (i_function) {
                    return function (i_adnetPackageModel) {
                        switch (i_function) {
                            case 'startDate': {
                            }
                            case 'endDate': {
                                var data = i_adnetPackageModel[i_function]();
                                return Lib_1.Lib.ProcessDateField(data, true);
                            }
                            case 'hourStart': {
                            }
                            case 'hourEnd': {
                                var data = i_adnetPackageModel[i_function]();
                                return Lib_1.Lib.ProcessHourStartEnd(data, i_function);
                            }
                            default: {
                                return i_adnetPackageModel[i_function]();
                            }
                        }
                    };
                };
                AdnetNetworkPackageViewer.prototype.onContentSelect = function (adnetPackageModel) {
                    var _this = this;
                    var targetsIds = adnetPackageModel.getTargetIds();
                    var targets = this.appStore.getState().adnet.getIn(['targets']) || {};
                    var selectedAdnetTargetModels = targets.filter(function (i_adnetTargetModel) {
                        if (i_adnetTargetModel.getField('enabled') == false)
                            return false;
                        if (i_adnetTargetModel.getCustomerId() != _this.adnetPairModels.first().getToCustomerId())
                            return false;
                        return (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1);
                    });
                    this.onAdnetTargetsSelected.emit(selectedAdnetTargetModels);
                    this.onAdnetPackageViewSelected.emit(adnetPackageModel);
                    this.onPropSelected.emit({
                        selected: AdnetNetwork_1.AdnetNetworkPropSelector.PACKAGE_VIEW
                    });
                };
                AdnetNetworkPackageViewer.prototype.getName = function (i_adnetPackageModel) {
                    if (i_adnetPackageModel)
                        return i_adnetPackageModel.getName();
                };
                AdnetNetworkPackageViewer.prototype.ngOnDestroy = function () {
                    this.unsub1();
                    this.unsub2();
                };
                __decorate([
                    core_1.ViewChild(SimpleGridTable_1.SimpleGridTable), 
                    __metadata('design:type', SimpleGridTable_1.SimpleGridTable)
                ], AdnetNetworkPackageViewer.prototype, "simpleGridTable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], AdnetNetworkPackageViewer.prototype, "filterByTargetModel", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean), 
                    __metadata('design:paramtypes', [Boolean])
                ], AdnetNetworkPackageViewer.prototype, "setPairOutgoing", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetCustomerModel_1.AdnetCustomerModel), 
                    __metadata('design:paramtypes', [AdnetCustomerModel_1.AdnetCustomerModel])
                ], AdnetNetworkPackageViewer.prototype, "setAdnetCustomerModel", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], AdnetNetworkPackageViewer.prototype, "setAdnetPairModels", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetTargetModel_1.AdnetTargetModel), 
                    __metadata('design:paramtypes', [AdnetTargetModel_1.AdnetTargetModel])
                ], AdnetNetworkPackageViewer.prototype, "setAdnetTargetModel", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkPackageViewer.prototype, "onAdnetPackageViewSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkPackageViewer.prototype, "onAdnetTargetsSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkPackageViewer.prototype, "onPropSelected", void 0);
                AdnetNetworkPackageViewer = __decorate([
                    core_1.Component({
                        template: AdnetNetworkPackageViewer_html_text_1.default,
                        selector: 'AdnetNetworkPackageViewer',
                        moduleId: __moduleName,
                        styles: ["\n        .width-sm {\n            width: 10px !important;\n        } \n        .width-md {\n            width: 40px;\n        }\n        .width-lr {\n            min-width: 200px !important;\n        }\n    "],
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore])
                ], AdnetNetworkPackageViewer);
                return AdnetNetworkPackageViewer;
            }());
            exports_1("AdnetNetworkPackageViewer", AdnetNetworkPackageViewer);
        }
    }
});
