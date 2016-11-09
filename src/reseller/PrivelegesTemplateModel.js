System.register(["../models/StoreModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1;
    var PrivelegesTemplateModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            PrivelegesTemplateModel = (function (_super) {
                __extends(PrivelegesTemplateModel, _super);
                function PrivelegesTemplateModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                PrivelegesTemplateModel.prototype.getPrivelegesId = function () {
                    return this.getKey('privilegesId');
                };
                PrivelegesTemplateModel.prototype.getTableName = function () {
                    return this.getKey('tableName');
                };
                PrivelegesTemplateModel.prototype.getGroupAttributes = function () {
                    var result = [];
                    var keys = this.getData().toJS();
                    for (var key in keys) {
                        if (key == 'name' || key == 'columns' || key == 'tableName')
                            continue;
                        result.push(key);
                    }
                    return result;
                };
                PrivelegesTemplateModel.prototype.getColumns = function () {
                    return this.getKey('columns');
                };
                PrivelegesTemplateModel.prototype.getColumnSize = function () {
                    try {
                        return this.getKey('columns').size;
                    }
                    catch (e) {
                        return 0;
                    }
                };
                return PrivelegesTemplateModel;
            }(StoreModel_1.StoreModel));
            exports_1("PrivelegesTemplateModel", PrivelegesTemplateModel);
        }
    }
});
