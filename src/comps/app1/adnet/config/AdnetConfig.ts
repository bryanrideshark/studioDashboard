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

          <div (click)="$event.preventDefault()">
               <div class="btn-group" dropdown [(isOpen)]="status.isopen">
            <button id="single-button" type="button" class="btn btn-primary" dropdownToggle>
              Select customer 
              <span class="caret"></span>
            </button>
            <ul dropdownMenu role="menu" aria-labelledby="single-button">
              <li role="menuitem"><a class="dropdown-item" href="#">Action</a></li>
              <li role="menuitem"><a class="dropdown-item" href="#">Another action</a></li>
              <li role="menuitem"><a class="dropdown-item" href="#">Something else here</a></li>
              <li class="divider dropdown-divider"></li>
              <li role="menuitem"><a class="dropdown-item" href="#">Separated link</a></li>
            </ul>
          </div>
         <hr/>
         <tabs>
            <tab [tabtitle]="'Customers'">                      
              <AdnetConfigCustomer [adnetCustomerModel]="adnetCustomerModel"></AdnetConfigCustomer>
            </tab>
            <tab [tabtitle]="'Rates'">
              <AdnetConfigRates></AdnetConfigRates>
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

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }


    constructor(private appStore: AppStore) {
        this.adnetCustomerId = this.appStore.getState().appdb.get('adnetCustomerId');
        var i_adnet = this.appStore.getState().adnet;
        this.adnetCustomers = i_adnet.getIn(['customers']);
        this.unsub = this.appStore.sub((i_adnetCustomers: List<AdnetCustomerModel>) => {
            this.adnetCustomers = i_adnetCustomers
            this.getCustomerData();
        }, 'adnet.customers');
        this.getCustomerData();
    }

    private unsub: Function;
    private adnetCustomerId: number;
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