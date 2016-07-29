import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import * as _ from 'lodash';
import {SimpleList} from "../../../simplelist/Simplelist";
import {AdnetRateModel} from "../../../../adnet/AdnetRateModel";

@Component({
    selector: 'AdnetConfigRates',
    moduleId: __moduleName,
    directives: [SimpleList],
    templateUrl: 'AdnetConfigRates.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetConfigRates {

    constructor(private appStore: AppStore) {
        var i_adnet = this.appStore.getState().adnet;
        this.rates = i_adnet.getIn(['rates']);
        this.unsub = this.appStore.sub((i_rates: List<AdnetRateModel>) => {
            this.rates = i_rates;
        }, 'adnet.rates');
    }

    @Input()
    set adnetCustomerId(i_adnetCustomerId: string) {
        this.selectedAdnetCustomerId = i_adnetCustomerId;
        this.updFilteredRates();
    }

    // @ViewChild(SimpleList)
    // simpleList:SimpleList;

    private unsub: Function;
    private selectedAdnetCustomerId: string;
    private rates: List<AdnetRateModel> = List<AdnetRateModel>();
    private filteredRates: List<AdnetRateModel> = List<AdnetRateModel>();

    private updFilteredRates(){
        if (this.rates && this.selectedAdnetCustomerId){
            this.filteredRates = List<AdnetRateModel>();
            this.rates.forEach((i_adnetRateModel: AdnetRateModel)=> {
                var adnetCustomerId = i_adnetRateModel.customerId();
                if (adnetCustomerId == this.selectedAdnetCustomerId) {
                    this.filteredRates = this.filteredRates.push(i_adnetRateModel)
                }
            })
        }
    }

    private getContent(adnetRateModel: AdnetRateModel) {
        return adnetRateModel.getKey('Value').label;
        // console.log(Math.random())
        // var type = order.getOrderType();
        // var paymentDate = order.getDate();
        // var orderId = order.getOrderId();
        // return `${type} ${orderId} ${paymentDate}`;
    }

    // private ngOnDestroy() {
    //     this.unsub();
    // }
}