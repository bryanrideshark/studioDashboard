import {Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {AdnetContentModel} from "../../../../adnet/AdnetContentModel";
import {Lib} from "../../../../Lib";
import * as _ from "lodash";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import * as moment_ from 'moment';
export const moment =  moment_["default"];


@Component({
    moduleId: __moduleName,
    selector: 'AdnetNetworkPackageProps',
    host: {'(input-blur)': 'onFormChange($event)'},
    templateUrl: 'AdnetNetworkPackageProps.html',
    styleUrls: ['AdnetNetworkPackageCommonStyles.css']
})
export class AdnetNetworkPackageProps {
    constructor(private fb: FormBuilder, private appStore: AppStore, private adnetAction: AdnetActions) {


        //var a = moment().unix().format()
        // console.log(moment.now());
        // console.log(moment().format('dddd'));
        // console.log(moment().startOf('day').fromNow());

        this.contGroup = fb.group({
            'autoAddSiblings': [''],
            'channel': [''],
            'contents': [''],
            'customerId': [''],
            'daysMask': [''],
            'deleted': [''],
            'enabled': [''],
            'endDate': [''],
            'hourEnd': [''],
            'hourStart': [''],
            'label': [''],
            'modified': [''],
            'playMode': [''],
            'siblingsKey': [''],
            'startDate': [''],
        });
        _.forEach(this.contGroup.controls, (value, key: string) => {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })
    }

    @Input()
    set setAdnetPackageModels(i_adnetPackageModels: AdnetPackageModel) {
        this.adnetPackageModels = i_adnetPackageModels;
        //this.packageName =  this.adnetPackageModels.getName();
        this.renderFormInputs();
        // this.simpleGridTable.deselect();
    }

    private adnetPackageModels: AdnetPackageModel;
    private adnetContentModels: AdnetContentModel;
    private contGroup: FormGroup;
    private formInputs = {};
    private packageName = '';
    private hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

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

    private getOptionField(key, index) {
        if (!this.adnetPackageModels)
            return;
        var value = this.adnetPackageModels.getKey('Value')[key];
        if (value == index)
            return 'selected'
        return '';

    }

    private renderFormInputs() {
        if (!this.adnetPackageModels)
            return;
        setTimeout(()=>{})
        _.forEach(this.formInputs, (value, key: string) => {
            var data;
            // if (key=='daysMask'){
            //     data = this.adnetPackageModels.getKey('Value')[key];
            //     data = Lib.GetAccessMask(data)
            // } else {
            //     data = this.adnetPackageModels.getKey('Value')[key];
            // }
            data = this.adnetPackageModels.getKey('Value')[key];
            this.formInputs[key].setValue(data)
        });
    };
}