import {Component, ChangeDetectionStrategy, Input, ViewChild, ChangeDetectorRef} from "@angular/core";
import {Compbaser} from "../../../compbaser/Compbaser";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {List} from "immutable";
// import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {AdnetActions, ReportEnum} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {Lib} from "../../../../Lib";
import {SimpleGridTable} from "../../../simplegridmodule/SimpleGridTable";
import {SelectItem} from "primeng/primeng";
import * as _ from "lodash";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {AdnetReportModel} from "../../../../adnet/AdnetReportModel";
//import AdnetReportsTemplate from './AdnetReports.html!text'; /*prod*/

// export as csv: http://jsfiddle.net/nkm2b/222/
// https://github.com/zemirco/json2csv

@Component({
    //	template: AdnetReportsTemplate, /*prod*/
    selector: 'AdnetReports',
    templateUrl: './AdnetReports.html', /*dev*/
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

    private ReportEnum = ReportEnum;

    constructor(private adnetAction: AdnetActions, private appStore: AppStore, private cd: ChangeDetectorRef) {
        super();
        this.renderReportSelectionMenu();

        this.cancelOnDestroy(
            this.appStore.sub((i_adnetReportModels: List<AdnetReportModel>) => {
                this.switchView = 'SHOW_REPORT';
                if (i_adnetReportModels.size == 0)
                    return this.cd.markForCheck();
                this.switchViewReportReceived = i_adnetReportModels.first().getReportEnum();
                this.resultReports = i_adnetReportModels;
                this.cd.markForCheck();
            }, 'adnet.reports')
        )
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
        this.selectedReportName = '';
        this.adnetPairModels = i_adnetPairModels;
        if (!this.adnetPairModels)
            return;
        this.allPairsSelected = this.adnetPairModels.size < 2 ? false : true;
        this.aggregateReports();
        this.renderReportSelectionMenu();
        this.goBackToReportSelection();
    }

    @ViewChild('simpleGridReportSelector')
    simpleGridReportSelector: SimpleGridTable;

    @ViewChild('simpleGridReportResults')
    simpleGridReportResults: SimpleGridTable;

    @ViewChild('gridReportDestination')
    gridReportDestination: SimpleGridTable;

    public stringJSPipeArgs = {
        humanize: []
    }
    public sort: {field: string, desc: boolean} = {
        field: null,
        desc: false
    };

    private adnetCustomerModel: AdnetCustomerModel;
    private adnetPairModels: List<AdnetPairModel>;
    private allPairsSelected: boolean;
    private switchViewReportReceived: number;
    private reportDisabled: boolean = true;
    private reportTypes: SelectItem[];
    private selectedReportName: string;
    private selectedReportNameLong: string = '';
    private absolutMonth: number;
    private selectedDate: string;
    private selectedCustomer: string;
    private summaryReports: List<AdnetReportModel>;
    private resultReports: List<AdnetReportModel>;
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

    private onReportTypeClicked(event) {
        if (_.isNull(this.simpleGridReportSelector.getSelected()) || _.isEmpty(this.selectedReportName) || StringJS(this.absolutMonth).isBlank()) {
            this.reportDisabled = true;
        } else {
            this.reportDisabled = false;
        }
    }

    private onReportGridItemSelected(i_adnetReportModel: AdnetReportModel) {
        this.setSelectedDate(i_adnetReportModel.getAbsolutMonth());
        var selectedSimpleGrid: SimpleGridTable = this.simpleGridReportResults ? this.simpleGridReportResults : this.simpleGridReportSelector;
        if (_.isNull(selectedSimpleGrid.getSelected()) || _.isEmpty(this.selectedReportName)) {
            this.reportDisabled = true;
        } else {
            this.reportDisabled = false;
        }
    }

    private processField(i_field: string, fromAdnetAction: boolean = false) {
        return (i_item: AdnetReportModel): any => {
            if (fromAdnetAction) {
                return i_item[i_field](this.adnetAction);
            } else {
                return i_item[i_field]();
            }
        }
    }

    private setSelectedDate(i_value) {
        if (!i_value)
            return;
        this.absolutMonth = i_value;
        var year: any = Math.floor(i_value / 12);
        var month = i_value % 12;
        this.selectedDate = `${month}/${year}`
    }

    private goBackToReportSelection() {
        this.reportDisabled = true;
        this.selectedReportName = null;
        this.switchView = 'SELECT_REPORT'
    }

    private onReport(i_details?: string) {
        if (this.reportDisabled)
            return;
        this.switchView = 'LOAD_REPORT';
        var reportEnum, reportName, extraArgs = null;
        var direction = this.pairOutgoing ? 'to' : 'from';
        switch (this.selectedReportName) {
            case 'customers': {
                reportName = 'customersReport';
                reportEnum = ReportEnum.CUSTOMER;
                this.selectedReportNameLong = 'report: customers';
                break;
            }
            case 'targets': {
                if (i_details) {
                    reportName = this.allPairsSelected ? 'customerTargetDetailReport' : 'pairTargetDetailReport';
                    reportEnum = ReportEnum.TARGET_DETAILS;
                    this.selectedReportNameLong = 'report: target details';
                    var targetId = this.simpleGridReportResults.getSelected().item.getTargetId();
                    extraArgs = `&targetId=${targetId}`;
                    if (reportName == 'pairTargetDetailReport')
                        extraArgs += `&pairId=${this.adnetPairModels.first().getId()}`;
                } else {
                    reportName = this.allPairsSelected ? 'customerTargetsReport' : 'pairTargetsReport';
                    reportEnum = ReportEnum.TARGET;
                    this.selectedReportNameLong = 'report: targets';
                    extraArgs = `&pairId=${this.adnetPairModels.first().getId()}`;
                }
                break;
            }
            case 'content': {
                reportName = this.allPairsSelected ? 'customerContentReport' : 'pairContentReport';
                reportEnum = ReportEnum.CONTENT;
                this.selectedReportNameLong = 'report: contents';
                extraArgs = `&pairId=${this.adnetPairModels.first().getId()}`;
                break;
            }
            case 'hourly': {
                if (i_details) {
                    reportName = this.allPairsSelected ? 'customerHourlyDetailsReport' : 'pairHourlyDetailsReport';
                    reportEnum = ReportEnum.HOURLY_DETAILS;
                    this.selectedReportNameLong = 'report: target details';
                    var targetId = this.simpleGridReportResults.getSelected().item.getTargetId();
                    extraArgs = `&targetId=${targetId}`;
                    if (reportName == 'pairTargetDetailReport')
                        extraArgs += `&pairId=${this.adnetPairModels.first().getId()}`;
                } else {
                    reportName = this.allPairsSelected ? 'customerHourlyReport' : 'pairHourlyReport';
                    reportEnum = ReportEnum.HOURLY;
                    this.selectedReportNameLong = 'report: targets';
                    extraArgs = `&pairId=${this.adnetPairModels.first().getId()}`;
                }
                break;
            }
        }
        this.appStore.dispatch(this.adnetAction.reportsAdnet(this.adnetCustomerModel.getId(), reportName, reportEnum, direction, this.absolutMonth, extraArgs));
    }

    private aggregateReports() {
        if (!this.adnetPairModels)
            return;
        this.summaryReports = List<AdnetReportModel>();
        if (this.simpleGridReportSelector)
            this.simpleGridReportSelector.deselect();
        this.adnetPairModels.forEach((i_adnetPairModel: AdnetPairModel) => {
            var summeryReports: Array<any> = i_adnetPairModel.getReports();
            if (!summeryReports)
                return;
            summeryReports.forEach((reportData) => {
                var adnetReportModel: AdnetReportModel = new AdnetReportModel(reportData)
                var v = Lib.DateFromAbsolute(adnetReportModel.getAbsolutMonth());
                adnetReportModel = adnetReportModel.setField('absoluteDate', v.month + '/' + v.year);
                this.summaryReports = this.summaryReports.push(adnetReportModel);
            })
        })
    }

    ngOnInit() {
    }

    destroy() {
    }
}


// private renderReportSelection(i_select:'a'|'b'|'c'){
//     this.reportTypes = [];
//     switch (i_select){
//         case 'a': {
//             this.reportTypes.push({
//                 label: 'customers',
//                 value: 'customers'
//             });
//             this.reportTypes.push({
//                 label: 'targets',
//                 value: 'targets'
//             });
//             this.reportTypes.push({
//                 label: 'content',
//                 value: 'content'
//             });
//             this.reportTypes.push({
//                 label: 'hourly',
//                 value: 'hourly'
//             });
//             break
//         }
//         case 'b': {
//             break
//         }
//         case 'c': {
//             break
//         }
//     }
//
// }
