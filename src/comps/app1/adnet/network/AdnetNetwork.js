System.register(["@angular/core", "../../../../adnet/AdnetCustomerModel", "./AdnetNetwork.html!text"], function(exports_1, context_1) {
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
    var core_1, AdnetCustomerModel_1, AdnetNetwork_html_text_1;
    var AdnetNetworkPropSelector, AdnetPackagePlayMode, AdnetNetwork;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (AdnetCustomerModel_1_1) {
                AdnetCustomerModel_1 = AdnetCustomerModel_1_1;
            },
            function (AdnetNetwork_html_text_1_1) {
                AdnetNetwork_html_text_1 = AdnetNetwork_html_text_1_1;
            }],
        execute: function() {
            (function (AdnetNetworkPropSelector) {
                AdnetNetworkPropSelector[AdnetNetworkPropSelector["CONTENT"] = 0] = "CONTENT";
                AdnetNetworkPropSelector[AdnetNetworkPropSelector["PACKAGE"] = 1] = "PACKAGE";
                AdnetNetworkPropSelector[AdnetNetworkPropSelector["RESOURCE"] = 2] = "RESOURCE";
                AdnetNetworkPropSelector[AdnetNetworkPropSelector["TARGET"] = 3] = "TARGET";
                AdnetNetworkPropSelector[AdnetNetworkPropSelector["PAIR"] = 4] = "PAIR";
                AdnetNetworkPropSelector[AdnetNetworkPropSelector["NONE"] = 5] = "NONE";
                AdnetNetworkPropSelector[AdnetNetworkPropSelector["PACKAGE_VIEW"] = 6] = "PACKAGE_VIEW";
            })(AdnetNetworkPropSelector || (AdnetNetworkPropSelector = {}));
            exports_1("AdnetNetworkPropSelector", AdnetNetworkPropSelector);
            (function (AdnetPackagePlayMode) {
                AdnetPackagePlayMode[AdnetPackagePlayMode["TIME"] = 0] = "TIME";
                AdnetPackagePlayMode[AdnetPackagePlayMode["LOCATION"] = 1] = "LOCATION";
                AdnetPackagePlayMode[AdnetPackagePlayMode["ASSETS"] = 2] = "ASSETS";
            })(AdnetPackagePlayMode || (AdnetPackagePlayMode = {}));
            exports_1("AdnetPackagePlayMode", AdnetPackagePlayMode);
            AdnetNetwork = (function () {
                function AdnetNetwork() {
                    this.adnetNetworkPropSelector = AdnetNetworkPropSelector;
                    this.propSelectorPackageTab = AdnetNetworkPropSelector.CONTENT;
                    this.propSelectorTargetsTab = AdnetNetworkPropSelector.NONE;
                    this.adnetCustomerId = -1;
                    this.packageEditMode = false;
                }
                Object.defineProperty(AdnetNetwork.prototype, "setAdnetCustomerModel", {
                    set: function (i_adnetCustomerModel) {
                        this.adnetCustomerModel = i_adnetCustomerModel;
                        if (this.adnetCustomerModel)
                            this.adnetCustomerId = this.adnetCustomerModel.customerId();
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetNetwork.prototype.onAdnetContentSelected = function (tab, event) {
                    switch (tab) {
                        case 'packagesTab': {
                            this.selectedAdnetContentModel_tab_packages = event;
                            break;
                        }
                        case 'targetsTab': {
                            this.selectedAdnetContentModel_tab_targets = event;
                            break;
                        }
                    }
                };
                AdnetNetwork.prototype.onPropSelected = function (tab, event) {
                    switch (tab) {
                        case 'packagesTab': {
                            this.propSelectorPackageTab = event.selected;
                            break;
                        }
                        case 'targetsTab': {
                            this.propSelectorTargetsTab = event.selected;
                            break;
                        }
                    }
                };
                AdnetNetwork.prototype.onPackageEditMode = function (event) {
                    this.packageEditMode = event;
                };
                AdnetNetwork.prototype.onTabActive = function (tabName, event) {
                };
                AdnetNetwork.prototype.onPairSelected = function (event) {
                    this.selectedAdnetPackageModel_tab_packages = null;
                    this.pairsSelected = event.pairs;
                    this.pairsOutgoing = event.pairsOutgoing;
                    this.selectedAdnetTargetModel_tab_packages = null;
                    this.selectedAdnetTargetModel_tab_targets = null;
                    this.selectedAdnetContentModel_tab_targets = null;
                    this.selectedAdnetPackageModel_tab_targets = null;
                };
                AdnetNetwork.prototype.onAdnetTargetsSelected = function (i_adnetTargetModels) {
                    this.selectedAdnetTargetModels = i_adnetTargetModels;
                };
                AdnetNetwork.prototype.onAdnetTargetSelected = function (tab, i_adnetTargetModel) {
                    switch (tab) {
                        case 'packagesTab': {
                            this.selectedAdnetTargetModel_tab_packages = i_adnetTargetModel;
                            this.selectedAdnetPackageModel_tab_targets = null;
                            break;
                        }
                        case 'targetsTab': {
                            this.selectedAdnetTargetModel_tab_targets = i_adnetTargetModel;
                            this.selectedAdnetPackageModel_tab_packages = null;
                            this.selectedAdnetPackageModel_tab_targets = null;
                            break;
                        }
                    }
                };
                AdnetNetwork.prototype.onSetPlayMode = function (tab, event) {
                    switch (tab) {
                        case 'packagesTab': {
                            this.selectedAdnetPackagePlayMode_tab_packages = event;
                            break;
                        }
                        case 'targetsTab': {
                            this.selectedAdnetPackagePlayMode_tab_targets = event;
                            break;
                        }
                    }
                };
                AdnetNetwork.prototype.onAdnetPackageSelected = function (event) {
                    this.selectedAdnetPackageModel_tab_packages = event;
                    if (!event) {
                        this.selectedAdnetPackageModel_tab_packages = null;
                        this.selectedAdnetContentModel_tab_packages = null;
                        return;
                    }
                    this.onSetPlayMode('packagesTab', event.playMode());
                };
                AdnetNetwork.prototype.onAdnetPackageSelectedTarget = function (event) {
                    this.selectedAdnetPackageModel_tab_targets = event;
                    this.onSetPlayMode('targetsTab', event.playMode());
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetCustomerModel_1.AdnetCustomerModel), 
                    __metadata('design:paramtypes', [AdnetCustomerModel_1.AdnetCustomerModel])
                ], AdnetNetwork.prototype, "setAdnetCustomerModel", null);
                AdnetNetwork = __decorate([
                    core_1.Component({
                        template: AdnetNetwork_html_text_1.default,
                        selector: 'AdnetNetwork',
                        moduleId: __moduleName,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [])
                ], AdnetNetwork);
                return AdnetNetwork;
            }());
            exports_1("AdnetNetwork", AdnetNetwork);
        }
    }
});
