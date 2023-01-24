import React,{useRef, useEffect } from 'react';
import { Container, TextField ,Grid,Checkbox,Typography,Box,Card} from '@mui/material';
import { useFormik } from 'formik';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import PageHeader from 'src/libraries/heading/PageHeader';
import BackButton from 'src/libraries/button/BackButton';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {  IGetUserEmailSettingsBody } from "../../interfaces/MessageCenter/MessageCenter";
import {GetEmailSettings} from 'src/requests/MessageCenter/MessaageCenter';

function EmailSetting() {
  const dispatch = useDispatch();
  const Email = useSelector(
    (state: RootState) => state.MessageCenter.EmailSettings
  );
console.log("Emailrenuka",Email)

  const EmailSettingbody = {
    "asSchoolId": '122',
    "asUserId":'5656',
  };
 

  const submit = () => {
    dispatch(GetEmailSettings(EmailSettingbody));
}
    const formik = useFormik({
        initialValues: {
          EmailId: '',
       
        },
        onSubmit: (values, { resetForm }) => {
            submit()
            resetForm()
      
        },
        onReset: (values) => {
         
        },
        validate: (values) => {
            const emailRegExp = /^\S+@\S+\.\S+$/;

            const errors: any = {};
            if (!values.EmailId) {
                errors.EmailId = 'Please enter the Email address.';
              }
              else if (!emailRegExp.test(values.EmailId)) {
                errors.EmailId = 'Invalid email address';
              }
          return errors;
        },
      })
  return (
  
    <Container>
    <BackButton FromRoute={"/MessageCenter/msgCenter"}/>
     <PageHeader heading={'Email Setting'} subheading={''} />
     <Card component={Box} p={0.5} sx={{display:"flex"}}>
     <Checkbox size="small"/>
     <Typography variant='body2'>Yes I want to receive message on below Email address.</Typography>
    </Card>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="dense" 
          size="small"
          id="EmailId"
          name="EmailId"
          label="EmailId"
          value={formik.values. EmailId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          />
        {(formik.touched.EmailId && formik.errors.EmailId) ? 
        (<ErrorMessage1 Error={formik.errors.EmailId} />) : 
        null}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ButtonPrimary onChange={formik.handleChange} 
              type="submit" fullWidth color='primary'>
              Submit
            </ButtonPrimary>
          </Grid>
          <Grid item xs={6}>
            <ButtonPrimary fullWidth color='secondary' type='reset'
              onClick={formik.handleReset} >
              Reset
            </ButtonPrimary>
          </Grid>
        </Grid>
    </form>
    </Container>
  )
}

export default EmailSetting;
