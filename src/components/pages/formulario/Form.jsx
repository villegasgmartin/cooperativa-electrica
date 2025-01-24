//Importaciones:
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import "../formulario/Form.css"
import { Fade } from 'react-awesome-reveal';
import Footer from '../../common/layout/footer/Footer';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import NavBar from '../../common/layout/navBar/NavBar';
import LogoNave from "../../../assets/images/logos/logo-nave-blanco.png"
import {Helmet} from "react-helmet"

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

    return (
        <>
            <Helmet>
                <title>NAVE Internet</title>
            </Helmet>
            <header className="header-nave-container">
                <div className="header-contactos-container">
                <div className="header-contactos">
                    <LocationOnTwoToneIcon sx={{ color: "white" }} />
                    <h4 className="header-contactosText">Alberti 3600, Mar del Plata</h4>
                </div>
                <div className="header-contactos">
                    <LocationOnTwoToneIcon sx={{ color: "white" }} />
                    <h4 className="homePortada-contactosText">20 de Septiembre 2638, Mar del Plata</h4>
                </div>
                <div className="header-contactos" id="homePortada-tel">
                    <LocalPhoneTwoToneIcon sx={{ color: "white" }} />
                    <h4 className="header-contactosText">0800-333-0357 / (0223) 495-1411</h4>
                </div>
                </div>
                <div className="navbarPages-container">
                <NavBar backgroundColorMovile="#201c1c" backgroundColor="#201c1c" />
                </div>
                <Fade triggerOnce={true} duration={800} delay={300}>
                <div className='header-nave'>
                    <div className='header-nave-logoContainer'><img src={LogoNave} alt="NAVE Internet" className='header-nave-logo' /></div>
                    <div className='header-nave-textContainer'>
                    <h1 className='header-nave-title'>Internet <span className='header-nave-resaltado'>Cooperativa</span></h1>
                    <p className='header-nave-text'>Descubre nuestras increíbles <span  className='header-nave-resaltado'>opciones de Internet y televisión</span> diseñadas para satisfacer todas tus necesidades de entretenimiento y conectividad.</p>
                    </div>
                </div>
                </Fade>
            </header>     
            <section className='form-main-container'>
                <div className='form-text-container'>
                    <Fade triggerOnce={true} duration={800} delay={300}>
                        <p className='form-text01'>Dejanos tus datos y te contactaremos</p>
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
                        sx={{ backgroundColor: "#edeaff",borderRadius:"25px",
                        '& .MuiOutlinedInput-root': {
                            borderRadius:"25px",
                            '&.Mui-focused fieldset': {
                            borderColor: '#8048ff;',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#8048ff;',
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
                        sx={{ backgroundColor: "#edeaff",borderRadius:"25px",
                        '& .MuiOutlinedInput-root': {borderRadius:"25px",
                            '&.Mui-focused fieldset': {
                            borderColor: '#8048ff;c',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#8048ff;',
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
                        sx={{ backgroundColor: "#edeaff",borderRadius:"25px",
                        '& .MuiOutlinedInput-root': {borderRadius:"25px",
                            '&.Mui-focused fieldset': {
                            borderColor: '#8048ff;',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#8048ff;',
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
                        sx={{ backgroundColor: "#edeaff",borderRadius:"25px",
                        '& .MuiOutlinedInput-root': {borderRadius:"25px",
                            '&.Mui-focused fieldset': {
                            borderColor: '#8048ff;',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#8048ff;',
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
                        sx={{ backgroundColor: "#edeaff",borderRadius:"25px",
                        '& .MuiOutlinedInput-root': {borderRadius:"25px",
                            '&.Mui-focused fieldset': {
                            borderColor: '#8048ff;',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#8048ff;',
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
                        sx={{ backgroundColor: "#edeaff",borderRadius:"25px",}}
                        >
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
                        sx={{ backgroundColor: "#edeaff", borderRadius: "25px" }}
                        disabled={internetPlan === ''} // Opcional: deshabilitar si no hay plan de internet seleccionado
                    >
                        {internetPlan === "Ninguna" || internetPlan === '' ? (
                            <>
                                <MenuItem value="Full TV">Full TV</MenuItem>
                                {/* <MenuItem value="Fútbol Premium">Fútbol Premium</MenuItem> */}
                                <MenuItem value="Ninguna">Ninguna</MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem value="Park TV adicional $5999">Park TV adicional $5999</MenuItem>
                                <MenuItem value="Ninguna">Ninguna</MenuItem>
                            </>
                        )}
                    </Select>
                </FormControl>

                    <div className='form-button-container'>
                        <Button
                        sx={{
                            width: "100%",
                            fontFamily: "interTight",
                            fontSize: "25px",
                            fontWeight: "bold",
                            letterSpacing: "1px",
                            borderRadius: "50px",
                            boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                            textTransform: "none",
                            color:"#161616",
                            backgroundColor: "#30e691",
                            marginBottom: "20px"
                        }}
                        variant="contained"
                        size="large"
                        type='submit'>
                            Enviar
                        </Button>
                    </div>
                    </form>
                </Fade>
            </div>
            </section>
            <Footer/>
        </>
    );
};

export default Form;