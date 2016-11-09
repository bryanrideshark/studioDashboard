System.register(["../models/StoreModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1;
    var BusinessModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            BusinessModel = (function (_super) {
                __extends(BusinessModel, _super);
                function BusinessModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                BusinessModel.prototype.getName = function () {
                    return this.getKey('name');
                };
                BusinessModel.prototype.getAdnetCustomerId = function () {
                    return this.getKey('adnetCustomerId');
                };
                BusinessModel.prototype.getAdnetTokenId = function () {
                    return this.getKey('adnetToken');
                };
                BusinessModel.prototype.setModelKey = function (key, value) {
                    return this.setData(BusinessModel, this._data.set(key, value));
                };
                BusinessModel.prototype.setBusinessId = function (id) {
                    return this.setKey(BusinessModel, 'businessId', id);
                };
                BusinessModel.prototype.getBusinessId = function () {
                    return this.getKey('businessId');
                };
                BusinessModel.prototype.invalidateBusinessId = function (i_businessId) {
                    if (i_businessId === void 0) { i_businessId = -1; }
                    return this.setKey(BusinessModel, 'businessId', i_businessId);
                };
                return BusinessModel;
            }(StoreModel_1.StoreModel));
            exports_1("BusinessModel", BusinessModel);
        }
    }
});
