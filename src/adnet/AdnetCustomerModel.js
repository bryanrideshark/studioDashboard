System.register(["../models/StoreModel", "lodash"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1, _;
    var AdnetCustomerModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            AdnetCustomerModel = (function (_super) {
                __extends(AdnetCustomerModel, _super);
                function AdnetCustomerModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                AdnetCustomerModel.prototype.getId = function () {
                    return this.getKey('Key');
                };
                AdnetCustomerModel.prototype.customerId = function () {
                    return this.getKey('Key');
                };
                AdnetCustomerModel.prototype.getName = function () {
                    return this.getKey('Value').label;
                };
                AdnetCustomerModel.prototype.getContact = function () {
                    return this.getKey('Value').contactPerson;
                };
                AdnetCustomerModel.prototype.contactPhone = function () {
                    return this.getKey('Value').contactPhone;
                };
                AdnetCustomerModel.prototype.contactPerson = function () {
                    return this.getKey('Value').contactPerson;
                };
                AdnetCustomerModel.prototype.contactCell = function () {
                    return this.getKey('Value').contactCell;
                };
                AdnetCustomerModel.prototype.comments = function () {
                    return this.getKey('Value').comments;
                };
                AdnetCustomerModel.prototype.reviewRate = function () {
                    return this.getKey('Value').reviewRate;
                };
                AdnetCustomerModel.prototype.reviewRateArr = function () {
                    var v = this.getKey('Value').reviewRate;
                    return _.range(Math.ceil(v));
                };
                AdnetCustomerModel.prototype.website = function () {
                    return this.getKey('Value').website;
                };
                AdnetCustomerModel.prototype.locationLat = function () {
                    return this.getKey('Value').locationLat;
                };
                AdnetCustomerModel.prototype.locationLng = function () {
                    return this.getKey('Value').locationLng;
                };
                return AdnetCustomerModel;
            }(StoreModel_1.StoreModel));
            exports_1("AdnetCustomerModel", AdnetCustomerModel);
        }
    }
});
