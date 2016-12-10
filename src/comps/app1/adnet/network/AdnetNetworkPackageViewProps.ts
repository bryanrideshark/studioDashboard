import {
    Component,
    Input
} from "@angular/core";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import {Ngmslib} from "ng-mslib";

@Component({
    selector: 'AdnetNetworkPackageViewProps',
    templateUrl: './AdnetNetworkPackageViewProps.html',
    styles: [``]
})

export class AdnetNetworkPackageViewProps {
    constructor() {
        this['me'] = Ngmslib.GetCompSelector(this.constructor);
    }

    @Input()
    set setAdnetPackageModel(i_adnetPackageModels: AdnetPackageModel) {
        this.adnetPackageModels = i_adnetPackageModels;
    }

    private adnetPackageModels: AdnetPackageModel;
}