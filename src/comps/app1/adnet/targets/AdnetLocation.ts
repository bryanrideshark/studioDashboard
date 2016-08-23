import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {StationModel} from "../../../../stations/StationModel";
import {List} from 'immutable';
import {Dashboard} from "../../dashboard/Dashboard";

@Component({
    selector: 'AdnetLocation',
    moduleId: __moduleName,
    template: `
                <stationsMap (onStationSelected)="onStationModalOpen($event)" *ngIf="selectedAdnetTargetModel" [stations]="stations"></stationsMap>
                <!--<Dashboard></Dashboard>-->
             `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetLocation {
    constructor(){

    }

    @Input()
    set adnetTargetModel(i_adnetTargetModel: AdnetTargetModel) {
        if (!i_adnetTargetModel)
            return;
       this.selectedAdnetTargetModel = i_adnetTargetModel;
        var stationData = {
            businessId: this.selectedAdnetTargetModel.getCustomerId,
            id: this.selectedAdnetTargetModel.getCustomerId,
            geoLocation: {lat: -18.14, lon:0},
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
        var stationModel:StationModel = new StationModel(stationData)
        this.stations = this.stations.push(stationModel);
    }

    private onStationModalOpen(event){

    }

    private stations:List<StationModel> = List<StationModel>();
    private selectedAdnetTargetModel:AdnetTargetModel;
}