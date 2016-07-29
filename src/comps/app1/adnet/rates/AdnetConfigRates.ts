import {Component, ChangeDetectionStrategy, Input, ViewChild, ElementRef} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import * as _ from 'lodash';
import {SimpleList, ISimpleListItem} from "../../../simplelist/Simplelist";
import {AdnetRateModel} from "../../../../adnet/AdnetRateModel";

@Component({
    selector: 'AdnetConfigRates',
    styles: [`
        .rateGridContainer {
            overflow: auto;
            width: 960px;
            margin: auto;
        }
        
        .square {
            height: 50px;
            width: 50px;
            border: 1px solid;
            display: block;
            float: left;
        
        }
        .new_row {
            clear:both;
        }
        
        .hover {
            background-color: green;
        }
        `],
    moduleId: __moduleName,
    directives: [SimpleList],
    templateUrl: 'AdnetConfigRates.html'
})

export class AdnetConfigRates {

    constructor(private appStore: AppStore, private el: ElementRef) {
        var i_adnet = this.appStore.getState().adnet;
        this.rates = i_adnet.getIn(['rates']);
        this.unsub = this.appStore.sub((i_rates: List<AdnetRateModel>) => {
            this.rates = i_rates;
        }, 'adnet.rates');


    }

    ngOnInit() {
        this.rateGridContainer = jQuery(this.el.nativeElement).find('.rateGridContainer');
        this.makeGrid(8);
    }

    @Input()
    set adnetCustomerId(i_adnetCustomerId: string) {
        this.selectedAdnetCustomerId = i_adnetCustomerId;
        this.updFilteredRates();
    }

    @ViewChild(SimpleList)
    simpleList: SimpleList;

    private unsub: Function;
    private rateGridContainer;
    private selectedAdnetCustomerId: string;
    private rates: List<AdnetRateModel> = List<AdnetRateModel>();
    private filteredRates: List<AdnetRateModel> = List<AdnetRateModel>();

    private makeGrid(n) {
        var hour: any = '';
        var today: any = '';
        var days = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
        for (var i = 1; i <= 25; i++) {
            for (var j = 1; j <= 8; j++) {
                if (j == 1) {
                    hour = i - 1;
                    if (hour == 0)
                        hour = ''
                } else {
                    hour = ''
                }
                if (j > 1) {
                    today = days.shift();
                    if (!today)
                        today = '';
                }
                if (today.length == 0 && hour.length == 0 && i != 1) {
                    var cls = 'square';
                } else {
                    var cls = 'borderLessSquare';
                }
                if (_.isNumber(hour) && hour < 10) {
                    hour = `0${hour}:00`
                } else if (_.isNumber(hour) && hour > 9) {
                    hour = `${hour}:00`
                }
                this.rateGridContainer.append(`<div class='${cls}'>${today}${hour}</div>`);
                today = '';
            }
            this.rateGridContainer.append("<div class='new_row'></div>");
        }

        jQuery(document).on('click', '.square', function () {
            jQuery(this).addClass('hover');
        });
        jQuery(document).on('mousedown', '.square', function () {
            jQuery(this).addClass('hover');
            // jQuery(this).removeClass('hover');
        });
    }

    private onSelection() {
        if (!this.filteredRates)
            return;
        var selected: {} = this.simpleList.getSelected();
        _.forEach(selected, (simpleItem: ISimpleListItem)=> {
            if (simpleItem.selected) {
                var adnetRateModel: AdnetRateModel = simpleItem.item;
                console.log(adnetRateModel.rateMap());
                return;
            }
        })
    }

    private updFilteredRates() {
        if (this.rates && this.selectedAdnetCustomerId) {
            this.filteredRates = List<AdnetRateModel>();
            this.rates.forEach((i_adnetRateModel: AdnetRateModel)=> {
                var adnetCustomerId = i_adnetRateModel.customerId();
                if (adnetCustomerId == this.selectedAdnetCustomerId) {
                    this.filteredRates = this.filteredRates.push(i_adnetRateModel)
                }
            })
        }
    }

    private getContent(adnetRateModel: AdnetRateModel) {
        return adnetRateModel.getKey('Value').label;
    }

    private ngOnDestroy() {
        this.unsub();
    }
}