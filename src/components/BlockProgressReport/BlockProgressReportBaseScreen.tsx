import { QuestionMark, SearchTwoTone } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import { Box, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import AddNewPhoto from '../PhotoVideoGallery/AddNewPhoto';
import AddNewVideo from '../PhotoVideoGallery/AddNewVideo';
import SearchableDropdown2 from './SearchableDropdown2';
import ShowBlockedStudentsTable from './ShowBlockedStudentsTable';
import ShowUnblockedStudentsTable from './ShowUnblockedStudentsTable';

const BlockProgressReportBaseScreen = () => {
    const [selectedOption, setSelectedOption] = useState<string>('Blocked');
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState(1);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };
    function clickSearch() {
        throw new Error('Function not implemented.');
    }

    const handleDropdownChange = (value: string) => {
        setSelectedValue(value);
        console.log('Selected Value:', value);
    };

    const dropdownItems = [
        { Value: '1', Name: 'Option 1' },
        { Value: '2', Name: 'Option 2' },
        { Value: '3', Name: 'Option 3' },
        { Value: '4', Name: 'Option 4' },
    ];
    const rowsData = [
        { rollNo: 1, name: 'Miss Pranjal Pritam Bajare', reason: 'Pending fees' },
        { rollNo: 2, name: 'Miss Sakshi Anand Battale', reason: 'Incomplete forms' },
    ];
    const rowsData1 = [
        { rollNo: 3, name: 'Miss Ayushi Raju Daptare', reason: '' },
        { rollNo: 4, name: 'Miss Sharvari Dada Dhumal', reason: '' },
        { rollNo: 5, name: 'Miss Kinjal Kiran Gadiya', reason: '' },
        { rollNo: 6, name: 'Miss Rudrapriya Ghosh', reason: '' },
        { rollNo: 7, name: 'Miss Svara Abhijit Gogawale', reason: '' },
        { rollNo: 8, name: 'Miss Ira Sanjay Gondhale', reason: '' },
        { rollNo: 9, name: 'Miss Anushri Anil Jadhav', reason: '' },
        { rollNo: 10, name: 'Miss Ishita Narendra Jain', reason: '' },
        { rollNo: 11, name: 'Miss Tanvesha Nitin Lokhande', reason: '' },
    ];
    const CountGetPagedRequisition: any = useSelector(
        (state: RootState) => state.SliceRequisition.RequisitionListCount

    );

    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, CountGetPagedRequisition.TotalCount);
    const pagecount = Math.ceil(CountGetPagedRequisition.TotalCount / rowsPerPage);
    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };
    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Block Progress Report', path: '/RITeSchool/Teacher/BlockProgressReportBaseScreen' }
                ]}
                rightActions={<>
                    <SearchableDropdown2
                        ItemList={dropdownItems}
                        onChange={handleDropdownChange}
                        label="Class Teacher"
                        defaultValue="1" // Default selected value
                        mandatory={true} // Mark field as mandatory (optional)
                        sx={{ width: '15vw' }} // Custom styling
                        size="small" // Dropdown size
                        DisableClearable={false} // Allow clearing the field
                        disabled={false} // Dropdown enabled
                    />
                    <SearchableDropdown2
                        ItemList={dropdownItems}
                        onChange={handleDropdownChange}
                        label="Student Name"
                        defaultValue="1" // Default selected value
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

                    {selectedOption === 'Unblocked' && (
                        <Tooltip title="Unblocked">
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
                    {selectedOption === 'Blocked' && (
                        <Tooltip title="Blocked">
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
                    value={selectedOption}
                    onChange={handleChange}
                //   sx={{ mb: 4 }}
                >
                    <FormControlLabel value="Unblocked" control={<Radio />} label="Show Blocked Students" />
                    <FormControlLabel value="Blocked" control={<Radio />} label="Show Unblocked Students
" />
                </RadioGroup>
            </Box>
            <Box sx={{ backgroundColor: 'white' }}>
                {/* Display Page Content */}
                {selectedOption === 'Unblocked' ? (
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
                            {rowsData.length > 0 ? (
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
                            )}
                            <ShowBlockedStudentsTable rowsData={rowsData} />
                        </Box>
                    </>
                ) : (
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
                        {rowsData1.length > 0 ? (
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
                        )}
                        <ShowUnblockedStudentsTable rowsData={rowsData1} />
                    </Box>
                )}
            </Box>
        </Box >
    )
}

export default BlockProgressReportBaseScreen