System.register(["../models/StoreModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1;
    var Store, StationModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            StationModel = (function (_super) {
                __extends(StationModel, _super);
                function StationModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                StationModel.prototype.getConnection = function () {
                    return this.getKey('connection');
                };
                StationModel.prototype.getStationId = function () {
                    return this.getKey('id');
                };
                StationModel.prototype.getSource = function (appStore) {
                    var source = '';
                    var businessId = this.getKey('businessId');
                    var businesses = appStore.getState().business.get('businesses');
                    businesses.forEach(function (business) {
                        if (business.getBusinessId() == businessId)
                            source = business.getKey('source');
                    });
                    return source;
                };
                StationModel.prototype.getCustomerName = function (appStore) {
                    var name = '';
                    var businessId = this.getKey('businessId');
                    var businessUsers = appStore.getState().business.get('businessUsers');
                    businessUsers.forEach(function (businessUser) {
                        if (businessUser.getBusinessId() == businessId)
                            name = businessUser.getName();
                    });
                    return name;
                };
                StationModel.prototype.getBusinessId = function () {
                    return this.getKey('businessId');
                };
                StationModel.prototype.getPublicIp = function () {
                    return this.getKey('publicIp');
                };
                StationModel.prototype.getLocalIp = function () {
                    return this.getKey('localIp');
                };
                StationModel.prototype.getLocation = function () {
                    return this.getKey('geoLocation');
                };
                StationModel.prototype.getStationName = function () {
                    return this.getKey('name');
                };
                StationModel.prototype.getWatchDogConnection = function () {
                    var watchDogConnection = this.getKey('watchDogConnection');
                    var connection = this.getConnection();
                    if (connection == '0')
                        return 'fa-minus';
                    switch (watchDogConnection) {
                        case '0':
                            return 'fa-minus';
                        case '1':
                            return 'fa-shield';
                        case '':
                            return 'fa-minus';
                        default:
                            return 'fa-minus';
                    }
                };
                StationModel.prototype.getConnectionIcon = function (style) {
                    var connection = this.getConnection();
                    switch (style) {
                        case 'icon': {
                            switch (connection) {
                                case '0':
                                    return 'fa-circle-thin';
                                case '1':
                                    return 'fa-check-circle';
                                case '2':
                                    return 'fa-circle';
                                default:
                                    return 'fa-minus';
                            }
                        }
                        case 'color': {
                            switch (connection) {
                                case '0':
                                    return 'red';
                                case '1':
                                    return 'green';
                                case '2':
                                    return 'yellow';
                                default:
                                    return 'red';
                            }
                        }
                    }
                };
                return StationModel;
            }(StoreModel_1.StoreModel));
            exports_1("StationModel", StationModel);
        }
    }
});
