System.register(['@angular/core', 'immutable', './Samplelist.html!text', './Samplelist.css!text'], function(exports_1, context_1) {
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
    var core_1, immutable_1, Samplelist_html_text_1, Samplelist_css_text_1;
    var Samplelist;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (Samplelist_html_text_1_1) {
                Samplelist_html_text_1 = Samplelist_html_text_1_1;
            },
            function (Samplelist_css_text_1_1) {
                Samplelist_css_text_1 = Samplelist_css_text_1_1;
            }],
        execute: function() {
            Samplelist = (function () {
                function Samplelist() {
                    this.selected = new core_1.EventEmitter();
                }
                Object.defineProperty(Samplelist.prototype, "samples", {
                    set: function (i_samples) {
                        this.m_samples = i_samples;
                    },
                    enumerable: true,
                    configurable: true
                });
                Samplelist.prototype.onSelectedSample = function (sample) {
                    this.selected.emit(sample.getBusinessId());
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], Samplelist.prototype, "samples", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Samplelist.prototype, "selected", void 0);
                Samplelist = __decorate([
                    core_1.Component({
                        selector: 'Samplelist',
                        moduleId: __moduleName,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: Samplelist_html_text_1.default,
                        styles: [Samplelist_css_text_1.default]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Samplelist);
                return Samplelist;
            }());
            exports_1("Samplelist", Samplelist);
        }
    }
});
