import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";

@Component({
    selector: 'AdnetConfigTargetProps',
    moduleId: __moduleName,
    templateUrl: 'AdnetConfigTargetProps.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetConfigTargetProps {

    ngOnInit() {
        // this.adTargets = this.appStore.getState().adnet.getIn(['targets']) || {};
        // this.unsub = this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
        //     this.adTargets = i_adTargets;
        //     this.render();
        // }, 'adnet.targets');
        // this.render();
    }

    private adnetTargetModel: AdnetTargetModel;

    @Input()
    set selectedAdnetTargetModel(i_adnetTargetModel: AdnetTargetModel) {
        this.adnetTargetModel = i_adnetTargetModel;
    }
}