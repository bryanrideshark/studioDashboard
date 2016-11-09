System.register(['immutable', './OrdersAction'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var immutable_1, OrderActions;
    function orders(state, action) {
        if (state === void 0) { state = immutable_1.Map(); }
        switch (action.type) {
            case OrderActions.REQUEST_ORDERS:
                return state;
            case OrderActions.REQUEST_ORDER:
                return state.setIn(['statusOrder'], OrderActions.REQUEST_ORDER);
            case OrderActions.RECEIVED_ORDER:
                state = state.setIn(['statusOrder'], OrderActions.RECEIVED_ORDER);
                return state.setIn(['selectedOrder'], action.order);
            case OrderActions.RECEIVED_ORDERS:
                return state.setIn(['customerOrders'], action.orders);
            default:
                return state;
        }
    }
    exports_1("orders", orders);
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (OrderActions_1) {
                OrderActions = OrderActions_1;
            }],
        execute: function() {
        }
    }
});
