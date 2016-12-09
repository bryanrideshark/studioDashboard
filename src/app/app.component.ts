import {Component} from "@angular/core";
import "rxjs/add/operator/catch";


@Component({
    selector: 'app-root',
    template: '<h1>loaded</h1>',
    providers: []
})
export class AppComponent {
    constructor(){
        console.log(123);
    }

}

