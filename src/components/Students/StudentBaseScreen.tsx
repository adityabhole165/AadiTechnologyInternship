import {
    Done,
    EditTwoTone,
    Person,
    QuestionMark,
    Square
} from "@mui/icons-material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {
    Box,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { IGetStandardDivisionOfTeacherBody, IGetStudentsListBody } from "src/interfaces/Students/IStudents";
import Legend from "src/libraries/Legend/Legend";
import ButtonGroupComponent from "src/libraries/ResuableComponents/ButtonGroupComponent";
import SearchableDropdown1 from "src/libraries/ResuableComponents/SearchableDropdown1";
import { CDAGetStandardDivisionOfTeacher, CDAGetStudentsList } from "src/requests/Students/RequestStudents";
import { RootState } from "src/store";
import { formatDate1 } from "../Common/Util";
import CommonPageHeader from "../CommonPageHeader";
const StudentBaseScreen = () => {
    // Hooks Defining
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // State Variables
    const [selectedClass, setSelectedClass] = useState<any>('0');
    const [divId, setDivId] = useState<any>('0');
    const [standardId, setStandardId] = useState<any>('0');
    const [stdDivId, setStdDivId] = useState<any>('0');
    const [sortColumn, setSortColumn] = useState<string>('Roll_No');
    const [isAsc, setIsAsc] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [sortHeader, setSortHeader] = useState<string>('Roll_No');
    const [rowsPerPage, setRowsPerPage] = useState(20);

    const rowsPerPageOptions = [20, 50, 100, 200];
    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, count);
    const pagecount = Math.ceil(count / rowsPerPage);

    // Session Variables
    const schoolId = localStorage.getItem('SchoolId');
    const academicYearId = sessionStorage.getItem('AcademicYearId');
    const teacherId = sessionStorage.getItem('TeacherId');

    // Data fetching from redux store
    const StdDivList = useSelector((state: RootState) => state.Students.ISRGetStdDivForTeacher);
    const StudentsList = useSelector((state: RootState) => state.Students.ISGetStudentsList);
    const Loading = useSelector((state: RootState) => state.Students.Loading);
    //console.log('StudentsList', StudentsList);

    useEffect(() => {
        if (StdDivList.length > 1) {
            // setSelectedClass(StdDivList[1]?.Id)
            const value = StdDivList[0];
            setSelectedClass(value.Id);
            setDivId(value.DivisionId);
            setStandardId(value.StandardId);
            setStdDivId(value.SchoolStdDivId);
        }
    }, [StdDivList])

    useEffect(() => {
        const IGetStdDivList: IGetStandardDivisionOfTeacherBody = {
            "asSchoolId": Number(schoolId),
            "asAcademic_Year_Id": Number(academicYearId),
            "asTeacher_Id": Number(teacherId)
        }
        dispatch(CDAGetStandardDivisionOfTeacher(IGetStdDivList));
    }, [dispatch, schoolId, academicYearId, teacherId]);

    useEffect(() => {
        const IGetStudentsList: IGetStudentsListBody = {
            "asSchoolId": Number(schoolId),
            "asAcadmicYearId": Number(academicYearId),
            "asStandard_Id": Number(standardId),
            "asDivision_Id": Number(divId),
            "asSchoolWise_Standard_Division_Id": Number(stdDivId),
            "asStartIndex": (page - 1) * rowsPerPage,
            "asEndIndex": page * rowsPerPage,
            "asSortExpression": `${sortColumn} ${isAsc ? 'ASC' : 'DESC'}`,
        }
        if (selectedClass !== null && selectedClass !== undefined && selectedClass !== '0') {
            dispatch(CDAGetStudentsList(IGetStudentsList));
        }
    }, [dispatch, selectedClass, sortColumn, isAsc, page, rowsPerPage, schoolId, academicYearId, standardId, divId, stdDivId]);

    useEffect(() => {
        if (StudentsList.length > 0) {
            let totalRowCount = Number(StudentsList[0].Text9);
            setCount(totalRowCount);
        }
    }, [StudentsList]);

    useEffect(() => {
        if (StdDivList.length === 1) {
            let value = StdDivList[0];
            setSelectedClass(value.Id);
            setDivId(value.DivisionId);
            setStandardId(value.StandardId);
            setStdDivId(value.SchoolStdDivId);
        }
    }, [StdDivList]);

    // Event Handlers | f()
    function handleClassChange(value) {
        setSelectedClass(value.Id);
        setDivId(value.DivisionId);
        setStandardId(value.StandardId);
        setStdDivId(value.SchoolStdDivId);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setIsAsc(!isAsc);
        } else {
            setSortColumn(column);
            setIsAsc(true);
        }
    };

    const leftDate = (leftOn) => {
        let formattedDate = formatDate1(leftOn?.split(' ')[0]);
        const [dd, mm, yyyy] = formattedDate.split(' ');
        return `Left on ${mm} ${dd}`;
    };

    const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const PageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };
    const SortableHeader = ({ column, label }) => {
        const showSortIcon = sortHeader === column;
        return (
            <span
                style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => {
                    handleSort(column);
                    setSortHeader(column);
                }}
            >
                {label}
                {showSortIcon && ( // Show the icon only for the sorted column
                    <ArrowCircleUpIcon
                        sx={{
                            fontSize: '24px',
                            marginLeft: '4px',
                            rotate: isAsc && sortHeader === column ? '0deg' : '180deg'
                        }}
                    />
                )}
            </span>
        );
        // } 
        // else {
        //     return (
        //         <span
        //             style={{
        //                 cursor: 'pointer'
        //             }}
        //             onMouseEnter={() => setHovered(true)}
        //             onMouseLeave={() => setHovered(false)}
        //             onClick={() => handleSort(column)}
        //         >
        //             {label}
        //         </span>
        //     );
        // }
    };

    //separate function to handle edit click
    const handleEditClick = (item: any) => {
        // Console log the data
        //console.log("🎈Selected Student Data:", item);

        // Store in local variables
        const StudentData = {
            Name: item.Text1,
            standardId: standardId,
            DivisionId: divId,
            YearWise_Student_Id: item.Text12,
            SchoolWise_Student_Id: item.Text13,
            StandardDivision_Id: item.Text14,
            Enrolment_Number: item.Text3,
            NewMode: 'N',
            Joining_Date: item.Text15,
            User_Id: item.Text16
        };

        // Store in localStorage
        localStorage.setItem('studentData', JSON.stringify(StudentData));

        // Dispatch to Redux if needed
        //dispatch(setSelectedStudent(studentData));

        // Then proceed with navigation
        navigate(`/RITeSchool/Teacher/StudentRegistrationForms`, {
            state: {
                Name: item.Text1,
                standardId: standardId,
                DivisionId: divId,
                YearWise_Student_Id: item.Text12,
                SchoolWise_Student_Id: item.Text13,
                StandardDivision_Id: item.Text14,
                Enrolment_Number: item.Text3,
                NewMode: 'N',
                Joining_Date: item.Text15,
                User_Id: item.Text16,
                fromInternal: true
            }
        });
    };


    const LegendArray = [

        {
            id: 1,
            Name: 'Deactivated User',
            Value:
                <Square style={{ color: '#e2e8f0', fontSize: 25, position: 'relative', top: '-2px' }} />
        },
        {
            id: 2,
            Name: 'Long Leave',
            Value:
                <Square style={{ color: '#dbeafe', fontSize: 25, position: 'relative', top: '-2px' }} />
        }
    ]
    return (
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
                        <Stack
                            direction="row"
                            gap={1}
                            alignItems="right"
                            sx={{
                                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                                justifyContent: { xs: 'flex-start', sm: 'flex-start' }
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                            >
                                {StdDivList.length === 1 ?

                                    <TextField size="small" label="Class" value={StdDivList[0]?.Name} inputProps={{ readOnly: true, }} />
                                    :
                                    <SearchableDropdown1 size={"small"} ItemList={StdDivList}
                                        sx={{ minWidth: '12vw' }}
                                        defaultValue={selectedClass} label={'Class'}
                                        onChange={(value: any) => { handleClassChange(value) }} />
                                }
                            </Grid>
                            <Stack
                                direction="row"
                                gap={1}
                                alignItems="right"
                                sx={{
                                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                                    justifyContent: { xs: 'flex-start', sm: 'flex-start' }
                                }}
                            >
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
                            </Stack>
                        </Stack>
                    </>
                } />
            <Box sx={{ background: 'white', p: 1, mb: 2 }}>
                <Legend LegendArray={LegendArray} />
            </Box>
            {selectedClass !== '0' &&
                <>
                    {/* {Loading && <SuspenseLoader />} */}
                    {StudentsList.length > 0 ?
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
                                                    <SortableHeader column="Enrolment_Number" label="Registration Number" />
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>
                                                    <SortableHeader column="Roll_No" label="Roll No." />
                                                </TableCell>
                                                <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>
                                                    <SortableHeader column="Name" label="Student Name" />
                                                </TableCell>
                                                <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>
                                                    <SortableHeader column="DOB" label="Date of Birth" />
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>Edit</TableCell>
                                                <TableCell align="center" sx={{ color: (theme) => theme.palette.common.white, fontWeight: 600 }}>Photo</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {StudentsList.map((item, i) => (
                                                <TableRow key={i} sx={{ backgroundColor: (item.Text10 !== '0' && item.Text7 === '') ? '#dbeafe' : item.Text11 !== 'N' ? '#e2e8f0' : 'inherit' }} >
                                                    <TableCell sx={{ pt: '5px', pb: '5px', color: item.Text7 !== '' ? red[500] : '', fontWeight: item.Text10 !== '0' && item.Text7 === '' ? 700 : 'inherit' }}>
                                                        {item.Text3}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ pt: '5px', pb: '5px', color: item.Text7 !== '' ? red[500] : '', fontWeight: item.Text10 !== '0' && item.Text7 === '' ? 700 : 'inherit' }}>
                                                        {item.Text2}
                                                    </TableCell>
                                                    <TableCell sx={{ pt: '5px', pb: '5px', color: item.Text7 !== '' ? red[500] : '', fontWeight: item.Text10 !== '0' && item.Text7 === '' ? 700 : 'inherit' }}>
                                                        {item.Text1}
                                                    </TableCell>
                                                    <TableCell sx={{ pt: '5px', pb: '5px', color: item.Text7 !== '' ? red[500] : '', fontWeight: item.Text10 !== '0' && item.Text7 === '' ? 700 : 'inherit' }}>
                                                        {item.Text4}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ pt: '5px', pb: '5px' }}>
                                                        {item.Text7 !== '' ? <span
                                                            style={{
                                                                cursor: 'pointer',
                                                                textDecoration: 'none',
                                                                fontWeight: item.Text10 !== '0' && item.Text7 === '' ? 700 : 'inherit'
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
                                                                        onClick={() => handleEditClick(item)}
                                                                    // onClick={() => {
                                                                    //     setSelectedItem(item);
                                                                    //     // navigate(`/RITeSchool/Teacher/StudentRegistrationForms`, {
                                                                    //     //     state: {
                                                                    //     //         Name: item.Text1,
                                                                    //     //         standardId: standardId,
                                                                    //     //         DivisionId: divId,
                                                                    //     //         YearWise_Student_Id: item.Text12,
                                                                    //     //         SchoolWise_Student_Id: item.Text13,
                                                                    //     //         StandardDivision_Id: item.Text14,
                                                                    //     //         Enrolment_Number: item.Text3,
                                                                    //     //         NewMode: 'N',
                                                                    //     //         Joining_Date: item.Text15
                                                                    //     //     }
                                                                    //     // })
                                                                    // }}
                                                                    />
                                                                </Tooltip>
                                                            </IconButton>}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ pt: '5px', pb: '5px' }}>
                                                        {item.Text8 === '' ?
                                                            <IconButton sx={{ borderRadius: '50%' }}>
                                                                <Tooltip title='No Photo'>
                                                                    <Person sx={{ color: 'grey.500' }} />
                                                                </Tooltip>
                                                            </IconButton> :
                                                            <IconButton sx={{ borderRadius: '50%' }}>
                                                                <Tooltip title='Photo Uploaded' >
                                                                    <Done sx={{ color: 'green' }} />
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
    )
}

export default StudentBaseScreen;