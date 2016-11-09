System.register(['@angular/core', 'highcharts'], function(exports_1, context_1) {
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
    var core_1, Highcharts;
    var ServerAvg;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Highcharts_1) {
                Highcharts = Highcharts_1;
            }],
        execute: function() {
            window['Highcharts'] = Highcharts;
            ServerAvg = (function () {
                function ServerAvg() {
                    var self = this;
                    this._options = {
                        chart: {
                            type: 'spline',
                            height: 228,
                            borderColor: '#d9d9d9',
                            borderWidth: 1,
                            animation: Highcharts['svg'],
                            marginRight: 10,
                            events: {
                                load: function () {
                                    var series = this.series[0];
                                    setInterval(function () {
                                        var x = (new Date()).getTime();
                                        series.addPoint([x, self._data], true, true);
                                    }, 2500);
                                }
                            }
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            labels: {
                                enabled: false
                            },
                            categories: []
                        },
                        credits: {
                            enabled: false
                        },
                        yAxis: [{
                                min: 0,
                                title: {
                                    text: 'average response time'
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
                        series: [
                            {
                                name: 'Random data',
                                data: (function () {
                                    var data = [], time = (new Date()).getTime(), i;
                                    for (i = -60; i <= 0; i++) {
                                        data.push({
                                            x: time + i * 1000,
                                            y: 0
                                        });
                                    }
                                    return data;
                                })()
                            }
                        ]
                    };
                }
                Object.defineProperty(ServerAvg.prototype, "data", {
                    set: function (value) {
                        this._data = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                ServerAvg.prototype.onInit = function (chart) {
                    this._chart = chart;
                    this._series = chart.series[0];
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], ServerAvg.prototype, "data", null);
                ServerAvg = __decorate([
                    core_1.Component({
                        selector: 'ServerAvg',
                        template: "\n        <div style=\"width: 100%; height: 150px\">\n           <Loading *ngIf=\"_data == 0\" [size]=\"50\" [style]=\"{'margin-top': '150px'}\"></Loading>            \n            <div *ngIf=\"_data !=  0\">\n                <div [ng2-highcharts]=\"_options\" (init)=\"onInit($event)\" class=\"graph\"></div>\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ServerAvg);
                return ServerAvg;
            }());
            exports_1("ServerAvg", ServerAvg);
        }
    }
});
