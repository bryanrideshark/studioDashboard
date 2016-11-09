System.register(["@angular/core", "../../../../adnet/AdnetCustomerModel", "immutable", "angular2-redux-util", "../../../simplelist/Simplelist", "./AdnetNetwork", "../../../../Lib", "../../../../adnet/AdnetActions", "bootbox", './AdnetNetworkPackageEditor.html!text', './AdnetNetworkPackageEditor.css!text'], function(exports_1, context_1) {
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
    var core_1, AdnetCustomerModel_1, immutable_1, angular2_redux_util_1, Simplelist_1, AdnetNetwork_1, Lib_1, AdnetActions_1, AdnetActions_2, bootbox, AdnetNetworkPackageEditor_html_text_1, AdnetNetworkPackageEditor_css_text_1;
    var AdnetNetworkPackageEditor;
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
            function (Simplelist_1_1) {
                Simplelist_1 = Simplelist_1_1;
            },
            function (AdnetNetwork_1_1) {
                AdnetNetwork_1 = AdnetNetwork_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (AdnetActions_1_1) {
                AdnetActions_1 = AdnetActions_1_1;
                AdnetActions_2 = AdnetActions_1_1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (AdnetNetworkPackageEditor_html_text_1_1) {
                AdnetNetworkPackageEditor_html_text_1 = AdnetNetworkPackageEditor_html_text_1_1;
            },
            function (AdnetNetworkPackageEditor_css_text_1_1) {
                AdnetNetworkPackageEditor_css_text_1 = AdnetNetworkPackageEditor_css_text_1_1;
            }],
        execute: function() {
            AdnetNetworkPackageEditor = (function () {
                function AdnetNetworkPackageEditor(appStore, adnetAction, cd) {
                    this.appStore = appStore;
                    this.adnetAction = adnetAction;
                    this.cd = cd;
                    this.onPropSelected = new core_1.EventEmitter();
                    this.onAdnetPacakgedSelected = new core_1.EventEmitter();
                    this.onAdnetTargetsSelected = new core_1.EventEmitter();
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                }
                AdnetNetworkPackageEditor.prototype.ngOnInit = function () {
                    var _this = this;
                    this.packages = this.appStore.getState().adnet.getIn(['packages']) || {};
                    this.unsub = this.appStore.sub(function (i_adPackages) {
                        _this.packages = i_adPackages;
                        _this.onFilterPackages();
                    }, 'adnet.packages');
                    this.onFilterPackages();
                };
                Object.defineProperty(AdnetNetworkPackageEditor.prototype, "setPairOutgoing", {
                    set: function (i_setPairOutgoing) {
                        this.pairOutgoing = i_setPairOutgoing;
                        if (this.pairOutgoing == true)
                            this.onFilterPackages();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdnetNetworkPackageEditor.prototype, "setAdnetCustomerModel", {
                    set: function (i_adnetCustomerModel) {
                        this.adnetCustomerModel = i_adnetCustomerModel;
                        this.onFilterPackages();
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetNetworkPackageEditor.prototype.onAdd = function (event) {
                    var id = this.adnetCustomerModel.customerId();
                    this.appStore.dispatch(this.adnetAction.addAdnetPackages(id));
                };
                AdnetNetworkPackageEditor.prototype.onRemove = function (event) {
                    var _this = this;
                    if (!this.selectedAdnetPackageModel)
                        return;
                    bootbox.confirm({
                        message: "are you sure you want to delete this adnet packages?",
                        callback: function (result) {
                            if (!result)
                                return;
                            _this.appStore.dispatch(_this.adnetAction.removeAdnetPackage(_this.selectedAdnetPackageModel.getId(), _this.adnetCustomerModel.customerId()));
                            _this.selectedAdnetPackageModel = null;
                            _this.onAdnetPacakgedSelected.emit(null);
                        }
                    });
                };
                AdnetNetworkPackageEditor.prototype.processAdnetPackageField = function (i_function) {
                    return function (i_adnetPackageModel) {
                        return i_adnetPackageModel[i_function]();
                    };
                };
                AdnetNetworkPackageEditor.prototype.onFilterPackages = function () {
                    var _this = this;
                    if (!this.packages || !this.adnetCustomerModel)
                        return;
                    this.packagesFiltered = immutable_1.List();
                    this.packages.forEach(function (i_package) {
                        if (i_package.getCustomerId() == _this.adnetCustomerModel.getId())
                            _this.packagesFiltered = _this.packagesFiltered.push(i_package);
                    });
                    this.cd.markForCheck();
                };
                AdnetNetworkPackageEditor.prototype.getId = function (i_adnetPackageModel) {
                    if (!i_adnetPackageModel)
                        return;
                    return i_adnetPackageModel.getId();
                };
                AdnetNetworkPackageEditor.prototype.onSelecting = function (event) {
                    var itemSelected = this.simpleList.getSelected();
                    this.selectedAdnetPackageModel = itemSelected.item;
                    var targetsIds = this.selectedAdnetPackageModel.getTargetIds();
                    var targets = this.appStore.getState().adnet.getIn(['targets']) || {};
                    var selectedAdnetTargetModels = targets.filter(function (i_adnetTargetModel) {
                        return (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1);
                    });
                    this.onPropSelected.emit({ selected: AdnetNetwork_1.AdnetNetworkPropSelector.PACKAGE });
                    this.onAdnetPacakgedSelected.emit(this.selectedAdnetPackageModel);
                    this.onAdnetTargetsSelected.emit(selectedAdnetTargetModels);
                };
                AdnetNetworkPackageEditor.prototype.onDropboxFileSelected = function (event) {
                    if (!this.selectedAdnetPackageModel)
                        return bootbox.alert('first select a Package from the above accordion Packages tab, to add this file onto your selected package');
                    this.appStore.dispatch(this.adnetAction.addAdnetPackageContent(event, this.selectedAdnetPackageModel, AdnetActions_2.ContentTypeEnum.DROPBOX));
                };
                AdnetNetworkPackageEditor.prototype.getName = function (i_adnetPackageModel) {
                    if (i_adnetPackageModel)
                        return i_adnetPackageModel.getName();
                };
                AdnetNetworkPackageEditor.prototype.ngOnDestroy = function () {
                    this.unsub();
                };
                __decorate([
                    core_1.ViewChild(Simplelist_1.SimpleList), 
                    __metadata('design:type', Simplelist_1.SimpleList)
                ], AdnetNetworkPackageEditor.prototype, "simpleList", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean), 
                    __metadata('design:paramtypes', [Boolean])
                ], AdnetNetworkPackageEditor.prototype, "setPairOutgoing", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetCustomerModel_1.AdnetCustomerModel), 
                    __metadata('design:paramtypes', [AdnetCustomerModel_1.AdnetCustomerModel])
                ], AdnetNetworkPackageEditor.prototype, "setAdnetCustomerModel", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], AdnetNetworkPackageEditor.prototype, "setAdnetPairModels", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkPackageEditor.prototype, "onPropSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkPackageEditor.prototype, "onAdnetPacakgedSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkPackageEditor.prototype, "onAdnetTargetsSelected", void 0);
                AdnetNetworkPackageEditor = __decorate([
                    core_1.Component({
                        styles: [AdnetNetworkPackageEditor_css_text_1.default],
                        template: AdnetNetworkPackageEditor_html_text_1.default,
                        selector: 'AdnetNetworkPackageEditor',
                        moduleId: __moduleName
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, AdnetActions_1.AdnetActions, core_1.ChangeDetectorRef])
                ], AdnetNetworkPackageEditor);
                return AdnetNetworkPackageEditor;
            }());
            exports_1("AdnetNetworkPackageEditor", AdnetNetworkPackageEditor);
        }
    }
});
