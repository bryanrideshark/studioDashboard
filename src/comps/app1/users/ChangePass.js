System.register(['@angular/core', "@angular/forms", "angular2-redux-util", "../../../business/BusinessAction", "../../../business/BusinessUser", "../../ng2-bs3-modal/components/modal", './ChangePass.html!text', './ChangePass.css!text'], function(exports_1, context_1) {
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
    var core_1, forms_1, angular2_redux_util_1, BusinessAction_1, BusinessUser_1, modal_1, ChangePass_html_text_1, ChangePass_css_text_1;
    var ChangePass;
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
            function (BusinessAction_1_1) {
                BusinessAction_1 = BusinessAction_1_1;
            },
            function (BusinessUser_1_1) {
                BusinessUser_1 = BusinessUser_1_1;
            },
            function (modal_1_1) {
                modal_1 = modal_1_1;
            },
            function (ChangePass_html_text_1_1) {
                ChangePass_html_text_1 = ChangePass_html_text_1_1;
            },
            function (ChangePass_css_text_1_1) {
                ChangePass_css_text_1 = ChangePass_css_text_1_1;
            }],
        execute: function() {
            ChangePass = (function () {
                function ChangePass(appStore, businessActions, fb, modal) {
                    var _this = this;
                    this.appStore = appStore;
                    this.businessActions = businessActions;
                    this.fb = fb;
                    this.modal = modal;
                    this._showSubmit = true;
                    this.notesForm = fb.group({
                        matchingPassword: fb.group({
                            password: ['', forms_1.Validators.required],
                            confirmPassword: ['', forms_1.Validators.required]
                        }, { validator: this.areEqual })
                    });
                    this.passwordGroup = this.notesForm.controls['matchingPassword'];
                    this.sub = modal.onClose.subscribe(function () {
                        setTimeout(function () {
                            _this.passwordGroup.controls['password'].setValue('');
                            _this.passwordGroup.controls['confirmPassword'].setValue('');
                        }, 1500);
                    });
                }
                Object.defineProperty(ChangePass.prototype, "showSubmit", {
                    set: function (i_showSubmit) {
                        this._showSubmit = i_showSubmit;
                    },
                    enumerable: true,
                    configurable: true
                });
                ChangePass.prototype.areEqual = function (group) {
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
                ChangePass.prototype.onSubmit = function (event) {
                    this.appStore.dispatch(this.businessActions.updateBusinessPassword(this.businessUser.getName(), event.matchingPassword.password));
                    this.modal.close();
                };
                ChangePass.prototype.onChange = function (event) {
                    if (event.target.value.length < 3)
                        console.log('text too short for subject');
                };
                ChangePass.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                };
                ChangePass.prototype.getPassword = function () {
                    var pass1 = this.passwordGroup.controls['password'].value;
                    var pass2 = this.passwordGroup.controls['confirmPassword'].value;
                    if (pass1 == pass2 && pass1.length > 3) {
                        return {
                            pass1: pass1,
                            pass2: pass2
                        };
                    }
                    return null;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', BusinessUser_1.BusinessUser)
                ], ChangePass.prototype, "businessUser", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], ChangePass.prototype, "showSubmit", null);
                ChangePass = __decorate([
                    core_1.Component({
                        selector: 'changePass',
                        moduleId: __moduleName,
                        template: ChangePass_html_text_1.default,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        styles: [ChangePass_css_text_1.default]
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, BusinessAction_1.BusinessAction, forms_1.FormBuilder, modal_1.ModalComponent])
                ], ChangePass);
                return ChangePass;
            }());
            exports_1("ChangePass", ChangePass);
        }
    }
});
