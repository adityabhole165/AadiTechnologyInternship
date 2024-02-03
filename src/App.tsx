import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { SnackbarProvider } from 'notistack';

import { CssBaseline } from '@mui/material';
import AppInit from './libraries/AppInit';
import ThemeProvider from './theme/ThemeProvider';

import '@fontsource-variable/nunito-sans';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const content = useRoutes(router);
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
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}
export default App;
