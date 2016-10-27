import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewChild
} from "@angular/core";
import {Lib} from "src/Lib";
import {LocalStorage} from "../../services/LocalStorage";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
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
                <button (click)="refreshTree()"  style="padding: 9px" type="button" class="btn btn-default">
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
            <div style="margin-top:8px">Selected Node: {{selectedFile ? selectedFile.label : 'none'}}</div>
            <div style="height: 200px; overflow-y: scroll">
                <p-tree [value]="nodes" selectionMode="single" [(selection)]="selectedFile" 
                    (onNodeSelect)="nodeSelect($event)" (onNodeUnselect)="nodeUnselect($event)">
                </p-tree>
            </div>
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
    selectedFile: TreeNode;

    nodeUnselect(event) {
        console.log({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
    }

    nodeSelect(event) {
        var url = `https://secure.digitalsignage.com/DropboxFiles/${this.token}${event.node.path}`;
        console.log(url);
    }


    private me: string;
    private token;
    private accountValidity: boolean = false;

    // @ViewChild(TreeComponent)
    // private tree: TreeComponent;

    private onTokenChange(event) {
        if (event.target.value.length < 20)
            return;
        this.localStorage.setItem('dropbox_key', event.target.value);
        this.renderTree();
    }

    private refreshTree(){
        this.nodes = [];
        this.renderTree();
    }

    private renderTree(i_folder: {} = {name: '', path: '/'}, i_start: boolean = true) {
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
                        o.label = o.name;

                        var a = o.name.split('/');
                        var b = a.length;
                        o.label = a[b-1];
                        // o.name = o.path;


                        if (i_start) {
                            this.nodes.push(o);
                        } else {
                            if (!i_folder['children'])
                                i_folder['children'] = [];
                            var dirs = o.name.split('/')
                            o.name = dirs[dirs.length - 1];
                            i_folder['children'].push(o);
                        }
                        // this.tree.treeModel.update()
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