import {Component, ChangeDetectionStrategy} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {List} from "immutable";

@Component({
    selector: 'AdnetNetworkPackageViewer',
    moduleId: __moduleName,
    templateUrl: 'AdnetNetworkPackageViewer.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdnetNetworkPackageViewer {

    // constructor(private appStore: AppStore, private businessAction: BusinessAction) {
    //     var i_businesses = this.appStore.getState().business;
    //
    //     this.businessesList = i_businesses.getIn(['businesses']);
    //     this.unsub = this.appStore.sub((i_businesses: List<BusinessModel>) => {
    //         this.businessesList = i_businesses;
    //     }, 'business.businesses');
    //
    // }
    //
    // // @ViewChild(SimpleList)
    // // simpleList:SimpleList;
    //
    // private unsub: Function;
    // private businessesList: List<BusinessModel> = List<BusinessModel>();
    //
    // private ngOnDestroy() {
    //     this.unsub();
    // }
}