import {Component, Input, ChangeDetectionStrategy, ViewChild} from "@angular/core";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {SimpleGridTable} from "../../../simplegrid/SimpleGridTable";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {List} from 'immutable';
import {ISimpleListItem} from "../../../simplelist/Simplelist";
import * as _ from 'lodash';

@Component({
    selector: 'AdnetConfigTargetStations',
    changeDetection: ChangeDetectionStrategy.OnPush,
    moduleId: __moduleName,
    templateUrl: 'AdnetConfigTargetStations.html',
    styles: [`.row{padding: 15px;}`]
})
export class AdnetConfigTargetStations {
    constructor(private appStore: AppStore, private adnetAction: AdnetActions) {
    }

    ngOnInit() {
        this.adTargets = this.appStore.getState().adnet.getIn(['targets']) || {};
        this.unsub = this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
            this.adTargets = i_adTargets;
            this.render();
        }, 'adnet.targets');
        this.render();
    }

    @ViewChild(SimpleGridTable)
    simpleGridTable: SimpleGridTable

    @Input()
    set adnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.customerModel = i_adnetCustomerModel;
    }

    private onSelection(items:Array<any>) {
        _.forEach(items, (simpleItem: ISimpleListItem)=> {
            if (simpleItem.selected) {
                this.selectedAdnetTargetModel = simpleItem.item;
                return;
            }
        })
    }

    public sort: {field: string, desc: boolean} = {field: null, desc: false};
    private customerModel: AdnetCustomerModel;
    private selectedAdnetTargetModel:AdnetTargetModel;
    private adTargets: List<AdnetTargetModel>;
    private adTargetsFiltered: List<AdnetTargetModel> = List<AdnetTargetModel>();
    private unsub: Function;

    private render() {
        if (!this.adTargets)
            return;
        this.adTargetsFiltered = List<AdnetTargetModel>();
        this.adTargets.forEach((i_adTarget: AdnetTargetModel)=> {
            if (i_adTarget.getCustomerId() == this.customerModel.customerId() && i_adTarget.getTargetType() == 0) {
                this.adTargetsFiltered = this.adTargetsFiltered.push(i_adTarget);
            }
        })
    }

    private getContent(item: AdnetTargetModel) {
        return item.getName();
    }

    private updateSore() {
        setTimeout(()=> {
            //this.appStore.dispatch(this.adnetAction.saveCustomerInfo(Lib.CleanCharForXml(this.contGroup.value), this.customerModel.customerId()))
        }, 1)
    }

    ngOnDestroy() {
        this.unsub();
    }
}