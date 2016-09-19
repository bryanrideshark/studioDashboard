import {
    Component,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import {Lib} from "src/Lib";

@Component({
    selector: 'ResourceViewer',
    moduleId: __moduleName,
    template: `
        <small>{{me}}</small>
        <div *ngIf="!videoSource">
            <img class="img-responsive" [src]="imgSource"/>
        </div>
        <div *ngIf="videoSource">
            <h5>video</h5>
            <video class="img-responsive" autoplay>
                <source [src]="videoSource" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResourceViewer {
    constructor() {
        this.me = Lib.GetCompSelector(this.constructor)
    }

    private me: string;
    private imgSource = '';
    private videoSource;

    @Input()
    set resource(i_loadResource: string) {
        this.onLoadResource(i_loadResource);
    }

    private onLoadResource(i_loadResource: string) {

        // image
        var res = i_loadResource.match(/(?!.*[.](?:jpg|jpeg|png)$).*/ig);
        if (res[0].length <= 4) {
            this.videoSource = null;
            this.imgSource = i_loadResource;
            return;
        }

        // video
        var res = i_loadResource.match(/(?!.*[.](?:mp4)$).*/ig);
        if (res[0].length <= 4) {
            this.videoSource = i_loadResource;
            this.imgSource = '';
            return;
        }

        // dropbox / drive
        //todo: possible more testing on more file formats and test with google drive
        //this.videoSource = 'https://pluto.signage.me/Resources/business419212/resources/7.mp4';
        jQuery.get(i_loadResource, data => {
            this.imgSource = data.url;
        })
        return;
    }
}

