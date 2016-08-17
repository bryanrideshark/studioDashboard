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

    public getField(i_field){
        return this.getKey('Value')[i_field];
    }

    public getCustomerId(){
        return this.getKey('Value').customerId;
    }

    // 0 stations
    // 2 websites
    public getTargetType(){
        return this.getKey('Value').targetType;
    }
}