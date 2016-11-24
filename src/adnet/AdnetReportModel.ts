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

    public getAvgHourlyRateFormat() {
        return StringJS(this.getAvgHourlyRate()).toCurrency('us');
    }

    public getTotalHourlyFormat() {
        return StringJS(this.getTotalPrice() * 3600 / this.getDurationSize()).toCurrency();
    }

    public getAvgScreenArea() {
        return this.getKey('Value').avgScreenArea;
    }

    public getAvgScreenAreaFormat() {
        return StringJS(this.getAvgScreenArea() * 100).toFloat(2) + '%';
    }

    public getCurrentDebit() {
        return this.getKey('Value').currentDebit;
    }

    public getCurrentDebitFormat() {
        return StringJS(this.getKey('Value').currentDebit).toCurrency();
    }

    public getBalanceFormat() {
        var total = (this.getCurrentDebit()) - (this.getPrevDebit());
        return StringJS(total).toCurrency();
    }

    public getPrevDebit() {
        return this.getKey('Value').prevDebit;
    }

    public getPrevDebitFormat() {
        return StringJS(this.getKey('Value').prevDebit * 100).toCurrency();
    }

    public getTotalCount() {
        return this.getKey('Value').totalCount;
    }

    public getTotalDuration() {
        return this.getKey('Value').totalDuration;
    }

    public getTotalDurationFormat() {
        return (new Date(this.getTotalDuration() * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
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