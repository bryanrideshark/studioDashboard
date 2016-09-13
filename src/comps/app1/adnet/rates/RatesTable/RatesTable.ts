import {
    Component, Input, ViewChild, ElementRef, ChangeDetectionStrategy, Output, EventEmitter,
    ViewChildren, QueryList
} from "@angular/core";
import * as _ from "lodash";
import {SimpleList} from "../../../../simplelist/Simplelist";
import {AdnetRateModel} from "../../../../../adnet/AdnetRateModel";
import {Lib} from "../../../../../Lib";

@Component({
    selector: 'RatesTable',
    moduleId: __moduleName,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        .rateInput {
            width: 40px; 
            color: #0f0f0f;
        }
        .btn span.fa {    			
            opacity: 0;				
        }
        .btn.active span.fa {				
            opacity: 1;				
        }
    `],
    templateUrl: 'RatesTable.html'
})

export class RatesTable {

    constructor(private el: ElementRef) {
        this['me'] = Lib.GetCompSelector(this.constructor)
    }

    ngOnInit() {
        this.rateGridContainer = jQuery(this.el.nativeElement).find('.rateGridContainer');
    }

    @Output() onRateChange = new EventEmitter()


    @Input()
    set rates(i_adnetRateModel: AdnetRateModel) {
        if (!i_adnetRateModel)
            return;
        this.adnetRateModel = i_adnetRateModel;
        this.rateGridContainer.empty();
        this.makeGrid(this.adnetRateModel.rateMap());
        this.adHourlyRate[0] = this.adnetRateModel.rateLevels()[0];
        this.adHourlyRate[1] = this.adnetRateModel.rateLevels()[1];
        this.adHourlyRate[2] = this.adnetRateModel.rateLevels()[2];
        this.adHourlyRate[3] = this.adnetRateModel.rateLevels()[3];
    }

    @ViewChild(SimpleList)
    simpleList: SimpleList;

    @ViewChildren('input')
    inputs: QueryList<ElementRef>;

    private adHourlyRate: Array<string> = [];
    private selectedColor: string = 'orange';
    private rateGridContainer;
    private adnetRateModel: AdnetRateModel;


    private onColor(i_color) {
        this.selectedColor = i_color;
    }

    private onUpdateRate() {
        var rateTable = this.getRateTable();
        _.forEach(this.adHourlyRate, (k, v)=> {
            if (_.isNaN(Number(k))){
                this.adHourlyRate[v] = '1';
            } else {
                this.adHourlyRate[v] = String(Number(k))
            }
        });
        this.onRateChange.emit({rateId: this.adnetRateModel.getId(), adHourlyRate: this.adHourlyRate, rateTable})
    }

    private getRateTable(): string {
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
        return rateMapStr;
    }

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
        this.rateGridContainer.off('click');
        this.rateGridContainer.off('mouseenter');

        this.rateGridContainer.on('click', '.square', function () {
            jQuery(this).removeClass('blue');
            jQuery(this).removeClass('red');
            jQuery(this).removeClass('green');
            jQuery(this).removeClass('orange');
            jQuery(this).addClass(self.selectedColor);
            self.onUpdateRate();
        });
        var upd = _.debounce(()=> {
            this.onUpdateRate();
        }, 500);
        this.rateGridContainer.on('mouseenter', '.square', function (e) {
            if (e['buttons'] == 1) {
                jQuery(this).removeClass('blue');
                jQuery(this).removeClass('red');
                jQuery(this).removeClass('green');
                jQuery(this).removeClass('orange');
                jQuery(this).addClass(self.selectedColor);
                upd();
            }
            return false;
        });
    }

}
