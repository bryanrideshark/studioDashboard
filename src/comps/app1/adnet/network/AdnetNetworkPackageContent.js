System.register(["@angular/core", "../../../../adnet/AdnetPackageModel", "../../../../adnet/AdnetContentModel", 'immutable', "./AdnetNetwork", "../../../../Lib", 'lodash', "../../../simplegridmodule/SimpleGridTable", "angular2-redux-util", "../../../../adnet/AdnetActions"], function(exports_1, context_1) {
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
    var core_1, AdnetPackageModel_1, AdnetContentModel_1, immutable_1, AdnetNetwork_1, Lib_1, _, SimpleGridTable_1, angular2_redux_util_1, AdnetActions_1;
    var AdnetNetworkPackageContent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (AdnetPackageModel_1_1) {
                AdnetPackageModel_1 = AdnetPackageModel_1_1;
            },
            function (AdnetContentModel_1_1) {
                AdnetContentModel_1 = AdnetContentModel_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (AdnetNetwork_1_1) {
                AdnetNetwork_1 = AdnetNetwork_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (SimpleGridTable_1_1) {
                SimpleGridTable_1 = SimpleGridTable_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (AdnetActions_1_1) {
                AdnetActions_1 = AdnetActions_1_1;
            }],
        execute: function() {
            AdnetNetworkPackageContent = (function () {
                function AdnetNetworkPackageContent(appStore, adnetActions, cd) {
                    var _this = this;
                    this.appStore = appStore;
                    this.adnetActions = adnetActions;
                    this.cd = cd;
                    this.onPropSelected = new core_1.EventEmitter();
                    this.onAdnetContentSelected = new core_1.EventEmitter();
                    this.AdnetPackagePlayMode = AdnetNetwork_1.AdnetPackagePlayMode;
                    this.sort = {
                        field: null,
                        desc: false
                    };
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                    this.appStore.sub(function (i_adnetPackageModels) {
                        _this.updateModel(false);
                        _this.cd.markForCheck();
                    }, 'adnet.packages');
                }
                Object.defineProperty(AdnetNetworkPackageContent.prototype, "setAdnetPackageModels", {
                    set: function (i_adnetPackageModels) {
                        this.adnetPackageModels = i_adnetPackageModels;
                        this.updateModel();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdnetNetworkPackageContent.prototype, "setAdnetPackagePlayMode", {
                    set: function (i_setAdnetPackagePlayMode) {
                        if (_.isUndefined(i_setAdnetPackagePlayMode))
                            return;
                        this.adnetPackagePlayMode = i_setAdnetPackagePlayMode;
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetNetworkPackageContent.prototype.onRemoveContent = function (event) {
                    if (!this.selectedAdnetContentModel)
                        return;
                    console.log('removing content ' + this.selectedAdnetContentModel.getId());
                    this.appStore.dispatch(this.adnetActions.removeAdnetPackageContent(this.adnetPackageModels, this.selectedAdnetContentModel.getId()));
                    this.updateModel(true);
                    this.onAdnetContentSelected.emit(null);
                };
                AdnetNetworkPackageContent.prototype.updateModel = function (deselect) {
                    if (deselect === void 0) { deselect = true; }
                    if (!this.adnetPackageModels)
                        return;
                    var contents = this.adnetPackageModels.getContents();
                    this.adnetContents = immutable_1.List();
                    for (var content in contents) {
                        var data = contents[content];
                        if (data.Value && data.Value.deleted)
                            continue;
                        var adnetContentModel = new AdnetContentModel_1.AdnetContentModel(data);
                        this.adnetContents = this.adnetContents.push(adnetContentModel);
                    }
                    if (deselect) {
                        this.simpleGridTable.deselect();
                        this.selectedAdnetContentModel = null;
                    }
                };
                AdnetNetworkPackageContent.prototype.onContentSelect = function (i_content) {
                    this.selectedAdnetContentModel = i_content;
                    this.onAdnetContentSelected.emit(i_content);
                    this.onPropSelected.emit({
                        selected: AdnetNetwork_1.AdnetNetworkPropSelector.CONTENT
                    });
                };
                AdnetNetworkPackageContent.prototype.processAdnetPackageField = function (i_function) {
                    return function (i_adnetContentModel) {
                        return i_adnetContentModel[i_function]();
                    };
                };
                __decorate([
                    core_1.ViewChild(SimpleGridTable_1.SimpleGridTable), 
                    __metadata('design:type', SimpleGridTable_1.SimpleGridTable)
                ], AdnetNetworkPackageContent.prototype, "simpleGridTable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetPackageModel_1.AdnetPackageModel), 
                    __metadata('design:paramtypes', [AdnetPackageModel_1.AdnetPackageModel])
                ], AdnetNetworkPackageContent.prototype, "setAdnetPackageModels", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number), 
                    __metadata('design:paramtypes', [Number])
                ], AdnetNetworkPackageContent.prototype, "setAdnetPackagePlayMode", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkPackageContent.prototype, "onPropSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AdnetNetworkPackageContent.prototype, "onAdnetContentSelected", void 0);
                AdnetNetworkPackageContent = __decorate([
                    core_1.Component({
                        selector: 'AdnetNetworkPackageContent',
                        styles: ["\n    .disabled {\n        opacity: 0.2;\n        cursor: default;\n    }\n    "],
                        moduleId: __moduleName,
                        template: "\n            <small class=\"release pull-right\">content</small><small class=\"debug\">{{me}}</small>\n            <a class=\"pull-right\" style=\"position: relative; top: 5px; right: 6px\" \n                (click)=\"$event.preventDefault(); onRemoveContent($event)\" \n                    [ngClass]=\"{disabled: !selectedAdnetContentModel}\" href=\"#\">\n                <span class=\"remove fa fa-lg fa-times-circle\"></span>\n            </a>\n            <div [hidden]=\"!adnetPackageModels\">\n                <simpleGridTable #simpleGridR>\n                    <thead>\n                    <tr>\n                        <th *ngIf=\"\n                            adnetPackagePlayMode == AdnetPackagePlayMode.TIME ||\n                            adnetPackagePlayMode == AdnetPackagePlayMode.LOCATION || \n                            adnetPackagePlayMode == AdnetPackagePlayMode.ASSETS\"\n                         [sortableHeader]=\"['Value','contentLabel']\" [sort]=\"sort\">name</th>\n                        <th *ngIf=\"\n                            adnetPackagePlayMode == AdnetPackagePlayMode.TIME ||\n                            adnetPackagePlayMode == AdnetPackagePlayMode.LOCATION || \n                            adnetPackagePlayMode == AdnetPackagePlayMode.ASSETS\"\n                             [sortableHeader]=\"['Value','duration']\" [sort]=\"sort\">duration</th>\n                        <th *ngIf=\"\n                            adnetPackagePlayMode == AdnetPackagePlayMode.TIME\"\n                             [sortableHeader]=\"['Value','reparationsPerHour']\" [sort]=\"sort\">repetition</th>\n                        <th *ngIf=\"\n                            adnetPackagePlayMode == AdnetPackagePlayMode.TIME\"\n                             [sortableHeader]=\"['Value','percentage']\" [sort]=\"sort\">percentage</th>\n                        <th *ngIf=\"\n                            adnetPackagePlayMode == AdnetPackagePlayMode.LOCATION\" \n                             [sortableHeader]=\"['Value','locationLat']\" [sort]=\"sort\">lat</th>\n                        <th *ngIf=\"\n                            adnetPackagePlayMode == AdnetPackagePlayMode.LOCATION\" \n                             [sortableHeader]=\"['Value','locationLng']\" [sort]=\"sort\">lng</th>\n                        <th *ngIf=\"\n                            adnetPackagePlayMode == AdnetPackagePlayMode.LOCATION\" \n                             [sortableHeader]=\"['Value','locationRadios']\" [sort]=\"sort\">radius</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <tr class=\"simpleGridRecord\" (onClicked)=\"onContentSelect(item)\" simpleGridRecord *ngFor=\"let item of adnetContents | OrderBy:sort.field:sort.desc; let index=index\" [item]=\"item\" [index]=\"index\">\n                        <td \n                         *ngIf=\"\n                            adnetPackagePlayMode == AdnetPackagePlayMode.TIME ||\n                            adnetPackagePlayMode == AdnetPackagePlayMode.LOCATION || \n                            adnetPackagePlayMode == AdnetPackagePlayMode.ASSETS\"\n                            style=\"width: 25%\" simpleGridData [processField]=\"processAdnetPackageField('getName')\" [item]=\"item\"></td>\n                        <td *ngIf=\"\n                            adnetPackagePlayMode == AdnetPackagePlayMode.TIME ||\n                            adnetPackagePlayMode == AdnetPackagePlayMode.LOCATION || \n                            adnetPackagePlayMode == AdnetPackagePlayMode.ASSETS\"\n                            simpleGridData [processField]=\"processAdnetPackageField('duration')\" [item]=\"item\"></td>\n                        <td *ngIf=\"\n                            adnetPackagePlayMode== AdnetPackagePlayMode.TIME\"\n                            simpleGridData [processField]=\"processAdnetPackageField('repetition')\" [item]=\"item\"></td>\n                        <td *ngIf=\"\n                            adnetPackagePlayMode== AdnetPackagePlayMode.TIME\"\n                            simpleGridData [processField]=\"processAdnetPackageField('percentage')\" [item]=\"item\"></td>\n                        <td *ngIf=\"\n                            adnetPackagePlayMode== AdnetPackagePlayMode.LOCATION\" \n                            simpleGridData [processField]=\"processAdnetPackageField('locationLat')\" [item]=\"item\"></td>\n                        <td *ngIf=\"\n                            adnetPackagePlayMode== AdnetPackagePlayMode.LOCATION\" \n                            simpleGridData [processField]=\"processAdnetPackageField('locationLng')\" [item]=\"item\"></td>\n                        <td *ngIf=\"\n                            adnetPackagePlayMode== AdnetPackagePlayMode.LOCATION\" \n                            simpleGridData [processField]=\"processAdnetPackageField('locationRadios')\" [item]=\"item\"></td>\n                    </tr>\n                    </tbody>\n                </simpleGridTable>\n            </div>\n              ",
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, AdnetActions_1.AdnetActions, core_1.ChangeDetectorRef])
                ], AdnetNetworkPackageContent);
                return AdnetNetworkPackageContent;
            }());
            exports_1("AdnetNetworkPackageContent", AdnetNetworkPackageContent);
        }
    }
});
