import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ViewChild
} from "@angular/core";
import {Compbaser} from "../../../compbaser/Compbaser";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {List} from "immutable";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {Lib} from "../../../../Lib";
import {SimpleGridTable} from "../../../simplegridmodule/SimpleGridTable";

interface ISummaryReport {
    absolutMonth:number;
    avgHourlyRate:number;
    avgScreenArea:number;
    currentDebit:number;
    prevDebit:number
    totalCount:number;
    totalDuration:number
}

// export as csv: http://jsfiddle.net/nkm2b/222/
// https://github.com/zemirco/json2csv

@Component({
    selector: 'AdnetReports',
    template: `<small class="debug">{{me}}</small>
              <button (click)="onReport()" class="btn btn-circle">export</button>
              
              <simpleGridTable>
                <thead>
                <tr>
                    <th sortableHeader="absoluteDate" [sort]="sort">mm/yy</th>
                    <th sortableHeader="totalCount" [sort]="sort">count</th>
                    <th sortableHeader="totalDuration" [sort]="sort">duration</th>
                    <th sortableHeader="avgHourlyRate" [sort]="sort">hourly</th>
                    <th sortableHeader="avgScreenArea" [sort]="sort">size</th>
                    <th sortableHeader="prevDebit" [sort]="sort">prev</th>
                    <th sortableHeader="currentDebit" [sort]="sort">debit</th>
                    <th sortableHeader="balance" [sort]="sort">balance</th>
                </tr>
                </thead>
                <tbody>
                <!--<tr class="simpleGridRecord" (onClicked)="onContentSelect(item)" simpleGridRecord *ngFor="let item of packagesFiltered | OrderBy:sort.field:sort.desc; let index=index" [item]="item" [index]="index">-->
                <tr class="simpleGridRecord" simpleGridRecord *ngFor="let item of summerReports | OrderBy:sort.field:sort.desc; let index=index" [item]="item" [index]="index">
                    <td class="width-md" simpleGridData [processField]="processField('absoluteDate')" [item]="item"></td>
                    <td class="width-md" simpleGridData [processField]="processField('totalCount')" [item]="item"></td>
                    <td class="width-md" simpleGridData [processField]="processField('totalDuration')" [item]="item"></td>
                    <td class="width-md" simpleGridData [processField]="processField('avgHourlyRate')" [item]="item"></td>
                    <td class="width-md" simpleGridData [processField]="processField('avgScreenArea')" [item]="item"></td>
                    <td class="width-md" simpleGridData [processField]="processField('prevDebit')" [item]="item"></td>
                    <td class="width-md" simpleGridData [processField]="processField('currentDebit')" [item]="item"></td>
                    <td class="width-md" simpleGridData [processField]="processField('balance')" [item]="item"></td>
                    <!--<td class="width-md" simpleGridData [processField]="processField('getName')" [item]="item"></td>-->
                    <!--<td class="width-md" simpleGridData [processField]="getCustomerName" [item]="item"></td>-->
                    <!--<td class="width-md" simpleGridData [processField]="processField('playModeName')" [item]="item"></td>-->
                    <!--<td class="width-md" simpleGridData [processField]="processField('channel')" [item]="item"></td>-->
                    <!--<td class="width-md" simpleGridData [processField]="processField('startDate')" [item]="item"></td>-->
                    <!--<td class="width-md" simpleGridData [processField]="processField('endDate')" [item]="item"></td>-->
                    <!--<td class="width-md" simpleGridData [processField]="processField('hourStart')" [item]="item"></td>-->
                    <!--<td class="width-md" simpleGridData [processField]="processField('hourEnd')" [item]="item"></td>-->
                    <!--<td class="width-lr" simpleGridDataChecks (changed)="setAccessMask($event)" [item]="item" [checkboxes]="getAccessMask(item)"></td>-->
                </tr>
                </tbody>
            </simpleGridTable>
            
               `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    moduleId: __moduleName
})


export class AdnetReports extends Compbaser {

    constructor(private adnetAction: AdnetActions, private appStore: AppStore) {
        super();
    }

    @Input()
    set setPairOutgoing(i_setPairOutgoing: boolean) {
        this.pairOutgoing = i_setPairOutgoing;
        this.aggregateReports();
    }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        this.aggregateReports();
    }

    @Input()
    set setAdnetPairModels(i_adnetPairModels: List<AdnetPairModel>) {
        // this.simpleGridTable.deselect();
        this.adnetPairModels = i_adnetPairModels;
        if (this.adnetPairModels)
            this.reportIncludeAll = this.adnetPairModels.size < 2 ? false : true;
        this.aggregateReports();
    }

    @Input()
    set setAdnetTargetModel(i_adnetTargetModel: AdnetTargetModel) {
        // this.simpleGridTable.deselect();
        this.adnetTargetModel = i_adnetTargetModel;
        // if (!this.adnetTargetModel)
        //     return;
        // this.aggregateReports();
    }

    @ViewChild(SimpleGridTable)
    simpleGridTable:SimpleGridTable;

    public sort: {field: string, desc: boolean} = {
        field: null,
        desc: false
    };

    private adnetCustomerModel: AdnetCustomerModel;
    private adnetPairModels: List<AdnetPairModel>;
    private reportIncludeAll: boolean;

    private summerReports: Array<ISummaryReport> = [];
    // private packages: List<AdnetPackageModel>
    private adnetTargetModel: AdnetTargetModel;
    // private packagesFiltered: List<AdnetPackageModel>
    private pairOutgoing: boolean

    private processField(i_field: string) {
        return (i_summaryReport: ISummaryReport):any => {
            switch (i_field) {
                case 'absoluteDate': {
                    var v = Lib.DateFromAbsolute(i_summaryReport.absolutMonth);
                    return v.month + '/' + v.year;
                }
                case 'totalDuration': {
                    return (new Date(i_summaryReport.totalDuration * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
                }
                case 'avgHourlyRate': {
                    return StringJS(i_summaryReport.avgHourlyRate).toCurrency('us');
                }
                case 'avgScreenArea': {
                    return StringJS(i_summaryReport.avgScreenArea * 100).toFloat(2) + '%';
                }
                case 'prevDebit': {
                    return StringJS(i_summaryReport.prevDebit * 100).toCurrency();
                }
                case 'currentDebit': {
                    return StringJS(i_summaryReport.currentDebit).toCurrency();
                }
                case 'balance': {
                    var total = (i_summaryReport.currentDebit) - (i_summaryReport.prevDebit);
                    return StringJS(total).toCurrency();
                }
                default: {
                    return i_summaryReport[i_field];
                }
            }
        }
    }

    
    private onReport() {
        this.appStore.dispatch(this.adnetAction.reportsAdnet(this.adnetCustomerModel.getId()));
    }
    
    private aggregateReports() {
        if (!this.adnetPairModels)
            return;
        this.summerReports = [];
        this.simpleGridTable.deselect();
        this.adnetPairModels.forEach((i_adnetPairModel: AdnetPairModel) => {
            var summeryReports:Array<any> = i_adnetPairModel.getReports();
            if (!summeryReports)
                return;
            summeryReports.forEach((i_data) =>{
                this.summerReports.push(i_data.Value)
            })
        })
    }

    ngOnInit() {
    }

    destroy() {
    }
}