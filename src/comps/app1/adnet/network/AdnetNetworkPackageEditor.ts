import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {List} from 'immutable';

@Component({
    selector: 'AdnetNetworkPackageEditor',
    moduleId: __moduleName,
    templateUrl: 'AdnetNetworkPackageEditor.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetworkPackageEditor {

    @Input()
    setPairOutgoing:boolean;

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
    }

    @Input()
    setAdnetPairModels: List<AdnetPairModel>


    private adnetCustomerModel: AdnetCustomerModel;

}