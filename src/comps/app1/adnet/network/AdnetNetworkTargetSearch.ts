import {
    Component,
    Input,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
    ChangeDetectorRef
} from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormBuilder
} from "@angular/forms";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import * as _ from "lodash";
import {
    IAdNetworkPropSelectedEvent,
    AdnetNetworkPropSelector
} from "./AdnetNetwork";
import {Compbaser} from "../../../compbaser/Compbaser";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {Lib} from "../../../../Lib";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {List} from "immutable";

@Component({
    selector: 'AdnetNetworkTargetSearch',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
                                                   [formControl]="contGroup.controls['globalSearch']"
                                                   id="customerNetwork2" #customerNetwork2
                                                   name="customerNetwork2" type="checkbox"/>
                                            <label for="customerNetwork2" class="label-primary"></label>
                                        </div>
                                    </li>
                                    
                                    <li class="list-group-item">
                                        <div class="btn-group" role="group">
                                          <select  [formControl]="contGroup.controls['searchType']" style="width: 100%"  class="form-control">
                                            <option *ngFor="let item of searchTypes">{{item}}</option>
                                          </select>
                                        </div>
                                        <button (click)="onSearch($event)" class="pull-right btn btn-primary">Search</button>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-circle-o-notch"></i></span>
                                            <input type="text" [formControl]="contGroup.controls['customerName']" 
                                                   class="form-control"
                                                   placeholder="customer name">
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-circle-o-notch"></i></span>
                                            <input type="text" [formControl]="contGroup.controls['targetName']" 
                                                   class="form-control"
                                                   placeholder="target name">
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-circle-o-notch"></i></span>
                                            <input type="text" [formControl]="contGroup.controls['targetKey']" 
                                                   class="form-control"
                                                   placeholder="target key">
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-circle-o-notch"></i></span>
                                            <input type="number" [formControl]="contGroup.controls['lat']" 
                                                   class="form-control"
                                                   placeholder="lat">
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-circle-o-notch"></i></span>
                                            <input type="number" [formControl]="contGroup.controls['lng']" 
                                                   class="form-control"
                                                   placeholder="lng">
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-circle-o-notch"></i></span>
                                            <input type="number" [formControl]="contGroup.controls['radios']" 
                                                   class="form-control"
                                                   placeholder="lng">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
                <SimpleList [list]="adnetTargetModels" [content]="getContent()" [multiSelect]="false"></SimpleList>
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
    constructor(private fb: FormBuilder, private appStore: AppStore, private adnetAction: AdnetActions, private cd: ChangeDetectorRef) {
        super();
        this.contGroup = fb.group({
            'searchType': [''],
            'globalSearch': [''],
            'customerName': [''],
            'targetName': [''],
            'targetKey': [''],
            'lat': [''],
            'lng': [''],
            'radios': ['']
        });
        _.forEach(this.contGroup.controls, (value, key: string) => {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })
    }

    ngOnInit() {
        this.cancelOnDestroy(this.appStore.sub((i_adnetTargetModels: List<AdnetTargetModel>) => {
            //this.renderFormInputs();
            this.adnetTargetModels = null;
            this.adnetTargetModels = i_adnetTargetModels;
            this.cd.markForCheck();
        }, 'adnet.targets_search'));
    }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        if (this.adnetCustomerModel)
            this.renderFormInputs();
    }

    @Output() onPropSelected: EventEmitter<IAdNetworkPropSelectedEvent> = new EventEmitter<IAdNetworkPropSelectedEvent>();

    private searchTypes: Array<any> = ['Select adnet search type:', 'Station', 'Mobile', 'Website'];
    private adnetCustomerModel: AdnetCustomerModel;
    private adnetTargetModels: List<AdnetTargetModel>;
    private contGroup: FormGroup;
    private formInputs = {};
    private globalNetworkEnabled: boolean = false;

    private getContent() {
        var self = this;
        return (i_adnetTargetModel: AdnetTargetModel) => {
            //todo: investigate runotside angular
            // https://medium.com/@NetanelBasal/angular-2-escape-from-change-detection-317b3b44906b#.hc1zpseu7
            var customersList: List<AdnetCustomerModel> = self.appStore.getState().adnet.getIn(['customers']);
            var adnetTargetCustomerId = i_adnetTargetModel.getCustomerId();
            var adnetCustomerModel = customersList.filter((i_adnetCustomerModel: AdnetCustomerModel) => {
                return Number(adnetTargetCustomerId) == i_adnetCustomerModel.getId();
            }).first() as AdnetCustomerModel;
            return adnetCustomerModel.getName();
        }
    }

    private onSearch() {
        var searchType = this.searchTypes.indexOf(this.contGroup.value.searchType) - 1;
        searchType < 0 ? searchType = 0 : searchType;
        var globalSearch = this.contGroup.value.globalSearch == true ? 1 : 0;
        var lat = !Lib.Exists(this.contGroup.value.lat) ? 0 : this.contGroup.value.lat;
        var lng = !Lib.Exists(this.contGroup.value.lng) ? 0 : this.contGroup.value.lng;
        var radios = !Lib.Exists(this.contGroup.value.radios) ? -1 : this.contGroup.value.radios;
        this.onPropSelected.emit({selected: AdnetNetworkPropSelector.TARGET})

        this.appStore.dispatch(
            this.adnetAction.searchAdnet(
                this.adnetCustomerModel.customerId(),
                searchType,
                this.contGroup.value.customerName,
                this.contGroup.value.targetName,
                this.contGroup.value.targetKey,
                globalSearch,
                lat,
                lng,
                radios
            ));
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
