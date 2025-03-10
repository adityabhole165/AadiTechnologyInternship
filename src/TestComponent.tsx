import { defineCustomElements } from '@ionic/pwa-elements/loader';
import 'nprogress/nprogress.css';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import store from 'src/store';
import ScrollTop from 'src/utils/hooks/useScrollTop';
import { AlertProvider } from './contexts/AlertContext';

ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <SidebarProvider>
        <AlertProvider>
          <BrowserRouter>
            <ToastContainer
              position="top-center"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <ScrollTop />
            <App />
          </BrowserRouter>
        </AlertProvider>
      </SidebarProvider>
    </Provider>
  </HelmetProvider>,
  document.getElementById('root')
);
defineCustomElements(window);

serviceWorker.unregister();
