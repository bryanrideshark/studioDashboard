import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";

@Component({
    selector: 'AdnetNetworkPackageEditor',
    moduleId: __moduleName,
    template: `<h1>Package editor</h1>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetworkPackageEditor {

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
    }

    private adnetCustomerModel: AdnetCustomerModel;

}