
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetProgressReportDetailsBody, GetStudentDetailsDropdownBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAProgressReportDetails, CDAStudentDetailsDropdown } from 'src/requests/PreprimaryProgressReport/PreprimaryProgressReport';
import { RootState } from 'src/store';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import CurricularSubjects from '../PreprimaryProgressReport/CurricularSubjects';
import NonXseedSubjectGrades from '../PreprimaryProgressReport/NonXseedSubjectGrades';
import SchoolDetails from '../PreprimaryProgressReport/SchoolDetails';
import StudentDetails from '../PreprimaryProgressReport/StudentDetails';
import XseedRemarks from '../PreprimaryProgressReport/XseedRemarks';
import { IGetAssessmentDropdownBody } from 'src/interfaces/StudentWiseProgressReport/IStudentWiseProgressReport';
import { CDAAssessmentDropdown } from 'src/requests/StudentWiseProgressReport/ReqStudentWiseProgressReport';

const PreprimaryProgressReportView = () => {
    const { Assessment, YearwiseStudentId, StandardId } = useParams();
    console.log(Assessment, "Assessment");

    const dispatch = useDispatch();
    const [ClassTeacher, setClassTeacher]: any = useState('-1');
    const [StudentId, setStudentId]: any = useState();
    const [AssessmentId, setAssessmentId]: any = useState(Assessment);


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

    const USAssessmentDrop = useSelector((state: RootState) => state.Studentwiseprogress.ISAssessmentDropdown);

    
    const GetProgressReportDetailsBody: GetProgressReportDetailsBody =
    {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: Number(YearwiseStudentId),
        asYearwiseStudentId: Number(StandardId),
        asAssessmentId: AssessmentId

    };

    


    const GetAssessmentDropdown_Body: IGetAssessmentDropdownBody = {
        asAcademicYearId: Number(asAcademicYearId),
        asSchoolId: Number(asSchoolId),
      };

    const clickAssessmentId = (value) => {
        setAssessmentId(value);

    };

   


    useEffect(() => {
        dispatch(CDAAssessmentDropdown(GetAssessmentDropdown_Body));
      }, []);

    useEffect(() => {
        dispatch(CDAProgressReportDetails(GetProgressReportDetailsBody));
    }, [YearwiseStudentId, StandardId, AssessmentId])

    return (
        <Box sx={{ px: 2 }}>

            <CommonPageHeader
                navLinks={[
                    { title: 'Student Wise Progress Report ', path: '/extended-sidebar/Teacher/StudentwiseProgressReport' },
                    { title: ' Progress Report ', path: '' }
                ]}
                rightActions={
                    <>



                        <SearchableDropdown
                            sx={{ minWidth: '15vw' }}
                            ItemList={USAssessmentDrop}
                            onChange={clickAssessmentId}
                            label={'Assessment:'}
                            defaultValue={Assessment}
                            mandatory
                            size={"small"}
                        />

                    </>}

            />




            <Box>
                {USFillStudentDetails.length > 0 && StudentWiseAssessmentPublishStatus == "Y" ? (
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
                            <div>
                                <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} mt={2}>

                                    Key to Curricular and Co-Curricular

                                </Typography>
                                <TableContainer component={Box} >
                                    <Table aria-label="simple table" sx={{ border: '1px solid lightgrey' }}>
                                        <TableHead>
                                            <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                                <TableCell sx={{
                                                    textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                                    py: 1
                                                }}>Grade Name</TableCell>
                                                <TableCell sx={{
                                                    textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                                    py: 1
                                                }}>Description</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {GradeDetailsfilteredAndSortedData.map((row) => (
                                                <TableRow key={row.GradeId}>
                                                    <TableCell sx={{ py: 1 }}>{row.Name}</TableCell>
                                                    <TableCell sx={{ py: 1 }}>{row.Description}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box mt={1}>
                                    <Table aria-label="simple table" sx={{ border: '1px solid lightgrey' }}>
                                        <TableBody>
                                            <TableRow sx={{ bgcolor: '#F0F0F0', border: '1px solid lightgrey' }}>
                                                <TableCell sx={{ textAlign: 'left', py: 1, color: 'black', p: 1 }}><b>Note :&nbsp; </b> Ab - Absent &nbsp; &nbsp; &nbsp;  Ex - Exempted </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </div>
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


                {StudentWiseAssessmentPublishStatus == "N" ?

                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                        <b>Assessment result is not available for this student.</b>
                    </Typography>

                    : <span></span>
                }
            </Box>



        </Box>
    );
};
export default PreprimaryProgressReportView;
