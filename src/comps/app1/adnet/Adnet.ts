import {Component, trigger, state, style, transition, animate} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../adnet/AdnetCustomerModel";
import {List} from "immutable";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'Adnet',
    host: {
        // '[@routeAnimation]': 'true',
        '[style.display]': "'block'"
    },
    animations: [
        // trigger('routeAnimation', [
        //     state('*', style({opacity: 1})),
        //     transition('void => *', [
        //         style({opacity: 0}),
        //         animate(333)
        //     ]),
        //     transition('* => void', animate(333, style({opacity: 0})))
        // ]),
        trigger('showState', [
            state('inactive', style({
                opacity: 0
            })),
            state('active', style({
                opacity: 1
            })),
            transition('* => active', animate('100ms ease-out')),
            transition('* => inactive', animate('100ms ease-out'))
        ])
    ],
    template: `
        <br/>
        <h3 style="float: right">{{adnetCustomerName}}</h3>
          <div>
            <div (click)="$event.preventDefault()">
              <div class="btn-group" dropdown (onToggle)="toggled($event)" [(isOpen)]="status.isopen">
                  <button id="single-button" type="button" class="btn btn-primary" dropdownToggle>
                    Select customer 
                  <span class="caret"></span>
                </button>
                  <ul dropdownMenu role="menu" aria-labelledby="single-button">
                    <li *ngFor="let customer of adnetCustomers" (click)="onSelectedAdnetCustomer(customer)" role="menuitem"><a class="dropdown-item" href="#">{{customer.getName()}}</a></li>
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

    constructor(private appStore: AppStore, private route: ActivatedRoute) {
        //console.log(this.route.snapshot.data['adnetResolver']);
        var i_adnet = this.appStore.getState().adnet;
        this.adnetCustomers = i_adnet.getIn(['customers']);
        this.unsub = this.appStore.sub((i_adnetCustomers: List<AdnetCustomerModel>) => {
            this.adnetCustomers = i_adnetCustomers
        }, 'adnet.customers');
    }

    private showState: string = 'active';
    public disabled: boolean = false;
    public status: {isopen: boolean} = {isopen: false};

    public onSelectedAdnetCustomer(adnetCustomerModel: AdnetCustomerModel): void {
        // reset to no selection before loading new selection
        this.showState = 'inactive'
        setTimeout(() => {
            this.adnetCustomerId = -1;
            this.adnetCustomerModel = null;
        }, 100);
        setTimeout(() => {
            this.adnetCustomerId = adnetCustomerModel.customerId();
            this.adnetCustomerName = adnetCustomerModel.getName();
            this.getCustomerData();
            this.showState = 'active'
        }, 110)
    }

    public toggled(open: boolean): void {
    }

    private unsub: Function;
    private adnetCustomerId: number = -1;
    private adnetCustomerName: string = '';
    private adnetCustomers: List<AdnetCustomerModel>
    private adnetCustomerModel: AdnetCustomerModel;

    private getCustomerData() {
        if (!this.adnetCustomers)
            return;
        this.adnetCustomers.forEach((i_adNetCustomer: AdnetCustomerModel) => {
            var adnetCustomerId = i_adNetCustomer.customerId();
            if (adnetCustomerId == this.adnetCustomerId) {
                this.adnetCustomerModel = i_adNetCustomer;
            }
        })
    }

    private ngOnDestroy() {
        this.unsub();
    }
}