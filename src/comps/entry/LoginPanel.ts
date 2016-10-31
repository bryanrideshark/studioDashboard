import {
    Component,
    Injectable,
    ViewChild,
    ElementRef,
    Renderer,
    trigger,
    state,
    style,
    transition,
    animate
} from "@angular/core";
import {Router} from "@angular/router";
import {AppStore} from "angular2-redux-util";
import {BusinessAction} from "../../business/BusinessAction";
import {LocalStorage} from "../../services/LocalStorage";
import {
    AuthService,
    FlagsAuth
} from "../../services/AuthService";
import * as bootbox from "bootbox";
import Map = Immutable.Map;
import {AuthState} from "../../appdb/AppdbAction";
import {Lib} from "../../Lib";


@Injectable()
@Component({
    selector: 'LoginPanel',
    providers: [BusinessAction, LocalStorage],
    animations: [
        trigger('loginState', [
            state('inactive', style({
                backgroundColor: 'red',
                transform: 'scale(1)',
                alpha: 0
            })),
            state('default', style({
                backgroundColor: '#313131',
                transform: 'scale(1)',
                alpha: 1
            })),
            state('active', style({
                backgroundColor: 'green',
                transform: 'scale(0.98)'
            })),
            transition('* => active', animate('600ms ease-out')),
            transition('* => inactive', animate('2000ms ease-out'))
        ])
    ],
    template: `
                <div *ngIf="showLoginPanel" [@loginState]="loginState" class="login-page" id="appLogin">
                <br/>
                <br/>
                  <form class="form-signin" role="form">
                    <h2 class="form-signin-heading"></h2>     
                    <input (keyup.enter)="passFocus()" #userName id="userName" spellcheck="false" type="text" name="m_user" [(ngModel)]="m_user" class="input-underline input-lg form-control" placeholder="user name" required autofocus>
                    <input (keyup.enter)="authUser()" #userPass id="userPass" type="password" [(ngModel)]="m_pass" name="m_pass" class="input-underline input-lg form-control" placeholder="password" required>
                    <div *ngIf="m_showTwoFactor">

                        <br/>     
                        <br/>
                        <span style="color: #989898; position: relative; left: -40px; top: 34px" class="fa fa-key fa-2x pull-right"></span>
                        <input #twoFactor spellcheck="false" type="text" name="m_twoFactor" [(ngModel)]="m_twoFactor" class="input-underline input-lg form-control" placeholder="enter two factor key" required autofocus>
                        <br/>     
                        <br/>
                    </div>
                    <br/> 
                    <a id="loginButton"  (click)="authUser()" type="submit" class="btn rounded-btn"> enterprise member login
                     <span *ngIf="m_showTwoFactor" style="font-size: 9px; max-height: 15px; display: block; padding: 0; margin: 0; position: relative; top: -20px">with Google authenticator</span>
                    </a>&nbsp;
                    <!--<a type="submit" class="btn rounded-btn"> Register</a> -->
                     <br/>
                     <div *ngIf="!m_showTwoFactor">
                         <label class="checkbox" style="padding-left: 20px">
                            <input #rememberMe type="checkbox" [checked]="m_rememberMe" (change)="m_rememberMe = rememberMe.checked" />
                          <span style="color: gray"> remember me for next time </span>
                    </label>
                    </div>
                    <br/>     
                    <br/>
                    <br/>
                    <!--<hr class="hrThin"/>-->
                   <a href="http://www.digitalsignage.com/_html/benefits.html" target="_blank">not an enterprise member? learn more</a>
                    <!-- todo: add forgot password in v2-->                    
                    <div id="languageSelectionLogin"></div>
                  </form>
                </div>
               `
})
export class LoginPanel {
    private m_user: string;
    private m_pass: string;
    private m_twoFactor: string;
    private m_showTwoFactor: boolean = false;
    private m_router: Router;
    private m_rememberMe: any;
    private m_unsub: ()=>void;
    private showLoginPanel: boolean = false;
    private loginState: string = '';

    constructor(private appStore: AppStore, private localStorage: LocalStorage, private renderer: Renderer, private router: Router, private authService: AuthService) {
        this.m_router = router;
        this.m_user = '';
        this.m_pass = '';
        this.m_rememberMe = this.authService.getLocalstoreCred().r;

        this.m_unsub = appStore.sub((credentials: Map<string,any>) => {
            var state = credentials.get('authenticated');
            var reason = credentials.get('reason');
            switch (state) {
                case AuthState.FAIL: {
                    this.onAuthFail(reason);
                    break;
                }
                case AuthState.PASS: {
                    this.onAuthPass();
                    break;
                }
                case AuthState.TWO_FACTOR: {
                    this.m_showTwoFactor = true;
                    this.m_rememberMe = false;
                    this.loginState = 'default';
                    this.localStorage.removeItem('remember_me')
                    Lib.BootboxHide();
                    break;
                }
            }
        }, 'appdb.credentials', false);

        this.m_unsub = appStore.sub((twoFactorStatus: {status: boolean, twoFactorStatusReceived: Date}) => {
            // twoFactorStatus.status = false;//test
            if (twoFactorStatus.status) {
                this.onAuthPass();
            } else {
                this.onAuthFail(FlagsAuth.WrongTwoFactor);
            }
        }, 'appdb.twoFactorStatus', false);

        if (this.authService.getLocalstoreCred().u != '') {
            this.showLoginPanel = false;
            this.authService.authUser();
        } else {
            this.showLoginPanel = true;
        }
    }

    @ViewChild('userPass') userPass: ElementRef;

    private passFocus() {
        this.renderer.invokeElementMethod(this.userPass.nativeElement, 'focus', [])
    }

    private authUser() {
        if (this.m_showTwoFactor) {
            bootbox.dialog({
                closeButton: true,
                title: 'Checking two factor authentication',
                message: 'please wait...'
            });
            this.authService.authTwoFactor();
        } else {
            this.authService.authUser(this.m_user, this.m_pass, this.m_rememberMe);
        }
    }

    private onAuthPass() {
        Lib.BootboxHide();
        this.loginState = 'active';
        setTimeout(() => this.m_router.navigate(['/App1/Dashboard']), 2000)
    }

    private onAuthFail(i_reason) {
        Lib.BootboxHide(3500);
        this.loginState = 'inactive';
        let msg1: string;
        let msg2: string;
        switch (i_reason) {
            case FlagsAuth.WrongPass: {
                msg1 = 'User or password are incorrect...'
                msg2 = 'Please try again or click forgot password to reset your credentials'
                break;
            }
            case FlagsAuth.NotEnterprise: {
                msg1 = 'Not an enterprise account'
                msg2 = 'You must login with an Enterprise account, not an end user account...'
                break;
            }
            case FlagsAuth.WrongTwoFactor: {
                msg1 = 'Invalid token'
                msg2 = 'Wrong token entered or the 60 seconds limit may have exceeded, try again...'
                break;
            }
        }
        setTimeout(() => {
            bootbox.dialog({
                closeButton: true,
                title: msg1,
                message: msg2
            });
        }, 1200);
        return false;
    }

    ngOnDestroy() {
        this.m_unsub();
    }
}


