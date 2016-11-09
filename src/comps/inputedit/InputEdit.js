System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var InputEdit;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            InputEdit = (function () {
                function InputEdit() {
                    this._value = '';
                    this._editable = false;
                    this._editing = false;
                    this._size = '2em';
                    this._type = 'text';
                    this._style = {};
                    this.showIcon = true;
                    this.labelEdited = new core_1.EventEmitter();
                }
                Object.defineProperty(InputEdit.prototype, "value", {
                    set: function (i_value) {
                        this._value = i_value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputEdit.prototype, "editable", {
                    set: function (i_editable) {
                        this._editable = i_editable;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputEdit.prototype.onEdit = function (value) {
                    if (!this._editable)
                        return;
                    this._editing = value;
                    if (this._editing)
                        return;
                    this.labelEdited.emit(this._value);
                    if (this._type == 'password')
                        this._value = '*********';
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], InputEdit.prototype, "value", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], InputEdit.prototype, "editable", null);
                __decorate([
                    core_1.Input('type'), 
                    __metadata('design:type', String)
                ], InputEdit.prototype, "_type", void 0);
                __decorate([
                    core_1.Input('style'), 
                    __metadata('design:type', Object)
                ], InputEdit.prototype, "_style", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputEdit.prototype, "showIcon", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], InputEdit.prototype, "labelEdited", void 0);
                InputEdit = __decorate([
                    core_1.Component({
                        selector: 'InputEdit',
                        styles: ["\n        label {\n            padding: 0;\n            margin: 0;\n        }\n        .editableLabel {\n            cursor: pointer;\n        }\n        input {\n            padding: 0;\n            margin: 0;\n        }\n        a {\n            cursor: pointer;\n        }\n    "],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: "\n        <label [ngStyle]=\"_style.label\" class=\"editableLabel\"  *ngIf=\"!_editing\" (click)=\"onEdit(true)\">{{_value}}</label>\n        <i *ngIf=\"!_editing && showIcon\" [ngStyle]=\"_style.editIcon\" (click)=\"onEdit(true)\" class=\"editableLabel fa fa-edit\"></i>\n         <span *ngIf=\"_editing\">\n            <input [ngStyle]=\"_style.input\"  value=\"{{_value}}\" type=\"{{_type}}\" [(ngModel)]=\"_value\"/>\n                <a (click)=\"onEdit(false)\" class=\"editableLabel fa fa-check\"></a>\n         </span>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], InputEdit);
                return InputEdit;
            }());
            exports_1("InputEdit", InputEdit);
        }
    }
});
