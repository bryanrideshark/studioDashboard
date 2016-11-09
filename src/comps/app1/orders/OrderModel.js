System.register(["../../../models/StoreModel", "lodash"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1, _;
    var OrderModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            OrderModel = (function (_super) {
                __extends(OrderModel, _super);
                function OrderModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                OrderModel.prototype.getTotal = function () {
                    return this.getKey('amount');
                };
                OrderModel.prototype.getOrderType = function () {
                    var orderId = this.getKey('order_id');
                    if (_.isUndefined(orderId))
                        return 'Enterp';
                    return 'Cart';
                };
                OrderModel.prototype.getDate = function () {
                    var paymentDate = this.getKey('payment_date');
                    if (_.isUndefined(paymentDate))
                        paymentDate = this.getKey('order_date');
                    var d = new Date(paymentDate);
                    return d.toLocaleDateString("en-US");
                };
                OrderModel.prototype.getOrderId = function () {
                    var orderId = this.getKey('order_id');
                    if (_.isUndefined(orderId))
                        orderId = this.getKey('payment_id');
                    return orderId;
                };
                return OrderModel;
            }(StoreModel_1.StoreModel));
            exports_1("OrderModel", OrderModel);
        }
    }
});
