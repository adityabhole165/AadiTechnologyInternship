import AddIcon from '@mui/icons-material/Add'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import QuestionMark from "@mui/icons-material/QuestionMark"
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Save from "@mui/icons-material/Save"
import Settings from "@mui/icons-material/Settings"
import SquareIcon from '@mui/icons-material/Square'
import { Box, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, MenuItem, Popover, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import { blue, green, grey, red } from "@mui/material/colors"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify'
import { AlertContext } from 'src/contexts/AlertContext'
import { IGetDataForAdditionalClassesBody, IGetLectureCountsForTeachersBody } from "src/interfaces/Teacher/ITeacherTimeTable"
import { IGetCheckDuplicateLecturesMsgBody, IGetClassTimeTableBody, IGetDeleteAdditionalLectureBody, IGetDeleteAdditionalLecturesBody, IGetDivisionForStdDropdownBody, IGetManageClassTimeTableBody, IGetResetTimetableBody, IGetSaveClassTimeTableBody, IGetSaveTeacherTimeTableBody, IGetTeacherAndStandardForTimeTableBody, IGetTeacherSubjectMaxLecDetailsBody, IGetTimeTableForTeacherBody, IGetValidateAddDataForTeacherBody } from "src/interfaces/WeeklyTimeTable/IWeeklyTimetable"
import SuspenseLoader from 'src/layouts/components/SuspenseLoader'
import SearchableDropdown1 from "src/libraries/ResuableComponents/SearchableDropdown1"
import { GetDataForAdditionalClasses, GetLectureCountsForTeachers } from "src/requests/Teacher/TMtimetable"
import { CDAClassLecNoWeekday, CDAClearDuplicateLecturesMsg, CDAClearManageClassTimeTable, CDAClearValidateAdditionalDataForTeacher, CDAClearValidateAddLecTeacherData, CDAClearValidateClassData, CDAClearValidateTeacherData, CDAClearWeeklyClassTimetableValues, CDAClearWeeklyTeacherTimetableValues, CDADeleteAdditionalLectures, CDAGetDataForAddClassPopUp, CDAGetDataForAdditionalClasses, CDAGetDivisionName, CDAGetLectureNoWeekday, CDAGetResetTimetableMsgClear, CDAGetStandardNameList, CDAGetTeachersList, CDAGetTeacherSubjectMaxLecDetailsForFri, CDAGetTeacherSubjectMaxLecDetailsForMon, CDAGetTeacherSubjectMaxLecDetailsForThu, CDAGetTeacherSubjectMaxLecDetailsForTue, CDAGetTeacherSubjectMaxLecDetailsForWed, CDAMutedDeleteAdditionalLectures, CDAResetDeleteAdditionalLecture, CDAResetDeleteAdditionalLectures, CDAResetTimetable, CDASaveAddTeacherTimetable, CDASaveClassTimetable, CDASaveClassTimetableWithIncr, CDASaveTeacherTimetable, CDASaveTeacherTimetableWithIncr, CDAValidateAdditionalDataForTeacher, ResetSaveClassTimetableMsg, ResetSaveTeacherTimetableMsg } from "src/requests/WeeklyTimeTable/RequestWeeklyTimeTable"
import { RootState } from "src/store"
import { GetScreenPermission } from '../Common/Util'
import CommonPageHeader from "../CommonPageHeader"
import AddLecture from './AddLecture'

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
    const ConfigIdForPagePermissionListString: any = sessionStorage.getItem('SchoolConfiguration');
    const GetValidateAddDataForTeacherMsgList: any = useSelector((state: RootState) => state.WeeklyTimetable.ISGetValidateAdditionalDataForTeacher);
    const ConfigIdForPagePermissionList = ConfigIdForPagePermissionListString ? JSON.parse(ConfigIdForPagePermissionListString) : [];
    const ConfigIdPagePersmission: any = ConfigIdForPagePermissionList?.filter((item: any) => item.Configure_Id === 59);
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
    const weeklytestInfoClass = useSelector((state: RootState) => state.WeeklyTimetable.ISWeeklytestClass);
    const weeklyTestInfo = useSelector((state: RootState) => state.WeeklyTimetable.ISWeeklytestInfo);
    const AssemblyInfoClass = useSelector((state: RootState) => state.WeeklyTimetable.ISAssemblyInfoClass);
    const StaybackInfoClass = useSelector((state: RootState) => state.WeeklyTimetable.ISStaybackClass);
    const loading = useSelector((state: RootState) => state.WeeklyTimetable.Loading);
    const DeleteAddLecMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetDeleteAdditionalLectureMsg);
    const ManageTimeTableMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetManageClassTimeTableMsg);
    const TimetableDetails = useSelector((state: RootState) => state.WeeklyTimetable.ISTimetableDetails);
    const DeleteAddLecturesMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetDeleteAdditionalLecturesMsg);
    const ValidateTeacherDataMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISValidateTeacherData);
    const ValidateAddLecTeacherDataMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISValidateAddLecTeacherData);
    const ValidateClassDataMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISValidateClassData);
    const ExtLectCount = useSelector((state: RootState) => state.WeeklyTimetable.ISExtLectCount);
    const OptionalLecForClass = useSelector((state: RootState) => state.WeeklyTimetable.ISAddLecForClass);
    const AddLecWeekDayList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetAddLecPopUpWeekDayList);
    const DuplicateLecturesMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetCheckDuplicateLecturesMsg);
    const AddLecNoList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetAddLecPopUpLecNoList);
    const AddClassSubList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetAddLecPopUpClassSubList);
    const AddLecPopupCompClassNameDetailsList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetAddLecPopUpCompClassNameDetailsList);
    const AddLecPopUpCompSubjectNameDetailsList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetAddLecPopUpCompSubjectNameDetailsList);
    const AddLecForTeacherSuccessMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISGetValidateAdditionalDataForTeacher);

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
        const isText1Empty = obj.Text1?.trim() === "";
        const isText2Empty = obj.Text2?.trim() === "";
        const isText3Empty = obj.Text3?.trim() === "";
        const isText5Empty = obj.Text5?.trim() === "";
        const isText6Empty = obj.Text6?.trim() === "";
        // Check if Text4 is non-empty
        const isText4NonEmpty = obj.Text4?.trim() !== "";
        // Condition: if Text4 is non-empty and all other texts are empty
        if (isText4NonEmpty && isText1Empty && isText2Empty && isText3Empty && isText5Empty && isText6Empty) {
            flag = false;
        }
        return flag;
    }

    const filterLecNo = (value) => {
        return value.WeekdayId === AddLecForTWeekDayId
    }
    function filterLectures(arr, lecno, WeekDayId) {
        // Convert lecno to a string, as your data has lecno stored as strings
        const filteredArray = arr.filter(item =>
            item.Lecture_Number === lecno.toString() &&
            item.Weekday_Id === WeekDayId.toString()
        );

        return filteredArray;
    }
    useEffect(() => {
        if (AddLecForTStdDivId === '0') {
            dispatch(CDAClearDuplicateLecturesMsg());
        }
    }, [AddLecForTStdDivId])
    useEffect(() => {
        if (AddLecForTeacherSuccessMsg !== undefined && AddLecForTeacherSuccessMsg?.length === 0) {
            toast.success('Additional Lecture Added Successfully');
            dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
            dispatch(CDAClearValidateAdditionalDataForTeacher());
            setShowAddAdditionalLectures(false);
            setIsSubmitAdLecToTeacher(false);
        }
    }, [AddLecForTeacherSuccessMsg])

    // PROTO - TYPE CONDITION 
    function getFilteredClassSubjects(selectedWeekdayId, selectedLectureNumber, baseLectureList, classSubjectDropdownList) {
        // Step 1: Find all matching lectures based on selected weekday and lecture number
        const matchedLectures = baseLectureList.filter(
            lecture =>
                lecture.WeekdayId === selectedWeekdayId && lecture.LecNo === selectedLectureNumber
        );
        console.log(`🙋‍♂️`, matchedLectures)
        // Step 2: Get the Standard_Division_Id and Subject_Id from the matched lectures
        const matchedStandardDivisionId = matchedLectures.length > 0 ? matchedLectures[0].StdDivId : null;
        const matchedSubjectId = matchedLectures.length > 0 ? matchedLectures[0].SubId : null;
        console.log(`🙋‍♂️`, matchedStandardDivisionId, matchedSubjectId)
        // Step 3: Filter the ClassSubjectDropdownList
        const filteredClassSubjects = classSubjectDropdownList.filter(subject =>
            subject.SubId === matchedSubjectId && subject.StdDivId !== matchedStandardDivisionId
        );

        // Adding the default "Select" option at the beginning of the filtered list
        filteredClassSubjects.unshift({ Id: '0', StdDivId: '0', SubId: '0', Name: 'Select', SubTeacher: 'Select', OrgStdId: '0', OrgDivId: '0', Value: '0' });

        return filteredClassSubjects;
    }


    const FilteredAddLecArray = getFilteredClassSubjects(AddLecForTWeekDayId, AddLecForTLecNo, AddLecPopupCompClassNameDetailsList, AddClassSubList);

    //
    function filterThirdDropdown(weekdayId, lecno, thirdArray, array1, array2) {
        // Filter out items from array1 based on selected weekday and lecture number
        const excludedSubjects1 = array1.filter(item =>
            item.WeekdayId === weekdayId.toString() &&
            item.LecNo === lecno.toString()
        ).map(item => item.SubId);

        // Filter out items from array2 based on selected weekday and lecture number
        const excludedSubjects2 = array2.filter(item =>
            item.WeekdayId === weekdayId.toString() &&
            item.LecNo === lecno.toString()
        ).map(item => item.SubName);

        // Filter thirdArray by excluding items from array1 and array2
        const filteredArray = thirdArray.filter(item =>
            !excludedSubjects1.includes(item.SubId) &&
            !excludedSubjects2.includes(item.Name?.split(' ')[0])
        );
        filteredArray.unshift({ Id: '0', StdDivId: '0', SubId: '0', SubName: 'Select', SubTeacher: 'Select', OrgStdId: '0', OrgDivId: '0', Value: '0' });
        console.log(`✅`, filteredArray)
        return filteredArray;
    }
    const filterClassSubject = (value) => {
        // AddLecPopupCompClassNameDetailsList  -- Base Lectures List
        // AddLecPopUpCompSubjectNameDetailsList  -- Additional Lecutures List 

    }
    let filteredAddLecLectureNumber = AddLecNoList.filter(filterLecNo);
    let filteredAddLecSubNameList = filterThirdDropdown(AddLecForTWeekDayId, AddLecForTLecNo, AddClassSubList, AddLecPopupCompClassNameDetailsList, AddLecPopUpCompSubjectNameDetailsList);
    filteredAddLecLectureNumber.unshift({ Id: '0', Name: 'Select', Value: '0' })

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
            dispatch(CDAClearValidateClassData());
            dispatch(CDAClassLecNoWeekday(WeekDayClassBody));
        }
    }, [SaveClassTimetableMsg])
    useEffect(() => {
        if (DeleteAddLecturesMsg !== '') {
            toast.success(DeleteAddLecturesMsg)
            dispatch(CDAResetDeleteAdditionalLectures());
            dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
            dispatch(CDAClassLecNoWeekday(WeekDayClassBody));
        }
    }, [DeleteAddLecturesMsg])

    const CDAGetStandardListBody: IGetTeacherAndStandardForTimeTableBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcadmicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asTeacher_id: UserRoleId === '2' && IsWeeklyTimetableFullAccess === 'Y' ? 0 : ConfigIdPagePersmission.length > 0 && ConfigIdPagePersmission[0].Can_Edit === 'Y' ? 0 : Number(SessionTeacherId)
        // asTeacher_id: 0
    }
    useEffect(() => {
        if (filterBy === 'Class') {
            dispatch(CDAClearValidateTeacherData());
            dispatch(CDAGetStandardNameList(CDAGetStandardListBody));
        } else if (filterBy === 'Teacher') {
            dispatch(CDAClearValidateClassData());
            dispatch(CDAGetTeachersList(CDAGetStandardListBody));
        }
    }, [filterBy])


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
    // Following f() is for Calculating the total Lec. count for each WeekDay
    const [MonCount, setMonCount] = useState(0);
    const [TueCount, setTueCount] = useState(0);
    const [WedCount, setWedCount] = useState(0);
    const [ThuCount, setThuCount] = useState(0);
    const [FriCount, setFriCount] = useState(0);
    useEffect(() => {
        if (teacher !== '0' && teacher !== undefined && isNewTeacherSelection === true) {
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForMon(IGetTeacherSubjectMaxLecForMon));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForTue(IGetTeacherSubjectMaxLecForTue));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForWed(IGetTeacherSubjectMaxLecForWed));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForThu(IGetTeacherSubjectMaxLecForThu));
            dispatch(CDAGetTeacherSubjectMaxLecDetailsForFri(IGetTeacherSubjectMaxLecForFri));
            // setMonCount(0);
            // setTueCount(0);
            // setWedCount(0);
            // setThuCount(0);
            // setFriCount(0);
        }
    }, [teacher, isNewTeacherSelection]);

    // Additional / Optional Lecture Added Success Msg.
    useEffect(() => {
        if (ManageTimeTableMsg !== '') {
            toast.success(ManageTimeTableMsg);
            dispatch(CDAClearManageClassTimeTable())
            ClearAddLecForTeacherFields()
            dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
            setShowAddAdditionalLectures(false)
            setIsSubmitAdLecToTeacher(false);
        }
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
    const AdditionalLectureBody: IGetDataForAdditionalClassesBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asAcademicYearID: Number(sessionStorage.getItem('AcademicYearId')),
        asTeacher_Id: filterBy === 'Teacher' ? Number(teacher) : 0,
        asStandardDivision_Id: filterBy === 'Teacher' ? 0 : Number(standard)
    }
    useEffect(() => {
        if (ResetTimetableMsg !== '') {
            toast.success(ResetTimetableMsg);
            dispatch(CDAGetResetTimetableMsgClear());
            dispatch(CDAClassLecNoWeekday(WeekDayClassBody));
            dispatch(CDAGetLectureNoWeekday(WeekDayTeacherBody));
            dispatch(CDAClearValidateTeacherData());
            dispatch(CDAClearValidateClassData());
            dispatch(GetDataForAdditionalClasses(AdditionalLectureBody))
            dispatch(GetLectureCountsForTeachers(GetLectureCountsForTeachersBody));
        }
    }, [ResetTimetableMsg])

    useEffect(() => {
        if (teacher !== '0') {
            dispatch(GetLectureCountsForTeachers(GetLectureCountsForTeachersBody))
        }
    }, [teacher])


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
        dispatch(CDAClearDuplicateLecturesMsg());
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
        dispatch(CDAGetDataForAddClassPopUp(AdditionalLecturesBody))
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
        showAlert({
            title: 'Please Confirm',
            message: `Are you sure you want to save this timetable?`,
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onConfirm: () => {
                dispatch(CDASaveClassTimetable(SaveClassTimetableBody));
                closeAlert();
            },
            onCancel: () => {
                closeAlert();
            }
        });
    }

    // f() to save Teacher Timetable 
    // Interface Body 


    function saveTeacherTimetable() {
        sessionStorage.removeItem('ExceedLecMsg')
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
        showAlert({
            title: 'Please Confirm',
            message: `Are you sure you want to save this timetable?`,
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onConfirm: () => {
                dispatch(CDASaveTeacherTimetable(SaveTeacherTimetableBody));
                closeAlert();
            },
            onCancel: () => {
                closeAlert();
            }
        });
        console.log(`SaveTeacherTimetableBody 🧧`, SaveTeacherTimetableBody)
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
    useEffect(() => {
        if (GetValidateAddDataForTeacherMsgList !== undefined && GetValidateAddDataForTeacherMsgList?.length > 0) {
            if (GetValidateAddDataForTeacherMsgList !== undefined && checkErrorMsgLength(GetValidateAddDataForTeacherMsgList[0]) === false) {
                let obs = GetValidateAddDataForTeacherMsgList[0];
                const DuplicateLecBody: IGetCheckDuplicateLecturesMsgBody = {
                    asSchoolId: Number(localStorage.getItem('SchoolId')),
                    asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
                    asSubjectId: Number(AddLecForTSubjectNameId),
                    asTeacherId: Number(teacher),
                    asStdDivId: Number(AddLecForTStdDivId),
                    asLectureNo: Number(AddLecForTLecNo),
                    asWeekDayId: Number(AddLecForTWeekDayId)
                }
                const AddLecForTeacherApiBody: IGetSaveTeacherTimeTableBody = {
                    asSchoolId: Number(localStorage.getItem('localSchoolId')),
                    asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
                    asInsertedById: Number(sessionStorage.getItem('Id')),
                    asTeacherID: Number(teacher),
                    asMasterXml: `<DaywiseTimeTableMaster><DaywiseTimeTable Standard_Division_Id=\"${AddLecForTStdDivId}\" Weekday_Id=\"${AddLecForTWeekDayId}\" /></DaywiseTimeTableMaster>`,
                    asDetailXml: `<DaywiseTimeTableDetails><DaywiseTimeTableDetail WeekDay_Id=\"${AddLecForTWeekDayId}\" Teacher_ID=\"${teacher}\" Standard_Division_Id=\"${AddLecForTStdDivId}\" Lecture_Number=\"${AddLecForTLecNo}\" Subject_Id=\"${AddLecForTSubjectNameId}\" /></DaywiseTimeTableDetails>`,
                    asTeacherXML: GetTeacherXML(),
                    IsAdditionalClass: 1,
                    asIncCnt: 0
                }
                const ValidateAdditionalDataForTeacher: IGetValidateAddDataForTeacherBody = {
                    asSchoolId: Number(localStorage.getItem('localSchoolId')),
                    asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
                    asInsertedById: Number(sessionStorage.getItem('Id')),
                    asTeacherID: Number(teacher),
                    asMasterXml: `<DaywiseTimeTableMaster><DaywiseTimeTable Standard_Division_Id='${AddLecForTStdDivId}' Weekday_Id='${AddLecForTWeekDayId}' /></DaywiseTimeTableMaster>`,
                    asDetailXml: `<DaywiseTimeTableDetails><DaywiseTimeTableDetail WeekDay_Id='${AddLecForTWeekDayId}' Teacher_ID='${teacher}' Standard_Division_Id='${AddLecForTStdDivId}' Lecture_Number='${AddLecForTLecNo}' Subject_Id='${AddLecForTSubjectNameId}' /></DaywiseTimeTableDetails>`,
                    IsAdditionalClass: true,
                    asIncCnt: 1
                }
                const AddLecForManageTeacherApiBody: IGetManageClassTimeTableBody = {
                    asSchoolId: Number(localStorage.getItem('localSchoolId')),
                    asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
                    asInserted_By_id: Number(sessionStorage.getItem('Id')),
                    asStandardDivId: Number(AddLecForTStdDivId),
                    asDayTimeTableMasterXml: `<DaywiseTimeTableMaster><DaywiseTimeTable Standard_Division_Id='${AddLecForTStdDivId}' Weekday_Id='${AddLecForTWeekDayId}' /></DaywiseTimeTableMaster>`,
                    asDayTimeTableDetailsXml: `<DaywiseTimeTableDetails><DaywiseTimeTableDetail WeekDay_Id='${AddLecForTWeekDayId}' Teacher_ID='${teacher}' Standard_Division_Id='${AddLecForTStdDivId}' Lecture_Number='${AddLecForTLecNo}' Subject_Id='${AddLecForTSubjectNameId}' /></DaywiseTimeTableDetails>`,
                    asIsAdditionalClass: true,
                    asIsCountInceased: 0
                }
                showAlert({
                    title: 'Please Confirm',
                    message: `${obs.Text4}Do you want to increase limit for subject(s)?`,
                    variant: 'warning',
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    onConfirm: () => {
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
                        dispatch(CDASaveAddTeacherTimetable(AddLecForTeacherApiBody, DuplicateLecBody, AddLecForManageTeacherApiBody, ValidateAdditionalDataForTeacher));
                        closeAlert();
                    },
                    onCancel: () => {
                        closeAlert();
                        dispatch(CDAClearValidateAdditionalDataForTeacher());
                    }
                });
            }
        }
    }, [GetValidateAddDataForTeacherMsgList])
    useEffect(() => {
        if (ValidateAddLecTeacherDataMsg.length > 0) {
            if (checkErrorMsgLength(ValidateAddLecTeacherDataMsg[0]) === false) {
                let obs = ValidateAddLecTeacherDataMsg[0];
                showAlert({
                    title: 'Please Confirm',
                    message: `${obs.Text4}Do you want to increase limit for subject(s)?`,
                    variant: 'warning',
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    onConfirm: () => {
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
                        dispatch(CDASaveTeacherTimetableWithIncr(SaveTeacherTimetableBody1))
                        closeAlert();
                    },
                    onCancel: () => {
                        closeAlert();
                        sessionStorage.removeItem('ExceedLecMsg');
                        dispatch(CDAClearValidateAddLecTeacherData());
                    }
                });
            }
        }
    }, [ValidateAddLecTeacherDataMsg])

    useEffect(() => {
        if (ValidateClassDataMsg.length > 0) {
            if (checkErrorMsgLength(ValidateClassDataMsg[0]) === false) {
                let obs = ValidateClassDataMsg[0];
                showAlert({
                    title: 'Please Confirm',
                    message: `${obs.Text4}Do you want to increase limit for subject(s)?`,
                    variant: 'warning',
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    onConfirm: () => {
                        const SaveClassTimetableBody1: IGetSaveClassTimeTableBody = {
                            asSchoolId: Number(localStorage.getItem('SchoolId')),
                            asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
                            asInsertedById: Number(sessionStorage.getItem('Id')),
                            asStdDivId: Number(division),
                            asMasterXml: GetClassMasterXML(),
                            asDetailXml: GetClassDetailXML(),
                            asAdditionalLect: null,
                            IsAdditionalClass: false,
                            asIncCnt: 1
                        }
                        dispatch(CDASaveClassTimetableWithIncr(SaveClassTimetableBody1))
                        closeAlert();
                    },
                    onCancel: () => {
                        closeAlert();
                        sessionStorage.removeItem('ExceedLecMsg');
                        dispatch(CDAClearValidateClassData());
                    }
                });
            }
        }
    }, [ValidateClassDataMsg])

    // PROTO TYPE f() 
    function createWeekDayMapping() {
        const mapping = {};
        const weekDayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        if (WeekdayIds.length > 0) {
            for (let i = 0; i < WeekdayIds.length; i++) {
                mapping[WeekdayIds[i].WeekdayId] = weekDayNames[i];
            }
        }
        return mapping;
    }

    function hasExternalLecture(trackTeacherTimeTable: string) {
        // Create the dynamic mapping
        const weekDayMapping = createWeekDayMapping();

        // Split the input string
        if (trackTeacherTimeTable !== undefined) {
            const [SubTeacherId, WeekDayId, StdDivId, SubId, LecNo] = trackTeacherTimeTable.split('-');

            // Convert the WeekDayId to the corresponding Weekday name using the dynamic mapping
            const weekDayName = weekDayMapping[WeekDayId];

            // Arrays containing external lectures
            const externalLectures = [
                ...(stayback ? StayBackInfo : []),
                ...(assembly ? AssemblyInfo : []),
                ...(mpt ? mptInfo : []),
                ...(weeklytest ? weeklyTestInfo : []),
            ];

            // Check if there's a matching weekday name and lecture number
            return externalLectures.some(lecture =>
                lecture.Text1 === weekDayName && lecture.Text2 === LecNo
            );
        }

    }

    function checkAndDispatch(trackTeacherTimeTable: string) {
        // Create the dynamic mapping
        const weekDayMapping = createWeekDayMapping();
        if (trackTeacherTimeTable !== undefined) {
            const [SubTeacherId, WeekDayId, StdDivId, SubId, LecNo] = trackTeacherTimeTable.split('-');
            // Check if there's an additional lecture on the same day and lecture number
            const additionalLecture = TimetableDetails.find(item =>
                item.Text2 === weekDayMapping[WeekDayId] && item.Text1 === LecNo
            );
            if (additionalLecture) {
                const schoolTimetableId = additionalLecture.Text5;
                // If both conditions are true, dispatch the action
                const DeleteAddLecturesBody: IGetDeleteAdditionalLecturesBody = {
                    asSchoolId: Number(localStorage.getItem('SchoolId')),
                    asDetailID: Number(schoolTimetableId)
                }
                dispatch(CDAMutedDeleteAdditionalLectures(DeleteAddLecturesBody))
            }
        }
    }

    // lecture count table f()
    function countSubIdOccurrences(subId, stdDivId) {
        let count = 0;
        if (Object.keys(trackTeacherTimetable).length > 0) {
            for (const key in trackTeacherTimetable) {
                if (trackTeacherTimetable.hasOwnProperty(key)) {
                    const value = trackTeacherTimetable[key];
                    const [, , currentStdDivId, currentSubId] = value.split('-'); // Extract the SubId part

                    if (currentSubId === subId && currentStdDivId === stdDivId) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
    //

    function GetMasterXML() {
        let sXML = "";
        const weekdayIds = WeekdayIds.map(item => item.WeekdayId);
        TeacherTimetableCellValues.forEach(lecture => {
            const lectureNo = lecture.Text1;
            ['Text2', 'Text3', 'Text4', 'Text5', 'Text6'].forEach((day, index) => {
                const key = `${weekdayIds[index]}-${lectureNo}`;
                hasExternalLecture(trackTeacherTimetable[key]) ? trackTeacherTimetable[key] = `0-${trackTeacherTimetable[key]?.split('-')[1]}-0-0-${trackTeacherTimetable[key]?.split('-')[4]}` : '';
                // abc[key] = `${lecture[day]}-${weekdayIds[index]}`;
                if (trackTeacherTimetable[key]?.split('-')[0] !== "0" && lectureNo !== '99') {
                    sXML += `<DaywiseTimeTable Standard_Division_Id="${trackTeacherTimetable[key]?.split('-')[2]}" Weekday_Id="${trackTeacherTimetable[key]?.split('-')[1]}" />`
                }
            });
        });
        sXML = `<DaywiseTimeTableMaster>${sXML}</DaywiseTimeTableMaster>`
        return sXML;
    }
    useEffect(() => {
        if (Object.keys(trackTeacherTimetable).length > 0) {
            console.log(`🧨`, trackTeacherTimetable);
        }
    }, [trackTeacherTimetable])
    function GetDetailXML() {
        // TrackTeacherTimeTable String Split seq. `SubTeacherId-WeekDayId-StdDivId-SubId-LecNo` 
        let sXML = "";
        const weekdayIds = WeekdayIds.map(item => item.WeekdayId);
        console.log(`🎄`, trackTeacherTimetable)
        TeacherTimetableCellValues.forEach(lecture => {
            const lectureNo = lecture.Text1;
            ['Text2', 'Text3', 'Text4', 'Text5', 'Text6'].forEach((day, index) => {
                const key = `${weekdayIds[index]}-${lectureNo}`;
                if (hasExternalLecture(trackTeacherTimetable[key])) {
                    trackTeacherTimetable[key] = `0-${trackTeacherTimetable[key]?.split('-')[1]}-0-0-${trackTeacherTimetable[key]?.split('-')[4]}`
                    checkAndDispatch(trackTeacherTimetable[key]);
                }
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
        const ValidateAdditionalDataForTeacher: IGetValidateAddDataForTeacherBody = {
            asSchoolId: Number(localStorage.getItem('localSchoolId')),
            asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asInsertedById: Number(sessionStorage.getItem('Id')),
            asTeacherID: Number(teacher),
            asMasterXml: `<DaywiseTimeTableMaster><DaywiseTimeTable Standard_Division_Id='${AddLecForTStdDivId}' Weekday_Id='${AddLecForTWeekDayId}' /></DaywiseTimeTableMaster>`,
            asDetailXml: `<DaywiseTimeTableDetails><DaywiseTimeTableDetail WeekDay_Id='${AddLecForTWeekDayId}' Teacher_ID='${teacher}' Standard_Division_Id='${AddLecForTStdDivId}' Lecture_Number='${AddLecForTLecNo}' Subject_Id='${AddLecForTSubjectNameId}' /></DaywiseTimeTableDetails>`,
            IsAdditionalClass: true,
            asIncCnt: 0
        }
        if (AddLecForTWeekDayId !== '0' && AddLecForTLecNo !== '0' && AddLecForTSubjectNameId !== '0') {
            // dispatch(CDAManageClassTimeTable(AddLecForTeacherApiBody));
            dispatch(CDAValidateAdditionalDataForTeacher(ValidateAdditionalDataForTeacher));
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
    function isStaybackLectureClass(weekDay, lectureNo) {
        let isPresent = StaybackInfoClass.find(item => item.Text1 === weekDay && item.Text4 === lectureNo);
        isPresent !== undefined ? true : false;
        return isPresent;
    }
    function isWeeklytestLectureClass(weekDay, lectureNo) {
        let isPresent = weeklytestInfoClass.find(item => item.Text1 === weekDay && item.Text4 === lectureNo);
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

    // Following f() is for Checking whether the current ` CLASS ` Time-Table Cell has any Optional Lec. Already Assigned or not |  If yes i.e `true` then disable the Dropdown Cell
    function hasAddLectOnClass(WeekDayName, LecNo) {
        let isAdd = false;
        let isAddLec = OptionalLecForClass.find(item => item.Text3 === WeekDayName && item.Text2 === LecNo);
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

    useEffect(() => {
        if (ApplicablesToggleData.length > 0 && Object.keys(trackTeacherTimetable).length > 0 && TeacherTimetableCellValues.length > 0) {
            let WeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            const daySetters = {
                Monday: setMonCount,
                Tuesday: setTueCount,
                Wednesday: setWedCount,
                Thursday: setThuCount,
                Friday: setFriCount
            };
            WeekDays.forEach(day => {
                let dayCount = TeacherTimetableCellValues.reduce((total, item) => {
                    let mptCount = 0;
                    let assemblyCount = 0;
                    let staybackCount = 0;
                    let weeklytestCount = 0;
                    let lecNo = 0;
                    const dayMapping = {
                        'Monday': item.Text2 !== '0', 'Tuesday': item.Text3 !== '0', 'Wednesday': item.Text4 !== '0', 'Thursday': item.Text5 !== '0', 'Friday': item.Text6 !== '0'
                    };
                    if (item.Text1 !== '99') {
                        mptCount = mpt && isMPTLecture(day, item.Text1) ? 1 : 0;
                        assemblyCount = assembly && isAssemblyLecture(day, item.Text1) ? 1 : 0;
                        staybackCount = stayback && isStaybackLecture(day, item.Text1) ? 1 : 0;
                        weeklytestCount = weeklytest && isWeeklyTestLecture(day, item.Text1) ? 1 : 0;
                        lecNo = dayMapping[day] ? 1 : 0;
                    }
                    return total + mptCount + assemblyCount + staybackCount + weeklytestCount + lecNo;
                }, 0);
                daySetters[day](Number(dayCount));
            });
        }
    }, [TeacherTimetableCellValues, trackTeacherTimetable, ApplicablesToggleData, assembly, mpt, stayback, weeklytest]);



    function SubmitAdditionalLecture() {
        dispatch(CDAClearValidateAdditionalDataForTeacher());
        const DuplicateLecBody: IGetCheckDuplicateLecturesMsgBody = {
            asSchoolId: Number(localStorage.getItem('SchoolId')),
            asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asSubjectId: Number(AddLecForTSubjectNameId),
            asTeacherId: Number(teacher),
            asStdDivId: Number(AddLecForTStdDivId),
            asLectureNo: Number(AddLecForTLecNo),
            asWeekDayId: Number(AddLecForTWeekDayId)
        }
        const AddLecForTeacherApiBody: IGetSaveTeacherTimeTableBody = {
            asSchoolId: Number(localStorage.getItem('localSchoolId')),
            asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asInsertedById: Number(sessionStorage.getItem('Id')),
            asTeacherID: Number(teacher),
            asMasterXml: `<DaywiseTimeTableMaster><DaywiseTimeTable Standard_Division_Id=\"${AddLecForTStdDivId}\" Weekday_Id=\"${AddLecForTWeekDayId}\" /></DaywiseTimeTableMaster>`,
            asDetailXml: `<DaywiseTimeTableDetails><DaywiseTimeTableDetail WeekDay_Id=\"${AddLecForTWeekDayId}\" Teacher_ID=\"${teacher}\" Standard_Division_Id=\"${AddLecForTStdDivId}\" Lecture_Number=\"${AddLecForTLecNo}\" Subject_Id=\"${AddLecForTSubjectNameId}\" /></DaywiseTimeTableDetails>`,
            asTeacherXML: GetTeacherXML(),
            IsAdditionalClass: 1,
            asIncCnt: 0
        }
        const ValidateAdditionalDataForTeacher: IGetValidateAddDataForTeacherBody = {
            asSchoolId: Number(localStorage.getItem('localSchoolId')),
            asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asInsertedById: Number(sessionStorage.getItem('Id')),
            asTeacherID: Number(teacher),
            asMasterXml: `<DaywiseTimeTableMaster><DaywiseTimeTable Standard_Division_Id='${AddLecForTStdDivId}' Weekday_Id='${AddLecForTWeekDayId}' /></DaywiseTimeTableMaster>`,
            asDetailXml: `<DaywiseTimeTableDetails><DaywiseTimeTableDetail WeekDay_Id='${AddLecForTWeekDayId}' Teacher_ID='${teacher}' Standard_Division_Id='${AddLecForTStdDivId}' Lecture_Number='${AddLecForTLecNo}' Subject_Id='${AddLecForTSubjectNameId}' /></DaywiseTimeTableDetails>`,
            IsAdditionalClass: true,
            asIncCnt: 0
        }
        const AddLecForManageTeacherApiBody: IGetManageClassTimeTableBody = {
            asSchoolId: Number(localStorage.getItem('localSchoolId')),
            asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asInserted_By_id: Number(sessionStorage.getItem('Id')),
            asStandardDivId: Number(AddLecForTStdDivId),
            asDayTimeTableMasterXml: `<DaywiseTimeTableMaster><DaywiseTimeTable Standard_Division_Id='${AddLecForTStdDivId}' Weekday_Id='${AddLecForTWeekDayId}' /></DaywiseTimeTableMaster>`,
            asDayTimeTableDetailsXml: `<DaywiseTimeTableDetails><DaywiseTimeTableDetail WeekDay_Id='${AddLecForTWeekDayId}' Teacher_ID='${teacher}' Standard_Division_Id='${AddLecForTStdDivId}' Lecture_Number='${AddLecForTLecNo}' Subject_Id='${AddLecForTSubjectNameId}' /></DaywiseTimeTableDetails>`,
            asIsAdditionalClass: true,
            asIsCountInceased: 0
        }
        console.log(`🤝`, AddLecForTeacherApiBody)
        if (AddLecForTWeekDayId !== '0' && AddLecForTLecNo !== '0' && AddLecForTSubjectNameId !== '0') {
            dispatch(CDASaveAddTeacherTimetable(AddLecForTeacherApiBody, DuplicateLecBody, AddLecForManageTeacherApiBody, ValidateAdditionalDataForTeacher));
        } else {
            setIsSubmitAdLecToTeacher(true);
        }
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
                                            setDivision('0');
                                            setStandard('0');
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
                                                dispatch(CDAClearValidateClassData());
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
                                                dispatch(CDAClearValidateClassData());
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
                            {teacher === '0' || teacher === undefined ? filterBy === 'Teacher' &&
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
                            {division === '0' || division === undefined ? filterBy === 'Class' &&
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
                                <SquareIcon style={{ color: '#9ca3af', fontSize: 25, position: 'relative', top: '-2px' }} />
                                <Typography>Lecture not applicable</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <SquareIcon style={{ color: '#e5e7eb', fontSize: 25, position: 'relative', top: '-2px' }} />
                                <Typography>Associated with additional / optional subject lectures</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ p: 2, background: 'white', mt: 1 }}>
                    {ValidateTeacherDataMsg?.length > 0 && checkErrorMsgLength(ValidateTeacherDataMsg[0]) &&
                        <Stack sx={{ width: '100%' }} spacing={.5}>
                            {ValidateTeacherDataMsg.map((errorObj, index) => (
                                Object.keys(errorObj).map((key) => {
                                    const message = errorObj[key].trim();
                                    if (message !== "") {
                                        return <span dangerouslySetInnerHTML={{ __html: message }} style={{ color: 'red', fontWeight: 'bolder' }} />;
                                    }
                                    return null;
                                })
                            ))}
                        </Stack>
                    }
                    {ValidateClassDataMsg?.length > 0 && checkErrorMsgLength(ValidateClassDataMsg[0]) &&
                        <Stack sx={{ width: '100%' }} spacing={.5}>
                            {ValidateClassDataMsg.map((errorObj, index) => (
                                Object.keys(errorObj).map((key) => {
                                    const message = errorObj[key].trim();
                                    if (message !== "") {
                                        return <span dangerouslySetInnerHTML={{ __html: message }} style={{ color: 'red', fontWeight: 'bolder' }} />;
                                    }
                                    return null;
                                })
                            ))}
                        </Stack>
                    }
                    <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={'space-between'} mt={1}>
                        {filterBy === 'Teacher' ? <Typography variant={"h4"}>Weekly timetable for {teacher !== '0' ? teacherName : 'teacher / class name'}</Typography> :
                            <Typography variant={"h4"}>Weekly timetable for {standard !== '0' && division !== '0' ? `Class ${standardName} - ${divisionName}` : 'teacher / class name'}</Typography>}
                    </Stack>
                    {teacher !== '0' && Object.keys(trackTeacherTimetable).length === 0 && <SuspenseLoader />}
                    {division !== '0' && Object.keys(trackClassTimetable).length === 0 && <SuspenseLoader />}
                    {loading ? <SuspenseLoader /> :
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
                                                                        <Tooltip title={`For - Monday : ${item.Text1}`} arrow placement="top" enterDelay={2000}>
                                                                            <StyledCell sx={{ backgroundColor: `${mpt && isMPTLecture('Monday', item.Text1) ? '#f3f4f6' : assembly && isAssemblyLecture('Monday', item.Text1) ? '#f3f4f6' : stayback && isStaybackLecture('Monday', item.Text1) ? '#f3f4f6' : weeklytest === true && isWeeklyTestLecture('Monday', item.Text1) ? '#f3f4f6' : filterMaxDayLec(MondayColumnList, item.Text1).length === 1 ? '#9ca3af' : item.Text2 !== '0' ? '#f3f4f6' : ''}` }}>
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
                                                                                                minWidth: 200, backgroundColor: `${item.Text2 !== '0' && hasAddLect('Monday', item.Text1) ? '#e5e7eb' : item.Text2 !== '0' ? '#f3f4f6' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }} size={"small"}
                                                                                            disabled={item.Text2 !== '0' && hasAddLect('Monday', item.Text1)}
                                                                                            DisableClearable={true}
                                                                                            defaultValue={trackTeacherTimetable[`${WeekdayIds[0].WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Tuesday : ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${mpt && isMPTLecture('Tuesday', item.Text1) ? '#f3f4f6' : assembly && isAssemblyLecture('Tuesday', item.Text1) ? '#f3f4f6' : stayback && isStaybackLecture('Tuesday', item.Text1) ? '#f3f4f6' : weeklytest === true && isWeeklyTestLecture('Tuesday', item.Text1) ? '#f3f4f6' : filterMaxDayLec(TuesdayColumnList, item.Text1).length === 1 ? '#9ca3af' : item.Text3 !== '0' ? '#f3f4f6' : ''}` }}>
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
                                                                                                minWidth: 200, backgroundColor: `${item.Text3 !== '0' && hasAddLect('Tuesday', item.Text1) ? '#e5e7eb' : item.Text3 !== '0' ? '#f3f4f6' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }}
                                                                                            size={"small"}
                                                                                            DisableClearable={true}
                                                                                            disabled={item.Text3 !== '0' && hasAddLect('Tuesday', item.Text1)}
                                                                                            defaultValue={trackTeacherTimetable[`${WeekdayIds[1]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Wednesday : ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${mpt && isMPTLecture('Wednesday', item.Text1) ? '#f3f4f6' : assembly && isAssemblyLecture('Wednesday', item.Text1) ? '#f3f4f6' : stayback && isStaybackLecture('Wednesday', item.Text1) ? '#f3f4f6' : weeklytest === true && isWeeklyTestLecture('Wednesday', item.Text1) ? '#f3f4f6' : filterMaxDayLec(WednesdayColumnList, item.Text1).length === 1 ? '#9ca3af' : item.Text4 !== '0' ? '#f3f4f6' : ''}` }}>
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
                                                                                                minWidth: 200, backgroundColor: `${item.Text4 !== '0' && hasAddLect('Wednesday', item.Text1) ? '#e5e7eb' : item.Text4 !== '0' ? '#f3f4f6' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }}
                                                                                            disabled={item.Text4 !== '0' && hasAddLect('Wednesday', item.Text1)}
                                                                                            size={"small"}
                                                                                            DisableClearable={true}
                                                                                            defaultValue={trackTeacherTimetable[`${WeekdayIds[2]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Thursday : ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${mpt && isMPTLecture('Thursday', item.Text1) ? '#f3f4f6' : assembly && isAssemblyLecture('Thursday', item.Text1) ? '#f3f4f6' : stayback && isStaybackLecture('Thursday', item.Text1) ? '#f3f4f6' : weeklytest === true && isWeeklyTestLecture('Thursday', item.Text1) ? '#f3f4f6' : filterMaxDayLec(ThursdayColumnList, item.Text1).length === 1 ? '#9ca3af' : item.Text5 !== '0' ? '#f3f4f6' : ''}` }}>
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
                                                                                                minWidth: 200, backgroundColor: `${item.Text5 !== '0' && hasAddLect('Thursday', item.Text1) ? '#e5e7eb' : item.Text5 !== '0' ? '#f3f4f6' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }} size={"small"}
                                                                                            DisableClearable={true}
                                                                                            disabled={item.Text5 !== '0' && hasAddLect('Thursday', item.Text1)}
                                                                                            defaultValue={trackTeacherTimetable[`${WeekdayIds[3]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Friday : ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${mpt && isMPTLecture('Friday', item.Text1) ? '#f3f4f6' : assembly && isAssemblyLecture('Friday', item.Text1) ? '#f3f4f6' : stayback && isStaybackLecture('Friday', item.Text1) ? '#f3f4f6' : weeklytest === true && isWeeklyTestLecture('Friday', item.Text1) ? '#f3f4f6' : filterMaxDayLec(FridayColumnList, item.Text1).length === 1 ? '#9ca3af' : item.Text6 !== '0' ? '#f3f4f6' : ''}` }}>
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
                                                                                                minWidth: 200, backgroundColor: `${item.Text6 !== '0' && hasAddLect('Friday', item.Text1) ? '#e5e7eb' : item.Text6 !== '0' ? '#f3f4f6' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }} size={"small"}
                                                                                            DisableClearable={true}
                                                                                            disabled={item.Text6 !== '0' && hasAddLect('Friday', item.Text1)}
                                                                                            defaultValue={trackTeacherTimetable[`${WeekdayIds[4]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                    </TableRow>
                                                                    :
                                                                    <TableRow>
                                                                        {Object.keys(trackTeacherTimetable).length > 0 && <>
                                                                            <FooterStyledCell>{'Total Lectures'}</FooterStyledCell>
                                                                            <FooterStyledCell>{MonCount}</FooterStyledCell>
                                                                            <FooterStyledCell>{TueCount}</FooterStyledCell>
                                                                            <FooterStyledCell>{WedCount}</FooterStyledCell>
                                                                            <FooterStyledCell>{ThuCount}</FooterStyledCell>
                                                                            <FooterStyledCell>{FriCount}</FooterStyledCell>
                                                                        </>}
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
                                                                        <Tooltip title={`For - Monday : ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${isMPTLectureClass('Monday', item.Text1) ? '#f3f4f6' : isAssemblyLectureClass('Monday', item.Text1) ? '#f3f4f6' : isStaybackLectureClass('Monday', item.Text1) ? '#f3f4f6' : isWeeklytestLectureClass('Monday', item.Text1) ? '#f3f4f6' : filterMaxDayLec(MondayColumnList, item.Text1).length === 1 ? '#9ca3af' : item.Text2 !== '0' ? '#f3f4f6' : ''}` }}>
                                                                                {isMPTLectureClass('Monday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : isAssemblyLectureClass('Monday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> : isWeeklytestLectureClass('Monday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                            <b>Weekly Test</b></Typography> : isStaybackLectureClass('Monday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                                <b>Stay Back</b></Typography> :
                                                                                    filterMaxDayLec(MondayColumnList, item.Text1).length === 1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Lecture Not Applicable</b></Typography> :
                                                                                        <SearchableDropdown1
                                                                                            onChange={(value) => clickClassMon(value, `${ClassWeeklyIds[0]?.WeekdayId}-${item.Text1}`)}
                                                                                            ItemList={filterMaxDayLec(MondayColumnList, item.Text1)}
                                                                                            sx={{
                                                                                                minWidth: 200, backgroundColor: `${item.Text2 !== '0' && hasAddLectOnClass('Monday', item.Text1) ? '#e5e7eb' : item.Text2 !== '0' ? '#f3f4f6' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }}
                                                                                            disabled={item.Text2 !== '0' && hasAddLectOnClass('Monday', item.Text1)}
                                                                                            size={"small"}
                                                                                            DisableClearable={true}
                                                                                            defaultValue={trackClassTimetable[`${ClassWeeklyIds[0]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Tuesday : ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${isMPTLectureClass('Tuesday', item.Text1) ? '#f3f4f6' : isAssemblyLectureClass('Tuesday', item.Text1) ? '#f3f4f6' : isStaybackLectureClass('Tuesday', item.Text1) ? '#f3f4f6' : isWeeklytestLectureClass('Tuesday', item.Text1) ? '#f3f4f6' : filterMaxDayLec(TuesdayColumnList, item.Text1).length === 1 ? '#9ca3af' : item.Text3 !== '0' ? '#f3f4f6' : ''}` }}>
                                                                                {isMPTLectureClass('Tuesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : isAssemblyLectureClass('Tuesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> : isWeeklytestLectureClass('Tuesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                            <b>Weekly Test</b></Typography> : isStaybackLectureClass('Tuesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                                <b>Stay Back</b></Typography> :
                                                                                    filterMaxDayLec(TuesdayColumnList, item.Text1).length === 1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Lecture Not Applicable</b></Typography> :
                                                                                        <SearchableDropdown1
                                                                                            onChange={(value) => clickClassTue(value, `${ClassWeeklyIds[1]?.WeekdayId}-${item.Text1}`)}
                                                                                            ItemList={filterMaxDayLec(TuesdayColumnList, item.Text1)}
                                                                                            sx={{
                                                                                                minWidth: 200, backgroundColor: `${item.Text3 !== '0' && hasAddLectOnClass('Tuesday', item.Text1) ? '#e5e7eb' : item.Text3 !== '0' ? '#f3f4f6' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }}
                                                                                            disabled={item.Text3 !== '0' && hasAddLectOnClass('Tuesday', item.Text1)}
                                                                                            size={"small"}
                                                                                            DisableClearable={true}
                                                                                            defaultValue={trackClassTimetable[`${ClassWeeklyIds[1]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Wednesday : ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${isMPTLectureClass('Wednesday', item.Text1) ? '#f3f4f6' : isAssemblyLectureClass('Wednesday', item.Text1) ? '#f3f4f6' : isStaybackLectureClass('Wednesday', item.Text1) ? '#f3f4f6' : isWeeklytestLectureClass('Wednesday', item.Text1) ? '#f3f4f6' : filterMaxDayLec(WednesdayColumnList, item.Text1).length === 1 ? '#9ca3af' : item.Text4 !== '0' ? '#f3f4f6' : ''}` }}>
                                                                                {isMPTLectureClass('Wednesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : isAssemblyLectureClass('Wednesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> : isWeeklytestLectureClass('Wednesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                            <b>Weekly Test</b></Typography> : isStaybackLectureClass('Wednesday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                                <b>Stay Back</b></Typography> :
                                                                                    filterMaxDayLec(WednesdayColumnList, item.Text1).length === 1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Lecture Not Applicable</b></Typography> :
                                                                                        <SearchableDropdown1
                                                                                            onChange={(value) => clickClassWed(value, `${ClassWeeklyIds[2]?.WeekdayId}-${item.Text1}`)}
                                                                                            ItemList={filterMaxDayLec(WednesdayColumnList, item.Text1)}
                                                                                            sx={{
                                                                                                minWidth: 200, backgroundColor: `${item.Text4 !== '0' && hasAddLectOnClass('Wednesday', item.Text1) ? '#e5e7eb' : item.Text4 !== '0' ? '#f3f4f6' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }}
                                                                                            disabled={item.Text4 !== '0' && hasAddLectOnClass('Wednesday', item.Text1)}
                                                                                            size={"small"}
                                                                                            DisableClearable={true}
                                                                                            defaultValue={trackClassTimetable[`${ClassWeeklyIds[2]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Thursday : ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${isMPTLectureClass('Thursday', item.Text1) ? '#f3f4f6' : isAssemblyLectureClass('Thursday', item.Text1) ? '#f3f4f6' : isWeeklytestLectureClass('Thursday', item.Text1) ? '#f3f4f6' : isStaybackLectureClass('Thursday', item.Text1) ? '#f3f4f6' : filterMaxDayLec(ThursdayColumnList, item.Text1).length === 1 ? '#9ca3af' : item.Text5 !== '0' ? '#f3f4f6' : ''}` }}>
                                                                                {isMPTLectureClass('Thursday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : isAssemblyLectureClass('Thursday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> : isWeeklytestLectureClass('Thursday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                            <b>Weekly Test</b></Typography> : isStaybackLectureClass('Thursday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                                <b>Stay Back</b></Typography> :
                                                                                    filterMaxDayLec(ThursdayColumnList, item.Text1).length === 1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Lecture Not Applicable</b></Typography> :
                                                                                        <SearchableDropdown1
                                                                                            onChange={(value) => clickClassThu(value, `${ClassWeeklyIds[3]?.WeekdayId}-${item.Text1}`)}
                                                                                            ItemList={filterMaxDayLec(ThursdayColumnList, item.Text1)}
                                                                                            sx={{
                                                                                                minWidth: 200, backgroundColor: `${item.Text5 !== '0' && hasAddLectOnClass('Thursday', item.Text1) ? '#e5e7eb' : item.Text5 !== '0' ? '#f3f4f6' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }}
                                                                                            disabled={item.Text5 !== '0' && hasAddLectOnClass('Thursday', item.Text1)}
                                                                                            size={"small"}
                                                                                            DisableClearable={true}
                                                                                            defaultValue={trackClassTimetable[`${ClassWeeklyIds[3]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
                                                                                        />}
                                                                            </StyledCell>
                                                                        </Tooltip>
                                                                        <Tooltip title={`For - Friday : ${item.Text1}`} arrow placement="top">
                                                                            <StyledCell sx={{ backgroundColor: `${isMPTLectureClass('Friday', item.Text1) ? '#f3f4f6' : isAssemblyLectureClass('Friday', item.Text1) ? '#f3f4f6' : isWeeklytestLectureClass('Friday', item.Text1) ? '#f3f4f6' : isStaybackLectureClass('Friday', item.Text1) ? '#f3f4f6' : filterMaxDayLec(FridayColumnList, item.Text1).length === 1 ? '#9ca3af' : item.Text6 !== '0' ? '#f3f4f6' : ''}` }}>
                                                                                {isMPTLectureClass('Friday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                    <b>M.P.T</b></Typography> : isAssemblyLectureClass('Friday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Assembly</b></Typography> : isWeeklytestLectureClass('Friday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                            <b>Weekly Test</b></Typography> : isStaybackLectureClass('Friday', item.Text1) ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                                <b>Stay Back</b></Typography> :
                                                                                    filterMaxDayLec(FridayColumnList, item.Text1).length === 1 ? <Typography variant="body2" sx={{ color: 'black', minWidth: 200, textAlign: 'center' }}>
                                                                                        <b>Lecture Not Applicable</b></Typography> :
                                                                                        <SearchableDropdown1
                                                                                            onChange={(value) => clickClassFri(value, `${ClassWeeklyIds[4]?.WeekdayId}-${item.Text1}`)}
                                                                                            ItemList={filterMaxDayLec(FridayColumnList, item.Text1)}
                                                                                            sx={{
                                                                                                minWidth: 200, backgroundColor: `${item.Text6 !== '0' && hasAddLectOnClass('Friday', item.Text1) ? '#e5e7eb' : item.Text6 !== '0' ? '#f3f4f6' : ''}`, "& .Mui-disabled": {
                                                                                                    color: "inherit", // or any color you want
                                                                                                    WebkitTextFillColor: "inherit", // for Safari
                                                                                                    fontWeight: "bold", // for Safari
                                                                                                }
                                                                                            }}
                                                                                            disabled={item.Text6 !== '0' && hasAddLectOnClass('Friday', item.Text1)}
                                                                                            size={"small"}
                                                                                            DisableClearable={true}
                                                                                            defaultValue={trackClassTimetable[`${ClassWeeklyIds[4]?.WeekdayId}-${item.Text1}`]?.split('-')[0]}
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
                        {filterBy === 'Class' && division !== '0' && division !== undefined && !loading && Object.keys(trackClassTimetable).length > 0 &&
                            <>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5, fontWeight: 'bold' }}>
                                        Additional / optional subject lectures
                                    </Typography>
                                    {OptionalLecForClass.length === 0 && standard !== '0' && division !== '0' &&

                                        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 5, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                            <b>No additional lectures assigned.</b>
                                        </Typography>
                                    }
                                    {OptionalLecForClass.length > 0 &&
                                        <TableContainer sx={{ width: '100%' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <HeaderStyledCell sx={{ textAlign: 'left' }}>Week Day</HeaderStyledCell>
                                                        <HeaderStyledCell>Lecture #</HeaderStyledCell>
                                                        <HeaderStyledCell sx={{ textAlign: 'left' }}>Subject</HeaderStyledCell>
                                                        <HeaderStyledCell sx={{ textAlign: 'left' }}>Teacher Name</HeaderStyledCell>
                                                        <HeaderStyledCell>Delete</HeaderStyledCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {/* Loopable content */}
                                                    {OptionalLecForClass.map((item, i) => (
                                                        <TableRow>
                                                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '1px', paddingBottom: '1px', textAlign: 'left' }}>{item.Text3}</TableCell>
                                                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '1px', paddingBottom: '1px', textAlign: 'center' }}>{item.Text2}</TableCell>
                                                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '1px', paddingBottom: '1px', textAlign: 'left' }}>{item.Text4}</TableCell>
                                                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '1px', paddingBottom: '1px', textAlign: 'left' }}>{item.Text10}</TableCell>
                                                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '1px', paddingBottom: '1px', textAlign: 'center' }}>
                                                                <Tooltip title="Delete">
                                                                    <IconButton onClick={() => dltAddLecture(item.Text6)}
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
                                <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5, fontWeight: 'bold' }}>Class-subject lecture count</Typography>
                                {teacher !== '0' &&
                                    <TableContainer sx={{ width: '100%' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <HeaderStyledCell sx={{ textAlign: 'left' }}>Class Subjects</HeaderStyledCell>
                                                    <HeaderStyledCell sx={{ textAlign: 'center' }}>Lecture Count</HeaderStyledCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* Loopable content */}
                                                {LectureCountsForTeachers?.map((item, i) => {
                                                    // Determine the value of Text3 based on the flags and item.Text2
                                                    let displayText3;
                                                    const [mptCount, staybackCount, assemblyCount, weeklytestCount] = ExtLectCount?.split('-');
                                                    switch (item.Text2) {
                                                        case 'Assembly':
                                                            displayText3 = assembly ? item.Text3 : '0';
                                                            break;
                                                        case 'M.P.T.':
                                                            displayText3 = mpt ? item.Text3 : '0';
                                                            break;
                                                        case 'Stay Back':
                                                            displayText3 = stayback ? item.Text3 : '0';
                                                            break;
                                                        case 'Weekly Tests':
                                                            displayText3 = weeklytest ? item.Text3 : '0';
                                                            break;
                                                        default:
                                                            displayText3 = item.Text3; // Default to Text3 for any other cases
                                                            break;
                                                    }
                                                    function countNonZeroPatterns() {
                                                        let count = 0;

                                                        for (const key in trackTeacherTimetable) {
                                                            if (trackTeacherTimetable.hasOwnProperty(key)) {
                                                                const value = trackTeacherTimetable[key];
                                                                const parts = value?.split('-'); // Split the string by '-'

                                                                // Check if all parts except LecNo are non-zero (assuming LecNo is the last part)
                                                                const allNonZero = parts.slice(0, -1).every(part => part !== '0');

                                                                if (allNonZero) {
                                                                    count++;
                                                                }
                                                            }
                                                        }

                                                        return count;
                                                    }

                                                    return (
                                                        item.Text2 === 'Total Weekly Lectures' ? (
                                                            <TableRow key={i}>
                                                                <FooterStyledCell sx={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: item.Text2 }} />
                                                                <FooterStyledCell sx={{ textAlign: 'center' }}>{countNonZeroPatterns() + (mpt && Number(mptCount)) + (stayback && Number(staybackCount)) + (weeklytest && Number(weeklytestCount)) + (assembly && Number(assemblyCount))}</FooterStyledCell>
                                                            </TableRow>
                                                        ) : !['Assembly', 'M.P.T.', 'Stay Back', 'Weekly Tests'].includes(item.Text2) ? (
                                                            <TableRow key={i}>
                                                                <StyledCell1 sx={{ textAlign: 'left' }} >{item.Text2}</StyledCell1>
                                                                <StyledCell1 sx={{ textAlign: 'center' }} >{countSubIdOccurrences(item.Text5, item.Text4)}</StyledCell1>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow key={i}>
                                                                <StyledCell1 sx={{ textAlign: 'left' }} >{item.Text2}</StyledCell1>
                                                                <StyledCell1 sx={{ textAlign: 'center' }} >{displayText3}</StyledCell1>
                                                            </TableRow>
                                                        )
                                                    )
                                                })}


                                            </TableBody>
                                        </Table>
                                    </TableContainer>}
                            </Box>
                        }
                        {filterBy === 'Teacher' && teacher !== '0' && !loading && teacher !== undefined && TeacherTimetableCellValues.length > 0 && Object.keys(trackTeacherTimetable).length > 0 &&
                            <Box sx={{ flex: 1 }}>
                                {/* <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5 }}>Class-Subject Lecture Count</Typography> */}

                                <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5, fontWeight: 'bold' }}>
                                    Additional lectures
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
                                                    <HeaderStyledCell sx={{ textAlign: 'left' }} >Subject </HeaderStyledCell>
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
                                                        <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', paddingTop: '1px', paddingBottom: '1px', textAlign: 'left' }}>{item.Text3}</TableCell>
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
            {/* <Dialog
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
                        {DuplicateLecturesMsg.length > 0 && <span dangerouslySetInnerHTML={{ __html: `Error : ${DuplicateLecturesMsg}` }} style={{ color: 'red', fontWeight: 'bolder' }} />}
                        <Typography variant={"h4"}>{filterBy === 'Teacher' ? `Assign additional lectures to teacher` :
                            `Assign optional subject lectures to class`}</Typography>
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
                                    onChange={(value) => {
                                        setAddLecForWeekDayId(value);
                                        setAddLecForTLecNo('0');
                                        setAddLecForTStdDivId('0');
                                    }}
                                    ItemList={AddLecWeekDayList}
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
                                    onChange={(value) => {
                                        setAddLecForTLecNo(value.Value);
                                        setAddLecForTStdDivId('0');
                                    }}
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
                                        setAddLecForTSubjectNameId(value.SubId);
                                        setAddLecForTStdDivId(value.StdDivId);
                                    }}
                                    ItemList={AddLecForTLecNo !== '0' ? FilteredAddLecArray : []}
                                    label="Class Subjects"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                    defaultValue={AddLecForTStdDivId}
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
                        onClick={() => {
                            setShowAddAdditionalLectures(false);
                        }}
                        sx={{
                            color: 'red',
                            '&:hover': {
                                color: 'red',
                                backgroundColor: red[100]
                            }
                        }}

                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={SubmitAdditionalLecture}
                        sx={{
                            color: 'green',
                            '&:hover': {
                                color: 'green',
                                backgroundColor: green[100]
                            }
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog> */}
            <AddLecture ValErrorMsgList={GetValidateAddDataForTeacherMsgList !== undefined && checkErrorMsgLength(GetValidateAddDataForTeacherMsgList[0]) ? GetValidateAddDataForTeacherMsgList : []} ValError={DuplicateLecturesMsg?.length > 0 ? DuplicateLecturesMsg : ''} Open={showAddAdditionalLectures} onSubmit={SubmitAdditionalLecture} Heading={filterBy === 'Teacher' ? `Assign additional lectures to teacher` : `Assign optional subject lectures to class`}
                OnClose={() => { setShowAddAdditionalLectures(false); dispatch(CDAClearValidateAdditionalDataForTeacher()); }} ItemList1={filterBy === 'Teacher' ? TeachersList : [{ Id: '0', Name: `${standardName} - ${divisionName}`, Value: '0' }]}
                Defaultvalue1={filterBy === 'Teacher' ? teacher : "0"} Label1={filterBy === 'Teacher' ? 'Teacher' : 'Class'} ItemList2={AddLecWeekDays} OnChange1={(value) => {
                    setAddLecForWeekDayId(value);
                    setAddLecForTLecNo('0');
                    setAddLecForTStdDivId('0');
                }}
                Defaultvalue2={AddLecForTWeekDayId} ErrorMsg1={isSubmitAdLecToTeacher && AddLecForTWeekDayId === '0' ? true : false} ItemList3={AddLecForTWeekDayId !== '0' ? filteredAddLecLectureNumber : []}
                Defaultvalue3={AddLecForTLecNo} OnChange2={(value) => {
                    setAddLecForTLecNo(value.Value);
                    setAddLecForTStdDivId('0');
                }}
                ErrorMsg2={isSubmitAdLecToTeacher && AddLecForTLecNo === '0' && AddLecForTWeekDayId !== '0' ? true : false}
                ErrorMsg3={isSubmitAdLecToTeacher && AddLecForTSubjectNameId === '0' && AddLecForTLecNo !== '0' && AddLecForTWeekDayId !== '0' ? true : false} Defaultvalue4={AddLecForTStdDivId}
                OnChange3={(value) => { setAddLecForTSubjectNameId(value.SubId); setAddLecForTStdDivId(value.StdDivId); }} ItemList4={AddLecForTLecNo !== '0' ? FilteredAddLecArray : []} />
        </>
    )
}

export default WeeklyTimetable
