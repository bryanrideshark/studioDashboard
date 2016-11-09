System.register(["@angular/core", "@angular/forms", "angular2-redux-util", "../../Lib", "lodash", "../../appdb/AppdbAction", 'bootbox', "../../services/LocalStorage"], function(exports_1, context_1) {
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
    var core_1, forms_1, angular2_redux_util_1, Lib_1, _, AppdbAction_1, bootbox, LocalStorage_1;
    var Twofactor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (AppdbAction_1_1) {
                AppdbAction_1 = AppdbAction_1_1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (LocalStorage_1_1) {
                LocalStorage_1 = LocalStorage_1_1;
            }],
        execute: function() {
            Twofactor = (function () {
                function Twofactor(fb, localStorage, el, cd, appdbAction, appStore) {
                    var _this = this;
                    this.fb = fb;
                    this.localStorage = localStorage;
                    this.el = el;
                    this.cd = cd;
                    this.appdbAction = appdbAction;
                    this.appStore = appStore;
                    this.formInputs = {};
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                    this.contGroup = fb.group({
                        'TwofactorCont': ['']
                    });
                    _.forEach(this.contGroup.controls, function (value, key) {
                        _this.formInputs[key] = _this.contGroup.controls[key];
                    });
                    var twoFactorStatus = this.twoFactorStatus = this.appStore.getState().appdb.get('twoFactorStatus');
                    if (_.isUndefined(twoFactorStatus)) {
                        this.twoFactorStatus = false;
                    }
                    else {
                        this.twoFactorStatus = twoFactorStatus.status;
                    }
                    this.unsub = this.appStore.sub(function (i_twoFactorStatus) {
                        _this.twoFactorStatus = i_twoFactorStatus;
                        _this.changeTwoFactorStatus(i_twoFactorStatus.status);
                    }, 'appdb.twoFactorStatus');
                    this.renderFormInputs();
                }
                Twofactor.prototype.changeTwoFactorStatus = function (enabled) {
                    if (enabled) {
                        bootbox.alert('Congratulations, activated');
                        this.twoFactorStatus = true;
                        this.removeQrCode();
                        this.cd.markForCheck();
                        this.localStorage.removeItem('remember_me');
                        this.renderFormInputs();
                    }
                    else {
                        bootbox.alert('wrong token entered');
                    }
                };
                Twofactor.prototype.onActivate = function () {
                    if (this.activateToken.nativeElement.value.length < 6)
                        return bootbox.alert('token is too short');
                    this.appStore.dispatch(this.appdbAction.authenticateTwoFactor(this.activateToken.nativeElement.value, true));
                };
                Twofactor.prototype.addQrCode = function () {
                    var _this = this;
                    this.removeQrCode();
                    this.appdbAction.getQrCodeTwoFactor(function (qrCode) {
                        _this.removeQrCode();
                        jQuery(_this.el.nativeElement).append(qrCode);
                        var svg = jQuery(_this.el.nativeElement).find('svg').get(0);
                        svg.setAttribute('viewBox', '0 0 ' + 100 + ' ' + 100);
                        svg.setAttribute('width', '100%');
                    });
                };
                Twofactor.prototype.removeQrCode = function () {
                    jQuery(this.el.nativeElement).find('svg').remove();
                };
                Twofactor.prototype.onChangeStatus = function (i_twoFactorStatus) {
                    this.twoFactorStatus = i_twoFactorStatus;
                    if (this.twoFactorStatus) {
                        this.removeQrCode();
                    }
                    else {
                        this.addQrCode();
                        bootbox.alert('Token removed, be sure to delete the entry now from Google Authenticator as it is no longer valid');
                    }
                };
                Twofactor.prototype.renderFormInputs = function () {
                    this.formInputs['TwofactorCont'].setValue(this.twoFactorStatus);
                    if (this.twoFactorStatus) {
                        this.removeQrCode();
                    }
                    else {
                        this.addQrCode();
                    }
                };
                Twofactor.prototype.ngOnDestroy = function () {
                    this.unsub();
                };
                __decorate([
                    core_1.ViewChild('activate'), 
                    __metadata('design:type', Object)
                ], Twofactor.prototype, "activateToken", void 0);
                Twofactor = __decorate([
                    core_1.Component({
                        selector: 'Twofactor',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        moduleId: __moduleName,
                        template: "<div>\n                <form novalidate autocomplete=\"off\" [formGroup]=\"contGroup\">\n                    <div class=\"row\">\n                        <div class=\"inner userGeneral\">\n                            <div class=\"panel panel-default tallPanel\">\n                                <div class=\"panel-heading\">\n                                    <small class=\"release\">target properties\n                                        <i style=\"font-size: 1.4em\" class=\"fa fa-cog pull-right\"></i>\n                                    </small>\n                                <small class=\"debug\">{{me}}</small>\n                                </div>\n                                <ul class=\"list-group\">\n                                    <li *ngIf=\"twoFactorStatus\" class=\"list-group-item\">\n                                        Two factor login with Google Authenticator\n                                        <div class=\"material-switch pull-right\">\n                                            <input (change)=\"onChangeStatus(customerNetwork2.checked)\"\n                                                   [formControl]=\"contGroup.controls['TwofactorCont']\"\n                                                   id=\"customerNetwork2\" #customerNetwork2\n                                                   name=\"customerNetwork2\" type=\"checkbox\"/>\n                                            <label for=\"customerNetwork2\" class=\"label-primary\"></label>\n                                        </div>\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n                </form>\n            </div>\n            <div>\n                <div *ngIf=\"!twoFactorStatus\">\n                    <input #activate type=\"text\" class=\"longInput form-control\" placeholder=\"scan with Google Authenticator and enter token\">\n                    <button (click)=\"onActivate()\" style=\"margin-top: 5px\" class=\"btn btn-primary pull-right\">activate</button>\n                </div>\n            </div>\n    ",
                        styles: [".material-switch {position: relative;padding-top: 10px;}"]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, LocalStorage_1.LocalStorage, core_1.ElementRef, core_1.ChangeDetectorRef, AppdbAction_1.AppdbAction, angular2_redux_util_1.AppStore])
                ], Twofactor);
                return Twofactor;
            }());
            exports_1("Twofactor", Twofactor);
        }
    }
});
