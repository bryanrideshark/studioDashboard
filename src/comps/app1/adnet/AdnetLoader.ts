import {Component} from "@angular/core";
import {Lib} from "src/Lib";
import {Router} from "@angular/router";
//import MyCompTemplate from './MyComp.html!text'; /*prod*/
//import MyCompStyle from './MyComp.css!text'; /*prod*/

@Component({
    template: `
            <small class="release">package properties
                <i style="font-size: 1.4em" class="fa fa-cog pull-right"></i>
            </small>
            <small class="debug">{{me}}</small>
            <Loading [size]="100" [style]="{'margin-top': '150px'}"></Loading>
            <router-outlet></router-outlet>
            `,
    selector: 'AdnetLoader',
    moduleId: __moduleName
})


export class AdnetLoader {
    constructor(private router: Router) {
        this.me = Lib.GetCompSelector(this.constructor)
        this.router.navigate(['/App1/Adnet/Adnet2']);
    }

    private me: string;
}