System.register(["@angular/core", "../../simplelist/SimpleList", "angular2-redux-util", "../../../business/BusinessAction", "../../ng2-bs3-modal/components/modal", "./UsersDetails", "immutable", "bootbox", "lodash", "../../../Lib", './Users.html!text', './Users.css!text'], function(exports_1, context_1) {
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
    var core_1, SimpleList_1, angular2_redux_util_1, BusinessAction_1, modal_1, UsersDetails_1, immutable_1, bootbox, _, Lib_1, Users_html_text_1, Users_css_text_1;
    var Users;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (SimpleList_1_1) {
                SimpleList_1 = SimpleList_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (BusinessAction_1_1) {
                BusinessAction_1 = BusinessAction_1_1;
            },
            function (modal_1_1) {
                modal_1 = modal_1_1;
            },
            function (UsersDetails_1_1) {
                UsersDetails_1 = UsersDetails_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
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
            function (Users_html_text_1_1) {
                Users_html_text_1 = Users_html_text_1_1;
            },
            function (Users_css_text_1_1) {
                Users_css_text_1 = Users_css_text_1_1;
            }],
        execute: function() {
            Users = (function () {
                function Users(appStore, businessAction) {
                    var _this = this;
                    this.appStore = appStore;
                    this.businessAction = businessAction;
                    this.businessesList = immutable_1.List();
                    this.samples = immutable_1.List();
                    this.showUserInfo = null;
                    this.selectedSampleBusinessId = -1;
                    this.accounts = ['Add new account from sample', 'Add new account from blank', 'Import existing account'];
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                    var i_businesses = this.appStore.getState().business;
                    var i_reseller = this.appStore.getState().reseller;
                    this.businessesList = i_businesses.getIn(['businesses']);
                    this.unsub = this.appStore.sub(function (i_businesses) {
                        _this.businessesList = i_businesses;
                    }, 'business.businesses');
                    this.samples = i_businesses.getIn(['samples']);
                    this.unsub = this.appStore.sub(function (i_samples) {
                        _this.samples = i_samples;
                    }, 'business.samples');
                    this.businessesUsers = i_businesses.getIn(['businessUsers']);
                    this.unsub2 = this.appStore.sub(function (businessUsers) {
                        _this.businessesUsers = businessUsers;
                        _this.onFilteredSelection();
                    }, 'business.businessUsers');
                    this.priveleges = i_reseller.getIn(['privileges']);
                    this.unsub3 = this.appStore.sub(function (privelegesModel) {
                        _this.priveleges = privelegesModel;
                    }, 'reseller.privileges');
                }
                Users.prototype.onAddUser = function (choice, fromSample) {
                    if (fromSample === void 0) { fromSample = false; }
                    switch (choice) {
                        case this.accounts[0]: {
                            this.modalSamples.open('lg');
                            break;
                        }
                        case this.accounts[1]: {
                            if (fromSample) {
                                return this.modalAddUserSamples.open('lg');
                            }
                            else {
                                return this.modalAddUserClean.open('lg');
                            }
                        }
                        case this.accounts[2]: {
                            this.modalAddUserExisting.open('lg');
                            break;
                        }
                    }
                };
                Users.prototype.onRemoveUser = function () {
                    var _this = this;
                    if (!this.businessesListFiltered || this.businessesListFiltered.size != 1)
                        return;
                    var businessModel = this.businessesListFiltered.first();
                    var businessId = businessModel.getBusinessId();
                    bootbox.prompt({
                        title: "are you sure you want to delete this account, this operation cannot be undone! type your enterprise account password to confirm deletion!",
                        inputType: "password",
                        buttons: {
                            confirm: {
                                className: "btn-danger",
                                label: "Delete"
                            }
                        },
                        callback: function (result) {
                            if (_.isNull(result))
                                return;
                            var password = _this.appStore.getState().appdb.get('credentials').get('pass');
                            if (result == password) {
                                _this.appStore.dispatch(_this.businessAction.removeBusiness(businessId));
                                _this.businessUsersListFiltered = null;
                                _this.showUserInfo = null;
                            }
                            else {
                                bootbox.alert('enterprise password did not match so account remains');
                            }
                        }
                    });
                };
                Users.prototype.onSelectedsample = function (businessId) {
                    this.selectedSampleBusinessId = businessId;
                    this.modalSamples.close();
                    this.onAddUser(this.accounts[1], true);
                };
                Users.prototype.onModalClose = function ($event) {
                };
                Users.prototype.onImportUser = function (event) {
                    var user = this.importUserName.nativeElement.value;
                    var pass = this.importUserPass.nativeElement.value;
                    if (user.length < 2 || pass.length < 2) {
                        bootbox.alert('user or password entered are too short');
                        return;
                    }
                    this.appStore.dispatch(this.businessAction.associateUser(user, pass));
                    this.modalAddUserExisting.close();
                };
                Users.prototype.getSelectedBusinessId = function () {
                    if (!this.businessUsersListFiltered)
                        return -1;
                    var first = this.businessesListFiltered.first();
                    if (_.isUndefined(first))
                        return -1;
                    return first.getBusinessId();
                };
                Users.prototype.getSelectedSampleBusinessId = function () {
                    return this.selectedSampleBusinessId;
                };
                Users.prototype.onShowUserInfo = function (selectedBusiness) {
                    this.onFilteredSelection();
                    this.showUserInfo = selectedBusiness;
                };
                Users.prototype.onFilteredSelection = function () {
                    var _this = this;
                    this.showUserInfo = null;
                    if (!this.simpleList)
                        return;
                    var businessSelected = this.simpleList.getSelected();
                    this.businessesListFiltered = this.businessesList.filter(function (businessModel) {
                        var businessId = businessModel.getBusinessId();
                        return businessSelected[businessId] && businessSelected[businessId].selected;
                    });
                    var arr = [];
                    this.businessesListFiltered.forEach(function (businessModel) {
                        var businessModelId = businessModel.getBusinessId();
                        _this.businessesUsers.forEach(function (businessUser) {
                            var businessUserId = businessUser.getBusinessId();
                            if (businessUserId == businessModelId) {
                                arr.push(businessUser);
                            }
                        });
                    });
                    this.businessUsersListFiltered = immutable_1.List(arr);
                };
                Users.prototype.getBusinesses = function (businessItem) {
                    return businessItem.getKey('name');
                };
                Users.prototype.getBusinessesId = function () {
                    return function (businessItem) {
                        return businessItem.getKey('businessId');
                    };
                };
                Users.prototype.ngOnDestroy = function () {
                    this.unsub();
                    this.unsub2();
                    this.unsub3();
                };
                __decorate([
                    core_1.ViewChild('simpleList'), 
                    __metadata('design:type', SimpleList_1.SimpleList)
                ], Users.prototype, "simpleList", void 0);
                __decorate([
                    core_1.ViewChild('modalSamples'), 
                    __metadata('design:type', modal_1.ModalComponent)
                ], Users.prototype, "modalSamples", void 0);
                __decorate([
                    core_1.ViewChild('modalAddUserClean'), 
                    __metadata('design:type', modal_1.ModalComponent)
                ], Users.prototype, "modalAddUserClean", void 0);
                __decorate([
                    core_1.ViewChild('modalAddUserSamples'), 
                    __metadata('design:type', modal_1.ModalComponent)
                ], Users.prototype, "modalAddUserSamples", void 0);
                __decorate([
                    core_1.ViewChild('importUserName'), 
                    __metadata('design:type', core_1.ElementRef)
                ], Users.prototype, "importUserName", void 0);
                __decorate([
                    core_1.ViewChild('importUserPass'), 
                    __metadata('design:type', core_1.ElementRef)
                ], Users.prototype, "importUserPass", void 0);
                __decorate([
                    core_1.ViewChild('modalAddUserExisting'), 
                    __metadata('design:type', modal_1.ModalComponent)
                ], Users.prototype, "modalAddUserExisting", void 0);
                __decorate([
                    core_1.ViewChild(UsersDetails_1.UsersDetails), 
                    __metadata('design:type', UsersDetails_1.UsersDetails)
                ], Users.prototype, "usersDetails", void 0);
                Users = __decorate([
                    core_1.Component({
                        selector: 'Users',
                        moduleId: __moduleName,
                        styles: [Users_css_text_1.default],
                        template: Users_html_text_1.default,
                        host: {
                            '[style.display]': "'block'"
                        },
                        animations: []
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, BusinessAction_1.BusinessAction])
                ], Users);
                return Users;
            }());
            exports_1("Users", Users);
        }
    }
});
