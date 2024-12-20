import { Box, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import XMLParser from "react-xml-parser";
import { IGetAllStudentsTestProgressSheetBody } from 'src/interfaces/ExamResult/IViewProgressReport';
import { GetMarkDetailss } from 'src/requests/ExamResult/RequestViewProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
const ViewProgressReport = () => {
    const dispatch = useDispatch();
    const { TestId, StandardDivisionId } = useParams();
    console.log(StandardDivisionId, "StandardDivisionId")
    console.log("testid", TestId)
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    // const [StandardDivisionId, setStandardDivisionId] = useState(
    //     sessionStorage.getItem('TeacherId')
    //   );
    // const StandardDivisionId = sessionStorage.getItem('StandardDivisionId')
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

    }, [TestId, StandardDivisionId]);
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
    const getTestName = (data) => {
        var TestName = new XMLParser().parseFromString(data);
        return TestName.children[0].children[0].value
        // console.log(TestName.children[0].children[0].value);
    }
    //Physics
    const getSubjectName = (data) => {
        var SubjectName = new XMLParser().parseFromString(data);
        return SubjectName.children[0].children[1].value
        console.log(SubjectName.children[0].children[1].value);
    }
    const getGradeName = (data) => {
        var GradeName = new XMLParser().parseFromString(data);
        return GradeName.children[0].children[1].value
        console.log(GradeName.children[0].children[1].value);
    }
    //Science
    const getSubjectgroupTotal = (data) => {
        var SubjectgroupTotal = new XMLParser().parseFromString(data);
        return SubjectgroupTotal.children[0].children[2].value
        console.log(SubjectgroupTotal.children[0].children[1].value);
    }
    //Practical,Theory 
    const getSubjectTestType = (data) => {
        var SubjectTestType = new XMLParser().parseFromString(data);
        return SubjectTestType.children[0].children[9].value
        console.log(SubjectTestType.children[0].children[1].value);
    }
    //Marks
    const getMarks = (data) => {
        var Mark = new XMLParser().parseFromString(data);
        return Mark.children[0].children[7].value
        console.log(Mark.children[0].children[1].value);
    }
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Result',
                        path: '/RITeSchool/Teacher/ExamResultBase/' + StandardDivisionId + '/' + TestId
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

                        {ListMarksDetails && ListMarksDetails.Tests && (
                            <Typography variant={"h4"} my={1}>
                                Subject Progress Details For <Typography color='primary'>{getTestName(ListMarksDetails.Tests)}</Typography>
                            </Typography>
                        )}
                        {/* <DataTable
                            columns={ListMarksDetails.Subjects.map(subject => ({
                                id: subject,
                                label: getSubjectName(subject),
                                renderCell: (rowData) => rowData[subject]
                            }))}
                            data={ListMarksDetails.grades.map(grade => ({
                                grade: getGradeName(grade)
                            }))}
                            isPagination={false}
                        /> */}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default ViewProgressReport;


