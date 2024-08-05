import Close from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { getCalendarDateFormatDateNew } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import TimeField from '../StudentRecords/TimeField';

const AddSchoolNoticeFT = () => {
    const [radioBtn, setRadioBtn] = useState('1');
    const [LinkName, setLinkName] = useState('');
    const [NoticeName, setNoticeName] = useState('');
    const [selectDisplayLocation, setDisplayLocation] = useState('Both');
    const [StartDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [EndDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [StartTime, setStartTime] = useState('');
    const [EndTime, setEndTime] = useState('');
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

    const ValidFileTypes1 = ['PDF', 'PNG', 'JPEG', 'JPG', 'BMP'];
    const MaxfileSize1 = 10000000;
    const ValidFileTypes2 = ['JPG', 'PNG', 'BMP', 'JPEG'];
    const MaxfileSize2 = 10000000;

    const ClickRadio = (value) => {
        setRadioBtn(value);
    };

    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

    const handleCancel = () => {
        // Handle cancel action
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
                <Box sx={{ p: 2,  background: 'white' }}>
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
                        <TimeField Item={StartTime} label={'Time'} ClickItem={clickStartTime}  size={"medium"}/>
                       
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TimeField Item={EndTime} label={'Time'} ClickItem={clickEndTime}  size={"medium"}/>
                       
                    </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default AddSchoolNoticeFT;
