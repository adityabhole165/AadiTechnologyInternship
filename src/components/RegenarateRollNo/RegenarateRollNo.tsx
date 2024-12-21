import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Radio, RadioGroup, Select, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, yellow } from "@mui/material/colors";
import { useState } from 'react';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import CommonPageHeader from '../CommonPageHeader';

const RegenarateRollNo = () => {
    // Hardcoded data arrays
    const dummyData = [
        { Id: 1, Name: 'Priority 1', Value: 1 },
        { Id: 2, Name: 'Priority 2', Value: 2 },
        { Id: 3, Name: 'Priority 3', Value: 3 },
        { Id: 4, Name: 'Priority 4', Value: 4 },
        { Id: 5, Name: 'Priority 5', Value: 5 },
        { Id: 6, Name: 'Priority 6', Value: 6 },
    ];
    const dropdownData = [
        { Id: 0, Name: " All", Value: "all" },
        { Id: 1, Name: "Nursery", Value: "nursery" },
        { Id: 2, Name: "Junior KG", Value: "junior_kg" },
        { Id: 3, Name: "Senior KG", Value: "senior_kg" },
        { Id: 4, Name: "1", Value: "1" },
        { Id: 5, Name: "2", Value: "2" },
        { Id: 6, Name: "3", Value: "3" },
        { Id: 7, Name: "4", Value: "4" },
        { Id: 8, Name: "5", Value: "5" },
        { Id: 9, Name: "6", Value: "6" },
        { Id: 10, Name: "7", Value: "7" },
        { Id: 11, Name: "8", Value: "8" },
        { Id: 12, Name: "9", Value: "9" },
        { Id: 13, Name: "10", Value: "10" },
    ];

    const divisionDropdown = [
        { Id: 0, Name: "All", Value: "all" },
        { Id: 1, Name: "A", Value: "a" },
        { Id: 2, Name: "B", Value: "b" },
        { Id: 3, Name: "C", Value: "c" },
        { Id: 4, Name: "D", Value: "d" },
        { Id: 5, Name: "E", Value: "e" },
    ];
    const [isClicked, setIsClicked] = useState(false);
    const [selectDisplayType, setDisplayType] = useState('all');
    const [selectDisplayLocation, setDisplayLocation] = useState('all');
    const [ShowRollNo, setShowRollNo] = useState("true");
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const [page, setPage] = useState(1);
    const handleClick = () => {
        setIsClicked(!isClicked); // Toggle the clicked state
    };

    const clickShowAllNotices = (value) => {
        setShowRollNo(value);
    };

    const clickDisplayTypeDropdown = (value) => {
        setDisplayType(value);
        setShowRollNo('true')
        setRowsPerPage(20)
        setPage(1);
    };

    const clickDisplayLocationDropdown = (value) => {
        setDisplayLocation(value);
        setRowsPerPage(20)
        setPage(1);
    };
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[{ title: 'Regenerate/Reassign Roll Nos', path: ' ' }]}
                rightActions={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <SearchableDropdown
                            sx={{ minWidth: '13vw' }}
                            ItemList={dropdownData}
                            defaultValue={selectDisplayType}
                            onChange={clickDisplayTypeDropdown}
                            size={'small'}
                            label={'Standard'}
                        />
                        <SearchableDropdown
                            sx={{ minWidth: '13vw' }}
                            ItemList={divisionDropdown}
                            defaultValue={selectDisplayLocation}
                            onChange={clickDisplayTypeDropdown}
                            size={'small'}
                            label='Division'
                        />
                        <Box>
                            <Tooltip
                                title={`If any exam result is published then updated roll number will not be displayed on the progress report on screen.`}
                            >
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
                        </Box>

                        <Box>
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
                        </Box>
                        <Box>
                            <Tooltip title={`Save`}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: green[500],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: green[600] },
                                    }}
                                    onClick={() => console.log("Save Button Clicked")}
                                >
                                    <SaveIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
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
                                    onChange={(e) => { clickShowAllNotices(e.target.defaultValue) }}
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="Regenerate Roll.No." />
                                    <FormControlLabel value="false" control={<Radio />} label="Reassign Roll.No.
" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                    </Grid>
                </Grid >
            </Box>
            <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: 'white' }}>
                <Typography variant="h4" sx={{ mb: 1 }}>Criteria For Roll Number Generation
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>Please select atleast one field for generating roll number.
                </Typography>
                <Grid container spacing={2}>
                    {dummyData.map((item, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={item.Id}>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    border: '1px solid #ddd',
                                    padding: 2,
                                    borderRadius: 2,
                                }}
                            > */}
                            <Select
                                value={item.Name}
                                size="medium"

                                sx={{ flexGrow: 1, marginRight: 1, width: '80%' }}
                            >
                                <MenuItem value={item.Name}>{item.Name}</MenuItem>
                            </Select>
                            <IconButton
                                onClick={handleClick}
                                sx={{
                                    border: (theme) => `1px solid ${theme.palette.divider}`,
                                    height: '36px !important',
                                    mr: 1,
                                    backgroundColor: isClicked ? blue[400] : 'transparent', // Change background color on click
                                    color: isClicked ? 'white' : 'inherit', // Adjust text/icon color for visibility
                                }}
                            >
                                <ArrowUpwardIcon />
                            </IconButton>
                            <IconButton sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, height: '36px !important' }}>
                                <ArrowDownwardIcon />
                            </IconButton>
                            {/* </Box> */}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default RegenarateRollNo;
