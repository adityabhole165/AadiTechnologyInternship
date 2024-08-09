
import PrintIcon from '@mui/icons-material/Print';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProgressReportDetailsBody, GetStudentDetailsDropdownBody, IGetAllPrimaryClassTeacherssBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAAllPrimaryClassTeachers, CDAProgressReportDetails, CDAStudentDetailsDropdown } from 'src/requests/PreprimaryProgressReport/PreprimaryProgressReport';
import { RootState } from 'src/store';
import { GetScreenPermission } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
const PreprimaryProgressReport = () => {
    const dispatch = useDispatch();
    const [ClassTeacher, setClassTeacher]: any = useState('0');
    const [StudentId, setStudentId]: any = useState();
    const [AssessmentId, setAssessmentId]: any = useState();
    const [open, setOpen] = useState(false);
    const [Error, SetError] = useState('');


    const PreprimaryFullAccess = GetScreenPermission('Pre-Primary Progress Report');
    console.log(PreprimaryFullAccess, "PreprimaryFullAccess");

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
    const YearwiseStudentId1 = USFillStudentAttendance.map(item => item.YearwiseStudentId);
    const IsPresent = USFillStudentAttendance.map(item => item.IsPresent);
    const GradeDetailsfilteredAndSortedData = USFillGradeDetails.filter(item => item.ConsideredAsAbsent !== "1" && item.ConsideredAsExempted !== "1").sort((a, b) => parseInt(a.SortOrder) - parseInt(b.SortOrder));
    const USFillGradeDetailssortedData = [...USFillSubjectSections].sort((a, b) => parseInt(a.SortOrder) - parseInt(b.SortOrder));
    const USFillStudentsLearningOutcomes: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillStudentsLearningOutcomes);

    const HeaderPublish = [
        { Id: 1, Header: 'Item Code' },
        { Id: 2, Header: 'Item Name' },
        { Id: 3, Header: 'Current Stock' },
        { Id: 4, Header: 'Item Quantity' },
        { Id: 5, Header: 'Original Qty' },
        { Id: 6, Header: 'Issued Qty' },
        { Id: 7, Header: 'Returned Qty' },
        { Id: 8, Header: 'Cancelled Qty' }
    ];



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

    // let matchedOutcomes = [];
    // USFillSubjectSections.forEach(section => {
    //     const matched = USFillStudentsLearningOutcomes.filter(
    //         outcome => outcome.SubjectSectionConfigId === section.SubjectSectionConfigurationId
    //     );
    //     if (matched.length > 0) {
    //         matchedOutcomes = matchedOutcomes.concat(matched);
    //     }
    // });

    //  console.log();

    const USFillGradeDetailssortedDatafiltered = USFillSubjectSections.filter(subjectSection =>
        USFillStudentsLearningOutcomes.some(outcome => outcome.SubjectSectionConfigId === subjectSection.SubjectSectionConfigurationId)
    );

    const clickClassTeacher = (value) => {
        setClassTeacher(value);
        setOpen(false);
    };
    const clickStudentId = (value) => {
        setStudentId(value);
        setOpen(false);
    };

    const clickAssessmentId = (value) => {
        setAssessmentId(value);
        setOpen(false);
    };

    const ClickShow = (value) => {
        setOpen(true)
        if (AssessmentId == '0') {
            SetError('Assessment should be selected')
        }
    }

    const countDuplicates = (arr) => {
        const counts = {};
        arr.forEach((item) => {
            counts[item] = (counts[item] || 0) + 1;
        });
        return counts;
    };

    const IsPresent1 = countDuplicates(IsPresent);
    const TotalAttendance = countDuplicates(YearwiseStudentId1);
    const presentCount = IsPresent1["true"] || '';
    const totalCount = TotalAttendance["38639"] || '';

    const clickPrint = () => {
        window.open('https://schoolwebsite.regulusit.net/RITeSchool/Student/StudentAnnualResultPrint.aspx?eNXR1G7TvKnm53e4OO8B4kK13X5MkQwItrEc3d1VEwmx4YWMbwW4T3xnZE3Dc3QV4xnyziKPOKwj6nT8UFXzenNlqH5PQrTSymfl4ktp7WE/4fc29EcOQXYAkGBiAYJ4ubKxU+rY3xn5qTDv2PMcpA==q');
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


    // useEffect(() => {
    //     if (YearwiseStudentId == YearwiseStudentId1) {

    //     }
    // }, []);



    const combinedData = USFillGradeDetailssortedDatafiltered.map(subjectSection => {
        const outcomes = USFillStudentsLearningOutcomes.filter(outcome => outcome.SubjectSectionConfigId === subjectSection.SubjectSectionConfigurationId);

        return {
            ...subjectSection,  // Include all properties of the subjectSection
            outcomes            // Add the filtered outcomes as a new property
        };
    });

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

                        <SearchableDropdown
                            ItemList={USlistAssessmentDetailss}
                            sx={{ minWidth: '250px' }}
                            onChange={clickAssessmentId}
                            defaultValue={AssessmentId}
                            label={'Assessment '}
                            size={"small"}
                            mandatory
                        />


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
                                    <VisibilityTwoToneIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
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
                        <Tooltip title={'Here you can create, modify, view, approve, denied requisition.'}>
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

            {open && (<div>

                {
                    USFillStudentDetails.length > 0 ?
                        <Box border={1} sx={{ p: 2, background: 'white' }}>
                            <Grid container spacing={3}>
                                {USFillSchoolDetails.map((detail) => (
                                    <Grid item xs={12} key={detail.UserId}>
                                        <Box sx={{
                                            backgroundColor: '#F0F0F0',
                                            textAlign: 'center',
                                        }}>
                                            <hr />
                                            <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={1}>

                                                {detail.OrganizationName}

                                            </Typography>
                                            <hr />
                                            <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={1} >

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

                            <Table>
                                <TableBody>
                                    {USFillStudentDetails.map((detail) => (
                                        <TableRow sx={{ bgcolor: '#38548A' }}>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No :  {detail.RollNo} </b></TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name:  {detail.StudentName} </b></TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class :  {detail.Class} </b></TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year :  {detail.AcademicYear} </b></TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Assessment : {detail.Assessment} </b></TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Attendance :  {presentCount} / {totalCount} </b></TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* <Box sx={{ background: 'white', p: 1, top: '1px' }}>
                                {USFillStudentDetails.map((detail) => (
                                    <Grid container spacing={2}>

                                        <Grid item xs={3} >
                                            <Typography  > Roll No -  {detail.RollNo}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography> Name - {detail.StudentName} </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography>  Class  - {detail.Class}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography>  Year -  {detail.AcademicYear}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>  Assessment - {detail.Assessment}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>  Attendance {presentCount} / {totalCount} </Typography>
                                        </Grid>



                                    </Grid>
                                ))}
                            </Box> */}

                            <Box>
                                <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} my={2} pl={1}>

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
                                                    <TableCell>{row.GradeName}</TableCell>
                                                    <TableCell>{row.Description}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                                <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} marginY={2} pl={1}>

                                    Pre-Primary Curricular Subjects

                                </Typography>

                                <TableContainer component={Box} sx={{ border: '1px solid lightgrey' }} >
                                    <Table aria-label="simple table" >
                                        <TableHead>
                                            <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                                <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Sr. No.</TableCell>
                                                <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Learning Outcome</TableCell>
                                                <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Grade</TableCell>
                                                <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1, width: '200px' }}>Facilitator's Observation</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {combinedData.map(subjectSection => (
                                                <React.Fragment key={subjectSection.SubjectSectionConfigurationId}>
                                                    <TableRow>
                                                        <TableCell sx={{ alignItems: 'right', pl: 70, fontWeight: 'bold' }} colSpan={4}>
                                                            {subjectSection.SubjectSectionName}
                                                        </TableCell>
                                                    </TableRow>

                                                    {subjectSection.outcomes.map((outcome, index) => (
                                                        <TableRow key={outcome.LearningOutcomeConfigId}>
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell>{outcome.LearningOutcome}</TableCell>

                                                            <TableCell>{outcome.ShortName}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </TableBody>

                                    </Table>
                                </TableContainer>


                                <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} marginY={2} pl={1}>

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
                                                <TableCell sx={{
                                                    textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                                    py: 1
                                                }}>Grade</TableCell>
                                                <TableCell sx={{
                                                    textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                                    py: 1
                                                }}>Facilitator's Observation</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {USFillNonXseedSubjectGrades.map((row) => (
                                                <TableRow key={row.YearwiseStudentId}>
                                                    <TableCell>{row.SubjectName}</TableCell>
                                                    <TableCell>{row.ShortName}</TableCell>
                                                    <TableCell>{row.Observation}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                                <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} marginY={2} pl={0}>

                                    {USFillXseedRemarks.map((row) => (
                                        <Box key={row.YearwiseStudentId} sx={{display:'flex', }}>
                                            <Box border={1} sx={{width:'20%', p:1}} >  Remark</Box>
                                            <Box border={1} sx={{width:'100%', p:1}}> {row.Remark}</Box>

                                        </Box>
                                    ))}
                                </Typography>

                                <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} marginY={2} pl={1}>
                                    <Typography>   Note: </Typography>
                                    <Typography> Ab - Absent </Typography>
                                    <Typography>  Ex - Exempted </Typography>
                                </Typography>
                            </Box>


                            {/* <div>
                                {USFillGradeDetailssortedDatafiltered.map(subjectSection => {
                                    const outcomes = USFillStudentsLearningOutcomes.filter(outcome => outcome.SubjectSectionConfigId === subjectSection.SubjectSectionConfigurationId);

                                    return (
                                        <div key={subjectSection.SubjectSectionConfigurationId} style={{ marginBottom: '20px' }}>
                                            <div style={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}>{subjectSection.SubjectSectionName}</div>

                                            {outcomes.map((outcome, index) => (
                                                <div
                                                    key={outcome.LearningOutcomeConfigId}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        paddingLeft: '10px',
                                                        marginTop: '5px'
                                                    }}
                                                >
                                                    <div style={{ textAlign: 'center' }}>{`${index + 1}. ${outcome.LearningOutcome}`}</div>
                                                    <div>{outcome.ShortName}</div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                
                            </div> */}

                        </Box> : <span> </span>
                }
            </div>)}


            {
                AssessmentPublishStatus == 'N' && StudentWiseAssessmentPublishStatus == 'N' ?
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                        <b>Assessment result is not available for this student.</b>
                    </Typography>
                    :
                    <span> </span>
            }

        </Box>


    );
};

export default PreprimaryProgressReport;
