import {
    Component,
    Input
} from "@angular/core";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import {Compbaser} from "ng-mslib";
import {Lib} from "../../../../Lib";

@Component({
    selector: 'AdnetNetworkPackageViewProps',
    templateUrl: './AdnetNetworkPackageViewProps.html',
    styles: [``]
})

export class AdnetNetworkPackageViewProps extends Compbaser {
    inDevMode;
    constructor() {
        super();
        this.inDevMode = Lib.DevMode();
    }

    @Input()
    set setAdnetPackageModel(i_adnetPackageModels: AdnetPackageModel) {
        this.adnetPackageModels = i_adnetPackageModels;
    }

    adnetPackageModels: AdnetPackageModel;
}