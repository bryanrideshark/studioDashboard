import {Component, Input, OnDestroy} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import * as OrderActions from './OrdersAction';
import {OrderModel} from "./OrderModel";
import {AuthService} from "../../../services/AuthService";
import {Loading} from "../../loading/Loading";

@Component({
    selector: 'OrderDetails',
    moduleId: __moduleName,
    directives: [Loading],
    styleUrls: ['OrderDetails.css'],
    templateUrl: 'OrderDetails.html'
})

export class OrderDetails implements OnDestroy {

    constructor(private appStore:AppStore, private authService:AuthService) {
        var i_orders = this.appStore.getState().orders;
        this.orderList = i_orders.getIn(['customerOrders']);
        this.unsub1 = this.appStore.sub((i_orders:List<OrderModel>) => {
            this.orderList = i_orders
        }, 'orders.customerOrders');

        //var statusOrder = i_orders.getIn(['statusOrder']);
        this.unsub2 = this.appStore.sub((status:any) => {
            if (status == OrderActions.REQUEST_ORDER) {
                this.loading = true;
                this.selectedOrder = null;
            } else {
                setTimeout(()=>this.loading = false,500)
            }
        }, 'orders.statusOrder');

        //todo: workaround until rc.2
        this.authService.checkAccess();
    }

    @Input() set onSelectedOrder(order:OrderModel) {
        if (!order)
            return;
        this.selectedOrder = order;
    };

    private selectedOrder:OrderModel;
    private loading:boolean = false;
    private unsub1:Function;
    private unsub2:Function;
    private orderList:List<OrderModel> = List<OrderModel>();

    ngOnDestroy() {
        this.unsub1();
        this.unsub2();
        alert(1)
    }

}