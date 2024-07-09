import { AddComment, Check, Save, Send } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { blue, green, red } from '@mui/material/colors';
import { useState } from 'react';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import CommonPageHeader from '../CommonPageHeader';
const AddStudentRecord = () => {
    const [ADate, setADate]: any = useState(new Date().toISOString().split('T')[0]);

    const onClickSave = () => {
    };
    const onClickSubmit = () => {
    };
    const onClickAddComment = () => {
    };

    const onClickSubmitComment = () => {
    };
    const handleDateChange = (selectedDate: string) => {
        if (!selectedDate) {
            setADate(''); // Reset AssignedDate state if needed
            return;
        }
    }

    return (
        <Box sx={{ px: 2 }} maxWidth="xl">
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Student Record List',
                        path: '/extended-sidebar/Teacher/StudentRecords'
                    },
                    {
                        title: 'Student Record',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <Datepicker
                            DateValue={ADate}
                            onDateChange={handleDateChange}
                            label={'Date'}
                            size={"small"}

                        />
                        < Box >
                            <Tooltip title={'SAVE'}>
                                <IconButton
                                    sx={{
                                        backgroundColor: green[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: green[600]
                                        }
                                    }}
                                    onClick={onClickSave}
                                >
                                    <Save />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'SUBMIT'}>
                                <IconButton
                                    sx={{
                                        backgroundColor: green[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: green[600]
                                        }
                                    }}
                                    onClick={onClickSubmit}
                                >
                                    <Check />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'ADD COMMENT'}>
                                <IconButton
                                    sx={{
                                        backgroundColor: blue[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: blue[600]
                                        }
                                    }}
                                    onClick={onClickAddComment}
                                >
                                    <AddComment />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'SUBMIT COMMENT'}>
                                <IconButton
                                    sx={{
                                        backgroundColor: red[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: red[600]
                                        }
                                    }}
                                    onClick={onClickSubmitComment}
                                >
                                    <Send />
                                </IconButton>
                            </Tooltip>
                        </Box>

                    </>
                }
            />
        </Box>
    )
};

export default AddStudentRecord;