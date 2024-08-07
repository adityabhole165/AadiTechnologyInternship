import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import QuestionMark from "@mui/icons-material/QuestionMark"
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Save from "@mui/icons-material/Save"
import Settings from "@mui/icons-material/Settings"
import SquareIcon from '@mui/icons-material/Square'
import { alpha, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, FormGroup, IconButton, MenuItem, Popover, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import { green, grey, red } from "@mui/material/colors"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify'
import { AlertContext } from 'src/contexts/AlertContext'
import { IGetDataForAdditionalClassesBody, IGetLectureCountsForTeachersBody } from "src/interfaces/Teacher/ITeacherTimeTable"
import { IGetClassTimeTableBody, IGetDeleteAdditionalLectureBody, IGetDeleteAdditionalLecturesBody, IGetDivisionForStdDropdownBody, IGetManageClassTimeTableBody, IGetResetTimetableBody, IGetSaveTeacherTimeTableBody, IGetTeacherAndStandardForTimeTableBody, IGetTeacherSubjectMaxLecDetailsBody, IGetTimeTableForTeacherBody } from "src/interfaces/WeeklyTimeTable/IWeeklyTimetable"
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown"
import SearchableDropdown1 from "src/libraries/ResuableComponents/SearchableDropdown1"
import { GetDataForAdditionalClasses, GetLectureCountsForTeachers } from "src/requests/Teacher/TMtimetable"
import { CDAClassLecNoWeekday, CDAClearManageClassTimeTable, CDADeleteAdditionalLectures, CDAGetDataForAdditionalClasses, CDAGetDivisionName, CDAGetLectureNoWeekday, CDAGetResetTimetableMsgClear, CDAGetStandardNameList, CDAGetTeachersList, CDAGetTeacherSubjectMaxLecDetailsForFri, CDAGetTeacherSubjectMaxLecDetailsForMon, CDAGetTeacherSubjectMaxLecDetailsForThu, CDAGetTeacherSubjectMaxLecDetailsForTue, CDAGetTeacherSubjectMaxLecDetailsForWed, CDAManageClassTimeTable, CDAResetDeleteAdditionalLecture, CDAResetDeleteAdditionalLectures, CDAResetTimetable, CDASaveTeacherTimetable, ResetSaveTeacherTimetableMsg } from "src/requests/WeeklyTimeTable/RequestWeeklyTimeTable"
import { RootState } from "src/store"
import { GetScreenPermission } from '../Common/Util'
import CommonPageHeader from "../CommonPageHeader"

type Props = {}

const HeaderStyledCell = styled(TableCell)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    border: '1px solid rgba(224, 224, 224, 1)',
}))
const FooterStyledCell = styled(TableCell)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: alpha(theme.palette.primary.main, 0.4),
    fontWeight: 'bold',
    border: '1px solid rgba(224, 224, 224, 1)',
    textAlign: 'center'
}))

const StyledCell = styled(TableCell)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    border: '1px solid rgba(224, 224, 224, 1)'
}))

const WeeklyTimetable = (props: Props) => {
    const dispatch = useDispatch();
    const TeachersList = useSelector((state: RootState) => state.WeeklyTimetable.ISTeachersList);
    const { showAlert, closeAlert } = useContext(AlertContext);
    // Full Access / Own access Permission Stuff
    const IsWeeklyTimetableFullAccess = GetScreenPermission('Weekly Timetable');
    const LoginTeacherId = sessionStorage.getItem('TeacherId');
    const permissionwiseTeachersList = IsWeeklyTimetableFullAccess === 'N' ? TeachersList : TeachersList.filter((item) => item.Id === LoginTeacherId);
    // permissionwiseTeachersList.unshift({ Id: '0', Name: 'Select', Value: '0' })

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
    const [isNewTeacherSelection, setIsNewTeacherSelection] = useState<Boolean>(false);
    const [AddLecForTWeekDayId, setAddLecForWeekDayId] = useState('0');
    const [AddLecForTLecNo, setAddLecForTLecNo] = useState('0');
    const [AddLecForTSubjectNameId, setAddLecForTSubjectNameId] = useState('0');
    const [AddLecForTStdDivId, setAddLecForTStdDivId] = useState('0');

    const LectureCountsForTeachers = useSelector((state: RootState) => state.TMTimetable.ISGetLectureCountsForTeachers);
    const AdditionalClasses = useSelector((state: RootState) => state.TMTimetable.ISGetDataForAdditionalClasses);
    const AddLecWeekDays = useSelector((state: RootState) => state.WeeklyTimetable.ISAddClassesWeekDay);
    const AddLecLectureNumber = useSelector((state: RootState) => state.WeeklyTimetable.ISAddClassesLectureNumber);
    const AddLecSubjectName = useSelector((state: RootState) => state.WeeklyTimetable.ISAddClassesSubjectName);
    const ResetTimetableMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISResetTimetableMsg);
    const StandardNameList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetStandardName);
    const SaveTeacherTimetableMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetSaveTeacherTimetableMsg);
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
    const mptInfo = useSelector((state: RootState) => state.WeeklyTimetable.ISMPTinfo);
    const AssemblyInfo = useSelector((state: RootState) => state.WeeklyTimetable.ISAssemblyInfo);
    const loading = useSelector((state: RootState) => state.WeeklyTimetable.Loading);
    const DeleteAddLecMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetDeleteAdditionalLectureMsg);
    const ManageTimeTableMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetManageClassTimeTableMsg);
    const TimetableDetails = useSelector((state: RootState) => state.WeeklyTimetable.ISTimetableDetails);
    const DeleteAddLecturesMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetDeleteAdditionalLecturesMsg);
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
            dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
            dispatch(GetLectureCountsForTeachers(GetLectureCountsForTeachersBody))
        }
    }, [SaveTeacherTimetableMsg])
    useEffect(() => {
        if (DeleteAddLecturesMsg !== '') {
            toast.success(DeleteAddLecturesMsg)
            dispatch(CDAResetDeleteAdditionalLectures())
            dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
        }
    }, [DeleteAddLecturesMsg])
    useEffect(() => {
        const CDAGetTeachersListBody: IGetTeacherAndStandardForTimeTableBody = {
            asSchoolId: Number(localStorage.getItem('SchoolId')),
            asAcadmicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asTeacher_id: 0
        }

        dispatch(CDAGetTeachersList(CDAGetTeachersListBody))
        dispatch(CDAGetStandardNameList(CDAGetTeachersListBody))
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
            dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
        }
    }, [teacher, filterBy])
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
        if (teacher !== '0') {
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForMon(IGetTeacherSubjectMaxLecForMon));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForTue(IGetTeacherSubjectMaxLecForTue));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForWed(IGetTeacherSubjectMaxLecForWed));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForThu(IGetTeacherSubjectMaxLecForThu));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForFri(IGetTeacherSubjectMaxLecForFri));
        }
    }, [teacher]);

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

    useEffect(() => {
        if (isNewTeacherSelection && TeacherTimetableCellValues.length > 0 && WeekdayIds.length > 0) {
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
            console.log('abc', abc)
        }
    }, [TeacherTimetableCellValues, WeekdayIds, isNewTeacherSelection])

    useEffect(() => {
        if (ApplicablesToggleData.length > 0) {
            ApplicablesToggleData.map((item, i) => {
                setAssembly(item.Assembly === 'Y' ? true : false);
                setMPT(item.MPT === 'Y' ? true : false);
                setWeekly(item.Weekly === 'Y' ? true : false);
                setStayback(item.Stayback === 'True' ? true : false);
            })
        }
    }, [ApplicablesToggleData])


    useEffect(() => {
        if (division !== '0' && filterBy === 'Class') {
            const WeekDayClassBody: IGetClassTimeTableBody = {
                asSchool_Id: Number(localStorage.getItem('SchoolId')),
                asAcademicYear_ID: Number(sessionStorage.getItem('AcademicYearId')),
                asStandardDivisionId: filterBy === 'Class' && division !== '0' ? Number(division) : 0
            }
            dispatch(CDAClassLecNoWeekday(WeekDayClassBody));
        }
    }, [division, filterBy])

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
            toast.success(ResetTimetableMsg)
            dispatch(CDAGetResetTimetableMsgClear());
            dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
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
        dispatch(CDAResetTimetable(ResetWeeklyTimetableBody));
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

    const clickTeacherMon = (value, data) => {
        setTrackTeacherTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data.split('-')[0]}-${value.StdDivId}-${value.SubId}-${data.split('-')[1]}`,
        }))
    }

    const clickTeacherTue = (value, data) => {
        setTrackTeacherTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data.split('-')[0]}-${value.StdDivId}-${value.SubId}-${data.split('-')[1]}`,
        }))
    }
    const clickTeacherWed = (value, data) => {
        setTrackTeacherTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data.split('-')[0]}-${value.StdDivId}-${value.SubId}-${data.split('-')[1]}`,
        }))
    }
    const clickTeacherThu = (value, data) => {
        setTrackTeacherTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data.split('-')[0]}-${value.StdDivId}-${value.SubId}-${data.split('-')[1]}`,
        }))
    }
    const clickTeacherFri = (value, data) => {
        setTrackTeacherTimetable((prevCells) => ({
            ...prevCells,
            [data]: `${value.Value}-${data.split('-')[0]}-${value.StdDivId}-${value.SubId}-${data.split('-')[1]}`,
        }))
        console.log('friday data >>>>>>>>>>> ', data, 'and', trackTeacherTimetable)
    }
    // f() to save Teacher Timetable 
    function saveTeacherTimetable() {
        console.log(GetMasterXML(), GetDetailXML(), GetTeacherXML())
        console.log('following is the formatted array of string with - level splitting', trackTeacherTimetable)
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
        dispatch(CDASaveTeacherTimetable(SaveTeacherTimetableBody))
        console.log('body for save teacher tiemtable', SaveTeacherTimetableBody)
    }

    function GetMasterXML() {
        let sXML = "";
        const weekdayIds = WeekdayIds.map(item => item.WeekdayId);
        TeacherTimetableCellValues.forEach(lecture => {
            const lectureNo = lecture.Text1;
            ['Text2', 'Text3', 'Text4', 'Text5', 'Text6'].forEach((day, index) => {
                const key = `${weekdayIds[index]}-${lectureNo}`;
                // abc[key] = `${lecture[day]}-${weekdayIds[index]}`;
                if (trackTeacherTimetable[key].split('-')[0] !== "0" && lectureNo !== '99') {
                    sXML += `<DaywiseTimeTable Standard_Division_Id="${trackTeacherTimetable[key].split('-')[2]}" Weekday_Id="${trackTeacherTimetable[key].split('-')[1]}" />`
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
                if (trackTeacherTimetable[key].split('-')[0] !== "0" && lectureNo !== '99') {
                    sXML += `<DaywiseTimeTableDetail WeekDay_Id="${trackTeacherTimetable[key].split('-')[1]}" Teacher_ID="${teacher}" Standard_Division_Id="${trackTeacherTimetable[key].split('-')[2]}" Lecture_Number="${trackTeacherTimetable[key].split('-')[4]}" Subject_Id="${trackTeacherTimetable[key].split('-')[3]}"/>`
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
        // alert('Additional Lecture for Teacher added Successfully..!!');
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
            setIsSubmitAdLecToTeacher(false);
        } else {
            setIsSubmitAdLecToTeacher(true);
        }
        console.log(AddLecForTeacherApiBody)
    }

    function ClearAddLecForTeacherFields() {
        setAddLecForWeekDayId('0')
        setAddLecForTLecNo('0')
        setAddLecForTSubjectNameId('0');
    }

    const MptWeekdayInfo = mptInfo.map((item, i) => item.Text1)
    const MptLecNo = mptInfo.map((item, i) => item.Text2)
    const AssemblyWeekdayInfo = AssemblyInfo.map((item, i) => item.Text1)
    const AssemblyLecNo = AssemblyInfo.map((item, i) => item.Text2)

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
        console.log('Additional lecture body for delete functionality ', DeleteAddLecForTeacherBody)
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



    return (
        <>
            <Box sx={{ mb: 5, mx: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        { title: 'Weekly Timetable', path: '/extended-sidebar/Teacher/WeeklyTimetable' },
                    ]}
                    rightActions={
                        <>
                            <Tooltip title={'Define timetable for the selected teacher/class.'}>
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
                            {filterBy === 'Teacher' && teacher !== '0' && <>
                                <Tooltip title={'Reset'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: grey[500],
                                            '&:hover': {
                                                backgroundColor: red[600]
                                            }
                                        }}
                                        onClick={resetTimetable}
                                    >
                                        <RestartAltIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={'Save'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }} onClick={saveTeacherTimetable}
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
                                        }}
                                        onClick={ClickAdditionalLecture}
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
                                            backgroundColor: grey[500],
                                            '&:hover': {
                                                backgroundColor: red[600]
                                            }
                                        }}
                                        onClick={resetTimetable}
                                    >
                                        <RestartAltIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={'Save'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
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
                        </>
                    }
                />

                <Box sx={{ background: 'white', p: 1 }}>
                    <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <SquareIcon style={{ color: '#a5b4fc', fontSize: 25, position: 'relative', top: '-2px' }} />
                                <Typography>Lecture Not Applicable</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <SquareIcon style={{ color: '#ddd6fe', fontSize: 25, position: 'relative', top: '-2px' }} />
                                <Typography>Associated With Additional / Optional Subject Lectures</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ p: 2, background: 'white', mt: 2 }}>
                    <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={'space-between'}>
                        {filterBy === 'Teacher' ? <Typography variant={"h4"}>Weekly Timetable for {teacher !== '0' ? teacherName : 'Teacher/Class Name'}</Typography> :
                            <Typography variant={"h4"}>Weekly Timetable for {standard !== '0' && division !== '0' ? `Class ${standardName} - ${divisionName}` : 'Teacher/Class Name'}</Typography>}
                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                            <Box>
                                <TextField
                                    label={"Filter By"}
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
                                    <MenuItem value={"Class"}>Class Info</MenuItem>
                                </TextField>
                            </Box>
                            {filterBy === 'Teacher' && (
                                <>
                                    <Box>
                                        <SearchableDropdown1
                                            onChange={(value) => {
                                                setTeacher(value.Value)
                                                setTeacherName(value.Name)
                                                setIsNewTeacherSelection(true)
                                            }}
                                            ItemList={permissionwiseTeachersList}
                                            defaultValue={teacher}
                                            label="Teacher"
                                            sx={{ minWidth: 250 }}
                                            size={"small"}
                                        />
                                    </Box>
                                    <Box>
                                        {teacher !== '0' &&
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
                                    </Box>
                                </>
                            )}
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
                                        />
                                    </Box>
                                </>
                            )}
                        </Stack>
                    </Stack>
                    <>
                        {teacher !== '0' || division !== '0' ?
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
                                            {/* Loopable content */}
                                            {filterBy === 'Teacher' && teacher !== '0' &&
                                                TeacherTimetableCellValues.map((item, i) => {
                                                    return (
                                                        <>
                                                            {WeekdayIds.length > 0 && Object.keys(trackTeacherTimetable).length > 0 && item.Text1 !== '99' ?
                                                                <TableRow>
                                                                    <StyledCell sx={{ textAlign: 'center' }}>{item.Text1}</StyledCell>
                                                                    <Tooltip title={`For - Monday: ${item.Text1}`} arrow placement="top">
                                                                        <StyledCell sx={{ backgroundColor: `${mpt && MptWeekdayInfo.toString() === 'Monday' && MptLecNo.toString() === item.Text1 ? '#324B8466' : assembly && AssemblyWeekdayInfo.toString() === 'Monday' && AssemblyLecNo.toString() === item.Text1 ? '#324B8466' : ''}` }}>
                                                                            {mpt === true && MptWeekdayInfo.toString() === 'Monday' && MptLecNo.toString() === item.Text1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                <b>M.P.T</b></Typography> : assembly === true && AssemblyWeekdayInfo.toString() === 'Monday' && AssemblyLecNo.toString() === item.Text1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>Assembly</b></Typography> :
                                                                                <SearchableDropdown1
                                                                                    onChange={(value) => clickTeacherMon(value, `${WeekdayIds[0].WeekdayId}-${item.Text1}`)}
                                                                                    ItemList={MondayColumnList}
                                                                                    sx={{ minWidth: 200, backgroundColor: `${item.Text2 !== '0' ? '#324B8466' : ''}` }}
                                                                                    size={"small"}
                                                                                    defaultValue={trackTeacherTimetable[`${WeekdayIds[0].WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                />}
                                                                        </StyledCell>
                                                                    </Tooltip>
                                                                    <Tooltip title={`For - Tuesday: ${item.Text1}`} arrow placement="top">
                                                                        <StyledCell sx={{ backgroundColor: `${mpt && MptWeekdayInfo.toString() === 'Tuesday' && MptLecNo.toString() === item.Text1 ? '#324B8466' : assembly && AssemblyWeekdayInfo.toString() === 'Tuesday' && AssemblyLecNo.toString() === item.Text1 ? '#324B8466' : ''}` }}>
                                                                            {mpt === true && MptWeekdayInfo.toString() === 'Tuesday' && MptLecNo.toString() === item.Text1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                <b>M.P.T</b></Typography> : assembly === true && AssemblyWeekdayInfo.toString() === 'Tuesday' && AssemblyLecNo.toString() === item.Text1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>Assembly</b></Typography> :
                                                                                <SearchableDropdown1
                                                                                    onChange={(value) => clickTeacherTue(value, `${WeekdayIds[1].WeekdayId}-${item.Text1}`)}
                                                                                    ItemList={TuesdayColumnList}
                                                                                    sx={{ minWidth: 200, backgroundColor: `${item.Text3 !== '0' ? '#324B8466' : ''}` }}
                                                                                    size={"small"}
                                                                                    defaultValue={trackTeacherTimetable[`${WeekdayIds[1].WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                />}
                                                                        </StyledCell>
                                                                    </Tooltip>
                                                                    <Tooltip title={`For - Wednesday: ${item.Text1}`} arrow placement="top">
                                                                        <StyledCell sx={{ backgroundColor: `${mpt && MptWeekdayInfo.toString() === 'Wednesday' && MptLecNo.toString() === item.Text1 ? '#324B8466' : assembly && AssemblyWeekdayInfo.toString() === 'Wednesday' && AssemblyLecNo.toString() === item.Text1 ? '#324B8466' : ''}` }}>
                                                                            {mpt === true && MptWeekdayInfo.toString() === 'Wednesday' && MptLecNo.toString() === item.Text1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                <b>M.P.T</b></Typography> : assembly === true && AssemblyWeekdayInfo.toString() === 'Wednesday' && AssemblyLecNo.toString() === item.Text1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>Assembly</b></Typography> :
                                                                                <SearchableDropdown1
                                                                                    onChange={(value) => clickTeacherWed(value, `${WeekdayIds[2].WeekdayId}-${item.Text1}`)}
                                                                                    ItemList={WednesdayColumnList}
                                                                                    sx={{ minWidth: 200, backgroundColor: `${item.Text4 !== '0' ? '#324B8466' : ''}` }}
                                                                                    size={"small"}
                                                                                    defaultValue={trackTeacherTimetable[`${WeekdayIds[2].WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                />}
                                                                        </StyledCell>
                                                                    </Tooltip>
                                                                    <Tooltip title={`For - Thursday: ${item.Text1}`} arrow placement="top">
                                                                        <StyledCell sx={{ backgroundColor: `${mpt && MptWeekdayInfo.toString() === 'Thursday' && MptLecNo.toString() === item.Text1 ? '#324B8466' : assembly && AssemblyWeekdayInfo.toString() === 'Thursday' && AssemblyLecNo.toString() === item.Text1 ? '#324B8466' : ''}` }}>
                                                                            {mpt === true && MptWeekdayInfo.toString() === 'Thursday' && MptLecNo.toString() === item.Text1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                <b>M.P.T</b></Typography> : assembly === true && AssemblyWeekdayInfo.toString() === 'Thursday' && AssemblyLecNo.toString() === item.Text1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>Assembly</b></Typography> :
                                                                                <SearchableDropdown1
                                                                                    onChange={(value) => clickTeacherThu(value, `${WeekdayIds[3].WeekdayId}-${item.Text1}`)}
                                                                                    ItemList={ThursdayColumnList}
                                                                                    sx={{ minWidth: 200, backgroundColor: `${item.Text5 !== '0' ? '#324B8466' : ''}` }}
                                                                                    size={"small"}
                                                                                    defaultValue={trackTeacherTimetable[`${WeekdayIds[3].WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                />}
                                                                        </StyledCell>
                                                                    </Tooltip>
                                                                    <Tooltip title={`For - Friday: ${item.Text1}`} arrow placement="top">
                                                                        <StyledCell sx={{ backgroundColor: `${mpt && MptWeekdayInfo.toString() === 'Friday' && MptLecNo.toString() === item.Text1 ? '#324B8466' : assembly && AssemblyWeekdayInfo.toString() === 'Friday' && AssemblyLecNo.toString() === item.Text1 ? '#324B8466' : ''}` }}>
                                                                            {mpt === true && MptWeekdayInfo.toString() === 'Friday' && MptLecNo.toString() === item.Text1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                <b>M.P.T</b></Typography> : assembly === true && AssemblyWeekdayInfo.toString() === 'Friday' && AssemblyLecNo.toString() === item.Text1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>Assembly</b></Typography> :
                                                                                <SearchableDropdown1
                                                                                    onChange={(value) => clickTeacherFri(value, `${WeekdayIds[4].WeekdayId}-${item.Text1}`)}
                                                                                    ItemList={FridayColumnList}
                                                                                    sx={{ minWidth: 200, backgroundColor: `${item.Text6 !== '0' ? '#324B8466' : ''}` }}
                                                                                    size={"small"}
                                                                                    defaultValue={trackTeacherTimetable[`${WeekdayIds[4].WeekdayId}-${item.Text1}`]?.split('-')[0]}
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

                                            {filterBy === 'Class' && division !== '0' &&
                                                ClassTimetableCellValues.map((item, i) => {
                                                    return (
                                                        <>
                                                            <TableRow>
                                                                <StyledCell sx={{ textAlign: 'center' }}>{item.Text1}</StyledCell>
                                                                <Tooltip title={`For - Monday: ${item.Text1}`} arrow>
                                                                    <StyledCell>
                                                                        <SearchableDropdown
                                                                            onChange={(value) => { }}
                                                                            ItemList={MondayColumnList}
                                                                            sx={{ minWidth: 200, backgroundColor: `${item.Text2 !== '0' ? '#324B8466' : ''}` }}
                                                                            size={"small"}
                                                                            defaultValue={item.Text2}
                                                                        />
                                                                    </StyledCell>
                                                                </Tooltip>
                                                                <Tooltip title={`For - Tuesday: ${item.Text1}`} arrow>
                                                                    <StyledCell>
                                                                        <SearchableDropdown
                                                                            onChange={(value) => { }}
                                                                            ItemList={TuesdayColumnList}
                                                                            sx={{ minWidth: 200, backgroundColor: `${item.Text3 !== '0' ? '#324B8466' : ''}` }}
                                                                            size={"small"}
                                                                            defaultValue={item.Text3}
                                                                        />
                                                                    </StyledCell>
                                                                </Tooltip>
                                                                <Tooltip title={`For - Wednesday: ${item.Text1}`} arrow>
                                                                    <StyledCell>
                                                                        <SearchableDropdown
                                                                            onChange={(value) => { }}
                                                                            ItemList={WednesdayColumnList}
                                                                            sx={{ minWidth: 200, backgroundColor: `${item.Text4 !== '0' ? '#324B8466' : ''}` }}
                                                                            size={"small"}
                                                                            defaultValue={item.Text4}
                                                                        />
                                                                    </StyledCell>
                                                                </Tooltip>
                                                                <Tooltip title={`For - Thursday: ${item.Text1}`} arrow>
                                                                    <StyledCell>
                                                                        <SearchableDropdown
                                                                            onChange={(value) => { }}
                                                                            ItemList={ThursdayColumnList}
                                                                            sx={{ minWidth: 200, backgroundColor: `${item.Text5 !== '0' ? '#324B8466' : ''}` }}
                                                                            size={"small"}
                                                                            defaultValue={item.Text5}
                                                                        />
                                                                    </StyledCell>
                                                                </Tooltip>
                                                                <Tooltip title={`For - Friday: ${item.Text1}`} arrow>
                                                                    <StyledCell>
                                                                        <SearchableDropdown
                                                                            onChange={(value) => { }}
                                                                            ItemList={FridayColumnList}
                                                                            sx={{ minWidth: 200, backgroundColor: `${item.Text6 !== '0' ? '#324B8466' : ''}` }}
                                                                            size={"small"}
                                                                            defaultValue={item.Text6}
                                                                        />
                                                                    </StyledCell>
                                                                </Tooltip>
                                                            </TableRow>
                                                        </>
                                                    )
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>

                            : ''}
                    </>
                    <Divider sx={{ my: 2 }} />
                    {filterBy === 'Teacher' && teacher === '0' &&
                        <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                            <b>No record found.</b>
                        </Typography>
                    }
                    {filterBy === 'Class' && division === '0' &&
                        <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                            <b>No record found.</b>
                        </Typography>
                    }
                    <Stack direction={"row"} gap={2}>
                        {filterBy === 'Class' && division !== '0' &&
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
                        {filterBy === 'Teacher' && teacher !== '0' && !loading &&
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
                                                            <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text3 }} sx={{ textAlign: 'left' }} />
                                                        </TableRow>
                                                        :
                                                        <TableRow>
                                                            <StyledCell>{item.Text2}</StyledCell>
                                                            <StyledCell>{item.Text3}</StyledCell>
                                                        </TableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>}
                            </Box>
                        }
                        {filterBy === 'Teacher' && teacher !== '0' && !loading &&
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
                                                    <HeaderStyledCell>WeekDay</HeaderStyledCell>
                                                    <HeaderStyledCell>Lecture Number</HeaderStyledCell>
                                                    <HeaderStyledCell>Class</HeaderStyledCell>
                                                    <HeaderStyledCell>Subject </HeaderStyledCell>
                                                    <HeaderStyledCell sx={{ textAlign: 'center' }}>Delete </HeaderStyledCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* Loopable content */}
                                                {TimetableDetails.map((item, i) => (
                                                    <TableRow>
                                                        <StyledCell>{item.Text2}</StyledCell>
                                                        <StyledCell>{item.Text1}</StyledCell>
                                                        <StyledCell>{item.Text4}</StyledCell>
                                                        <StyledCell>{item.Text3}</StyledCell>
                                                        <StyledCell sx={{ textAlign: 'center' }}><Tooltip title="Delete">
                                                            <IconButton onClick={() => dltAddLecture(item.Text5)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip></StyledCell>
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
