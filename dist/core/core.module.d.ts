import { ModuleWithProviders } from '@angular/core';
import { AgmCircle } from './directives/circle';
import { AgmDataLayer } from './directives/data-layer';
import { AgmInfoWindow } from './directives/info-window';
import { AgmKmlLayer } from './directives/kml-layer';
import { AgmMap } from './directives/map';
import { AgmMarker } from './directives/marker';
import { AgmPolygon } from './directives/polygon';
import { AgmPolyline } from './directives/polyline';
import { AgmPolylinePoint } from './directives/polyline-point';
import { AgmStreetView } from './directives/street-view';
import { LazyMapsAPILoaderConfigLiteral } from './services/maps-api-loader/lazy-maps-api-loader';
/**
 * @internal
 */
export declare function coreDirectives(): (typeof AgmCircle | typeof AgmDataLayer | typeof AgmMarker | typeof AgmInfoWindow | typeof AgmKmlLayer | typeof AgmPolygon | typeof AgmPolylinePoint | typeof AgmPolyline | typeof AgmMap | typeof AgmStreetView)[];
/**
 * The angular-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
export declare class AgmCoreModule {
    /**
     * Please use this method when you register the module at the root level.
     */
    static forRoot(lazyMapsAPILoaderConfig?: LazyMapsAPILoaderConfigLiteral): ModuleWithProviders;
}
