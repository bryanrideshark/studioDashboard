import {Component} from "@angular/core";
import {BusinessAction} from "../../../business/BusinessAction";
import {BusinessModel} from "../../../business/BusinessModel";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import * as _ from 'lodash';

@Component({
    selector: 'orderDetails',
    moduleId: __moduleName,
    styleUrls: ['OrderDetails.css'],
    templateUrl: 'OrderDetails.html'
})

export class OrderDetails {
     //a
    constructor(private appStore:AppStore, private businessAction:BusinessAction) {
        var i_businesses = this.appStore.getState().business;

        this.businessesList = i_businesses.getIn(['businesses']);
        this.unsub = this.appStore.sub((i_businesses:List<BusinessModel>) => {
            this.businessesList = i_businesses;
        }, 'business.businesses');

    }

    // @ViewChild(SimpleList)
    // simpleList:SimpleList;

    private unsub:Function;
    private businessesList:List<BusinessModel> = List<BusinessModel>();

    private ngOnDestroy() {
        this.unsub();
    }
}