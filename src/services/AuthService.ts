import {
    Injectable,
    Inject,
    forwardRef
} from "@angular/core";
import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import {AppStore} from "angular2-redux-util";
import {LocalStorage} from "./LocalStorage";
import {StoreService} from "./StoreService";
import {
    AppdbAction,
    AuthState
} from "../appdb/AppdbAction";
import 'rxjs/add/observable/fromPromise';
import {Observable} from 'rxjs/Observable';
import * as bootbox from "bootbox";
import {Map} from 'immutable';
import {Lib} from "../Lib";


export enum FlagsAuth {
    AuthPass,
    AuthFailEnterprise,
    WrongPass,
    NotEnterprise,
    Enterprise,
    WrongTwoFactor
}

@Injectable()
export class AuthService {
    private ubsub: ()=>void;
    private m_authState: AuthState;
    private m_pendingNotify: any;

    constructor(private router: Router,
                @Inject(forwardRef(() => AppStore)) private appStore: AppStore,
                @Inject(forwardRef(() => AppdbAction)) private appdbAction: AppdbAction,
                @Inject(forwardRef(() => LocalStorage)) private localStorage: LocalStorage,
                @Inject(forwardRef(() => StoreService)) private storeService: StoreService) {
        this.listenStore();
    }

    private listenStore() {
        this.ubsub = this.appStore.sub((credentials: Map<string,any>) => {
            this.m_authState = credentials.get('authenticated');
            var user = credentials.get('user');
            var pass = credentials.get('pass');
            var remember = credentials.get('remember');

            switch (this.m_authState) {
                case AuthState.FAIL: {
                    this.onAuthFail();
                    break;
                }
                case AuthState.PASS: {
                    this.onAuthPass(user, pass, remember);
                    break;
                }
                case AuthState.TWO_FACTOR: {
                    this.onAuthPass(user, pass, remember);
                    console.log('doing two factor');
                    break;
                }
            }
            if (this.m_pendingNotify)
                this.m_pendingNotify(this.m_authState)
        }, 'appdb.credentials', false);
    }

    private onAuthPass(i_user, i_pass, i_remember) {
        Lib.BootboxHide();
        if (i_remember) {
            this.localStorage.setItem('remember_me', {
                u: i_user,
                p: i_pass,
                r: i_remember
            });
        } else {
            this.localStorage.setItem('remember_me', {
                u: '',
                p: '',
                r: i_remember
            });
        }
        // fire up the application services
        this.storeService.loadServices();
    }

    private onAuthFail() {
        setTimeout(() => {
            Lib.BootboxHide();
            this.localStorage.setItem('remember_me', {
                u: '',
                p: '',
                r: ''
            });
        }, 1000);
        return false;
    }

    public authServerTwoFactor(i_token) {
        this.appStore.dispatch(this.appdbAction.authenticateTwoFactor(i_token, false));
    }

    public authUser(i_user?: string, i_pass?: string, i_remember?: string): void {
        //todo: fix timing
        // bootbox.dialog({
        //     closeButton: false,
        //     title: "Please wait, Authenticating...",
        //     message: " "
        // });
        // no user/pass not given try and pull from local storage
        if (!i_user) {
            var credentials = this.localStorage.getItem('remember_me');
            if (credentials && (credentials && credentials.u != '')) {
                i_user = credentials.u;
                i_pass = credentials.p;
                i_remember = credentials.r;
            }
        }
        this.appdbAction.createDispatcher(this.appdbAction.authenticateUser)(i_user.trim(), i_pass.trim(), i_remember);
    }

    public getLocalstoreCred(): {u: string, p: string, r: string} {
        var credentials = this.localStorage.getItem('remember_me');
        if (!credentials)
            return {
                u: '',
                p: '',
                r: ''
            };
        return {
            u: credentials.u,
            p: credentials.p,
            r: credentials.r,
        }
    }

    public checkAccess(): Promise<any> {
        // let injector:Injector = appInjService();
        // let router:Router = injector.get(Router);
        let target = ['/Login'];

        switch (this.m_authState) {
            case AuthState.FAIL: {
                break;
            }
            case AuthState.PASS: {
                return Promise.resolve(true);
            }
            case AuthState.TWO_FACTOR: {
                return Promise.resolve(true);
            }
        }
        if (this.getLocalstoreCred().u == '') {
            this.router.navigate(target);
            return Promise.resolve(false);
        }
        return new Promise((resolve) => {
            var credentials = this.localStorage.getItem('remember_me');
            var user = credentials.u;
            var pass = credentials.p;
            var remember = credentials.r;

            this.appdbAction.createDispatcher(this.appdbAction.authenticateUser)(user, pass, remember);

            this.m_pendingNotify = (i_authState: AuthState) => {

                switch (i_authState) {
                    case AuthState.FAIL: {
                        resolve(false);
                        break;
                    }
                    case AuthState.PASS: {
                        this.router.navigate(target);
                        resolve(true);
                        break;
                    }
                    case AuthState.TWO_FACTOR: {
                        console.log(3333);
                        break;
                    }
                }
            }
        });
    }

    public canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): Observable<boolean> {
        return Observable
            .fromPromise(this.checkAccess())
            .do(result => {
                if (!result)
                    this.router.navigate(['/Login']);
            });
    }

    private ngOnDestroy() {
        this.ubsub();
    }
}

export const AUTH_PROVIDERS: Array<any> = [{
    provide: AuthService,
    useClass: AuthService
}];
