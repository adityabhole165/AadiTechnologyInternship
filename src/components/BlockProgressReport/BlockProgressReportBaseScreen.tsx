import { QuestionMark, SearchTwoTone } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import { Box, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IAllClassTeachersBody, IBlockUnBlockStudentsBody } from 'src/interfaces/BlockProgressReport/IBlockProgressReport';
import { CDABlockUnblockStudentsDropdown, CDABlockUnblockStudentsList, CDAClassTeachers } from 'src/requests/BlockProgressReport/RequestBlockProgressReport';
import { RootState, useDispatch } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import AddNewPhoto from '../PhotoVideoGallery/AddNewPhoto';
import AddNewVideo from '../PhotoVideoGallery/AddNewVideo';
import SearchableDropdown2 from './SearchableDropdown2';
import ShowBlockedStudentsTable from './ShowBlockedStudentsTable';
import ShowUnblockedStudentsTable from './ShowUnblockedStudentsTable';


const BlockProgressReportBaseScreen = () => {
    const dispatch = useDispatch();
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [standardDivId, setStandardDivId] = useState(0);
    const [selectStudents, setSelectStudents] = useState<string>('0');
    const [selectedOption, setSelectedOption] = useState<string>('Blocked');
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState(1);

    const [studentStatus, setStudentStatus] = useState('showUnblocked');


    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asStandardDivId = Number(sessionStorage.getItem('StandardDivisionId'));


    const CountGetPagedRequisition: any = useSelector(
        (state: RootState) => state.SliceRequisition.RequisitionListCount

    );
    const GetClassTeacherList = useSelector((state: RootState) => state.BlockUnBlocklist.IsClassTeachers);
    //console.log('GetClassTeacherList', GetClassTeacherList);

    const StudentsDropdown = useSelector((state: RootState) => state.BlockUnBlocklist.ISStudentDropdown);
    const BlockedStudentsList = useSelector((state: RootState) => state.BlockUnBlocklist.ISBlockedStudentsList);
    const UnblockedStudentsList = useSelector((state: RootState) => state.BlockUnBlocklist.ISUnblockedStudentsList);
    console.log('0️⃣StudentsDropdown', StudentsDropdown);
    //console.log('1️⃣BlockedStudentsList', BlockedStudentsList);
    //console.log('2️⃣UnblockedStudentsList', UnblockedStudentsList);

    const GetBlockUnblockCount = useSelector((state: RootState) => state.BlockUnBlocklist.IsStudentsCount);

    // print in coonsole on effect GetBlockUnblockList
    useEffect(() => {
        console.log('studentStatus', studentStatus)
        console.log('selectedTeacher', typeof selectedTeacher, selectedTeacher)

    }, [selectedTeacher])



    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, CountGetPagedRequisition.TotalCount);
    const pagecount = Math.ceil(CountGetPagedRequisition.TotalCount / rowsPerPage);
    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const TeacherList: IAllClassTeachersBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId)
    };
    useEffect(() => {
        dispatch(CDAClassTeachers(TeacherList));
    }, []);


    const BlockUnblockStudentsDropBody: IBlockUnBlockStudentsBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asStandardDivId: standardDivId ? standardDivId : 0,//Number(asStandardDivId),
        asShowblocked: studentStatus === "showBlocked" ? true : false,
        asStudentId: Number(0),
        asSearch: "",
        asSortExp: "ORDER BY RollNo",
        asStartIndex: Number(0),
        asEndIndex: Number(20)
    };

    useEffect(() => {
        dispatch(CDABlockUnblockStudentsDropdown(BlockUnblockStudentsDropBody, selectedTeacher));
    }, []);

    useEffect(() => {
        //console.log('Second on selection')
        dispatch(CDABlockUnblockStudentsDropdown(BlockUnblockStudentsDropBody, selectedTeacher));
    }, [selectedTeacher, standardDivId, studentStatus]);

    const BlockUnblockStudentsListBody: IBlockUnBlockStudentsBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asStandardDivId: standardDivId ? standardDivId : 0,//Number(asStandardDivId),
        asShowblocked: studentStatus === "showBlocked" ? true : false,
        asStudentId: selectStudents ? Number(selectStudents) : Number(0),
        asSearch: "",
        asSortExp: "ORDER BY RollNo",
        asStartIndex: Number(0),
        asEndIndex: Number(20)
    };

    useEffect(() => {
        dispatch(CDABlockUnblockStudentsList(BlockUnblockStudentsListBody, studentStatus));
    }, [selectedTeacher, standardDivId, studentStatus, selectStudents]);

    //console.log(selectedValue, "checkedValues");
    function clickSearch() {
        throw new Error('Function not implemented.');
    }

    const handleDropdownChange = (value: string) => {
        //setSelectedOption(value);
        setSelectedTeacher(value);
        // Find the selected teacher object
        const selectedTeacher = GetClassTeacherList.find(teacher => teacher.Value === value);
        //console.log('selectedTeacher', selectedTeacher)
        if (selectedTeacher != null) {
            // Set the standardDivId from selected teacher
            setStandardDivId(selectedTeacher.SchoolWise_Standard_Division_Id);

            // Reset student selection when teacher changes
            setSelectStudents('0');

            // Dispatch action to fetch students based on standardDivId
            //dispatch(CDABlockUnblockStudentslist(BlockUnblockStudentsBody, studentStatus));
        } else {
            setStandardDivId(0);
        }
    };

    const handleStudentsChange = (Value) => {
        console.log('handleStudentsChange', Value);
        setSelectStudents(Value);
    };

    const handleStatusChange = (value) => {
        //console.log('handleStatusChange', value);
        setStudentStatus(value);
        setSelectStudents('0');
    };
    //console.log(GetBlockUnblockList, 'GetBlockUnblockList')

    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Block Progress Report', path: '/RITeSchool/Teacher/BlockProgressReportBaseScreen' }
                ]}
                rightActions={<>
                    <SearchableDropdown2
                        ItemList={GetClassTeacherList}
                        onChange={handleDropdownChange}
                        label="Class Teacher"
                        defaultValue={selectedTeacher} //"1" // Default selected value
                        mandatory={true} // Mark field as mandatory (optional)
                        sx={{ width: '15vw' }} // Custom styling
                        size="small" // Dropdown size
                        DisableClearable={false} // Allow clearing the field
                        disabled={false} // Dropdown enabled
                    />
                    <SearchableDropdown2
                        ItemList={StudentsDropdown}
                        onChange={handleStudentsChange}
                        label="Student Name"
                        defaultValue={selectStudents}//"1" // Default selected value
                        mandatory={true} // Mark field as mandatory (optional)
                        sx={{ width: '15vw' }} // Custom styling
                        size="small" // Dropdown size
                        DisableClearable={false} // Allow clearing the field
                        disabled={false} // Dropdown enabled
                    />

                    <TextField
                        sx={{ width: '15vw' }}
                        fullWidth
                        label="Name / Reg. No."
                        value={undefined}
                        variant={'outlined'}
                        size={"small"}
                        onChange={(e) => {

                        }} onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === 'Tab') {
                                clickSearch();
                            }
                        }}></TextField>
                    <Tooltip title={'Search'}>
                        <IconButton
                            onClick={clickSearch}
                            sx={{
                                background: (theme) => theme.palette.primary.main,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: (theme) => theme.palette.primary.dark
                                }
                            }}
                        >
                            <SearchTwoTone />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Block/Unblock progress report of students.'}>
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

                    {studentStatus === 'showBlocked' && (
                        <Tooltip title="Unblock">
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: green[500],
                                    '&:hover': {
                                        backgroundColor: green[600]
                                    }
                                }}
                                onClick={AddNewPhoto}
                            >
                                <BlockIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    {studentStatus === 'showUnblocked' && (
                        <Tooltip title="Block">
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: red[500],
                                    '&:hover': {
                                        backgroundColor: red[600]
                                    }
                                }}
                                onClick={AddNewVideo}
                            >
                                <BlockIcon />
                            </IconButton>
                        </Tooltip>
                    )}

                </>}
            />

            <Box sx={{ backgroundColor: 'white', px: 2, mb: 1, py: 1 }}>
                <RadioGroup
                    row
                    value={studentStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    sx={{ mb: 4 }}

                >
                    <FormControlLabel value="showBlocked" control={<Radio />} label="Show Blocked Students" />
                    <FormControlLabel value="showUnblocked" control={<Radio />} label="Show Unblocked Students" />
                </RadioGroup>
            </Box>

            <Box sx={{ backgroundColor: 'white' }}>
                {/* Display Page Content */}
                {/* {selectedOption === 'Unblocked' ? ( */}
                {studentStatus === 'showBlocked' && BlockedStudentsList.length > 0 &&
                    <>
                        <Box sx={{
                            display: 'flex', gap: '20px', alignItems: 'center',
                            pt: 2, pl: 2,
                        }}>
                            <Typography variant="h4"
                                sx={{
                                    mb: 0, lineHeight: 'normal',
                                    alignSelf: 'center', paddingBottom: '2px'
                                }}>
                                Legend</Typography>
                            <Box sx={{ display: 'flex', gap: '20px' }}>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    {/* <SquareIcon style={{ color: green[500], fontSize: 25, position: 'relative', top: '-2px' }} /> */}
                                    <Box
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            backgroundColor: grey[300],
                                            border: "1px solid black",

                                        }}
                                    />
                                    <Typography>Blocked student progress report due to pending fees
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ px: 2, pb: 1 }}>
                            {/* {rowsData.length > 0 ? (
                                <Typography variant="subtitle1" sx={{ margin: '2px 0', textAlign: 'center' }}>
                                    <Box component="span" fontWeight="fontWeightBold">
                                        {startRecord} to {endRecord}
                                    </Box>
                                    {' '}out of{' '}
                                    <Box component="span" fontWeight="fontWeightBold">
                                        {rowsData.length}
                                    </Box>{' '}
                                    {rowsData.length === 1 ? 'record' : 'records'}
                                </Typography>
                            ) : (
                                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                    <b>No record found.</b>
                                </Typography>
                            )} */}
                            <ShowBlockedStudentsTable rowsData={BlockedStudentsList} />
                        </Box>
                    </>}
                {studentStatus === 'showUnblocked' && UnblockedStudentsList.length > 0 &&
                    <Box sx={{ px: 2, py: 1 }}>
                        <Box sx={{
                            display: 'flex', gap: '20px', alignItems: 'center',
                            pt: 1, pl: 0,
                        }}>
                            <Typography variant="h4"
                                sx={{
                                    mb: 0, lineHeight: 'normal',
                                    alignSelf: 'center', paddingBottom: '2px'
                                }}>
                                Legend</Typography>
                            <Box sx={{ display: 'flex', gap: '20px' }}>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    {/* <SquareIcon style={{ color: green[500], fontSize: 25, position: 'relative', top: '-2px' }} /> */}
                                    <Box
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            backgroundColor: grey[300],
                                            border: "1px solid black",

                                        }}
                                    />
                                    <Typography>Blocked student progress report due to pending fees
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        {/* {rowsData1.length > 0 ? (
                            <Typography variant="subtitle1" sx={{ margin: '2px 0', textAlign: 'center' }}>
                                <Box component="span" fontWeight="fontWeightBold">
                                    {startRecord} to {endRecord}
                                </Box>
                                {' '}out of{' '}
                                <Box component="span" fontWeight="fontWeightBold">
                                    {rowsData1.length}
                                </Box>{' '}
                                {rowsData1.length === 1 ? 'record' : 'records'}
                            </Typography>
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                <b>No record found.</b>
                            </Typography>
                        )} */}
                        <ShowUnblockedStudentsTable rowsData={UnblockedStudentsList} />
                    </Box>
                }

            </Box>
        </Box >
    )
}

export default BlockProgressReportBaseScreen






