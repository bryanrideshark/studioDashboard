System.register(["@angular/core", "angular2-redux-util", "immutable", "./OrdersAction", "../../../services/AuthService", "../../simplelist/Simplelist", "lodash", './Orders.html!text'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, angular2_redux_util_1, immutable_1, OrdersAction_1, AuthService_1, Simplelist_1, _, Orders_html_text_1;
    var Orders;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (OrdersAction_1_1) {
                OrdersAction_1 = OrdersAction_1_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            },
            function (Simplelist_1_1) {
                Simplelist_1 = Simplelist_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (Orders_html_text_1_1) {
                Orders_html_text_1 = Orders_html_text_1_1;
            }],
        execute: function() {
            Orders = (function () {
                function Orders(appStore, ordersAction, authService) {
                    var _this = this;
                    this.appStore = appStore;
                    this.ordersAction = ordersAction;
                    this.authService = authService;
                    this.orderList = immutable_1.List();
                    var i_orders = this.appStore.getState().orders;
                    this.orderList = i_orders.getIn(['customerOrders']);
                    this.unsub = this.appStore.sub(function (i_orders) {
                        _this.orderList = i_orders;
                    }, 'orders.customerOrders');
                    this.appStore.sub(function (i_order) {
                        _this.selectedOrder = i_order;
                    }, 'orders.selectedOrder');
                }
                Orders.prototype.getContent = function (order) {
                    var type = order.getOrderType();
                    var paymentDate = order.getDate();
                    var orderId = order.getOrderId();
                    return type + " " + orderId + " " + paymentDate;
                };
                Orders.prototype.onSelection = function () {
                    var _this = this;
                    if (!this.orderList)
                        return;
                    var orderSelected = this.simpleList.getSelected();
                    var accountType = this.appStore.getState().appdb.get('accountType');
                    _.forEach(orderSelected, function (order) {
                        if (order.selected) {
                            _this.appStore.dispatch(_this.ordersAction.fetchOrder(order.item.getOrderId(), accountType));
                            return;
                        }
                    });
                };
                Orders.prototype.ngOnDestroy = function () {
                    this.unsub();
                };
                __decorate([
                    core_1.ViewChild(Simplelist_1.SimpleList), 
                    __metadata('design:type', Simplelist_1.SimpleList)
                ], Orders.prototype, "simpleList", void 0);
                Orders = __decorate([
                    core_1.Component({
                        selector: 'Orders',
                        moduleId: __moduleName,
                        template: Orders_html_text_1.default,
                        host: {
                            '[style.display]': "'block'"
                        },
                        animations: []
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, OrdersAction_1.OrdersAction, AuthService_1.AuthService])
                ], Orders);
                return Orders;
            }());
            exports_1("Orders", Orders);
        }
    }
});
