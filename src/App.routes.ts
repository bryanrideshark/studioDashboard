import {provideRouter, RouterConfig} from "@angular/router";
import {App1} from "./comps/app1/App1";
import {LoginPanel} from "./comps/entry/LoginPanel";
import {ForgotPass} from "./comps/entry/ForgotPass";
import {Logout} from "./comps/logout/Logout";
import {Dashboard} from "./comps/app1/dashboard/Dashboard";
import {Users} from "./comps/app1/users/Users";
import {Privileges} from "./comps/app1/privileges/Privileges";
import {Whitelabel} from "./comps/app1/whitelabel/Whitelabel";
import {Apps} from "./comps/app1/apps/Apps";
import {Account} from "./comps/app1/account/Account";
import {Orders} from "./comps/app1/orders/Orders";


const routes:RouterConfig = [
    {path: '/Login', component: LoginPanel},
    {path: '/Logout', component: Logout},
    {
        path: '/App1', component: App1,
        children: [
            {path: '/Orders', component: Orders},
            {path: '/Dashboard', component: Dashboard, index: true},
            {path: '/Users', component: Users},
            {path: '/Privileges', component: Privileges},
            {path: '/White label', component: Whitelabel},
            {path: '/Apps', component: Apps},
            {path: '/Account', component: Account},
            {path: '/Orders', component: Orders},
            {path: '/Logout', component: Logout}
        ]
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];


// pre rc.2 router config
//{path: "/", name: "root", redirectTo: ["/EntryPanelNoId/Login"], useAsDefault: true},
//{path: "/", redirectTo: ["/EntryPanelNoId/Login"], useAsDefault: true},
//{path: '/:id', component: AppManager, canDeactivate: [CrisisDetailGuard]}

// @Routes([
//     {path: '/', component: EntryPanel},
//     {path: '/AppManager', component: AppManager},
//     {path: '/Welcome', component: Welcome},
//     {path: '/EntryPanelNoId', component: EntryPanel},
//     {path: '/EntryPanel/:id', component: EntryPanel},
//     {path: '/Login', component: EntryPanel},
//     {path: '/ForgotPass', component: EntryPanel},
//     {path: '/App1', component: App1},
//     {path: '/App2', component: App2},
//     {path: '/App3', component: App3}
//     //new AsyncRoute({
//     //    path: '/App1',
//     //    loader: () => Lib.LoadComponentAsync('App1', '../comps/app1/App1'),
//     //    name: 'App1'
//     //}), /*systemjs*/
//     //new AsyncRoute({
//     //    path: '/App2',
//     //    loader: () => Lib.LoadComponentAsync('App2', '../comps/app2/App2'),
//     //    name: 'App2'
//     //})
//
// ])
