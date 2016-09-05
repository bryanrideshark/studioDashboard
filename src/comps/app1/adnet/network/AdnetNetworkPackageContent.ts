import {Component, ChangeDetectionStrategy, Input, ViewChild} from "@angular/core";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import {AdnetContentModel} from "../../../../adnet/AdnetContentModel";
import {List} from 'immutable';
import {SimpleGridTable} from "../../../simplegrid/SimpleGridTable";

@Component({
    selector: 'AdnetNetworkPackageContent',
    moduleId: __moduleName,
    template: `
            <div>
                <simpleGridTable #simpleGridR>
                    <thead>
                    <tr>
                        <th [sortableHeader]="['Value','contentLabel']" [sort]="sort">name</th>
                        <th [sortableHeader]="['Value','duration']" [sort]="sort">duration</th>
                        <th [sortableHeader]="['Value','reparationsPerHour']" [sort]="sort">repetition</th>
                        <th [sortableHeader]="['Value','percentage']" [sort]="sort">percentage</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="simpleGridRecord" (onClicked)="onContentSelect(item)" simpleGridRecord *ngFor="let item of adnetContents | OrderBy:sort.field:sort.desc; let index=index" [item]="item" [index]="index">
                        <td style="width: 25%" simpleGridData [processField]="processAdnetPackageField('getName')" [item]="item"></td>
                        <td style="width: 25%" simpleGridData [processField]="processAdnetPackageField('duration')" [item]="item"></td>
                        <td style="width: 25%" simpleGridData [processField]="processAdnetPackageField('repetition')" [item]="item"></td>
                        <td style="width: 25%" simpleGridData [processField]="processAdnetPackageField('percentage')" [item]="item"></td>
                    </tr>
                    </tbody>
                </simpleGridTable>
            </div>
              `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetworkPackageContent {
    constructor() {
    }

    @ViewChild(SimpleGridTable)
    simpleGridTable:SimpleGridTable;

    @Input()
    set setAdnetPackageModels(i_adnetPackageModels: AdnetPackageModel) {
        this.adnetPackageModels = i_adnetPackageModels;
        if (!this.adnetPackageModels)
            return;
        var contents = this.adnetPackageModels.getContents();
        this.adnetContents = List<AdnetContentModel>()
        for (let content of contents) {
            var adnetContentModel: AdnetContentModel = new AdnetContentModel(content);
            this.adnetContents = this.adnetContents.push(adnetContentModel);
        }
        this.simpleGridTable.deselect();
    }

    private onContentSelect(i_content:AdnetContentModel){
        this.selectedAdnetContentModel = i_content;
    }

    private processAdnetPackageField(i_function:string) {
        return (i_adnetContentModel:AdnetContentModel) => {
            return i_adnetContentModel[i_function]();
        }
    }

    private adnetContents: List<AdnetContentModel>;
    private adnetPackageModels: AdnetPackageModel;
    public selectedAdnetContentModel: AdnetContentModel;
    public sort: {field: string, desc: boolean} = {field: null, desc: false};
}