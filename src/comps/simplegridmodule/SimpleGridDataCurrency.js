System.register(['@angular/core', "../../models/StoreModel"], function(exports_1, context_1) {
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
    var core_1, StoreModel_1;
    var SimpleGridDataCurrency;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            SimpleGridDataCurrency = (function () {
                function SimpleGridDataCurrency() {
                    this.value = '';
                }
                Object.defineProperty(SimpleGridDataCurrency.prototype, "item", {
                    set: function (i_storeModel) {
                        this.storeModel = i_storeModel;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleGridDataCurrency.prototype, "field", {
                    set: function (i_field) {
                        this.value = this.storeModel.getKey(i_field);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleGridDataCurrency.prototype, "processField", {
                    set: function (i_processField) {
                        this.value = i_processField(this.storeModel);
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', StoreModel_1.StoreModel), 
                    __metadata('design:paramtypes', [StoreModel_1.StoreModel])
                ], SimpleGridDataCurrency.prototype, "item", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], SimpleGridDataCurrency.prototype, "field", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Function])
                ], SimpleGridDataCurrency.prototype, "processField", null);
                SimpleGridDataCurrency = __decorate([
                    core_1.Component({
                        selector: 'td[simpleGridDataCurrency]',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        styles: ["\n        label {\n            padding: 0;\n            margin: 0;\n        }\n    "],
                        template: "\n         <label>{{value | currency:'USD':true}}</label>         \n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], SimpleGridDataCurrency);
                return SimpleGridDataCurrency;
            }());
            exports_1("SimpleGridDataCurrency", SimpleGridDataCurrency);
        }
    }
});
