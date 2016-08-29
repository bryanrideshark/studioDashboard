import {Component, ChangeDetectionStrategy, Input, ViewChild} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {List} from 'immutable';
import {AppStore} from "angular2-redux-util";
import {StoreModel} from "../../../../models/StoreModel";
import {SimpleList} from "../../../simplelist/Simplelist";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'AdnetNetworkSelector',
    moduleId: __moduleName,
    styles: [`
                .mn {
                    margin-left: 4px;
                    width: 80%;                    
                }
                option {
                    font-size: 16px;
                }
                
            `],
    template: `            
            <select style="font-family:'FontAwesome', Arial;" (change)="onChanges($event)" class="mn form-control custom longInput">
                <option [selected]="getSelected(dropItem)">&#xf112; Outgoing</option>
                <option [selected]="getSelected(dropItem)">&#xf064; Incoming</option>
            </select>
            <br/>
            <button (click)="onSelectAll()" class="btn-sm mn btn bg-primary">Select all</button>
            <div *ngIf="pairsFiltered" style="padding-left: 20px">
               <SimpleList #simpleList [list]="pairsFiltered" 
                    (selected)="onSelecting($event)"
                    [multiSelect]="true" 
                    [contentId]="getPairId" [content]="getPairName()">
                    
                </SimpleList>
            </div>
            `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetworkSelector {
    constructor(private appStore: AppStore) {
    }

    ngOnInit() {
        this.pairs = this.appStore.getState().adnet.getIn(['pairs']) || {};
        this.unsub = this.appStore.sub((i_pairs: List<AdnetPairModel>) => {
            this.pairs = i_pairs;
            this.filterPairs();
        }, 'adnet.pairs');
        this.filterPairs();
        this.listenOnPackageSelected();
    }

    @ViewChild(SimpleList)
    simpleList: SimpleList;

    private obs: Subscription;
    private observer: Observer<any>;


    private listenOnPackageSelected(){
        this.obs = Observable.create((observer: Observer<any>) => {
            this.observer = observer;
        }).debounceTime(50).subscribe((v) => {
            console.log(v);
        })
    }

    private onSelecting(event) {
        this.observer.next(event)
    }

    private onSelectAll() {
        this.simpleList.itemAllSelected();
    }

    private getPairId(i_adnetPairModel: AdnetPairModel) {
        return i_adnetPairModel.getId();
    }

    private outgoing = true;

    private getPairName(i_adnetPairModel: AdnetPairModel) {
        var self = this;
        return (i_adnetPairModel: AdnetPairModel) => {
            var getIndex = function (list: List<any>, id: string) {
                return list.findIndex((i: StoreModel) => i['getId']() === id);
            }
            var customers: List<AdnetCustomerModel> = self.appStore.getState().adnet.getIn(['customers']);
            if (this.outgoing) {
                var index = getIndex(customers, i_adnetPairModel.getToCustomerId())
            } else {
                var index = getIndex(customers, i_adnetPairModel.getCustomerId())
            }
            var customer: AdnetCustomerModel = customers.get(index);
            return customer.getName();
        }
    }

    private filterPairs() {
        if (!this.pairs)
            return;
        this.pairsFiltered = List<AdnetPairModel>();
        this.pairs.forEach((i_pair: AdnetPairModel) => {
            if (this.outgoing) {
                if (i_pair.getCustomerId() == this.adnetCustomerId)
                    this.pairsFiltered = this.pairsFiltered.push(i_pair);
            } else {
                if (i_pair.getToCustomerId() == this.adnetCustomerId)
                    this.pairsFiltered = this.pairsFiltered.push(i_pair);
            }
        })
    }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        if (this.adnetCustomerModel) {
            this.adnetCustomerId = this.adnetCustomerModel.customerId();
            this.filterPairs();
        }
    }

    private pairs: List<AdnetPairModel>
    private pairsFiltered: List<AdnetPairModel>
    private unsub: Function;
    private adnetCustomerId: number = -1;
    private adnetCustomerModel: AdnetCustomerModel;

    private onChanges(event) {
        if (event.target.value.indexOf('Outgoing') > -1) {
            this.outgoing = true;
        } else {
            this.outgoing = false;
        }
        this.filterPairs();
    }

    private getSelected(i_dropItem): string {
        // if (this.m_testSelection) {
        //     return this.m_testSelection(i_dropItem, this.m_storeModel);
        // }
        return '';
    }

    ngOnDestroy() {
        this.unsub();
        this.obs.unsubscribe();
    }
}