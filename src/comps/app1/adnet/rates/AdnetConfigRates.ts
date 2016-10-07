import {Component, ChangeDetectionStrategy, Input, ViewChild, ElementRef} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import * as _ from 'lodash';
import {SimpleList, ISimpleListItem} from "../../../simplelist/Simplelist";
import {AdnetRateModel} from "../../../../adnet/AdnetRateModel";
import {RatesTable} from "./RatesTable/RatesTable";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import AdnetConfigRatesTemplate from './AdnetConfigRates.html!text';
import AdnetConfigRatesStyle from './AdnetConfigRates.css!text';

@Component({
    selector: 'AdnetConfigRates',
    moduleId: __moduleName,
    styles: [AdnetConfigRatesStyle],
    template: AdnetConfigRatesTemplate
})

export class AdnetConfigRates {
    constructor(private appStore: AppStore, private adnetAction: AdnetActions) {
        var i_adnet = this.appStore.getState().adnet;
        this.rates = i_adnet.getIn(['rates']);
        this.unsub = this.appStore.sub((i_rates: List<AdnetRateModel>) => {
            this.rates = i_rates;
            this.updFilteredRates();
        }, 'adnet.rates');
    }

    @Input()
    set adnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.resetSelection();
        this.selectedAdnetCustomerModel = i_adnetCustomerModel
        this.updFilteredRates();
    }

    @ViewChild(SimpleList)
    simpleList: SimpleList;

    private unsub: Function;
    private selectedAdnetCustomerModel: AdnetCustomerModel;
    private selectedAdnetRateModel: AdnetRateModel;
    private rates: List<AdnetRateModel> = List<AdnetRateModel>();
    private filteredRates: List<AdnetRateModel> = List<AdnetRateModel>();

    private resetSelection() {
        this.selectedAdnetRateModel = null;
        if (this.simpleList)
            this.simpleList.deselect();
    }

    private onSelection() {
        if (!this.filteredRates)
            return;
        var selected: {} = this.simpleList.getSelected();
        _.forEach(selected, (simpleItem: ISimpleListItem) => {
            if (simpleItem.selected) {
                this.selectedAdnetRateModel = simpleItem.item;
                return;
            }
        })
    }

    private onAddRate() {
        this.appStore.dispatch(this.adnetAction.addAdnetRateTable(this.selectedAdnetCustomerModel.getId()));
    }

    private onRemoveRate() {
        if (!this.selectedAdnetRateModel)
            return;
        this.appStore.dispatch(this.adnetAction.removeAdnetRateTable(this.selectedAdnetRateModel.getId(), this.selectedAdnetCustomerModel.getId()));
        this.simpleList.deselect();
        this.selectedAdnetRateModel = null;
    }

    private onRateChange(event) {
        this.appStore.dispatch(this.adnetAction.updAdnetRateTable(event));
    }

    private onRateRenamed(event) {
        var adnetRateModel: AdnetRateModel = event.item;
        this.appStore.dispatch(this.adnetAction.renameAdnetRateTable(adnetRateModel.getId(), event.value));
    }

    private updFilteredRates() {
        if (this.rates && this.selectedAdnetCustomerModel) {
            this.filteredRates = List<AdnetRateModel>();
            this.rates.forEach((i_adnetRateModel: AdnetRateModel) => {
                if (i_adnetRateModel.customerId() == this.selectedAdnetCustomerModel.customerId()) {
                    this.filteredRates = this.filteredRates.push(i_adnetRateModel)
                }
            })
        }
    }

    private getContent(adnetRateModel: AdnetRateModel) {
        return adnetRateModel.getName();
    }

    private ngOnDestroy() {
        this.unsub();
    }
}

