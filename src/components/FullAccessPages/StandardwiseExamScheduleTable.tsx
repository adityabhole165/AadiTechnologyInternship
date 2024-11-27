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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { IGetSubjectExamScheduleBody } from 'src/interfaces/Teacher/TExamSchedule';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import { GetSubjectExamSchedule } from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
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
    IsNew: boolean;
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
    { id: 1, subject: "Mathematics", examType: "Final", examDate: "12-Nov-2024", timed: true, startTime: { hour: "08", minute: "00", period: "AM" }, endTime: { hour: "09", minute: "00", period: "AM" }, description: "Final Math Exam", IsNew: true },
];

const StandardwiseExamScheduleTable = () => {
    const { AssignedDate, StandardId, StandardTestId } = useParams();
    const dispatch = useDispatch();
    const timeOptions = generateTimeOptions();
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const examData = useSelector((state: RootState) => state.StandardAndExamList.SubjectExamSchedule);
    const [examRows, setExamRows] = useState<ExamEntry[]>([]);
    const [SelectDate, SetSelectDate] = useState(
        AssignedDate == undefined
            ? new Date().toISOString().split('T')[0]
            : getCalendarDateFormatDateNew(AssignedDate)
    );

    useEffect(() => {
        if (examData.length > 0) {
            setExamRows(
                examData.map(row => ({
                    ...row,
                    selectedDate: SelectDate // Initialize with the selected date
                }))
            );
        }
    }, [examData, SelectDate]);

    const onSelectDate = (value: string) => {
        SetSelectDate(value);
        setExamRows(rows => rows.map(row => ({ ...row, selectedDate: value })));
    };

    const onSelectRowDate = (id: number, value: string) => {
        setExamRows(rows =>
            rows.map(row => (row.id === id ? { ...row, selectedDate: value } : row))
        );
    };
    const onClickAddNewRow = (subject: string) => {
        const newRow: ExamEntry = {
            id: examRows.length > 0 ? Math.max(...examRows.map(r => r.id)) + 1 : 1,
            subject: subject, // Assign the clicked subject
            examType: '',
            examDate: SelectDate,
            timed: false,
            startTime: { hour: '08', minute: '00', period: 'AM' },
            endTime: { hour: '09', minute: '00', period: 'AM' },
            description: '',
            IsNew: true
        };
    
        // Insert the new row below rows of the same subject
        const updatedRows = [];
        let subjectInserted = false;
    
        for (const row of examRows) {
            updatedRows.push(row);
            if (row.subject === subject && !subjectInserted) {
                updatedRows.push(newRow); // Insert new row after the clicked subject
                subjectInserted = true;
            }
        }
    
        // If no match is found, append the row at the end
        if (!subjectInserted) {
            updatedRows.push(newRow);
        }
    
        setExamRows(updatedRows);
    };
    
    useEffect(() => {
        const GetSubjectExamScheduleBody: IGetSubjectExamScheduleBody = {
            asStandardId: Number(StandardId),
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId),
            asStandardwiseExamScheduleId: Number(StandardTestId),

        }
        dispatch(GetSubjectExamSchedule(GetSubjectExamScheduleBody));
    }, [])

    const renderTimeSelects = (time: { hour: string; minute: string; period: 'AM' | 'PM' }) => (
        <Box display="flex" gap={1}>
            <Select value={time.hour} size="small">
                {timeOptions.map(hour => (
                    <MenuItem key={hour} value={hour}>
                        {hour}
                    </MenuItem>
                ))}
            </Select>
            <Select value={time.minute} size="small">
                {minuteOptions.map(minute => (
                    <MenuItem key={minute} value={minute}>
                        {minute}
                    </MenuItem>
                ))}
            </Select>
            <Select value={time.period} size="small">
                {periodOptions.map(period => (
                    <MenuItem key={period} value={period}>
                        {period}
                    </MenuItem>
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
                            <TableRow sx={{ color: theme => theme.palette.common.white, background: theme => theme.palette.secondary.main, }}>
                                <TableCell sx={{ py: 1, color: 'white' }} padding="checkbox"  > <strong><Checkbox /></strong></TableCell>
                                <TableCell></TableCell>
                                <TableCell sx={{ py: 1, color: 'white' }}><strong>
                                    <TextField size="small" sx={{ color: 'white', }}></TextField></strong>
                                </TableCell>
                                <TableCell sx={{ py: 1, color: 'white' }}><strong><Datepicker DateValue={SelectDate} onDateChange={onSelectDate} label={undefined} size="small" /> </strong></TableCell>
                                <TableCell sx={{ py: 1, color: 'white' }}><strong><Checkbox checked={row.timed} /></strong></TableCell>
                                <TableCell sx={{ py: 1, color: 'white' }}><strong>{renderTimeSelects(row.startTime)}</strong></TableCell>
                                <TableCell sx={{ py: 1, color: 'white' }}><strong>{renderTimeSelects(row.endTime)}</strong></TableCell>
                                <TableCell sx={{ py: 1, color: 'white' }}>
                                    <TextField
                                        fullWidth size="small" />
                                </TableCell>
                                <TableCell sx={{ py: 1, color: 'white' }}></TableCell>
                            </TableRow>

                        ))}
                    </TableHead>
                    <TableBody>
                        {examRows.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell padding="checkbox" sx={{ py: 0.5 }}>
                                    <Checkbox />
                                </TableCell>
                                <TableCell sx={{ py: 0.5 }}>{row.subject}</TableCell>
                                <TableCell sx={{ py: 0.5 }}><TextField size="small">
                                </TextField></TableCell>
                                {/* <TableCell sx={{ py: 0.5 }}>
                                    <Datepicker DateValue={SelectDate} onDateChange={onSelectDate} label={undefined} size="small" />
                                </TableCell> */}
                                <TableCell>
                                    {row.id === 0 ? (
                                        <Datepicker DateValue={SelectDate} onDateChange={onSelectDate} label={undefined} size="small" />
                                    ) : (
                                        <Datepicker DateValue={SelectDate} onDateChange={(value) => onSelectRowDate(row.id, value)} label={undefined} size="small" />
                                    )}
                                </TableCell>
                                <TableCell padding="checkbox" sx={{ pl: 2, py: 0.5 }} >
                                    <Checkbox checked={row.timed} />
                                </TableCell>
                                <TableCell sx={{ py: 0.5 }}>{renderTimeSelects(row.startTime)}</TableCell>
                                <TableCell sx={{ py: 0.5 }}>{renderTimeSelects(row.endTime)}</TableCell>
                                <TableCell>
                                    <Tooltip title={row.description}>
                                        <TextField value={row.description} fullWidth size="small" />
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ py: 0.5 }}>
                                    <Tooltip title="Add">
                                        <IconButton onClick={() => onClickAddNewRow(row.subject)}>
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
