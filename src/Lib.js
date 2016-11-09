System.register(["@angular/core", "redux", "angular2-redux-util", "immutable", "lodash", "xml2js", "moment", 'bootbox'], function(exports_1, context_1) {
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
    var core_1, redux_1, angular2_redux_util_1, Immutable, immutable_1, _, xml2js, moment_, bootbox;
    var moment, Lib;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (redux_1_1) {
                redux_1 = redux_1_1;
            },
            function (angular2_redux_util_1_1) {
                angular2_redux_util_1 = angular2_redux_util_1_1;
            },
            function (Immutable_1) {
                Immutable = Immutable_1;
                immutable_1 = Immutable_1;
            },
            function (_1) {
                _ = _1;
            },
            function (xml2js_1) {
                xml2js = xml2js_1;
            },
            function (moment_1) {
                moment_ = moment_1;
            },
            function (bootbox_1) {
                bootbox = bootbox_1;
            }],
        execute: function() {
            exports_1("moment", moment = moment_["default"]);
            Lib = (function () {
                function Lib() {
                }
                Lib.StoreFactory = function (reducerList) {
                    return function () {
                        var reducers = redux_1.combineReducers(reducerList);
                        var middlewareEnhancer = redux_1.applyMiddleware(thunkMiddleware);
                        var isDebug = window.devToolsExtension;
                        var applyDevTools = function () { return isDebug ? window.devToolsExtension() : function (f) { return f; }; };
                        var enhancers = redux_1.compose(middlewareEnhancer, applyDevTools());
                        var createStoreWithEnhancers = enhancers(redux_1.createStore);
                        var reduxAppStore = createStoreWithEnhancers(reducers);
                        return new angular2_redux_util_1.AppStore(reduxAppStore);
                    };
                };
                Lib.ProcessDateField = function (dateString, addDay) {
                    if (addDay === void 0) { addDay = false; }
                    if (_.isUndefined(dateString))
                        return '';
                    var epoc = dateString.match(/Date\((.*)\)/);
                    if (epoc[1]) {
                        var date = epoc[1].split('+')[0];
                        var time = epoc[1].split('+')[1];
                        var result;
                        if (addDay) {
                            result = moment(Number(date)).add(1, 'day');
                        }
                        else {
                            result = moment(Number(date));
                        }
                        return moment(result).format('YYYY-MM-DD');
                    }
                };
                Lib.ProcessDateFieldToUnix = function (dateString, addDay) {
                    if (addDay === void 0) { addDay = false; }
                    if (_.isUndefined(dateString))
                        return '';
                    if (addDay) {
                        return moment(dateString, 'YYYY-MM-DD').add(1, 'day').valueOf();
                    }
                    else {
                        return moment(dateString, 'YYYY-MM-DD').valueOf();
                    }
                };
                Lib.ProcessHourStartEnd = function (value, key) {
                    if (_.isUndefined(!value))
                        return '';
                    if (key == 'hourStart')
                        return value + ":00";
                    return value + ":59";
                };
                Lib.BooleanToNumber = function (value) {
                    if (_.isUndefined(value) || _.isNull(value))
                        return 0;
                    if (value === "0" || value === 'false' || value === "False" || value === false)
                        return 0;
                    if (value === 1 || value === "true" || value === "True" || value === true)
                        return 1;
                    return value;
                };
                Lib.GetCompSelector = function (i_constructor) {
                    if (!Lib.DevMode())
                        return;
                    var annotations = Reflect.getMetadata('annotations', i_constructor);
                    var componentMetadata = annotations.find(function (annotation) {
                        return (annotation instanceof core_1.Component);
                    });
                    return componentMetadata.selector;
                };
                Lib.FileTailName = function (fileName, level) {
                    var arr = fileName.split('/');
                    var size = arr.length;
                    var c = arr.slice(0 - level, size);
                    return c.join('/');
                };
                Lib.BootboxHide = function (i_time) {
                    if (i_time === void 0) { i_time = 1500; }
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, i_time);
                };
                Lib.Exists = function (i_value) {
                    if (_.isNaN(i_value))
                        return false;
                    if (_.isUndefined(i_value))
                        return false;
                    if (_.isNull(i_value))
                        return false;
                    if (_.isEmpty(i_value))
                        return false;
                    return true;
                };
                Lib.IsRound = function (number) {
                    return (Math.floor(number) == number);
                };
                Lib.CleanCharForXml = function (value) {
                    var clean = function (value) {
                        if (_.isUndefined(value))
                            return '';
                        if (_.isNull(value))
                            return '';
                        if (_.isNumber(value))
                            return value;
                        if (_.isBoolean(value))
                            return value;
                        value = value.replace(/\}/g, ' ');
                        value = value.replace(/%/g, ' ');
                        value = value.replace(/{/g, ' ');
                        value = value.replace(/"/g, '`');
                        value = value.replace(/'/g, '`');
                        value = value.replace(/&/g, 'and');
                        value = value.replace(/>/g, ' ');
                        value = value.replace(/</g, ' ');
                        value = value.replace(/\[/g, ' ');
                        value = value.replace(/]/g, ' ');
                        value = value.replace(/#/g, ' ');
                        value = value.replace(/\$/g, ' ');
                        value = value.replace(/\^/g, ' ');
                        value = value.replace(/;/g, ' ');
                        return value;
                    };
                    if (_.isUndefined(value))
                        return '';
                    if (_.isNull(value))
                        return '';
                    if (_.isNumber(value))
                        return value;
                    if (_.isBoolean(value))
                        return value;
                    if (_.isString(value))
                        return clean(value);
                    _.forEach(value, function (v, k) {
                        if (_.isArray(value[k]))
                            return value[k] = v;
                        value[k] = clean(v);
                    });
                    return value;
                };
                Lib.MapOfIndex = function (map, index, position) {
                    var mapJs = map.toJS();
                    var mapJsPairs = _.toPairs(mapJs);
                    var offset = position == 'first' ? 0 : 1;
                    if (mapJsPairs[index] == undefined)
                        return "0";
                    return mapJsPairs[index][offset];
                };
                Lib.PrivilegesXmlTemplate = function (defaultValues, selPrivId, appStore, callBack) {
                    if (appStore === void 0) { appStore = null; }
                    var parseString = xml2js.parseString;
                    var getAttributeGroup = function (tableName, attribute) {
                        if (_.isNull(appStore) || defaultValues)
                            return 1;
                        var result = 0;
                        var reseller = appStore.getState().reseller;
                        var privileges = reseller.getIn(['privileges']);
                        privileges.forEach(function (i_privelegesModel, counter) {
                            if (i_privelegesModel.getPrivelegesId() == selPrivId) {
                                i_privelegesModel.getColumns().forEach(function (group, c) {
                                    if (group.get('tableName') == tableName)
                                        return result = group.get(attribute);
                                });
                            }
                        });
                        return result;
                    };
                    var getPrivilegesTable = function (tableName, attribute) {
                        if (_.isNull(appStore) || defaultValues)
                            return 7;
                        var result = 0;
                        var reseller = appStore.getState().reseller;
                        var privileges = reseller.getIn(['privileges']);
                        privileges.forEach(function (i_privelegesModel, counter) {
                            if (i_privelegesModel.getPrivelegesId() == selPrivId) {
                                i_privelegesModel.getColumns().forEach(function (group, c) {
                                    if (group.get('tableName') == tableName)
                                        return result = group.getIn(['columns', attribute]);
                                });
                            }
                        });
                        return result;
                    };
                    var xmlData = "\n          <Privilege>\n              <Groups>\n                <Group name=\"Global\" visible=\"" + getAttributeGroup('Global', 'visible') + "\">\n                  <Tables global_settings=\"" + getPrivilegesTable('Global', 'global_settings') + "\"/>\n                </Group>\n                <Group name=\"Screens\" visible=\"" + getAttributeGroup('Screens', 'visible') + "\">\n                  <Tables boards=\"" + getPrivilegesTable('Screens', 'boards') + "\" board_templates=\"" + getPrivilegesTable('Screens', 'board_templates') + "\" board_template_viewers=\"" + getPrivilegesTable('Screens', 'board_template_viewers') + "\"/>\n                </Group>\n                <Group name=\"Resources\" visible=\"" + getAttributeGroup('Resources', 'visible') + "\" resourceMode=\"" + getAttributeGroup('Resources', 'resourceMode') + "\">\n                  <Tables resources=\"" + getPrivilegesTable('Resources', 'resources') + "\"/>\n                </Group>                \n                <Group name=\"Editors\" visible=\"" + getAttributeGroup('Editors', 'visible') + "\">\n                  <Tables player_data=\"" + getPrivilegesTable('Editors', 'player_data') + "\"/>\n                </Group>\n                <Group name=\"Catalog\" visible=\"" + getAttributeGroup('Catalog', 'visible') + "\">\n                  <Tables catalog_items=\"" + getPrivilegesTable('Catalog', 'catalog_items') + "\" catalog_item_infos=\"" + getPrivilegesTable('Catalog', 'catalog_item_infos') + "\" catalog_item_resources=\"" + getPrivilegesTable('Catalog', 'catalog_item_resources') + "\" catalog_item_categories=\"" + getPrivilegesTable('Catalog', 'catalog_item_categories') + "\" category_values=\"" + getPrivilegesTable('Catalog', 'category_values') + "\"/>\n                </Group>\n                <Group name=\"Campaigns\" visible=\"" + getAttributeGroup('Campaigns', 'visible') + "\">\n                  <Tables campaigns=\"" + getPrivilegesTable('Campaigns', 'campaigns') + "\" campaign_events=\"" + getPrivilegesTable('Campaigns', 'campaign_events') + "\" campaign_timelines=\"" + getPrivilegesTable('Campaigns', 'campaign_timelines') + "\" campaign_timeline_sequences=\"" + getPrivilegesTable('Campaigns', 'campaign_timeline_sequences') + "\" campaign_timeline_schedules=\"" + getPrivilegesTable('Campaigns', 'campaign_timeline_schedules') + "\" campaign_sequences=\"" + getPrivilegesTable('Campaigns', 'campaign_sequences') + "\" campaign_sequence_timelines=\"" + getPrivilegesTable('Campaigns', 'campaign_sequence_timelines') + "\" campaign_sequence_schedules=\"" + getPrivilegesTable('Campaigns', 'campaign_sequence_schedules') + "\" campaign_timeline_channels=\"" + getPrivilegesTable('Campaigns', 'campaign_timeline_channels') + "\" campaign_timeline_chanels=\"" + getPrivilegesTable('Campaigns', 'campaign_timeline_chanels') + "\" campaign_timeline_chanel_players=\"" + getPrivilegesTable('Campaigns', 'campaign_timeline_chanel_players') + "\" campaign_timeline_board_viewer_channels=\"" + getPrivilegesTable('Campaigns', 'campaign_timeline_board_viewer_channels') + "\" campaign_timeline_board_viewer_chanels=\"" + getPrivilegesTable('Campaigns', 'campaign_timeline_board_viewer_chanels') + "\" campaign_timeline_board_templates=\"" + getPrivilegesTable('Campaigns', 'campaign_timeline_board_templates') + "\" campaign_channels=\"" + getPrivilegesTable('Campaigns', 'campaign_channels') + "\" campaign_channel_players=\"" + getPrivilegesTable('Campaigns', 'campaign_channel_players') + "\" campaign_boards=\"" + getPrivilegesTable('Campaigns', 'campaign_boards') + "\"/>\n                </Group>\n                <Group name=\"Transitions\" visible=\"" + getAttributeGroup('Transitions', 'visible') + "\">\n                  <Tables transition_pools=\"" + getPrivilegesTable('Transitions', 'transition_pools') + "\" transition_pool_items=\"" + getPrivilegesTable('Transitions', 'transition_pool_items') + "\"/>\n                </Group>\n                <Group name=\"Scripts\" visible=\"" + getAttributeGroup('Scripts', 'visible') + "\">\n                  <Tables scripts=\"" + getPrivilegesTable('Scripts', 'scripts') + "\"/>\n                </Group>\n                <Group name=\"AdNet\" \n                    visible=\"" + getAttributeGroup('AdNet', 'visible') + "\" \n                    profile=\"" + getAttributeGroup('AdNet', 'profile') + "\"\n                    customerNetwork=\"" + getAttributeGroup('AdNet', 'customerNetwork') + "\"\n                    resellerNetwork=\"" + getAttributeGroup('AdNet', 'resellerNetwork') + "\"\n                    globalNetwork=\"" + getAttributeGroup('AdNet', 'globalNetwork') + "\"\n                    defaultAutoActivate=\"" + getAttributeGroup('AdNet', 'defaultAutoActivate') + "\"\n                    pairFeedback=\"" + getAttributeGroup('AdNet', 'pairFeedback') + "\"\n                    pairSetting=\"" + getAttributeGroup('AdNet', 'pairSetting') + "\"\n                    pairChat=\"" + getAttributeGroup('AdNet', 'pairChat') + "\"\n                    billing=\"" + getAttributeGroup('AdNet', 'billing') + "\"\n                    assets=\"" + getAttributeGroup('AdNet', 'assets') + "\"\n                    >\n                  <Tables \n                      adnet_rates=\"" + getPrivilegesTable('AdNet', 'adnet_rates') + "\" \n                      adnet_targets=\"" + getPrivilegesTable('AdNet', 'adnet_targets') + "\"\n                      adnet_packages=\"" + getPrivilegesTable('AdNet', 'adnet_packages') + "\"\n                      adnet_package_contents=\"" + getPrivilegesTable('AdNet', 'adnet_package_contents') + "\"\n                      adnet_package_targets=\"" + getPrivilegesTable('AdNet', 'adnet_package_targets') + "\"\n                  />\n                </Group>                \n                <Group name=\"Music\" visible=\"" + getAttributeGroup('Music', 'visible') + "\">\n                  <Tables \n                  music_channels=\"" + getPrivilegesTable('Music', 'music_channels') + "\" \n                  music_channel_songs=\"" + getPrivilegesTable('Music', 'music_channel_songs') + "\"/>\n                </Group>\n                <Group name=\"Stations\"\n                    visible=\"" + getAttributeGroup('Stations', 'visible') + "\" \n                    stationsNetwork=\"" + getAttributeGroup('Stations', 'stationsNetwork') + "\" \n                    updateOnSave=\"" + getAttributeGroup('Stations', 'updateOnSave') + "\" \n                    lanServer=\"" + getAttributeGroup('Stations', 'lanServer') + "\" \n                    zwave=\"" + getAttributeGroup('Stations', 'zwave') + "\"\n                  >\n                  <Tables \n                    branch_stations=\"" + getPrivilegesTable('Stations', 'branch_stations') + "\" \n                    station_ads=\"" + getPrivilegesTable('Stations', 'station_ads') + "\"/>\n                </Group>\n                <Group name=\"Changelist\" visible=\"" + getAttributeGroup('Changelist', 'visible') + "\">\n                  <Tables/>\n                </Group>\n              </Groups>\n        </Privilege>\n        ";
                    if (_.isNull(appStore)) {
                        parseString(xmlData, { attrkey: '_attr' }, function (err, result) {
                            callBack(err, result);
                        });
                    }
                    else {
                        callBack(null, xmlData);
                    }
                };
                Lib.Base64 = function () {
                    var _PADCHAR = "=", _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", _VERSION = "1.0";
                    function _getbyte64(s, i) {
                        var idx = _ALPHA.indexOf(s.charAt(i));
                        if (idx === -1) {
                            throw "Cannot decode base64";
                        }
                        return idx;
                    }
                    function _decode(s) {
                        var pads = 0, i, b10, imax = s.length, x = [];
                        s = String(s);
                        if (imax === 0) {
                            return s;
                        }
                        if (imax % 4 !== 0) {
                            throw "Cannot decode base64";
                        }
                        if (s.charAt(imax - 1) === _PADCHAR) {
                            pads = 1;
                            if (s.charAt(imax - 2) === _PADCHAR) {
                                pads = 2;
                            }
                            imax -= 4;
                        }
                        for (i = 0; i < imax; i += 4) {
                            b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12) | (_getbyte64(s, i + 2) << 6) | _getbyte64(s, i + 3);
                            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
                        }
                        switch (pads) {
                            case 1:
                                b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12) | (_getbyte64(s, i + 2) << 6);
                                x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
                                break;
                            case 2:
                                b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12);
                                x.push(String.fromCharCode(b10 >> 16));
                                break;
                        }
                        return x.join("");
                    }
                    function _getbyte(s, i) {
                        var x = s.charCodeAt(i);
                        if (x > 255) {
                            throw "INVALID_CHARACTER_ERR: DOM Exception 5";
                        }
                        return x;
                    }
                    function _encode(s) {
                        if (arguments.length !== 1) {
                            throw "SyntaxError: exactly one argument required";
                        }
                        s = String(s);
                        var i, b10, x = [], imax = s.length - s.length % 3;
                        if (s.length === 0) {
                            return s;
                        }
                        for (i = 0; i < imax; i += 3) {
                            b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8) | _getbyte(s, i + 2);
                            x.push(_ALPHA.charAt(b10 >> 18));
                            x.push(_ALPHA.charAt((b10 >> 12) & 0x3F));
                            x.push(_ALPHA.charAt((b10 >> 6) & 0x3f));
                            x.push(_ALPHA.charAt(b10 & 0x3f));
                        }
                        switch (s.length - imax) {
                            case 1:
                                b10 = _getbyte(s, i) << 16;
                                x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3F) + _PADCHAR + _PADCHAR);
                                break;
                            case 2:
                                b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8);
                                x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3F) + _ALPHA.charAt((b10 >> 6) & 0x3f) + _PADCHAR);
                                break;
                        }
                        return x.join("");
                    }
                    return {
                        decode: _decode,
                        encode: _encode,
                        VERSION: _VERSION
                    };
                };
                Lib.AppsXmlTemplate = function (callBack) {
                    var parseString = xml2js.parseString;
                    var xmlData = "\n                <Apps>\n                  <App id=\"10145\" appName=\"Webkit\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Webkit</Description>\n                    <Components>\n                      <Component moduleId=\"3415\" componentName=\"Webkit\" version=\"1911\" moduleWeb=\"Players/Standard/BlockWebkitPlayerWeb.swf\" moduleAir=\"Players/Standard/BlockWebkitPlayerDesktop.swf\" moduleMobile=\"Players/Standard/BlockWebkitPlayerMobile.swf\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10500\" appName=\"Label Queue\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Label Queue</Description>\n                    <Components>\n                      <Component moduleId=\"3242\" componentName=\"LabelQueue\" version=\"1911\" moduleWeb=\"Players/Standard/BlockLabelQueuePlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"12100\" appName=\"FasterQ\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>FasterQ</Description>\n                    <Components>\n                      <Component moduleId=\"6100\" componentName=\"FasterQ\" version=\"1911\" moduleWeb=\"Players/Standard/BlockWebkitPlayerWeb.swf\" moduleAir=\"Players/Standard/BlockWebkitPlayerDesktop.swf\" moduleMobile=\"Players/Standard/BlockWebkitPlayerMobile.swf\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;http://galaxy.signage.me/code/html/fasterq.json&quot;}\"/>\n                    </Components>\n                  </App>\n                  <App id=\"12010\" appName=\"World weather\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Weather</Description>\n                    <Components>\n                      <Component moduleId=\"6010\" componentName=\"World weather\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com/Weather&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"weather\" label=\"World weather\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"10140\" appName=\"Ext Application\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Ext Application</Description>\n                    <Components>\n                      <Component moduleId=\"3410\" componentName=\"Ext Application\" version=\"1911\" moduleWeb=\"Players/Standard/BlockExtAppPlayerWeb.swf\" moduleAir=\"Players/Standard/BlockExtAppPlayerAir.swf\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"0\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10050\" appName=\"Rss Text\" helpName=\"\" uninstallable=\"0\" hidden=\"0\" price=\"0\">\n                    <Description>Rss Text</Description>\n                    <Components>\n                      <Component moduleId=\"3345\" componentName=\"Rss Text\" version=\"1911\" moduleWeb=\"Players/Standard/BlockRssTextPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10400\" appName=\"Message\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Message</Description>\n                    <Components>\n                      <Component moduleId=\"3245\" componentName=\"Message\" version=\"1911\" moduleWeb=\"Players/Standard/BlockMessagePlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"12090\" appName=\"Pinterest\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Pinterest</Description>\n                    <Components>\n                      <Component moduleId=\"6080\" componentName=\"Pinterest\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com/PinterestUserPins&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"pinterest.board\" label=\"Pinterest board\"/>\n                          <MimeType name=\"Json\" providerType=\"pinterest.user\" label=\"Pinterest user\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"12000\" appName=\"Digg\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Digg</Description>\n                    <Components>\n                      <Component moduleId=\"6000\" componentName=\"Digg\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com/Digg&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"digg\" label=\"Digg\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"10130\" appName=\"Grid/Chart\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Grid/Chart</Description>\n                    <Components>\n                      <Component moduleId=\"3400\" componentName=\"Grid/Chart\" version=\"1911\" moduleWeb=\"Players/Standard/BlockChartPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10040\" appName=\"Html\" helpName=\"\" uninstallable=\"0\" hidden=\"0\" price=\"0\">\n                    <Description>Html</Description>\n                    <Components>\n                      <Component moduleId=\"3235\" componentName=\"Html\" version=\"1911\" moduleWeb=\"Players/Standard/BlockHtmlPlayerWeb.swf\" moduleAir=\"Players/Standard/BlockHtmlPlayerAir.swf\" moduleMobile=\"Players/Standard/BlockHtmlPlayerMobile.swf\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"12260\" appName=\"Mashape\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Mashape</Description>\n                    <Components>\n                      <Component moduleId=\"6260\" componentName=\"Mashape\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"mashape.randomQuote\" label=\"Mashape movie quotes\"/>\n                          <MimeType name=\"Json\" providerType=\"mashape.currency\" label=\"Mashape currency exchange\"/>\n                          <MimeType name=\"Json\" providerType=\"mashape.btc\" label=\"Mashape bitcoin rate\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"12080\" appName=\"500px\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>500px</Description>\n                    <Components>\n                      <Component moduleId=\"6070\" componentName=\"500px\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com/500pxPhotos&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"500px.collection\" label=\"500px collection\"/>\n                          <MimeType name=\"Json\" providerType=\"500px.user\" label=\"500px user\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"10210\" appName=\"Twitter\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Twitter</Description>\n                    <Components>\n                      <Component moduleId=\"4505\" componentName=\"Twitter Item\" version=\"1911\" moduleWeb=\"Players/Standard/BlockTwitterItemPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"0\" showInScene=\"1\"/>\n                      <Component moduleId=\"4500\" componentName=\"Twitter Player\" version=\"1911\" moduleWeb=\"Players/Standard/BlockTwitterPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10120\" appName=\"Clock\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Clock</Description>\n                    <Components>\n                      <Component moduleId=\"3320\" componentName=\"Clock\" version=\"1911\" moduleWeb=\"Players/Standard/BlockClockPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10030\" appName=\"Label\" helpName=\"\" uninstallable=\"0\" hidden=\"0\" price=\"0\">\n                    <Description>Label</Description>\n                    <Components>\n                      <Component moduleId=\"3241\" componentName=\"Label\" version=\"1911\" moduleWeb=\"Players/Standard/BlockLabelPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                      <Component moduleId=\"3240\" componentName=\"RichText\" version=\"1911\" moduleWeb=\"Players/Standard/BlockRichTextPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"12250\" appName=\"Etsy\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Etsy</Description>\n                    <Components>\n                      <Component moduleId=\"6250\" componentName=\"Etsy\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"etsy.userProfile\" label=\"Etsy user profile\"/>\n                          <MimeType name=\"Json\" providerType=\"etsy.shopAbout\" label=\"Etsy shop about\"/>\n                          <MimeType name=\"Json\" providerType=\"etsy.shopListings\" label=\"Etsy shop listings\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"12070\" appName=\"Google drive\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Google drive</Description>\n                    <Components>\n                      <Component moduleId=\"6060\" componentName=\"Google drive\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com/GoogleAjaxFileLink/&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"drive\" label=\"Google drive\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"10220\" appName=\"YouTube\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>YouTube</Description>\n                    <Components>\n                      <Component moduleId=\"4600\" componentName=\"YouTube\" version=\"1911\" moduleWeb=\"Players/Standard/BlockYouTubePlayerWeb.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"11000\" appName=\"Browser\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Browser</Description>\n                    <Components>\n                      <Component moduleId=\"5500\" componentName=\"Browser\" version=\"1911\" moduleWeb=\"Players/Standard/BlockWebkitPlayerWeb.swf\" moduleAir=\"Players/Standard/BlockWebkitPlayerDesktop.swf\" moduleMobile=\"Players/Standard/BlockWebkitPlayerMobile.swf\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;http://galaxy.signage.me/code/html/browser.json&quot;}\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10020\" appName=\"External Resource\" helpName=\"\" uninstallable=\"0\" hidden=\"0\" price=\"0\">\n                    <Description>External Resource</Description>\n                    <Components>\n                      <Component moduleId=\"3160\" componentName=\"External swf/image\" version=\"1911\" moduleWeb=\"Players/Standard/BlockLinkedSwfPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                      <Component moduleId=\"3150\" componentName=\"External video\" version=\"1911\" moduleWeb=\"Players/Standard/BlockLinkedVideoPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10195\" appName=\"JSON Player\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>JSON Player</Description>\n                    <Components>\n                      <Component moduleId=\"4310\" componentName=\"JsonItem\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonItemPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"0\" showInScene=\"1\"/>\n                      <Component moduleId=\"4300\" componentName=\"JsonPlayer\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"12230\" appName=\"Twitter\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Twitter</Description>\n                    <Components>\n                      <Component moduleId=\"6230\" componentName=\"Twitter\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"twitter\" label=\"Twitter\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"12240\" appName=\"Yelp\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Yelp</Description>\n                    <Components>\n                      <Component moduleId=\"6240\" componentName=\"Yelp\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"yelp.reviews\" label=\"Yelp reviews\"/>\n                          <MimeType name=\"Json\" providerType=\"yelp.info\" label=\"Yelp info\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"12060\" appName=\"Instagram\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Instagram</Description>\n                    <Components>\n                      <Component moduleId=\"6050\" componentName=\"Instagram\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com/InstagramFeed&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"instagram.feed\" label=\"Instagram feed\"/>\n                          <MimeType name=\"Json\" providerType=\"instagram.media\" label=\"Instagram media\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"10190\" appName=\"XML Player\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>XML Player</Description>\n                    <Components>\n                      <Component moduleId=\"4210\" componentName=\"XmlItem\" version=\"1911\" moduleWeb=\"Players/Standard/BlockXmlItemPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"0\" showInScene=\"1\"/>\n                      <Component moduleId=\"4200\" componentName=\"XmlPlayer\" version=\"1911\" moduleWeb=\"Players/Standard/BlockXmlPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10100\" appName=\"Catalog\" helpName=\"\" uninstallable=\"0\" hidden=\"0\" price=\"0\">\n                    <Description>Catalog</Description>\n                    <Components>\n                      <Component moduleId=\"3270\" componentName=\"Catalog item\" version=\"1911\" moduleWeb=\"Players/Standard/BlockItemPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"0\" showInScene=\"1\"/>\n                      <Component moduleId=\"3280\" componentName=\"Catalog player\" version=\"1911\" moduleWeb=\"Players/Standard/BlockCatalogPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"0\">\n                        <MimeTypes>\n                          <MimeType name=\"Catalog\" label=\"Catalog\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"10010\" appName=\"Scene\" helpName=\"\" uninstallable=\"0\" hidden=\"1\" price=\"0\">\n                    <Description>Scene</Description>\n                    <Components>\n                      <Component moduleId=\"3511\" componentName=\"DesignerEditor\" version=\"1911\" moduleWeb=\"Players/Standard/DesignerEditor.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"0\" showInScene=\"0\"/>\n                      <Component moduleId=\"3510\" componentName=\"DesignerPlayer\" version=\"1911\" moduleWeb=\"Players/Standard/DesignerPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"0\" showInScene=\"0\"/>\n                    </Components>\n                  </App>\n                  <App id=\"12210\" appName=\"Dropbox\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Dropbox</Description>\n                    <Components>\n                      <Component moduleId=\"6210\" componentName=\"Dropbox\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"dropbox\" label=\"Dropbox\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"10185\" appName=\"Location based\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Location based</Description>\n                    <Components>\n                      <Component moduleId=\"4105\" componentName=\"LocationBasedPlayer\" version=\"1911\" moduleWeb=\"Players/Standard/BlockLocationBasedPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10005\" appName=\"Embeded Resource\" helpName=\"\" uninstallable=\"0\" hidden=\"1\" price=\"0\">\n                    <Description>Embeded Resource</Description>\n                    <Components>\n                      <Component moduleId=\"3130\" componentName=\"Swf\" version=\"1911\" moduleWeb=\"Players/Standard/BlockSwfPlayer.swf\" moduleAir=\"Players/Standard/BlockSwfPlayerDesktop.swf\" moduleMobile=\"Players/Standard/BlockSwfPlayerMobile.swf\" showInTimeline=\"0\" showInScene=\"0\"/>\n                      <Component moduleId=\"3140\" componentName=\"Svg\" version=\"1911\" moduleWeb=\"Players/Standard/BlockSvgPlayer.swf\" moduleAir=\"Players/Standard/BlockSvgPlayer.swf\" moduleMobile=\"Players/Standard/BlockSvgPlayer.swf\" showInTimeline=\"0\" showInScene=\"0\"/>\n                      <Component moduleId=\"3100\" componentName=\"Video\" version=\"1911\" moduleWeb=\"Players/Standard/VideoPlayer.swf\" moduleAir=\"\" moduleMobile=\"Players/Standard/BlockVideoPlayerMobile.swf\" showInTimeline=\"0\" showInScene=\"0\"/>\n                    </Components>\n                  </App>\n                  <App id=\"12050\" appName=\"Picasa\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Picasa</Description>\n                    <Components>\n                      <Component moduleId=\"6040\" componentName=\"Picasa\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com/GooglePicasa&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"picasa\" label=\"Picasa\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"10180\" appName=\"CollectionViewer\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>CollectionViewer</Description>\n                    <Components>\n                      <Component moduleId=\"4100\" componentName=\"CollectionPlayer\" version=\"1911\" moduleWeb=\"Players/Standard/BlockCollectionPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10090\" appName=\"Stock\" helpName=\"\" uninstallable=\"0\" hidden=\"0\" price=\"0\">\n                    <Description>Stock</Description>\n                    <Components>\n                      <Component moduleId=\"3338\" componentName=\"Stock player\" version=\"1911\" moduleWeb=\"Players/Standard/BlockStockTickerPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"0\">\n                        <MimeTypes>\n                          <MimeType name=\"Stocks\" label=\"Stocks\"/>\n                        </MimeTypes>\n                      </Component>\n                      <Component moduleId=\"3335\" componentName=\"Stock item\" version=\"1911\" moduleWeb=\"Players/Standard/BlockStockItemPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"0\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10122\" appName=\"Countdown\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Countdown</Description>\n                    <Components>\n                      <Component moduleId=\"3322\" componentName=\"Countdown\" version=\"1911\" moduleWeb=\"Players/Standard/BlockCountdownPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10300\" appName=\"Form\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Form</Description>\n                    <Components>\n                      <Component moduleId=\"3600\" componentName=\"Form\" version=\"1911\" moduleWeb=\"Players/Standard/BlockFormPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"0\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"12220\" appName=\"Flickr\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Flickr</Description>\n                    <Components>\n                      <Component moduleId=\"6220\" componentName=\"Flickr\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"flickr\" label=\"Flickr\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"12040\" appName=\"Google plus\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Google plus</Description>\n                    <Components>\n                      <Component moduleId=\"6030\" componentName=\"Google plus\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com/GooglePlusActivities&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"plus\" label=\"Google plus\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"10080\" appName=\"Weather\" helpName=\"\" uninstallable=\"0\" hidden=\"0\" price=\"0\">\n                    <Description>Weather</Description>\n                    <Components>\n                      <Component moduleId=\"3315\" componentName=\"Weather item\" version=\"1911\" moduleWeb=\"Players/Standard/BlockItemWeatherPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"0\" showInScene=\"1\"/>\n                      <Component moduleId=\"3310\" componentName=\"Weather player\" version=\"1911\" moduleWeb=\"Players/Standard/BlockRssWeatherPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"0\">\n                        <MimeTypes>\n                          <MimeType name=\"Weather\" label=\"Weather\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"12032\" appName=\"Google Sheets\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Google Sheets</Description>\n                    <Components>\n                      <Component moduleId=\"6022\" componentName=\"Google Sheets\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com/GoogleSheetsValues&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"spreadsheet\" label=\"Google Spreadsheet\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"12030\" appName=\"Google calendar\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Google calendar</Description>\n                    <Components>\n                      <Component moduleId=\"6020\" componentName=\"Google calendar\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com/GoogleCalendarEvents&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"calendar\" label=\"Google calendar\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"10160\" appName=\"QR Code\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>QR Code</Description>\n                    <Components>\n                      <Component moduleId=\"3430\" componentName=\"QR Code\" version=\"1911\" moduleWeb=\"Players/Standard/BlockQRCodePlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10070\" appName=\"Media Rss/Podcast\" helpName=\"\" uninstallable=\"0\" hidden=\"0\" price=\"0\">\n                    <Description>Media Rss/Podcast</Description>\n                    <Components>\n                      <Component moduleId=\"3340\" componentName=\"Media Rss/Podcast\" version=\"1911\" moduleWeb=\"Players/Standard/BlockRssVideoPlayerWeb.swf\" moduleAir=\"Players/Standard/BlockRssVideoPlayerAir.swf\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10110\" appName=\"Capture/Camera\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Capture/Camera</Description>\n                    <Components>\n                      <Component moduleId=\"3350\" componentName=\"Capture/Camera\" version=\"1911\" moduleWeb=\"Players/Standard/BlockCameraPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\"/>\n                    </Components>\n                  </App>\n                  <App id=\"12200\" appName=\"Tumblr\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Tumblr</Description>\n                    <Components>\n                      <Component moduleId=\"6090\" componentName=\"Tumblr\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com/TumblrUserInfo&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"tumblr.texts\" label=\"Tumblr texts\"/>\n                          <MimeType name=\"Json\" providerType=\"tumblr.photos\" label=\"Tumblr photos\"/>\n                          <MimeType name=\"Json\" providerType=\"tumblr.videos\" label=\"Tumblr videos\"/>\n                          <MimeType name=\"Json\" providerType=\"tumblr.posts\" label=\"Tumblr posts\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"12020\" appName=\"Facebook\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>Facebook</Description>\n                    <Components>\n                      <Component moduleId=\"4400\" componentName=\"Facebook\" version=\"1911\" moduleWeb=\"Players/Standard/BlockJsonPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"1\" componentParams=\"{&quot;url&quot;:&quot;https://secure.digitalsignage.com/facebook&quot;}\">\n                        <MimeTypes>\n                          <MimeType name=\"Json\" providerType=\"facebook.videos\" label=\"Facebook videos\"/>\n                          <MimeType name=\"Json\" providerType=\"facebook.wall\" label=\"Facebook wall\"/>\n                          <MimeType name=\"Json\" providerType=\"facebook.album\" label=\"Facebook album\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                  <App id=\"10150\" appName=\"AdNet\" helpName=\"\" uninstallable=\"1\" hidden=\"0\" price=\"0\">\n                    <Description>AdNet</Description>\n                    <Components>\n                      <Component moduleId=\"3420\" componentName=\"AdNet\" version=\"1911\" moduleWeb=\"Players/Standard/BlockAdNetPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"0\"/>\n                    </Components>\n                  </App>\n                  <App id=\"10060\" appName=\"Custom Rss\" helpName=\"\" uninstallable=\"0\" hidden=\"0\" price=\"0\">\n                    <Description>Custom Rss</Description>\n                    <Components>\n                      <Component moduleId=\"3348\" componentName=\"Custom Rss item\" version=\"1911\" moduleWeb=\"Players/Standard/BlockCustomRssItemPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"0\" showInScene=\"1\"/>\n                      <Component moduleId=\"3346\" componentName=\"Custom Rss player\" version=\"1911\" moduleWeb=\"Players/Standard/BlockCustomRssPlayer.swf\" moduleAir=\"\" moduleMobile=\"\" showInTimeline=\"1\" showInScene=\"0\">\n                        <MimeTypes>\n                          <MimeType name=\"CustomRss\" label=\"CustomRss\"/>\n                        </MimeTypes>\n                      </Component>\n                    </Components>\n                  </App>\n                </Apps>\n        ";
                    parseString(xmlData, { attrkey: '_attr' }, function (err, result) {
                        callBack(err, result);
                    });
                };
                Lib.LoadComponentAsync = function (name, path) {
                    return System.import(path).then(function (c) { return c[name]; });
                };
                Lib.ConstructImmutableFromTable = function (path) {
                    var arr = [];
                    path.forEach(function (member) {
                        var obj = {};
                        obj[member._attr.name] = {
                            table: {}
                        };
                        for (var k in member._attr) {
                            var value = member._attr[k];
                            obj[member._attr.name][k] = value;
                            for (var t in member.Tables["0"]._attr) {
                                var value = member.Tables["0"]._attr[t];
                                obj[member._attr.name]['table'][t] = value;
                            }
                        }
                        arr.push(Immutable.fromJS(obj));
                    });
                    return arr;
                };
                Lib.ComputeMask = function (accessMask) {
                    var bits = [1, 2, 4, 8, 16, 32, 64, 128];
                    var computedAccessMask = 0;
                    accessMask.forEach(function (value) {
                        var bit = bits.shift();
                        if (value)
                            computedAccessMask = computedAccessMask + bit;
                    });
                    return computedAccessMask;
                };
                Lib.GetAccessMask = function (accessMask) {
                    var checks = immutable_1.List();
                    var bits = [1, 2, 4, 8, 16, 32, 64, 128];
                    for (var i = 0; i < bits.length; i++) {
                        var checked = (bits[i] & accessMask) > 0 ? true : false;
                        checks = checks.push(checked);
                    }
                    return checks;
                };
                Lib.GetADaysMask = function (accessMask) {
                    var checks = immutable_1.List();
                    var bits = [1, 2, 4, 8, 16, 32, 64];
                    for (var i = 0; i < bits.length; i++) {
                        var checked = (bits[i] & accessMask) > 0 ? true : false;
                        checks = checks.push(checked);
                    }
                    return checks;
                };
                Lib.log = function (msg) {
                    console.log(new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + ': ' + msg);
                };
                Lib.guid = function () {
                    function s4() {
                        return Math.floor((1 + Math.random()) * 0x10000)
                            .toString(16)
                            .substring(1);
                    }
                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                };
                Lib.DevMode = function () {
                    if (window.location.href.indexOf('localhost') > -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                Lib.GetSamples = function () {
                    return {
                        1019: 'Sushi Restaurant,pro',
                        1029: 'food menu board,pro',
                        1007: 'Home and Garden,pro',
                        1009: 'Hotel Lobby,pro',
                        1016: 'Coffee Shop,pro',
                        1011: 'Hobby Shop,pro',
                        1013: 'Sports Bar,pro',
                        1014: 'Museum,pro',
                        1017: 'Bank,pro',
                        1018: 'Gas Station,pro',
                        1020: 'Casino,pro',
                        1000: 'Travel,pro',
                        1021: 'Bicycle Shop,pro',
                        1022: 'Tanning Salon,pro',
                        1023: 'Pharmacy,pro',
                        1024: 'Laser Away,pro',
                        1025: 'Dentistry,pro',
                        1026: 'Clothing store,pro',
                        1027: 'Golf club,pro',
                        1028: 'RC Heli,pro',
                        1030: 'seven eleven,pro',
                        1031: 'Subway,pro',
                        1032: 'Super market,pro',
                        1033: 'Investment Group,pro',
                        1035: 'Synagogue,pro',
                        1036: 'Dry Cleaning,pro',
                        1037: 'Ice Cream Shop,pro',
                        1038: 'Real Estate office,pro',
                        1039: 'Night Club,pro',
                        1040: 'Hockey,pro',
                        1041: 'Train Station,pro',
                        1042: 'Realtor,pro',
                        1043: 'Toy Store,pro',
                        1044: 'Indian Restaurant,pro',
                        1045: 'Library,pro',
                        1046: 'Movie Theater,pro',
                        1047: 'Airport,pro',
                        1048: 'LAX,pro',
                        100310: 'Motel,pro',
                        100301: 'Parks and Recreations,pro',
                        100322: 'Corner Bakery,pro',
                        100331: 'Retirement home,pro',
                        100368: 'Navy recruiting office,pro',
                        100397: 'Martial arts school,pro',
                        100414: 'Supercuts,pro',
                        100432: 'The UPS Store,pro',
                        100438: 'Cruise One,pro',
                        100483: 'Car service,pro',
                        100503: 'fedex kinkos,pro',
                        100510: 'veterinarian,pro',
                        100556: 'YMCA,pro',
                        100574: 'Tax services,pro',
                        100589: 'Wedding planner,pro',
                        100590: 'Cleaning services,pro',
                        100620: 'Pet Training,pro',
                        100661: 'Gymboree Kids,pro',
                        100677: 'Trader Joes,pro',
                        100695: 'Men Haircuts,pro',
                        100722: 'Jiffy Lube,pro',
                        100738: 'Toyota  car dealer,pro',
                        100747: 'Winery,pro',
                        100771: 'Savings and Loans,pro',
                        100805: 'Nail Salon,pro',
                        100822: 'Weight Watchers,pro',
                        100899: 'Dollar Tree,pro',
                        100938: 'Western Bagles,pro',
                        100959: 'Kaiser Permanente,pro',
                        300143: 'Funeral home,pro',
                        205734: 'Church,pro',
                        220354: 'College,pro',
                        206782: 'Dr Waiting Room,pro',
                        300769: 'NFL Stadium,pro',
                        301814: 'University Campus,pro',
                        303038: 'Day care,pro',
                        304430: 'GameStop,pro',
                        307713: 'Del Taco,pro',
                        305333: 'General Hospital,pro',
                        305206: 'Starbucks,pro',
                        308283: 'training and fitness,pro',
                        311519: 'High school hall,pro',
                        309365: 'Winery,pro',
                        310879: 'Law Firm,pro',
                        1001: 'Health Club,pro',
                        1002: 'Gym,pro',
                        1003: 'Flower Shop,pro',
                        1004: 'Car Dealership,pro',
                        1012: 'Pet Shop,pro',
                        1005: 'Hair Salon,pro',
                        1209: 'Motorcycle shop,lite',
                        1210: 'Sushi and Grill,lite',
                        1211: 'the Coffee Shop,lite',
                        1212: 'Pizzeria,lite',
                        1213: 'Music Store,lite',
                        1214: 'Diner,lite',
                        1215: 'the Hair Salon,lite',
                        1216: 'Dentist,lite',
                        1203: 'Jewelry,lite',
                        1217: 'Crossfit,lite',
                        1218: 'Copy and Print shop,lite',
                        1219: 'Antique Store,lite',
                        1220: 'Clock Repair Store,lite',
                        1221: 'Eastern Cuisine,lite',
                        1222: 'the Toy Store,lite',
                        1223: 'Pet Store Grooming,lite',
                        1224: 'the Veterinarian,lite',
                        1225: 'Tattoo Parlor,lite',
                        1226: 'Camera Store,lite',
                        1228: 'Bike shop,lite',
                        1229: 'Gun Shop,lite',
                        1230: 'Chiropractic Clinic,lite',
                        1231: 'French Restaurant,lite',
                        1233: 'Winery,lite',
                        1232: 'Mexican Taqueria,lite',
                        1234: 'Bistro Restaurant,lite',
                        1235: 'Vitamin Shop,lite',
                        1227: 'Tailor Shop,lite',
                        1236: 'Computer Repair,lite',
                        1237: 'Car Detail,lite',
                        1238: 'Asian Restaurants,lite',
                        1239: 'Marijuana Dispensary,lite',
                        1240: 'the Church,lite',
                        1241: 'Synagogue,lite',
                        1242: 'Frozen Yogurt Store,lite',
                        1244: 'Baby Day Care,lite',
                        1052: 'Car wash,lite',
                        1053: 'Smoke shop,lite',
                        1054: 'Yoga place,lite',
                        1055: 'Laundromat,lite',
                        1056: 'Baby clothes,lite',
                        1057: 'Travel agency,lite',
                        1058: 'Real Estate agent,lite'
                    };
                };
                Lib.Xml2Json = function () {
                    var xmlToJSON = (function () {
                        this.version = "1.3";
                        var options = {
                            mergeCDATA: true,
                            grokAttr: true,
                            grokText: true,
                            normalize: true,
                            xmlns: true,
                            namespaceKey: '_ns',
                            textKey: '_text',
                            valueKey: '_value',
                            attrKey: '_attr',
                            cdataKey: '_cdata',
                            attrsAsObject: true,
                            stripAttrPrefix: true,
                            stripElemPrefix: true,
                            childrenAsArray: true
                        };
                        var prefixMatch = new RegExp('(?!xmlns)^.*:/');
                        var trimMatch = new RegExp('^\s+|\s+$g');
                        this.grokType = function (sValue) {
                            if (/^\s*$/.test(sValue)) {
                                return null;
                            }
                            if (/^(?:true|false)$/i.test(sValue)) {
                                return sValue.toLowerCase() === "true";
                            }
                            if (isFinite(sValue)) {
                                return parseFloat(sValue);
                            }
                            return sValue;
                        };
                        this.parseString = function (xmlString, opt) {
                            return this.parseXML(this.stringToXML(xmlString), opt);
                        };
                        this.parseXML = function (oXMLParent, opt) {
                            for (var key in opt) {
                                options[key] = opt[key];
                            }
                            var vResult = {}, nLength = 0, sCollectedTxt = "";
                            if (options.xmlns && oXMLParent.namespaceURI) {
                                vResult[options.namespaceKey] = oXMLParent.namespaceURI;
                            }
                            if (oXMLParent.attributes && oXMLParent.attributes.length > 0) {
                                var vAttribs = {};
                                for (nLength; nLength < oXMLParent.attributes.length; nLength++) {
                                    var oAttrib = oXMLParent.attributes.item(nLength);
                                    vContent = {};
                                    var attribName = '';
                                    if (options.stripAttrPrefix) {
                                        attribName = oAttrib.name.replace(prefixMatch, '');
                                    }
                                    else {
                                        attribName = oAttrib.name;
                                    }
                                    if (options.grokAttr) {
                                        vContent[options.valueKey] = this.grokType(oAttrib.value.replace(trimMatch, ''));
                                    }
                                    else {
                                        vContent[options.valueKey] = oAttrib.value.replace(trimMatch, '');
                                    }
                                    if (options.xmlns && oAttrib.namespaceURI) {
                                        vContent[options.namespaceKey] = oAttrib.namespaceURI;
                                    }
                                    if (options.attrsAsObject) {
                                        vAttribs[attribName] = vContent;
                                    }
                                    else {
                                        vResult[options.attrKey + attribName] = vContent;
                                    }
                                }
                                if (options.attrsAsObject) {
                                    vResult[options.attrKey] = vAttribs;
                                }
                                else {
                                }
                            }
                            if (oXMLParent.hasChildNodes()) {
                                for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
                                    oNode = oXMLParent.childNodes.item(nItem);
                                    if (oNode.nodeType === 4) {
                                        if (options.mergeCDATA) {
                                            sCollectedTxt += oNode.nodeValue;
                                        }
                                        else {
                                            if (vResult.hasOwnProperty(options.cdataKey)) {
                                                if (vResult[options.cdataKey].constructor !== Array) {
                                                    vResult[options.cdataKey] = [vResult[options.cdataKey]];
                                                }
                                                vResult[options.cdataKey].push(oNode.nodeValue);
                                            }
                                            else {
                                                if (options.childrenAsArray) {
                                                    vResult[options.cdataKey] = [];
                                                    vResult[options.cdataKey].push(oNode.nodeValue);
                                                }
                                                else {
                                                    vResult[options.cdataKey] = oNode.nodeValue;
                                                }
                                            }
                                        }
                                    }
                                    else if (oNode.nodeType === 3) {
                                        sCollectedTxt += oNode.nodeValue;
                                    }
                                    else if (oNode.nodeType === 1) {
                                        if (nLength === 0) {
                                            vResult = {};
                                        }
                                        if (options.stripElemPrefix) {
                                            sProp = oNode.nodeName.replace(prefixMatch, '');
                                        }
                                        else {
                                            sProp = oNode.nodeName;
                                        }
                                        vContent = xmlToJSON.parseXML(oNode);
                                        if (vResult.hasOwnProperty(sProp)) {
                                            if (vResult[sProp].constructor !== Array) {
                                                vResult[sProp] = [vResult[sProp]];
                                            }
                                            vResult[sProp].push(vContent);
                                        }
                                        else {
                                            if (options.childrenAsArray) {
                                                vResult[sProp] = [];
                                                vResult[sProp].push(vContent);
                                            }
                                            else {
                                                vResult[sProp] = vContent;
                                            }
                                            nLength++;
                                        }
                                    }
                                }
                            }
                            else if (!sCollectedTxt) {
                                if (options.childrenAsArray) {
                                    vResult[options.textKey] = [];
                                    vResult[options.textKey].push(null);
                                }
                                else {
                                    vResult[options.textKey] = null;
                                }
                            }
                            if (sCollectedTxt) {
                                if (options.grokText) {
                                    var value = this.grokType(sCollectedTxt.replace(trimMatch, ''));
                                    if (value !== null && value !== undefined) {
                                        vResult[options.textKey] = value;
                                    }
                                }
                                else if (options.normalize) {
                                    vResult[options.textKey] = sCollectedTxt.replace(trimMatch, '').replace(/\s+/g, " ");
                                }
                                else {
                                    vResult[options.textKey] = sCollectedTxt.replace(trimMatch, '');
                                }
                            }
                            return vResult;
                        };
                        this.xmlToString = function (xmlDoc) {
                            try {
                                var xmlString = xmlDoc.xml ? xmlDoc.xml : (new XMLSerializer()).serializeToString(xmlDoc);
                                return xmlString;
                            }
                            catch (err) {
                                return null;
                            }
                        };
                        this.stringToXML = function (xmlString) {
                            try {
                                var xmlDoc = null;
                                if (window.DOMParser) {
                                    var parser = new DOMParser();
                                    xmlDoc = parser.parseFromString(xmlString, "text/xml");
                                    return xmlDoc;
                                }
                                else {
                                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                                    xmlDoc.async = false;
                                    xmlDoc.loadXML(xmlString);
                                    return xmlDoc;
                                }
                            }
                            catch (e) {
                                return null;
                            }
                        };
                        return this;
                    }).call({});
                    return xmlToJSON;
                };
                Lib.ReduxLoggerMiddleware = function (store) { return function (next) { return function (action) {
                    var result = next(action);
                    return result;
                }; }; };
                Lib = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Lib);
                return Lib;
            }());
            exports_1("Lib", Lib);
            if (!Object.assign) {
                Object.defineProperty(Object, "assign", {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: function (target) {
                        "use strict";
                        if (target === undefined || target === null) {
                            throw new TypeError("Cannot convert first argument to object");
                        }
                        var to = Object(target);
                        for (var i = 1; i < arguments.length; i++) {
                            var nextSource = arguments[i];
                            if (nextSource === undefined || nextSource === null) {
                                continue;
                            }
                            nextSource = Object(nextSource);
                            var keysArray = Object.keys(nextSource);
                            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                                var nextKey = keysArray[nextIndex];
                                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                                if (desc !== undefined && desc.enumerable) {
                                    to[nextKey] = nextSource[nextKey];
                                }
                            }
                        }
                        return to;
                    }
                });
            }
        }
    }
});
