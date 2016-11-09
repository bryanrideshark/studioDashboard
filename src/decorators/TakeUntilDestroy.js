System.register(["rxjs"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var rxjs_1;
    function TakeUntilDestroy(constructor) {
        var original = constructor.prototype.ngOnDestroy;
        var subject;
        var unsub;
        constructor.prototype.componentDestroy = function () {
            subject = new rxjs_1.Subject();
            return subject.asObservable();
        };
        constructor.prototype.unsubOnDestroy = function (i_unsub) {
            unsub = i_unsub;
        };
        constructor.prototype.ngOnDestroy = function () {
            original && typeof original === 'function' && original.apply(this, arguments);
            unsub === 'function' && unsub();
            subject && subject.next('ngOnDestroy') && subject.unsubscribe();
        };
    }
    exports_1("TakeUntilDestroy", TakeUntilDestroy);
    return {
        setters:[
            function (rxjs_1_1) {
                rxjs_1 = rxjs_1_1;
            }],
        execute: function() {
        }
    }
});
