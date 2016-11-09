System.register(["@angular/core", "../../../reseller/ResellerAction", "angular2-redux-util", "../../../Lib", "../../../services/CreditService", "@angular/forms", "lodash", "bootbox", './Account.html!text'], function(exports_1, context_1) {
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
    var core_1, ResellerAction_1, angular2_redux_util_1, Lib_1, CreditService_1, forms_1, _, bootbox, Account_html_text_1;
    var Account;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ResellerAction_1_1) {
                ResellerAction_1 = ResellerAction_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (CreditService_1_1) {
                CreditService_1 = CreditService_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (Account_html_text_1_1) {
                Account_html_text_1 = Account_html_text_1_1;
            }],
        execute: function() {
            Account = (function () {
                function Account(creditService, appStore, fb, resellerAction) {
                    var _this = this;
                    this.creditService = creditService;
                    this.appStore = appStore;
                    this.fb = fb;
                    this.resellerAction = resellerAction;
                    this.payments = [{
                            index: 1,
                            icon: 'fa-credit-card-alt',
                            name: 'credit card'
                        }, {
                            index: 2,
                            icon: 'fa-cc-paypal',
                            name: 'paypal'
                        }, {
                            index: 0,
                            icon: 'fa-times-circle',
                            name: 'disable'
                        }];
                    this.cards = ['visa', 'mastercard', 'amex', 'discover', 'paypal'];
                    this.companyName = '';
                    this.userName = '';
                    this.businessId = '';
                    this.payerId = '';
                    this.whiteLabelEnabled = true;
                    this.formInputs = {};
                    this.PAY_SUBSCRIBER = 4;
                    this.stylesObj = {
                        editIcon: {
                            'position': 'relative',
                            'top': '-8px'
                        },
                        input: {
                            'font-size': '1.7em',
                            'color': 'dodgerblue',
                            'overflow': 'hidden',
                            'width': '300px'
                        },
                        label: {
                            'font-size': '1.7em',
                            'color': '#333333',
                            'overflow': 'hidden',
                            'white-space': 'nowrap',
                            'width': '300px'
                        }
                    };
                    var i_reseller = this.appStore.getState().reseller;
                    this.whitelabelModel = i_reseller.getIn(['whitelabel']);
                    this.unsub = this.appStore.sub(function (whitelabelModel) {
                        _this.whitelabelModel = whitelabelModel;
                    }, 'reseller.whitelabel');
                    this.accountModels = i_reseller.getIn(['accounts']);
                    this.renderFormInputs();
                    this.unsub = this.appStore.sub(function (accountModels) {
                        _this.accountModels = accountModels;
                        _this.renderFormInputs();
                    }, 'reseller.accounts');
                    this.contGroup = fb.group({
                        'enterprise_login': [''],
                        'enterprise_pass1': [''],
                        'enterprise_pass2': [''],
                        'billing_cardNumber': [''],
                        'billing_expirationMonth': [''],
                        'billing_expirationYear': [''],
                        'billing_securityCode': [''],
                        'billing_firstName': [''],
                        'billing_lastName': [''],
                        'billing_address1': [''],
                        'billing_address2': [''],
                        'billing_city': [''],
                        'billing_state': [''],
                        'billing_country': [''],
                        'billing_zipCode': [''],
                        'billing_workPhone': [''],
                        'billing_cellPhone': [''],
                        'billing_email': [''],
                        'shipping_firstName': [''],
                        'shipping_lastName': [''],
                        'shipping_address1': [''],
                        'shipping_address2': [''],
                        'shipping_city': [''],
                        'shipping_state': [''],
                        'shipping_country': [''],
                        'shipping_zipCode': [''],
                        'shipping_workPhone': [''],
                        'shipping_cellPhone': [''],
                        'shipping_email': [''],
                        'contact_firstName': [''],
                        'contact_lastName': [''],
                        'contact_address1': [''],
                        'contact_city': [''],
                        'contact_state': [''],
                        'contact_zipCode': [''],
                        'contact_workPhone': [''],
                        'contact_cellPhone': [''],
                        'contact_email': ['']
                    });
                    _.forEach(this.contGroup.controls, function (value, key) {
                        _this.formInputs[key] = _this.contGroup.controls[key];
                    });
                    this.renderFormInputs();
                }
                Account.prototype.onInputBlur = function (event) {
                    var _this = this;
                    setTimeout(function () { return _this.appStore.dispatch(_this.resellerAction.saveAccountInfo(Lib_1.Lib.CleanCharForXml(_this.contGroup.value))); }, 1);
                };
                Account.prototype.onSubmit = function (value) {
                    var _this = this;
                    setTimeout(function () { return _this.appStore.dispatch(_this.resellerAction.saveAccountInfo(Lib_1.Lib.CleanCharForXml(_this.contGroup.value))); }, 1);
                };
                Account.prototype.renderFormInputs = function () {
                    var _this = this;
                    if (!this.accountModels)
                        return;
                    this.companyName = this.appStore.getsKey('reseller', 'whitelabel', 'companyName');
                    this.userName = this.appStore.getState().appdb.getIn(['credentials']).get('user');
                    this.businessId = this.appStore.getState().reseller.getIn(['whitelabel']).getKey('businessId');
                    this.payerId = this.appStore.getState().reseller.getIn(['whitelabel']).getKey('payerId');
                    this.accountModels.forEach(function (accountModel) {
                        var type = accountModel.getType().toLowerCase();
                        switch (type) {
                            case 'contact': {
                            }
                            case 'shipping': {
                            }
                            case 'billing': {
                                _.forEach(_this.formInputs, function (value, key) {
                                    if (_.isUndefined(key))
                                        return;
                                    var table = key.split('_')[0];
                                    if (table == type) {
                                        var field = key.split('_')[1];
                                        var data = accountModel.getKey(field);
                                        _this.formInputs[key].setValue(data);
                                    }
                                });
                                break;
                            }
                            case 'recurring': {
                                break;
                            }
                        }
                    });
                };
                ;
                Account.prototype.onCompanyNameEdited = function (value) {
                    this.appStore.dispatch(this.resellerAction.saveWhiteLabel(Lib_1.Lib.CleanCharForXml({ companyName: value })));
                };
                Account.prototype.getAccountModelKey = function (modelType, key) {
                    var result = '';
                    if (!this.accountModels)
                        return result;
                    this.accountModels.forEach(function (accountModel) {
                        if (accountModel.getType() == modelType && result == '') {
                            result = accountModel.getKey(key);
                            return;
                        }
                    });
                    return result;
                };
                Account.prototype.getRecurringValue = function (key) {
                    if (!this.accountModels)
                        return '';
                    var value = this.getAccountModelKey('Recurring', key);
                    if (_.isUndefined(value))
                        value = '';
                    switch (key) {
                        case 'recurringMode': {
                            if (value == '' && this.isAccountActive() && this.payerId == '-2')
                                return 'ANNUAL';
                            if (value == '')
                                return value;
                            var payment = _.find(this.payments, function (k) {
                                return Number(k.index) == Number(value);
                            });
                            return payment.index;
                        }
                        case 'paymentStatus': {
                            if (value == '' && this.isAccountActive())
                                return true;
                            if (value == '')
                                return value;
                            return (value == '1' ? true : false);
                        }
                        case 'lastPayment': {
                            if (value == '')
                                return value;
                            return value.split(' ')[0];
                        }
                    }
                };
                Account.prototype.onPaymentChanged = function (event) {
                    var _this = this;
                    var payment = event.target.value;
                    payment = _.find(this.payments, function (k) {
                        return k.name == payment;
                    });
                    var recurringMode = this.getRecurringValue('recurringMode');
                    switch (payment.name) {
                        case 'disable': {
                            bootbox.prompt("are you sure you want to cancel your current subscription? type [DELETE_NOW] to cancel association of all your screens", function (result) {
                                if (result == 'DELETE_NOW') {
                                    _this.appStore.dispatch(_this.resellerAction.updateAccountInfo({ "recurring_recurringMode": 0 }));
                                    _this.onSubmit(null);
                                }
                                else {
                                    _this.appStore.dispatch(_this.resellerAction.updateAccountInfo({ "recurring_recurringMode": 0 }));
                                    setTimeout(function () {
                                        _this.appStore.dispatch(_this.resellerAction.updateAccountInfo({ "recurring_recurringMode": recurringMode }));
                                        _this.onSubmit(null);
                                    }, 1);
                                }
                            });
                            break;
                        }
                        case 'credit card': {
                            this.appStore.dispatch(this.resellerAction.updateAccountInfo({ "recurring_recurringMode": payment.index }));
                            this.onSubmit(null);
                            break;
                        }
                        case 'paypal': {
                            bootbox.dialog({
                                message: "for new accounts only, please allow 24 hours for your account to be activated",
                                title: "Pay with PayPal",
                                closeButton: false,
                                buttons: {
                                    main: {
                                        label: "Cancel",
                                        callback: function () {
                                            _this.appStore.dispatch(_this.resellerAction.updateAccountInfo({ "recurring_recurringMode": 0 }));
                                            setTimeout(function () {
                                                _this.appStore.dispatch(_this.resellerAction.updateAccountInfo({ "recurring_recurringMode": recurringMode }));
                                                _this.onSubmit(null);
                                            }, 1);
                                        }
                                    },
                                    success: {
                                        label: "Connect to Paypal now",
                                        className: "btn-success",
                                        callback: function () {
                                            if (!_this.onPaypalConnect()) {
                                                _this.appStore.dispatch(_this.resellerAction.updateAccountInfo({ "recurring_recurringMode": 0 }));
                                                setTimeout(function () {
                                                    _this.appStore.dispatch(_this.resellerAction.updateAccountInfo({ "recurring_recurringMode": recurringMode }));
                                                    _this.onSubmit(null);
                                                }, 1);
                                            }
                                            else {
                                                _this.appStore.dispatch(_this.resellerAction.updateAccountInfo({ "recurring_recurringMode": payment.index }));
                                                _this.onSubmit(null);
                                            }
                                        }
                                    }
                                }
                            });
                            break;
                        }
                    }
                };
                Account.prototype.onPaypalConnect = function () {
                    var url = "https://galaxy.signage.me/WebService/CreateResellerRecurring.aspx?resellerId=" + this.businessId;
                    var newWin = window.open(url, '_blank');
                    if (!newWin || newWin.closed || typeof newWin.closed == 'undefined') {
                        bootbox.alert('Popup blocked, please allow popups from this site in your browser settings');
                        return false;
                    }
                    return true;
                };
                Account.prototype.getSelectedPayment = function (i_recurringMode) {
                    var recurringMode = this.getAccountModelKey('Recurring', 'recurringMode');
                    if (i_recurringMode.index == recurringMode)
                        return 'selected';
                    return '';
                };
                Account.prototype.isAccountActive = function () {
                    return this.resellerAction.getResellerIsActive();
                };
                Account.prototype.onUpdateCreditCard = function (event) {
                    var _this = this;
                    var cardNumber = this.contGroup.controls['billing_cardNumber'].value;
                    var cardTypeTest = this.creditService.parseCardType(cardNumber);
                    var cardValidTest = this.creditService.validateCardNumber(cardNumber);
                    var expirationTest = this.creditService.validateCardExpiry(this.contGroup.controls['billing_expirationMonth'].value, this.contGroup.controls['billing_expirationYear'].value);
                    if (cardNumber.match('XXX')) {
                        bootbox.dialog({
                            message: 'The credit used is masked with XXX, to update enter full credit card details',
                            title: "Cant update credit card with XXX mask",
                            buttons: {
                                danger: {
                                    label: "try again",
                                    className: "btn-danger",
                                    callback: function () {
                                        return;
                                    }
                                }
                            }
                        });
                        return;
                    }
                    if (!expirationTest) {
                        bootbox.dialog({
                            message: 'The credit card expiration date is invalid, use MM / YY',
                            title: "expiration problem",
                            buttons: {
                                danger: {
                                    label: "try again",
                                    className: "btn-danger",
                                    callback: function () {
                                        return;
                                    }
                                }
                            }
                        });
                        return;
                    }
                    if (!cardValidTest) {
                        bootbox.dialog({
                            message: 'The credit card number entered is invalid, please try again...',
                            title: "credit card number problem",
                            buttons: {
                                danger: {
                                    label: "try again",
                                    className: "btn-danger",
                                    callback: function () {
                                    }
                                }
                            }
                        });
                        return;
                    }
                    bootbox.dialog({
                        message: 'for new accounts only, please allow 24 hours for your account to be activated',
                        title: "credit card updated",
                        buttons: {
                            success: {
                                label: "thank you",
                                className: "btn-primary",
                                callback: function () {
                                    _this.onSubmit(null);
                                }
                            }
                        }
                    });
                };
                Account.prototype.onWhiteLabelChange = function (value) {
                    value = value ? 1 : 0;
                    this.appStore.dispatch(this.resellerAction.updateResellerInfo({ whitelabelEnabled: value }));
                };
                Account.prototype.isCardSelected = function (i_cardType) {
                    var recurringMode = this.getRecurringValue('recurringMode');
                    if (recurringMode == 2 && i_cardType == 'paypal')
                        return true;
                    if (recurringMode == 2 && i_cardType != 'paypal')
                        return false;
                    var cardNumber = this.contGroup.controls['billing_cardNumber'].value;
                    if (_.isUndefined(cardNumber))
                        return false;
                    if (cardNumber.charAt(0) == 'X')
                        return false;
                    var cardType = this.creditService.parseCardType(cardNumber);
                    if (_.isNull(cardType))
                        return false;
                    if (cardType != i_cardType)
                        return false;
                    return true;
                };
                Account.prototype.ngOnDestroy = function () {
                    this.unsub();
                };
                Account = __decorate([
                    core_1.Component({
                        selector: 'accounts',
                        moduleId: __moduleName,
                        providers: [CreditService_1.CreditService],
                        styles: ["\n        .faded {\n            opacity: 0.3;\n        }\n    "],
                        host: {
                            '(input-blur)': 'onInputBlur($event)',
                            '[style.display]': "'block'"
                        },
                        animations: [],
                        changeDetection: core_1.ChangeDetectionStrategy.Default,
                        template: Account_html_text_1.default
                    }), 
                    __metadata('design:paramtypes', [CreditService_1.CreditService, angular2_redux_util_1.AppStore, forms_1.FormBuilder, ResellerAction_1.ResellerAction])
                ], Account);
                return Account;
            }());
            exports_1("Account", Account);
        }
    }
});
