import { Box } from '@mui/material';
import { useEffect } from 'react';
import Form from 'src/libraries/form/form3';
import PageHeader from 'src/libraries/heading/PageHeader';
import CommonPageHeader from '../CommonPageHeader';

function ChangePassword() {
  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
  }, []);
  const Note: string =
    'Capitalization Matters! Min 6 characters, Max 15 characters. Password should be combination of at least one character, digit & special character.';
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
