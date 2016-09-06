import {Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {AdnetContentModel} from "../../../../adnet/AdnetContentModel";
import {Lib} from "../../../../Lib";
import * as _ from "lodash";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";

@Component({
    moduleId: __moduleName,
    selector: 'AdnetNetworkPackageProps',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {'(input-blur)': 'onFormChange($event)'},
    templateUrl: 'AdnetNetworkPackageProps.html',
    styleUrls: ['AdnetNetworkPackageCommonStyles.css']
})
export class AdnetNetworkPackageProps {
    constructor(private fb: FormBuilder, private appStore: AppStore, private adnetAction: AdnetActions) {

        this.contGroup = fb.group({
            'maintainAspectRatio': [''],
            'duration': ['10'],
            'reparationsPerHour': ['60']
        });
        _.forEach(this.contGroup.controls, (value, key: string) => {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })
    }

    @Input()
    set setAdnetPackageModels(i_adnetPackageModels: AdnetPackageModel) {
        this.adnetPackageModels = i_adnetPackageModels;
        if (!this.adnetPackageModels)
            return;
        this.packageName =  this.adnetPackageModels.getName();
        // var contents = this.adnetPackageModels.getContents();
        // this.adnetContents = List<AdnetContentModel>()
        // for (let content of contents) {
        //     var adnetContentModel: AdnetContentModel = new AdnetContentModel(content);
        //     this.adnetContents = this.adnetContents.push(adnetContentModel);
        // }
        // this.simpleGridTable.deselect();
    }

    private adnetPackageModels: AdnetPackageModel;
    private adnetContentModels: AdnetContentModel;
    private contGroup: FormGroup;
    private formInputs = {};
    private packageName = '';

    private onFormChange(event) {
        this.updateSore();
    }

    private updateSore() {
        setTimeout(() => {
            //todo: update store on changes of content props
            console.log(this.contGroup.status + ' ' + JSON.stringify(Lib.CleanCharForXml(this.contGroup.value)));
            // this.appStore.dispatch(this.adnetAction.saveCustomerInfo(Lib.CleanCharForXml(this.contGroup.value), this.customerModel.customerId()))
        }, 1)
    }

    private renderFormInputs() {
        if (!this.adnetContentModels)
            return;
        _.forEach(this.formInputs, (value, key: string) => {
            var data = this.adnetContentModels.getKey('Value')[key];
            this.formInputs[key].setValue(data)
        });
    };
}