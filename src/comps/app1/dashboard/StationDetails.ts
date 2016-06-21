import {Component, Input, ChangeDetectionStrategy, ViewChild, Renderer, ElementRef} from "@angular/core";
import {Http} from "@angular/http";
import {StationModel} from "../../../stations/StationModel";
import {AppStore} from "angular2-redux-util";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/do';
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/interval";
import * as _ from "lodash";
import {Tabs} from "../../tabs/tabs";
import {Tab} from "../../tabs/tab";
import {BusinessAction} from "../../../business/BusinessAction";
import {ImgLoader} from "../../imgloader/ImgLoader";

@Component({
    selector: 'stationDetails',
    directives: [Tabs, Tab, ImgLoader],
    moduleId: __moduleName,
    templateUrl: 'StationDetails.html',
    styleUrls: ['StationDetails.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class StationDetails {

    constructor(private appStore:AppStore,
                private http:Http,
                private businessActions:BusinessAction,
                private elRef:ElementRef,
                private renderer:Renderer) {
    }

    private snapshots:Array<any> = [];

    private onModalClose($event) {
    }

    // private getImageUrl():Array<string> {
    //     return if (!this.whitelabelModel)
    //         return [];
    //     if (this.images.length > 0)
    //         return this.images;
    //     this.images.push('http://galaxy.signage.me/Resources/Resellers/' + this.getBusinessInfo('businessId') + '/Logo.jpg')
    //     this.images.push('http://galaxy.signage.me/Resources/Resellers/' + this.getBusinessInfo('businessId') + '/Logo.png')
    //     return this.images;
    // }

    private _wireSnapshot() {
        // var self = this;
        // $(Elements.STATION_SNAPSHOT_COMMAND).on('click', function (e) {
        //     self.m_imagePath = '';
        //     self.m_imageReloadCount = 0;
        //     self._listenSnapshotComplete();
        //
        //     /* Can't use short path due to IE error, gotta go long route via _sendSnapshotCommand
        //      self.m_imagePath = pepper.sendSnapshot(Date.now(), '0.2', self.m_selected_station_id, function (e) {});
        //      log(self.m_imagePath);
        //      */
        //
        //     self._sendSnapshotCommand(self.m_selected_station_id);
        //     $(Elements.SNAP_SHOT_IMAGE).attr('src', self.m_imagePath);
        //     $(Elements.SNAP_SHOT_IMAGE).hide();
        //     $(Elements.SNAP_SHOT_SPINNER).fadeIn('slow');
        //     $(Elements.STATION_CONTROL + ' button').prop('disabled', 'disabled');
        //
        //     self.m_snapshotInProgress = setInterval(function () {
        //         self.m_imageReloadCount++;
        //         // log('snapshot JS... ' + self.m_imagePath);
        //         $(Elements.SNAP_SHOT_IMAGE).attr('src', self.m_imagePath);
        //
        //         // snapshot timed out so reset
        //         if (self.m_imageReloadCount > 6) {
        //             self._stopSnapshot();
        //             $(Elements.SNAP_SHOT_IMAGE).attr('src', self.m_imagePath);
        //             var stationModel = self._getStationModel(self.m_selected_station_id);
        //             self._updatePropButtonState(stationModel);
        //         }
        //     }, 1000);
        //     return false;
        // });
    }

    _AAsendSnapshotCommand(i_station) {
        // var self = this;
        // var d = new Date().getTime();
        // var path = pepper.sendSnapshot(d, 0.2, i_station, function (e) {
        // });
        // setTimeout(function () {
        //     self.m_imagePath = path;
        // }, 3000);

        /*
         var data = {
         '@functionName': 'f_captureScreen',
         '@stationID': i_station,
         '@quality': 1,
         '@time': Date.now()
         };
         self.ajaxJsonGetter.getData(data, onSnapshotReply);
         function onSnapshotReply(e) {
         if (e.responce['status'] == 'pass') {
         log('getting image from ' + e.responce['path']);
         self.m_imagePath = e.responce['path'];
         }
         }
         // self.m_imagePath = 'https://pluto.signage.me/Snapshots/business355181/station12/1397689062944.jpg';
         // return;
         */

        // self._sendSnapshotCommand(self.m_selected_station_id);
        // $(Elements.SNAP_SHOT_IMAGE).attr('src', self.m_imagePath);
        // $(Elements.SNAP_SHOT_IMAGE).hide();
        // $(Elements.SNAP_SHOT_SPINNER).fadeIn('slow');
        // $(Elements.STATION_CONTROL + ' button').prop('disabled', 'disabled');
        //
        // self.m_snapshotInProgress = setInterval(function () {
        //     self.m_imageReloadCount++;
        //     // log('snapshot JS... ' + self.m_imagePath);
        //     $(Elements.SNAP_SHOT_IMAGE).attr('src', self.m_imagePath);
        //
        //     // snapshot timed out so reset
        //     if (self.m_imageReloadCount > 6) {
        //         self._stopSnapshot();
        //         $(Elements.SNAP_SHOT_IMAGE).attr('src', self.m_imagePath);
        //         var stationModel = self._getStationModel(self.m_selected_station_id);
        //         self._updatePropButtonState(stationModel);
        //     }
        // }, 1000);

    }

    AAAsendSnapshot(i_fileName, i_quality, i_stationId, i_callBack) {
        // var url = window.g_protocol + pepper.getUserData().domain + '/WebService/sendCommand.ashx?i_user=' + pepper.getUserData().userName + '&i_password=' + pepper.getUserData().userPass + '&i_stationId=' + i_stationId + '&i_command=' + 'captureScreen2' + '&i_param1=' + i_fileName + '&i_param2=' + i_quality + '&callback=?';
        // $.getJSON(url, i_callBack);
        // var path = window.g_protocol + pepper.getUserData().domain + '/Snapshots/business' + pepper.getUserData().businessID + "/station" + i_stationId + '/' + i_fileName + '.jpg';
        // log(path);
        // return path;
    }

    private sendCommand(i_command, i_stationId, i_callBack) {
        // var url = window.g_protocol + pepper.getUserData().domain + '/WebService/sendCommand.ashx?i_user=' + pepper.getUserData().userName + '&i_password=' + pepper.getUserData().userPass + '&i_stationId=' + i_stationId + '&i_command=' + i_command + '&i_param1=' + 'SignageStudioLite' + '&i_param2=' + '&callback=?';
        // console.log(url)
        // jQuery.getJSON(url, i_callBack);
    }

    private m_selectedStation:StationModel;
    private m_ip:string = '';

    // @Input() station:StationModel;

    @ViewChild('imgLoader') imgLoader:ImgLoader

    @Input()
    set station(i_selectedStation:StationModel) {
        if (_.isUndefined(i_selectedStation))
            return;
        this.m_selectedStation = i_selectedStation;

        // this.m_selectedStation.getPublicIp()
        // this.m_selectedStation.getLocalIp()
        // this.m_selectedStation.getLocation().lat
        // this.m_selectedStation.getLocation().lon
        // this.m_selectedStation.getLocation().city
        // this.m_selectedStation.getLocation().country
    }

    private sendSnapshot() {
        var stationId = this.m_selectedStation.getStationId();
        var businessId = this.m_selectedStation.getKey('businessId');
        var fileName = Date.now();
        var source = this.m_selectedStation.getSource(this.appStore);
        var customerUserName = this.m_selectedStation.getCustomerName(this.appStore);
        this.businessActions.getUserPass(customerUserName, (i_pass)=> {
            var pass = i_pass;
            var url = `https://${source}/WebService/sendCommand.ashx?i_user=${customerUserName}&i_password=${pass}&i_stationId=${stationId}&i_command=captureScreen2&i_param1=${fileName}&i_param2=0.2&callback=?`;

            jQuery.getJSON(url, ()=> {
            });
            // this.jsonp.get(url).subscribe((res)=>{
            //     console.log(res);
            // })
            var path = `https://${source}/Snapshots/business${businessId}/station${stationId}/${fileName}.jpg`;
            // console.log(path);
            // this.http.request(path).delay(500).retry(3).subscribe((res)=> {
            //     jQuery(this.elRef.nativeElement).find('.newImage').fadeOut(200);
            //     var img = this.renderer.createElement(this.elRef.nativeElement, 'img', null);
            //     img.src = path;
            //     jQuery(img).addClass('newImage')
            // }, (err)=> {
            //     console.log('err ' + path);
            // }, ()=> {
            // })
            //
            // this.snapshots.push(path);
            // this.imgLoader.reloadImage();
            jQuery(this.elRef.nativeElement).find('.newImage').fadeOut(200);
            var img = this.renderer.createElement(this.elRef.nativeElement, 'img', null);
            jQuery(img).addClass('snap');

            var int$ = Observable.interval(500).do(()=> {
                img.src = path;
            })
            var $err = Observable.fromEvent(img, 'error')
            var load$ = Observable.fromEvent(img, 'load')
            var subscription = Observable.merge(int$, $err).takeUntil(load$).subscribe((res)=> {
                subscription.unsubscribe();
            })



            // jQuery(img).one('load',(status)=>{
            //     alert(1)
            // })
            // jQuery(img).one('error',(status)=>{
            //     alert(2)
            // })
            // jQuery(img).addClass('newImage')
            //var path = window.g_protocol + pepper.getUserData().domain + '/Snapshots/business' + pepper.getUserData().businessID + "/station" + i_stationId + '/' + i_fileName + '.jpg';
            // return path;
            //
            // var imagePath = this.sendSnapshot(Date.now(), '0.2', stationId, function (e) {
            // });
            // log(self.m_imagePath);

        });

    }
}

