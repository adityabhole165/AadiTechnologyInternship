
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetProgressReportDetailsBody, IGetStandardwiseAssessmentDetailsBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetStandardwiseAssessmentDetails, CDAProgressReportDetails } from 'src/requests/PreprimaryProgressReport/PreprimaryProgressReport';
import { RootState } from 'src/store';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import { CheckCircle, Save } from '@mui/icons-material';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
const StudentwiseprogressreportEdit = () => {
    const dispatch = useDispatch();

    const { Assessment, YearwiseStudentId, StandardId } = useParams();
    const [AssessmentId, setAssessmentId]: any = useState(Assessment);
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
    const USGetStandardwiseAssessmentDetails: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISGetStandardwiseAssessmentDetails);
    console.log(USGetStandardwiseAssessmentDetails, "");


    const GetProgressReportDetailsBody: GetProgressReportDetailsBody =
    {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: Number(YearwiseStudentId),
        asYearwiseStudentId: Number(StandardId),
        asAssessmentId: Number(AssessmentId)

    };

    const GetStandardwiseAssessmentDetailBody: IGetStandardwiseAssessmentDetailsBody =
    {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId: Number(YearwiseStudentId),


    };

    const clickAssessmentId = (value) => {
        setAssessmentId(value);


    };

    useEffect(() => {
        dispatch(CDAProgressReportDetails(GetProgressReportDetailsBody));
    }, [AssessmentId, YearwiseStudentId, StandardId]);

    useEffect(() => {
        dispatch(CDAGetStandardwiseAssessmentDetails(GetStandardwiseAssessmentDetailBody));
    }, [YearwiseStudentId]);

    const XseedGradesList = [
        {
            "Id": "0",
            "Name": "Select",
            "Value": "0"
        },
        {
            "Id": "11",
            "Name": "Excellent - A",
            "Value": "11"
        },
        {
            "Id": "12",
            "Name": "Very Good - A+",
            "Value": "12"
        },
        {
            "Id": "13",
            "Name": "Good - B",
            "Value": "13"
        },
        {
            "Id": "14",
            "Name": "Average - C",
            "Value": "14"
        },
        {
            "Id": "15",
            "Name": "Below Avg - D",
            "Value": "15"
        },
        {
            "Id": "9",
            "Name": "Ab - Absent",
            "Value": "9"
        },
        {
            "Id": "10",
            "Name": "Ex - Exempted",
            "Value": "10"
        }
    ]
    const [headerGrade, setHeaderGrade] = useState("0")
    const [grades, setGrades] = useState({});
    function clickHeaderGrade(value) {
        setHeaderGrade(value)
        const updatedGrades = USFillStudentsLearningOutcomes.reduce((acc, student) => {
            acc[student.LearningOutcomeConfigId] = `${value}-${student.LearningOutcomeGradeId}`;
            return acc;
        }, {});
        setGrades(updatedGrades);
    }


    const clickGrade = (learningOutcomeId, value, gradeConfigId) => {
        setGrades((prevGrades) => ({
            ...prevGrades,
            [learningOutcomeId]: `${value}-${gradeConfigId}`,
        }));
    }

    const [textall, setTextall] = useState('');
    const maxChars = 300;

    const Detailschnageall3 = (event) => {
        if (event.target.value.length <= maxChars) {
            setTextall(event.target.value);
        }
    };


    const clicksave = () => {};
    const Clickpublish = () => {};
    const ClickShow = () => {};
    

    
    return (
        <Box sx={{ px: 2 }}>

            <CommonPageHeader

                navLinks={[
                    { title: 'Student Wise Progress Report ', path: '/extended-sidebar/Teacher/StudentwiseProgressReport' },
                    { title: 'Progress Report', path: '/extended-sidebar/Teacher/PreprimaryProgressReport' },
                ]}

                rightActions={
                    <>

                        <SearchableDropdown
                            ItemList={USGetStandardwiseAssessmentDetails}
                            sx={{ minWidth: '250px' }}
                            onChange={clickAssessmentId}
                            defaultValue={AssessmentId}
                            label={'Assessment'}
                            size={"small"}
                            mandatory
                        />

                               <IconButton
                                onClick={clicksave}
                                sx={{
                                    color: 'white',
                                    backgroundColor: green[500],
                                    height: '36px !important',
                                    ':hover': { backgroundColor: green[600] },
                                    
                                }}
                            >
                                <Save />
                            </IconButton>

                            <Tooltip title={'Publish'}>
                      <IconButton
                        sx={{
                          color: 'white',
                          backgroundColor: blue[500],
                          '&:hover': {
                            backgroundColor: blue[600],
                          },
                        }}
                        onClick={Clickpublish}
                      >
                        <CheckCircle />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={'Show'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
                onClick={ClickShow}>
                <VisibilityTwoToneIcon />
              </IconButton>
            </Tooltip>

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
                            <Grid item xs={12} >
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
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Attendance :  {USFillStudentAttendance.filter(
                                    (attendance) =>
                                        attendance.YearwiseStudentId == detail.YearWiseStudentId &&
                                        attendance.IsPresent == "true"
                                ).length} / {

                                        USFillStudentAttendance.filter(
                                            (item) => item.YearwiseStudentId == detail.YearWiseStudentId
                                        ).length

                                    } </b></TableCell>

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

                <>
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
                                    <TableCell sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', pt: '10px', pb: '10px' }}>
                                        <SearchableDropdown
                                            ItemList={XseedGradesList}
                                            defaultValue={headerGrade}
                                            label={''}
                                            sx={{ maxWidth: '20vw', backgroundColor: 'white', marginLeft: '5px' }}
                                            size={"small"}
                                            DisableClearable={true}
                                            onChange={clickHeaderGrade}
                                            mandatory
                                        />
                                    </TableCell>
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
                                                    <TableBody>
                                                        {outcome.SubjectSectionConfigId === subjectSection.SubjectSectionConfigurationId && (
                                                            <TableRow>
                                                                <TableCell colSpan={3}>
                                                                    <TableBody>
                                                                        <TableRow key={outcome.LearningOutcomeConfigId}>

                                                                            <SearchableDropdown
                                                                                ItemList={XseedGradesList}
                                                                                defaultValue={grades[outcome.LearningOutcomeConfigId]?.split('-')[0]}
                                                                                label={''}
                                                                                sx={{ width: '20vw', backgroundColor: 'white' }}
                                                                                size={"small"}
                                                                                DisableClearable={true}
                                                                                onChange={(value) => clickGrade(outcome.LearningOutcomeConfigId, value, outcome.LearningOutcomeGradeId)}
                                                                                mandatory
                                                                            />
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </TableRow>
                                            ))}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>

                <div>
                    <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} mt={2} >
                        Co-CurricularSubjects
                    </Typography>
                    <TableContainer component={Box} >
                        <Table aria-label="simple table" sx={{ border: '1px solid lightgrey' }}>
                            <TableHead>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                    <TableCell sx={{
                                        textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                        py: 1
                                    }}>Subject</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', pt: '10px', pb: '10px' }}>
                                        <SearchableDropdown
                                            ItemList={XseedGradesList}
                                            defaultValue={headerGrade}
                                            label={''}
                                            sx={{ maxWidth: '20vw', backgroundColor: 'white', marginLeft: '5px' }}
                                            size={"small"}
                                            DisableClearable={true}
                                            onChange={clickHeaderGrade}
                                            mandatory
                                        />
                                    </TableCell>
                                    <TableCell sx={{
                                        textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                        py: 1
                                    }}>Facilitator's Observation</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {USFillNonXseedSubjectGrades.map((row) => (
                                    <TableRow key={row.YearwiseStudentId}>
                                        <TableCell sx={{ py: 1 }}>{row.SubjectName}</TableCell>
                                        <TableCell key={row.LearningOutcomeConfigId}>

                                            <SearchableDropdown
                                                ItemList={XseedGradesList}
                                                defaultValue={grades[row.LearningOutcomeConfigId]?.split('-')[0]}
                                                label={''}
                                                sx={{ width: '20vw', backgroundColor: 'white' }}
                                                size={"small"}
                                                DisableClearable={true}
                                                onChange={(value) => clickGrade(row.LearningOutcomeConfigId, value, row.LearningOutcomeGradeId)}
                                                mandatory
                                            />
                                        </TableCell>
                                        <TableCell sx={{ py: 1 }}>{row.Observation}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>



                <Box>
                    <TextField
                        label={
                            <span>
                                Remark <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        multiline
                        value={textall}
                        onChange={Detailschnageall3}
                        fullWidth
                    />
                    <Typography variant="caption" align="right" display="block" color="textSecondary">
                       ({maxChars - textall.length} ) 
                    </Typography>
                </Box>

            </Box>

        </Box>

    );
};
export default StudentwiseprogressreportEdit;
