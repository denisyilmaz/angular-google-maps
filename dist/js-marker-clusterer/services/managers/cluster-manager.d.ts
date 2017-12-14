import 'js-marker-clusterer';
import { NgZone } from '@angular/core';
import { AgmMarker } from '../../../core/directives/marker';
import { GoogleMapsAPIWrapper } from '../../../core/services/google-maps-api-wrapper';
import { MarkerManager } from '../../../core/services/managers/marker-manager';
import { ClusterOptions } from '../google-clusterer-types';
import { AgmMarkerCluster } from './../../directives/marker-cluster';
export declare class ClusterManager extends MarkerManager {
    protected _mapsWrapper: GoogleMapsAPIWrapper;
    protected _zone: NgZone;
    private _clustererInstance;
    private _resolver;
    constructor(_mapsWrapper: GoogleMapsAPIWrapper, _zone: NgZone);
    init(options: ClusterOptions): void;
    addMarker(marker: AgmMarker): void;
    deleteMarker(marker: AgmMarker): Promise<void>;
    clearMarkers(): Promise<void>;
    setGridSize(c: AgmMarkerCluster): void;
    setMaxZoom(c: AgmMarkerCluster): void;
    setStyles(c: AgmMarkerCluster): void;
    setZoomOnClick(c: AgmMarkerCluster): void;
    setAverageCenter(c: AgmMarkerCluster): void;
    setImagePath(c: AgmMarkerCluster): void;
    setMinimumClusterSize(c: AgmMarkerCluster): void;
    setImageExtension(c: AgmMarkerCluster): void;
}
