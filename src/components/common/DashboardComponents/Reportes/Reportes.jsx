import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import Acciones from "./Historial/acciones.jsx";
import Stock from "./Stock/Stock.jsx";
import Retiros from "./Retiros/retiros.jsx";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const Reportes = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: "interTight" }}>
        Reportes/Stock
      </Typography>

      <Tabs value={value} onChange={(_, v) => setValue(v)}>
        <Tab label="Historial de acciones" />
        <Tab label="Stock" />
        <Tab label="Historial de retiros" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Acciones />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Stock />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Retiros />
      </TabPanel>
    </Box>
  );
};

export default Reportes;
