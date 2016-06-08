import {Component, Input, OnDestroy, ChangeDetectionStrategy} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import * as OrderActions from "./OrdersAction";
import {OrderModel} from "./OrderModel";
import {AuthService} from "../../../services/AuthService";
import {Loading} from "../../loading/Loading";
import {OrderDetailModel} from "./OrderDetailModel";
import {ReplacePipe} from "../../../pipes/ReplacePipe";
import {CharCount} from "../../../pipes/CharCount";

@Component({
    selector: 'OrderDetails',
    moduleId: __moduleName,
    pipes: [ReplacePipe],
    directives: [Loading],
    styleUrls: ['OrderDetails.css'],
    templateUrl: 'OrderDetails.html',
    changeDetection: ChangeDetectionStrategy.OnPush,

})

export class OrderDetails implements OnDestroy {

    constructor(private appStore:AppStore, private authService:AuthService) {
        // var i_orders = this.appStore.getState().orders;
        // this.orderList = i_orders.getIn(['customerOrders']);
        // this.unsub1 = this.appStore.sub((i_orders:List<OrderModel>) => {
        //     this.orderList = i_orders
        // }, 'orders.customerOrders');

        //var statusOrder = i_orders.getIn(['statusOrder']);
        this.unsub2 = this.appStore.sub((orderDetailModel:OrderDetailModel) => {
            var status = orderDetailModel.getStatus();
            if (status == 'subscription') {
                this.isCartOrder = false;
            } else {
                this.isCartOrder = true;
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
        }, 'orders.selectedOrder');

        //todo: workaround until rc.2
        this.authService.checkAccess();
    }

    @Input() set onSelectedOrder(order:OrderDetailModel) {
        if (!order)
            return;
        this.selectedOrder = order;
    };

    private isCartOrder:boolean = false;
    private steps:Array<boolean> = [true, true, true, true];
    private stepsDescription:Array<string> = ['new order', 'approved', 'processing', 'shipped'];
    private selectedOrder:OrderDetailModel;
    private loading:boolean = false;
    private unsub1:Function;
    private unsub2:Function;
    // private orderList:List<OrderModel> = List<OrderModel>();

    ngOnDestroy() {
        //todo: bug in ng2 router not calling destory, revisit in rc.2
        // this.unsub1();
        // this.unsub2();
        // alert('yay, router working again...')
    }

}