System.register(['immutable', "./StationsAction", "./StationModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var immutable_1, StationsAction, StationModel_1;
    function stations(state, action) {
        if (state === void 0) { state = immutable_1.Map(); }
        function indexOfStation(businessId, stationId) {
            return stations.findIndex(function (i) {
                return i.getKey('businessId') === businessId && i.getKey('id') == stationId;
            });
        }
        switch (action.type) {
            case StationsAction.RECEIVE_STATIONS:
                return state.update(action.source, function (value) { return action.stations; });
            case StationsAction.RECEIVE_STATIONS_GEO:
                for (var i in action.payload) {
                    var station = action.payload[i];
                    var source = station.source;
                    var stations = state.get(source);
                    stations = stations.update(indexOfStation(station.businessId, station.id), function (i_station) {
                        return i_station.setKey(StationModel_1.StationModel, 'geoLocation', {
                            lat: station.lat,
                            lon: station.lon,
                            city: station.city,
                            country: station.country
                        });
                    });
                    state = state.setIn([source], stations);
                }
                return state;
            default:
                return state;
        }
    }
    exports_1("stations", stations);
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            },
            function (StationsAction_1) {
                StationsAction = StationsAction_1;
            },
            function (StationModel_1_1) {
                StationModel_1 = StationModel_1_1;
            }],
        execute: function() {
        }
    }
});
