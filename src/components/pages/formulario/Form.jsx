//api AIzaSyDnG7odirzcO_xm7R1EIxf1a7Dhi2OflDU


//Importaciones:
import { useEffect, useState, useRef } from 'react';
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
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';
import { PopupWidget } from "react-calendly";
import { isPointInPolygon } from "geolib";
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

    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isMeetingScheduled, setIsMeetingScheduled] = useState(false);

    const [direccion, setDireccion] = useState("");
  const [zona, setZona] = useState("");
  const inputRef = useRef(null);
  
 
  const [internetPlanURL, setInternetPlanURL] = useState('');

  useEffect(() => {
    if (zona?.trim() !== '' && zona?.trim() !== 'Direccion en Zona 1') {
        setInternetPlanURL("Fuera de Zona");
    } else {
        setInternetPlanURL("");
    }
}, [zona]);

        const zona1 = [
            { lat: -38.000417, lng: -57.556455 },
            { lat: -37.997033, lng: -57.563437 },
            { lat: -38.009027, lng: -57.563467 },
            { lat: -38.005620, lng: -57.570244 }
        ];

        const zona2 = [
            { lat: -38.0100, lng: -57.5700 },
            { lat: -38.0150, lng: -57.5750 },
            { lat: -38.0200, lng: -57.5650 },
            { lat: -38.0125, lng: -57.5600 },
            { lat: -38.0100, lng: -57.5700 },
        ];

        useEffect(() => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
            
            if (name && dni && direccion && emailRegex.test(email) && tvPlan && internetPlanURL) {
                setIsFormComplete(true);
            } else {
                setIsFormComplete(false);
            }
        }, [name, dni, direccion, email, tvPlan, internetPlanURL]);
        


    
      useEffect(() => {
        // Obtener los parámetros de la URL
        const params = new URLSearchParams(window.location.search);
        const plan = params.get('internet'); // Obtener el valor del parámetro 'internet'
        console.log(plan);
        if (plan) {
            setInternetPlanURL(plan); // Establecer el valor en el estado si existe en la URL
        }
      }, []);



  useEffect(() => {
    if (window.google && window.google.maps) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        { types: ["geocode"] } // Opcional: limitar a direcciones
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          setDireccion(place.formatted_address);
        }
      });
    }
  }, []);






  const normalizeAddress = (address) => {
    return address
        .replace(/Almte\./gi, "Almirante") // Cambia "Almte." por "Almirante"
        .replace(/B\d{4}[A-Z]{3}/gi, "") // Elimina códigos postales tipo "B7600FVC"
        .replace(/\s{2,}/g, " ") // Elimina espacios extra
        .trim();
};

    //   async function getCoordinates(address) {
    //     const normalizedAddress = normalizeAddress(address);
    //     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(normalizedAddress)}`;

    
    //     console.log("URL de la consulta:", url);
    
    //     try {
    //         const response = await fetch(url);
    //         const data = await response.json();
    
    //         console.log("Respuesta de la API:", data);
    
    //         if (data.length > 0) {
    //             return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    //         } else {
    //             console.warn("No se encontraron coordenadas para la dirección ingresada.");
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error("Error al obtener coordenadas:", error);
    //         return null;
    //     }
    // }

    const getCoordinates = async (address) => {
        const apiKey = "AIzaSyCCzveaOkoBNKYRpimGKITKrx9MfRNlYhU"; // Reemplázalo con tu clave real
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
    
            if (data.status === "OK") {
                const { lat, lng } = data.results[0].geometry.location;
                console.log("Coordenadas:", { lat, lng });
                return { lat: parseFloat(data.results[0].geometry.location.lat), lng: parseFloat(data.results[0].geometry.location.lng) };
            } else {
                console.error("Error en la geocodificación:", data.status);
                return null;
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            return null;
        }
    };
    
      
      
    // const openCalendlyPopup = () => {
    //     window.Calendly.initPopupWidget({
    //         url: "https://calendly.com/villegasgmartin/fisrt-meeting",
    //         onEventScheduled: () => {
    //             setIsMeetingScheduled(true);
    //             handleSubmit();
    //         }
    //     });
    // };

    const handleInternetChange = (event) => {
        setInternetPlan(event.target.value);
    };

    const handleTvChange = (event) => {
        setTvPlan(event.target.value);
    };

    function verificarZona(coordenadas) {
        if (isPointInPolygon(coordenadas, zona1)) {
          return "Zona 1";
        } else if (isPointInPolygon(coordenadas, zona2)) {
          return "Zona 2";
        } else {
          return "Direccion No Valida";
        }
      }

      const handleSubmit = () => {
        // Asegurarse de obtener los valores actualizados
        const currentName = document.getElementById("name-input")?.value || "";
        const currentDni = document.getElementById("dni-input")?.value || "";
        const currentAddress = document.getElementById("address-input")?.value || "";
        const currentEmail = document.getElementById("email-input")?.value || "";
        const currentInternetPlan = document.getElementById("internet-plan-select")?.value || "Ninguna";
        const currentTvPlan = document.getElementById("tv-plan-select")?.value || "Ninguna";
    
        let message = `Hola, mi nombre es ${currentName}\nDNI: ${currentDni}\nDirección: ${currentAddress}\nMail: ${currentEmail}`;
    
        if (currentInternetPlan !== "Ninguna" || currentTvPlan !== "Ninguna") {
            message += `\nQuiero información acerca del siguiente servicio:`;
            if (currentInternetPlan !== "Ninguna") {
                message += `\n- Internet: ${currentInternetPlan}`;
            }
            if (currentTvPlan !== "Ninguna") {
                message += `\n- TV: ${currentTvPlan}`;
            }
        }
    
        const phoneNumber = "2235376973";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
        window.open(whatsappUrl, '_blank');
    };
    


    

  async function handleConsulta(e) {
    e.preventDefault();

    try {
        console.log(direccion)
      const coordenadas = await getCoordinates(direccion);
      console.log(coordenadas)
      if (isPointInPolygon(coordenadas, zona1)) {
        setZona(" Direccion en Zona 1");
      } else if (isPointInPolygon(coordenadas, zona2)) {
        setZona(" Direccion en Zona 2");
      } else {
        setZona("Fuera de Zona de Servicio");
      }
    } catch (error) {
      setZona("Error al buscar la dirección");
    }
  }
    

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
                        id='name-input'
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
                        id='dni-input'
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
                    {/* <TextField
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
                    /> */}

                  <div className='direccion-div'>
                  <input
                        ref={inputRef}
                        type="text"
                        value={direccion}
                        name='direccion'
                        id='address-input'
                        onChange={(e) => setDireccion(e.target.value)}
                        placeholder="Ingresa tu dirección"
                        className='direccion-input'
                    />
                    <button onClick={handleConsulta}>Consultar Zona</button>
                    {zona && <p> {zona}</p>}
                    </div>

{/*                    
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
                    /> */}
                    <TextField
                        label="Mail de contacto"
                        variant="outlined"
                        fullWidth
                        required
                        type="email"
                        value={email}
                        id='email-input'
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
                    {(zona ?? '').trim() == '' || (zona ?? '').trim() == 'Direccion en Zona 1'?(
                        <>
                         <FormControl fullWidth>
                        <InputLabel id="internet-plan-label">Plan que solicita de internet</InputLabel>
                        <Select
                            variant="outlined"
                            labelId="internet-plan-label"
                            id="internet-plan-select"
                            value={internetPlanURL}
                            label="Plan que solicita de internet"
                            onChange={handleInternetChange}
                            sx={{ backgroundColor: "#edeaff", borderRadius: "25px" }}
                        >
                            <MenuItem value="100 MB">100 megas</MenuItem>
                            <MenuItem value="300 MB">300 megas</MenuItem>
                            <MenuItem value="500 MB">500 megas</MenuItem>
                            <MenuItem value="Ninguna">Ninguna</MenuItem>
                        </Select>
                        </FormControl>
                        </>
                    ):(
                        <>
                        <FormControl fullWidth>
                       <InputLabel id="internet-plan-label">Plan que solicita de internet</InputLabel>
                       <Select
                           variant="outlined"
                           labelId="internet-plan-label"
                           id="internet-plan-select"
                           value={internetPlanURL}
                           label="Plan que solicita de internet"
                           onChange={handleInternetChange}
                           sx={{ backgroundColor: "#edeaff", borderRadius: "25px" }}
                       >
                           <MenuItem value="Fuera de Zona" selected>Fuera de Zona</MenuItem>
                       </Select>
                       </FormControl>
                       </>
                    )}
                    
                    <FormControl fullWidth>
                        <InputLabel id="tv-plan-label">Plan que solicita de TV</InputLabel>
                        <Select
                        labelId="tv-plan-label"
                        id="tv-plan-select"
                        value={tvPlan}
                        label="Plan que solicita de TV"
                        onChange={handleTvChange}
                        sx={{backgroundColor: "#edeaff",borderRadius:"25px",}}
                        >
                            {internetPlan !== "Ninguna"
                                ? [
                                    <MenuItem key="park-tv" value="Park Tv adicional $5999">Park Tv adicional $5999</MenuItem>,
                                    <MenuItem key="ninguna" value="Ninguna">Ninguna</MenuItem>,
                                ]
                                : [
                                    <MenuItem key="full-tv" value="TV full + pack fútbol + Max gratis"> TV full + pack fútbol + Max gratis</MenuItem>,
                                    <MenuItem key="ninguna" value="Ninguna">Ninguna</MenuItem>,
                                ]}

                        
                        </Select>
                    </FormControl>
                    
                    <div className='form-button-container'>
                    <div>
                        {isFormComplete? (
                            <>
                                  <PopupWidget
                                    url="https://calendly.com/villegasgmartin/fisrt-meeting?preview_source=et_card&month=2025-02"
                                    rootElement={document.getElementById("root")}
                                    text="Enviar"
                                    textColor="#ffffff"
                                    color="#3D116D"
                                />
                            </>
                        ): ""}
              
                    </div>
                        {/* <Button
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
                        </Button> */}
                    </div>
                    </form>
                </Fade>
            </div>
            <BotonWhatsapp/>
            </section>
            <Footer/>
        </>
    );
};

export default Form;