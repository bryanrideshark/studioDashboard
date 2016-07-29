import {Component} from "@angular/core";
import {AdnetConfigCustomer} from "../config/AdnetConfigCustomer";
import {Tabs} from "../../../tabs/tabs";
import {Tab} from "../../../tabs/tab";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {List} from "immutable";
import {AdnetConfigRates} from "../rates/AdnetConfigRates";
import {CORE_DIRECTIVES} from "@angular/common";
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {RatingComponent} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'AdnetConfig',
    moduleId: __moduleName,
    directives: [AdnetConfigCustomer, AdnetConfigRates, Tabs, Tab, RatingComponent,
        DROPDOWN_DIRECTIVES, CORE_DIRECTIVES],
    template: `
          <div>
            <div (click)="$event.preventDefault()">
              <div class="btn-group" dropdown  (onToggle)="toggled($event)" [(isOpen)]="status.isopen">
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
         <hr/>
         <tabs *ngIf="adnetCustomerId != -1">
            <tab [tabtitle]="'Customers'">                      
              <AdnetConfigCustomer [adnetCustomerModel]="adnetCustomerModel"></AdnetConfigCustomer>
            </tab>
            <tab [tabtitle]="'Rates'">
              <AdnetConfigRates [adnetCustomerId]="adnetCustomerId"></AdnetConfigRates>
            </tab>
            <tab [tabtitle]="'Targets'">
            </tab>
        </tabs>     
      </div>  
      
    `
})

export class AdnetConfig {


    public disabled: boolean = false;
    public status: {isopen: boolean} = {isopen: false};
    public items: Array<string> = ['The first choice!',
        'And another choice for you.', 'but wait! A third!'];

    public onSelectedAdnetCustomer(adnetCustomerModel: AdnetCustomerModel): void {
        // this.adnetCustomerId = this.appStore.getState().appdb.get('adnetCustomerId');
        this.adnetCustomerId = adnetCustomerModel.customerId();
        this.getCustomerData();
    }

    public toggled(open: boolean): void {
    }

    constructor(private appStore: AppStore) {
        var i_adnet = this.appStore.getState().adnet;
        this.adnetCustomers = i_adnet.getIn(['customers']);
        this.unsub = this.appStore.sub((i_adnetCustomers: List<AdnetCustomerModel>) => {
            this.adnetCustomers = i_adnetCustomers
        }, 'adnet.customers');
    }

    private unsub: Function;
    private adnetCustomerId: number = -1;
    private adnetCustomers: List<AdnetCustomerModel>
    private adnetCustomerModel: AdnetCustomerModel;

    private getCustomerData() {
        if (!this.adnetCustomers)
            return;
        this.adnetCustomers.forEach((i_adNetCustomer: AdnetCustomerModel)=> {
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