import {Component, ViewChild} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import {OrdersAction} from "./OrdersAction";
import {OrderModel} from "./OrderModel";
import {AuthService} from "../../../services/AuthService";
import {SimpleList, ISimpleListItem} from "../../simplelist/Simplelist";
import {Loading} from "../../loading/Loading";
import * as _ from "lodash";
import {OrderDetails} from "./OrderDetails";

@Component({
    selector: 'Orders',
    providers: [SimpleList],
    directives: [SimpleList, Loading, OrderDetails],
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

    @ViewChild(SimpleList)
    simpleList:SimpleList;

    private selectedOrder:OrderModel;
    private unsub:Function;
    private orderList:List<OrderModel> = List<OrderModel>();

    private getContent(order:OrderModel) {
        console.log(Math.random())
        var type = order.getOrderType();
        var paymentDate = order.getDate();
        var orderId = order.getOrderId();
        return `${type} ${orderId} ${paymentDate.toLocaleDateString("en-US")}`;
    }

    private onSelection() {
        if (!this.orderList)
            return;
        var orderSelected:{} = this.simpleList.getSelected();
        _.forEach(orderSelected, (order:ISimpleListItem)=> {
            if (order.selected) {
                this.selectedOrder = order.item;
            }
        })

    }

    private ngOnDestroy() {
        this.unsub();
    }
}

