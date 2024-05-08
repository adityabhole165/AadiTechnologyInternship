import { Box, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IGetAllStudentsTestProgressSheetBody } from 'src/interfaces/ExamResult/IViewProgressReport';
import { GetMarkDetailss } from 'src/requests/ExamResult/RequestViewProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import DataTable from '../DataTable';
import { useDispatch } from 'react-redux';
const ViewProgressRemark = () => {
    const dispatch = useDispatch();
    const { TestId } = useParams();
    console.log("testid", TestId)
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const StandardDivisionId = sessionStorage.getItem('StandardDivisionId')
    const GetAllStudentProgress: any = useSelector(
        (state: RootState) => state.ViewProgressReport.listMarksDetiles
    );
    console.log("GetAllStudentProgress", GetAllStudentProgress)
    useEffect(() => {
        const GetAllStudentsTest: IGetAllStudentsTestProgressSheetBody =
        {

            asSchoolId: Number(asSchoolId),
            asAcademicYrId: Number(asAcademicYearId),
            asStdDivId: Number(StandardDivisionId),
            asStartIndex: 1,
            PageCount: 1000,
            asTestId: Number(TestId)
        }
        dispatch(GetMarkDetailss(GetAllStudentsTest));

    }, []);
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Result',
                        path: '/extended-sidebar/Teacher/ExamResultBase'
                    },
                    {
                        title: 'View Progress Report',
                        path: ''
                    }
                ]}
                rightActions={<></>}
            />
            <Box sx={{ backgroundColor: 'white', p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box>
                    <hr />
                    <Typography variant={"h3"} textAlign={'center'} color={"primary"} mb={1}>
                        Pawar Public Charitable Trust's PAWAR PUBLIC SCHOOL Progress Report
                    </Typography>
                    <hr />
                    <Typography variant={"h4"} mb={1}>Student Details</Typography>
                    <Table>
                        <TableBody>
                            <TableRow sx={{ bgcolor: 'grey.200' }}>
                                <TableCell><b>Roll No:</b> 1</TableCell>
                                <TableCell><b>Name:</b> Miss Jagvi Nilesh Badgujar	</TableCell>
                                <TableCell><b>Class:</b> 1 - A	</TableCell>
                                <TableCell><b>Year:</b> 2023-2024	</TableCell>
                            </TableRow>
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
            </Box>
        </Box>
    );
};

export default ViewProgressRemark;


