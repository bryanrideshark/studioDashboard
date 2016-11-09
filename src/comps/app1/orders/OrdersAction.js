System.register(["@angular/http", "@angular/core", "angular2-redux-util", "./OrderModel", 'immutable', "rxjs/Observable", 'rxjs/add/operator/catch', 'rxjs/add/operator/finally', 'rxjs/add/observable/throw', 'xml2js', 'bootbox', "./OrderDetailModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var http_1, core_1, angular2_redux_util_1, OrderModel_1, immutable_1, Observable_1, xml2js, bootbox, OrderDetailModel_1;
    var REQUEST_ORDERS, REQUEST_ORDER, RECEIVED_ORDER, RECEIVED_ORDERS, RECEIVE_ACCOUNT_TYPE, OrdersAction;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (OrderModel_1_1) {
                OrderModel_1 = OrderModel_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (xml2js_1) {
                xml2js = xml2js_1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (OrderDetailModel_1_1) {
                OrderDetailModel_1 = OrderDetailModel_1_1;
            }],
        execute: function() {
            exports_1("REQUEST_ORDERS", REQUEST_ORDERS = 'REQUEST_ORDERS');
            exports_1("REQUEST_ORDER", REQUEST_ORDER = 'REQUEST_ORDER');
            exports_1("RECEIVED_ORDER", RECEIVED_ORDER = 'RECEIVED_ORDER');
            exports_1("RECEIVED_ORDERS", RECEIVED_ORDERS = 'RECEIVED_ORDERS');
            exports_1("RECEIVE_ACCOUNT_TYPE", RECEIVE_ACCOUNT_TYPE = 'RECEIVE_ACCOUNT_TYPE');
            OrdersAction = (function (_super) {
                __extends(OrdersAction, _super);
                function OrdersAction(_http, appStore) {
                    _super.call(this);
                    this._http = _http;
                    this.appStore = appStore;
                    this.parseString = xml2js.parseString;
                }
                OrdersAction.prototype.fetchOrder = function (orderId, accountType) {
                    var _this = this;
                    return function (dispatch) {
                        dispatch(_this.requestOrder());
                        var appdb = _this.appStore.getState().appdb;
                        var url;
                        url = appdb.get('appBaseUrlCloud').replace('END_POINT', 'order') + ("/" + orderId + "/" + accountType);
                        _this._http.get(url)
                            .catch(function (err) {
                            bootbox.alert('Error getting order details');
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                        })
                            .map(function (result) {
                            var order = result.json();
                            var orderDetailModel = new OrderDetailModel_1.OrderDetailModel(order);
                            dispatch(_this.receivedOrder(orderDetailModel));
                        }).subscribe();
                    };
                };
                OrdersAction.prototype.fetchOrders = function (dispatch, accountType) {
                    var _this = this;
                    dispatch(this.requestOrders());
                    var appdb = this.appStore.getState().appdb;
                    var url;
                    url = appdb.get('appBaseUrlCloud').replace('END_POINT', 'orders') + ("/" + accountType);
                    this._http.get(url)
                        .catch(function (err) {
                        bootbox.alert('Error updating account');
                        return Observable_1.Observable.throw(err);
                    })
                        .finally(function () {
                    })
                        .map(function (result) {
                        var orders = result.json();
                        var orderModels = immutable_1.List();
                        orders.forEach(function (i_order) {
                            var orderModel = new OrderModel_1.OrderModel(i_order);
                            orderModels = orderModels.push(orderModel);
                        });
                        dispatch(_this.receivedOrders(orderModels));
                    }).subscribe();
                };
                OrdersAction.prototype.fetchAccountType = function () {
                    var _this = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var url;
                        url = appdb.get('appBaseUrlCloud').replace('END_POINT', 'getAccountType');
                        _this._http.get(url)
                            .catch(function (err) {
                            bootbox.alert('Error updating account');
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                        })
                            .map(function (result) {
                            var accountType = result.json().accountType;
                            dispatch(_this.receiveAccountType(accountType));
                            if (accountType == 'UNKNOWN') {
                                bootbox.alert('Problem getting account type');
                                return;
                            }
                            _this.fetchOrders(dispatch, accountType);
                        }).subscribe();
                    };
                };
                OrdersAction.prototype.requestOrders = function () {
                    return {
                        type: REQUEST_ORDERS
                    };
                };
                OrdersAction.prototype.requestOrder = function () {
                    return {
                        type: REQUEST_ORDER
                    };
                };
                OrdersAction.prototype.receiveAccountType = function (accountType) {
                    return {
                        type: RECEIVE_ACCOUNT_TYPE,
                        accountType: accountType
                    };
                };
                OrdersAction.prototype.receivedOrder = function (order) {
                    return {
                        type: RECEIVED_ORDER,
                        order: order
                    };
                };
                OrdersAction.prototype.receivedOrders = function (orders) {
                    return {
                        type: RECEIVED_ORDERS,
                        orders: orders
                    };
                };
                OrdersAction.prototype.ngOnDestroy = function () {
                };
                OrdersAction = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, angular2_redux_util_1.AppStore])
                ], OrdersAction);
                return OrdersAction;
            }(angular2_redux_util_1.Actions));
            exports_1("OrdersAction", OrdersAction);
        }
    }
});
