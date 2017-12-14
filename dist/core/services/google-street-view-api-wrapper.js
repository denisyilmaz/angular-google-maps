import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
var GoogleStreetViewAPIWrapper = (function () {
    function GoogleStreetViewAPIWrapper(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._view = new Promise(function (resolve) {
            _this._viewResolver = resolve;
        });
    }
    GoogleStreetViewAPIWrapper.prototype.createView = function (el, viewOptions) {
        var _this = this;
        return this._loader.load().then(function () {
            var view = new google.maps.StreetViewPanorama(el, viewOptions);
            _this._viewResolver(view);
            return;
        });
    };
    /**
     * Creates a google map marker with the map context
     */
    GoogleStreetViewAPIWrapper.prototype.createMarker = function (options) {
        if (options === void 0) { options = {}; }
        return this._view.then(function (view) {
            options.map = view;
            return new google.maps.Marker(options);
        });
    };
    GoogleStreetViewAPIWrapper.prototype.createInfoWindow = function (options) {
        return this._view.then(function () {
            return new google.maps.InfoWindow(options);
        });
    };
    /**
     * Creates a google.map.Circle for the current map.
     */
    GoogleStreetViewAPIWrapper.prototype.createCircle = function (options) {
        return this._view.then(function (view) {
            options.map = view;
            return new google.maps.Circle(options);
        });
    };
    GoogleStreetViewAPIWrapper.prototype.createPolyline = function (options) {
        return this.getNativeMap().then(function (map) {
            var line = new google.maps.Polyline(options);
            line.setMap(map);
            return line;
        });
    };
    GoogleStreetViewAPIWrapper.prototype.subscribeToViewEvent = function (eventName) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._view.then(function (m) {
                m.addListener(eventName, function (arg) {
                    _this._zone.run(function () { return observer.next(arg); });
                });
            });
        });
    };
    GoogleStreetViewAPIWrapper.prototype.getLinks = function () {
        return this._view.then(function (view) { return view.getLinks(); });
    };
    GoogleStreetViewAPIWrapper.prototype.getPano = function () {
        return this._view.then(function (view) { return view.getPano(); });
    };
    GoogleStreetViewAPIWrapper.prototype.setPano = function (pano) {
        return this._view.then(function (view) { return view.setPano(pano); });
    };
    GoogleStreetViewAPIWrapper.prototype.getPosition = function () {
        return this._view.then(function (map) { return map.getPosition(); });
    };
    GoogleStreetViewAPIWrapper.prototype.setPosition = function (latLng) {
        return this._view.then(function (view) { return view.setPosition(latLng); });
    };
    GoogleStreetViewAPIWrapper.prototype.getPov = function () {
        return this._view.then(function (view) { return view.getPov(); });
    };
    GoogleStreetViewAPIWrapper.prototype.setPov = function (pov) {
        return this._view.then(function (view) { return view.setPov(pov); });
    };
    GoogleStreetViewAPIWrapper.prototype.getVisible = function () {
        return this._view.then(function (view) { return view.getVisible(); });
    };
    GoogleStreetViewAPIWrapper.prototype.setVisible = function (visible) {
        return this._view.then(function (view) { return view.setVisible(visible); });
    };
    GoogleStreetViewAPIWrapper.prototype.addCloseClickHandler = function (handler) {
        return this._view.then(function (view) { return view.addCloseClickHandler(handler); });
    };
    GoogleStreetViewAPIWrapper.prototype.addLinksChangeHandler = function (handler) {
        return this._view.then(function (view) { return view.addLinksChangeHandler(handler); });
    };
    GoogleStreetViewAPIWrapper.prototype.addPanoChangeHandler = function (handler) {
        return this._view.then(function (view) { return view.addPanoChangeHandler(handler); });
    };
    GoogleStreetViewAPIWrapper.prototype.addPositionChangeHandler = function (handler) {
        return this._view.then(function (view) { return view.addPositionChangeHandler(handler); });
    };
    GoogleStreetViewAPIWrapper.prototype.addPovChangeHandler = function (handler) {
        return this._view.then(function (view) { return view.addPovChangeHandler(handler); });
    };
    GoogleStreetViewAPIWrapper.prototype.addVisibleChangeHandler = function (handler) {
        return this._view.then(function (view) { return view.addVisibleChangeHandler(handler); });
    };
    /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     */
    GoogleStreetViewAPIWrapper.prototype.getNativeMap = function () {
        return this._view;
    };
    /**
     * Triggers the given event name on the map instance.
     */
    GoogleStreetViewAPIWrapper.prototype.triggerMapEvent = function (eventName) {
        return this._view.then(function (m) { return google.maps.event.trigger(m, eventName); });
    };
    return GoogleStreetViewAPIWrapper;
}());
export { GoogleStreetViewAPIWrapper };
GoogleStreetViewAPIWrapper.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleStreetViewAPIWrapper.ctorParameters = function () { return [
    { type: MapsAPILoader, },
    { type: NgZone, },
]; };
//# sourceMappingURL=google-street-view-api-wrapper.js.map