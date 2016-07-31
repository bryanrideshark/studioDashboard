import {Component, Input, ViewChild, ElementRef, ChangeDetectionStrategy} from "@angular/core";
import * as _ from "lodash";
import {SimpleList} from "../../../../simplelist/Simplelist";
import {AdnetRateModel} from "../../../../../adnet/AdnetRateModel";

@Component({
    selector: 'RatesTable',
    moduleId: __moduleName,
    directives: [SimpleList],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
    templateUrl: 'RatesTable.html'
})

export class RatesTable {

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.rateGridContainer = jQuery(this.el.nativeElement).find('.rateGridContainer');
    }

    // @Input()
    // set adnetCustomerId(i_adnetCustomerId: string) {
    //     this.selectedAdnetCustomerId = i_adnetCustomerId;
    //     this.updFilteredRates();
    // }

    @Input()
    set rates(i_adnetRateModel: AdnetRateModel) {
        if (!i_adnetRateModel)
            return;
        this.adnetRateModel = i_adnetRateModel;
        this.rateGridContainer.empty();
        console.log('Loading map: ' + this.adnetRateModel.rateMap());
        this.makeGrid(this.adnetRateModel.rateMap());
    }

    @ViewChild(SimpleList)
    simpleList: SimpleList;

    private hourRate0: number = 1
    private hourRate1: number = 1
    private hourRate2: number = 1
    private hourRate3: number = 1
    private selectedColor: string = 'orange';
    private unsub: Function;
    private rateGridContainer;
    // private selectedAdnetCustomerId: string;
    private adnetRateModel: AdnetRateModel;

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
                            classColor = 'orange';
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
                            classColor = 'orange';
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
        var self = this;
        this.rateGridContainer.on('click', '.square', function () {
            jQuery(this).removeClass('blue');
            jQuery(this).removeClass('red');
            jQuery(this).removeClass('green');
            jQuery(this).removeClass('orange');
            jQuery(this).addClass(self.selectedColor);
        });
        this.rateGridContainer.on('mouseenter', '.square', function (e) {
            if (e['buttons'] == 1) {
                jQuery(this).removeClass('blue');
                jQuery(this).removeClass('red');
                jQuery(this).removeClass('green');
                jQuery(this).removeClass('orange');
                jQuery(this).addClass(self.selectedColor);
            }
            return false;
        });
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
                case 'orange': {
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

    private getContent(adnetRateModel: AdnetRateModel) {
        return adnetRateModel.getKey('Value').label;
    }

    private ngOnDestroy() {
        this.unsub();
    }
}

// if (e['buttons'] == 2) {
//     jQuery(this).removeClass('blue');
//     jQuery(this).removeClass('red');
//     jQuery(this).removeClass('green');
//     jQuery(this).addClass('orange');
// }
// jQuery(document)['contextmenu'](function () {
//     return false;
// });
// jQuery(document).on('mouse_down', '.square', function () {
//     jQuery(this).addClass('orange');
// });