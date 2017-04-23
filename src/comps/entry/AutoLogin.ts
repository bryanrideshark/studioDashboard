import {Component, ChangeDetectionStrategy} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {AuthState} from "../../appdb/AppdbAction";
import {Router} from "@angular/router";
import {Compbaser, NgmslibService} from "ng-mslib";

@Component({
    selector: 'AutoLogin',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<h5 style="padding-left: 10px"><span class="fa fa-key"></span> verifying access...</h5>`
})
export class AutoLogin extends Compbaser {

    constructor(private appStore: AppStore, private router:Router, private ngmslibService:NgmslibService) {
        super();
        this.cancelOnDestroy(
            appStore.sub((credentials: Map<string,any>) => {
                var state = credentials.get('authenticated');
                var user = this.ngmslibService.base64().encode(credentials.get('user'));
                var pass = this.ngmslibService.base64().encode(credentials.get('pass'));
                switch (state) {
                    case AuthState.FAIL: {
                        this.navigateTo(['/UserLogin'])
                        break;
                    }
                    case AuthState.TWO_FACTOR: {
                        this.navigateTo([`/UserLogin/twoFactor/${user}/${pass}`])
                        break;
                    }
                    case AuthState.PASS: {
                        this.navigateTo(['/App1/Dashboard'])

                        break;
                    }
                }
            }, 'appdb.credentials', false)
        )
    }

    private navigateTo(to){
        setTimeout(()=>{
            this.router.navigate(to)
        },1)
    }
}