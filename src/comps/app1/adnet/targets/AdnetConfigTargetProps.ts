import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";

@Component({
    selector: 'AdnetConfigTargetProps',
    moduleId: __moduleName,
    templateUrl: 'AdnetConfigTargetProps.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetConfigTargetProps {

    constructor(private appStore: AppStore) {

    }

    private adnetCustomerModel:AdnetCustomerModel;

    @Input()
    set selectedAdnetTargetModel(i_adnetCustomerModel:AdnetCustomerModel){
        this.adnetCustomerModel = i_adnetCustomerModel;
    }


    private ngOnDestroy() {
    }
}