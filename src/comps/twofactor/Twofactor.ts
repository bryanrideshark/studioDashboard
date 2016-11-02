import {
    Component,
    ChangeDetectionStrategy,
    ElementRef,
    ViewChild,
    ChangeDetectorRef
} from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormBuilder
} from "@angular/forms";
import {AppStore} from "angular2-redux-util";
import {Lib} from "../../Lib";
import * as _ from "lodash";
import {AppdbAction} from "../../appdb/AppdbAction";
import * as bootbox from 'bootbox';

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
                <div *ngIf="showTwoFactorConfig">
                    <input #activate type="text" class="longInput form-control" placeholder="scan with Google authenticator and enter token">
                    <button (click)="onActivate()" style="margin-top: 5px" class="btn btn-primary pull-right">activate</button>
                </div>
            </div>
    `,
    styles: [`.material-switch {position: relative;padding-top: 10px;}`]
})
export class Twofactor {
    constructor(private fb: FormBuilder,
                private el: ElementRef,
                private cd: ChangeDetectorRef,
                private appdbAction: AppdbAction,
                private appStore: AppStore) {
        this['me'] = Lib.GetCompSelector(this.constructor)
        this.contGroup = fb.group({
            'TwofactorCont': ['']
        });
        _.forEach(this.contGroup.controls, (value, key: string) => {
            this.formInputs[key] = this.contGroup.controls[key] as FormControl;
        })


        var twoFactorStatus = this.appStore.getState().appdb.get('twoFactorStatus') || {};
        this.unsub = this.appStore.sub((twoFactorStatus) => {
            console.log(twoFactorStatus);
        }, 'appdb.twoFactorStatus');


        if (!_.isUndefined(this.appStore.getState().appdb.get('showTwoFactorConfig'))) {
            this.showTwoFactorConfig = this.appStore.getState().appdb.get('showTwoFactorConfig').status;
        } else {
            this.showTwoFactorConfig = false;
        }
        this.formInputs['TwofactorCont'].setValue(this.showTwoFactorConfig)
    }

    @ViewChild('activate')
    activateToken;

    private showTwoFactorConfig: boolean;
    private contGroup: FormGroup;
    private formInputs = {};
    private unsub;

    private onActivate() {
        if (this.activateToken.nativeElement.value.length < 6)
            return bootbox.alert('token is too short');
        this.authServerTwoFactor(this.activateToken.nativeElement.value);
    }

    private getQrCode() {
        this.appdbAction.getQrCodeTwoFactor('reseller@ms.com', '', (qrCode) => {
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

    public authServerTwoFactor(i_token) {
        var businessId = this.appStore.getsKey('reseller', 'whitelabel', 'businessId')
        this.appStore.dispatch(this.appdbAction.authenticateTwoFactor(businessId, i_token, (result) => {
            if (result.status) {
                bootbox.alert('Congratulations, activated');
                this.showTwoFactorConfig = false;
                this.removeSVGs();
                this.cd.markForCheck();
            } else {
                bootbox.alert('wrong token entered');
            }
        }));
    }

    private removeSVGs() {
        jQuery(this.el.nativeElement).find('svg').remove();
    }

    private onFormChange(event: boolean) {
        this.showTwoFactorConfig = event;
        if (event) {
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

    ngOnDestroy(){
        this.unsub();
    }
}