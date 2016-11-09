System.register(["../models/StoreModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1;
    var List, AppModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            AppModel = (function (_super) {
                __extends(AppModel, _super);
                function AppModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                AppModel.prototype.getIcon = function (item) {
                    var id = String(item.getAppId());
                    switch (id) {
                        case '10005':
                            return 'fa-cubes';
                        case '10010':
                            return 'fa-edit';
                        case '10020':
                            return 'fa-paper-plane-o';
                        case '10030':
                            return 'fa-terminal';
                        case '10040':
                            return 'fa-html5';
                        case '10050':
                            return 'fa-rss';
                        case '10060':
                            return 'fa-th-list';
                        case '10070':
                            return 'fa-video-camera';
                        case '10080':
                            return 'fa-sun-o';
                        case '10090':
                            return 'fa-bar-chart';
                        case '10100':
                            return 'fa-database';
                        case '10110':
                            return 'fa-camera';
                        case '10120':
                            return 'fa-clock-o';
                        case '10122':
                            return 'fa-dashboard';
                        case '10130':
                            return 'fa-area-chart';
                        case '10140':
                            return 'fa-puzzle-piece';
                        case '10145':
                            return 'fa-globe';
                        case '10150':
                            return 'fa-tag';
                        case '10160':
                            return 'fa-qrcode';
                        case '10180':
                            return 'fa-align-justify ';
                        case '10185':
                            return 'fa-map-pin';
                        case '10190':
                            return 'fa-code';
                        case '10195':
                            return 'fa-plug';
                        case '10210':
                            return 'fa-twitter';
                        case '10220':
                            return 'fa-youtube';
                        case '10300':
                            return 'fa-check-square-o';
                        case '10400':
                            return 'fa-comment';
                        case '10500':
                            return 'fa-align-center';
                        case '11000':
                            return 'fa-firefox';
                        case '12000':
                            return 'fa-digg';
                        case '12010':
                            return 'fa-cloud';
                        case '12020':
                            return 'fa-facebook-official ';
                        case '12030':
                            return 'fa-calendar';
                        case '12032':
                            return 'fa-table';
                        case '12040':
                            return 'fa-google-plus-square';
                        case '12050':
                            return 'fa-eye';
                        case '12060':
                            return 'fa-instagram';
                        case '12070':
                            return 'fa-google-plus';
                        case '12080':
                            return 'fa-500px';
                        case '12090':
                            return 'fa-pinterest';
                        case '12100':
                            return 'fa-male';
                        case '12200':
                            return 'fa-tumblr-square';
                        case '12210':
                            return 'fa-dropbox';
                        case '12220':
                            return 'fa-flickr';
                        case '12230':
                            return 'fa-twitter';
                        case '12240':
                            return 'fa-yelp';
                        case '12250':
                            return 'fa-comments';
                        case '12260':
                            return 'fa-clone';
                        default: {
                            return 'fa-circle';
                        }
                    }
                };
                AppModel.prototype.getAppId = function () {
                    return this.getKey('appId');
                };
                AppModel.prototype.getName = function () {
                    return this.getKey('appName');
                };
                AppModel.prototype.getInstalled = function () {
                    return this.getKey('installed');
                };
                return AppModel;
            }(StoreModel_1.StoreModel));
            exports_1("AppModel", AppModel);
        }
    }
});
