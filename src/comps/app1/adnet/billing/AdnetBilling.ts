import {Component, Input, ChangeDetectorRef, ViewChild} from "@angular/core";
import {Compbaser} from "../../../compbaser/Compbaser";
import {AppStore} from "angular2-redux-util";
import {SelectItem, Message} from "primeng/components/common/api";
import {List} from "immutable";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AdnetPaymentModel} from "../../../../adnet/AdnetPaymentModel";
import {AdnetTransferModel} from "../../../../adnet/AdnetTransferModel";
import {ToastsManager, Toast} from "ng2-toastr";
import {ChangePass, IChangePass} from "../../users/ChangePass";
import {ModalComponent} from "../../../ng2-bs3-modal/components/modal";

interface ICustomer {
    adCharges: number;
    name: string;
    to: string;
    transfer: number;
}

@Component({
    template: `<small class="debug">{{me}}</small>
<div class="row">
    <div class="col-xs-2">
        <!--<p-selectButton [options]="selectionPeriod" [(ngModel)]="selectedPeriod" (onChange)="onSelectedPeriod($event)"></p-selectButton>-->
        <!--<br/><br/>-->
        <!--<p>previous balance: <span style="padding-right: 1px" class="pull-right">{{m_lastPayments | StringJSPipe:stringJSPipeArgs}}</span></p>-->
        <hr/>
        <p>payments: <span style="padding-right: 1px" class="pull-right">{{m_totalPayments | StringJSPipe:stringJSPipeArgs}}</span></p>
        <p>ad charges: <span style="padding-right: 1px" class="pull-right">{{m_totalAdCharges | StringJSPipe:stringJSPipeArgs}}</span></p>
        <p>transfers: <span style="padding-right: 1px" class="pull-right">{{m_totalTransfers | StringJSPipe:stringJSPipeArgs}}</span></p>
        <br/>
        <hr class="styled-hr push-left"/>
        <h3>balance: {{m_balance | StringJSPipe:stringJSPipeArgs}}</h3>
        <hr/>
        <div class="actionButtons">
            <!--<button (click)="editBilling()" class="btn">edit billing</button>-->
            <button (click)="makePayment()" class="btn">make payment</button>
            <button (click)="changePassword()" class="btn">change password</button>
            <button (click)="transferMoney()" class="btn">transfer money</button>
        </div>

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
            <tr class="simpleGridRecord" simpleGridRecord *ngFor="let item of customers | OrderBy:sort.field:sort.desc; let index=index" [item]="item" [index]="index">
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
                <th [sortableHeader]="['Value','transferDate']" [sort]="sort3">yy/mm/dd</th>
                <th [sortableHeader]="['Value','transferAmount']" [sort]="sort3">receive</th>
                <th [sortableHeader]="['Value','transferAmount']" [sort]="sort3">send</th>
                <th [sortableHeader]="['Value','customerId']" [sort]="sort3">customer</th>
                <th [sortableHeader]="['Value','comment']" [sort]="sort3">comments</th>
            </tr>
            </thead>
            <tbody>
            <tr class="simpleGridRecord" simpleGridRecord *ngFor="let item of transfers | OrderBy:sort3.field:sort3.desc; let index=index" [item]="item" [index]="index">
                <td class="width-md" simpleGridData [processField]="processFieldTransfers('date')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldTransfers('receive')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldTransfers('send')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldTransfers('customer')" [item]="item"></td>
                <td class="width-md" simpleGridData [processField]="processFieldTransfers('comment')" [item]="item"></td>
            </tr>
            </tbody>
        </simpleGridTable>

    </div>

    <modal #modalChangePassword [animation]="true" (onClose)="onModalClose($event)">
        <modal-header [show-close]="true">
            <h4 class="modal-title">
                <span class="fa fa-key"></span>
                change password
            </h4>
        </modal-header>
        <modal-body>
            <changePass (onSubmit)="onChangePassSubmitted($event)" [withUserInput]="true" [showSubmit]="true" ></changePass>
        </modal-body>
        <modal-footer [show-default-buttons]="false"></modal-footer>
    </modal>

</div>
           `,
    styles: [`
.actionButtons button {
    display: block;
    width: 180px;
    margin-top: 3px;
}
.styled-hr {
    border: none;
    height: 1px;
    margin: 0;
    width: 180px;
    padding: 0;
    color: #333; /* old IE */
    background-color: #333; /* Modern Browsers */
}
`],
    selector: 'AdnetBilling',
    moduleId: __moduleName
})

export class AdnetBilling extends Compbaser {

    constructor(private appStore: AppStore, private cd: ChangeDetectorRef, private adnetAction: AdnetActions, private toastr: ToastsManager) {
        super();
    }

    ngOnInit() {
        this.pairs = this.appStore.getState().adnet.getIn(['pairs']) || {};
        this.cancelOnDestroy(
            this.appStore.sub((i_pairs: List<AdnetPairModel>) => {
                this.pairs = i_pairs;
                this.buildCustomerList();
            }, 'adnet.pairs')
        );
        this.buildCustomerList();

        this.transfers = this.appStore.getState().adnet.getIn(['transfers']) || {};
        this.cancelOnDestroy(
            this.appStore.sub((i_transfers: List<AdnetTransferModel>) => {
                this.transfers = i_transfers;
                this.calcTotals();
            }, 'adnet.transfers')
        );

        this.payments = this.appStore.getState().adnet.getIn(['payments']) || {};
        this.cancelOnDestroy(
            this.appStore.sub((i_payments: List<AdnetPaymentModel>) => {
                this.payments = i_payments;
                this.calcTotals();
            }, 'adnet.payments')
        );
        this.calcTotals();


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

    @ViewChild('modalChangePassword')
    changePass:ModalComponent;

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        if (this.adnetCustomerModel) {
            this.adnetCustomerId = this.adnetCustomerModel.customerId();
            this.buildCustomerList();
            this.calcTotals();
        }
    }

    public stringJSPipeArgs = {
        toCurrency: ['us']
    }

    private m_totalPayments = 0;
    private m_lastPayments = 0.0;
    private m_totalAdCharges = 0;
    private m_balance = 0;
    private m_totalTransfers = 0;

    private payments: List<AdnetPaymentModel> = List<AdnetPaymentModel>();
    private transfers: List<AdnetTransferModel> = List<AdnetTransferModel>();
    private customers: List<ICustomer> = List<ICustomer>();
    private adnetCustomerId: number = -1;
    private adnetCustomerModel: AdnetCustomerModel;
    private selectionPeriod: SelectItem[] = [];
    private selectionReport: SelectItem[] = [];
    private selectedPeriod = 'absolute';
    private selectedReport = 'balance';
    private pairs: List<AdnetPairModel>
    private msgs: Message[] = [];

    private onChangePassSubmitted(i_changePass:IChangePass){
        this.adnetAction.billingChangePassowrd(this.adnetCustomerId, i_changePass.userName, i_changePass.userPass,i_changePass.matchingPassword.password, (result) => {
            this.changePass.close();
            if (result == true) {
                this.toastr.info('Credentials updated', 'Success!');
            } else {
                this.toastr.error('user or password did not match', 'Problem!', {dismiss: 'click'});
            }
        });
    }

    private calcTotals() {
        setTimeout(() => {
            this.m_totalPayments = 0;
            this.m_lastPayments = 0.0;
            this.m_totalAdCharges = 0;
            this.m_balance = 0;
            this.m_totalTransfers = 0;
            this.payments.forEach((i_adnetPaymentModel: AdnetPaymentModel) => {
                this.m_totalPayments += i_adnetPaymentModel.credit();
            })
            this.pairs.forEach((i_pair: AdnetPairModel) => {
                if (this.adnetCustomerId == i_pair.getCustomerId()) {
                    this.m_totalAdCharges -= i_pair.getTotalDebit();
                    this.m_totalTransfers -= i_pair.getTotalTransfer();
                }
                if (this.adnetCustomerId == i_pair.getToCustomerId()) {
                    this.m_totalAdCharges += i_pair.getTotalDebit();
                    this.m_totalTransfers += i_pair.getTotalTransfer();
                }
            })
            this.m_balance = this.m_totalPayments + this.m_totalAdCharges + this.m_totalTransfers;
        }, 50)
    }

    private onModalClose(){

    }

    private  makePayment() {
        this.adnetAction.billingMakePayment(this.adnetCustomerId, 'da63', '123123', 12, 'api rocks!', (result) => {
            if (result == 'FAKE MONEY') {
                this.toastr.info('Funds added', 'Success!');
            } else {
                this.toastr.error(result, 'Problem!', {dismiss: 'click'});
            }
        });
    }

    private changePassword() {
        this.changePass.open();
    }

    private transferMoney() {
        this.adnetAction.billingTransferMoney(this.adnetCustomerId, 'da63', '123123', 9999, 'api rocks!', (result) => {
            if (result == 'FAKE MONEY') {
                this.toastr.info('Funds added', 'Success!');
            } else {
                this.toastr.error(result, 'Problem!', {dismiss: 'click'});
            }
        });
    }

    private buildCustomerList() {
        if (!this.pairs)
            return;
        var customerMap = {}
        var customer: any = null;
        this.customers = List<ICustomer>();
        this.pairs.forEach((i_pair: AdnetPairModel) => {
            if (i_pair.getCustomerId() == this.adnetCustomerId) {
                customer = customerMap[i_pair.toCustomerId];
                if (customer == null) {
                    customer = customerMap[i_pair.toCustomerId] = {};
                    customer.name = this.adnetAction.getCustomerName(i_pair.toCustomerId);
                    customer.transfer = 0;
                    this.customers = this.customers.push(customer);
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
                    this.customers = this.customers.push(customer);
                }
                customer.from = i_pair.getTotalDebit();
                customer.transfer += i_pair.getTotalTransfer();
            }
            if (customer)
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

    private processFieldTransfers(i_field: string) {
        return (i_item: AdnetTransferModel): any => {
            switch (i_field) {
                case 'date': {
                    return i_item[i_field]();
                }
                case 'send': {
                    return i_item.send(this.adnetCustomerId);
                }
                case 'receive': {
                    return i_item.receive(this.adnetCustomerId);
                }
                case 'customer': {
                    return i_item.getCustomerName(this.adnetCustomerId, this.adnetAction);
                }
                case 'comment': {
                    return i_item.getComment();
                }
                case i_field: {
                    return StringJS(i_item[i_field]()).toCurrency();
                }
                default: {
                    return '---'
                }
            }
        }
    }

    private processFieldPayments(i_field: string) {
        return (i_item: AdnetPaymentModel): any => {
            switch (i_field) {
                case 'total': {
                }
                case 'prevCredit': {
                }
                case 'credit': {
                    return StringJS(i_item[i_field]()).toCurrency();
                }
                case 'comment': {
                }
                case 'transactionId': {
                }
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