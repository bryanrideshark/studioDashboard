import {
    Injectable,
    Inject
} from "@angular/core";
import {
    Actions,
    AppStore
} from "angular2-redux-util";
import {Http} from "@angular/http";
import {FlagsAuth} from "../services/AuthService";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/debounceTime';

import * as xml2js from 'xml2js'
import {Observable} from "rxjs/Observable";

export const APP_INIT = 'APP_INIT';
export const SERVERS_STATUS = 'SERVERS_STATUS';
export const CLOUD_SERVERS = 'CLOUD_SERVERS';
export const AUTH_PASS = 'AUTH_PASS';
export const AUTH_PASS_WAIT_TWO_FACTOR = 'AUTH_PASS_WAIT_TWO_FACTOR';
export const AUTH_FAIL = 'AUTH_FAIL';
export const TWO_FACTOR_STATUS = 'TWO_FACTOR_STATUS';

export enum AuthState {
    FAIL,
    PASS,
    TWO_FACTOR
}


@Injectable()
export class AppdbAction extends Actions {
    parseString;

    constructor(@Inject('OFFLINE_ENV') private offlineEnv,
                private appStore: AppStore,
                private _http: Http) {
        super(appStore);
        // this.parseString = require('xml2js').parseString;
        this.parseString = xml2js.parseString;
    }

    public authenticateTwoFactor(i_businesId, i_token) {
        return (dispatch) => {

            // sim network call
            setTimeout(()=>{
                dispatch({
                    type: TWO_FACTOR_STATUS,
                    status: true
                })
            },2000)


            // const baseUrl = this.appStore.getState().appdb.get('appBaseUrl');
            // const url = `${baseUrl}?command=GetCustomers&resellerUserName=${i_user}&resellerPassword=${i_pass}`;
            // if (this.offlineEnv) {
            //     this._http.get('offline/getCustomers.xml').subscribe((result) => {
            //         var xmlData: string = result.text()
            //         processXml(xmlData);
            //     })
            //     this._http.get('offline/customerRequest.json').subscribe((result) => {
            //         var jData: string = result.json();
            //     })
            // } else {
            //     this._http.get(url)
            //         .map(result => {
            //             var xmlData: string = result.text()
            //             processXml(xmlData);
            //         }).subscribe()
            // }
        };
    }

    public authenticateUser(i_user, i_pass, i_remember) {
        var self = this;
        return (dispatch) => {

            var processXml = (xmlData) => {
                this.parseString(xmlData, {attrkey: 'attr'}, function (err, result) {
                    if (!result) {
                        dispatch({
                            type: AUTH_FAIL,
                            authenticated: AuthState.FAIL,
                            user: i_user,
                            pass: i_pass,
                            remember: i_remember,
                            reason: FlagsAuth.WrongPass
                        });
                    } else if (result && !result.Businesses) {
                        dispatch({
                            type: AUTH_FAIL,
                            authenticated: AuthState.FAIL,
                            user: i_user,
                            pass: i_pass,
                            remember: i_remember,
                            reason: FlagsAuth.NotEnterprise
                        });
                    } else {
                        // Auth passed, check if two factor enabled
                        self.twoFactorCheck(i_user, i_pass).subscribe((twoFactorResult) => {
                            if (twoFactorResult.enabled == false) {
                                var eventType = AUTH_PASS;
                                var authState = AuthState.PASS;
                            } else {
                                var eventType = AUTH_PASS_WAIT_TWO_FACTOR;
                                var authState = AuthState.TWO_FACTOR;
                            }
                            dispatch({
                                type: eventType,
                                authenticated: authState,
                                user: i_user,
                                pass: i_pass,
                                businessId: twoFactorResult.businessId,
                                remember: i_remember,
                                reason: FlagsAuth.Enterprise
                            });
                        })

                    }
                });
            }

            const baseUrl = this.appStore.getState().appdb.get('appBaseUrl');
            const url = `${baseUrl}?command=GetCustomers&resellerUserName=${i_user}&resellerPassword=${i_pass}`;
            if (this.offlineEnv) {
                this._http.get('offline/getCustomers.xml').subscribe((result) => {
                    var xmlData: string = result.text()
                    processXml(xmlData);
                })
                this._http.get('offline/customerRequest.json').subscribe((result) => {
                    var jData: string = result.json();
                })
            } else {
                this._http.get(url)
                    .map(result => {
                        var xmlData: string = result.text()
                        processXml(xmlData);
                    }).subscribe()
            }
        };
    }

    private twoFactorCheck(i_user, i_pass): Observable<any> {
        return this._http.get(`https://secure.digitalsignage.com/twoFactorCheck?resellerName=${i_user}&resellerPassword=${i_pass}`)
            .map(result => result = result.json());
    }

    public serverStatus() {
        return (dispatch) => {
            this._http.get(`https://secure.digitalsignage.com/msPingServersGuest`)
                .map(result => {
                    result = result.json();
                    dispatch({
                        type: SERVERS_STATUS,
                        payload: result
                    });
                }).subscribe();
            return;
        };
    }

    public getCloudServers() {
        return (dispatch) => {
            this._http.get('https://secure.digitalsignage.com/getActiveCloudServers')
                .map(result => {
                    result = result.json();
                    dispatch({
                        type: CLOUD_SERVERS,
                        payload: result
                    });
                }).subscribe();
            return;
        };
    }

    public initAppDb() {
        return {
            type: APP_INIT,
            value: Date.now()
        };
    }
}
