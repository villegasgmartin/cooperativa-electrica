// Importaciones:
import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createTheme, useColorScheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Helmet } from 'react-helmet';
import logo from '../../../assets/images/logos/logo-dashboard.png';
import { CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Redux imports:
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../../../redux/actions/userActions';
// Componentes de secciones:
import DashboardHome from '../../common/DashboardComponents/DashBoardHome/DashBoardHome';
import Reservas from '../../common/DashboardComponents/Reservas/Reservas';
import Usuarios from '../../common/DashboardComponents/Usuarios/Usuarios';
import BlogEdit from '../../common/DashboardComponents/BlogEdit/BlogEdit';
import AreaTecnica from '../../common/DashboardComponents/AreaTecnica/AreaTecnica';
import Logout from '../../common/DashboardComponents/Logout/Logout';
import Reportes from '../../common/DashboardComponents/Reportes/Reportes';

// Tema:
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          main: '#12824c',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#2eed8d',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Componente de contenido:
function DemoPageContent({ pathname }) {
  switch (pathname) {
    case '/reservas':
      return <Reservas />;
    case '/usuarios':
      return <Usuarios />;
    case '/blogs':
      return <BlogEdit />;
    case '/area-tecnica':
      return <AreaTecnica />;
    case '/reportes':
      return <Reportes />;
    default:
      return <DashboardHome />;
  }
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Componente del logo con inversión según el tema:
function Logo() {
  const { mode } = useColorScheme();
  const logoStyles = {
    height: 40,
    filter: mode === 'dark' ? 'invert(1)' : 'none',
  };

  return <img src={logo} alt="Logo" style={logoStyles} />;
}

// Componente principal:
function Dashboard(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  // Redux hooks:
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.user);
  const navigate = useNavigate();

  // Estado local para navegación:
  const [navigation, setNavigation] = React.useState([]);

  //Función para traer el usuario:
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Redirigir a login si el token es inválido o expiró:
  React.useEffect(() => {
    if (
      error?.includes('Token no válido') ||
      error?.includes('Token Invalido') ||
      error?.includes('usuario no existe') ||
      error?.includes('usuario con estado')
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/login');
    }
  }, [error, navigate]);

  // Cuando cambia el usuario en Redux, actualizamos navegación:
  React.useEffect(() => {
    if (user) {
      let tempNavigation = [];

      if (user.rol === 'USER_ADMIN') {
        tempNavigation = [
          { segment: 'reservas', title: 'Reservas', icon: <CalendarMonthIcon /> },
          { segment: 'blogs', title: 'Blogs', icon: <BookIcon /> },
          { segment: 'usuarios', title: 'Usuarios', icon: <PeopleIcon /> },
          { segment: 'area-tecnica', title: 'Área Técnica', icon: <BuildIcon /> },
          { segment: 'reportes', title: 'Reporte/Stock', icon: <SummarizeIcon /> },
        ];
      } else if (user.rol === 'USER_EMPLOYE') {
        if (user.reservas) {
          tempNavigation.push({ segment: 'reservas', title: 'Reservas', icon: <CalendarMonthIcon /> });
        }
        if (user.reservasLeer) {
          tempNavigation.push({ segment: 'reservas', title: 'Reservas', icon: <CalendarMonthIcon /> });
        }
        if (user.blog) {
          tempNavigation.push({ segment: 'blogs', title: 'Blogs', icon: <BookIcon /> });
        }
        if (user.usuarios) {
          tempNavigation.push({ segment: 'usuarios', title: 'Usuarios', icon: <PeopleIcon /> });
        }
        if (user.tecnica) {
          tempNavigation.push({ segment: 'area-tecnica', title: 'Área Técnica', icon: <BuildIcon /> });
        }
      }

      setNavigation(tempNavigation);
    }
  }, [user]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress sx={{ color: '#12824c' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          color: 'error.main',
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          alignItems: 'center',
        }}
      >
        Error: {error}
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panel de Control</title>
      </Helmet>

      <AppProvider
        navigation={navigation}
        branding={{
          logo: <Logo />,
          title: 'Panel de Control',
          homeUrl: '/dashboard',
        }}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout
          slots={{
            toolbarAccount: () => null,
            sidebarFooter: Logout,
          }}
        >
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
    </>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
