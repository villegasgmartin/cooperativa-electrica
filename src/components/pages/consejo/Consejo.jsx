//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import "../consejo/Consejo.css"
import { Fade } from 'react-awesome-reveal';
import BotonFlotante from '../../common/BotonFlotante/BotonFlotante';

//JSX:
const Consejo = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Consejo de administración'));
  }, [dispatch]);

  return (
    <section className='consejo-container'>
      <Fade triggerOnce={true} duration={800} delay={300}>
        <div className='consejo-text-container'>
          <h2 className='consejo-title'>Órgano de Conducción</h2>
          <p className='consejo-text'>El Consejo de Administración de la Cooperativa de Provisión de Electricidad, Servicios Públicos, Vivienda y Crédito de Mar del Plata Limitada está integrado por 12 Consejeros Titulares y 4 Consejeros Suplentes. La Fiscalización Privada se halla a cargo de 1 Síndico Titular y 1 Síndico Suplente.</p>
        </div>
        <div className='consejo-accordion-container'>
          <AccordionGroup variant='soft' size='lg'>
          <Accordion>
            <AccordionSummary><p>CONSEJO DE ADMINISTRACIÓN</p></AccordionSummary>
            <AccordionDetails>
              <ul>
                <li className='consejo-accordion-content'><strong>Presidente:</strong> Ing. Juan Carlos Dentis</li>
                <li className='consejo-accordion-content'><strong>Vicepresidente 1°</strong> Francisco Corazza</li>
                <li className='consejo-accordion-content'><strong>Vicepresidente 2°:</strong> Jorge R. Levin</li>
                <li className='consejo-accordion-content'><strong>Secretaria:</strong> Sra. Elsa Miori</li>
                <li className='consejo-accordion-content'><strong>Prosecretario:</strong> Paulo G. Ares</li>
                <li className='consejo-accordion-content'><strong>Tesorero:</strong> Gabriel B. González</li>
                <li className='consejo-accordion-content'><strong>Protesorero:</strong> Raúl R. Debenedetti</li>
              </ul>
              <AccordionGroup variant='soft' size='lg'>
                <Accordion>
                  <AccordionSummary><strong>Vocales Titulares</strong></AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        <li className='consejo-accordion-content'>Juan J. Cuda</li>
                        <li className='consejo-accordion-content'>Andrés Salvia</li>
                        <li className='consejo-accordion-content'>Gustavo Casciotti</li>
                        <li className='consejo-accordion-content'>Carlos Macri</li>
                        <li className='consejo-accordion-content'>Maria Julia Frontini</li>
                      </ul>
                    </AccordionDetails>
                </Accordion>
              </AccordionGroup>
              <AccordionGroup variant='soft' size='lg'>
                <Accordion>
                  <AccordionSummary><strong>Vocales Suplentes</strong></AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        <li className='consejo-accordion-content'>Maria Elena Roh</li>
                        <li className='consejo-accordion-content'>Liliana D'Elia</li>
                        <li className='consejo-accordion-content'>Horacio Gonzales</li>
                        <li className='consejo-accordion-content'>Pablo F Stefani Frontini</li>
                      </ul>
                    </AccordionDetails>
                </Accordion>
              </AccordionGroup>
            </AccordionDetails>
        </Accordion>
        </AccordionGroup>
        <AccordionGroup variant='soft' size='lg'>
          <Accordion>
            <AccordionSummary>ÓRGANO DE FISCALIZACIÓN</AccordionSummary>
              <AccordionDetails>
                <ul>
                  <li className='consejo-accordion-content'><strong>Síndico Titular:</strong> Gabriela E. García</li>
                  <li className='consejo-accordion-content'><strong>Síndico Suplente:</strong> Alejandro Erran Neuman</li>
                </ul>
              </AccordionDetails>
          </Accordion>
        </AccordionGroup>
        <AccordionGroup variant='soft' size='lg'>
          <Accordion>
            <AccordionSummary>AUDITORÍA</AccordionSummary>
              <AccordionDetails>
                <p className='consejo-accordion-content'><strong>Auditor Externo:</strong> CPN. Valeria González Harrison</p>
              </AccordionDetails>
          </Accordion>
        </AccordionGroup>
        <AccordionGroup variant='soft' size='lg'>
          <Accordion>
            <AccordionSummary>MESA DIRECTIVA</AccordionSummary>
              <AccordionDetails>
                <ul>
                  <li className='consejo-accordion-content'>La Mesa Directiva la componen el Presidente, el Secretario y el Tesorero</li>
                  <li className='consejo-accordion-content'>El Consejo de Administración se reúne dos veces por mes</li>
                </ul>
              </AccordionDetails>
          </Accordion>
        </AccordionGroup>
        </div>
      </Fade>
      <BotonFlotante/>
    </section>
  );
};

export default Consejo;