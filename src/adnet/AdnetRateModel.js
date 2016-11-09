System.register(["../models/StoreModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1;
    var AdnetRateModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            AdnetRateModel = (function (_super) {
                __extends(AdnetRateModel, _super);
                function AdnetRateModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                AdnetRateModel.prototype.setId = function (value) {
                    return this.setKey(AdnetRateModel, 'Key', value);
                };
                AdnetRateModel.prototype.getId = function () {
                    return this.getKey('Key');
                };
                AdnetRateModel.prototype.customerId = function () {
                    return this.getKey('Value').customerId;
                };
                AdnetRateModel.prototype.rateMap = function () {
                    return this.getKey('Value').rateMap;
                };
                AdnetRateModel.prototype.getName = function () {
                    return this.getKey('Value').label;
                };
                AdnetRateModel.prototype.setField = function (i_field, i_value) {
                    var value = this.getKey('Value');
                    value[i_field] = i_value;
                    return this.setKey(AdnetRateModel, 'Value', value);
                };
                AdnetRateModel.prototype.rateLevels = function () {
                    var a = [
                        this.getKey('Value').hourRate0,
                        this.getKey('Value').hourRate1,
                        this.getKey('Value').hourRate2,
                        this.getKey('Value').hourRate3
                    ];
                    return a;
                };
                return AdnetRateModel;
            }(StoreModel_1.StoreModel));
            exports_1("AdnetRateModel", AdnetRateModel);
        }
    }
});
