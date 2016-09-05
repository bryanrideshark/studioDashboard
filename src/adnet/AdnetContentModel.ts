import {StoreModel} from "../models/StoreModel";
export class AdnetContentModel extends StoreModel {

    constructor(data: any = {}) {
        super(data);
    }

    public getId() {
        return this.getKey('Key');
    }

    public getName() {
        return this.getKey('Value').contentLabel;
    }

    public duration() {
        return this.getKey('Value').duration;
    }

    public repetition() {
        return this.getKey('Value').reparationsPerHour;
    }

    public percentage() {
        //todo: need to compute
        return 'TBA';
    }
}