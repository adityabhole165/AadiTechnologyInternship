import { useEffect, useState } from 'react';
import { Container, TextField, Grid, Checkbox, Typography, Box, Card, Hidden } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import PageHeader from 'src/libraries/heading/PageHeader';
import BackButton from 'src/libraries/button/BackButton';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { GetEmailSettings, UpdateUserEmailSetting, ResetUpdateUserEmailSetting } from 'src/requests/MessageCenter/MessaageCenter';
import { toast } from 'react-toastify';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';

const EmailSettings = () => {
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

    const [emailAddress, setEmailAddress] = useState('')
    const [emailAddressErrorFlag, setemailAddressErrorFlag] = useState<boolean>(false);
    const validEMailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const [submitButtonDisabled, setsubmitButtonDisabled] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState(false)
    const EmailSettingbody = {
        "asSchoolId": localStorage.getItem('localSchoolId'),
        "asUserId": sessionStorage.getItem('Id'),
    };

    const UpdateUserEmailSettingbody = {
        "asSchoolId": localStorage.getItem('localSchoolId'),
        "asUserId": sessionStorage.getItem('Id'),
        "asCanReceiveMail": isChecked ? "Y" : "N",
        "asEmailAddress": emailAddress
    };
    useEffect(() => {
        dispatch(GetEmailSettings(EmailSettingbody));
    }, [])

    useEffect(() => {
        setEmailAddress(EmailSettings?.EmailAddress);
        setIsChecked(EmailSettings?.CanReceiveMail === "Y")
    }, [EmailSettings])

    useEffect(() => {
        if (UpdationMessage !== '')
            toast.success(UpdationMessage, { toastId: 'success1' })
        dispatch(ResetUpdateUserEmailSetting());

    }, [UpdationMessage])

    const clickReset = () => {
    inputFiledBlur(EmailSettings?.EmailAddress);
        setIsChecked(EmailSettings?.CanReceiveMail === "Y")
    }
    const clickSubmit = () => {
        if(emailAddressErrorFlag == false){
        dispatch(UpdateUserEmailSetting(UpdateUserEmailSettingbody));
        }
    }
    const checkBoxHandler = (e) => {
        if (e.target.checked) {
            setsubmitButtonDisabled(false);
        }
        if (!e.target.checked) {
            setsubmitButtonDisabled(true);
        }
    };
    const inputFiledBlur = (value) => {
        setEmailAddress(value)
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

    return (

        <Container maxWidth = {'xl'}>
            <Hidden smUp>
            <BackButton FromRoute={"/MessageCenter/msgCenter"} />
            </Hidden>
      
            <PageHeader heading={'Email Setting'} subheading={''} />
            {Loading && (<SuspenseLoader />)}
            <Card component={Box} sx={{ display: "flex" }} mb={1}>
                <Checkbox size="small"
                    name="IsChecked"
                    // checked={isChecked}
                    // defaultChecked={true}
                    onChange={(e) => checkBoxHandler(e)}
                />
                <Typography variant='body2' component={Box} p={1}>Yes I want to receive message on below Email address.</Typography>
            </Card>
            <TextField fullWidth margin="dense" size="small"
                id="Email Id" name="Email Id"
                label="Email Id"
                value={emailAddress}
                onChange={(e) => { inputFiledBlur(e.target.value) }}
                variant="standard"
            />
             {emailAddressErrorFlag ? (
                  <Box sx={{my:1}}><Errormessage Error={'Please enter valid email address'} /></Box>
                ) : null}
            <Grid container spacing={2}>
                <Grid item xs={6} mt={0.4}>
                    <ButtonPrimary onClick={clickSubmit}
                        type="submit" fullWidth color='primary' disabled={submitButtonDisabled}>
                        Submit
                    </ButtonPrimary>
                </Grid>
                <Grid item xs={6} mt={0.4}>
                    <ButtonPrimary fullWidth color='secondary' type='reset'
                        onClick={clickReset} >
                        Reset
                    </ButtonPrimary>
                </Grid>
            </Grid>
        </Container>
    )
}

export default EmailSettings