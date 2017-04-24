import {ChangeDetectorRef, Component, Input, ViewChild} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {SelectItem} from "primeng/components/common/api";
import {List} from "immutable";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AdnetPaymentModel} from "../../../../adnet/AdnetPaymentModel";
import {AdnetTransferModel} from "../../../../adnet/AdnetTransferModel";
import {ToastsManager} from "ng2-toastr";
import {IChangePass} from "../../users/ChangePass";
import {IAddPayment} from "./AdnetPayment";
import {ITransferPayment} from "./AdnetTransfer";
import {Router} from "@angular/router";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {Compbaser, NgmslibService} from "ng-mslib";
import {Lib} from "../../../../Lib";

interface ICustomer {
    adCharges: number;
    name: string;
    to: string;
    transfer: number;
}

@Component({
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
    templateUrl: './AdnetBilling.html',
})

export class AdnetBilling extends Compbaser {
    inDevMode;
    m_totalPayments = 0;
    m_lastPayments = 0.0;
    m_totalAdCharges = 0;
    m_balance = 0;
    m_totalTransfers = 0;
    payments: List<AdnetPaymentModel> = List<AdnetPaymentModel>();
    transfers: List<AdnetTransferModel> = List<AdnetTransferModel>();
    customers: List<ICustomer> = List<ICustomer>();
    adnetCustomerId: number = -1;
    adnetCustomerModel: AdnetCustomerModel;
    selectionPeriod: SelectItem[] = [];
    selectionReport: SelectItem[] = [];
    // private selectedPeriod = 'absolute';
    // private selectedReport = 'balance';
    selectedReport;
    pairs: List<AdnetPairModel>
    // private msgs: Message[] = [];
    
    constructor(private appStore: AppStore, private cd: ChangeDetectorRef, private adnetAction: AdnetActions, private toastr: ToastsManager, private router: Router, private ngmslibService:NgmslibService) {
        super();
        this.inDevMode = Lib.DevMode();
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
    changePass: ModalComponent;

    @ViewChild('modalAddPayment')
    addPayment: ModalComponent;

    @ViewChild('modalTransfer')
    tarnsferPayment: ModalComponent;

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        if (this.adnetCustomerModel) {
            this.adnetCustomerId = this.adnetCustomerModel.customerId();
            this.buildCustomerList();
            this.calcTotals();
        }
    }

    stringJSPipeArgs = {
        toCurrency: ['us']
   }


     onChangePassSubmitted(i_changePass: IChangePass) {
        this.adnetAction.billingChangePassowrd(this.adnetCustomerId, i_changePass.userName, i_changePass.userPass, i_changePass.matchingPassword.password, (result) => {
            this.changePass.close();
            if (result == true) {
                this.toastr.info('Credentials updated', 'Success!');
            } else {
                this.toastr.error('user or password did not match', 'Problem!', {dismiss: 'click'});
            }
        });
    }

     onAddPayment(i_addPayment: IAddPayment) {
        this.adnetAction.billingMakePayment(this.adnetCustomerId, i_addPayment.userName, i_addPayment.userPass, i_addPayment.amount, i_addPayment.comment, (result) => {
            this.addPayment.close();
            if (result == 'Fake money') {
                this.toastr.info('Virtual funds added', 'Success!');
                this.appStore.dispatch(this.adnetAction.resetAdnet());
                setTimeout(() => this.router.navigate(['/App1/Adnet']), 200);
            } else {
                this.toastr.error(result, 'Problem!', {dismiss: 'click'});
            }
        });
    }

     onTransferPayment(i_transferPayment: ITransferPayment) {
        var toCustomerId = i_transferPayment.adnetPairModel.getCustomerId();
        this.pairs = this.appStore.getState().adnet.getIn(['pairs']) || {};
        var transferPair: AdnetPairModel = this.pairs.find((i_pair: AdnetPairModel) => {
            if (i_pair.getCustomerId() == this.adnetCustomerId && i_pair.getToCustomerId() == toCustomerId)
                return true;
        })
        this.adnetAction.billingTransferMoney(this.adnetCustomerId, i_transferPayment.userName, i_transferPayment.userPass, i_transferPayment.amount, transferPair.getId(), i_transferPayment.comment, (result) => {
            this.tarnsferPayment.close();
            if (result == true) {
                this.toastr.info('Virtual funds transferred', 'Success!');
                this.appStore.dispatch(this.adnetAction.resetAdnet());
                setTimeout(() => this.router.navigate(['/App1/Adnet']), 200);
            } else {
                this.toastr.error(result, 'Problem!', {dismiss: 'click'});
            }
        });
    }


     calcTotals() {
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

     onModalClose(event) {

    }

     makePayment() {
        this.addPayment.open();
    }

     changePassword() {
        this.changePass.open();
    }

     transferMoney() {
        this.tarnsferPayment.open();
    }

     buildCustomerList() {
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

     processFieldBalance(i_field: string) {
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

     processFieldTransfers(i_field: string) {
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

     processFieldPayments(i_field: string) {
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

    public sort: { field: string, desc: boolean } = {
        field: null,
        desc: false
    };

    public sort2: { field: string, desc: boolean } = {
        field: null,
        desc: false
    };

    public sort3: { field: string, desc: boolean } = {
        field: null,
        desc: false
    };

     onSelectedPeriod(event) {

    }

    destroy() {
    }
}

