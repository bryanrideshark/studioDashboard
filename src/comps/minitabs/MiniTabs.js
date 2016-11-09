System.register(['@angular/core', './Minitab'], function(exports_1, context_1) {
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
    var core_1, Minitab_1;
    var Minitabs;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Minitab_1_1) {
                Minitab_1 = Minitab_1_1;
            }],
        execute: function() {
            Minitabs = (function () {
                function Minitabs() {
                }
                Minitabs.prototype.ngAfterContentInit = function () {
                    console.log(this.tabs);
                    var activeTabs = this.tabs.filter(function (tab) { return tab.active; });
                    if (activeTabs.length === 0)
                        this.selectTab(this.tabs.first);
                };
                Minitabs.prototype.selectTab = function (tab, event) {
                    event ? event.preventDefault() : null;
                    this.tabs.toArray().forEach(function (tab) { return tab.active = false; });
                    tab.active = true;
                };
                __decorate([
                    core_1.ContentChildren(Minitab_1.Minitab), 
                    __metadata('design:type', core_1.QueryList)
                ], Minitabs.prototype, "tabs", void 0);
                Minitabs = __decorate([
                    core_1.Component({
                        selector: 'mini-tabs',
                        template: "\n    <ul class=\"nav nav-tabs\">\n      <li *ngFor=\"let tab of tabs\" (click)=\"selectTab(tab,$event)\" [class.active]=\"tab.active\">\n        <a href=\"#\">{{tab.title}}</a>\n      </li>\n    </ul>\n    <ng-content></ng-content>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Minitabs);
                return Minitabs;
            }());
            exports_1("Minitabs", Minitabs);
        }
    }
});
