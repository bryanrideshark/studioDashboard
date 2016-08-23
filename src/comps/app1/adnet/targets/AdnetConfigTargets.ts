import {Component, OnInit, Input} from '@angular/core';
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";

@Component({
    selector: 'AdnetConfigTargets',
    moduleId: __moduleName,
    templateUrl: 'AdnetConfigTargets.html'

})
export class AdnetConfigTargets {

    @Input()
    set adnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.customerModel = i_adnetCustomerModel;
    }

    private customerModel: AdnetCustomerModel;
}
