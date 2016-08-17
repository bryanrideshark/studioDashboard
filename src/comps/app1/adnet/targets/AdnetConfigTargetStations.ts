import {Component, Input, ChangeDetectionStrategy, ViewChild} from "@angular/core";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {SimpleGridTable} from "../../../simplegrid/SimpleGridTable";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {List} from 'immutable';

@Component({
    selector: 'AdnetConfigTargetStations',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(input-blur)': 'onInputBlur($event)'
    },
    moduleId: __moduleName,
    templateUrl: 'AdnetConfigTargetStations.html',
    styles: [`
        .row{
            padding: 10px;
        }
    `]
})
export class AdnetConfigTargetStations {
    constructor(private appStore: AppStore, private adnetAction: AdnetActions) {
    }

    ngOnInit() {
        this.adTargets = this.appStore.getState().adnet.getIn(['targets']) || {};
        this.unsub = this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
            this.adTargets = i_adTargets;
            this.render();
        }, 'adnet.targets');
        this.render();
    }

    @ViewChild(SimpleGridTable)
    simpleGridTable: SimpleGridTable

    @Input()
    set adnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.customerModel = i_adnetCustomerModel;
    }

    public sort: {field: string, desc: boolean} = {field: null, desc: false};
    private customerModel: AdnetCustomerModel;
    private adTargets: List<AdnetTargetModel>;
    private unsub: Function;

    private render() {
        if (!this.adTargets)
            return;
        this.adTargets.forEach((i_adTarget:AdnetTargetModel)=> {
            if (i_adTarget.getCustomerId()==this.customerModel.customerId()){
                console.log(i_adTarget.getCustomerId());
            }
        })
    }

    private updateSore() {
        setTimeout(()=> {
            //this.appStore.dispatch(this.adnetAction.saveCustomerInfo(Lib.CleanCharForXml(this.contGroup.value), this.customerModel.customerId()))
        }, 1)
    }

    ngOnDestroy() {
        this.unsub();
    }
}