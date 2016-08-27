import {Component, OnInit, Input} from '@angular/core';
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {List} from 'immutable';
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {AppStore} from "angular2-redux-util";

@Component({
    selector: 'AdnetConfigTargets',
    moduleId: __moduleName,
    templateUrl: 'AdnetConfigTargets.html'

})
export class AdnetConfigTargets {

    constructor(private appStore:AppStore){
    }

    ngOnInit() {
        this.unsub = this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
            i_adTargets.forEach((i_adTarget:AdnetTargetModel)=>{
                if (this.adnetTargetModel && i_adTarget.getId() == this.adnetTargetModel.getId()){
                    this.adnetTargetModel = i_adTarget;
                    return;
                }
            })
        }, 'adnet.targets');
    }

    @Input()
    set adnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.customerModel = i_adnetCustomerModel;
    }

    private unsub: Function;
    private customerModel: AdnetCustomerModel;
    public adnetTargetModel: AdnetTargetModel;

    private onTargetSelected(event){
        this.adnetTargetModel = event;
    }

    ngOnDestroy(){
        this.unsub();
    }
}
