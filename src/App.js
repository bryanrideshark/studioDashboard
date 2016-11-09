System.register(["zone.js/dist/zone", "reflect-metadata", "@angular/router", "./App.routes", "@angular/platform-browser-dynamic", "@angular/forms", "@angular/core", "platform", "jspm_packages/github/twbs/bootstrap@3.3.6", "twbs/bootstrap/dist/css/bootstrap.css!", "primeng/resources/themes/omega/theme.css!", "primeng/resources/primeng.min.css!", "./styles/style.css!", "./styles/StyleService", "./services/AppInjService", "./services/LocalStorage", "./services/StoreService", "./business/BusinessAction", "./reseller/ResellerAction", "./comps/app1/orders/OrdersAction", "./comps/app1/orders/OrdersReducer", "./stations/StationsAction", "./pipes/CharCount", "@angular/http", "../src/services/CommBroker", "../src/comps/filemenu/Filemenu", "../src/comps/filemenu/FilemenuItem", "./comps/logo/Logo", "./comps/footer/Footer", "../src/Conts", "angular2-redux-util", "./Lib", "./services/CreditService", "rxjs/add/operator/map", "rxjs/add/operator/debounceTime", "rxjs/add/observable/fromEvent", "rxjs/add/observable/forkJoin", "rxjs/add/operator/distinctUntilChanged", "rxjs/add/operator/catch", "rxjs/add/operator/finally", "rxjs/add/observable/throw", "rxjs/add/operator/switchMap", "rxjs/add/operator/retry", "rxjs/add/operator/mergeMap", "rxjs/add/operator/merge", "rxjs/add/operator/do", "./appdb/NotifyReducer", "./appdb/AppdbReducer", "./business/BusinessReducer", "./reseller/ResellerReducer", "./adnet/AdnetReducer", "./stations/StationsReducer", "./appdb/AppdbAction", "./comps/logo/LogoCompany", "rxjs/Rx", "angular2-google-maps/core/core.umd.js", "./adnet/AdnetActions", "./services/AuthService", "@angular/platform-browser", "./comps/simplelist/Simplelist", "./comps/app1/orders/Orders", "./comps/app1/users/UsersDetails", "./comps/entry/LoginPanel", "./comps/sidemenu/Menu", "./comps/sidemenu/MenuItem", "./comps/app1/whitelabel/Whitelabel", "./comps/app1/apps/Apps", "./comps/app1/privileges/Privileges", "./comps/app1/dashboard/Dashboard", "./comps/logout/Logout", "./comps/tabs/tabs", "./comps/tabs/tab", "./comps/app1/account/Account", "./comps/blurforwarder/BlurForwarder", "./comps/loading/Loading", "./comps/inputedit/InputEdit", "./comps/app1/users/Users", "./comps/app1/adnet/Adnet", "./comps/app1/App1", "./comps/app1/adnet/rates/RatesTable/RatesTable", "./comps/app1/adnet/config/AdnetConfigCustomer", "./comps/app1/adnet/config/AdnetConfig", "./comps/app1/adnet/targets/AdnetConfigTargets", "./comps/app1/adnet/rates/AdnetConfigRates", "./comps/ng2-bs3-modal/ng2-bs3-modal", "./comps/infobox/Infobox", "./comps/app1/dashboard/StationsGrid", "./comps/app1/dashboard/StationsMap", "./comps/app1/dashboard/ServerAvg", "./comps/app1/dashboard/ServerStats", "./comps/app1/dashboard/StationDetails", "./comps/ng2-highcharts/src/directives/ng2-highcharts", "./comps/app1/dashboard/StationSnapshot", "./comps/app1/orders/OrderDetails", "./comps/app1/privileges/PrivilegesDetails", "./comps/app1/users/UserStorage", "./comps/app1/users/ChangePass", "./comps/modaldialog/ModalDialog", "./comps/app1/users/UserInfo", "./comps/app1/users/AddUser", "./comps/app1/users/SampleList", "./comps/imgloader/ImgLoader", "./comps/ng2-highcharts/src/directives/ng2-highmaps", "./comps/ng2-highcharts/src/directives/ng2-highstocks", "./comps/simplelist/SimplelistEditable", "./pipes/OrderBy", "./pipes/SortBy", "./pipes/FilterPipe", "./comps/app1/adnet/targets/AdnetConfigTargetStations", "./comps/app1/adnet/targets/AdnetConfigTargetProps", "./comps/app1/adnet/targets/AdnetLocation", "./comps/mapaddress/MapAddress", "./comps/app1/adnet/network/AdnetNetwork", "./comps/app1/adnet/network/AdnetNetworkPackageEditor", "./comps/app1/adnet/network/AdnetNetworkCustomerSelector", "./comps/app1/adnet/network/AdnetNetworkPackageViewer", "./comps/app1/adnet/network/AdnetNetworkPackageTarget", "./comps/app1/adnet/network/AdnetNetworkPackageProps", "./comps/app1/adnet/network/AdnetNetworkPackageContent", "./comps/app1/adnet/network/AdnetNetworkPackageContentProps", "./comps/app1/adnet/network/AdnetNetworkTarget", "./comps/app1/adnet/network/AdnetNetworkTargetProps", 'ng2-bootstrap/ng2-bootstrap', "./comps/resourceviewer/ResourceViewer", './App.html!text', "./comps/app1/adnet/network/AdnetNetworkPackageViewProps", "./comps/app1/adnet/network/AdnetNetworkPairProps", "./comps/simplegridmodule/SimpleGridModule", "./comps/app1/adnet/targets/AdnetResolver", "./comps/app1/adnet/AdnetLoader", "./comps/inputnumeric/InputNumeric", "./comps/inputstring/InputString", 'primeng/primeng', "./comps/dropbox/Dropbox", "./comps/twofactor/Twofactor"], function(exports_1, context_1) {
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
    var router_1, App_routes_1, platform_browser_dynamic_1, forms_1, core_1, platform, StyleService_1, AppInjService_1, LocalStorage_1, StoreService_1, BusinessAction_1, ResellerAction_1, OrdersAction_1, OrdersReducer_1, StationsAction_1, CharCount_1, http_1, CommBroker_1, Filemenu_1, FilemenuItem_1, Logo_1, Footer_1, Conts_1, angular2_redux_util_1, Lib_1, CreditService_1, NotifyReducer_1, AppdbReducer_1, BusinessReducer_1, ResellerReducer_1, AdnetReducer_1, StationsReducer_1, AppdbAction_1, LogoCompany_1, Rx_1, core_umd_js_1, AdnetActions_1, AuthService_1, platform_browser_1, Simplelist_1, Orders_1, UsersDetails_1, LoginPanel_1, Menu_1, MenuItem_1, Whitelabel_1, Apps_1, Privileges_1, Dashboard_1, Logout_1, tabs_1, tab_1, Account_1, BlurForwarder_1, Loading_1, InputEdit_1, Users_1, Adnet_1, App1_1, RatesTable_1, AdnetConfigCustomer_1, AdnetConfig_1, AdnetConfigTargets_1, AdnetConfigRates_1, ng2_bs3_modal_1, Infobox_1, StationsGrid_1, StationsMap_1, ServerAvg_1, ServerStats_1, StationDetails_1, ng2_highcharts_1, StationSnapshot_1, OrderDetails_1, PrivilegesDetails_1, UserStorage_1, ChangePass_1, ModalDialog_1, UserInfo_1, AddUser_1, SampleList_1, ImgLoader_1, ng2_highmaps_1, ng2_highstocks_1, SimplelistEditable_1, OrderBy_1, SortBy_1, FilterPipe_1, AdnetConfigTargetStations_1, AdnetConfigTargetProps_1, AdnetLocation_1, MapAddress_1, AdnetNetwork_1, AdnetNetworkPackageEditor_1, AdnetNetworkCustomerSelector_1, AdnetNetworkPackageViewer_1, AdnetNetworkPackageTarget_1, AdnetNetworkPackageProps_1, AdnetNetworkPackageContent_1, AdnetNetworkPackageContentProps_1, AdnetNetworkTarget_1, AdnetNetworkTargetProps_1, ng2_bootstrap_1, ng2_bootstrap_2, ResourceViewer_1, App_html_text_1, AdnetNetworkPackageViewProps_1, AdnetNetworkPairProps_1, SimpleGridModule_1, AdnetResolver_1, AdnetLoader_1, InputNumeric_1, InputString_1, primeng_1, Dropbox_1, primeng_2, Twofactor_1;
    var ServerMode, Main, googleKey, providing, decelerations, App;
    return {
        setters:[
            function (_1) {},
            function (_2) {},
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (App_routes_1_1) {
                App_routes_1 = App_routes_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_1) {
                platform = platform_1;
            },
            function (_3) {},
            function (_4) {},
            function (_5) {},
            function (_6) {},
            function (_7) {},
            function (StyleService_1_1) {
                StyleService_1 = StyleService_1_1;
            },
            function (AppInjService_1_1) {
                AppInjService_1 = AppInjService_1_1;
            },
            function (LocalStorage_1_1) {
                LocalStorage_1 = LocalStorage_1_1;
            },
            function (StoreService_1_1) {
                StoreService_1 = StoreService_1_1;
            },
            function (BusinessAction_1_1) {
                BusinessAction_1 = BusinessAction_1_1;
            },
            function (ResellerAction_1_1) {
                ResellerAction_1 = ResellerAction_1_1;
            },
            function (OrdersAction_1_1) {
                OrdersAction_1 = OrdersAction_1_1;
            },
            function (OrdersReducer_1_1) {
                OrdersReducer_1 = OrdersReducer_1_1;
            },
            function (StationsAction_1_1) {
                StationsAction_1 = StationsAction_1_1;
            },
            function (CharCount_1_1) {
                CharCount_1 = CharCount_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (CommBroker_1_1) {
                CommBroker_1 = CommBroker_1_1;
            },
            function (Filemenu_1_1) {
                Filemenu_1 = Filemenu_1_1;
            },
            function (FilemenuItem_1_1) {
                FilemenuItem_1 = FilemenuItem_1_1;
            },
            function (Logo_1_1) {
                Logo_1 = Logo_1_1;
            },
            function (Footer_1_1) {
                Footer_1 = Footer_1_1;
            },
            function (Conts_1_1) {
                Conts_1 = Conts_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (Lib_1_1) {
                Lib_1 = Lib_1_1;
            },
            function (CreditService_1_1) {
                CreditService_1 = CreditService_1_1;
            },
            function (_8) {},
            function (_9) {},
            function (_10) {},
            function (_11) {},
            function (_12) {},
            function (_13) {},
            function (_14) {},
            function (_15) {},
            function (_16) {},
            function (_17) {},
            function (_18) {},
            function (_19) {},
            function (_20) {},
            function (NotifyReducer_1_1) {
                NotifyReducer_1 = NotifyReducer_1_1;
            },
            function (AppdbReducer_1_1) {
                AppdbReducer_1 = AppdbReducer_1_1;
            },
            function (BusinessReducer_1_1) {
                BusinessReducer_1 = BusinessReducer_1_1;
            },
            function (ResellerReducer_1_1) {
                ResellerReducer_1 = ResellerReducer_1_1;
            },
            function (AdnetReducer_1_1) {
                AdnetReducer_1 = AdnetReducer_1_1;
            },
            function (StationsReducer_1_1) {
                StationsReducer_1 = StationsReducer_1_1;
            },
            function (AppdbAction_1_1) {
                AppdbAction_1 = AppdbAction_1_1;
            },
            function (LogoCompany_1_1) {
                LogoCompany_1 = LogoCompany_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (core_umd_js_1_1) {
                core_umd_js_1 = core_umd_js_1_1;
            },
            function (AdnetActions_1_1) {
                AdnetActions_1 = AdnetActions_1_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (Simplelist_1_1) {
                Simplelist_1 = Simplelist_1_1;
            },
            function (Orders_1_1) {
                Orders_1 = Orders_1_1;
            },
            function (UsersDetails_1_1) {
                UsersDetails_1 = UsersDetails_1_1;
            },
            function (LoginPanel_1_1) {
                LoginPanel_1 = LoginPanel_1_1;
            },
            function (Menu_1_1) {
                Menu_1 = Menu_1_1;
            },
            function (MenuItem_1_1) {
                MenuItem_1 = MenuItem_1_1;
            },
            function (Whitelabel_1_1) {
                Whitelabel_1 = Whitelabel_1_1;
            },
            function (Apps_1_1) {
                Apps_1 = Apps_1_1;
            },
            function (Privileges_1_1) {
                Privileges_1 = Privileges_1_1;
            },
            function (Dashboard_1_1) {
                Dashboard_1 = Dashboard_1_1;
            },
            function (Logout_1_1) {
                Logout_1 = Logout_1_1;
            },
            function (tabs_1_1) {
                tabs_1 = tabs_1_1;
            },
            function (tab_1_1) {
                tab_1 = tab_1_1;
            },
            function (Account_1_1) {
                Account_1 = Account_1_1;
            },
            function (BlurForwarder_1_1) {
                BlurForwarder_1 = BlurForwarder_1_1;
            },
            function (Loading_1_1) {
                Loading_1 = Loading_1_1;
            },
            function (InputEdit_1_1) {
                InputEdit_1 = InputEdit_1_1;
            },
            function (Users_1_1) {
                Users_1 = Users_1_1;
            },
            function (Adnet_1_1) {
                Adnet_1 = Adnet_1_1;
            },
            function (App1_1_1) {
                App1_1 = App1_1_1;
            },
            function (RatesTable_1_1) {
                RatesTable_1 = RatesTable_1_1;
            },
            function (AdnetConfigCustomer_1_1) {
                AdnetConfigCustomer_1 = AdnetConfigCustomer_1_1;
            },
            function (AdnetConfig_1_1) {
                AdnetConfig_1 = AdnetConfig_1_1;
            },
            function (AdnetConfigTargets_1_1) {
                AdnetConfigTargets_1 = AdnetConfigTargets_1_1;
            },
            function (AdnetConfigRates_1_1) {
                AdnetConfigRates_1 = AdnetConfigRates_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (Infobox_1_1) {
                Infobox_1 = Infobox_1_1;
            },
            function (StationsGrid_1_1) {
                StationsGrid_1 = StationsGrid_1_1;
            },
            function (StationsMap_1_1) {
                StationsMap_1 = StationsMap_1_1;
            },
            function (ServerAvg_1_1) {
                ServerAvg_1 = ServerAvg_1_1;
            },
            function (ServerStats_1_1) {
                ServerStats_1 = ServerStats_1_1;
            },
            function (StationDetails_1_1) {
                StationDetails_1 = StationDetails_1_1;
            },
            function (ng2_highcharts_1_1) {
                ng2_highcharts_1 = ng2_highcharts_1_1;
            },
            function (StationSnapshot_1_1) {
                StationSnapshot_1 = StationSnapshot_1_1;
            },
            function (OrderDetails_1_1) {
                OrderDetails_1 = OrderDetails_1_1;
            },
            function (PrivilegesDetails_1_1) {
                PrivilegesDetails_1 = PrivilegesDetails_1_1;
            },
            function (UserStorage_1_1) {
                UserStorage_1 = UserStorage_1_1;
            },
            function (ChangePass_1_1) {
                ChangePass_1 = ChangePass_1_1;
            },
            function (ModalDialog_1_1) {
                ModalDialog_1 = ModalDialog_1_1;
            },
            function (UserInfo_1_1) {
                UserInfo_1 = UserInfo_1_1;
            },
            function (AddUser_1_1) {
                AddUser_1 = AddUser_1_1;
            },
            function (SampleList_1_1) {
                SampleList_1 = SampleList_1_1;
            },
            function (ImgLoader_1_1) {
                ImgLoader_1 = ImgLoader_1_1;
            },
            function (ng2_highmaps_1_1) {
                ng2_highmaps_1 = ng2_highmaps_1_1;
            },
            function (ng2_highstocks_1_1) {
                ng2_highstocks_1 = ng2_highstocks_1_1;
            },
            function (SimplelistEditable_1_1) {
                SimplelistEditable_1 = SimplelistEditable_1_1;
            },
            function (OrderBy_1_1) {
                OrderBy_1 = OrderBy_1_1;
            },
            function (SortBy_1_1) {
                SortBy_1 = SortBy_1_1;
            },
            function (FilterPipe_1_1) {
                FilterPipe_1 = FilterPipe_1_1;
            },
            function (AdnetConfigTargetStations_1_1) {
                AdnetConfigTargetStations_1 = AdnetConfigTargetStations_1_1;
            },
            function (AdnetConfigTargetProps_1_1) {
                AdnetConfigTargetProps_1 = AdnetConfigTargetProps_1_1;
            },
            function (AdnetLocation_1_1) {
                AdnetLocation_1 = AdnetLocation_1_1;
            },
            function (MapAddress_1_1) {
                MapAddress_1 = MapAddress_1_1;
            },
            function (AdnetNetwork_1_1) {
                AdnetNetwork_1 = AdnetNetwork_1_1;
            },
            function (AdnetNetworkPackageEditor_1_1) {
                AdnetNetworkPackageEditor_1 = AdnetNetworkPackageEditor_1_1;
            },
            function (AdnetNetworkCustomerSelector_1_1) {
                AdnetNetworkCustomerSelector_1 = AdnetNetworkCustomerSelector_1_1;
            },
            function (AdnetNetworkPackageViewer_1_1) {
                AdnetNetworkPackageViewer_1 = AdnetNetworkPackageViewer_1_1;
            },
            function (AdnetNetworkPackageTarget_1_1) {
                AdnetNetworkPackageTarget_1 = AdnetNetworkPackageTarget_1_1;
            },
            function (AdnetNetworkPackageProps_1_1) {
                AdnetNetworkPackageProps_1 = AdnetNetworkPackageProps_1_1;
            },
            function (AdnetNetworkPackageContent_1_1) {
                AdnetNetworkPackageContent_1 = AdnetNetworkPackageContent_1_1;
            },
            function (AdnetNetworkPackageContentProps_1_1) {
                AdnetNetworkPackageContentProps_1 = AdnetNetworkPackageContentProps_1_1;
            },
            function (AdnetNetworkTarget_1_1) {
                AdnetNetworkTarget_1 = AdnetNetworkTarget_1_1;
            },
            function (AdnetNetworkTargetProps_1_1) {
                AdnetNetworkTargetProps_1 = AdnetNetworkTargetProps_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
                ng2_bootstrap_2 = ng2_bootstrap_1_1;
            },
            function (ResourceViewer_1_1) {
                ResourceViewer_1 = ResourceViewer_1_1;
            },
            function (App_html_text_1_1) {
                App_html_text_1 = App_html_text_1_1;
            },
            function (AdnetNetworkPackageViewProps_1_1) {
                AdnetNetworkPackageViewProps_1 = AdnetNetworkPackageViewProps_1_1;
            },
            function (AdnetNetworkPairProps_1_1) {
                AdnetNetworkPairProps_1 = AdnetNetworkPairProps_1_1;
            },
            function (SimpleGridModule_1_1) {
                SimpleGridModule_1 = SimpleGridModule_1_1;
            },
            function (AdnetResolver_1_1) {
                AdnetResolver_1 = AdnetResolver_1_1;
            },
            function (AdnetLoader_1_1) {
                AdnetLoader_1 = AdnetLoader_1_1;
            },
            function (InputNumeric_1_1) {
                InputNumeric_1 = InputNumeric_1_1;
            },
            function (InputString_1_1) {
                InputString_1 = InputString_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
                primeng_2 = primeng_1_1;
            },
            function (Dropbox_1_1) {
                Dropbox_1 = Dropbox_1_1;
            },
            function (Twofactor_1_1) {
                Twofactor_1 = Twofactor_1_1;
            }],
        execute: function() {
            (function (ServerMode) {
                ServerMode[ServerMode["CLOUD"] = 0] = "CLOUD";
                ServerMode[ServerMode["PRIVATE"] = 1] = "PRIVATE";
                ServerMode[ServerMode["HYBRID"] = 2] = "HYBRID";
            })(ServerMode || (ServerMode = {}));
            exports_1("ServerMode", ServerMode);
            Main = (function () {
                function Main(localStorage, router, appStore, commBroker, styleService, appdbAction) {
                    var _this = this;
                    this.localStorage = localStorage;
                    this.router = router;
                    this.appStore = appStore;
                    this.commBroker = commBroker;
                    this.appdbAction = appdbAction;
                    this.version = '3.18';
                    this.checkPlatform();
                    this.commBroker.setValue(Conts_1.Consts.Values().SERVER_MODE, ServerMode.CLOUD);
                    this.m_styleService = styleService;
                    this.commBroker.setService(Conts_1.Consts.Services().App, this);
                    Rx_1.Observable.fromEvent(window, 'resize').debounceTime(250).subscribe(function () {
                        _this.appResized();
                    });
                    if (!Lib_1.Lib.DevMode()) {
                        setTimeout(function () {
                            router.navigate(['/App1/Dashboard']);
                        }, 1000);
                    }
                }
                Main.prototype.checkPlatform = function () {
                    switch (platform.name.toLowerCase()) {
                        case 'microsoft edge': {
                            alert(platform.name + " browser not supported at this time, please use Google Chrome");
                            break;
                        }
                        case 'chrome': {
                            break;
                        }
                        default: {
                            alert('for best performance please use Google Chrome');
                            break;
                        }
                    }
                };
                Main.prototype.appResized = function () {
                    var appHeight = document.body.clientHeight;
                    var appWidth = document.body.clientWidth;
                    this.commBroker.setValue(Conts_1.Consts.Values().APP_SIZE, { height: appHeight, width: appWidth });
                    this.commBroker.fire({
                        fromInstance: self,
                        event: Conts_1.Consts.Events().WIN_SIZED,
                        context: '',
                        message: { height: appHeight, width: appWidth }
                    });
                };
                Main = __decorate([
                    core_1.Component({
                        selector: 'app',
                        encapsulation: core_1.ViewEncapsulation.Emulated,
                        providers: [StyleService_1.StyleService, AppdbAction_1.AppdbAction],
                        template: App_html_text_1.default
                    }), 
                    __metadata('design:paramtypes', [LocalStorage_1.LocalStorage, router_1.Router, angular2_redux_util_1.AppStore, CommBroker_1.CommBroker, StyleService_1.StyleService, AppdbAction_1.AppdbAction])
                ], Main);
                return Main;
            }());
            exports_1("Main", Main);
            if (!Lib_1.Lib.DevMode())
                core_1.enableProdMode();
            googleKey = function () {
                var config = new core_umd_js_1.LazyMapsAPILoaderConfig();
                config.apiKey = 'AIzaSyAGD7EQugVG8Gq8X3vpyvkZCnW4E4HONLI';
                config.libraries = ['places'];
                return config;
            };
            providing = [CommBroker_1.CommBroker, AuthService_1.AUTH_PROVIDERS,
                { provide: core_umd_js_1.LazyMapsAPILoaderConfig, useFactory: function () { return googleKey(); } },
                { provide: angular2_redux_util_1.AppStore, useFactory: Lib_1.Lib.StoreFactory({ notify: NotifyReducer_1.default, appdb: AppdbReducer_1.default, business: BusinessReducer_1.business, stations: StationsReducer_1.stations, reseller: ResellerReducer_1.reseller, adnet: AdnetReducer_1.adnet, orders: OrdersReducer_1.orders }) },
                { provide: StoreService_1.StoreService, useClass: StoreService_1.StoreService },
                { provide: BusinessAction_1.BusinessAction, useClass: BusinessAction_1.BusinessAction },
                { provide: ResellerAction_1.ResellerAction, useClass: ResellerAction_1.ResellerAction },
                { provide: AdnetActions_1.AdnetActions, useClass: AdnetActions_1.AdnetActions },
                { provide: OrdersAction_1.OrdersAction, useClass: OrdersAction_1.OrdersAction },
                { provide: StationsAction_1.StationsAction, useClass: StationsAction_1.StationsAction },
                { provide: AppdbAction_1.AppdbAction, useClass: AppdbAction_1.AppdbAction },
                { provide: AdnetResolver_1.AdnetResolver, useClass: AdnetResolver_1.AdnetResolver },
                { provide: CreditService_1.CreditService, useClass: CreditService_1.CreditService },
                { provide: LocalStorage_1.LocalStorage, useClass: LocalStorage_1.LocalStorage },
                { provide: CommBroker_1.CommBroker, useClass: CommBroker_1.CommBroker },
                { provide: Conts_1.Consts, useClass: Conts_1.Consts },
                { provide: "DEV_ENV", useValue: Lib_1.Lib.DevMode() },
                { provide: "OFFLINE_ENV", useValue: false },
                { provide: CharCount_1.CharCount }];
            decelerations = [Main, RatesTable_1.RatesTable, UsersDetails_1.UsersDetails, LoginPanel_1.LoginPanel, Menu_1.Menu, MenuItem_1.MenuItem, Account_1.Account, Whitelabel_1.Whitelabel, Apps_1.Apps, App1_1.App1, Users_1.Users, Adnet_1.Adnet, Privileges_1.Privileges, Dashboard_1.Dashboard, Logout_1.Logout, Orders_1.Orders, Filemenu_1.Filemenu, FilemenuItem_1.FilemenuItem, Logo_1.Logo, LogoCompany_1.LogoCompany, Footer_1.Footer, BlurForwarder_1.BlurForwarder, InputEdit_1.InputEdit, OrderBy_1.OrderBy, SortBy_1.SortBy, FilterPipe_1.FilterPipe, AdnetConfigTargets_1.AdnetConfigTargets, AdnetConfigRates_1.AdnetConfigRates, tabs_1.Tabs, tab_1.Tab, ServerStats_1.ServerStats, ServerAvg_1.ServerAvg, StationsMap_1.StationsMap, StationsGrid_1.StationsGrid, StationDetails_1.StationDetails, ImgLoader_1.ImgLoader, ng2_highcharts_1.Ng2Highcharts, AdnetConfigCustomer_1.AdnetConfigCustomer, AdnetConfig_1.AdnetConfig, StationSnapshot_1.StationSnapshot, OrderDetails_1.OrderDetails, Simplelist_1.SimpleList, PrivilegesDetails_1.PrivilegesDetails, ModalDialog_1.ModalDialog, Infobox_1.Infobox, UserStorage_1.UserStorage, Loading_1.Loading, SampleList_1.Samplelist, UserInfo_1.UserInfo, AddUser_1.AddUser, ChangePass_1.ChangePass, ng2_bs3_modal_1.MODAL_DIRECTIVES, ng2_highstocks_1.Ng2Highstocks, ng2_highmaps_1.Ng2Highmaps, SimplelistEditable_1.SimplelistEditable, AdnetConfigTargetStations_1.AdnetConfigTargetStations, AdnetConfigTargetProps_1.AdnetConfigTargetProps, AdnetLocation_1.AdnetLocation, MapAddress_1.MapAddress, AdnetNetwork_1.AdnetNetwork, AdnetNetworkCustomerSelector_1.AdnetNetworkCustomerSelector, AdnetNetworkPackageEditor_1.AdnetNetworkPackageEditor, AdnetNetworkPackageViewer_1.AdnetNetworkPackageViewer, AdnetNetworkPackageTarget_1.AdnetNetworkPackageTarget, AdnetNetworkPackageProps_1.AdnetNetworkPackageProps, AdnetNetworkPackageContent_1.AdnetNetworkPackageContent, AdnetNetworkPackageContentProps_1.AdnetNetworkPackageContentProps, AdnetNetworkTarget_1.AdnetNetworkTarget, AdnetNetworkTargetProps_1.AdnetNetworkTargetProps, ResourceViewer_1.ResourceViewer, AdnetNetworkPackageViewProps_1.AdnetNetworkPackageViewProps, AdnetNetworkPairProps_1.AdnetNetworkPairProps, AdnetLoader_1.AdnetLoader, InputNumeric_1.InputNumeric, InputString_1.InputString, Dropbox_1.Dropbox, Twofactor_1.Twofactor];
            App = (function () {
                function App() {
                }
                App = __decorate([
                    core_1.NgModule({
                        imports: [platform_browser_1.BrowserModule, SimpleGridModule_1.SimpleGridModule.forRoot(), core_umd_js_1.AgmCoreModule.forRoot(), http_1.JsonpModule, http_1.HttpModule, forms_1.ReactiveFormsModule, forms_1.FormsModule, ng2_bootstrap_1.DropdownModule, ng2_bootstrap_2.AccordionModule, App_routes_1.routing, primeng_2.TreeModule, primeng_1.InputTextModule],
                        providers: [providing],
                        declarations: decelerations,
                        bootstrap: [Main],
                    }), 
                    __metadata('design:paramtypes', [])
                ], App);
                return App;
            }());
            exports_1("App", App);
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(App, providing).then(function (appRef) {
                AppInjService_1.appInjService(appRef.injector);
            });
            window['hr'] && window['hr'].on('change', function (fileName) {
                if (fileName.indexOf('html') !== -1) {
                    var newBody = document.createElement('body');
                    newBody.appendChild(document.createElement('app'));
                    document.body = newBody;
                    platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(App, providing).then(function (appRef) {
                        AppInjService_1.appInjService(appRef.injector);
                    });
                }
            });
        }
    }
});
