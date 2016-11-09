System.register(["@angular/core", "../../simplegridmodule/SimpleGridTable"], function(exports_1, context_1) {
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
    var core_1, SimpleGridTable_1;
    var StationsGrid;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (SimpleGridTable_1_1) {
                SimpleGridTable_1 = SimpleGridTable_1_1;
            }],
        execute: function() {
            StationsGrid = (function () {
                function StationsGrid() {
                    this.onStationSelected = new core_1.EventEmitter();
                    this.sort = {
                        field: null,
                        desc: false
                    };
                }
                Object.defineProperty(StationsGrid.prototype, "stations", {
                    set: function (i_stations) {
                        this.m_stations = i_stations;
                    },
                    enumerable: true,
                    configurable: true
                });
                StationsGrid.prototype.onDoubleClicked = function (event) {
                    this.launchStationModal(event.item);
                };
                StationsGrid.prototype.launchStationModal = function (i_stationModel) {
                    if (!i_stationModel)
                        i_stationModel = this.selectedStation();
                    this.onStationSelected.emit(i_stationModel);
                };
                StationsGrid.prototype.selectedStation = function () {
                    if (!this.simpleGridTable)
                        return null;
                    var selected = this.simpleGridTable.getSelected();
                    return selected ? this.simpleGridTable.getSelected().item : '';
                };
                StationsGrid.prototype.onSelectStation = function (event) {
                };
                __decorate([
                    core_1.ViewChild(SimpleGridTable_1.SimpleGridTable), 
                    __metadata('design:type', SimpleGridTable_1.SimpleGridTable)
                ], StationsGrid.prototype, "simpleGridTable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], StationsGrid.prototype, "stations", null);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], StationsGrid.prototype, "onStationSelected", void 0);
                StationsGrid = __decorate([
                    core_1.Component({
                        selector: 'stationsGrid',
                        styles: ["\n            .disabled {\n               opacity: 0.2;\n               cursor: default;\n             }\n            .stationProps {\n               position: relative;\n                top: -14px;\n                color: #222222;\n                left: 2px;\n                font-size: 1.2em;\n             }\n        "],
                        template: "\n        <div class=\"row\">\n             <div class=\"col-xs-12\">\n                <div (click)=\"$event.preventDefault()\" style=\"position: relative; top: 10px\">\n                    <div>\n                      <a class=\"btns stationProps\" href=\"#\" \n                        (click)=\"!userSimpleGridTable || userSimpleGridTable.getSelected() == null ? '' : launchStationModal()\" \n                        [ngClass]=\"{disabled: !userSimpleGridTable || userSimpleGridTable.getSelected() == null}\" href=\"#\">\n                        <span class=\"fa fa-cogs\"></span>\n                      </a>\n                    </div>\n                </div>\n                  <simpleGridTable #userSimpleGridTable>\n                    <thead>\n                    <tr>\n                      <th sortableHeader=\"connection\" [sort]=\"sort\">connection</th>\n                      <th sortableHeader=\"watchDogConnection\" [sort]=\"sort\">watchdog</th>\n                      <th sortableHeader=\"name\" [sort]=\"sort\">name</th>\n                      <th sortableHeader=\"businessId\" [sort]=\"sort\">business</th>\n                      <th sortableHeader=\"os\" [sort]=\"sort\">os</th>\n                      <th sortableHeader=\"status\" [sort]=\"sort\">status</th>                      \n                      <th sortableHeader=\"runningTime\" [sort]=\"sort\">running</th>\n                      <th sortableHeader=\"totalMemory\" [sort]=\"sort\">totalMem</th>\n                      <th sortableHeader=\"peakMemory\" [sort]=\"sort\">peakMem</th>\n                      <th sortableHeader=\"airVersion\" [sort]=\"sort\">runtime</th>\n                      <th sortableHeader=\"appVersion\" [sort]=\"sort\">version</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <tr class=\"simpleGridRecord\" (onDoubleClicked)=\"onDoubleClicked($event)\" simpleGridRecord *ngFor=\"let item of m_stations | OrderBy:sort.field:sort.desc; let index=index\" [item]=\"item\" [index]=\"index\">\n                      <td style=\"width: 5%\" simpleGridDataImage [color]=\"item.getConnectionIcon('color')\" [field]=\"item.getConnectionIcon('icon')\" [item]=\"item\"></td>\n                      <td style=\"width: 5%\" simpleGridDataImage color=\"dodgerblue\" [field]=\"item.getWatchDogConnection()\" [item]=\"item\"></td>\n                      <td style=\"width: 25%\" simpleGridData editable=\"false\" field=\"name\" [item]=\"item\"></td>\n                      <td style=\"width: 5%\" simpleGridData editable=\"false\" field=\"businessId\" [item]=\"item\"></td>\n                      <td style=\"width: 20%\" simpleGridData editable=\"false\" field=\"os\" [item]=\"item\"></td>\n                      <td style=\"width: 10%\" simpleGridData editable=\"false\" field=\"status\" [item]=\"item\"></td>                      \n                      <td style=\"width: 5%\" simpleGridData editable=\"false\" field=\"runningTime\" [item]=\"item\"></td>\n                      <td style=\"width: 5%\" simpleGridData editable=\"false\" field=\"totalMemory\" [item]=\"item\"></td>\n                      <td style=\"width: 5%\" simpleGridData editable=\"false\" field=\"peakMemory\" [item]=\"item\"></td>\n                      <td style=\"width: 10%\" simpleGridData editable=\"false\" field=\"airVersion\" [item]=\"item\"></td>\n                      <td style=\"width: 5%\" simpleGridData editable=\"false\" field=\"appVersion\" [item]=\"item\"></td>\n                    </tr>\n                    </tbody>\n                  </simpleGridTable>\n             </div>\n        </div>\n    ",
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [])
                ], StationsGrid);
                return StationsGrid;
            }());
            exports_1("StationsGrid", StationsGrid);
        }
    }
});
