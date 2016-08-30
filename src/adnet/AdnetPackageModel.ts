import {StoreModel} from "../models/StoreModel";

export class AdnetPackageModel extends StoreModel {

    constructor(data: any = {}) {
        super(data);
    }

    public getId() {
        return this.getKey('Key');
    }

    public getCustomerId(){
        return this.getKey('Value').customerId;
    }
}