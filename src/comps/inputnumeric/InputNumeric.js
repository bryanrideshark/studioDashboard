System.register(["@angular/core", "lodash", "@angular/forms"], function(exports_1, context_1) {
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
    var core_1, _, forms_1;
    var InputNumeric;
    function createCounterRangeValidator(maxValue, minValue) {
        return function (c) {
            var err = {
                rangeError: {
                    given: c.value,
                    max: maxValue || 10,
                    min: minValue || 0
                }
            };
            return (c.value > +maxValue || c.value < +minValue) ? err : null;
        };
    }
    exports_1("createCounterRangeValidator", createCounterRangeValidator);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            InputNumeric = (function () {
                function InputNumeric(elRef, renderer, cd) {
                    this.elRef = elRef;
                    this.renderer = renderer;
                    this.cd = cd;
                    this.round = false;
                    this.defaultValue = 0;
                    this.step = 1;
                    this.onChange = new core_1.EventEmitter();
                    this.placer = '';
                    this.propagateChange = [];
                    this.validateFn = function () {
                    };
                }
                Object.defineProperty(InputNumeric.prototype, "textholder", {
                    set: function (i_placer) {
                        this.placer = i_placer;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputNumeric.prototype.ngOnInit = function () {
                    this.writeValue(this.defaultValue);
                };
                InputNumeric.prototype.onKeyUp = function (event) {
                    var v = event.target.value;
                    if (v.length == 0)
                        return;
                    this.onBlur(event, true);
                };
                InputNumeric.prototype.onBlur = function ($event, fromKeyUp) {
                    if (fromKeyUp === void 0) { fromKeyUp = false; }
                    var n = Number($event.target.value);
                    if (_.isNaN(n)) {
                        n = this.defaultValue;
                        this.writeValue(n);
                    }
                    else if (!fromKeyUp && (this.validateFn({ value: n }))) {
                        n = this.defaultValue;
                        this.writeValue(n);
                    }
                    else {
                        this.writeValue(n);
                    }
                    this.renderer.invokeElementMethod(this.elRef.nativeElement, 'dispatchEvent', [new CustomEvent('input-blur', { bubbles: true })]);
                    this.onChange.emit({
                        value: n,
                        finalValue: !fromKeyUp
                    });
                    this.cd.markForCheck();
                };
                Object.defineProperty(InputNumeric.prototype, "counterValue", {
                    get: function () {
                        return this._counterValue;
                    },
                    set: function (val) {
                        this._counterValue = val;
                        this.propagateChange.forEach(function (fn) { return fn(val); });
                    },
                    enumerable: true,
                    configurable: true
                });
                InputNumeric.prototype.ngOnChanges = function (inputs) {
                    if (inputs.counterRangeMax || inputs.counterRangeMin) {
                        this.validateFn = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
                    }
                };
                InputNumeric.prototype.writeValue = function (value) {
                    if (_.isUndefined(value))
                        return;
                    if (this.round) {
                        value = Math.round(value);
                    }
                    this.counterValue = value;
                    this.cd.markForCheck();
                };
                InputNumeric.prototype.registerOnChange = function (fn) {
                    this.propagateChange.push(fn);
                };
                InputNumeric.prototype.registerOnTouched = function (fn) {
                };
                InputNumeric.prototype.validate = function (c) {
                    return this.validateFn(c);
                };
                __decorate([
                    core_1.ViewChild('inputElement'), 
                    __metadata('design:type', core_1.ElementRef)
                ], InputNumeric.prototype, "inputElement", void 0);
                __decorate([
                    core_1.Input('counterValue'), 
                    __metadata('design:type', Object)
                ], InputNumeric.prototype, "_counterValue", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], InputNumeric.prototype, "counterRangeMax", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], InputNumeric.prototype, "counterRangeMin", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputNumeric.prototype, "round", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], InputNumeric.prototype, "defaultValue", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], InputNumeric.prototype, "step", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], InputNumeric.prototype, "textholder", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], InputNumeric.prototype, "onChange", void 0);
                InputNumeric = __decorate([
                    core_1.Component({
                        selector: 'InputNumeric',
                        host: {
                            '(blur)': 'onBlur($event)'
                        },
                        styles: ["        \n       :host(.ng-invalid input) {\n            border-left: 3px solid red;\n        }\n    "],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: "\n        <div (click)=\"$event.preventDefault()\">\n            <input #inputElement\n                   (keyup)=\"onKeyUp($event)\"\n                   value=\"{{counterValue}}\"                   \n                   min=\"{{counterRangeMin}}\"\n                   max=\"{{counterRangeMax}}\"\n                   step=\"{{step}}\"\n                   placeholder=\"{{placer}}\"\n                   type=\"number\"                    \n                   class=\"form-control\" \n                   (blur)=\"onBlur($event)\"/>\n        </div>\n  ",
                        providers: [{
                                provide: forms_1.NG_VALUE_ACCESSOR,
                                useExisting: core_1.forwardRef(function () { return InputNumeric; }),
                                multi: true
                            }, {
                                provide: forms_1.NG_VALIDATORS,
                                useExisting: core_1.forwardRef(function () { return InputNumeric; }),
                                multi: true
                            }]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, core_1.ChangeDetectorRef])
                ], InputNumeric);
                return InputNumeric;
            }());
            exports_1("InputNumeric", InputNumeric);
        }
    }
});
