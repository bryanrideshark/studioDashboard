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
        
        .green {
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
        this.makeGrid('111111221222222033333313333333333330111111110223333333333330111111010223333333333330111111110223333333333330111111110223333333333330111111110223333333333330111111110221');
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


    private makeGrid(mask: string) {
        var hour: any = '';
        var today: any = '';
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
        var maskIndex = 0;
        var cls = '';
        for (var i = 1; i <= 8; i++) {
            for (var j = 1; j <= 25; j++) {
                if (j == 1 && i != 1) {
                    today = days.shift();
                    cls = 'borderLessSquare';
                } else if (i != 1 && j != 1) {
                    today = ''
                    var classColorCode = mask.substr(maskIndex, 1);
                    var classColor = '';
                    maskIndex++;
                    switch (classColorCode) {
                        case '0': {
                            classColor = 'green';
                            break;
                        }
                        case '1': {
                            classColor = 'yellow';
                            break;
                        }
                        case '2': {
                            classColor = 'red';
                            break;
                        }
                        case '3': {
                            classColor = 'blue';
                            break;
                        }
                    }
                    cls = 'square ' + classColor;
                }
                if (i == 1 && j == 1)
                    var cls = 'borderLessSquare';
                if (i == 1 && j > 1) {
                    hour = j - 1;
                    var cls = 'borderLessSquare';
                    if (hour == 0)
                        hour = ''
                } else {
                    hour = ''
                }
                if (_.isNumber(hour) && hour < 10) {
                    hour = `0${hour}:00`
                } else if (_.isNumber(hour) && hour > 9) {
                    hour = `${hour}:00`
                }

                this.rateGridContainer.append(`<div class='${cls}'>${today}${hour}</div>`);
            }
            this.rateGridContainer.append("<div class='new_row'></div>");
        }

        jQuery(document)['contextmenu'](function () {
            return false;
        });
        jQuery(document).on('click', '.square', function () {
            jQuery(this).addClass('green');
        });
        jQuery(document).on('mouseenter', '.square', function (e) {
            if (e['buttons'] == 1)
                jQuery(this).addClass('green');
            if (e['buttons'] == 2)
                jQuery(this).removeClass('green');
            return false;
        });
        jQuery(document).on('mouse_down', '.square', function () {
            jQuery(this).addClass('green');
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

//
// private makeGridOriginal(mask:string) {
//     var maskIndex = 0;
//     var hour: any = '';
//     var today: any = '';
//     var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
//     for (var i = 1; i <= 25; i++) {
//         for (var j = 1; j <= 8; j++) {
//             if (j == 1) {
//                 hour = i - 1;
//                 if (hour == 0)
//                     hour = ''
//             } else {
//                 hour = ''
//             }
//             if (j > 1) {
//                 today = days.shift();
//                 if (!today)
//                     today = '';
//             }
//
//             // draw colored boxes
//             if (today.length == 0 && hour.length == 0 && i != 1) {
//                 var classColorCode = mask.substr(maskIndex,1);
//                 var classColor = '';
//                 maskIndex++;
//                 switch (classColorCode) {
//                     case '0': {
//                         classColor = 'green';
//                         break;
//                     }
//                     case '1': {
//                         classColor = 'yellow';
//                         break;
//                     }
//                     case '2': {
//                         classColor = 'red';
//                         break;
//                     }
//                     case '3': {
//                         classColor = 'blue';
//                         break;
//                     }
//                 }
//                 var cls = 'square ' + classColor;
//             } else {
//                 var cls = 'borderLessSquare';
//             }
//             if (_.isNumber(hour) && hour < 10) {
//                 hour = `0${hour}:00`
//             } else if (_.isNumber(hour) && hour > 9) {
//                 hour = `${hour}:00`
//             }
//             this.rateGridContainer.append(`<div class='${cls}'>${today}${hour}</div>`);
//             today = '';
//         }
//         this.rateGridContainer.append("<div class='new_row'></div>");
//     }
//
//     jQuery(document)['contextmenu']( function() {
//         return false;
//     });
//     jQuery(document).on('click', '.square', function () {
//         jQuery(this).addClass('green');
//     });
//     jQuery(document).on('mouseenter', '.square', function (e) {
//         if (e['buttons']==1)
//             jQuery(this).addClass('green');
//         if (e['buttons']==2)
//             jQuery(this).removeClass('green');
//         return false;
//     });
//     jQuery(document).on('mouse_down', '.square', function () {
//         jQuery(this).addClass('green');
//     });
// }
