import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import * as _ from "lodash";
import {Lib} from "../../../../Lib";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";

@Component({
    selector: 'AdnetConfigCustomer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(input-blur)': 'onInputBlur($event)'
    },
    templateUrl: './AdnetConfigCustomer.html',
    styleUrls: ['./AdnetConfigCustomer.css']
})
export class AdnetConfigCustomer {
    constructor(private fb: FormBuilder, private appStore: AppStore, private adnetAction: AdnetActions) {

        this.contGroup = fb.group({
            'label': [''],
            'contactPerson': [''],
            'contactCell': [''],
            'contactPhone': [''],
            'contactEmail': [''],
            'website': [''],
            'comments': [''],
            'customerNetwork': [''],
            'accountNetwork': [''],
            'globalNetwork': [''],
            'defaultAutoActivate': ['']
        });
        _.forEach(this.contGroup.controls, (value, key: string) => {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })
    }

    @Input()
    set adnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.customerModel = i_adnetCustomerModel;
        this.renderFormInputs();
    }

    customerModel: AdnetCustomerModel;
    contGroup: FormGroup;
    formInputs = {};

     onInputBlur(event) {
        this.updateSore();
    }

     onChangeSharing(event) {
        this.updateSore();
    }

     updateSore() {
        setTimeout(() => {
            this.appStore.dispatch(this.adnetAction.saveCustomerInfo(Lib.CleanCharForXml(this.contGroup.value), this.customerModel.customerId()))
        }, 1)
    }

     renderFormInputs() {
        if (!this.customerModel)
            return;
        _.forEach(this.formInputs, (value, key: string) => {
            var data = this.customerModel.getKey('Value')[key];
            this.formInputs[key].setValue(data)
        });
    };
}