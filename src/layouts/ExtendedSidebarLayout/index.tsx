import { FC, ReactNode } from 'react';
import { Box, alpha, lighten, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import ThemeSettings from 'src/layouts/components/ThemeSettings';
import school5 from 'src/assets/img/school5.jpg';
import Sidebar from './Sidebar';
import Header from './Header';
import Basenav from '../BaseNavigation/index'

interface ExtendedSidebarLayoutProps {
  children?: ReactNode;
}

const ExtendedSidebarLayout: FC<ExtendedSidebarLayoutProps> = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#EAF1F5",
          flex: 1,
          height: '100%',
          width: '100%',
          position:"fixed",
          overflowY: "scroll",

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 1px 0 ' +
                  alpha(lighten(theme.colors.primary.main, 0.7), 0.15) +
                  ', 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)'
                : '0px 2px 4px -3px ' +
                  alpha(theme.colors.alpha.black[100], 0.1) +
                  ', 0px 5px 12px -4px ' +
                  alpha(theme.colors.alpha.black[100], 0.05)
          }
        }}
      >
        <Header />
        {/* <Sidebar /> */}
        <Box sx={{  position: "fixed",
                       bottom: 0,
                       flex: 1,
                    
                    
                       width: "100%",
                        zIndex: 9999,
                       
                        // pt:0,
                        // [theme.breakpoints.up('lg')]: {
                        //   ml: `${theme.sidebar.width}`
                        // }
                       }} >
                   <Basenav />
                     </Box>


        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
             pt: `${theme.header.height}`,
            // [theme.breakpoints.up('lg')]: {
            //   ml: `${theme.sidebar.width}`
            // }
          }}
        >
          <Box display="block" sx={{position:'absolute',width:'100%',paddingBottom:"80px"}}>
            <Outlet />
          </Box>
       
        </Box>
      </Box>
    </>
  );
};

export default ExtendedSidebarLayout;
