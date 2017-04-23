import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {List} from "immutable";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import {AppStore} from "angular2-redux-util";
import {IsimplelistItem, simplelist} from "../../../simplelist/simplelist";
import {AdnetNetworkPropSelector, IAdNetworkPropSelectedEvent, TabType} from "./AdnetNetwork";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {AdnetActions, ContentTypeEnum} from "../../../../adnet/AdnetActions";
import {Compbaser} from "ng-mslib";
import {Lib} from "../../../../Lib";
// import * as bootbox from "bootbox";

@Component({
    selector: 'AdnetNetworkPackageEditor',
    templateUrl: './AdnetNetworkPackageEditor.html',
    styleUrls: ['./AdnetNetworkPackageEditor.css'],
})

export class AdnetNetworkPackageEditor extends Compbaser {
    inDevMode;
    constructor(private appStore: AppStore, private adnetAction: AdnetActions, private cd: ChangeDetectorRef) {
        super();
        this.inDevMode = Lib.DevMode();
    }

    ngOnInit() {
        this.packages = this.appStore.getState().adnet.getIn(['packages']) || {};
        this.cancelOnDestroy(this.appStore.sub((i_adPackages: List<AdnetPackageModel>) => {
            this.packages = i_adPackages;
            this.onFilterPackages();
        }, 'adnet.packages'));
        this.onFilterPackages();
    }

    @Input()
    set setPairOutgoing(i_setPairOutgoing: boolean) {
        this.pairOutgoing = i_setPairOutgoing;
        if (this.pairOutgoing == true)
            this.onFilterPackages();
    }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        this.onFilterPackages();
    }

    @ViewChild(simplelist) simplelist: simplelist;

    @Input() setAdnetPairModels: List<AdnetPairModel>

    @Output() onPropSelected: EventEmitter<IAdNetworkPropSelectedEvent> = new EventEmitter<IAdNetworkPropSelectedEvent>();

    @Output() onAdnetPacakgedSelected: EventEmitter<AdnetPackageModel> = new EventEmitter<AdnetPackageModel>();

    @Output() onAdnetTargetsSelected: EventEmitter<List<AdnetTargetModel>> = new EventEmitter<List<AdnetTargetModel>>();

    @Output() onAdnetTargetSelected: EventEmitter<AdnetTargetModel> = new EventEmitter<AdnetTargetModel>();

    adnetCustomerModel: AdnetCustomerModel;
    packages: List<AdnetPackageModel>
    packagesFiltered: List<AdnetPackageModel>
    pairOutgoing: boolean;
    public selectedAdnetPackageModel: AdnetPackageModel;

    onAdd(event) {
        var id = this.adnetCustomerModel.customerId();
        this.appStore.dispatch(this.adnetAction.addAdnetPackages(id));
    }

    onRemove(event) {
        if (!this.selectedAdnetPackageModel) return;
        bootbox.confirm({
            message: "are you sure you want to delete this adnet packages?",
            callback: (result) => {
                if (!result)
                    return;
                this.appStore.dispatch(this.adnetAction.removeAdnetPackage(this.selectedAdnetPackageModel.getId(), this.adnetCustomerModel.customerId()));
                this.selectedAdnetPackageModel = null;
                this.onAdnetPacakgedSelected.emit(null);
            }
        });
    }

    processAdnetPackageField(i_function: string) {
        return (i_adnetPackageModel: AdnetPackageModel) => {
            return i_adnetPackageModel[i_function]();
        }
    }

    onTargetSearchSelected(event) {
        this.onPropSelected.emit({selected: AdnetNetworkPropSelector.TARGET})
    }

    onFilterPackages() {
        if (!this.packages || !this.adnetCustomerModel)
            return;
        this.packagesFiltered = List<AdnetPackageModel>();
        this.packages.forEach((i_package: AdnetPackageModel) => {
            if (i_package.getCustomerId() == this.adnetCustomerModel.getId())
                this.packagesFiltered = this.packagesFiltered.push(i_package);
        })
        this.cd.markForCheck();
        this.notifyAdnetTargetChange();
    }

    getId(i_adnetPackageModel: AdnetPackageModel) {
        if (!i_adnetPackageModel)
            return;
        return i_adnetPackageModel.getId();
    }

    notifyAdnetTargetChange() {
        if (!this.selectedAdnetPackageModel)
            return;
        var targetsIds = this.selectedAdnetPackageModel.getTargetIds();
        var targets: List<AdnetTargetModel> = this.appStore.getState().adnet.getIn(['targets']) || {};
        var selectedAdnetTargetModels = targets.filter((i_adnetTargetModel: AdnetTargetModel) => {
            return (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1)
        }) as List<AdnetTargetModel>;
        this.onAdnetTargetsSelected.emit(selectedAdnetTargetModels);
        this.cd.markForCheck();
    }

    onSelecting(event) {
        var itemSelected: IsimplelistItem = this.simplelist.getSelected() as IsimplelistItem;
        this.selectedAdnetPackageModel = itemSelected.item;
        this.onPropSelected.emit({selected: AdnetNetworkPropSelector.PACKAGE})
        this.onAdnetPacakgedSelected.emit(this.selectedAdnetPackageModel)
        this.notifyAdnetTargetChange();
    }

    onDropboxFileSelected(event) {
        if (!this.selectedAdnetPackageModel)
            return bootbox.alert('first select a Package from the above accordion Packages tab, to add this file onto your selected package');
        this.appStore.dispatch(this.adnetAction.addAdnetPackageContent(event, this.selectedAdnetPackageModel, ContentTypeEnum.DROPBOX));
    }

    getName(i_adnetPackageModel: AdnetPackageModel) {
        if (i_adnetPackageModel)
            return i_adnetPackageModel.getName();
    }

    adnetTargetSelected(tab: TabType, i_adnetTargetModel: AdnetTargetModel) {
        this.onAdnetTargetSelected.emit(i_adnetTargetModel);
    }

    destroy() {
    }
}
