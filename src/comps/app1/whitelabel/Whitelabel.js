System.register(["@angular/core", "@angular/router", "../../../reseller/ResellerAction", "angular2-redux-util", "@angular/forms", "../../../Lib", "../../imgloader/ImgLoader", "lodash", "bootbox", './Whitelabel.html!text', './Whitelabel.css!text'], function(exports_1, context_1) {
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
    var core_1, router_1, ResellerAction_1, angular2_redux_util_1, forms_1, Lib_1, ImgLoader_1, _, bootbox, Whitelabel_html_text_1, Whitelabel_css_text_1;
    var Whitelabel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ResellerAction_1_1) {
                ResellerAction_1 = ResellerAction_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (ImgLoader_1_1) {
                ImgLoader_1 = ImgLoader_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            },
            function (Whitelabel_html_text_1_1) {
                Whitelabel_html_text_1 = Whitelabel_html_text_1_1;
            },
            function (Whitelabel_css_text_1_1) {
                Whitelabel_css_text_1 = Whitelabel_css_text_1_1;
            }],
        execute: function() {
            Whitelabel = (function () {
                function Whitelabel(appStore, fb, cd, router, zone, resellerAction) {
                    var _this = this;
                    this.appStore = appStore;
                    this.fb = fb;
                    this.cd = cd;
                    this.router = router;
                    this.zone = zone;
                    this.resellerAction = resellerAction;
                    this.formInputs = {};
                    var i_reseller = this.appStore.getState().reseller;
                    this.whitelabelModel = i_reseller.getIn(['whitelabel']);
                    this.unsub = this.appStore.sub(function (whitelabelModel) {
                        _this.whitelabelModel = whitelabelModel;
                        _this.renderFormInputs();
                    }, 'reseller.whitelabel');
                    this.contGroup = fb.group({
                        'whitelabelEnabled': [''],
                        'companyName': [''],
                        'logoTooltip': [''],
                        'logoLink': [''],
                        'linksHome': [''],
                        'linksDownload': [''],
                        'linksContact': [''],
                        'twitterLink': [''],
                        'twitterShow': [''],
                        'chatShow': [''],
                        'chatLink': [''],
                        'mainMenuLink0': [''],
                        'mainMenuLink1': [''],
                        'mainMenuLink2': [''],
                        'mainMenuLink3': [''],
                        'mainMenuLabel4': [''],
                        'bannerEmbedReference': [''],
                        'createAccountOption': ['']
                    });
                    _.forEach(this.contGroup.controls, function (value, key) {
                        _this.formInputs[key] = _this.contGroup.controls[key];
                    });
                    this.renderFormInputs();
                    this.stylesObj = {
                        img: {
                            'color': '#333333',
                            'overflow': 'hidden',
                            'white-space': 'nowrap',
                            'height': '100px',
                            'width': '175px'
                        }
                    };
                }
                Whitelabel.prototype.onInputBlur = function (event) {
                    var _this = this;
                    setTimeout(function () { return _this.appStore.dispatch(_this.resellerAction.saveWhiteLabel(Lib_1.Lib.CleanCharForXml(_this.contGroup.value))); }, 1);
                };
                Whitelabel.prototype.getImageUrl = function (i_type) {
                    if (!this.whitelabelModel)
                        return [];
                    switch (i_type) {
                        case 'logo': {
                            return ['http://galaxy.signage.me/Resources/Resellers/' + this.getBusinessInfo('businessId') + '/Logo.png', 'http://galaxy.signage.me/Resources/Resellers/' + this.getBusinessInfo('businessId') + '/Logo.jpg'];
                        }
                        case 'splash': {
                            return ['http://galaxy.signage.me/Resources/Resellers/' + this.getBusinessInfo('businessId') + '/Update.swf'];
                        }
                    }
                };
                Whitelabel.prototype.getBusinessInfo = function (field) {
                    if (!this.whitelabelModel)
                        return '';
                    return this.appStore.getsKey('reseller', 'whitelabel', field);
                };
                Whitelabel.prototype.uploadLogos = function (i_type) {
                    var self = this;
                    var progressHandlingFunction = function (e) {
                        console.log('progress ' + e);
                    };
                    var httpRequest = new XMLHttpRequest();
                    httpRequest.onload = function (oEvent) {
                        if (httpRequest.status == 200) {
                            if (httpRequest.response == 'true') {
                                bootbox.alert('File uploaded successfully...');
                                self.f.map(function (imgLoader) {
                                    imgLoader.reloadImage();
                                });
                            }
                            else {
                                bootbox.alert('There was a problem uploading your file');
                            }
                        }
                    };
                    var formData = new FormData();
                    var fileName, file, fileExtension;
                    if (i_type == 'logo') {
                        file = document.getElementById("elementFile")['files'][0];
                        fileName = document.getElementById("elementFile")['files'][0]['name'];
                        fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1));
                        if (!(/(jpg|png)$/i).test(fileExtension)) {
                            bootbox.alert('File extension must be .png or .jpg');
                            return;
                        }
                        fileName = "Logo." + fileExtension;
                    }
                    if (i_type == 'splash') {
                        file = document.getElementById("elementFile2")['files'][0];
                        fileName = document.getElementById("elementFile2")['files'][0]['name'];
                        fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1));
                        fileName = "Update.swf";
                    }
                    formData.append("filename", fileName);
                    formData.append("file", file);
                    var user = this.appStore.getState().appdb.get('credentials').get('user');
                    var pass = this.appStore.getState().appdb.get('credentials').get('pass');
                    formData.append("userName", user);
                    formData.append("password", pass);
                    var appdb = this.appStore.getState().appdb;
                    var url = appdb.get('appBaseUrlUser').split('ResellerService')[0];
                    httpRequest.open("POST", url + "/ResourceUpload.ashx");
                    httpRequest.send(formData);
                };
                Whitelabel.prototype.onBranding = function (value) {
                    switch (value) {
                        case 'video': {
                            window.open('http://www.digitalsignage.com/_html/video_tutorials.html?videoNumber=msgetstarted', '_blank');
                            break;
                        }
                        case 'git': {
                            window.open('https://github.com/born2net/msgetstarted', '_blank');
                            break;
                        }
                        case 'solution': {
                            bootbox.alert('At this point you can have your customers open accounts directly on your web site, track them and up-sale them... we make it easy for you to be successful in Digital Signage!');
                            break;
                        }
                    }
                    return false;
                };
                Whitelabel.prototype.renderFormInputs = function () {
                    var _this = this;
                    _.forEach(this.formInputs, function (value, key) {
                        var value = _this.whitelabelModel.getKey(key);
                        value = Lib_1.Lib.BooleanToNumber(value);
                        _this.formInputs[key].setValue(value);
                    });
                };
                ;
                Whitelabel.prototype.isWhitelabelEnabled = function () {
                    return Lib_1.Lib.BooleanToNumber(this.getBusinessInfo('whitelabelEnabled'));
                };
                Whitelabel.prototype.onWhiteLabelChange = function (value) {
                    var _this = this;
                    if (value && this.resellerAction.getResellerIsActive() == false) {
                        value = false;
                        bootbox.alert('Branding will not be set as this account is inactive, be sure to update the billing info to reactivate the account!');
                    }
                    setTimeout(function () {
                        _this.appStore.dispatch(_this.resellerAction.saveWhiteLabel({ whitelabelEnabled: value }));
                        _this.cd.markForCheck();
                    }, 1);
                };
                Whitelabel.prototype.ngOnDestroy = function () {
                    this.unsub();
                };
                __decorate([
                    core_1.ViewChild('fileName'), 
                    __metadata('design:type', core_1.ElementRef)
                ], Whitelabel.prototype, "fileName", void 0);
                __decorate([
                    core_1.ViewChild('imgLoaderLogo'), 
                    __metadata('design:type', ImgLoader_1.ImgLoader)
                ], Whitelabel.prototype, "imgLoaderLogo", void 0);
                __decorate([
                    core_1.ViewChild('imgLoaderSplash'), 
                    __metadata('design:type', ImgLoader_1.ImgLoader)
                ], Whitelabel.prototype, "imgLoaderSplash", void 0);
                __decorate([
                    core_1.ViewChild('#imgLoaderSplash'), 
                    __metadata('design:type', Object)
                ], Whitelabel.prototype, "a", void 0);
                __decorate([
                    core_1.ViewChild(ImgLoader_1.ImgLoader), 
                    __metadata('design:type', Object)
                ], Whitelabel.prototype, "b", void 0);
                __decorate([
                    core_1.ViewChild('ImgLoader'), 
                    __metadata('design:type', Object)
                ], Whitelabel.prototype, "c", void 0);
                __decorate([
                    core_1.ViewChildren('ImgLoader'), 
                    __metadata('design:type', core_1.QueryList)
                ], Whitelabel.prototype, "d", void 0);
                __decorate([
                    core_1.ViewChildren('imgLoader'), 
                    __metadata('design:type', core_1.QueryList)
                ], Whitelabel.prototype, "e", void 0);
                __decorate([
                    core_1.ViewChildren(ImgLoader_1.ImgLoader), 
                    __metadata('design:type', core_1.QueryList)
                ], Whitelabel.prototype, "f", void 0);
                Whitelabel = __decorate([
                    core_1.Component({
                        selector: 'whitelabel',
                        moduleId: __moduleName,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: Whitelabel_html_text_1.default,
                        styles: [Whitelabel_css_text_1.default],
                        host: {
                            '(input-blur)': 'onInputBlur($event)',
                            '[style.display]': "'block'"
                        },
                        animations: [],
                    }), 
                    __metadata('design:paramtypes', [angular2_redux_util_1.AppStore, forms_1.FormBuilder, core_1.ChangeDetectorRef, router_1.Router, core_1.NgZone, ResellerAction_1.ResellerAction])
                ], Whitelabel);
                return Whitelabel;
            }());
            exports_1("Whitelabel", Whitelabel);
        }
    }
});
