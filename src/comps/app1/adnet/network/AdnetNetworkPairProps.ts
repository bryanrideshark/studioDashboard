import {
    Component,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import {Lib} from "src/Lib";

@Component({
    selector: 'AdnetNetworkPairProps',
    template: `
            <small class="release">AdnetNetworkPairProps
                <i style="font-size: 1.4em" class="fa fa-cog pull-right"></i>
            </small>
            <small class="debug">{{me}}</small>
            outoging: {{pairOutgoing}}
            <div *ngIf="pairOutgoing==true">
                <label>friend</label>
            </div>              
            <div *ngIf="pairOutgoing==false">
                <label>auto activate</label>
                <br/>
                <label>ads activated</label>
            </div>
            `,
    moduleId: __moduleName
})


export class AdnetNetworkPairProps {
    constructor() {
        this.me = Lib.GetCompSelector(this.constructor)
    }
    private me:string;
    private pairOutgoing: boolean;

    @Input()
    set setPairOutgoing(i_setPairOutgoing: boolean) {
        this.pairOutgoing = i_setPairOutgoing;
    }
}