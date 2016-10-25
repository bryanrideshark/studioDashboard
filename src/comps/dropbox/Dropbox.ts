import {Component, ChangeDetectionStrategy} from "@angular/core";
import {Lib} from "src/Lib";
//import MyCompTemplate from './MyComp.html!text'; /*prod*/
//import MyCompStyle from './MyComp.css!text'; /*prod*/

@Component({
//	styles: [MyCompStyle], /*prod*/
//	template: MyCompTemplate, /*prod*/
//  template: `
//            <small class="release">package properties
//                <i style="font-size: 1.4em" class="fa fa-cog pull-right"></i>
//            </small>
//            <small class="debug">{{me}}</small>
//            `,
    selector: 'Dropbox',
    template: `<h1>Dropbox</h1>
                    <Tree [nodes]="nodes"></Tree>
                    <!--<p-tree [value]="files"></p-tree>-->
                `,
    moduleId: __moduleName
})


export class Dropbox {
    constructor() {
        this.me = Lib.GetCompSelector(this.constructor)
    }
    private me:string;


    nodes = [
        {
            id: 1,
            name: 'root1',
            children: [
                { id: 2, name: 'child1' },
                { id: 3, name: 'child2' }
            ]
        },
        {
            id: 4,
            name: 'root2',
            children: [
                { id: 5, name: 'child2.1' },
                {
                    id: 6,
                    name: 'child2.2',
                    children: [
                        { id: 7, name: 'subsub' }
                    ]
                }
            ]
        }
    ];


    // files: TreeNode[] = [
    //     {
    //         "data":
    //             [
    //                 {
    //                     "label": "Documents",
    //                     "data": "Documents Folder",
    //                     "expandedIcon": "fa-folder-open",
    //                     "collapsedIcon": "fa-folder",
    //                     "children": [{
    //                         "label": "Work",
    //                         "data": "Work Folder",
    //                         "expandedIcon": "fa-folder-open",
    //                         "collapsedIcon": "fa-folder",
    //                         "children": [{"label": "Expenses.doc", "icon": "fa-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "fa-file-word-o", "data": "Resume Document"}]
    //                     },
    //                         {
    //                             "label": "Home",
    //                             "data": "Home Folder",
    //                             "expandedIcon": "fa-folder-open",
    //                             "collapsedIcon": "fa-folder",
    //                             "children": [{"label": "Invoices.txt", "icon": "fa-file-word-o", "data": "Invoices for this month"}]
    //                         }]
    //                 },
    //                 {
    //                     "label": "Pictures",
    //                     "data": "Pictures Folder",
    //                     "expandedIcon": "fa-folder-open",
    //                     "collapsedIcon": "fa-folder",
    //                     "children": [
    //                         {"label": "barcelona.jpg", "icon": "fa-file-image-o", "data": "Barcelona Photo"},
    //                         {"label": "logo.jpg", "icon": "fa-file-image-o", "data": "PrimeFaces Logo"},
    //                         {"label": "primeui.png", "icon": "fa-file-image-o", "data": "PrimeUI Logo"}]
    //                 },
    //                 {
    //                     "label": "Movies",
    //                     "data": "Movies Folder",
    //                     "expandedIcon": "fa-folder-open",
    //                     "collapsedIcon": "fa-folder",
    //                     "children": [{
    //                         "label": "Al Pacino",
    //                         "data": "Pacino Movies",
    //                         "children": [{"label": "Scarface", "icon": "fa-file-video-o", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "fa-file-video-o", "data": "Serpico Movie"}]
    //                     },
    //                         {
    //                             "label": "Robert De Niro",
    //                             "data": "De Niro Movies",
    //                             "children": [{"label": "Goodfellas", "icon": "fa-file-video-o", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "fa-file-video-o", "data": "Untouchables Movie"}]
    //                         }]
    //                 }
    //             ]
    //     }
    // ]
}