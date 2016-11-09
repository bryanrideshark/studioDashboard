System.register(["../models/StoreModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1;
    var AdnetTargetModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            AdnetTargetModel = (function (_super) {
                __extends(AdnetTargetModel, _super);
                function AdnetTargetModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                AdnetTargetModel.prototype.setId = function (value) {
                    return this.setKey(AdnetTargetModel, 'Key', value);
                };
                AdnetTargetModel.prototype.getId = function () {
                    return this.getKey('Key');
                };
                AdnetTargetModel.prototype.getName = function () {
                    return this.getKey('Value').label;
                };
                AdnetTargetModel.prototype.getEnabled = function () {
                    return this.getKey('Value').enabled;
                };
                AdnetTargetModel.prototype.getDeleted = function () {
                    return this.getKey('Value').deleted;
                };
                AdnetTargetModel.prototype.getCoordinates = function () {
                    var lat = this.getKey('Value').locationLat;
                    var lng = this.getKey('Value').locationLng;
                    if (!lat)
                        lat = 0;
                    if (!lng)
                        lng = 0;
                    return { lat: lat, lng: lng };
                };
                AdnetTargetModel.prototype.getRateId = function () {
                    return this.getKey('Value').rateId || '';
                };
                AdnetTargetModel.prototype.getField = function (i_field) {
                    return this.getKey('Value')[i_field];
                };
                AdnetTargetModel.prototype.setField = function (i_field, i_value) {
                    var value = this.getKey('Value');
                    value[i_field] = i_value;
                    return this.setKey(AdnetTargetModel, 'Value', value);
                };
                AdnetTargetModel.prototype.getCustomerId = function () {
                    return this.getKey('Value').customerId;
                };
                AdnetTargetModel.prototype.getKeys = function () {
                    return this.getKey('Value').keys;
                };
                AdnetTargetModel.prototype.getComments = function () {
                    return this.getKey('Value').comments;
                };
                AdnetTargetModel.prototype.getTargetType = function () {
                    return this.getKey('Value').targetType;
                };
                AdnetTargetModel.prototype.getTargetTypeName = function () {
                    if (this.getKey('Value').targetType == 0)
                        return 'station';
                    return 'website';
                };
                return AdnetTargetModel;
            }(StoreModel_1.StoreModel));
            exports_1("AdnetTargetModel", AdnetTargetModel);
        }
    }
});
