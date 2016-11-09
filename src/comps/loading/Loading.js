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
    var Loading;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Loading = (function () {
                function Loading() {
                    this.src = '';
                }
                Object.defineProperty(Loading.prototype, "style", {
                    set: function (i_style) {
                        this._style = i_style;
                        console.log();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Loading.prototype, "size", {
                    set: function (i_size) {
                        this._size = {
                            opacity: 1,
                            height: i_size,
                            width: i_size
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Loading.prototype, "src", void 0);
                __decorate([
                    core_1.Input('style'), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], Loading.prototype, "style", null);
                __decorate([
                    core_1.Input('size'), 
                    __metadata('design:type', Number), 
                    __metadata('design:paramtypes', [Number])
                ], Loading.prototype, "size", null);
                Loading = __decorate([
                    core_1.Component({
                        selector: 'Loading',
                        styles: ["\n        .spinner {\n          display: inline-block;\n          opacity: 0;\n          border: 3px solid rgba(0,0,0,.3);\n          border-radius: 50%;\n          border-top-color: #fff;\n          animation: spin 1s ease-in-out infinite;\n          -webkit-animation: spin 1s ease-in-out infinite; \n        }\n        @keyframes spin {\n          to { -webkit-transform: rotate(360deg); }\n        }\n        @-webkit-keyframes spin {\n          to { -webkit-transform: rotate(360deg); }\n        }\n        .center {\n            text-align: center \n        }   \n    "],
                        template: "\n        <div class=\"center\" [ngStyle]=\"_style\">\n            <!--<center>-->\n               <!--<h5>Loading</h5>-->\n                <!--<div *ngIf=\"show\" class=\"spinner\"></div>-->\n                <div [ngStyle]=\"_size\" class=\"spinner\"></div>\n               <!--<img [src]=\"src\"/>-->\n            <!--</center>-->\n        </div>\n    ",
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [])
                ], Loading);
                return Loading;
            }());
            exports_1("Loading", Loading);
        }
    }
});
