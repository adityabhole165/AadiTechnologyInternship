import Save from "@mui/icons-material/Save";
import { Box, Card, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ISaveNonXseedSubGrades } from "src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import { CDASaveNonXseedSubGrades, GetStudentsForStdDevMasters, resetSavenonXseedMsg } from "src/requests/AssignPrePrimaryGrades/ReqAssignPrePrimaryGrades";
import { RootState } from "src/store";
import CommonPageHeader from "../CommonPageHeader";

const AssignProgressReportSubject = () => {
    const dispatch = useDispatch();
    const GradesList = useSelector((state: RootState) => state.AssignPrePrimaryGrades.listGradesDetails);
    const StudentList = useSelector((state: RootState) => state.AssignPrePrimaryGrades.ISGetNonXseedStudentsName);
    const SaveNonXseedMsg = useSelector((state: RootState) => state.AssignPrePrimaryGrades.IGetSaveNonXseedSubGradesMsg)

    const { EditStatusId, ClassName, Assesment, SubjectName, SubjectId, SelectTerm, StandardDivisionId } = useParams();

    const [headerGrade, setHeaderGrade] = useState("0");
    const [grades, setGrades] = useState({});
    const [observations, setObservations] = useState({});

    useEffect(() => {
        dispatch(GetStudentsForStdDevMasters(GetStudentsForStdDevMastersBody));
    }, []);

    useEffect(() => {
        if (SaveNonXseedMsg !== '') {
            toast.success(SaveNonXseedMsg)
        }
        dispatch(resetSavenonXseedMsg())
    }, [SaveNonXseedMsg])

    useEffect(() => {
        if (StudentList.length) {
            const initialGrades = StudentList.reduce((acc, student) => {
                acc[student.Text1] = "0";
                return acc;
            }, {});
            const initialObservations = StudentList.reduce((acc, student) => {
                acc[student.Text1] = "";
                return acc;
            }, {});
            setGrades(initialGrades);
            setObservations(initialObservations);
        }
    }, [StudentList]);

    const clickHeaderGrade = (value) => {
        setHeaderGrade(value);
        const updatedGrades = StudentList.reduce((acc, student) => {
            acc[student.Text1] = value;
            return acc;
        }, {});
        setGrades(updatedGrades);

        if (value === "0") {
            const clearedObservations = StudentList.reduce((acc, student) => {
                acc[student.Text1] = "";
                return acc;
            }, {});
            setObservations(clearedObservations);
        }
    };

    const clickBodyGrade = (studentId, value) => {
        setGrades((prevGrades) => ({
            ...prevGrades,
            [studentId]: value,
        }));
        if (value === "0") {
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
        { Id: 4, Header: 'Observations' },
    ];

    const HeaderArray1 = [
        { Id: 1, Header: '' },
        { Id: 2, Header: '' },
        {
            Id: 3, Header: <SearchableDropdown
                sx={{ backgroundColor: 'white', minWidth: '5vw' }}
                ItemList={GradesList}
                onChange={clickHeaderGrade}
                label={''}
                defaultValue={headerGrade}
                size={"small"}
                DisableClearable={true}
            />
        },
        { Id: 4, Header: '' },
    ];

    const GetStudentsForStdDevMastersBody = {
        asSchoolId: Number(localStorage.getItem('localSchoolId')),
        asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asStandardDivisionId: Number(StandardDivisionId),
        asAssessmentId: Number(SelectTerm),
        asSubjectId: Number(SubjectId),
    };
    console.log('Param Data....>>>', GetStudentsForStdDevMastersBody)
    const getXML = () => {
        let sXML = "";

        StudentList.forEach((student) => {

            const YearwiseId = student.Id;
            const studentId = student.Text1;
            const grade = grades[studentId];
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

    const SaveNonXseedGrades = () => {
        const emptyObservationRows = Object.keys(grades).filter(studentId => grades[studentId] !== "0" && !observations[studentId]);

        if (emptyObservationRows.length > 0) {
            toast.warning(`Observation should not be blank for row(s): ${emptyObservationRows.length}`);
            return;
        }

        const SaveNonXseedGradesBody: ISaveNonXseedSubGrades = {
            asXseedGradesXML: getXML(),
            asSchoolId: Number(localStorage.getItem('localSchoolId')),
            asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asAssessmentId: Number(SelectTerm),
            asStandardDivId: Number(StandardDivisionId),
            asSubjectId: Number(SubjectId),
            asInsertedById: 4186,
            asUpdatedById: 0
        };
        dispatch(CDASaveNonXseedSubGrades(SaveNonXseedGradesBody))
        console.log(SaveNonXseedGradesBody)
    }


    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'Assign Pre-Primary Grades',
                            path: '/extended-sidebar/Teacher/AssignPrePrimaryGrades'
                        },
                        {
                            title: 'Assign Subject Grades',
                            path: ''
                        }
                    ]}
                    rightActions={
                        <Stack direction={"row"} alignItems={"center"} sx={{ gap: 2 }}>
                            <TextField
                                fullWidth
                                label={'Class'}
                                value={ClassName}
                                sx={{ bgcolor: '#f0e68c' }}
                                disabled
                                inputProps={{ style: { fontWeight: 'bold', color: 'rgb(0, 0, 0)' } }}
                            />
                            <TextField
                                fullWidth
                                label={'Assessment'}
                                value={Assesment}
                                sx={{ bgcolor: '#f0e68c' }}
                                disabled
                                inputProps={{ style: { fontWeight: 'bold', color: 'rgb(0, 0, 0)' } }}
                            />
                            <TextField
                                fullWidth
                                label={'Subject Name'}
                                value={SubjectName}
                                sx={{ bgcolor: '#f0e68c' }}
                                disabled
                                inputProps={{ style: { fontWeight: 'bold', color: 'rgb(0, 0, 0)' } }}
                            />
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
                        </Stack>
                    }
                />
                <TableContainer component={Card}>
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                {HeaderArray.map((item, i) => (
                                    <TableCell align={'center'} key={i} sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', textAlign: item.Header === 'Student Name' ? 'left' : 'center', pt: '10px', pb: '10px' }}>
                                        <b>{item.Header}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                {HeaderArray1.map((item, i) => (
                                    <TableCell align={'center'} key={i} sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', pt: '3.5px', pb: '3.5px' }}>
                                        <b>{item.Header}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {StudentList.length !== 0 && StudentList.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell align="center">{item.Text1.split(' - ')[0]}</TableCell>
                                    <TableCell>{item.Text1.split(' - ')[1]}</TableCell>
                                    <TableCell>
                                        <SearchableDropdown
                                            sx={{ backgroundColor: 'white' }}
                                            ItemList={GradesList}
                                            onChange={(value) => clickBodyGrade(item.Text1, value)}
                                            label={''}
                                            defaultValue={grades[item.Text1]}
                                            DisableClearable={true}
                                            size={"small"}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <textarea
                                            rows={2}
                                            cols={50}
                                            disabled={grades[item.Text1] === "0"}
                                            value={observations[item.Text1]}
                                            onChange={(e) => handleObservationChange(item.Text1, e.target.value)}
                                        ></textarea>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

export default AssignProgressReportSubject;