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
    var SimpleGridDataImage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            SimpleGridDataImage = (function () {
                function SimpleGridDataImage() {
                }
                Object.defineProperty(SimpleGridDataImage.prototype, "item", {
                    set: function (i_storeModel) {
                        this.storeModel = i_storeModel;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleGridDataImage.prototype, "field", {
                    set: function (i_field) {
                        this.value = i_field;
                    },
                    enumerable: true,
                    configurable: true
                });
                SimpleGridDataImage.prototype.onClick = function (event) {
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', StoreModel_1.StoreModel), 
                    __metadata('design:paramtypes', [StoreModel_1.StoreModel])
                ], SimpleGridDataImage.prototype, "item", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], SimpleGridDataImage.prototype, "field", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SimpleGridDataImage.prototype, "color", void 0);
                SimpleGridDataImage = __decorate([
                    core_1.Component({
                        selector: 'td[simpleGridDataImage]',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        styles: ["\n        i {\n            cursor: pointer;\n        }\n    "],
                        template: "\n        <i (click)=\"onClick($event)\" class=\"fa {{value}}\"></i>\n        <!--<i (click)=\"onClick($event)\" style=\"color: {{color}}; font-size: 1.5em\" class=\"fa {{value}}\"></i>-->\n         <!--<img src=\"{{ value }}\" style=\"width: 40px; height: 40px\"/>-->\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], SimpleGridDataImage);
                return SimpleGridDataImage;
            }());
            exports_1("SimpleGridDataImage", SimpleGridDataImage);
        }
    }
});
