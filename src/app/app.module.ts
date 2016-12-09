import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AppStore} from "angular2-redux-util";
import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk';
import 'hammerjs';
import notify from "../appdb/NotifyReducer";
import appdb from "../appdb/AppdbReducer";
import {business} from "../business/BusinessReducer";
import {reseller} from "../reseller/ResellerReducer";
import {adnet} from "../adnet/AdnetReducer";
import {stations} from "../stations/StationsReducer";
import {orders} from "../comps/app1/orders/OrdersReducer";
import {LocalStorage} from "../services/LocalStorage";
import {MsLibModule} from "ng-mslib/dist/mslib.module";
import {ToastModule} from "ng2-toastr";
import {AgmCoreModule} from 'angular2-google-maps/core';

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


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ToastModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAGD7EQugVG8Gq8X3vpyvkZCnW4E4HONLI'
        }),
        MsLibModule.forRoot()
    ],
    providers: [providing],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(i_app: AppStore) {
    }
}
