import {Component, OnInit} from '@angular/core';
import {Tabs} from "../../../tabs/tabs";
import {Tab} from "../../../tabs/tab";

@Component({
    selector: 'AdnetConfigTargets',
    moduleId: __moduleName,
    directives: [Tabs, Tab],
    templateUrl: 'AdnetConfigTargets.html'

})
export class AdnetConfigTargets {

    constructor() {
    }
}
