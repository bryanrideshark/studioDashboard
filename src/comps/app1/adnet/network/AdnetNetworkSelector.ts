import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {List} from 'immutable';
import {AppStore} from "angular2-redux-util";
import {StoreModel} from "../../../../models/StoreModel";

@Component({
    selector: 'AdnetNetworkSelector',
    moduleId: __moduleName,
    styles: [`
                select {
                    margin-left: 4px;
                    width: 80%;                    
                }
                option {
                    font-size: 16px;
                }
                
            `],
    template: `
            <select style="font-family:'FontAwesome', Arial;" (change)="onChanges($event)" class="form-control custom longInput">
                <option [selected]="getSelected(dropItem)">&#xf064; Incoming</option>
                <option [selected]="getSelected(dropItem)">&#xf112; Outgoing</option>
            </select>
            <div *ngIf="pairsFiltered" style="padding-left: 20px">
               <SimpleList #simpleList [list]="pairsFiltered" 
                    [contentId]="getPairId" [content]="getPairName()">
                    
                </SimpleList>
            </div>
            `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetworkSelector {
    constructor(private appStore: AppStore) {
        console.log(this.appStore);
    }

    ngOnInit() {
        this.pairs = this.appStore.getState().adnet.getIn(['pairs']) || {};
        this.unsub = this.appStore.sub((i_pairs: List<AdnetPairModel>) => {
            this.pairs = i_pairs;
            // this.filterPairs();
        }, 'adnet.pairs');
        // this.filterPairs();
    }

    private getPairId(i_adnetPairModel: AdnetPairModel) {
        return i_adnetPairModel.getId();
    }

    private getPairName(i_adnetPairModel: AdnetPairModel) {
        var self = this;
        return (i_adnetPairModel: AdnetPairModel) => {
            var getIndex = function (list: List<any>, id: string) {
                return list.findIndex((i: StoreModel) => i['getId']() === id);
            }
            var customers: List<AdnetCustomerModel> = self.appStore.getState().adnet.getIn(['customers']);
            var index = getIndex(customers, i_adnetPairModel.getToCustomerId())
            var customer: AdnetCustomerModel = customers.get(index);
            return customer.getName();
        }
    }

    private filterPairs() {
        this.pairsFiltered = List<AdnetPairModel>();
        this.pairs.forEach((i_pair: AdnetPairModel) => {
            if (i_pair.getCustomerId() == this.adnetCustomerId)
                this.pairsFiltered = this.pairsFiltered.push(i_pair);
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

    }

    private getSelected(i_dropItem): string {
        // if (this.m_testSelection) {
        //     return this.m_testSelection(i_dropItem, this.m_storeModel);
        // }
        return '';
    }
}