System.register(["@angular/core", "../../../../Lib", "immutable", "./AdnetNetwork", "../../../../adnet/AdnetPackageModel", "../../../simplegridmodule/SimpleGridTable", "angular2-redux-util", "../../../../adnet/AdnetCustomerModel"], function(exports_1, context_1) {
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
    var core_1, Lib_1, immutable_1, AdnetNetwork_1, AdnetPackageModel_1, SimpleGridTable_1, angular2_redux_util_1, AdnetCustomerModel_1;
    var AdnetNetworkTarget;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (AdnetNetwork_1_1) {
                AdnetNetwork_1 = AdnetNetwork_1_1;
            },
            function (AdnetPackageModel_1_1) {
                AdnetPackageModel_1 = AdnetPackageModel_1_1;
            },
            function (SimpleGridTable_1_1) {
                SimpleGridTable_1 = SimpleGridTable_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (AdnetCustomerModel_1_1) {
                AdnetCustomerModel_1 = AdnetCustomerModel_1_1;
            }],
        execute: function() {
            AdnetNetworkTarget = (function () {
                function AdnetNetworkTarget(appStore) {
                    this.appStore = appStore;
                    this.onAdnetTargetSelected = new core_1.EventEmitter();
                    this.onPropSelected = new core_1.EventEmitter();
                    this.sort = {
                        field: null,
                        desc: false
                    };
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                }
                Object.defineProperty(AdnetNetworkTarget.prototype, "setAdnetTargetModels", {
                    set: function (i_adnetTargetModels) {
                        this.adnetTargetModels = i_adnetTargetModels;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdnetNetworkTarget.prototype, "setAdnetPackageModels", {
                    set: function (i_adnetPackageModels) {
                        this.simpleGridTable.deselect();
                        this.adnetPackageModels = i_adnetPackageModels;
                        if (!this.adnetPackageModels)
                            return;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdnetNetworkTarget.prototype, "setPairOutgoing", {
                    set: function (i_setPairOutgoing) {
                        this.pairOutgoing = i_setPairOutgoing;
                        if (!this.adnetPairModels)
                            return;
                        this.filterTargets();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdnetNetworkTarget.prototype, "setAdnetPairModels", {
                    set: function (i_adnetPairModels) {
                        this.simpleGridTable.deselect();
                        this.adnetPairModels = i_adnetPairModels;
                        if (!this.adnetPairModels)
                            return;
                        this.filterTargets();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdnetNetworkTarget.prototype, "setAdnetCustomerModel", {
                    set: function (i_adnetCustomerModel) {
                        this.adnetCustomerModel = i_adnetCustomerModel;
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetNetworkTarget.prototype.filterTargets = function () {
                    var _this = this;
                    this.adnetTargetModels = immutable_1.List();
                    var packages = this.appStore.getState().adnet.getIn(['packages']) || {};
                    var targets = this.appStore.getState().adnet.getIn(['targets']) || {};
                    var uniqueIds = [];
                    if (this.pairOutgoing) {
                        packages.forEach(function (i_package) {
                            if (i_package.deleted() == true)
                                return;
                            var targetsIds = i_package.getTargetIds();
                            targets.forEach(function (i_adnetTargetModel) {
                                if (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1) {
                                    var adnetTargetCustomerId = i_adnetTargetModel.getCustomerId();
                                    _this.adnetPairModels.forEach(function (i_adnetPairModels) {
                                        if (adnetTargetCustomerId == i_adnetPairModels.getToCustomerId()) {
                                            _this.adnetTargetModels = _this.adnetTargetModels.push(i_adnetTargetModel);
                                        }
                                    });
                                }
                            });
                        });
                    }
                    else {
                        packages.forEach(function (i_package) {
                            if (i_package.deleted() == true)
                                return;
                            var targetsIds = i_package.getTargetIds();
                            targets.forEach(function (i_adnetTargetModel) {
                                if (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1) {
                                    _this.adnetPairModels.forEach(function (i_adnetPairModels) {
                                        if (i_adnetTargetModel.getEnabled() == false)
                                            return;
                                        var cusTotId = i_adnetPairModels.getToCustomerId();
                                        var custId = i_adnetPairModels.getCustomerId();
                                        var custIdSel = _this.adnetCustomerModel.customerId();
                                        var pkgCustId = i_package.getCustomerId();
                                        if (pkgCustId == custId && cusTotId == custIdSel) {
                                            if (uniqueIds.indexOf(i_adnetTargetModel.getId()) == -1) {
                                                uniqueIds.push(i_adnetTargetModel.getId());
                                                _this.adnetTargetModels = _this.adnetTargetModels.push(i_adnetTargetModel);
                                            }
                                        }
                                    });
                                }
                            });
                        });
                    }
                };
                AdnetNetworkTarget.prototype.processAdnetPackageField = function (i_function) {
                    return function (i_adnetTargetModel) {
                        return i_adnetTargetModel[i_function]();
                    };
                };
                AdnetNetworkTarget.prototype.onGridSelected = function (simpleGridEdit) {
                    this.onAdnetTargetSelected.emit(simpleGridEdit.item);
                    this.onPropSelected.emit({ selected: AdnetNetwork_1.AdnetNetworkPropSelector.TARGET });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], AdnetNetworkTarget.prototype, "setAdnetTargetModels", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetPackageModel_1.AdnetPackageModel), 
                    __metadata('design:paramtypes', [AdnetPackageModel_1.AdnetPackageModel])
                ], AdnetNetworkTarget.prototype, "setAdnetPackageModels", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean), 
                    __metadata('design:paramtypes', [Boolean])
                ], AdnetNetworkTarget.prototype, "setPairOutgoing", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], AdnetNetworkTarget.prototype, "setAdnetPairModels", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetCustomerModel_1.AdnetCustomerModel), 
                    __metadata('design:paramtypes', [AdnetCustomerModel_1.AdnetCustomerModel])
                ], AdnetNetworkTarget.prototype, "setAdnetCustomerModel", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkTarget.prototype, "onAdnetTargetSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkTarget.prototype, "onPropSelected", void 0);
                __decorate([
                    core_1.ViewChild(SimpleGridTable_1.SimpleGridTable), 
                    __metadata('design:type', SimpleGridTable_1.SimpleGridTable)
                ], AdnetNetworkTarget.prototype, "simpleGridTable", void 0);
                AdnetNetworkTarget = __decorate([
                    core_1.Component({
                        selector: 'AdnetNetworkTarget',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        moduleId: __moduleName,
                        template: "\n        <small class=\"release\">targets</small>\n        <small class=\"debug\">{{me}}</small>\n        <div [hidden]=\"!adnetPackageModels && !adnetPairModels\">\n            <simpleGridTable>\n                <thead>\n                <tr>\n                    <th [sortableHeader]=\"['Value','customerId']\" [sort]=\"sort\">customer</th>\n                    <th [sortableHeader]=\"['Value','type']\" [sort]=\"sort\">type</th>\n                    <th [sortableHeader]=\"['Value','label']\" [sort]=\"sort\">name</th>\n                    <th [sortableHeader]=\"['Value','keys']\" [sort]=\"sort\">keys</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr class=\"simpleGridRecord\" simpleGridRecord (onClicked)=\"onGridSelected($event)\"\n                    *ngFor=\"let item of adnetTargetModels | OrderBy:sort.field:sort.desc; let index=index\" [item]=\"item\"\n                    [index]=\"index\">\n                    <td style=\"width: 14%\" simpleGridData [processField]=\"processAdnetPackageField('getName')\"\n                        [item]=\"item\"></td>\n                    <td style=\"width: 14%\" simpleGridData [processField]=\"processAdnetPackageField('getTargetTypeName')\"\n                        [item]=\"item\"></td>\n                    <td style=\"width: 14%\" simpleGridData [processField]=\"processAdnetPackageField('getName')\"\n                        [item]=\"item\"></td>\n                    <td style=\"width: 14%\" simpleGridData [processField]=\"processAdnetPackageField('getKeys')\"\n                        [item]=\"item\"></td>\n                </tr>\n                </tbody>\n            </simpleGridTable>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore])
                ], AdnetNetworkTarget);
                return AdnetNetworkTarget;
            }());
            exports_1("AdnetNetworkTarget", AdnetNetworkTarget);
        }
    }
});
