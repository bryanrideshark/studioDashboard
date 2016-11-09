System.register(["@angular/core", "src/Lib", "../../services/LocalStorage", "@angular/http", "rxjs/Observable", './Dropbox.html!text', './Dropbox.css!text'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Lib_1, LocalStorage_1, http_1, Observable_1, Dropbox_html_text_1, Dropbox_css_text_1;
    var Dropbox;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (LocalStorage_1_1) {
                LocalStorage_1 = LocalStorage_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Dropbox_html_text_1_1) {
                Dropbox_html_text_1 = Dropbox_html_text_1_1;
            },
            function (Dropbox_css_text_1_1) {
                Dropbox_css_text_1 = Dropbox_css_text_1_1;
            }],
        execute: function() {
            Dropbox = (function () {
                function Dropbox(_http, localStorage, cd) {
                    this._http = _http;
                    this.localStorage = localStorage;
                    this.cd = cd;
                    this.onFileLinkSelected = new core_1.EventEmitter();
                    this.files = [];
                    this.nodes = [];
                    this.accountValidity = false;
                    this.me = Lib_1.Lib.GetCompSelector(this.constructor);
                    if (this.localStorage.getItem('dropbox_key')) {
                        this.token = this.localStorage.getItem('dropbox_key');
                        this.renderTree();
                    }
                }
                Dropbox.prototype.nodeUnselect = function (event) {
                    console.log({
                        severity: 'info',
                        summary: 'Node Unselected',
                        detail: event.node.label
                    });
                };
                Dropbox.prototype.onAddResource = function (f) {
                    this.loadFile(f.fileName.file);
                };
                Dropbox.prototype.nodeSelect = function (event) {
                    this.loadFiles(event.node.path);
                };
                Dropbox.prototype.onTokenChange = function (event) {
                    if (event.target.value.length < 20)
                        return;
                    this.localStorage.setItem('dropbox_key', event.target.value);
                    this.renderTree();
                };
                Dropbox.prototype.refreshTree = function () {
                    this.nodes = [];
                    this.files = [];
                    this.renderTree();
                };
                Dropbox.prototype.loadFiles = function (i_path) {
                    var _this = this;
                    this.files = [];
                    var url = "https://secure.digitalsignage.com/DropboxFiles/" + this.token + i_path;
                    return this._http.get(url)
                        .catch(function (err) {
                        return Observable_1.Observable.throw(err);
                    })
                        .finally(function () {
                    })
                        .map(function (result) {
                        var f = result.json();
                        f.forEach(function (fileName) {
                            _this.files.push({
                                path: i_path,
                                fileName: fileName,
                                fileRoot: Lib_1.Lib.FileTailName(fileName.file, 1)
                            });
                        });
                        _this.cd.markForCheck();
                    }).subscribe();
                };
                Dropbox.prototype.loadFile = function (i_path) {
                    var _this = this;
                    var url = "https://secure.digitalsignage.com/DropboxFileLink/" + this.token + i_path;
                    return this._http.get(url)
                        .catch(function (err) {
                        return Observable_1.Observable.throw(err);
                    })
                        .finally(function () {
                    })
                        .map(function (result) {
                        var f = result.json();
                        _this.onFileLinkSelected.emit(f);
                        _this.cd.markForCheck();
                    }).subscribe();
                };
                Dropbox.prototype.renderTree = function (i_folder, i_start) {
                    var _this = this;
                    if (i_folder === void 0) { i_folder = {
                        name: '',
                        path: '/'
                    }; }
                    if (i_start === void 0) { i_start = true; }
                    this.checkToken(function (status) {
                        if (!status)
                            return;
                        var url = "https://secure.digitalsignage.com/DropboxFolders/" + _this.token + i_folder['path'];
                        _this._http.get(url)
                            .catch(function (err) {
                            return Observable_1.Observable.throw(err);
                        })
                            .finally(function () {
                        })
                            .map(function (result) {
                            if (i_start)
                                _this.nodes = [];
                            var folders = result.json();
                            folders.forEach(function (folder, idx) {
                                var o = Object.create(null, {});
                                o.name = folder.replace(/\//, '');
                                o.path = folder;
                                o.label = Lib_1.Lib.FileTailName(o.name, 1);
                                if (i_start) {
                                    _this.nodes.push(o);
                                }
                                else {
                                    if (!i_folder['children'])
                                        i_folder['children'] = [];
                                    o.name = Lib_1.Lib.FileTailName(o.name, 1);
                                    i_folder['children'].push(o);
                                }
                                _this.renderTree(o, false);
                            });
                            _this.cd.markForCheck();
                        }).subscribe();
                    });
                };
                Dropbox.prototype.checkToken = function (i_cb) {
                    var _this = this;
                    var url = "https://secure.digitalsignage.com/DropboxAccountInfo/" + this.token;
                    this._http.get(url)
                        .catch(function (err) {
                        _this.updateAccountValidity(false);
                        i_cb(false);
                        return Observable_1.Observable.throw(err);
                    })
                        .finally(function () {
                    })
                        .map(function (result) {
                        var reply = result.json();
                        if (reply.uid) {
                            _this.updateAccountValidity(true);
                            i_cb(true);
                        }
                        else {
                            _this.updateAccountValidity(false);
                            i_cb(false);
                        }
                    }).subscribe();
                };
                Dropbox.prototype.updateAccountValidity = function (i_value) {
                    this.accountValidity = i_value;
                    if (!i_value)
                        this.files = [];
                    this.cd.markForCheck();
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Dropbox.prototype, "onFileLinkSelected", void 0);
                Dropbox = __decorate([
                    core_1.Component({
                        styles: [Dropbox_css_text_1.default],
                        template: Dropbox_html_text_1.default,
                        selector: 'Dropbox',
                        changeDetection: core_1.ChangeDetectionStrategy.Default,
                        moduleId: __moduleName,
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, LocalStorage_1.LocalStorage, core_1.ChangeDetectorRef])
                ], Dropbox);
                return Dropbox;
            }());
            exports_1("Dropbox", Dropbox);
        }
    }
});
