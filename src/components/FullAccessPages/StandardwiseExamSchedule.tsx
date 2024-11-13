import { QuestionMark } from '@mui/icons-material';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useState } from 'react';
import CommonPageHeader from '../CommonPageHeader';
import SelectStandards from './SelectStandards';
import StandardwiseExamScheduleTable from './StandardwiseExamScheduleTable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const StandardwiseExamSchedule = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [IsConfirm, setIsConfirm] = useState('');
    const [showRecipients, setShowRecipients] = useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const [openDialog1, setOpenDialog1] = useState(false);
    const [IsConfirm1, setIsConfirm1] = useState('');
    const [showRecipients1, setShowRecipients1] = useState(false);
    const handleCloseDialog1 = () => {
        setOpenDialog1(false);
    };
    const [instructions, setInstructions] = useState([
        // { id: 1, text: 'Initial instruction 1' },
        // { id: 2, text: 'Initial instruction 2' }
    ]);
    const [currentInstruction, setCurrentInstruction] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [selectedInstructionId, setSelectedInstructionId] = useState(null);



    const handleOpenDialog = (isRecipients) => {
        setIsConfirm('');
        setShowRecipients(isRecipients);
        setOpenDialog(true);
    };
    const handleOpenDialog1 = (isRecipients) => {
        setIsConfirm1('');
        setShowRecipients1(isRecipients);
        setOpenDialog1(true);
    };
    const handleAddOrUpdateInstruction = () => {
        if (editMode && selectedInstructionId != null) {
            setInstructions(prev =>
                prev.map(inst => inst.id === selectedInstructionId ? { ...inst, text: currentInstruction } : inst)
            );
        } else {
            const newInstruction = { id: instructions.length + 1, text: currentInstruction };
            setInstructions([...instructions, newInstruction]);
        }
        handleCloseDialog1();
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
                        <Tooltip title="Add Instructions">
                            <IconButton sx={{
                                color: 'white',
                                backgroundColor: blue[500],
                                '&:hover': {
                                    backgroundColor: blue[600]
                                }
                            }}
                                onClick={() => handleOpenDialog1(true)}
                            >
                                <AddBoxRoundedIcon />
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
                                <CheckRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                }
            />
            <Box>
            <Accordion sx={{ mt: 1, mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5"> <strong>More Instructions</strong> </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box display="flex" flexDirection="column" gap={2}>
                        {instructions.map(instruction => (
                            <Box key={instruction.id} display="flex" alignItems="center" justifyContent="space-between">
                                <Typography variant="body1">{instruction.text}</Typography>
                                <Button
                                    // variant="contained"
                                    sx={{
                                        color: 'blue',
                                        '&:hover': {
                                            color: 'blue',
                                            backgroundColor: blue[100]
                                        }
                                    }}
                                    onClick={() => handleOpenDialog1(instruction.text)}
                                >
                                    Update Instruction
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>
            </Box>
            <Box>
                <StandardwiseExamScheduleTable />
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
                    <SelectStandards />

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
            <Dialog
                open={openDialog1}
                onClose={handleCloseDialog1}
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
                        onClick={handleCloseDialog1}
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
                    {editMode ? 'Update Instruction' : 'Add Instructions'}
                </Typography>
                <DialogContent>
                    <TextField
                        label="Instruction"
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        value={currentInstruction}
                        onChange={(e) => setCurrentInstruction(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    {/* {instructions.map(instruction => (
                        <Accordion key={instruction.id} sx={{ mt: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1">{instruction.text}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setSelectedInstructionId(instruction.id);
                                        handleOpenDialog1(instruction.text);
                                    }}
                                >
                                    Update Instruction
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    ))} */}
                </DialogContent>
                <DialogActions sx={{ py: 2, px: 3 }}>
                    <Button color={'error'} onClick={handleCloseDialog1}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddOrUpdateInstruction}
                        sx={{
                            color: 'green',
                            '&:hover': { color: 'green', backgroundColor: green[100] }
                        }}
                    >
                        {editMode ? 'Update Instruction' : 'Add Instruction'}
                    </Button>
                </DialogActions>
                
            </Dialog>

        </Box>
    )
}

export default StandardwiseExamSchedule