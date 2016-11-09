System.register(["@angular/core", "angular2-redux-util", "./PrivelegesModel", "./PrivelegesTemplateModel", "../Lib", "immutable", "rxjs/Observable", "rxjs/add/operator/catch", "rxjs/add/operator/finally", "rxjs/add/observable/throw", "./AppModel", "./WhitelabelModel", "./AccountModel", "@angular/http", "../services/CreditService", "bootbox", "lodash", "xml2js"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, angular2_redux_util_1, PrivelegesModel_1, PrivelegesTemplateModel_1, Lib_1, Immutable, immutable_1, Observable_1, AppModel_1, WhitelabelModel_1, AccountModel_1, http_1, CreditService_1, bootbox, _, xml2js;
    var RECEIVE_PRIVILEGES, RECEIVE_PRIVILEGES_SYSTEM, UPDATE_PRIVILEGES, UPDATE_PRIVILEGE_NAME, UPDATE_PRIVILEGE_ATTRIBUTE, RECEIVE_DEFAULT_PRIVILEGE, RECEIVE_APPS, RECEIVE_WHITELABEL, RECEIVE_ACCOUNT_INFO, UPDATE_APP, UPDATE_DEFAULT_PRIVILEGE, UPDATE_WHITELABEL, UPDATE_ACCOUNT, ADD_PRIVILEGE, REMOVE_PRIVILEGE, PAY_SUBSCRIBER, ResellerAction;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (PrivelegesModel_1_1) {
                PrivelegesModel_1 = PrivelegesModel_1_1;
            },
            function (PrivelegesTemplateModel_1_1) {
                PrivelegesTemplateModel_1 = PrivelegesTemplateModel_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (Immutable_1) {
                Immutable = Immutable_1;
                immutable_1 = Immutable_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (AppModel_1_1) {
                AppModel_1 = AppModel_1_1;
            },
            function (WhitelabelModel_1_1) {
                WhitelabelModel_1 = WhitelabelModel_1_1;
            },
            function (AccountModel_1_1) {
                AccountModel_1 = AccountModel_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (CreditService_1_1) {
                CreditService_1 = CreditService_1_1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (_4) {
                _ = _4;
            },
            function (xml2js_1) {
                xml2js = xml2js_1;
            }],
        execute: function() {
            exports_1("RECEIVE_PRIVILEGES", RECEIVE_PRIVILEGES = 'RECEIVE_PRIVILEGES');
            exports_1("RECEIVE_PRIVILEGES_SYSTEM", RECEIVE_PRIVILEGES_SYSTEM = 'RECEIVE_PRIVILEGES_SYSTEM');
            exports_1("UPDATE_PRIVILEGES", UPDATE_PRIVILEGES = 'UPDATE_PRIVILEGES');
            exports_1("UPDATE_PRIVILEGE_NAME", UPDATE_PRIVILEGE_NAME = 'UPDATE_PRIVILEGE_NAME');
            exports_1("UPDATE_PRIVILEGE_ATTRIBUTE", UPDATE_PRIVILEGE_ATTRIBUTE = 'UPDATE_PRIVILEGE_ATTRIBUTE');
            exports_1("RECEIVE_DEFAULT_PRIVILEGE", RECEIVE_DEFAULT_PRIVILEGE = 'RECEIVE_DEFAULT_PRIVILEGE');
            exports_1("RECEIVE_APPS", RECEIVE_APPS = 'RECEIVE_APPS');
            exports_1("RECEIVE_WHITELABEL", RECEIVE_WHITELABEL = 'RECEIVE_WHITELABEL');
            exports_1("RECEIVE_ACCOUNT_INFO", RECEIVE_ACCOUNT_INFO = 'RECEIVE_ACCOUNT_INFO');
            exports_1("UPDATE_APP", UPDATE_APP = 'UPDATE_APP');
            exports_1("UPDATE_DEFAULT_PRIVILEGE", UPDATE_DEFAULT_PRIVILEGE = 'UPDATE_DEFAULT_PRIVILEGE');
            exports_1("UPDATE_WHITELABEL", UPDATE_WHITELABEL = 'UPDATE_WHITELABEL');
            exports_1("UPDATE_ACCOUNT", UPDATE_ACCOUNT = 'UPDATE_ACCOUNT');
            exports_1("ADD_PRIVILEGE", ADD_PRIVILEGE = 'ADD_PRIVILEGE');
            exports_1("REMOVE_PRIVILEGE", REMOVE_PRIVILEGE = 'REMOVE_PRIVILEGE');
            exports_1("PAY_SUBSCRIBER", PAY_SUBSCRIBER = 4);
            ResellerAction = (function (_super) {
                __extends(ResellerAction, _super);
                function ResellerAction(appStore, _http, creditService) {
                    _super.call(this, appStore);
                    this.appStore = appStore;
                    this._http = _http;
                    this.creditService = creditService;
                    this.m_privilegesSystemModels = [];
                    this.m_parseString = xml2js.parseString;
                }
                ResellerAction.prototype.privilegesModelFactory = function (i_defaultPrivId, i_defaultPrivName, i_existingGroups) {
                    var groups = immutable_1.List();
                    var tablesDst = [];
                    if (i_existingGroups) {
                        i_existingGroups.forEach(function (privilegesGroups) {
                            var tableName = privilegesGroups._attr.name;
                            var visible = privilegesGroups._attr.visible;
                            tablesDst.push(tableName);
                            var values = {
                                tableName: tableName,
                                visible: visible,
                                columns: Immutable.fromJS(privilegesGroups.Tables["0"]._attr)
                            };
                            _.forEach(privilegesGroups._attr, function (v, k) {
                                values[k] = v;
                            });
                            var group = immutable_1.Map(values);
                            groups = groups.push(group);
                        });
                    }
                    this.m_privilegesSystemModels.forEach(function (privelegesTemplateModel) {
                        var srcTableName = privelegesTemplateModel.getTableName();
                        if (tablesDst.indexOf(srcTableName) == -1)
                            groups = groups.push(privelegesTemplateModel.getData());
                    });
                    var privilegesModel = new PrivelegesModel_1.PrivelegesModel({
                        privilegesId: i_defaultPrivId,
                        name: i_defaultPrivName,
                        groups: groups
                    });
                    return privilegesModel;
                };
                ResellerAction.prototype.appStatus = function (app, mode) {
                    var _this = this;
                    return function (dispatch) {
                        dispatch(_this.updatedApp(app, mode));
                        var appdb = _this.appStore.getState().appdb;
                        var url;
                        if (mode) {
                            url = appdb.get('appBaseUrlUser') + ("&command=InstallApp&appId=" + app.getAppId());
                        }
                        else {
                            url = appdb.get('appBaseUrlUser') + ("&command=UninstallApp&appId=" + app.getAppId());
                        }
                        _this._http.get(url)
                            .catch(function (err) {
                            bootbox.alert('Error when updating App mode');
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                        })
                            .map(function (result) {
                        }).subscribe();
                    };
                };
                ResellerAction.prototype.getResellerIsActive = function () {
                    var i_reseller = this.appStore.getState().reseller;
                    var whitelabelModel = i_reseller.getIn(['whitelabel']);
                    if (whitelabelModel && whitelabelModel.getAccountStatus() == PAY_SUBSCRIBER) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                ResellerAction.prototype.getResellerInfo = function () {
                    var _this = this;
                    var self = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var url = appdb.get('appBaseUrlUser') + "&command=GetBusinessUserInfo";
                        _this._http.get(url)
                            .map(function (result) {
                            var xmlData = result.text();
                            _this.m_parseString(xmlData, { attrkey: '_attr' }, function (err, result) {
                                if (err) {
                                    bootbox.alert('problem loading user info');
                                    return;
                                }
                                var whitelabel = {
                                    createAccountOption: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Application["0"].CreateAccount ? result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Application["0"].CreateAccount["0"]._attr.show : '',
                                    chatShow: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Chat["0"]._attr.show,
                                    twitterShow: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Twitter["0"]._attr.show,
                                    resellerSourceId: result.User.BusinessInfo[0].SourceInfo["0"]._attr.id,
                                    whitelabelEnabled: result.User.BusinessInfo["0"].WhiteLabel["0"]._attr.enabled,
                                    accountStatus: result.User.BusinessInfo["0"]._attr.accountStatus,
                                    applicationId: result.User.BusinessInfo["0"]._attr.applicationId,
                                    archiveState: result.User.BusinessInfo["0"]._attr.archiveState,
                                    businessDescription: result.User.BusinessInfo["0"]._attr.businessDescription,
                                    businessId: result.User.BusinessInfo["0"]._attr.businessId,
                                    companyName: result.User.BusinessInfo["0"]._attr.name,
                                    providerId: result.User.BusinessInfo["0"]._attr.providerId,
                                    resellerId: result.User.BusinessInfo["0"]._attr.resellerId,
                                    payerId: result.User.BusinessInfo["0"]._attr.payerId,
                                    linksContact: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Application["0"].Links["0"]._attr.contact,
                                    linksDownload: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Application["0"].Links["0"]._attr.download,
                                    linksHome: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Application["0"].Links["0"]._attr.home,
                                    logoLink: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Application["0"].Logo["0"]._attr.link,
                                    logoTooltip: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Application["0"].Logo["0"]._attr.tooltip,
                                    fileName: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Application["0"].Logo["0"]._attr.filename,
                                    bannerEmbedReference: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Banner["0"]._attr.embeddedReference,
                                    chatLink: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Chat["0"]._attr.link,
                                    mainMenuLink0: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["0"]._attr.href,
                                    mainMenuId0: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["0"]._attr.id,
                                    mainMenuLabel0: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["0"]._attr.label,
                                    mainMenuLink1: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["1"]._attr.href,
                                    mainMenuId1: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["1"]._attr.id,
                                    mainMenuLabel1: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["1"]._attr.label,
                                    mainMenuLink2: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["2"]._attr.href,
                                    mainMenuId2: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["2"]._attr.id,
                                    mainMenuLabel2: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["2"]._attr.label,
                                    mainMenuLink3: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["3"]._attr.href,
                                    mainMenuId3: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["3"]._attr.id,
                                    mainMenuLabel3: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["3"]._attr.label,
                                    mainMenuId4: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["4"]._attr.id,
                                    mainMenuLink4: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["4"]._attr.href,
                                    mainMenuLabel4: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"].Command["4"]._attr.label,
                                    icon: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"]._attr.icon,
                                    iconId: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"]._attr.id,
                                    iconLabel: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].MainMenu["0"].CommandGroup["0"]._attr.label,
                                    twitterLink: result.User.BusinessInfo["0"].WhiteLabel["0"].Studio["0"].Twitter["0"]._attr.link
                                };
                                var whitelabelModel = new WhitelabelModel_1.WhitelabelModel(whitelabel);
                                dispatch(self.receiveWhitelabel(whitelabelModel));
                                Lib_1.Lib.AppsXmlTemplate(function (err, xmlTemplate) {
                                    var isAppInstalled = function (i_appId) {
                                        var returns = 0;
                                        result.User.BusinessInfo["0"].InstalledApps["0"].App.forEach(function (i_app) {
                                            if (i_appId === i_app._attr.id)
                                                returns = i_app._attr.installed;
                                        });
                                        return returns;
                                    };
                                    var userApps = immutable_1.List();
                                    xmlTemplate.Apps.App.forEach(function (i_app) {
                                        var app = new AppModel_1.AppModel({
                                            desc: i_app.Description["0"],
                                            appName: i_app._attr.appName,
                                            appId: i_app._attr.id,
                                            installed: isAppInstalled(i_app._attr.id),
                                            moduleId: i_app.Components["0"].Component["0"]._attr.moduleId,
                                            uninstallable: i_app._attr.uninstallable,
                                            showInScene: i_app.Components["0"].Component["0"]._attr.showInScene,
                                            showInTimeline: i_app.Components["0"].Component["0"]._attr.showInTimeline,
                                            version: i_app.Components["0"].Component["0"]._attr.version
                                        });
                                        userApps = userApps.push(app);
                                    });
                                    dispatch(self.receiveApps(userApps));
                                });
                                Lib_1.Lib.PrivilegesXmlTemplate(false, null, null, function (err, xmlTemplate) {
                                    xmlTemplate.Privilege.Groups["0"].Group.forEach(function (table) {
                                        var values = {};
                                        _.forEach(table._attr, function (v, k) {
                                            values[k] = v;
                                        });
                                        values['tableName'] = table._attr.name;
                                        values['columns'] = Immutable.fromJS(table.Tables["0"]._attr);
                                        var privelegesSystemModel = new PrivelegesTemplateModel_1.PrivelegesTemplateModel(values);
                                        if (privelegesSystemModel.getColumnSize() > 0)
                                            self.m_privilegesSystemModels.push(privelegesSystemModel);
                                    });
                                    dispatch(self.receivePrivilegesSystem(self.m_privilegesSystemModels));
                                    var defaultPrivId = result.User.BusinessInfo[0].Privileges[0]._attr.defaultPrivilegeId;
                                    dispatch(self.receiveDefaultPrivilege(defaultPrivId));
                                    var privilegesModels = immutable_1.List();
                                    result.User.BusinessInfo["0"].Privileges["0"].Privilege.forEach(function (privileges) {
                                        var privilegesModel = self.privilegesModelFactory(privileges._attr.id, privileges._attr.name, privileges.Groups["0"].Group);
                                        privilegesModels = privilegesModels.push(privilegesModel);
                                    });
                                    dispatch(self.receivePrivileges(privilegesModels));
                                });
                            });
                        }).subscribe();
                    };
                };
                ResellerAction.prototype.getAccountInfo = function () {
                    var _this = this;
                    var self = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var url = appdb.get('appBaseUrlUser') + "&command=GetAccountInfo";
                        var accountModelList = immutable_1.List();
                        _this._http.get(url)
                            .map(function (result) {
                            var xmlData = result.text();
                            _this.m_parseString(xmlData, { attrkey: '_attr' }, function (err, result) {
                                if (err) {
                                    bootbox.alert('problem with account info');
                                    return;
                                }
                                ['Billing', 'Recurring', 'Shipping', 'Contact'].forEach(function (item) {
                                    var values = result.Account[item]["0"]._attr;
                                    if (_.isUndefined(values))
                                        values = {};
                                    values['type'] = item;
                                    var accountModel = new AccountModel_1.AccountModel(values);
                                    accountModelList = accountModelList.push(accountModel);
                                });
                                dispatch(self.receiveAccountInfo(accountModelList));
                            });
                        }).subscribe();
                    };
                };
                ResellerAction.prototype.createPrivilege = function () {
                    var _this = this;
                    return function (dispatch) {
                        var self = _this;
                        var privilegeDefault = _this.appStore.getState().reseller.getIn(['privilegeDefault']);
                        var privName = 'privilege ' + _.uniqueId();
                        Lib_1.Lib.PrivilegesXmlTemplate(true, privilegeDefault, self.appStore, function (err, template) {
                            template = template.replace(/>\s*/g, '>').replace(/\s*</g, '<').replace(/(\r\n|\n|\r)/gm, "");
                            template = template.replace(/<Privilege>/g, '').replace(/<\/Privilege>/g, '');
                            var appdb = _this.appStore.getState().appdb;
                            var url = appdb.get('appBaseUrlUser') + ("&command=AddPrivilege&privilegeName=" + privName);
                            var basicOptions = {
                                url: url,
                                method: http_1.RequestMethod.Post,
                                search: null,
                                body: template
                            };
                            var reqOptions = new http_1.RequestOptions(basicOptions);
                            var req = new http_1.Request(reqOptions);
                            _this._http.request(req)
                                .catch(function (err) {
                                bootbox.alert('Error when saving priveleges 1');
                                return Observable_1.Observable.throw(err);
                            })
                                .finally(function () {
                            })
                                .map(function (result) {
                                var privilegesId = result.text();
                                var privilegesModel = _this.privilegesModelFactory(privilegesId, privName);
                                dispatch(_this.addPrivilege(privilegesModel));
                            }).subscribe();
                        });
                    };
                };
                ResellerAction.prototype.deletePrivilege = function (privilegeId) {
                    var _this = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var url = appdb.get('appBaseUrlUser') + ("&command=DeletePrivilege&privilegeId=" + privilegeId);
                        _this._http.get(url)
                            .catch(function (err) {
                            bootbox.alert('Error when removing privilege');
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                        })
                            .map(function (result) {
                            dispatch(_this.removePrivilege(privilegeId));
                        }).subscribe();
                    };
                };
                ResellerAction.prototype.setDefaultPrivilege = function (privilegeId) {
                    var _this = this;
                    return function (dispatch) {
                        var appdb = _this.appStore.getState().appdb;
                        var url = appdb.get('appBaseUrlUser') + ("&command=SetPrivilegeAsDefault&privilegeId=" + privilegeId);
                        _this._http.get(url)
                            .catch(function (err) {
                            bootbox.alert('Error when setting default privileges');
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                        })
                            .map(function (result) {
                            dispatch(_this.updateDefaultPrivilege(privilegeId));
                        }).subscribe();
                    };
                };
                ResellerAction.prototype.saveAccountInfo = function (payload) {
                    var _this = this;
                    var validatedCreditCard = function () {
                        var expirationMonth = getStoreValue('Billing', 'expirationMonth');
                        var expirationYear = getStoreValue('Billing', 'expirationYear');
                        var cardNumber = getStoreValue('Billing', 'cardNumber');
                        if (cardNumber.match('XXX'))
                            return false;
                        var cardValidTest = _this.creditService.validateCardNumber(cardNumber);
                        if (!cardValidTest)
                            return false;
                        var expirationTest = _this.creditService.validateCardExpiry(expirationMonth, expirationYear);
                        if (!expirationTest)
                            return false;
                        return true;
                    };
                    var getStoreValue = function (table, key) {
                        var result = '';
                        var accounts = _this.appStore.getState().reseller.getIn(['accounts']).forEach(function (accountModel) {
                            if (accountModel.getType() == table)
                                return result = accountModel.getKey(key);
                        });
                        return _.isUndefined(result) ? '' : result;
                    };
                    return function (dispatch) {
                        dispatch(_this.updateAccountInfo(payload));
                        var cardInfo = '';
                        if (validatedCreditCard()) {
                            cardInfo = "\n                    cardType=\"" + getStoreValue('Billing', 'cardType') + "\" \n                    securityCode=\"" + getStoreValue('Billing', 'securityCode') + "\" \n                    expirationMonth=\"" + getStoreValue('Billing', 'expirationMonth') + "\"\n                    expirationYear=\"" + getStoreValue('Billing', 'expirationYear') + "\" \n                    cardNumber=\"" + getStoreValue('Billing', 'cardNumber') + "\"";
                        }
                        else {
                            console.log('not updating credit card info');
                        }
                        var template = "\n              <Account>\n                   <Contact firstName=\"" + getStoreValue('Contact', 'firstName') + "\" lastName=\"" + getStoreValue('Contact', 'lastName') + "\" email=\"" + getStoreValue('Contact', 'email') + "\" workPhone=\"" + getStoreValue('Contact', 'workPhone') + "\" cellPhone=\"" + getStoreValue('Contact', 'cellPhone') + "\" address1=\"" + getStoreValue('Contact', 'address1') + "\" address2=\"" + getStoreValue('Contact', 'address2') + "\" city=\"" + getStoreValue('Contact', 'city') + "\" state=\"" + getStoreValue('Contact', 'state') + "\" zipCode=\"" + getStoreValue('Contact', 'zipCode') + "\" />\n                   <Billing firstName=\"" + getStoreValue('Billing', 'firstName') + "\" lastName=\"" + getStoreValue('Billing', 'lastName') + "\" address1=\"" + getStoreValue('Billing', 'address1') + "\" address2=\"" + getStoreValue('Billing', 'address2') + "\" city=\"" + getStoreValue('Billing', 'city') + "\" state=\"" + getStoreValue('Billing', 'state') + "\" country=\"" + getStoreValue('Billing', 'country') + "\" zipCode=\"" + getStoreValue('Billing', 'zipCode') + "\" workPhone=\"" + getStoreValue('Billing', 'workPhone') + "\" cellPhone=\"" + getStoreValue('Billing', 'cellPhone') + "\" email=\"" + getStoreValue('Billing', 'email') + "\" " + cardInfo + " />\n                   <Shipping firstName=\"" + getStoreValue('Shipping', 'firstName') + "\" lastName=\"" + getStoreValue('Shipping', 'lastName') + "\" address1=\"" + getStoreValue('Shipping', 'address1') + "\" address2=\"" + getStoreValue('Shipping', 'address2') + "\" city=\"" + getStoreValue('Shipping', 'city') + "\" state=\"" + getStoreValue('Shipping', 'state') + "\" country=\"" + getStoreValue('Shipping', 'country') + "\" zipCode=\"" + getStoreValue('Shipping', 'zipCode') + "\" workPhone=\"" + getStoreValue('Shipping', 'workPhone') + "\" cellPhone=\"" + getStoreValue('Shipping', 'cellPhone') + "\" email=\"" + getStoreValue('Shipping', 'email') + "\" />\n                   <Recurring id=\"" + getStoreValue('Recurring', 'id') + "\" recurringMode=\"" + getStoreValue('Recurring', 'recurringMode') + "\" paymentStatus=\"" + getStoreValue('Recurring', 'paymentStatus') + "\" failMessage=\"" + getStoreValue('Recurring', 'failMessage') + "\" lastPayment=\"" + getStoreValue('Recurring', 'lastPayment') + "\" />\n                </Account>";
                        template = template.replace(/>\s*/g, '>').replace(/\s*</g, '<').replace(/(\r\n|\n|\r)/gm, "");
                        var appdb = _this.appStore.getState().appdb;
                        var url = appdb.get('appBaseUrlUser') + "&command=UpdateAccountInfo";
                        var basicOptions = {
                            url: url,
                            method: http_1.RequestMethod.Post,
                            search: null,
                            body: template
                        };
                        var reqOptions = new http_1.RequestOptions(basicOptions);
                        var req = new http_1.Request(reqOptions);
                        _this._http.request(req)
                            .catch(function (err) {
                            bootbox.alert('Error when accountInfo 1');
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                            console.log('SAVED !!!!!!!!!');
                        })
                            .map(function (result) {
                            if (result.status != 200)
                                bootbox.alert('Error when accountInfo 2');
                        }).subscribe();
                    };
                };
                ResellerAction.prototype.saveWhiteLabel = function (payload) {
                    var _this = this;
                    return function (dispatch) {
                        dispatch(_this.updateResellerInfo(payload));
                        var template = "\n            <Studio>\n              <Application>\n                <Logo tooltip=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'logoTooltip') + "\" \n                 link=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'logoLink') + "\" filename=\"Logo.jpg\"/>\n                <Links home=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'linksHome') + "\" \n                download=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'linksDownload') + "\" contact=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'linksContact') + "\"/>\n                <CreateAccount show=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'createAccountOption') + "\"/>\n              </Application>\n              <MainMenu>\n                <CommandGroup id=\"help\" label=\"Help\" icon=\"helpIcon\">\n                  <Command id=\"help1\" label=\"Visit site\" href=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'mainMenuLink0') + "\"/>\n                  <Command id=\"help2\" label=\"\" href=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'mainMenuLink1') + "\"/>\n                  <Command id=\"help3\" label=\"Support\" href=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'mainMenuLink2') + "\"/>\n                  <Command id=\"help4\" label=\"Report a bug\" href=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'mainMenuLink3') + "\"/>\n                  <Command id=\"about\" label=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'mainMenuLabel4') + "\" href=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'mainMenuLabel4') + "\"/>\n                </CommandGroup>\n              </MainMenu>\n              <Banner embeddedReference=\"0\"/>\n              <Twitter show=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'twitterShow') + "\" link=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'twitterLink') + "\"/>\n              <Chat show=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'chatShow') + "\" link=\"" + _this.appStore.getsKey('reseller', 'whitelabel', 'chatLink') + "\"/>\n            </Studio>";
                        template = template.replace(/>\s*/g, '>').replace(/\s*</g, '<').replace(/(\r\n|\n|\r)/gm, "");
                        var appdb = _this.appStore.getState().appdb;
                        var url = appdb.get('appBaseUrlUser') + ("&command=SaveWhiteLabel&useWhiteLabel=" + _this.appStore.getsKey('reseller', 'whitelabel', 'whitelabelEnabled') + "&resellerName=" + _this.appStore.getsKey('reseller', 'whitelabel', 'companyName') + "&defaultThemeId=1");
                        var basicOptions = {
                            url: url,
                            method: http_1.RequestMethod.Post,
                            search: null,
                            body: template
                        };
                        var reqOptions = new http_1.RequestOptions(basicOptions);
                        var req = new http_1.Request(reqOptions);
                        _this._http.request(req)
                            .catch(function (err) {
                            bootbox.alert('Error when whitelabel 1');
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                        })
                            .map(function (result) {
                            if (result.status != 200)
                                bootbox.alert('Error when whitelabel 2');
                        }).subscribe();
                    };
                };
                ResellerAction.prototype.savePrivileges = function (privelegesId, selPrivName) {
                    var _this = this;
                    return function (dispatch) {
                        var self = _this;
                        Lib_1.Lib.PrivilegesXmlTemplate(false, privelegesId, self.appStore, function (err, template) {
                            template = template.replace(/>\s*/g, '>').replace(/\s*</g, '<').replace(/(\r\n|\n|\r)/gm, "");
                            template = template.replace(/<Privilege>/g, '').replace(/<\/Privilege>/g, '');
                            var appdb = _this.appStore.getState().appdb;
                            var url = appdb.get('appBaseUrlUser') + ("&command=UpdatePrivilege&privilegeName=" + selPrivName + "&privilegeId=" + privelegesId);
                            var basicOptions = {
                                url: url,
                                method: http_1.RequestMethod.Post,
                                search: null,
                                body: template
                            };
                            var reqOptions = new http_1.RequestOptions(basicOptions);
                            var req = new http_1.Request(reqOptions);
                            _this._http.request(req)
                                .catch(function (err) {
                                bootbox.alert('Error when saving priveleges 1');
                                return Observable_1.Observable.throw(err);
                            })
                                .finally(function () {
                            })
                                .map(function (result) {
                                if (result.status != 200)
                                    bootbox.alert('Error when saving priveleges 2');
                            }).subscribe();
                        });
                    };
                };
                ResellerAction.prototype.addPrivilege = function (privelegesModel) {
                    return {
                        type: ADD_PRIVILEGE,
                        privelegesModel: privelegesModel
                    };
                };
                ResellerAction.prototype.receivePrivileges = function (privilegesModels) {
                    return {
                        type: RECEIVE_PRIVILEGES,
                        privilegesModels: privilegesModels
                    };
                };
                ResellerAction.prototype.receiveWhitelabel = function (whitelabelModel) {
                    return {
                        type: RECEIVE_WHITELABEL,
                        whitelabelModel: whitelabelModel
                    };
                };
                ResellerAction.prototype.receiveAccountInfo = function (accountModels) {
                    return {
                        type: RECEIVE_ACCOUNT_INFO,
                        accountModels: accountModels
                    };
                };
                ResellerAction.prototype.receiveDefaultPrivilege = function (privilegeId) {
                    return {
                        type: RECEIVE_DEFAULT_PRIVILEGE,
                        privilegeId: privilegeId
                    };
                };
                ResellerAction.prototype.updateDefaultPrivilege = function (privilegeId) {
                    return {
                        type: UPDATE_DEFAULT_PRIVILEGE,
                        privilegeId: privilegeId
                    };
                };
                ResellerAction.prototype.updateDefaultPrivilegeName = function (privilegeId, privilegeName) {
                    return {
                        type: UPDATE_PRIVILEGE_NAME,
                        privilegeId: privilegeId,
                        privilegeName: privilegeName
                    };
                };
                ResellerAction.prototype.updateResellerInfo = function (payload) {
                    return {
                        type: UPDATE_WHITELABEL,
                        payload: payload
                    };
                };
                ResellerAction.prototype.updateAccountInfo = function (payload) {
                    return {
                        type: UPDATE_ACCOUNT,
                        payload: payload
                    };
                };
                ResellerAction.prototype.receiveApps = function (apps) {
                    return {
                        type: RECEIVE_APPS,
                        apps: apps
                    };
                };
                ResellerAction.prototype.updatedApp = function (app, mode) {
                    return {
                        type: UPDATE_APP,
                        app: app,
                        mode: mode
                    };
                };
                ResellerAction.prototype.receivePrivilegesSystem = function (privelegesSystemModels) {
                    return {
                        type: RECEIVE_PRIVILEGES_SYSTEM,
                        privelegesSystemModels: privelegesSystemModels
                    };
                };
                ResellerAction.prototype.removePrivilege = function (privilegeId) {
                    return {
                        type: REMOVE_PRIVILEGE,
                        privilegeId: privilegeId
                    };
                };
                ResellerAction.prototype.updatePrivilegeAttribute = function (payload) {
                    return {
                        type: UPDATE_PRIVILEGE_ATTRIBUTE,
                        payload: payload
                    };
                };
                ResellerAction.prototype.updatePrivilegesSystem = function (payload) {
                    return {
                        type: UPDATE_PRIVILEGES,
                        payload: payload
                    };
                };
                ResellerAction = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, http_1.Http, CreditService_1.CreditService])
                ], ResellerAction);
                return ResellerAction;
            }(angular2_redux_util_1.Actions));
            exports_1("ResellerAction", ResellerAction);
        }
    }
});
