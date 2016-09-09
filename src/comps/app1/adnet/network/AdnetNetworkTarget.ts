import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {Lib} from "../../../../Lib";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {List} from 'immutable';

@Component({
    selector: 'AdnetNetworkTarget',
    moduleId: __moduleName,
    template: `<small>{{me}}</small> {{adnetPackageModels?.size}}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetworkTarget {
    constructor() {
        this.me = Lib.GetCompSelector(this.constructor)
    }

    @Input()
    set setAdnetTargetModels(i_adnetTargetModels: List<AdnetTargetModel>) {
        this.adnetPackageModels = i_adnetTargetModels;
    }

    protected adnetPackageModels: List<AdnetTargetModel>

    private me: string;


}