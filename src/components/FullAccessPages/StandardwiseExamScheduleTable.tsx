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
    Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Datepicker4 from 'src/libraries/DateSelector/Datepicker4';
import { GetSubjectExamSchedule } from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
import { getCalendarDateFormatDateNew } from '../Common/Util';

interface ExamEntry {
    id: number;
    SubjectWizeStandardExamScheduleId: number;
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
    isNew: boolean;
    selected: boolean;
    TotalTime: string;
}

const generateTimeOptions = () => Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minuteOptions = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
const periodOptions = ['AM', 'PM'];

const StandardwiseExamScheduleTable = ({ ClickSaveXML, subErrorMsg, TimeError }) => {
    const { AssignedDate, StandardId, SchoolwiseStandardExamScheduleId, IsConfigured } = useParams();

    const dispatch = useDispatch();
    const timeOptions = generateTimeOptions();

    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const examData = useSelector((state: RootState) => state.StandardAndExamList.SubjectExamSchedule);
    const getIsSubmitedd = useSelector((state: RootState) => state.StandardAndExamList.IsSubmitedd);
    const isSubmitted = getIsSubmitedd[0]?.IsSubmitedd === 'True';
    const isConfigured = IsConfigured === 'true';
    // Separate states for header row and table rows
    const [headerRow, setHeaderRow] = useState<ExamEntry>({
        id: 0,
        SubjectWizeStandardExamScheduleId: 0,
        subject: '',
        examType: '',
        examDate: '',
        timed: false,
        startTime: { hour: '08', minute: '00', period: 'AM' },
        endTime: { hour: '08', minute: '00', period: 'AM' },
        description: '',
        isNew: true,
        selected: false,
        TotalTime: '00:00'
    });

    const [tableRows, setTableRows] = useState<ExamEntry[]>([]);

    const IsSelected = tableRows.map((item) => item.selected)

    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        if (examData.length > 0) {
            setTableRows(
                examData.map(row => ({
                    ...row,
                    selected: false,
                }))
            );
        }
    }, [examData]);
    useEffect(() => {
        if (examData.length > 0) {
            const updatedRows = examData.map((row: any, index: number) => {
                return {
                    ...row,
                    timed: row.TotalTime === "00:00" ? false : row.timed,
                };
            });
            setTableRows(updatedRows);
        }
    }, [examData]);
    useEffect(() => {
        const fetchExamSchedule = async () => {
            const requestBody = {
                asStandardId: Number(StandardId),
                asSchoolId: Number(asSchoolId),
                asAcademicYearId: Number(asAcademicYearId),
                asStandardwiseExamScheduleId: Number(SchoolwiseStandardExamScheduleId),
            };
            dispatch(GetSubjectExamSchedule(requestBody));
        };
        fetchExamSchedule();
    }, [StandardId, asSchoolId, asAcademicYearId, SchoolwiseStandardExamScheduleId, dispatch]);

    // Handlers for header row changes
    const handleHeaderChange = (field: keyof ExamEntry, value: any) => {
        setHeaderRow(prev => ({ ...prev, [field]: value }));
        setTableRows(rows =>
            rows.map(row => {
                if (row.selected) {
                    return {
                        ...row,
                        [field]: value, // Set the field value only for selected rows
                    };
                }
                return row; // Keep other rows unchanged
            })
        );
        getXML();
    };

    // Handlers for table rows
    const handleSelectAll = (checked: boolean) => {
        setSelectAll(checked);
        setTableRows(rows => rows.map(row => ({ ...row, selected: checked })));
    };

    const handleRowChange = (id: number, field: keyof ExamEntry, value: any) => {

        setTableRows(rows =>
            rows.map(row => {
                if (row.id === id) {
                    if (field === "selected") {
                        // If 'selected' is checked, also check 'timed', otherwise uncheck 'timed'
                        const newTimedValue = value ? true : false;
                        return { ...row, [field]: value, timed: newTimedValue };
                    }
                    return { ...row, [field]: value };
                }
                return row;
            })
        );

        getXML();
    };
    useEffect(() => {
        examData.map(item => (item.SubjectWizeStandardExamScheduleId != "0" ?
            setTableRows(rows =>
                rows.map(row => (row.id === item.id ? { ...row, "selected": true } : row))
            ) :
            setTableRows(rows =>
                rows.map(row => (row.id === item.id ? { ...row, "selected": false } : row))
            )
        ))
    }, [examData])

    const onClickAddNewRow = (id: number, subject: string) => {

        const maxSubjectWizeStandardExamScheduleId = tableRows.reduce((max, row) => {
            return row.SubjectWizeStandardExamScheduleId > max ? row.SubjectWizeStandardExamScheduleId : max;
        }, 0);
        const newRow: ExamEntry = {
            id: id,
            SubjectWizeStandardExamScheduleId: maxSubjectWizeStandardExamScheduleId + 1,
            subject: subject, // Assign the clicked subject
            examType: '',
            examDate: AssignedDate ? getCalendarDateFormatDateNew(AssignedDate) : new Date().toISOString().split('T')[0],
            timed: false,
            startTime: { hour: '08', minute: '00', period: 'AM' },
            endTime: { hour: '08', minute: '00', period: 'AM' },
            description: '',
            isNew: true,
            selected: false,
            TotalTime: '00:00'
        };

        const updatedRows = [];
        let subjectInserted = false;

        for (const row of tableRows) {
            updatedRows.push(row);
            if (row.subject === subject && !subjectInserted) {
                updatedRows.push(newRow); // Insert new row after the clicked subject
                subjectInserted = true;
            }
        }

        if (!subjectInserted) {
            updatedRows.push(newRow);
        }

        setTableRows(updatedRows);
    };
    const renderTimeSelects = (
        time: { hour: string; minute: string; period: 'AM' | 'PM' },
        disabled: boolean,
        onChange: (field: string, value: string) => void
    ) => (
        <Box display="flex" gap={1}>
            <Select value={time.hour} size="small" disabled={disabled} onChange={e => onChange('hour', e.target.value)}>
                {timeOptions.map(hour => (
                    <MenuItem key={hour} value={hour}>
                        {hour}
                    </MenuItem>
                ))}
            </Select>
            <Select value={time.minute} size="small" disabled={disabled} onChange={e => onChange('minute', e.target.value)}>
                {minuteOptions.map(minute => (
                    <MenuItem key={minute} value={minute}>
                        {minute}
                    </MenuItem>
                ))}
            </Select>
            <Select value={time.period} size="small" disabled={disabled} onChange={e => onChange('period', e.target.value)}>
                {periodOptions.map(period => (
                    <MenuItem key={period} value={period}>
                        {period}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
    const getDateFormattedDash = (date) => {
        date = date || new Date();
        const Day = new Date(date).getDate();
        const Month = new Date(date).toLocaleString('default', { month: 'short' });
        const Year = new Date(date).getFullYear();

        return `${Day}-${Month}-${Year}`;
    };

    // Helper function to format time
    const getTimeFormatted = (time) => {
        const hour = parseInt(time.hour, 10); // Convert to number
        const minute = time.minute.padStart(2, '0'); // Ensure two digits
        const period = time.period.toLowerCase(); // Convert to lowercase for am/pm format

        const formattedHour = hour % 12 || 12; // Convert to 12-hour format
        return `${formattedHour} : ${minute} ${period}`;
    };

    // Combine examDate and startTime into the desired format
    const getExamStartDate = (examDate, startTime) => {
        const formattedDate = getDateFormattedDash(examDate);
        const formattedTime = getTimeFormatted(startTime);
        return `${formattedDate} ${formattedTime}`;
    };
    const getExamEndDate = (examDate, endTime) => {
        const formattedDate = getDateFormattedDash(examDate);
        const formattedTime = getTimeFormatted(endTime);
        return `${formattedDate} ${formattedTime}`;
    };

    const getXML = () => {
        let sXML = '<SubjectwiseStandardExamSchedule>';
        let selectedFlag = tableRows.find(item => item.selected)

        tableRows.forEach((subject) => {
            if (subject.selected) {
                const startDateTime = getExamStartDate(subject.examDate, subject.startTime);
                const endDateTime = getExamEndDate(subject.examDate, subject.endTime);

                sXML +=
                    '<SubjectwiseStandardExamSchedule ' +
                    `Subject_Id="${subject.id}" ` +
                    `ExamTypes="${subject.examType || ''}" ` +
                    `Description="${subject.description || ''}" ` +
                    `Exam_Start_Date="${startDateTime}" ` +
                    `Exam_End_Date="${endDateTime}" />`;
            }
        });
        sXML += '</SubjectwiseStandardExamSchedule>';
        return selectedFlag === undefined ? '' : sXML;
    };

    const xml = getXML();
    ClickSaveXML(xml, tableRows);

    return (
        <Box>
            {subErrorMsg && <span style={{ color: 'red', fontWeight: 'bolder' }}>Atleast one subject should be selected.<br /></span>}
            {TimeError.length > 0 && <span style={{ color: 'red', fontWeight: 'bolder' }}>{TimeError}</span>}
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: theme => theme.palette.secondary.main, color: theme => theme.palette.common.white }}>
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell><strong>Subject</strong></TableCell>
                            <TableCell><strong>Exam Type</strong></TableCell>
                            <TableCell><strong>Exam Date</strong></TableCell>
                            <TableCell><strong>Timed?</strong></TableCell>
                            <TableCell><strong>Start Time</strong></TableCell>
                            <TableCell><strong>End Time</strong></TableCell>
                            <TableCell><strong>Description</strong></TableCell>
                            <TableCell><strong>New</strong></TableCell>
                        </TableRow>
                        <TableRow sx={{ color: theme => theme.palette.common.white, background: theme => theme.palette.secondary.main, }}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={selectAll} disabled={isSubmitted} onChange={e => handleSelectAll(e.target.checked)} />
                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={headerRow.examType}
                                    onChange={e => handleHeaderChange('examType', e.target.value)}
                                    size="small"
                                    disabled={isSubmitted}
                                />
                            </TableCell>
                            <TableCell>
                                <Datepicker4
                                    DateValue={headerRow.examDate}
                                    onDateChange={value => handleHeaderChange('examDate', value)}
                                    size="small" label={undefined} disabled={isSubmitted} />
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={headerRow.timed}
                                    onChange={e => handleHeaderChange('timed', e.target.checked)}
                                    disabled={isSubmitted}
                                />
                            </TableCell>
                            <TableCell>
                                {renderTimeSelects(
                                    headerRow.startTime,
                                    getIsSubmitedd[0]?.IsSubmitedd || false, // Pass the disabled condition here
                                    (field, value) =>
                                        handleHeaderChange('startTime', { ...headerRow.startTime, [field]: value })
                                )}
                            </TableCell>
                            <TableCell>
                                {renderTimeSelects(
                                    headerRow.endTime,
                                    getIsSubmitedd[0]?.IsSubmitedd || false, // Pass the disabled condition here
                                    (field, value) =>
                                        handleHeaderChange('endTime', { ...headerRow.endTime, [field]: value })
                                )}
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={headerRow.description}
                                    onChange={e => handleHeaderChange('description', e.target.value)}
                                    size="small" disabled={isSubmitted}
                                />
                            </TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows.map((row) => (
                            <TableRow key={row.SubjectWizeStandardExamScheduleId}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={row.selected}
                                        disabled={isSubmitted}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            if (!isChecked) {
                                                handleRowChange(row.id, 'examType', '');
                                                handleRowChange(row.id, 'timed', false); // Reset timed
                                                handleRowChange(row.id, 'startTime', { hour: '08', minute: '00', period: 'AM' }); // Reset startTime
                                                handleRowChange(row.id, 'endTime', { hour: '08', minute: '00', period: 'AM' }); // Reset endTime
                                                handleRowChange(row.id, 'description', ''); // Reset description
                                            }

                                            handleRowChange(row.id, 'selected', isChecked); // Update selected state
                                        }}
                                    />
                                </TableCell>

                                <TableCell>{row.subject}</TableCell>
                                <TableCell>
                                    <TextField
                                        value={!row.selected ? '' : row.examType}
                                        disabled={isSubmitted || !row.selected}
                                        onChange={(e) => handleRowChange(row.id, 'examType', e.target.value)}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Datepicker4
                                        DateValue={row.examDate}
                                        onDateChange={(value) => handleRowChange(row.id, 'examDate', value)}
                                        size="small"
                                        label={undefined}
                                        disabled={isSubmitted || !row.selected}
                                    />
                                </TableCell>

                                <TableCell>
                                    <Checkbox
                                        checked={row.selected ? row.timed : false}
                                        onChange={(e) => handleRowChange(row.id, 'timed', e.target.checked)}
                                        disabled={isSubmitted || !row.selected}
                                    />
                                </TableCell>

                                <TableCell>
                                    {renderTimeSelects(
                                        row.startTime,
                                        isSubmitted || !row.timed,
                                        (field, value) =>
                                            handleRowChange(row.id, 'startTime', { ...row.startTime, [field]: value })
                                    )}
                                </TableCell>

                                <TableCell>
                                    {renderTimeSelects(
                                        row.endTime,
                                        isSubmitted || !row.timed,
                                        (field, value) =>
                                            handleRowChange(row.id, 'endTime', { ...row.endTime, [field]: value })
                                    )}
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={!row.selected ? '' : row.description}
                                        disabled={isSubmitted || !row.selected}
                                        onChange={(e) => handleRowChange(row.id, 'description', e.target.value)}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell sx={{ py: 0.5 }}>
                                    <Tooltip title="Add">
                                        <IconButton
                                            disabled={isSubmitted || !row.selected}
                                            onClick={() => onClickAddNewRow(row.id, row.subject)}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </Box >
    );
};

export default StandardwiseExamScheduleTable;
