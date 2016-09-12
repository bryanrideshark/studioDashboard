import {Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {AppStore} from "angular2-redux-util";
import {Lib} from "../../../../Lib";
import * as _ from "lodash";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {List} from "immutable";

@Component({
    selector: 'AdnetNetworkTargetProps',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(input-blur)': 'onFormChange($event)'
    },
    moduleId: __moduleName,
    templateUrl: 'AdnetNetworkTargetProps.html',
    styles: [`        
        input.ng-invalid {
            border-right: 10px solid red;
        }
        .material-switch {
            position: relative;
            padding-top: 10px;
        }
        .input-group {
            padding-top: 10px;
        }
        i {
            width: 20px;
        }
    `]
})
export class AdnetNetworkTargetProps {
    constructor(private fb: FormBuilder,
                private appStore: AppStore) {

        this['me'] = Lib.GetCompSelector(this.constructor)
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
    set setAdnetTargetModel(i_adnetTargetModel: AdnetTargetModel) {
        this.adnetTargetModel = i_adnetTargetModel;
        if (!this.adnetTargetModel)
            return;

        var customerId = this.adnetTargetModel.getCustomerId();
        var customersList:List<AdnetCustomerModel> = this.appStore.getState().adnet.getIn(['customers']) || {};
        var customerModel:AdnetCustomerModel = customersList.filter((adnetCustomerModel: AdnetCustomerModel) => {
            return customerId == adnetCustomerModel.customerId();
        }).first() as AdnetCustomerModel;

        console.log(this.adnetTargetModel.getCustomerId());
        console.log(customerModel.customerId());


        this.renderFormInputs();
    }

    private adnetTargetModel: AdnetTargetModel;
    private adnetCustomerModel: AdnetCustomerModel;
    private contGroup: FormGroup;
    private formInputs = {};

    private onFormChange(event) {
        this.updateSore();
    }

    private updateSore() {
        setTimeout(() => {
            console.log(this.contGroup.status + ' ' + JSON.stringify(Lib.CleanCharForXml(this.contGroup.value)));
            //this.appStore.dispatch(this.adnetAction.saveCustomerInfo(Lib.CleanCharForXml(this.contGroup.value), this.customerModel.customerId()))
        }, 1)
    }

    private renderFormInputs() {
        if (!this.adnetTargetModel)
            return;
        _.forEach(this.formInputs, (value, key: string) => {
            var data = this.adnetTargetModel.getKey('Value')[key];
            this.formInputs[key].setValue(data)
        });
    };
}

