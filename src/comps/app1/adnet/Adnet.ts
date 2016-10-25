import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate
} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../adnet/AdnetCustomerModel";
import {List} from "immutable";
import {ActivatedRoute} from "@angular/router";
import {BusinessModel} from "../../../business/BusinessModel";
import * as _ from 'lodash';
import * as bootbox from 'bootbox';
import {LocalStorage} from "../../../services/LocalStorage";
import {AdnetActions} from "../../../adnet/AdnetActions";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'Adnet',
    host: {
        // '[@routeAnimation]': 'true',
        '[style.display]': "'block'"
    },
    animations: [// trigger('routeAnimation', [
        //     state('*', style({opacity: 1})),
        //     transition('void => *', [
        //         style({opacity: 0}),
        //         animate(333)
        //     ]),
        //     transition('* => void', animate(333, style({opacity: 0})))
        // ]),
        trigger('showState', [state('inactive', style({
            opacity: 0
        })), state('active', style({
            opacity: 1
        })), transition('* => active', animate('100ms ease-out')), transition('* => inactive', animate('100ms ease-out'))])],
    template: `
        <br/>
        <h3 style="float: right">{{adnetCustomerName}}</h3>
          <div>
            <div (click)="$event.preventDefault()">
              <div class="btn-group" dropdown (onToggle)="toggled($event)" [(isOpen)]="status.isopen">
                  <button id="single-button" type="button" class="btn btn-primary" dropdownToggle>
                    Select sub-account 
                  <span class="caret"></span>
                </button>
                  <ul dropdownMenu role="menu" aria-labelledby="single-button">
                    <li *ngFor="let customer of businesses" (click)="onSelectedAdnetCustomer(customer)" role="menuitem"><a class="dropdown-item" href="#">{{customer.getName()}}</a></li>
                    <!--<li class="divider dropdown-divider"></li>-->
                    <!--<li role="menuitem"><a class="dropdown-item" href="#">Separated link</a></li>-->
                  </ul>
              </div>
            </div>
          </div>
          <br/>
          <div [@showState]="showState">
                <tabs>
                    <tab [tabtitle]="'Configuration'">
                      <AdnetConfig [setAdnetCustomerModel]="adnetCustomerModel"></AdnetConfig>
                    </tab>
                    <tab [tabtitle]="'Network'">
                      <AdnetNetwork [setAdnetCustomerModel]="adnetCustomerModel"></AdnetNetwork>
                    </tab>
                    <tab [tabtitle]="'Billing'">
                      <h3>billing coming soon...</h3>
                    </tab>
                </tabs>
          </div>
    `
})
export class Adnet {

    constructor(private appStore: AppStore, private route: ActivatedRoute, private adnetActions: AdnetActions, private localStorage: LocalStorage) {
        //console.log(this.route.snapshot.data['adnetResolver']);

        //todo: fix if data in localstore is invalid
        this.adnetCustomerId = this.localStorage.getItem('adnet_customer_id');
        this.adnetTokenId = this.localStorage.getItem('adnet_token_id');

        this.listenAdnetDataReady();
        var business = this.appStore.getState().business;
        this.businesses = business.getIn(['businesses']);
        this.unsub1 = this.appStore.sub((i_businesses: List<BusinessModel>) => {
            this.businesses = i_businesses
        }, 'business.businesses');


        // this.unsub3 = this.appStore.sub((i_adnetCustomers: List<AdnetCustomerModel>) => {
        //     this.adnetCustomers = i_adnetCustomers
        // }, 'adnet.customers');
    }

    private unsub1: Function;
    private unsub2: Subscription;
    // private unsub3: Function;
    private adnetCustomerId: number = -1;
    private adnetTokenId: number = -1;
    private adnetCustomerName: string = '';
    private businesses: List<BusinessModel>
    private adnetCustomers: List<AdnetCustomerModel>
    private adnetCustomerModel: AdnetCustomerModel;
    private showState: string = 'active';
    public disabled: boolean = false;
    public status: {isopen: boolean} = {isopen: false};

    private listenAdnetDataReady() {
        this.unsub2 = this.adnetActions.onAdnetDataReady().subscribe((data) => {
            var adnet = this.appStore.getState().adnet;
            this.adnetCustomers = adnet.getIn(['customers']);
            this.loadAdnetCustomerModel();
        })
    }

    private loadAdnetCustomerModel(){
        if (!this.adnetCustomers)
            return;
        this.adnetCustomerModel = this.adnetCustomers.filter((i_adnetCustomerModel: AdnetCustomerModel) => {
            return Number(this.adnetCustomerId) == i_adnetCustomerModel.getId();
        }).first() as AdnetCustomerModel;
    }

    private ngOnDestroy() {
        this.unsub1();
        this.unsub2.unsubscribe();
        // this.unsub3();
    }

    public onSelectedAdnetCustomer(i_businessModel: BusinessModel): void {
        // reset to no selection before loading new selection
        this.showState = 'inactive'
        this.appStore.dispatch(this.adnetActions.resetAdnet());
        setTimeout(() => {
            this.adnetCustomerId = -1;
            this.adnetCustomerModel = null;
            this.adnetTokenId = null;
        }, 100);
        setTimeout(() => {
            this.adnetCustomerId = i_businessModel.getAdnetCustomerId();
            this.adnetTokenId = i_businessModel.getAdnetTokenId();
            this.adnetCustomerName = i_businessModel.getName();
            this.localStorage.setItem('adnet_customer_id', this.adnetCustomerId);
            this.localStorage.setItem('adnet_token_id', this.adnetTokenId);
            if (_.isUndefined(this.adnetTokenId))
                return bootbox.alert('This must be an old account and so it does not have an adnet token. Please login to it directly at least once so we cab generate an Adnet token for it.')
            this.appStore.dispatch(this.adnetActions.getAdnet(this.adnetCustomerId, this.adnetTokenId));
            // this.getAdnetData();
            this.showState = 'active'
        }, 110)
    }

    public toggled(open: boolean): void {
    }
}

