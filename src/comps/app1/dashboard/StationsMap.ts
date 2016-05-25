// http://jsfiddle.net/dnbtkmyz/
// http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/maps/demo/map-bubble/
// http://www.highcharts.com/samples/view.php?path=maps/demo/latlon-advanced
// http://plnkr.co/edit/YX7W20?p=preview
// https://github.com/SebastianM/angular2-google-maps
// http://jsfiddle.net/kqck12da/2/
// http://jsfiddle.net/L6mf6yfo/1/
// http://jsfiddle.net/L6mf6yfo/1/
// http://jsfiddle.net/m93r6dsr/41/
// http://jsfiddle.net/omarshe7ta/m93r6dsr/40/

// add this one
// http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/stock/demo/dynamic-update/


import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Ng2Highmaps} from '../../ng2-highcharts/ng2-highcharts';
import {StationModel} from "../../../stations/StationModel";
import * as _ from 'lodash'

// window['Highmaps'] = require('highcharts/modules/map')(Highcharts);
//'highcharts/modules/map': 'npm:highcharts@4.2.5',
//npm install http-server --save-dev
//jspm i --dev systemjs-hot-reloader

import * as Ng2Highcharts from 'highcharts/modules/map';

var hc:any = Ng2Highcharts['default'];
var f = hc(Highcharts);
// alert(Ng2Highcharts['default']);
// Ng2Highcharts['default'](Highcharts);

@Component({
    selector: 'stationsMap',
    directives: [Ng2Highmaps],
    changeDetection: ChangeDetectionStrategy.Default,
    template: `
       <div id="container" style="height: 300px; min-width: 300px; margin: 0 auto">
       <div [ng2-highmaps]="chartMap" (init)="onInit($event)" class="Map"></div>
       </div>
    `
})
export class StationsMap {
    constructor() {
        this.initMap();
    }

    @Input()
    set stations(i_stations) {
        this.m_stations = i_stations;
        this.updateStations();
    }

    @Output() onStationSelected:EventEmitter<any> = new EventEmitter();

    protected chartMap = {};
    private highCharts:any;
    private m_stations;

    onInit(event) {
        console.log(event);//.series[0].setData([1,2,3,4,5]);
        this.highCharts = jQuery(event.el[0]).highcharts();
        this.updateStations();
    }

    private initMap() {
        var self = this;
        jQuery.getScript('world_data.js', function (data) {
            jQuery.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=world-population.json&callback=?', function (data) {
                var mapData = Highcharts['maps']['custom/world'];
                self.chartMap = {
                    chart: {
                        borderWidth: 1,
                        height: 380
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Stations map'
                    },
                    subtitle: {},
                    legend: {
                        enabled: false
                    },
                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: 'bottom'
                        }
                    },
                    plotOptions: {
                        series: {
                            point: {
                                events: {
                                    click: function () {
                                        self.onStationSelected.next(this.id);
                                        // alert(this.name + ' ' + this.id);
                                    }
                                }
                            }
                        }
                    },
                    tooltip: {enabled: false},
                    series: [{
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        },
                        name: 'Countries',
                        mapData: mapData,
                    }, {
                        name: 'Points',
                        type: 'mappoint',
                        data: this.stationsData1
                    }]
                };
            });
        });
    }

    private getStationConnection(i_value) {
        if (i_value == 0)
            return 'red';
        if (i_value == 1)
            return 'green';
        if (i_value == 2)
            return 'yellow';
        return 'black';
    }

    private updateStations() {
        if (!this.m_stations)
            return;
        if (!this.highCharts)
            return;
        var stations = [];
        this.m_stations.forEach((i_station:StationModel)=> {
            var geoLocation = i_station.getLocation();
            if (_.isEmpty(geoLocation))
                return;
            stations.push({
                id: i_station.getStationId(),
                name: i_station.getKey('name'),
                publicIp: i_station.getPublicIp(),
                lat: geoLocation.lat,
                lon: geoLocation.lon,
                color: i_station.getConnectionIcon('color')
            });
        });
        this.highCharts.series[1].setData(stations);
    }
}

;