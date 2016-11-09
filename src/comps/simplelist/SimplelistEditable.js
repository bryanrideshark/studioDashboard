System.register(["@angular/core", './Simplelist.css!text'], function(exports_1, context_1) {
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
    var core_1, Simplelist_css_text_1;
    var SimplelistEditable;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Simplelist_css_text_1_1) {
                Simplelist_css_text_1 = Simplelist_css_text_1_1;
            }],
        execute: function() {
            SimplelistEditable = (function () {
                function SimplelistEditable(app, ref) {
                    this.app = app;
                    this.ref = ref;
                    this.editable = false;
                    this.editChange = new core_1.EventEmitter();
                    this.m_editing = false;
                    this.m_icon = 'fa-edit';
                    this.m_value = '';
                }
                SimplelistEditable.prototype.onEdit = function (changed) {
                    var _this = this;
                    if (this.m_editing) {
                        var delay = 100;
                        this.m_icon = 'fa-edit';
                        if (changed)
                            this.editChange.emit({ item: this.item, value: this.m_value });
                    }
                    else {
                        var delay = 0;
                        this.m_icon = 'fa-check';
                    }
                    this.updateDetection();
                    setTimeout(function () {
                        _this.m_editing = !_this.m_editing;
                        _this.updateDetection();
                    }, delay);
                };
                SimplelistEditable.prototype.updateDetection = function () {
                    this.ref.markForCheck();
                };
                SimplelistEditable.prototype.getContent = function (item) {
                    if (this.content) {
                        return this.content(item);
                    }
                    else {
                        return item;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SimplelistEditable.prototype, "item", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Function)
                ], SimplelistEditable.prototype, "content", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SimplelistEditable.prototype, "editable", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SimplelistEditable.prototype, "editChange", void 0);
                SimplelistEditable = __decorate([
                    core_1.Component({
                        selector: 'simpleListEditable',
                        moduleId: __moduleName,
                        template: "\n                <span *ngIf=\"!m_editing\" class=\"li-content pull-left\">{{getContent(item)}}</span>\n                <input #editInput *ngIf=\"m_editing && editable\" [(ngModel)]=\"m_value\" class=\"li-content pull-left\"  value=\"{{getContent(item)}}\" />\n                <span *ngIf=\"editable\" (click)=\"onEdit(true)\" class=\"editable fa {{m_icon}} pull-right\"></span>\n    ",
                        styles: [Simplelist_css_text_1.default],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [core_1.ApplicationRef, core_1.ChangeDetectorRef])
                ], SimplelistEditable);
                return SimplelistEditable;
            }());
            exports_1("SimplelistEditable", SimplelistEditable);
        }
    }
});
