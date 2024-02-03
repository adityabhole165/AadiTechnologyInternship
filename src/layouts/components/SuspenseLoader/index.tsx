import { Box, CircularProgress } from '@mui/material';

function SuspenseLoader() {
  // useEffect(() => {
  //   NProgress.start();

  //   return () => {
  //     NProgress.done();
  //   };
  // }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={40} disableShrink thickness={4} />
    </Box>
  );
}

export default SuspenseLoader;
