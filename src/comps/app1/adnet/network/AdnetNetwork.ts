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

type TabType = "packagesTab" | "targetsTab"

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
        if (this.adnetCustomerModel) this.adnetCustomerId = this.adnetCustomerModel.customerId();
    }

    private adnetNetworkPropSelector = AdnetNetworkPropSelector;
    private propSelectorNetworkTab: AdnetNetworkPropSelector = AdnetNetworkPropSelector.CONTENT;
    private propSelectorPackagesTab: AdnetNetworkPropSelector = AdnetNetworkPropSelector.NONE;
    private adnetCustomerId: number = -1;
    private adnetCustomerModel: AdnetCustomerModel;
    private pairsSelected: List<AdnetPairModel>;
    private pairsOutgoing: boolean;
    private selectedAdnetTargetModel: AdnetTargetModel;
    private selectedAdnetTargetModels: List<AdnetTargetModel>;
    private selectedAdnetContentModel: AdnetContentModel;

    /** packages tabs specific members **/
    private selectedAdnetPackagePlayMode_tab_packages: AdnetPackagePlayMode;
    private selectedAdnetPackageModel_tab_packages: AdnetPackageModel;

    /**  target tabs specific members **/
    private selectedAdnetPackagePlayMode_tab_targets: AdnetPackagePlayMode;
    private selectedAdnetPackageModel_tab_targets: AdnetPackageModel;

    private onAdnetContentSelected(event: AdnetContentModel) {
        this.selectedAdnetContentModel = event;
    }

    private onPropSelected(tab: TabType, event: IAdNetworkPropSelectedEvent) {
        switch (tab) {
            case 'packagesTab': {
                this.propSelectorNetworkTab = event.selected;
                break;
            }
            case 'targetsTab': {
                this.propSelectorPackagesTab = event.selected;
                break;
            }
        }

    }

    private onTabActive(tabName:TabType, event:boolean){
    }

    private onPairSelected(event: IPairSelect) {
        this.selectedAdnetPackageModel_tab_packages = null;
        this.pairsSelected = event.pairs;
        this.pairsOutgoing = event.pairsOutgoing;
        this.selectedAdnetTargetModel = null;
        this.selectedAdnetPackageModel_tab_targets = null;
    }

    private onAdnetTargetsSelected(i_adnetTargetModels: List<AdnetTargetModel>) {
        this.selectedAdnetTargetModels = i_adnetTargetModels;
    }

    private onAdnetTargetSelected(i_adnetTargetModel: AdnetTargetModel) {
        this.selectedAdnetTargetModel = i_adnetTargetModel;
        this.selectedAdnetPackageModel_tab_targets = null;
    }

    private onSetPlayMode(tab: TabType, event: AdnetPackagePlayMode) {
        switch (tab) {
            case 'packagesTab': {
                this.selectedAdnetPackagePlayMode_tab_packages = event;
                break;
            }
            case 'targetsTab': {
                this.selectedAdnetPackagePlayMode_tab_targets = event;
                break;
            }
        }
    }

    private onAdnetPackageSelected(event: AdnetPackageModel) {
        this.selectedAdnetPackageModel_tab_packages = event;
        this.onSetPlayMode('packagesTab', event.playMode());
    }

    private onAdnetPackageSelectedTarget(event: AdnetPackageModel) {
        this.selectedAdnetPackageModel_tab_targets = event;
        this.onSetPlayMode('targetsTab', event.playMode());
    }
}


