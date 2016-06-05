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
    selector: 'OrderDetails',
    moduleId: __moduleName,
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

    private unsub:Function;
    private orderList:List<OrderModel> = List<OrderModel>();


    private ngOnDestroy() {
        this.unsub();
    }

}