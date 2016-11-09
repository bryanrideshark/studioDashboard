System.register(["../models/StoreModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1;
    var AdnetContentModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            }],
        execute: function() {
            AdnetContentModel = (function (_super) {
                __extends(AdnetContentModel, _super);
                function AdnetContentModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                AdnetContentModel.prototype.getId = function () {
                    return this.getKey('Key');
                };
                AdnetContentModel.prototype.getName = function () {
                    return this.getKey('Value').contentLabel;
                };
                AdnetContentModel.prototype.getExtension = function () {
                    return this.getKey('Value').contentExt;
                };
                AdnetContentModel.prototype.getType = function () {
                    return this.getKey('Value').contentType;
                };
                AdnetContentModel.prototype.getVolume = function () {
                    return this.getKey('Value').contentVolume;
                };
                AdnetContentModel.prototype.getContentUrl = function () {
                    return this.getKey('Value').contentUrl;
                };
                AdnetContentModel.prototype.duration = function () {
                    return this.getKey('Value').duration;
                };
                AdnetContentModel.prototype.repetition = function () {
                    return this.getKey('Value').reparationsPerHour;
                };
                AdnetContentModel.prototype.getDeleted = function () {
                    return this.getKey('Value').deleted;
                };
                AdnetContentModel.prototype.percentage = function () {
                    return 'TBA';
                };
                AdnetContentModel.prototype.locationLat = function () {
                    return this.getKey('Value').locationLat;
                };
                AdnetContentModel.prototype.locationLng = function () {
                    return this.getKey('Value').locationLng;
                };
                AdnetContentModel.prototype.locationRadios = function () {
                    return this.getKey('Value').locationRadios;
                };
                return AdnetContentModel;
            }(StoreModel_1.StoreModel));
            exports_1("AdnetContentModel", AdnetContentModel);
        }
    }
});
