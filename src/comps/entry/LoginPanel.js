System.register(["@angular/core", "@angular/router", "angular2-redux-util", "../../business/BusinessAction", "../../services/LocalStorage", "../../services/AuthService", "bootbox", "../../appdb/AppdbAction", "../../Lib"], function(exports_1, context_1) {
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
    var core_1, router_1, angular2_redux_util_1, BusinessAction_1, LocalStorage_1, AuthService_1, bootbox, AppdbAction_1, Lib_1;
    var Map, LoginPanel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (BusinessAction_1_1) {
                BusinessAction_1 = BusinessAction_1_1;
            },
            function (LocalStorage_1_1) {
                LocalStorage_1 = LocalStorage_1_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (AppdbAction_1_1) {
                AppdbAction_1 = AppdbAction_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            }],
        execute: function() {
            LoginPanel = (function () {
                function LoginPanel(appStore, localStorage, renderer, router, authService) {
                    var _this = this;
                    this.appStore = appStore;
                    this.localStorage = localStorage;
                    this.renderer = renderer;
                    this.router = router;
                    this.authService = authService;
                    this.m_showTwoFactor = false;
                    this.showLoginPanel = false;
                    this.loginState = '';
                    this.m_router = router;
                    this.m_user = '';
                    this.m_pass = '';
                    this.m_rememberMe = this.authService.getLocalstoreCred().r;
                    this.m_unsub = appStore.sub(function (credentials) {
                        var state = credentials.get('authenticated');
                        var reason = credentials.get('reason');
                        switch (state) {
                            case AppdbAction_1.AuthState.FAIL: {
                                _this.onAuthFail(reason);
                                break;
                            }
                            case AppdbAction_1.AuthState.PASS: {
                                _this.onAuthPass();
                                break;
                            }
                            case AppdbAction_1.AuthState.TWO_FACTOR: {
                                _this.m_showTwoFactor = true;
                                _this.m_rememberMe = false;
                                _this.loginState = 'default';
                                _this.localStorage.removeItem('remember_me');
                                Lib_1.Lib.BootboxHide();
                                break;
                            }
                        }
                    }, 'appdb.credentials', false);
                    this.m_unsub = appStore.sub(function (twoFactorStatus) {
                        if (twoFactorStatus.status) {
                            _this.onAuthPass();
                        }
                        else {
                            _this.onAuthFail(AuthService_1.FlagsAuth.WrongTwoFactor);
                        }
                    }, 'appdb.twoFactorStatus', false);
                    if (this.authService.getLocalstoreCred().u != '') {
                        this.showLoginPanel = false;
                        this.authService.authUser();
                    }
                    else {
                        this.showLoginPanel = true;
                    }
                }
                LoginPanel.prototype.passFocus = function () {
                    this.renderer.invokeElementMethod(this.userPass.nativeElement, 'focus', []);
                };
                LoginPanel.prototype.authUser = function () {
                    if (this.m_showTwoFactor) {
                        bootbox.dialog({
                            closeButton: true,
                            title: 'Checking two factor authentication',
                            message: 'please wait...'
                        });
                        var businessId = this.appStore.getsKey('reseller', 'whitelabel', 'businessId');
                        this.authService.authServerTwoFactor(this.m_twoFactor);
                    }
                    else {
                        this.authService.authUser(this.m_user, this.m_pass, this.m_rememberMe);
                    }
                };
                LoginPanel.prototype.onAuthPass = function () {
                    var _this = this;
                    Lib_1.Lib.BootboxHide();
                    this.loginState = 'active';
                    setTimeout(function () { return _this.m_router.navigate(['/App1/Dashboard']); }, 2000);
                };
                LoginPanel.prototype.onAuthFail = function (i_reason) {
                    Lib_1.Lib.BootboxHide(3500);
                    this.loginState = 'inactive';
                    var msg1;
                    var msg2;
                    switch (i_reason) {
                        case AuthService_1.FlagsAuth.WrongPass: {
                            msg1 = 'User or password are incorrect...';
                            msg2 = 'Please try again or click forgot password to reset your credentials';
                            break;
                        }
                        case AuthService_1.FlagsAuth.NotEnterprise: {
                            msg1 = 'Not an enterprise account';
                            msg2 = 'You must login with an Enterprise account, not an end user account...';
                            break;
                        }
                        case AuthService_1.FlagsAuth.WrongTwoFactor: {
                            msg1 = 'Invalid token';
                            msg2 = 'Wrong token entered or the 60 seconds limit may have exceeded, try again...';
                            break;
                        }
                    }
                    setTimeout(function () {
                        bootbox.dialog({
                            closeButton: true,
                            title: msg1,
                            message: msg2
                        });
                    }, 1200);
                    return false;
                };
                LoginPanel.prototype.ngOnDestroy = function () {
                    this.m_unsub();
                };
                __decorate([
                    core_1.ViewChild('userPass'), 
                    __metadata('design:type', core_1.ElementRef)
                ], LoginPanel.prototype, "userPass", void 0);
                LoginPanel = __decorate([
                    core_1.Injectable(),
                    core_1.Component({
                        selector: 'LoginPanel',
                        providers: [BusinessAction_1.BusinessAction, LocalStorage_1.LocalStorage],
                        animations: [
                            core_1.trigger('loginState', [
                                core_1.state('inactive', core_1.style({
                                    backgroundColor: 'red',
                                    transform: 'scale(1)',
                                    alpha: 0
                                })),
                                core_1.state('default', core_1.style({
                                    backgroundColor: '#313131',
                                    transform: 'scale(1)',
                                    alpha: 1
                                })),
                                core_1.state('active', core_1.style({
                                    backgroundColor: 'green',
                                    transform: 'scale(0.98)'
                                })),
                                core_1.transition('* => active', core_1.animate('600ms ease-out')),
                                core_1.transition('* => inactive', core_1.animate('2000ms ease-out'))
                            ]),
                            core_1.trigger('showTwoFactor', [
                                core_1.state('true', core_1.style({
                                    transform: 'scale(1)'
                                })),
                                core_1.transition(':enter', [
                                    core_1.animate('1s 2s cubic-bezier(0.455,0.03,0.515,0.955)', core_1.keyframes([
                                        core_1.style({
                                            opacity: 0,
                                            transform: 'translateX(-400px)'
                                        }),
                                        core_1.style({
                                            opacity: 1,
                                            transform: 'translateX(0)'
                                        })
                                    ]))
                                ]),
                                core_1.transition(':leave', core_1.animate('500ms cubic-bezier(.17,.67,.83,.67)'))
                            ])
                        ],
                        template: "\n                <div *ngIf=\"showLoginPanel\" [@loginState]=\"loginState\" class=\"login-page\" id=\"appLogin\">\n                <br/>\n                <br/>\n                  <form class=\"form-signin\" role=\"form\">\n                    <h2 class=\"form-signin-heading\"></h2>     \n                    <input (keyup.enter)=\"passFocus()\" #userName id=\"userName\" spellcheck=\"false\" type=\"text\" name=\"m_user\" [(ngModel)]=\"m_user\" class=\"input-underline input-lg form-control\" placeholder=\"user name\" required autofocus>\n                    <input (keyup.enter)=\"authUser()\" #userPass id=\"userPass\" type=\"password\" [(ngModel)]=\"m_pass\" name=\"m_pass\" class=\"input-underline input-lg form-control\" placeholder=\"password\" required>\n                    <div [@showTwoFactor]=\"m_showTwoFactor\" *ngIf=\"m_showTwoFactor\">\n                        <br/>     \n                        <br/>\n                        <span style=\"color: #989898; position: relative; left: -40px; top: 34px\" class=\"fa fa-key fa-2x pull-right\"></span>\n                        <input #twoFactor spellcheck=\"false\" type=\"text\" name=\"m_twoFactor\" [(ngModel)]=\"m_twoFactor\" class=\"input-underline input-lg form-control\" placeholder=\"enter two factor key\" required autofocus>\n                        <br/>     \n                        <br/>\n                    </div>\n                    <br/> \n                    <a id=\"loginButton\" (click)=\"authUser()\" type=\"submit\" class=\"btn rounded-btn\"> enterprise member login\n                     <span *ngIf=\"m_showTwoFactor\" style=\"font-size: 9px; max-height: 15px; display: block; padding: 0; margin: 0; position: relative; top: -20px\">with Google authenticator</span>\n                    </a>&nbsp;\n                    <!--<a type=\"submit\" class=\"btn rounded-btn\"> Register</a> -->\n                     <br/>\n                     <div *ngIf=\"!m_showTwoFactor\">\n                         <label class=\"checkbox\" style=\"padding-left: 20px\">\n                            <input #rememberMe type=\"checkbox\" [checked]=\"m_rememberMe\" (change)=\"m_rememberMe = rememberMe.checked\" />\n                          <span style=\"color: gray\"> remember me for next time </span>\n                    </label>\n                    </div>\n                    <br/>     \n                    <br/>\n                    <br/>\n                    <!--<hr class=\"hrThin\"/>-->\n                   <a href=\"http://www.digitalsignage.com/_html/benefits.html\" target=\"_blank\">not an enterprise member? learn more</a>\n                    <!-- todo: add forgot password in v2-->                    \n                    <div id=\"languageSelectionLogin\"></div>\n                  </form>\n                </div>\n               "
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, LocalStorage_1.LocalStorage, core_1.Renderer, router_1.Router, AuthService_1.AuthService])
                ], LoginPanel);
                return LoginPanel;
            }());
            exports_1("LoginPanel", LoginPanel);
        }
    }
});
