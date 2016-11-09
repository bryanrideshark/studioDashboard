System.register(["@angular/core", "../../simplelist/Simplelist", "angular2-redux-util", "../../../services/AuthService", "../../../reseller/ResellerAction", "bootbox"], function(exports_1, context_1) {
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
    var core_1, Simplelist_1, angular2_redux_util_1, AuthService_1, ResellerAction_1, bootbox;
    var Privileges;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Simplelist_1_1) {
                Simplelist_1 = Simplelist_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            },
            function (ResellerAction_1_1) {
                ResellerAction_1 = ResellerAction_1_1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            }],
        execute: function() {
            Privileges = (function () {
                function Privileges(appStore, resellerAction, authService) {
                    var _this = this;
                    this.appStore = appStore;
                    this.resellerAction = resellerAction;
                    this.authService = authService;
                    this.parts = [];
                    this.addToCart = new core_1.EventEmitter();
                    var i_reseller = this.appStore.getState().reseller;
                    this.privilegeDefault = i_reseller.getIn(['privilegeDefault']);
                    this.unsub = this.appStore.sub(function (privilegeDefault) {
                        _this.privilegeDefault = privilegeDefault;
                    }, 'reseller.privilegeDefault');
                    this.privelegesList = i_reseller.getIn(['privileges']);
                    this.unsub = this.appStore.sub(function (privelegesModel) {
                        _this.privelegesList = privelegesModel;
                        _this.onPrivilegeSelected();
                    }, 'reseller.privileges');
                }
                Privileges.prototype.onPrivilegeRenamed = function (event) {
                    if (event.value.trim().length == 0)
                        return;
                    var privilegeId = event.item.getPrivelegesId();
                    this.appStore.dispatch(this.resellerAction.updateDefaultPrivilegeName(privilegeId, event.value));
                    this.appStore.dispatch(this.resellerAction.savePrivileges(privilegeId, event.value));
                };
                Privileges.prototype.onDefaultPrivilegeChanged = function (event) {
                    for (var id in event.metadata) {
                        if (event.metadata[id].index == event.index)
                            this.appStore.dispatch(this.resellerAction.setDefaultPrivilege(Number(id)));
                    }
                };
                Privileges.prototype.onPrivilegeSelected = function () {
                    if (!this.simpleList)
                        return;
                    var selected = this.simpleList.getSelected();
                    var selectedList = this.privelegesList.filter(function (privelegesModel) {
                        var privelegesId = privelegesModel.getPrivelegesId();
                        return selected[privelegesId] && selected[privelegesId].selected;
                    });
                    this.privelegesModelSelected = selectedList.first();
                };
                Privileges.prototype.getPrivilege = function (privelegesModel) {
                    return privelegesModel.getName();
                };
                Privileges.prototype.getPrivilegeId = function () {
                    return function (privilegeModel) {
                        return privilegeModel.getPrivelegesId();
                    };
                };
                Privileges.prototype.getDefaultPrivilege = function () {
                    var _this = this;
                    return function (index, privelegesModel) {
                        if (privelegesModel.getPrivelegesId() == _this.privilegeDefault)
                            return true;
                        return false;
                    };
                };
                Privileges.prototype.onAdd = function () {
                    this.appStore.dispatch(this.resellerAction.createPrivilege());
                };
                Privileges.prototype.onRemove = function () {
                    var _this = this;
                    if (!this.privelegesModelSelected)
                        return;
                    var simpleListItems = this.simpleList.getSelected();
                    var simpleListDefaultIndex = this.simpleList.selectedIconIndex;
                    for (var i in simpleListItems) {
                        if (simpleListItems[i].selected && simpleListItems[i].index == simpleListDefaultIndex) {
                            bootbox.alert('Sorry can not delete the default privilege set. Be sure to apply the default privilege to another set and try again');
                            return;
                        }
                    }
                    var selectedPrivId = this.privelegesModelSelected.getPrivelegesId();
                    var selectedPrivName = this.privelegesModelSelected.getName();
                    bootbox.confirm("Are you sure you want to remove the privilege set " + selectedPrivName + " (id:" + selectedPrivId + ")?", function (result) {
                        if (result) {
                            _this.appStore.dispatch(_this.resellerAction.deletePrivilege(selectedPrivId));
                        }
                    });
                };
                Privileges.prototype.ngOnDestroy = function () {
                    this.unsub();
                };
                __decorate([
                    core_1.ViewChild(Simplelist_1.SimpleList), 
                    __metadata('design:type', Simplelist_1.SimpleList)
                ], Privileges.prototype, "simpleList", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Privileges.prototype, "parts", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Privileges.prototype, "partsInCart", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Privileges.prototype, "addToCart", void 0);
                Privileges = __decorate([
                    core_1.Component({
                        selector: 'privileges',
                        styles: ["\n      .userView {\n        /*background-color: red; */\n      }      \n      .btns {\n          padding: 0 20px 20px 0px;\n          font-size: 1.4em;\n          color: #313131;\n      }\n      .btns:hover {\n        color: red;\n      }\n      .enabled {\n        opacity: 1\n      }\n       .disabled {\n        opacity: 0.2;\n        cursor: default;\n      }\n    "],
                        host: {
                            '[style.display]': "'block'",
                            '[style.position]': "'absolute'"
                        },
                        animations: [],
                        template: "\n        <div class=\"row\">\n             <div class=\"col-xs-3\">\n                <div style=\"position: relative; top: 10px\">\n                    <div>\n                      <a class=\"btns\" (click)=\"onAdd($event);$event.preventDefault()\" href=\"#\"><span class=\"fa fa-plus\"></span></a>\n                      <a class=\"btns\" (click)=\"onRemove($event);$event.preventDefault()\" [ngClass]=\"{disabled: !privelegesModelSelected}\" href=\"#\">\n                       <span class=\"fa fa-remove\"></span>\n                      </a>\n                    </div>\n                </div>\n                <SimpleList *ngIf=\"privelegesList\" #simpleList [list]=\"privelegesList\" \n                    (selected)=\"onPrivilegeSelected()\"\n                    (iconClicked)=\"onDefaultPrivilegeChanged($event)\"\n                    (edited)=\"onPrivilegeRenamed($event)\"                    \n                    [editable]=\"true\"\n                    [iconSelectiondMode]=\"true\"\n                    [iconSelected]=\"getDefaultPrivilege()\"\n                    [contentId]=\"getPrivilegeId()\"\n                    [content]=\"getPrivilege\">\n                </SimpleList> \n                <Loading *ngIf=\"!privelegesList\" [src]=\"'assets/preload6.gif'\" [style]=\"{'margin-top': '150px'}\"></Loading>\n             </div>\n             <div class=\"col-xs-9\" style=\"max-height: 100% !important; overflow-y: scroll\">                \n                <Loading *ngIf=\"!privelegesList\" [src]=\"'assets/preload6.gif'\" [style]=\"{'margin-top': '150px'}\"></Loading>\n                <!--<privilegesDetails [selected]=\"privelegesModelSelected\" [priveleges]=\"privelegesList\" ></privilegesDetails>-->\n                <privilegesDetails [selected]=\"privelegesModelSelected\"></privilegesDetails>\n             </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, ResellerAction_1.ResellerAction, AuthService_1.AuthService])
                ], Privileges);
                return Privileges;
            }());
            exports_1("Privileges", Privileges);
        }
    }
});
