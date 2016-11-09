System.register(["immutable", "./AdnetActions", "./AdnetCustomerModel", "./AdnetTargetModel", "./AdnetPackageModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var immutable_1, AdnetActions, AdnetCustomerModel_1, AdnetTargetModel_1, AdnetPackageModel_1;
    function adnet(state, action) {
        if (state === void 0) { state = immutable_1.Map(); }
        var getIndex = function (list, id) {
            return list.findIndex(function (i) { return i['getId']() === id; });
        };
        switch (action.type) {
            case AdnetActions.RESET_ADNET: {
                state = state.setIn(['customers'], immutable_1.List());
                state = state.setIn(['rates'], immutable_1.List());
                state = state.setIn(['pairs'], immutable_1.List());
                state = state.setIn(['packages'], immutable_1.List());
                state = state.setIn(['targets'], immutable_1.List());
                return state;
            }
            case AdnetActions.RECEIVE_CUSTOMERS: {
                return state.setIn(['customers'], action.customers);
            }
            case AdnetActions.RECEIVE_RATES: {
                return state.setIn(['rates'], action.rates);
            }
            case AdnetActions.RECEIVE_PAIRS: {
                return state.setIn(['pairs'], action.pairs);
            }
            case AdnetActions.RECEIVE_PACKAGES: {
                return state.setIn(['packages'], action.packages);
            }
            case AdnetActions.RECEIVE_TARGETS: {
                return state.setIn(['targets'], action.targets);
            }
            case AdnetActions.UPDATE_ADNET_RATE_TABLE: {
                var rates = state.getIn(['rates']);
                rates = rates.update(getIndex(rates, action.payload.rateId), function (rate) {
                    return rate.setField('rateMap', action.payload.rateTable);
                });
                rates = rates.update(getIndex(rates, action.payload.rateId), function (rate) {
                    rate = rate.setField('hourRate0', action.payload.adHourlyRate["0"]);
                    rate = rate.setField('hourRate1', action.payload.adHourlyRate["1"]);
                    rate = rate.setField('hourRate2', action.payload.adHourlyRate["2"]);
                    rate = rate.setField('hourRate3', action.payload.adHourlyRate["3"]);
                    return rate;
                });
                return state.setIn(['rates'], rates);
            }
            case AdnetActions.UPDATE_ADNET_PACKAGE: {
                var packages = state.getIn(['packages']);
                packages = packages.update(getIndex(packages, action.payload.Key), function (i_package) {
                    return i_package.setData(AdnetPackageModel_1.AdnetPackageModel, action.payload);
                });
                return state.setIn(['packages'], packages);
            }
            case AdnetActions.UPDATE_ADNET_PACKAGE_CONTENT: {
                var packages = state.getIn(['packages']);
                var adnetPackageModel;
                packages = packages.update(getIndex(packages, action.packageId), function (i_package) {
                    var contents = i_package.getContents();
                    for (var index in contents) {
                        if (contents[index].Key == action.payload.Key) {
                            var packageData = i_package.getData().toJS();
                            packageData.Value.contents[index] = action.payload;
                            return i_package.setData(AdnetPackageModel_1.AdnetPackageModel, packageData);
                        }
                    }
                    return adnetPackageModel;
                });
                return state.setIn(['packages'], packages);
            }
            case AdnetActions.REMOVE_ADNET_PACKAGE_CONTENT: {
                var packages = state.getIn(['packages']);
                var adnetPackageModel;
                packages = packages.update(getIndex(packages, action.payload.Key), function (i_package) {
                    var contents = i_package.getContents();
                    for (var i = 0; i < contents.length; i++) {
                        var content = contents[i];
                        if (content.Value.deleted)
                            continue;
                        if (content.Key != Number(action.payload.Value.packageContents.delete[0]))
                            continue;
                        contents.splice(i, 1);
                        var packageData = i_package.getData().toJS();
                        packageData.Value.contents = contents;
                        return i_package.setData(AdnetPackageModel_1.AdnetPackageModel, packageData);
                    }
                    return adnetPackageModel;
                });
                return state.setIn(['packages'], packages);
            }
            case AdnetActions.ADD_ADNET_PACKAGE_CONTENT: {
                var packages = state.getIn(['packages']);
                packages = packages.update(getIndex(packages, action.packageId), function (i_package) {
                    var packageData = i_package.getData().toJS();
                    packageData.Value.contents.push(action.payload);
                    return i_package.setData(AdnetPackageModel_1.AdnetPackageModel, packageData);
                });
                return state.setIn(['packages'], packages);
            }
            case AdnetActions.UPDATE_ADNET_TARGET: {
                var targets = state.getIn(['targets']);
                targets = targets.update(getIndex(targets, action.payload.Key), function (target) {
                    var a = target.setData(AdnetTargetModel_1.AdnetTargetModel, action.payload);
                    return a;
                });
                return state.setIn(['targets'], targets);
            }
            case AdnetActions.ADD_ADNET_RATE_TABLE: {
                var rates = state.getIn(['rates']);
                rates = rates.push(action.model);
                return state.setIn(['rates'], rates);
            }
            case AdnetActions.ADD_ADNET_TARGET: {
                var targets = state.getIn(['targets']);
                targets = targets.push(action.model);
                return state.setIn(['targets'], targets);
            }
            case AdnetActions.ADD_ADNET_PACKAGE: {
                var packages = state.getIn(['packages']);
                packages = packages.push(action.model);
                return state.setIn(['packages'], packages);
            }
            case AdnetActions.REMOVE_ADNET_RATE_TABLE: {
                var rates = state.getIn(['rates']);
                var updRateList = rates.filter(function (model) { return model.getId() !== action.id; });
                return state.setIn(['rates'], updRateList);
            }
            case AdnetActions.REMOVE_ADNET_PACKAGE: {
                var packages = state.getIn(['packages']);
                var updPkgList = packages.filter(function (model) { return model.getId() !== action.id; });
                return state.setIn(['packages'], updPkgList);
            }
            case AdnetActions.REMOVE_ADNET_TARGET: {
                var targets = state.getIn(['targets']);
                var updTargetList = targets.filter(function (model) { return model.getId() !== action.id; });
                return state.setIn(['targets'], updTargetList);
            }
            case AdnetActions.UPDATE_ADNET_CUSTOMER: {
                var customers = state.getIn(['customers']);
                customers = customers.update(getIndex(customers, action.payload.Key), function (customer) {
                    return customer.setData(AdnetCustomerModel_1.AdnetCustomerModel, action.payload);
                });
                return state.setIn(['customers'], customers);
            }
            case AdnetActions.RENAME_ADNET_RATE_TABLE: {
                var rates = state.getIn(['rates']);
                rates = rates.update(getIndex(rates, action.payload.rateId), function (rate) {
                    return rate.setField('label', action.payload.newLabel);
                });
                return state.setIn(['rates'], rates);
            }
            default:
                return state;
        }
    }
    exports_1("adnet", adnet);
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (AdnetActions_1) {
                AdnetActions = AdnetActions_1;
            },
            function (AdnetCustomerModel_1_1) {
                AdnetCustomerModel_1 = AdnetCustomerModel_1_1;
            },
            function (AdnetTargetModel_1_1) {
                AdnetTargetModel_1 = AdnetTargetModel_1_1;
            },
            function (AdnetPackageModel_1_1) {
                AdnetPackageModel_1 = AdnetPackageModel_1_1;
            }],
        execute: function() {
        }
    }
});
