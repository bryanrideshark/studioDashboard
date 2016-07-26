import {StoreModel} from "../models/StoreModel";
export class AdnetCustomerModel extends StoreModel {

    constructor(data:any = {}) {
        super(data);
    }

    public customerId(){
        return this.getKey('Key');
    }

    public getName(){
        return this.getKey('Value').label;
    }

    public getContact(){
        return this.getKey('Value').contactPerson;
    }
}