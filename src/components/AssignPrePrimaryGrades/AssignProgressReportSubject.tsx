import { QuestionMark } from "@mui/icons-material";
import Save from "@mui/icons-material/Save";
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ISaveNonXseedSubGrades } from "src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import SearchableDropdown1 from "src/libraries/ResuableComponents/SearchableDropdown1";
import { CDAGetNonXseedStudentsObs, CDASaveNonXseedSubGrades, GetStudentsForStdDevMasters, resetSavenonXseedMsg } from "src/requests/AssignPrePrimaryGrades/ReqAssignPrePrimaryGrades";
import { RootState } from "src/store";
import CommonPageHeader from "../CommonPageHeader";
const cellStyle = {
    padding: '0.2em 1.5em', // Adjust these values to reduce the height
};
const cellStyleH = {
    padding: '0.4em 1.5em', // Adjust these values to reduce the height
};

// THIS PAGE IS FOR NON-XSEEED SUBJECT GRADES

const AssignProgressReportSubject = () => {
    const dispatch = useDispatch();
    const GradesList = useSelector((state: RootState) => state.AssignPrePrimaryGrades.listGradesDetails);
    const StudentList = useSelector((state: RootState) => state.AssignPrePrimaryGrades.ISGetNonXseedStudentsName);
    const SaveNonXseedMsg = useSelector((state: RootState) => state.AssignPrePrimaryGrades.IGetSaveNonXseedSubGradesMsg);
    const Loading = useSelector((state: RootState) => state.AssignPrePrimaryGrades.Loading);

    // const { EditStatusId, ClassName, Assesment, SubjectName, SubjectId, SelectTerm, StandardDivisionId, selectTeacher } = useParams();
    const location = useLocation();
    const { EditStatusId, ClassName, Assesment, SelectTerm, SubjectName, SubjectId, StandardDivisionId, selectTeacher } = location.state || {};

    const [headerGrade, setHeaderGrade] = useState("0-0-0");
    const [grades, setGrades] = useState({});
    const [observations, setObservations] = useState({});
    const [observationError, setObservationError] = useState('');
    const [emptySubmission, setEmptySubmission] = useState('');
    const [initialGrades, setInitialGrades] = useState('');
    const [initialObs, setInitialObs] = useState('');

    useEffect(() => {
        dispatch(GetStudentsForStdDevMasters(GetStudentsForStdDevMastersBody));
    }, [dispatch]);

    useEffect(() => {
        if (SaveNonXseedMsg !== '') {
            toast.success(SaveNonXseedMsg)
            dispatch(CDAGetNonXseedStudentsObs(GetStudentsForStdDevMastersBody));
        }
        dispatch(resetSavenonXseedMsg())
    }, [SaveNonXseedMsg])

    const NonXseedStudentswithObs = useSelector((state: RootState) => state.AssignPrePrimaryGrades.ISGetNonXseedStudentsObs)

    useEffect(() => {
        dispatch(CDAGetNonXseedStudentsObs(GetStudentsForStdDevMastersBody))
    }, [])

    useEffect(() => {
        if (NonXseedStudentswithObs.length > 0) {
            const initialGrades = NonXseedStudentswithObs.reduce((acc, student) => {
                acc[student.Text1] = filteredValue(student.Text3);
                return acc;
            }, {});
            const initialObservations = NonXseedStudentswithObs.reduce((acc, student) => {
                acc[student.Text1] = student.Text4;
                return acc;
            }, {});
            setGrades(initialGrades);
            setObservations(initialObservations);
            setInitialGrades(JSON.stringify(initialGrades));
            setInitialObs(JSON.stringify(initialObservations));
        }
    }, [NonXseedStudentswithObs]);

    const clickHeaderGrade = (value, isAbsent, isExempted) => {
        setHeaderGrade(value);
        const updatedGrades = NonXseedStudentswithObs.reduce((acc, student) => {
            acc[student.Text1] = value;
            return acc;
        }, {});
        setGrades(updatedGrades);
        // setInitialGrades(JSON.stringify(updatedGrades));

        if (value === "0-0-0" || isAbsent === "1" || isExempted === "1") {
            const clearedObservations = NonXseedStudentswithObs.reduce((acc, student) => {
                acc[student.Text1] = "";
                return acc;
            }, {});
            setObservations(clearedObservations);
            // setInitialObs(JSON.stringify(clearedObservations));
        }
    };

    const clickBodyGrade = (studentId, value, isAbsent, isExempted) => {
        setGrades((prevGrades) => ({
            ...prevGrades,
            [studentId]: value,
        }));
        if (value === "0-0-0" || isAbsent === "1" || isExempted === "1") {
            setObservations((prevObservations) => ({
                ...prevObservations,
                [studentId]: "",
            }));
        }
    };

    const handleObservationChange = (studentId, value) => {
        setObservations((prevObservations) => ({
            ...prevObservations,
            [studentId]: value,
        }));
    };

    const HeaderArray = [
        { Id: 1, Header: 'Roll No.' },
        { Id: 2, Header: 'Student Name' },
        { Id: 3, Header: 'Grade' },
        {
            Id: 4, Header: <>

                <SearchableDropdown
                    sx={{ maxWidth: '15vw', backgroundColor: 'white' }}
                    ItemList={GradesList}
                    onChange={clickHeaderGrade}
                    label={''}
                    disabled={EditStatusId === '3' || EditStatusId === '3P'}
                    defaultValue={headerGrade}
                    size={"small"}
                    DisableClearable={true}
                />


            </>,
        },
        { Id: 5, Header: 'Observations' },
    ];
    const GetStudentsForStdDevMastersBody = {
        asSchoolId: Number(localStorage.getItem('localSchoolId')),
        asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asStandardDivisionId: Number(StandardDivisionId),
        asAssessmentId: Number(SelectTerm),
        asSubjectId: Number(SubjectId),
    };
    const getXML = () => {
        let sXML = "";

        NonXseedStudentswithObs.forEach((student) => {

            const YearwiseId = student.Text5;
            const studentId = student.Text1;
            const grade = grades[studentId]?.split('-')[0];
            const observation = observations[studentId];
            if (grade !== "0") {
                sXML +=
                    "<NonXseedSubjectGrades>" +
                    "<YearwiseStudentId>" + YearwiseId + "</YearwiseStudentId>" +
                    "<AssessmentId>" + SelectTerm + "</AssessmentId>" +
                    "<Observation>" + observation + "</Observation>" +
                    "<StandardDivisionId>" + StandardDivisionId + "</StandardDivisionId>" +
                    "<ShowSubjectRemark>" + false + "</ShowSubjectRemark>" +
                    "<NonXseedSubjectGradeId>" + 0 + "</NonXseedSubjectGradeId>" +
                    "<SubjectId>" + SubjectId + "</SubjectId>" +
                    "<GradeId>" + grade + "</GradeId>" +
                    "</NonXseedSubjectGrades>";
            }
        });
        sXML = `<ArrayOfNonXseedSubjectGrades xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
        ${sXML}</ArrayOfNonXseedSubjectGrades>`
        return sXML;
    };

    function filteredValue(id) {
        if (GradesList.length > 0) {
            let isThere = GradesList?.filter((item) => item.Value?.split('-')[0] === id);
            return isThere[0].Value
        }
    }
    const [isEmpty, setIsEmpty] = useState(false);
    // useEffect(() => {
    //     if (isEmpty) {
    //         toast.warning("Empty Submission not Allowed. Please enter student grade and observation.")
    //     }
    // }, [isEmpty])

    const SaveNonXseedGrades = () => {
        setObservationError('');
        setEmptySubmission('');
        const emptyObservationRows = Object.keys(grades).filter(studentId => {
            const gradeParts = grades[studentId]?.split('-');
            return grades[studentId] !== "0-0-0" &&
                !observations[studentId] &&
                gradeParts[1] !== "1" &&
                gradeParts[2] !== "1";
        });

        const emptySubmissionRows = Object.keys(grades).filter(studentId => grades[studentId] == "0-0-0" && !observations[studentId]);
        setIsEmpty(emptySubmissionRows.length > 0 ? true : false);

        const SaveNonXseedGradesBody: ISaveNonXseedSubGrades = {
            asXseedGradesXML: getXML(),
            asSchoolId: Number(localStorage.getItem('localSchoolId')),
            asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asAssessmentId: Number(SelectTerm),
            asStandardDivId: Number(StandardDivisionId),
            asSubjectId: Number(SubjectId),
            asInsertedById: Number(sessionStorage.getItem('Id')),
            asUpdatedById: Number(sessionStorage.getItem('Id'))
        };
        if (emptyObservationRows.length > 0) {
            // <Alert severity="warning">{`Observation should not be blank for row(s): ${emptyObservationRows}`}</Alert>
            // toast with more width with css
            const options = {
                style: { width: '30vw' }
            }
            // toast.warning(`Observation should not be blank for row(s): ${emptyObservationRows.toString()}`, options);
            setObservationError(`Observation should not be blank for row(s): ${emptyObservationRows.toString()}`)
            return;
        } else if (emptySubmissionRows.length === NonXseedStudentswithObs.length) {
            // toast.warning("Empty Submission not Allowed. ")
            setEmptySubmission('Fields should not be blank.')
        } else {
            if (initialGrades !== JSON.stringify(grades) || initialObs !== JSON.stringify(observations)) {
                dispatch(CDASaveNonXseedSubGrades(SaveNonXseedGradesBody))
            }
        }
    }


    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: selectTeacher === 'RP' ? `Pre-Primary Progress Report Results` : 'Assign Pre-Primary Grades',
                            path: selectTeacher === 'RP' ? `/RITeSchool/Teacher/PrePrimaryResult/${SelectTerm}/${StandardDivisionId}` : '/RITeSchool/Teacher/AssignPrePrimaryGrades' + '/' + SelectTerm + '/' + selectTeacher
                        },
                        {
                            title: 'Assign Subject Grades',
                            path: ''
                        }
                    ]}
                    rightActions={
                        // <Stack direction={"row"} alignItems={"center"} sx={{ gap: 2 }}>
                        <>
                            <TextField
                                fullWidth
                                label={'Class'}
                                value={ClassName}
                                sx={{ bgcolor: '#F0F0F0' }}
                                size="small"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                fullWidth
                                label={'Assessment'}
                                value={Assesment}
                                sx={{ bgcolor: '#F0F0F0' }}
                                size="small"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                fullWidth
                                label={'Subject Name'}
                                value={SubjectName}
                                sx={{ bgcolor: '#F0F0F0' }}
                                size="small"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            {(EditStatusId !== '3' && EditStatusId !== '3P') &&
                                <Tooltip title={'Save'}>
                                    <IconButton
                                        onClick={SaveNonXseedGrades}
                                        sx={{
                                            background: green[500],
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                    >
                                        <Save />
                                    </IconButton>
                                </Tooltip>
                            }

                            <Tooltip title={`Assign grades to each student in the class for selected subject and click on " Save".`}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: grey[500],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: grey[600] }
                                    }}
                                >
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </>

                    }
                />
                {EditStatusId === '3' &&
                    <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                        <b>Student grades are already submitted.</b>
                    </Typography>}
                {EditStatusId === '3P' &&
                    <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                        <b>Results for this assessment has been published. You need to unpublish the assessment to update the grades.</b>
                    </Typography>}
                {NonXseedStudentswithObs.length === 0 ?
                    // <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                    //     <b>No record found.</b>
                    // </Typography>
                    <span></span>
                    :
                    <Box sx={{ background: 'white', p: 2 }}>
                        {emptySubmission !== '' && <Box mb={1}>
                            <div style={{ color: 'red', fontWeight: 'bolder' }}>{emptySubmission}</div>
                        </Box>
                        }
                        {observationError !== '' && <Box mb={1}>
                            <div style={{ color: 'red', fontWeight: 'bolder' }}>{observationError}</div>
                        </Box>}
                        <TableContainer component={Box}>
                            <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                                <TableHead >
                                    <TableRow>
                                        {/* {HeaderArray.map((item, i) => (
                                        <TableCell key={i} sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', textAlign: item.Header === 'Student Name' ? 'left' : item.Header === 'Grade' ? 'right' : 'center', pt: '10px', pb: '10px' }}>
                                            <b>{item.Header}</b>
                                        </TableCell>
                                    ))} */}
                                        <TableCell align="center" sx={{ fontWeight: '700', textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', ...cellStyle, pt: '15px', pb: '15px' }}>Roll No.</TableCell>
                                        <TableCell align="left" sx={{ fontWeight: '700', textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', ...cellStyle, pt: '15px', pb: '15px' }}>Student Name</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: '700', textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', ...cellStyle, pt: '15px', pb: '15px' }}>Grade</TableCell>
                                        <TableCell align="left" sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', ...cellStyle }}>
                                            <>
                                                <SearchableDropdown1
                                                    sx={{ maxWidth: '15vw', backgroundColor: 'white' }}
                                                    ItemList={GradesList}
                                                    onChange={(value) => clickHeaderGrade(value.Value, value.isAbsent, value.isExempted)}
                                                    label={''}
                                                    disabled={EditStatusId === '3' || EditStatusId === '3P'}
                                                    defaultValue={headerGrade}
                                                    size={"small"}
                                                    DisableClearable={true}
                                                />
                                            </>
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: '700', textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', ...cellStyle, pt: '15px', pb: '15px' }}>Observations</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {NonXseedStudentswithObs.length !== 0 && NonXseedStudentswithObs.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="center" sx={{ ...cellStyle }}>{item.Text1}</TableCell>
                                            <TableCell sx={{ ...cellStyle }}>{item.Text2}</TableCell>
                                            <TableCell align="right" sx={{ ...cellStyle }}></TableCell>

                                            <TableCell align="left" sx={{ ...cellStyle }}>
                                                <SearchableDropdown1
                                                    sx={{ width: '15vw', backgroundColor: 'white' }}
                                                    ItemList={GradesList}
                                                    onChange={(value) => clickBodyGrade(item.Text1, value.Value, value.isAbsent, value.isExempted)}
                                                    label={''}
                                                    disabled={EditStatusId === '3' || EditStatusId === '3P'}
                                                    defaultValue={grades[item.Text1]}
                                                    DisableClearable={true}
                                                    size={"small"}
                                                />
                                            </TableCell>
                                            <TableCell align="center" sx={{ ...cellStyle }}>
                                                <textarea
                                                    rows={2}
                                                    cols={50}
                                                    style={{ backgroundColor: 'white' }}
                                                    disabled={EditStatusId === '3' || EditStatusId === '3P' ? true : grades[item.Text1]?.split('-')[0] === "0" ? true : grades[item.Text1]?.split('-')[1] === "1" ? true : grades[item.Text1]?.split('-')[2] === "1" ? true : false}
                                                    value={observations[item.Text1]}
                                                    onChange={(e) => handleObservationChange(item.Text1, e.target.value)}
                                                    maxLength={500}
                                                ></textarea>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>}
            </Box>
        </>
    );
}

export default AssignProgressReportSubject;