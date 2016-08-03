import {StoreModel} from "../models/StoreModel";
export class AdnetRateModel extends StoreModel {

    constructor(data: any = {}) {
        super(data);
    }

    public rateId() {
        return this.getKey('Key');
    }

    public customerId() {
        return this.getKey('Value').customerId;
    }

    public rateMap() {
        return this.getKey('Value').rateMap;
    }

    public setField(i_field, i_value) {
        var value = this.getKey('Value');
        value[i_field] = i_value;
        return this.setKey<AdnetRateModel>(AdnetRateModel, 'Value', value);
    }

    public rateLevels(): string[] {
        var a = [
            this.getKey('Value').hourRate0,
            this.getKey('Value').hourRate1,
            this.getKey('Value').hourRate2,
            this.getKey('Value').hourRate3
        ]
        return a;
    }
}