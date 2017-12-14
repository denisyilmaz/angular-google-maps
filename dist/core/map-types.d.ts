import { LatLngLiteral, StreetViewPov } from './services/google-maps-types';
export { KmlMouseEvent, DataMouseEvent, LatLngBounds, LatLngBoundsLiteral, LatLngLiteral, StreetViewPov, PolyMouseEvent } from './services/google-maps-types';
/**
 * MouseEvent gets emitted when the user triggers mouse events on the map.
 */
export interface MouseEvent {
    coords: LatLngLiteral | StreetViewPov;
}
