import {Component, Input} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import {OrdersAction} from "./OrdersAction";
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

export class OrderDetails {

    constructor(private appStore:AppStore, private ordersAction:OrdersAction, private authService:AuthService) {
        var i_orders = this.appStore.getState().orders;
        this.orderList = i_orders.getIn(['customerOrders']);
        this.unsub = this.appStore.sub((i_orders:List<OrderModel>) => {
            this.orderList = i_orders
        }, 'orders.customerOrders');

        //todo: workaround until rc.2
        this.authService.checkAccess();
    }

    @Input() set onSelectedOrder(order:OrderModel) {
        if (!order)
            return;
        this.selectedOrder = null;
        this.loading = true;
        setTimeout(()=> {
            this.loading = false;
            this.selectedOrder = order;
        }, 1000)
    };

    private selectedOrder:OrderModel;
    private loading:boolean = false;
    private unsub:Function;
    private orderList:List<OrderModel> = List<OrderModel>();

    private ngOnDestroy() {
        this.unsub();
    }

}