System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var Infobox;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Infobox = (function () {
                function Infobox() {
                    this.style = 'basic';
                    this.value1 = null;
                    this.value2 = '';
                    this.value3 = '';
                    this.icon = 'fa-plus';
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Infobox.prototype, "style", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Infobox.prototype, "value1", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Infobox.prototype, "value2", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Infobox.prototype, "value3", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Infobox.prototype, "icon", void 0);
                Infobox = __decorate([
                    core_1.Component({
                        selector: 'Infobox',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        styles: ["\n        .panel-footer {\n          padding: 5px 3px;\n          background-color: #fafafa;\n          border: 1px solid #e2e2e2;\n          border-bottom-right-radius: 2px;\n          border-bottom-left-radius: 2px;\n        }\n        .br-a {\n            border: 1px solid #eeeeee !important;\n        }\n        .br-grey {\n             border-color: #d9d9d9 !important;\n        }\n    "],
                        template: "\n              <div class=\"panel panel-tile text-center br-a br-grey\">\n                 <div *ngIf=\"value1 == null\">\n                    <br/>\n                    <img src=\"assets/preload2.gif\">\n                    <br/>\n                    <br/>\n                 </div>\n                 <div *ngIf=\"value1 != null\">\n                      <div>\n                        <h1>{{value1}}</h1>\n                        <h6 class=\"text-system\">{{value2}}</h6>\n                    </div>\n                    <div class=\"panel-footer br-t p12\">\n                      <span class=\"fs11\">\n                        <i class=\"fa {{icon}} pr5\"></i>\n                        {{value3}}\n                      </span>\n                    </div>\n                  </div>                \n              </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Infobox);
                return Infobox;
            }());
            exports_1("Infobox", Infobox);
        }
    }
});
