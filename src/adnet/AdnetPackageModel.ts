import {StoreModel} from "../models/StoreModel";
import {AdnetPackagePlayMode} from "../comps/app1/adnet/network/AdnetNetwork";

export class AdnetPackageModel extends StoreModel {

    constructor(data: any = {}) {
        super(data);
    }

    // private adnetPackagePlayMode:AdnetPackagePlayMode;

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

    public playModeName() {
        var mode:AdnetPackagePlayMode = this.getKey('Value').playMode;
        switch (mode){
            case AdnetPackagePlayMode.ASSETS:
                return "asset"
            case AdnetPackagePlayMode.LOCATION:
                return "location"
            case AdnetPackagePlayMode.TIME:
                return "time"
        }


    }

    public startDate() {
        return this.getKey('Value').startDate;
    }

    public endDate() {
        return this.getKey('Value').endDate;
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

    public enabled() {
        return this.getKey('Value').enabled;
    }

    public getTargetIds(): Array<number> {
        var result:Array<number> = [];
        var targets:Array<any> = this.getKey('Value').targets;
        targets.forEach((k,v)=>{
            if (k.Value.deleted==true)
                return;
            result.push(k.Value.targetId);
        })
        return result;

    }
}

