import {Component, Input, ViewChild} from "@angular/core";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {StationModel} from "../../../../stations/StationModel";
import {List} from 'immutable';
import * as _ from 'lodash';
import {StationsMap} from "../../dashboard/StationsMap";

@Component({
    selector: 'AdnetLocation',
    moduleId: __moduleName,
    template: `<stationsMap #stationsMap (onStationSelected)="onStationModalOpen($event)" *ngIf="stationComponentMode=='map'" [stations]="stations"></stationsMap>`
})

export class AdnetLocation {

    @ViewChild(StationsMap)
    stationsMap: StationsMap;

    @Input()
    set adnetTargetModel(i_adnetTargetModel: AdnetTargetModel) {
        if (!i_adnetTargetModel)
            return;
        this.selectedAdnetTargetModel = i_adnetTargetModel;
        var stationData = {
            businessId: this.selectedAdnetTargetModel.getCustomerId,
            id: this.selectedAdnetTargetModel.getCustomerId,
            geoLocation: {
                lat: this.selectedAdnetTargetModel.getCoordinates().lat,
                lon: this.selectedAdnetTargetModel.getCoordinates().lng
            },
            source: -1,
            airVersion: -1,
            appVersion: -1,
            caching: -1,
            localIp: -1,
            publicIp: -1,
            cameraStatus: -1,
            connection: -1,
            lastCameraTest: -1,
            lastUpdate: -1,
            name: this.selectedAdnetTargetModel.getName(),
            os: '',
            peakMemory: '',
            runningTime: '',
            socket: '',
            startTime: '',
            status: '',
            totalMemory: '',
            watchDogConnection: ''
        };
        this.stations = List<StationModel>();
        var stationModel: StationModel = new StationModel(stationData)
        this.stations = this.stations.push(stationModel);
        if (this.stationsMap) {
            this.stationsMap.setCenter(stationModel.getLocation().lat, stationModel.getLocation().lon);
        }
    }

    @Input()
    set activated(value) {
        if (value)
            this.stationComponentMode = 'map';
    }

    private stationComponentMode: string;
    private onStationModalOpen(event) {

    }

    private stations: List<StationModel> = List<StationModel>();
    private selectedAdnetTargetModel: AdnetTargetModel;
}