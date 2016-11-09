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
    var ServerStats;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ServerStats = (function () {
                function ServerStats() {
                }
                Object.defineProperty(ServerStats.prototype, "data", {
                    set: function (value) {
                        this._data = value;
                        if (this._series) {
                            this._series.setData(value);
                            return;
                        }
                        this._options = {
                            chart: {
                                type: 'column',
                                height: 228,
                                borderColor: '#d9d9d9',
                                borderWidth: 1
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                categories: this.categories
                            },
                            credits: {
                                enabled: false
                            },
                            yAxis: [{
                                    min: 0,
                                    title: {
                                        text: 'servers response time'
                                    }
                                }, {
                                    title: {
                                        text: 'measured in milliseconds'
                                    },
                                    opposite: true
                                }],
                            legend: {
                                enabled: false,
                                shadow: false
                            },
                            tooltip: {
                                shared: true
                            },
                            plotOptions: {
                                column: {
                                    grouping: false,
                                    shadow: false,
                                    borderWidth: 0
                                }
                            },
                            series: [{
                                    data: this._data
                                }]
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                ServerStats.prototype.onInit = function (chart) {
                    this._chart = chart;
                    this._series = chart.series && chart.series[0];
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ServerStats.prototype, "categories", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], ServerStats.prototype, "data", null);
                ServerStats = __decorate([
                    core_1.Component({
                        selector: 'ServerStats',
                        template: "\n        <div style=\"width: 100%\">\n            <Loading *ngIf=\"_data == 0\" [size]=\"50\" [style]=\"{'margin-top': '150px'}\"></Loading>\n            <div *ngIf=\"_data.length > 0\">\n                <div [ng2-highcharts]=\"_options\" (init)=\"onInit($event)\" class=\"graph\"></div>\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ServerStats);
                return ServerStats;
            }());
            exports_1("ServerStats", ServerStats);
        }
    }
});
