import { QuestionMark } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import CommonPageHeader from '../CommonPageHeader';
import StandardwiseExamScheduleTable from './StandardwiseExamScheduleTable';
import { ClearIcon } from '@mui/x-date-pickers';
import ContactGroupList from '../MessageCenter/ContactGroupList';
import { useState } from 'react';
import SelectStandards from './SelectStandards';

const StandardwiseExamSchedule = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [IsConfirm, setIsConfirm] = useState('');
    const [showRecipients, setShowRecipients] = useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
      };
     
    
      const handleOpenDialog = (isRecipients) => {
        setIsConfirm('');
        setShowRecipients(isRecipients);
        setOpenDialog(true);
      };
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
                                }}
                                onClick={() => handleOpenDialog(true)}
                                >
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

             <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: '15px' } }}
      >
        <DialogTitle sx={{ bgcolor: '#223354' }}>
          <Tooltip
            title={'Add/edit delete contact group(s).'}
            placement="bottom-end"
          >
            <QuestionMark
              sx={{
                color: 'white',
                // background:'white',
                borderRadius: '10px',
                position: 'absolute',
                top: '4px',
                right: '35px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: grey[600] }
              }}
            />
          </Tooltip>
          <ClearIcon
            onClick={handleCloseDialog}
            sx={{
              color: 'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '5px',
              right: '8px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red'
              }
            }}
          />
        </DialogTitle>
        <Typography variant="h3" sx={{ pt: 2, pl: 3 }}>
        Copy Exam Schedule
        </Typography>

        <DialogContent>
            <SelectStandards/>

        </DialogContent>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Button color={'error'} onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            // onClick={clickConfirm}
            sx={{
              color: 'green',
              '&:hover': {
                color: 'green',
                backgroundColor: green[100]
              }
            }}
          >
          Copy Schedule

          </Button>
        </DialogActions>
      </Dialog>

        </Box>
    )
}

export default StandardwiseExamSchedule