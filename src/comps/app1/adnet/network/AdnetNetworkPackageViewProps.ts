import {
    Component,
    Input
} from "@angular/core";
import {Lib} from "src/Lib";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
//import AdnetNetworkPackageViewPropsTemplate from './AdnetNetworkPackageViewProps.html!text'; /*prod*/

@Component({
//	template: AdnetNetworkPackageViewPropsTemplate, /*prod*/
    selector: 'AdnetNetworkPackageViewProps',
    templateUrl: './AdnetNetworkPackageViewProps.html', /*dev*/
    styles: [`
        
    `],
    moduleId: __moduleName
})


export class AdnetNetworkPackageViewProps {
    constructor() {
        this['me'] = Lib.GetCompSelector(this.constructor)
    }

    @Input()
    set setAdnetPackageModel(i_adnetPackageModels: AdnetPackageModel) {
        this.adnetPackageModels = i_adnetPackageModels;
    }
    private adnetPackageModels:AdnetPackageModel;
}