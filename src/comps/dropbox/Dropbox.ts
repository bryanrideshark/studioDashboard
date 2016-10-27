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
        .btn-small i {
            position: relative;
            top: -2px;
            left: -5px;
        }
        .btn-small {
            width: 25px;
            height: 25px;
            padding-right: 5px;
        }
        li {
            font-size: 0.9em;
        }
     `],
    template: `
            <div style="width: 100%" class="btn-group" role="group">
                <button (click)="refreshTree()" style="padding: 9px" type="button" class="btn btn-default">
                    <span class="fa fa-refresh"></span>
                </button>
                <button style="padding: 9px" type="button" class="b btn btn-default">
                    <span class="fa fa-minus"></span>
                </button>
                <button style="padding: 9px" type="button" class=" btn btn-default">
                    <span *ngIf="accountValidity" style="color: green" class="fa fa-check-square"></span>
                    <span *ngIf="!accountValidity" style="color: red" class="fa fa-minus-square "></span>
                </button>
                <h2 style="display: inline; position: relative; top: -3px; left: 10px">{{totalFilteredPlayers}}</h2>
            </div>
            <br/>
            <input class="form-control" style="width: 99.9%" type="password" (blur)="onTokenChange($event)" [(ngModel)]="token"/>
            <br/>
            <!--<div style="margin-top:8px">Selected Node: {{selectedFile ? selectedFile.label : 'none'}}</div>-->
            <div style="height: 200px; width: 100%; overflow: scroll">
                <p-tree [value]="nodes" selectionMode="single" [(selection)]="selectedFile"
                        (onNodeSelect)="nodeSelect($event)" (onNodeUnselect)="nodeUnselect($event)">
                </p-tree>
            </div>
            <div style="height: 200px; width: 100%; overflow: scroll">
                <ul class="list-group">
                    <li class="list-group-item" *ngFor="let fileName of files">
                        <button (click)="onAddResource(fileName)" href="#" class="btn btn-small">
                            <i class="fa fa-plus"></i>
                        </button>
                        {{fileName}}
                    </li>
                </ul>
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

    private onAddResource(fileName){
        console.log(fileName);
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
                    this.files.push(Lib.FileTailName(fileName.file));
                })
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


