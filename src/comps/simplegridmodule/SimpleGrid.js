System.register(["./SimpleGridData", "./SimpleGridTable", "./SimpleGridSortableHeader", "./SimpleGridRecord", "./SimpleGridDataImage", "./SimpleGridDataCurrency", "./SimpleGridDataChecks", "./SimpleGridDataDropdown"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SimpleGridData_1, SimpleGridTable_1, SimpleGridSortableHeader_1, SimpleGridRecord_1, SimpleGridDataImage_1, SimpleGridDataCurrency_1, SimpleGridDataChecks_1, SimpleGridDataDropdown_1;
    var SIMPLEGRID_DIRECTIVES;
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
            }],
        execute: function() {
            exports_1("SIMPLEGRID_DIRECTIVES", SIMPLEGRID_DIRECTIVES = [SimpleGridTable_1.SimpleGridTable, SimpleGridSortableHeader_1.SimpleGridSortableHeader, SimpleGridRecord_1.SimpleGridRecord, SimpleGridData_1.SimpleGridData, SimpleGridDataCurrency_1.SimpleGridDataCurrency, SimpleGridDataImage_1.SimpleGridDataImage, SimpleGridDataChecks_1.SimpleGridDataChecks, SimpleGridDataDropdown_1.SimpleGridDataDropdown]);
        }
    }
});
