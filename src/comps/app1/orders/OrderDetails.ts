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
        // this.unsub2 = this.appStore.sub((status:any) => {
        //     if (status == OrderActions.REQUEST_ORDER) {
        //         this.loading = true;
        //         this.selectedOrder = null;
        //     } else {
        //         setTimeout(()=>this.loading = false,500)
        //     }
        // }, 'orders.statusOrder');

        //todo: workaround until rc.2
        this.authService.checkAccess();
    }

    @Input() set onSelectedOrder(order:OrderDetailModel) {
        if (!order)
            return;
        this.selectedOrder = order;
    };

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