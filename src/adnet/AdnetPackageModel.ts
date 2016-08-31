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

    public getCustomerId() {
        return this.getKey('Value').customerId;
    }

    public getTargetIds(): Array<number> {
        var result:Array<number> = [];
        var targets:Array<any> = this.getKey('Value').targets;
        targets.forEach((k,v)=>{
            result.push(k.Value.targetId);
        })
        return result;

    }
}