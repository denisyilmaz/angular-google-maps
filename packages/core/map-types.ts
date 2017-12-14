import {LatLngLiteral, StreetViewPov} from './services/google-maps-types';

// exported map types
export {DataMouseEvent, KmlMouseEvent, LatLngBounds, LatLngBoundsLiteral, LatLngLiteral, PolyMouseEvent, StreetViewPov} from './services/google-maps-types';

/**
 * MouseEvent gets emitted when the user triggers mouse events on the map.
 */
export interface MouseEvent { coords: LatLngLiteral|StreetViewPov; }
