import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import { SnackbarProvider } from 'notistack';

import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AppInit from './libraries/AppInit';
import ThemeProvider from './theme/ThemeProvider';


import '@fontsource-variable/nunito-sans';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useContext } from 'react';
import AlertDialog from './components/AlertComponents';
import { AlertContext } from './contexts/AlertContext';

function App() {
  const content = useRoutes(router);
  const alertManager = useContext(AlertContext);
  // const contentWeb = useRoutes(routerWeb);

  const deviceType = window.localStorage.getItem('deviceType');
  const iOSMarginTop =
    typeof deviceType != undefined && deviceType == 'ios' ? '10px' : '0px';

  return (
    <div style={{ marginTop: iOSMarginTop }}>
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
            {alertManager.toggleAlert && (
              <AlertDialog
                message={alertManager.alertInfo.message}
                title={alertManager.alertInfo.title}
                variant={alertManager.alertInfo.variant}
                confirmButtonText={alertManager.alertInfo.confirmButtonText}
                cancelButtonText={alertManager.alertInfo.cancelButtonText}
                onConfirm={alertManager.alertInfo.onConfirm}
                onCancel={alertManager.alertInfo.onCancel}
              />
            )}
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}
export default App;
