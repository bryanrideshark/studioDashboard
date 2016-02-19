import {Component, Input} from 'angular2/core'
import {StoreModel} from "../../models/StoreModel";

@Component({
    selector: 'td[SimpleGridData]',
    template: `
         value: {{_value}}
    `
})
export class SimpleGridData {
    private _value;
    storeModel:StoreModel;

    @Input()
    set item(i_storeModel:StoreModel) {
        this.storeModel = i_storeModel
    }

    @Input()
    set type(field) {
        this._value = this.storeModel.getKey(field)
    }

}

