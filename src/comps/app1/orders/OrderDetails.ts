import {ChangeDetectionStrategy, Component, Input, ViewContainerRef} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {OrderDetailModel} from "./OrderDetailModel";
import {Compbaser} from "ng-mslib";

@Component({
    selector: 'OrderDetails',
    styleUrls: ['./OrderDetails.css'],
    templateUrl: './OrderDetails.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OrderDetails extends Compbaser {

    constructor(private appStore: AppStore, private viewContainer: ViewContainerRef) {
        super();
        this.el = this.viewContainer.element.nativeElement;
        this.cancelOnDestroy(this.appStore.sub((orderDetailModel: OrderDetailModel) => {
            var status = orderDetailModel.getStatus();
            if (status == 'subscription') {
                this.showProgress = false;
            } else {
                this.showProgress = true;
                switch (status) {
                    case 'in cart':
                        return this.steps = [false, false, false, false];
                    case 'wait payments':
                        return this.steps = [false, false, false, false];
                    case 'new order':
                        return this.steps = [true, false, false, false];
                    case 'approved':
                        return this.steps = [true, true, false, false];
                    case 'processing':
                        return this.steps = [true, true, true, false];
                    case 'on hold':
                        return this.steps = [false, false, false, false];
                    case 'quote':
                        return this.steps = [false, false, false, false];
                    case 'completed':
                        return this.steps = [true, true, true, true];
                }
            }
        }, 'orders.selectedOrder'));

        //var statusOrder = i_orders.getIn(['statusOrder']);


    }

    private el: HTMLElement;

    @Input() set onSelectedOrder(order: OrderDetailModel) {
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
        } else {
            this.products = this.selectedOrder.getOrderDetails();
        }
    };

    subtotal: number = 0;
    tax: number = 0;
    discount: number = 0;
    shipping: number = 0;
    total: number = 0;
    products: Array<any>;
    showProgress: boolean = false;
    steps: Array<boolean> = [true, true, true, true];
    stepsDescription: Array<string> = ['new order', 'approved', 'processing', 'shipped'];
    selectedOrder: OrderDetailModel;
    loading: boolean = false;
    // private unsub1: Function;
    // private unsub2: Function;
    // private orderList:List<OrderModel> = List<OrderModel>();

    printElem() {
        var self = this;
        this.showProgress = false;
        var mywindow = window.open('', self.selectedOrder.getDate(), 'height=400,width=600');
        setTimeout(() => {
            var printContents = self.el.innerHTML;
            //var mywindow = window.open('', self.selectedOrder.getDate(), 'height=400,width=600');
            mywindow.document.write(`<html><head><title>${self.selectedOrder.getOrderId()}</title>`);
            /*optional stylesheet*/ //
            mywindow.document.write('</head><body >');
            // mywindow.document.write('<link rel="stylesheet" href="http://localhost:9089/src/styles/style.css" type="text/css" />');
            mywindow.document.write(printContents);
            mywindow.document.write('</body></html>');
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10
            mywindow.print();
            mywindow.close();
        }, 1000)
        return true;
    }

    toCurrency(value) {
        if (value && !isNaN(value)) {
            return '$' + parseFloat(value).toFixed(2);
        }
        return '$0.00';
    }

    tableDesc(field) {
        return field.description;
    }

    tableQty(field) {
        return field.product_count;
    }

    tablePrice(field) {
        return parseFloat(field.price);
    }

    tableTotal(field) {
        var v: any = field.product_count * field.price;
        return parseFloat(v);
    }
}

// var i_orders = this.appStore.getState().orders;
// this.orderList = i_orders.getIn(['customerOrders']);
// this.unsub1 = this.appStore.sub((i_orders:List<OrderModel>) => {
//     this.orderList = i_orders
// }, 'orders.customerOrders');