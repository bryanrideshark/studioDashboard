import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";

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
            <select style="font-family:'FontAwesome', Arial;" 
                (change)="onChanges($event)" class="form-control custom longInput">
                <option [selected]="getSelected(dropItem)">&#xf064; Incoming</option>
                <option [selected]="getSelected(dropItem)">&#xf112; Outgoing</option>
            </select>
            <div style="padding-left: 20px">
               <SimpleList></SimpleList>
            </div>
            `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetworkSelector {
    constructor() {
    }

    ngOnInit() {
        // this.adTargets = this.appStore.getState().adnet.getIn(['targets']) || {};
        // this.unsub = this.appStore.sub((i_adTargets: List<AdnetTargetModel>) => {
        //     this.adTargets = i_adTargets;
        //     this.render();
        // }, 'adnet.targets');
        // this.render();
    }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        if (this.adnetCustomerModel)
            this.adnetCustomerId = this.adnetCustomerModel.customerId();
    }

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