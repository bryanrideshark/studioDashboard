import {StoreModel} from "../models/StoreModel";

export class AdnetPairModel extends StoreModel {

    constructor(data: any = {}) {
        super(data);
    }

    public getId() {
        return this.getKey('Key');
    }

    public getCustomerId(){
        return this.getKey('Value').customerId;
    }

    public active(){
        return this.getKey('Value').activated;
    }

    public autoActivated(){
        return this.getKey('Value').autoActivate;
    }

    public getToCustomerId(){
        return this.getKey('Value').toCustomerId;
    }
}