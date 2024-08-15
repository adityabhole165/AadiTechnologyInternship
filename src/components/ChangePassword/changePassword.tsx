import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import Form from 'src/libraries/form/form3';
import PageHeader from 'src/libraries/heading/PageHeader';
import CommonPageHeader from '../CommonPageHeader';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    <CommonPageHeader
        navLinks={[{ title: 'Change Password', path: ' ' }
        ]}/>
       
                     <Form />
     
    </Box>
  );
}

export default ChangePassword;
