System.register(["../models/StoreModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1;
    var AdnetPairModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            AdnetPairModel = (function (_super) {
                __extends(AdnetPairModel, _super);
                function AdnetPairModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                AdnetPairModel.prototype.getId = function () {
                    return this.getKey('Key');
                };
                AdnetPairModel.prototype.getCustomerId = function () {
                    return this.getKey('Value').customerId;
                };
                AdnetPairModel.prototype.active = function () {
                    return this.getKey('Value').activated;
                };
                AdnetPairModel.prototype.autoActivated = function () {
                    return this.getKey('Value').autoActivate;
                };
                AdnetPairModel.prototype.getToCustomerId = function () {
                    return this.getKey('Value').toCustomerId;
                };
                return AdnetPairModel;
            }(StoreModel_1.StoreModel));
            exports_1("AdnetPairModel", AdnetPairModel);
        }
    }
});
