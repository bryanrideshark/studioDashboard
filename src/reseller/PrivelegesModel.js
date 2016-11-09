System.register(["../models/StoreModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1;
    var List, PrivelegesModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            PrivelegesModel = (function (_super) {
                __extends(PrivelegesModel, _super);
                function PrivelegesModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                PrivelegesModel.prototype.getName = function () {
                    return this.getKey('name');
                };
                PrivelegesModel.prototype.getColumns = function () {
                    return this.getKey('groups');
                };
                PrivelegesModel.prototype.getPrivelegesId = function () {
                    return this.getKey('privilegesId');
                };
                return PrivelegesModel;
            }(StoreModel_1.StoreModel));
            exports_1("PrivelegesModel", PrivelegesModel);
        }
    }
});
