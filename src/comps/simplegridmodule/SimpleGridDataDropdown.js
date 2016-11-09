System.register(['@angular/core', "immutable", "../../models/StoreModel"], function(exports_1, context_1) {
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
    var core_1, immutable_1, StoreModel_1;
    var SimpleGridDataDropdown;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            SimpleGridDataDropdown = (function () {
                function SimpleGridDataDropdown() {
                    this.m_field = '';
                    this.value = '';
                    this.changed = new core_1.EventEmitter();
                }
                Object.defineProperty(SimpleGridDataDropdown.prototype, "dropdown", {
                    set: function (i_dropdown) {
                        this.m_dropdown = i_dropdown;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleGridDataDropdown.prototype, "item", {
                    set: function (i_storeModel) {
                        this.m_storeModel = i_storeModel;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleGridDataDropdown.prototype, "field", {
                    set: function (i_field) {
                        this.m_field = i_field;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleGridDataDropdown.prototype, "testSelection", {
                    set: function (i_testSelection) {
                        this.m_testSelection = i_testSelection;
                    },
                    enumerable: true,
                    configurable: true
                });
                SimpleGridDataDropdown.prototype.onChanges = function (event) {
                    this.changed.emit({ item: this.m_storeModel, value: event.target.value });
                };
                SimpleGridDataDropdown.prototype.getSelected = function (i_dropItem) {
                    if (this.m_testSelection) {
                        return this.m_testSelection(i_dropItem, this.m_storeModel);
                    }
                    return '';
                };
                __decorate([
                    core_1.ViewChildren('checkInputs'), 
                    __metadata('design:type', core_1.QueryList)
                ], SimpleGridDataDropdown.prototype, "inputs", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], SimpleGridDataDropdown.prototype, "dropdown", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', StoreModel_1.StoreModel), 
                    __metadata('design:paramtypes', [StoreModel_1.StoreModel])
                ], SimpleGridDataDropdown.prototype, "item", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], SimpleGridDataDropdown.prototype, "field", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Function])
                ], SimpleGridDataDropdown.prototype, "testSelection", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SimpleGridDataDropdown.prototype, "changed", void 0);
                SimpleGridDataDropdown = __decorate([
                    core_1.Component({
                        selector: 'td[simpleGridDataDropdown]',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        styles: ["\n        i {\n            cursor: pointer;\n         }    \n        \n        .select button {width:100%; text-align:left;}\n        .select .caret {position:absolute; right:10px; margin-top:10px;}\n        .select:last-child>.btn {border-top-left-radius:5px; border-bottom-left-radius:5px;}\n        .selected {padding-right:10px;}\n        .option {width:100%;}\n    "],
                        template: "   \n               <div class=\"btn-group\">\n                    <!--<select class=\"form-control longInput\" [ngFormControl]=\"notesForm.controls['privileges']\">-->\n                    <select (change)=\"onChanges($event)\" class=\"form-control custom longInput\">\n                      <option *ngFor=\"let dropItem of m_dropdown\" [selected]=\"getSelected(dropItem)\">{{dropItem.getKey(m_field)}}</option>\n                    </select>\n               </div>\n        <!--<div *ngFor=\"let item of m_checkboxes\">-->\n          <!--<label class=\"pull-left\">{{item.name}}</label>-->\n          <!--<Input #checkInputs type=\"checkbox\" [checked]=\"item.checked\" value=\"{{item.value}}\" class=\"pull-left\" style=\"margin-right: 2px\">-->\n        <!--</div>-->\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], SimpleGridDataDropdown);
                return SimpleGridDataDropdown;
            }());
            exports_1("SimpleGridDataDropdown", SimpleGridDataDropdown);
        }
    }
});
