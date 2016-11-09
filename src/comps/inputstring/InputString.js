System.register(["@angular/core", "lodash", "@angular/forms", "../../Lib"], function(exports_1, context_1) {
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
    var core_1, _, forms_1, Lib_1;
    var InputString;
    function createCounterRangeValidator(maxValue, minValue) {
        return function (c) {
            var err = {
                rangeError: {
                    given: c.value,
                    max: maxValue || 10,
                    min: minValue || 0
                }
            };
            return (c.value.length > +maxValue || c.value.length < +minValue) ? err : null;
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
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            }],
        execute: function() {
            InputString = (function () {
                function InputString(elRef, renderer, cd) {
                    this.elRef = elRef;
                    this.renderer = renderer;
                    this.cd = cd;
                    this.safe = false;
                    this.defaultValue = '';
                    this.onChange = new core_1.EventEmitter();
                    this.placer = '';
                    this.propagateChange = [];
                    this.validateFn = function () {
                    };
                }
                Object.defineProperty(InputString.prototype, "textholder", {
                    set: function (i_placer) {
                        this.placer = i_placer;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputString.prototype.ngOnInit = function () {
                    this.writeValue(this.defaultValue);
                };
                InputString.prototype.stringFixLength = function (i_value) {
                    return i_value.substr(0, this.stringRangeMax);
                };
                InputString.prototype.stringFixSafe = function (i_value) {
                    return Lib_1.Lib.CleanCharForXml(i_value);
                };
                InputString.prototype.onKeyUp = function (event) {
                    var v = event.target.value;
                    if (v.length == 0)
                        return;
                    this.onBlur(event, true);
                };
                InputString.prototype.onBlur = function ($event, fromKeyUp) {
                    if (fromKeyUp === void 0) { fromKeyUp = false; }
                    var s = $event.target.value;
                    if (!fromKeyUp && (this.validateFn({ value: s }))) {
                        s = this.stringFixLength(s);
                        this.writeValue(s);
                    }
                    else {
                        this.writeValue(s);
                    }
                    this.renderer.invokeElementMethod(this.elRef.nativeElement, 'dispatchEvent', [new CustomEvent('input-blur', { bubbles: true })]);
                    this.onChange.emit({
                        value: s,
                        finalValue: !fromKeyUp
                    });
                    this.cd.markForCheck();
                };
                Object.defineProperty(InputString.prototype, "stringValue", {
                    get: function () {
                        return this._stringValue;
                    },
                    set: function (val) {
                        this._stringValue = val;
                        this.propagateChange.forEach(function (fn) { return fn(val); });
                    },
                    enumerable: true,
                    configurable: true
                });
                InputString.prototype.ngOnChanges = function (inputs) {
                    if (inputs.stringRangeMax || inputs.stringRangeMin) {
                        this.validateFn = createCounterRangeValidator(this.stringRangeMax, this.stringRangeMin);
                    }
                };
                InputString.prototype.writeValue = function (value) {
                    if (_.isUndefined(value))
                        return;
                    if (this.safe) {
                        value = this.stringFixSafe(value);
                    }
                    this.stringValue = value;
                    this.cd.markForCheck();
                };
                InputString.prototype.registerOnChange = function (fn) {
                    this.propagateChange.push(fn);
                };
                InputString.prototype.registerOnTouched = function (fn) {
                };
                InputString.prototype.validate = function (c) {
                    return this.validateFn(c);
                };
                __decorate([
                    core_1.ViewChild('inputElement'), 
                    __metadata('design:type', core_1.ElementRef)
                ], InputString.prototype, "inputElement", void 0);
                __decorate([
                    core_1.Input('stringValue'), 
                    __metadata('design:type', Object)
                ], InputString.prototype, "_stringValue", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], InputString.prototype, "stringRangeMax", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], InputString.prototype, "stringRangeMin", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputString.prototype, "safe", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], InputString.prototype, "defaultValue", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], InputString.prototype, "textholder", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], InputString.prototype, "onChange", void 0);
                InputString = __decorate([
                    core_1.Component({
                        selector: 'InputString',
                        host: {
                            '(blur)': 'onBlur($event)'
                        },
                        styles: ["        \n       :host(.ng-invalid input) {\n            border-left: 3px solid red;\n        }\n    "],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: "\n        <div (click)=\"$event.preventDefault()\">\n            <input #inputElement\n                   required \n                   (keyup)=\"onKeyUp($event)\"\n                   value=\"{{stringValue}}\"                   \n                   placeholder=\"{{placer}}\"\n                   type=\"text\"                    \n                   class=\"form-control\" \n                   (blur)=\"onBlur($event)\"/>\n                   <!--\n                   you can also use code below to always include an error as part of the component\n                   required minlength=\"3\"\n                   <p *ngIf=\"!inputElement.checkValidity()\">not valid</p>-->\n\t\t\t         <!--<pre>{{ inputElement.value | json }}-->\n\t\t\t       <!--</pre>-->\n        </div>\n  ",
                        providers: [{
                                provide: forms_1.NG_VALUE_ACCESSOR,
                                useExisting: core_1.forwardRef(function () { return InputString; }),
                                multi: true
                            }, {
                                provide: forms_1.NG_VALIDATORS,
                                useExisting: core_1.forwardRef(function () { return InputString; }),
                                multi: true
                            }]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, core_1.ChangeDetectorRef])
                ], InputString);
                return InputString;
            }());
            exports_1("InputString", InputString);
        }
    }
});
