System.register(["@angular/core", "../../../business/BusinessAction", "angular2-redux-util", "bootbox", 'lodash', "../../../Lib", './UserInfo.html!text'], function(exports_1, context_1) {
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
    var core_1, BusinessAction_1, angular2_redux_util_1, bootbox, _, Lib_1, UserInfo_html_text_1, UserInfo_html_text_2;
    var UserInfo;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (BusinessAction_1_1) {
                BusinessAction_1 = BusinessAction_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (_1) {
                _ = _1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (UserInfo_html_text_1_1) {
                UserInfo_html_text_1 = UserInfo_html_text_1_1;
                UserInfo_html_text_2 = UserInfo_html_text_1_1;
            }],
        execute: function() {
            UserInfo = (function () {
                function UserInfo(appStore, businessAction, ref) {
                    this.appStore = appStore;
                    this.businessAction = businessAction;
                    this.ref = ref;
                    this.serverStats = [];
                    this.serverStatsCategories = [];
                    this.allowSharing = '';
                    var w = '150px';
                    this.stylesObj = {
                        input: {
                            'font-size': '0.7em',
                            'color': 'dodgerblue',
                            'overflow': 'hidden',
                            'width': w
                        },
                        label: {
                            'font-size': '0.7em',
                            'color': '#333333',
                            'overflow': 'hidden',
                            'white-space': 'nowrap',
                            'width': w
                        }
                    };
                    this.stylesDesc = {
                        input: {
                            'padding-bottom': '4px',
                            'font-size': '0.9em',
                            'color': 'dodgerblue',
                            'width': '200px',
                            'overflow': 'hidden'
                        },
                        label: {
                            'padding-bottom': '4px',
                            'font-size': '0.9em',
                            'color': '#333333',
                            'width': '240px',
                            'overflow': 'hidden'
                        }
                    };
                    this.samples = Lib_1.Lib.GetSamples();
                }
                ;
                Object.defineProperty(UserInfo.prototype, "user", {
                    set: function (i_simpleListItem) {
                        var businessUser = i_simpleListItem.item.item;
                        this.businessId = businessUser.getBusinessId();
                        this.userName = businessUser.getKey('name');
                        this.maxMonitors = businessUser.getKey('maxMonitors');
                        this.businessDescription = businessUser.getKey('businessDescription');
                        this.lastLogin = businessUser.getKey('lastLogin');
                        this.allowSharing = businessUser.getKey('allowSharing') == '0' ? '' : 'checked';
                        this.studioVersion = businessUser.getKey('studioLite') == 1 ? 'StudioLite' : 'StudioPro';
                        this.studioIcon = this.studioVersion == 'StudioLite' ? 'fa-circle-o' : 'fa-circle';
                        this.fromTemplateId = businessUser.getKey('fromTemplateId');
                        this.accountStatus = businessUser.getKey('accountStatus');
                        this.verifiedIcon = this.accountStatus == '2' ? 'fa-check' : 'fa-remove';
                        this.resellerId = businessUser.getKey('resellerId');
                    },
                    enumerable: true,
                    configurable: true
                });
                UserInfo.prototype.updateUi = function () {
                    try {
                        this.ref.detectChanges();
                    }
                    catch (e) {
                    }
                };
                UserInfo.prototype.getTemplateName = function () {
                    if (this.samples[this.fromTemplateId]) {
                        return this.samples[this.fromTemplateId].replace(',', ' | ');
                    }
                    else {
                        return '';
                    }
                };
                UserInfo.prototype.updateStore = function () {
                    this.appStore.dispatch(this.businessAction.updateAccount(this.businessId, this.userName, this.maxMonitors, this.allowSharing));
                };
                UserInfo.prototype.onChangeMonitors = function (event) {
                    var maxMonitors = parseInt(event);
                    if (_.isNaN(maxMonitors))
                        return bootbox.alert('Not a valid number entered');
                    this.maxMonitors = maxMonitors;
                    this.updateStore();
                };
                UserInfo.prototype.onChangeSharing = function (event) {
                    this.allowSharing = Lib_1.Lib.BooleanToNumber(event);
                    this.updateStore();
                };
                UserInfo.prototype.onChangeUserName = function (event) {
                    this.userName = event;
                    this.updateStore();
                };
                UserInfo.prototype.ngAfterViewChecked = function () {
                };
                UserInfo.prototype.ngOnDestroy = function () {
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], UserInfo.prototype, "user", null);
                UserInfo = __decorate([
                    core_1.Component({
                        selector: 'UserInfo',
                        moduleId: __moduleName,
                        template: UserInfo_html_text_1.default,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        styles: [UserInfo_html_text_2.default]
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, BusinessAction_1.BusinessAction, core_1.ChangeDetectorRef])
                ], UserInfo);
                return UserInfo;
            }());
            exports_1("UserInfo", UserInfo);
        }
    }
});
