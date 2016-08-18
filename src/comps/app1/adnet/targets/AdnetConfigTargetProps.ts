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
        '(input-blur)': 'onInputBlur($event)'
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
            'label': [''],
            'contactPerson': [''],
            'contactCell': [''],
            'contactPhone': [''],
            'contactEmail': [''],
            'website': [''],
            'comments': [''],
            'adnetStationEnabled': [''],
            'accountNetwork': [''],
            'globalNetwork': [''],
            'defaultAutoActivate': ['']
        });
        _.forEach(this.contGroup.controls, (value, key: string)=> {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })
    }

    private ngOnInit() {
        // this.adTargets = this.appStore.getState().adnet.getIn(['targets']) || {};
        // this.unsub = this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
        //     this.adTargets = i_adTargets;
        //     this.render();
        // }, 'adnet.targets');
        // this.render();
    }

    @Input()
    set selectedAdnetTargetModel(i_adnetTargetModel: AdnetTargetModel) {
        this.adnetTargetModel = i_adnetTargetModel;
    }

    @Input()
    set adnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.customerModel = i_adnetCustomerModel;
        this.renderFormInputs();
    }

    private adnetTargetModel: AdnetTargetModel;
    private customerModel: AdnetCustomerModel;
    private contGroup: FormGroup;
    private formInputs = {};

    private onInputBlur(event) {
        this.updateSore();
    }

    private onChangeSharing(event) {
        this.updateSore();
    }

    private updateSore() {
        setTimeout(()=> {
            this.appStore.dispatch(this.adnetAction.saveTargetInfo(Lib.CleanCharForXml(this.contGroup.value), this.adnetTargetModel.getId()))
        }, 1)
    }

    private renderFormInputs() {
        if (!this.customerModel)
            return;
        _.forEach(this.formInputs, (value, key: string)=> {
            var data = this.customerModel.getKey('Value')[key];
            this.formInputs[key].setValue(data)
        });
    };
}


