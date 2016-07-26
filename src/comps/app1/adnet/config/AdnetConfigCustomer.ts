import {Component, Input} from "@angular/core";
import {BlurForwarder} from "../../../blurforwarder/BlurForwarder";
import {FormControl, REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder} from "@angular/forms";
import * as _ from "lodash";
import {Lib} from "../../../../Lib";
import {AdnetActions} from "../../../../adnet/AdnetActions";
import {AppStore} from "angular2-redux-util";

@Component({
    selector: 'AdnetConfigCustomer',
    directives: [BlurForwarder, REACTIVE_FORM_DIRECTIVES],
    host: {
        '(input-blur)': 'onInputBlur($event)'
    },
    styles: [`
        .material-switch {
            padding-top: 10px;
        }
        .input-group {
            padding-top: 10px;
        }
        i {
            width: 20px;
        }
    `],
    moduleId: __moduleName,
    templateUrl: 'AdnetConfigCustomer.html'
})
export class AdnetConfigCustomer {
    constructor(private fb:FormBuilder,
                private appStore:AppStore,
                private adnetAction:AdnetActions) {

        this.contGroup = fb.group({
            'label': [''],
            'contact_person': [''],
            'email': [''],
            'phone': [''],
            'cell': [''],
            'web': [''],
            'comments': ['']
        });
        _.forEach(this.contGroup.controls, (value, key:string)=> {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })

    }

    @Input() adnetCustomerModel
    private contGroup:FormGroup;
    private formInputs = {};

    private onInputBlur(event) {
        console.log(event);
        setTimeout(()=>this.appStore.dispatch(this.adnetAction.saveCustomerInfo(Lib.CleanCharForXml(this.contGroup.value))), 1);
    }



    // @Output()
    // labelEdited:EventEmitter<any> = new EventEmitter();
}