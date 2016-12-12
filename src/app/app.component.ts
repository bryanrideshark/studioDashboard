import {Component, ViewContainerRef} from "@angular/core";
import {StyleService} from "../styles/StyleService";
import {AppdbAction} from "../appdb/AppdbAction";
import "rxjs/add/operator/catch";
import {LocalStorage} from "../services/LocalStorage";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {AppStore} from "angular2-redux-util";
import {CommBroker} from "../services/CommBroker";
import {Title} from "@angular/platform-browser";
import {ToastsManager} from "ng2-toastr";
import {Ngmslib} from "ng-mslib";
import {Consts} from "../Conts";
import {Observable} from "rxjs";
import {ServerMode} from "./app.module";
import {setTimeout} from "timers";
// import {platform} from "os";
// import * as bootbox from 'bootbox';

@Component({
    selector: 'app-root',
    providers: [StyleService, AppdbAction],
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(private localStorage: LocalStorage,
                private router: Router,
                private appStore: AppStore,
                private commBroker: CommBroker,
                private activatedRoute: ActivatedRoute,
                private titleService: Title,
                styleService: StyleService,
                private appdbAction: AppdbAction,
                private toastr: ToastsManager,
                private vRef: ViewContainerRef) {

        this.checkPlatform();

        // setTimeout(() => {
        //     bootbox.alert('aaa2');
        // }, 4000)

        /** remove localstore **/
        // this.localStorage.removeItem('remember_me')
        // this.localStorage.removeItem('business_id')

        // todo: add logic to as when on each env
        // 0 = cloud, 1 = private 2 = hybrid
        Ngmslib.GlobalizeStringJS();
        console.log(StringJS('app-loaded-ready').humanize().s);

        this.commBroker.setValue(Consts.Values().SERVER_MODE, ServerMode.CLOUD);
        this.m_styleService = styleService;
        this.commBroker.setService(Consts.Services().App, this);
        Observable.fromEvent(window, 'resize').debounceTime(250).subscribe(() => {
            this.appResized();
        });
        if (!Ngmslib.DevMode()) {
            setTimeout(() => {
                router.navigate(['/App1/Dashboard']);
            }, 1000);
        }
        this.toastr.setRootViewContainerRef(vRef);
    }

    private m_styleService: StyleService;
    private version = '3.59';

    private checkPlatform() {
        switch (platform.name.toLowerCase()) {
            case 'microsoft edge': {
                alert(`${platform.name} browser not supported at this time, please use Google Chrome`);
                break;
            }
            case 'chrome': {
                break;
            }
            default: {
                alert('for best performance please use Google Chrome');
                break;
            }
        }
    }

    public appResized(): void {
        var appHeight = document.body.clientHeight;
        var appWidth = document.body.clientWidth;
        this.commBroker.setValue(Consts.Values().APP_SIZE, {
            height: appHeight,
            width: appWidth
        });
        this.commBroker.fire({
            fromInstance: self,
            event: Consts.Events().WIN_SIZED,
            context: '',
            message: {
                height: appHeight,
                width: appWidth
            }
        })
    }

    ngOnInit() {
        // does not support hot-reload
        if (!Ngmslib.DevMode)
            this.listenRouterUpdateTitle();
    }

    private listenRouterUpdateTitle() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) {
                    route = route.firstChild
                }
                return route;
            }).filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                this.titleService.setTitle(event['title'])
            });
    }

}

