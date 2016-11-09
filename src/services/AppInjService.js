System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var appInjectorRef, appInjService;
    return {
        setters:[],
        execute: function() {
            exports_1("appInjService", appInjService = function (injector) {
                if (injector)
                    appInjectorRef = injector;
                return appInjectorRef;
            });
        }
    }
});
