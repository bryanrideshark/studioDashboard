System.register(['immutable', './BusinessAction', '../business/BusinessesReducer', "./BusinessModel", "./BusinessUser"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var immutable_1, BusinessAction, BusinessesReducer_1, BusinessModel_1, BusinessUser_1;
    function business(state, action) {
        if (state === void 0) { state = immutable_1.Map(); }
        function indexOfName(businessId, name) {
            return businessUsers.findIndex(function (i) {
                return i.getBusinessId() === businessId && i.getKey('name') == name;
            });
        }
        switch (action.type) {
            case BusinessAction.REQUEST_BUSINESSES:
                return state;
            case BusinessAction.RECEIVE_BUSINESSES:
                var businesses = state.getIn(['businesses']);
                var list = BusinessesReducer_1.default(businesses, action);
                return state.setIn(['businesses'], list);
            case BusinessAction.RECEIVE_BUSINESS_USER:
                return state.setIn(['businessUsers'], action.businessUsers);
            case BusinessAction.RECEIVE_BUSINESSES_SOURCES:
                return state.setIn(['businessSources'], action.businessSources);
            case BusinessAction.RECEIVE_BUSINESS_SAMPLES:
                return state.setIn(['samples'], action.sampleModels);
            case BusinessAction.RECEIVE_BUSINESSES_STATS:
                return state.setIn(['businessStats'], action.stats);
            case BusinessAction.SET_BUSINESS_DATA:
                var businesses = state.getIn(['businesses']);
                var list = BusinessesReducer_1.default(businesses, action);
                return state.setIn(['businesses'], list);
            case BusinessAction.SET_BUSINESS_ACCOUNT_DATA:
                {
                    var businesses = state.getIn(['businesses']);
                    var indexOfBusiness = function (businessId) {
                        return businesses.findIndex(function (i) { return i.getBusinessId() === businessId; });
                    };
                    businesses = businesses.update(indexOfBusiness(action.payload.businessId), function (business) {
                        var updBusiness = business.setKey(BusinessModel_1.BusinessModel, 'name', action.payload.name);
                        updBusiness = updBusiness.setKey(BusinessModel_1.BusinessModel, 'allowSharing', action.payload.allowSharing);
                        return updBusiness.setKey(BusinessModel_1.BusinessModel, 'maxMonitors', action.payload.maxMonitors);
                    });
                    return state.setIn(['businesses'], businesses);
                }
            case BusinessAction.CHANGE_BUSINESS_USER_NAME:
                {
                    var businessUsers = state.getIn(['businessUsers']);
                    if (indexOfName(action.businessId, action.value.newValue) != -1)
                        return state;
                    businessUsers = businessUsers.update(indexOfName(action.businessId, action.value.oldValue), function (business) {
                        return business.setKey(BusinessUser_1.BusinessUser, action.key, action.value.newValue);
                    });
                    return state.setIn(['businessUsers'], businessUsers);
                }
            case BusinessAction.SET_BUSINESS_USER_ACCESS:
                {
                    var businessUsers = state.getIn(['businessUsers']);
                    businessUsers = businessUsers.update(indexOfName(action.payload.businessId, action.payload.name), function (business) {
                        var businessUser = business.setKey(BusinessUser_1.BusinessUser, 'accessMask', action.payload.accessMask);
                        return businessUser.setKey(BusinessUser_1.BusinessUser, 'privilegeId', action.payload.privilegeId);
                    });
                    return state.setIn(['businessUsers'], businessUsers);
                }
            case BusinessAction.ADD_BUSINESS_USER:
                {
                    var businessUsers = state.getIn(['businessUsers']);
                    businessUsers = businessUsers.push(action.BusinessUser);
                    return state.setIn(['businessUsers'], businessUsers);
                }
            case BusinessAction.REMOVE_BUSINESS:
                {
                    var businesses = state.getIn(['businesses']);
                    var updatedBusinesses = businesses.filter(function (businessModel) { return businessModel.getBusinessId() !== action.businessId; });
                    return state.setIn(['businesses'], updatedBusinesses);
                }
            case BusinessAction.REMOVE_BUSINESS_USER:
                {
                    var businessUsers = state.getIn(['businessUsers']);
                    var updatedBusinessUsers = businessUsers.filter(function (businessUser) { return businessUser.getName() !== action.BusinessUser.getName(); });
                    return state.setIn(['businessUsers'], updatedBusinessUsers);
                }
            default:
                return state;
        }
    }
    exports_1("business", business);
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (BusinessAction_1) {
                BusinessAction = BusinessAction_1;
            },
            function (BusinessesReducer_1_1) {
                BusinessesReducer_1 = BusinessesReducer_1_1;
            },
            function (BusinessModel_1_1) {
                BusinessModel_1 = BusinessModel_1_1;
            },
            function (BusinessUser_1_1) {
                BusinessUser_1 = BusinessUser_1_1;
            }],
        execute: function() {
        }
    }
});
