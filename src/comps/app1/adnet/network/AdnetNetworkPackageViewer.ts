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
        if (this.pairOutgoing){
            this.packages.forEach((i_package: AdnetPackageModel) => {
                var targetsIds = i_package.getTargetIds();
                this.targets.forEach((i_adnetTargetModel: AdnetTargetModel) => {
                    if (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1) {
                        var adnetTargetCustomerId = i_adnetTargetModel.getCustomerId();
                        this.adnetPairModels.forEach((i_adnetPairModels: AdnetPairModel) => {
                            if (adnetTargetCustomerId == i_adnetPairModels.getToCustomerId()) {
                                console.log(i_package.getName() + ' ' + i_adnetPairModels.getToCustomerId());
                            }
                        })
                    }
                });
            });
        } else {
            this.packages.forEach((i_package: AdnetPackageModel) => {
                if (i_package.deleted()==true)
                    return;
                var targetsIds = i_package.getTargetIds();
                this.targets.forEach((i_adnetTargetModel: AdnetTargetModel) => {
                    if (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1) {
                        var adnetTargetCustomerId = i_adnetTargetModel.getCustomerId();
                        this.adnetPairModels.forEach((i_adnetPairModels: AdnetPairModel) => {
                            var cusTotId = i_adnetPairModels.getToCustomerId();
                            var custId = i_adnetPairModels.getCustomerId();
                            var custIdSel = this.adnetCustomerModel.customerId();
                            var pkgName = i_package.getName()
                            var pkgCustId = i_package.getCustomerId();
                            if (pkgName=='PackageTo888')
                                    console.log('');
                            if (pkgCustId == custId && cusTotId == custIdSel ) {
                                console.log(pkgName + ' ' + i_adnetPairModels.getCustomerId());
                            }
                        })
                    }
                });
            })
        }

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