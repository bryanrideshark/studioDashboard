System.register(['@angular/core', '../tabs/tabs'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, tabs_1;
    var Tab;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tabs_1_1) {
                tabs_1 = tabs_1_1;
            }],
        execute: function() {
            Tab = (function () {
                function Tab(tabs) {
                    this.activated = new core_1.EventEmitter();
                    this._active = false;
                    tabs.addTab(this);
                }
                Object.defineProperty(Tab.prototype, "active", {
                    get: function () {
                        return this._active;
                    },
                    set: function (value) {
                        this._active = value || false;
                        if (this._active)
                            this.activated.emit(true);
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Tab.prototype, "activated", void 0);
                Tab = __decorate([
                    core_1.Component({
                        selector: 'tab',
                        inputs: [
                            'title:tabtitle',
                            'active'
                        ],
                        styles: ["\n    .pane{\n      padding: 1em;\n      background-color: white;\n      border-left: 1px solid #dddddd ;\n      border-right: 1px solid #dddddd ;\n      border-bottom: 1px solid #dddddd ;\n    }\n  "],
                        template: "\n    <div [hidden]=\"!_active\" class=\"pane\">\n      <ng-content></ng-content>\n    </div>\n  "
                    }),
                    __param(0, core_1.Host()), 
                    __metadata('design:paramtypes', [tabs_1.Tabs])
                ], Tab);
                return Tab;
            }());
            exports_1("Tab", Tab);
        }
    }
});
