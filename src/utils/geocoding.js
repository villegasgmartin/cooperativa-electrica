// Geocodificación sin costo ni API key.
// - Calles (sin altura): listado de Georef (Gobierno de Argentina) del partido de
//   General Pueyrredón, descargado una vez y filtrado localmente.
// - Calle + altura: Photon (photon.komoot.io, datos © OpenStreetMap), que ubica la
//   altura con precisión. Si no encuentra, respaldo con Georef /direcciones.

const GEOREF = 'https://apis.datos.gob.ar/georef/api/v2.0';
const PROVINCIA = '06'; // Buenos Aires
const DEPARTAMENTO = 'General Pueyrredón';
const CACHE_KEY = 'georef_calles_gral_pueyrredon_v3';
const PHOTON = 'https://photon.komoot.io/api/';
const MDP_BBOX = '-57.75,-38.15,-57.45,-37.85';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 días

export const normalizarTexto = (s) =>
    (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/\s+/g, ' ').trim();

const titleCase = (s) =>
    (s || '').toLowerCase().replace(/(^|[\s.(-])([a-záéíóúñü])/g, (m, p, c) => p + c.toUpperCase());

export const formatearCalle = (nombre) => {
    const m = (nombre || '').match(/^\s*(C|CALLE|AV|DIAG|BV|PJE|PASAJE)\.?\s*\d+[A-Z]?(?:\s*BIS)?\s*-?\s+(\D.*)$/i);
    if (!m) return titleCase(nombre);
    const tipo = m[1].toUpperCase();
    const prefijo = tipo === 'AV' ? 'Av. ' : tipo === 'DIAG' ? 'Diag. ' : tipo === 'BV' ? 'Bv. ' : '';
    return prefijo + titleCase(m[2]);
};

export const formatearDireccion = (calleNombre, altura, localidad = 'Mar del Plata') =>
    `${formatearCalle(calleNombre)} ${altura}, ${localidad}, Buenos Aires`;

// Separa "Falucho 3212" en { calle: 'Falucho', altura: '3212' }
export const separarAltura = (texto) => {
    const m = (texto || '').trim().match(/^(.*\D)\s+(\d{1,5})$/);
    return m ? { calle: m[1].trim(), altura: m[2] } : { calle: (texto || '').trim(), altura: '' };
};

// Respaldo: Georef /direcciones
const buscarGeoref = async (texto, signal) => {
    const params = new URLSearchParams({
        direccion: (() => { const { calle, altura } = separarAltura(texto); return `${normalizarTexto(calle).replace(/^AV\.? /, '')} ${altura}`; })(),
        provincia: PROVINCIA,
        departamento: DEPARTAMENTO,
        max: '6',
    });
    const res = await fetch(`${GEOREF}/direcciones?${params}`, { signal });
    if (!res.ok) throw new Error(`Georef /direcciones ${res.status}`);
    const data = await res.json();
    const vistos = new Set();
    return (data.direcciones || [])
        .filter((d) => d.ubicacion?.lat && d.ubicacion?.lon && d.calle?.nombre && d.altura?.valor)
        .map((d) => {
            const localidad = formatearCalle(d.localidad_censal?.nombre || 'Mar del Plata');
            return {
                tipo: 'direccion',
                calle: { nombre: d.calle.nombre },
                altura: String(d.altura.valor),
                localidad,
                latitude: d.ubicacion.lat,
                longitude: d.ubicacion.lon,
                label: `${formatearCalle(d.calle.nombre)} ${d.altura.valor}`,
                detalle: `${localidad}, Buenos Aires`,
            };
        })
        .filter((o) => {
            const k = `${o.label}|${o.localidad}`;
            if (vistos.has(k)) return false;
            vistos.add(k);
            return true;
        });
};

let callesCache = null;
let callesPromise = null;

const leerCache = () => {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const { ts, calles } = JSON.parse(raw);
        if (Date.now() - ts > CACHE_TTL || !Array.isArray(calles) || !calles.length) return null;
        return calles;
    } catch {
        return null;
    }
};

const guardarCache = (calles) => {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), calles }));
    } catch {
        /* sin storage: se vuelve a descargar en la próxima carga */
    }
};

const descargarCalles = async () => {
    const todas = [];
    let inicio = 0;
    let total = Infinity;

    while (inicio < total) {
        const params = new URLSearchParams({
            provincia: PROVINCIA,
            departamento: DEPARTAMENTO,
            campos: 'id,nombre,categoria,localidad_censal.nombre',
            max: '5000',
            inicio: String(inicio),
        });
        let res = await fetch(`${GEOREF}/calles?${params}`);
        if (!res.ok && params.get('campos').includes('localidad')) {
            params.set('campos', 'id,nombre,categoria');
            res = await fetch(`${GEOREF}/calles?${params}`);
        }
        if (!res.ok) throw new Error(`Georef /calles ${res.status}`);
        const data = await res.json();
        todas.push(...(data.calles || []));
        total = data.total ?? todas.length;
        if (!data.cantidad) break;
        inicio += data.cantidad;
    }

    // Una opción por nombre de calle (Georef devuelve tramos/ids repetidos)
    const porNombre = new Map();
    todas.forEach((c) => {
        const key = normalizarTexto(formatearCalle(c.nombre));
        const localidad = formatearCalle(c.localidad_censal?.nombre || 'Mar del Plata');
        const id = `${key}|${normalizarTexto(localidad)}`;
        if (key && !porNombre.has(id)) {
            porNombre.set(id, { id: c.id, nombre: c.nombre, label: formatearCalle(c.nombre), localidad, key });
        }
    });
    return [...porNombre.values()].sort((a, b) => a.label.localeCompare(b.label, 'es'));
};

// Listado de calles del partido (cacheado en memoria y localStorage)
export const cargarCalles = async () => {
    if (callesCache) return callesCache;
    const cache = leerCache();
    if (cache) return (callesCache = cache);
    if (!callesPromise) {
        callesPromise = descargarCalles()
            .then((calles) => {
                callesCache = calles;
                guardarCache(calles);
                return calles;
            })
            .finally(() => {
                callesPromise = null;
            });
    }
    return callesPromise;
};

// Filtro local para el autocompletado (sin acentos, por palabras)
export const filtrarCalles = (calles, input, limite = 30) => {
    const q = normalizarTexto(input);
    if (q.length < 2) return [];
    const palabras = q.split(' ');
    const empiezan = [];
    const contienen = [];
    for (const c of calles) {
        if (!palabras.every((p) => c.key.includes(p))) continue;
        (c.key.startsWith(q) || c.key.split(' ').some((w) => w.startsWith(palabras[0])) ? empiezan : contienen).push(c);
        if (empiezan.length >= limite) break;
    }
    return [...empiezan, ...contienen].slice(0, limite);
};

const buscarPhoton = async (texto, signal) => {
    const { calle, altura } = separarAltura(texto);
    if (!altura) return [];
    const params = new URLSearchParams({
        q: `${calle} ${altura} Mar del Plata`,
        lat: '-38.0',
        lon: '-57.56',
        bbox: MDP_BBOX,
        limit: '6',
    });
    const res = await fetch(`${PHOTON}?${params}`, { signal });
    if (!res.ok) throw new Error(`Photon ${res.status}`);
    const data = await res.json();
    const vistos = new Set();
    return (data.features || [])
        .map((f) => {
            const p = f.properties || {};
            const calleNombre = p.street || (p.type === 'street' ? p.name : null);
            const numero = (p.housenumber || '').replace(/\D/g, '');
            if (!calleNombre || numero !== altura) return null;
            const [lon, lat] = f.geometry.coordinates;
            const localidad = p.city || p.locality || 'Mar del Plata';
            return {
                tipo: 'direccion',
                calle: { nombre: calleNombre },
                altura: numero,
                localidad,
                latitude: lat,
                longitude: lon,
                label: `${calleNombre} ${numero}`,
                detalle: [p.district, localidad].filter(Boolean).join(', '),
            };
        })
        .filter((o) => {
            if (!o) return false;
            const k = normalizarTexto(o.label);
            if (vistos.has(k)) return false;
            vistos.add(k);
            return true;
        });
};

// Sugerencias de direcciones completas (calle + altura) para el autocompletado
export const buscarDirecciones = async (texto, signal) => {
    try {
        const photon = await buscarPhoton(texto, signal);
        if (photon.length) return photon;
    } catch (e) {
        if (e.name === 'AbortError') throw e;
        console.warn('Photon no disponible, uso Georef:', e);
    }
    return buscarGeoref(texto, signal);
};

// Coordenadas de calle + altura. Devuelve null si Georef no puede ubicarla.
export const geocodificarDireccion = async ({ calle, altura, latitude, longitude }) => {
    if (latitude && longitude) {
        return { latitude, longitude, calle: calle.nombre, altura: Number(altura) };
    }
    const params = new URLSearchParams({
        direccion: `${calle.nombre} ${altura}`,
        provincia: PROVINCIA,
        departamento: DEPARTAMENTO,
        max: '1',
    });
    const res = await fetch(`${GEOREF}/direcciones?${params}`);
    if (!res.ok) throw new Error(`Georef /direcciones ${res.status}`);
    const data = await res.json();
    const d = data.direcciones?.[0];

    if (!d?.ubicacion?.lat || !d?.ubicacion?.lon) return null;
    if (d.calle?.nombre && normalizarTexto(d.calle.nombre) !== normalizarTexto(calle.nombre)) return null;

    return {
        latitude: d.ubicacion.lat,
        longitude: d.ubicacion.lon,
        calle: d.calle?.nombre || calle.nombre,
        altura: Number(d.altura?.valor ?? altura),
        address: d.nomenclatura,
    };
};

// Excepción de cobertura: España entre 2200 y 3900
export const esZonaEspana = ({ calle, altura }) => {
    const palabras = normalizarTexto(calle).split(' ');
    return palabras.includes('ESPANA') && altura > 2200 && altura < 3900;
};
