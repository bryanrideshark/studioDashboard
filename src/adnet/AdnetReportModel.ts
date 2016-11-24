import {StoreModel} from "../models/StoreModel";
import {AdnetTargetModel} from "./AdnetTargetModel";
import {AdnetActions} from "./AdnetActions";
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

    public getTotalPriceFormat() {
        return StringJS(this.getTotalPrice() * this.getTotalDuration() / this.getDurationSize()).toCurrency();
    }

    public getTotalSizeFormat() {
        return StringJS(this.getDurationSize() / this.getTotalDuration() * 100).toPercent();
    }

    public getTotalPriceSizeFormat() {
        return StringJS(this.getTotalPrice()).toCurrency();
    }

    public getTotalCountFormat() {
        return StringJS(this.getTotalCount()).toInt();
    }

    public getTargetNameFromId(i_adnetAction: AdnetActions) {
        var adnetTargetModel: AdnetTargetModel = i_adnetAction.getTargetModel(this.getTargetId())
        return adnetTargetModel.getName();
    }

    public getCustomerNameFromId(i_adnetAction: AdnetActions) {
        var adnetTargetModel: AdnetTargetModel = i_adnetAction.getTargetModel(this.getTargetId())
        var customerId = adnetTargetModel.getCustomerId();
        return i_adnetAction.getCustomerName(customerId);
    }

    public getTargetType(i_adnetAction: AdnetActions) {
        var adnetTargetModel: AdnetTargetModel = i_adnetAction.getTargetModel(this.getTargetId())
        var type = adnetTargetModel.getTargetType();
        if (type == 1)
            return 'Web'
        return 'Station'
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