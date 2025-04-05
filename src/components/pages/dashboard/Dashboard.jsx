// Importaciones:
import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';

// Componentes de secciones:
import DashboardHome from '../../common/DashboardComponents/DashBoardHome/DashBoardHome';
import Reservas from '../../common/DashboardComponents/Reservas/Reservas';
import Usuarios from '../../common/DashboardComponents/Usuarios/Usuarios';
import BlogEdit from '../../common/DashboardComponents/BlogEdit/BlogEdit';


// Navegación:
const NAVIGATION = [
  { segment: 'reservas', title: 'Reservas', icon: <CalendarMonthIcon /> },
  { segment: 'blogs', title: 'Blogs', icon: <BookIcon /> },
  { segment: 'usuarios', title: 'Usuarios', icon: <PeopleIcon /> },
];

// Tema:
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
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

  return <DashboardHome />;
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Componente principal:
function Dashboard(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
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
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
