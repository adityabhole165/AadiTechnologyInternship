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


    let newData = "<NewDataSet><Table><YearWise_Student_Id>36731</YearWise_Student_Id><Student_Name>Miss Prisha Prashant Balbudhe</Student_Name><Standard_Name>2</Standard_Name><Division_Name>C</Division_Name><Academic_Year>2023-2024</Academic_Year><Standard_Division_Id>1253</Standard_Division_Id><Roll_No>1</Roll_No><Enrolment_Number>3901</Enrolment_Number><Standard_Id>1063</Standard_Id><School_Name>PAWAR PUBLIC SCHOOL</School_Name><School_Orgn_Name>Pawar Public Charitable Trust's</School_Orgn_Name><ShowOnlyGrades>true </ShowOnlyGrades><IsFailCriteriaNotApplicable>Y</IsFailCriteriaNotApplicable><IsPreprimaryStandard>0</IsPreprimaryStandard></Table></NewDataSet>";

    var newDataXml = new XMLParser().parseFromString(newData);
    //console.log("Student Name:", newDataXml.children[0].children[0].children[1].value); // Output: Miss Prisha Prashant Balbudhe

    console.log("Student Name:", newDataXml?.children?.[0]?.children?.[1]?.value ?? "Student Name not found.");




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

                                <TableCell><b>Name:{ListMarksDetails.length > 0 ?
                                    ListMarksDetails[0].Header : ""}</b></TableCell>
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


