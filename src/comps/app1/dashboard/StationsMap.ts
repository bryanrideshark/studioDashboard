import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/core";
import {StationModel} from "../../../stations/StationModel";
import * as _ from "lodash";

interface marker {
    id:number;
    lat:number;
    lng:number;
    name:string;
    label?:string;
    draggable:boolean;
}

@Component({
    selector: 'stationsMap',
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.Default,
    template: `
        <sebm-google-map style="width: 100% ; height: 100%" 
              [latitude]="38.2500"
              [longitude]="-96.7500"
              [zoom]="zoom"
              [disableDefaultUI]="false"
              [zoomControl]="false">
            
              <sebm-google-map-marker style="width: 300px ; height: 400px" 
                  *ngFor="let m of markers; let i = index"
                  (markerClick)="clickedMarker(m, i)"
                  [latitude]="m.lat"
                  [longitude]="m.lng"
                  [iconUrl]="getmarkerIcon(m)"
                  [label]="m.label">
                  
                <!--<sebm-google-map-info-window>-->
                  <!--<strong>InfoWindow content</strong>-->
                <!--</sebm-google-map-info-window>-->
        
      </sebm-google-map-marker>
    </sebm-google-map>
    `
})
export class StationsMap {

    markers:marker[] = [];
    zoom:number = 4;

    // initial center position for the map
    lat:number = 39.8282;
    lng:number = 98.5795;

    getmarkerIcon(m:marker) {
        return 'assets/screen_on.png';
    }

    clickedMarker(marker:marker, index:number) {
        this.onStationSelected.next(marker.id);
        //console.log(`clicked the marker: ${label || index}`)
    }


    // mapClicked($event:MouseEvent) {
    //     this.markers.push({
    //         lat: $event.coords.lat,
    //         lng: $event.coords.lng
    //     });
    // }

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
        this.updateStations();
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
        // if (!this.highCharts)
        //     return;
        // var stations = [];
        var c = 0;
        this.m_stations.forEach((i_station:StationModel)=> {
            var geoLocation = i_station.getLocation();
            if (_.isEmpty(geoLocation))
                return;

            // this.markers.push({
            //     lat: 51.673858,
            //     lng: 7.815982,
            //     label: 'A',
            //     draggable: false
            // })

            function pinSymbol(color) {
                return {
                    path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
                    fillColor: 'green',
                    fillOpacity: 1,
                    strokeColor: 'red',
                    strokeWeight: 2,
                    scale: 3,
                };
            }

            var icon = {

                path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
                fillColor: '#000000',
                fillOpacity: .6,
                strokeWeight: 0,
                scale: 3
            }

            this.markers.push({
                id: i_station.getStationId(),
                name: i_station.getKey('name'),
                lat: +geoLocation.lat,
                lng: +geoLocation.lon,
                label: String(c++),
                draggable: false
            })
            // stations.push({
            //     id: i_station.getStationId(),
            //     name: i_station.getKey('name'),
            //     publicIp: i_station.getPublicIp(),
            //     lat: geoLocation.lat,
            //     lon: geoLocation.lon,
            //     color: i_station.getConnectionIcon('color')
            // });
        });
        // this.highCharts.series[1].setData(stations);
    }
}
