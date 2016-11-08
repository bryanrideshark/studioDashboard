import {
    Component,
    Input
} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {List} from "immutable";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {AppStore} from "angular2-redux-util";
import AdnetConfigTargetsTemplate from "./AdnetConfigTargets.html!text";
import {Compbaser} from "../../../compbaser/Compbaser";

@Component({
    selector: 'AdnetConfigTargets',
    moduleId: __moduleName,
    template: AdnetConfigTargetsTemplate

})
export class AdnetConfigTargets extends Compbaser {

    constructor(private appStore: AppStore) {
        super();
    }

    ngOnInit() {
        this.cancelOnDestroy(
            this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
                i_adTargets.forEach((i_adTarget: AdnetTargetModel) => {
                    if (this.adnetTargetModel && i_adTarget.getId() == this.adnetTargetModel.getId()) {
                        this.adnetTargetModel = i_adTarget;
                        return;
                    }
                })
            }, 'adnet.targets')
        );
    }

    @Input()
    set adnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.customerModel = i_adnetCustomerModel;
    }

    private customerModel: AdnetCustomerModel;
    public adnetTargetModel: AdnetTargetModel;

    private onTargetSelected(event) {
        this.adnetTargetModel = event;
    }

    destroy() {
        console.log('on destroy sub-class');
    }
}


// this.unsub = this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
//     i_adTargets.forEach((i_adTarget:AdnetTargetModel)=>{
//         if (this.adnetTargetModel && i_adTarget.getId() == this.adnetTargetModel.getId()){
//             this.adnetTargetModel = i_adTarget;
//             return;
//         }
//     })
// }, 'adnet.targets');

// this.unsubOnDestroy(
//     this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
//         i_adTargets.forEach((i_adTarget: AdnetTargetModel) => {
//             if (this.adnetTargetModel && i_adTarget.getId() == this.adnetTargetModel.getId()) {
//                 this.adnetTargetModel = i_adTarget;
//                 return;
//             }
//         })
//     }, 'adnet.targets')
// );