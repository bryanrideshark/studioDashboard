import {Injectable, Inject, forwardRef} from "@angular/core";
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {AppStore} from "angular2-redux-util";
import {LocalStorage} from "./LocalStorage";
import {StoreService} from "./StoreService";
import {AppdbAction} from "../appdb/AppdbAction";
import 'rxjs/add/observable/fromPromise';
import {Observable} from 'rxjs/Observable';
import * as bootbox from "bootbox";
import Map = Immutable.Map;


export enum FlagsAuth {
    AuthPass,
    AuthFailEnterprise,
    WrongPass,
    NotEnterprise,
    Enterprise
}

@Injectable()
export class AuthService {
    private ubsub: ()=>void;
    private m_authenticated: boolean = false;
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
            this.m_authenticated = credentials.get('authenticated');
            var user = credentials.get('user');
            var pass = credentials.get('pass');
            var remember = credentials.get('remember');

            if (this.m_authenticated) {
                this.onAuthPass(user, pass, remember);
            } else {
                this.onAuthFail();
            }
            if (this.m_pendingNotify)
                this.m_pendingNotify(this.m_authenticated)
        }, 'appdb.credentials', false);
    }

    private onAuthPass(i_user, i_pass, i_remember) {
        bootbox.hideAll();
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
            bootbox.hideAll();
            this.localStorage.setItem('remember_me', {
                u: '',
                p: '',
                r: ''
            });
        }, 1000);
        return false;
    }

    public authUser(i_user?: string, i_pass?: string, i_remember?: string): void {
        bootbox.dialog({
            closeButton: false,
            title: "Please wait, Authenticating...",
            message: " "
        });
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
            return {u: '', p: '', r: ''};
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

        if (this.m_authenticated)
            return Promise.resolve(true);

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

            this.m_pendingNotify = (status) => {
                resolve(status);
                if (!status) {
                    this.router.navigate(target);
                    resolve(false);
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

    ngOnDestroy() {
        this.ubsub();
    }
}

export const AUTH_PROVIDERS: Array<any> = [{provide: AuthService, useClass: AuthService}];
