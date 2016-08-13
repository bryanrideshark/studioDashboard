import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {HTTP_PROVIDERS} from "@angular/http";
import {CommBroker, IMessage} from "../../services/CommBroker";
import {Consts} from "../../../src/Conts";

@Component({
    templateUrl: '/src/comps/app1/App1.html'
})
export class App1 {
    private routerActive:boolean;

    constructor(private commBroker:CommBroker, private router:Router) {
        jQuery(".navbar-header .navbar-toggle").trigger("click");
        jQuery('.navbar-nav').css({
            display: 'block'
        });
        this.listenMenuChanges();
    }

    ngOnInit() {
        this.routerActive = true;
        this.commBroker.getService(Consts.Services().App).appResized();
        // setTimeout(()=> {
        //     alert('1')
        //     this.router.navigate(['/App1/Dashboard'])
        // }, 2000)

    }

    public listenMenuChanges() {
        var self = this;
        var unsub = self.commBroker.onEvent(Consts.Events().MENU_SELECTION).subscribe((e:IMessage)=> {
            if (!self.routerActive)
                return;
            let screen = (e.message);
            self.router.navigate([`/App1/${screen}`]);
        });
    }
}