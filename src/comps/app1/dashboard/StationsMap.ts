import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/core";
import {StationModel} from "../../../stations/StationModel";
import * as _ from "lodash";

interface marker {
    id:number;
    lat:number;
    lng:number;
    color:string;
    name:string;
    label?:string;
    draggable:boolean;
}
@Component({
    selector: 'stationsMap',
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
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
                  [iconUrl]="getMarkerIcon(m)"
                  [label]="m.label">
                <!--<sebm-google-map-info-window>-->
                  <!--<strong>InfoWindow content</strong>-->
                <!--</sebm-google-map-info-window>-->
        
      </sebm-google-map-marker>
    </sebm-google-map>
    `
})
export class StationsMap {
    constructor(private cdr:ChangeDetectorRef) {
        setInterval(()=> {
            this.cdr.reattach();
            setTimeout(()=> {
                this.cdr.detach();
            }, 1000)
        }, 3000)
    }

    markers:marker[] = [];
    zoom:number = 4;

    // initial center position for the map
    lat:number = 39.8282;
    lng:number = 98.5795;

    getMarkerIcon(m:marker) {
        this.cdr.detach();
        return `assets/screen_${m.color}.png`;
    }

    clickedMarker(marker:marker, index:number) {
        this.onStationSelected.next(marker.id);
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
        var c = 0;
        this.m_stations.forEach((i_station:StationModel)=> {
            var geoLocation = i_station.getLocation();
            if (_.isEmpty(geoLocation))
                return;
            this.markers.push({
                id: i_station.getStationId(),
                name: i_station.getKey('name'),
                color: i_station.getConnectionIcon('color'),
                lat: +geoLocation.lat,
                lng: +geoLocation.lon,
                label: String(c++),
                draggable: false
            })
        });
    }
}
