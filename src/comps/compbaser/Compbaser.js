System.register(["../../Lib"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Lib_1;
    var Compbaser;
    return {
        setters:[
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            }],
        execute: function() {
            Compbaser = (function () {
                function Compbaser() {
                    this.me = '';
                    this.me = Lib_1.Lib.GetCompSelector(this.constructor);
                }
                Compbaser.prototype.cancelOnDestroy = function (i_function) {
                    this.unsubStore = i_function;
                };
                Compbaser.prototype.ngOnDestroy = function () {
                    this.unsubStore();
                    this.destroy();
                };
                Compbaser.prototype.destroy = function () {
                };
                ;
                return Compbaser;
            }());
            exports_1("Compbaser", Compbaser);
        }
    }
});
