System.register(["@angular/core", "angular2-redux-util", "../../../reseller/ResellerAction"], function(exports_1, context_1) {
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
    var core_1, angular2_redux_util_1, ResellerAction_1;
    var Apps;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (ResellerAction_1_1) {
                ResellerAction_1 = ResellerAction_1_1;
            }],
        execute: function() {
            Apps = (function () {
                function Apps(appStore, resellerAction, ref) {
                    var _this = this;
                    this.appStore = appStore;
                    this.resellerAction = resellerAction;
                    this.ref = ref;
                    this.sort = { field: null, desc: false };
                    var i_reseller = this.appStore.getState().reseller;
                    this.apps = i_reseller.getIn(['apps']);
                    this.unsub = this.appStore.sub(function (apps) {
                        _this.apps = apps;
                        _this.ref.markForCheck();
                    }, 'reseller.apps');
                }
                Apps.prototype.getInstalledStatus = function (item) {
                    return [Number(item.getInstalled())];
                };
                Apps.prototype.onAppInstalledChange = function (event, index) {
                    var _this = this;
                    setTimeout(function () {
                        _this.appStore.dispatch(_this.resellerAction.appStatus(event.item, event.value["0"]));
                    }, 1000);
                };
                Apps.prototype.ngOnDestroy = function () {
                    this.unsub();
                };
                Apps = __decorate([
                    core_1.Component({
                        selector: 'apps',
                        host: {
                            '[style.display]': "'block'"
                        },
                        animations: [],
                        template: "\n        <div *ngIf=\"apps && apps.size > 0\">\n          <simpleGridTable>\n            <thead>\n            <tr>\n              <th>icon</th>\n              <th sortableHeader=\"appName\" [sort]=\"sort\">app name</th>\n              <th>available (off | on)</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr class=\"simpleGridRecord\" simpleGridRecord *ngFor=\"let item of apps | OrderBy:sort.field:sort.desc; let index=index\" [item]=\"item\" [index]=\"index\">\n              <td style=\"width: 10%\" simpleGridDataImage color=\"dodgerblue\" [field]=\"item.getIcon(item)\" [item]=\"item\"></td> \n              <td style=\"width: 70%\" simpleGridData field=\"appName\" [item]=\"item\"></td>\n              <td style=\"width: 20%\" simpleGridDataChecks slideMode=\"true\" [item]=\"item\" [checkboxes]=\"getInstalledStatus(item)\" (changed)=\"onAppInstalledChange($event,index)\"></td>\n            </tr>\n            </tbody>\n          </simpleGridTable>\n        </div>\n    ",
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, ResellerAction_1.ResellerAction, core_1.ChangeDetectorRef])
                ], Apps);
                return Apps;
            }());
            exports_1("Apps", Apps);
        }
    }
});
