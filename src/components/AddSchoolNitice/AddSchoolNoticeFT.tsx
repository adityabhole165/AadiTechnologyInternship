import Close from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { IGetAllClassesAndDivisionsBody } from 'src/interfaces/AddSchoolNotic/ISchoolNoticeForm';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import SingleFile from 'src/libraries/File/SingleFile';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import SelectListHierarchy from 'src/libraries/SelectList/SelectListHierarchy';
import { GetAllClassAndDivision } from 'src/requests/AddSchoolNotice/RequestSchoolNoticeForm';
import { RootState } from 'src/store';
import { getCalendarDateFormatDateNew } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import TimeField from '../StudentRecords/TimeField';
import { ResizableTextField } from './ResizableDescriptionBox';

const AddSchoolNoticeFT = () => {
    const [radioBtn, setRadioBtn] = useState('1');
    const [LinkName, setLinkName] = useState('');
    const [NoticeName, setNoticeName] = useState('');
    const [selectDisplayLocation, setDisplayLocation] = useState('Both');
    const [StartDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [EndDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [StartTime, setStartTime] = useState('00:00');
    const [EndTime, setEndTime] = useState('23:59');
    const [NoticeFile, setNoticeFile] = useState('');
    const [NoticeFileError, setNoticeFileError] = useState('');
    const [ImageFile, setImageFile] = useState('');
    const [base64URL, setbase64URL] = useState('');
    const [base64URL2, setbase64URL2] = useState('');
    const [ItemList, setItemList] = useState([]);
    const [Description, setDescription] = useState('');
    const [SortOrder, setSortOrder] = useState('');
    const [isRoleError, setIsRoleError] = useState(false);
    const [isClassError, setIsClassError] = useState(false);
    const location = useLocation();
    const { state } = location;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState('');
    const [selectAll, setSelectAll] = useState(false);
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

    const DisplayLocation = [
        { Id: 1, Name: 'Both', Value: 'Both' },
        { Id: 2, Name: 'Control Panel', Value: 'Control Panel' },
        { Id: 3, Name: 'Home Page', Value: 'Home Page' },
    ];

    const ValidFileTypes = ['PDF', 'PNG', 'JPEG', 'JPG', 'BMP'];
    const MaxfileSize = 10000000;
    const ValidFileTypes2 = ['JPG', 'PNG', 'BMP', 'JPEG'];
    const MaxfileSize2 = 10000000;
    const ClassesAndDivisionss = useSelector((state: RootState) => state.SchoolNoticeForm.AllClassesAndDivisionss);
    const ClassesAndDivisionss1 = useSelector((state: RootState) => state.SchoolNoticeForm.AllClassesAndDivisionss1);


    useEffect(() => {
        const AllClassesAndDivisionBody: IGetAllClassesAndDivisionsBody = {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
        };
        dispatch(GetAllClassAndDivision(AllClassesAndDivisionBody));
    }, [])

    const ClickRadio = (value) => {
        setRadioBtn(value);
    };
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const handleSelectAll = (event) => {
        const { checked } = event.target;
        setSelectAll(checked);
        setApplicableTo({
            admin: checked,
            teacher: checked,
            student: checked,
            adminStaff: checked,
            otherStaff: checked,
        });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setApplicableTo((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };
    const handleCancel = () => {
        // Handle cancel action
    };

    const isClassSelected = () => {
        let arr = []
        ItemList.map(item => {
            if (item.IsActive)
                arr.push(item.Id)
        })
        return arr.toString()
    }
    const ClassSelected = isClassSelected()


    useEffect(() => {
        setItemList(ClassesAndDivisionss);
    }, [ClassesAndDivisionss]);

    const ClickChild = (value) => {
        setItemList(value);
    };
    const clickStartTime = (value) => {
        setStartTime(value);
    };
    const clickEndTime = (value) => {
        setEndTime(value);
    };
    const clickDisplayLocationDropdown = (value) => {
        setDisplayLocation(value);
    };
    const onSelectStartDate = (value) => {
        setStartDate(getCalendarDateFormatDateNew(value));
    };

    const onSelectEndDate = (value) => {
        setEndDate(getCalendarDateFormatDateNew(value));
    };
    const ChangeFile = (value) => {
        setNoticeFile(value.Name);
        setbase64URL(value.Value);
        setNoticeFileError('');
    };
    const ChangeFile2 = (value) => {
        setImageFile(value.Name);
        setbase64URL2(value.Value);
    };
    const handleSave = () => {
        // Handle save action
    };

    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'School Notice',
                            path: '/extended-sidebar/Teacher/SchoolNoticeBasescreen'
                        },
                        {
                            title: `${radioBtn === '1' ? 'File' : 'Text'}`,
                            path: '/extended-sidebar/Teacher/AddSchoolNotceFT'
                        }
                    ]}
                    rightActions={
                        <>
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
                                            backgroundColor: red[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: red[600] }
                                        }}
                                        onClick={handleCancel}
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
                <Box sx={{ p: 2, background: 'white' }}>
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <Typography variant='h5'>Notice Display Type : </Typography>
                        <RadioButton1
                            Array={RadioListCT}
                            ClickRadio={ClickRadio}
                            defaultValue={radioBtn}
                            Label={''}
                        />
                    </Box>

                    <Grid container spacing={3} alignItems="center">
                        {radioBtn === '1' ? (
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label={
                                        <span>
                                            Link Name <span style={{ color: 'red' }}>*</span>
                                        </span>
                                    }
                                    multiline
                                    rows={1}
                                    value={LinkName}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value.length <= 50) {
                                            setLinkName(value);
                                        }
                                    }}
                                />
                            </Grid>
                        ) : (
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label={
                                        <span>
                                            Notice Name <span style={{ color: 'red' }}>*</span>
                                        </span>
                                    }
                                    multiline
                                    rows={1}
                                    value={NoticeName}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value.length <= 50) {
                                            setNoticeName(value);
                                        }
                                    }}
                                />
                            </Grid>
                        )}
                        <Grid item xs={6} md={4}>
                            <SearchableDropdown
                                sx={{ minWidth: '20vw' }}
                                ItemList={DisplayLocation}
                                defaultValue={selectDisplayLocation}
                                onChange={clickDisplayLocationDropdown}

                                label='Display Location'
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Datepicker
                                DateValue={StartDate}
                                onDateChange={onSelectStartDate}
                                label={'Start Date'}
                                size={"medium"}
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Datepicker
                                DateValue={EndDate}
                                onDateChange={onSelectEndDate}
                                label={'End Date'}
                                size={"medium"}
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TimeField Item={StartTime} label={'Start Time'} isMandatory={false} ClickItem={clickStartTime} size={"medium"} tooltipMessage="e.g. 10:00 AM" />

                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TimeField Item={EndTime} label={'End Time'} isMandatory={false} ClickItem={clickEndTime} size={"medium"}  tooltipMessage="e.g. 04:00 PM"/>
                        </Grid>
                        {radioBtn === '1' ?
                            <Grid item xs={6} md={4}>
                                <SingleFile
                                    ValidFileTypes={ValidFileTypes}
                                    MaxfileSize={MaxfileSize}
                                    ChangeFile={ChangeFile}
                                    errorMessage={''}
                                    FileName={NoticeFile}
                                    FileLabel={'Select File'}
                                    width={'100%'}
                                    height={"52px"}
                                    isMandatory
                                />
                                {NoticeFileError && (
                                    <Box sx={{ position: 'absolute', bottom: '-25px' }}>
                                        <ErrorMessage1 Error={NoticeFileError}></ErrorMessage1>
                                    </Box>
                                )}
                            </Grid> : null}
                        <Grid item xs={6} md={4}>
                            <SingleFile
                                ValidFileTypes={ValidFileTypes2}
                                MaxfileSize={MaxfileSize2}
                                ChangeFile={ChangeFile2}
                                errorMessage={''}
                                FileName={ImageFile}
                                FileLabel={'Select Image'}
                                width={'100%'}
                                height={"52px"}
                                isMandatory={false}
                                viewIcon={true}
                                deleteIcon={true}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label={
                                    <span>
                                        Sort Order <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                multiline
                                rows={1}
                                value={SortOrder}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 3) {
                                        setSortOrder(value);
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <ResizableTextField
                                label={<>
                                    Description
                                </>}
                                multiline
                                rows={3}
                                value={Description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                sx={{
                                    resize: 'both'
                                }}
                            />
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={2.5} mt={2} ml={3}>
                                <Typography variant="h5">
                                    Applicable to : <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <FormGroup row>
                                    <Grid item xs={12} bgcolor={'lightgrey'} px={1}>
                                        <FormControlLabel
                                            control={<Checkbox checked={selectAll} onChange={handleSelectAll} />}
                                            label={<Typography variant="h5">Select All</Typography>}
                                        />
                                    </Grid>
                                    <Box mt={1} ml={1}>
                                        <FormControlLabel
                                            control={<Checkbox checked={applicableTo.admin} onChange={handleCheckboxChange} name="admin" />}
                                            label="Admin"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={applicableTo.teacher} onChange={handleCheckboxChange} name="teacher" />}
                                            label="Teacher"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={applicableTo.student} onChange={handleCheckboxChange} name="student" />}
                                            label="Student"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={applicableTo.adminStaff} onChange={handleCheckboxChange} name="adminStaff" />}
                                            label="Admin Staff"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={applicableTo.otherStaff} onChange={handleCheckboxChange} name="otherStaff" />}
                                            label="Other Staff"
                                        />
                                    </Box>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} md={9} mt={2}>
                                <Typography variant="h5">
                                    Associated Classes
                                </Typography>
                                <SelectListHierarchy
                                    ItemList={ItemList}
                                    ParentList={ClassesAndDivisionss1}
                                    ClickChild={ClickChild}
                                ></SelectListHierarchy>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box >
        </>
    );
};

export default AddSchoolNoticeFT;
