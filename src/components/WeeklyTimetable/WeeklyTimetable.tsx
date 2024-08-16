import AddIcon from '@mui/icons-material/Add'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import QuestionMark from "@mui/icons-material/QuestionMark"
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Save from "@mui/icons-material/Save"
import Settings from "@mui/icons-material/Settings"
import SquareIcon from '@mui/icons-material/Square'
import { Alert, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, FormGroup, IconButton, MenuItem, Popover, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import { blue, green, grey, red } from "@mui/material/colors"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify'
import { AlertContext } from 'src/contexts/AlertContext'
import { IGetDataForAdditionalClassesBody, IGetLectureCountsForTeachersBody } from "src/interfaces/Teacher/ITeacherTimeTable"
import { IGetClassTimeTableBody, IGetDeleteAdditionalLectureBody, IGetDeleteAdditionalLecturesBody, IGetDivisionForStdDropdownBody, IGetManageClassTimeTableBody, IGetResetTimetableBody, IGetSaveClassTimeTableBody, IGetSaveTeacherTimeTableBody, IGetTeacherAndStandardForTimeTableBody, IGetTeacherSubjectMaxLecDetailsBody, IGetTimeTableForTeacherBody } from "src/interfaces/WeeklyTimeTable/IWeeklyTimetable"
import SuspenseLoader from 'src/layouts/components/SuspenseLoader'
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown"
import SearchableDropdown1 from "src/libraries/ResuableComponents/SearchableDropdown1"
import { GetDataForAdditionalClasses, GetLectureCountsForTeachers } from "src/requests/Teacher/TMtimetable"
import { CDAClassLecNoWeekday, CDAClearManageClassTimeTable, CDAClearValidateTeacherData, CDAClearWeeklyClassTimetableValues, CDAClearWeeklyTeacherTimetableValues, CDADeleteAdditionalLectures, CDAGetDataForAdditionalClasses, CDAGetDivisionName, CDAGetLectureNoWeekday, CDAGetResetTimetableMsgClear, CDAGetStandardNameList, CDAGetTeachersList, CDAGetTeacherSubjectMaxLecDetailsForFri, CDAGetTeacherSubjectMaxLecDetailsForMon, CDAGetTeacherSubjectMaxLecDetailsForThu, CDAGetTeacherSubjectMaxLecDetailsForTue, CDAGetTeacherSubjectMaxLecDetailsForWed, CDAManageClassTimeTable, CDAResetDeleteAdditionalLecture, CDAResetDeleteAdditionalLectures, CDAResetTimetable, CDASaveClassTimetable, CDASaveTeacherTimetable, CDASaveTeacherTimetableWithIncr, ResetSaveClassTimetableMsg, ResetSaveTeacherTimetableMsg } from "src/requests/WeeklyTimeTable/RequestWeeklyTimeTable"
import { RootState } from "src/store"
import { GetScreenPermission } from '../Common/Util'
import CommonPageHeader from "../CommonPageHeader"

type Props = {}

const HeaderStyledCell = styled(TableCell)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: '#19bed4',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    border: '1px solid rgba(224, 224, 224, 1)',
    textAlign: 'center'
}))
const FooterStyledCell = styled(TableCell)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: '#bdc7cd',
    fontWeight: 'bold',
    border: '1px solid rgba(224, 224, 224, 1)',
    textAlign: 'center'
}))

const StyledCell = styled(TableCell)(({ theme }) => ({
    paddingTop: theme.spacing(0.2),
    paddingBottom: theme.spacing(0.2),
    paddingLeft: theme.spacing(0.2),
    paddingRight: theme.spacing(0.2),
    border: '1px solid rgba(224, 224, 224, 1)'
}))
const StyledCell1 = styled(TableCell)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    border: '1px solid rgba(224, 224, 224, 1)'
}))

const WeeklyTimetable = (props: Props) => {
    const dispatch = useDispatch();
    const { showAlert, closeAlert } = useContext(AlertContext);
    const UserRoleId = sessionStorage.getItem('RoleId');
    const SessionTeacherId = sessionStorage.getItem('TeacherId');
    const IsWeeklyTimetableFullAccess = GetScreenPermission('Weekly Timetable');
    const TeachersList = useSelector((state: RootState) => state.WeeklyTimetable.ISTeachersList);
    const LectureCountsForTeachers = useSelector((state: RootState) => state.TMTimetable.ISGetLectureCountsForTeachers);
    const AdditionalClasses = useSelector((state: RootState) => state.TMTimetable.ISGetDataForAdditionalClasses);
    const AddLecWeekDays = useSelector((state: RootState) => state.WeeklyTimetable.ISAddClassesWeekDay);
    const AddLecLectureNumber = useSelector((state: RootState) => state.WeeklyTimetable.ISAddClassesLectureNumber);
    const AddLecSubjectName = useSelector((state: RootState) => state.WeeklyTimetable.ISAddClassesSubjectName);
    const ResetTimetableMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISResetTimetableMsg);
    const StandardNameList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetStandardName);
    const SaveTeacherTimetableMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetSaveTeacherTimetableMsg);
    const SaveClassTimetableMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetSaveClassTimetableMsg);
    const DivisionNameList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetDivisionName);
    const MondayColumnList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetTeacherSubjectMaxLecForMon);
    const TuesdayColumnList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetTeacherSubjectMaxLecForTue);
    const WednesdayColumnList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetTeacherSubjectMaxLecForWed);
    const ThursdayColumnList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetTeacherSubjectMaxLecForThu);
    const FridayColumnList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetTeacherSubjectMaxLecForFri);
    const TeacherTimetableCellValues = useSelector((state: RootState) => state.WeeklyTimetable.ISGetLectureNoWeekday);
    const ApplicablesToggleData = useSelector((state: RootState) => state.WeeklyTimetable.ISGetApplicables);
    const ClassTimetableCellValues = useSelector((state: RootState) => state.WeeklyTimetable.ISGetClassLecNoWeekday);
    const WeekdayIds = useSelector((state: RootState) => state.WeeklyTimetable.ISWeekdayId);
    const ClassWeeklyIds = useSelector((state: RootState) => state.WeeklyTimetable.ISClassWeekdayId);
    const mptInfo = useSelector((state: RootState) => state.WeeklyTimetable.ISMPTinfo);
    const AssemblyInfo = useSelector((state: RootState) => state.WeeklyTimetable.ISAssemblyInfo);
    const StayBackInfo = useSelector((state: RootState) => state.WeeklyTimetable.ISStayBackInfo);
    const mptInfoClass = useSelector((state: RootState) => state.WeeklyTimetable.ISMPTinfoClass);
    const weeklyTestInfo = useSelector((state: RootState) => state.WeeklyTimetable.ISWeeklytestInfo);
    const AssemblyInfoClass = useSelector((state: RootState) => state.WeeklyTimetable.ISAssemblyInfoClass);
    const loading = useSelector((state: RootState) => state.WeeklyTimetable.Loading);
    const DeleteAddLecMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetDeleteAdditionalLectureMsg);
    const ManageTimeTableMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetManageClassTimeTableMsg);
    const TimetableDetails = useSelector((state: RootState) => state.WeeklyTimetable.ISTimetableDetails);
    const DeleteAddLecturesMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetDeleteAdditionalLecturesMsg);
    const ValidateTeacherDataMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISValidateTeacherData);

    const [teacherSettingsAnchorEL, setTeacherSettingsAnchorEL] = useState<HTMLButtonElement | null>(null);
    const [filterBy, setFilterBy] = useState<string>('Teacher')
    const [showAddAdditionalLectures, setShowAddAdditionalLectures] = useState<boolean>(false);
    const [teacher, setTeacher] = useState<string>('0');
    const [teacherName, setTeacherName] = useState<string>('');
    const [standard, setStandard] = useState<string>('0');
    const [division, setDivision] = useState<string>('0');
    const [standardName, setStandardName] = useState('');
    const [divisionName, setDivisionName] = useState('');
    const [assembly, setAssembly] = useState<boolean>(false);
    const [mpt, setMPT] = useState<boolean>(false);
    const [stayback, setStayback] = useState<boolean>(false);
    const [weeklytest, setWeekly] = useState<boolean>(false);
    const [trackTeacherTimetable, setTrackTeacherTimetable] = useState({});
    const [trackClassTimetable, setTrackClassTimetable] = useState({});
    const [isNewTeacherSelection, setIsNewTeacherSelection] = useState<Boolean>(false);
    const [isNewClassSelection, setIsNewClassSelection] = useState<Boolean>(false);
    const [AddLecForTWeekDayId, setAddLecForWeekDayId] = useState('0');
    const [AddLecForTLecNo, setAddLecForTLecNo] = useState('0');
    const [AddLecForTSubjectNameId, setAddLecForTSubjectNameId] = useState('0');
    const [AddLecForTStdDivId, setAddLecForTStdDivId] = useState('0');

    const checkErrorMsgLength = (obj) => {
        let flag = true;
        // Trim whitespace and check for empty values
        const isText1Empty = obj.Text1.trim() === "";
        const isText2Empty = obj.Text2.trim() === "";
        const isText3Empty = obj.Text3.trim() === "";
        const isText5Empty = obj.Text5.trim() === "";
        const isText6Empty = obj.Text6.trim() === "";
        // Check if Text4 is non-empty
        const isText4NonEmpty = obj.Text4.trim() !== "";
        // Condition: if Text4 is non-empty and all other texts are empty
        if (isText4NonEmpty && isText1Empty && isText2Empty && isText3Empty && isText5Empty && isText6Empty) {
            flag = false;
        }
        return flag;
    }

    const filterLecNo = (value) => {
        return value.WeekdayId === AddLecForTWeekDayId
    }
    let filteredAddLecLectureNumber = AddLecLectureNumber.filter(filterLecNo);
    filteredAddLecLectureNumber.unshift({ Id: '0', Name: 'Select', Value: '0', WeekdayId: '0' })

    const GetLectureCountsForTeachersBody: IGetLectureCountsForTeachersBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asTeacher_Id: Number(teacher),
        asConsiderAssembly: "Y",
        asConsiderMPT: "Y",
        asConsiderStayback: "Y",
        asConsiderWeeklyTest: "Y"
    }
    useEffect(() => {
        if (SaveTeacherTimetableMsg !== '') {
            toast.success(SaveTeacherTimetableMsg);
            dispatch(ResetSaveTeacherTimetableMsg());
            sessionStorage.removeItem('ExceedLecMsg');
            dispatch(CDAClearValidateTeacherData());
            dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
            dispatch(GetLectureCountsForTeachers(GetLectureCountsForTeachersBody))
        }
    }, [SaveTeacherTimetableMsg])
    useEffect(() => {
        if (SaveClassTimetableMsg !== '') {
            toast.success(SaveClassTimetableMsg);
            dispatch(ResetSaveClassTimetableMsg());
        }
    }, [SaveClassTimetableMsg])
    useEffect(() => {
        if (DeleteAddLecturesMsg !== '') {
            toast.success(DeleteAddLecturesMsg)
            dispatch(CDAResetDeleteAdditionalLectures())
            dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
        }
    }, [DeleteAddLecturesMsg])

    const CDAGetStandardListBody: IGetTeacherAndStandardForTimeTableBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcadmicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        // asTeacher_id: UserRoleId === '2' && IsWeeklyTimetableFullAccess === 'N' ? Number(SessionTeacherId) : 0
        asTeacher_id: 0
    }
    useEffect(() => {
        dispatch(CDAClearValidateTeacherData());
        dispatch(CDAGetTeachersList(CDAGetStandardListBody));
        dispatch(CDAGetStandardNameList(CDAGetStandardListBody));
    }, [])

    useEffect(() => {
        if (DeleteAddLecMsg !== '') {
            toast.success(DeleteAddLecMsg)
        }
        dispatch(CDAResetDeleteAdditionalLecture())
        dispatch(GetDataForAdditionalClasses(AdditionalLectureBody))
    }, [DeleteAddLecMsg])

    useEffect(() => {
        const DivisionDropdownBody: IGetDivisionForStdDropdownBody = {
            asSchoolId: Number(localStorage.getItem('SchoolId')),
            asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asStandardId: Number(standard)
        }

        if (standard !== '0') {
            dispatch(CDAGetDivisionName(DivisionDropdownBody))
        }
    }, [standard])
    const WeekDayTeacherBody: IGetTimeTableForTeacherBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asTeacherID: filterBy === 'Teacher' && teacher !== '0' ? Number(teacher) : 0
    }
    useEffect(() => {
        if (teacher !== '0' && filterBy === 'Teacher') {
            setTrackTeacherTimetable({})
            dispatch(CDAClearWeeklyTeacherTimetableValues());
            dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
        }
    }, [teacher, filterBy])
    useEffect(() => {
        if (division !== '0' && filterBy === 'Class') {
            setTrackClassTimetable({})
            dispatch(CDAClearWeeklyClassTimetableValues());
            dispatch(CDAClassLecNoWeekday(WeekDayClassBody));
        }
    }, [division, filterBy])
    const WeekDayClassBody: IGetClassTimeTableBody = {
        asSchool_Id: Number(localStorage.getItem('SchoolId')),
        asAcademicYear_ID: Number(sessionStorage.getItem('AcademicYearId')),
        asStandardDivisionId: filterBy === 'Class' && division !== '0' ? Number(division) : 0
    }
    // Dispatch to get Timetable subject dropdowns for Teachers selection.. (Mon to Fri)
    const IGetTeacherSubjectMaxLecForMon: IGetTeacherSubjectMaxLecDetailsBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asTeacherId: filterBy === 'Teacher' && teacher !== '0' ? Number(teacher) : 0,
        asStandardDivId: filterBy === 'Class' && division !== '0' ? Number(division) : 0,
        asWeekDayName: 'Monday'
    }
    const IGetTeacherSubjectMaxLecForTue: IGetTeacherSubjectMaxLecDetailsBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asTeacherId: filterBy === 'Teacher' && teacher !== '0' ? Number(teacher) : 0,
        asStandardDivId: filterBy === 'Class' && division !== '0' ? Number(division) : 0,
        asWeekDayName: 'Tuesday'
    }
    const IGetTeacherSubjectMaxLecForWed: IGetTeacherSubjectMaxLecDetailsBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asTeacherId: filterBy === 'Teacher' && teacher !== '0' ? Number(teacher) : 0,
        asStandardDivId: filterBy === 'Class' && division !== '0' ? Number(division) : 0,
        asWeekDayName: 'Wednesday'
    }
    const IGetTeacherSubjectMaxLecForThu: IGetTeacherSubjectMaxLecDetailsBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asTeacherId: filterBy === 'Teacher' && teacher !== '0' ? Number(teacher) : 0,
        asStandardDivId: filterBy === 'Class' && division !== '0' ? Number(division) : 0,
        asWeekDayName: 'Thursday'
    }
    const IGetTeacherSubjectMaxLecForFri: IGetTeacherSubjectMaxLecDetailsBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asTeacherId: filterBy === 'Teacher' && teacher !== '0' ? Number(teacher) : 0,
        asStandardDivId: filterBy === 'Class' && division !== '0' ? Number(division) : 0,
        asWeekDayName: 'Friday'
    }
    useEffect(() => {
        if (teacher !== '0' && isNewTeacherSelection === true) {
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForMon(IGetTeacherSubjectMaxLecForMon));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForTue(IGetTeacherSubjectMaxLecForTue));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForWed(IGetTeacherSubjectMaxLecForWed));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForThu(IGetTeacherSubjectMaxLecForThu));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForFri(IGetTeacherSubjectMaxLecForFri));
        }
    }, [teacher, isNewTeacherSelection]);

    // Additional / Optional Lecture Added Success Msg.
    useEffect(() => {
        if (ManageTimeTableMsg !== '') {
            toast.success(ManageTimeTableMsg)
        }
        dispatch(CDAClearManageClassTimeTable())
        ClearAddLecForTeacherFields()
        dispatch(CDAGetTeacherSubjectMaxLecDetailsForMon(IGetTeacherSubjectMaxLecForMon));
        dispatch(CDAGetTeacherSubjectMaxLecDetailsForTue(IGetTeacherSubjectMaxLecForTue));
        dispatch(CDAGetTeacherSubjectMaxLecDetailsForWed(IGetTeacherSubjectMaxLecForWed));
        dispatch(CDAGetTeacherSubjectMaxLecDetailsForThu(IGetTeacherSubjectMaxLecForThu));
        dispatch(CDAGetTeacherSubjectMaxLecDetailsForFri(IGetTeacherSubjectMaxLecForFri));
    }, [ManageTimeTableMsg])


    // Split `-` Sequence is as follows [ SubTeacherId-WeekDayId-StdDivId-SubId-LecNo ]  | For Teacher's Timetable Case
    // Split `-` Sequence is as follows [ SubTeacherId-WeekDayId-TeacherId-SubId-LecNo ]  | For Class's Timetable Case
    useEffect(() => {
        if (isNewTeacherSelection && TeacherTimetableCellValues.length > 0 && WeekdayIds.length > 0 && MondayColumnList?.length > 0 && TuesdayColumnList?.length > 0 && WednesdayColumnList?.length > 0 && ThursdayColumnList?.length > 0 && FridayColumnList?.length > 0) {
            setTrackTeacherTimetable({});
            const abc = {};
            const WeekDaydropdownList = [MondayColumnList, TuesdayColumnList, WednesdayColumnList, ThursdayColumnList, FridayColumnList];
            // Get weekday IDs
            const weekdayIds = WeekdayIds.map(item => item.WeekdayId);
            // Process Lecture_No_WeekDay data
            TeacherTimetableCellValues.forEach(lecture => {
                const lectureNo = lecture.Text1;
                ['Text2', 'Text3', 'Text4', 'Text5', 'Text6'].forEach((day, index) => {
                    let art = WeekDaydropdownList[index].filter(item => item.Id === lecture[day])
                    const key = `${weekdayIds[index]}-${lectureNo}`;
                    abc[key] = `${lecture[day]}-${weekdayIds[index]}-${art[0]?.StdDivId === undefined ? '0' : art[0]?.StdDivId}-${art[0]?.SubId === undefined ? '0' : art[0]?.SubId}-${lectureNo}`;

                });
            });
            setTrackTeacherTimetable(abc);
        }
    }, [TeacherTimetableCellValues, WeekdayIds, isNewTeacherSelection, MondayColumnList, TuesdayColumnList, WednesdayColumnList, ThursdayColumnList, FridayColumnList])


    useEffect(() => {
        if (ClassTimetableCellValues.length > 0 && ClassWeeklyIds.length > 0 && MondayColumnList.length > 0 && TuesdayColumnList.length > 0 && WednesdayColumnList.length > 0 && ThursdayColumnList.length > 0 && FridayColumnList.length > 0) {
            setTrackClassTimetable({});
            const abc = {};
            const WeekDaydropdownList = [MondayColumnList, TuesdayColumnList, WednesdayColumnList, ThursdayColumnList, FridayColumnList];
            // Get weekday IDs
            const weekdayIds = ClassWeeklyIds.map(item => item.WeekdayId);
            // Process Lecture_No_WeekDay data
            ClassTimetableCellValues.forEach(lecture => {
                const lectureNo = lecture.Text1;
                ['Text2', 'Text3', 'Text4', 'Text5', 'Text6'].forEach((day, index) => {
                    let art = WeekDaydropdownList[index].filter(item => item.Id === lecture[day])
                    const key = `${weekdayIds[index]}-${lectureNo}`;
                    abc[key] = `${lecture[day]}-${weekdayIds[index]}-${art[0]?.TeacherId === undefined ? '0' : art[0]?.TeacherId}-${art[0]?.SubId === undefined ? '0' : art[0]?.SubId}-${lectureNo}`;

                });
            });
            setTrackClassTimetable(abc);
        }
    }, [ClassTimetableCellValues, ClassWeeklyIds, MondayColumnList, TuesdayColumnList, WednesdayColumnList, ThursdayColumnList, FridayColumnList])


    useEffect(() => {
        if (ApplicablesToggleData.length > 0) {
            ApplicablesToggleData.map((item, i) => {
                setAssembly(item.Assembly === 'Y' ? true : false);
                setMPT(item.MPT === 'Y' ? true : false);
                setWeekly(item.Weeklytest === 'Y' ? true : false);
                setStayback(item.Stayback === 'True' ? true : false);
            })
        }
    }, [ApplicablesToggleData])
    useEffect(() => {
        if (division !== '0') {
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForMon(IGetTeacherSubjectMaxLecForMon));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForTue(IGetTeacherSubjectMaxLecForTue));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForWed(IGetTeacherSubjectMaxLecForWed));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForThu(IGetTeacherSubjectMaxLecForThu));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForFri(IGetTeacherSubjectMaxLecForFri));
        }
    }, [division]);

    useEffect(() => {
        if (ResetTimetableMsg !== '') {
            toast.success(ResetTimetableMsg);
            dispatch(CDAGetResetTimetableMsgClear());
            dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
            dispatch(CDAClearValidateTeacherData());
            dispatch(GetLectureCountsForTeachers(GetLectureCountsForTeachersBody));
        }
    }, [ResetTimetableMsg])

    useEffect(() => {
        if (teacher !== '0') {
            dispatch(GetLectureCountsForTeachers(GetLectureCountsForTeachersBody))
        }
    }, [teacher])

    const AdditionalLectureBody: IGetDataForAdditionalClassesBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcademicYearID: Number(sessionStorage.getItem('AcademicYearId')),
        asTeacher_Id: filterBy === 'Teacher' ? Number(teacher) : 0,
        asStandardDivision_Id: filterBy === 'Teacher' ? 0 : Number(standard)
    }
    useEffect(() => {
        if (teacher !== '0') {
            dispatch(GetDataForAdditionalClasses(AdditionalLectureBody))
        }
    }, [teacher])

    useEffect(() => {
        if (standard !== '0' && division !== '0') {
            dispatch(GetDataForAdditionalClasses(AdditionalLectureBody))
        }
    }, [standard, division])

    const ClickAdditionalLecture = () => {
        ClearAddLecForTeacherFields();
        setShowAddAdditionalLectures(true);
        setIsSubmitAdLecToTeacher(false);
        const AdditionalLecturesBody: IGetDataForAdditionalClassesBody = {
            asSchoolId: Number(localStorage.getItem('SchoolId')),
            asAcademicYearID: Number(sessionStorage.getItem('AcademicYearId')),
            asTeacher_Id: Number(teacher),
            asStandardDivision_Id: 0
        }
        dispatch(CDAGetDataForAdditionalClasses(AdditionalLecturesBody));
    }

    const handleTeacherSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTeacherSettingsAnchorEL(event.currentTarget);
    };

    const handleTeacherSettingsClose = () => {
        setTeacherSettingsAnchorEL(null);
    };

    const resetTimetable = () => {
        const ResetWeeklyTimetableBody: IGetResetTimetableBody = {
            asSchoolId: Number(localStorage.getItem('localSchoolId')),
            asAcadmicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asTeacher_id: filterBy === 'Teacher' ? Number(teacher) : 0,
            asStandardDivision_Id: filterBy === 'Teacher' ? 0 : Number(division)
        }
        showAlert({
            title: 'Please Confirm',
            message: `Are you sure you want to reset this timetable?`,
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onConfirm: () => {
                dispatch(CDAResetTimetable(ResetWeeklyTimetableBody));
                closeAlert();
            },
            onCancel: () => {
                closeAlert();
            }
        });
    }

    const open = Boolean(teacherSettingsAnchorEL);
    const id = open ? 'teacher-settings-popover' : undefined;

    const handleMpt = (event: React.ChangeEvent<HTMLInputElement>) => {
        mpt === false ? setMPT(event.target.checked) : setMPT(false);
    };
    const handleStayback = (event: React.ChangeEvent<HTMLInputElement>) => {
        stayback === false ? setStayback(event.target.checked) : setStayback(false);
    };
    const handleAssembly = (event: React.ChangeEvent<HTMLInputElement>) => {
        assembly === false ? setAssembly(event.target.checked) : setAssembly(false);
    };
    const handleWeeklytest = (event: React.ChangeEvent<HTMLInputElement>) => {
        weeklytest === false ? setWeekly(event.target.checked) : setWeekly(false);
    };


    // f() for selecting individual Teacher Timetable Cell Selection  and Track 
    const clickTeacherMon = (value, data) => {
        setTrackTeacherTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data?.split('-')[0]}-${value.StdDivId}-${value.SubId}-${data?.split('-')[1]}`,
        }))
    }

    const clickTeacherTue = (value, data) => {
        setTrackTeacherTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data?.split('-')[0]}-${value.StdDivId}-${value.SubId}-${data?.split('-')[1]}`,
        }))
    }
    const clickTeacherWed = (value, data) => {
        setTrackTeacherTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data?.split('-')[0]}-${value.StdDivId}-${value.SubId}-${data?.split('-')[1]}`,
        }))
    }
    const clickTeacherThu = (value, data) => {
        setTrackTeacherTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data?.split('-')[0]}-${value.StdDivId}-${value.SubId}-${data?.split('-')[1]}`,
        }))
    }
    const clickTeacherFri = (value, data) => {
        setTrackTeacherTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data?.split('-')[0]}-${value.StdDivId}-${value.SubId}-${data?.split('-')[1]}`,
        }))
    }

    // f() for selecting individual Class Timetable Cell Selection  and Track
    const clickClassMon = (value, data) => {
        setTrackClassTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data?.split('-')[0]}-${value.TeacherId}-${value.SubId}-${data?.split('-')[1]}`,
        }))
    }
    const clickClassTue = (value, data) => {
        setTrackClassTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data?.split('-')[0]}-${value.TeacherId}-${value.SubId}-${data?.split('-')[1]}`,
        }))
    }
    const clickClassWed = (value, data) => {
        setTrackClassTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data?.split('-')[0]}-${value.TeacherId}-${value.SubId}-${data?.split('-')[1]}`,
        }))
    }
    const clickClassThu = (value, data) => {
        setTrackClassTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data?.split('-')[0]}-${value.TeacherId}-${value.SubId}-${data?.split('-')[1]}`,
        }))
    }
    const clickClassFri = (value, data) => {
        setTrackClassTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data?.split('-')[0]}-${value.TeacherId}-${value.SubId}-${data?.split('-')[1]}`,
        }))
    }


    function GetClassMasterXML() {
        let sXML = "";
        const weekdayIds = ClassWeeklyIds.map(item => item.WeekdayId);
        ClassTimetableCellValues.forEach(lecture => {
            const lectureNo = lecture.Text1;
            ['Text2', 'Text3', 'Text4', 'Text5', 'Text6'].forEach((day, index) => {
                const key = `${weekdayIds[index]}-${lectureNo}`;
                if (trackClassTimetable[key]?.split('-')[0] !== "0" && lectureNo !== '99') {
                    sXML += `<DaywiseTimeTable Weekday_Id="${trackClassTimetable[key]?.split('-')[1]}" />`
                }
            });
        });
        sXML = `<DaywiseTimeTableMaster>${sXML}</DaywiseTimeTableMaster>`
        return sXML;
    }
    function GetClassDetailXML() {
        let sXML = "";
        const weekdayIds = ClassWeeklyIds.map(item => item.WeekdayId);
        ClassTimetableCellValues.forEach(lecture => {
            const lectureNo = lecture.Text1;
            ['Text2', 'Text3', 'Text4', 'Text5', 'Text6'].forEach((day, index) => {
                const key = `${weekdayIds[index]}-${lectureNo}`;
                if (trackClassTimetable[key]?.split('-')[0] !== "0" && lectureNo !== '99') {
                    sXML += `<DaywiseTimeTableDetail WeekDay_Id="${trackClassTimetable[key]?.split('-')[1]}" Lecture_Number="${trackClassTimetable[key]?.split('-')[4]}" Teacher_ID="${trackClassTimetable[key]?.split('-')[2]}" Subject_Id="${trackClassTimetable[key]?.split('-')[3]}"/>`
                }
            });
        });
        sXML = `<DaywiseTimeTableDetails>${sXML}</DaywiseTimeTableDetails>`
        return sXML;
    }

    // f() to save Class Timetable
    // Interface Body 
    const SaveClassTimetableBody: IGetSaveClassTimeTableBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asInsertedById: Number(sessionStorage.getItem('Id')),
        asStdDivId: Number(division),
        asMasterXml: GetClassMasterXML(),
        asDetailXml: GetClassDetailXML(),
        asAdditionalLect: null,
        IsAdditionalClass: false,
        asIncCnt: 0
    }
    function saveClassTimetable() {
        dispatch(CDASaveClassTimetable(SaveClassTimetableBody));
    }

    // f() to save Teacher Timetable 
    // Interface Body 
    const SaveTeacherTimetableBody: IGetSaveTeacherTimeTableBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asInsertedById: Number(sessionStorage.getItem('Id')),
        asTeacherID: Number(teacher),
        asMasterXml: GetMasterXML(),
        asDetailXml: GetDetailXML(),
        asTeacherXML: GetTeacherXML(),
        IsAdditionalClass: 0,
        asIncCnt: 0
    }
    const SaveTeacherTimetableBody1: IGetSaveTeacherTimeTableBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asInsertedById: Number(sessionStorage.getItem('Id')),
        asTeacherID: Number(teacher),
        asMasterXml: GetMasterXML(),
        asDetailXml: GetDetailXML(),
        asTeacherXML: GetTeacherXML(),
        IsAdditionalClass: 0,
        asIncCnt: 1
    }
    function saveTeacherTimetable() {
        sessionStorage.removeItem('ExceedLecMsg')
        dispatch(CDASaveTeacherTimetable(SaveTeacherTimetableBody));
    }
    useEffect(() => {
        if (ValidateTeacherDataMsg.length > 0) {
            if (checkErrorMsgLength(ValidateTeacherDataMsg[0]) === false) {
                let obs = ValidateTeacherDataMsg[0];
                showAlert({
                    title: 'Please Confirm',
                    message: `${obs.Text4}Do you want to increase limit for subject(s)?`,
                    variant: 'warning',
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    onConfirm: () => {
                        dispatch(CDASaveTeacherTimetableWithIncr(SaveTeacherTimetableBody1))
                        closeAlert();
                    },
                    onCancel: () => {
                        closeAlert();
                        sessionStorage.removeItem('ExceedLecMsg');
                        dispatch(CDAClearValidateTeacherData());
                    }
                });
            }
        }
    }, [ValidateTeacherDataMsg])

    function GetMasterXML() {
        let sXML = "";
        const weekdayIds = WeekdayIds.map(item => item.WeekdayId);
        TeacherTimetableCellValues.forEach(lecture => {
            const lectureNo = lecture.Text1;
            ['Text2', 'Text3', 'Text4', 'Text5', 'Text6'].forEach((day, index) => {
                const key = `${weekdayIds[index]}-${lectureNo}`;
                // abc[key] = `${lecture[day]}-${weekdayIds[index]}`;
                if (trackTeacherTimetable[key]?.split('-')[0] !== "0" && lectureNo !== '99') {
                    sXML += `<DaywiseTimeTable Standard_Division_Id="${trackTeacherTimetable[key]?.split('-')[2]}" Weekday_Id="${trackTeacherTimetable[key]?.split('-')[1]}" />`
                }
            });
        });
        sXML = `<DaywiseTimeTableMaster>${sXML}</DaywiseTimeTableMaster>`
        return sXML;
    }
    function GetDetailXML() {
        let sXML = "";
        const weekdayIds = WeekdayIds.map(item => item.WeekdayId);
        TeacherTimetableCellValues.forEach(lecture => {
            const lectureNo = lecture.Text1;
            ['Text2', 'Text3', 'Text4', 'Text5', 'Text6'].forEach((day, index) => {
                const key = `${weekdayIds[index]}-${lectureNo}`;
                if (trackTeacherTimetable[key]?.split('-')[0] !== "0" && lectureNo !== '99') {
                    sXML += `<DaywiseTimeTableDetail WeekDay_Id="${trackTeacherTimetable[key]?.split('-')[1]}" Teacher_ID="${teacher}" Standard_Division_Id="${trackTeacherTimetable[key]?.split('-')[2]}" Lecture_Number="${trackTeacherTimetable[key]?.split('-')[4]}" Subject_Id="${trackTeacherTimetable[key]?.split('-')[3]}"/>`
                }
            });
        });
        sXML = `<DaywiseTimeTableDetails>${sXML}</DaywiseTimeTableDetails>`
        return sXML;
    }
    function GetTeacherXML() {
        let sXML = "";
        sXML = `<TeacherMaster><Teacher Assembly_Applicable="${assembly === true ? 'Y' : 'N'}" MPT_Applicable="${mpt === true ? 'Y' : 'N'}" Stayback_Applicable="${stayback === true ? 'Y' : 'N'}" /></TeacherMaster>`
        return sXML;
    }
    const [isSubmitAdLecToTeacher, setIsSubmitAdLecToTeacher] = useState(false);

    function SubmitAddLecForTeacher() {
        const AddLecForTeacherApiBody: IGetManageClassTimeTableBody = {
            asSchoolId: Number(localStorage.getItem('localSchoolId')),
            asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asInserted_By_id: Number(sessionStorage.getItem('Id')),
            asStandardDivId: Number(AddLecForTStdDivId),
            asDayTimeTableMasterXml: `<DaywiseTimeTableMaster><DaywiseTimeTable Standard_Division_Id='${AddLecForTStdDivId}' Weekday_Id='${AddLecForTWeekDayId}' /></DaywiseTimeTableMaster>`,
            asDayTimeTableDetailsXml: `<DaywiseTimeTableDetails><DaywiseTimeTableDetail WeekDay_Id='${AddLecForTWeekDayId}' Teacher_ID='${teacher}' Standard_Division_Id='${AddLecForTStdDivId}' Lecture_Number='${AddLecForTLecNo}' Subject_Id='${AddLecForTSubjectNameId}' /></DaywiseTimeTableDetails>`,
            asIsAdditionalClass: true,
            asIsCountInceased: 0
        }
        if (AddLecForTWeekDayId !== '0' && AddLecForTLecNo !== '0' && AddLecForTSubjectNameId !== '0') {
            dispatch(CDAManageClassTimeTable(AddLecForTeacherApiBody));
            setShowAddAdditionalLectures(false)
            setIsSubmitAdLecToTeacher(false);
        } else {
            setIsSubmitAdLecToTeacher(true);
        }
    }

    function ClearAddLecForTeacherFields() {
        setAddLecForWeekDayId('0')
        setAddLecForTLecNo('0')
        setAddLecForTSubjectNameId('0');
    }
    const MptWeekdayInfo = mptInfo.map((item, i) => item.Text1);
    const MptLecNo = mptInfo.map((item, i) => item.Text2);
    const AssemblyWeekdayInfo = AssemblyInfo.map((item, i) => item.Text1);
    const AssemblyLecNo = AssemblyInfo.map((item, i) => item.Text2);

    const DeleteAddLecForTeacherBody: IGetDeleteAdditionalLectureBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcadmicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asTeacherId: Number(teacher),
        asStayBack: stayback,
        asMPTweekday: MptWeekdayInfo.toString(),
        asMPTLectNo: Number(MptLecNo.toString()),
        asAssemblyDay: AssemblyWeekdayInfo.toString(),
        asAssemblyLecNo: Number(AssemblyLecNo.toString())
    }
    function dltAddLecture(schoolTimetableId) {
        // alert('Additional Lecture deleted successfully.')
        const DeleteAddLecturesBody: IGetDeleteAdditionalLecturesBody = {
            asSchoolId: Number(localStorage.getItem('SchoolId')),
            asDetailID: Number(schoolTimetableId)
        }
        showAlert({
            title: 'Please Confirm',
            message: 'Are you sure you want to delete this additional lecture ?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onConfirm: () => {
                closeAlert();
                dispatch(CDADeleteAdditionalLectures(DeleteAddLecturesBody))
            },
            onCancel: closeAlert
        });

    }

    // Following Functions are to Check whether the current ` TEACHER ` Time-Table Cell has any External Lec. (i.e, MPT, Assembly, Stayback, Weekly Test)
    function isMPTLecture(weekDay, lectureNo) {
        let isPresent = mptInfo.find(item => item.Text1 === weekDay && item.Text2 === lectureNo);
        isPresent !== undefined ? true : false;
        return isPresent;
    }

    function isAssemblyLecture(weekDay, lectureNo) {
        let isPresent = AssemblyInfo.find(item => item.Text1 === weekDay && item.Text2 === lectureNo);
        isPresent !== undefined ? true : false;
        return isPresent;
    }

    function isStaybackLecture(weekDay, lectureNo) {
        let isPresent = StayBackInfo.find(item => item.Text1 === weekDay && item.Text2 === lectureNo);
        isPresent !== undefined ? true : false;
        return isPresent;
    }

    function isWeeklyTestLecture(weekDay, lectureNo) {
        let isPresent = weeklyTestInfo.find(item => item.Text1 === weekDay && item.Text2 === lectureNo);
        isPresent !== undefined ? true : false;
        return isPresent;
    }

    // Following Functions are to Check whether the current ` CLASS ` Time-Table Cell has any External Lec. (i.e, MPT, Assembly, Stayback, Weekly Test)
    function isMPTLectureClass(weekDay, lectureNo) {
        let isPresent = mptInfoClass.find(item => item.Text1 === weekDay && item.Text4 === lectureNo);
        isPresent !== undefined ? true : false;
        return isPresent;
    }
    function isAssemblyLectureClass(weekDay, lectureNo) {
        let isPresent = AssemblyInfoClass.find(item => item.Text1 === weekDay && item.Text4 === lectureNo);
        isPresent !== undefined ? true : false;
        return isPresent;
    }

    // Following f() is for Checking whether the current ` TEACHER ` Time-Table Cell has any Additional Lec. Already Assigned or not |  If yes i.e `true` then disable the Dropdown Cell
    function hasAddLect(WeekDayName, LecNo) {
        let isAdd = false;
        let isAddLec = TimetableDetails.find(item => item.Text2 === WeekDayName && item.Text1 === LecNo);
        if (isAddLec !== undefined) {
            isAdd = true;
        }
        return isAdd;
    }

    // Following f() is for Filtering array based on LecNo and WeekDayDropdown's max lec. No
    function filterMaxDayLec(ArrayofWeekDayData, lecNo) {
        // Convert lecNo to a number
        const lecNumber = Number(lecNo);
        // Filter the array based on the condition
        let newAr = ArrayofWeekDayData.filter(item => lecNumber <= parseInt(item.MaxDayLec));
        newAr.unshift({ Id: '0', Name: 'Select', Value: '0', StdDivId: '0', SubId: '0', TeacherId: '0', MaxDayLec: '0' });
        return newAr;
    }

    return (
        <>
            <Box sx={{ mb: 5, mx: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        { title: 'Weekly Timetable', path: '/extended-sidebar/Teacher/WeeklyTimetable' },
                    ]}
                    rightActions={
                        <>
                            <Box>
                                <TextField
                                    label={"Select By"}
                                    size={"small"}
                                    select
                                    value={filterBy}
                                    onChange={(e) => {
                                        setFilterBy(e.target.value)
                                        if (filterBy === 'Teacher') {
                                            setTeacher('0')
                                        } else if (filterBy === 'Class') {
                                            setDivision('0')
                                            setStandard('0')
                                        }
                                    }}
                                >
                                    <MenuItem value={"Teacher"}>Teacher</MenuItem>
                                    <MenuItem value={"Class"}>Class</MenuItem>
                                </TextField>
                            </Box>
                            {filterBy === 'Teacher' &&
                                <SearchableDropdown1
                                    onChange={(value) => {
                                        setTeacher(value.Value)
                                        setTeacherName(value.Name)
                                        setIsNewTeacherSelection(true)
                                        dispatch(CDAClearValidateTeacherData())
                                    }}
                                    ItemList={TeachersList}
                                    defaultValue={teacher}
                                    label="Teacher"
                                    sx={{ minWidth: 250 }}
                                    size={"small"}
                                />
                            }
                            {teacher !== '0' && teacher !== undefined &&
                                <Tooltip title={'Teacher Settings'}>
                                    <IconButton
                                        onClick={handleTeacherSettingsClick}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: grey[500],
                                            '&:hover': {
                                                backgroundColor: grey[600]
                                            }
                                        }}
                                    >
                                        <Settings />
                                    </IconButton>
                                </Tooltip>
                            }
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={teacherSettingsAnchorEL}
                                onClose={handleTeacherSettingsClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                            >
                                <Box sx={{ p: 2 }}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={assembly} onChange={handleAssembly} />} label="Is Assembly Applicable?" />
                                        <FormControlLabel control={<Checkbox checked={mpt} onChange={handleMpt} />} label="Is M.P.T. Applicable?" />
                                        <FormControlLabel control={<Checkbox checked={stayback} onChange={handleStayback} />} label="Is StayBack Applicable?" />
                                        <FormControlLabel control={<Checkbox checked={weeklytest} onChange={handleWeeklytest} />} label="Is Weekly Test Applicable?" />
                                    </FormGroup>
                                </Box>
                            </Popover>
                            {filterBy === 'Class' && (
                                <>
                                    <Box>
                                        <SearchableDropdown1
                                            onChange={(value) => {
                                                setStandard(value.Value)
                                                setDivision('0')
                                                setStandardName(value.Name)
                                            }}
                                            ItemList={StandardNameList}
                                            label="Standard"
                                            defaultValue={standard}
                                            sx={{ minWidth: 150 }}
                                            size={"small"}
                                            DisableClearable={true}
                                        />
                                    </Box>
                                    <Box>
                                        <SearchableDropdown1
                                            onChange={(value) => {
                                                setDivision(value.Value)
                                                setDivisionName(value.Name)
                                            }}
                                            ItemList={standard !== '0' ? DivisionNameList : []}
                                            label="Division"
                                            defaultValue={division}
                                            sx={{ minWidth: 150 }}
                                            size={"small"}
                                            DisableClearable={true}
                                        />
                                    </Box>
                                </>
                            )}
                            {filterBy === 'Teacher' && teacher !== '0' && teacher !== undefined && <>
                                <Tooltip title={'Reset'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: blue[500],
                                            '&:hover': {
                                                backgroundColor: blue[600]
                                            }
                                        }}
                                        onClick={resetTimetable}
                                    >
                                        <RestartAltIcon />
                                    </IconButton>
                                </Tooltip>
                                <Box>
                                    <Tooltip title={'Define timetable for the selected teacher / class.'}>
                                        <IconButton
                                            sx={{
                                                color: 'white',
                                                backgroundColor: grey[500],
                                                '&:hover': {
                                                    backgroundColor: grey[600]
                                                }
                                            }}
                                        >
                                            <QuestionMark />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Tooltip title={'Save'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                        onClick={saveTeacherTimetable}
                                    >
                                        <Save />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={'Additional Lectures'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }} onClick={ClickAdditionalLecture}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </>}
                            {filterBy === 'Class' && standard !== '0' && division !== '0' && <>
                                <Tooltip title={'Reset'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: blue[500],
                                            '&:hover': {
                                                backgroundColor: blue[600]
                                            }
                                        }}
                                        onClick={resetTimetable}
                                    >
                                        <RestartAltIcon />
                                    </IconButton>
                                </Tooltip>
                                <Box>
                                    <Tooltip title={'Define timetable for the selected teacher / class.'}>
                                        <IconButton
                                            sx={{
                                                color: 'white',
                                                backgroundColor: grey[500],
                                                '&:hover': {
                                                    backgroundColor: grey[600]
                                                }
                                            }}
                                        >
                                            <QuestionMark />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Tooltip title={'Save'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }} onClick={saveClassTimetable}
                                    >
                                        <Save />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={'Optional Subject Lectures'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                        onClick={ClickAdditionalLecture}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </>}
                            {teacher === '0' || teacher === undefined ?
                                <Box>
                                    <Tooltip title={'Define timetable for the selected teacher / class.'}>
                                        <IconButton
                                            sx={{
                                                color: 'white',
                                                backgroundColor: grey[500],
                                                '&:hover': {
                                                    backgroundColor: grey[600]
                                                }
                                            }}
                                        >
                                            <QuestionMark />
                                        </IconButton>
                                    </Tooltip>
                                </Box> : ''}
                        </>
                    }
                />
                <Box sx={{ background: 'white', p: 1 }}>
                    <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <SquareIcon style={{ color: '#324B8466', fontSize: 25, position: 'relative', top: '-2px' }} />
                                <Typography>Lecture Not Applicable</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <SquareIcon style={{ color: '#c4b5fd', fontSize: 25, position: 'relative', top: '-2px' }} />
                                <Typography>Associated With Additional / Optional Subject Lectures</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {ValidateTeacherDataMsg?.length > 0 && checkErrorMsgLength(ValidateTeacherDataMsg[0]) &&
                    <Stack sx={{ width: '100%' }} spacing={1} mt={1}>
                        {ValidateTeacherDataMsg.map((errorObj, index) => (
                            Object.keys(errorObj).map((key) => {
                                const message = errorObj[key].trim();
                                if (message !== "") {
                                    return <Alert key={`${index}-${key}`} severity="warning"> <span dangerouslySetInnerHTML={{ __html: message }} /> </Alert>;
                                }
                                return null;
                            })
                        ))}
                    </Stack>
                }
                <Box sx={{ p: 2, background: 'white', mt: 1 }}>
                    <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={'space-between'}>
                        {filterBy === 'Teacher' ? <Typography variant={"h4"}>Weekly Timetable for {teacher !== '0' ? teacherName : 'Teacher / Class Name'}</Typography> :
                            <Typography variant={"h4"}>Weekly Timetable for {standard !== '0' && division !== '0' ? `Class ${standardName} - ${divisionName}` : 'Teacher / Class Name'}</Typography>}
                    </Stack>
                    {teacher !== '0' && Object.keys(trackTeacherTimetable).length === 0 && <SuspenseLoader />}
                    {division !== '0' && Object.keys(trackClassTimetable).length === 0 && <SuspenseLoader />}
                    {loading || teacher !== '0' && Object.keys(trackTeacherTimetable).length === 0 ? <SuspenseLoader /> :
                        <>
                            {filterBy === 'Teacher' && teacher !== '0' && teacher !== undefined && TeacherTimetableCellValues.length > 0 && Object.keys(trackTeacherTimetable).length > 0 ?
                                <>
                                    <Box sx={{ mt: 2 }}>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <HeaderStyledCell>{`Weekdays >>`}</HeaderStyledCell>
                                                        <HeaderStyledCell>Monday</HeaderStyledCell>
                                                        <HeaderStyledCell>Tuesday</HeaderStyledCell>
                                                        <HeaderStyledCell>Wednesday</HeaderStyledCell>
                                                        <HeaderStyledCell>Thursday</HeaderStyledCell>
                                                        <HeaderStyledCell>Friday</HeaderStyledCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {TeacherTimetableCellValues.length > 0 && TeacherTimetableCellValues?.map((item, i) => {
                                                        return (
                                                            <>
                                                                {WeekdayIds.length > 0 && item.Text1 !== '99' ?
                                                                    <TableRow>
                                                                        <StyledCell sx={{ textAlign: 'center' }}>{item.Text1}</StyledCell>
                                                                        <Tooltip title={`For - Monday: ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${mpt && isMPTLecture('Monday', item.Text1) ? '#a5b4fc' : assembly && isAssemblyLecture('Monday', item.Text1) ? '#a5b4fc' : stayback && isStaybackLecture('Monday', item.Text1) ? '#a5b4fc' : weeklytest === true && isWeeklyTestLecture('Monday', item.Text1) ? '#a5b4fc' : filterMaxDayLec(MondayColumnList, item.Text1).length === 1 ? '#324B8466' : ''}` }}>
                                                                                {mpt === true && isMPTLecture('Monday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : assembly === true && isAssemblyLecture('Monday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> : stayback === true && isStaybackLecture('Monday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                            <b>Stay Back</b></Typography> : weeklytest === true && isWeeklyTestLecture('Monday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                                <b>Weekly Test</b></Typography> :
                                                                                    filterMaxDayLec(MondayColumnList, item.Text1).length === 1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Lecture Not Applicable</b></Typography> :
                                                                                        <SearchableDropdown1
                                                                                            onChange={(value) => clickTeacherMon(value, `${WeekdayIds[0].WeekdayId}-${item.Text1}`)}
                                                                                            ItemList={filterMaxDayLec(MondayColumnList, item.Text1)}
                                                                                            sx={{
                                                                                                minWidth: 200, backgroundColor: `${item.Text2 !== '0' && hasAddLect('Monday', item.Text1) ? '#c4b5fd' : item.Text2 !== '0' ? '#a5b4fc' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }} size={"small"}
                                                                                            disabled={item.Text2 !== '0' && hasAddLect('Monday', item.Text1)}
                                                                                            defaultValue={trackTeacherTimetable[`${WeekdayIds[0].WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Tuesday: ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${mpt && isMPTLecture('Tuesday', item.Text1) ? '#a5b4fc' : assembly && isAssemblyLecture('Tuesday', item.Text1) ? '#a5b4fc' : stayback && isStaybackLecture('Tuesday', item.Text1) ? '#a5b4fc' : weeklytest === true && isWeeklyTestLecture('Tuesday', item.Text1) ? '#a5b4fc' : filterMaxDayLec(TuesdayColumnList, item.Text1).length === 1 ? '#324B8466' : ''}` }}>
                                                                                {mpt === true && isMPTLecture('Tuesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : assembly === true && isAssemblyLecture('Tuesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> :
                                                                                    filterMaxDayLec(TuesdayColumnList, item.Text1).length === 1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Lecture Not Applicable</b></Typography> : stayback === true && isStaybackLecture('Tuesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                            <b>Stay Back</b></Typography> : weeklytest === true && isWeeklyTestLecture('Tuesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                                <b>Weekly Test</b></Typography> :
                                                                                        <SearchableDropdown1
                                                                                            onChange={(value) => clickTeacherTue(value, `${WeekdayIds[1]?.WeekdayId}-${item.Text1}`)}
                                                                                            ItemList={filterMaxDayLec(TuesdayColumnList, item.Text1)}
                                                                                            sx={{
                                                                                                minWidth: 200, backgroundColor: `${item.Text3 !== '0' && hasAddLect('Tuesday', item.Text1) ? '#c4b5fd' : item.Text3 !== '0' ? '#a5b4fc' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }}
                                                                                            size={"small"}
                                                                                            disabled={item.Text3 !== '0' && hasAddLect('Tuesday', item.Text1)}
                                                                                            defaultValue={trackTeacherTimetable[`${WeekdayIds[1]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Wednesday: ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${mpt && isMPTLecture('Wednesday', item.Text1) ? '#a5b4fc' : assembly && isAssemblyLecture('Wednesday', item.Text1) ? '#a5b4fc' : stayback && isStaybackLecture('Wednesday', item.Text1) ? '#a5b4fc' : weeklytest === true && isWeeklyTestLecture('Wednesday', item.Text1) ? '#a5b4fc' : filterMaxDayLec(WednesdayColumnList, item.Text1).length === 1 ? '#324B8466' : ''}` }}>
                                                                                {mpt === true && isMPTLecture('Wednesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : assembly === true && isAssemblyLecture('Wednesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> : stayback === true && isStaybackLecture('Wednesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                            <b>Stay Back</b></Typography> : weeklytest === true && isWeeklyTestLecture('Wednesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                                <b>Weekly Test</b></Typography> :
                                                                                    filterMaxDayLec(WednesdayColumnList, item.Text1).length === 1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Lecture Not Applicable</b></Typography> :
                                                                                        <SearchableDropdown1
                                                                                            onChange={(value) => clickTeacherWed(value, `${WeekdayIds[2]?.WeekdayId}-${item.Text1}`)}
                                                                                            ItemList={filterMaxDayLec(WednesdayColumnList, item.Text1)}
                                                                                            sx={{
                                                                                                minWidth: 200, backgroundColor: `${item.Text4 !== '0' && hasAddLect('Wednesday', item.Text1) ? '#c4b5fd' : item.Text4 !== '0' ? '#a5b4fc' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }}
                                                                                            disabled={item.Text4 !== '0' && hasAddLect('Wednesday', item.Text1)}
                                                                                            size={"small"}
                                                                                            defaultValue={trackTeacherTimetable[`${WeekdayIds[2]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Thursday: ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${mpt && isMPTLecture('Thursday', item.Text1) ? '#a5b4fc' : assembly && isAssemblyLecture('Thursday', item.Text1) ? '#a5b4fc' : stayback && isStaybackLecture('Thursday', item.Text1) ? '#a5b4fc' : weeklytest === true && isWeeklyTestLecture('Thursday', item.Text1) ? '#a5b4fc' : filterMaxDayLec(ThursdayColumnList, item.Text1).length === 1 ? '#324B8466' : ''}` }}>
                                                                                {mpt === true && isMPTLecture('Thursday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : assembly === true && isAssemblyLecture('Thursday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> : stayback === true && isStaybackLecture('Thursday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                            <b>Stay Back</b></Typography> : weeklytest === true && isWeeklyTestLecture('Thursday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                                <b>Weekly Test</b></Typography> :
                                                                                    filterMaxDayLec(ThursdayColumnList, item.Text1).length === 1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Lecture Not Applicable</b></Typography> :
                                                                                        <SearchableDropdown1
                                                                                            onChange={(value) => clickTeacherThu(value, `${WeekdayIds[3]?.WeekdayId}-${item.Text1}`)}
                                                                                            ItemList={filterMaxDayLec(ThursdayColumnList, item.Text1)}
                                                                                            sx={{
                                                                                                minWidth: 200, backgroundColor: `${item.Text5 !== '0' && hasAddLect('Thursday', item.Text1) ? '#c4b5fd' : item.Text5 !== '0' ? '#a5b4fc' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }} size={"small"}
                                                                                            disabled={item.Text5 !== '0' && hasAddLect('Thursday', item.Text1)}
                                                                                            defaultValue={trackTeacherTimetable[`${WeekdayIds[3]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Friday: ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${mpt && isMPTLecture('Friday', item.Text1) ? '#a5b4fc' : assembly && isAssemblyLecture('Friday', item.Text1) ? '#a5b4fc' : stayback && isStaybackLecture('Friday', item.Text1) ? '#a5b4fc' : weeklytest === true && isWeeklyTestLecture('Friday', item.Text1) ? '#a5b4fc' : filterMaxDayLec(FridayColumnList, item.Text1).length === 1 ? '#324B8466' : ''}` }}>
                                                                                {mpt === true && isMPTLecture('Friday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : assembly === true && isAssemblyLecture('Friday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> : stayback === true && isStaybackLecture('Friday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                            <b>Stay Back</b></Typography> : weeklytest === true && isWeeklyTestLecture('Friday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                                <b>Weekly Test</b></Typography> :
                                                                                    filterMaxDayLec(FridayColumnList, item.Text1).length === 1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Lecture Not Applicable</b></Typography> :
                                                                                        <SearchableDropdown1
                                                                                            onChange={(value) => clickTeacherFri(value, `${WeekdayIds[4]?.WeekdayId}-${item.Text1}`)}
                                                                                            ItemList={filterMaxDayLec(FridayColumnList, item.Text1)}
                                                                                            sx={{
                                                                                                minWidth: 200, backgroundColor: `${item.Text6 !== '0' && hasAddLect('Friday', item.Text1) ? '#c4b5fd' : item.Text6 !== '0' ? '#a5b4fc' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }} size={"small"}
                                                                                            disabled={item.Text6 !== '0' && hasAddLect('Friday', item.Text1)}
                                                                                            defaultValue={trackTeacherTimetable[`${WeekdayIds[4]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                    </TableRow>
                                                                    :
                                                                    <TableRow>
                                                                        <>
                                                                            <FooterStyledCell>{'Total Lectures'}</FooterStyledCell>
                                                                            <FooterStyledCell>{item.Text2}</FooterStyledCell>
                                                                            <FooterStyledCell>{item.Text3}</FooterStyledCell>
                                                                            <FooterStyledCell>{item.Text4}</FooterStyledCell>
                                                                            <FooterStyledCell>{item.Text5}</FooterStyledCell>
                                                                            <FooterStyledCell>{item.Text6}</FooterStyledCell>
                                                                        </>
                                                                    </TableRow>
                                                                }
                                                            </>
                                                        )
                                                    })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                </>
                                : ''}

                            {/* Class Content  */}
                            {filterBy === 'Class' && division !== '0' && division !== undefined && ClassTimetableCellValues?.length > 0 && Object.keys(trackClassTimetable).length > 0 ?
                                <>
                                    <Box sx={{ mt: 2 }}>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <HeaderStyledCell>{`Weekdays >>`}</HeaderStyledCell>
                                                        <HeaderStyledCell>Monday</HeaderStyledCell>
                                                        <HeaderStyledCell>Tuesday</HeaderStyledCell>
                                                        <HeaderStyledCell>Wednesday</HeaderStyledCell>
                                                        <HeaderStyledCell>Thursday</HeaderStyledCell>
                                                        <HeaderStyledCell>Friday</HeaderStyledCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {ClassTimetableCellValues?.length > 0 && ClassTimetableCellValues?.map((item, i) => {
                                                        return (
                                                            <>
                                                                {ClassWeeklyIds?.length > 0 && item.Text1 !== '99' &&
                                                                    <TableRow>
                                                                        <StyledCell sx={{ textAlign: 'center' }}>{item.Text1}</StyledCell>
                                                                        <Tooltip title={`For - Monday: ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${isMPTLectureClass('Monday', item.Text1) ? '#324B8466' : isAssemblyLectureClass('Monday', item.Text1) ? '#324B8466' : ''}` }}>
                                                                                {isMPTLectureClass('Monday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : isAssemblyLectureClass('Monday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> :
                                                                                    <SearchableDropdown1
                                                                                        onChange={(value) => clickClassMon(value, `${WeekdayIds[0]?.WeekdayId}-${item.Text1}`)}
                                                                                        ItemList={MondayColumnList}
                                                                                        sx={{ minWidth: 200, backgroundColor: `${item.Text2 !== '0' ? '#324B8466' : ''}` }}
                                                                                        size={"small"}
                                                                                        defaultValue={trackClassTimetable[`${WeekdayIds[0]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                    />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Tuesday: ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${isMPTLectureClass('Tuesday', item.Text1) ? '#324B8466' : isAssemblyLectureClass('Tuesday', item.Text1) ? '#324B8466' : ''}` }}>
                                                                                {isMPTLectureClass('Tuesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : isAssemblyLectureClass('Tuesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> :
                                                                                    <SearchableDropdown1
                                                                                        onChange={(value) => clickClassTue(value, `${WeekdayIds[1]?.WeekdayId}-${item.Text1}`)}
                                                                                        ItemList={TuesdayColumnList}
                                                                                        sx={{ minWidth: 200, backgroundColor: `${item.Text3 !== '0' ? '#324B8466' : ''}` }}
                                                                                        size={"small"}
                                                                                        defaultValue={trackClassTimetable[`${WeekdayIds[1]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                    />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Wednesday: ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${isMPTLectureClass('Wednesday', item.Text1) ? '#324B8466' : isAssemblyLectureClass('Wednesday', item.Text1) ? '#324B8466' : ''}` }}>
                                                                                {isMPTLectureClass('Wednesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : isAssemblyLectureClass('Wednesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> :
                                                                                    <SearchableDropdown1
                                                                                        onChange={(value) => clickClassWed(value, `${WeekdayIds[2]?.WeekdayId}-${item.Text1}`)}
                                                                                        ItemList={WednesdayColumnList}
                                                                                        sx={{ minWidth: 200, backgroundColor: `${item.Text4 !== '0' ? '#324B8466' : ''}` }}
                                                                                        size={"small"}
                                                                                        defaultValue={trackClassTimetable[`${WeekdayIds[2]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                    />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Thursday: ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${isMPTLectureClass('Thursday', item.Text1) ? '#324B8466' : isAssemblyLectureClass('Thursday', item.Text1) ? '#324B8466' : ''}` }}>
                                                                                {isMPTLectureClass('Thursday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : isAssemblyLectureClass('Thursday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> :
                                                                                    <SearchableDropdown1
                                                                                        onChange={(value) => clickClassThu(value, `${WeekdayIds[3]?.WeekdayId}-${item.Text1}`)}
                                                                                        ItemList={ThursdayColumnList}
                                                                                        sx={{ minWidth: 200, backgroundColor: `${item.Text5 !== '0' ? '#324B8466' : ''}` }}
                                                                                        size={"small"}
                                                                                        defaultValue={trackClassTimetable[`${WeekdayIds[3]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                    />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Friday: ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${isMPTLectureClass('Friday', item.Text1) ? '#324B8466' : isAssemblyLectureClass('Friday', item.Text1) ? '#324B8466' : ''}` }}>
                                                                                {isMPTLectureClass('Friday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : isAssemblyLectureClass('Friday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> :
                                                                                    <SearchableDropdown1
                                                                                        onChange={(value) => clickClassFri(value, `${WeekdayIds[4]?.WeekdayId}-${item.Text1}`)}
                                                                                        ItemList={FridayColumnList}
                                                                                        sx={{ minWidth: 200, backgroundColor: `${item.Text6 !== '0' ? '#324B8466' : ''}` }}
                                                                                        size={"small"}
                                                                                        defaultValue={trackClassTimetable[`${WeekdayIds[4]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                    />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                    </TableRow>
                                                                }
                                                            </>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                </>
                                : ''}

                            {filterBy === 'Teacher' && teacher === '0' &&
                                <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', mt: 2 }}>
                                    <b>No record found.</b>
                                </Typography>
                            }
                            {filterBy === 'Class' && division === '0' &&
                                <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', mt: 2 }}>
                                    <b>No record found.</b>
                                </Typography>
                            }
                        </>}
                    <Stack direction={"row"} gap={2}>
                        {filterBy === 'Class' && division !== '0' && Object.keys(trackClassTimetable).length > 0 &&
                            <>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5, fontWeight: 'bold' }}>
                                        Additional / Optional Subject Lectures
                                    </Typography>
                                    {AdditionalClasses.length === 0 && standard !== '0' && division !== '0' &&

                                        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 5, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                            <b>No additional lectures assigned.</b>
                                        </Typography>
                                    }
                                    {AdditionalClasses.length > 0 &&
                                        <TableContainer sx={{ width: '100%' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <HeaderStyledCell>WeekDay</HeaderStyledCell>
                                                        <HeaderStyledCell>Lecture Number</HeaderStyledCell>
                                                        <HeaderStyledCell>Class</HeaderStyledCell>
                                                        <HeaderStyledCell>Subject </HeaderStyledCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {/* Loopable content */}
                                                    {AdditionalClasses.map((item, i) => (
                                                        <TableRow>
                                                            <StyledCell>{item.Text1}</StyledCell>
                                                            <StyledCell>{item.Text2}</StyledCell>
                                                            <StyledCell>{item.Text3}</StyledCell>
                                                            <StyledCell>{item.Text4}</StyledCell>
                                                        </TableRow>
                                                    ))}

                                                    {/* Fixed Footer */}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    }

                                </Box>
                            </>}
                        {filterBy === 'Teacher' && teacher !== '0' && !loading && teacher !== undefined && TeacherTimetableCellValues.length > 0 && Object.keys(trackTeacherTimetable).length > 0 &&
                            <Box sx={{ flex: 1 }}>
                                {/* <Typography variant={"h4"} mt={1} mb={1.5}>Class-Subject Lecture Count</Typography> */}
                                <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5, fontWeight: 'bold' }}>Class-Subject Lecture Count</Typography>
                                {teacher !== '0' &&
                                    <TableContainer sx={{ width: '100%' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <HeaderStyledCell>Class Subjects</HeaderStyledCell>
                                                    <HeaderStyledCell>Lecture Count</HeaderStyledCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* Loopable content */}
                                                {LectureCountsForTeachers?.map((item, i) => (
                                                    item.Text2 === 'Total Weekly Lectures' ?
                                                        <TableRow>
                                                            <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text2 }} />
                                                            <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text3 }} />
                                                        </TableRow>
                                                        :
                                                        <TableRow>
                                                            <StyledCell1 sx={{ textAlign: 'center' }} >{item.Text2}</StyledCell1>
                                                            <StyledCell1 sx={{ textAlign: 'center' }} >{item.Text3}</StyledCell1>
                                                        </TableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>}
                            </Box>
                        }
                        {filterBy === 'Teacher' && teacher !== '0' && !loading && teacher !== undefined && TeacherTimetableCellValues.length > 0 && Object.keys(trackTeacherTimetable).length > 0 &&
                            <Box sx={{ flex: 1 }}>
                                {/* <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5 }}>Class-Subject Lecture Count</Typography> */}

                                <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5, fontWeight: 'bold' }}>
                                    Additional Lectures

                                </Typography>
                                {TimetableDetails.length === 0 && teacher !== '0' &&

                                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 10, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                        <b>No additional lectures assigned.</b>
                                    </Typography>
                                }
                                {TimetableDetails.length > 0 &&
                                    <TableContainer sx={{ width: '100%' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <HeaderStyledCell sx={{ textAlign: 'left' }} >WeekDay</HeaderStyledCell>
                                                    <HeaderStyledCell sx={{ textAlign: 'center' }} >Lecture #</HeaderStyledCell>
                                                    <HeaderStyledCell>Class</HeaderStyledCell>
                                                    <HeaderStyledCell>Subject </HeaderStyledCell>
                                                    <HeaderStyledCell sx={{ textAlign: 'center' }}>Delete </HeaderStyledCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* Loopable content */}
                                                {TimetableDetails.map((item, i) => (
                                                    <TableRow>
                                                        <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '1px', paddingBottom: '1px' }}>{item.Text2}</TableCell>
                                                        <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '1px', paddingBottom: '1px', textAlign: 'center' }}>{item.Text1}</TableCell>
                                                        <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '1px', paddingBottom: '1px', textAlign: 'center' }}>{item.Text4}</TableCell>
                                                        <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '1px', paddingBottom: '1px', textAlign: 'center' }}>{item.Text3}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center', border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '1px', paddingBottom: '1px' }}>
                                                            <Tooltip title="Delete">
                                                                <IconButton onClick={() => dltAddLecture(item.Text5)}
                                                                    sx={{
                                                                        color: '#223354',
                                                                        '&:hover': {
                                                                            color: 'red',
                                                                            backgroundColor: red[100]
                                                                        }
                                                                    }} >
                                                                    <DeleteForeverIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                            </Box>
                        }
                    </Stack>
                </Box>

            </Box>
            {/* Add additional lectures */}
            <Dialog
                open={showAddAdditionalLectures}
                onClose={() => setShowAddAdditionalLectures(false)}
                maxWidth={'xs'}
                fullWidth
            >
                <DialogTitle
                    sx={{
                        py: 1,
                        backgroundColor: (theme) => theme.colors.primary.main,
                        color: (theme) => theme.palette.common.white
                    }}
                ></DialogTitle>
                <DialogContent dividers>
                    <Box>
                        <Typography variant={"h4"}>{filterBy === 'Teacher' ? `Assign Additional Lectures to Teacher` :
                            `Assign Optional Subject Lectures to Class`}</Typography>
                        <Stack gap={2} mt={2}>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown
                                    onChange={(value) => { }}
                                    ItemList={filterBy === 'Teacher' ? TeachersList : [{ Id: '0', Name: `${standardName} - ${divisionName}`, Value: '0' }]}
                                    defaultValue={filterBy === 'Teacher' ? teacher : "0"}
                                    label={filterBy === 'Teacher' ? 'Teacher' : 'Class'}
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                    disabled={true}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown
                                    onChange={(value) => { setAddLecForWeekDayId(value) }}
                                    ItemList={AddLecWeekDays}
                                    label="Week Day"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                    defaultValue={AddLecForTWeekDayId}
                                    mandatory={true}
                                    DisableClearable={true}
                                />
                                {isSubmitAdLecToTeacher && AddLecForTWeekDayId === '0' && <span style={{ color: 'red' }}>Weekday should not be empty.</span>}
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown1
                                    onChange={(value) => { setAddLecForTLecNo(value.Value) }}
                                    ItemList={AddLecForTWeekDayId !== '0' ? filteredAddLecLectureNumber : []}
                                    label="Lecture Number"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                    defaultValue={AddLecForTLecNo}
                                    mandatory={true}
                                    DisableClearable={true}
                                />
                                {isSubmitAdLecToTeacher && AddLecForTLecNo === '0' && AddLecForTWeekDayId !== '0' && <span style={{ color: 'red' }}>Lecture number should not be empty.</span>}
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown1
                                    onChange={(value) => {
                                        setAddLecForTSubjectNameId(value.Value);
                                        setAddLecForTStdDivId(value.StdDivId);
                                    }}
                                    ItemList={AddLecForTLecNo !== '0' ? AddLecSubjectName : []}
                                    label="Class Subjects"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                    defaultValue={AddLecForTSubjectNameId}
                                    mandatory={true}
                                    DisableClearable={true}
                                />
                                {isSubmitAdLecToTeacher && AddLecForTSubjectNameId === '0' && AddLecForTLecNo !== '0' && AddLecForTWeekDayId !== '0' && <span style={{ color: 'red' }}>Class-Subject name should not be empty.</span>}
                            </Box>
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ py: 2, px: 3 }}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            setShowAddAdditionalLectures(false);
                        }}
                        color={'error'}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={SubmitAddLecForTeacher}
                        color={'primary'}
                        variant={'contained'}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default WeeklyTimetable
