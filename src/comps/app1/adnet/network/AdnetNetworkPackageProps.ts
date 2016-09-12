import {Component, Input, QueryList, ViewChildren} from "@angular/core";
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";
import {Lib} from "../../../../Lib";
import * as _ from "lodash";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import * as moment_ from "moment";
import {List} from "immutable";
export const moment = moment_["default"];

@Component({
    moduleId: __moduleName,
    selector: 'AdnetNetworkPackageProps',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    host: {'(input-blur)': 'onFormChange($event)'},
    templateUrl: 'AdnetNetworkPackageProps.html',
    styleUrls: ['AdnetNetworkPackageCommonStyles.css']
})
export class AdnetNetworkPackageProps {
    constructor(private fb: FormBuilder, private appStore: AppStore, private adnetAction: AdnetActions) {
        this['me'] = Lib.GetCompSelector(this.constructor)
        this.contGroup = fb.group({
            'autoAddSiblings': [''],
            'channel': [''],
            'contents': [''],
            'customerId': [''],
            'daysMask': [''],
            'deleted': [''],
            'enabled': [''],
            'endDate': [''],
            'hourEnd': [''],
            'hourStart': [''],
            'label': [''],
            'modified': [''],
            'playMode': [''],
            'siblingsKey': [''],
            'startDate': [''],
        });
        _.forEach(this.contGroup.controls, (value, key: string) => {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })
    }

    @Input()
    set setAdnetPackageModels(i_adnetPackageModels: AdnetPackageModel) {
        if (!i_adnetPackageModels)
            return;
        this.adnetPackageModels = i_adnetPackageModels;
        this.adnetPackageDays = Lib.GetADaysMask(this.adnetPackageModels.daysMask());
        this.renderFormInputs();
        // this.simpleGridTable.deselect();
    }

    @ViewChildren('checkInputs')
    inputs: QueryList<any>

    private adnetPackageModels: AdnetPackageModel;
    private adnetPackageDays: List<any> = List<any>()
    private contGroup: FormGroup;
    private formInputs = {};
    private packageName = '';
    private hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

    private onFormChange(event) {
        this.updateSore();
    }

    private numToDay(num) {
        var days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        return days[num];
    }

    private updateSore() {
        setTimeout(() => {
            //todo: update store on changes of content props
            // todo: Lib.CleanCharForXml add support for nested array
            // console.log(this.contGroup.status + ' ' + JSON.stringify(Lib.CleanCharForXml(this.contGroup.value)));
            // this.appStore.dispatch(this.adnetAction.saveCustomerInfo(Lib.CleanCharForXml(this.contGroup.value), this.customerModel.customerId()))
        }, 1)
    }

    private onUpdateDays(e) {
        // this.cdr.detach();
        let values = []
        this.inputs.map(v => {
            values.push(v.nativeElement.checked);
        });
        //this.changed.emit({item: this.m_storeModel, value: values});
        var updateDaysMask = Lib.ComputeMask(values);
        console.log('update days mask ' + updateDaysMask);
        return true;
    }

    private getOptionField(key, index) {
        if (!this.adnetPackageModels)
            return;
        var value = this.adnetPackageModels.getKey('Value')[key];
        if (value == index) {
            // this.cd.detectChanges();
            return 'selected'
        }

        return '';

    }

    private renderFormInputs() {
        if (!this.adnetPackageModels)
            return;

        const processDate = (key) => {
            var data = this.adnetPackageModels.getKey('Value')[key];
            if (data) {
                var epoc = data.match(/Date\((.*)\)/)
                if (epoc[1]) {
                    var date = epoc[1].split('+')[0]
                    var time = epoc[1].split('+')[1]
                    //todo: workaround, adding one day since off 1 day from Alon, see why???
                    data = moment(Number(date)).add(1, 'day');
                    return moment(data).format('YYYY-MM-DD');

                    // moment examples
                    // var a = moment().unix().format()
                    // console.log(moment.now());
                    // console.log(moment().format('dddd'));
                    // console.log(moment().startOf('day').fromNow());

                }
            } else {
                return '';
            }
        }
        _.forEach(this.formInputs, (value, key: string) => {
            var data;
            switch (key) {
                case 'startDate': {
                }
                case 'endDate': {
                    data = processDate(key);
                    break;
                }
                default: {
                    data = this.adnetPackageModels.getKey('Value')[key];
                }
            }
            this.formInputs[key].setValue(data)
        });
    };
}
