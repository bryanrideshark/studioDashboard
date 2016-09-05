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

    public getContents():Array<any> {
        return this.getKey('Value').contents;
    }

    public getCustomerId() {
        return this.getKey('Value').customerId;
    }

    public playMode() {
        return this.getKey('Value').playMode;
    }

    public startDate() {
        return 1
    }

    public endDate() {
        return 1
    }

    public daysMask() {
        return this.getKey('Value').daysMask;
    }

    public hourStart() {
        return this.getKey('Value').hourStart;
    }

    public hourEnd() {
        return this.getKey('Value').hourEnd;
    }

    public channel() {
        return this.getKey('Value').channel;
    }

    public deleted() {
        return this.getKey('Value').deleted;
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

