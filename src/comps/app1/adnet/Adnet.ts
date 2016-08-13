import {Component} from "@angular/core";
import {AdnetConfigCustomer} from "./config/AdnetConfigCustomer";
import {Tabs} from "../../tabs/tabs";
import {Tab} from "../../tabs/tab";
import {SimpleList} from "../../simplelist/Simplelist";
import {AdnetConfig} from "./config/AdnetConfig";

@Component({
    selector: 'Adnet',
    template: `
        <br/>
        <tabs>
            <tab [tabtitle]="'Configuration'">
              <AdnetConfig></AdnetConfig>
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
}