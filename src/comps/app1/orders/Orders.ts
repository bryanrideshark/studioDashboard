import {Component} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import {OrdersAction} from "./OrdersAction";
import {OrderModel} from "./OrderModel";
import {AuthService} from "../../../services/AuthService";
import {SimpleList} from "../../simplelist/Simplelist";


@Component({
    selector: 'Orders',
    providers: [SimpleList],
    directives: [SimpleList],
    template: `<h1>Orders</h1>`
})

// @CanActivate((to:ComponentInstruction, from:ComponentInstruction) => {
//     let authService:AuthService = appInjService().get(AuthService);
//     return authService.checkAccess(to, from, ['/Login/Login']);
// })

export class Orders {
    //test 5
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

    private ngOnDestroy() {
        this.unsub();
    }
}

