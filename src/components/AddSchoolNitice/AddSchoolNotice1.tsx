import Close from '@mui/icons-material/Close';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, red, yellow } from '@mui/material/colors';
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import { parse } from 'date-fns';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { IEditSchoolNoticeDetailsBody, IGetAllClassesAndDivisionsBody, ISaveUpdateSchoolNoticeBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import SingleFile from 'src/libraries/File/SingleFile';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import SelectListChild from 'src/libraries/SelectList/SelectListChild';
import { CDAGetAllClassesAndDivisions } from 'src/requests/AddSchoolNotice/ReqAllClassesAndDivisions';
import { CDAEditSchoolNoticeDetails } from 'src/requests/AddSchoolNotice/ReqEditSchoolNoticeDetails';
import { CDASaveUpdateSchoolNotice } from 'src/requests/AddSchoolNotice/ReqSaveUpdateSchoolNotices';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import { ResizableTextField } from './ResizableDescriptionBox';
import validationSchema from './ValidationSchema';


const AddSchoolNotice1: React.FC = () => {
    const [radioBtn, setRadioBtn] = useState('1');
    const [fileName1, setFileName1] = useState('');
    const [FileError, setFileError] = useState('');
    const [FileName2, setFileName2] = useState('');
    const [base64URL, setbase64URL] = useState('');
    const [base64URL2, setbase64URL2] = useState('');
    const [ItemList, setItemList] = useState([]);
    const [text, setText] = useState<string>('');
    const [formData, SetformData] = useState<any>('');

    const location = useLocation();
    const { state } = location;
    // const { state, userRoleId } = useParams()
    // useEffect(() => {
    //     if (state || userRoleId) {

    //         console.log("bbbbbbbbbbbbbbbbbbbbbbbb=>", state, userRoleId);
    //     }
    // }, [])


    const dispatch = useDispatch();

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

    const ChangeFile1 = (value) => {
        setFileName1(value.Name);
        setbase64URL(value.Value);
    };

    {
        state ?
            useEffect(() => {

                setFileName1(state.FileName);
                setFileName2(state.NoticeImage)

            }, [fileName1, FileName2]) :
            null
    }

    // console.log('First file ===>', fileName1);
    // console.log('First URl ===>', base64URL);

    const ChangeFile2 = (value) => {
        setFileName2(value.Name);
        setbase64URL2(value.Value);
    };
    // console.log('First file2 ===>', FileName2);
    // console.log('First URl2 ===>', base64URL2);

    const navigate = useNavigate();

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApplicableTo({
            ...applicableTo,
            [event.target.name]: event.target.checked,
        });
    };

    console.log("Set Application Values", applicableTo);


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
            linkName: state ? state.NoticeName : '',
            NoticeName: state ? state.NoticeName : '',
            displayLocation: state ? state.DisplayLocation.trim() : null,
            // startDate: state ? moment(state.StartDate).format('dd MMM yyyy') : null,
            startDate: state ? parse(state.StartDate, "dd-MM-yyyy HH:mm:ss", new Date()) : null,
            endDate: state ? parse(state.EndDate, "dd-MM-yyyy HH:mm:ss", new Date()) : null,
            startTime: state ? state.StartTime : null,
            endTime: state ? state.EndTime : null,
            noticeFile: FileName2 ? FileName2 : null,
            imageFile: fileName1 ? fileName1 : null,
            description: state ? state.NoticeDescription : '',
            sortOrder: state ? state.dbSortOrder : '',
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
            SetformData(values)
            // console.log('hellooooo', formData);
        }
    });
    // validation

    // API Calling

    // console.log('KKKKKKKKKKKKKK....', ItemList);
    const ClickChild = (value) => {
        setItemList(value);
    };

    const USSaveUpdateSchoolNotice: any = useSelector((state: RootState) => state.SaveUpdateSchoolNotice.ISSaveUpdateSchoolNotice);
    const USEditUpdateSchoolNotice: any = useSelector((state: RootState) => state.EditSchoolNoticeDetails.ISEditSchoolNoticeDetails);
    console.log("USSaveUpdateSchoolNotice======> ", USSaveUpdateSchoolNotice);
    console.log("USEditUpdateSchoolNotice======> ", USEditUpdateSchoolNotice);



    // API Calling

    console.log("Formik....", formik);

    const SaveUpdateSchoolNotice: ISaveUpdateSchoolNoticeBody = {

        "asUserRoleIds": "1,2,3",
        "asClassIds": "1298,1315,1319,1320,1322,1330,1306",
        "asSaveFeature": "School Notices",
        "asFolderName": "PPSN Website",
        "asBase64String": "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",
        "asBase64String2": "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",
        "NoticeId": 0,
        "NoticeName": "abcdefg",
        "DisplayLocation": "B",
        "StartDate": "7/8/2024 12:00:00 AM",
        "EndDate": "7/9/2024 11:59:00 PM",
        "SortOrder": 1,
        "FileName": "abc.png",
        "IsSelected": true,
        "IsText": false,
        "NoticeContent": null,
        "UserId": 4463,
        "SchoolId": 18,
        "InertedById": 4463,
        "NoticeDescription": "hsdhsdha",
        "NoticeImage": "pqr.jpg"

    }

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

    const EditSchoolNoticeDetails: IEditSchoolNoticeDetailsBody = {
        "asSchoolId": asSchoolId,
        "asNoticeId": state ? state.NoticeId : null
    }
    const GetAllClasseAndDivision: IGetAllClassesAndDivisionsBody = {
        "asSchoolId": asSchoolId,
        "asAcademicYearId": asAcademicYearId
    }


    const handleSave = () => {
        dispatch(CDASaveUpdateSchoolNotice(SaveUpdateSchoolNotice))
        dispatch(CDAEditSchoolNoticeDetails(EditSchoolNoticeDetails))

        alert("Hello............................!")
    }

    useEffect(() => {
        dispatch(CDAGetAllClassesAndDivisions(GetAllClasseAndDivision))

    }, []);


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
                            path: '/extended-sidebar/Teacher/AllNoticeList'
                        },
                        {
                            title: `${radioBtn === '1' ? 'File' : 'Text'}`,
                            path: '/extended-sidebar/Teacher/AddSchoolNotce1'
                        }

                    ]}
                    rightActions={
                        <>

                            <Box>
                                <Tooltip title={`Select the notices from the list to be displayed on School web site under School Notices.`}>
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
                                    title={`Displays all uploaded school notices.`}
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
                                        onClick={() => navigate('/extended-sidebar/Teacher/AllNoticeList')}
                                    >
                                        <Close />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title={`Save`}>
                                    <IconButton
                                        type='submit'
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: green[600] }
                                        }}

                                        onClick={handleSave}

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
                <Grid container spacing={4}>
                    {radioBtn === '1' ?
                        <Grid item xs={3} md={4}>
                            <TextField
                                fullWidth
                                name='linkName'
                                value={formik.values.linkName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                        :
                        <Grid item xs={3} md={4}>
                            <TextField
                                fullWidth
                                name='NoticeName'
                                value={formik.values.NoticeName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                    }
                    <Grid item xs={3} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                <span>Display Location</span>
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='displayLocation'
                                label="Display Location"
                                value={formik.values.displayLocation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <MenuItem value={'Both'}>Both</MenuItem>
                                <MenuItem value={'ControlPanel'}>Control Panel</MenuItem>
                                <MenuItem value={'HomaPage'}>Home Page</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={3} md={4}>
                        <DesktopDatePicker
                            // DateValue={EventStartDate}
                            // onDateChange={setEventStartDate}
                            name='startDate'
                            value={formik.values.startDate}
                            onChange={(value) => formik.setFieldValue('startDate', value)}
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
                            name='endDate'
                            value={formik.values.endDate}
                            onChange={(value) => formik.setFieldValue('endDate', value)}
                            format="dd MMM yyyy"
                            label={
                                <span>
                                    End Date <span style={{ color: 'red' }}></span>
                                </span>
                            }
                            sx={{ width: "100%" }}

                        />

                    </Grid>
                    <Grid item xs={3} md={4}>
                        <TimePicker
                            name='startTime'
                            value={formik.values.startTime}
                            onChange={(value) => formik.setFieldValue('startTime', value)}
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
                            name='endTime'
                            value={formik.values.endTime}
                            onChange={(value) => formik.setFieldValue('endTime', value)}
                            label={
                                <span>
                                    End Time
                                </span>
                            }
                            sx={{ width: "100%" }}
                        />

                    </Grid>
                    {radioBtn === '1' ?
                        <Grid item xs={3} md={4}>
                            <SingleFile
                                ValidFileTypes={ValidFileTypes1}
                                MaxfileSize={MaxfileSize1}
                                FileName={fileName1}
                                ChangeFile={ChangeFile1}
                                FileLabel={'Select File'}
                                // setFieldValue={formik.setFieldValue}
                                width={'100%'}
                                height={"52px"}
                            />
                            {formik.touched.noticeFile && formik.errors.noticeFile && (
                                <Typography sx={{ color: 'red', margin: '5px' }}>
                                    {formik.errors.noticeFile}
                                </Typography>
                            )}
                        </Grid> : null}
                    <Grid item xs={3} md={4}>
                        <SingleFile
                            ValidFileTypes={ValidFileTypes2}
                            MaxfileSize={MaxfileSize2}
                            ChangeFile={ChangeFile2}
                            errorMessage={FileError}
                            // FilePath={EventDetaill == null ? "" : EventDetaill.Event_Image}
                            FileLabel={'Select Photo'}
                            FileName={FileName2}
                            // setFieldValue={formik.setFieldValue}
                            viewIcon={true}
                            deleteIcon={true}
                            width={'100%'}
                            height={"52px"}
                        // clickFileName={clickFileName}
                        // clickDelete={clickDelete}
                        ></SingleFile>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <TextField
                            fullWidth
                            name='sortOrder'
                            value={formik.values.sortOrder}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                        <ResizableTextField
                            name='description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label={
                                <span>
                                    Description
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
                    <Grid md={4} item>
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
                    {
                        (Object.values(applicableTo).every(Boolean) || applicableTo.student) &&
                        <Grid item xs={8} md={8}>
                            <SelectListChild />
                        </Grid>
                    }
                    {radioBtn === '1' ? null
                        :
                        <Grid item md={12}>
                            <Box>

                                <ReactQuill value={text} onChange={handleTextChange} modules={modules} formats={formats} style={{ height: '300px', marginBottom: "50px", }} />
                            </Box>
                        </Grid>
                    }


                </Grid>

            </Box>
        </>
    )
}

export default AddSchoolNotice1;