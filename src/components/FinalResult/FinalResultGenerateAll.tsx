import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    IGetGenerateAllStudentBody, IGetStudentPrrogressReportBody, IUpdateStudentTestMarksBody, IViewBody
} from 'src/interfaces/FinalResult/IFinalResultGenerateAll';
import {
    GenerateAllGA,
    StudentDetailsGA,
    UpdateStudentTestMarks, ViewResultGA
} from 'src/requests/FinalResult/RequestFinalResultGenerateAll';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const GenerateAll = ({ }) => {
    const [isResultGenerated, setIsResultGenerated] = useState(false); // State to track result generation
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { asStudentId, isGenerated, IsView } = useParams();
    console.log("asStudentId", asStudentId);

    const asAcadmeicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asUserId = Number(localStorage.getItem('UserId'));

    const StudentDetailsUS = useSelector((state: RootState) => state.FinalResultGenerateAll.getStudentDetails);
    const ExamDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getExamDetails);
    const TestMarksDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getTestMarksGA);
    const GenerateAllUS = useSelector((state: RootState) => state.FinalResultGenerateAll.getGenerateAll);
    const SubjectDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getSubjectDetails);
    console.log(SubjectDetails, 'SubjectDetails');
    const ShortenTestDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getShortenTestDetails);

    const ViewProgress = useSelector((state: RootState) => state.FinalResultGenerateAll.getViewResult);
    const MarkDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getMarkDetailsView);
    const SubjectDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getSubjectDetailsView);
    const GradesDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getGradesDetailsView);

    useEffect(() => {
        const GetStudentPrrogressReportBody: IGetStudentPrrogressReportBody = {
            asSchoolId: Number(asSchoolId),
            asAcadmeicYearId: Number(asAcadmeicYearId),
            asStudentId: Number(asStudentId),
            asUserId: Number(asUserId)
        };
        dispatch(StudentDetailsGA(GetStudentPrrogressReportBody));
    }, []);

    useEffect(() => {
        const GetGenerateAllBody: IGetGenerateAllStudentBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcadmeicYearId),
            asStudentId: Number(asStudentId),
            asUserId: Number(asUserId)
        };
        dispatch(GenerateAllGA(GetGenerateAllBody));
    }, []);

    useEffect(() => {
        const GetViewResultBody: IViewBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcadmeicYearId),
            asStudentId: Number(asStudentId),
            asWithGrace: 0,
        };
        dispatch(ViewResultGA(GetViewResultBody));
    }, []);

    const onClickClose = () => {
        navigate('/extended-sidebar/Teacher/FinalResult');
    };


    // const getXML = () => {
    //     console.log(Itemlist, '----');
    //     let sXML =
    //       "<ArrayOfStudentInfoForHeightWeight xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'>";
    //     Itemlist.map((Item) => {
    //       sXML =
    //         sXML +
    //         '<StudentInfoForHeightWeight><RollNo>' +
    //         Item.Text1 +
    //         '</RollNo><YearWiseStudentId>' +
    //         Item.Text6 +
    //         '</YearWiseStudentId><Height>' +
    //         (Item.Text3 === "" ? "0" : Item.Text3) +
    //         '</Height><Weight>' +
    //         (Item.Text4 === "" ? "0" : Item.Text4) +
    //         '</Weight><IsLeftStudent>' +
    //         Item.Text5 +
    //         '</IsLeftStudent></StudentInfoForHeightWeight>';
    //     });
    //     sXML = sXML + '</ArrayOfStudentInfoForHeightWeight>';

    //     console.log('XMLLLLLLLL', sXML);
    //     return sXML;
    //   };

    const onSaveGenerate = () => {
        const UpdateStudentTestMarksBody: IUpdateStudentTestMarksBody = {
            asschoolId: Number(asSchoolId),
            asStudentMarkDetails: '',
            asUpdatedById: 0,
            asUseAvarageFinalResult: ""
        };
        dispatch(UpdateStudentTestMarks(UpdateStudentTestMarksBody));
        setIsResultGenerated(true); // Set the result as generated

        const GetViewResultBody: IViewBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcadmeicYearId),
            asStudentId: Number(asStudentId),
            asWithGrace: 1,
        };
        dispatch(ViewResultGA(GetViewResultBody));
    };

    // const handleVisibilityClick = () => {
    //     setShowProgressReport(!showProgressReport); // Toggle visibility
    // }

    const getStudentGrade = () => {
        let returnVal = true
        TestMarksDetails.map((item) => {
            if (item.Grade == 'Absent') {
                returnVal = false
            }
            else {
                returnVal = true
            }
        })
        return returnVal
    }
    const Grade = getStudentGrade();
    console.log(Grade, 'getStudentGradeeeee');


    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Final Result',
                        path: '/extended-sidebar/Teacher/FinalResult'
                    },
                    {
                        title: 'Generate/View Final Result',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <Box>
                            <Tooltip title={"View result of selected student."}>
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
                        </Box>                    </>
                }
            />
            {StudentDetailsUS && (

                //  {showProgressReport && (
                <div>
                    {(IsView == 'false' && isGenerated) && (
                        <div>
                            <Box sx={{ background: 'white' }}>
                                <Box>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"primary"}>
                                        Pawar Public Charitable Trust's
                                    </Typography>
                                    <hr />
                                    <Typography variant={"h3"} textAlign={'center'} color={"primary"} mb={1}>
                                        PAWAR PUBLIC SCHOOL
                                    </Typography>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"primary"} mb={1}>
                                        Progress Report
                                    </Typography>
                                    <hr />
                                    <Typography variant={"h4"} mb={1}>Student Details</Typography>
                                    <Table>
                                        <TableBody>
                                            {StudentDetailsUS.map((item) => {
                                                return (
                                                    <TableRow sx={{ bgcolor: 'grey.200' }} key={item.Text1}>
                                                        <TableCell><b>Roll No:</b>{item.Text2}</TableCell>
                                                        <TableCell><b>Name:</b>{item.Text1}</TableCell>
                                                        <TableCell><b>Class:</b>{item.Text3} - {item.Text4}</TableCell>
                                                        <TableCell><b>Year:</b>{item.Text5}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                    <Box sx={{ overflowX: 'auto' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow sx={{ bgcolor: '#b3e5fc' }}>
                                                    <TableCell rowSpan={2}>
                                                        <Typography variant={"h3"} textAlign={'left'} color={"primary"} ml={9} >
                                                            Subjects &#9654;
                                                        </Typography>
                                                        <Typography variant={"h3"} textAlign={'left'} color={"primary"}>
                                                            &#9660; Exam
                                                        </Typography></TableCell>
                                                    {SubjectDetails.map((item) => (
                                                        // <TableCell><b>{item.Name}</b></TableCell>
                                                        <TableCell>
                                                            <Typography color="#42a5f5" textAlign={'left'} mr={8}  >
                                                                <b style={{ marginRight: "9px" }}>{item.Name}</b>
                                                            </Typography></TableCell>
                                                    ))}
                                                </TableRow>
                                                <TableRow>
                                                    {ShortenTestDetails.map((item) => (
                                                        <TableCell >
                                                            <Typography color="#42a5f5" textAlign={'left'} mr={8}  >
                                                                <b style={{ marginRight: "9px" }}>{item.Name}</b>
                                                            </Typography>
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            {ExamDetails.map((testItem) => (
                                                <TableBody key={testItem.Id}>
                                                    <TableRow>
                                                        <TableRow>{testItem.Name}</TableRow>
                                                        {TestMarksDetails.map((subjectItem) => (
                                                            <TableCell>{subjectItem.Name}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableBody>
                                            ))}
                                        </Table>
                                    </Box>

                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                                <Button
                                    onClick={onSaveGenerate}
                                    variant="contained"
                                    color="error"
                                >
                                    SAVE & GENERATE RESULT
                                </Button>
                            </Box>
                        </div>
                    )}
                    {(isResultGenerated || isGenerated == 'Y') && ( // Conditionally display the final result section
                        <Box sx={{ mt: 1, background: 'white' }}>
                            <Box>
                                <hr />
                                <Typography variant={"h4"} textAlign={'center'} color={"primary"} mb={1}>
                                    Pawar Public Charitable Trust's
                                </Typography>
                                <hr />
                                <Typography variant={"h3"} textAlign={'center'} color={"primary"} mb={1}>
                                    PAWAR PUBLIC SCHOOL
                                </Typography>
                                <hr />
                                <Typography variant={"h4"} textAlign={'center'} color={"primary"} mb={1}>
                                    Final Result
                                </Typography>
                                <hr />
                                <Typography variant={"h4"} mb={1}>Student Details</Typography>
                                <Table>
                                    <TableBody>
                                        {ViewProgress.map((item) => {
                                            return (
                                                <TableRow sx={{ bgcolor: 'grey.200' }} key={item.Text1}>
                                                    <TableCell><b>Roll No:</b>{item.Text2}</TableCell>
                                                    <TableCell><b>Name:</b>{item.Text1}</TableCell>
                                                    <TableCell><b>Class:</b>{item.Text3} - {item.Text4}</TableCell>
                                                    <TableCell><b>Year:</b>{item.Text5}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>

                                <Box sx={{ overflowX: 'auto' }}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <Typography variant={"h4"} textAlign={'left'} color={"primary"} mt={3} ml={2}>
                                                    Subjects
                                                </Typography>
                                                {SubjectDetailsView.map((subject) => (
                                                    <TableCell key={subject.Name}><b>{subject.Name}</b></TableCell>
                                                ))}
                                            </TableRow>
                                            <TableRow>
                                                {MarkDetailsView.map((subject) => (
                                                    <TableCell key={subject.Name} align="center">  {subject.IsAbsent === '1' ? '-' : subject.Name}</TableCell>
                                                ))}
                                            </TableRow>
                                            <TableRow>
                                                {GradesDetailsView.map((Grade) => (
                                                    <TableCell key={Grade.Name} align="center"> {Grade.IsAbsent === '1' ? '-' : Grade.Name}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </div>
            )}

            {!StudentDetailsUS && (
                <Box>
                    {StudentDetailsUS.map((item) => (
                        <Typography key={item.Text1}>
                            Progress Report is not available for the student:{item.Text2} {item.Text1}
                        </Typography>
                    ))}
                </Box>
            )}
        </Box>

    );
};

export default GenerateAll;
