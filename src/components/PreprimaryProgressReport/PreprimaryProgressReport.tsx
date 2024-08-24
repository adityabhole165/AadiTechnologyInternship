
import PrintIcon from '@mui/icons-material/Print';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Visibility from '@mui/icons-material/Visibility';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProgressReportDetailsBody, GetStudentDetailsDropdownBody, IGetAllPrimaryClassTeacherssBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAAllPrimaryClassTeachers, CDAProgressReportDetails, CDAStudentDetailsDropdown } from 'src/requests/PreprimaryProgressReport/PreprimaryProgressReport';
import { RootState } from 'src/store';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import CurricularSubjects from './CurricularSubjects';
import GradeDetails from './GradeDetails';
import NonXseedSubjectGrades from './NonXseedSubjectGrades';
import SchoolDetails from './SchoolDetails';
import StudentDetails from './StudentDetails';
import XseedRemarks from './XseedRemarks';
const PreprimaryProgressReport = () => {
    const dispatch = useDispatch();
    const [ClassTeacher, setClassTeacher]: any = useState('-1');
    const [StudentId, setStudentId]: any = useState();
    const [AssessmentId, setAssessmentId]: any = useState();

    const [open, setOpen] = useState(false);
    const [Error, SetError] = useState('');
    const [Error1, SetError1] = useState('');
    let PreprimaryFullAccess = getSchoolConfigurations(164)
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asStandardDivisionId = Number(
        sessionStorage.getItem('StandardDivisionId')
    );
    const USAllPrimaryClassTeacherssBody: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISAllPrimaryClassTeacherss);
    const PrePrimaryClassTeacher = USAllPrimaryClassTeacherssBody.filter((teacher: any) => teacher.Is_PrePrimary === 'Y');
    const USlistStudentNameDetails: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISlistStudentNameDetails);
    const USlistAssessmentDetailss: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISlistAssessmentDetailss);
    console.log(USlistAssessmentDetailss, "USlistAssessmentDetailss");

    const USAssessmentPublishStatus: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISAssessmentPublishStatus);
    const AssessmentPublishStatus = USAssessmentPublishStatus.map(item => item.AssessmentPublishStatus);
    const StudentWiseAssessmentPublishStatus = USAssessmentPublishStatus.map(item => item.StudentWiseAssessmentPublishStatus);
    const USFillStandardwiseSubjects: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillStandardwiseSubjects);
    const USFillSubjectSections: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillSubjectSections);
    const USFillSchoolDetails: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillSchoolDetails);
    const USFillGradeDetails: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillGradeDetails);
    const USFillXseedRemarks: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillXseedRemarks);
    const USFillNonXseedSubjectGrades: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillNonXseedSubjectGrades);
    const USFillStudentDetails: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillStudentDetails);
    const USFillStudentAttendance: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillStudentAttendance);
    const GradeDetailsfilteredAndSortedData = USFillGradeDetails.filter(item => item.ConsideredAsAbsent !== "1" && item.ConsideredAsExempted !== "1").sort((a, b) => parseInt(a.SortOrder) - parseInt(b.SortOrder));
    const USFillStudentsLearningOutcomes: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillStudentsLearningOutcomes);



    const AllPrimaryClassTeachersBody: IGetAllPrimaryClassTeacherssBody =
    {
        asSchoolId: asSchoolId,
        asAcadmicYearId: asAcademicYearId,
        asTeacher_id: 0,

    };
    const StudentDetailsDropdownBody: GetStudentDetailsDropdownBody =
    {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: PreprimaryFullAccess == 'Y' ? ClassTeacher : asStandardDivisionId,

    };
    const GetProgressReportDetailsBody: GetProgressReportDetailsBody =
    {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: PreprimaryFullAccess == 'Y' ? ClassTeacher : asStandardDivisionId,
        asYearwiseStudentId: StudentId,
        asAssessmentId: AssessmentId

    };



    const clickClassTeacher = (value) => {
        setClassTeacher(value);
        SetError1('')
        setOpen(false);
    };
    const clickStudentId = (value) => {
        setStudentId(value);
        setOpen(false);
    };

    const clickAssessmentId = (value) => {
        setAssessmentId(value);
        SetError('')
        setOpen(false);
    };

    const ClickShow = (value) => {
        setOpen(true)
        if (AssessmentId == '0') {
            SetError('Assessment should be selected.')
        }
        if (ClassTeacher == '0' && PreprimaryFullAccess == 'Y') {
            SetError1('Class teacher should be selected.')
        }
        if (ClassTeacher !== '0' && PreprimaryFullAccess == 'Y') {
            SetError1('')
        }


        if (AssessmentId !== '0') {
            SetError('')
        }
    }

    const countDuplicates = (arr) => {
        const counts = {};
        arr.forEach((item) => {
            counts[item] = (counts[item] || 0) + 1;
        });
        return counts;
    };


    const clickPrint = () => {
        let hasError = false;

        if (AssessmentId === '0') {
            SetError('Assessment should be selected.');
            hasError = true;
        }

        if (ClassTeacher === '0' && PreprimaryFullAccess === 'Y') {
            SetError1('Class teacher should be selected.');
            hasError = true;
        }

        if (!hasError) {
            window.open('https://schoolwebsite.regulusit.net/RITeSchool/Student/StudentAnnualResultPrint.aspx?eNXR1G7TvKnm53e4OO8B4kK13X5MkQwItrEc3d1VEwmx4YWMbwW4T3xnZE3Dc3QV4xnyziKPOKwj6nT8UFXzenNlqH5PQrTSymfl4ktp7WE/4fc29EcOQXYAkGBiAYJ4ubKxU+rY3xn5qTDv2PMcpA==q');
        }
    };


    useEffect(() => {
        dispatch(CDAAllPrimaryClassTeachers(AllPrimaryClassTeachersBody));
    }, []);
    useEffect(() => {
        dispatch(CDAStudentDetailsDropdown(StudentDetailsDropdownBody));
    }, [ClassTeacher]);
    useEffect(() => {
        dispatch(CDAProgressReportDetails(GetProgressReportDetailsBody));
    }, [AssessmentId, StudentId, ClassTeacher, asStandardDivisionId]);
    useEffect(() => {
        if (USlistStudentNameDetails.length > 0) {
            setStudentId(USlistStudentNameDetails[0].Value);
        }
    }, [USlistStudentNameDetails]);
    useEffect(() => {
        if (USlistAssessmentDetailss.length > 0) {
            setAssessmentId(USlistAssessmentDetailss[0].Value);
        }
    }, [USlistAssessmentDetailss]);




    return (
        <Box sx={{ px: 2 }}>

            <CommonPageHeader
                navLinks={[
                    { title: 'Pre Primary Progress Report', path: '/extended-sidebar/Teacher/PreprimaryProgressReport' },

                ]}

                rightActions={
                    <>
                        {
                            PreprimaryFullAccess == 'Y' ?
                                <SearchableDropdown
                                    ItemList={PrePrimaryClassTeacher}
                                    sx={{ minWidth: '250px' }}
                                    onChange={clickClassTeacher}
                                    defaultValue={ClassTeacher}
                                    label={'Class Teacher '}
                                    size={"small"}
                                    mandatory
                                />
                                : <span></span>

                        }

                        <SearchableDropdown
                            ItemList={USlistStudentNameDetails}
                            sx={{ minWidth: '250px' }}
                            onChange={clickStudentId}
                            defaultValue={StudentId}
                            label={'Student '}
                            size={"small"}
                        />





                        {
                            PreprimaryFullAccess == 'Y' ?
                                <SearchableDropdown
                                    ItemList={USlistAssessmentDetailss}
                                    sx={{ minWidth: '250px' }}
                                    onChange={clickAssessmentId}
                                    defaultValue={AssessmentId}
                                    label={'Assessment '}
                                    size={"small"}
                                    mandatory
                                />
                                : <span></span>

                        }

                        {
                            PreprimaryFullAccess == 'N' && USlistAssessmentDetailss.length > 1 ?
                                <SearchableDropdown
                                    ItemList={USlistAssessmentDetailss}
                                    sx={{ minWidth: '250px' }}
                                    onChange={clickAssessmentId}
                                    defaultValue={AssessmentId}
                                    label={'Assessment '}
                                    size={"small"}
                                    mandatory
                                />
                                : <span></span>

                        }




                        <Box>
                            <Tooltip title={'Show'}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: blue[500],
                                        '&:hover': {
                                            backgroundColor: blue[600]
                                        }
                                    }}
                                    onClick={ClickShow}>
                                    <Visibility />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Tooltip title={'Displays xseed progress report of selected assessment.'}>
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
                        <Box>
                            <Tooltip title={'Print Preview'}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: blue[500],
                                        '&:hover': {
                                            backgroundColor: blue[600]
                                        }
                                    }}
                                    onClick={clickPrint}>
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>


                    </>}
            />

            <ErrorMessage1 Error={Error}></ErrorMessage1>
            <ErrorMessage1 Error={Error1}></ErrorMessage1>

            {open && (
                PreprimaryFullAccess == 'Y' && ClassTeacher == '0' || AssessmentId == '0' ? (
                    <div></div>
                ) : (
                    AssessmentPublishStatus == 'N' && StudentWiseAssessmentPublishStatus == 'N' ? (
                        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                            <b>Assessment result is not available for this student.</b>
                        </Typography>
                    ) : (
                        <Box>
                            {USFillStudentDetails.length > 0 ? (
                                USFillStudentDetails.map((detail) => (
                                    <Box key={detail.YearWiseStudentId} border="1px solid grey" mb={4} sx={{ px: 2, background: 'white' }}>
                                        <SchoolDetails USFillSchoolDetails={USFillSchoolDetails} />
                                        <StudentDetails
                                            USFillStudentDetails={USFillStudentDetails.filter(
                                                (item) => item.YearWiseStudentId == detail.YearWiseStudentId
                                            )}
                                            presentCount={USFillStudentAttendance.filter(
                                                (attendance) =>
                                                    attendance.YearwiseStudentId == detail.YearWiseStudentId &&
                                                    attendance.IsPresent == "true"
                                            ).length}
                                            totalCount={USFillStudentAttendance.filter(
                                                (item) => item.YearwiseStudentId == detail.YearWiseStudentId
                                            ).length}
                                        />
                                        <GradeDetails GradeDetailsfilteredAndSortedData={GradeDetailsfilteredAndSortedData} />
                                        <CurricularSubjects
                                            USFillStudentsLearningOutcomes={USFillStudentsLearningOutcomes.filter(
                                                (item) => item.YearwiseStudentId == detail.YearWiseStudentId
                                            )}
                                            USFillSubjectSections={USFillSubjectSections}
                                        />
                                        <NonXseedSubjectGrades
                                            USFillNonXseedSubjectGrades={USFillNonXseedSubjectGrades.filter(
                                                (item) => item.YearwiseStudentId == detail.YearWiseStudentId
                                            )}
                                        />
                                        <XseedRemarks
                                            USFillXseedRemarks={USFillXseedRemarks.filter(
                                                (item) => item.YearWiseStudentId == detail.YearWiseStudentId
                                            )}
                                        />
                                    </Box>
                                ))
                            ) : null}
                        </Box>
                    )
                )
            )}
            {PreprimaryFullAccess == 'N' && USlistAssessmentDetailss.length < 2 ?

                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                    <b>Published assessments are not available.</b>
                </Typography>

                : <span></span>
            }
        </Box>
    );
};
export default PreprimaryProgressReport;
