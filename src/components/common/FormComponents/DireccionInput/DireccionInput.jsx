import { useEffect, useRef, useState } from 'react';
import { Autocomplete, TextField, CircularProgress, Box, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { cargarCalles, filtrarCalles, separarAltura, buscarDirecciones } from '../../../../utils/geocoding';

// Campo único de dirección con autocompletado (Georef, sin costo).
// - Sin número: sugiere calles del partido → al elegir una, queda "Calle " para tipear la altura.
// - Con número: sugiere direcciones completas con localidad y coordenadas.
// Controlado: value = selección | null ; onChange(selección | null)
const DireccionInput = ({ value, onChange, error, helperText, textFieldSx, label = 'Dirección' }) => {
    const [calles, setCalles] = useState([]);
    const [input, setInput] = useState(value?.label ? `${value.label}, ${value.localidad}` : '');
    const [opciones, setOpciones] = useState([]);
    const [buscando, setBuscando] = useState(false);
    const [abierto, setAbierto] = useState(false);
    const [errorCarga, setErrorCarga] = useState(false);
    const inputRef = useRef(null);
    const tipeando = useRef(false);

    useEffect(() => {
        cargarCalles()
            .then(setCalles)
            .catch((e) => {
                console.error('Error cargando calles:', e);
                setErrorCarga(true);
            });
    }, []);

    // Reset desde el formulario (ej. después de enviar)
    useEffect(() => {
        if (!value && !tipeando.current) setInput('');
        tipeando.current = false;
    }, [value]);

    // Sugerencias según lo que se escribe
    useEffect(() => {
        if (value && input === `${value.label}, ${value.localidad}`) return;
        const { calle, altura } = separarAltura(input);

        if (!altura) {
            setBuscando(false);
            setOpciones(
                filtrarCalles(calles, calle, 8).map((c) => ({
                    tipo: 'calle',
                    calle: c,
                    label: c.label,
                    detalle: `${c.localidad} · agregá la altura`,
                }))
            );
            return;
        }

        if (calle.length < 2) return;
        const ctrl = new AbortController();
        setBuscando(true);
        const t = setTimeout(() => {
            buscarDirecciones(input, ctrl.signal)
                .then(setOpciones)
                .catch((e) => e.name !== 'AbortError' && setOpciones([]))
                .finally(() => !ctrl.signal.aborted && setBuscando(false));
        }, 300);
        return () => {
            clearTimeout(t);
            ctrl.abort();
        };
    }, [input, calles, value]);

    const handleSeleccion = (_, opcion) => {
        if (!opcion || typeof opcion === 'string') return;
        if (opcion.tipo === 'calle') {
            // Completa la calle y deja el cursor listo para la altura
            tipeando.current = true;
            setInput(`${opcion.label} `);
            onChange(null);
            setTimeout(() => {
                inputRef.current?.focus();
                setAbierto(true);
            }, 0);
            return;
        }
        setInput(`${opcion.label}, ${opcion.localidad}`);
        setAbierto(false);
        onChange(opcion);
    };

    const handleInput = (_, texto, reason) => {
        if (reason !== 'input' && reason !== 'clear') return;
        setInput(texto);
        if (value) {
            tipeando.current = true;
            onChange(null);
        }
    };

    const sinResultados = (() => {
        const { calle, altura } = separarAltura(input);
        if (calle.length < 2) return 'Escribí la calle y la altura (ej: Falucho 3212)';
        if (buscando) return 'Buscando…';
        return altura ? 'No encontramos esa altura en la calle' : 'No encontramos esa calle';
    })();

    return (
        <Autocomplete
            freeSolo
            fullWidth
            open={abierto}
            onOpen={() => setAbierto(true)}
            onClose={(_, reason) => reason !== 'selectOption' && setAbierto(false)}
            options={opciones}
            value={value}
            inputValue={input}
            onInputChange={handleInput}
            onChange={handleSeleccion}
            filterOptions={(x) => x}
            getOptionLabel={(o) => (typeof o === 'string' ? o : o?.localidad ? `${o.label}, ${o.localidad}` : o?.label || '')}
            isOptionEqualToValue={(o, v) => o.label === v.label && o.localidad === v.localidad}
            noOptionsText={sinResultados}
            forcePopupIcon={false}
            renderOption={(props, o) => {
                // eslint-disable-next-line no-unused-vars
                const { key, ...rest } = props;
                return (
                    <Box component="li" key={`${o.tipo}-${o.label}-${o.localidad || o.calle?.localidad}`} {...rest} sx={{ gap: 1.5, alignItems: 'flex-start !important', py: '10px !important' }}>
                        <LocationOnOutlinedIcon sx={{ color: '#8048ff', mt: '2px' }} fontSize="small" />
                        <Box>
                            <Typography sx={{ fontWeight: 600, lineHeight: 1.3 }}>{o.label}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{o.detalle}</Typography>
                        </Box>
                    </Box>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    inputRef={inputRef}
                    label={label}
                    placeholder="Ej: Falucho 3212"
                    variant="outlined"
                    id="direccion"
                    error={error || errorCarga}
                    helperText={errorCarga ? 'No se pudo cargar el listado de calles. Recargá la página.' : helperText}
                    sx={textFieldSx}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {buscando ? <CircularProgress size={18} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

export default DireccionInput;
