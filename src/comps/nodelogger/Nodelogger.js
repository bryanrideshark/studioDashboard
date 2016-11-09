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
    var Nodelogger;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Nodelogger = (function () {
                function Nodelogger() {
                }
                Nodelogger.prototype.ngOnChanges = function (event) {
                    if (event.nodeLogger.isFirstChange()) {
                        console.log("Node logger ** instantiated **:", this.nodeLogger);
                    }
                    else {
                        console.log("Node logger __ updated __:", this.nodeLogger);
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Nodelogger.prototype, "nodeLogger", void 0);
                Nodelogger = __decorate([
                    core_1.Directive({
                        selector: '[nodeLogger]'
                    }), 
                    __metadata('design:paramtypes', [])
                ], Nodelogger);
                return Nodelogger;
            }());
            exports_1("Nodelogger", Nodelogger);
        }
    }
});
