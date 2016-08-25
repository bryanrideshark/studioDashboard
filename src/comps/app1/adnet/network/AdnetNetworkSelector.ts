import {Component, ChangeDetectionStrategy} from "@angular/core";

@Component({
    selector: 'AdnetNetworkSelector',
    moduleId: __moduleName,
    template: `
            <div style="padding-left: 20px">
                <SimpleList></SimpleList>
            </div>
            `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetworkSelector {
    constructor() {
    }
}