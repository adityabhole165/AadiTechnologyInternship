import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Box, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Radio, RadioGroup, Select, Stack, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, yellow } from "@mui/material/colors";
import { useEffect, useState } from 'react';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import CommonPageHeader from '../CommonPageHeader';
import RegenerateRollNoList1 from './RegenerateRollNoList1';
import RegenerateRollNoList2 from './RegenerateRollNoList2';
const RegenarateRollNo = () => {
    // Hardcoded data arrays
    const dummyData = [
        {
            Id: 1,
            Name: 'Priority 1',
            Value: 1,
            options: [
                { Id: 0, label: 'Select', value: 'Select' },
                { Id: 1, label: 'First Name', value: 'firstName' },
                { Id: 2, label: 'Middle Name', value: 'middleName' },
                { Id: 3, label: 'Last Name', value: 'lastName' },
                { Id: 4, label: 'Gender', value: 'gender' },
                { Id: 5, label: 'Category', value: 'category' },
                { Id: 6, label: 'Registration Number', value: 'registrationNumber' },
            ]
        },
        {
            Id: 2,
            Name: 'Priority 2',
            Value: 2,
            options: [
                { Id: 0, label: 'Select', value: 'Select' },
                { Id: 1, label: 'First Name', value: 'firstName' },
                { Id: 2, label: 'Middle Name', value: 'middleName' },
                { Id: 3, label: 'Last Name', value: 'lastName' },
                { Id: 4, label: 'Gender', value: 'gender' },
                { Id: 5, label: 'Category', value: 'category' },
                { Id: 6, label: 'Registration Number', value: 'registrationNumber' },
            ]
        },
        {
            Id: 3,
            Name: 'Priority 3',
            Value: 3,
            options: [
                { Id: 0, label: 'Select', value: 'Select' },
                { Id: 1, label: 'First Name', value: 'firstName' },
                { Id: 2, label: 'Middle Name', value: 'middleName' },
                { Id: 3, label: 'Last Name', value: 'lastName' },
                { Id: 4, label: 'Gender', value: 'gender' },
                { Id: 5, label: 'Category', value: 'category' },
                { Id: 6, label: 'Registration Number', value: 'registrationNumber' },
            ]
        },
        {
            Id: 4,
            Name: 'Priority 4',
            Value: 4,
            options: [
                { Id: 0, label: 'Select', value: 'Select' },
                { Id: 1, label: 'First Name', value: 'firstName' },
                { Id: 2, label: 'Middle Name', value: 'middleName' },
                { Id: 3, label: 'Last Name', value: 'lastName' },
                { Id: 4, label: 'Gender', value: 'gender' },
                { Id: 5, label: 'Category', value: 'category' },
                { Id: 6, label: 'Registration Number', value: 'registrationNumber' },
            ]
        },
        {
            Id: 5,
            Name: 'Priority 5',
            Value: 5,
            options: [
                { Id: 0, label: 'Select', value: 'Select' },
                { Id: 1, label: 'First Name', value: 'firstName' },
                { Id: 2, label: 'Middle Name', value: 'middleName' },
                { Id: 3, label: 'Last Name', value: 'lastName' },
                { Id: 4, label: 'Gender', value: 'gender' },
                { Id: 5, label: 'Category', value: 'category' },
                { Id: 6, label: 'Registration Number', value: 'registrationNumber' },
            ]
        },
        {
            Id: 6,
            Name: 'Priority 6',
            Value: 6,
            options: [
                { Id: 0, label: 'Select', value: 'Select' },
                { Id: 1, label: 'First Name', value: 'firstName' },
                { Id: 2, label: 'Middle Name', value: 'middleName' },
                { Id: 3, label: 'Last Name', value: 'lastName' },
                { Id: 4, label: 'Gender', value: 'gender' },
                { Id: 5, label: 'Category', value: 'category' },
                { Id: 6, label: 'Registration Number', value: 'registrationNumber' },
            ]
        }
    ];

    const dropdownData = [
        { Id: 0, Name: " Select", Value: "Select" },
        { Id: 1, Name: " All", Value: "all" },
        { Id: 2, Name: "Nursery", Value: "nursery" },
        { Id: 3, Name: "Junior KG", Value: "junior_kg" },
        { Id: 4, Name: "Senior KG", Value: "senior_kg" },
        { Id: 5, Name: "1", Value: "1" },
        { Id: 6, Name: "2", Value: "2" },
        { Id: 7, Name: "3", Value: "3" },
        { Id: 8, Name: "4", Value: "4" },
        { Id: 9, Name: "5", Value: "5" },
        { Id: 10, Name: "6", Value: "6" },
        { Id: 11, Name: "7", Value: "7" },
        { Id: 12, Name: "8", Value: "8" },
        { Id: 13, Name: "9", Value: "9" },
        { Id: 14, Name: "10", Value: "10" },
    ];

    const divisionDropdown = [
        { Id: 0, Name: " Select", Value: "Select" },
        { Id: 1, Name: "All", Value: "all" },
        { Id: 2, Name: "A", Value: "a" },
        { Id: 3, Name: "B", Value: "b" },
        { Id: 4, Name: "C", Value: "c" },
        { Id: 5, Name: "D", Value: "d" },
        { Id: 6, Name: "E", Value: "e" },
    ];

    const [HeaderList1, setHeaderList1] = useState([
        { Id: 1, Header: 'Reg. No.', SortOrder: null, sortKey: 'RegNo' },
        { Id: 2, Header: 'Class', SortOrder: null, sortKey: 'Class' },
        { Id: 3, Header: 'Roll No.', SortOrder: 'desc', sortKey: 'RollNo' },
        { Id: 4, Header: 'Student Name', SortOrder: null, sortKey: 'StudentName' },
        { Id: 5, Header: 'Date of Birth', SortOrder: null, sortKey: 'DateOfBirth' },
        { Id: 6, Header: 'Category', SortOrder: null, sortKey: 'Category' }
    ]);
    const [HeaderList2, setHeaderList2] = useState([
        { Id: 1, Header: 'Reg. No.', SortOrder: null, sortKey: 'RegNo' },
        { Id: 2, Header: 'Class', SortOrder: null, sortKey: 'Class' },
        { Id: 3, Header: 'Roll No.', SortOrder: 'desc', sortKey: 'RollNo' },
        { Id: 4, Header: 'New Roll No.', SortOrder: null, sortKey: 'NewRollNo' },
        { Id: 5, Header: 'Student Name', SortOrder: null, sortKey: 'StudentName' },
        { Id: 6, Header: 'Date of Birth', SortOrder: null, sortKey: 'DateOfBirth' },
        { Id: 7, Header: 'Category', SortOrder: null, sortKey: 'Category' }
    ]);
    const [dummyDataList1, setdummyDataList1] = useState([
        { RegNo: 4226, Class: '1-A', RollNo: 1, StudentName: 'Master Aarav Deshmukh', DateOfBirth: '22 Nov 2017', Category: 'OBC' },
        { RegNo: 4321, Class: '1-A', RollNo: 2, StudentName: 'Master Rohan Patil', DateOfBirth: '11 Jul 2018', Category: 'Other' },
        { RegNo: 4279, Class: '1-A', RollNo: 3, StudentName: 'Master Ayaan Koli', DateOfBirth: '22 Jun 2018', Category: 'OPEN' },
        { RegNo: 4264, Class: '1-A', RollNo: 4, StudentName: 'Master Ishan More', DateOfBirth: '16 Jul 2017', Category: 'OPEN' },
        { RegNo: 4299, Class: '1-A', RollNo: 5, StudentName: 'Miss Priya Desai', DateOfBirth: '23 Feb 2018', Category: 'OPEN' },
        { RegNo: 4229, Class: '1-A', RollNo: 6, StudentName: 'Miss Neha Shah', DateOfBirth: '18 Feb 2018', Category: 'OPEN' },
        { RegNo: 4281, Class: '1-A', RollNo: 7, StudentName: 'Master Aryan Patil', DateOfBirth: '30 Apr 2018', Category: 'OPEN' },
        { RegNo: 4308, Class: '1-A', RollNo: 8, StudentName: 'Miss Simran Rathi', DateOfBirth: '30 Sep 2018', Category: 'GENERAL' },
        { RegNo: 4173, Class: '1-A', RollNo: 9, StudentName: 'Miss Ananya Joshi', DateOfBirth: '14 Oct 2017', Category: 'OPEN' },
        { RegNo: 4252, Class: '1-A', RollNo: 10, StudentName: 'Miss Meera Deshmukh', DateOfBirth: '02 May 2018', Category: 'OBC' },
        { RegNo: 4307, Class: '1-A', RollNo: 11, StudentName: 'Master Sahil Kulkarni', DateOfBirth: '21 Jun 2018', Category: 'GENERAL' },
        { RegNo: 4196, Class: '1-A', RollNo: 12, StudentName: 'Miss Aditi Kadam', DateOfBirth: '11 Jul 2018', Category: 'SBC' },
        { RegNo: 4235, Class: '1-A', RollNo: 13, StudentName: 'Miss Sanya Chavan', DateOfBirth: '05 Nov 2018', Category: 'OPEN' },
        { RegNo: 4167, Class: '1-A', RollNo: 14, StudentName: 'Master Karan Shinde', DateOfBirth: '04 Jan 2018', Category: 'OPEN' },
        { RegNo: 4322, Class: '1-A', RollNo: 15, StudentName: 'Master Pranav Yadav', DateOfBirth: '28 Apr 2018', Category: 'GENERAL' },
        { RegNo: 4350, Class: '1-A', RollNo: 16, StudentName: 'Miss Riya Patil', DateOfBirth: '15 Feb 2018', Category: 'OBC' },
        { RegNo: 4375, Class: '1-A', RollNo: 17, StudentName: 'Master Aryan Joshi', DateOfBirth: '22 Mar 2018', Category: 'GENERAL' },
        { RegNo: 4401, Class: '1-A', RollNo: 18, StudentName: 'Miss Priya Naik', DateOfBirth: '18 Apr 2018', Category: 'OPEN' },
        { RegNo: 4430, Class: '1-A', RollNo: 19, StudentName: 'Master Arjun Patil', DateOfBirth: '12 May 2018', Category: 'SC' },
        { RegNo: 4456, Class: '1-A', RollNo: 20, StudentName: 'Miss Ananya Ghadge', DateOfBirth: '20 Jun 2018', Category: 'SBC' },
        { RegNo: 4478, Class: '1-A', RollNo: 21, StudentName: 'Master Rohan Jadhav', DateOfBirth: '08 Jul 2018', Category: 'GENERAL' },
        { RegNo: 4502, Class: '1-A', RollNo: 22, StudentName: 'Miss Sneha Pawar', DateOfBirth: '25 Aug 2018', Category: 'OBC' }
    ]);

    const [dummyDataList2, setdummyDataList2] = useState([
        { RegNo: 4226, Class: '1-A', RollNo: 1, NewRollNo: 1, StudentName: 'Master Yatharth Kshitij Raut', DateOfBirth: '22 Nov 2017', Category: 'OBC' },
        { RegNo: 4321, Class: '1-A', RollNo: 2, NewRollNo: 2, StudentName: 'Master Vivaan Vaibhav Yadav', DateOfBirth: '11 Jul 2018', Category: 'Other' },
        { RegNo: 4279, Class: '1-A', RollNo: 3, NewRollNo: 3, StudentName: 'Master Virat Mohan Kalbhor', DateOfBirth: '22 Jun 2018', Category: 'OPEN' },
        { RegNo: 4264, Class: '1-A', RollNo: 4, NewRollNo: 4, StudentName: 'Master Vihaan Pushpendra Mahajan', DateOfBirth: '16 Jul 2017', Category: 'OPEN' },
        { RegNo: 4299, Class: '1-A', RollNo: 5, NewRollNo: 5, StudentName: 'Miss Veera Sandeep Randive', DateOfBirth: '23 Feb 2018', Category: 'OPEN' },
        { RegNo: 4229, Class: '1-A', RollNo: 6, NewRollNo: 6, StudentName: 'Miss Tanishka Radhesham Sarda', DateOfBirth: '18 Feb 2018', Category: 'OPEN' },
        { RegNo: 4281, Class: '1-A', RollNo: 7, NewRollNo: 7, StudentName: 'Master Swojas Rajadhyaksha', DateOfBirth: '30 Apr 2018', Category: 'OPEN' },
        { RegNo: 4308, Class: '1-A', RollNo: 8, NewRollNo: 8, StudentName: 'Miss Smayra Kirankumar Chandergi', DateOfBirth: '30 Sep 2018', Category: 'GENERAL' },
        { RegNo: 4173, Class: '1-A', RollNo: 9, NewRollNo: 9, StudentName: 'Miss Shubhada Tushar Dunde', DateOfBirth: '14 Oct 2017', Category: 'OPEN' },
        { RegNo: 4252, Class: '1-A', RollNo: 10, NewRollNo: 10, StudentName: 'Miss Shreesha Swapnil Velhal', DateOfBirth: '02 May 2018', Category: 'OBC' },
        { RegNo: 4307, Class: '1-A', RollNo: 11, NewRollNo: 11, StudentName: 'Master Shahu Amol Boraste', DateOfBirth: '21 Jun 2018', Category: 'GENERAL' },
        { RegNo: 4196, Class: '1-A', RollNo: 12, NewRollNo: 12, StudentName: 'Miss Shaarvi Santosh Kangle', DateOfBirth: '11 Jul 2018', Category: 'SBC' },
        { RegNo: 4235, Class: '1-A', RollNo: 13, NewRollNo: 13, StudentName: 'Miss Saanvi Chetan Shinde', DateOfBirth: '05 Nov 2018', Category: 'OPEN' },
        { RegNo: 4167, Class: '1-A', RollNo: 14, NewRollNo: 14, StudentName: 'Master Rutvik Rajendra Chavan', DateOfBirth: '04 Jan 2018', Category: 'OPEN' },
        { RegNo: 4322, Class: '1-A', RollNo: 15, NewRollNo: 15, StudentName: 'Master Rugved Shrikant Chavan', DateOfBirth: '28 Apr 2018', Category: 'GENERAL' },
        { RegNo: 4350, Class: '1-A', RollNo: 16, NewRollNo: 16, StudentName: 'Miss Riya Radhesham Patil', DateOfBirth: '15 Feb 2018', Category: 'OBC' },
        { RegNo: 4375, Class: '1-A', RollNo: 17, NewRollNo: 17, StudentName: 'Master Aryan Arjun Joshi', DateOfBirth: '22 Mar 2018', Category: 'GENERAL' },
        { RegNo: 4401, Class: '1-A', RollNo: 18, NewRollNo: 18, StudentName: 'Miss Priya Shahu Naik', DateOfBirth: '18 Apr 2018', Category: 'OPEN' },
        { RegNo: 4430, Class: '1-A', RollNo: 19, NewRollNo: 19, StudentName: 'Master Arjun Sandeep Patil', DateOfBirth: '12 May 2018', Category: 'SC' },
        { RegNo: 4456, Class: '1-A', RollNo: 20, NewRollNo: 20, StudentName: 'Miss Ananya Sandeep Ghadge', DateOfBirth: '20 Jun 2018', Category: 'SBC' },
        { RegNo: 4478, Class: '1-A', RollNo: 21, NewRollNo: 21, StudentName: 'Master Rohan Vaibhav Jadhav', DateOfBirth: '08 Jul 2018', Category: 'GENERAL' },
        { RegNo: 4502, Class: '1-A', RollNo: 22, NewRollNo: 22, StudentName: 'Miss Sneha Vaibhav Pawar', DateOfBirth: '25 Aug 2018', Category: 'OBC' }
    ]);
    const totalCount = dummyDataList2.length;
    const [selectStandard, setDisplayType] = useState('Select');
    const [selectDivision, setDivision] = useState('Select');
    const [open, setOpen] = useState(false);
    const [isShowClicked, setIsShowClicked] = useState(false);
    const [ShowRollNo, setShowRollNo] = useState("true");
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const [page, setPage] = useState(1);
    const [sortExpression, setSortExpression] = useState('RollNo desc');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // Initial sorting direction (ascending)
    const [sortedData, setSortedData] = useState(dummyDataList2); // Initial sorted data
    const [isAscending, setIsAscending] = useState(true);
    const [isClicked, setIsClicked] = useState(false);

    const handleAscendClick = () => {
        setIsAscending(true);
        setIsClicked(!isClicked);
    };

    const handleDescendClick = () => {
        setIsAscending(false);
        setIsClicked(!isClicked);
    };

    const filteredList = ShowRollNo === "true" ? dummyDataList2.filter(
        (item) => totalCount !== undefined
    ) : dummyDataList1.filter(
        (item) => totalCount !== undefined
    );

    const TotalCount = filteredList.map((item) => totalCount);
    const uniqueTotalCount = [...new Set(TotalCount)];
    const singleTotalCount = uniqueTotalCount[0];

    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
    const pagecount = Math.ceil(singleTotalCount / rowsPerPage);

    const [selectedOptions, setSelectedOptions] = useState({});

    useEffect(() => {
        // Set default selected option for each dropdown to the first option (if available)
        const initialSelectedOptions = dummyData.reduce((acc, item) => {
            acc[item.Id] = item.options[0].value; // Select the first option by default
            return acc;
        }, {});

        setSelectedOptions(initialSelectedOptions);
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Handle Select change
    const handleSelectChange = (e, priorityId) => {
        setSelectedOptions({
            ...selectedOptions,
            [priorityId]: e.target.value, // Update selected value for the specific dropdown
        });
    };
    const handleClick = () => {
        setIsClicked(!isClicked); // Toggle the clicked state
    };

    const clickShowAllNotices = (value) => {
        setShowRollNo(value);
        setIsShowClicked(false);
    };

    const clickStandardDropdown = (value) => {
        setDisplayType(value);
        setShowRollNo('true')
        setRowsPerPage(20)
        setPage(1);
    };
    const handleHeaderClickk = (updatedHeaderArray) => {
        setHeaderList1(updatedHeaderArray);
        const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
        const newSortExpression = sortField ? `${sortField.sortKey} ${sortField.SortOrder}` : 'RollNo desc';
        setSortExpression(newSortExpression);
    };

    const handleHeaderClick = (updatedHeaderArray) => {
        setHeaderList2(updatedHeaderArray);
        const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
        const newSortExpression = sortField ? `${sortField.sortKey} ${sortField.SortOrder}` : 'RollNo desc';
        setSortExpression(newSortExpression);
    };

    const clickDivisionDropdown = (value) => {
        setDivision(value);
        setRowsPerPage(20)
        setPage(1);
    };
    const ClickShow = () => {
        if (ShowRollNo === "true" || ShowRollNo === "false") {
            setOpen(true);
            setIsShowClicked(true);
        }
    };
    const ClickChangeInput = () => {
        setShowRollNo("true"); // Set the first radio button as selected
        setIsShowClicked(false); // Ensure the list is not displayed
    };
    const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };
    const PageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[{ title: 'Regenerate/Reassign Roll Nos', path: ' ' }]}
                rightActions={
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        // justifyContent="space-between"
                        alignItems="right"

                        spacing={2}
                        sx={{

                            mt: { xs: 0, sm: 0 },
                            flexWrap: { xs: 'nowrap', sm: 'nowrap' }
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            display="flex"
                            justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                        >
                            <Stack
                                direction="row"
                                gap={1}
                                alignItems="left"
                                sx={{
                                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                                    justifyContent: { xs: 'flex-start', sm: 'flex-start' }
                                }}
                            >
                                <Box>
                                    <SearchableDropdown
                                        sx={{ minWidth: '13vw' }}
                                        ItemList={dropdownData}
                                        defaultValue={selectStandard}
                                        onChange={clickStandardDropdown}
                                        size={'small'}
                                        label={'Standard'}
                                    />
                                </Box>
                            </Stack>
                        </Grid>
                        <Box>
                            <SearchableDropdown
                                sx={{ minWidth: '13vw' }}
                                ItemList={divisionDropdown}
                                defaultValue={selectDivision}
                                onChange={clickDivisionDropdown}
                                size={'small'}
                                label="Division"
                            />
                        </Box>
                        <Stack
                            direction={{ xs: 'row', sm: 'row' }}
                            spacing={1}
                            alignItems="center"
                            justifyContent="flex-end"
                            sx={{
                                width: '100%',
                                flexWrap: { xs: 'wrap', sm: 'nowrap' }
                            }}
                        >

                            <Tooltip title={'Show'}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: blue[500],
                                        '&:hover': {
                                            backgroundColor: blue[600]
                                        }
                                    }}
                                    onClick={ClickShow}
                                >
                                    <VisibilityTwoToneIcon />
                                </IconButton>
                            </Tooltip>


                            <Tooltip title={'Change Input'}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: blue[500],
                                        '&:hover': {
                                            backgroundColor: blue[600]
                                        }
                                    }}
                                    onClick={ClickChangeInput} // Replace with actual function if needed
                                >
                                    <RestartAltIcon />
                                </IconButton>
                            </Tooltip>
                            {ShowRollNo === "true" ? (
                                <Tooltip title={'Regenerate Roll No'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: blue[500],
                                            '&:hover': {
                                                backgroundColor: blue[600]
                                            }
                                        }}
                                        onClick={ClickChangeInput} // Replace with actual function if needed
                                    >
                                        <RepeatOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title={`Save`}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: green[600] }
                                        }}
                                        onClick={undefined}
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                            )}

                            <Tooltip title={`If any exam result is published then updated roll number will not be displayed on the progress report on screen.`}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: yellow[600],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: yellow[700] },
                                    }}
                                >
                                    <PriorityHighIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={`Select standard and division and regenerate / reassign the roll numbers from displayed student's list and click on save to save new roll numbers.`}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: grey[500],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: grey[600] },
                                    }}
                                >
                                    <QuestionMarkIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                }
            />
            <Box>
                <Grid sx={{ backgroundColor: 'white', mb: 1, p: 1 }}>
                    <Grid item sm={12} px={0} sx={{ display: 'flex', justifyItems: "center" }} >
                        <Grid >
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row
                                    aria-label="options"
                                    name="options"
                                    value={ShowRollNo}
                                    onChange={(e) => { clickShowAllNotices(e.target.value) }} // Corrected onChange handler
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="Regenerate Roll.No." />
                                    <FormControlLabel value="false" control={<Radio />} label="Reassign Roll.No." />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid >
            </Box>
            {ShowRollNo === "true" && (
                <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: 'white' }}>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                        Criteria For Roll Number Generation
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Please select at least one field for generating roll number.
                    </Typography>
                    <Grid container spacing={2}>
                        {dummyData.map((item, index) => (
                            <Grid item xs={12} sm={6} lg={4} key={item.Id}>
                                <Select
                                    value={selectedOptions[item.Id] || ''} // Default to empty if no value is selected
                                    onChange={(e) => handleSelectChange(e, item.Id)} // Handle change for each dropdown
                                    size="medium"
                                    sx={{ flexGrow: 1, marginRight: 1, width: { xs: '65%', sm: '30vw', md: '30vw', lg: '75%', color: 'black', } }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                maxHeight: 150, // Set max height for the dropdown
                                                overflowY: 'auto', // Enable vertical scrolling
                                            },
                                        },
                                    }}
                                >
                                    {item.options.map((option) => (
                                        <MenuItem key={option.value} value={option.value} sx={{ color: 'black !important' }}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Tooltip title="Ascending">
                                    <IconButton
                                        onClick={handleAscendClick}
                                        sx={{
                                            border: (theme) => `1px solid ${theme.palette.divider}`,
                                            height: '36px !important',
                                            mr: 1,
                                            backgroundColor: isClicked && isAscending ? blue[400] : 'transparent',
                                            color: isClicked && isAscending ? 'white' : 'inherit',
                                        }}
                                    >
                                        <ArrowUpwardIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Descending">
                                    <IconButton
                                        onClick={handleDescendClick}
                                        sx={{
                                            border: (theme) => `1px solid ${theme.palette.divider}`,
                                            height: '36px !important',
                                            backgroundColor: isClicked && !isAscending ? blue[400] : 'transparent',
                                            color: isClicked && !isAscending ? 'white' : 'inherit',
                                        }}
                                    >
                                        <ArrowDownwardIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}


            {/* Conditionally render RegenerateRollNoList1 or RegenerateRollNoList2 based on ShowRollNo value */}
            {isShowClicked && ShowRollNo === "true" ? (
                <Box sx={{ background: 'white', pr: 2, pl: 2, pt: 1, pb: 2 }}>
                    {singleTotalCount > 0 ? (
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <Typography variant='subtitle1' sx={{ margin: '16px 0', textAlign: 'center' }}>
                                <Box component='span' fontWeight='fontWeightBold'>
                                    {startRecord} to {endRecord}
                                </Box>{' '}
                                out of{' '}
                                <Box component='span' fontWeight='fontWeightBold'>
                                    {singleTotalCount}
                                </Box>{' '}
                                {singleTotalCount === 1 ? 'record' : 'records'}
                            </Typography>
                        </div>
                    ) : (
                        <span> </span>
                    )}

                    {dummyDataList1 && dummyDataList1.length > 0 ? (
                        <RegenerateRollNoList1
                            HeaderArray={HeaderList1}
                            ItemList={dummyDataList1}
                            ClickHeader={handleHeaderClickk}
                        />
                    ) : (
                        <Box sx={{ backgroundColor: '#D2FDFC' }}>
                            <Typography
                                variant="h6"
                                align="center"
                                sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}
                            >
                                No record found.
                            </Typography>
                        </Box>
                    )}

                    {totalCount > 19 ? (
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
                </Box>
            ) : ShowRollNo === "false" && (
                <Box sx={{ background: 'white', pr: 2, pl: 2, pt: 1, pb: 2 }}>
                    {singleTotalCount > 0 ? (
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <Typography variant='subtitle1' sx={{ margin: '16px 0', textAlign: 'center' }}>
                                <Box component='span' fontWeight='fontWeightBold'>
                                    {startRecord} to {endRecord}
                                </Box>{' '}
                                out of{' '}
                                <Box component='span' fontWeight='fontWeightBold'>
                                    {singleTotalCount}
                                </Box>{' '}
                                {singleTotalCount === 1 ? 'record' : 'records'}
                            </Typography>
                        </div>
                    ) : (
                        <span> </span>
                    )}

                    {dummyDataList2 && dummyDataList2.length > 0 ? (
                        <RegenerateRollNoList2
                            HeaderArray={HeaderList2}
                            ItemList={dummyDataList2}
                            ClickHeader={handleHeaderClick}
                        />
                    ) : (
                        <Box sx={{ backgroundColor: '#D2FDFC' }}>
                            <Typography
                                variant="h6"
                                align="center"
                                sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}
                            >
                                No record found.
                            </Typography>
                        </Box>
                    )}

                    {totalCount > 19 ? (
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
                </Box>
            )}
        </Box>
    );
}
export default RegenarateRollNo;
