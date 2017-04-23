import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {AdnetContentModel} from "../../../../adnet/AdnetContentModel";
import {Lib} from "../../../../Lib";
import * as _ from "lodash";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import {Compbaser} from "ng-mslib";

//todo: add volume property control of contentType == video

@Component({
    selector: 'AdnetNetworkPackageContentProps',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {'(input-blur)': 'onFormChange($event)'},
    templateUrl: './AdnetNetworkPackageContentProps.html',
    styleUrls: ['./AdnetNetworkPackageCommonStyles.css']
})
export class AdnetNetworkPackageContentProps extends Compbaser {
    inDevMode;
    constructor(private fb: FormBuilder, private appStore: AppStore, private adnetAction: AdnetActions) {
        super();
        this.inDevMode = Lib.DevMode();
        this.contGroup = fb.group({
            'maintainAspectRatio': [''],
            'duration': ['10'],
            'reparationsPerHour': ['60'],
            'locationLat': [''],
            'locationLng': [''],
            'locationRadios': [''],
        });
        _.forEach(this.contGroup.controls, (value, key: string) => {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })
    }

    @Input()
    set setAdnetPackageModels(i_adnetPackageModels: AdnetPackageModel) {
        if (!i_adnetPackageModels)
            return;
        this.adnetPackageModels = i_adnetPackageModels;
        this.renderFormInputs();
    }

    @Input()
    set setAdnetContentModels(i_adnetContentModels: AdnetContentModel) {
        this.adnetContentModels = i_adnetContentModels;
        if (!i_adnetContentModels)
            return;
        this.renderFormInputs();
    }

    @Input() showResourceOnly: boolean = false;

    adnetPackageModels: AdnetPackageModel;
    adnetContentModels: AdnetContentModel;
    contGroup: FormGroup;
    formInputs = {};
    resource: string = '';

    private onFormChange(event) {
        this.updateSore();
    }

    private updateSore() {
        setTimeout(() => {
            var payload = Lib.CleanCharForXml(this.contGroup.value);
            this.appStore.dispatch(this.adnetAction.updAdnetContentProps(payload, this.adnetContentModels, this.adnetPackageModels));
        }, 1)
    }

    private renderFormInputs() {
        if (!this.adnetContentModels)
            return;
        this.resource = this.adnetContentModels.getContentUrl()
        _.forEach(this.formInputs, (value, key: string) => {
            var data = this.adnetContentModels.getKey('Value')[key];
            this.formInputs[key].setValue(data)
        });
    };
}


