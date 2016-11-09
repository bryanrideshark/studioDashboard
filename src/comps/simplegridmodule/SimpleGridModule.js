System.register(["./SimpleGridData", "./SimpleGridTable", "./SimpleGridSortableHeader", "./SimpleGridRecord", "./SimpleGridDataImage", "./SimpleGridDataCurrency", "./SimpleGridDataChecks", "./SimpleGridDataDropdown", "@angular/core", "@angular/common", "@angular/forms"], function(exports_1, context_1) {
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
    var SimpleGridData_1, SimpleGridTable_1, SimpleGridSortableHeader_1, SimpleGridRecord_1, SimpleGridDataImage_1, SimpleGridDataCurrency_1, SimpleGridDataChecks_1, SimpleGridDataDropdown_1, core_1, common_1, forms_1;
    var SIMPLEGRID_DIRECTIVES, SimpleGridModule;
    return {
        setters:[
            function (SimpleGridData_1_1) {
                SimpleGridData_1 = SimpleGridData_1_1;
            },
            function (SimpleGridTable_1_1) {
                SimpleGridTable_1 = SimpleGridTable_1_1;
            },
            function (SimpleGridSortableHeader_1_1) {
                SimpleGridSortableHeader_1 = SimpleGridSortableHeader_1_1;
            },
            function (SimpleGridRecord_1_1) {
                SimpleGridRecord_1 = SimpleGridRecord_1_1;
            },
            function (SimpleGridDataImage_1_1) {
                SimpleGridDataImage_1 = SimpleGridDataImage_1_1;
            },
            function (SimpleGridDataCurrency_1_1) {
                SimpleGridDataCurrency_1 = SimpleGridDataCurrency_1_1;
            },
            function (SimpleGridDataChecks_1_1) {
                SimpleGridDataChecks_1 = SimpleGridDataChecks_1_1;
            },
            function (SimpleGridDataDropdown_1_1) {
                SimpleGridDataDropdown_1 = SimpleGridDataDropdown_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            exports_1("SIMPLEGRID_DIRECTIVES", SIMPLEGRID_DIRECTIVES = [SimpleGridTable_1.SimpleGridTable, SimpleGridSortableHeader_1.SimpleGridSortableHeader, SimpleGridRecord_1.SimpleGridRecord, SimpleGridData_1.SimpleGridData, SimpleGridDataCurrency_1.SimpleGridDataCurrency, SimpleGridDataImage_1.SimpleGridDataImage, SimpleGridDataChecks_1.SimpleGridDataChecks, SimpleGridDataDropdown_1.SimpleGridDataDropdown]);
            SimpleGridModule = (function () {
                function SimpleGridModule() {
                }
                SimpleGridModule.forRoot = function () {
                    return {
                        ngModule: SimpleGridModule,
                        providers: []
                    };
                };
                SimpleGridModule = __decorate([
                    core_1.NgModule({
                        imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
                        declarations: SIMPLEGRID_DIRECTIVES,
                        exports: SIMPLEGRID_DIRECTIVES
                    }), 
                    __metadata('design:paramtypes', [])
                ], SimpleGridModule);
                return SimpleGridModule;
            }());
            exports_1("SimpleGridModule", SimpleGridModule);
        }
    }
});
