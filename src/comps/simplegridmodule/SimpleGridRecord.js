System.register(['@angular/core', "./SimpleGridTable"], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, SimpleGridTable_1;
    var SimpleGridRecord;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (SimpleGridTable_1_1) {
                SimpleGridTable_1 = SimpleGridTable_1_1;
            }],
        execute: function() {
            SimpleGridRecord = (function () {
                function SimpleGridRecord(i_table) {
                    this.selectable = true;
                    this.onDoubleClicked = new core_1.EventEmitter();
                    this.onClicked = new core_1.EventEmitter();
                    this.selectedClass = false;
                    this.m_table = i_table;
                }
                SimpleGridRecord.prototype.doubleClicked = function (event) {
                    this.setSelected();
                    this.onDoubleClicked.emit({
                        target: event.target,
                        item: this.item ? this.item : null
                    });
                    return true;
                };
                SimpleGridRecord.prototype.onSelected = function () {
                    if (!this.selectable)
                        return;
                    this.setSelected();
                    this.onClicked.emit({
                        target: event.target,
                        item: this.item ? this.item : null
                    });
                    return true;
                };
                Object.defineProperty(SimpleGridRecord.prototype, "index", {
                    get: function () {
                        return this.m_index;
                    },
                    set: function (i_index) {
                        this.m_index = i_index;
                    },
                    enumerable: true,
                    configurable: true
                });
                SimpleGridRecord.prototype.ngOnInit = function () {
                    var selected = this.m_table.getSelected();
                    if (selected && selected.m_index == this.index)
                        this.setSelected();
                };
                SimpleGridRecord.prototype.setSelected = function () {
                    this.m_table.setSelected(this);
                    this.selectedClass = true;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SimpleGridRecord.prototype, "item", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SimpleGridRecord.prototype, "selectable", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SimpleGridRecord.prototype, "onDoubleClicked", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SimpleGridRecord.prototype, "onClicked", void 0);
                __decorate([
                    core_1.HostListener('dblclick', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], SimpleGridRecord.prototype, "doubleClicked", null);
                __decorate([
                    core_1.HostListener('click', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], SimpleGridRecord.prototype, "onSelected", null);
                __decorate([
                    core_1.HostBinding('class.selectedTr'), 
                    __metadata('design:type', Boolean)
                ], SimpleGridRecord.prototype, "selectedClass", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number), 
                    __metadata('design:paramtypes', [Number])
                ], SimpleGridRecord.prototype, "index", null);
                SimpleGridRecord = __decorate([
                    core_1.Component({
                        selector: 'tr[simpleGridRecord]',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: "\n          <ng-content></ng-content>\n    "
                    }),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return SimpleGridTable_1.SimpleGridTable; }))), 
                    __metadata('design:paramtypes', [SimpleGridTable_1.SimpleGridTable])
                ], SimpleGridRecord);
                return SimpleGridRecord;
            }());
            exports_1("SimpleGridRecord", SimpleGridRecord);
        }
    }
});
