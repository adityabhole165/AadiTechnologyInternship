import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import CommonPageHeader from '../CommonPageHeader'
import { QuestionMark } from '@mui/icons-material'
import { grey, blue } from '@mui/material/colors'

const ViewExamSchedule = () => {
  return (
    <Box>
         <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Schedule',
                        path: '/extended-sidebar/Teacher/ExamScheduleBasescreen',
                    },
                    {
                        title: 'View Exam Schedule',
                        path: '',
                    },
                ]}
                rightActions={
                    <>
                        <Tooltip title={'Examination schedule for your class.'}>
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
                    </>
                }
            />
    </Box>
  )
}

export default ViewExamSchedule