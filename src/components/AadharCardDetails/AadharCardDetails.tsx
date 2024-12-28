import { Box, Grid, Grow, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'src/assets/style/BdayCard.css';
import { Styles } from 'src/assets/style/student-style';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';
import PageHeader from 'src/libraries/heading/PageHeader';
import Icon5 from 'src/libraries/icon/icon5';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import {
  getUserAadharCardDetails,
  getsaveUserAadharCardDetails,
  resetMessage
} from 'src/requests/AadharCardDetails/RequestAadharCard';
import { RootState } from 'src/store';
import { CheckFileValidationAdhar } from '../Common/Util';

// import 'src/assets/style/BdayCard.css';

function AadharCardDetails() {
  const GetUserAadharCardDetails: any = useSelector(
    (state: RootState) => state.AadharCardDetails.GetUserAadharCardDetails
  );

  const SaveUserAadharCardDetails: any = useSelector(
    (state: RootState) => state.AadharCardDetails.SaveUserAadharCardDetails
  );
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(true);
  const SchoolName = localStorage.getItem('SchoolName');
  const aRef = useRef(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressErrorFlag, setemailAddressErrorFlag] =
    useState<boolean>(false);
  const [fileName, setFileName] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [aadharName, setAadharName] = useState('');
  const [mother, setMother] = useState('');
  const [base64URL, setBase64URL] = useState('');
  const [error, setError] = useState(false);
  const [errorname, setErrorname] = useState(false);
  const [fileError, setFileError] = useState('');
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const classes = Styles();
  const validFiles = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
  const maxfileSize = 3000000;
  const [selectedFile, setSelectedFile] = useState(null);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(sessionStorage.getItem('Id'));
  const asUserRoleId = sessionStorage.getItem('RoleId');
  let enableButton =
    selectedFile !== null ||
    GetUserAadharCardDetails.AadharCardNo !== aadharNumber;
  const validEMailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    dispatch(getUserAadharCardDetails(GetUserAadharCardDetailsBody));
  }, [SaveUserAadharCardDetails]);

  useEffect(() => {
    setAadharNumber(GetUserAadharCardDetails.AadharCardNo);
    setAadharName(GetUserAadharCardDetails.NameOnAadharCard);
    setMother(GetUserAadharCardDetails.MotherTounge);
    setEmailAddress(GetUserAadharCardDetails.Email);
  }, [GetUserAadharCardDetails]);

  useEffect(() => {
    if (SaveUserAadharCardDetails.Message !== undefined) {
      toast.success(SaveUserAadharCardDetails.Message, { toastId: 'success1' });
      dispatch(resetMessage());
      setSelectedFile(null);
    }
  }, [SaveUserAadharCardDetails]);
  const GetUserAadharCardDetailsBody = {
    aiUserId: asUserId,
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId
  };

  const SaveUserAadharCardDetailsBody = {
    aiUserId: asUserId,
    asSchoolId: asSchoolId,
    asAadharCardNo: aadharNumber,
    asAadharCardFileName: fileName,
    asUserRoleId: asUserRoleId,
    asAadharCardBase64String: base64URL,
    asNameOnAadharCard: aadharName,
    asMotherTongue: mother,
    asEmailId: emailAddress
  };

  const clickError = (e) => {
    if (e.target.value.length > 0) {
      setError(false);
    }
    if (e.target.value.length == 0) {
      setError(true);
    }
  };
  const changeAdharName = (value) => {
    setAadharName(value);
    if (value.length > 0) {
      setErrorname(false);
    }
  };
  const changeMotherTounge = (value) => {
    setMother(value);
  };
  const inputFiledBlur = (value) => {
    setEmailAddress(value);
    const EmailErrorFlag = validEMailFormat.test(value);
    if (EmailErrorFlag == false && value.length !== 0) {
      setemailAddressErrorFlag(true);
    }
    if (EmailErrorFlag == true) {
      setemailAddressErrorFlag(false);
    }
  };
  const changeAdhar = (value) => {
    const re = /^[0-9\b]+$/;
    if (value === '') setAadharNumber(value);
    if (re.test(value)) {
      if (value.length == 0) {
        setError(true);
      }
      if (value.length > 0) {
        setError(false);
      }

      if (value.length >= 12) {
        setError1(true);
      }
      if (value.length <= 12) {
        setError1(false);
      }
      setAadharNumber(value);
    }
  };

  const changeFile = async (e) => {
    const multipleFiles = e.target.files;
    let base64URL: any = '';
    let DataAttachment: any = '';
    let fileName: any = '';
    for (let i = 0; i < multipleFiles.length; i++) {
      const isValid = CheckFileValidationAdhar(
        multipleFiles[i],
        validFiles,
        maxfileSize
      );
      if (isValid == null) {
        setFileName(multipleFiles[i].name);
        setSelectedFile(e.target.files[i]);
        base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
        setBase64URL(base64URL.slice(base64URL.indexOf(',') + 1));
        setFileError('');
      } else {
        setFileError(isValid);
        aRef.current.value = null;
      }
    }
  };
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

  const clickSubmit = () => {
    let arr = GetUserAadharCardDetails.AadharCardFileName.split('/');
    let arrLength = arr.length;
    let imgName = '';
    if (arrLength > 0) imgName = arr[arrLength - 1];
    if (aadharNumber.length === 0) {
      setError(true);
    }
    if (aadharName.length === 0) {
      setErrorname(true);
    }
    // if (imgName === '' && selectedFile === null) {
    //     setFileError('Please upload the file')
    // }
    else {
      if (aadharNumber.length !== 0 && aadharName.length !== 0) {
        dispatch(getsaveUserAadharCardDetails(SaveUserAadharCardDetailsBody));
        // aRef.current.value = null
      }
    }
  };
  //console.log('mother', mother);

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Update Profile'} subheading={''} />
      <Grow
        in={checked}
        style={{ transformOrigin: '0 0 1' }}
        {...(checked ? { timeout: 1500 } : {})}
      >
        <ListStyle>
          <Grid container>
            <Grid item xs={4}>
              <Typography>
                {' '}
                <b>Name :</b>{' '}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{GetUserAadharCardDetails.Name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                {' '}
                <b>Aadhaar Number : </b>{' '}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <input
                type="text"
                value={aadharNumber}
                onChange={(e) => {
                  changeAdhar(e.target.value);
                }}
                maxLength={12}
              />

              <ErrorMessage1
                Error={error ? 'Please enter Aadhar Card Number.' : ' '}
              />
              <ErrorMessage1
                Error={error1 ? 'Number should not exceed 12 digit.' : ' '}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography>
                {' '}
                <b>Name Present On Aadhaar Card : </b>
              </Typography>
            </Grid>

            <Grid item xs={8} mt={1}>
              <input
                type="text"
                value={aadharName}
                onChange={(e) => changeAdharName(e.target.value)}
              />
              <ErrorMessage1
                Error={errorname ? 'Please enter Aadhar Card Name.' : ' '}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ mt: '5px' }}>
                <b>Email Id : </b>{' '}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <input
                type="text"
                value={emailAddress}
                onChange={(e) => {
                  inputFiledBlur(e.target.value);
                }}
              />
              {emailAddressErrorFlag ? (
                <Box sx={{ my: 1 }}>
                  <Errormessage Error={'Please enter valid email address'} />
                </Box>
              ) : null}
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ mt: '5px' }}>
                <b>Mother Tongue : </b>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <input
                type="text"
                value={mother}
                onChange={(e) => changeMotherTounge(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ my: '10px', textAlign: 'center' }}>
            {GetUserAadharCardDetails.AadharCardFileName ===
              '/RITeSchool/DOWNLOADS/Aadhar Cards/' ? (
              <img
                style={{ height: '150px', width: '150px' }}
                src={'/imges/Adhar.png'}
                alt={'adhar'}
              />
            ) : (
              <>
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    width="150"
                    height="150"
                    style={{ border: '1px solid gray', padding: '1px' }}
                  />
                ) : (
                  <img
                    src={
                      localStorage.getItem('SiteURL') +
                      GetUserAadharCardDetails.AadharCardFileName
                    }
                    width="150"
                    height="150"
                    style={{ border: '1px solid gray', padding: '1px' }}
                  />
                )}
              </>
            )}
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <input
              ref={aRef}
              type="file"
              onChange={changeFile}
              style={{ width: '200px' }}
            />
          </Box>
          <Box className={classes.iIconSupport}>
            <Icon5
              Note={
                'Supports only ' +
                validFiles.join(', ') +
                ' files types up to 3 MB'
              }
            />
          </Box>

          {fileError && <Errormessage Error={fileError} />}

          <ButtonPrimary
            onClick={clickSubmit}
            fullWidth
            color={enableButton ? 'primary' : 'primary'}
          >
            Submit
          </ButtonPrimary>
        </ListStyle>
      </Grow>
    </Box>
  );
}

export default AadharCardDetails;
