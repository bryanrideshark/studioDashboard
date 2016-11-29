import {StoreModel} from "../models/StoreModel";
import {Lib} from "../Lib";

export class AdnetTransferModel extends StoreModel {

    constructor(data: any = {}) {
        super(data);
    }

    public getId() {
        return this.getKey('Key');
    }

    public date() {
        return Lib.ProcessDateField(this.getKey('Value').paymentDate);
    }

}