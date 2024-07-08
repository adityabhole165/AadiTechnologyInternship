import Close from '@mui/icons-material/Close';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, red, yellow } from '@mui/material/colors';
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';
import SingleFile from 'src/libraries/File/SingleFile';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import SelectListChild from 'src/libraries/SelectList/SelectListChild';
import CommonPageHeader from '../CommonPageHeader';
import validationSchema from './ValidationSchema';




const AddSchoolNotice1: React.FC = () => {
    const [radioBtn, setRadioBtn] = useState('1');
    const [fileName1, setFileName1] = useState('');
    const [FileError, setFileError] = useState('');
    const [FileName2, setFileName2] = useState('');
    const [ItemList, setitemList] = useState([]);
    const [text, setText] = useState<string>('');


    const [applicableTo, setApplicableTo] = useState({
        admin: false,
        teacher: false,
        student: false,
        adminStaff: false,
        otherStaff: false,
    });


    const RadioListCT = [
        { Value: '1', Name: 'File' },
        { Value: '2', Name: 'Text' }
    ];
    const ValidFileTypes1 = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
    const MaxfileSize1 = 3000000;
    const ValidFileTypes2 = ['JPG', 'PNG', 'BMP', 'JPEG'];
    const MaxfileSize2 = 1000000;


    const navigate = useNavigate();

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApplicableTo({
            ...applicableTo,
            [event.target.name]: event.target.checked,
        });
    };


    const ClickRadio = (value) => {
        setRadioBtn(value);
    };

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    // MS Word ToolBox
    const handleTextChange = (value: string) => {
        setText(value);
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];
    // MS Word ToolBox
    // validation
    const formik = useFormik({
        initialValues: {
            linkName: '',
            NoticeName: '',
            displayLocation: '',
            startDate: null,
            endDate: null,
            startTime: null,
            endTime: null,
            noticeFile: null,
            imageFile: null,
            description: '',
            sortOrder: '',
            applicableTo: {
                admin: false,
                teacher: false,
                student: false,
                adminStaff: false,
                otherStaff: false
            }
        },
        validationSchema,
        onSubmit: (values) => {
            // Handle form submission
            console.log('hellooooo', values);
        }
    });
    // validation

    return (
        <>
            <Box sx={{ px: 2 }}
                component="form"
                onSubmit={formik.handleSubmit}
            >
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'School Notice',
                            path: '/extended-sidebar/Teacher/AllSchoolNotice'
                        },
                        {
                            title: `${radioBtn === '1' ? 'File' : 'Text'}`,
                            path: '/extended-sidebar/Teacher/AddSchoolNotce1'
                        }

                    ]}
                    rightActions={
                        <>

                            <Box>
                                <Tooltip title={`These events may change due to unavoidable reasons without prior notice.`}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: yellow[600],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: yellow[700] }
                                        }}
                                    // onClick={ClickOpenDialogbox}
                                    >
                                        <PriorityHighIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>

                            <Box>
                                <Tooltip
                                    title={`Users can Add/Edit/Delete/Publish and Unpublish homework. And displays homework added by other teachers.`}
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
                                <Tooltip title={`Cancel`}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: grey[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: red[600] }
                                        }}
                                        onClick={() => navigate('/extended-sidebar/Teacher/AllSchoolNotice')}
                                    >
                                        <Close />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title={`Save HomeWork`}>
                                    <IconButton
                                        type='submit'
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: green[600] }
                                        }}

                                    >
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </>
                    }
                />

            </Box>
            <Box sx={{ px: 2, pt: 1, background: 'white' }} m={2}>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <Typography variant='h5'>Notice Display Type : </Typography>
                    <RadioButton1
                        Array={RadioListCT}
                        ClickRadio={ClickRadio}
                        defaultValue={radioBtn}
                        Label={''}
                    />
                </Box>
                {radioBtn === '1' ?
                    <Grid container spacing={4}>
                        <Grid item xs={3} md={4}>
                            <TextField
                                fullWidth
                                label={
                                    <span>
                                        Link Name <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                            />
                            {formik.touched.linkName && formik.errors.linkName && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.linkName}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={3} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    <span>
                                        Display Location  <span style={{ color: 'red' }}>*</span>
                                    </span>
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedValue}
                                    label="Display Location"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Both</MenuItem>
                                    <MenuItem value={20}>Control Panel</MenuItem>
                                    <MenuItem value={30}>Home Page</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={3} md={4}>
                            <DesktopDatePicker
                                // DateValue={EventStartDate}
                                // onDateChange={setEventStartDate}
                                format="dd MMM yyyy"
                                label={
                                    <span>
                                        Start Date <span style={{ color: 'red' }}></span>
                                    </span>
                                }
                                sx={{ width: "100%" }}

                            />
                            {formik.touched.startDate && formik.errors.startDate && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.startDate}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={3} md={4}>
                            <DesktopDatePicker
                                // DateValue={EventStartDate}
                                // onDateChange={setEventStartDate}
                                format="dd MMM yyyy"
                                label={
                                    <span>
                                        End Date <span style={{ color: 'red' }}></span>
                                    </span>
                                }
                                sx={{ width: "100%" }}

                            />
                            {formik.touched.endDate && formik.errors.endDate && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.endDate}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={3} md={4}>
                            <TimePicker
                                label={
                                    <span>
                                        Start Time <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                sx={{ width: "100%" }}
                            />
                            {formik.touched.startTime && formik.errors.startTime && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.startTime}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={3} md={4}>
                            <TimePicker
                                label={
                                    <span>
                                        End Time <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                sx={{ width: "100%" }}
                            />
                            {formik.touched.endTime && formik.errors.endTime && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.endTime}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={3} md={4}>
                            <SingleFile
                                ValidFileTypes={ValidFileTypes1}
                                MaxfileSize={MaxfileSize1}
                                FileName={fileName1}
                                // ChangeFile={ChangeFile}
                                FileLabel={'Select File'}
                                width={'100%'}
                                height={"52px"}
                                isMandatary={false}
                            />
                            {formik.touched.noticeFile && formik.errors.noticeFile && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.noticeFile}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={3} md={4}>
                            <SingleFile
                                ValidFileTypes={ValidFileTypes2}
                                MaxfileSize={MaxfileSize2}
                                // ChangeFile={ChangeFile}
                                errorMessage={FileError}
                                // FilePath={EventDetaill == null ? "" : EventDetaill.Event_Image}
                                FileLabel={'Select Photo'}
                                FileName={FileName2}
                                viewIcon={true}
                                deleteIcon={true}
                                width={'100%'}
                                height={"52px"}
                                // clickFileName={clickFileName}
                                // clickDelete={clickDelete}
                                imdandatory={false}
                            ></SingleFile>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                fullWidth
                                label={
                                    <span>
                                        Sort <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                            />
                            {formik.touched.sortOrder && formik.errors.sortOrder && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.sortOrder}
                                </Typography>
                            )}
                        </Grid>
                        <Grid xs={12} md={12} item>
                            <TextField
                                label={
                                    <span>
                                        Description <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                multiline
                                rows={3}
                                // value={EventDescription}
                                // onChange={(e) => {
                                //     setEventDescription(e.target.value);
                                // }}
                                // error={ErrorEventDescription !== ''}
                                // helperText={ErrorEventDescription}
                                fullWidth
                                sx={{
                                    resize: 'both'
                                }}
                            />
                        </Grid>
                        <Grid md={5} item>
                            <FormGroup row>
                                <Grid md={12} bgcolor={'lightgrey'} px={1} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Object.values(applicableTo).every(Boolean)}
                                                onChange={() => {
                                                    const allChecked = Object.values(applicableTo).every(Boolean);
                                                    setApplicableTo({
                                                        admin: !allChecked,
                                                        teacher: !allChecked,
                                                        student: !allChecked,
                                                        adminStaff: !allChecked,
                                                        otherStaff: !allChecked,
                                                    });
                                                }}
                                                indeterminate={!Object.values(applicableTo).every(Boolean) && Object.values(applicableTo).some(Boolean)}
                                            />
                                        }
                                        label="Applicable to : Select All"
                                    />
                                </Grid>
                                {['admin', 'teacher', 'student', 'adminStaff', 'otherStaff'].map((role) => (
                                    <Grid md={4} item px={1}>
                                        <FormControlLabel
                                            key={role}
                                            control={
                                                <Checkbox
                                                    checked={applicableTo[role as keyof typeof applicableTo]}
                                                    onChange={handleCheckboxChange}
                                                    name={role}
                                                />
                                            }
                                            label={role.charAt(0).toUpperCase() + role.slice(1)}
                                        />
                                    </Grid>
                                ))}
                            </FormGroup>
                        </Grid>

                        <Grid item xs={7} md={7}>
                            <SelectListChild />
                        </Grid>


                    </Grid> :
                    <Grid container spacing={4}>
                        <Grid item xs={3} md={4}>
                            <TextField
                                fullWidth
                                label={
                                    <span>
                                        Notice Name <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                            />
                            {formik.touched.NoticeName && formik.errors.NoticeName && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.NoticeName}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={3} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    <span>
                                        Display Location  <span style={{ color: 'red' }}>*</span>
                                    </span>
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedValue}
                                    label="Display Location"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Both</MenuItem>
                                    <MenuItem value={20}>Control Panel</MenuItem>
                                    <MenuItem value={30}>Home Page</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={3} md={4}>
                            <DesktopDatePicker
                                // DateValue={EventStartDate}
                                // onDateChange={setEventStartDate}
                                format="dd MMM yyyy"
                                label={
                                    <span>
                                        Start Date <span style={{ color: 'red' }}></span>
                                    </span>
                                }
                                sx={{ width: "100%" }}

                            />
                            {formik.touched.startDate && formik.errors.startDate && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.startDate}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={3} md={4}>
                            <DesktopDatePicker
                                // DateValue={EventStartDate}
                                // onDateChange={setEventStartDate}
                                format="dd MMM yyyy"
                                label={
                                    <span>
                                        End Date <span style={{ color: 'red' }}></span>
                                    </span>
                                }
                                sx={{ width: "100%" }}

                            />
                            {formik.touched.endDate && formik.errors.endDate && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.endDate}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={3} md={4}>
                            <TimePicker
                                label={
                                    <span>
                                        Start Time <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                sx={{ width: "100%" }}
                            />
                            {formik.touched.startTime && formik.errors.startTime && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.startTime}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={3} md={4}>
                            <TimePicker
                                label={
                                    <span>
                                        End Time <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                sx={{ width: "100%" }}
                            />
                            {formik.touched.endTime && formik.errors.endTime && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.endTime}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={4} md={4}>
                            <TextField
                                fullWidth
                                label={
                                    <span>
                                        Sort <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                            />
                            {formik.touched.sortOrder && formik.errors.sortOrder && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.sortOrder}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <SingleFile
                                ValidFileTypes={ValidFileTypes2}
                                MaxfileSize={MaxfileSize2}
                                // ChangeFile={ChangeFile}
                                errorMessage={FileError}
                                // FilePath={EventDetaill == null ? "" : EventDetaill.Event_Image}
                                FileLabel={'Select Photo'}
                                FileName={FileName2}
                                viewIcon={true}
                                deleteIcon={true}
                                width={'100%'}
                                height={"52px"}
                                // clickFileName={clickFileName}
                                // clickDelete={clickDelete}
                                isMandatory={false}
                            ></SingleFile>
                        </Grid>
                        <Grid xs={12} md={12} item>
                            <TextField
                                label={
                                    <span>
                                        Description <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                multiline
                                rows={3}
                                // value={EventDescription}
                                // onChange={(e) => {
                                //     setEventDescription(e.target.value);
                                // }}
                                // error={ErrorEventDescription !== ''}
                                // helperText={ErrorEventDescription}
                                fullWidth
                                sx={{
                                    resize: 'both'
                                }}
                            />
                        </Grid>
                        <Grid md={5} item>
                            <FormGroup row>
                                <Grid md={12} bgcolor={'lightgrey'} px={1} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Object.values(applicableTo).every(Boolean)}
                                                onChange={() => {
                                                    const allChecked = Object.values(applicableTo).every(Boolean);
                                                    setApplicableTo({
                                                        admin: !allChecked,
                                                        teacher: !allChecked,
                                                        student: !allChecked,
                                                        adminStaff: !allChecked,
                                                        otherStaff: !allChecked,
                                                    });
                                                }}
                                                indeterminate={!Object.values(applicableTo).every(Boolean) && Object.values(applicableTo).some(Boolean)}
                                            />
                                        }
                                        label="Applicable to : Select All"
                                    />
                                </Grid>
                                {['admin', 'teacher', 'student', 'adminStaff', 'otherStaff'].map((role) => (
                                    <Grid md={4} item px={1}>
                                        <FormControlLabel
                                            key={role}
                                            control={
                                                <Checkbox
                                                    checked={applicableTo[role as keyof typeof applicableTo]}
                                                    onChange={handleCheckboxChange}
                                                    name={role}
                                                />
                                            }
                                            label={role.charAt(0).toUpperCase() + role.slice(1)}
                                        />
                                    </Grid>
                                ))}
                            </FormGroup>
                        </Grid>

                        <Grid item xs={7} md={7}>
                            <SelectListChild />
                        </Grid>
                        <Grid item md={12}>
                            <Box>

                                <ReactQuill value={text} onChange={handleTextChange} modules={modules} formats={formats} style={{ height: '300px', marginBottom: "50px", }} />
                            </Box>
                        </Grid>

                    </Grid>
                }
            </Box>
        </>
    )
}

export default AddSchoolNotice1;