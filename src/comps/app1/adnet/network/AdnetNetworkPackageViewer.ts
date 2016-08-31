import {Component, Input} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {List} from "immutable";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import {AppStore} from "angular2-redux-util";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";

@Component({
    selector: 'AdnetNetworkPackageViewer',
    moduleId: __moduleName,
    templateUrl: 'AdnetNetworkPackageViewer.html'
})

export class AdnetNetworkPackageViewer {

    constructor(private appStore: AppStore) {
    }

    ngOnInit() {
        this.packages = this.appStore.getState().adnet.getIn(['packages']) || {};
        this.unsub1 = this.appStore.sub((i_adPackages: List<AdnetPackageModel>) => {
            this.packages = i_adPackages;
            this.filterPackages();
        }, 'adnet.packages');
        this.targets = this.appStore.getState().adnet.getIn(['targets']) || {};
        this.unsub2 = this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
            this.targets = i_adTargets;
            this.filterPackages();
        }, 'adnet.targets');

        this.filterPackages();
    }

    @Input()
    set setPairOutgoing(i_setPairOutgoing: boolean) {
        this.pairOutgoing = i_setPairOutgoing;
        this.filterPackages();
    }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        this.filterPackages();
    }

    @Input()
    set setAdnetPairModels(i_adnetPairModels: List<AdnetPairModel>) {
        this.adnetPairModels = i_adnetPairModels;
        this.filterPackages();
    }

    private unsub1: Function;
    private unsub2: Function;
    private adnetCustomerModel: AdnetCustomerModel;
    private adnetPairModels: List<AdnetPairModel>;
    private targets: List<AdnetTargetModel>
    private packages: List<AdnetPackageModel>
    private packagesFiltered: List<AdnetPackageModel>
    private pairOutgoing: boolean

    private onAdd(event) {
    }

    private onRemove(event) {
    }

    private filterPackages() {
        if (!this.targets || !this.packages || !this.adnetCustomerModel)
            return;
        this.packagesFiltered = List<AdnetPackageModel>();
        this.packages.forEach((i_package: AdnetPackageModel) => {
            var targetsIds = i_package.getTargetIds();
            this.targets.forEach((i_adnetTargetModel: AdnetTargetModel) => {
                if (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1) {
                    var customerId = i_adnetTargetModel.getCustomerId();
                    //todo: fix get(0) and change it to a loop, on multi selection
                    var pairModelSelected:AdnetPairModel = this.adnetPairModels.get(0);
                    if (customerId == pairModelSelected.getToCustomerId()){
                        console.log(i_package.getName());
                    }

                }
            });
        });
    }


    private getId(i_adnetPackageModel: AdnetPackageModel) {
        if (!i_adnetPackageModel)
            return;
        return i_adnetPackageModel.getId();
    }

    private onSelecting(event) {

    }

    private getName(i_adnetPackageModel: AdnetPackageModel) {
        if (i_adnetPackageModel)
            return i_adnetPackageModel.getName();
        // var self = this;
        // return (i_adnetPairModel: AdnetPairModel) => {
        //     var customers: List<AdnetCustomerModel> = self.appStore.getState().adnet.getIn(['customers']);
        //     if (this.outgoing) {
        //         var index = this.getIndex(customers, i_adnetPairModel.getToCustomerId())
        //     } else {
        //         var index = this.getIndex(customers, i_adnetPairModel.getCustomerId())
        //     }
        //     var customer: AdnetCustomerModel = customers.get(index);
        //     return customer.getName();
        // }
    }

    private ngOnDestroy() {
        this.unsub1();
        this.unsub2();
    }
}