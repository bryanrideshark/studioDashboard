import {Component, Input, ChangeDetectorRef} from "@angular/core";
import {Compbaser} from "../../../compbaser/Compbaser";
import {AppStore} from "angular2-redux-util";
import {SelectItem} from "primeng/components/common/api";
import {List} from "immutable";
import {AdnetReportModel} from "../../../../adnet/AdnetReportModel";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {AdnetActions} from "../../../../adnet/AdnetActions";

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
                <th sortableHeader="from" [sort]="sort">incoming</th>
                <th sortableHeader="to" [sort]="sort">outgoing</th>
                <th sortableHeader="adCharges" [sort]="sort">ad charges</th>
                <th sortableHeader="transfer" [sort]="sort">transfers</th>
            </tr>
            </thead>
            <tbody>
            <tr class="simpleGridRecord" simpleGridRecord *ngFor="let item of pairsFilteredOutgoing | OrderBy:sort.field:sort.desc; let index=index" [item]="item" [index]="index">
                <td class="width-md" simpleGridData [processField]="processField('name')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processField('from')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processField('to')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processField('adCharges')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processField('transfer')" [item]="item"></td>
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
        this.filterPairs();

        this.displaySelection.push({
            label: 'Absolute',
            value: 'Absolute'
        }, {
            label: 'This month',
            value: 'This month'
        });
    }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        if (this.adnetCustomerModel)
            this.adnetCustomerId = this.adnetCustomerModel.customerId();
    }

    private pairsFilteredOutgoing: List<AdnetPairModel> = List<AdnetPairModel>();
    private adnetCustomerId: number = -1;
    private adnetCustomerModel: AdnetCustomerModel;
    private billingReport: List<AdnetReportModel> = List<AdnetReportModel>();
    private displaySelection: SelectItem[] = [];
    private pairs: List<AdnetPairModel>

    private filterPairs() {
        if (!this.pairs)
            return;
        var customerMap = {}
        var customer = null;
        this.pairsFilteredOutgoing = List<AdnetPairModel>();
        this.pairs.forEach((i_pair: AdnetPairModel) => {
            if (i_pair.getCustomerId() == this.adnetCustomerId) {
                customer = customerMap[i_pair.toCustomerId];
                if (customer == null) {
                    customer = customerMap[i_pair.toCustomerId] = {};
                    customer.name = this.adnetAction.getCustomerName(i_pair.toCustomerId);
                    customer.transfer = 0;
                    this.pairsFilteredOutgoing = this.pairsFilteredOutgoing.push(customer);
                }
                customer.to = -i_pair.getTotalDebit();
                customer.transfer -= i_pair.getTotalTransfer();
            }
            if (i_pair.toCustomerId == this.adnetCustomerId) {
                customer = customerMap[i_pair.customerId];
                if (customer == null) {
                    customer = customerMap[i_pair.customerId] = {};
                    customer.name =  this.adnetAction.getCustomerName(i_pair.customerId);
                    customer.transfer = 0;
                    this.pairsFilteredOutgoing = this.pairsFilteredOutgoing.push(customer);
                }
                customer.from = i_pair.getTotalDebit();
                customer.transfer += i_pair.getTotalTransfer();
            }
            customer.adCharges = customer.from + customer.to;
        })
        this.cd.markForCheck();

    }

    private processField(i_field: string) {
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

    public sort: {field: string, desc: boolean} = {
        field: null,
        desc: false
    };

    private onSelectedPeriod() {

    }

    destroy() {
    }
}