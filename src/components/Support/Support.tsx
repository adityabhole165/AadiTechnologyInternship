import { useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getSaveSupport, ResetMessage } from 'src/requests/Support/RequestSupport';
import Note from "src/libraries/Note/Note"
import { Container, TextField, TextareaAutosize, Grid, Typography, Box } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useFormik } from 'formik';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';
import IconFile from 'src/libraries/icon/IconFile';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import { CheckFileValidation } from '../Common/Util'
import { toast } from 'react-toastify';
import Icon3 from "src/libraries/icon/icon3";
import { Styles } from 'src/assets/style/student-style'
function Support() {
  const classes = Styles();
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  const [mobileerror, setMobileerror] = useState('')
  const [value, setValue] = useState()
  const [value1, setValue1] = useState('');

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserid = sessionStorage.getItem("Id");
  const [fileName, setFileName] = useState('')
  const [base64URL, setBase64URL] = useState('')
  const Support: any = useSelector(
    (state: RootState) => state.Support.SaveSupport
  );

  const SupportPageNote = [
    "1) Dear Student / Parent, Mention the Subject for your Support Request and Description of the problem in detail with exact steps if possible.",
    "2) You may attach a file as a supporting document.",
    "3) It will help our support member to understand the problem in full and speed up the resolution of your request."
  ]

  const changeFile = async (e) => {
    setValue(e.target.files)
    const multipleFiles = e.target.files;
    let base64URL: any = '';
    let DataAttachment: any = '';
    let fileName: any = '';
    for (let i = 0; i < multipleFiles.length; i++) {
      const isValid = CheckFileValidation(multipleFiles[i], ['jpg', 'xls', 'xlsx', 'doc', 'docx', 'pdf', 'jpg', 'jpeg'], 2000000);
      if (isValid == null) {
        setFileName(multipleFiles[i].name);
        base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
        setBase64URL(base64URL.slice(base64URL.indexOf(',') + 1));
      }
    }
  }
  const ChangeFileIntoBase64 = (fileData) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileData);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };
  const FileValidationNote = "(Supports only XLS, XLSX, DOC, DOCX, PDF, JPG, JPEG files types up to 200 KB)"
  const aRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      EmailId: '',
      MobileNumber: '',
      ProblemsSubject: '',
      Description: '',
    },
    onSubmit: (values, { resetForm }) => {
      setValue(value)
      submit()
      resetForm()
      aRef.current.value = null;
    },
    onReset: (values) => {
      setValue(null)
      setError(null)
      aRef.current.value = null;
    },
    validate: (values) => {
      const emailRegExp = /^\S+@\S+\.\S+$/; // for Email address
      const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      const re = /^[0-9\b]+$/;

      const errors: any = {};
      if (!values.EmailId) {
        errors.EmailId = 'Please enter the Email address.';
      }
      else if (!emailRegExp.test(values.EmailId)) {
        errors.EmailId = 'Invalid email address';
      }
      if (!phoneRegExp.test(values.MobileNumber)) {
        errors.MobileNumber = 'Please enter the valid mobile number';
      }
      if (values.MobileNumber === '' || re.test(values.MobileNumber)) {

      }
      if (!values.Description) {
        errors.Description = 'Description should not be blank.';
      }
      if (!values.ProblemsSubject) {
        errors.ProblemsSubject = 'Please enter the problem subject for the support.';
      }
      else if (values.ProblemsSubject.length > 2000) {
        errors.ProblemsSubject = 'Length shoulbe be 2000 word ';
      }
      return errors;
    }
  });
  const SupportBody = {
    "asUserId": asUserid,
    "asSchoolId": asSchoolId,
    "asAcademicYearId": asAcademicYearId,
    "asFileName": fileName,
    "asDescription": formik.values.Description,
    "asEmailAddress": formik.values.EmailId,
    "asSubject": formik.values.ProblemsSubject,
    "asMobileNo": formik.values.MobileNumber,
    "asBase64URLString": base64URL
  }

  const submit = () => {
    dispatch(getSaveSupport(SupportBody));
  }
  useEffect(() => {
    toast.success(Support.Message);
    dispatch(ResetMessage());
  }, [Support]);
  return (
    <Container>
      <PageHeader heading={'Support'} subheading={''} />
      <Note NoteDetail={SupportPageNote} />
      <form onSubmit={formik.handleSubmit}>
        <TextField
          margin="dense"
          fullWidth
          label={'Email Id'}
          name="EmailId"
          type="text"
          variant="standard"
          value={formik.values.EmailId}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} />
        {formik.touched.EmailId && formik.errors.EmailId ? (
          <ErrorMessage1 Error={formik.errors.EmailId} />
        ) : null}
        <TextField
          margin="dense"
          fullWidth
          label={'Mobile Number'}
          name="MobileNumber"
          type="text"
          variant="standard"
          inputProps={{ maxLength: 10 }}
          value={formik.values.MobileNumber}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.MobileNumber && formik.errors.MobileNumber ? (
          <ErrorMessage1 Error={formik.errors.MobileNumber} />
        ) : null
        }

        <TextField
          margin="dense"
          fullWidth
          label={'Problems Subject'}
          name="ProblemsSubject"
          inputProps={{ maxLength: 200 }}
          type="text"
          variant="standard"
          value={formik.values.ProblemsSubject}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.ProblemsSubject && formik.errors.ProblemsSubject ? (
          <ErrorMessage1 Error={formik.errors.ProblemsSubject} />
        ) : null
        }

        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Description"
          minRows={4}
          name="Description"
          value={formik.values.Description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ width: "100%" }}
        />
        {formik.touched.Description && formik.errors.Description ? (
          <ErrorMessage1 Error={formik.errors.Description} />
        ) : null}
        <Box className={classes.iIconSupport} sx={{ mb: "-35px", mr: "0px" }}>
          <Icon3 Note={FileValidationNote} />
        </Box>
        <Box sx={{ my: "20px" }}>
          <input ref={aRef} type="file" onChange={changeFile} />
        </Box>
        {error && <Errormessage Error={error} />}

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

export default Support