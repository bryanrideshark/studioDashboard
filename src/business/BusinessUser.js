System.register(["../models/StoreModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1;
    var BusinessUser;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            BusinessUser = (function (_super) {
                __extends(BusinessUser, _super);
                function BusinessUser(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                BusinessUser.prototype.setModelKey = function (key, value) {
                    return this.setData(BusinessUser, this._data.set(key, value));
                };
                BusinessUser.prototype.setBusinessId = function (id) {
                    return this.setKey(BusinessUser, 'businessId', id);
                };
                BusinessUser.prototype.getBusinessId = function () {
                    return this.getKey('businessId');
                };
                BusinessUser.prototype.businessName = function () {
                    return this.getKey('businessName');
                };
                BusinessUser.prototype.getName = function () {
                    return this.getKey('name');
                };
                BusinessUser.prototype.getPassword = function () {
                    return this.getKey('password');
                };
                BusinessUser.prototype.privilegeId = function () {
                    return this.getKey('privilegeId');
                };
                BusinessUser.prototype.getAccessMask = function () {
                    return this.getKey('accessMask');
                };
                return BusinessUser;
            }(StoreModel_1.StoreModel));
            exports_1("BusinessUser", BusinessUser);
        }
    }
});
