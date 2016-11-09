System.register(["@angular/core", "src/Lib"], function(exports_1, context_1) {
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
    var ResourceViewer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            }],
        execute: function() {
            ResourceViewer = (function () {
                function ResourceViewer() {
                    this.imgSource = '';
                    this.me = Lib_1.Lib.GetCompSelector(this.constructor);
                }
                Object.defineProperty(ResourceViewer.prototype, "resource", {
                    set: function (i_loadResource) {
                        this.onLoadResource(i_loadResource);
                    },
                    enumerable: true,
                    configurable: true
                });
                ResourceViewer.prototype.onLoadResource = function (i_loadResource) {
                    var _this = this;
                    var res = i_loadResource.match(/(?!.*[.](?:jpg|jpeg|png)$).*/ig);
                    if (res[0].length <= 4) {
                        this.videoSource = null;
                        this.imgSource = i_loadResource;
                        return;
                    }
                    var res = i_loadResource.match(/(?!.*[.](?:mp4)$).*/ig);
                    if (res[0].length <= 4) {
                        this.videoSource = i_loadResource;
                        this.imgSource = '';
                        return;
                    }
                    jQuery.get(i_loadResource, function (data) {
                        _this.imgSource = data.url;
                    });
                    return;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], ResourceViewer.prototype, "resource", null);
                ResourceViewer = __decorate([
                    core_1.Component({
                        selector: 'ResourceViewer',
                        moduleId: __moduleName,
                        template: "\n        <small>{{me}}</small>\n        <div *ngIf=\"!videoSource\">\n            <img class=\"img-responsive\" [src]=\"imgSource\"/>\n        </div>\n        <div *ngIf=\"videoSource\">\n            <h5>video</h5>\n            <video class=\"img-responsive\" autoplay>\n                <source [src]=\"videoSource\" type=\"video/mp4\">\n                Your browser does not support the video tag.\n            </video>\n        </div>\n        ",
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [])
                ], ResourceViewer);
                return ResourceViewer;
            }());
            exports_1("ResourceViewer", ResourceViewer);
        }
    }
});
