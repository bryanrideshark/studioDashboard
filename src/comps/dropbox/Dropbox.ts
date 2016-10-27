import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from "@angular/core";
import {Lib} from "src/Lib";
import {LocalStorage} from "../../services/LocalStorage";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import * as _ from 'lodash';
import {TreeNode} from 'primeng/primeng';

@Component({
    selector: 'Dropbox',
    changeDetection: ChangeDetectionStrategy.Default,
    styles: [`
        button {
        width: 33.3%;
        }
     `],
    template: `
            <div style="width: 100%" class="btn-group" role="group">
                <button (click)="refresh()"  style="padding: 9px" type="button" class="btn btn-default">
                  <span class="fa fa-refresh"></span>
                </button>
                <button  style="padding: 9px" type="button" class="b btn btn-default">
                  <span class="fa fa-minus"></span>
                </button>
                <button  style="padding: 9px" type="button" class=" btn btn-default">
                  <span *ngIf="accountValidity" style="color: green" class="fa fa-check-square"></span>
                  <span *ngIf="!accountValidity" style="color: red" class="fa fa-minus-square "></span>
                </button>
                <h2 style="display: inline; position: relative; top: -3px; left: 10px">{{totalFilteredPlayers}}</h2>
            </div>
            <br/>
            <input class="form-control" style="width: 99.9%" type="password" (blur)="onTokenChange($event)" [(ngModel)]="token"/>
            <br/>
            <Tree [nodes]="nodes"></Tree>
            <p-tree [value]="nodes"></p-tree>
    `,
    moduleId: __moduleName
})


export class Dropbox {
    constructor(private _http: Http, private localStorage: LocalStorage, private cd: ChangeDetectorRef) {
        this.me = Lib.GetCompSelector(this.constructor);
        if (this.localStorage.getItem('dropbox_key')) {
            this.token = this.localStorage.getItem('dropbox_key');
            this.renderTree();
        }
    }

    private me: string;
    private token;
    private accountValidity: boolean = false;

    private refresh() {
        console.log(this.nodes);
        var a = JSON.stringify(this.nodes);
        this.nodes = JSON.parse(a)
        // this.nodes = [{
        //     name: 'root1',
        //     children: [{
        //         name: 'child1'
        //     }, {
        //         name: 'child2'
        //     }]
        // }, {
        //     name: 'root2',
        //     children: [{
        //         name: 'child2.1'
        //     }, {
        //         name: 'child2.2',
        //         children: [{
        //             name: 'subsub'
        //         }]
        //     }]
        // }];
        // this.nodes = [{
        //     "name": "Camera Uploads",
        //     "id": 0.847493314966749
        // }, {
        //     "name": "icons",
        //     "id": 0.6112438279016996
        // }, {
        //     "name": "Public",
        //     "id": 0.5698881344606346,
        //     "children": []
        // }, {
        //     "name": "ScenesThumbnails",
        //     "id": 0.5058557712692944,
        //     "children": [{
        //         "name": "Catalog",
        //         "id": 0.6858089093372179
        //     }, {
        //         "name": "Clocks",
        //         "id": 0.08159777717161387
        //     }, {
        //         "name": "Directory",
        //         "id": 0.8477346312226623
        //     }, {
        //         "name": "Food Menu",
        //         "id": 0.22730813226462
        //     }, {
        //         "name": "Generic",
        //         "id": 0.870499072214203
        //     }, {
        //         "name": "Hospitality",
        //         "id": 0.6575229856608689
        //     }, {
        //         "name": "Medical",
        //         "id": 0.5275764594848011
        //     }, {
        //         "name": "Spa",
        //         "id": 0.5354921093523624
        //     }, {
        //         "name": "Special Event",
        //         "id": 0.42057998645209804
        //     }, {
        //         "name": "Sports",
        //         "id": 0.7414530924893032
        //     }, {
        //         "name": "Stock",
        //         "id": 0.035732473404250564
        //     }, {
        //         "name": "Transit",
        //         "id": 0.17417703568476628
        //     }, {
        //         "name": "Weather",
        //         "id": 0.4296740436130506
        //     }]
        // }, {
        //     "name": "test",
        //     "id": 0.35958166124184254,
        //     "children": []
        // }]
        this.cd.markForCheck();
    }

    private onTokenChange(event) {
        if (event.target.value.length < 20)
            return;
        this.localStorage.setItem('dropbox_key', event.target.value);
        this.renderTree();
    }

    private renderTree(i_folder: {} = {name: ''}, i_start: boolean = true) {
        this.checkToken((status) => {
            if (!status)
                return;
            var url;
            if (i_folder['path']){
                url = `https://secure.digitalsignage.com/DropboxFolders/${this.token}${i_folder['path']}`;
            } else {
                url = `https://secure.digitalsignage.com/DropboxFolders/${this.token}/${i_folder['name']}`;
            }

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
                        var o = {
                            name: folder.replace(/\//, ''),
                            path: folder
                        }
                        if (i_start) {
                            this.nodes.push(o);
                        } else {
                            if (!i_folder['children'])
                                i_folder['children'] = [];
                            var dirs = o.name.split('/')
                            o.name = dirs[dirs.length - 1];
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
        this.cd.markForCheck();
    }

    nodes = []


    // nodes = [{
    //     id: 1,
    //     name: 'root1',
    //     children: [{
    //         id: 2,
    //         name: 'child1'
    //     }, {
    //         id: 3,
    //         name: 'child2'
    //     }]
    // }, {
    //     id: 4,
    //     name: 'root2',
    //     children: [{
    //         id: 5,
    //         name: 'child2.1'
    //     }, {
    //         id: 6,
    //         name: 'child2.2',
    //         children: [{
    //             id: 7,
    //             name: 'subsub'
    //         }]
    //     }]
    // }];


    files: TreeNode[] = [
        {
            "data": [
                {
                    "label": "Documents",
                    "data": "Documents Folder",
                    "expandedIcon": "fa-folder-open",
                    "collapsedIcon": "fa-folder",
                    "children": [{
                        "label": "Work",
                        "data": "Work Folder",
                        "expandedIcon": "fa-folder-open",
                        "collapsedIcon": "fa-folder",
                        "children": [{
                            "label": "Expenses.doc",
                            "icon": "fa-file-word-o",
                            "data": "Expenses Document"
                        }, {
                            "label": "Resume.doc",
                            "icon": "fa-file-word-o",
                            "data": "Resume Document"
                        }]
                    },
                        {
                            "label": "Home",
                            "data": "Home Folder",
                            "expandedIcon": "fa-folder-open",
                            "collapsedIcon": "fa-folder",
                            "children": [{
                                "label": "Invoices.txt",
                                "icon": "fa-file-word-o",
                                "data": "Invoices for this month"
                            }]
                        }]
                },
                {
                    "label": "Pictures",
                    "data": "Pictures Folder",
                    "expandedIcon": "fa-folder-open",
                    "collapsedIcon": "fa-folder",
                    "children": [
                        {
                            "label": "barcelona.jpg",
                            "icon": "fa-file-image-o",
                            "data": "Barcelona Photo"
                        },
                        {
                            "label": "primeui.png",
                            "icon": "fa-file-image-o",
                            "data": "PrimeUI Logo"
                        }]
                }
            ]
        }
    ]
}
// var getFilesInFolder = (i_folder:{})=>{
//     if (!i_folder['name'])
//         i_folder['name'] = '';
//     const url = `https://secure.digitalsignage.com/DropboxFiles/${this.token}/${i_folder['name']}`;
//     return this._http.get(url)
//         .catch((err) => {
//             return Observable.throw(err);
//         })
//         .finally(() => {
//         })
//         .map((result: any) => {
//             var files: Array<string> = result.json();
//             i_folder['children'] = [];
//             i_folder['children'].push(files);
//             this.cd.markForCheck();
//         }).subscribe();
// }

// if (i_start==true)
//     getFilesInFolder(this.nodes);
//aa