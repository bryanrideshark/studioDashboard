import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";
import * as _ from "lodash";
import {Lib} from "../../../../Lib";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";

@Component({
    selector: 'AdnetConfigTargetProps',
    moduleId: __moduleName,
    templateUrl: 'AdnetConfigTargetProps.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(input-blur)': 'onChangeSharing($event)'
    },
    styles: [`
        .material-switch {
            position: relative;
            padding-top: 10px;
        }
        .btn-group {
            width: 100%;
        }
        .input-group {
            padding-top: 10px;
        }
        
        i {
            width: 20px;
        }
    `]
})

export class AdnetConfigTargetProps {

    constructor(private fb: FormBuilder,
                private appStore: AppStore,
                private adnetAction: AdnetActions) {

        this.contGroup = fb.group({
            'enabled': [''],
            'label': [''],
            'hRate': [''],
            'keys': [''],
            'targetDomain': [''],
            'targetType': [''],
            'comments': [''],
            'standardTimeOffset': [''],
            'url': ['']
        });
        _.forEach(this.contGroup.controls, (value, key: string)=> {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })
    }

    @Input()
    set aAdnetTargetModel(i_adnetTargetModel: AdnetTargetModel) {
        this.targetModel = i_adnetTargetModel;
        this.renderFormInputs();
    }

    @Input()
    adnetCustomerModel: AdnetCustomerModel

    private targetModel: AdnetTargetModel;
    private contGroup: FormGroup;
    private formInputs = {};

    private onChangeSharing(event) {
        this.updateSore();
    }

    private updateSore() {
        setTimeout(()=> {
            let payload = Lib.CleanCharForXml(this.contGroup.value);
            payload.customerId = this.adnetCustomerModel.customerId();
            this.appStore.dispatch(this.adnetAction.saveTargetInfo(payload, this.targetModel.getId()))
        }, 1)
    }

    private renderFormInputs() {
        if (!this.targetModel)
            return;
        _.forEach(this.formInputs, (value, key: string)=> {
            var data = this.targetModel.getKey('Value')[key];
            this.formInputs[key].setValue(data)
        });
    };
}