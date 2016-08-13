import {Component, trigger,
    state,
    style,
    transition,
    animate} from "@angular/core";
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
import {AdnetConfigTargets} from "../targets/AdnetConfigTargets";

@Component({
    selector: 'AdnetConfig',
    moduleId: __moduleName,
    animations: [
        trigger('showState', [
            state('inactive', style({
                opacity: 0
            })),
            state('active',   style({
                opacity: 1
            })),
            transition('* => active', animate('100ms ease-out')),
            transition('* => inactive', animate('100ms ease-out'))
        ])
    ],
    directives: [AdnetConfigCustomer, AdnetConfigTargets, AdnetConfigRates, Tabs, Tab, RatingComponent,
        DROPDOWN_DIRECTIVES, CORE_DIRECTIVES],
    template: `
<h3 style="float: right">{{adnetCustomerName}}</h3>
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
         <hr class="clearFloat"/>
         <div [@showState]="showState">
             <tabs *ngIf="adnetCustomerId != -1">
                <tab [tabtitle]="'Setup'">                      
                  <AdnetConfigCustomer [adnetCustomerModel]="adnetCustomerModel"></AdnetConfigCustomer>
                </tab>          
                <tab [tabtitle]="'Rates'">
                  <AdnetConfigRates [adnetCustomerId]="adnetCustomerId"></AdnetConfigRates>
                </tab>
                <tab [tabtitle]="'Targets'">
                    <AdnetConfigTargets></AdnetConfigTargets>
                </tab>
            </tabs>
         </div>
      </div>  
      
    `
})

export class AdnetConfig {

    private showState:string = 'active';
    public disabled: boolean = false;
    public status: {isopen: boolean} = {isopen: false};

    public onSelectedAdnetCustomer(adnetCustomerModel: AdnetCustomerModel): void {
        // reset to no selection before loading new selection
        this.showState = 'inactive'
        setTimeout(()=> {
            this.adnetCustomerId = -1;
        },100);
        setTimeout(()=>{
            this.adnetCustomerId = adnetCustomerModel.customerId();
            this.adnetCustomerName = adnetCustomerModel.getName();
            this.getCustomerData();
            this.showState = 'active'
        },110)
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
    private adnetCustomerName: string = '';
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