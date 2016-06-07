import {StoreModel} from "../../../models/StoreModel";
import * as _ from "lodash";

/**
 * Thin wrapper of Immutable data around a single business
 * **/
export class OrderDetailModel extends StoreModel {

    constructor(data:any = {}) {
        super(data);
    }

    public getBilling() {
        var billing = this.getKey('billing');
        var address2
        billing.address2.length > 0 ? address2 = billing.address2 + '\n' : address2 = '';
        return `${billing.first_name}\n${billing.last_name}\n${billing.address1}\n${address2}${billing.zip_code}\n${billing.phone1}\n${billing.country}`
    }

    public getShipping() {
        var billing = this.getKey('shipping');
        var address2
        billing.address2.length > 0 ? address2 = billing.address2 + '\n' : address2 = '';
        return `${billing.first_name}\n${billing.last_name}\n${billing.address1}\n${address2}${billing.zip_code}\n${billing.phone1}\n${billing.country}`
    }

    public getDate() {

    }
}