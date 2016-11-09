System.register(["@angular/core", "@angular/router", "../../services/CommBroker", "../../../src/Conts"], function(exports_1, context_1) {
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
    var core_1, router_1, CommBroker_1, Conts_1;
    var App1;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (CommBroker_1_1) {
                CommBroker_1 = CommBroker_1_1;
            },
            function (Conts_1_1) {
                Conts_1 = Conts_1_1;
            }],
        execute: function() {
            App1 = (function () {
                function App1(commBroker, router) {
                    this.commBroker = commBroker;
                    this.router = router;
                    jQuery(".navbar-header .navbar-toggle").trigger("click");
                    jQuery('.navbar-nav').css({
                        display: 'block'
                    });
                    this.listenMenuChanges();
                }
                App1.prototype.ngOnInit = function () {
                    this.routerActive = true;
                    this.commBroker.getService(Conts_1.Consts.Services().App).appResized();
                };
                App1.prototype.listenMenuChanges = function () {
                    var self = this;
                    var unsub = self.commBroker.onEvent(Conts_1.Consts.Events().MENU_SELECTION).subscribe(function (e) {
                        if (!self.routerActive)
                            return;
                        var screen = (e.message);
                        self.router.navigate([("/App1/" + screen)]);
                    });
                };
                App1 = __decorate([
                    core_1.Component({
                        template: "\n        <div class=\"row\" style=\"margin-left: 0; margin-right: 0;\">\n          <Menu #appMennu class=\"noSpace\">\n            <MenuItem [fontAwesome]=\"'fa-dashboard'\" [tabtitle]=\"'Dashboard'\"></MenuItem>\n            <MenuItem [fontAwesome]=\"'fa-users'\" [tabtitle]=\"'Users'\"></MenuItem>\n            <MenuItem [fontAwesome]=\"'fa-lock'\" [tabtitle]=\"'Privileges'\"></MenuItem>\n            <MenuItem [fontAwesome]=\"'fa-adjust'\" [tabtitle]=\"'White label'\"></MenuItem>\n            <MenuItem [fontAwesome]=\"'fa-shopping-cart'\" [tabtitle]=\"'Apps'\"></MenuItem>\n            <MenuItem [fontAwesome]=\"'fa-cog'\" [tabtitle]=\"'Account'\"></MenuItem>\n            <MenuItem [fontAwesome]=\"'fa-shopping-cart'\" [tabtitle]=\"'Orders'\"></MenuItem>\n            <MenuItem [fontAwesome]=\"'fa-sitemap'\" [tabtitle]=\"'Adnet'\"></MenuItem>\n            <MenuItem [fontAwesome]=\"'fa-power-off'\" [tabtitle]=\"'Logout'\"></MenuItem>\n          </Menu>\n          <div id=\"mainPanelWrapWasp\" class=\"mainContent col-xs-12 col-sm-12 col-md-12 col-lg-11\">\n           <router-outlet></router-outlet>\n          </div>\n        </div>\n    ",
                        moduleId: __moduleName
                    }), 
                    __metadata('design:paramtypes', [CommBroker_1.CommBroker, router_1.Router])
                ], App1);
                return App1;
            }());
            exports_1("App1", App1);
        }
    }
});
