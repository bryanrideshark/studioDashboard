System.register(["@angular/router", "./comps/app1/App1", "./comps/entry/LoginPanel", "./comps/logout/Logout", "./comps/app1/dashboard/Dashboard", "./comps/app1/users/Users", "./comps/app1/privileges/Privileges", "./comps/app1/whitelabel/Whitelabel", "./comps/app1/apps/Apps", "./comps/app1/account/Account", "./comps/app1/orders/Orders", "./services/AuthService", "./comps/app1/adnet/Adnet", "./comps/app1/adnet/targets/AdnetResolver", "./comps/app1/adnet/AdnetLoader"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, App1_1, LoginPanel_1, Logout_1, Dashboard_1, Users_1, Privileges_1, Whitelabel_1, Apps_1, Account_1, Orders_1, AuthService_1, Adnet_1, AdnetResolver_1, AdnetLoader_1;
    var routes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (App1_1_1) {
                App1_1 = App1_1_1;
            },
            function (LoginPanel_1_1) {
                LoginPanel_1 = LoginPanel_1_1;
            },
            function (Logout_1_1) {
                Logout_1 = Logout_1_1;
            },
            function (Dashboard_1_1) {
                Dashboard_1 = Dashboard_1_1;
            },
            function (Users_1_1) {
                Users_1 = Users_1_1;
            },
            function (Privileges_1_1) {
                Privileges_1 = Privileges_1_1;
            },
            function (Whitelabel_1_1) {
                Whitelabel_1 = Whitelabel_1_1;
            },
            function (Apps_1_1) {
                Apps_1 = Apps_1_1;
            },
            function (Account_1_1) {
                Account_1 = Account_1_1;
            },
            function (Orders_1_1) {
                Orders_1 = Orders_1_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            },
            function (Adnet_1_1) {
                Adnet_1 = Adnet_1_1;
            },
            function (AdnetResolver_1_1) {
                AdnetResolver_1 = AdnetResolver_1_1;
            },
            function (AdnetLoader_1_1) {
                AdnetLoader_1 = AdnetLoader_1_1;
            }],
        execute: function() {
            routes = [
                { path: 'Login', component: LoginPanel_1.LoginPanel },
                { path: 'Logout', component: Logout_1.Logout },
                { path: '', component: App1_1.App1, canActivate: [AuthService_1.AuthService] },
                {
                    path: 'src', component: App1_1.App1,
                    children: [
                        { path: 'public', component: Dashboard_1.Dashboard, canActivate: [AuthService_1.AuthService] }
                    ]
                },
                {
                    path: 'App1', component: App1_1.App1,
                    children: [
                        { path: '', component: App1_1.App1, canActivate: [AuthService_1.AuthService] },
                        { path: 'Dashboard', component: Dashboard_1.Dashboard, canActivate: [AuthService_1.AuthService] },
                        { path: 'Orders', component: Orders_1.Orders, canActivate: [AuthService_1.AuthService] },
                        { path: 'Users', component: Users_1.Users, canActivate: [AuthService_1.AuthService] },
                        { path: 'Privileges', component: Privileges_1.Privileges, canActivate: [AuthService_1.AuthService] },
                        { path: 'White label', component: Whitelabel_1.Whitelabel, canActivate: [AuthService_1.AuthService] },
                        { path: 'Apps', component: Apps_1.Apps, canActivate: [AuthService_1.AuthService] },
                        { path: 'Account', component: Account_1.Account, canActivate: [AuthService_1.AuthService] },
                        { path: 'Orders', component: Orders_1.Orders, canActivate: [AuthService_1.AuthService] },
                        { path: 'Adnet', component: Adnet_1.Adnet, canActivate: [AuthService_1.AuthService], pathMatch: 'full', redirectTo: '/App1/Adnet/Adnet' },
                        { path: 'Adnet',
                            children: [
                                { path: 'Adnet', component: AdnetLoader_1.AdnetLoader, canActivate: [AuthService_1.AuthService] },
                                { path: 'Adnet2', component: Adnet_1.Adnet, canActivate: [AuthService_1.AuthService],
                                    resolve: {
                                        adnetResolver: AdnetResolver_1.AdnetResolver
                                    } }
                            ]
                        },
                        { path: 'Logout', component: Logout_1.Logout, canActivate: [AuthService_1.AuthService] },
                        { path: '**', redirectTo: 'Dashboard' }
                    ]
                }
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(routes, { enableTracing: false }));
        }
    }
});
