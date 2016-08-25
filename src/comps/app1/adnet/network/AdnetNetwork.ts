import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";

@Component({
    selector: 'AdnetNetwork',
    moduleId: __moduleName,
    styles: [`
        .bgGreen { background-color: green}
        .bgYellow { background-color: yellow}
        .bgRed { background-color: red}
    `],
    template: `            
           <div class="row">                        
                <div class="col-xs-2">
                    <AdnetNetworkSelector [setAdnetCustomerModel]="adnetCustomerModel"></AdnetNetworkSelector>
                </div>
                <div class="col-xs-10">                
                    <div class="row">
                        <tabs>
                            <tab [tabtitle]="'Packages'">
                                <div class="bgGreen col-xs-3">a</div>
                                <div class="bgYellow col-xs-5">b</div>
                                <div class="bgRed col-xs-4">c</div>
                            </tab>
                            <tab [tabtitle]="'Targets'">
                                <div class="bgGreen col-xs-2">aa</div>
                                <div class="bgYellow col-xs-2">bb</div>
                                <div class="bgRed col-xs-8">cc</div>
                            </tab>
                            <tab [tabtitle]="'Estimates'">
                                <div class="bgGreen col-xs-6">aaa</div>
                                <div class="bgYellow col-xs-6">bbb</div>
                            </tab>
                            <tab [tabtitle]="'Reports'">
                                <div class="bgGreen col-xs-5">aaaa</div>
                                <div class="bgYellow col-xs-7">bbbb</div>
                            </tab>
                
                        </tabs>                        
                    </div>
                </div>
            </div>
            `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetwork {

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        if (this.adnetCustomerModel)
            this.adnetCustomerId = this.adnetCustomerModel.customerId();
    }

    private adnetCustomerId: number = -1;
    private adnetCustomerModel: AdnetCustomerModel;

}