import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Ngmslib} from "ng-mslib";
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
    selector: 'AdnetLoader'
})


export class AdnetLoader {
    constructor(private router: Router) {
        this.me = Ngmslib.GetCompSelector(this.constructor, this)
        this.router.navigate(['/App1/Adnet/Adnet2']);
    }

    private me: string;
}