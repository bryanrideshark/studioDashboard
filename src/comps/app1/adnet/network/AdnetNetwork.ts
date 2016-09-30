import {
    Component,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {List} from "immutable";
import {IPairSelect} from "./AdnetNetworkCustomerSelector";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import {AdnetContentModel} from "../../../../adnet/AdnetContentModel";
// import AdnetNetworkTemplate from "./AdnetNetwork.html!text"; /*prod*/

export enum AdnetNetworkPropSelector {
    CONTENT, PACKAGE, RESOURCE, TARGET, PAIR, NONE, PACKAGE_VIEW
}

export enum AdnetPackagePlayMode {
    TIME, LOCATION, ASSETS
}

export interface IAdNetworkPropSelectedEvent {
    selected: AdnetNetworkPropSelector
}

@Component({
//	template: AdnetNetworkTemplate, /*prod*/
    selector: 'AdnetNetwork',
    moduleId: __moduleName,
    templateUrl: './AdnetNetwork.html', /*dev*/
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetwork {

    // constructor(@Inject(forwardRef(() => AdnetActions)) private adnetAction: AdnetActions){
    //     console.log(adnetAction);
    // }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        if (this.adnetCustomerModel)
            this.adnetCustomerId = this.adnetCustomerModel.customerId();
    }

    private adnetNetworkPropSelector = AdnetNetworkPropSelector;
    private propSelector: AdnetNetworkPropSelector = AdnetNetworkPropSelector.CONTENT;
    private adnetCustomerId: number = -1;
    private adnetCustomerModel: AdnetCustomerModel;
    private pairsSelected: List<AdnetPairModel>;
    private pairsOutgoing: boolean;
    private selectedAdnetTargetModel: AdnetTargetModel;
    private selectedAdnetTargetModels: List<AdnetTargetModel>;
    private selectedAdnetPackagePlayMode: AdnetPackagePlayMode;
    private selectedAdnetPackagePlayModeTargets: AdnetPackagePlayMode;
    private selectedAdnetPackageModel: AdnetPackageModel;
    private selectedAdnetPackageModelTarget: AdnetPackageModel;
    private selectedAdnetContentModel: AdnetContentModel;

    private onSetPlayMode(tab:string, event: AdnetPackagePlayMode) {
        switch (tab){
            case 'packages': {
                this.selectedAdnetPackagePlayMode = event;
                break;
            }
            case 'targets': {
                this.selectedAdnetPackagePlayModeTargets = event;
                break;
            }
        }

    }

    private onAdnetContentSelected(event: AdnetContentModel) {
        this.selectedAdnetContentModel = event;
    }

    private onPropSelected(event: IAdNetworkPropSelectedEvent) {
        this.propSelector = event.selected;
    }

    // packages tab
    private onAdnetTargetsSelected(i_adnetTargetModels: List<AdnetTargetModel>) {
        this.selectedAdnetTargetModels = i_adnetTargetModels;
    }

    // targets tab
    private onAdnetTargetSelected(i_adnetTargetModel: AdnetTargetModel) {
        this.selectedAdnetTargetModel = i_adnetTargetModel;
    }

    // packages tab
    private onAdnetPackageSelected(event: AdnetPackageModel) {
        this.selectedAdnetPackageModel = event;
        this.onSetPlayMode('packages',event.playMode());
    }

    // targets tab
    private onAdnetPackageSelectedTarget(event: AdnetPackageModel) {
        this.selectedAdnetPackageModelTarget = event;
        this.onSetPlayMode('targets',event.playMode());
    }

    private onPairSelected(event: IPairSelect) {
        this.selectedAdnetPackageModel = null;
        this.pairsSelected = event.pairs;
        this.pairsOutgoing = event.pairsOutgoing;
    }
}


