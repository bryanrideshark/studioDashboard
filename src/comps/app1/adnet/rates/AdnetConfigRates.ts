import {Component, ChangeDetectionStrategy, Input, ViewChild, ElementRef} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";
import * as _ from 'lodash';
import {SimpleList, ISimpleListItem} from "../../../simplelist/Simplelist";
import {AdnetRateModel} from "../../../../adnet/AdnetRateModel";

@Component({
    selector: 'AdnetConfigRates',
    moduleId: __moduleName,
    directives: [SimpleList],
    styles: [`
        .rateInput {
            width: 40px; 
            color: #0f0f0f;
        }
        .btn span.glyphicon {    			
            opacity: 0;				
        }
        .btn.active span.glyphicon {				
            opacity: 1;				
        }
    `],
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
    }

    @Input()
    set adnetCustomerId(i_adnetCustomerId: string) {
        this.selectedAdnetCustomerId = i_adnetCustomerId;
        this.updFilteredRates();
    }

    @ViewChild(SimpleList)
    simpleList: SimpleList;

    private hourRate0: number = 11
    private hourRate1: number = 1
    private hourRate2: number = 1
    private hourRate3: number = 1
    private selectedColor: string = 'green';
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
                            classColor = 'gray';
                            break;
                        }
                        case '1': {
                            classColor = 'green';
                            break;
                        }
                        case '2': {
                            classColor = 'blue';
                            break;
                        }
                        case '3': {
                            classColor = 'red';
                            break;
                        }
                        default: {
                            classColor = 'gray';
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
            this.rateGridContainer.append(`<div class='new_row'></div>`);
        }

        // jQuery(document)['contextmenu'](function () {
        //     return false;
        // });
        var self = this;
        this.rateGridContainer.on('click', '.square', function () {
            jQuery(this).removeClass('blue');
            jQuery(this).removeClass('red');
            jQuery(this).removeClass('green');
            jQuery(this).addClass(self.selectedColor);
        });
        this.rateGridContainer.on('mouseenter', '.square', function (e) {
            if (e['buttons'] == 1) {
                jQuery(this).removeClass('blue');
                jQuery(this).removeClass('red');
                jQuery(this).removeClass('green');
                jQuery(this).addClass(self.selectedColor);
            }

            // if (e['buttons'] == 2) {
            //     jQuery(this).removeClass('blue');
            //     jQuery(this).removeClass('red');
            //     jQuery(this).removeClass('green');
            //     jQuery(this).addClass('gray');
            // }
            return false;
        });
        // jQuery(document).on('mouse_down', '.square', function () {
        //     jQuery(this).addClass('gray');
        // });
    }

    private onColor(i_color) {
        this.selectedColor = i_color;
    }

    private onHourRateChange(name, value) {
    }

    private onSave() {
        console.log(this.selectedColor);
        var rateMap = [];
        this.rateGridContainer.find('.square').each((index, elem)=> {
            var classColorCode;
            var classColor = jQuery(elem).attr('class').split(' ')[1];
            switch (classColor) {
                case 'gray': {
                    classColorCode = '0';
                    break;
                }
                case 'green': {
                    classColorCode = '1';
                    break;
                }
                case 'blue': {
                    classColorCode = '2';
                    break;
                }
                case 'red': {
                    classColorCode = '3';
                    break;
                }
                default: {
                    classColorCode = '0';
                    break;
                }
            }
            rateMap.push(classColorCode);
        });
        var rateMapStr = rateMap.join('')
        console.log('Saving map: ' + rateMapStr);
    }

    private onSelection() {
        if (!this.filteredRates)
            return;
        var selected: {} = this.simpleList.getSelected();
        _.forEach(selected, (simpleItem: ISimpleListItem)=> {
            if (simpleItem.selected) {
                var adnetRateModel: AdnetRateModel = simpleItem.item;
                this.rateGridContainer.empty();
                console.log('Loading map: ' + adnetRateModel.rateMap());
                this.makeGrid(adnetRateModel.rateMap());
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