System.register(['@angular/core', "../../../business/BusinessUser", "../../../Lib", "@angular/forms", "angular2-redux-util", "../../../business/BusinessAction", "../../ng2-bs3-modal/components/modal", 'lodash', './AddUser.html!text', './AddUser.css!text', "./ChangePass"], function(exports_1, context_1) {
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
    var core_1, BusinessUser_1, Lib_1, forms_1, angular2_redux_util_1, BusinessAction_1, modal_1, _, AddUser_html_text_1, AddUser_css_text_1, ChangePass_1;
    var AddUser;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (BusinessUser_1_1) {
                BusinessUser_1 = BusinessUser_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
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
            function (_1) {
                _ = _1;
            },
            function (AddUser_html_text_1_1) {
                AddUser_html_text_1 = AddUser_html_text_1_1;
            },
            function (AddUser_css_text_1_1) {
                AddUser_css_text_1 = AddUser_css_text_1_1;
            },
            function (ChangePass_1_1) {
                ChangePass_1 = ChangePass_1_1;
            }],
        execute: function() {
            AddUser = (function () {
                function AddUser(appStore, businessActions, fb, modal) {
                    var _this = this;
                    this.appStore = appStore;
                    this.businessActions = businessActions;
                    this.fb = fb;
                    this.modal = modal;
                    this.accessKeysArr = _.times(8, _.uniqueId);
                    this.priveleges = [];
                    this.mode = null;
                    this.privilegeName = '';
                    this.notesForm = fb.group({
                        'userName': ['', forms_1.Validators.required],
                        'businessName': [],
                        accessKeys0: [],
                        accessKeys1: [],
                        accessKeys2: [],
                        accessKeys3: [],
                        accessKeys4: [],
                        accessKeys5: [],
                        accessKeys6: [],
                        accessKeys7: [],
                        'privileges': ['', forms_1.Validators.required]
                    });
                    this.sub = modal.onClose.subscribe(function () {
                        var userNameControl = _this.notesForm.controls['userName'];
                        var businessNameControl = _this.notesForm.controls['businessName'];
                        userNameControl.setValue('');
                        businessNameControl.setValue('');
                    });
                    this.userName = this.notesForm.controls['userName'];
                }
                AddUser.prototype.onKeyChange = function (event, index) {
                };
                AddUser.prototype.areEqual = function (group) {
                    var valid = true, val;
                    for (var name in group.controls) {
                        if (val === undefined) {
                            val = group.controls[name].value;
                            if (val.length < 4) {
                                valid = false;
                                break;
                            }
                        }
                        else {
                            if (val !== group.controls[name].value) {
                                valid = false;
                                break;
                            }
                        }
                    }
                    if (valid) {
                        return null;
                    }
                    return {
                        areEqual: true
                    };
                };
                AddUser.prototype.onPriveleges = function (event) {
                    this.privilegeName = event.target.value;
                };
                AddUser.prototype.onSubmit = function (event) {
                    var _this = this;
                    var pass = this.changePass.getPassword();
                    if (_.isNull(pass))
                        return;
                    var accessKeys = [];
                    _.forEach(event, function (value, key) {
                        if (key.indexOf('accessKey') > -1) {
                            var state = (value === false || _.isNull(value)) || value == 'false' ? false : true;
                            accessKeys.push(state);
                        }
                    });
                    var privilegeId = '-1';
                    var computedAccessMask = Lib_1.Lib.ComputeMask(accessKeys);
                    var privileges = this.appStore.getState().reseller.getIn(['privileges']);
                    privileges.forEach(function (privelegesModel) {
                        if (privelegesModel.getName() == _this.privilegeName) {
                            privilegeId = privelegesModel.getPrivelegesId();
                        }
                    });
                    var userData = {
                        accessMask: computedAccessMask,
                        privilegeId: privilegeId,
                        password: pass.pass1,
                        name: event.userName,
                        businessName: event.businessName,
                        businessId: this.businessId,
                    };
                    switch (this.mode) {
                        case 'fromSample': {
                            userData['businessId'] = this.businessId;
                            var businessUser = new BusinessUser_1.BusinessUser(userData);
                            this.appStore.dispatch(this.businessActions.duplicateAccount(businessUser));
                            break;
                        }
                        case 'fromClean': {
                            userData['businessId'] = 999;
                            var businessUser = new BusinessUser_1.BusinessUser(userData);
                            this.appStore.dispatch(this.businessActions.duplicateAccount(businessUser));
                            break;
                        }
                        case 'fromUser': {
                            var businessUser = new BusinessUser_1.BusinessUser(userData);
                            this.appStore.dispatch(this.businessActions.addNewBusinessUser(businessUser));
                            break;
                        }
                    }
                    this.modal.close();
                };
                AddUser.prototype.onChange = function (event) {
                    if (event.target.value.length < 3)
                        console.log('text too short for subject');
                };
                AddUser.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                };
                __decorate([
                    core_1.ViewChild(ChangePass_1.ChangePass), 
                    __metadata('design:type', ChangePass_1.ChangePass)
                ], AddUser.prototype, "changePass", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], AddUser.prototype, "businessId", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], AddUser.prototype, "priveleges", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], AddUser.prototype, "mode", void 0);
                AddUser = __decorate([
                    core_1.Component({
                        selector: 'addUser',
                        moduleId: __moduleName,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: AddUser_html_text_1.default,
                        styles: [AddUser_css_text_1.default]
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, BusinessAction_1.BusinessAction, forms_1.FormBuilder, modal_1.ModalComponent])
                ], AddUser);
                return AddUser;
            }());
            exports_1("AddUser", AddUser);
        }
    }
});
