System.register(['@angular/core', 'rxjs/add/observable/fromEvent', 'rxjs/add/operator/do', 'rxjs/add/operator/merge', 'rxjs/add/operator/distinctUntilChanged', "angular2-redux-util"], function(exports_1, context_1) {
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
    var core_1, angular2_redux_util_1;
    var LogoCompany;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {},
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            }],
        execute: function() {
            LogoCompany = (function () {
                function LogoCompany(appStore, cdr) {
                    var _this = this;
                    this.appStore = appStore;
                    this.cdr = cdr;
                    this.images = [];
                    var i_reseller = this.appStore.getState().reseller;
                    this.whitelabelModel = i_reseller.getIn(['whitelabel']);
                    this.unsub = this.appStore.sub(function (whitelabelModel) {
                        _this.whitelabelModel = whitelabelModel;
                    }, 'reseller.whitelabel');
                    this.stylesObj = {
                        img: {
                            'color': '#333333',
                            'overflow': 'hidden',
                            'white-space': 'nowrap',
                            'width': '35px'
                        }
                    };
                }
                LogoCompany.prototype.getImageUrl = function () {
                    if (!this.whitelabelModel)
                        return [];
                    if (this.images.length > 0)
                        return this.images;
                    this.images.push('http://galaxy.signage.me/Resources/Resellers/' + this.getBusinessInfo('businessId') + '/Logo.jpg');
                    this.images.push('http://galaxy.signage.me/Resources/Resellers/' + this.getBusinessInfo('businessId') + '/Logo.png');
                    return this.images;
                };
                LogoCompany.prototype.getBusinessInfo = function (field) {
                    if (!this.whitelabelModel)
                        return '';
                    return this.appStore.getsKey('reseller', 'whitelabel', field);
                };
                LogoCompany.prototype.ngOnDestroy = function () {
                    this.unsub();
                };
                LogoCompany = __decorate([
                    core_1.Component({
                        selector: 'logoCompany',
                        changeDetection: core_1.ChangeDetectionStrategy.Default,
                        template: "\n            <div *ngIf=\"whitelabelModel\"> \n              <span style=\"color: gainsboro; font-family: Roboto\">{{getBusinessInfo('companyName')}}</span>\n              <imgLoader style=\"display: inline-block; padding-top: 4px\" [style]=\"stylesObj\" [circle]=\"true\" [images]=\"getImageUrl()\" [defaultImage]=\"'assets/person.png'\"></imgLoader>\n            </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, core_1.ChangeDetectorRef])
                ], LogoCompany);
                return LogoCompany;
            }());
            exports_1("LogoCompany", LogoCompany);
        }
    }
});
