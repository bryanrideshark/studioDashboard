import {
    Component,
    Input,
    ViewChild,
    EventEmitter,
    Output,
    ChangeDetectorRef
} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {List} from "immutable";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import {AppStore} from "angular2-redux-util";
import {
    SimpleList,
    ISimpleListItem
} from "../../../simplelist/Simplelist";
import {
    AdnetNetworkPropSelector,
    IAdNetworkPropSelectedEvent,
    TabType
} from "./AdnetNetwork";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {
    AdnetActions,
    ContentTypeEnum
} from "../../../../adnet/AdnetActions";
import * as bootbox from "bootbox";
import {Compbaser} from "../../../compbaser/Compbaser";

//import AdnetNetworkPackageEditorTemplate from './AdnetNetworkPackageEditor.html!text'; /*prod*/
//import AdnetNetworkPackageEditorStyle from './AdnetNetworkPackageEditor.css!text'; /*prod*/

@Component({
//	styles: [AdnetNetworkPackageEditorStyle], /*prod*/
//	template: AdnetNetworkPackageEditorTemplate, /*prod*/
    selector: 'AdnetNetworkPackageEditor',
    templateUrl: './AdnetNetworkPackageEditor.html', /*dev*/
    styleUrls: ['./AdnetNetworkPackageEditor.css'], /*dev*/
    moduleId: __moduleName
})

export class AdnetNetworkPackageEditor extends Compbaser {

    constructor(private appStore: AppStore, private adnetAction: AdnetActions, private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.packages = this.appStore.getState().adnet.getIn(['packages']) || {};
        this.cancelOnDestroy(this.appStore.sub((i_adPackages: List<AdnetPackageModel>) => {
            this.packages = i_adPackages;
            this.onFilterPackages();
        }, 'adnet.packages'));
        this.onFilterPackages();

        // this.customers = this.appStore.getState().adnet.getIn(['customers']) || {};
        // this.cancelOnDestroy(this.appStore.sub((i_adnetCustomerModels: List<AdnetCustomerModel>) => {
        //     console.log(this.adnetCustomerModel);
        // }, 'adnet.customers'));
    }

    @ViewChild(SimpleList) simpleList: SimpleList;

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

    @Input() setAdnetPairModels: List<AdnetPairModel>

    @Output() onPropSelected: EventEmitter<IAdNetworkPropSelectedEvent> = new EventEmitter<IAdNetworkPropSelectedEvent>();

    @Output() onAdnetPacakgedSelected: EventEmitter<AdnetPackageModel> = new EventEmitter<AdnetPackageModel>();

    @Output() onAdnetTargetsSelected: EventEmitter<List<AdnetTargetModel>> = new EventEmitter<List<AdnetTargetModel>>();

    @Output() onAdnetTargetSelected: EventEmitter<AdnetTargetModel> = new EventEmitter<AdnetTargetModel>();

    private adnetCustomerModel: AdnetCustomerModel;
    private packages: List<AdnetPackageModel>
    // private customers: List<AdnetCustomerModel>
    private packagesFiltered: List<AdnetPackageModel>
    private pairOutgoing: boolean;
    public selectedAdnetPackageModel: AdnetPackageModel;
    //public selectedAdnetTargetModels: List<AdnetTargetModel>;

    private onAdd(event) {
        var id = this.adnetCustomerModel.customerId();
        this.appStore.dispatch(this.adnetAction.addAdnetPackages(id));
    }

    private onRemove(event) {
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

    private processAdnetPackageField(i_function: string) {
        return (i_adnetPackageModel: AdnetPackageModel) => {
            return i_adnetPackageModel[i_function]();
        }
    }

    private onTargetSearchSelected(event) {
        this.onPropSelected.emit({selected: AdnetNetworkPropSelector.TARGET})
    }

    private onFilterPackages() {
        if (!this.packages || !this.adnetCustomerModel)
            return;
        this.packagesFiltered = List<AdnetPackageModel>();
        this.packages.forEach((i_package: AdnetPackageModel) => {
            if (i_package.getCustomerId() == this.adnetCustomerModel.getId())
                this.packagesFiltered = this.packagesFiltered.push(i_package);
        })
        this.cd.markForCheck();
    }

    private getId(i_adnetPackageModel: AdnetPackageModel) {
        if (!i_adnetPackageModel)
            return;
        return i_adnetPackageModel.getId();
    }

    private onSelecting(event) {
        var itemSelected: ISimpleListItem = this.simpleList.getSelected() as ISimpleListItem;
        this.selectedAdnetPackageModel = itemSelected.item;

        var targetsIds = this.selectedAdnetPackageModel.getTargetIds();
        var targets: List<AdnetTargetModel> = this.appStore.getState().adnet.getIn(['targets']) || {};

        var selectedAdnetTargetModels = targets.filter((i_adnetTargetModel: AdnetTargetModel) => {
            return (targetsIds.indexOf(i_adnetTargetModel.getId()) > -1)
        }) as List<AdnetTargetModel>;

        this.onPropSelected.emit({selected: AdnetNetworkPropSelector.PACKAGE})
        this.onAdnetPacakgedSelected.emit(this.selectedAdnetPackageModel)
        this.onAdnetTargetsSelected.emit(selectedAdnetTargetModels);
    }

    private onDropboxFileSelected(event) {
        if (!this.selectedAdnetPackageModel)
            return bootbox.alert('first select a Package from the above accordion Packages tab, to add this file onto your selected package');
        this.appStore.dispatch(this.adnetAction.addAdnetPackageContent(event, this.selectedAdnetPackageModel, ContentTypeEnum.DROPBOX));
    }

    private getName(i_adnetPackageModel: AdnetPackageModel) {
        if (i_adnetPackageModel)
            return i_adnetPackageModel.getName();
    }

    // private ngOnDestroy() {
    //     this.unsub();
    // }

    private adnetTargetSelected(tab:TabType, i_adnetTargetModel: AdnetTargetModel) {
        this.onAdnetTargetSelected.emit(i_adnetTargetModel);
    }

    destroy() {
    }
}
