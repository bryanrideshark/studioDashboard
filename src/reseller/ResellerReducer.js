System.register(['immutable', './ResellerAction', "./PrivelegesModel", "../Lib", "./AppModel", "./WhitelabelModel", "./AccountModel", 'lodash'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var immutable_1, ResellerAction, PrivelegesModel_1, Lib_1, AppModel_1, WhitelabelModel_1, AccountModel_1, _;
    function reseller(state, action) {
        if (state === void 0) { state = immutable_1.Map(); }
        switch (action.type) {
            case ResellerAction.RECEIVE_APPS:
                {
                    return state.setIn(['apps'], action.apps);
                }
            case ResellerAction.UPDATE_APP:
                {
                    var appModels = state.getIn(['apps']);
                    var index = appModels.findIndex(function (i) { return i.getAppId() === action.app.getAppId(); });
                    appModels = appModels.update(index, function (appModel) {
                        return appModel.setKey(AppModel_1.AppModel, 'installed', action.mode);
                    });
                    return state.setIn(['apps'], appModels);
                }
            case ResellerAction.RECEIVE_WHITELABEL:
                {
                    return state.setIn(['whitelabel'], action.whitelabelModel);
                }
            case ResellerAction.RECEIVE_ACCOUNT_INFO:
                {
                    return state.setIn(['accounts'], action.accountModels);
                }
            case ResellerAction.UPDATE_DEFAULT_PRIVILEGE:
                {
                    return state.setIn(['privilegeDefault'], action.privilegeId);
                }
            case ResellerAction.RECEIVE_DEFAULT_PRIVILEGE:
                {
                    return state.setIn(['privilegeDefault'], action.privilegeId);
                }
            case ResellerAction.RECEIVE_PRIVILEGES:
                {
                    return state.setIn(['privileges'], action.privilegesModels);
                }
            case ResellerAction.RECEIVE_PRIVILEGES_SYSTEM:
                {
                    return state.setIn(['privilegesSystem'], action.privelegesSystemModels);
                }
            case ResellerAction.UPDATE_PRIVILEGE_NAME:
                {
                    var privileges = state.get('privileges');
                    privileges.forEach(function (i_privelegesModel, counter) {
                        if (i_privelegesModel.getPrivelegesId() == action.privilegeId) {
                            var updPriv = i_privelegesModel.setKey(PrivelegesModel_1.PrivelegesModel, 'name', action.privilegeName);
                            privileges = privileges.set(counter, updPriv);
                        }
                    });
                    return state.setIn(['privileges'], privileges);
                }
            case ResellerAction.ADD_PRIVILEGE:
                {
                    var privileges = state.get('privileges');
                    var updatedPrivelegesModels = privileges.push(action.privelegesModel);
                    return state.setIn(['privileges'], updatedPrivelegesModels);
                }
            case ResellerAction.REMOVE_PRIVILEGE:
                {
                    var privileges = state.get('privileges');
                    var updatedPrivelegesModels = privileges.filter(function (privelegesModel) { return privelegesModel.getPrivelegesId() !== action.privilegeId; });
                    return state.setIn(['privileges'], updatedPrivelegesModels);
                }
            case ResellerAction.UPDATE_PRIVILEGE_ATTRIBUTE:
                {
                    var privileges = state.get('privileges');
                    privileges.forEach(function (i_privelegesModel, counter) {
                        if (i_privelegesModel.getPrivelegesId() == action.payload.privelegesId) {
                            i_privelegesModel.getColumns().forEach(function (group, c) {
                                if (group.get('tableName') == action.payload.tableName) {
                                    var value = Lib_1.Lib.BooleanToNumber(action.payload.value);
                                    var path = ['groups', c, action.payload.privelegesAttribute];
                                    var data = i_privelegesModel.getData().updateIn(path, function (v) { return value; });
                                    var updPriv = i_privelegesModel.setData(PrivelegesModel_1.PrivelegesModel, data);
                                    privileges = privileges.set(counter, updPriv);
                                }
                            });
                        }
                    });
                    return state.setIn(['privileges'], privileges);
                }
            case ResellerAction.UPDATE_PRIVILEGES:
                {
                    var privileges = state.get('privileges');
                    privileges.forEach(function (i_privelegesModel, counter) {
                        if (i_privelegesModel.getPrivelegesId() == action.payload.privelegesId) {
                            i_privelegesModel.getColumns().forEach(function (group, c) {
                                if (group.get('tableName') == action.payload.tableName) {
                                    var key = Lib_1.Lib.MapOfIndex(group.get('columns'), action.payload.index, 'first');
                                    var path = ['groups', c, 'columns', key];
                                    var data = i_privelegesModel.getData().updateIn(path, function (v) { return action.payload.updTotalBits; });
                                    var updPriv = i_privelegesModel.setData(PrivelegesModel_1.PrivelegesModel, data);
                                    privileges = privileges.set(counter, updPriv);
                                }
                            });
                        }
                    });
                    return state.setIn(['privileges'], privileges);
                }
            case ResellerAction.UPDATE_ACCOUNT:
                {
                    _.forEach(action.payload, function (v, k) {
                        var type = k.split('_')[0];
                        var key = k.split('_')[1];
                        var value = v;
                        var accountModels = state.getIn(['accounts']);
                        var index = accountModels.findIndex(function (i) { return i.getType().toLowerCase() === type.toLowerCase(); });
                        if (index == -1)
                            return state;
                        accountModels = accountModels.update(index, function (accountModel) {
                            return accountModel.setKey(AccountModel_1.AccountModel, key, value);
                        });
                        state = state.setIn(['accounts'], accountModels);
                    });
                    return state;
                }
            case ResellerAction.UPDATE_WHITELABEL:
                {
                    var whitelabel = state.get('whitelabel');
                    _.forEach(action.payload, function (value, key) {
                        value = Lib_1.Lib.BooleanToNumber(value);
                        whitelabel = whitelabel.setKey(WhitelabelModel_1.WhitelabelModel, key, value);
                    });
                    return state.setIn(['whitelabel'], whitelabel);
                }
            default:
                return state;
        }
    }
    exports_1("reseller", reseller);
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (ResellerAction_1) {
                ResellerAction = ResellerAction_1;
            },
            function (PrivelegesModel_1_1) {
                PrivelegesModel_1 = PrivelegesModel_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (AppModel_1_1) {
                AppModel_1 = AppModel_1_1;
            },
            function (WhitelabelModel_1_1) {
                WhitelabelModel_1 = WhitelabelModel_1_1;
            },
            function (AccountModel_1_1) {
                AccountModel_1 = AccountModel_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
        }
    }
});
