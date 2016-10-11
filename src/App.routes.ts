import {Routes, RouterModule} from "@angular/router";
import {App1} from "./comps/app1/App1";
import {LoginPanel} from "./comps/entry/LoginPanel";
import {Logout} from "./comps/logout/Logout";
import {Dashboard} from "./comps/app1/dashboard/Dashboard";
import {Users} from "./comps/app1/users/Users";
import {Privileges} from "./comps/app1/privileges/Privileges";
import {Whitelabel} from "./comps/app1/whitelabel/Whitelabel";
import {Apps} from "./comps/app1/apps/Apps";
import {Account} from "./comps/app1/account/Account";
import {Orders} from "./comps/app1/orders/Orders";
import {AuthService} from "./services/AuthService";
import {Adnet} from "./comps/app1/adnet/Adnet";
import {AdnetResolver} from "./comps/app1/adnet/targets/AdnetResolver";
import {AdnetLoader} from "./comps/app1/adnet/AdnetLoader";

const routes: Routes = [
    {path: 'Login', component: LoginPanel},
    {path: 'Logout', component: Logout},
    {path: '', component: App1, canActivate: [AuthService]},
    {
        path: 'src', component: App1,
        children: [
            {path: 'public', component: Dashboard, canActivate: [AuthService]}
        ]
    },
    {
        path: 'App1', component: App1,
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
            {path: 'Adnet', component: Adnet, canActivate: [AuthService], pathMatch: 'full', redirectTo: '/App1/Adnet/Adnet' },
            {path: 'Adnet',
                children: [
                        {path: 'Adnet', component: AdnetLoader, canActivate: [AuthService]},
                        {path: 'Adnet2', component: Adnet, canActivate: [AuthService],
                            resolve: {
                            adnetResolver: AdnetResolver
                        }}
                    ]
                },
            {path: 'Logout', component: Logout, canActivate: [AuthService]},
            {path: '**', redirectTo: 'Dashboard'}
        ]
    }
];

export const routing = RouterModule.forRoot(routes, {enableTracing: false});

