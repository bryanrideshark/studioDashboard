import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ChangeDetectorRef
} from "@angular/core";
import {Compbaser} from "../../../compbaser/Compbaser";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {List} from "immutable";
// import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {Lib} from "../../../../Lib";
import {SimpleGridTable} from "../../../simplegridmodule/SimpleGridTable";
import {SelectItem} from 'primeng/primeng';
import * as _ from 'lodash';

interface ISummaryReport {
    absolutMonth: number;
    avgHourlyRate: number;
    avgScreenArea: number;
    currentDebit: number;
    prevDebit: number
    totalCount: number;
    totalDuration: number
}

// export as csv: http://jsfiddle.net/nkm2b/222/
// https://github.com/zemirco/json2csv

@Component({
    selector: 'AdnetReports',
    template: `           
            <div [ngSwitch]="switchView">
                <div *ngSwitchCase="'SELECT_REPORT'" style="padding: 10px">
                    <small class="debug">{{me}}</small>
                    <button (click)="onReport()" [ngClass]="{disabled: reportDisabled}" class="btn btn-circle btn-primary pull-right">run report</button>
                    <h4>Select report</h4>
                    <p-selectButton [options]="reportTypes" [(ngModel)]="selectedReportName" (onChange)="onReportSelected($event)"></p-selectButton>
                    <hr/>
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
                        <tr class="simpleGridRecord" simpleGridRecord (onClicked)="onReportSelected(item)" *ngFor="let item of summerReports | OrderBy:sort.field:sort.desc; let index=index" [item]="item"
                            [index]="index">
                            <td class="width-md" simpleGridData [processField]="processField('absoluteDate')" [item]="item"></td>
                            <td class="width-md" simpleGridData [processField]="processField('totalCount')" [item]="item"></td>
                            <td class="width-md" simpleGridData [processField]="processField('totalDuration')" [item]="item"></td>
                            <td class="width-md" simpleGridData [processField]="processField('avgHourlyRate')" [item]="item"></td>
                            <td class="width-md" simpleGridData [processField]="processField('avgScreenArea')" [item]="item"></td>
                            <td class="width-md" simpleGridData [processField]="processField('prevDebit')" [item]="item"></td>
                            <td class="width-md" simpleGridData [processField]="processField('currentDebit')" [item]="item"></td>
                            <td class="width-md" simpleGridData [processField]="processField('balance')" [item]="item"></td>
                        </tr>
                        </tbody>
                    </simpleGridTable>
                </div>
                <div *ngSwitchCase="'SHOW_REPORT'" style="padding: 10px">
                    <button (click)="goBackToReportSelection()" class="btn btn-primary pull-right">Back</button>
                </div>
                <div *ngSwitchCase="'LOAD_REPORT'" style="padding: 10px">
                    <Loading  [size]="75" [style]="{'margin-top': '50px'}">
                    </Loading>
                </div>
            </div>
            
            `,
    styles: [`
        .disabled {
            opacity: 0.2;
            cursor: default;
        }
    `],
    changeDetection: ChangeDetectionStrategy.Default,
    moduleId: __moduleName
})


export class AdnetReports extends Compbaser {

    constructor(private adnetAction: AdnetActions, private appStore: AppStore, private cd: ChangeDetectorRef) {
        super();
        this.reportTypes = [];
        this.reportTypes.push({
            label: 'customers',
            value: 'customers'
        });
        this.reportTypes.push({
            label: 'targets',
            value: 'targets'
        });
        this.reportTypes.push({
            label: 'content',
            value: 'content'
        });
        this.reportTypes.push({
            label: 'hourly',
            value: 'hourly'
        });
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
        this.reportDisabled = true;
        this.adnetPairModels = i_adnetPairModels;
        if (!this.adnetPairModels)
            return;
        this.allPairsSelected = this.adnetPairModels.size < 2 ? false : true;
        this.aggregateReports();
        this.renderReportSelectionMenu();
    }

    @ViewChild(SimpleGridTable)
    simpleGridTable: SimpleGridTable;

    public sort: {field: string, desc: boolean} = {
        field: null,
        desc: false
    };

    private adnetCustomerModel: AdnetCustomerModel;
    private adnetPairModels: List<AdnetPairModel>;
    private allPairsSelected: boolean;
    private reportDisabled: boolean = true;
    private reportTypes: SelectItem[];
    private selectedReportName: string;
    private absolutMonth:number;
    private summerReports: Array<ISummaryReport> = [];
    public switchView: string = 'SELECT_REPORT';
    private pairOutgoing: boolean

    private renderReportSelectionMenu() {
        this.reportTypes = [];
        if (this.allPairsSelected) {
            this.reportTypes.push({
                label: 'customers',
                value: 'customers'
            });
        }
        this.reportTypes.push({
            label: 'targets',
            value: 'targets'
        });
        this.reportTypes.push({
            label: 'content',
            value: 'content'
        });
        this.reportTypes.push({
            label: 'hourly',
            value: 'hourly'
        });
    }

    private onReportSelected(event:ISummaryReport) {
        if (!_.isNull(this.simpleGridTable.getSelected()) && !_.isEmpty(this.selectedReportName)) {
            this.reportDisabled = false;
        } else {
            this.reportDisabled = true;
            this.absolutMonth = event.absolutMonth;
        }
    }

    private processField(i_field: string) {
        return (i_summaryReport: ISummaryReport): any => {
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

    private goBackToReportSelection() {
        this.reportDisabled = true;
        this.selectedReportName = null;
        this.switchView = 'SELECT_REPORT'
    }

    private onReport() {
        if (this.reportDisabled)
            return;
        this.switchView = 'LOAD_REPORT';
        var reportCommand;
        var direction = this.pairOutgoing ? 'to' : 'from';
        switch (this.selectedReportName) {
            case 'customers': {
                reportCommand = 'customersReport';
                break;
            }
            case 'targets': {
                reportCommand = this.allPairsSelected ? 'customerTargetsReport' : 'pairTargetsReport';
                break;
            }
            case 'content': {
                reportCommand = this.allPairsSelected ? 'customerContentReport' : 'pairContentReport';
                break;
            }
            case 'hourly': {
                reportCommand = this.allPairsSelected ? 'customerHourlyReport' : 'pairHourlyReport';
                break;
            }
        }
        this.appStore.dispatch(this.adnetAction.reportsAdnet(this.adnetCustomerModel.getId(), reportCommand, direction, this.absolutMonth, (reportData) => {
            this.switchView = 'SHOW_REPORT';
            this.cd.markForCheck();
        }));
    }

    private aggregateReports() {
        if (!this.adnetPairModels)
            return;
        this.summerReports = [];
        if (this.simpleGridTable)
            this.simpleGridTable.deselect();
        this.adnetPairModels.forEach((i_adnetPairModel: AdnetPairModel) => {
            var summeryReports: Array<any> = i_adnetPairModel.getReports();
            if (!summeryReports)
                return;
            summeryReports.forEach((i_data) => {
                this.summerReports.push(i_data.Value)
            })
        })
    }

    ngOnInit() {
    }

    destroy() {
    }
}