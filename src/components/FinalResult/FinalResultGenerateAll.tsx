import Print from '@mui/icons-material/Print'
import QuestionMark from '@mui/icons-material/QuestionMark'
import Search from '@mui/icons-material/Search'
import { Box, Button, IconButton, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { IGetGenerateAllStudentBody, IGetStudentPrrogressReportBody, IViewBody } from 'src/interfaces/FinalResult/IFinalResultGenerateAll'
import { ExamDetailsGA, GenerateAllGA, GradesDetailsVA, MarksDetailsVA, StudentDetailsGA, SubjectDetailsGA, SubjectDetailsVA, TestMarksDetailsGA, ViewResultGA } from 'src/requests/FinalResult/RequestFinalResultGenerateAll'
import { RootState } from 'src/store'
import CommonPageHeader from '../CommonPageHeader'

type Props = {}


const GenerateAll = ({ }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { asStudentId } = useParams();
    console.log("asStudentId", asStudentId);


    const asAcadmeicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asUserId = Number(localStorage.getItem('UserId'));

    const StudentDetailsUS = useSelector(
        (state: RootState) => state.FinalResultGenerateAll.getStudentDetails
    );
    const ExamDetails = useSelector(
        (state: RootState) => state.FinalResultGenerateAll.getExamDetails
    );
    const TestMarksDetails = useSelector(
        (state: RootState) => state.FinalResultGenerateAll.getTestMarksGA
    );
    const GenerateAllUS = useSelector(
        (state: RootState) => state.FinalResultGenerateAll.getGenerateAll
    );
    const SubjectDetails = useSelector(
        (state: RootState) => state.FinalResultGenerateAll.getSubjectDetails
    );
    console.log(SubjectDetails, 'SubjectDetails');


    const ViewProgress = useSelector(
        (state: RootState) => state.FinalResultGenerateAll.getViewResult
    );
    const MarkDetailsView = useSelector(
        (state: RootState) => state.FinalResultGenerateAll.getMarkDetailsView
    );
    const SubjectDetailsView = useSelector(
        (state: RootState) => state.FinalResultGenerateAll.getSubjectDetailsView
    );
    const GradesDetailsView = useSelector(
        (state: RootState) => state.FinalResultGenerateAll.getGradesDetailsView
    );

    useEffect(() => {
        const GetStudentPrrogressReportBody: IGetStudentPrrogressReportBody = {
            asSchoolId: Number(asSchoolId),
            asAcadmeicYearId: Number(asAcadmeicYearId),
            // asStudentId: Number(asStudentId),
            asStudentId: 37608,
            asUserId: Number(asUserId)
        }
        dispatch(StudentDetailsGA(GetStudentPrrogressReportBody))
        dispatch(SubjectDetailsGA(GetStudentPrrogressReportBody))
        dispatch(ExamDetailsGA(GetStudentPrrogressReportBody))
        dispatch(TestMarksDetailsGA(GetStudentPrrogressReportBody))
    }, [])

    useEffect(() => {
        const GetGenerateAllBody: IGetGenerateAllStudentBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcadmeicYearId),
            // asStudentId: Number(asStudentId),
            asStudentId: 37608,
            asUserId: Number(asUserId)
        }
        dispatch(GenerateAllGA(GetGenerateAllBody))


    }, [])

    useEffect(() => {
        const GetViewResultBody: IViewBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: 53,
            asStudentId: 32682,
            // asStudentId: Number(asStudentId),
            asInsertedById: Number(asUserId),
            asWithGrace: 0,
        }
        dispatch(ViewResultGA(GetViewResultBody))
        dispatch(SubjectDetailsVA(GetViewResultBody))
        dispatch(MarksDetailsVA(GetViewResultBody))
        dispatch(GradesDetailsVA(GetViewResultBody))
    }, [])

    const onClickClose = () => {
        navigate('/extended-sidebar/Teacher/FinalResult');
    };

    const onSaveGenerate = () => {
        const GetStudentPrrogressReportBody: IGetStudentPrrogressReportBody = {
            asSchoolId: Number(asSchoolId),
            asAcadmeicYearId: Number(asAcadmeicYearId),
            // asStudentId: Number(asStudentId),
            asStudentId: 37608,
            asUserId: Number(asUserId)
        }
        dispatch(StudentDetailsGA(GetStudentPrrogressReportBody))

    };


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
                rightActions={<>

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
                    </Box>
                    <Box>
                        <Tooltip title={"Search"}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': {
                                        backgroundColor: grey[600]
                                    }
                                }}
                            >
                                <Search />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title={"Print Preview"}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': {
                                        backgroundColor: grey[600]
                                    }
                                }}
                            >
                                <Print />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </>}
            />
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
                                    <TableRow sx={{ bgcolor: 'grey.200' }}>
                                        <TableCell><b>Roll No:</b>{item.Text2} </TableCell>
                                        <TableCell><b>Name:</b> {item.Text1}	</TableCell>
                                        <TableCell><b>Class:</b> {item.Text3} - {item.Text4}	</TableCell>
                                        <TableCell><b>Year:</b> {item.Text5}	</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>

                    {/* <Typography variant={"h4"} my={1} >Subject Progress Details For <Typography color='primary'>Subject Enrichment Analysis - I</Typography>
                    </Typography> */}
                    {/* <DataTable
                        columns={[
                            {
                                id: 'subjects',
                                label: 'Subjects',
                                renderCell: (rowData) => rowData.Subject_Name
                            },
                            {
                                id: 'english',
                                label: 'English',
                                renderCell: (rowData) => rowData.english
                            },
                            {
                                id: 'mathematics',
                                label: 'Mathematics',
                                renderCell: (rowData) => rowData.mathematics
                            },
                            {
                                id: 'evs',
                                label: 'E.V.S.',
                                renderCell: (rowData) => rowData.evs
                            },
                            {
                                id: 'computerStudies',
                                label: 'Computer Studies',
                                renderCell: (rowData) => rowData.computerStudies
                            },
                            {
                                id: 'hindi3',
                                label: 'Hindi III',
                                renderCell: (rowData) => rowData.hindi3
                            },
                        ]}
                        data={[
                            {
                                subjects: 'Subject Grace',
                                english: 'B2',
                                mathematics: 'A1',
                                evs: 'B2',
                                computerStudies: 'A1',
                                hindi3: 'A1',
                            },
                        ]}
                        isPagination={false}
                    /> */}
                    <Box sx={{ overflowX: 'auto' }}>
                        <Table>
                            <TableBody>

                                <TableRow>
                                    <Typography variant={"h3"} textAlign={'left'} color={"primary"} ml={9} mt={3}>
                                        Subjects
                                    </Typography>
                                    <Typography variant={"h3"} textAlign={'left'} color={"primary"}>
                                        Exam
                                    </Typography>
                                    {/* {SubjectDetails.map((subject) => (
                                        <TableCell><b>{subject.Name}</b></TableCell>
                                        {ExamDetails.filter((ExamDetailsRow)=>{ExamDetailsRow.SchoolWise_Test_Id})
                                            .map((subject) => (
                                            <TableRow>{subject.Name}</TableRow>
                                        ))}
                                    ))} */}
                                    {SubjectDetails.map((subject) => (
                                        <TableCell><b>{subject.Name}</b></TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    {ExamDetails.map((subject) => (
                                        <TableRow>{subject.Name}</TableRow>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    {TestMarksDetails.map((subject) => (
                                        <TableCell>{subject.Name}</TableCell>
                                    ))}
                                </TableRow>

                            </TableBody>
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
                                    <TableRow sx={{ bgcolor: 'grey.200' }}>
                                        <TableCell><b>Roll No:</b>{item.Text2} </TableCell>
                                        <TableCell><b>Name:</b> {item.Text1}	</TableCell>
                                        <TableCell><b>Class:</b> {item.Text3} - {item.Text4}	</TableCell>
                                        <TableCell><b>Year:</b> {item.Text5}	</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>

                    {/* <Typography variant={"h4"} my={1} >Subject Progress Details For <Typography color='primary'>Subject Enrichment Analysis - I</Typography>
                    </Typography> */}
                    {/* <DataTable
                        columns={[
                            {
                                id: 'subjects',
                                label: 'Subjects',
                                renderCell: (rowData) => rowData.subjects
                            },
                            {
                                id: 'english',
                                label: 'English',
                                renderCell: (rowData) => rowData.english
                            },
                            {
                                id: 'mathematics',
                                label: 'Mathematics',
                                renderCell: (rowData) => rowData.mathematics
                            },
                            {
                                id: 'evs',
                                label: 'E.V.S.',
                                renderCell: (rowData) => rowData.evs
                            },
                            {
                                id: 'computerStudies',
                                label: 'Computer Studies',
                                renderCell: (rowData) => rowData.computerStudies
                            },
                            {
                                id: 'hindi3',
                                label: 'Hindi III',
                                renderCell: (rowData) => rowData.hindi3
                            },
                        ]}
                        data={[
                            {
                                subjects: 'Subject Grace',
                                english: 'B2',
                                mathematics: 'A1',
                                evs: 'B2',
                                computerStudies: 'A1',
                                hindi3: 'A1',
                            },
                        ]}
                        isPagination={false}
                    /> */}
                    <Box sx={{ overflowX: 'auto' }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <Typography variant={"h4"} textAlign={'left'} color={"primary"} mt={4}>
                                        Subjects
                                    </Typography>
                                    {SubjectDetailsView.map((subject) => (
                                        <TableCell><b>{subject.Name}</b></TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    {MarkDetailsView.map((subject) => (
                                        <TableCell>{subject.Name}</TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    {GradesDetailsView.map((Grade) => (
                                        <TableCell>{Grade.Name}</TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                <Button
                    onClick={onClickClose}
                    variant="contained"
                    color="error"
                >
                    BACK
                </Button>
            </Box>
        </Box>
    )
}

export default GenerateAll  
