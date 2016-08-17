import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";

@Component({
    selector: 'AdnetConfigTargetProps',
    moduleId: __moduleName,
    templateUrl: 'AdnetConfigTargetProps.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetConfigTargetProps {
    private adnetTargetModel: AdnetTargetModel;

    @Input()
    set selectedAdnetTargetModel(i_adnetTargetModel: AdnetTargetModel) {
        this.adnetTargetModel = i_adnetTargetModel;
    }
}