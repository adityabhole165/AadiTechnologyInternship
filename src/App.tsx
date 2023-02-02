import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import { SnackbarProvider } from 'notistack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import AppInit from './libraries/AppInit';
import ExtendedSidebarLayout from './layouts/ExtendedSidebarLayout';

function App() {

  const content = useRoutes(router);
  const deviceType = window.localStorage.getItem('deviceType') 
  const iOSMarginTop = ((typeof deviceType != undefined && deviceType == 'ios') ? '8px' : '0px')

  return (
    <div style={{marginTop: iOSMarginTop}}>
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackbarProvider
          maxSnack={6}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <CssBaseline />
          {true ? content : <AppInit />}
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
    </div>
  );
}
export default App;
