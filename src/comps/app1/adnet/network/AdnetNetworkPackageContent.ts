import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";

@Component({
    selector: 'AdnetNetworkPackageContent',
    moduleId: __moduleName,
    template: `
                <small>contents: {{contentSize}}</small>
              `,

    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetworkPackageContent {

    constructor() {
    }

    @Input()
    set setAdnetPackageModels(i_adnetPackageModels: AdnetPackageModel) {
        this.adnetPackageModels = i_adnetPackageModels;
        if (!this.adnetPackageModels)
            return;
        console.log(this.adnetPackageModels.getContent());
        this.contentSize = this.adnetPackageModels.getContent().length;

    }

    private selec = '';
    private adnetPackageModels: AdnetPackageModel;
    private contentSize: number;
}