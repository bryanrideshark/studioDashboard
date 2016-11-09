System.register(["@angular/core", "immutable", "./SimplelistEditable", "lodash", './Simplelist.html!text', './Simplelist.css!text'], function(exports_1, context_1) {
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
    var core_1, immutable_1, SimplelistEditable_1, _, Simplelist_html_text_1, Simplelist_css_text_1;
    var SimpleList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (SimplelistEditable_1_1) {
                SimplelistEditable_1 = SimplelistEditable_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (Simplelist_html_text_1_1) {
                Simplelist_html_text_1 = Simplelist_html_text_1_1;
            },
            function (Simplelist_css_text_1_1) {
                Simplelist_css_text_1 = Simplelist_css_text_1_1;
            }],
        execute: function() {
            SimpleList = (function () {
                function SimpleList(cd) {
                    this.cd = cd;
                    this.filter = '';
                    this.m_editing = false;
                    this.m_iconSelected = '';
                    this.m_iconSelectedIndex = -1;
                    this.m_iconSelectedMode = false;
                    this.m_metadata = {};
                    this.editable = false;
                    this.multiSelect = true;
                    this.hover = new core_1.EventEmitter();
                    this.iconClicked = new core_1.EventEmitter();
                    this.itemClicked = new core_1.EventEmitter();
                    this.selected = new core_1.EventEmitter();
                    this.edited = new core_1.EventEmitter();
                }
                SimpleList.prototype.ngAfterViewInit = function () {
                };
                Object.defineProperty(SimpleList.prototype, "icon", {
                    set: function (i_icon) {
                        this.m_icon = i_icon;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleList.prototype, "iconCallback", {
                    set: function (i_iconCallback) {
                        this.m_iconCallback = i_iconCallback;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleList.prototype, "iconSelectiondMode", {
                    set: function (mode) {
                        if (mode) {
                            this.m_iconSelectedMode = true;
                            this.m_icon = 'fa-circle-o';
                            this.m_iconSelected = 'fa-check-circle';
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                SimpleList.prototype.onEditChanged = function (event) {
                    this.edited.emit((event));
                };
                SimpleList.prototype.itemSelected = function (item, index) {
                    this.itemClicked.emit({ item: item, index: index });
                    var id = this.contentId ? this.contentId(item) : index;
                    for (var id_1 in this.m_metadata) {
                        this.m_metadata[id_1] = {
                            selected: false
                        };
                    }
                    this.m_metadata[id] = {
                        item: item,
                        index: index,
                        selected: true
                    };
                    this.selected.emit(this.m_metadata);
                };
                SimpleList.prototype.renderIcon = function (index, item) {
                    if (this.m_iconSelectedMode) {
                        if (this.iconSelected) {
                            if (this.iconSelected(index, item)) {
                                this.m_iconSelectedIndex = index;
                                return this.m_iconSelected;
                            }
                            else {
                                return this.m_icon;
                            }
                        }
                        if (index == this.m_iconSelectedIndex)
                            return this.m_iconSelected;
                        return this.m_icon;
                    }
                    else {
                        if (!this.m_iconInstanceOfFunction)
                            this.m_iconInstanceOfFunction = (this.m_iconCallback instanceof Function);
                        if (this.m_iconInstanceOfFunction) {
                            return this.m_iconCallback(index, item);
                        }
                        return this.m_icon;
                    }
                };
                SimpleList.prototype.itemAllSelected = function () {
                    var _this = this;
                    if (!this.multiSelect)
                        return;
                    for (var id in this.m_metadata)
                        this.m_metadata[id].selected = true;
                    this.list.forEach(function (i_item) {
                        _this.selected.emit(_this.m_metadata);
                    });
                };
                SimpleList.prototype.onIconClick = function (event, index) {
                    var _this = this;
                    var self = this;
                    this.m_iconSelectedIndex = index;
                    setTimeout(function () {
                        var match = _.find(self.m_metadata, function (i) { return i.index == index; });
                        _this.iconClicked.emit({
                            item: match,
                            target: event.target,
                            index: index,
                            metadata: _this.m_metadata
                        });
                    }, 1);
                    return true;
                };
                SimpleList.prototype.getMetadata = function (index, item) {
                    var id = this.contentId ? this.contentId(item) : index;
                    return this.m_metadata[id];
                };
                SimpleList.prototype.setContent = function (f) {
                    this.content = f;
                };
                SimpleList.prototype.getContentId = function (item, index) {
                    var id = this.contentId ? this.contentId(item) : index;
                    if (!this.m_metadata[id])
                        this.m_metadata[id] = {};
                    this.m_metadata[id].index = index;
                    return id;
                };
                SimpleList.prototype.getContent = function (item) {
                    if (this.content) {
                        return this.content(item);
                    }
                    else {
                        return item;
                    }
                };
                SimpleList.prototype.deselect = function () {
                    this.itemSelected(null, -1);
                    this.cd.markForCheck();
                };
                SimpleList.prototype.getSelected = function () {
                    if (this.multiSelect)
                        return this.m_metadata;
                    for (var v in this.m_metadata) {
                        if (this.m_metadata[v].selected == true)
                            return this.m_metadata[v];
                    }
                };
                Object.defineProperty(SimpleList.prototype, "selectedIconIndex", {
                    get: function () {
                        return this.m_iconSelectedIndex;
                    },
                    set: function (i_index) {
                        this.m_iconSelectedIndex = i_index;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.ViewChild(SimplelistEditable_1.SimplelistEditable), 
                    __metadata('design:type', SimplelistEditable_1.SimplelistEditable)
                ], SimpleList.prototype, "simpleListEditable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SimpleList.prototype, "list", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SimpleList.prototype, "editable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Function)
                ], SimpleList.prototype, "content", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Function)
                ], SimpleList.prototype, "contentId", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SimpleList.prototype, "multiSelect", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Function)
                ], SimpleList.prototype, "iconSelected", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], SimpleList.prototype, "icon", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Function])
                ], SimpleList.prototype, "iconCallback", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean), 
                    __metadata('design:paramtypes', [Boolean])
                ], SimpleList.prototype, "iconSelectiondMode", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SimpleList.prototype, "hover", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SimpleList.prototype, "iconClicked", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SimpleList.prototype, "itemClicked", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SimpleList.prototype, "selected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SimpleList.prototype, "edited", void 0);
                SimpleList = __decorate([
                    core_1.Component({
                        selector: 'SimpleList',
                        moduleId: __moduleName,
                        template: Simplelist_html_text_1.default,
                        styles: [Simplelist_css_text_1.default],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
                ], SimpleList);
                return SimpleList;
            }());
            exports_1("SimpleList", SimpleList);
        }
    }
});
