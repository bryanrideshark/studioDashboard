System.register(["@angular/core", "../../../reseller/PrivelegesModel", "angular2-redux-util", "../../../reseller/ResellerAction", "../../../Lib"], function(exports_1, context_1) {
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
    var core_1, PrivelegesModel_1, angular2_redux_util_1, ResellerAction_1, Lib_1;
    var PrivModeEnum, PrivilegesDetails;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (PrivelegesModel_1_1) {
                PrivelegesModel_1 = PrivelegesModel_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (ResellerAction_1_1) {
                ResellerAction_1 = ResellerAction_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            }],
        execute: function() {
            (function (PrivModeEnum) {
                PrivModeEnum[PrivModeEnum["ADD"] = 0] = "ADD";
                PrivModeEnum[PrivModeEnum["DEL"] = 1] = "DEL";
                PrivModeEnum[PrivModeEnum["UPD"] = 2] = "UPD";
            })(PrivModeEnum || (PrivModeEnum = {}));
            PrivilegesDetails = (function () {
                function PrivilegesDetails(appStore, resellerAction) {
                    var _this = this;
                    this.appStore = appStore;
                    this.resellerAction = resellerAction;
                    this.PrivModeEnum = PrivModeEnum;
                    var i_reseller = this.appStore.getState().reseller;
                    this.m_privelegesSystemModelList = i_reseller.getIn(['privilegesSystem']);
                    this.unsub = this.appStore.sub(function (privelegesSystemModel) {
                        _this.m_privelegesSystemModelList = privelegesSystemModel;
                    }, 'reseller.privilegesSystem');
                }
                Object.defineProperty(PrivilegesDetails.prototype, "selected", {
                    set: function (i_selected) {
                        this.m_selected = i_selected;
                    },
                    enumerable: true,
                    configurable: true
                });
                PrivilegesDetails.prototype.calcMask = function (i_privModeEnum, i_adding, i_totalBits) {
                    switch (i_privModeEnum) {
                        case PrivModeEnum.UPD: {
                            if (i_adding) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        }
                        case PrivModeEnum.ADD: {
                            if (i_adding) {
                                return 3;
                            }
                            else {
                                return 1;
                            }
                        }
                        case PrivModeEnum.DEL: {
                            if (i_adding) {
                                return 7;
                            }
                            else {
                                return i_totalBits - 4;
                            }
                        }
                    }
                };
                PrivilegesDetails.prototype.renderPrivilegesTable = function (privelegesSystemModel) {
                    return privelegesSystemModel.getColumns();
                };
                Object.defineProperty(PrivilegesDetails.prototype, "renderTableName", {
                    get: function () {
                        return function (field) {
                            return field[0];
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                PrivilegesDetails.prototype.updatePrivilegesGroupAttributes = function (event, i_privelegesSystemModel, privelegesAttribute) {
                    event.preventDefault();
                    var privelegesId = this.m_selected.getPrivelegesId();
                    var selPrivName = this.m_selected.getName();
                    var tableName = i_privelegesSystemModel.getTableName();
                    var selColumn = this.m_selected.getColumns();
                    selColumn = selColumn.find(function (k) {
                        if (k.get('tableName') == tableName)
                            return true;
                    });
                    var value = !Lib_1.Lib.BooleanToNumber(selColumn.get(privelegesAttribute));
                    var payload = {
                        privelegesId: privelegesId,
                        selPrivName: selPrivName,
                        privelegesAttribute: privelegesAttribute,
                        tableName: tableName,
                        value: value
                    };
                    this.appStore.dispatch(this.resellerAction.updatePrivilegeAttribute(payload));
                    this.appStore.dispatch(this.resellerAction.savePrivileges(privelegesId, selPrivName));
                };
                PrivilegesDetails.prototype.onPrivilegeChange = function (event) {
                    var selPrivName = this.m_selected.getName();
                    var privelegesId = this.m_selected.getPrivelegesId();
                    var index = event.item.index;
                    var adding = Boolean(event.value[0]);
                    var tableName = event.item.item.getTableName();
                    var privModeEnum = event.item.PrivModeEnum;
                    var selColumn = this.m_selected.getColumns();
                    selColumn = selColumn.find(function (k) {
                        if (k.get('tableName') == tableName)
                            return true;
                    });
                    var totalBits = Number(Lib_1.Lib.MapOfIndex(selColumn.get('columns'), index, 'last'));
                    var updTotalBits = this.calcMask(privModeEnum, adding, totalBits);
                    var payload = {
                        privelegesId: privelegesId,
                        selPrivName: selPrivName,
                        tableName: tableName,
                        index: index,
                        privModeEnum: privModeEnum,
                        updTotalBits: updTotalBits
                    };
                    this.appStore.dispatch(this.resellerAction.updatePrivilegesSystem(payload));
                    this.appStore.dispatch(this.resellerAction.savePrivileges(privelegesId, selPrivName));
                };
                PrivilegesDetails.prototype.renderPrivilegesGroupAttributes = function (i_privelegesSystemModel, i_privelegesAttribute) {
                    var tableName = i_privelegesSystemModel.getTableName();
                    var selColumn = this.m_selected.getColumns();
                    selColumn = selColumn.find(function (k) {
                        if (k.get('tableName') == tableName)
                            return true;
                    });
                    if (selColumn.get(i_privelegesAttribute) == '1')
                        return 'btn-primary';
                    return 'btn-secondary';
                };
                PrivilegesDetails.prototype.renderPrivilegesChecks = function (i_privelegesSystemModel, index, privModeEnum) {
                    var tableName = i_privelegesSystemModel.getTableName();
                    var selColumn = this.m_selected.getColumns();
                    selColumn = selColumn.find(function (k) {
                        if (k.get('tableName') == tableName)
                            return true;
                    });
                    if (!selColumn)
                        return [1];
                    var totalBits = Number(Lib_1.Lib.MapOfIndex(selColumn.get('columns'), index, 'last'));
                    var bit;
                    switch (privModeEnum) {
                        case PrivModeEnum.UPD: {
                            bit = 1;
                            break;
                        }
                        case PrivModeEnum.ADD: {
                            bit = 2;
                            break;
                        }
                        case PrivModeEnum.DEL: {
                            bit = 4;
                            break;
                        }
                    }
                    var result = bit & totalBits;
                    return [result];
                };
                PrivilegesDetails.prototype.ngOnDestroy = function () {
                    this.unsub();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', PrivelegesModel_1.PrivelegesModel), 
                    __metadata('design:paramtypes', [PrivelegesModel_1.PrivelegesModel])
                ], PrivilegesDetails.prototype, "selected", null);
                PrivilegesDetails = __decorate([
                    core_1.Component({
                        selector: 'privilegesDetails',
                        styles: ["\n        .btn-outlined {\n            position: relative;\n            top: 28px;\n            border-radius: 0;\n            -webkit-transition: all 0.3s;\n               -moz-transition: all 0.3s;\n                    transition: all 0.3s;\n        }\n    "],
                        template: "\n          <div *ngIf=\"!m_privelegesSystemModelList || !m_selected\">\n              <h3 style=\"text-align: center\">select | create privileges</h3>\n          </div>\n          <div *ngIf=\"m_privelegesSystemModelList && m_selected\">\n              <div *ngFor=\"let privilegesItem of m_privelegesSystemModelList\">\n                <hr/>\n                <h3>{{privilegesItem.getTableName()}}</h3>\n                <a *ngFor=\"let groupAttribute of privilegesItem.getGroupAttributes(privilegesItem, groupAttribute)\" \n                  (click)=\"updatePrivilegesGroupAttributes($event, privilegesItem, groupAttribute)\"\n                  href=\"#\" class=\"btn btn-outlined btn-xs {{renderPrivilegesGroupAttributes(privilegesItem, groupAttribute)}}\"\n                  role=\"button\">{{groupAttribute}}\n                </a>         \n                <simpleGridTable #userSimpleGridTable>\n                    <thead>\n                        <tr>\n                          <th></th>\n                          <th>delete</th>\n                          <th>add</th>\n                          <th>update</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr class=\"simpleGridRecord\" *ngFor=\"let item of renderPrivilegesTable(privilegesItem); let index=index\">\n                            <td style=\"width: 70%\" [editable]=\"false\" simpleGridData [processField]=\"renderTableName\" [item]=\"item\"></td>\n                            <td style=\"width: 10%\" (changed)=\"onPrivilegeChange($event)\" [item]=\"{item: privilegesItem, index: index, PrivModeEnum: PrivModeEnum.DEL}\" simpleGridDataChecks [checkboxes]=\"renderPrivilegesChecks(privilegesItem, index, PrivModeEnum.DEL)\"></td>\n                            <td style=\"width: 10%\" (changed)=\"onPrivilegeChange($event)\" [item]=\"{item: privilegesItem, index: index, PrivModeEnum: PrivModeEnum.ADD}\" simpleGridDataChecks [checkboxes]=\"renderPrivilegesChecks(privilegesItem, index, PrivModeEnum.ADD)\"></td>\n                            <td style=\"width: 10%\" (changed)=\"onPrivilegeChange($event)\" [item]=\"{item: privilegesItem, index: index, PrivModeEnum: PrivModeEnum.UPD}\" simpleGridDataChecks [checkboxes]=\"renderPrivilegesChecks(privilegesItem, index, PrivModeEnum.UPD)\"></td>\n                        </tr>\n                    </tbody>\n                </simpleGridTable>\n              </div>      \n          </div>\n    ",
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, ResellerAction_1.ResellerAction])
                ], PrivilegesDetails);
                return PrivilegesDetails;
            }());
            exports_1("PrivilegesDetails", PrivilegesDetails);
        }
    }
});
