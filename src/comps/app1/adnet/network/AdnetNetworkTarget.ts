import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    Output,
    EventEmitter
} from "@angular/core";
import {Lib} from "../../../../Lib";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {List} from 'immutable';
import {
    IAdNetworkPropSelectedEvent,
    AdnetNetworkPropSelector
} from "./AdnetNetwork";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import {SimpleGridTable} from "../../../simplegridmodule/SimpleGridTable";
import {ISimpleGridEdit} from "../../../simplegridmodule/SimpleGridModule";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {AppStore} from "angular2-redux-util";

@Component({
    selector: 'AdnetNetworkTarget',
    changeDetection: ChangeDetectionStrategy.OnPush,
    moduleId: __moduleName,
    template: `
        <small class="release">targets</small>
        <small class="debug">{{me}}</small>
        <div [hidden]="!adnetPackageModels && !adnetPairModels">
            <simpleGridTable>
                <thead>
                <tr>
                    <th [sortableHeader]="['Value','customerId']" [sort]="sort">customer</th>
                    <th [sortableHeader]="['Value','type']" [sort]="sort">type</th>
                    <th [sortableHeader]="['Value','label']" [sort]="sort">name</th>
                    <th [sortableHeader]="['Value','keys']" [sort]="sort">keys</th>
                </tr>
                </thead>
                <tbody>
                <tr class="simpleGridRecord" simpleGridRecord (onClicked)="onGridSelected($event)"
                    *ngFor="let item of adnetTargetModels | OrderBy:sort.field:sort.desc; let index=index" [item]="item"
                    [index]="index">
                    <td style="width: 14%" simpleGridData [processField]="processAdnetPackageField('getCustomerId')"
                        [item]="item"></td>
                    <td style="width: 14%" simpleGridData [processField]="processAdnetPackageField('getTargetTypeName')"
                        [item]="item"></td>
                    <td style="width: 14%" simpleGridData [processField]="processAdnetPackageField('getName')"
                        [item]="item"></td>
                    <td style="width: 14%" simpleGridData [processField]="processAdnetPackageField('getKeys')"
                        [item]="item"></td>
                </tr>
                </tbody>
            </simpleGridTable>
        </div>
    `
})

export class AdnetNetworkTarget {
    constructor(private appStore:AppStore) {
        this['me'] = Lib.GetCompSelector(this.constructor)
    }

    @Input()
    set setAdnetTargetModels(i_adnetTargetModels: List<AdnetTargetModel>) {
        this.adnetTargetModels = i_adnetTargetModels;
    }

    @Input()
    set setAdnetPackageModels(i_adnetPackageModels: AdnetPackageModel) {
        this.adnetPackageModels = i_adnetPackageModels;
        if (!this.adnetPackageModels)
            return;
    }

    @Input()
    set setAdnetPairModels(i_adnetPairModels: List<AdnetPairModel>) {
        this.adnetPairModels = i_adnetPairModels;
        if (!this.adnetPairModels)
            return;
        var customerIds: Array<number> = [];
        this.adnetPairModels.forEach((i_adnetPairModels:AdnetPairModel)=>{
            customerIds.push(i_adnetPairModels.getToCustomerId());
        })
        var targets: List<AdnetTargetModel> = this.appStore.getState().adnet.getIn(['targets']) || {};
        this.adnetTargetModels = targets.filter((i_adnetTargetModel: AdnetTargetModel) => {
            return (customerIds.indexOf(i_adnetTargetModel.getCustomerId()) > -1)
        }) as List<AdnetTargetModel>;
        console.log(this.adnetTargetModels);

    }

    @Output() onAdnetTargetSelected: EventEmitter<AdnetTargetModel> = new EventEmitter<AdnetTargetModel>();

    @Output() onPropSelected: EventEmitter<IAdNetworkPropSelectedEvent> = new EventEmitter<IAdNetworkPropSelectedEvent>();

    @ViewChild(SimpleGridTable) simpleGridTable: SimpleGridTable;

    private adnetTargetModels: List<AdnetTargetModel>
    private adnetPairModels: List<AdnetPairModel>;
    private adnetPackageModels: AdnetPackageModel;

    public sort: {field: string, desc: boolean} = {
        field: null,
        desc: false
    };

    private processAdnetPackageField(i_function: string) {
        return (i_adnetTargetModel: AdnetTargetModel) => {
            return i_adnetTargetModel[i_function]();
        }
    }

    private onGridSelected(simpleGridEdit: ISimpleGridEdit) {
        // var trg = simpleGridEdit.item as AdnetTargetModel;
        // console.log(trg.getCustomerId());
        this.onAdnetTargetSelected.emit(simpleGridEdit.item as AdnetTargetModel);
        this.onPropSelected.emit({selected: AdnetNetworkPropSelector.TARGET})
    }
}






