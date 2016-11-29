import {Component, Input, ChangeDetectorRef} from "@angular/core";
import {Compbaser} from "../../../compbaser/Compbaser";
import {AppStore} from "angular2-redux-util";
import {SelectItem} from "primeng/components/common/api";
import {List} from "immutable";
import {AdnetReportModel} from "../../../../adnet/AdnetReportModel";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AdnetPaymentModel} from "../../../../adnet/AdnetPaymentModel";

@Component({
    template: `<small class="debug">{{me}}</small>
<div class="row">
    <div class="col-xs-2">
        <p-selectButton [options]="selectionPeriod" [(ngModel)]="selectedPeriod" (onChange)="onSelectedPeriod($event)"></p-selectButton>
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
        <p-selectButton [options]="selectionReport" [(ngModel)]="selectedReport" (onChange)="onSelectedPeriod($event)"></p-selectButton>
        <simpleGridTable *ngIf="selectedReport=='balance'">
            <thead>
            <tr>
                <th sortableHeader="name" [sort]="sort">customer</th>
                <th sortableHeader="from" [sort]="sort">incoming</th>
                <th sortableHeader="to" [sort]="sort">outgoing</th>
                <th sortableHeader="adCharges" [sort]="sort">ad charges</th>
                <th sortableHeader="transfer" [sort]="sort">transfers</th>
            </tr>
            </thead>
            <tbody>
            <tr class="simpleGridRecord" simpleGridRecord *ngFor="let item of pairsFiltered | OrderBy:sort.field:sort.desc; let index=index" [item]="item" [index]="index">
                <td class="width-md" simpleGridData [processField]="processFieldBalance('name')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldBalance('from')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldBalance('to')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldBalance('adCharges')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldBalance('transfer')" [item]="item"></td>
            </tr>
            </tbody>
        </simpleGridTable>
        
        <simpleGridTable *ngIf="selectedReport=='payments'">
            <thead>
            <tr>
                <th [sortableHeader]="['Value','paymentDate']" [sort]="sort2">yy/mm/dd</th>
                <th [sortableHeader]="['Value','prevCredit']" [sort]="sort2">prev</th>
                <th [sortableHeader]="['Value','credit']" [sort]="sort2">credit</th>
                <th [sortableHeader]="['Value','credit']" [sort]="sort2">total</th>
                <th [sortableHeader]="['Value','transaction']" [sort]="sort2">transaction</th>
                <th [sortableHeader]="['Value','comment']" [sort]="sort2">comment</th>
            </tr>
            </thead>
            <tbody>
            <tr class="simpleGridRecord" simpleGridRecord *ngFor="let item of payments | OrderBy:sort2.field:sort2.desc; let index=index" [item]="item" [index]="index">
                <td class="width-md" simpleGridData [processField]="processFieldPayments('date')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldPayments('prevCredit')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldPayments('credit')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldPayments('total')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldPayments('transactionId')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldPayments('comment')" [item]="item"></td>
            </tr>
            </tbody>
        </simpleGridTable>
        
        <simpleGridTable *ngIf="selectedReport=='transfers'">
            <thead>
            <tr>
                <th [sortableHeader]="['Value','paymentDate']" [sort]="sort3">yy/mm/dd</th>
                <th [sortableHeader]="['Value','paymentDate']" [sort]="sort2">yy/mm/dd</th>
                <th [sortableHeader]="['Value','paymentDate']" [sort]="sort2">yy/mm/dd</th>
                <th [sortableHeader]="['Value','paymentDate']" [sort]="sort2">yy/mm/dd</th>
                <th [sortableHeader]="['Value','paymentDate']" [sort]="sort2">yy/mm/dd</th>
            </tr>
            </thead>
            <tbody>
            <tr class="simpleGridRecord" simpleGridRecord *ngFor="let item of pairsFiltered | OrderBy:sort3.field:sort3.desc; let index=index" [item]="item" [index]="index">
                <td class="width-md" simpleGridData [processField]="processFieldBalance('name')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldBalance('from')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldBalance('to')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldBalance('adCharges')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldBalance('transfer')" [item]="item"></td>
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

    constructor(private appStore: AppStore, private cd: ChangeDetectorRef, private adnetAction: AdnetActions) {
        super();
    }

    ngOnInit() {
        this.pairs = this.appStore.getState().adnet.getIn(['pairs']) || {};
        this.cancelOnDestroy(
            this.appStore.sub((i_pairs: List<AdnetPairModel>) => {
                this.pairs = i_pairs;
                this.filterPairs();
            }, 'adnet.pairs')
        );

        this.payments = this.appStore.getState().adnet.getIn(['payments']) || {};
        this.cancelOnDestroy(
            this.appStore.sub((i_payments: List<AdnetPaymentModel>) => {
                this.payments = i_payments;
            }, 'adnet.payments')
        );

        this.filterPairs();

        this.selectionPeriod.push({
            label: 'absolute',
            value: 'absolute'
        }, {
            label: 'this month',
            value: 'this month'
        });
        this.selectionReport.push({
            label: 'balance',
            value: 'balance'
        }, {
            label: 'payments',
            value: 'payments'
        }, {
            label: 'transfers',
            value: 'transfers'
        })
    }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        if (this.adnetCustomerModel)
            this.adnetCustomerId = this.adnetCustomerModel.customerId();
    }

    private payments: List<AdnetPaymentModel> = List<AdnetPaymentModel>();
    private transactions: List<AdnetPaymentModel> = List<AdnetPaymentModel>();
    private pairsFiltered: List<AdnetPairModel> = List<AdnetPairModel>();
    private adnetCustomerId: number = -1;
    private adnetCustomerModel: AdnetCustomerModel;
    private billingReport: List<AdnetReportModel> = List<AdnetReportModel>();
    private selectionPeriod: SelectItem[] = [];
    private selectionReport: SelectItem[] = [];
    private selectedPeriod = 'absolute';
    private selectedReport = 'balance';
    private pairs: List<AdnetPairModel>

    private filterPairs() {
        if (!this.pairs)
            return;
        var customerMap = {}
        var customer:any = null;
        this.pairsFiltered = List<AdnetPairModel>();
        this.pairs.forEach((i_pair: AdnetPairModel) => {
            if (i_pair.getCustomerId() == this.adnetCustomerId) {
                customer = customerMap[i_pair.toCustomerId];
                if (customer == null) {
                    customer = customerMap[i_pair.toCustomerId] = {};
                    customer.name = this.adnetAction.getCustomerName(i_pair.toCustomerId);
                    customer.transfer = 0;
                    this.pairsFiltered = this.pairsFiltered.push(customer);
                }
                customer.to = -i_pair.getTotalDebit();
                customer.transfer -= i_pair.getTotalTransfer();
            }
            if (i_pair.toCustomerId == this.adnetCustomerId) {
                customer = customerMap[i_pair.customerId];
                if (customer == null) {
                    customer = customerMap[i_pair.customerId] = {};
                    customer.name = this.adnetAction.getCustomerName(i_pair.customerId);
                    customer.transfer = 0;
                    this.pairsFiltered = this.pairsFiltered.push(customer);
                }
                customer.from = i_pair.getTotalDebit();
                customer.transfer += i_pair.getTotalTransfer();
            }
            customer.adCharges = customer.from + customer.to;
        })
        this.cd.markForCheck();

    }

    private processFieldBalance(i_field: string) {
        return (i_item): any => {
            switch (i_field) {
                case 'name': {
                    return i_item[i_field];
                }
                case i_field: {
                    return StringJS(i_item[i_field]).toCurrency();
                }
                default: {
                    return '---'
                }
            }
        }
    }
    
    private processFieldPayments(i_field: string) {
        return (i_item:AdnetPaymentModel): any => {
            switch (i_field) {
                case 'total': {}
                case 'prevCredit': {}
                case 'credit': {
                    return StringJS(i_item[i_field]()).toCurrency();
                }
                case 'comment':{}
                case 'transactionId':{}
                case 'date': {
                    return i_item[i_field]();
                }
                default: {
                    return '---'
                }
            }
        }
    }

    public sort: {field: string, desc: boolean} = {
        field: null,
        desc: false
    };

    public sort2: {field: string, desc: boolean} = {
        field: null,
        desc: false
    };

    public sort3: {field: string, desc: boolean} = {
        field: null,
        desc: false
    };

    private onSelectedPeriod() {

    }

    destroy() {
    }
}