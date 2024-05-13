import { Box, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import XMLParser from "react-xml-parser";
import { IGetAllStudentsTestProgressSheetBody } from 'src/interfaces/ExamResult/IViewProgressReport';
import { GetMarkDetailss } from 'src/requests/ExamResult/RequestViewProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import DataTable from '../DataTable';
const ViewProgressRemark = () => {
    const dispatch = useDispatch();
    const { TestId } = useParams();
    console.log("testid", TestId)
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const StandardDivisionId = sessionStorage.getItem('StandardDivisionId')
    const ListMarksDetails: any = useSelector(
        (state: RootState) => state.ViewProgressReport.ListMarksDetiles
    );
    console.log("ListMarksDetails", ListMarksDetails)
    const DisplayStatusDetails: any = useSelector(
        (state: RootState) => state.ViewProgressReport.ListStatusDetiles
    );
    console.log("DisplayStatusDetails", DisplayStatusDetails)
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
    console.log(ListMarksDetails[0])
    if (ListMarksDetails.length > 0) {
        console.log(ListMarksDetails[0]);
    }
    console.log("Length of ListMarksDetails:", ListMarksDetails.length);

    const getStudentName = (data) => {
        var StudentName = new XMLParser().parseFromString(data);
        return StudentName.children[0].children[1].value
    }
    const getRollNo = (data) => {
        var RollNo = new XMLParser().parseFromString(data);
        return RollNo.children[0].children[6].value

    }
    const getStdDiv = (data) => {
        var parsedData = new XMLParser().parseFromString(data);
        var standardName = parsedData.children[0].children[2].value;
        var divisionName = parsedData.children[0].children[3].value;
        return { standardName, divisionName };
    }
    const getAcademicYear = (data) => {
        var AcademicYear = new XMLParser().parseFromString(data);
        return AcademicYear.children[0].children[4].value

    }


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
            {ListMarksDetails.map((ListMarksDetails, index) => (
                <Box key={index} sx={{ backgroundColor: 'white', p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                                    <TableCell><b>Roll No:{getRollNo(ListMarksDetails.Header)}</b></TableCell>
                                    {ListMarksDetails && ListMarksDetails.Header && (
                                        <TableCell><b>Name: {getStudentName(ListMarksDetails.Header)}</b></TableCell>
                                    )}
                                    {ListMarksDetails && ListMarksDetails.Header && (
                                        <TableCell><b>Class: {getStdDiv(ListMarksDetails.Header).standardName} - {getStdDiv(ListMarksDetails.Header).divisionName}</b></TableCell>
                                    )}
                                    <TableCell><b>Year:{getAcademicYear(ListMarksDetails.Header)}</b> </TableCell>
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
            ))}
        </Box>
    );
};

export default ViewProgressRemark;


