import {
    Component,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import {Compbaser} from "../../../compbaser/Compbaser";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {List} from "immutable";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";

@Component({
    selector: 'AdnetReports',
    template: `<h3>Reports</h3>
                incoming {{pairOutgoing}} <br/>
                includeAll: {{reportIncludeAll}}
                
               `,
    moduleId: __moduleName
})


export class AdnetReports extends Compbaser {

    constructor() {
        super();
    }

    @Input()
    set setPairOutgoing(i_setPairOutgoing: boolean) {
        this.pairOutgoing = i_setPairOutgoing;
        this.onFilterPackages();
    }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        this.onFilterPackages();
    }

    @Input()
    set setAdnetPairModels(i_adnetPairModels: List<AdnetPairModel>) {
        // this.simpleGridTable.deselect();
        this.adnetPairModels = i_adnetPairModels;
        if (this.adnetPairModels)
            this.reportIncludeAll = this.adnetPairModels.size < 2 ? false : true;
        // this.onFilterPackages();
    }

    @Input()
    set setAdnetTargetModel(i_adnetTargetModel: AdnetTargetModel) {
        // this.simpleGridTable.deselect();
        this.adnetTargetModel = i_adnetTargetModel;
        // if (!this.adnetTargetModel)
        //     return;
        // this.onFilterPackages();
    }

    private adnetCustomerModel: AdnetCustomerModel;
    private adnetPairModels: List<AdnetPairModel>;
    private reportIncludeAll:boolean;

    // private targets: List<AdnetTargetModel>
    // private packages: List<AdnetPackageModel>
    private adnetTargetModel: AdnetTargetModel;
    // private packagesFiltered: List<AdnetPackageModel>
    private pairOutgoing: boolean

    private onFilterPackages() {

        if (this.pairOutgoing) {
            console.log('o');
        } else {
            console.log('i');
        }

        // if (!this.targets || !this.packages || !this.adnetCustomerModel || !this.adnetPairModels)
        //     return;
        // if (this.filterByTargetModel && !this.adnetTargetModel)
        //     return;
        // this.packagesFiltered = List<AdnetPackageModel>();
        // var uniqueIds = [];
        // if (this.pairOutgoing) {
        //     /** Outgoing ads, reverse engineer from targets  **/
        //     this.packages.forEach((i_package: AdnetPackageModel) => {
        //         if (i_package.deleted() == true)
        //             return;
        //         if (i_package.enabled() != true)
        //             return;
        //         var targetsIds = i_package.getTargetIds();
        //         this.targets.forEach((i_adnetTargetModel: AdnetTargetModel) => {
        //             if (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1) {
        //                 var adnetTargetCustomerId = i_adnetTargetModel.getCustomerId();
        //                 this.adnetPairModels.forEach((i_adnetPairModels: AdnetPairModel) => {
        //                     if (adnetTargetCustomerId == i_adnetPairModels.getToCustomerId()) {
        //                         if (uniqueIds.indexOf(i_package.getId()) == -1) {
        //                             uniqueIds.push(i_package.getId())
        //                             if (this.filterByTargetModel){
        //                                 if (i_package.getTargetIds().indexOf(this.adnetTargetModel.getId()) > -1)
        //                                     this.packagesFiltered = this.packagesFiltered.push(i_package);
        //                             } else {
        //                                 this.packagesFiltered = this.packagesFiltered.push(i_package);
        //                             }
        //                         }
        //                     }
        //                 })
        //             }
        //         });
        //     });
        // } else {
        //     /** Incoming ads **/
        //     this.packages.forEach((i_package: AdnetPackageModel) => {
        //         if (i_package.deleted() == true)
        //             return;
        //         if (i_package.enabled() != true)
        //             return;
        //         var targetsIds = i_package.getTargetIds();
        //         this.targets.forEach((i_adnetTargetModel: AdnetTargetModel) => {
        //             if (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1) {
        //                 this.adnetPairModels.forEach((i_adnetPairModels: AdnetPairModel) => {
        //                     //todo: give an option for active and autoActivated on / off in UI
        //                     // if (i_adnetPairModels.active() == false && i_adnetPairModels.autoActivated() == false)
        //                     //     return;
        //                     var cusTotId = i_adnetPairModels.getToCustomerId();
        //                     var custId = i_adnetPairModels.getCustomerId();
        //                     var custIdSel = this.adnetCustomerModel.customerId();
        //                     var pkgCustId = i_package.getCustomerId();
        //                     if (pkgCustId == custId && cusTotId == custIdSel) {
        //                         if (uniqueIds.indexOf(i_package.getId()) == -1) {
        //                             uniqueIds.push(i_package.getId())
        //                             if (this.filterByTargetModel){
        //                                 if (i_package.getTargetIds().indexOf(this.adnetTargetModel.getId()) > -1)
        //                                     this.packagesFiltered = this.packagesFiltered.push(i_package);
        //                             } else {
        //                                 this.packagesFiltered = this.packagesFiltered.push(i_package);
        //                             }
        //                         }
        //                     }
        //                 })
        //             }
        //         });
        //     })
        // }
    }


    ngOnInit() {
    }

    destroy() {}
}