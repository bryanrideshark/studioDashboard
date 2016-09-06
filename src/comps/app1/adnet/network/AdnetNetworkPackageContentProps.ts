import {Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {AdnetContentModel} from "../../../../adnet/AdnetContentModel";
import {Lib} from "../../../../Lib";
import * as _ from "lodash";

@Component({
    moduleId: __moduleName,
    selector: 'AdnetNetworkPackageContentProps',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {'(input-blur)': 'onFormChange($event)'},
    templateUrl: 'AdnetNetworkPackageContentProps.html',
    styleUrls: ['AdnetNetworkPackageCommonStyles.css']
})
export class AdnetNetworkPackageContentProps {
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

    //todo: make sure that when we update ContentModel, the id is unique across all packages, otherwise we may need to pass in Package id as well
    @Input()
    set setAdnetContentModels(i_adnetContentModels: AdnetContentModel) {
        this.adnetContentModels = i_adnetContentModels;
        if (this.adnetContentModels)
            this.renderFormInputs();
    }

    private adnetContentModels: AdnetContentModel;
    private contGroup: FormGroup;
    private formInputs = {};

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