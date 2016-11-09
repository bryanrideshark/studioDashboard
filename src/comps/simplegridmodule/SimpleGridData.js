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
    var SimpleGridData;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            SimpleGridData = (function () {
                function SimpleGridData() {
                    this.value = '';
                    this._editable = false;
                    this._editing = false;
                    this.labelEdited = new core_1.EventEmitter();
                }
                Object.defineProperty(SimpleGridData.prototype, "item", {
                    set: function (i_storeModel) {
                        this.storeModel = i_storeModel;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleGridData.prototype, "field", {
                    set: function (i_field) {
                        this.value = this.storeModel.getKey(i_field);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleGridData.prototype, "processField", {
                    set: function (i_processField) {
                        this.value = i_processField(this.storeModel);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleGridData.prototype, "editable", {
                    set: function (i_editable) {
                        this._editable = i_editable;
                    },
                    enumerable: true,
                    configurable: true
                });
                SimpleGridData.prototype.onEdit = function (value) {
                    if (this._editable == false || this._editable == 'false')
                        return;
                    this._editing = value;
                    if (this._editing)
                        return;
                    var payload = {
                        value: this.value,
                        item: this.storeModel
                    };
                    this.labelEdited.emit(payload);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', StoreModel_1.StoreModel), 
                    __metadata('design:paramtypes', [StoreModel_1.StoreModel])
                ], SimpleGridData.prototype, "item", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], SimpleGridData.prototype, "field", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Function])
                ], SimpleGridData.prototype, "processField", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], SimpleGridData.prototype, "editable", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SimpleGridData.prototype, "labelEdited", void 0);
                SimpleGridData = __decorate([
                    core_1.Component({
                        selector: 'td[simpleGridData]',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        styles: ["\n        label {\n            padding: 0;\n            margin: 0;\n        }\n        .editableLabel {\n            cursor: pointer;\n        }\n        input {\n            padding: 0;\n            margin: 0;\n        }\n        a {\n            cursor: pointer;\n        }\n    "],
                        template: "\n         <label [ngClass]=\"{editableLabel: _editable}\" *ngIf=\"!_editing\" (click)=\"onEdit(true)\">{{value}}</label>\n         <span *ngIf=\"_editing\">\n            <input value=\"{{value}}\" [(ngModel)]=\"value\"/>\n                <a (click)=\"onEdit(false)\" class=\"fa fa-check\"></a>\n         </span>\n         \n         <!--<img src=\"{{ item.iconPath }}\" style=\"width: 40px; height: 40px\"/>-->\n         <!--&lt;!&ndash; <td [innerHtml]=\"item.day\"></td> &ndash;&gt;-->\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], SimpleGridData);
                return SimpleGridData;
            }());
            exports_1("SimpleGridData", SimpleGridData);
        }
    }
});
