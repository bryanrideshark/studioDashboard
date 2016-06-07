import {StoreModel} from "../../../models/StoreModel";
import * as _ from "lodash";

/**
 * Thin wrapper of Immutable data around a single business
 * **/
export class OrderDetailModel extends StoreModel {

    constructor(data:any = {}) {
        super(data);
    }

    private fields = ['company', 'first_name', 'last_name', 'address1', 'address2', 'state', 'county', 'zip_code', 'phone1'];

    private getCustomerInfo(type) {
        var str:string = '';
        var data = this.getKey(type);
        this.fields.forEach((field)=> {
            if (data[field] && data[field].length > 0)
                str = str + data[field] + '\n';
        })
        return str;
    }

    public getBilling() {
        return this.getCustomerInfo('billing');
    }

    public getShipping() {
        return this.getCustomerInfo('shipping');
    }

    public getDate() {

    }
}