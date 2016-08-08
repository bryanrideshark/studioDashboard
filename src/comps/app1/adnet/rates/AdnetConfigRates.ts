import {Component, ChangeDetectionStrategy, Input, ViewChild, ElementRef} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import * as _ from 'lodash';
import {SimpleList, ISimpleListItem} from "../../../simplelist/Simplelist";
import {AdnetRateModel} from "../../../../adnet/AdnetRateModel";
import {RatesTable} from "./RatesTable/RatesTable";
import {AdnetActions} from "../../../../adnet/AdnetActions";

@Component({
    selector: 'AdnetConfigRates',
    moduleId: __moduleName,
    directives: [SimpleList, RatesTable],
    templateUrl: 'AdnetConfigRates.html'
})

export class AdnetConfigRates {
    constructor(private appStore: AppStore, private adnetAction: AdnetActions) {
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
    simpleList: SimpleList;

    private unsub: Function;
    private selectedAdnetCustomerId: string;
    private selectedAdnetRateModel: AdnetRateModel;
    private rates: List<AdnetRateModel> = List<AdnetRateModel>();
    private filteredRates: List<AdnetRateModel> = List<AdnetRateModel>();

    private onSelection() {
        if (!this.filteredRates)
            return;
        var selected: {} = this.simpleList.getSelected();
        _.forEach(selected, (simpleItem: ISimpleListItem)=> {
            if (simpleItem.selected) {
                this.selectedAdnetRateModel = simpleItem.item;
                return;
            }
        })
    }

    private onRateChange(event) {
        this.appStore.dispatch(this.adnetAction.updAdnetRateTable(event));
    }

    private onRateRenamed(event) {
        var adnetRateModel: AdnetRateModel = event.item;
        this.appStore.dispatch(this.adnetAction.renameAdnetRateTable(adnetRateModel.rateId(), event.value));
    }

    private updFilteredRates() {
        if (this.rates && this.selectedAdnetCustomerId) {
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

