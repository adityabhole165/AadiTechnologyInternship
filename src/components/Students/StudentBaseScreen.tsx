import { QuestionMark } from "@mui/icons-material";
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import SquareIcon from '@mui/icons-material/Square';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetStandardDivisionOfTeacherBody, IGetStudentsListBody } from "src/interfaces/Students/IStudents";
import SuspenseLoader from "src/layouts/components/SuspenseLoader";
import SearchableDropdown1 from "src/libraries/ResuableComponents/SearchableDropdown1";
import { CDAGetStandardDivisionOfTeacher, CDAGetStudentsList } from "src/requests/Students/RequestStudents";
import { RootState } from "src/store";
import { formatDate1 } from "../Common/Util";
import CommonPageHeader from "../CommonPageHeader";

const StudentBaseScreen = () => {
    // Hooks Defining
    const dispatch = useDispatch();
    // "asStandard_Id": Number(selectedClass?.StandardId),
    // "asDivision_Id": Number(selectedClass?.DivisionId),
    // "asSchoolWise_Standard_Division_Id": Number(selectedClass?.SchoolStdDivId),
    // State Variables
    const [selectedClass, setSelectedClass] = useState<any>('0');
    const [divId, setDivId] = useState<any>('0');
    const [standardId, setStandardId] = useState<any>('0');
    const [stdDivId, setStdDivId] = useState<any>('0');

    const holidaysList = [{ TotalRows: 1 }]
    const [page, setPage] = useState(1);
    const filteredList = holidaysList.filter((item) => item.TotalRows !== undefined);
    const TotalCount = filteredList.map((item) => item.TotalRows);
    const uniqueTotalCount = [...new Set(TotalCount)];
    const singleTotalCount = uniqueTotalCount[0];
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
    const pagecount = Math.ceil(singleTotalCount / rowsPerPage);

    // Session Variables
    const schoolId = sessionStorage.getItem('SchoolId');
    const academicYearId = sessionStorage.getItem('AcademicYearId');
    const teacherId = sessionStorage.getItem('TeacherId');

    // Data fetching from redux store
    const StdDivList = useSelector((state: RootState) => state.Students.ISRGetStdDivForTeacher);
    const StudentsList = useSelector((state: RootState) => state.Students.ISGetStudentsList);
    const Loading = useSelector((state: RootState) => state.Students.Loading);

    useEffect(() => {
        const IGetStdDivList: IGetStandardDivisionOfTeacherBody = {
            "asSchoolId": Number(schoolId),
            "asAcademic_Year_Id": Number(academicYearId),
            "asTeacher_Id": Number(teacherId)
        }
        dispatch(CDAGetStandardDivisionOfTeacher(IGetStdDivList));
    }, [dispatch])

    useEffect(() => {
        const IGetStudentsList: IGetStudentsListBody = {
            "asSchoolId": Number(schoolId),
            "asAcadmicYearId": Number(academicYearId),
            "asStandard_Id": Number(standardId),
            "asDivision_Id": Number(divId),
            "asSchoolWise_Standard_Division_Id": Number(stdDivId),
            "asStartIndex": 0,
            "asEndIndex": 10,
            "asSortExpression": "Roll_No",
        }
        if (selectedClass !== null && selectedClass !== undefined && selectedClass !== '0') {
            dispatch(CDAGetStudentsList(IGetStudentsList));
        }
    }, [selectedClass])

    // Event Handlers | f()
    function handleClassChange(value) {
        console.log('>>>>>>>>>>>>>', value);
        setSelectedClass(value.Id);
        setDivId(value.DivisionId);
        setStandardId(value.StandardId);
        setStdDivId(value.SchoolStdDivId);
    }

    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'Students',
                            path: ''
                        }
                    ]}
                    rightActions={
                        <>
                            {/* <Box> */}
                            <SearchableDropdown1 size={"small"} ItemList={StdDivList}
                                sx={{ minWidth: '12vw' }}
                                defaultValue={selectedClass} label={'Class'}
                                onChange={(value: any) => { handleClassChange(value) }} />
                            {/* </Box> */}
                            <Box>
                                <Tooltip title={`Student's list from your class. Click on "Edit" button to change details of individual student.`}>
                                    <IconButton sx={{
                                        bgcolor: 'grey.500',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'grey.600'
                                        }
                                    }}>
                                        <QuestionMark />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </>
                    } />
                <Box sx={{ background: 'white', p: 1, mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <SquareIcon style={{ color: '#9ca3af', fontSize: 25, position: 'relative', top: '-2px' }} />
                                <Typography>Deactivated User</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <SquareIcon style={{ color: '#e5e7eb', fontSize: 25, position: 'relative', top: '-2px' }} />
                                <Typography>Long Leave</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {selectedClass !== '0' &&
                    <>
                        {Loading ? <SuspenseLoader /> :
                            StudentsList.length > 0 ?
                                <Box sx={{ background: 'white', pt: 1 }}>
                                    {singleTotalCount > 0 ? <div style={{ flex: 1, textAlign: 'center' }}>
                                        <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                                            <Box component="span" fontWeight="fontWeightBold">
                                                {startRecord} to {endRecord}
                                            </Box>
                                            {' '}out of{' '}
                                            <Box component="span" fontWeight="fontWeightBold">
                                                {singleTotalCount}
                                            </Box>{' '}
                                            {singleTotalCount === 1 ? 'record' : 'records'}
                                        </Typography>
                                    </div> : <span> </span>}
                                    <TableContainer component={Box} sx={{ px: 2, pb: 2 }}>
                                        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        Registration Number
                                                    </TableCell>
                                                    <TableCell>Roll No.</TableCell>
                                                    <TableCell>Student Name</TableCell>
                                                    <TableCell>Date of Birth</TableCell>
                                                    <TableCell>Edit</TableCell>
                                                    <TableCell>Photo</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {StudentsList.length > 0 && StudentsList?.map((item, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell sx={{ pt: '5px', pb: '5px' }}>
                                                            {item.Text3}
                                                        </TableCell>
                                                        <TableCell sx={{ pt: '5px', pb: '5px' }}>
                                                            {item.Text2}
                                                        </TableCell>
                                                        <TableCell sx={{ pt: '5px', pb: '5px' }}>
                                                            {item.Text1}
                                                        </TableCell>
                                                        <TableCell sx={{ pt: '5px', pb: '5px' }}>
                                                            {formatDate1(item.Text4.split(' ')[0])}
                                                        </TableCell>
                                                        <TableCell sx={{ pt: '5px', pb: '5px' }}>
                                                            <IconButton>
                                                                <Tooltip title="Edit">

                                                                    <EditTwoTone
                                                                        sx={{
                                                                            cursor: 'pointer',
                                                                            '&:hover': { backgroundColor: '' }
                                                                        }}
                                                                        onClick={() => { }} />
                                                                </Tooltip>
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell sx={{ pt: '5px', pb: '5px' }}>
                                                            <IconButton sx={{ borderRadius: '50%' }}>
                                                                <Tooltip title={item.Text8 === '' ? 'No Photo' : 'View Photo'}>
                                                                    <PersonIcon sx={{ color: item.Text8 === '' ? 'grey.500' : 'inherit' }} />
                                                                </Tooltip>
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>

                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box> :
                                <Box sx={{ backgroundColor: '#D2FDFC' }}>

                                    <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
                                        No record found.
                                    </Typography>
                                </Box>}
                    </>
                }
            </Box>
        </>
    )
}

export default StudentBaseScreen;