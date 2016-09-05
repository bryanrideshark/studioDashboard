import {StoreModel} from "../models/StoreModel";
export class AdnetContent extends StoreModel {

    constructor(data:any = {}) {
        super(data);
    }

    public getId(){
        return this.getKey('Key');
    }
}