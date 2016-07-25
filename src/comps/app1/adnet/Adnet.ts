import {Component, OnInit} from '@angular/core';
import {AdnetConfigCustomer} from "./config/AdnetConfigCustomer";
import {Tabs} from "../../tabs/tabs";
import {Tab} from "../../tabs/tab";

@Component({
    selector: 'Adnet',
    directives: [AdnetConfigCustomer, Tabs, Tab],
    template: `
        <br/>
        <tabs>
            <tab [tabtitle]="'Configuration'">
              <AdnetConfigCustomer></AdnetConfigCustomer>
            </tab>
            <tab [tabtitle]="'Network'">
              <h3>network coming soon...</h3>
            </tab>
            <tab [tabtitle]="'Billing'">
              <h3>billing coming soon...</h3>
            </tab>
        </tabs>
        
    `
})
export class Adnet {

    private a = {a: 1}

    constructor() {
        setTimeout(()=>{
            return this.a;
        },1000)
    }
}