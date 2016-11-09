System.register(["@angular/core", "lodash", "../../../../simplelist/Simplelist", "../../../../../adnet/AdnetRateModel", "../../../../../Lib", './RatesTable.html!text', './RatesTable.css!text'], function(exports_1, context_1) {
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
    var core_1, _, Simplelist_1, AdnetRateModel_1, Lib_1, RatesTable_html_text_1, RatesTable_css_text_1;
    var RatesTable;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (Simplelist_1_1) {
                Simplelist_1 = Simplelist_1_1;
            },
            function (AdnetRateModel_1_1) {
                AdnetRateModel_1 = AdnetRateModel_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (RatesTable_html_text_1_1) {
                RatesTable_html_text_1 = RatesTable_html_text_1_1;
            },
            function (RatesTable_css_text_1_1) {
                RatesTable_css_text_1 = RatesTable_css_text_1_1;
            }],
        execute: function() {
            RatesTable = (function () {
                function RatesTable(el) {
                    this.el = el;
                    this.onRateChange = new core_1.EventEmitter();
                    this.readOnly = false;
                    this.adHourlyRate = [];
                    this.selectedColor = 'orange';
                    this['me'] = Lib_1.Lib.GetCompSelector(this.constructor);
                }
                RatesTable.prototype.ngOnInit = function () {
                    this.rateGridContainer = jQuery(this.el.nativeElement).find('.rateGridContainer');
                };
                Object.defineProperty(RatesTable.prototype, "rates", {
                    set: function (i_adnetRateModel) {
                        if (!i_adnetRateModel)
                            return;
                        this.adnetRateModel = i_adnetRateModel;
                        this.rateGridContainer.empty();
                        this.makeGrid(this.adnetRateModel.rateMap());
                        this.adHourlyRate[0] = this.adnetRateModel.rateLevels()[0];
                        this.adHourlyRate[1] = this.adnetRateModel.rateLevels()[1];
                        this.adHourlyRate[2] = this.adnetRateModel.rateLevels()[2];
                        this.adHourlyRate[3] = this.adnetRateModel.rateLevels()[3];
                    },
                    enumerable: true,
                    configurable: true
                });
                RatesTable.prototype.onColor = function (i_color) {
                    if (this.readOnly)
                        return;
                    this.selectedColor = i_color;
                };
                RatesTable.prototype.onUpdateRate = function () {
                    var _this = this;
                    if (this.readOnly)
                        return;
                    _.forEach(this.adHourlyRate, function (k, v) {
                        if (_.isNaN(Number(k))) {
                            _this.adHourlyRate[v] = '1';
                        }
                        else {
                            _this.adHourlyRate[v] = String(Number(k));
                        }
                    });
                    this.onRateChange.emit({
                        rateId: this.adnetRateModel.getId(),
                        label: this.adnetRateModel.getName(),
                        rateTable: this.getRateTable(),
                        adHourlyRate: this.adHourlyRate,
                    });
                };
                RatesTable.prototype.getRateTable = function () {
                    var rateMap = [];
                    this.rateGridContainer.find('.square').each(function (index, elem) {
                        var classColorCode;
                        var classColor = jQuery(elem).attr('class').split(' ')[1];
                        switch (classColor) {
                            case 'orange': {
                                classColorCode = '0';
                                break;
                            }
                            case 'green': {
                                classColorCode = '1';
                                break;
                            }
                            case 'blue': {
                                classColorCode = '2';
                                break;
                            }
                            case 'red': {
                                classColorCode = '3';
                                break;
                            }
                            default: {
                                classColorCode = '0';
                                break;
                            }
                        }
                        rateMap.push(classColorCode);
                    });
                    var rateMapStr = rateMap.join('');
                    return rateMapStr;
                };
                RatesTable.prototype.makeGrid = function (mask) {
                    var _this = this;
                    var hour = '';
                    var today = '';
                    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
                    var maskIndex = 0;
                    var cls = '';
                    for (var i = 1; i <= 8; i++) {
                        for (var j = 1; j <= 25; j++) {
                            if (j == 1 && i != 1) {
                                today = days.shift();
                                cls = 'borderLessSquare';
                            }
                            else if (i != 1 && j != 1) {
                                today = '';
                                var classColorCode = mask.substr(maskIndex, 1);
                                var classColor = '';
                                maskIndex++;
                                switch (classColorCode) {
                                    case '0': {
                                        classColor = 'orange';
                                        break;
                                    }
                                    case '1': {
                                        classColor = 'green';
                                        break;
                                    }
                                    case '2': {
                                        classColor = 'blue';
                                        break;
                                    }
                                    case '3': {
                                        classColor = 'red';
                                        break;
                                    }
                                    default: {
                                        classColor = 'orange';
                                        break;
                                    }
                                }
                                cls = 'square ' + classColor;
                            }
                            if (i == 1 && j == 1)
                                var cls = 'borderLessSquare';
                            if (i == 1 && j > 1) {
                                hour = j - 1;
                                var cls = 'borderLessSquare';
                                if (hour == 0)
                                    hour = '';
                            }
                            else {
                                hour = '';
                            }
                            if (_.isNumber(hour) && hour < 10) {
                                hour = "0" + hour + ":00";
                            }
                            else if (_.isNumber(hour) && hour > 9) {
                                hour = hour + ":00";
                            }
                            this.rateGridContainer.append("<div class='" + cls + "'>" + today + hour + "</div>");
                        }
                        this.rateGridContainer.append("<div class='new_row'></div>");
                    }
                    var self = this;
                    this.rateGridContainer.off('click');
                    this.rateGridContainer.off('mouseenter');
                    this.rateGridContainer.on('click', '.square', function () {
                        if (self.readOnly)
                            return;
                        jQuery(this).removeClass('blue');
                        jQuery(this).removeClass('red');
                        jQuery(this).removeClass('green');
                        jQuery(this).removeClass('orange');
                        jQuery(this).addClass(self.selectedColor);
                        self.onUpdateRate();
                    });
                    var upd = _.debounce(function () {
                        _this.onUpdateRate();
                    }, 500);
                    this.rateGridContainer.on('mouseenter', '.square', function (e) {
                        if (self.readOnly)
                            return;
                        if (e['buttons'] == 1) {
                            jQuery(this).removeClass('blue');
                            jQuery(this).removeClass('red');
                            jQuery(this).removeClass('green');
                            jQuery(this).removeClass('orange');
                            jQuery(this).addClass(self.selectedColor);
                            upd();
                        }
                        return false;
                    });
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], RatesTable.prototype, "onRateChange", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], RatesTable.prototype, "readOnly", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', AdnetRateModel_1.AdnetRateModel), 
                    __metadata('design:paramtypes', [AdnetRateModel_1.AdnetRateModel])
                ], RatesTable.prototype, "rates", null);
                __decorate([
                    core_1.ViewChild(Simplelist_1.SimpleList), 
                    __metadata('design:type', Simplelist_1.SimpleList)
                ], RatesTable.prototype, "simpleList", void 0);
                __decorate([
                    core_1.ViewChildren('input'), 
                    __metadata('design:type', core_1.QueryList)
                ], RatesTable.prototype, "inputs", void 0);
                RatesTable = __decorate([
                    core_1.Component({
                        selector: 'RatesTable',
                        moduleId: __moduleName,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        styles: [RatesTable_css_text_1.default],
                        template: RatesTable_html_text_1.default
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], RatesTable);
                return RatesTable;
            }());
            exports_1("RatesTable", RatesTable);
        }
    }
});
