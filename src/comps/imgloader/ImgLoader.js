System.register(['@angular/core', 'rxjs/add/observable/fromEvent', 'rxjs/add/operator/do', 'rxjs/add/operator/merge', 'rxjs/add/operator/distinctUntilChanged', "../../Lib"], function(exports_1, context_1) {
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
    var core_1, Lib_1;
    var ImgLoader;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {},
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            }],
        execute: function() {
            ImgLoader = (function () {
                function ImgLoader(cdr) {
                    this.cdr = cdr;
                    this._style = {};
                    this.defaultImage = '';
                    this.circle = false;
                    this.images = [];
                    this.imageRetries = 0;
                }
                ImgLoader.prototype.getImageUrl = function () {
                    if (this.images.length == 0)
                        return this.defaultImage;
                    if (this.images[this.imageRetries] == undefined)
                        return this.defaultImage;
                    var url = this.images[this.imageRetries] + (Lib_1.Lib.DevMode() ? '?random=xyz' : "?random=' " + Math.random());
                    return url;
                };
                ImgLoader.prototype.onImageLoaded = function () {
                    this.cdr.detach();
                };
                ImgLoader.prototype.onImageError = function () {
                    this.imageRetries++;
                };
                ImgLoader.prototype.reloadImage = function () {
                    this.imageRetries = 0;
                    this.cdr.reattach();
                };
                __decorate([
                    core_1.Input('style'), 
                    __metadata('design:type', Object)
                ], ImgLoader.prototype, "_style", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ImgLoader.prototype, "defaultImage", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ImgLoader.prototype, "circle", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], ImgLoader.prototype, "images", void 0);
                ImgLoader = __decorate([
                    core_1.Component({
                        selector: 'imgLoader',
                        changeDetection: core_1.ChangeDetectionStrategy.Default,
                        template: "\n            <div *ngIf=\"defaultImage\"> \n              <img [ngStyle]=\"_style.img\" [ngClass]=\"{'img-circle': circle}\" [src]=\"getImageUrl()\" (load)=\"onImageLoaded()\" (error)=\"onImageError()\" />\n            </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
                ], ImgLoader);
                return ImgLoader;
            }());
            exports_1("ImgLoader", ImgLoader);
        }
    }
});
