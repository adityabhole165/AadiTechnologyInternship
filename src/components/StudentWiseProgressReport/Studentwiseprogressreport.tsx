import AddTwoTone from '@mui/icons-material/AddTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import {
    Box,
   IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  IClassDropDownBody,
  IClassTeacherDropdownBody,
  IGetTeacherSubjectDetailsBody,
  ITeacherDropdownBody
} from 'src/interfaces/AssignHomework/IAssignHomework';
import Assignhomeworklist from 'src/libraries/ResuableComponents/Assignhomeworklist';


import {
    IDeleteAllStudentTestMarksBody,
    IGetAllPrimaryClassTeachersBody,
    IGetAssessmentDropdownBody,
    IGetPagedStudentsForMarkAssignmentBody,
    IGetPublishStatusBody,
    IPublishUnpublishXseedResultBody,
    IoneDeleteStudentTestMarksBody
} from 'src/interfaces/StudentWiseProgressReport/IStudentWiseProgressReport';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { GetStudentResultList } from 'src/requests/StudentWiseProgressReport/ReqStudentWiseProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const Studentwiseprogressreport = () => {
    const dispatch = useDispatch();
    const PrimaryTeacher = useSelector((state: RootState) => state.Studentwiseprogress.PrimaryClassTeacher);
    const AssessmentDrop = useSelector((state: RootState) => state.Studentwiseprogress.AssessmentDropdown);
    const StudentAssignment = useSelector((state: RootState) => state.Studentwiseprogress.StudentsAssignment);
    const StudentGrade = useSelector((state: RootState) => state.Studentwiseprogress.StudentsAssignmentGrade);
    const oneDeleteStud = useSelector((state: RootState) => state.Studentwiseprogress.oneDeleteStudent);
    const DeleteAllStud = useSelector((state: RootState) => state.Studentwiseprogress.DeleteAllStudent);
    const PublishStatu = useSelector((state: RootState) => state.Studentwiseprogress.PublishStatus);
    const PublishUnpublish = useSelector((state: RootState) => state.Studentwiseprogress.PublishUnpublishXseed);
    const loading = useSelector((state: RootState) => state.Studentwiseprogress.Loading);

    const TeacherId = Number(sessionStorage.getItem('TeacherId'));
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const RoleId = sessionStorage.getItem('RoleId');
    const asStandardId = sessionStorage.getItem('StandardId');

    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const ScreensAccessPermission = JSON.parse(sessionStorage.getItem('ScreensAccessPermission'));

    const GetScreenPermission = () => {
        let perm = 'N';
        ScreensAccessPermission?.map((item) => {
            if (item.ScreenName === 'Student wise Progress Report ') perm = item.IsFullAccess;
        });
        return perm;
    };

    const [SelectTeacher, setSelectTeacher] = useState(GetScreenPermission() !== 'Y' ? TeacherId : null);
    const [Assessment, setAssessment] = useState();
    const [std, setstd] = useState();
    const [StudentAssig, setStudentAssig] = useState();
    const [StudentGrad, setStudentGrad] = useState();
    const [oneDelete, setoneDelete] = useState();
    const [DeleteAll, setDeleteAll] = useState();
    const [ublishS, setublishS] = useState();
    const [PublishUn, setPublishUn] = useState();

    const getPrimaryTeacher_body: IGetAllPrimaryClassTeachersBody = {
        asSchoolId: Number(asSchoolId),
        asAcadmicYearId: Number(asAcademicYearId),
        asTeacher_id: SelectTeacher
    };

    const GetAssessmentDropdown_Body: IGetAssessmentDropdownBody = {
        asAcadmicYearId: Number(asAcademicYearId),
        asSchoolId: Number(asSchoolId),
    };

    const GetPagedStudentsForMarkAssignment_Body: IGetPagedStudentsForMarkAssignmentBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asStandardDivId: Number(std),
        asAssessmentId: Assessment,
        asStartIndex: 0,
        asEndIndex: 20,
        asSortExp: StudentAssig
    }

    const oneDeleteStudentTestMarks_Body: IoneDeleteStudentTestMarksBody = {
        asAcadmicYearId: Number(asAcademicYearId),
        asSchoolId: Number(asSchoolId),
        asAssessmentId: Assessment,
        asStudentId: StudentAssig,
        asUpdatedById: SelectTeacher
    }

    const DeleteAllStudentTestMarksBody: IDeleteAllStudentTestMarksBody = {
        asAcadmicYearId: Number(asAcademicYearId),
        asSchoolId: Number(asSchoolId),
        asAssessmentId: Assessment,
        asStudentId: StudentAssig,
        asUpdatedById: SelectTeacher
    }

    const GetPublishStatusBody: IGetPublishStatusBody = {
        asAcadmicYearId: Number(asAcademicYearId),
        asSchoolId: Number(asSchoolId),
        asStandardDivId: SelectTeacher,
        asAssessmentId: Assessment,
    }

    const PublishUnpublishXseedResultBody: IPublishUnpublishXseedResultBody = {
        asAcadmicYearId: Number(asAcademicYearId),
        asSchoolId: Number(asSchoolId),
    }

    useEffect(() => {
        dispatch(GetStudentResultList(getPrimaryTeacher_body));
    }, [dispatch, SelectTeacher]);

    const clickTeacherDropdown = (event) => {
        setSelectTeacher(event.target.value === '' ? null : event.target.value);
    };

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Student wise Progress Report ', path: '/extended-sidebar/Teacher/StudentwiseProgressReport' }
                ]}
                rightActions={
                    <>
                        <SearchableDropdown
                            sx={{ minWidth: '25vw', bgcolor: GetScreenPermission() === 'N' ? '#f0e68c' : 'inherit' }}
                            ItemList={PrimaryTeacher}
                            onChange={clickTeacherDropdown}
                            label={'Select Teacher'}
                            defaultValue={SelectTeacher?.toString()}
                            mandatory
                            size={"small"}
                            DisableClearable={GetScreenPermission() === 'N'}
                            disabled={GetScreenPermission() === 'N'}
                        />
                    </>
                }
            />
        </Box>
    );
}

export default Studentwiseprogressreport;
