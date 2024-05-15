import Print from '@mui/icons-material/Print'
import QuestionMark from '@mui/icons-material/QuestionMark'
import Search from '@mui/icons-material/Search'
import { Box, Button, IconButton, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { IGetGenerateAllStudentBody, IGetStudentPrrogressReportBody, IViewBody } from 'src/interfaces/FinalResult/IFinalResultGenerateAll'
import { GenerateAllGA, StudentDetailsGA, ViewResultGA } from 'src/requests/FinalResult/RequestFinalResultGenerateAll'
import { RootState } from 'src/store'
import CommonPageHeader from '../CommonPageHeader'
import DataTable from '../DataTable'

type Props = {}

const GenerateAll = ({ }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { asStudentId } = useParams();
    console.log("asStudentId", asStudentId);


    const asAcadmeicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asUserId = Number(localStorage.getItem('UserId'));

    const onClickClose = () => {
        navigate('/extended-sidebar/Teacher/FinalResult');
    };

    const StudentDetailsUS = useSelector(
        (state: RootState) => state.FinalResultGenerateAll.getStudentDetails
    );
    const GenerateAllUS = useSelector(
        (state: RootState) => state.FinalResultGenerateAll.getGenerateAll
    );
    const ViewProgress = useSelector(
        (state: RootState) => state.FinalResultGenerateAll.getViewResult
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
            asAcademicYearId: Number(asAcadmeicYearId),
            asStudentId: 37608,
            // asStudentId: Number(asStudentId),
            asInsertedById: Number(asUserId),
            asWithGrace: 0,
        }
        dispatch(ViewResultGA(GetViewResultBody))

    }, [])

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
            <Box sx={{ p: 2, background: 'white' }}>
                <Box>
                    <hr />
                    <Typography variant={"h3"} textAlign={'center'} color={"primary"} mb={1}>
                        Pawar Public Charitable Trust's PAWAR PUBLIC SCHOOL Progress Report
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

                    <Typography variant={"h4"} my={1} >Subject Progress Details For <Typography color='primary'>Subject Enrichment Analysis - I</Typography>
                    </Typography>
                    <DataTable
                        columns={[
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
                                english: 'B2',
                                mathematics: 'A1',
                                evs: 'B2',
                                computerStudies: 'A1',
                                hindi3: 'A1',
                            },
                        ]}
                        isPagination={false}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <Button
                        onClick={onClickClose}
                        variant="contained"
                        color="error"
                    >
                        CLOSE
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default GenerateAll  