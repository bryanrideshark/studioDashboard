import {Component} from "@angular/core";
import {Compbaser} from "../../../compbaser/Compbaser";
import {AppStore} from "angular2-redux-util";
import {SelectItem} from "primeng/components/common/api";
import {List} from "immutable";
import {AdnetReportModel} from "../../../../adnet/AdnetReportModel";

@Component({
    template: `<small class="debug">{{me}}</small>
<div class="row">
    <div class="col-xs-2">
        <p-selectButton [options]="displaySelection" [(ngModel)]="selectedReportName" (onChange)="onSelectedPeriod($event)"></p-selectButton>
        <br/><br/>
        <p>Previous balance: 0.00</p>
        <p>payments: 0.00</p>
        <p>ad charges: 0.00</p>
        <p>transfers: 0.00</p>
        <br/>
        <hr class="push-left" style="width: 160px"/>        
        <h3>balance: 0.00</h3>
    </div>
    <div class="col-xs-10">
        <simpleGridTable>
            <thead>
            <tr>
                <th sortableHeader="name" [sort]="sort">customer</th>
                <th sortableHeader="businessId" [sort]="sort">incoming</th>
                <th sortableHeader="businessId" [sort]="sort">outgoing</th>
                <th sortableHeader="businessId" [sort]="sort">ad charges</th>
                <th sortableHeader="businessId" [sort]="sort">transfers</th>
            </tr>
            </thead>
            <tbody>
            <tr class="simpleGridRecord" simpleGridRecord *ngFor="let item of billingReport | OrderBy:sort.field:sort.desc; let index=index" [item]="item" [index]="index">
                <td style="width: 20%" simpleGridData (labelEdited)="onLabelEdited($event,'name')" editable="true" field="name" [item]="item"></td>
                <td style="width: 8%" simpleGridData field="businessId" [item]="item"></td>
                <td style="width: 20%" simpleGridDataChecks (changed)="setAccessMask($event)" [item]="item" [checkboxes]="getAccessMask(item)"></td>
                <td style="width: 12%" simpleGridData field="privilegeId" [item]="item"></td>
                <td style="width: 40%" simpleGridDataDropdown [testSelection]="selectedPriveleges()" (changed)="setPriveleges($event)" field="name" [item]="item" [dropdown]="m_priveleges"></td>
            </tr>
            </tbody>
        </simpleGridTable>
    </div>
</div>
           
           `,
    styles: [`
hr {
    border: none;
    height: 1px;
    margin: 0;
    padding: 0;
    color: #333; /* old IE */
    background-color: #333; /* Modern Browsers */
}
`],
    selector: 'AdnetBilling',
    moduleId: __moduleName
})


export class AdnetBilling extends Compbaser {

    constructor(private appStore: AppStore) {
        super();
    }

    ngOnInit() {
        // this.cancelOnDestroy(
        //     this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
        //     }, 'adnet.targets')
        // );
        this.displaySelection.push({
            label: 'Absolute',
            value: 'Absolute'
        },{
            label: 'This month',
            value: 'This month'
        });
    }

    private billingReport: List<AdnetReportModel> = List<AdnetReportModel>();
    private displaySelection: SelectItem[] = [];

    public sort: {field: string, desc: boolean} = {
        field: null,
        desc: false
    };

    private onSelectedPeriod() {

    }

    destroy() {
    }
}