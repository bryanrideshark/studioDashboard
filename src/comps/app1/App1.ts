import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Router, OnActivate, Routes} from "@angular/router";
import {HTTP_PROVIDERS} from "@angular/http";
import {Menu} from "../sidemenu/Menu";
import {MenuItem} from "../sidemenu/MenuItem";
import {CommBroker, IMessage} from "../../services/CommBroker";
import {Consts} from "../../../src/Conts";
import {Sliderpanel} from "../sliderpanel/Sliderpanel";
import {Tabs} from "../tabs/tabs";
import {Tab} from "../tabs/tab";
import {Logout} from "../logout/Logout";
import {Users} from "./users/Users";
import {Dashboard} from "./dashboard/Dashboard";
import {Privileges} from "./privileges/Privileges";
import {Whitelabel} from "./whitelabel/Whitelabel";
import {Apps} from "./apps/Apps";
import {Account} from "./account/Account";
import {Orders} from "./orders/Orders";
import {RouteConfig, CanActivate} from "@angular/router-deprecated";

@RouteConfig([
    {path: '/Dashboard', component: Dashboard, as: 'Dashboard', useAsDefault: true},
    {path: '/Users', component: Users},
    {path: '/Privileges', component: Privileges},
    {path: '/White label', component: Whitelabel},
    {path: '/Apps', component: Apps},
    {path: '/Account', component: Account},
    {path: '/Orders', component: Orders},
    {path: '/Logout', component: Logout}
])

//CanActivate example of how to allow conditional route access after 10ms of Promise resolution
@CanActivate(() => {
   return new Promise(resolve => {
       setTimeout(e=> {
           resolve(true)
       }, 10)
   })
})
@Component({
    providers: [HTTP_PROVIDERS],
    templateUrl: '/src/comps/app1/App1.html',
    directives: [ROUTER_DIRECTIVES, Menu, MenuItem, Sliderpanel, Account, Whitelabel, Apps, Privileges, Dashboard, Logout, Orders, Tabs, Tab]
})
export class App1 {
    private routerActive:boolean;

    constructor(private commBroker:CommBroker, private router:Router) {
        jQuery(".navbar-header .navbar-toggle").trigger("click");
        jQuery('.navbar-nav').css({
            display: 'block'
        });
        this.listenMenuChanges();
    }

    ngOnInit() {
        this.routerActive = true;
        this.commBroker.getService(Consts.Services().App).appResized();
    }

    /** Examples on router life-cycle hooks **/
    // routerCanReuse(next:ComponentInstruction, prev:ComponentInstruction) {
    //     return true;
    // }

    // routerOnReuse(to:ComponentInstruction, from:ComponentInstruction) {
    //     //console.log(to.params['name']);
    //     // console.log(to.urlPath ? to.urlPath : '' + ' ' + from.urlPath);
    // }

    // routerOnActivate(to:ComponentInstruction, from:ComponentInstruction) {
    //     this.routerActive = true;
    //     // demonstrate delay on routing, maybe to load some server data first or show loading bar
    //     return new Promise((resolve) => {
    //         setTimeout(()=> {
    //             resolve(true);
    //         }, 10)
    //     });
    // }

    public listenMenuChanges() {
        var self = this;
        var unsub = self.commBroker.onEvent(Consts.Events().MENU_SELECTION).subscribe((e:IMessage)=> {
            if (!self.routerActive)
                return;
            let screen = (e.message);
            self.router.navigate([`/App1/${screen}`]);
        });
    }

    // routerOnDeactivate(next:ComponentInstruction, prev:ComponentInstruction) {
    //     this.routerActive = false;
    // }
}