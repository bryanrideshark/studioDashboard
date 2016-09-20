import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {
    CommBroker,
    IMessage
} from "../../services/CommBroker";
import {Consts} from "../../../src/Conts";

@Component({
    template: `
        <div class="row" style="margin-left: 0; margin-right: 0;">
          <Menu #appMennu class="noSpace">
            <MenuItem [fontAwesome]="'fa-dashboard'" [tabtitle]="'Dashboard'"></MenuItem>
            <MenuItem [fontAwesome]="'fa-users'" [tabtitle]="'Users'"></MenuItem>
            <MenuItem [fontAwesome]="'fa-lock'" [tabtitle]="'Privileges'"></MenuItem>
            <MenuItem [fontAwesome]="'fa-adjust'" [tabtitle]="'White label'"></MenuItem>
            <MenuItem [fontAwesome]="'fa-shopping-cart'" [tabtitle]="'Apps'"></MenuItem>
            <MenuItem [fontAwesome]="'fa-cog'" [tabtitle]="'Account'"></MenuItem>
            <MenuItem [fontAwesome]="'fa-shopping-cart'" [tabtitle]="'Orders'"></MenuItem>
            <MenuItem [fontAwesome]="'fa-sitemap'" [tabtitle]="'Adnet'"></MenuItem>
            <MenuItem [fontAwesome]="'fa-power-off'" [tabtitle]="'Logout'"></MenuItem>
          </Menu>
          <div id="mainPanelWrapWasp" class="mainContent col-xs-12 col-sm-12 col-md-12 col-lg-11">
           <router-outlet></router-outlet>
          </div>
        </div>
    `,
    moduleId: __moduleName
})
export class App1 {
    private routerActive: boolean;

    constructor(private commBroker: CommBroker, private router: Router) {
        jQuery(".navbar-header .navbar-toggle").trigger("click");
        jQuery('.navbar-nav').css({
            display: 'block'
        });
        this.listenMenuChanges();
    }

    ngOnInit() {
        this.routerActive = true;
        this.commBroker.getService(Consts.Services().App).appResized();
        // setTimeout(()=> {
        //     alert('1')
        //     this.router.navigate(['/App1/Dashboard'])
        // }, 2000)

    }

    public listenMenuChanges() {
        var self = this;
        var unsub = self.commBroker.onEvent(Consts.Events().MENU_SELECTION).subscribe((e: IMessage) => {
            if (!self.routerActive)
                return;
            let screen = (e.message);
            self.router.navigate([`/App1/${screen}`]);
        });
    }
}