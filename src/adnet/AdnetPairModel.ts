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

    public setField(i_field, i_value) {
        var value = this.getKey('Value');
        value[i_field] = i_value;
        return this.setKey<AdnetPairModel>(AdnetPairModel, 'Value', value);
    }
}