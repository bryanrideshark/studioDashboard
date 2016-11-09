System.register(["@angular/core"], function(exports_1, context_1) {
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
    var BlurForwarder;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BlurForwarder = (function () {
                function BlurForwarder(elRef, renderer) {
                    this.elRef = elRef;
                    this.renderer = renderer;
                }
                BlurForwarder.prototype.onBlur = function ($event) {
                    this.renderer.invokeElementMethod(this.elRef.nativeElement, 'dispatchEvent', [new CustomEvent('input-blur', { bubbles: true })]);
                };
                BlurForwarder = __decorate([
                    core_1.Directive({
                        selector: 'input,select,textarea',
                        host: {
                            '(blur)': 'onBlur($event)'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
                ], BlurForwarder);
                return BlurForwarder;
            }());
            exports_1("BlurForwarder", BlurForwarder);
        }
    }
});
