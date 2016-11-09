System.register(["../models/StoreModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1;
    var SampleModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            SampleModel = (function (_super) {
                __extends(SampleModel, _super);
                function SampleModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                SampleModel.prototype.getName = function () {
                    return this.getKey('name');
                };
                SampleModel.prototype.getType = function () {
                    return this.getKey('type');
                };
                SampleModel.prototype.getBusinessId = function () {
                    return this.getKey('businessId');
                };
                return SampleModel;
            }(StoreModel_1.StoreModel));
            exports_1("SampleModel", SampleModel);
        }
    }
});
