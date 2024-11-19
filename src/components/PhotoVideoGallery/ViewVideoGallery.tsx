import React from 'react'
import CommonPageHeader from '../CommonPageHeader'
import { Box, IconButton, Tooltip } from '@mui/material'
import { QuestionMark } from '@mui/icons-material'
import { grey } from '@mui/material/colors'

 const ViewVideoGallery = () => {
  return (
    <Box>
    <CommonPageHeader
        navLinks={[
          { title: 'Photo Video Gallery', path: '/extended-sidebar/Teacher/PhotoVideoGalleryBaseScreen' },
          { title: 'View Video Gallery', path: '' }
        ]}
        rightActions={<>

          <Tooltip title={'Add / Edit / Delete photos of selected gallery.'}>
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
export default ViewVideoGallery