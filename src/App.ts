/********************************************************************
 *
 * DigitalSignage.com Inc (c), FREE Digital Signage
 * StudioDashboard for Enterprise userrs
 * See GitHub for License
 *
 * for Development install and run:
 1. npm install chokidar-socket-emitter --save-dev ;
 2. npm install http-server --save-dev ;
 3. jspm i --dev systemjs-hot-reloader
 4. npm run devserver
 *
 ****************************************************************/

import "zone.js/dist/zone";
import "zone.js/dist/long-stack-trace-zone";
import "reflect-metadata";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {APP_ROUTER_PROVIDERS, routing, appRoutingProviders} from "./App.routes";
import {bootstrap, platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {disableDeprecatedForms, provideForms, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    Component, provide, enableProdMode, ViewEncapsulation, PLATFORM_PIPES, ComponentRef,
    NgModule, NgModuleRef
} from "@angular/core";
import * as platform from "platform";
import "jspm_packages/github/twbs/bootstrap@3.3.6";
import "twbs/bootstrap/dist/css/bootstrap.css!";
import "./styles/style.css!";
import {StyleService} from "./styles/StyleService";
import {appInjService} from "./services/AppInjService";
import {LocalStorage} from "./services/LocalStorage";
import {StoreService} from "./services/StoreService";
import {BusinessAction} from "./business/BusinessAction";
import {ResellerAction} from "./reseller/ResellerAction";
import {OrdersAction} from "./comps/app1/orders/OrdersAction";
import {orders} from "./comps/app1/orders/OrdersReducer";
import {StationsAction} from "./stations/StationsAction";
import {CharCount} from "./pipes/CharCount";
import {HTTP_PROVIDERS} from "@angular/http";
import {CommBroker} from "../src/services/CommBroker";
import {Filemenu} from "../src/comps/filemenu/Filemenu";
import {FilemenuItem} from "../src/comps/filemenu/FilemenuItem";
import {Logo} from "./comps/logo/Logo";
import {Footer} from "./comps/footer/Footer";
import {Consts} from "../src/Conts";
import {AppStore} from "angular2-redux-util";
import {Lib} from "./Lib";
import {CreditService} from "./services/CreditService";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/finally";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/do";
import notify from "./appdb/NotifyReducer";
import appdb from "./appdb/AppdbReducer";
import {business} from "./business/BusinessReducer";
import {reseller} from "./reseller/ResellerReducer";
import {adnet} from "./adnet/AdnetReducer";
import {stations} from "./stations/StationsReducer";
import {AppdbAction} from "./appdb/AppdbAction";
import {LogoCompany} from "./comps/logo/LogoCompany";
import {Observable} from "rxjs/Rx";
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from "angular2-google-maps/core";
import {AdnetActions} from "./adnet/AdnetActions";
import {AUTH_PROVIDERS} from "./services/AuthService";
import {BrowserModule} from "@angular/platform-browser";
import {
    JSONP_PROVIDERS,
    HttpModule,
    Http
} from "@angular/http";
import {SimpleList} from "./comps/simplelist/Simplelist";
import {Orders} from "./comps/app1/orders/Orders";
import {UsersDetails} from "./comps/app1/users/UsersDetails";
import {LoginPanel} from "./comps/entry/LoginPanel";
import {Menu} from "./comps/sidemenu/Menu";
import {MenuItem} from "./comps/sidemenu/MenuItem";
import {Sliderpanel} from "./comps/sliderpanel/Sliderpanel";
import {Whitelabel} from "./comps/app1/whitelabel/Whitelabel";
import {Apps} from "./comps/app1/apps/Apps";
import {Privileges} from "./comps/app1/privileges/Privileges";
import {Dashboard} from "./comps/app1/dashboard/Dashboard";
import {Logout} from "./comps/logout/Logout";
import {Tabs} from "./comps/tabs/tabs";
import {Tab} from "./comps/tabs/tab";
import {Account} from "./comps/app1/account/Account";

export enum ServerMode {
    CLOUD,
    PRIVATE,
    HYBRID
}

/**
 Main application bootstrap
 @class App
 **/
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.Emulated,
    providers: [StyleService, AppdbAction],
    templateUrl: '/src/App.html',
    directives: [ROUTER_DIRECTIVES, Filemenu, FilemenuItem, Logo, LogoCompany, Footer]
})

export class Main {
    constructor(private localStorage:LocalStorage,
                private router:Router,
                private appStore:AppStore,
                private commBroker:CommBroker,
                styleService:StyleService,
                private appdbAction:AppdbAction) {

        // force logout
        // this.localStorage.removeItem('remember_me')
        // todo: add logic to as when on each env
        // 0 = cloud, 1 = private 2 = hybrid
        this.checkPlatform();

        this.commBroker.setValue(Consts.Values().SERVER_MODE, ServerMode.CLOUD);
        this.m_styleService = styleService;
        this.commBroker.setService(Consts.Services().App, this);
        Observable.fromEvent(window, 'resize').debounceTime(250).subscribe(()=> {
            this.appResized();
        });
        if (!Lib.DevMode()) {
            setTimeout(()=> {
                router.navigate(['/App1/Dashboard']);
            }, 1000);
        }
    }

    private m_styleService:StyleService;
    private version = '1.552.rc4';

    private checkPlatform() {
        switch (platform.name.toLowerCase()) {
            case 'microsoft edge': {
                alert(`${platform.name} browser not supported at this time, please use Google Chrome`);
                break;
            }
            case 'chrome': {
                break;
            }
            default: {
                alert('for best performance please use Google Chrome');
                break;
            }
        }
    }

    public appResized():void {
        var appHeight = document.body.clientHeight;
        var appWidth = document.body.clientWidth;
        this.commBroker.setValue(Consts.Values().APP_SIZE, {height: appHeight, width: appWidth});
        this.commBroker.fire({
            fromInstance: self,
            event: Consts.Events().WIN_SIZED,
            context: '',
            message: {height: appHeight, width: appWidth}
        })
    }
}

if (!Lib.DevMode())
    enableProdMode();

var modules = [HTTP_PROVIDERS, AUTH_PROVIDERS, APP_ROUTER_PROVIDERS, ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    {provide: AppStore, useFactory: Lib.StoreFactory({notify, appdb, business, stations, reseller, adnet, orders})},
    {provide: StoreService, useClass: StoreService},
    {provide: BusinessAction, useClass: BusinessAction},
    {provide: ResellerAction, useClass: ResellerAction},
    {provide: AdnetActions, useClass: AdnetActions},
    {provide: OrdersAction, useClass: OrdersAction},
    {provide: StationsAction, useClass: StationsAction},
    {provide: AppdbAction, useClass: AppdbAction},
    {provide: CreditService, useClass: CreditService},
    {provide: LocalStorage, useClass: LocalStorage},
    {provide: CommBroker, useClass: CommBroker},
    {provide: Consts, useClass: Consts},
    {provide: "DEV_ENV", useValue: Lib.DevMode()},
    {provide: "OFFLINE_ENV", useValue: false},
    {provide: PLATFORM_PIPES, useValue: CharCount, multi: true}];


@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, ReactiveFormsModule, routing],
    providers: [appRoutingProviders, CommBroker, ...modules],
    declarations: [Main, SimpleList, UsersDetails, LoginPanel, Menu, MenuItem, Sliderpanel,
        Account, Whitelabel, Apps, Privileges, Dashboard, Logout, Orders, Tabs, Tab],
    bootstrap: [Main],
})
export class App {
}
platformBrowserDynamic().bootstrapModule(App, modules).then((appRef: NgModuleRef<any>) => {
    appInjService(appRef.injector);
});

window['hr'] && window['hr'].on('change', (fileName) => {
    if (fileName.indexOf('html') !== -1) {
        var newBody = document.createElement('body')
        newBody.appendChild(document.createElement('app'))
        document.body = newBody;
        platformBrowserDynamic().bootstrapModule(App, modules).then((appRef: NgModuleRef<any>) => {
            appInjService(appRef.injector);
        });
    }
})






// {provide: AuthService, useClass: AuthService},
//
//
//
//
// bootstrap(App, modules).then((appRef:ComponentRef<any>) => {
//     appInjService(appRef.injector);
// });
// window['hr'] && window['hr'].on('change', (fileName) => {
//     if (fileName.indexOf('html') !== -1) {
//         var newBody = document.createElement('body')
//         newBody.appendChild(document.createElement('app'))
//         document.body = newBody;
//         bootstrap(App, modules).then((appRef:ComponentRef<any>) => {
//             appInjService(appRef.injector);
//         });
//     }
// })


//provide(LocationStrategy, {useClass: HashLocationStrategy}),
//import {LocationStrategy, HashLocationStrategy} from "@angular/common";