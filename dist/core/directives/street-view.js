import { Component, ElementRef, EventEmitter } from '@angular/core';
import { GoogleStreetViewAPIWrapper } from '../services/google-street-view-api-wrapper';
import { CircleManager } from '../services/managers/circle-manager';
import { InfoWindowManager } from '../services/managers/info-window-manager';
import { MarkerManager } from '../services/managers/marker-manager';
import { PolylineManager } from '../services/managers/polyline-manager';
/**
 * SebMGoogleMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
 * class `sebm-google-map-container`.
 *
 * ### Example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {SebmGoogleMap} from 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
var AgmStreetView = (function () {
    function AgmStreetView(_elem, _viewsWrapper) {
        this._elem = _elem;
        this._viewsWrapper = _viewsWrapper;
        /**
         * The longitude that defines the center of the map.
         */
        this.longitude = 0;
        /**
         * The latitude that defines the center of the map.
         */
        this.latitude = 0;
        /**
         * the heading that defines the horizontal angle of the view
         */
        this.heading = 0;
        /**
         * the pitch that defins the vetical angle of the view
         */
        this.pitch = 0;
        /**
         * The zoom level of the view. The default zoom level is 0.
         */
        this.zoom = 0;
        /**
         * Enables/disables zoom and center on double click. Enabled by default.
         */
        this.disableDoubleClickZoom = false;
        /**
         * Enables/disables all default UI of the Google map. Please note: When the map is created, this
         * value cannot get updated.
         */
        this.disableDefaultUI = false;
        /**
         * Enables/disables close button.
         */
        this.enableCloseButton = true;
        /**
         * Enables/disables the links control
         * @type {boolean}
         */
        this.linksControl = true;
        /**
         * The options for pan control if it is enabled
         */
        this.linkControlOptions = null;
        /**
         * Enables/disables the ability to pan the view
         * @type {boolean}
         */
        this.panControl = true;
        /**
         * The options for pan control if it is enabled
         */
        this.panControlOptions = null;
        /**
         * The enabled/disabled state of the Zoom control.
         * @type {boolean}
         */
        this.zoomControl = true;
        /**
         * The options for zoom control if it is enabled
         */
        this.zoomControlOptions = null;
        /**
         * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
         * used to
         * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
         */
        this.usePanning = false;
        /**
         * The initial enabled/disabled state of the Street View Pegman control.
         * This control is part of the default UI, and should be set to false when displaying a map type
         * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
         */
        this.streetViewControl = true;
        /**
         * Sets the viewport to contain the given bounds.
         */
        this.fitBounds = null;
        /**
         * The initial enabled/disabled state of the Scale control. This is disabled by default.
         */
        this.scaleControl = false;
        /**
         * The initial enabled/disabled state of the Map type control.
         */
        this.mapTypeControl = false;
        /**
         * Map option attributes that can change over time
         */
        // private static _mapOptionsAttributes: string[] = [
        //   'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
        //   'keyboardShortcuts', 'zoomControl', 'styles', 'streetViewControl', 'zoom', 'mapTypeControl'
        // ];
        this._observableSubscriptions = [];
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         */
        this.mapClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new EventEmitter();
        /**
         * This event emitter is fired when the view position changes.
         */
        this.positionChange = new EventEmitter();
        /**
         * This event is fired when the viewport pov has changed.
         */
        this.povChange = new EventEmitter();
        /**
         * This event is fired when the map becomes idle after panning or zooming.
         */
        this.idle = new EventEmitter();
        /**
         * This event is fired when the zoom level has changed.
         */
        this.zoomChange = new EventEmitter();
    }
    /** @internal */
    AgmStreetView.prototype.ngOnInit = function () {
        // todo: this should be solved with a new component and a viewChild decorator
        var container = this._elem.nativeElement.querySelector('.agm-street-view-container-inner');
        this._initMapInstance(container);
    };
    AgmStreetView.prototype._initMapInstance = function (el) {
        this._viewsWrapper.createView(el, {
            position: { lat: this.latitude || 0, lng: this.longitude || 0 },
            pov: { heading: this.heading || 0, pitch: this.pitch || 0, zoom: this.zoom || 0 },
            backgroundColor: this.backgroundColor,
            enableCloseButton: this.enableCloseButton,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            disableDefaultUI: this.disableDefaultUI,
            panControl: this.panControl,
            zoomControl: this.zoomControl,
            zoomControlOptions: this.zoomControlOptions,
            linksControl: this.linksControl,
            scaleControl: this.scaleControl,
            mapTypeControl: this.mapTypeControl
        });
        // register event listeners
        this._handleViewPositionChange();
        this._handleViewPovChange();
        this._handleViewMouseEvents();
        // this._handleIdleEvent();
    };
    /** @internal */
    AgmStreetView.prototype.ngOnDestroy = function () {
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /** @internal */
    AgmStreetView.prototype.ngOnChanges = function (changes) {
        // this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
        this._updatePov(changes);
    };
    // private _updateMapOptionsChanges(changes: {[propName: string]: SimpleChange}) {
    //   let options: {[propName: string]: any} = {};
    //   let optionKeys =
    //       Object.keys(changes).filter(k => SebmGoogleStreetView._mapOptionsAttributes.indexOf(k)
    //       !== -1);
    //   optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
    //   this._viewWrapper.setMapOptions(options);
    // }
    /**
     * Triggers a resize event on the google map instance.
     * Returns a promise that gets resolved after the event was triggered.
     */
    AgmStreetView.prototype.triggerResize = function () {
        var _this = this;
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise(function (resolve) {
            setTimeout(function () {
                return _this._viewsWrapper.triggerMapEvent('resize').then(function () { return resolve(); });
            });
        });
    };
    AgmStreetView.prototype._updatePosition = function (changes) {
        if (changes['latitude'] == null && changes['longitude'] == null) {
            // no position update needed
            return;
        }
        // // we prefer fitBounds in changes
        // if (changes['fitBounds'] && this.fitBounds != null) {
        //   this._fitBounds();
        //   return;
        // }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        var newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        this._viewsWrapper.setPosition(newCenter);
    };
    AgmStreetView.prototype._updatePov = function (changes) {
        if (changes['heading'] == null && changes['pitch'] == null) {
            // no povupdate needed
            return;
        }
        if (typeof this.pitch !== 'number' || typeof this.heading !== 'number') {
            return;
        }
        var newPov = { heading: this.heading, pitch: this.pitch, zoom: this.zoom };
        this._viewsWrapper.setPov(newPov);
    };
    // private _fitBounds() {
    //   if (this.usePanning) {
    //     this._mapsWrapper.panToBounds(this.fitBounds);
    //     return;
    //   }
    //   this._mapsWrapper.fitBounds(this.fitBounds);
    // }
    AgmStreetView.prototype._handleViewPositionChange = function () {
        var _this = this;
        var s = this._viewsWrapper.subscribeToViewEvent('position_changed').subscribe(function () {
            _this._viewsWrapper.getPosition().then(function (position) {
                _this.latitude = position.lat();
                _this.longitude = position.lng();
                _this.positionChange.emit({ lat: _this.latitude, lng: _this.longitude });
            });
        });
        this._observableSubscriptions.push(s);
    };
    AgmStreetView.prototype._handleViewPovChange = function () {
        var _this = this;
        var s = this._viewsWrapper.subscribeToViewEvent('pov_changed').subscribe(function () {
            _this._viewsWrapper.getPov().then(function (pov) {
                _this.heading = pov.heading;
                _this.pitch = pov.pitch;
                _this.zoom = pov.zoom;
                _this.povChange.emit({ heading: _this.heading, pitch: _this.pitch, zoom: _this.zoom });
            });
        });
        this._observableSubscriptions.push(s);
    };
    // private _handleBoundsChange() {
    //   const s = this._mapsWrapper.subscribeToMapEvent<void>('bounds_changed').subscribe(() => {
    //     this._mapsWrapper.getBounds().then(
    //         (bounds: LatLngBounds) => { this.boundsChange.emit(bounds); });
    //   });
    //   this._observableSubscriptions.push(s);
    // }
    //
    // private _handleMapZoomChange() {
    //   const s = this._mapsWrapper.subscribeToMapEvent<void>('zoom_changed').subscribe(() => {
    //     this._mapsWrapper.getZoom().then((z: number) => {
    //       this.zoom = z;
    //       this.zoomChange.emit(z);
    //     });
    //   });
    //   this._observableSubscriptions.push(s);
    // }
    // private _handleIdleEvent() {
    //   const s = this._mapsWrapper.subscribeToMapEvent<void>('idle').subscribe(() => {
    //     this._mapsWrapper.getBounds().then(
    //       (bounds: LatLngBounds) => { this.idle.emit(bounds); });
    //   });
    //   this._observableSubscriptions.push(s);
    // }
    AgmStreetView.prototype._handleViewMouseEvents = function () {
        var _this = this;
        var events = [
            { name: 'click', emitter: this.mapClick },
            { name: 'rightclick', emitter: this.mapRightClick },
        ];
        events.forEach(function (e) {
            var s = _this._viewsWrapper.subscribeToViewEvent(e.name).subscribe(function (event) {
                var value = {
                    coords: { heading: event.pov.heading, pitch: event.pov.pitch, zoom: event.pov.zoom }
                };
                e.emitter.emit(value);
            });
            _this._observableSubscriptions.push(s);
        });
    };
    return AgmStreetView;
}());
export { AgmStreetView };
AgmStreetView.decorators = [
    { type: Component, args: [{
                selector: 'agm-google-street-view',
                providers: [
                    GoogleStreetViewAPIWrapper, MarkerManager, InfoWindowManager, CircleManager, PolylineManager
                ],
                inputs: [
                    'longitude',
                    'latitude',
                    'heading',
                    'pitch',
                    'zoom',
                    'draggable: mapDraggable',
                    'disableDoubleClickZoom',
                    'disableDefaultUI',
                    'backgroundColor',
                    'zoomControl',
                ],
                outputs: ['mapClick', 'mapRightClick', 'mapDblClick', 'positionChange', 'povChange', 'idle'],
                host: { '[class.agm-street-view]': 'true' },
                styles: ["\n    .agm-street-view-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .agm-street-view-content {\n      display:none;\n    }\n  "],
                template: "\n    <div class='agm-street-view-container-inner sebm-google-street-view-container-inner'></div>\n    <div class='agm-street-view-content'>\n      <ng-content></ng-content>\n    </div>\n  "
            },] },
];
/** @nocollapse */
AgmStreetView.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: GoogleStreetViewAPIWrapper, },
]; };
//# sourceMappingURL=street-view.js.map