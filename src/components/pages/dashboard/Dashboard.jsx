// Importaciones:
import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, useColorScheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build'; // Ícono para Área Técnica
import { Helmet } from "react-helmet";
import logo from "../../../assets/images/logos/logo-dashboard.png";

// Componentes de secciones:
import DashboardHome from '../../common/DashboardComponents/DashBoardHome/DashBoardHome';
import Reservas from '../../common/DashboardComponents/Reservas/Reservas';
import Usuarios from '../../common/DashboardComponents/Usuarios/Usuarios';
import BlogEdit from '../../common/DashboardComponents/BlogEdit/BlogEdit';
import AreaTecnica from '../../common/DashboardComponents/AreaTecnica/AreaTecnica';

// Navegación:
const NAVIGATION = [
  { segment: 'reservas', title: 'Reservas', icon: <CalendarMonthIcon /> },
  { segment: 'blogs', title: 'Blogs', icon: <BookIcon /> },
  { segment: 'usuarios', title: 'Usuarios', icon: <PeopleIcon /> },
  { segment: 'area-tecnica', title: 'Área Técnica', icon: <BuildIcon /> }, // Nueva sección
];

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
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Componente de contenido:
function DemoPageContent({ pathname }) {
  if (pathname === '/reservas') {
    return <Reservas />;
  }

  if (pathname === '/usuarios') {
    return <Usuarios />;
  }

  if (pathname === '/blogs') {
    return <BlogEdit />;
  }

  if (pathname === '/area-tecnica') {
    return <AreaTecnica />;
  }

  return <DashboardHome />;
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Componente del logo con inversión según el tema
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

  return (
    <>
      <Helmet>
        <title>Panel de Control</title>
      </Helmet>

      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: <Logo />,
          title: 'Panel de Control',
          homeUrl: '/dashboard',
        }}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
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