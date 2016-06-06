import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChange} from '@angular/core'
import {StationModel} from "../../../stations/StationModel";
import * as _ from 'lodash'

@Component({
    selector: 'stationDetails',
    directives: [],
    moduleId: __moduleName,
    templateUrl: 'StationDetails.html',
    styleUrls: ['StationDetails.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class StationDetails {

    constructor(){


    }
    private onModalClose($event) {
    }
    
    private m_selectedStation:StationModel;
    private m_ip:string = '';

    // @Input() station:StationModel;

    @Input()
    set station(i_selectedStation:StationModel){
        if (_.isUndefined(i_selectedStation))
            return;
        this.m_selectedStation = i_selectedStation;
        // this.m_selectedStation.getPublicIp()
        // this.m_selectedStation.getLocalIp()
        // this.m_selectedStation.getLocation().lat
        // this.m_selectedStation.getLocation().lon
        // this.m_selectedStation.getLocation().city
        // this.m_selectedStation.getLocation().country
    }
}

