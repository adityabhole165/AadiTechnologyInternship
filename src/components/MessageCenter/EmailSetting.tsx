import { useEffect, useState } from 'react';
import { Container, TextField, Grid, Checkbox, Typography, Box, Card } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import PageHeader from 'src/libraries/heading/PageHeader';
import BackButton from 'src/libraries/button/BackButton';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { GetEmailSettings, UpdateUserEmailSetting, ResetUpdateUserEmailSetting } from 'src/requests/MessageCenter/MessaageCenter';
import { toast } from 'react-toastify';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

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
            toast(UpdationMessage, { toastId: 'success1'})
        dispatch(ResetUpdateUserEmailSetting());

    }, [UpdationMessage])

    const clickReset = () => {
        setEmailAddress(EmailSettings?.EmailAddress);
        setIsChecked(EmailSettings?.CanReceiveMail === "Y")
    }
    const clickSubmit = () => {
        dispatch(UpdateUserEmailSetting(UpdateUserEmailSettingbody));
    }

    return (

        <Container>
            <BackButton FromRoute={"/MessageCenter/msgCenter"} />
            <PageHeader heading={'Email Setting'} subheading={''} />
            {Loading && (<SuspenseLoader />)}
            <Card component={Box}  sx={{ display: "flex" }}>
                <Checkbox size="small"
                    name="IsChecked"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                />
                <Typography variant='body2' component={Box} p={1}>Yes I want to receive message on below Email address.</Typography>
            </Card>
            <TextField fullWidth margin="dense" size="small"
                id="EmailId" name="EmailId"
                label={emailAddress === undefined ? "EmailId" : ''}
                value={emailAddress}
                onChange={(e)=>{setEmailAddress(e.target.value)}}
            />
            <Grid container spacing={2}>
          <Grid item xs={6}>
            <ButtonPrimary onClick={clickSubmit}
              type="submit" fullWidth color='primary'>
              Submit
            </ButtonPrimary>
          </Grid>
          <Grid item xs={6}>
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