import {Injectable, Inject} from "@angular/core";
import {Actions, AppStore} from "angular2-redux-util";
import {Map} from "immutable";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/finally";
import "rxjs/add/observable/throw";
import {Http} from "@angular/http";
import * as bootbox from "bootbox";

export const RECEIVE_ADNET = 'RECEIVE_ADNET';

@Injectable()
export class AdnetActions extends Actions {

    constructor(@Inject('OFFLINE_ENV') private offlineEnv,
                private appStore:AppStore,
                private _http:Http) {
        super(appStore);
    }

    public getAdnet() {
        return (dispatch) => {
            const baseUrl = this.appStore.getState().appdb.get('appBaseUrlAdnet');
            const url = `${baseUrl}`;
            if (this.offlineEnv) {
                this._http.get('offline/customerRequest.json').subscribe((result)=> {
                    var jData:Object = result.json();
                    dispatch(this.receivedAdnet(jData));
                })
            } else {
                this._http.get(url)
                    .map(result => {
                        var jData:Object = result.json()
                        dispatch(this.receivedAdnet(jData));
                    }).subscribe()
            }
        };
    }

    public receivedAdnet(payload:any) {
        return {
            type: RECEIVE_ADNET,
            payload
        }
    }
}
