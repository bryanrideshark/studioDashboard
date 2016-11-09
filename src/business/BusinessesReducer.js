System.register(['immutable', './BusinessAction', "./BusinessModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var immutable_1, BusinessAction, BusinessModel_1;
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (BusinessAction_1) {
                BusinessAction = BusinessAction_1;
            },
            function (BusinessModel_1_1) {
                BusinessModel_1 = BusinessModel_1_1;
            }],
        execute: function() {
            exports_1("default",function (state, action) {
                if (state === void 0) { state = immutable_1.List(); }
                function indexOf(businessId) {
                    return state.findIndex(function (i) { return i.getBusinessId() === businessId; });
                }
                switch (action.type) {
                    case BusinessAction.REQUEST_BUSINESSES:
                        return state;
                    case BusinessAction.RECEIVE_BUSINESSES:
                        return immutable_1.List(action.businesses);
                    case BusinessAction.SET_BUSINESS_DATA:
                        return state.update(indexOf(action.businessId), function (business) {
                            return business.setKey(BusinessModel_1.BusinessModel, action.key, action.value);
                        });
                    default:
                        return state;
                }
            });
        }
    }
});
