import {Component, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {List} from 'immutable';
import {AppStore} from "angular2-redux-util";
import {StoreModel} from "../../../../models/StoreModel";
import {SimpleList} from "../../../simplelist/Simplelist";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Subscription} from "rxjs/Subscription";
import * as _ from 'lodash';

export interface IPairSelect {
    pairs: List<AdnetPairModel>,
    pairsOutgoing: boolean
}

@Component({
    selector: 'AdnetNetworkCustomerSelector',
    moduleId: __moduleName,
    styles: [`.mn {margin-left: 4px; width: 80%; } option { font-size: 16px; }`],
    template: `            
            <select style="font-family:'FontAwesome', Arial;" (change)="onChanges($event)" class="mn form-control custom longInput">
                <option>&#xf112; Outgoing</option>
                <option>&#xf064; Incoming</option>
            </select>
            <br/>
            <button (click)="onSelectAll()" class="btn-sm mn btn bg-primary">Select all</button>
            <div style="padding-left: 20px">
               <SimpleList *ngIf="outgoing" #simpleListOutgoing
                    [list]="pairsFilteredOutgoing" 
                    (selected)="onSelecting($event)"
                    [multiSelect]="true" 
                    [contentId]="getPairId" [content]="getPairName()">
                </SimpleList>
                
                <SimpleList *ngIf="!outgoing" #simpleListIncoming 
                    [list]="pairsFilteredIncoming" 
                    (selected)="onSelecting($event)"
                    [multiSelect]="true" 
                    [contentId]="getPairId" [content]="getPairName()">
                </SimpleList>
            </div>
            `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetworkCustomerSelector {
    constructor(private appStore: AppStore) {
    }

    ngOnInit() {
        this.pairs = this.appStore.getState().adnet.getIn(['pairs']) || {};
        this.unsub = this.appStore.sub((i_pairs: List<AdnetPairModel>) => {
            this.pairs = i_pairs;
            this.filterPairs();
        }, 'adnet.pairs');
        this.filterPairs();
        this.listenOnCustomerSelected();
        this.announceChange();
        this.selectAllDelayed();
    }

    @ViewChild('simpleListOutgoing')
    simpleListOutgoing: SimpleList;

    @ViewChild('simpleListIncoming')
    simpleListIncoming: SimpleList;

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        if (this.adnetCustomerModel) {
            this.adnetCustomerId = this.adnetCustomerModel.customerId();
            this.filterPairs();
        }
    }

    @Output()
    onPairsSelected: EventEmitter<IPairSelect> = new EventEmitter<IPairSelect>();

    private obs: Subscription;
    private observer: Observer<any>;
    private outgoing = true;
    private pairs: List<AdnetPairModel>
    private pairsFilteredIncoming: List<AdnetPairModel>
    private pairsFilteredOutgoing: List<AdnetPairModel>
    private pairsSelected: List<AdnetPairModel>
    private unsub: Function;
    private adnetCustomerId: number = -1;
    private adnetCustomerModel: AdnetCustomerModel;

    private getIndex(list: List<any>, id: number) {
        return list.findIndex((i: StoreModel) => i['getId']() === id);
    }

    private listenOnCustomerSelected() {
        this.obs = Observable.create((observer: Observer<any>) => {
            this.observer = observer;
        }).debounceTime(50).subscribe((v) => {
            this.pairsSelected = List<AdnetPairModel>();
            _.forEach(v, (value, key) => {
                if (value.selected == true) {
                    var index = this.getIndex(this.pairs, Number(key))
                    if (index > -1)
                        this.pairsSelected = this.pairsSelected.push(this.pairs.get(index));
                }
            })
            this.announceChange();
        })
    }

    private onSelecting(event) {
        this.observer.next(event)
    }

    private onSelectAll() {
        if (this.simpleListIncoming)
            this.simpleListIncoming.itemAllSelected();
        if (this.simpleListOutgoing)
            this.simpleListOutgoing.itemAllSelected();
    }

    private getPairId(i_adnetPairModel: AdnetPairModel) {
        if (!i_adnetPairModel)
            return;
        return i_adnetPairModel.getId();
    }

    private getPairName(i_adnetPairModel: AdnetPairModel) {
        var self = this;
        return (i_adnetPairModel: AdnetPairModel) => {
            var customers: List<AdnetCustomerModel> = self.appStore.getState().adnet.getIn(['customers']);
            if (this.outgoing) {
                var index = this.getIndex(customers, i_adnetPairModel.getToCustomerId())
            } else {
                var index = this.getIndex(customers, i_adnetPairModel.getCustomerId())
            }
            var customer: AdnetCustomerModel = customers.get(index);
            return customer.getName();
        }
    }

    private filterPairs() {
        if (!this.pairs)
            return;
        this.pairsFilteredIncoming = List<AdnetPairModel>();
        this.pairsFilteredOutgoing = List<AdnetPairModel>();
        this.pairs.forEach((i_pair: AdnetPairModel) => {
            if (this.outgoing) {
                if (i_pair.getCustomerId() == this.adnetCustomerId)
                    this.pairsFilteredOutgoing = this.pairsFilteredOutgoing.push(i_pair);
            } else {
                if (i_pair.getToCustomerId() == this.adnetCustomerId)
                    this.pairsFilteredIncoming = this.pairsFilteredIncoming.push(i_pair);
            }
        })
    }

    private onChanges(event) {
        this.outgoing = !this.outgoing;
        if (this.simpleListOutgoing)
            this.simpleListOutgoing.deselect();
        if (this.simpleListIncoming)
            this.simpleListIncoming.deselect();
        this.filterPairs();
        this.announceChange();
        this.selectAllDelayed();
    }

    private selectAllDelayed() {
        setTimeout(() => {
            this.onSelectAll();
        }, 50)
    }

    private announceChange() {
        const data: IPairSelect = {
            pairs: this.pairsSelected,
            pairsOutgoing: this.outgoing
        }
        this.onPairsSelected.emit(<IPairSelect>data);
    }

    private ngOnDestroy() {
        this.unsub();
        this.obs.unsubscribe();
    }
}