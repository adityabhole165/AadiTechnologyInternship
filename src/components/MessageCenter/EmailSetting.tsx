import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Hidden,
  TextField,
  Typography
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';
import BackButton from 'src/libraries/button/BackButton';
import {
  GetEmailSettings,
  ResetUpdateUserEmailSetting,
  UpdateUserEmailSetting,
} from 'src/requests/MessageCenter/MessaageCenter';
import { RootState } from 'src/store';

const EmailSettingsDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const EmailSettings = useSelector(
    (state: RootState) => state.MessageCenter.EmailSettings
  );
  const UpdationMessage = useSelector(
    (state: RootState) => state.MessageCenter.UpdationMessage
  );

  const Loading = useSelector(
    (state: RootState) => state.MessageCenter.Loading
  );

  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressErrorFlag, setemailAddressErrorFlag] =
    useState<boolean>(false);
  const validEMailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [submitButtonDisabled, setsubmitButtonDisabled] =
    useState<boolean>(true);
  const [isChecked, setIsChecked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog open/close

  const EmailSettingbody = {
    asSchoolId: localStorage.getItem('localSchoolId'),
    asUserId: sessionStorage.getItem('Id'),
  };

  const UpdateUserEmailSettingbody = {
    asSchoolId: localStorage.getItem('localSchoolId'),
    asUserId: sessionStorage.getItem('Id'),
    asCanReceiveMail: isChecked ? 'Y' : 'N',
    asEmailAddress: emailAddress,
  };

  useEffect(() => {
    dispatch(GetEmailSettings(EmailSettingbody));
  }, []);

  useEffect(() => {
    setEmailAddress(EmailSettings?.EmailAddress);
    setIsChecked(EmailSettings?.CanReceiveMail === 'Y');
  }, [EmailSettings]);

  // useEffect(() => {
  //   if (UpdationMessage !== '')
  //     toast.success("Email setting saved successfully.");
  //   dispatch(ResetUpdateUserEmailSetting());
  // }, [UpdationMessage]);
  useEffect(() => {
    if (UpdationMessage !== '') {
      toast.success("Email setting saved successfully.");
      setOpen(false);
      dispatch(ResetUpdateUserEmailSetting());
    }
  }, [UpdationMessage, dispatch, setOpen]);

  const clickReset = () => {
    inputFiledBlur(EmailSettings?.EmailAddress);
    setIsChecked(EmailSettings?.CanReceiveMail === 'Y');
  };

  // const clickSubmit = () => {
  //   if (emailAddress === '') {
  //     setemailAddressErrorFlag(true);
  //     return;
  //   }
  //   if (emailAddressErrorFlag == false) {
  //     dispatch(UpdateUserEmailSetting(UpdateUserEmailSettingbody));
  //   }
  // };
  const clickSubmit = () => {
    if (emailAddress === '') {
      setemailAddressErrorFlag(true);
      return;
    }

    if (!emailAddressErrorFlag) {
      dispatch(UpdateUserEmailSetting(UpdateUserEmailSettingbody));
    }
  };
  const checkBoxHandler = (e) => {
    if (e.target.checked) {
      setsubmitButtonDisabled(false);
    }
    if (!e.target.checked) {
      setsubmitButtonDisabled(true);
    }
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

  const inputFiledFocus = (e) => {
    setemailAddressErrorFlag(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>

      {/* Email Settings as Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth={'sm'}
        PaperProps={{
          sx: {
            borderRadius: "15px",
          }
        }}
      >
        <DialogTitle sx={{ bgcolor: '#223354' }}>
          <ClearIcon onClick={handleClose}
            sx={{
              color: 'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '5px',
              right: '8px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red',
              }
            }} />

        </DialogTitle>
        <Typography variant="h3" sx={{ pt: 1, pl: 4 }}>
          Email Setting
        </Typography>
        <DialogContent>
          <Box sx={{ px: 2 }}>
            <Hidden smUp>
              <BackButton FromRoute={'/MessageCenter/msgCenter'} />
            </Hidden>

            {Loading && <SuspenseLoader />}
            <Card component={Box} sx={{ display: 'flex' }} mb={2}>
              <Checkbox
                size="small"
                name="IsChecked"
                onChange={(e) => checkBoxHandler(e)}
              />
              <Typography variant="body2" component={Box} p={2}>
                Yes, I want to receive messages on the below email address.
              </Typography>
            </Card>
            <TextField
              fullWidth
              variant="outlined"
              label={
                <span>
                  Email Id
                </span>
              }
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            // error={emailAddressErrorFlag}
            />
            {emailAddressErrorFlag ? (
              <Box sx={{ my: 1 }}>
                <Errormessage Error={'Email should not be blank.'} />
              </Box>
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid item xs={12} md={12} >
            <Grid direction={"row"} gap={2} alignItems={"center"} sx={{ ml: 43, pb: 2 }}>

              <Button sx={{
                ml: 2,
                color: 'red',
                ':hover': { backgroundColor: red[100] }
              }} onClick={handleClose}>
                Close
              </Button>
              <Button sx={{
                // backgroundColor: green[100],
                color: 'green',
                ':hover': { backgroundColor: green[100] }
              }} onClick={clickSubmit}
                disabled={submitButtonDisabled}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmailSettingsDialog;
