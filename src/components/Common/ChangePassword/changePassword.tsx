import PageHeader from 'src/libraries/heading/PageHeader';
import Form from 'src/libraries/form/form3';
import Icon1 from 'src/libraries/icon/icon1';
import { Container } from '@mui/material';

function ChangePassword() {
  const Note: string =
    'Capitalization Matters! Min 6 characters, Max 15 characters. Password should be combination of at least one character, digit & special character.';
  return (
    <>
      <PageHeader heading={'Change Password'} subheading={''} />
      <Form />
    </>
  );
}

export default ChangePassword;
