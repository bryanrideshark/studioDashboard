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
import {AuthService} from "./services/AuthService";
import {MediaAdnet} from "./comps/app1/adnet/MediaAdnet";


const routes:RouterConfig = [
    {path: 'Login', component: LoginPanel},
    {path: 'Logout', component: Logout},
    {path: '', component: App1, canActivate: [AuthService]},
    {path: 'src', component: App1,
        children: [
            {path: 'public', component: Dashboard, canActivate: [AuthService]}
        ]
    },
    {path: 'App1', component: App1,
        children: [
            {path: '', component: App1, canActivate: [AuthService]},
            {path: 'Dashboard', component: Dashboard, canActivate: [AuthService]},
            {path: 'Orders', component: Orders, canActivate: [AuthService]},
            {path: 'Users', component: Users, canActivate: [AuthService]},
            {path: 'Privileges', component: Privileges, canActivate: [AuthService]},
            {path: 'White label', component: Whitelabel, canActivate: [AuthService]},
            {path: 'Apps', component: Apps, canActivate: [AuthService]},
            {path: 'Account', component: Account, canActivate: [AuthService]},
            {path: 'Orders', component: Orders, canActivate: [AuthService]},
            {path: 'Adnet', component: MediaAdnet, canActivate: [AuthService]},
            {path: 'Logout', component: Logout, canActivate: [AuthService]},
            {path: '**', redirectTo: 'Dashboard'}
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
// v1
// @Routes([
//     {path: "/", name: "root", redirectTo: ["/EntryPanelNoId/Login"], useAsDefault: true},
//     {path: '/AppManager', component: AppManager, as: 'AppManager'},
//     {path: '/EntryPanelNoId/...', component: EntryPanel, as: 'EntryPanelNoId'},
//     {path: '/EntryPanel/:id/...', component: EntryPanel, as: 'EntryPanel'},
//     {path: '/Login/...', component: EntryPanel, as: 'Login'},
//     {path: '/ForgotPass/...', component: EntryPanel, as: 'ForgotPass'},
//     {path: '/App1/...', component: App1, as: 'App1'},
// ])
// v2
// @Routes([
//     {path: '/AppManager', component: AppManager,},
//     {path: '/EntryPanelNoId', component: EntryPanel},
//     {path: '/EntryPanel/:id', component: EntryPanel},
//     {path: '/Login', component: EntryPanel},
//     {path: '/ForgotPass', component: EntryPanel},
//     {path: '/App1', component: App1},
// ])
// import {RouteConfig, CanActivate} from "@angular/router";

//{path: '/Dashboard', component: Dashboard, as: 'Dashboard', useAsDefault: true},

// @Routes([
//     {path: '/Dashboard', component: Dashboard},
//     {path: '/Users', component: Users},
//     {path: '/Privileges', component: Privileges},
//     {path: '/White label', component: Whitelabel},
//     {path: '/Apps', component: Apps},
//     {path: '/Account', component: Account},
//     {path: '/Orders', component: Orders},
//     {path: '/Logout', component: Logout}
// ])
//CanActivate example of how to allow conditional route access after 10ms of Promise resolution
// @CanActivate(() => {
//    return new Promise(resolve => {
//        setTimeout(e=> {
//            resolve(true)
//        }, 10)
//    })
// })