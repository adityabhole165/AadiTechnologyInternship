import Close from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { IGetAllClassesAndDivisionsBody, IGetDeleteSchoolNoticeImageBody, IGetEditUserRolesandStdDivForSelectedNoticeIdBody, ISaveUpdateSchoolNoticesBody } from 'src/interfaces/AddSchoolNotic/ISchoolNoticeForm';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import SingleFile from 'src/libraries/File/SingleFile';
import SingleFile2 from 'src/libraries/File/SingleFile2';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import SelectListHierarchy from 'src/libraries/SelectList/SelectListHierarchy';
import { DeleteImage, GetAllClassAndDivision, getEditSchoolNoticeDetails, getSaveSchoolNoticeDetails, GetSelectedStandardAndDivisionCheckBoxx, GetUserRolesForSelectedNoticeId, resetDeleteSchoolNotice, resetSaveSchoolNoticeDetails } from 'src/requests/AddSchoolNotice/RequestSchoolNoticeForm';
import { RootState } from 'src/store';
import { extractTime, formatDateAsDDMMMYYYY, getCalendarDateFormatDateNew, isLessThanDate } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import { ResizableTextField } from './ResizableDescriptionBox';
import TimepickerTwofields from './TimepickerTwofields';
const AddSchoolNoticeFT = () => {
    const { NoticeId, selectDisplayType } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { state } = location;
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asFolderName = localStorage.getItem('FolderName');
    const [radioBtn, setRadioBtn] = useState('1');
    const [LinkName, setLinkName] = useState('');
    const [NoticeName, setNoticeName] = useState('');
    const [selectDisplayLocation, setDisplayLocation] = useState('B');
    const [StartDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [EndDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [StartTime, setStartTime] = useState('00:00');
    const [EndTime, setEndTime] = useState('23:59');
    const [NoticeFile, setNoticeFile] = useState('');
    const [NoticeContent, setNoticeContent] = useState('');
    const [NoticeContentError, setNoticeContentError] = useState('');
    const [NoticeFileError, setNoticeFileError] = useState('');
    const [ClassSelectedError, setClassSelectedError] = useState('');
    const [ImageFile, setImageFile] = useState('');
    const [base64URL, setbase64URL] = useState('');
    const [base64URL2, setbase64URL2] = useState('');
    const [ItemList, setItemList] = useState([]);
    const [Description, setDescription] = useState('');
    const [SortOrder, setSortOrder] = useState('');
    const [outSortOrder, setoutSortOrder] = useState('');
    const [Text, setText] = useState(false);
    const [LinkNameError, setLinkNameError] = useState('');
    const [NoticeNameError, setNoticeNameError] = useState('');
    const [SortOrderError, setSortOrderError] = useState('');
    const [ErrorStartDateblank, setErrorStartDateblank] = useState('');
    const [ErrorEndDateblank, setErrorEndDateblank] = useState('');
    const [ErrorStartDate, setErrorStartDate] = useState('');
    const [ErrorEndDate, setErrorEndDate] = useState('');
    const [ErrorUserRole, setErrorUserRole] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const [applicableRoleId, setapplicableRoleId] = useState('');
    const { showAlert, closeAlert } = useContext(AlertContext);
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
        { Id: 1, Name: 'Both', Value: 'B' },
        { Id: 2, Name: 'Control Panel', Value: 'C' },
        { Id: 3, Name: 'Home Page', Value: 'H' },
    ];

    const ValidFileTypes = ['.PDF', '.PNG', '.JPEG', '.JPG', '.BMP'];
    const MaxfileSize = 10000000;
    const ValidFileTypes2 = ['.JPG', '.JPEG', '.PNG', '.BMP'];
    const MaxfileSize2 = 10000000;
    const ClassesAndDivisionss = useSelector((state: RootState) => state.SchoolNoticeForm.AllClassesAndDivisionss);
    const ClassesAndDivisionss1 = useSelector((state: RootState) => state.SchoolNoticeForm.AllClassesAndDivisionss1);
    const SaveNotice = useSelector((state: RootState) => state.SchoolNoticeForm.SaveSchoolNotice);
    const deleteNoticeImageMsg = useSelector((state: RootState) => state.SchoolNoticeForm.DeleteImageMsg);
    const EditNotice = useSelector((state: RootState) => state.SchoolNoticeForm.EditSchoolNotice);
    const UserRoleselected = useSelector((state: RootState) => state.SchoolNoticeForm.UserRoleselected);
    const SelectedStandardAndDivisionCheckBoxx = useSelector((state: RootState) => state.SchoolNoticeForm.SelectedStandardAndDivisionCheckBoxx);

    useEffect(() => {
        const AllClassesAndDivisionBody: IGetAllClassesAndDivisionsBody = {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
        };
        dispatch(GetAllClassAndDivision(AllClassesAndDivisionBody));
        const GetEditUserRolesandStdDivForSelectedNoticeIdBody: IGetEditUserRolesandStdDivForSelectedNoticeIdBody = {
            asSchoolId: Number(asSchoolId),
            asNoticeId: Number(NoticeId)
        }
        dispatch(GetUserRolesForSelectedNoticeId(GetEditUserRolesandStdDivForSelectedNoticeIdBody))
    }, [])
    const IsRolePresent = (UserRoleId) => {
        let returnVal = false
        UserRoleselected.map((item) => {
            if (item.UserRoleId == UserRoleId) {
                returnVal = true
            }
        })
        return returnVal
    }
    useEffect(() => {
        if (UserRoleselected.length > 0) {
            setApplicableTo({
                admin: IsRolePresent("1"),
                teacher: IsRolePresent("2"),
                student: IsRolePresent("3"),
                adminStaff: IsRolePresent("6"),
                otherStaff: IsRolePresent("7"),
            })
        }
    }, [UserRoleselected])
    const IsDivPresent = (StandardDivisionId) => {
        let returnVal = false
        SelectedStandardAndDivisionCheckBoxx.map((item) => {
            if (item.StandardDivisionId == StandardDivisionId) {
                returnVal = true
            }
        })
        return returnVal
    }

    useEffect(() => {
        if (SelectedStandardAndDivisionCheckBoxx.length > 0) {
            setItemList(ClassesAndDivisionss.map((item) => {
                return { ...item, IsActive: IsDivPresent(item.Value) }
            }
            ));
        }
    }, [SelectedStandardAndDivisionCheckBoxx])


    useEffect(() => {
        if (selectDisplayType == 'true') {
            setRadioBtn('2');
            setText(true);
        } else {
            setRadioBtn('1');
            setText(false);
        }
    }, [selectDisplayType]);

    useEffect(() => {
        if (NoticeId != undefined && EditNotice.length > 0 && EditNotice[0] != null) {
            const EditNoticee = EditNotice[0]
            setNoticeName(EditNoticee.Text1);
            setStartDate(formatDateAsDDMMMYYYY(EditNoticee.Text2))
            setStartTime(extractTime(EditNoticee.Text2))
            setEndDate(formatDateAsDDMMMYYYY(EditNoticee.Text3))
            setEndTime(extractTime(EditNoticee.Text3))
            setDisplayLocation(EditNoticee.Text4)
            setSortOrder(EditNoticee.Text5)
           // setNoticeFile(EditNoticee.Text6)
            setDescription(EditNoticee.Text7)
            setNoticeContent(EditNoticee.Text8)
            setoutSortOrder(EditNoticee.Text9)
            setText(EditNoticee.IsText)
            //setImageFile(EditNoticee.NoticeImage)
        }
    }, [EditNotice]);

    useEffect(() => {
        if (NoticeId) {
            const GetEditNoticeBody: IGetEditUserRolesandStdDivForSelectedNoticeIdBody = {
                asSchoolId: asSchoolId,
                asNoticeId: Number(NoticeId)
            }
            dispatch(getEditSchoolNoticeDetails(GetEditNoticeBody))
            dispatch(GetSelectedStandardAndDivisionCheckBoxx(GetEditNoticeBody))
        }
    }, [NoticeId]);

    const isClassSelected = () => {
        let arr = []
        ItemList.map(item => {
            if (item.IsActive)
                arr.push(item.Id)
        })
        return arr.toString()
    }
    const ClassSelected = isClassSelected()

    const deleteImage = (NoticeId: number) => {
        const DeleteSchoolNoticeBody: IGetDeleteSchoolNoticeImageBody = {
            asSchoolId: Number(asSchoolId),
            asNoticeId: Number(NoticeId),
            asIsText: 0,
        };
        showAlert({
            title: 'Please Confirm',
            message: 'Are you sure you want to delete Event Image?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(DeleteImage(DeleteSchoolNoticeBody));
                closeAlert();
            },
        });
    };

    useEffect(() => {
        if (deleteNoticeImageMsg !== '') {
            toast.success(deleteNoticeImageMsg);
            dispatch(resetDeleteSchoolNotice());
            setImageFile('');
        }
    }, [deleteNoticeImageMsg]);

    const getApplicableTo = () => {
        let returnVal = ""
        returnVal = applicableTo.admin ? "1," : ""
        returnVal = returnVal + (applicableTo.teacher ? "2," : "")
        returnVal = returnVal + (applicableTo.student ? "3," : "")
        returnVal = returnVal + (applicableTo.adminStaff ? "6," : "")
        returnVal = returnVal + (applicableTo.otherStaff ? "7," : "")

        returnVal = returnVal == "" ? "" : returnVal.substring(0, returnVal.length - 1);
        return returnVal
    }

    const SaveNoticeBody: ISaveUpdateSchoolNoticesBody = {
        NoticeId: Number(NoticeId ? NoticeId : 0),
        asUserRoleIds: getApplicableTo(),
        asClassIds: isClassSelected(),
        asSaveFeature: 'School Notices',
        asFolderName: asFolderName,
        asBase64String: base64URL,
        asBase64String2: base64URL2,
        NoticeName: NoticeName,
        DisplayLocation: selectDisplayLocation,
        StartDate: StartDate + ' ' + StartTime,
        EndDate: EndDate + ' ' + EndTime,
        SortOrder: Number(SortOrder),
        FileName: NoticeFile,
        IsSelected: true,
        IsText: Text,
        NoticeContent: NoticeContent,
        UserId: asUserId,
        SchoolId: Number(asSchoolId),
        InertedById: asUserId,
        NoticeDescription: Description,
        NoticeImage: ImageFile
    }
    const ClickSave = () => {
        let isError = false;
        let dateError = false;
        if (radioBtn == '1') {
            if (NoticeName == '') {
                setLinkNameError('Link name should not be blank.');
                isError = true;
            } else setLinkNameError('')
        }
        if (radioBtn == '2') {
            if (NoticeName == '') {
                setNoticeNameError('Notice name should not be blank.');
                isError = true;
            } else setNoticeNameError('')
        }

        // if (!IsRolePresent(false)) {
        //     setErrorUserRole('At least one user role should be selected.');
        //     isError = true;
        // } else setErrorUserRole('')

        // if (!isClassSelected()  && applicableTo.student==true) {
        //     setClassSelectedError('At least one class should be selected.');
        //     isError = true;
        // } else setClassSelectedError('')

        if (StartDate === '') {
            setErrorStartDate('Please choose a valid start date.');
            dateError = true
            isError = true;
        } else setErrorStartDate('')

        if (StartDate === null) {
            setErrorStartDateblank('Start Date should not be blank.');

            dateError = true
            isError = true;
        } else setErrorStartDateblank('')


        if (isLessThanDate(EndDate, StartDate)) {
            setErrorEndDate('End date should be greater than start date.');
            dateError = true
            isError = true;
        } else setErrorEndDate('')

        if (EndDate == null) {
            setErrorEndDateblank('End Date should not be blank.');
            dateError = true
            isError = true;
        } else setErrorEndDateblank('')

        if (radioBtn == '1') {
            if (NoticeFile == '') {
                setNoticeFileError('Notice File to be uploaded should be selected.');
                isError = true;
            } else setNoticeFileError('')
        }
        if (radioBtn == '2') {
            if (NoticeContent == '') {
                setNoticeContentError('Notice content should not be blank.');
                isError = true;
            } else setNoticeContentError('')
        }

        if (SortOrder === '') {
            setSortOrderError('Sort order should not be blank.');
            isError = true;
        } else if (!/^\d+$/.test(SortOrder)) {
            setSortOrderError('Sort order should only contain numbers.');
            isError = true;
        } else {
            setSortOrderError('');
        }

        if (!isError) {
            dispatch(getSaveSchoolNoticeDetails(SaveNoticeBody));
        }

    };
    useEffect(() => {
        if (SaveNotice != "") {

            if (NoticeId) {
                toast.success("Notice updated successfully.", { toastId: "success1" });
            } else {
                toast.success("School notice added successfully.", { toastId: "success1" });
            }
            dispatch(resetSaveSchoolNoticeDetails());

            navigate('/extended-sidebar/Teacher/SchoolNoticeBasescreen');
        }
    }, [SaveNotice])


    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'color', 'background',
        'link', 'image', 'video'
    ];

    const ClickRadio = (value) => {
        setRadioBtn(value);
        if (radioBtn == '1') {
            setText(false)
        }
        else {
            setText(true)
        }
    };
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleEditorChange = (value) => {
        setNoticeContent(value);
    };

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
        setNoticeName('');
        setSortOrder('');
        setNoticeFile('');
        setDescription('');
        setNoticeContent('');
        setoutSortOrder('');
        setImageFile('');
        setSelectAll(false)
        setApplicableTo({
            admin: false,
            teacher: false,
            student: false,
            adminStaff: false,
            otherStaff: false,
        }); // Reset all roles to false
    };

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
    let url = localStorage.getItem("SiteURL") + "/RITeSchool/DOWNLOADS/School Notices/"

    const viewImage = () => {
        const fullImageUrl = `${url}${ImageFile}`;
        window.open(fullImageUrl, '_blank');
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
                                <Tooltip title={NoticeId != undefined ? 'Update' : 'Save'}>
                                    <IconButton
                                        type='submit'
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: green[600] }
                                        }}
                                        onClick={ClickSave}
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </>
                    }
                />
                <Grid sx={{ backgroundColor: 'white', mb: 1, p: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant='h5'>Notice Display Type : </Typography>
                        <RadioButton1
                            Array={RadioListCT}
                            ClickRadio={ClickRadio}
                            defaultValue={radioBtn}
                            Label={''}
                        />
                    </Box>
                </Grid>
                <Box sx={{ p: 2, background: 'white' }}>
                    <Grid container spacing={2}>
                        {radioBtn === '1' ? (
                            <Grid item xs={4} md={4}>
                                <TextField
                                    fullWidth
                                    label={
                                        <span>
                                            Link Name <span style={{ color: 'red' }}>*</span>
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
                                <Box>
                                    <ErrorMessage1 Error={LinkNameError}></ErrorMessage1>
                                </Box>

                            </Grid>
                        ) : (
                            <Grid item xs={4} md={4}>
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
                                <ErrorMessage1 Error={NoticeNameError}></ErrorMessage1>
                            </Grid>
                        )}
                        <Grid item xs={4} md={4}>
                            <SearchableDropdown
                                sx={{ minWidth: '20vw' }}
                                ItemList={DisplayLocation}
                                defaultValue={selectDisplayLocation}
                                onChange={clickDisplayLocationDropdown}

                                label='Display Location'
                            />
                        </Grid>
                        <Grid item xs={4} md={4} >
                            <Datepicker
                                DateValue={StartDate}
                                onDateChange={onSelectStartDate}
                                label={'Start Date'}
                                size={"medium"}
                            />
                            <ErrorMessage1 Error={ErrorStartDate}></ErrorMessage1>
                            <ErrorMessage1 Error={ErrorStartDateblank}></ErrorMessage1>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Datepicker
                                DateValue={EndDate}
                                onDateChange={onSelectEndDate}
                                label={'End Date'}
                                size={"medium"}
                            />
                            <ErrorMessage1 Error={ErrorEndDate}></ErrorMessage1>
                            <ErrorMessage1 Error={ErrorEndDateblank}></ErrorMessage1>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TimepickerTwofields Item={StartTime} label={'Start Time'} isMandatory={false} ClickItem={clickStartTime} size={"medium"} tooltipMessage="e.g. 10:00 AM" />

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TimepickerTwofields Item={EndTime} label={'End Time'} isMandatory={false} ClickItem={clickEndTime} size={"medium"} tooltipMessage="e.g. 04:00 PM" />
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
                            <ErrorMessage1 Error={SortOrderError}></ErrorMessage1>
                        </Grid>
                        {radioBtn === '1' && (
                            <Grid item xs={12} md={4}>
                                <Box sx={{ position: 'relative' }}>
                                    <SingleFile2
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
                                        <ErrorMessage1 Error={NoticeFileError} />
                                    )}
                                </Box>
                            </Grid>
                        )}

                        <Grid item xs={6} md={3}>
                            <SingleFile2
                                ValidFileTypes={ValidFileTypes2}
                                MaxfileSize={MaxfileSize2}
                                ChangeFile={ChangeFile2}
                                errorMessage={''}
                                FileName={ImageFile}
                                FileLabel={'Select Image'}
                                width={'100%'}
                                height={"52px"}
                                isMandatory={false}
                            />
                        </Grid>
                        <Grid item xs={1} md={1}>
                            <>
                                <Tooltip title={"View"}>
                                    <IconButton
                                        onClick={viewImage}
                                        sx={{
                                            color: '#223354',
                                            '&:hover': {
                                                color: '#223354',
                                                cursor: 'pointer'
                                            }
                                        }}
                                    >
                                        <Visibility />
                                    </IconButton>
                                </Tooltip> &nbsp;
                                <Tooltip title={"Delete"}>
                                    <IconButton
                                        onClick={() => deleteImage(Number(NoticeId))}
                                        sx={{
                                            color: '#223354',
                                            '&:hover': {
                                                color: 'red',
                                                backgroundColor: red[100]
                                            }
                                        }}
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        </Grid>

                        <Grid item xs={12} >
                            <ResizableTextField
                                label={<>
                                    Description
                                </>}
                                multiline
                                rows={3}
                                value={Description}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 255) {
                                        setDescription(value);
                                    }
                                }}
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
                                {/* <ErrorMessage1 Error={ErrorUserRole} /> */}
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
                                        <Box>
                                            <FormControlLabel
                                                control={<Checkbox checked={applicableTo.teacher} onChange={handleCheckboxChange} name="teacher" />}
                                                label="Teacher"
                                            /></Box>
                                        <FormControlLabel
                                            control={<Checkbox checked={applicableTo.student} onChange={handleCheckboxChange} name="student" />}
                                            label="Student"
                                        />
                                        <Box>
                                            <FormControlLabel
                                                control={<Checkbox checked={applicableTo.adminStaff} onChange={handleCheckboxChange} name="adminStaff" />}
                                                label="Admin Staff"
                                            /></Box>
                                        <FormControlLabel
                                            control={<Checkbox checked={applicableTo.otherStaff} onChange={handleCheckboxChange} name="otherStaff" />}
                                            label="Other Staff"
                                        />
                                    </Box>
                                </FormGroup>
                            </Grid>
                            {applicableTo.student && (
                                <Grid item xs={12} md={9} mt={2}>
                                    <Typography variant="h5">
                                        Associated Classes
                                    </Typography>
                                    <SelectListHierarchy
                                        ItemList={ItemList}
                                        ParentList={ClassesAndDivisionss1}
                                        ClickChild={ClickChild}
                                    /><ErrorMessage1 Error={ClassSelectedError}></ErrorMessage1>
                                </Grid>
                            )}
                        </Grid>
                        {radioBtn === '1' ? null
                            :
                            <Grid item md={12}>
                                <Box>
                                    <ReactQuill value={NoticeContent} onChange={handleEditorChange} modules={modules} formats={formats} style={{ height: '300px', marginBottom: "50px", }} />
                                    <ErrorMessage1 Error={NoticeContentError}></ErrorMessage1>
                                </Box>
                            </Grid>
                        }
                    </Grid>
                </Box>
            </Box >
        </>
    );
};

export default AddSchoolNoticeFT;
