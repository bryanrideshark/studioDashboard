import {StoreModel} from "../models/StoreModel";
export class AdnetRateModel extends StoreModel {

    constructor(data:any = {}) {
        super(data);
    }

    public customerId(){
        return this.getKey('Value').customerId;
    }

    public rateMap(){
        return this.getKey('Value').rateMap;
    }

}