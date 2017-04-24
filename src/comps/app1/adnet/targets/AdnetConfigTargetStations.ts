import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetTargetModel} from "../../../../adnet/AdnetTargetModel";
import {List} from "immutable";
import {IsimplelistItem, simplelist} from "../../../simplelist/simplelist";
import * as _ from "lodash";
import {Compbaser} from "ng-mslib";
import {Lib} from "../../../../Lib";

@Component({
    selector: 'AdnetConfigTargetStations',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './AdnetConfigTargetStations.html',
    styles: [`
        .row {
            padding: 15px;
        }

        .btns {
            padding: 0 10px 10px 0px;
            font-size: 1.8em;
            color: #313131;
        }

        .btns:hover {
            color: red;
        }

        .enabled {
            opacity: 1
        }

        .disabled {
            opacity: 0.2;
            cursor: default;
        }
    `]
})
export class AdnetConfigTargetStations extends Compbaser {
    inDevMode;
    constructor(private appStore: AppStore, private adnetAction: AdnetActions, private cd: ChangeDetectorRef) {
        super();
        this.inDevMode = Lib.DevMode();
    }

    @ViewChild(simplelist)
    simplelist: simplelist

    @Input()
    set adnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.customerModel = i_adnetCustomerModel;
        this.resetSelection();
    }

    @Output()
    onTargetSelected: EventEmitter<AdnetTargetModel> = new EventEmitter<AdnetTargetModel>();

    ngOnInit() {
        this.adTargets = this.appStore.getState().adnet.getIn(['targets']) || {};
        this.unsub = this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
            this.adTargets = i_adTargets;
            this.render();
        }, 'adnet.targets');
        this.render();
    }

     isWebLocation(): boolean {
        if (!this.selectedAdnetTargetModel || this.selectedAdnetTargetModel.getTargetType() == "0")
            return true;
        return false;
    }

    renderIcon(index: number, adnetTargetModel: AdnetTargetModel) {
        if (adnetTargetModel.getTargetType() == '0')
            return 'fa-tv'
        return 'fa-globe';
    }

     onAddWeb(event) {
        var id = this.customerModel.customerId();
        this.appStore.dispatch(this.adnetAction.addAdnetTargetWeb(id));
    }

     onWebPlayerSnippet() {

    }

     onRemoveWeb(event) {
        if (this.isWebLocation())
            return;
        this.appStore.dispatch(this.adnetAction.removeAdnetTargetWeb(this.selectedAdnetTargetModel.getId(), this.customerModel.customerId()));
        this.simplelist.deselect();

    }

     resetSelection() {
        if (this.customerModel)
            this.render();
        if (this.simplelist)
            this.simplelist.deselect();
    }

     onSelection(items: Array<any>) {
        _.forEach(items, (simpleItem: IsimplelistItem) => {
            if (simpleItem.selected) {
                this.selectedAdnetTargetModel = simpleItem.item;
                this.onTargetSelected.emit(this.selectedAdnetTargetModel);
            }
        })
    }

    selectedAdnetTargetModel: AdnetTargetModel;
    customerModel: AdnetCustomerModel;
    adTargets: List<AdnetTargetModel>;
    adTargetsFiltered: List<AdnetTargetModel> = List<AdnetTargetModel>();
    unsub: Function;

     render() {
        if (!this.adTargets || !this.customerModel)
            return;
        this.adTargetsFiltered = List<AdnetTargetModel>();
        this.adTargets.forEach((i_adTarget: AdnetTargetModel) => {
            // if (i_adTarget.getCustomerId() == this.customerModel.customerId() && i_adTarget.getTargetType() == 0) {
            if (i_adTarget.getCustomerId() == this.customerModel.customerId()) {
                this.adTargetsFiltered = this.adTargetsFiltered.push(i_adTarget);
            }
        })
        this.cd.markForCheck();
    }

    getContent(item: AdnetTargetModel) {
        return item.getName();
    }

    destroy() {
        this.unsub();
    }
}