import {StoreModel} from "../models/StoreModel";
export class AdnetTargetModel extends StoreModel {

    constructor(data:any = {}) {
        super(data);
    }

    public targetId(){
        return this.getKey('Key');
    }

    public getName(){
        return this.getKey('Value').label;
    }

    public getCustomerId(){
        return this.getKey('Value').customerId;
    }
}