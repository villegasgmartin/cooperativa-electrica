// Geocodificación de direcciones para validación de cobertura.
// Prioriza las coordenadas del lugar elegido en Google Places Autocomplete
// (exactas). El Geocoding API por texto queda solo como fallback y rechaza
// resultados imprecisos (centroide de ciudad, código postal, calle sin altura).

const API_KEY = 'AIzaSyDnG7odirzcO_xm7R1EIxf1a7Dhi2OflDU';

export const PLACE_FIELDS = ['formatted_address', 'name', 'geometry', 'address_components'];

const TIPOS_PRECISOS = ['street_address', 'premise', 'subpremise'];

const getComponent = (components = [], type) =>
    components.find((c) => c.types?.includes(type));

const getCity = (components) =>
    getComponent(components, 'locality') ||
    getComponent(components, 'administrative_area_level_2') ||
    null;

const readLatLng = (location) => ({
    latitude: typeof location.lat === 'function' ? location.lat() : parseFloat(location.lat),
    longitude: typeof location.lng === 'function' ? location.lng() : parseFloat(location.lng),
});

// Coordenadas a partir de autocomplete.getPlace()
export const coordsFromPlace = (place) => {
    if (!place?.geometry?.location) return null;
    return {
        ...readLatLng(place.geometry.location),
        city: getCity(place.address_components),
        address: place.formatted_address || place.name || '',
        precise: Boolean(getComponent(place.address_components, 'street_number')),
    };
};

// Quita el CPA argentino (ej. "B7600FRN") que confunde al geocoder
const limpiarDireccion = (address) =>
    address.replace(/\b[A-Z]\d{4}[A-Z]{3}\b\s*/g, '').replace(/\s{2,}/g, ' ').trim();

// Fallback: geocodifica texto libre, sesgado a Mar del Plata
export const getCoordinates = async (address) => {
    const params = new URLSearchParams({
        address: limpiarDireccion(address),
        components: 'country:AR',
        region: 'ar',
        language: 'es',
        key: API_KEY,
    });

    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`);
        const data = await response.json();

        if (data.status !== 'OK' || !data.results?.length) {
            console.error('Error en la geocodificación:', data.status);
            return null;
        }

        const result =
            data.results.find((r) => r.types.some((t) => TIPOS_PRECISOS.includes(t))) ||
            data.results[0];

        const precise =
            result.types.some((t) => TIPOS_PRECISOS.includes(t)) &&
            result.geometry.location_type !== 'APPROXIMATE';

        return {
            ...readLatLng(result.geometry.location),
            city: getCity(result.address_components),
            address: result.formatted_address,
            precise,
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return null;
    }
};

// Resuelve coordenadas: primero las del lugar seleccionado, si no, geocoding
export const resolverCoordenadas = async (place, direccion) => {
    const desdePlace = coordsFromPlace(place);
    if (desdePlace && desdePlace.address === direccion) return desdePlace;
    return getCoordinates(direccion);
};
