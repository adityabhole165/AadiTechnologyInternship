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
    Typography
} from '@mui/material';
import { Plus } from 'lucide-react';

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

const examData: ExamEntry[] = [
    {
        id: 1,
        subject: "English",
        examType: "Final",
        examDate: "13-Nov-2024",
        timed: true,
        startTime: { hour: "08", minute: "00", period: "AM" },
        endTime: { hour: "08", minute: "00", period: "AM" },
        description: "Annual English Examination"
    }
];

const StandardwiseExamScheduleTable = () => {
    const timeOptions = generateTimeOptions();

    const renderTimeSelects = (time: { hour: string; minute: string; period: 'AM' | 'PM' }) => (
        <Box display="flex" gap={1}>
            <Select
                value={time.hour}
                size="small"
            // style={{ width: '60px' }}
            >
                {timeOptions.map(hour => (
                    <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                ))}
            </Select>
            <Select
                value={time.minute}
                size="small"
            // style={{ width: '70px' }}
            >
                {minuteOptions.map(minute => (
                    <MenuItem key={minute} value={minute}>{minute}</MenuItem>
                ))}
            </Select>
            <Select
                value={time.period}
                size="small"
            // style={{ width: '60px' }}
            >
                {periodOptions.map(period => (
                    <MenuItem key={period} value={period}>{period}</MenuItem>
                ))}
            </Select>
        </Box>
    );

    return (
        <Box p={2}>
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableHead>
                    
                        <TableRow sx={{
                            background: (theme) => theme.palette.secondary.main,
                            color: (theme) => theme.palette.common.white,
                            py: 1
                        }}>
                            <TableCell padding="checkbox">
                                {/* <Checkbox /> */}
                            </TableCell>
                            <TableCell sx={{ color: 'white', }}><strong>Subject</strong></TableCell>
                            <TableCell sx={{ color: 'white', }}><strong>Exam Type</strong></TableCell>
                            <TableCell sx={{ color: 'white', }}><strong>Exam Date</strong></TableCell>
                            <TableCell sx={{ color: 'white', }}><strong>Time?</strong></TableCell>
                            <TableCell sx={{ color: 'white', }}><strong>Start Time</strong></TableCell>
                            <TableCell sx={{ color: 'white', }}><strong>End Time</strong></TableCell>
                            <TableCell sx={{ color: 'white', }}><strong>Description</strong></TableCell>
                            <TableCell sx={{ color: 'white', }}><strong>New</strong></TableCell>
                        </TableRow>
                        <TableRow>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {examData.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={row.timed} />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        value={row.subject}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        value={row.examType}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>{row.examDate}</TableCell>
                                <TableCell>
                                    <Checkbox checked={row.timed} />
                                </TableCell>
                                <TableCell>
                                    {renderTimeSelects(row.startTime)}
                                </TableCell>
                                <TableCell>
                                    {renderTimeSelects(row.endTime)}
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        value={row.description}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        style={{
                                            color: 'white',
                                            backgroundColor: '#4caf50',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%'
                                        }}
                                    >
                                        <Plus style={{ width: '16px', height: '16px' }} />
                                    </IconButton>
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
