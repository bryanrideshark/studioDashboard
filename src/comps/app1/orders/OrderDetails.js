System.register(["@angular/core", "angular2-redux-util", "./OrderDetailModel", "./OrderDetails.html!text", "./OrderDetails.css!text"], function(exports_1, context_1) {
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
    var core_1, angular2_redux_util_1, OrderDetailModel_1, OrderDetails_html_text_1, OrderDetails_css_text_1;
    var OrderDetails;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (OrderDetailModel_1_1) {
                OrderDetailModel_1 = OrderDetailModel_1_1;
            },
            function (OrderDetails_html_text_1_1) {
                OrderDetails_html_text_1 = OrderDetails_html_text_1_1;
            },
            function (OrderDetails_css_text_1_1) {
                OrderDetails_css_text_1 = OrderDetails_css_text_1_1;
            }],
        execute: function() {
            OrderDetails = (function () {
                function OrderDetails(appStore, viewContainer) {
                    var _this = this;
                    this.appStore = appStore;
                    this.viewContainer = viewContainer;
                    this.subtotal = 0;
                    this.tax = 0;
                    this.discount = 0;
                    this.shipping = 0;
                    this.total = 0;
                    this.showProgress = false;
                    this.steps = [true, true, true, true];
                    this.stepsDescription = ['new order', 'approved', 'processing', 'shipped'];
                    this.loading = false;
                    this.el = this.viewContainer.element.nativeElement;
                    this.unsub2 = this.appStore.sub(function (orderDetailModel) {
                        var status = orderDetailModel.getStatus();
                        if (status == 'subscription') {
                            _this.showProgress = false;
                        }
                        else {
                            _this.showProgress = true;
                            switch (status) {
                                case 'in cart':
                                    return _this.steps = [false, false, false, false];
                                case 'wait payments':
                                    return _this.steps = [false, false, false, false];
                                case 'new order':
                                    return _this.steps = [true, false, false, false];
                                case 'approved':
                                    return _this.steps = [true, true, false, false];
                                case 'processing':
                                    return _this.steps = [true, true, true, false];
                                case 'on hold':
                                    return _this.steps = [false, false, false, false];
                                case 'quote':
                                    return _this.steps = [false, false, false, false];
                                case 'completed':
                                    return _this.steps = [true, true, true, true];
                            }
                        }
                    }, 'orders.selectedOrder');
                }
                Object.defineProperty(OrderDetails.prototype, "onSelectedOrder", {
                    set: function (order) {
                        if (!order)
                            return;
                        this.selectedOrder = order;
                        if (this.selectedOrder.getStatus() == 'subscription') {
                            this.products = [{
                                    description: "Enterprise subscription",
                                    product_count: 1,
                                    price: "99.00"
                                }];
                            this.subtotal = 99;
                            this.total = 99;
                            this.shipping = 0;
                            this.discount = 0;
                            this.tax = 0;
                        }
                        else {
                            this.products = this.selectedOrder.getOrderDetails();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                OrderDetails.prototype.printElem = function () {
                    var self = this;
                    this.showProgress = false;
                    var mywindow = window.open('', self.selectedOrder.getDate(), 'height=400,width=600');
                    setTimeout(function () {
                        var printContents = self.el.innerHTML;
                        mywindow.document.write("<html><head><title>" + self.selectedOrder.getOrderId() + "</title>");
                        mywindow.document.write('</head><body >');
                        mywindow.document.write(printContents);
                        mywindow.document.write('</body></html>');
                        mywindow.document.close();
                        mywindow.focus();
                        mywindow.print();
                        mywindow.close();
                    }, 1000);
                    return true;
                };
                OrderDetails.prototype.toCurrency = function (value) {
                    if (value && !isNaN(value)) {
                        return '$' + parseFloat(value).toFixed(2);
                    }
                    return '$0.00';
                };
                OrderDetails.prototype.tableDesc = function (field) {
                    return field.description;
                };
                OrderDetails.prototype.tableQty = function (field) {
                    return field.product_count;
                };
                OrderDetails.prototype.tablePrice = function (field) {
                    return parseFloat(field.price);
                };
                OrderDetails.prototype.tableTotal = function (field) {
                    var v = field.product_count * field.price;
                    return parseFloat(v);
                };
                OrderDetails.prototype.ngOnDestroy = function () {
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', OrderDetailModel_1.OrderDetailModel), 
                    __metadata('design:paramtypes', [OrderDetailModel_1.OrderDetailModel])
                ], OrderDetails.prototype, "onSelectedOrder", null);
                OrderDetails = __decorate([
                    core_1.Component({
                        selector: 'OrderDetails',
                        moduleId: __moduleName,
                        styles: [OrderDetails_css_text_1.default],
                        template: OrderDetails_html_text_1.default,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, core_1.ViewContainerRef])
                ], OrderDetails);
                return OrderDetails;
            }());
            exports_1("OrderDetails", OrderDetails);
        }
    }
});
