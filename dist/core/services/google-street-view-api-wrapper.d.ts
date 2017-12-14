import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as mapTypes from './google-maps-types';
import { Polyline } from './google-maps-types';
import { PolylineOptions } from './google-maps-types';
import { Handler } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
export declare class GoogleStreetViewAPIWrapper {
    private _loader;
    private _zone;
    private _view;
    private _viewResolver;
    constructor(_loader: MapsAPILoader, _zone: NgZone);
    createView(el: HTMLElement, viewOptions: mapTypes.StreetViewPanoramaOptions): Promise<void>;
    /**
     * Creates a google map marker with the map context
     */
    createMarker(options?: mapTypes.MarkerOptions): Promise<mapTypes.Marker>;
    createInfoWindow(options?: mapTypes.InfoWindowOptions): Promise<mapTypes.InfoWindow>;
    /**
     * Creates a google.map.Circle for the current map.
     */
    createCircle(options: mapTypes.CircleOptions): Promise<mapTypes.Circle>;
    createPolyline(options: PolylineOptions): Promise<Polyline>;
    subscribeToViewEvent<E>(eventName: string): Observable<E>;
    getLinks(): Promise<Array<string>>;
    getPano(): Promise<string>;
    setPano(pano: string): Promise<void>;
    getPosition(): Promise<mapTypes.LatLng>;
    setPosition(latLng: mapTypes.LatLngLiteral): Promise<void>;
    getPov(): Promise<mapTypes.StreetViewPov>;
    setPov(pov: mapTypes.StreetViewPov | mapTypes.StreetViewPov): Promise<void>;
    getVisible(): Promise<boolean>;
    setVisible(visible: boolean): Promise<void>;
    addCloseClickHandler(handler: Handler): Promise<void>;
    addLinksChangeHandler(handler: Handler): Promise<void>;
    addPanoChangeHandler(handler: Handler): Promise<void>;
    addPositionChangeHandler(handler: Handler): Promise<void>;
    addPovChangeHandler(handler: Handler): Promise<void>;
    addVisibleChangeHandler(handler: Handler): Promise<void>;
    /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     */
    getNativeMap(): Promise<mapTypes.GoogleStreetViewPanorama>;
    /**
     * Triggers the given event name on the map instance.
     */
    triggerMapEvent(eventName: string): Promise<void>;
}
