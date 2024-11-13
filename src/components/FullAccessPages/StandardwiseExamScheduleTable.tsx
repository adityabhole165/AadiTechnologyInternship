import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Checkbox,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import { getCalendarDateFormatDateNew } from '../Common/Util';

interface ExamEntry {
    id: number;
    subject: string;
    examType: string;
    examDate: string;
    timed: boolean;
    startTime: {
        hour: string;
        minute: string;
        period: 'AM' | 'PM';
    };
    endTime: {
        hour: string;
        minute: string;
        period: 'AM' | 'PM';
    };
    description: string;
}

const generateTimeOptions = () => {
    const hours = Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, '0')
    );
    return hours;
};

const minuteOptions = ['00', '15', '30', '45'];
const periodOptions = ['AM', 'PM'];
const examData1: ExamEntry[] = [
    { id: 1, subject: "Mathematics", examType: "Final", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Final Math Exam" },
];
const examData: ExamEntry[] = [
    { id: 1, subject: "Mathematics", examType: "Final", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Final Math Exam" },
    { id: 2, subject: "Science", examType: "Midterm", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Midterm Science Exam" },
    { id: 3, subject: "Physics", examType: "Final", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Physics Exam" },
    { id: 4, subject: "Chemistry", examType: "Midterm", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Chemistry Midterm Exam" },
    { id: 5, subject: "Biology", examType: "Final", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Biology Final Exam" },
    { id: 6, subject: "Social Science", examType: "Final", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Social Science Final Exam" },
    { id: 7, subject: "Geography", examType: "Midterm", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Geography Midterm Exam" },
    { id: 8, subject: "Computer Studies", examType: "Final", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Computer Studies Final Exam" },
    { id: 9, subject: "Art & Craft", examType: "Midterm", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Art & Craft Midterm Exam" },
    { id: 10, subject: "Music", examType: "Final", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Music Final Exam" },
    { id: 11, subject: "Dance/Tabla", examType: "Midterm", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Dance/Tabla Midterm Exam" },
    { id: 12, subject: "Library", examType: "Final", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Library Exam" },
    { id: 13, subject: "G.K.", examType: "Midterm", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "General Knowledge Exam" },
    { id: 14, subject: "C.C.A.", examType: "Final", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Cultural Activities Exam" }
];

const StandardwiseExamScheduleTable = () => {
    const { AssignedDate } = useParams();
    const timeOptions = generateTimeOptions();
    const [SelectDate, SetSelectDate] = useState(
        AssignedDate == undefined
            ? new Date().toISOString().split('T')[0]
            : getCalendarDateFormatDateNew(AssignedDate)
    );
    const onSelectDate = (value) => {
        SetSelectDate(value);
    };

    const renderTimeSelects = (time: { hour: string; minute: string; period: 'AM' | 'PM' }) => (
        <Box display="flex" gap={1}>
            <Select value={time.hour} size="small">
                {timeOptions.map(hour => (
                    <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                ))}
            </Select>
            <Select value={time.minute} size="small">
                {minuteOptions.map(minute => (
                    <MenuItem key={minute} value={minute}>{minute}</MenuItem>
                ))}
            </Select>
            <Select value={time.period} size="small">
                {periodOptions.map(period => (
                    <MenuItem key={period} value={period}>{period}</MenuItem>
                ))}
            </Select>
        </Box>
    );

    return (
        <Box >
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: theme => theme.palette.secondary.main, color: theme => theme.palette.common.white }}>
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell sx={{ color: 'white' }}><strong>Subject</strong></TableCell>
                            <TableCell sx={{ color: 'white' }}><strong>Exam Type</strong></TableCell>
                            <TableCell sx={{ color: 'white' }}><strong>Exam Date</strong></TableCell>
                            <TableCell sx={{ color: 'white' }}><strong>Time?</strong></TableCell>
                            <TableCell sx={{ color: 'white' }}><strong>Start Time</strong></TableCell>
                            <TableCell sx={{ color: 'white' }}><strong>End Time</strong></TableCell>
                            <TableCell sx={{ color: 'white' }}><strong>Description</strong></TableCell>
                            <TableCell sx={{ color: 'white' }}><strong>New</strong></TableCell>
                        </TableRow>
                        {examData1.map((row) => (
                            <TableRow sx={{ color: theme => theme.palette.common.white, background: '#F0F0F1'}}>
                                <TableCell sx={{py:1, color: 'white'}} padding="checkbox"  > <Checkbox /></TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{py:1, color: 'white'}}>
                                    <TextField size="small" sx={{ color: 'white' }}></TextField>
                                </TableCell>
                                <TableCell sx={{py:1, color: 'white'}}><Datepicker DateValue={SelectDate} onDateChange={onSelectDate} label={undefined} size="small"/></TableCell>
                                <TableCell sx={{py:1, color: 'white'}}><Checkbox checked={row.timed} /></TableCell>
                                <TableCell sx={{py:1, color: 'white'}}>{renderTimeSelects(row.startTime)}</TableCell>
                                <TableCell sx={{py:1, color: 'white'}}>{renderTimeSelects(row.endTime)}</TableCell>
                                <TableCell sx={{py:1, color: 'white'}}>
                                    <TextField 
                                    // value={row.description} 
                                    fullWidth  size="small" />
                                </TableCell>
                                <TableCell sx={{py:1, color: 'white'}}></TableCell>
                            </TableRow>
                            
                        ))}
                    </TableHead>
                    <TableBody>
                        {examData.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell padding="checkbox" sx={{py:0.5}}>
                                    <Checkbox />
                                </TableCell>
                                <TableCell sx={{py:0.5}}>{row.subject}</TableCell>
                                <TableCell sx={{py:0.5}}><TextField size="small">
                                </TextField></TableCell>
                                <TableCell sx={{py:0.5}}>
                                    <Datepicker DateValue={SelectDate} onDateChange={onSelectDate} label={undefined} size="small" />
                                </TableCell>
                                <TableCell padding="checkbox" sx={{pl:2, py:0.5}} >
                                    <Checkbox checked={row.timed} />
                                </TableCell>
                                <TableCell sx={{py:0.5}}>{renderTimeSelects(row.startTime)}</TableCell>
                                <TableCell sx={{py:0.5}}>{renderTimeSelects(row.endTime)}</TableCell>
                                <TableCell>
                                    <Tooltip title={row.description}>
                                    <TextField value={row.description} fullWidth  size="small" />
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{py:0.5}}>
                                    <Tooltip title="Add">
                                        <IconButton>
                                            <AddIcon></AddIcon>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StandardwiseExamScheduleTable;
