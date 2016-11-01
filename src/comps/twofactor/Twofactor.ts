import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ElementRef
} from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormBuilder
} from "@angular/forms";
import {AppStore} from "angular2-redux-util";
import {AdnetContentModel} from "../../adnet/AdnetContentModel";
import {Lib} from "../../Lib";
import * as _ from "lodash";
import {AppdbAction} from "../../appdb/AppdbAction";

@Component({
    selector: 'Twofactor',
    changeDetection: ChangeDetectionStrategy.OnPush,
    moduleId: __moduleName,
    template: `<div>
                <form novalidate autocomplete="off" [formGroup]="contGroup">
                    <div class="row">
                        <div class="inner userGeneral">
                            <div class="panel panel-default tallPanel">
                                <div class="panel-heading">
                                    <small class="release">target properties
                                        <i style="font-size: 1.4em" class="fa fa-cog pull-right"></i>
                                    </small>
                                <small class="debug">{{me}}</small>
                                </div>
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        Two factor login with Google authenticator
                                        <div class="material-switch pull-right">
                                            <input (change)="onFormChange(customerNetwork2.checked)"
                                                   [formControl]="contGroup.controls['TwofactorCont']"
                                                   id="customerNetwork2" #customerNetwork2
                                                   name="customerNetwork2" type="checkbox"/>
                                            <label for="customerNetwork2" class="label-primary"></label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div>
            <div>
                <input type="text" class="longInput form-control" placeholder="token here">
                <button style="margin-top: 5px" class="btn btn-primary pull-right">save</button>
            </div>
                    
                    <svg style="width: 100px!important;" preserveAspectRatio="xMidYMid meet">
                        {{svg}}
                    </svg>
            </div>
            
            
    `,
    styles: [`.material-switch {position: relative;padding-top: 10px;}
    `]
})
export class Twofactor {
    constructor(private fb: FormBuilder,
                private el: ElementRef,
                private appdbAction: AppdbAction,
                private appStore: AppStore) {
        this['me'] = Lib.GetCompSelector(this.constructor)
        this.contGroup = fb.group({
            'TwofactorCont': ['']

        });
        _.forEach(this.contGroup.controls, (value, key: string) => {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })
        var twoFactorStatus = this.appStore.getState().appdb.get('twoFactorStatus');
        if (!_.isUndefined(twoFactorStatus)) {
            twoFactorStatus = twoFactorStatus.status
        } else {
            twoFactorStatus = false;
        }
        this.formInputs['TwofactorCont'].setValue(twoFactorStatus)

        // jQuery(el.nativeElement).append(this.svg);
    }

    @Input()
    set setAdnetContentModels(i_adnetContentModels: AdnetContentModel) {
        this.adnetContentModels = i_adnetContentModels;
        // if (this.adnetContentModels)
        //     this.renderFormInputs();
    }

    private adnetContentModels: AdnetContentModel;
    private contGroup: FormGroup;
    private formInputs = {};
    private svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 39"><path d="M1 1h7v7h-7zM9 1h1v3h-1zM11 1h1v1h1v-1h3v1h-2v1h1v2h-2v1h1v2h-1v-1h-1v-3h1v-1h-1v1h-1zM20 1h1v2h1v-1h1v-1h2v1h-1v1h-1v2h1v1h-2v-1h-1v-1h-2v-1h-1v-1h2zM26 1h3v1h-1v2h-1v1h-1v-1h-1v-2h1v1h1v-1h-1zM31 1h7v7h-7zM2 2v5h5v-5zM32 2v5h5v-5zM3 3h3v3h-3zM16 3h1v1h-1zM29 3h1v1h-1zM33 3h3v3h-3zM17 4h1v1h2v3h-1v-1h-1v-1h-1zM28 4h1v1h1v1h-3v-1h1zM9 5h2v2h-1v-1h-1zM25 5h1v1h-1zM21 6h1v2h-1zM24 6h1v1h-1zM26 6h1v1h-1zM9 7h1v1h-1zM11 7h1v1h1v1h1v2h-1v1h-1v-2h-3v1h-1v-1h-4v-1h7zM15 7h1v1h-1zM17 7h1v5h3v1h1v1h-1v1h3v1h-4v1h-1v-1h-1v-1h-1v-1h-1v1h-1v1h-1v1h-1v-1h-2v1h2v1h1v-1h1v1h1v1h-1v1h1v3h-1v1h-3v-1h-2v2h-1v-3h-3v1h-1v-2h5v-1h-6v1h-3v-2h1v1h1v-1h-1v-4h1v-1h2v3h-1v-1h-1v2h4v1h1v-1h-1v-1h2v-2h-1v-1h-3v-1h-2v-1h2v-1h3v1h-2v1h2v-1h2v2h1v-1h2v2h1v-1h1v-1h-1v-2h1v-1h1v1h1v-2h-1v-1h1zM23 7h1v1h-1zM25 7h1v1h1v-1h1v1h1v-1h1v2h1v1h-2v-1h-1v2h-1v-1h-1v-1h-1zM14 8h1v1h-1zM1 9h1v1h-1zM20 9h1v1h-1zM22 9h1v1h-1zM24 9h1v1h-1zM33 9h1v1h1v-1h3v1h-1v1h-1v1h1v-1h1v7h-1v-2h-1v3h-2v-1h-1v1h-3v-1h1v-2h-1v1h-1v-1h-1v1h-1v-1h-1v-2h3v1h3v-1h-3v-1h-2v-1h1v-1h1v1h1v1h3v1h1v1h2v-1h1v-1h-2v-2h-1v2h-1v-2h-2v-1h2zM3 10h1v1h-1zM19 10h1v1h-1zM23 10h1v1h-1zM10 11h1v1h-1zM24 11h2v2h-1v-1h-1zM16 12v1h1v-1zM1 13h1v1h-1zM19 13v2h1v-2zM24 14h1v1h-1zM7 15h1v1h-1zM16 15h1v1h1v1h1v1h-2v-1h-1zM6 16h1v1h-1zM32 16v1h2v-1zM20 17h1v1h-1zM24 17h2v1h-1v2h-1zM28 17h1v1h-1zM10 18v1h1v1h1v1h-1v1h4v-1h-1v-1h-1v-1h-2v-1zM19 18h1v1h1v1h1v3h1v-1h1v-1h2v1h-1v2h-3v2h-1v2h-1v-1h-2v1h-1v2h-1v1h2v-2h1v1h1v-1h1v1h1v1h-1v3h-1v-2h-3v1h1v1h-2v1h1v2h-2v1h-6v-1h5v-1h1v-2h-1v-2h1v1h1v-1h-1v-1h-2v1h-1v-2h-1v-4h-1v-1h2v3h1v-2h1v-1h1v-1h1v1h2v-1h1v2h1v-1h1v-2h-1v1h-1v-1h-1v-1h2v-1h-1v-1h-1v-1h1zM21 18h1v1h-1zM16 19h1v1h-1zM22 19h1v1h-1zM27 19h2v5h-1v-2h-1v-1h1v-1h-1zM33 19h1v1h-1zM37 19h1v1h-1zM23 20h1v1h-1zM26 20h1v1h-1zM30 20h1v1h1v1h-1v2h-1zM32 20h1v1h-1zM34 20h1v1h1v-1h1v2h-1v1h-1v-1h-1v2h3v1h1v1h-2v-1h-2v1h2v1h2v3h-1v-2h-1v1h-1v1h1v1h2v1h-3v-1h-1v1h1v1h-1v1h-2v1h-1v2h-1v-1h-1v-1h1v-1h-1v1h-2v-1h-1v-2h3v-1h-1v-2h-1v-1h1v-1h1v-1h2v-1h1v2h1v1h-1v1h2v-2h-1v-6h1zM17 21h1v1h-1zM1 22h1v1h1v1h-1v2h1v-2h2v1h1v1h-2v1h1v1h-1v2h-1v-2h-1v2h-1zM3 22h1v1h-1zM26 22h1v1h-1zM37 22h1v2h-1zM7 23h1v1h-1zM16 23h1v1h-1zM6 24h1v1h-1zM25 24h1v1h1v2h-1v-1h-1zM27 24h1v1h-1zM7 25h2v1h1v6h1v2h1v1h2v1h-3v-1h-2v-6h-1v-1h1v-1h-1v-1h-1zM23 25h1v3h-1zM28 25h1v1h-1zM6 26h1v1h-1zM15 26v1h-1v1h1v-1h2v-1zM7 27h1v1h-1zM5 28h2v1h1v1h-2v-1h-1zM24 28h2v1h1v1h-2v1h1v1h-3v-1h1v-1h-1v-1h1zM30 28v1h1v-1zM30 30v3h3v-3zM1 31h7v7h-7zM31 31h1v1h-1zM2 32v5h5v-5zM3 33h3v3h-3zM12 33h1v1h-1zM22 33h1v1h-1zM36 33h1v1h1v4h-1v-1h-1v1h-3v-1h1v-1h-2v-1h3v1h2v-1h-1zM18 34h2v1h-1v1h1v1h-1v1h-2v-1h1zM21 35h1v1h-1zM24 35h2v2h-1v-1h-1zM23 36h1v1h-1zM27 36h2v1h1v1h-2v-1h-1zM20 37h2v1h-2zM31 37h1v1h-1z"/></svg>`;

    private getQrCode() {
        this.appdbAction.getQrCodeTwoFactor('reseller@ms.com','123123', (qrCode) => {
            this.removeSVGs();
            jQuery(this.el.nativeElement).append(qrCode);
            var svg = jQuery(this.el.nativeElement).find('svg').get(0);
            // var w = svg.width.baseVal.value;
            // var h = svg.height.baseVal.value;
            svg.setAttribute('viewBox', '0 0 ' + 100 + ' ' + 100);
            svg.setAttribute('width', '100%');
            // svg.setAttribute('height', '100%');
        })
    }

    private removeSVGs(){
        jQuery(this.el.nativeElement).find('svg').remove();
    }
    private onFormChange(event) {
        if (event){
            this.getQrCode()
        } else {
            this.removeSVGs();
        }
        this.updateSore();
    }

    private updateSore() {
        setTimeout(() => {
            console.log(this.contGroup.status + ' ' + JSON.stringify(Lib.CleanCharForXml(this.contGroup.value)));
            // this.appStore.dispatch(this.adnetAction.saveCustomerInfo(Lib.CleanCharForXml(this.contGroup.value), this.customerModel.customerId()))
        }, 1)
    }


}