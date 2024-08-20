import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useEffect } from 'react';
import Form from 'src/libraries/form/form3';


function ChangePassword() {
  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
  }, []);
  const Note: string =
    'Capitalization Matters! Min 6 characters, Max 15 characters. Password should be combination of at least one character, digit & special character.';
    const note = [
      '1) Capitalization Matters! Min 6 characters, Max 15 characters.',
      '2) Password should be combination of at least one character, digit & special character.'
    ];
    const note1 = [
      'It seems you have not changed the system generated password. Please reset your password for security purpose.'
    ];
    return (
    <Box sx={{ px: 2 }}>
    {/* <CommonPageHeader
        navLinks={[{ title: 'Change Password', path: ' ' }
        ]}
          rightActions={<>
        <Tooltip title={'Cancle'}>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: red[500],
                '&:hover': {
                  backgroundColor: red[600]
                }
              }}
              // onClick={clickReset}
               >
              <CancelIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title={'Save'}>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: green[500],
                '&:hover': {
                  backgroundColor: green[600]
                }
              }}
              // onClick={clickReset} 
              >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          </>}
      /> */}
      <Form />
    </Box>
  );
}

export default ChangePassword;
