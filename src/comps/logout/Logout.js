System.register(["@angular/core", "angular2-redux-util", "../../services/LocalStorage", 'lodash'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, angular2_redux_util_1, LocalStorage_1, _;
    var Logout;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (LocalStorage_1_1) {
                LocalStorage_1 = LocalStorage_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            Logout = (function () {
                function Logout(appStore, localStorage) {
                    this.appStore = appStore;
                    this.localStorage = localStorage;
                    var linksHome = this.appStore.getState().reseller.getIn(['whitelabel']).getKey('linksHome');
                    if (_.isEmpty(linksHome))
                        linksHome = 'http://www.digitalsignage.com';
                    this.localStorage.removeItem('remember_me');
                    jQuery('body').fadeOut(1000, function () {
                        window.location.replace(linksHome);
                    });
                }
                Logout = __decorate([
                    core_1.Component({
                        selector: 'Logout',
                        providers: [LocalStorage_1.LocalStorage],
                        template: "\n        <h1>Goodbye</h1>\n        <small>I am Logout component</small>\n        "
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, LocalStorage_1.LocalStorage])
                ], Logout);
                return Logout;
            }());
            exports_1("Logout", Logout);
        }
    }
});
