System.register(["@angular/core", "@angular/forms", "../../../../adnet/AdnetActions", "angular2-redux-util", "lodash", "src/Lib", "immutable"], function(exports_1, context_1) {
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
    var core_1, forms_1, AdnetActions_1, angular2_redux_util_1, _, Lib_1, immutable_1;
    var AdnetNetworkPairProps;
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
            function (_1) {
                _ = _1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
            AdnetNetworkPairProps = (function () {
                function AdnetNetworkPairProps(fb, appStore, adnetAction) {
                    var _this = this;
                    this.fb = fb;
                    this.appStore = appStore;
                    this.adnetAction = adnetAction;
                    this.formInputs = {};
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                    this.contGroup = fb.group({
                        'autoActivate': [''],
                        'activated': [''],
                        'friend': ['']
                    });
                    _.forEach(this.contGroup.controls, function (value, key) {
                        _this.formInputs[key] = _this.contGroup.controls[key];
                    });
                }
                Object.defineProperty(AdnetNetworkPairProps.prototype, "setAdnetPairModels", {
                    set: function (i_adnetPairModel) {
                        if (!i_adnetPairModel)
                            return;
                        this.adnetPairModel = i_adnetPairModel.first();
                        if (this.adnetPairModel)
                            this.renderFormInputs();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AdnetNetworkPairProps.prototype, "setPairOutgoing", {
                    set: function (i_setPairOutgoing) {
                        this.pairOutgoing = i_setPairOutgoing;
                    },
                    enumerable: true,
                    configurable: true
                });
                AdnetNetworkPairProps.prototype.onFormChange = function (event) {
                    this.updateSore();
                };
                AdnetNetworkPairProps.prototype.updateSore = function () {
                    var _this = this;
                    setTimeout(function () {
                        console.log(_this.contGroup.status + ' ' + JSON.stringify(Lib_1.Lib.CleanCharForXml(_this.contGroup.value)));
                    }, 1);
                };
                AdnetNetworkPairProps.prototype.renderFormInputs = function () {
                    var _this = this;
                    if (!this.adnetPairModel)
                        return;
                    _.forEach(this.formInputs, function (value, key) {
                        var data = _this.adnetPairModel.getKey('Value')[key];
                        _this.formInputs[key].setValue(data);
                    });
                };
                ;
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], AdnetNetworkPairProps.prototype, "setAdnetPairModels", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean), 
                    __metadata('design:paramtypes', [Boolean])
                ], AdnetNetworkPairProps.prototype, "setPairOutgoing", null);
                AdnetNetworkPairProps = __decorate([
                    core_1.Component({
                        selector: 'AdnetNetworkPairProps',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        host: {
                            '(input-blur)': 'onFormChange($event)'
                        },
                        moduleId: __moduleName,
                        template: "\n                <div>\n                <form novalidate autocomplete=\"off\" [formGroup]=\"contGroup\">\n                    <div class=\"row\">\n                        <div class=\"inner userGeneral\">\n                            <div class=\"panel panel-default tallPanel\">\n                                <div class=\"panel-heading\">\n                                    <small class=\"release\">target properties\n                                        <i style=\"font-size: 1.4em\" class=\"fa fa-cog pull-right\"></i>\n                                    </small>\n                                <small class=\"debug\">{{me}}</small>\n                                </div>\n                                <ul class=\"list-group\">\n                                   \n                                    <li *ngIf=\"pairOutgoing==false\" class=\"list-group-item\">\n                                        auto active\n                                        <div class=\"material-switch pull-right\">\n                                            <input (change)=\"onFormChange(customerNetwork1.checked)\"\n                                                   [formControl]=\"contGroup.controls['autoActivate']\"\n                                                   id=\"customerNetwork1\" #customerNetwork1\n                                                   name=\"customerNetwork1\" type=\"checkbox\"/>\n                                            <label for=\"customerNetwork1\" class=\"label-primary\"></label>\n                                        </div>\n                                    </li>\n                                    \n                                  <li *ngIf=\"pairOutgoing==false\" class=\"list-group-item\">\n                                        activated\n                                        <div class=\"material-switch pull-right\">\n                                            <input (change)=\"onFormChange(customerNetwork2.checked)\"\n                                                   [formControl]=\"contGroup.controls['activated']\"\n                                                   id=\"customerNetwork2\" #customerNetwork2\n                                                   name=\"customerNetwork2\" type=\"checkbox\"/>\n                                            <label for=\"customerNetwork2\" class=\"label-primary\"></label>\n                                        </div>\n                                    </li>\n                                   \n                                  <li *ngIf=\"pairOutgoing==true\" class=\"list-group-item\">\n                                        friend\n                                        <div class=\"material-switch pull-right\">\n                                            <input (change)=\"onFormChange(customerNetwork3.checked)\"\n                                                   [formControl]=\"contGroup.controls['friend']\"\n                                                   id=\"customerNetwork3\" #customerNetwork3\n                                                   name=\"customerNetwork3\" type=\"checkbox\"/>\n                                            <label for=\"customerNetwork3\" class=\"label-primary\"></label>\n                                        </div>\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n                </form>\n            </div>\n    ",
                        styles: ["\n        input.ng-invalid {\n            border-right: 10px solid red;\n        }\n        .material-switch {\n            position: relative;\n            padding-top: 10px;\n        }\n        .input-group {\n            padding-top: 10px;\n        }\n        i {\n            width: 20px;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, angular2_redux_util_1.AppStore, AdnetActions_1.AdnetActions])
                ], AdnetNetworkPairProps);
                return AdnetNetworkPairProps;
            }());
            exports_1("AdnetNetworkPairProps", AdnetNetworkPairProps);
        }
    }
});
