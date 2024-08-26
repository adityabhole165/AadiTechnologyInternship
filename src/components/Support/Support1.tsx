import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import SingleFile2 from 'src/libraries/File/SingleFile2';
import CommonPageHeader from '../CommonPageHeader';
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox';

const Support1 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asFolderName = localStorage.getItem('FolderName');
    const [radioBtn, setRadioBtn] = useState('1');
    const [problemSubject, setProblemSubject] = useState('');
    const [base64URL, setbase64URL] = useState('');
    const [AttatchmentFile, setAttatchmentFile] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobilenumber, setMobilenumber] = useState(sessionStorage.getItem('MobileNumber'));
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const ValidFileTypes = ['XLS', 'XLSX', 'DOC', 'DOCX', 'PDF', 'JPG', 'JPEG'];
    const MaxfileSize = 20000000;

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const ChangeFile = (value) => {
        setAttatchmentFile(value.Name);
        setbase64URL(value.Value);
    };
    const handleSubmit = () => {

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
                                <Tooltip
                                    title={`Please write us your queries/ problem. We will try our level best to assist you.`}
                                >
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
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title={'Submit'}>
                                    <IconButton
                                        type='submit'
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: green[600] }
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </>
                    }
                />
                <Grid sx={{ backgroundColor: 'white', mb: 2, p: 1.5 }}>
                    <Typography variant="h4" gutterBottom>
                        Support Request
                    </Typography>
                </Grid >
                <Grid sx={{ backgroundColor: 'white', p: 1 }}>
                    <Typography variant="h5" gutterBottom>
                        Dear Teacher, <br />
                    </Typography>
                    <Typography variant="body1" gutterBottom >
                        Mention the Subject for your Support Request and Description of the problem in detail with exact steps if possible. You may attach a file as a supporting document. It will help our support member to understand the problem in full and speed up the resolution of your request.
                    </Typography>
                </Grid >
                <Grid sx={{ backgroundColor: 'white', p: 1 }}>
                    <Typography variant="h4" gutterBottom>
                        Write to Us
                    </Typography>
                </Grid >
                <Box sx={{ backgroundColor: 'white', mb: 2, p: 1 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label={
                            <span>
                                E-mail Address  <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}

                    /></Grid>
                    <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Mobile Number :"
                        variant="outlined"
                        value={mobilenumber}
                        onChange={(e) => setMobilenumber(e.target.value)}
                       
                    /></Grid>
                    <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        // label="Problem Subject : "
                        label={
                            <span>
                                Problem Subject  <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        variant="outlined"
                        value={problemSubject}
                        onChange={(e) => setProblemSubject(e.target.value)}
                      
                    /></Grid>
                     <Grid item xs={12} md={6} >
                        <Grid>
                        <SingleFile2
                            ValidFileTypes={ValidFileTypes}
                            MaxfileSize={MaxfileSize}
                            ChangeFile={ChangeFile}
                            errorMessage={''}
                            FileName={AttatchmentFile}
                            FileLabel={'Attachment : '}
                            height={"52px"}
                            width={'100%'}
                            isMandatory
                        />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                    <ResizableTextField
                        fullWidth
                        // label="Description :"
                        label={
                            <span>
                                Description  <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        variant="outlined"
                        multiline
                        // rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ mb: 2 }}
                    /></Grid>
                   </Grid>
                </Box >
            </Box>

        </>
    );
};

export default Support1;
