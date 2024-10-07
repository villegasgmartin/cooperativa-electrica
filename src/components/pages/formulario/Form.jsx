//Importaciones:
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import "../formulario/Form.css"
import BotonFlotante from '../../common/BotonFlotante/BotonFlotante';
import { Fade } from 'react-awesome-reveal';

//JSX:
const Form = () => {
    const dispatch = useDispatch();
    const [internetPlan, setInternetPlan] = useState('');
    const [tvPlan, setTvPlan] = useState('');
    const [name, setName] = useState('');
    const [dni, setDni] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleInternetChange = (event) => {
        setInternetPlan(event.target.value);
    };

    const handleTvChange = (event) => {
        setTvPlan(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let message = `Hola, mi nombre es ${name}\nDNI: ${dni}\nDirección: ${address}\nMail: ${email}`;
        if (internetPlan !== "Ninguna" || tvPlan !== "Ninguna") {
        message += `\nQuiero información acerca del siguiente servicio:`;
        if (internetPlan !== "Ninguna") {
            message += `\n- Internet: ${internetPlan}`;
        }
        if (tvPlan !== "Ninguna") {
            message += `\n- TV: ${tvPlan}`;
        }
    }
        const phoneNumber = "2235376973";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    };

    useEffect(() => {
        dispatch(setTitle(''));
    }, [dispatch]);

    return (
        <section className='form-main-container'>
            <div className='form-text-container'>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <p className='form-text01'>Déjanos tus datos y te contactaremos</p>
                    <p className='form-text02'>
                        Completa el siguiente formulario y uno de nuestros asesores te brindará toda la información sobre nuestros planes de Internet y TV. ¡Conéctate con el mejor servicio para tu hogar o empresa!
                    </p>
                </Fade>
            </div>
        <div>
            <Fade triggerOnce={true} duration={800} delay={300}>
                <form className='form-container' onSubmit={handleSubmit}>
                <TextField
                    label="Nombre y apellido"
                    variant="outlined"
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ backgroundColor: "#d9f3e3",
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                        borderColor: '#12824c',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#12824c',
                    }
                    }}
                />
                <TextField
                    label="DNI"
                    variant="outlined"
                    fullWidth
                    required
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    sx={{ backgroundColor: "#d9f3e3",
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                        borderColor: '#12824c',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#12824c',
                    }
                    }}
                />
                <TextField
                    label="Dirección dónde solicita internet"
                    variant="outlined"
                    fullWidth
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    sx={{ backgroundColor: "#d9f3e3",
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                        borderColor: '#12824c',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#12824c',
                    }
                    }}
                />
                <TextField
                    label="Celular"
                    variant="outlined"
                    fullWidth
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ backgroundColor: "#d9f3e3",
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                        borderColor: '#12824c',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#12824c',
                    }
                    }}
                />
                <TextField
                    label="Mail de contacto"
                    variant="outlined"
                    fullWidth
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ backgroundColor: "#d9f3e3",
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                        borderColor: '#12824c',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#12824c',
                    }
                    }}
                />
                <FormControl fullWidth>
                    <InputLabel id="internet-plan-label">Plan que solicita de internet</InputLabel>
                    <Select
                    variant='outlined'
                    labelId="internet-plan-label"
                    id="internet-plan-select"
                    value={internetPlan}
                    label="Plan que solicita de internet"
                    onChange={handleInternetChange}
                    sx={{ backgroundColor: "#d9f3e3",}}
                    >
                    <MenuItem value="50 megas">50 megas</MenuItem>
                    <MenuItem value="100 megas">100 megas</MenuItem>
                    <MenuItem value="300 megas">300 megas</MenuItem>
                    <MenuItem value="500 megas">500 megas</MenuItem>
                    <MenuItem value="Ninguna">Ninguna</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="tv-plan-label">Plan que solicita de TV</InputLabel>
                    <Select
                    labelId="tv-plan-label"
                    id="tv-plan-select"
                    value={tvPlan}
                    label="Plan que solicita de TV"
                    onChange={handleTvChange}
                    sx={{ backgroundColor: "#d9f3e3",}}
                    >
                    <MenuItem value="Full TV">Full TV</MenuItem>
                    <MenuItem value="Fútbol Premium">Fútbol Premium</MenuItem>
                    <MenuItem value="Ninguna">Ninguna</MenuItem>
                    </Select>
                </FormControl>
                </form>
                <div className='form-button-container'>
                    <Button
                    sx={{
                        width: "100%",
                        height: "60px",
                        backgroundColor: "#12824c",
                        fontFamily: "archivo",
                    }}
                    variant="contained"
                    size="large"
                    type='submit'>
                        Enviar
                    </Button>
                </div>
            </Fade>
        </div>
        <BotonFlotante/>
        </section>
    );
};

export default Form;