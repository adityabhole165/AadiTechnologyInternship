import { SearchTwoTone } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { Box, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import { useState } from 'react';
import CommonPageHeader from '../CommonPageHeader';
import AddNewPhoto from '../PhotoVideoGallery/AddNewPhoto';
import FeedbackFromUsersTable from './FeedbackFromUsersTable';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
const FeedbackDetailsBasescreen = () => {
    function clickSearch() {
        throw new Error('Function not implemented.');
    }
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState(1);
    const [SelectResult, setSelectResult] = useState(0);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const [selectedFeedback, setSelectedFeedback] = useState<string>("users");
    const startRecord = (page - 1) * rowsPerPage + 1;


    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFeedback(event.target.value);
    };
    const GetRequisitionStatusDropdown = (value) => {
        setSelectResult(value);
        setRowsPerPage(20)
        setPage(1);
    };
      const CountGetPagedRequisition: any = useSelector(
        (state: RootState) => state.SliceRequisition.RequisitionListCount

    );
    const dummyData = [
        { id: 1, date: "28 Sep 2024", userName: "Omkar", email: "test@gmail.com", comments: "Sample comment 1" },
        { id: 2, date: "26 Aug 2024", userName: "Omkar Nanaware", email: "test2@gmail.com", comments: "Sample comment 2" },
        { id: 3, date: "24 Jul 2024", userName: "Prisha Prasad Ombhase", email: "test3@gmail.com", comments: "Sample comment 3" },
      ];
    
     
    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Feedback Details', path: '/extended-sidebar/Teacher/FeedbackDetailsBasescreen' }
                ]}
                rightActions={<>
                    <TextField
                        sx={{ width: '15vw' }}
                        fullWidth
                        label="User Name"
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
                    {/* <Tooltip title={'Create new photo galleries or add photos to existing gallery. You can also view all gallery photos by clicking on SlideShow.You can also add or view videos into gallery.'}>
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
                    </Tooltip> */}
                    <Tooltip title={'Save'}>
                        <IconButton
                            sx={{
                                color: 'white',
                                backgroundColor: green[500],
                                '&:hover': {
                                    backgroundColor: green[600]
                                }
                            }}
                        >
                            <SaveIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Add new feedback'}>
                        <IconButton
                            sx={{
                                color: 'white',
                                backgroundColor: blue[500],
                                '&:hover': {
                                    backgroundColor: blue[600]
                                }
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>

                </>}
            />
            <Box sx={{ backgroundColor: 'white', p: 1, mb: 1 }}>
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        value={selectedFeedback}
                        onChange={handleRadioChange}
                        aria-label="feedback-options"
                    >
                        <FormControlLabel
                            value="users"
                            control={<Radio />}
                            label="Feedback from Users"
                        />
                        <FormControlLabel
                            value="others"
                            control={<Radio />}
                            label="Feedback from Others"
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box sx={{ backgroundColor: 'white', p: 2, mb: 1 }}>
                {selectedFeedback === 'users' ? (
                    <>
                    {dummyData.length > 0 ? (
                            <Typography variant="subtitle1" sx={{ margin: '2px 0', textAlign: 'center' }}>
                                <Box component="span" fontWeight="fontWeightBold">
                                    {startRecord} to 
                                    {/* {endRecord} */}
                                </Box>
                                {' '}out of{' '}
                                <Box component="span" fontWeight="fontWeightBold">
                                    {dummyData.length}
                                </Box>{' '}
                                {dummyData.length === 1 ? 'record' : 'records'}
                            </Typography>
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                <b>No record found.</b>
                            </Typography>
                        )}
                       <FeedbackFromUsersTable data={dummyData} rowsPerPage={rowsPerPage} />
                    </>
                ) : (
                    <>
                        <AddNewPhoto />
                    </>
                )}
            </Box>


        </Box>
    )
}
export default FeedbackDetailsBasescreen
