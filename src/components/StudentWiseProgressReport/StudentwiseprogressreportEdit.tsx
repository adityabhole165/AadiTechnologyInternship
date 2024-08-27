
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetProgressReportDetailsBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAProgressReportDetails } from 'src/requests/PreprimaryProgressReport/PreprimaryProgressReport';
import { RootState } from 'src/store';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';

const StudentwiseprogressreportEdit = () => {
    const dispatch = useDispatch();

    const { Assessment, YearwiseStudentId, StandardId } = useParams();
    const [AssessmentId, setAssessmentId]: any = useState();
    const [Error, SetError] = useState('')
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


    const GetProgressReportDetailsBody: GetProgressReportDetailsBody =
    {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: Number(YearwiseStudentId),
        asYearwiseStudentId: Number(StandardId),
        asAssessmentId: Number(Assessment)

    };

    const clickAssessmentId = (value) => {
        setAssessmentId(value);
        SetError('')

    };

    useEffect(() => {
        dispatch(CDAProgressReportDetails(GetProgressReportDetailsBody));
    }, [AssessmentId, YearwiseStudentId, StandardId]);



    return (
        <Box sx={{ px: 2 }}>

            <CommonPageHeader
                navLinks={[
                    { title: 'Progress Report', path: '/extended-sidebar/Teacher/PreprimaryProgressReport' },

                ]}

                rightActions={
                    <>

                        <SearchableDropdown
                            ItemList={USlistAssessmentDetailss}
                            sx={{ minWidth: '250px' }}
                            onChange={clickAssessmentId}
                            defaultValue={AssessmentId}
                            label={'Assessment '}
                            size={"small"}
                            mandatory
                        />



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



                    </>}
            />

            <ErrorMessage1 Error={Error}></ErrorMessage1>
            <ErrorMessage1 Error={Error1}></ErrorMessage1>



            <Box border="1px solid grey" mb={4} sx={{ px: 2, background: 'white' }}>


                <Box sx={{ pt: 2, background: 'white' }}>
                    <Grid container spacing={3}>
                        {USFillSchoolDetails.map((detail) => (
                            <Grid item xs={12} key={detail.UserId}>
                                <Box sx={{
                                    backgroundColor: '#F0F0F0',
                                    textAlign: 'center',
                                    borderLeft: '1px solid grey',
                                    borderRight: '1px solid grey'
                                }} >
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={0}>

                                        {detail.OrganizationName}

                                    </Typography>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={0} >

                                        {detail.School_Name}

                                    </Typography>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={0}>

                                        Progress Report

                                    </Typography>
                                    <hr />


                                </Box>


                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Table>
                    <TableBody>
                        {USFillStudentDetails.map((detail) => (
                            <TableRow sx={{ bgcolor: '#38548A' }}>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No :  {detail.RollNo} </b></TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name:  {detail.StudentName} </b></TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class :  {detail.Class} </b></TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year :  {detail.AcademicYear} </b></TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Assessment : {detail.Assessment} </b></TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Attendance :  {USFillStudentAttendance} / {USFillStudentAttendance} </b></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

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
                                        <TableCell sx={{ py: 1 }}>{row.GradeName}</TableCell>
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




                <div>
                    <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} mt={2}>
                        Pre-Primary Curricular Subjects
                    </Typography>

                    <TableContainer component={Box} sx={{ border: '1px solid lightgrey' }} >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                    <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Sr. No.</TableCell>
                                    <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Learning Outcome</TableCell>
                                    <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Grade</TableCell>
                                    {/* <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1, width: '200px' }}>Facilitator's Observation</TableCell> */}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {USFillSubjectSections.map(subjectSection => (
                                    <React.Fragment key={subjectSection.SubjectSectionConfigurationId}>
                                        <TableRow sx={{ backgroundColor: '#F0F0F0', alignItems: 'center' }}>
                                            <TableCell sx={{ py: 1.5, fontWeight: 'bold' }} colSpan={4}>
                                                {subjectSection.SubjectSectionName}
                                            </TableCell>
                                        </TableRow>

                                        {USFillStudentsLearningOutcomes.filter(outcome => outcome.SubjectSectionConfigId == subjectSection.SubjectSectionConfigurationId)
                                            .map((outcome, index) => (
                                                <TableRow key={outcome.YearwiseStudentId}>
                                                    <TableCell sx={{ py: 1 }}>{index + 1}</TableCell>
                                                    <TableCell sx={{ py: 1 }}>{outcome.LearningOutcome}</TableCell>
                                                    <TableCell sx={{ py: 1, borderRight: '1px solid lightgrey' }}>{outcome.ShortName}</TableCell>
                                                </TableRow>
                                            ))}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </Box>

        </Box>

    );
};
export default StudentwiseprogressreportEdit;
