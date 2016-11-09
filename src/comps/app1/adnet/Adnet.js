System.register(["@angular/core", "angular2-redux-util", "@angular/router", 'lodash', 'bootbox', "../../../services/LocalStorage", "../../../adnet/AdnetActions"], function(exports_1, context_1) {
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
    var core_1, angular2_redux_util_1, router_1, _, bootbox, LocalStorage_1, AdnetActions_1;
    var Adnet;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (LocalStorage_1_1) {
                LocalStorage_1 = LocalStorage_1_1;
            },
            function (AdnetActions_1_1) {
                AdnetActions_1 = AdnetActions_1_1;
            }],
        execute: function() {
            Adnet = (function () {
                function Adnet(appStore, route, adnetActions, localStorage) {
                    var _this = this;
                    this.appStore = appStore;
                    this.route = route;
                    this.adnetActions = adnetActions;
                    this.localStorage = localStorage;
                    this.adnetCustomerId = -1;
                    this.adnetTokenId = -1;
                    this.adnetCustomerName = '';
                    this.showState = 'active';
                    this.disabled = false;
                    this.status = { isopen: false };
                    this.adnetCustomerId = this.localStorage.getItem('adnet_customer_id');
                    this.adnetTokenId = this.localStorage.getItem('adnet_token_id');
                    this.listenAdnetDataReady();
                    var business = this.appStore.getState().business;
                    this.businesses = business.getIn(['businesses']);
                    this.unsub1 = this.appStore.sub(function (i_businesses) {
                        _this.businesses = i_businesses;
                    }, 'business.businesses');
                }
                Adnet.prototype.listenAdnetDataReady = function () {
                    var _this = this;
                    this.unsub2 = this.adnetActions.onAdnetDataReady().subscribe(function (data) {
                        var adnet = _this.appStore.getState().adnet;
                        _this.adnetCustomers = adnet.getIn(['customers']);
                        _this.loadAdnetCustomerModel();
                    });
                };
                Adnet.prototype.loadAdnetCustomerModel = function () {
                    var _this = this;
                    if (!this.adnetCustomers)
                        return;
                    this.adnetCustomerModel = this.adnetCustomers.filter(function (i_adnetCustomerModel) {
                        return Number(_this.adnetCustomerId) == i_adnetCustomerModel.getId();
                    }).first();
                };
                Adnet.prototype.ngOnDestroy = function () {
                    this.unsub1();
                    this.unsub2.unsubscribe();
                };
                Adnet.prototype.onSelectedAdnetCustomer = function (i_businessModel) {
                    var _this = this;
                    this.showState = 'inactive';
                    this.appStore.dispatch(this.adnetActions.resetAdnet());
                    setTimeout(function () {
                        _this.adnetCustomerId = -1;
                        _this.adnetCustomerModel = null;
                        _this.adnetTokenId = null;
                    }, 100);
                    setTimeout(function () {
                        _this.adnetCustomerId = i_businessModel.getAdnetCustomerId();
                        _this.adnetTokenId = i_businessModel.getAdnetTokenId();
                        _this.adnetCustomerName = i_businessModel.getName();
                        if (_.isUndefined(_this.adnetCustomerId) || _.isNull(_this.adnetCustomerId) || _this.adnetCustomerId < 10 || _.isEmpty(_this.adnetCustomerId)) {
                            return bootbox.alert('This must be an old account and so it does not have an adnet token. Please login to it directly at least once so we cab generate an Adnet token for it.');
                        }
                        _this.localStorage.setItem('adnet_customer_id', _this.adnetCustomerId);
                        _this.localStorage.setItem('adnet_token_id', _this.adnetTokenId);
                        _this.appStore.dispatch(_this.adnetActions.getAdnet(_this.adnetCustomerId, _this.adnetTokenId));
                        _this.showState = 'active';
                    }, 110);
                };
                Adnet.prototype.toggled = function (open) {
                };
                Adnet = __decorate([
                    core_1.Component({
                        selector: 'Adnet',
                        host: {
                            '[style.display]': "'block'"
                        },
                        animations: [
                            core_1.trigger('showState', [core_1.state('inactive', core_1.style({
                                    opacity: 0
                                })), core_1.state('active', core_1.style({
                                    opacity: 1
                                })), core_1.transition('* => active', core_1.animate('100ms ease-out')), core_1.transition('* => inactive', core_1.animate('100ms ease-out'))])],
                        template: "\n        <br/>\n        <h3 style=\"float: right\">{{adnetCustomerName}}</h3>\n          <div>\n            <div (click)=\"$event.preventDefault()\">\n              <div class=\"btn-group\" dropdown (onToggle)=\"toggled($event)\" [(isOpen)]=\"status.isopen\">\n                  <button id=\"single-button\" type=\"button\" class=\"btn btn-primary\" dropdownToggle>\n                    Select sub-account \n                  <span class=\"caret\"></span>\n                </button>\n                  <ul dropdownMenu role=\"menu\" aria-labelledby=\"single-button\">\n                    <li *ngFor=\"let customer of businesses\" (click)=\"onSelectedAdnetCustomer(customer)\" role=\"menuitem\"><a class=\"dropdown-item\" href=\"#\">{{customer.getName()}}</a></li>\n                    <!--<li class=\"divider dropdown-divider\"></li>-->\n                    <!--<li role=\"menuitem\"><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>-->\n                  </ul>\n              </div>\n            </div>\n          </div>\n          <br/>\n          <div [@showState]=\"showState\">\n                <tabs>\n                    <tab [tabtitle]=\"'Configuration'\">\n                      <AdnetConfig [setAdnetCustomerModel]=\"adnetCustomerModel\"></AdnetConfig>\n                    </tab>\n                    <tab [tabtitle]=\"'Network'\">\n                      <AdnetNetwork [setAdnetCustomerModel]=\"adnetCustomerModel\"></AdnetNetwork>\n                    </tab>\n                    <tab [tabtitle]=\"'Billing'\">\n                      <h3>billing coming soon...</h3>\n                    </tab>\n                </tabs>\n          </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, router_1.ActivatedRoute, AdnetActions_1.AdnetActions, LocalStorage_1.LocalStorage])
                ], Adnet);
                return Adnet;
            }());
            exports_1("Adnet", Adnet);
        }
    }
});
