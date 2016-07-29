import {Component, ChangeDetectionStrategy, Input, ViewChild} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import * as _ from 'lodash';
import {SimpleList, ISimpleListItem} from "../../../simplelist/Simplelist";
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

    @ViewChild(SimpleList)
    simpleList:SimpleList;

    private unsub: Function;
    private selectedAdnetCustomerId: string;
    private rates: List<AdnetRateModel> = List<AdnetRateModel>();
    private filteredRates: List<AdnetRateModel> = List<AdnetRateModel>();

    private onSelection() {
        if (!this.filteredRates)
            return;
        var selected:{} = this.simpleList.getSelected();
        // var accountType = this.appStore.getState().appdb.get('accountType');
        _.forEach(selected, (simpleItem:ISimpleListItem)=> {
            if (simpleItem.selected) {
                var adnetRateModel:AdnetRateModel = simpleItem.item;
                console.log(adnetRateModel.rateMap());
                return;
            }
        })
    }

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
    }

    private ngOnDestroy() {
        this.unsub();
    }
}