import {
    Component,
    Input,
    Output,
    ViewChild,
    EventEmitter,
    ChangeDetectionStrategy
} from "@angular/core";
import {StationModel} from "../../../stations/StationModel";
import {SimpleGridTable} from "../../simplegridmodule/SimpleGridTable";
import {SimpleGridRecord} from "../../simplegridmodule/SimpleGridRecord";

@Component({
    selector: 'stationsGrid',
    styles: [`
            .disabled {
               opacity: 0.2;
               cursor: default;
             }
            .stationProps {
               position: relative;
                top: -14px;
                color: #222222;
                left: 2px;
                font-size: 1.2em;
             }
        `],
    template: `
        <div class="row">
             <div class="col-xs-12">
                <div (click)="$event.preventDefault()" style="position: relative; top: 10px">
                    <div>
                      <a class="btns stationProps" href="#" 
                        (click)="!userSimpleGridTable || userSimpleGridTable.getSelected() == null ? '' : launchStationModal()" 
                        [ngClass]="{disabled: !userSimpleGridTable || userSimpleGridTable.getSelected() == null}" href="#">
                        <span class="fa fa-cogs"></span>
                      </a>
                    </div>
                </div>
                  <simpleGridTable #userSimpleGridTable>
                    <thead>
                    <tr>
                      <th sortableHeader="connection" [sort]="sort">connection</th>
                      <th sortableHeader="watchDogConnection" [sort]="sort">watchdog</th>
                      <th sortableHeader="name" [sort]="sort">name</th>
                      <th sortableHeader="businessId" [sort]="sort">business</th>
                      <th sortableHeader="os" [sort]="sort">os</th>
                      <th sortableHeader="status" [sort]="sort">status</th>                      
                      <th sortableHeader="runningTime" [sort]="sort">running</th>
                      <th sortableHeader="totalMemory" [sort]="sort">totalMem</th>
                      <th sortableHeader="peakMemory" [sort]="sort">peakMem</th>
                      <th sortableHeader="airVersion" [sort]="sort">runtime</th>
                      <th sortableHeader="appVersion" [sort]="sort">version</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="simpleGridRecord" (onDoubleClicked)="onDoubleClicked($event)" simpleGridRecord *ngFor="let item of m_stations | OrderBy:sort.field:sort.desc; let index=index" [item]="item" [index]="index">
                      <td style="width: 5%" simpleGridDataImage [color]="item.getConnectionIcon('color')" [field]="item.getConnectionIcon('icon')" [item]="item"></td>
                      <td style="width: 5%" simpleGridDataImage color="dodgerblue" [field]="item.getWatchDogConnection()" [item]="item"></td>
                      <td style="width: 25%" simpleGridData editable="false" field="name" [item]="item"></td>
                      <td style="width: 5%" simpleGridData editable="false" field="businessId" [item]="item"></td>
                      <td style="width: 20%" simpleGridData editable="false" field="os" [item]="item"></td>
                      <td style="width: 10%" simpleGridData editable="false" field="status" [item]="item"></td>                      
                      <td style="width: 5%" simpleGridData editable="false" field="runningTime" [item]="item"></td>
                      <td style="width: 5%" simpleGridData editable="false" field="totalMemory" [item]="item"></td>
                      <td style="width: 5%" simpleGridData editable="false" field="peakMemory" [item]="item"></td>
                      <td style="width: 10%" simpleGridData editable="false" field="airVersion" [item]="item"></td>
                      <td style="width: 5%" simpleGridData editable="false" field="appVersion" [item]="item"></td>
                    </tr>
                    </tbody>
                  </simpleGridTable>
             </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationsGrid {

    @ViewChild(SimpleGridTable) simpleGridTable: SimpleGridTable

    @Input()
    set stations(i_stations) {
        this.m_stations = i_stations;
    }

    @Output() onStationSelected: EventEmitter<StationModel> = new EventEmitter<StationModel>();

    private onDoubleClicked(event) {
        this.launchStationModal(event.item);
    }

    private launchStationModal(i_stationModel?: StationModel) {
        if (!i_stationModel)
            i_stationModel = this.selectedStation();
        //console.log('A ' + i_stationModel.getStationName() + ' ' + i_stationModel.getStationId());
        // this.modalAddUserSample.open('lg');
        // alert(stationModel.getKey('businessId'));
        this.onStationSelected.emit(i_stationModel)
    }

    private selectedStation(): StationModel {
        if (!this.simpleGridTable)
            return null;
        let selected: SimpleGridRecord = this.simpleGridTable.getSelected();
        return selected ? this.simpleGridTable.getSelected().item : '';
    }

    private onSelectStation(event) {

    }

    private m_stations;
    public sort: {field: string, desc: boolean} = {
        field: null,
        desc: false
    };

}

