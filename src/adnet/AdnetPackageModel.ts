import {StoreModel} from "../models/StoreModel";

export class AdnetPackageModel extends StoreModel {

    constructor(data: any = {}) {
        super(data);
    }

    public getId() {
        return this.getKey('Key');
    }

    public getName() {
        return this.getKey('Value').label;
    }

    public getCustomerId(){
        return this.getKey('Value').customerId;
    }
}