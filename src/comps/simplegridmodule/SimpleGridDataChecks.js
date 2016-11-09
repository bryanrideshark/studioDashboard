System.register(["@angular/core", "immutable", "../../models/StoreModel", "lodash"], function(exports_1, context_1) {
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
    var core_1, immutable_1, StoreModel_1, _;
    var SimpleGridDataChecks;
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
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            SimpleGridDataChecks = (function () {
                function SimpleGridDataChecks(cdr) {
                    this.cdr = cdr;
                    this.m_checkId = _.uniqueId('slideCheck');
                    this.slideMode = false;
                    this.changed = new core_1.EventEmitter();
                }
                Object.defineProperty(SimpleGridDataChecks.prototype, "checkboxes", {
                    set: function (i_checkboxes) {
                        this.m_checkboxes = i_checkboxes;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleGridDataChecks.prototype, "item", {
                    set: function (i_storeModel) {
                        this.m_storeModel = i_storeModel;
                    },
                    enumerable: true,
                    configurable: true
                });
                SimpleGridDataChecks.prototype.onClick = function (e) {
                    this.cdr.detach();
                    var values = [];
                    this.inputs.map(function (v) {
                        values.push(v.nativeElement.checked);
                    });
                    this.changed.emit({ item: this.m_storeModel, value: values });
                    return true;
                };
                __decorate([
                    core_1.ViewChildren('checkInputs'), 
                    __metadata('design:type', core_1.QueryList)
                ], SimpleGridDataChecks.prototype, "inputs", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], SimpleGridDataChecks.prototype, "checkboxes", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', StoreModel_1.StoreModel), 
                    __metadata('design:paramtypes', [StoreModel_1.StoreModel])
                ], SimpleGridDataChecks.prototype, "item", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SimpleGridDataChecks.prototype, "slideMode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SimpleGridDataChecks.prototype, "changed", void 0);
                SimpleGridDataChecks = __decorate([
                    core_1.Component({
                        selector: 'td[simpleGridDataChecks]',
                        styles: ["\n        i {\n            cursor: pointer;\n        }\n        .slideMode {\n            padding-top: 8px;\n            padding-right: 20px;\n        }\n    "],
                        template: "\n        <div *ngIf=\"!slideMode\">\n            <div *ngFor=\"let item of m_checkboxes\">\n              <label class=\"pull-left\">{{item.name}}</label>\n              <Input (click)=\"onClick()\" #checkInputs type=\"checkbox\" [checked]=\"item\" value=\"{{item}}\" class=\"pull-left\" style=\"margin-right: 2px\">\n            </div>\n        </div>\n        <div *ngIf=\"slideMode\" class=\"slideMode\">\n            <div *ngFor=\"let item of m_checkboxes\" class=\"material-switch pull-right\">\n              <Input id=\"{{m_checkId}}\"(mouseup)=\"onClick()\" (click)=\"onClick()\" #checkInputs type=\"checkbox\" [checked]=\"item\" value=\"{{item}}\" class=\"pull-left\" style=\"margin-right: 2px\">\n              <label [attr.for]=\"m_checkId\" class=\"label-primary\"></label>\n          </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
                ], SimpleGridDataChecks);
                return SimpleGridDataChecks;
            }());
            exports_1("SimpleGridDataChecks", SimpleGridDataChecks);
        }
    }
});
