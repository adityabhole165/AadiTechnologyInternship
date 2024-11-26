import { AddPhotoAlternate, QuestionMark, SearchTwoTone, VideoLibrary } from '@mui/icons-material';
import { Box, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import React, { useState } from 'react';
import CommonPageHeader from '../CommonPageHeader';
import AddNewPhoto from '../PhotoVideoGallery/AddNewPhoto';
import AddNewVideo from '../PhotoVideoGallery/AddNewVideo';
import SearchableDropdown2 from './SearchableDropdown2';
import ShowBlockedStudentsTable from './ShowBlockedStudentsTable';
import ShowUnblockedStudentsTable from './ShowUnblockedStudentsTable';
import BlockIcon from '@mui/icons-material/Block';

const BlockProgressReportBaseScreen = () => {
    const [selectedOption, setSelectedOption] = useState<string>('Blocked');
    const [selectedValue, setSelectedValue] = useState<string>('');

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
    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Block Progress Report', path: '/extended-sidebar/Teacher/BlockProgressReportBaseScreen' }
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
                {selectedOption === 'photo' ? (
                    <Box sx={{ px: 2, py: 1}}>
                        <Typography variant="h4" gutterBottom>
                            Show Blocked Students
                        </Typography>
                        <ShowBlockedStudentsTable rowsData={rowsData} />

 
                    </Box>
                ) : (
                    <Box sx={{ px: 2, py: 1 }}>
                        <Typography variant="h4" gutterBottom>
                            Show Unblocked Students
                        </Typography>

                         <ShowUnblockedStudentsTable rowsData={rowsData1} />



                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default BlockProgressReportBaseScreen