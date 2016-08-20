import {Component, ChangeDetectionStrategy, ViewChild, Input, ChangeDetectorRef} from "@angular/core";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {List} from "immutable";
import {ISimpleListItem, SimpleList} from "../../../simplelist/Simplelist";
import * as _ from "lodash";

@Component({
    selector: 'AdnetConfigTargetStations',
    changeDetection: ChangeDetectionStrategy.OnPush,
    moduleId: __moduleName,
    templateUrl: 'AdnetConfigTargetStations.html',
    styles: [`.row{padding: 15px;}`]
})
export class AdnetConfigTargetStations {
    constructor(private appStore: AppStore, private adnetAction: AdnetActions, private cd:ChangeDetectorRef) {
    }

    ngOnInit() {
        this.adTargets = this.appStore.getState().adnet.getIn(['targets']) || {};
        this.unsub = this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
            this.adTargets = i_adTargets;
            this.render();
        }, 'adnet.targets');
        this.render();
    }

    @ViewChild(SimpleList)
    simpleList: SimpleList

    @Input()
    set adnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.customerModel = i_adnetCustomerModel;
        this.resetSelection();
    }

    private resetSelection(){
        if (this.customerModel)
            this.render();
        if (this.simpleList)
            this.simpleList.deselect();
    }

    private onSelection(items: Array<any>) {
        _.forEach(items, (simpleItem: ISimpleListItem)=> {
            if (simpleItem.selected) {
                this.selectedAdnetTargetModel = simpleItem.item;
                return;
            }
        })
    }

    public selectedAdnetTargetModel: AdnetTargetModel;
    private customerModel: AdnetCustomerModel;
    private adTargets: List<AdnetTargetModel>;
    private adTargetsFiltered: List<AdnetTargetModel> = List<AdnetTargetModel>();
    private unsub: Function;

    private render() {
        if (!this.adTargets)
            return;
        this.adTargetsFiltered = List<AdnetTargetModel>();
        this.adTargets.forEach((i_adTarget: AdnetTargetModel)=> {
            // if (i_adTarget.getCustomerId() == this.customerModel.customerId() && i_adTarget.getTargetType() == 0) {
            if (i_adTarget.getCustomerId() == this.customerModel.customerId()) {
                this.adTargetsFiltered = this.adTargetsFiltered.push(i_adTarget);
            }
        })
        this.cd.markForCheck();
    }

    private getContent(item: AdnetTargetModel) {
        return item.getName();
    }

    ngOnDestroy() {
        this.unsub();
    }
}