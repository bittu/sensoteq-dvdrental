import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import TabPanel from '@mui/lab/TabPanel';

import FilmsByCategory from './components/FilmsByCategory';
import AddCustomer from './components/AddCustomer';
import DeleteCustomer from './components/DeleteCustomer';
import FilmsByTitle from './components/FilmsByTitle';

const navItems = [{
  "name": "Films - By Category",
  "component": FilmsByCategory
}, {
  "name": "Add Customer",
  "component": AddCustomer
}, {
  "name": "Delete Customer",
  "component": DeleteCustomer
}, {
  "name": "Films - By Title",
  "component": FilmsByTitle
}];

function App() {

  const [value, setValue] = useState("Films - By Category");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ display: 'flex', maxHeight: '100vh', overflow: 'none' }}>
        <AppBar position="absolute" open>
          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              Sensoteq DVD Rental
            </Typography>
            <Box sx={{ ml: 4 }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                {navItems.map((item) => (
                  <Tab key={item.name} label={item.name} value={item.name} />
                ))}
              </TabList>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" minWidth="lg" sx={{ maxHeight: '100vh', overflow: 'none'}}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ m: 4 }}>
            {navItems.map((item) => {
              const Component = item.component;
              return (
                <TabPanel key={item.name} value={item.name}>
                  <Component />
                </TabPanel>
              )
            })}
          </Container>
        </Box>
      </Box>
    </TabContext>
  );
}

export default App;