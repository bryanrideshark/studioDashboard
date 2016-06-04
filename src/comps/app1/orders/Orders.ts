import {Component, ViewChild} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import {OrdersAction} from "./OrdersAction";
import {OrderModel} from "./OrderModel";
import {AuthService} from "../../../services/AuthService";
import {SimpleList} from "../../simplelist/Simplelist";
import {Loading} from "../../loading/Loading";
import * as _ from 'lodash';
import {SimplelistEditable} from "../../simplelist/SimplelistEditable";


@Component({
    selector: 'Orders',
    providers: [SimpleList],
    directives: [SimpleList, Loading],
    moduleId: __moduleName,
    templateUrl: 'Orders.html'
})

// @CanActivate((to:ComponentInstruction, from:ComponentInstruction) => {
//     let authService:AuthService = appInjService().get(AuthService);
//     return authService.checkAccess(to, from, ['/Login/Login']);
// })

export class Orders {
    constructor(private appStore:AppStore, private ordersAction:OrdersAction, private authService:AuthService) {
        var i_orders = this.appStore.getState().orders;
        this.orderList = i_orders.getIn(['customerOrders']);
        this.unsub = this.appStore.sub((i_orders:List<OrderModel>) => {
            this.orderList = i_orders
        }, 'orders.customerOrders');

        //todo: workaround until rc.2
        this.authService.checkAccess();
    }

    private unsub:Function;
    private orderList:List<OrderModel> = List<OrderModel>();

    private getContent (order:OrderModel) {
        console.log(Math.random())
        var type = 'Enterp'
        var paymentDate = order.getKey('payment_date');
        if (_.isUndefined(paymentDate)) {
            paymentDate = order.getKey('order_date');
            type = 'Cart'
        }
        var date = new Date(paymentDate)
        var orderId = order.getKey('order_id');
        if (_.isUndefined(orderId))
            orderId = order.getKey('payment_id');
        return `${type} ${orderId} ${date.toLocaleDateString("en-US")}`;
    }

    private ngOnDestroy() {
        this.unsub();
    }
}

