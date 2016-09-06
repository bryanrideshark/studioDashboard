import {Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetContentModel} from "../../../../adnet/AdnetContentModel";
import {Lib} from "../../../../Lib";
import * as _ from "lodash";

@Component({
    selector: 'AdnetNetworkPackageContentProps',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(input-blur)': 'onFormChange($event)'
    },
    moduleId: __moduleName,
    template: `<div>
                <form novalidate autocomplete="off" [formGroup]="contGroup">
                    <div class="row">
                        <div class="inner userGeneral">
                            <div class="panel panel-default tallPanel">
                                <div class="panel-heading">properties
                                    <i style="font-size: 1.8em" class="fa fa-cog pull-right"></i>
                                </div>
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        maintain aspect ratio
                                        <div class="material-switch pull-right">
                                            <input (change)="onFormChange(customerNetwork2.checked)"
                                                   [formControl]="contGroup.controls['label']"
                                                   id="customerNetwork2" #customerNetwork2
                                                   name="customerNetwork2" type="checkbox"/>
                                            <label for="customerNetwork2" class="label-primary"></label>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-clock-o"></i></span>
                                            <input [formControl]="contGroup.controls['label']" required
                                                   pattern="[0-9]|[a-z]+"
                                                   type="text" class="form-csasontrol" minlength="3" maxlength="15"
                                                   placeholder="duration">
                                                   <div *ngIf="!contGroup.controls['label'].valid" class="alert alert-warning alert-dismissible" role="alert">
                                                        <strong>Warning!</strong> please use valid entry
                                                   </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-circle-o-notch"></i></span>
                                            <input type="number" [formControl]="contGroup.controls['label2']" min="0"
                                                   class="form-control"
                                                   placeholder="repetitions">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
    `,
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
export class AdnetNetworkPackageContentProps {
    constructor(private fb: FormBuilder,
                private appStore: AppStore,
                private adnetAction: AdnetActions) {

        this.contGroup = fb.group({
            'label': ['foo'],
            'label2': ['bar']
        });
        _.forEach(this.contGroup.controls, (value, key: string) => {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })
    }

    @Input()
    set setAdnetContentModels(i_adnetContentModels: AdnetContentModel) {
        this.adnetContentModels = i_adnetContentModels;
        if (this.adnetContentModels)
            console.log(this.adnetContentModels.getName());
    }

    private adnetContentModels: AdnetContentModel;
    private customerModel: AdnetCustomerModel;
    private contGroup: FormGroup;
    private formInputs = {};

    private onFormChange(event) {
        this.updateSore();
    }

    private updateSore() {
        setTimeout(() => {
            console.log(this.contGroup.status + ' ' + JSON.stringify(Lib.CleanCharForXml(this.contGroup.value)));
            // this.appStore.dispatch(this.adnetAction.saveCustomerInfo(Lib.CleanCharForXml(this.contGroup.value), this.customerModel.customerId()))
        }, 1)
    }

    private renderFormInputs() {
        if (!this.customerModel)
            return;
        _.forEach(this.formInputs, (value, key: string) => {
            var data = this.customerModel.getKey('Value')[key];
            this.formInputs[key].setValue(data)
        });
    };
}




