import {StoreModel} from "../models/StoreModel";
export class AdnetCustomerModel extends StoreModel {

    constructor(data:any = {}) {
        super(data);
    }

    public customerId(){
        return this.getKey('Key');
    }

}