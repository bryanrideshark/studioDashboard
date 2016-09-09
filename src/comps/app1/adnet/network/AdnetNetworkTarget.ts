import {Component, ChangeDetectionStrategy, Input, ViewChild} from "@angular/core";
import {Lib} from "../../../../Lib";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {List} from 'immutable';
import {SimpleGridTable} from "../../../simplegrid/SimpleGridTable";

@Component({
    selector: 'AdnetNetworkTarget',
    changeDetection: ChangeDetectionStrategy.OnPush,
    moduleId: __moduleName,
    template: `
            <small>targets</small>
            <div>
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
                    <tr class="simpleGridRecord" simpleGridRecord
                        *ngFor="let item of adnetPackageModels | OrderBy:sort.field:sort.desc; let index=index" [item]="item"
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
    constructor() {
        this.me = Lib.GetCompSelector(this.constructor)
    }

    @Input()
    set setAdnetTargetModels(i_adnetTargetModels: List<AdnetTargetModel>) {
        this.adnetPackageModels = i_adnetTargetModels;
        this.simpleGridTable.deselect();
    }

    @ViewChild(SimpleGridTable)
    simpleGridTable:SimpleGridTable;

    protected adnetPackageModels: List<AdnetTargetModel>
    public sort:{field:string, desc:boolean} = {field: null, desc: false};
    private me: string;

    private processAdnetPackageField(i_function: string) {
        return (i_adnetTargetModel: AdnetTargetModel) => {
            return i_adnetTargetModel[i_function]();
        }
    }




}



