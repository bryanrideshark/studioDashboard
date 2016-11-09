System.register(["immutable", "../appdb/AppdbAction", "../stations/StationsAction", "../comps/app1/orders/OrdersAction"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var immutable_1, AppdbAction, StationsAction, OrdersAction;
    var baseUrl, adnetCustomerId, adnetCustomerToken, appBaseUrlAdnet, appBaseUrlAdnetSave, appBaseUrlCloud;
    function appdb(state, action) {
        if (state === void 0) { state = immutable_1.Map({}); }
        switch (action.type) {
            case StationsAction.RECEIVE_TOTAL_STATIONS:
                return state.merge({
                    totalStations: {
                        time: Date.now(),
                        totalStations: action.totalStations
                    }
                });
            case AppdbAction.APP_INIT:
                return state.merge({
                    appStartTime: Date.now(),
                    appBaseUrl: "" + baseUrl
                });
            case AppdbAction.AUTH_FAIL:
            case AppdbAction.AUTH_PASS_WAIT_TWO_FACTOR:
            case AppdbAction.AUTH_PASS:
                return state.merge({
                    credentials: {
                        authenticated: action.authenticated,
                        user: action.user,
                        pass: action.pass,
                        remember: action.remember,
                        reason: action.reason,
                        businessId: action.businessId
                    },
                    appBaseUrlUser: baseUrl + "?resellerUserName=" + action.user + "&resellerPassword=" + action.pass,
                    appBaseUrlCloud: appBaseUrlCloud + "/END_POINT/" + action.user + "/" + action.pass,
                    appBaseUrlAdnet: "" + appBaseUrlAdnet,
                    appBaseUrlAdnetSave: "" + appBaseUrlAdnetSave
                });
            case AppdbAction.TWO_FACTOR_SERVER_RESULT:
                return state.set('twoFactorStatus', {
                    'status': action.status,
                    'twoFactorStatusReceived': Date.now()
                });
            case AppdbAction.APP_INIT:
                return state.merge({
                    appStartTime: Date.now(),
                    appBaseUrl: "" + baseUrl
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
                return state.merge({ serversStatus: action.payload });
            default:
                return state;
        }
    }
    exports_1("default", appdb);
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (AppdbAction_1) {
                AppdbAction = AppdbAction_1;
            },
            function (StationsAction_1) {
                StationsAction = StationsAction_1;
            },
            function (OrdersAction_1) {
                OrdersAction = OrdersAction_1;
            }],
        execute: function() {
            baseUrl = 'https://galaxy.signage.me/WebService/ResellerService.ashx';
            adnetCustomerId = ':ADNET_CUSTOMER_ID:';
            adnetCustomerToken = ':ADNET_TOKEN_ID:';
            appBaseUrlAdnet = "https://adnet.signage.me/adNetService.ashx?command=customerRequest&customerId=" + adnetCustomerId + "&customerToken=" + adnetCustomerToken + "&fromChangelistId=0";
            appBaseUrlAdnetSave = "https://adnet.signage.me/adNetService.ashx?command=customerSubmit&customerId=" + adnetCustomerId + "&customerToken=" + adnetCustomerToken + "&data=:DATA:";
            exports_1("appBaseUrlCloud", appBaseUrlCloud = 'https://secure.digitalsignage.com');
        }
    }
});
