import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {AppStore} from "angular2-redux-util";
import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import "hammerjs";
import notify from "../appdb/NotifyReducer";
import appdb from "../appdb/AppdbReducer";
import {business} from "../business/BusinessReducer";
import {reseller} from "../reseller/ResellerReducer";
import {adnet} from "../adnet/AdnetReducer";
import {stations} from "../stations/StationsReducer";
import {orders} from "../comps/app1/orders/OrdersReducer";
import {LocalStorage} from "../services/LocalStorage";
import {MsLibModule} from "ng-mslib/dist/mslib.module";
import {ToastModule, ToastOptions} from "ng2-toastr";
import {AgmCoreModule} from "angular2-google-maps/core";
import {SimpleGridModule} from "../comps/simplegridmodule/SimpleGridModule";
import {DropdownModule, AccordionModule} from "ng2-bootstrap";
import {TreeModule, InputTextModule, SelectButtonModule, DropdownModule as DropdownModulePrime} from "primeng/primeng";
import {NgStringPipesModule} from "angular-pipes";
import {routing} from "../App.routes";

export enum ServerMode {
    CLOUD,
    PRIVATE,
    HYBRID
}

var providing = [{
    provide: AppStore, useFactory: () => {
        const reducers = combineReducers({
            notify,
            appdb,
            business,
            stations,
            reseller,
            adnet,
            orders
        });
        const middlewareEnhancer = applyMiddleware(<any>thunkMiddleware);
        const isDebug = window['devToolsExtension']
        const applyDevTools = () => isDebug ? window['devToolsExtension']() : f => f;
        const enhancers: any = compose(middlewareEnhancer, applyDevTools());
        const store = createStore(reducers, enhancers);
        return new AppStore(store);
    }, deps: []
}, {
    provide: "OFFLINE_ENV",
    useValue: false
}, {
    provide: LocalStorage,
    useClass: LocalStorage
}];

let options: ToastOptions = new ToastOptions({
    toastLife: 4000,
    animate: 'flyRight'
});

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ToastModule.forRoot(options),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAGD7EQugVG8Gq8X3vpyvkZCnW4E4HONLI'
        }),
        MsLibModule.forRoot(),
        SimpleGridModule.forRoot(),
        JsonpModule,
        DropdownModule,
        AccordionModule,
        TreeModule,
        NgStringPipesModule,
        InputTextModule,
        SelectButtonModule,
        InputTextModule,
        DropdownModulePrime,
        routing,
    ],
    providers: [providing],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(i_app: AppStore) {
    }
}
