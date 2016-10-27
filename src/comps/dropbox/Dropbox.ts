import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from "@angular/core";
import {Lib} from "src/Lib";
import {LocalStorage} from "../../services/LocalStorage";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {TreeNode} from "primeng/primeng";
//import DropboxTemplate from './Dropbox.html!text'; /*prod*/
//import DropboxStyle from './Dropbox.css!text'; /*prod*/

@Component({
//  styles: [DropboxStyle], /*prod*/
//  template: DropboxTemplate, /*prod*/
    selector: 'Dropbox',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './Dropbox.html', /*dev*/
    styleUrls: ['./Dropbox.css'], /*dev*/
    moduleId: __moduleName,
})

export class Dropbox {
    constructor(private _http: Http, private localStorage: LocalStorage, private cd: ChangeDetectorRef) {
        this.me = Lib.GetCompSelector(this.constructor);
        if (this.localStorage.getItem('dropbox_key')) {
            this.token = this.localStorage.getItem('dropbox_key');
            this.renderTree();
        }
    }

    private selectedFile: TreeNode;
    private files = [];
    private nodes = []
    private me: string;
    private token;
    private accountValidity: boolean = false;

    private nodeUnselect(event) {
        console.log({
            severity: 'info',
            summary: 'Node Unselected',
            detail: event.node.label
        });
    }

    private onAddResource(f) {
        this.loadFile(f.fileName.file);
    }

    private nodeSelect(event) {
        this.loadFiles(event.node.path);
    }

    private onTokenChange(event) {
        if (event.target.value.length < 20)
            return;
        this.localStorage.setItem('dropbox_key', event.target.value);
        this.renderTree();
    }

    private refreshTree() {
        this.nodes = [];
        this.files = [];
        this.renderTree();
    }

    private loadFiles(i_path) {
        this.files = [];
        const url = `https://secure.digitalsignage.com/DropboxFiles/${this.token}${i_path}`;
        return this._http.get(url)
            .catch((err) => {
                return Observable.throw(err);
            })
            .finally(() => {
            })
            .map((result: any) => {
                var f = result.json();
                f.forEach((fileName) => {
                    this.files.push({
                        path: i_path,
                        fileName: fileName,
                        fileRoot: Lib.FileTailName(fileName.file)
                    });
                })
                this.cd.markForCheck();
            }).subscribe();
    }

    private loadFile(i_path) {
        const url = `https://secure.digitalsignage.com/DropboxFileLink/${this.token}${i_path}`;
        return this._http.get(url)
            .catch((err) => {
                return Observable.throw(err);
            })
            .finally(() => {
            })
            .map((result: any) => {
                var f = result.json();
                console.log(f.url);
                this.cd.markForCheck();
            }).subscribe();
    }

    private renderTree(i_folder: {} = {
        name: '',
        path: '/'
    }, i_start: boolean = true) {
        this.checkToken((status) => {
            if (!status)
                return;
            var url = `https://secure.digitalsignage.com/DropboxFolders/${this.token}${i_folder['path']}`;
            this._http.get(url)
                .catch((err) => {
                    return Observable.throw(err);
                })
                .finally(() => {
                })
                .map((result: any) => {
                    if (i_start)
                        this.nodes = [];
                    var folders: Array<string> = result.json();
                    folders.forEach((folder, idx) => {
                        var o = Object.create(null, {});
                        o.name = folder.replace(/\//, '');
                        o.path = folder;
                        o.label = Lib.FileTailName(o.name);
                        if (i_start) {
                            this.nodes.push(o);
                        } else {
                            if (!i_folder['children'])
                                i_folder['children'] = [];
                            o.name = Lib.FileTailName(o.name);
                            i_folder['children'].push(o);
                        }
                        this.renderTree(o, false);
                    })
                    this.cd.markForCheck();
                }).subscribe();
        });
    }

    private checkToken(i_cb) {
        const url = `https://secure.digitalsignage.com/DropboxAccountInfo/${this.token}`
        this._http.get(url)
            .catch((err) => {
                this.updateAccountValidity(false);
                i_cb(false);
                return Observable.throw(err);
            })
            .finally(() => {
            })
            .map((result: any) => {
                var reply: any = result.json();
                if (reply.uid) {
                    this.updateAccountValidity(true);
                    i_cb(true);
                } else {
                    this.updateAccountValidity(false);
                    i_cb(false);
                }
            }).subscribe();
    }

    private updateAccountValidity(i_value) {
        this.accountValidity = i_value;
        if (!i_value)
            this.files = [];
        this.cd.markForCheck();
    }
}

// var a = {
//     "packages": {
//         "update": [{
//             "Key": 3344,
//             "Value": {
//                 "id": "3344",
//                 "handle": "2",
//                 "modified": "0",
//                 "customerId": "3402",
//                 "packageContents": {
//                     "add": [{
//                         "id": "-1",
//                         "handle": "5",
//                         "modified": "1",
//                         "contentLabel": "/abc/LaunchScreen-Center.png",
//                         "duration": 10,
//                         "reparationsPerHour": 60,
//                         "contentUrl": "http://secure.digitalsignage.com/DropboxFileLink/ff990135-ffe7-4c1e-b5ee-fddfdb203775/abc/LaunchScreen-Center.png",
//                         "contentType": 2,
//                         "contentExt": "",
//                         "maintainAspectRatio": "false",
//                         "contentVolume": "1",
//                         "locationLat": 0,
//                         "locationLng": 0,
//                         "locationRadios": 0
//                     }]
//                 }
//             }
//         }]
//     }
// }