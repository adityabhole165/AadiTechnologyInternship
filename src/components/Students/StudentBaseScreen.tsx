import { QuestionMark } from "@mui/icons-material";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import DoneIcon from '@mui/icons-material/Done';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import SquareIcon from '@mui/icons-material/Square';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetStandardDivisionOfTeacherBody, IGetStudentsListBody } from "src/interfaces/Students/IStudents";
import SuspenseLoader from "src/layouts/components/SuspenseLoader";
import ButtonGroupComponent from "src/libraries/ResuableComponents/ButtonGroupComponent";
import SearchableDropdown1 from "src/libraries/ResuableComponents/SearchableDropdown1";
import { CDAGetStandardDivisionOfTeacher, CDAGetStudentsList } from "src/requests/Students/RequestStudents";
import { RootState } from "src/store";
import { formatDate1 } from "../Common/Util";
import CommonPageHeader from "../CommonPageHeader";


const StudentBaseScreen = () => {
    // Hooks Defining
    const dispatch = useDispatch();

    // State Variables
    const [selectedClass, setSelectedClass] = useState<any>('0');
    const [divId, setDivId] = useState<any>('0');
    const [standardId, setStandardId] = useState<any>('0');
    const [stdDivId, setStdDivId] = useState<any>('0');
    const [isAsc, setIsAsc] = useState<Boolean>(true);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, count);
    const pagecount = Math.ceil(count / rowsPerPage);

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
            "asStartIndex": (page - 1) * rowsPerPage,
            "asEndIndex": page * rowsPerPage,
            "asSortExpression": isAsc ? "Roll_No" : "Roll_No Desc",
        }
        if (selectedClass !== null && selectedClass !== undefined && selectedClass !== '0') {
            dispatch(CDAGetStudentsList(IGetStudentsList));
        }
    }, [selectedClass, isAsc, dispatch, page, rowsPerPage,])

    useEffect(() => {
        if (StudentsList.length > 0) {
            let totalRowCount = Number(StudentsList[0].Text9);
            setCount(totalRowCount);
        }
    }, [StudentsList])
    useEffect(() => {
        if (StdDivList.length === 2) {
            let value = StdDivList[1];
            setSelectedClass(value.Id);
            setDivId(value.DivisionId);
            setStandardId(value.StandardId);
            setStdDivId(value.SchoolStdDivId);
        }
    }, [StdDivList])

    // Event Handlers | f()
    function handleClassChange(value) {
        setSelectedClass(value.Id);
        setDivId(value.DivisionId);
        setStandardId(value.StandardId);
        setStdDivId(value.SchoolStdDivId);
    }
    function handleOrder() {
        setIsAsc(!isAsc);
    }
    function leftDate(leftOn) {
        let formattedDate = formatDate1(leftOn?.split(' ')[0]);
        // Received -> 18 Oct 2000 and Expected -> Oct 18
        const [dd, mm, yyyy] = formattedDate.split(' ');
        return `Left on ${mm} ${dd}`;
    }
    const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };
    const PageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };


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
                            {StdDivList.length === 2 ?
                                <TextField size="small" label="Class" value={StdDivList[1]?.Name} inputProps={{ readOnly: true, }} />
                                :
                                <SearchableDropdown1 size={"small"} ItemList={StdDivList}
                                    sx={{ minWidth: '12vw' }}
                                    defaultValue={selectedClass} label={'Class'}
                                    onChange={(value: any) => { handleClassChange(value) }} />
                            }

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
                                <>
                                    <Box sx={{ background: 'white', pt: 1 }}>
                                        {count > 0 ? <div style={{ flex: 1, textAlign: 'center' }}>
                                            <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                                                <Box component="span" fontWeight="fontWeightBold">
                                                    {startRecord} to {endRecord}
                                                </Box>
                                                {' '}out of{' '}
                                                <Box component="span" fontWeight="fontWeightBold">
                                                    {count}
                                                </Box>{' '}
                                                {count === 1 ? 'record' : 'records'}
                                            </Typography>
                                        </div> : <span> </span>}
                                        <TableContainer component={Box} sx={{ px: 2, pb: 2 }}>
                                            <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                                                <TableHead>
                                                    <TableRow sx={{ background: (theme) => theme.palette.secondary.main, }}>
                                                        <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>
                                                            Registration Number
                                                        </TableCell>
                                                        <TableCell align="center" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>
                                                            <span style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleOrder}>
                                                                Roll No.
                                                                <ArrowDropDownCircleIcon sx={{ fontSize: '24px', marginLeft: '4px', rotate: isAsc ? '180deg' : '' }} />
                                                            </span>
                                                        </TableCell>
                                                        <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>Student Name</TableCell>
                                                        <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>Date of Birth</TableCell>
                                                        <TableCell align="center" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>Edit</TableCell>
                                                        <TableCell align="center" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>Photo</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {StudentsList.length > 0 && StudentsList?.map((item, i) => (
                                                        <TableRow key={i} >
                                                            <TableCell sx={{ pt: '5px', pb: '5px', color: item.Text7 !== '' ? red[500] : '' }}>
                                                                {item.Text3}
                                                            </TableCell>
                                                            <TableCell align="center" sx={{ pt: '5px', pb: '5px', color: item.Text7 !== '' ? red[500] : '' }}>
                                                                {item.Text2}
                                                            </TableCell>
                                                            <TableCell sx={{ pt: '5px', pb: '5px', color: item.Text7 !== '' ? red[500] : '' }}>
                                                                {item.Text1}
                                                            </TableCell>
                                                            <TableCell sx={{ pt: '5px', pb: '5px', color: item.Text7 !== '' ? red[500] : '' }}>
                                                                {formatDate1(item.Text4.split(' ')[0])}
                                                            </TableCell>
                                                            <TableCell align="center" sx={{ pt: '5px', pb: '5px' }}>
                                                                {item.Text7 !== '' ? <span
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        textDecoration: 'none'
                                                                    }}
                                                                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.textDecoration = 'underline'}
                                                                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.textDecoration = 'none'}
                                                                >{leftDate(item.Text7)}</span> :
                                                                    <IconButton>
                                                                        <Tooltip title="Edit">

                                                                            <EditTwoTone
                                                                                sx={{
                                                                                    cursor: 'pointer',
                                                                                    '&:hover': { backgroundColor: '' }
                                                                                }}
                                                                                onClick={() => { }} />
                                                                        </Tooltip>
                                                                    </IconButton>}
                                                            </TableCell>

                                                            <TableCell align="center" sx={{ pt: '5px', pb: '5px' }}>
                                                                {item.Text8 === '' ?
                                                                    <IconButton sx={{ borderRadius: '50%' }}>
                                                                        <Tooltip title='No Photo'>
                                                                            <PersonIcon sx={{ color: 'grey.500' }} />
                                                                        </Tooltip>
                                                                    </IconButton> :
                                                                    <IconButton sx={{ borderRadius: '50%' }}>
                                                                        <Tooltip title='Photo Uploaded' >
                                                                            <DoneIcon sx={{ color: 'green' }} />
                                                                        </Tooltip>
                                                                    </IconButton>}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                            {endRecord > 19 ? (
                                                <ButtonGroupComponent
                                                    rowsPerPage={rowsPerPage}
                                                    ChangeRowsPerPage={ChangeRowsPerPage}
                                                    rowsPerPageOptions={rowsPerPageOptions}
                                                    PageChange={PageChange}
                                                    pagecount={pagecount}
                                                />
                                            ) : (
                                                <span></span>
                                            )}
                                        </TableContainer>
                                    </Box>

                                </> :
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