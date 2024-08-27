import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { IGetUserDetailsBody, ISaveStudentDetailsForSupportBody } from 'src/interfaces/Student/ISupport';
import SingleFile2 from 'src/libraries/File/SingleFile2';
import { getSaveSupport, getUserDetailss, ResetMessage } from 'src/requests/Support/RequestSupport';
import { RootState } from 'src/store';
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox';
import CommonPageHeader from '../CommonPageHeader';

const Support1 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const RoleId = sessionStorage.getItem('RoleId');
    const asUserId = Number(localStorage.getItem('UserId'));
    const [problemSubject, setProblemSubject] = useState('');
    const [base64URL, setbase64URL] = useState('');
    const [AttatchmentFile, setAttatchmentFile] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobilenumber, setMobilenumber] = useState(sessionStorage.getItem('MobileNumber'));
    const [description, setDescription] = useState('');
    const [ErrorproblemSubject, setErrorProblemSubject] = useState('');
    const [ErroremailId, setErrorEmailId] = useState('');
    const [Errormobilenumber, setErrorMobilenumber] = useState('');
    const [Errordescription, setErrorDescription] = useState('');
    const ValidFileTypes = ['XLS', 'XLSX', 'DOC', 'DOCX', 'PDF', 'JPG', 'JPEG'];
    const MaxfileSize = 20000000;
    const { showAlert, closeAlert } = useContext(AlertContext);
    const UserDetail = useSelector((state: RootState) => state.Support.getUserDetails);
    console.log(UserDetail, 'bbbbbbb')
    const SubmitSupport = useSelector((state: RootState) => state.Support.SaveSupport);


    useEffect(() => {
        if (UserDetail) {
            setEmailId(UserDetail)
            console.log(emailId, UserDetail, 'bbbbbbb')
        }
    }, [UserDetail]);

    useEffect(() => {
        const UserDetailBody: IGetUserDetailsBody = {
            asSchoolId: asSchoolId,
            asUserId: asUserId,
            asRoleId: Number(RoleId)
        };
        dispatch(getUserDetailss(UserDetailBody));
    }, []);

    const submitResult = () => {
        const SaveSupportBody: ISaveStudentDetailsForSupportBody = {
            asSchoolId: asSchoolId,
            asAcademicYrId: asAcademicYearId,
            asFileName: AttatchmentFile,
            asDescription: description,
            asEmailAddress: emailId,
            asUserId: asUserId,
            asSaveFeature: 'Support',
            asSubject: problemSubject,
            asMobileNo: mobilenumber,
            asBase64String: base64URL,
            asFolderName: 'PPSN Website'
        };

        showAlert({
            title: 'Please Confirm',
            message: 'Are you sure you want to submit the support request?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: closeAlert,
            onConfirm: () => {
                dispatch(getSaveSupport(SaveSupportBody));
                closeAlert();
            }
        });
    };

    const ClickSubmitSupport = () => {
        let isError = false;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailId.trim()) {
            setErrorEmailId('Email Address should not be blank.');
            isError = true;
        } else if (!emailRegex.test(emailId)) {
            setErrorEmailId('E-mail should be in valid format.(For Example : john.smith@yahoo.com)');
            isError = true;
        } else {
            setErrorEmailId('');
        }

        const mobileNumberRegex = /^[0-9]{10}$/;
        if (!mobilenumber.trim()) {
            setErrorMobilenumber('Mobile number should not be blank.');
            isError = true;
        } else if (mobilenumber.length > 10) {
            setErrorMobilenumber('Mobile number should not exceed 10 digits.');
            isError = true;
        } else if (!mobileNumberRegex.test(mobilenumber)) {
            setErrorMobilenumber('Mobile Number should be of 10 digits.');
            isError = true;
        } else {
            setErrorMobilenumber('');
        }

        if (!problemSubject.trim()) {
            setErrorProblemSubject('Problem subject should not be blank.');
            isError = true;
        } else {
            setErrorProblemSubject('');
        }
        if (!description.trim()) {
            setErrorDescription('Problem Description should not be blank.');
            isError = true;
        } else {
            setErrorDescription('');
        }

        if (!isError) {
            submitResult();
        }
    };
    const resetFields = () => {
        setProblemSubject('');
        setbase64URL('');
        setAttatchmentFile('');
        setEmailId(emailId);
        setMobilenumber(sessionStorage.getItem('MobileNumber'));
        setDescription('');
        setErrorProblemSubject('');
        setErrorEmailId('');
        setErrorMobilenumber('');
        setErrorDescription('');
    };

    useEffect(() => {
        if (SubmitSupport) {
            toast.success(SubmitSupport);
            resetFields();
            dispatch(ResetMessage());
        }
    }, [SubmitSupport]);

    const ChangeFile = (value) => {
        setAttatchmentFile(value.Name);
        setbase64URL(value.Value);
    };

    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'Support',
                            path: ''
                        }
                    ]}
                    rightActions={
                        <>
                            <Box>
                                <Tooltip title={'Please write us your queries/ problem. We will try our level best to assist you'}>
                                    <span>
                                        <IconButton
                                            sx={{
                                                color: 'white',
                                                backgroundColor: grey[500],
                                                height: '36px !important',
                                                ':hover': { backgroundColor: grey[600] }
                                            }}
                                        >
                                            <QuestionMarkIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title={'Save'}>
                                    <span>
                                        <IconButton
                                            sx={{
                                                color: 'white',
                                                backgroundColor: green[500],
                                                height: '36px !important',
                                                ':hover': { backgroundColor: green[600] }
                                            }}
                                            onClick={ClickSubmitSupport}
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                        </>
                    }
                />
                <Grid sx={{ backgroundColor: 'white', mb: 2, p: 1.5 }}>
                    <Typography variant="h4" gutterBottom>
                        Support Request
                    </Typography>
                </Grid>
                <Grid sx={{ backgroundColor: 'white', p: 1 }}>
                    <Typography variant="h5" gutterBottom>
                        Dear Teacher, <br />
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Mention the Subject for your Support Request and Description of the problem in detail with exact steps if possible. You may attach a file as a supporting document. It will help our support member to understand the problem in full and speed up resolution of your request.
                    </Typography>
                </Grid>
                <Grid sx={{ backgroundColor: 'white', p: 1 }}>
                    <Typography variant="h4" gutterBottom>
                        Write to Us
                    </Typography>
                </Grid>
                <Box sx={{ backgroundColor: 'white', mb: 2, p: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label={
                                    <span>
                                        E-mail Address <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                error={!!ErroremailId}
                                helperText={ErroremailId}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Mobile Number :"
                                variant="outlined"
                                value={mobilenumber}
                                onChange={(e) => setMobilenumber(e.target.value)}
                                error={!!Errormobilenumber}
                                helperText={Errormobilenumber}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label={
                                    <span>
                                        Problem Subject <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                variant="outlined"
                                value={problemSubject}
                                onChange={(e) => setProblemSubject(e.target.value)}
                                error={!!ErrorproblemSubject}
                                helperText={ErrorproblemSubject}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SingleFile2
                                ValidFileTypes={ValidFileTypes}
                                MaxfileSize={MaxfileSize}
                                ChangeFile={ChangeFile}
                                errorMessage={''}
                                FileName={AttatchmentFile}
                                FileLabel={'Attachment : '}
                                height={"52px"}
                                width={'100%'}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ResizableTextField
                                fullWidth
                                label={
                                    <span>
                                        Description <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                variant="outlined"
                                multiline
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                error={!!Errordescription}
                                helperText={Errordescription}
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default Support1;
