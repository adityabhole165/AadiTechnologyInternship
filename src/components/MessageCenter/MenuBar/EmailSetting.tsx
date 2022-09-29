import { Card, Container, Checkbox, TextField, Grid } from '@mui/material';
import { useState } from 'react';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const EmailSetting = () => {
  const navigate = useNavigate();
  const [InputFieldValue, setInputFieldValue] = useState<string>('');
  const [emailAddressErrorFlag, setemailAddressErrorFlag] =
    useState<boolean>(false);
  const validEMailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [submitButtonDisabled, setsubmitButtonDisabled] =
    useState<boolean>(false);

  const checkBoxHandler = (e) => {
    if (e.target.checked) {
      setsubmitButtonDisabled(false);
    }
    if (!e.target.checked) {
      setsubmitButtonDisabled(true);
    }
  };

  const inputFiledChangeHandler = (event) => {
    setemailAddressErrorFlag(false);
    setInputFieldValue(event.target.value);
  };
  const inputFiledBlur = (event) => {
    const EmailErrorFlag = validEMailFormat.test(event.target.value);
    if (EmailErrorFlag == false && event.target.value.length !== 0) {
      setemailAddressErrorFlag(true);
    }
    if (EmailErrorFlag == true) {
      setemailAddressErrorFlag(false);
    }
  };
  const inputFiledFocus = (e) => {
    setemailAddressErrorFlag(false);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    toast.success('Your Email address has been updated successfully');
    setInputFieldValue('');
  };

  return (
    <>
      <PageHeader heading="Email Setting" subheading=""></PageHeader>
      <Container>
        <Card>
          <form style={{ marginTop: '15px' }} onSubmit={formSubmitHandler}>
            <Grid container>
              <Grid item xs={2}>
                <Checkbox
                  sx={{ fontSize: '5px', ml: '3px' }}
                  defaultChecked={true}
                  onChange={(e) => checkBoxHandler(e)}
                />{' '}
              </Grid>
              <Grid item xs={9}>
                <span
                  style={{ textAlign: 'center', margin: '10px 5px 0 -2px ' }}
                >
                  Yes I want to receive message on <br />
                  below Email address
                </span>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sx={{ p: '15px' }}>
                <TextField
                  fullWidth
                  required
                  error={emailAddressErrorFlag}
                  id="outlined-required"
                  label="Email address"
                  placeholder="name@example.com"
                  autoFocus={true}
                  onChange={(e) => inputFiledChangeHandler(e)}
                  onBlur={(e) => inputFiledBlur(e)}
                  onFocus={(e) => inputFiledFocus(e)}
                  value={InputFieldValue}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sx={{ pl: '15px', mt: '-15px' }}>
                {emailAddressErrorFlag ? (
                  <p style={{ color: 'red' }}>
                    Please enter a valid email address.
                  </p>
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              justifyContent={'space-around'}
              sx={{ marginBottom: '20px' }}
            >
              <Grid item xs={5}>
                <ButtonPrimary
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={submitButtonDisabled}
                >
                  Submit
                </ButtonPrimary>
              </Grid>
              <Grid item xs={5}>
                <ButtonPrimary
                  color="secondary"
                  fullWidth
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </ButtonPrimary>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default EmailSetting;
