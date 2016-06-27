import {Injectable, Inject} from "@angular/core";
import {Actions, AppStore} from "angular2-redux-util";
import {Http} from "@angular/http";
import {FlagsAuth} from "../services/AuthService";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/debounceTime';

import * as xml2js from 'xml2js'

export const APP_INIT = 'APP_INIT';
export const SERVERS_STATUS = 'SERVERS_STATUS';
export const CLOUD_SERVERS = 'CLOUD_SERVERS';
export const AUTH_PASS = 'AUTH_PASS';
export const AUTH_FAIL = 'AUTH_FAIL';

@Injectable()
export class AppdbAction extends Actions {
    parseString;

    constructor(@Inject('OFFLINE_ENV') private offlineEnv,
                private appStore:AppStore,
                private _http:Http) {
        super(appStore);
        // this.parseString = require('xml2js').parseString;
        this.parseString = xml2js.parseString;
    }

    public authenticateUser(i_user, i_pass, i_remember) {

        return (dispatch) => {

            var processXml = (xmlData)=> {
                this.parseString(xmlData, {attrkey: 'attr'}, function (err, result) {
                    if (!result) {
                        dispatch({
                            type: AUTH_FAIL,
                            authenticated: false,
                            user: i_user,
                            pass: i_pass,
                            remember: i_remember,
                            reason: FlagsAuth.WrongPass
                        });
                    } else if (result && !result.Businesses) {
                        dispatch({
                            type: AUTH_PASS,
                            authenticated: false,
                            user: i_user,
                            pass: i_pass,
                            remember: i_remember,
                            reason: FlagsAuth.NotEnterprise
                        });
                    } else {
                        dispatch({
                            type: AUTH_FAIL,
                            authenticated: true,
                            user: i_user,
                            pass: i_pass,
                            remember: i_remember,
                            reason: FlagsAuth.Enterprise
                        });
                    }
                });
            }

            const baseUrl = this.appStore.getState().appdb.get('appBaseUrl');
            const url = `${baseUrl}?command=GetCustomers&resellerUserName=${i_user}&resellerPassword=${i_pass}`;
            if (this.offlineEnv) {
                this._http.get('offline/getCustomers.xml').subscribe((result)=> {
                    var xmlData:string = result.text()
                    processXml(xmlData);
                })
                this._http.get('offline/customerRequest.json').subscribe((result)=> {
                    var jData:string = result.json();
                })
            } else {
                this._http.get(url)
                    .map(result => {
                        var xmlData:string = result.text()
                        processXml(xmlData);
                    }).subscribe()
            }
        };
    }

    public serverStatus() {
        return (dispatch) => {
            this._http.get(`https://secure.digitalsignage.com/msPingServersGuest`)
                .map(result => {
                    result = result.json();
                    dispatch({type: SERVERS_STATUS, payload: result});
                }).subscribe();
            return;
        };
    }

    public getCloudServers() {
        return (dispatch) => {
            this._http.get('https://secure.digitalsignage.com/getActiveCloudServers')
                .map(result => {
                    result = result.json();
                    dispatch({type: CLOUD_SERVERS, payload: result});
                }).subscribe();
            return;
        };
    }

    public initAppDb() {
        return {type: APP_INIT, value: Date.now()};
    }
}
