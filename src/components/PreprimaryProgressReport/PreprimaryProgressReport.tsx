
import PrintIcon from '@mui/icons-material/Print';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Grid, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProgressReportDetailsBody, GetStudentDetailsDropdownBody, IGetAllPrimaryClassTeacherssBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAAllPrimaryClassTeachers, CDAProgressReportDetails, CDAStudentDetailsDropdown } from 'src/requests/PreprimaryProgressReport/PreprimaryProgressReport';
import { RootState } from 'src/store';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import CurricularSubjects from './CurricularSubjects';
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
    const USFillStudentsLearningOutcomeObservations: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillStudentsLearningOutcomeObservations);



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
        asStudentId: 0
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
        if (ClassTeacher == '-1' && PreprimaryFullAccess == 'Y') {
            SetError1('Class teacher should be selected.')
        }
        if (ClassTeacher !== '0' && PreprimaryFullAccess == 'Y') {
            SetError1('')
        }
        if (ClassTeacher == '') {
            setOpen(false)
        }
        if (AssessmentId == '') {
            setOpen(false)
        }
        if (StudentId == '') {
            setOpen(false)
        }

        if (AssessmentId !== '0') {
            SetError('')
        }
    }



    //console.log(ClassTeacher, "ClassTeacher", StudentId, "StudentId", AssessmentId, "AssessmentId");

    const countDuplicates = (arr) => {
        const counts = {};
        arr.forEach((item) => {
            counts[item] = (counts[item] || 0) + 1;
        });
        return counts;
    };

    const printRef = useRef<HTMLDivElement>(null);
    const clickPrint = () => {
        let hasError = false;

        if (AssessmentId === '0') {
            SetError('Assessment should be selected.');
            hasError = true;
        }

        if (ClassTeacher === '-1' && PreprimaryFullAccess === 'Y') {
            SetError1('Class teacher should be selected.');
            hasError = true;
        }


        if (printRef.current && !hasError) {
            const printContent = printRef.current.innerHTML;
            const printWindow = window.open('', '', 'height=600,width=800');
            const styles = `
                <style>
                  body {
                    font-family: 'Roboto', sans-serif;
                    margin: 0;
                    padding: 20px;
                  }
                  h1, h2, h3, h4 {
                    margin: 0 0 10px;
                    font-family: 'Roboto', sans-serif;
                  }
                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                  table, th, td {
                    border: 1px solid black;
                  }
                  th, td {
                    padding: 8px;
                    text-align: center;
                  }
                  .MuiTypography-root {
                    font-family: 'Roboto', sans-serif;
                    font-size: 16px;
                    margin-bottom: 8px;
                  }
                  .MuiTableCell-root {
                    font-family: 'Roboto', sans-serif;
                  }
                  .custom-typography {
                    font-family: 'Roboto', sans-serif;
                    color: #38548a;
                    font-size: 24px;
                    margin-top: 16px;
                    text-align: left;
                  }
                </style>
            `;


            printWindow.document.write('<html><head><title>Print</title>' + styles + '</head><body>');

            printWindow.document.write(printContent); // Include the rest of the content
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
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
                    { title: 'Pre Primary Progress Report', path: '/RITeSchool/Teacher/PreprimaryProgressReport' },

                ]}

                rightActions={
                    <>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems="left"
                            gap={1}
                            sx={{
                                mt: { xs: 0, sm: 0 },
                                flexWrap: { xs: 'nowrap', sm: 'nowrap' }
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                            >
                                {
                                    PreprimaryFullAccess == 'Y' && (
                                        <SearchableDropdown
                                            ItemList={PrePrimaryClassTeacher}
                                            sx={{ width: { xs: '70vw', sm: '30vw', md: '17vw' } }}
                                            onChange={clickClassTeacher}
                                            defaultValue={ClassTeacher}
                                            label={'Class Teacher '}
                                            size={"small"}
                                            mandatory
                                        />
                                    )
                                }</Grid>
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                            >
                                <SearchableDropdown
                                    ItemList={USlistStudentNameDetails}
                                    sx={{ width: { xs: '70vw', sm: '30vw', md: '17vw' } }}
                                    onChange={clickStudentId}
                                    defaultValue={StudentId}
                                    label={'Student '}
                                    size={"small"}
                                /></Grid>
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                            >
                                {
                                    PreprimaryFullAccess == 'Y' && (
                                        <SearchableDropdown
                                            ItemList={USlistAssessmentDetailss}
                                            sx={{ width: { xs: '40vw', sm: '20vw', md: '13vw' } }}
                                            onChange={clickAssessmentId}
                                            defaultValue={AssessmentId}
                                            label={'Assessment '}
                                            size={"small"}
                                            mandatory
                                        />
                                    )}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                            >
                                {
                                    PreprimaryFullAccess == 'N' && USlistAssessmentDetailss.length > 1 && (
                                        <SearchableDropdown
                                            ItemList={USlistAssessmentDetailss}
                                            sx={{ width: { xs: '40vw', sm: '20vw', md: '15vw' } }}
                                            onChange={clickAssessmentId}
                                            defaultValue={AssessmentId}
                                            label={'Assessment '}
                                            size={"small"}
                                            mandatory
                                        />
                                    )}
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                gap={1}
                                display="flex"
                                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                            >
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
                            </Grid>

                        </Stack>
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
                        <Box ref={printRef}>
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
                                        {/* <GradeDetails GradeDetailsfilteredAndSortedData={GradeDetailsfilteredAndSortedData} /> */}



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

                                            FillStudentsLearningOutcomeObservations={
                                                USFillStudentsLearningOutcomeObservations}


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
