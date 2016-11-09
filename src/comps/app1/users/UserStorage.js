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
    var UserStorage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            UserStorage = (function () {
                function UserStorage() {
                    this.chartOptions = {};
                    this.chartBar = {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie',
                            height: '250'
                        },
                        title: {
                            text: ''
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                                name: 'cloud storage',
                                colorByPoint: true,
                                data: [{
                                        name: 'used',
                                        y: 40
                                    }, {
                                        name: 'free',
                                        y: 60,
                                        sliced: true,
                                        selected: true
                                    }]
                            }]
                    };
                }
                UserStorage = __decorate([
                    core_1.Component({
                        selector: 'UserStorage',
                        template: "\n        <div style=\"width: 100%; height: 80%\">\n             <div [ng2-highcharts]=\"chartBar\" class=\"graph\"></div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], UserStorage);
                return UserStorage;
            }());
            exports_1("UserStorage", UserStorage);
        }
    }
});
