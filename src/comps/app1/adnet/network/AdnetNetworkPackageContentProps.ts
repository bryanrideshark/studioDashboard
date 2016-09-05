import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {Lib} from "../../../../Lib";
import {AdnetContentModel} from "../../../../adnet/AdnetContentModel";

@Component({
    selector: 'AdnetNetworkPackageContentProps',
    moduleId: __moduleName,
    template: `
            <small>{{me}}</small>
            {{adnetContentModels?.getName()}}
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetworkPackageContentProps {
    constructor() {
        this.me = Lib.GetCompSelector(this.constructor)
    }

    @Input()
    set setAdnetContentModels(i_adnetContentModels: AdnetContentModel) {
        this.adnetContentModels = i_adnetContentModels;
        if (this.adnetContentModels)
            console.log(this.adnetContentModels.getName());
    }

    private adnetContentModels: AdnetContentModel;
    private me: string;
}