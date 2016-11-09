System.register(["@angular/core", "../../../../adnet/AdnetActions", "angular2-redux-util", "../../../../adnet/AdnetCustomerModel", "immutable", "../../../simplelist/Simplelist", "lodash", "../../../../Lib", './AdnetConfigTargetStations.html!text'], function(exports_1, context_1) {
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
    var core_1, AdnetActions_1, angular2_redux_util_1, AdnetCustomerModel_1, immutable_1, Simplelist_1, _, Lib_1, AdnetConfigTargetStations_html_text_1;
    var AdnetConfigTargetStations;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (Simplelist_1_1) {
                Simplelist_1 = Simplelist_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (AdnetConfigTargetStations_html_text_1_1) {
                AdnetConfigTargetStations_html_text_1 = AdnetConfigTargetStations_html_text_1_1;
            }],
        execute: function() {
            AdnetConfigTargetStations = (function () {
                function AdnetConfigTargetStations(appStore, adnetAction, cd) {
                    this.appStore = appStore;
                    this.adnetAction = adnetAction;
                    this.cd = cd;
                    this.onTargetSelected = new core_1.EventEmitter();
                    this.adTargetsFiltered = immutable_1.List();
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                }
                Object.defineProperty(AdnetConfigTargetStations.prototype, "adnetCustomerModel", {
                    set: function (i_adnetCustomerModel) {
                        this.customerModel = i_adnetCustomerModel;
                        this.resetSelection();
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetConfigTargetStations.prototype.ngOnInit = function () {
                    var _this = this;
                    this.adTargets = this.appStore.getState().adnet.getIn(['targets']) || {};
                    this.unsub = this.appStore.sub(function (i_adTargets) {
                        _this.adTargets = i_adTargets;
                        _this.render();
                    }, 'adnet.targets');
                    this.render();
                };
                AdnetConfigTargetStations.prototype.isWebLocation = function () {
                    if (!this.selectedAdnetTargetModel || this.selectedAdnetTargetModel.getTargetType() == "0")
                        return true;
                    return false;
                };
                AdnetConfigTargetStations.prototype.renderIcon = function (index, adnetTargetModel) {
                    if (adnetTargetModel.getTargetType() == '0')
                        return 'fa-tv';
                    return 'fa-globe';
                };
                AdnetConfigTargetStations.prototype.onAddWeb = function () {
                    var id = this.customerModel.customerId();
                    this.appStore.dispatch(this.adnetAction.addAdnetTarget(id));
                };
                AdnetConfigTargetStations.prototype.onWebPlayerSnippet = function () {
                };
                AdnetConfigTargetStations.prototype.onRemoveWeb = function () {
                    if (this.isWebLocation())
                        return;
                    this.appStore.dispatch(this.adnetAction.removeAdnetTarget(this.selectedAdnetTargetModel.getId(), this.customerModel.customerId()));
                    this.simpleList.deselect();
                };
                AdnetConfigTargetStations.prototype.resetSelection = function () {
                    if (this.customerModel)
                        this.render();
                    if (this.simpleList)
                        this.simpleList.deselect();
                };
                AdnetConfigTargetStations.prototype.onSelection = function (items) {
                    var _this = this;
                    _.forEach(items, function (simpleItem) {
                        if (simpleItem.selected) {
                            _this.selectedAdnetTargetModel = simpleItem.item;
                            _this.onTargetSelected.emit(_this.selectedAdnetTargetModel);
                        }
                    });
                };
                AdnetConfigTargetStations.prototype.render = function () {
                    var _this = this;
                    if (!this.adTargets || !this.customerModel)
                        return;
                    this.adTargetsFiltered = immutable_1.List();
                    this.adTargets.forEach(function (i_adTarget) {
                        if (i_adTarget.getCustomerId() == _this.customerModel.customerId()) {
                            _this.adTargetsFiltered = _this.adTargetsFiltered.push(i_adTarget);
                        }
                    });
                    this.cd.markForCheck();
                };
                AdnetConfigTargetStations.prototype.getContent = function (item) {
                    return item.getName();
                };
                AdnetConfigTargetStations.prototype.ngOnDestroy = function () {
                    this.unsub();
                };
                __decorate([
                    core_1.ViewChild(Simplelist_1.SimpleList), 
                    __metadata('design:type', Simplelist_1.SimpleList)
                ], AdnetConfigTargetStations.prototype, "simpleList", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetCustomerModel_1.AdnetCustomerModel), 
                    __metadata('design:paramtypes', [AdnetCustomerModel_1.AdnetCustomerModel])
                ], AdnetConfigTargetStations.prototype, "adnetCustomerModel", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetConfigTargetStations.prototype, "onTargetSelected", void 0);
                AdnetConfigTargetStations = __decorate([
                    core_1.Component({
                        selector: 'AdnetConfigTargetStations',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        moduleId: __moduleName,
                        template: AdnetConfigTargetStations_html_text_1.default,
                        styles: ["\n        .row {\n            padding: 15px;\n        }\n        \n        .btns {\n            padding: 0 10px 10px 0px;\n            font-size: 1.8em;\n            color: #313131;\n        }\n        \n        .btns:hover {\n            color: red;\n        }\n        \n        .enabled {\n            opacity: 1\n        }\n        \n        .disabled {\n            opacity: 0.2;\n            cursor: default;\n        }\n        "]
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, AdnetActions_1.AdnetActions, core_1.ChangeDetectorRef])
                ], AdnetConfigTargetStations);
                return AdnetConfigTargetStations;
            }());
            exports_1("AdnetConfigTargetStations", AdnetConfigTargetStations);
        }
    }
});
