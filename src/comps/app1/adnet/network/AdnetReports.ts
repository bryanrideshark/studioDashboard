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

        this.cancelOnDestroy(
            this.appStore.sub((i_adnetReportModels: List<AdnetReportModel>) => {
                this.switchView = 'SHOW_REPORT';
                if (i_adnetReportModels.size==0)
                    return this.cd.markForCheck();

                this.switchViewReportReceived = i_adnetReportModels.first().getReportEnum();
                this.resultReports = i_adnetReportModels;
                // this.buildReports(reportName, reportData);
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
        var selectedSimpleGrid:SimpleGridTable = this.simpleGridReportResults ? this.simpleGridReportResults : this.simpleGridReportSelector;
        if (_.isNull(selectedSimpleGrid.getSelected()) || _.isEmpty(this.selectedReportName)) {
            this.reportDisabled = true;
        } else {
            this.reportDisabled = false;
        }
    }



    private processField(i_field: string) {
        return (i_item: AdnetReportModel): any => {
            switch (i_field) {
                // case 'absoluteDate': {
                //     var v = Lib.DateFromAbsolute(i_item.getAbsolutMonth());
                //     return v.month + '/' + v.year;
                // }
                case 'totalDuration': {
                    return (new Date(i_item.getTotalDuration() * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
                }
                case 'avgHourlyRate': {
                    return StringJS(i_item.getAvgHourlyRate()).toCurrency('us');
                }
                case 'avgScreenArea': {
                    return StringJS(i_item.getAvgScreenArea() * 100).toFloat(2) + '%';
                }
                case 'prevDebit': {
                    return StringJS(i_item.getPrevDebit() * 100).toCurrency();
                }
                case 'currentDebit': {
                    return StringJS(i_item.getCurrentDebit()).toCurrency();
                }
                case 'balance': {
                    var total = (i_item.getCurrentDebit()) - (i_item.getPrevDebit());
                    return StringJS(total).toCurrency();
                }
                case 'customerId': {
                    return this.adnetAction.getCustomerName(i_item.getCustomerId());
                }
                case 'customerTargetId': {
                    var adnetTargetModel: AdnetTargetModel = this.adnetAction.getTargetModel(i_item.getTargetId())
                    var customerId = adnetTargetModel.getCustomerId();
                    return this.adnetAction.getCustomerName(customerId);
                }
                case 'targetId': {
                    var adnetTargetModel: AdnetTargetModel = this.adnetAction.getTargetModel(i_item.getTargetId())
                    return adnetTargetModel.getName();
                }
                case 'targetType': {
                    var adnetTargetModel: AdnetTargetModel = this.adnetAction.getTargetModel(i_item.getTargetId())
                    return adnetTargetModel.getTargetType();
                }
                case 'totalHourly': {
                    return StringJS(i_item.getTotalPrice() * 3600 / i_item.getDurationSize()).toCurrency();
                }
                case 'totalPrice': {
                    return StringJS(i_item.getTotalPrice() * i_item.getTotalDuration() / i_item.getDurationSize()).toCurrency();
                }
                case 'totalSize': {
                    return StringJS(i_item.getDurationSize() / i_item.getTotalDuration() * 100).toPercent();
                }
                case 'totalPriceSize': {
                    return StringJS(i_item.getTotalPrice()).toCurrency();
                }
                case 'totalCount': {
                    return StringJS(i_item.getTotalCount()).toInt();
                }
                default: {
                    return i_item[i_field]();
                }
            }
        }
    }

    private setSelectedDate(i_value) {
        this.absolutMonth = i_value;
        var year: any = Math.floor(i_value / 12);
        var month = i_value % 12;
        this.selectedDate = `${month}/${year}`
    }

    // private getTargetModel(targetId) {
    //     var customersList: List<AdnetTargetModel> = this.appStore.getState().adnet.getIn(['targets']) || {};
    //     var adnetTargetModel: AdnetTargetModel = customersList.find((adnetTargetModel: AdnetTargetModel) => {
    //         return adnetTargetModel.getId() == targetId;
    //     })
    //     return adnetTargetModel;
    // }
    //
    // private getCustomerName(customerId) {
    //     var customersList: List<AdnetCustomerModel> = this.appStore.getState().adnet.getIn(['customers']) || {};
    //     var adnetCustomerModel: AdnetCustomerModel = customersList.find((adnetCustomerModel: AdnetCustomerModel) => {
    //         return adnetCustomerModel.getId() == customerId;
    //     })
    //     return adnetCustomerModel.getName();
    // }

    private goBackToReportSelection() {
        this.reportDisabled = true;
        this.selectedReportName = null;
        this.switchView = 'SELECT_REPORT'
    }

    private onReport() {
        if (this.reportDisabled)
            return;
        this.switchView = 'LOAD_REPORT';
        var reportEnum, reportName, selectedPairId = -1;
        var direction = this.pairOutgoing ? 'to' : 'from';
        switch (this.selectedReportName) {
            case 'customers': {
                reportName = 'customersReport';
                reportEnum = ReportEnum.CUSTOMER;
                break;
            }
            case 'targets': {
                reportName = this.allPairsSelected ? 'customerTargetsReport' : 'pairTargetsReport';
                reportEnum = ReportEnum.TARGET;
                break;
            }
            case 'content': {
                reportName = this.allPairsSelected ? 'customerContentReport' : 'pairContentReport';
                reportEnum = ReportEnum.CONTENT;
                break;
            }
            case 'hourly': {
                reportName = this.allPairsSelected ? 'customerHourlyReport' : 'pairHourlyReport';
                reportEnum = ReportEnum.HOURLY;
                break;
            }
        }
        if (!this.allPairsSelected)
            selectedPairId = this.adnetPairModels.first().getId();

        this.appStore.dispatch(this.adnetAction.reportsAdnet(this.adnetCustomerModel.getId(), reportName, reportEnum, direction, this.absolutMonth, selectedPairId));
        // , (reportData) => {
        //         this.switchView = 'SHOW_REPORT';
        //         this.switchViewReportReceived = switchViewReportReceived;
        //         this.buildReports(reportName, reportData);
        //         this.cd.markForCheck();
        //     }));
    }

    // private buildReports(reportName, reportData) {
    //     this.resultReports = [];
    //     switch (reportName) {
    //
    //         case 'customersReport': {
    //             reportData.customerStats.forEach((item) => {
    //                 this.resultReports.push(item.Value);
    //             })
    //             break;
    //         }
    //         case 'customerTargetsReport': {
    //             reportData.targetStats.forEach((item) => {
    //                 this.resultReports.push(item.Value);
    //             })
    //             break;
    //         }
    //         case 'customerTargetsDetailsReport': {
    //             break;
    //         }
    //         case 'pairTargetsReport': {
    //             break;
    //         }
    //         case 'customerContentReport': {
    //             break;
    //         }
    //         case 'pairContentReport': {
    //             break;
    //         }
    //         case 'customerHourlyReport': {
    //             break;
    //         }
    //         case 'customerHourlyDetailsReport': {
    //             break;
    //         }
    //         case 'pairHourlyReport': {
    //             break;
    //         }
    //     }
    // }

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
                var adnetReportModel:AdnetReportModel = new AdnetReportModel(reportData)
                var v = Lib.DateFromAbsolute(adnetReportModel.getAbsolutMonth());
                adnetReportModel = adnetReportModel.setField('absoluteDate',v.month + '/' + v.year);
                this.summaryReports = this.summaryReports.push(adnetReportModel);
            })
        })
    }

    ngOnInit() {
    }

    destroy() {
    }
}
