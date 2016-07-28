import {Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {BlurForwarder} from "../../../blurforwarder/BlurForwarder";
import {FormControl, REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder} from "@angular/forms";
import * as _ from "lodash";
import {Lib} from "../../../../Lib";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";

@Component({
    selector: 'AdnetConfigCustomer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [BlurForwarder, REACTIVE_FORM_DIRECTIVES],
    host: {
        '(input-blur)': 'onInputBlur($event)'
    },
    moduleId: __moduleName,
    templateUrl: 'AdnetConfigCustomer.html',
    styleUrls: ['AdnetConfigCustomer.css']
})
export class AdnetConfigCustomer {
    constructor(private fb:FormBuilder,
                private appStore:AppStore,
                private adnetAction:AdnetActions) {

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
        _.forEach(this.contGroup.controls, (value, key:string)=> {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })
    }

    @Input()
    set adnetCustomerModel(i_adnetCustomerModel:AdnetCustomerModel) {
        this.customerModel = i_adnetCustomerModel;
        this.renderFormInputs();
    }

    private customerModel:AdnetCustomerModel;
    private contGroup:FormGroup;
    private formInputs = {};
    private customerNetworkValue = '';
    private accountNetworkValue = '';
    private defaultAutoActivateValue = '';
    private globalNetworkValue = '';

    private onInputBlur(event) {
        this.updateSore();
    }

    private onChangeSharing(event) {
        this.updateSore();
    }

    private updateSore(){
        setTimeout(()=> {
            this.appStore.dispatch(this.adnetAction.saveCustomerInfo(Lib.CleanCharForXml(this.contGroup.value)))
        } ,1)
    }

    private renderFormInputs() {
        if (!this.customerModel)
            return;
        _.forEach(this.formInputs, (value, key:string)=> {
            var data = this.customerModel.getKey('Value')[key];
            this.formInputs[key].updateValue(data)
        });
    };
}