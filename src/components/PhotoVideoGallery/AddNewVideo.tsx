import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import CommonPageHeader from '../CommonPageHeader'
import { QuestionMark } from '@mui/icons-material'
import { grey } from '@mui/material/colors'

 const AddNewVideo = () => {
  return (
    <Box>
      <CommonPageHeader
          navLinks={[
            { title: 'Photo Video Gallery', path: '/extended-sidebar/Teacher/PhotoVideoGalleryBaseScreen' },
            { title: 'Add Video Gallery', path: '' }
          ]}
          rightActions={<>

            <Tooltip title={'Create new photo galleries or add photos to existing gallery. You can also view all gallery photos by clicking on SlideShow.You can also add or view videos into gallery.'}>
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


          </>}
        />
    </Box>
  )
}
export default AddNewVideo
