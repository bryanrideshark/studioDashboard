import {Map} from 'immutable';

import * as AppdbAction from "../appdb/AppdbAction";
import * as StationsAction from "../stations/StationsAction";
import * as OrdersAction from "../comps/app1/orders/OrdersAction";
import * as Immutable from 'immutable'
// todo: add logic to as when on each env
// 0 = cloud, 1 = private 2 = hybrid
const baseUrl = 'https://galaxy.signage.me/WebService/ResellerService.ashx';
const appBaseUrlCloud = 'https://secure.digitalsignage.com';
//todo: hard coded to one customer account while in dev


// dev 1
const adnetCustomerId = '29477'
const adnetCustomerToken = '5b861c39-a208-4362-91ab-2c9766d7ebc1'

// fq5@ms.com
// const adnetCustomerId = '472'
// const adnetCustomerToken = '7d1f5f73-7159-40af-9bbd-f61ef37b6394'

// d17@ms.com
// const adnetCustomerId = '29238';
// const adnetCustomerToken '00be859c-fafb-4d69-bbf7-15ba73d8c7fc';

// d20@ms.com
// const adnetCustomerId = '18635'
// const adnetCustomerToken = 'ec202a94-a66b-4380-85aa-1e73aab59be6';

// d22@ms.com
// const adnetCustomerId = '13111'
// const adnetCustomerToken = '60795882-f80b-4569-9ceb-f6de36279306';

const appBaseUrlAdnet = `https://adnet.signage.me/adNetService.ashx?command=customerRequest&customerId=${adnetCustomerId}&customerToken=${adnetCustomerToken}&fromChangelistId=0`;
const appBaseUrlAdnetSave = `https://adnet.signage.me/adNetService.ashx?command=customerSubmit&customerId=${adnetCustomerId}&customerToken=${adnetCustomerToken}&data=:DATA:`;


export default function appdb(state:Map<string, any> = Map<string, any>({}), action:any):Map<string, any> {
    switch (action.type) {
        case StationsAction.RECEIVE_TOTAL_STATIONS:
            return state.merge({
                totalStations: {time: Date.now(), totalStations: action.totalStations}
            });
        case AppdbAction.AUTH_FAIL:
        case AppdbAction.AUTH_PASS:
            return state.merge({
                credentials: {
                    authenticated: action.authenticated,
                    user: action.user,
                    pass: action.pass,
                    remember: action.remember,
                    reason: action.reason
                },
                appBaseUrlUser: `${baseUrl}?resellerUserName=${action.user}&resellerPassword=${action.pass}`,
                appBaseUrlCloud: `${appBaseUrlCloud}/END_POINT/${action.user}/${action.pass}`,
                appBaseUrlAdnet: `${appBaseUrlAdnet}`,
                appBaseUrlAdnetSave: `${appBaseUrlAdnetSave}`
            });
        case AppdbAction.APP_INIT:
            return state.merge({
                appStartTime: Date.now(),
                appBaseUrl: `${baseUrl}`
            });
        case OrdersAction.RECEIVE_ACCOUNT_TYPE:
            return state.merge({
                accountType: action.accountType
            });
        case AppdbAction.CLOUD_SERVERS:
            return state.merge({
                cloudServers: action.payload
            });
        case AppdbAction.SERVERS_STATUS:
            return state.merge({serversStatus: action.payload});
        default:
            return state;
    }
}


