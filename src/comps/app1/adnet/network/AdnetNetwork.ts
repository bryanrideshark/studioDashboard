import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {List} from 'immutable';
import {IPairSelect} from "./AdnetNetworkCustomerSelector";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {AdnetPackagePlayMode} from "./AdnetNetworkPackageProps";

export enum AdnetNetworkPropSelector {
    CONTENT,
    PACKAGE,
    RESOURCE,
    TARGET
}

export interface IAdNetworkPropSelectedEvent {
    selected:AdnetNetworkPropSelector
}

@Component({
    selector: 'AdnetNetwork',
    moduleId: __moduleName,
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

    private adnetNetworkPropSelector = AdnetNetworkPropSelector;
    private propSelector:AdnetNetworkPropSelector = AdnetNetworkPropSelector.CONTENT;
    private adnetCustomerId: number = -1;
    private adnetCustomerModel: AdnetCustomerModel;
    private pairsSelected: List<AdnetPairModel>;
    private pairsOutgoing: boolean;
    private selectedAdnetTargetModel:AdnetTargetModel;
    private selectedAdnetTargetModels:List<AdnetTargetModel>;
    private selectedAdnetPackagePlayMode:AdnetPackagePlayMode;

    private onPlayModeChanged(event:AdnetPackagePlayMode){
        this.selectedAdnetPackagePlayMode = event;
    }

    private onPropSelected(event:IAdNetworkPropSelectedEvent){
        this.propSelector = event.selected;
    }

    private onAdnetTargetsSelected(i_adnetTargetModels:List<AdnetTargetModel>){
        this.selectedAdnetTargetModels = i_adnetTargetModels;
    }

    private onPairSelected(event: IPairSelect) {
        this.pairsSelected = event.pairs;
        this.pairsOutgoing = event.pairsOutgoing;
    }

    private onTargetSelected(i_adnetTargetModel:AdnetTargetModel){
        this.selectedAdnetTargetModel = i_adnetTargetModel;
    }
}