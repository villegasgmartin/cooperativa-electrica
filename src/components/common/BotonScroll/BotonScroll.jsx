//Importaciones:
import React from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


//JSX:
function BotonScroll() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        };
    
        return (
            <Fab
            color="primary"
            aria-label="scroll back to top"
            onClick={scrollToTop}
            sx={{
                position: 'fixed',
                bottom: '20px',
                right: '100px',
                width: "60px",
                height: "60px",
                backgroundColor: '#3d116d', 
                '&:hover': {
                    backgroundColor: '#8048ff',
                },
                '@media (max-width: 760px)': {
                    display: 'none',
                    },
                }}
            >
                <KeyboardArrowUpIcon />
            </Fab>
            );
        }
    
    export default BotonScroll;