import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import CommonPageHeader from '../CommonPageHeader'
import { QuestionMark } from '@mui/icons-material'
import { grey } from '@mui/material/colors'

const StandardwiseExamSchedule = () => {
  return (
    <Box>
         <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Schedule',
                        path: '/extended-sidebar/Teacher/ExamScheduleBasescreen',
                    },
                    {
                        title: 'StandardwiseExamSchedule',
                        path: '',
                    },
                ]}
                rightActions={
                    <>
                        <Tooltip title={'Define the exam timetable for each subject with multiple exam type, exam date, start time and end time. Specific information like syllabus can be given to students using the description field and user can copy exam schedule from one standard to other standards.'}>
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

export default StandardwiseExamSchedule