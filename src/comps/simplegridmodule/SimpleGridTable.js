System.register(["@angular/core", "./SimpleGridRecord"], function(exports_1, context_1) {
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
    var core_1, SimpleGridRecord_1;
    var SimpleGridTable;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (SimpleGridRecord_1_1) {
                SimpleGridRecord_1 = SimpleGridRecord_1_1;
            }],
        execute: function() {
            SimpleGridTable = (function () {
                function SimpleGridTable() {
                }
                SimpleGridTable.prototype.setSelected = function (i_selected) {
                    this.deselect();
                    this.selected = i_selected;
                };
                SimpleGridTable.prototype.deselect = function () {
                    this.selected = null;
                    if (!this.simpleGridRecord)
                        return;
                    this.simpleGridRecord.map(function (i_simpleGridRecord) {
                        i_simpleGridRecord.selectedClass = false;
                    });
                };
                SimpleGridTable.prototype.getSelected = function () {
                    return this.selected;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SimpleGridTable.prototype, "sort", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SimpleGridTable.prototype, "list", void 0);
                __decorate([
                    core_1.ContentChildren(SimpleGridRecord_1.SimpleGridRecord), 
                    __metadata('design:type', core_1.QueryList)
                ], SimpleGridTable.prototype, "simpleGridRecord", void 0);
                SimpleGridTable = __decorate([
                    core_1.Component({
                        selector: 'simpleGridTable',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        styles: ["\n        .simpleTable {\n            background-color: white;\n        }\n        \n        * {\n            font-size: 0.9em;\n        }\n    "],
                        template: "\n        <table class=\"table simpleTable\">\n            <ng-content></ng-content>\n        </table>      \n    ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], SimpleGridTable);
                return SimpleGridTable;
            }());
            exports_1("SimpleGridTable", SimpleGridTable);
        }
    }
});
