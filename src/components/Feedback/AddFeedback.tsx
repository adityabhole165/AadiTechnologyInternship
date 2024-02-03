import {
  Box,
  Container,
  Fade,
  Grid,
  TextField,
  TextareaAutosize
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';
import Note from 'src/libraries/Note/Note';
import RadioButton from 'src/libraries/RadioButton/RadioButton';
import BackButton from 'src/libraries/button/BackButton';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import {
  removeSuccessMessage,
  saveFeedbackdetails
} from 'src/requests/Feedback/RequestFeedback';
import { RootState } from 'src/store';

const AddFeedback = () => {
  const dispatch = useDispatch();
  const SchoolName = localStorage.getItem('SchoolName');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserid = sessionStorage.getItem('Id');
  const [radioBtn, setRadioBtn] = useState('1');
  const [type, setType] = useState('1');
  const [message, setMessage] = useState(''); //enter only alphabets

  const AddFeedbackList: any = useSelector(
    (state: RootState) => state.FeedBack.AddFeedbackList
  );
  const loading = useSelector((state: RootState) => state.FeedBack.Loading);

  const lstFeedbackFor = [
    { Name: 'School', Value: '1' },
    { Name: 'Software', Value: '2' }
  ];
  const lstFeedbackType = [
    { Name: 'General Feedback', Value: '1' },
    { Name: 'Concern or Issue', Value: '2' },
    { Name: 'Testimonial', Value: '3' }
  ];
  const note = [
    'Dear User,',
    'Thank you for using Software for ' +
      SchoolName +
      '. You are a valued user, and we are committed to providing the best possible services that will fulfill the need of our users. Your valuable feedback is very important to us which encourage gets us to serve you better! If you have any suggestions related to school or software, queries, or even a testimonial you would like to share, please submit them below.'
  ];

  const ClickDropdown = (value) => {
    setType(value);
  };
  const ClickRadio = (value) => {
    setRadioBtn(value);
  };
  //enter only alphabets
  const alphabetsOnly = (event) => {
    const result = event.target.value.replace(/[^a-z]/gi, '');
    setMessage(result);
  };

  const formik = useFormik({
    initialValues: {
      EmailId: '',
      Name: '',
      Comments: '',
      SchoolSoftware: '1'
    },
    onReset: () => {
      setRadioBtn('1');
      setType('1');
    },
    onSubmit: (values, { resetForm }) => {
      submit();
      resetForm();
    },
    validate: (values) => {
      const emailRegExp = /^\S+@\S+\.\S+$/;

      const errors: any = {};
      if (!values.Comments) {
        errors.Comments = 'Please enter feedback message.';
      }
      if (!values.Name) {
        errors.Name = 'Name should not be blank.';
      }
      if (!values.EmailId) {
        errors.EmailId = 'Email Id should not be blank.';
      } else if (!emailRegExp.test(values.EmailId)) {
        errors.EmailId = 'Invalid email address';
      }
      return errors;
    }
  });
  const AddFeedbackBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiFeedbackfor: radioBtn == '1' ? 'School' : 'Software',
    aiUserId: asUserid,
    aiFeedbackDescription: formik.values.Comments,
    aiFeedbackTypeId: type,
    aiInsertedById: asUserid,
    aiemail: formik.values.EmailId,
    aiUserName: formik.values.Name,
    asMailSubject: '',
    asAdminMailAddress: '',
    asLogin: ''
  };
  useEffect(() => {
    if (AddFeedbackList !== null)
      toast.success(AddFeedbackList.Message, { toastId: 'success1' });
    dispatch(removeSuccessMessage());
  }, [AddFeedbackList.Message]);

  const submit = () => {
    dispatch(saveFeedbackdetails(AddFeedbackBody));
  };
  const showToastMessage = () => {
    if (
      formik.values.Name !== '' ||
      formik.values.Comments !== '' ||
      formik.values.EmailId !== ''
    ) {
      toast.success(AddFeedbackList.Message);
    }
  };

  return (
    <>
      <PageHeader heading={'Add Feedback'} subheading={''} />
      <BackButton FromRoute={'/Student/Feedback'} />
      <Container>
        <Fade in={true} {...(true ? { timeout: 1500 } : {})}>
          <ListStyle>
            <Note NoteDetail={note} />
            {loading && <SuspenseLoader />}

            <form onSubmit={formik.handleSubmit}>
              <RadioButton
                Array={lstFeedbackFor}
                ClickRadio={ClickRadio}
                defaultValue={radioBtn}
                Label={'Feedback for :'}
              />
              <Dropdown
                Array={lstFeedbackType}
                handleChange={ClickDropdown}
                defaultValue={type}
              />
              <TextField
                id="standard-basic"
                name="Name"
                variant="standard"
                fullWidth
                label="Name"
                onBlur={formik.handleBlur}
                value={message && formik.values.Name}
                onChangeCapture={alphabetsOnly}
                onChange={formik.handleChange}
                sx={{ mt: '5px' }}
              />
              <Box sx={{ mt: '10px' }}>
                {formik.touched.Name && formik.errors.Name ? (
                  <Errormessage Error={formik.errors.Name} />
                ) : null}
              </Box>
              <TextField
                fullWidth
                margin="normal"
                label={'Email Id'}
                name="EmailId"
                type="text"
                variant="standard"
                value={formik.values.EmailId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ mt: '5px' }}
              />
              <Box sx={{ mt: '3px' }}>
                {' '}
                {formik.touched.EmailId && formik.errors.EmailId ? (
                  <Errormessage Error={formik.errors.EmailId} />
                ) : null}
              </Box>

              <TextareaAutosize
                name="Comments"
                value={formik.values.Comments}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-label="empty textarea"
                placeholder="Comments"
                minRows={4}
                style={{ width: '100%', marginTop: '5px' }}
                // nonce={undefined}
                // onResize={undefined}
                // onResizeCapture={undefined}
              />
              <Box sx={{ mt: '3px' }}>
                {' '}
                {formik.touched.Comments && formik.errors.Comments ? (
                  <Errormessage Error={formik.errors.Comments} />
                ) : null}
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ marginTop: '4px' }}>
                  <ButtonPrimary
                    onChange={formik.handleChange}
                    type="submit"
                    fullWidth
                    color="primary"
                  >
                    Submit
                  </ButtonPrimary>
                </Grid>
                <Grid item xs={6} sx={{ marginTop: '4px' }}>
                  <ButtonPrimary
                    fullWidth
                    color="secondary"
                    type="reset"
                    onClick={formik.handleReset}
                  >
                    Reset
                  </ButtonPrimary>
                </Grid>
              </Grid>
            </form>
          </ListStyle>
        </Fade>
      </Container>
    </>
  );
};

export default AddFeedback;
