import { Close, QuestionMark } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import { red, grey } from '@mui/material/colors'
import React from 'react'
import CommonPageHeader from '../CommonPageHeader'

const ClaimedBookDetailsPage = () => {
  return (
   <Box px={2}>
    <CommonPageHeader
                navLinks={[
                    { title: 'Library', path: '/extended-sidebar/Teacher/LibraryBaseScreen' },
                    { title: 'Claimed Book Details', path: '/extended-sidebar/Teacher/LibraryBaseScreen/ClaimedBookDetailsPage' },
                ]}
                rightActions={
                    <>
                       
                        <Tooltip title={`Clear`}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: red[500],
                                    height: '36px !important',
                                    ':hover': { backgroundColor: red[600] }
                                }}
                            // onClick={handleCancel}
                            >
                                <Close />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={"Here you can search the books and also you can see the issued book details."}>
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

export default ClaimedBookDetailsPage