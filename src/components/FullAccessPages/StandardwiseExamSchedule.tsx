import { QuestionMark } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import CommonPageHeader from '../CommonPageHeader';
import StandardwiseExamScheduleTable from './StandardwiseExamScheduleTable';

const StandardwiseExamSchedule = () => {
    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Schedule',
                        path: '/extended-sidebar/Teacher/ExamScheduleBasescreen',
                    },
                    {
                        title: 'Standardwise Exam Schedule',
                        path: '',
                    },
                ]}
                rightActions={
                    <>
                        <TextField
                            variant="outlined"
                            label='Standard'
                            size='small'
                            value="3"
                            InputProps={{
                                readOnly: true,
                                sx: {
                                    backgroundColor: '#F0F0F0',
                                },
                            }}
                            sx={{ width: 150 }}
                        />
                        <Tooltip title="Comprehensive Content Review - I" >
                            <TextField
                                variant="outlined"
                                label='Exam Name'
                                size='small'
                                value="Comprehensive Content Review - I"
                                InputProps={{
                                    readOnly: true,
                                    sx: {
                                        backgroundColor: '#F0F0F0',
                                    },
                                }}
                                sx={{ width: 250 }}
                            />
                        </Tooltip>
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
                        <Tooltip title="Copy Schedule">
                            <IconButton sx={{
                                    color: 'white',
                                    backgroundColor: blue[500],
                                    '&:hover': {
                                        backgroundColor: blue[600]
                                    }
                                }}>
                                <ContentCopyIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Save">
                            <IconButton sx={{
                                    color: 'white',
                                    backgroundColor: green[500],
                                    '&:hover': {
                                        backgroundColor: green[600]
                                    }
                                }}>
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>

                        {/* Submit Button */}
                        <Tooltip title="Submit">
                            <IconButton sx={{
                                    color: 'white',
                                    backgroundColor: green[500],
                                    '&:hover': {
                                        backgroundColor: green[600]
                                    }
                                }}>
                                <PlaylistAddCheckCircleRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                }
            />
             <Box>
             <StandardwiseExamScheduleTable/>
             </Box>

        </Box>
    )
}

export default StandardwiseExamSchedule