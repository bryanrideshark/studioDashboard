System.register(["../../../models/StoreModel", "lodash"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1, _;
    var OrderDetailModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            OrderDetailModel = (function (_super) {
                __extends(OrderDetailModel, _super);
                function OrderDetailModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                    this.fields = ['company', 'first_name', 'last_name', 'address1', 'address2', 'state', 'county', 'zip_code', 'phone1'];
                }
                OrderDetailModel.prototype.getOrderId = function () {
                    var subscription = this.getKey('subscription');
                    if (subscription)
                        return subscription.payment_id;
                    return this.getKey('order').order_id;
                };
                OrderDetailModel.prototype.getCustomerInfo = function (type) {
                    var str = '';
                    var data = this.getKey(type);
                    this.fields.forEach(function (field) {
                        if (data[field] && data[field].length > 0)
                            str = str + data[field] + '\n';
                    });
                    return str;
                };
                OrderDetailModel.prototype.toCurrency = function (value) {
                    value = parseFloat(value);
                    return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                };
                OrderDetailModel.prototype.getBilling = function () {
                    return this.getCustomerInfo('billing');
                };
                OrderDetailModel.prototype.getOrderDetails = function () {
                    return this.getKey('orderDetails');
                };
                OrderDetailModel.prototype.getShipping = function () {
                    return this.getCustomerInfo('shipping');
                };
                OrderDetailModel.prototype.getEmail = function () {
                    return this.getKey('billing').email;
                };
                OrderDetailModel.prototype.getDiscount = function () {
                    var order = this.getKey('order');
                    if (_.isUndefined(order))
                        return this.toCurrency(0);
                    return this.toCurrency(order.discount_amount);
                };
                OrderDetailModel.prototype.getTax = function () {
                    var order = this.getKey('order');
                    if (_.isUndefined(order))
                        return this.toCurrency(0);
                    return this.toCurrency(order.tax_amount);
                };
                OrderDetailModel.prototype.getSubtotal = function () {
                    var order = this.getKey('order');
                    if (_.isUndefined(order))
                        return this.toCurrency(99);
                    return this.toCurrency(order.subtotal_amount);
                };
                OrderDetailModel.prototype.getTotal = function () {
                    var order = this.getKey('order');
                    if (_.isUndefined(order))
                        return this.toCurrency(99);
                    return this.toCurrency(order.amount);
                };
                OrderDetailModel.prototype.getShippingTotal = function () {
                    var order = this.getKey('order');
                    if (_.isUndefined(order))
                        return this.toCurrency(0);
                    return this.toCurrency(order.shipping_amount);
                };
                OrderDetailModel.prototype.getStatus = function () {
                    var orderDetails = this.getKey('orderDetails');
                    if (orderDetails.length == 0)
                        return 'subscription';
                    var status = this.getKey('orderDetails')[0].status;
                    switch (status) {
                        case -2:
                            return 'in cart';
                        case -1:
                            return 'wait payments';
                        case 0:
                            return 'new order';
                        case 1:
                            return 'approved';
                        case 2:
                            return 'processing';
                        case 3:
                            return 'on hold';
                        case 4:
                            return 'quote';
                        case 5:
                            return 'completed';
                    }
                    return status;
                };
                OrderDetailModel.prototype.getTracking = function () {
                    var subscription = this.getKey('subscription');
                    if (subscription)
                        return '';
                    return this.getKey('orderDetails')[0].tracking;
                };
                OrderDetailModel.prototype.getDate = function () {
                    var subscription = this.getKey('subscription');
                    if (subscription)
                        return new Date(subscription.payment_date).toLocaleDateString('us');
                    return new Date(this.getKey('orderDetails')[0].order_date).toLocaleDateString('us');
                };
                return OrderDetailModel;
            }(StoreModel_1.StoreModel));
            exports_1("OrderDetailModel", OrderDetailModel);
        }
    }
});
