System.register(["@angular/core", "angular2-redux-util", "../../../business/BusinessAction", "../../../Lib", "bootbox", "./UsersDetails.html!text", "./UsersDetails.css!text", "../../simplegridmodule/SimpleGridTable"], function(exports_1, context_1) {
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
    var core_1, angular2_redux_util_1, BusinessAction_1, Lib_1, bootbox, UsersDetails_html_text_1, UsersDetails_css_text_1, SimpleGridTable_1;
    var UsersDetails;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (BusinessAction_1_1) {
                BusinessAction_1 = BusinessAction_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (UsersDetails_html_text_1_1) {
                UsersDetails_html_text_1 = UsersDetails_html_text_1_1;
            },
            function (UsersDetails_css_text_1_1) {
                UsersDetails_css_text_1 = UsersDetails_css_text_1_1;
            },
            function (SimpleGridTable_1_1) {
                SimpleGridTable_1 = SimpleGridTable_1_1;
            }],
        execute: function() {
            UsersDetails = (function () {
                function UsersDetails(appStore, businessActions) {
                    this.appStore = appStore;
                    this.businessActions = businessActions;
                    this.showUserInfo = null;
                    this.sort = {
                        field: null,
                        desc: false
                    };
                    this.totalBusinessSelected = 0;
                }
                Object.defineProperty(UsersDetails.prototype, "businesses", {
                    set: function (i_businesses) {
                        this.m_businesses = i_businesses;
                        if (i_businesses && this.simpleGridTable && this.m_businesses.size != this.totalBusinessSelected) {
                            this.simpleGridTable.deselect();
                            this.totalBusinessSelected = this.m_businesses.size;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UsersDetails.prototype, "priveleges", {
                    set: function (i_priveleges) {
                        this.m_priveleges = i_priveleges;
                    },
                    enumerable: true,
                    configurable: true
                });
                UsersDetails.prototype.launchStudio = function () {
                    var _this = this;
                    var businessUser = this.selectedBusinessUser();
                    var businessId = businessUser.getBusinessId();
                    var businesses = this.appStore.getState().business.getIn(['businesses']);
                    var index = this.businessActions.findBusinessIndexById(businessId, businesses);
                    var businessModel = this.appStore.getState().business.getIn(['businesses']).get(index);
                    if (businessModel.getKey('studioLite') == '0') {
                        this.businessActions.getStudioProUrl(businessUser.getName(), function (url) {
                            var newWin = window.open(url, '_blank');
                            if (!newWin || newWin.closed || typeof newWin.closed == 'undefined')
                                bootbox.alert('Popup blocked, please allow popups from this site in your browser settings');
                        });
                    }
                    else {
                        this.businessActions.getUserPass(businessUser.getName(), function (pass) {
                            var user = businessModel.getKey('name');
                            var credentials = "user=" + user + ",pass=" + pass;
                            credentials = Lib_1.Lib.Base64().encode(credentials);
                            var url = _this.getStudioLiteURL();
                            url = url + '?param=' + credentials;
                            var newWin = window.open(url, '_blank');
                            if (!newWin || newWin.closed || typeof newWin.closed == 'undefined')
                                bootbox.alert('Popup blocked, please allow popups from this site in your browser settings');
                        });
                    }
                };
                UsersDetails.prototype.getStudioLiteURL = function () {
                    var origin = window.location.toString();
                    var pattern = '^(https|http)(:\/\/)(.*?)\/';
                    var re = new RegExp(pattern);
                    var server = origin.match(re)[3];
                    if (server.match(/gsignage.com/i) || server.match(/signage.me/i) || server.match(/localhost/i) || server.match(/digitalsignage.com/i))
                        return 'https://secure.digitalsignage.com/_studiolite-dist/studiolite.html';
                    return origin + "/_studiolite-dist/studiolite.html";
                };
                UsersDetails.prototype.onModalClose = function (result) {
                };
                UsersDetails.prototype.removeBusinessUser = function () {
                    var _this = this;
                    var businessUser = this.selectedBusinessUser();
                    bootbox.confirm("Are you sure you want to remove the user " + businessUser.getName() + "?", function (result) {
                        if (result) {
                            _this.appStore.dispatch(_this.businessActions.removeBusinessUser(businessUser));
                        }
                    });
                };
                UsersDetails.prototype.getBusinessIdSelected = function () {
                    if (!this.m_businesses || this.m_businesses.size == 0)
                        return -1;
                    return this.m_businesses.first().getBusinessId();
                };
                UsersDetails.prototype.onLabelEdited = function (event, field) {
                    var newValue = event.value;
                    var businessUser = event.item;
                    var oldValue = businessUser.getKey('name');
                    var businessId = businessUser.getBusinessId();
                    this.appStore.dispatch(this.businessActions.setBusinessUserName(businessId, field, {
                        newValue: newValue,
                        oldValue: oldValue
                    }));
                };
                UsersDetails.prototype.selectedBusinessUser = function () {
                    if (!this.simpleGridTable)
                        return null;
                    var selected = this.simpleGridTable.getSelected();
                    return selected ? this.simpleGridTable.getSelected().item : '';
                };
                UsersDetails.prototype.setPriveleges = function (event) {
                    var privilegeId = -1;
                    var privelegesName = event.value;
                    var businessUser = event.item;
                    var businessId = businessUser.getBusinessId();
                    var name = businessUser.getName();
                    var accessMask = businessUser.getAccessMask();
                    var privileges = this.appStore.getState().reseller.getIn(['privileges']);
                    privileges.forEach(function (privelegesModel) {
                        if (privelegesModel.getName() == privelegesName) {
                            privilegeId = privelegesModel.getPrivelegesId();
                        }
                    });
                    this.appStore.dispatch(this.businessActions.updateBusinessUserAccess(businessId, name, accessMask, privilegeId));
                };
                UsersDetails.prototype.selectedPriveleges = function () {
                    return function (privelegesModel, businessUser) {
                        return businessUser.privilegeId() == privelegesModel.getPrivelegesId() ? 'selected' : '';
                    };
                };
                UsersDetails.prototype.setAccessMask = function (event) {
                    var businessUser = event.item;
                    var businessId = businessUser.getBusinessId();
                    var name = businessUser.getName();
                    var privilegeId = businessUser.privilegeId();
                    var accessMask = event.value;
                    var computedAccessMask = Lib_1.Lib.ComputeMask(accessMask);
                    this.appStore.dispatch(this.businessActions.updateBusinessUserAccess(businessId, name, computedAccessMask, privilegeId));
                };
                UsersDetails.prototype.getAccessMask = function (businessUser) {
                    var accessMask = businessUser.getAccessMask();
                    return Lib_1.Lib.GetAccessMask(accessMask);
                };
                __decorate([
                    core_1.ViewChild(SimpleGridTable_1.SimpleGridTable), 
                    __metadata('design:type', SimpleGridTable_1.SimpleGridTable)
                ], UsersDetails.prototype, "simpleGridTable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], UsersDetails.prototype, "showUserInfo", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], UsersDetails.prototype, "businesses", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], UsersDetails.prototype, "priveleges", null);
                UsersDetails = __decorate([
                    core_1.Component({
                        selector: 'UsersDetails',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        moduleId: __moduleName,
                        styles: [UsersDetails_css_text_1.default],
                        template: UsersDetails_html_text_1.default
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, BusinessAction_1.BusinessAction])
                ], UsersDetails);
                return UsersDetails;
            }());
            exports_1("UsersDetails", UsersDetails);
        }
    }
});
