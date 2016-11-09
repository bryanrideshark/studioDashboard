System.register(["@angular/core", "../../../../adnet/AdnetCustomerModel", 'immutable', "angular2-redux-util", "../../../simplelist/Simplelist", "rxjs/Observable", 'lodash', "../../../../Lib", "./AdnetNetwork"], function(exports_1, context_1) {
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
    var core_1, AdnetCustomerModel_1, immutable_1, angular2_redux_util_1, Simplelist_1, Observable_1, _, Lib_1, AdnetNetwork_1;
    var AdnetNetworkCustomerSelector;
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
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (AdnetNetwork_1_1) {
                AdnetNetwork_1 = AdnetNetwork_1_1;
            }],
        execute: function() {
            AdnetNetworkCustomerSelector = (function () {
                function AdnetNetworkCustomerSelector(appStore) {
                    this.appStore = appStore;
                    this.onPropSelected = new core_1.EventEmitter();
                    this.onPackageEditMode = new core_1.EventEmitter();
                    this.onPairsSelected = new core_1.EventEmitter();
                    this.outgoing = true;
                    this.adnetCustomerId = -1;
                    this.packageEditMode = true;
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                }
                AdnetNetworkCustomerSelector.prototype.ngOnInit = function () {
                    var _this = this;
                    this.pairs = this.appStore.getState().adnet.getIn(['pairs']) || {};
                    this.unsub = this.appStore.sub(function (i_pairs) {
                        _this.pairs = i_pairs;
                        _this.filterPairs();
                    }, 'adnet.pairs');
                    this.filterPairs();
                    this.listenOnCustomerSelected();
                    this.announceChange();
                    this.selectAllDelayed();
                };
                Object.defineProperty(AdnetNetworkCustomerSelector.prototype, "setAdnetCustomerModel", {
                    set: function (i_adnetCustomerModel) {
                        this.adnetCustomerModel = i_adnetCustomerModel;
                        if (this.adnetCustomerModel) {
                            this.adnetCustomerId = this.adnetCustomerModel.customerId();
                            this.filterPairs();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetNetworkCustomerSelector.prototype.getIndex = function (list, id) {
                    return list.findIndex(function (i) { return i['getId']() === id; });
                };
                AdnetNetworkCustomerSelector.prototype.listenOnCustomerSelected = function () {
                    var _this = this;
                    this.obs = Observable_1.Observable.create(function (observer) {
                        _this.observer = observer;
                    }).debounceTime(50).subscribe(function (v) {
                        _this.pairsSelected = immutable_1.List();
                        _.forEach(v, function (value, key) {
                            if (value.selected == true) {
                                var index = _this.getIndex(_this.pairs, Number(key));
                                if (index > -1)
                                    _this.pairsSelected = _this.pairsSelected.push(_this.pairs.get(index));
                            }
                        });
                        _this.announceChange();
                    });
                };
                AdnetNetworkCustomerSelector.prototype.onSelecting = function (event) {
                    this.observer.next(event);
                };
                AdnetNetworkCustomerSelector.prototype.onEditMode = function () {
                    this.packageEditMode = true;
                    if (this.simpleListIncoming)
                        this.simpleListIncoming.itemAllSelected();
                    if (this.simpleListOutgoing)
                        this.simpleListOutgoing.itemAllSelected();
                };
                AdnetNetworkCustomerSelector.prototype.getPairId = function (i_adnetPairModel) {
                    if (!i_adnetPairModel)
                        return;
                    return i_adnetPairModel.getId();
                };
                AdnetNetworkCustomerSelector.prototype.getPairName = function (i_adnetPairModel) {
                    var _this = this;
                    var self = this;
                    return function (i_adnetPairModel) {
                        var customers = self.appStore.getState().adnet.getIn(['customers']);
                        if (_this.outgoing) {
                            var index = _this.getIndex(customers, i_adnetPairModel.getToCustomerId());
                        }
                        else {
                            var index = _this.getIndex(customers, i_adnetPairModel.getCustomerId());
                        }
                        var customer = customers.get(index);
                        return customer.getName();
                    };
                };
                AdnetNetworkCustomerSelector.prototype.filterPairs = function () {
                    var _this = this;
                    if (!this.pairs)
                        return;
                    this.pairsFilteredIncoming = immutable_1.List();
                    this.pairsFilteredOutgoing = immutable_1.List();
                    this.pairs.forEach(function (i_pair) {
                        if (_this.outgoing) {
                            if (i_pair.getCustomerId() == _this.adnetCustomerId)
                                _this.pairsFilteredOutgoing = _this.pairsFilteredOutgoing.push(i_pair);
                        }
                        else {
                            if (i_pair.getToCustomerId() == _this.adnetCustomerId)
                                _this.pairsFilteredIncoming = _this.pairsFilteredIncoming.push(i_pair);
                        }
                    });
                };
                AdnetNetworkCustomerSelector.prototype.onChanges = function (event) {
                    this.outgoing = !this.outgoing;
                    if (this.simpleListOutgoing)
                        this.simpleListOutgoing.deselect();
                    if (this.simpleListIncoming)
                        this.simpleListIncoming.deselect();
                    this.filterPairs();
                    this.announceChange();
                    this.selectAllDelayed();
                };
                AdnetNetworkCustomerSelector.prototype.selectAllDelayed = function () {
                    var _this = this;
                    setTimeout(function () {
                        _this.onEditMode();
                    }, 10);
                };
                AdnetNetworkCustomerSelector.prototype.announceChange = function () {
                    var data = {
                        pairs: this.pairsSelected,
                        pairsOutgoing: this.outgoing
                    };
                    this.onPairsSelected.emit(data);
                    if (this.pairsSelected && this.pairsSelected.size == 1) {
                        this.onPropSelected.emit({ selected: AdnetNetwork_1.AdnetNetworkPropSelector.PAIR });
                    }
                    if (this.pairsSelected && this.pairsSelected.size > 1) {
                        this.onPropSelected.emit({ selected: AdnetNetwork_1.AdnetNetworkPropSelector.NONE });
                    }
                    this.onPackageEditMode.emit(this.packageEditMode);
                };
                AdnetNetworkCustomerSelector.prototype.ngOnDestroy = function () {
                    this.unsub();
                    this.obs.unsubscribe();
                };
                __decorate([
                    core_1.ViewChild('simpleListOutgoing'), 
                    __metadata('design:type', Simplelist_1.SimpleList)
                ], AdnetNetworkCustomerSelector.prototype, "simpleListOutgoing", void 0);
                __decorate([
                    core_1.ViewChild('simpleListIncoming'), 
                    __metadata('design:type', Simplelist_1.SimpleList)
                ], AdnetNetworkCustomerSelector.prototype, "simpleListIncoming", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkCustomerSelector.prototype, "onPropSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkCustomerSelector.prototype, "onPackageEditMode", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetCustomerModel_1.AdnetCustomerModel), 
                    __metadata('design:paramtypes', [AdnetCustomerModel_1.AdnetCustomerModel])
                ], AdnetNetworkCustomerSelector.prototype, "setAdnetCustomerModel", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkCustomerSelector.prototype, "onPairsSelected", void 0);
                AdnetNetworkCustomerSelector = __decorate([
                    core_1.Component({
                        selector: 'AdnetNetworkCustomerSelector',
                        moduleId: __moduleName,
                        styles: ["\n        .mn {margin-left: 4px; width: 80%; } option { font-size: 16px; }\n        .faPlace {\n        padding-right: 10px;\n        font-size: 1.6em;\n        position: relative;\n        top: 2px;\n        }\n"],
                        template: "   \n            <small class=\"debug\">{{me}}</small>\n            <select style=\"font-family:'FontAwesome', Arial;\" (change)=\"onChanges($event)\" class=\"mn form-control custom longInput\">\n                <option>&#xf112; Outgoing</option>\n                <option>&#xf064; Incoming</option>\n            </select>\n            <br/>\n            <button (click)=\"onEditMode()\"\n                [ngClass]=\"{'btn-primary': packageEditMode}\" class=\"btn-sm mn btn\">\n                <div *ngIf=\"packageEditMode && outgoing == true\">\n                    <span class=\"faPlace fa fa-edit\"></span>\n                    edit packages\n                </div>\n                <div style=\"opacity: 0.3\" *ngIf=\"!packageEditMode && outgoing == true\">\n                    <span class=\"faPlace fa fa-edit\"></span>\n                    edit packages                        \n                </div>\n                <div *ngIf=\"packageEditMode && outgoing == false\">\n                    <span class=\"faPlace fa fa-list\"></span>\n                    select all\n                </div>                \n                <div *ngIf=\"!packageEditMode && outgoing == false\">\n                    <span class=\"faPlace fa fa-list\"></span>\n                    select all                        \n                </div>\n            </button>\n            <div style=\"padding-left: 20px\">\n               <SimpleList *ngIf=\"outgoing\" #simpleListOutgoing\n                    [list]=\"pairsFilteredOutgoing\"\n                    (itemClicked)=\"packageEditMode = false\"\n                    (selected)=\"onSelecting($event)\"\n                    [multiSelect]=\"true\" \n                    [contentId]=\"getPairId\" [content]=\"getPairName()\">\n                </SimpleList>\n                \n                <SimpleList *ngIf=\"!outgoing\" #simpleListIncoming \n                    [list]=\"pairsFilteredIncoming\"\n                    (itemClicked)=\"packageEditMode = false\"\n                    (selected)=\"onSelecting($event)\"\n                    [multiSelect]=\"true\" \n                    [contentId]=\"getPairId\" [content]=\"getPairName()\">\n                </SimpleList>\n            </div>\n            ",
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore])
                ], AdnetNetworkCustomerSelector);
                return AdnetNetworkCustomerSelector;
            }());
            exports_1("AdnetNetworkCustomerSelector", AdnetNetworkCustomerSelector);
        }
    }
});
