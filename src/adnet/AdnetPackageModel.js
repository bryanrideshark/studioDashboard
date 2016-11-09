System.register(["../models/StoreModel", "../comps/app1/adnet/network/AdnetNetwork"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var StoreModel_1, AdnetNetwork_1;
    var AdnetPackageModel;
    return {
        setters:[
            function (StoreModel_1_1) {
                StoreModel_1 = StoreModel_1_1;
            },
            function (AdnetNetwork_1_1) {
                AdnetNetwork_1 = AdnetNetwork_1_1;
            }],
        execute: function() {
            AdnetPackageModel = (function (_super) {
                __extends(AdnetPackageModel, _super);
                function AdnetPackageModel(data) {
                    if (data === void 0) { data = {}; }
                    _super.call(this, data);
                }
                AdnetPackageModel.prototype.getId = function () {
                    return this.getKey('Key');
                };
                AdnetPackageModel.prototype.setId = function (value) {
                    return this.setKey(AdnetPackageModel, 'Key', value);
                };
                AdnetPackageModel.prototype.getName = function () {
                    return this.getKey('Value').label;
                };
                AdnetPackageModel.prototype.getCustomerId = function () {
                    return this.getKey('Value').customerId;
                };
                AdnetPackageModel.prototype.playMode = function () {
                    return this.getKey('Value').playMode;
                };
                AdnetPackageModel.prototype.playModeName = function () {
                    var mode = this.getKey('Value').playMode;
                    switch (mode) {
                        case AdnetNetwork_1.AdnetPackagePlayMode.ASSETS:
                            return "asset";
                        case AdnetNetwork_1.AdnetPackagePlayMode.LOCATION:
                            return "location";
                        case AdnetNetwork_1.AdnetPackagePlayMode.TIME:
                            return "time";
                    }
                };
                AdnetPackageModel.prototype.startDate = function () {
                    return this.getKey('Value').startDate;
                };
                AdnetPackageModel.prototype.endDate = function () {
                    return this.getKey('Value').endDate;
                };
                AdnetPackageModel.prototype.daysMask = function () {
                    return this.getKey('Value').daysMask;
                };
                AdnetPackageModel.prototype.hourStart = function () {
                    return this.getKey('Value').hourStart;
                };
                AdnetPackageModel.prototype.hourEnd = function () {
                    return this.getKey('Value').hourEnd;
                };
                AdnetPackageModel.prototype.autoAddSiblings = function () {
                    return this.getKey('Value').autoAddSiblings;
                };
                AdnetPackageModel.prototype.siblingsKey = function () {
                    return this.getKey('Value').siblingsKey;
                };
                AdnetPackageModel.prototype.channel = function () {
                    return this.getKey('Value').channel;
                };
                AdnetPackageModel.prototype.deleted = function () {
                    return this.getKey('Value').deleted;
                };
                AdnetPackageModel.prototype.enabled = function () {
                    return this.getKey('Value').enabled;
                };
                AdnetPackageModel.prototype.getContents = function () {
                    return this.getKey('Value').contents;
                };
                AdnetPackageModel.prototype.getTargets = function () {
                    return this.getKey('Value').targets;
                };
                AdnetPackageModel.prototype.getTargetIds = function () {
                    var result = [];
                    var targets = this.getKey('Value').targets;
                    targets.forEach(function (k, v) {
                        if (k.Value.deleted == true)
                            return;
                        result.push(k.Value.targetId);
                    });
                    return result;
                };
                return AdnetPackageModel;
            }(StoreModel_1.StoreModel));
            exports_1("AdnetPackageModel", AdnetPackageModel);
        }
    }
});
