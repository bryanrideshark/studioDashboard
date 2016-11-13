import {
    List,
    Map
} from "immutable";
import * as AdnetActions from "./AdnetActions";
import {AdnetCustomerModel} from "./AdnetCustomerModel";
import {AdnetRateModel} from "./AdnetRateModel";
import {StoreModel} from "../models/StoreModel";
import {AdnetTargetModel} from "./AdnetTargetModel";
import {AdnetPackageModel} from "./AdnetPackageModel";

export function adnet(state: Map<string,any> = Map<string,any>(), action: any): Map<string,any> {

    var getIndex = function (list: List<any>, id: string) {
        return list.findIndex((i: StoreModel) => i['getId']() === id);
    }

    switch (action.type) {

        case AdnetActions.RESET_ADNET: {
            state = state.setIn(['customers'], List());
            state = state.setIn(['rates'], List());
            state = state.setIn(['pairs'], List());
            state = state.setIn(['packages'], List());
            state = state.setIn(['targets'], List());
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

        case AdnetActions.RECEIVE_TARGETS_SEARCH: {
            /** target_search **/
            state = state.setIn(['targets_search'], action.payload.adnetTargets);

            /** append new rates **/
            var rates: List<AdnetRateModel> = state.getIn(['rates']);
            action.payload.adnetRates.forEach((i_rate: AdnetRateModel) => {
                var found = rates.filter((ii_rate: AdnetRateModel) => {
                    return ii_rate.getId() == i_rate.getId();
                })
                if (found.size == 0)
                    rates = rates.push(i_rate)
            })
            state = state.setIn(['rates'], rates);

            /** append new customers **/
            var customers: List<AdnetCustomerModel> = state.getIn(['customers']);
            action.payload.adnetCustomers.forEach((i_customer: AdnetCustomerModel) => {
                var found = customers.filter((ii_customer: AdnetCustomerModel) => {
                    return ii_customer.getId() == i_customer.getId();
                })
                if (found.size == 0)
                    customers = customers.push(i_customer)
            })
            return state.setIn(['customers'], customers);
        }

        case AdnetActions.UPDATE_ADNET_RATE_TABLE: {
            var rates: List<AdnetRateModel> = state.getIn(['rates']);

            rates = rates.update(getIndex(rates, action.payload.rateId), (rate: AdnetRateModel) => {
                return rate.setField('rateMap', action.payload.rateTable)
            });
            rates = rates.update(getIndex(rates, action.payload.rateId), (rate: AdnetRateModel) => {
                rate = rate.setField('hourRate0', action.payload.adHourlyRate["0"])
                rate = rate.setField('hourRate1', action.payload.adHourlyRate["1"])
                rate = rate.setField('hourRate2', action.payload.adHourlyRate["2"])
                rate = rate.setField('hourRate3', action.payload.adHourlyRate["3"])
                return rate;
            });
            return state.setIn(['rates'], rates);
        }

        case AdnetActions.UPDATE_ADNET_PACKAGE: {
            var packages: List<AdnetPackageModel> = state.getIn(['packages'])
            packages = packages.update(getIndex(packages, action.payload.Key), (i_package: AdnetPackageModel) => {
                return i_package.setData<AdnetPackageModel>(AdnetPackageModel, action.payload)
            });
            return state.setIn(['packages'], packages);
        }

        case AdnetActions.UPDATE_ADNET_PACKAGE_CONTENT: {
            var packages: List<AdnetPackageModel> = state.getIn(['packages'])
            var adnetPackageModel;
            packages = packages.update(getIndex(packages, action.packageId), (i_package: AdnetPackageModel) => {
                var contents = i_package.getContents();
                for (var index in contents) {
                    if (contents[index].Key == action.payload.Key) {
                        var packageData = i_package.getData().toJS();
                        packageData.Value.contents[index] = action.payload;
                        return i_package.setData<AdnetPackageModel>(AdnetPackageModel, packageData)
                    }
                }
                return adnetPackageModel;
            });
            return state.setIn(['packages'], packages);
        }

        case AdnetActions.REMOVE_ADNET_PACKAGE_CONTENT: {
            var packages: List<AdnetPackageModel> = state.getIn(['packages'])
            var adnetPackageModel;
            packages = packages.update(getIndex(packages, action.payload.Key), (i_package: AdnetPackageModel) => {
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
                    return i_package.setData<AdnetPackageModel>(AdnetPackageModel, packageData)
                }
                return adnetPackageModel;
            });
            return state.setIn(['packages'], packages);
        }

        case AdnetActions.ADD_ADNET_PACKAGE_CONTENT: {
            var packages: List<AdnetPackageModel> = state.getIn(['packages'])
            packages = packages.update(getIndex(packages, action.packageId), (i_package: AdnetPackageModel) => {
                var packageData = i_package.getData().toJS();
                packageData.Value.contents.push(action.payload);
                return i_package.setData<AdnetPackageModel>(AdnetPackageModel, packageData)
            });
            return state.setIn(['packages'], packages);
        }

        case AdnetActions.UPDATE_ADNET_TARGET: {
            var targets: List<AdnetTargetModel> = state.getIn(['targets'])
            targets = targets.update(getIndex(targets, action.payload.Key), (target: AdnetTargetModel) => {
                var a = target.setData<AdnetTargetModel>(AdnetTargetModel, action.payload)
                return a;
            });
            return state.setIn(['targets'], targets);
        }

        case AdnetActions.ADD_ADNET_RATE_TABLE: {
            var rates: List<AdnetRateModel> = state.getIn(['rates']);
            rates = rates.push(action.model);
            return state.setIn(['rates'], rates);
        }

        case AdnetActions.ADD_ADNET_TARGET_WEB: {
            var targets: List<AdnetTargetModel> = state.getIn(['targets']);
            targets = targets.push(action.model);
            return state.setIn(['targets'], targets);
        }

        case AdnetActions.ADD_ADNET_TARGET_TO_PACKAGE: {
            var packages: List<AdnetPackageModel> = state.getIn(['packages'])
            packages = packages.update(getIndex(packages, action.packageId), (i_package: AdnetPackageModel) => {
                var packageData = i_package.getData().toJS();
                packageData.Value.targets.push(action.payload);
                return i_package.setData<AdnetPackageModel>(AdnetPackageModel, packageData)
            });
            return state.setIn(['packages'], packages);
        }

        case AdnetActions.ADD_ADNET_PACKAGE: {
            var packages: List<AdnetPackageModel> = state.getIn(['packages']);
            packages = packages.push(action.model);
            return state.setIn(['packages'], packages);
        }

        case AdnetActions.REMOVE_ADNET_RATE_TABLE: {
            var rates: List<AdnetRateModel> = state.getIn(['rates']);
            var updRateList: List<AdnetRateModel> = rates.filter((model: AdnetRateModel) => model.getId() !== action.id) as List<AdnetRateModel>;
            return state.setIn(['rates'], updRateList);
        }

        case AdnetActions.REMOVE_ADNET_PACKAGE: {
            var packages: List<AdnetPackageModel> = state.getIn(['packages']);
            var updPkgList: List<AdnetPackageModel> = packages.filter((model: AdnetPackageModel) => model.getId() !== action.id) as List<AdnetPackageModel>;
            return state.setIn(['packages'], updPkgList);
        }

        case AdnetActions.REMOVE_ADNET_TARGET: {
            var targets: List<AdnetTargetModel> = state.getIn(['targets']);
            var updTargetList: List<AdnetTargetModel> = targets.filter((model: AdnetTargetModel) => model.getId() !== action.id) as List<AdnetTargetModel>;
            return state.setIn(['targets'], updTargetList);
        }

        case AdnetActions.UPDATE_ADNET_CUSTOMER: {
            var customers: List<AdnetCustomerModel> = state.getIn(['customers'])
            customers = customers.update(getIndex(customers, action.payload.Key), (customer: AdnetCustomerModel) => {
                return customer.setData<AdnetCustomerModel>(AdnetCustomerModel, action.payload)
            });
            return state.setIn(['customers'], customers);
        }

        case AdnetActions.RENAME_ADNET_RATE_TABLE: {
            var rates: List<AdnetRateModel> = state.getIn(['rates']);
            rates = rates.update(getIndex(rates, action.payload.rateId), (rate: AdnetRateModel) => {
                return rate.setField('label', action.payload.newLabel)
            });
            return state.setIn(['rates'], rates);
        }

        default:
            return state;
    }
}
