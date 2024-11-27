import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import React from 'react'
import CommonPageHeader from '../CommonPageHeader';
import { SearchTwoTone, QuestionMark, AddPhotoAlternate, VideoLibrary } from '@mui/icons-material';
import { grey, blue, green } from '@mui/material/colors';
import AddNewPhoto from '../PhotoVideoGallery/AddNewPhoto';
import AddNewVideo from '../PhotoVideoGallery/AddNewVideo';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
 const FeedbackDetailsBasescreen = () => {
    function clickSearch() {
        throw new Error('Function not implemented.');
    }
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

            
    </Box>
  )
}
export default FeedbackDetailsBasescreen
