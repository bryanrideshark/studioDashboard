import {StoreModel} from "../models/StoreModel";
export class AdnetReportModel extends StoreModel {

    constructor(data: any = {}) {
        super(data);
    }

    public getId() {
        return this.getKey('Key');
    }

    public getCustomerId() {
        return this.getKey('Value').customerId;
    }

    public getAbsoluteDate() {
        return this.getKey('Value').absoluteDate;
    }

    public getTargetId() {
        return this.getKey('Value').targetId;
    }

    public getReportEnum() {
        return this.getKey('Value').reportEnum;
    }

    public getAbsolutMonth() {
        return this.getKey('Value').absolutMonth;
    }

    public getAvgHourlyRate() {
        return this.getKey('Value').avgHourlyRate;
    }

    public getAvgScreenArea() {
        return this.getKey('Value').avgScreenArea;
    }

    public getCurrentDebit() {
        return this.getKey('Value').currentDebit;
    }

    public getPrevDebit() {
        return this.getKey('Value').prevDebit;
    }

    public getTotalCount() {
        return this.getKey('Value').totalCount;
    }

    public getTotalDuration() {
        return this.getKey('Value').totalDuration;
    }

    public getTotalPrice() {
        return this.getKey('Value').totalPrice;
    }

    public getDurationSize() {
        return this.getKey('Value').durationSize;
    }

    public setField(i_field, i_value) {
        var value = this.getKey('Value');
        value[i_field] = i_value;
        return this.setKey<AdnetReportModel>(AdnetReportModel, 'Value', value);
    }

}