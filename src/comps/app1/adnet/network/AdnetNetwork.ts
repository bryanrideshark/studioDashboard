import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {List} from 'immutable';
import {IPairSelect} from "./AdnetNetworkCustomerSelector";

@Component({
    selector: 'AdnetNetwork',
    moduleId: __moduleName,
    styles: [`
        .bgGreen { background-color: green}
        .bgYellow { background-color: yellow}
        .bgRed { background-color: red}
    `],
    templateUrl: 'AdnetNetwork.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetwork {

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        if (this.adnetCustomerModel)
            this.adnetCustomerId = this.adnetCustomerModel.customerId();
    }

    private adnetCustomerId: number = -1;
    private adnetCustomerModel: AdnetCustomerModel;
    private pairsSelected: List<AdnetPairModel>;
    private pairsOutgoing: boolean;

    private onPairSelected(event: IPairSelect) {
        this.pairsSelected = event.pairs;
        this.pairsOutgoing = event.pairsOutgoing;
    }
}