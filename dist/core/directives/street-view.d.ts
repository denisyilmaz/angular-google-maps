import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { MouseEvent } from '../map-types';
import { LatLngLiteral, StreetViewPov } from '../services/google-maps-types';
import { LatLngBounds, LatLngBoundsLiteral } from '../services/google-maps-types';
import { GoogleStreetViewAPIWrapper } from '../services/google-street-view-api-wrapper';
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
export declare class AgmStreetView implements OnChanges, OnInit, OnDestroy {
    private _elem;
    private _viewsWrapper;
    /**
     * The longitude that defines the center of the map.
     */
    longitude: number;
    /**
     * The latitude that defines the center of the map.
     */
    latitude: number;
    /**
     * the heading that defines the horizontal angle of the view
     */
    heading: number;
    /**
     * the pitch that defins the vetical angle of the view
     */
    pitch: number;
    /**
     * The zoom level of the view. The default zoom level is 0.
     */
    zoom: number;
    /**
     * Enables/disables zoom and center on double click. Enabled by default.
     */
    disableDoubleClickZoom: boolean;
    /**
     * Enables/disables close button.
     */
    enableCloseButton: boolean;
    /**
     * Enables/disables the links control
     * @type {boolean}
     */
    linksControl: boolean;
    /**
     * The options for pan control if it is enabled
     */
    linkControlOptions: any;
    /**
     * Enables/disables the ability to pan the view
     * @type {boolean}
     */
    panControl: boolean;
    /**
     * The options for pan control if it is enabled
     */
    panControlOptions: any;
    /**
     * The enabled/disabled state of the Zoom control.
     * @type {boolean}
     */
    zoomControl: boolean;
    /**
     * The options for zoom control if it is enabled
     */
    zoomControlOptions: any;
    /**
     * Color used for the background of the Map div. This color will be visible when tiles have not
     * yet loaded as the user pans. This option can only be set when the map is initialized.
     */
    backgroundColor: string;
    /**
     * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
     * used to
     * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
     */
    usePanning: boolean;
    /**
     * The initial enabled/disabled state of the Street View Pegman control.
     * This control is part of the default UI, and should be set to false when displaying a map type
     * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
     */
    streetViewControl: boolean;
    /**
     * Sets the viewport to contain the given bounds.
     */
    fitBounds: LatLngBoundsLiteral | LatLngBounds;
    /**
     * The initial enabled/disabled state of the Scale control. This is disabled by default.
     */
    scaleControl: boolean;
    /**
     * The initial enabled/disabled state of the Map type control.
     */
    mapTypeControl: boolean;
    /**
     * Map option attributes that can change over time
     */
    private _observableSubscriptions;
    /**
     * This event emitter gets emitted when the user clicks on the map (but not when they click on a
     * marker or infoWindow).
     */
    mapClick: EventEmitter<MouseEvent>;
    /**
     * This event emitter gets emitted when the user right-clicks on the map (but not when they click
     * on a marker or infoWindow).
     */
    mapRightClick: EventEmitter<MouseEvent>;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     */
    mapDblClick: EventEmitter<MouseEvent>;
    /**
     * This event emitter is fired when the view position changes.
     */
    positionChange: EventEmitter<LatLngLiteral>;
    /**
     * This event is fired when the viewport pov has changed.
     */
    povChange: EventEmitter<StreetViewPov>;
    /**
     * This event is fired when the map becomes idle after panning or zooming.
     */
    idle: EventEmitter<LatLngBounds>;
    /**
     * This event is fired when the zoom level has changed.
     */
    zoomChange: EventEmitter<number>;
    constructor(_elem: ElementRef, _viewsWrapper: GoogleStreetViewAPIWrapper);
    /** @internal */
    ngOnInit(): void;
    private _initMapInstance(el);
    /** @internal */
    ngOnDestroy(): void;
    /** @internal */
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    /**
     * Triggers a resize event on the google map instance.
     * Returns a promise that gets resolved after the event was triggered.
     */
    triggerResize(): Promise<void>;
    private _updatePosition(changes);
    private _updatePov(changes);
    private _handleViewPositionChange();
    private _handleViewPovChange();
    private _handleViewMouseEvents();
}
