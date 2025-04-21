// Importaciones:
import { Box, Button, Divider, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

// JSX:
const Logout = () => {
    const [showText, setShowText] = useState(true);
    const [openModal, setOpenModal] = useState(false); 
    const containerRef = useRef();

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
        const width = entry.contentRect.width;
        setShowText(width > 250);
        });

        if (containerRef.current) {
        observer.observe(containerRef.current);
        }

        return () => {
        if (containerRef.current) {
            observer.unobserve(containerRef.current);
        }
        };
    }, []);

    const handleLogoutClick = () => {
        setOpenModal(true);
    };

    const handleLogoutConfirm = async () => {
        try {
        const token = localStorage.getItem('token');

        await axios.get('http://localhost:8000/api/auth/logout', {
            headers: {
            'x-token': token,
            },
        });

        localStorage.removeItem('token');
        window.location.href = '/login';
        } catch (error) {
        console.error('Error al cerrar sesión:', error);
        }

        setOpenModal(false); 
    };

    const handleLogoutCancel = () => {
        setOpenModal(false); 
    };

    return (
        <Box ref={containerRef} sx={{ p: 2, overflow: 'hidden' }}>
        <Divider sx={{ mb: 2 }} />
        <Tooltip title="Cerrar sesión" disableHoverListener={showText}>
            <Button
            fullWidth
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={handleLogoutClick}
            sx={{
                justifyContent: showText ? 'flex-start' : 'center',
                textTransform: 'capitalize',
                fontSize: '16px',
                minHeight: '48px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}
            >
            {showText && 'Cerrar sesión'}
            </Button>
        </Tooltip>

        {/* Modal de Confirmación */}
        <Dialog open={openModal} onClose={handleLogoutCancel}>
            <DialogTitle>¿Estás seguro de que quieres cerrar sesión?</DialogTitle>
            <DialogContent>
            <p>Se cerrará tu sesión y serás redirigido a la página de inicio de sesión.</p>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleLogoutCancel} color="primary">
                Cancelar
            </Button>
            <Button onClick={handleLogoutConfirm} color="primary">
                Confirmar
            </Button>
            </DialogActions>
        </Dialog>
        </Box>
    );
};

export default Logout;
