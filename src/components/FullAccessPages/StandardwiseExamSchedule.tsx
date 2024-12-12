import { QuestionMark } from '@mui/icons-material';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Close from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { IConfigurationData, IExamScheduleConfigBody, IGetSubjectExamScheduleBody, IInsertExamScheduleBody, ISumbitExamScheduleBody, IUpdateExamScheduleInstructionsBody } from 'src/interfaces/Teacher/TExamSchedule';
import { GetCopyStandardTestMsg, GetInsertExamSchedule, GetIsSchoolConfigured, GetSubjectExamSchedule, GetSumbitExamSchedule, GetUpdateExamScheduleInstructions, resetCopyStandardTestMsg, RExamSchedule } from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import SelectStandards from './SelectStandards';
import StandardwiseExamScheduleTable from './StandardwiseExamScheduleTable';


const StandardwiseExamSchedule = () => {
    const { StandardId, TestId, SchoolwiseStandardExamScheduleId, StandardTestId, IsConfigured, SchoolwiseStandardTestId } = useParams();
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [IsConfirm, setIsConfirm] = useState('');
    const [showRecipients, setShowRecipients] = useState(false);
    const [selectedStandards, setSelectedStandards] = useState<number[]>([]);
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const [openDialog1, setOpenDialog1] = useState(false);
    const [IsConfirm1, setIsConfirm1] = useState('');
    const [editMode1, setEditMode1] = useState(false); // Tracks if updating or adding
    const [showRecipients1, setShowRecipients1] = useState(false);
    const handleCloseDialog1 = () => {
        setOpenDialog1(false);
    };
    const [instructions, setInstructions] = useState([]);
    const [currentInstruction, setCurrentInstruction] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [selectedInstructionId, setSelectedInstructionId] = useState(null);
    const [isUnsubmitted, setIsUnsubmitted] = useState(false);
    const [xml, setXML] = useState();
    const [tableArray, setTableArray] = useState([])
    const [timeError, setTimeError] = useState('')
    const [isSaveClicked, setIsSaveClicked] = useState(false);
    const [subError, setSubError] = useState(false)
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asFinancialYearId = sessionStorage.getItem('FinancialYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asUserId = Number(localStorage.getItem('UserId'));
    const SubHeaderArray1 = useSelector((state: RootState) => state.StandardAndExamList.RStandard);
    const HeaderArray1 = useSelector((state: RootState) => state.StandardAndExamList.RStandardwTest);
    const UpdateExamScheduleInstructions = useSelector((state: RootState) => state.StandardAndExamList.UpdateExamScheduleInstructionsMsg);
    const USInsertExamSchedule = useSelector((state: RootState) => state.StandardAndExamList.InsertExamSchedule);
    const CopyExamSchedule = useSelector((state: RootState) => state.StandardAndExamList.CopyStandardTestMsg);
    const examData = useSelector((state: RootState) => state.StandardAndExamList.SubjectExamSchedule);
    const getIsSubmitedd = useSelector((state: RootState) => state.StandardAndExamList.IsSubmitedd);
    const Instructionss = useSelector((state: RootState) => state.StandardAndExamList.Instructionss);
    const IsSchoolConfigured = useSelector((state: RootState) => state.StandardAndExamList.GetIsSchoolConfigured);

    // function getXML(value) {
    //     let Insertxml = '<SubjectwiseStandardExamSchedule>\r\n';

    //     value.forEach(subject => {
    //         Insertxml += "<SubjectwiseStandardExamSchedule>" +
    //             "<Subject_Id>" + subject.Subject_Id + "</Subject_Id>" +
    //             "<ExamTypes>" + subject.ExamTypes + "</ExamTypes>" +
    //             "<Description>" + subject.Description + "</Description>" +
    //             "<Exam_Start_Date>" + subject.Exam_Start_Date + "</Exam_Start_Date>" +
    //             "<Exam_End_Date>" + subject.Exam_End_Date + "</Exam_End_Date>" +
    //             "</SubjectwiseStandardExamSchedule>\r\n";
    //     });

    //     Insertxml += "</SubjectwiseStandardExamSchedule>";
    //     return Insertxml;
    // }

    function getXML1() {
        let Insertxml = '<ArrayOfInt xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\r\n';
        selectedStandards.forEach(value => {
            Insertxml += `  <int>${value}</int>\r\n`;
        });

        Insertxml += "</ArrayOfInt>";
        return Insertxml;
    }

    useEffect(() => {
        const RExamScheduleBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId)
        }

        dispatch(RExamSchedule(RExamScheduleBody))
    }, [])


    useEffect(() => {
        const GetSubjectExamScheduleBody: IGetSubjectExamScheduleBody = {
            asStandardId: Number(StandardId),
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId),
            asStandardwiseExamScheduleId: Number(SchoolwiseStandardExamScheduleId),

        }
        dispatch(GetSubjectExamSchedule(GetSubjectExamScheduleBody));
    }, [])

    const SumbitExamScheduleBody: ISumbitExamScheduleBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asUpdatedById: Number(asUserId),
        asStandardId: Number(StandardId),
        asIsUnSubmit: 0,
        asSchoolwiseTestId: Number(TestId)
    }

    useEffect(() => {
        const getExamConfiguredBody: IExamScheduleConfigBody = {
            asSchoolId: Number(asSchoolId),
            asOriginalConfigId: 19,
            asAcademicYearId: Number(asAcademicYearId)
        }
        dispatch(GetIsSchoolConfigured(getExamConfiguredBody))
    }, [])

    useEffect(() => {
        const getExamConfiguredBody: IConfigurationData = {
            asOriginalConfigId: 19,
            asSchoolId: Number(asSchoolId),
            asIsConfigure: 'Y',
            asInsertedById: Number(asUserId),
            asUpdateById: Number(asUserId),
            asAcademicYearId: Number(asAcademicYearId),
            aiFinancialYearId: Number(asFinancialYearId)
        }
        dispatch(GetIsSchoolConfigured(getExamConfiguredBody))
    }, [])


    const handleUnsubmit = () => {
        const unSubmitBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId),
            asUpdatedById: Number(asUserId),
            asStandardId: Number(StandardId),
            asIsUnSubmit: 1,
            asSchoolwiseTestId: Number(TestId)
        };
        dispatch(GetSumbitExamSchedule(unSubmitBody));
        setIsUnsubmitted(true);
        const GetSubjectExamScheduleBody: IGetSubjectExamScheduleBody = {
            asStandardId: Number(StandardId),
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId),
            asStandardwiseExamScheduleId: Number(SchoolwiseStandardExamScheduleId),

        }
        dispatch(GetSubjectExamSchedule(GetSubjectExamScheduleBody));
        toast.success('Exam schedule has been Unsubmited successfully.');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };


    // #region Validation function

    function validateExamSchedule(refArray) {
        const invalidSubjects = [];
        refArray.forEach(exam => {
            // Only validate selected exams
            if (!exam.selected) return;

            // Convert start and end times to comparable format
            const startHour = parseInt(exam.startTime.hour);
            const startMinute = parseInt(exam.startTime.minute);
            const endHour = parseInt(exam.endTime.hour);
            const endMinute = parseInt(exam.endTime.minute);

            // Adjust for AM/PM
            const startPeriod = exam.startTime.period.toUpperCase();
            const endPeriod = exam.endTime.period.toUpperCase();

            // Normalize hours for comparison
            let normalizedStartHour = startHour;
            let normalizedEndHour = endHour;
            if (startPeriod === 'PM' && startHour !== 12) {
                normalizedStartHour += 12;
            }
            if (startPeriod === 'AM' && startHour === 12) {
                normalizedStartHour = 0;
            }
            if (endPeriod === 'PM' && endHour !== 12) {
                normalizedEndHour += 12;
            }
            if (endPeriod === 'AM' && endHour === 12) {
                normalizedEndHour = 0;
            }

            // Check if end time is less than or equal to start time
            const isInvalid = (normalizedEndHour < normalizedStartHour) ||
                (normalizedEndHour === normalizedStartHour && endMinute <= startMinute);

            if (isInvalid) {
                invalidSubjects.push(exam.subject);
            }
        });

        return invalidSubjects.length > 0
            ? `End time must be greater than start time. Subject(s): ${invalidSubjects.join(", ")}`
            : "";
    }
    // #endregion
    const ClickSaveXML = (value, dataArray) => {
        setTableArray(dataArray)
        setXML(value)
    }

    useEffect(() => {
        console.log(xml, "XML");

    }, [xml]);

    const allFalse = tableArray.every(item => item.selected === false);

    const onClickSave = () => {
        let errorResult = validateExamSchedule(tableArray)
        setTimeError('');

        if (xml === '') {
            setSubError(true)
        }
        if (errorResult.length > 0) {
            setTimeError(errorResult)
        }

        const InsertExamScheduleBody: IInsertExamScheduleBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId),
            asStandardId: Number(StandardId),
            asSchoolwiseTestId: Number(TestId),
            asStandardTestId: IsConfigured == 'true' ? Number(StandardTestId) : Number(SchoolwiseStandardTestId),
            asInsertedById: asUserId,
            asScreenId: 19,
            asSchoolwiseStandardExamScheduleId: IsConfigured == 'true' ? Number(SchoolwiseStandardExamScheduleId) : 0,
            asExamDetailsXML: xml
        }

        if (IsConfigured == 'true' && allFalse) {
            setSubError(false)
            showAlert({
                title: 'Please Confirm',
                message:
                    "Are you sure you want to delete exam's schedule ?",
                variant: 'warning',
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                onCancel: () => {
                    closeAlert();
                },
                onConfirm: () => {
                    toast.success("Exam schedule has been deleted successfully.")
                    dispatch(GetInsertExamSchedule(InsertExamScheduleBody))
                    setIsSaveClicked(true);
                    closeAlert();
                }
            });

            return;
        }

        if ((xml !== '' && errorResult == '') && IsSchoolConfigured == "Configured") {
            dispatch(GetInsertExamSchedule(InsertExamScheduleBody))
            toast.success("Exam schedule has been saved successfully and you can copy exam schedule.")
            setIsSaveClicked(true);
        }
    }
    const { showAlert, closeAlert } = useContext(AlertContext);

    const onClickCopyExamSchedule = () => {
        // Handle the schedule copy with confirmation popup
        if (selectedStandards.length > 0) {
            showAlert({
                title: 'Please Confirm',
                message: 'Exam schedule will be copied for the subjects which are applicable to selected standard(s) and it will override the existing schedule of standards. Do you want to continue?',
                variant: 'warning',
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                onCancel: () => {
                    closeAlert();
                },
                onConfirm: () => {

                    const InsertExamScheduleBody = {
                        asSchoolId: Number(asSchoolId),
                        asAcademicYearId: Number(asAcademicYearId),
                        asStandardId: Number(StandardId),
                        asSourceStandardTestId: Number(TestId),
                        asDestinationStandardsxml: getXML1() // Assuming getXML1 returns the XML string
                    };

                    dispatch(GetCopyStandardTestMsg(InsertExamScheduleBody));

                    closeAlert();
                }
            });
        } else {
            showAlert({
                title: 'No Standards Selected',
                message: 'Please select at least one standard before proceeding.',
                variant: 'info',
                confirmButtonText: 'OK',
                onConfirm: () => closeAlert(),
            });
        }
    };

    useEffect(() => {
        if (CopyExamSchedule !== '') {
            if (CopyExamSchedule === "Exam Schedule has been copied successfully.") {
                toast.success(CopyExamSchedule);
                dispatch(resetCopyStandardTestMsg()); // Resetting the message state
            }
        }
    }, [CopyExamSchedule]);
    const getClassName = () => {
        let returnVal = ""

        SubHeaderArray1.map((item) => {
            if (item.Text2 == StandardId)
                returnVal = item.Name
        })
        return returnVal;
    }

    const getTestName = () => {
        let returnVal = ""

        HeaderArray1.map((item) => {
            if (item.text1 == TestId)
                returnVal = item.Name
        })
        return returnVal;
    }
    const onClickSubmit = () => {
        dispatch(GetSumbitExamSchedule(SumbitExamScheduleBody))
        const GetSubjectExamScheduleBody: IGetSubjectExamScheduleBody = {
            asStandardId: Number(StandardId),
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId),
            asStandardwiseExamScheduleId: Number(SchoolwiseStandardExamScheduleId),

        }
        dispatch(GetSubjectExamSchedule(GetSubjectExamScheduleBody));
        setIsUnsubmitted(false);
        toast.success('Exam schedule has been submited successfully.');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleOpenDialog = (instructionText) => {
        setEditMode(false);
        setIsConfirm('');
        setCurrentInstruction(instructionText);
        setOpenDialog(true);
    };
    const handleOpenDialog1 = (instructionText) => {
        setIsConfirm1('');
        setEditMode(true);
        setCurrentInstruction(instructionText);
        setOpenDialog1(true);
    };

    const handleAddOrUpdateInstruction = () => {

        if (editMode && selectedInstructionId != null) {
            setInstructions(prev =>
                prev.map(inst => inst.id === selectedInstructionId ? { ...inst, text: currentInstruction } : inst)
            );
        } else if (editMode) {
            setInstructions(prev =>
                prev.map(inst => inst.id === selectedInstructionId ? { ...inst, text: currentInstruction } : inst)
            );
        }
        else {
            const newInstruction = { id: instructions.length + 1, text: currentInstruction };
            setInstructions([...instructions, newInstruction]);
        }
        const UpdateExamScheduleInstructionsBody: IUpdateExamScheduleInstructionsBody = {
            asSchoolId: Number(asSchoolId),
            asSchoolwiseStandardExamScheduleId: Number(SchoolwiseStandardExamScheduleId),
            asInstructions: currentInstruction,
            asUpdatedById: asUserId
        }
        dispatch(GetUpdateExamScheduleInstructions(UpdateExamScheduleInstructionsBody));
        handleCloseDialog1();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const [isExpanded, setIsExpanded] = useState(Instructionss.length > 0);

    const handleAccordionToggle = () => {
        setIsExpanded(!isExpanded);
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
                            value={getClassName() || ''}
                            InputProps={{
                                readOnly: true,
                                sx: {
                                    backgroundColor: '#F0F0F0',
                                },
                            }}
                            sx={{ width: 150 }}
                        />
                        <Tooltip title={getTestName()}>
                            <TextField
                                variant="outlined"
                                label='Exam Name'
                                size='small'
                                value={getTestName() || ''}
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
                        <Tooltip title="Save">
                            <span>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor:
                                            (!getIsSubmitedd || getIsSubmitedd.length === 0 || getIsSubmitedd[0]?.IsSubmitedd === "False")
                                                ? green[500]
                                                : 'gray',
                                        '&:hover': {
                                            backgroundColor:
                                                (!getIsSubmitedd || getIsSubmitedd.length === 0 || getIsSubmitedd[0]?.IsSubmitedd === "False")
                                                    ? green[600]
                                                    : 'gray',
                                        },
                                    }}
                                    onClick={onClickSave}
                                    disabled={
                                        !(!getIsSubmitedd || getIsSubmitedd.length === 0 || getIsSubmitedd[0]?.IsSubmitedd === "False")
                                    }
                                >
                                    <SaveIcon />
                                </IconButton>
                            </span>
                        </Tooltip>

                        {!getIsSubmitedd || getIsSubmitedd.length === 0 ? (

                            <Tooltip title="Submit">
                                <span>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: 'gray',
                                        }}
                                        disabled={true}
                                    >
                                        <CheckRoundedIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        ) : getIsSubmitedd[0]?.IsSubmitedd === "False" ? (
                            <Tooltip title="Submit">
                                <span>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            '&:hover': {
                                                backgroundColor: green[600],
                                            },
                                        }}
                                        onClick={onClickSubmit} // Submit function
                                    >
                                        <CheckRoundedIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Unsubmit">
                                <span>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: red[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: red[600] },
                                        }}
                                        onClick={handleUnsubmit} // Unsubmit function
                                    >
                                        <Close />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        )}
                        {IsConfigured !== 'false' && (
                            <Tooltip title="Copy Schedule">
                                {IsConfigured && (
                                    <span>
                                        <IconButton
                                            sx={{
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
                                    </span>
                                )}
                            </Tooltip>
                        )}
                        {IsConfigured !== 'false' && (
                            <Tooltip title="Add Instructions">
                                <span>
                                    <IconButton sx={{
                                        color: 'white',
                                        backgroundColor: blue[500],
                                        '&:hover': {
                                            backgroundColor: blue[600]
                                        }
                                    }}
                                        onClick={() => handleOpenDialog1(true)}
                                        disabled={Instructionss.length > 0 && Instructionss[0]?.Instructionss !== ""}
                                    >
                                        <AddBoxRoundedIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        )}
                    </>
                }
            />
            {IsConfigured !== 'false' && (
                <Box sx={{ mb: 1 }}>
                    <Accordion sx={{ mt: 1, mb: 1 }} expanded={isExpanded}
                        onChange={handleAccordionToggle}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h5"><strong>Instructions : </strong></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display="flex" flexDirection="column" gap={2}>
                                {Instructionss[0]?.Instructionss.length > 0 ? (
                                    Instructionss.map((instruction, index) => (
                                        <Box key={index} display="flex" alignItems="center" justifyContent="space-between">
                                            <Typography sx={{
                                                width: 'calc(97% - 150px)',
                                                wordBreak: 'break-word'
                                            }} variant="body1">{instruction.Instructionss}</Typography>
                                            <Button
                                                sx={{
                                                    color: 'blue',
                                                    width: '170px',
                                                    ml:1,
                                                 backgroundColor: grey[200], borderRadius: '7px',
                                                    '&:hover': {
                                                        color: 'blue',
                                                        backgroundColor: blue[100]
                                                    }
                                                }}
                                                onClick={() => handleOpenDialog1(instruction.Instructionss)}
                                            >
                                                Update Instruction
                                            </Button>
                                        </Box>
                                    ))
                                ) : (
                                    null
                                )}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            )}
            <Box>
                <StandardwiseExamScheduleTable ClickSaveXML={ClickSaveXML} subErrorMsg={subError} TimeError={timeError} />
            </Box>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="md"
                PaperProps={{ sx: { borderRadius: '15px' } }}
            >
                <DialogTitle sx={{ bgcolor: '#223354' }}>
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
                    <SelectStandards
                        selectedStandards={selectedStandards}
                        setSelectedStandards={setSelectedStandards}
                    />

                </DialogContent>
                <DialogActions sx={{ py: 2, px: 3 }}>
                    <Button color={'error'} onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onClickCopyExamSchedule}
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
                        title={'Add or update Instruction for exam.'}
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
                    {'Exam Instructions'}
                </Typography>
                <DialogContent>
                    <TextField
                        label="Instruction"
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        value={
                            IsConfigured
                                ? currentInstruction === 'true' ? ' ' : currentInstruction || ''
                                : ' '
                        }
                        // onChange={(e) => setCurrentInstruction(e.target.value)}
                        onChange={(e) => {
                            if (e.target.value.length <= 500) {
                                setCurrentInstruction(e.target.value);
                            }
                        }}
                        inputProps={{ maxLength: 500 }}
                        sx={{ mt: 2 }}
                    />

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
                        Submit
                    </Button>
                </DialogActions>

            </Dialog>

        </Box>
    )
}

export default StandardwiseExamSchedule