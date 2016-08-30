import {StoreModel} from "../models/StoreModel";

export class AdnetPackage extends StoreModel {

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