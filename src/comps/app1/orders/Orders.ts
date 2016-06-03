import {Component} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import {OrdersAction} from "./OrdersAction";
import {OrderModel} from "./OrderModel";


@Component({
    selector: 'Orders',
    template: `<h1>Orders</h1>`
})

// @CanActivate((to:ComponentInstruction, from:ComponentInstruction) => {
//     let authService:AuthService = appInjService().get(AuthService);
//     return authService.checkAccess(to, from, ['/Login/Login']);
// })

export class Orders {

    constructor(private appStore:AppStore, private ordersAction:OrdersAction) {
        var i_businesses = this.appStore.getState().business;

        this.orderList = i_businesses.getIn(['orders']);
        this.unsub = this.appStore.sub((i_orders:List<OrderModel>) => {
            this.orderList = i_orders
        }, 'orders.customerOrders');

    }

    private unsub:Function;
    private orderList:List<OrderModel> = List<OrderModel>();

    private ngOnDestroy() {
        this.unsub();
    }
}

