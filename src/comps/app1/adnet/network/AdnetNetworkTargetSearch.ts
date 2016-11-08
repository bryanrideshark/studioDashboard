import {
    Component,
    Input,
    ChangeDetectionStrategy,
    EventEmitter,
    Output
} from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormBuilder
} from "@angular/forms";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {Lib} from "../../../../Lib";
import * as _ from "lodash";
import {
    IAdNetworkPropSelectedEvent,
    AdnetNetworkPropSelector
} from "./AdnetNetwork";
import {Compbaser} from "../../../compbaser/Compbaser";
import {List} from "immutable";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";

@Component({
    selector: 'AdnetNetworkTargetSearch',
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
                                <div class="panel-heading">
                                    <small class="release">target properties
                                        <i style="font-size: 1.4em" class="fa fa-cog pull-right"></i>
                                    </small>
                                <small class="debug">{{me}}</small>
                                </div>
                                <ul class="list-group">
                                    <li *ngIf="this.globalNetworkEnabled" class="list-group-item">
                                        global Adnet search
                                        <div class="material-switch pull-right">
                                            <input (change)="onFormChange(customerNetwork2.checked)"
                                                   [formControl]="contGroup.controls['searchType']"
                                                   id="customerNetwork2" #customerNetwork2
                                                   name="customerNetwork2" type="checkbox"/>
                                            <label for="customerNetwork2" class="label-primary"></label>
                                        </div>
                                    </li>
                                    
                                    <li class="list-group-item">
                                        <div class="btn-group" role="group">
                                          <!--<select (change)="onStationsFilterSelected('os', $event.target.value)" class="form-control">-->
                                          <select style="width: 100%"  class="form-control">
                                            <option *ngFor="let item of ['Search Ad network by: ','Station','Mobile','Website']">{{item}}</option>
                                          </select>
                                        </div>
                                        <button (click)="onSearch($event)" class="pull-right btn btn-primary">Search</button>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-clock-o"></i></span>
                                            <input [formControl]="contGroup.controls['customerName']" 
                                                   pattern="[0-9]|[a-z]+"
                                                   type="text" class="form-control" minlength="3" maxlength="15"
                                                   placeholder="type">
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-circle-o-notch"></i></span>
                                            <input type="number" [formControl]="contGroup.controls['customerName']" 
                                                   class="form-control"
                                                   placeholder="customer name">
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-circle-o-notch"></i></span>
                                            <input type="number" [formControl]="contGroup.controls['targetName']" 
                                                   class="form-control"
                                                   placeholder="target name">
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-circle-o-notch"></i></span>
                                            <input type="number" [formControl]="contGroup.controls['targetKey']" 
                                                   class="form-control"
                                                   placeholder="target key">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
                <SimpleList></SimpleList>
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
        li {
            border: none;
        }
        i {
            width: 20px;
        }
    `]
})
export class AdnetNetworkTargetSearch extends Compbaser {
    constructor(private fb: FormBuilder, private appStore: AppStore, private adnetAction: AdnetActions) {
        super();
        this.contGroup = fb.group({
            'searchType': [''],
            'globalSearch': [''],
            'customerName': [''],
            'targetName': [''],
            'targetKey': ['']
        });
        _.forEach(this.contGroup.controls, (value, key: string) => {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })
    }

    // ngOnInit() {
    //     this.cancelOnDestroy(this.appStore.sub((i_adnetCustomerModels: List<AdnetCustomerModel>) => {
    //         this.renderFormInputs();
    //     }, 'adnet.customers'));
    // }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        if (this.adnetCustomerModel)
            this.renderFormInputs();
    }

    @Output() onPropSelected: EventEmitter<IAdNetworkPropSelectedEvent> = new EventEmitter<IAdNetworkPropSelectedEvent>();

    private adnetCustomerModel: AdnetCustomerModel;
    private contGroup: FormGroup;
    private formInputs = {};
    private globalNetworkEnabled: boolean = false;

    private onSearch() {
        this.onPropSelected.emit({selected: AdnetNetworkPropSelector.TARGET})
    }

    private onFormChange(event) {
        // this.updateSore();
    }

    // private updateSore() {
    //     // setTimeout(() => {
    //     // console.log(this.contGroup.status + ' ' + JSON.stringify(Lib.CleanCharForXml(this.contGroup.value)));
    //     // this.appStore.dispatch(this.adnetAction.saveCustomerInfo(Lib.CleanCharForXml(this.contGroup.value), this.customerModel.customerId()))
    //     // }, 1)
    // }

    private renderFormInputs() {
        this.globalNetworkEnabled = this.adnetCustomerModel.getGlobalNetwork();
        // _.forEach(this.formInputs, (value, key: string) => {
        //     var data = this.setadnetCustomerModel.getKey('Value')[key];
        //     this.formInputs[key].setValue(data)
        // });
    };
}
