import { QuestionMark, Save } from "@mui/icons-material"
import { Box, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import { green } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { IGetInsertStudentGradesBody, IGetLearningOutcomesForSubjectSectionBody, IGetXseedStudentsInfoBody } from "src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades"
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown"
import { CDAClearInsertStudentGrades, CDAInsertStudentGrades, CDALearningOutcomesForSubjectSection, CDAXseedStudentsdata } from "src/requests/AssignPrePrimaryGrades/ReqAssignPrePrimaryGrades"
import { RootState } from "src/store"
import CommonPageHeader from "../CommonPageHeader"

// THIS PAGE IS FOR XSEEED SUBJECT GRADES

const AssignPrePrimarySubjectGrades = () => {
    // Params Data Retrieval | useParams() / Hook
    const { EditStatusId, ClassName, Assesment, SubjectName, SubjectId, SelectTerm, StandardDivisionId, selectTeacher } = useParams();
    // Local And Session Storage Data Retrieval
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const dispatch = useDispatch();
    // Redux State Data Retrieval
    const XseedStudentsList: any = useSelector((state: RootState) => state.AssignPrePrimaryGrades.ISXseedStudentsList);
    const XseedSubjectSectionList: any = useSelector((state: RootState) => state.AssignPrePrimaryGrades.ISXseedSubjectSectionList);
    const XseedGradesList: any = useSelector((state: RootState) => state.AssignPrePrimaryGrades.ISXseedGradesList);
    const ListLearningOutcomeDetails: any = useSelector((state: RootState) => state.AssignPrePrimaryGrades.ISListLearningOutcomeDetails);
    const ListObservationDetails: any = useSelector((state: RootState) => state.AssignPrePrimaryGrades.ISListObsDetails);
    const InsertStudentGradesMsg: any = useSelector((state: RootState) => state.AssignPrePrimaryGrades.ISInsertStudentGradesMsg);
    // useState() | Hooks
    const [student, setStudent] = useState('0')
    const [subjectSection, setSubjectSection] = useState('0')
    const [headerGrade, setHeaderGrade] = useState("0")
    const [grades, setGrades] = useState({});
    const [LearningOutcomeObsId, setLearningOutcomeObsId] = useState('');
    const [subRemark, setSubRemark] = useState('')
    // useEffects() | Hooks
    const cellStyle = {
        padding: '0.2em 1.5em', // Adjust these values to reduce the height
    };

    useEffect(() => {
        if (InsertStudentGradesMsg !== '') {
            toast.success(InsertStudentGradesMsg);
            dispatch(CDAClearInsertStudentGrades());
        }
    }, [InsertStudentGradesMsg])
    useEffect(() => {
        if (ListObservationDetails.length > 0) {
            setLearningOutcomeObsId(ListObservationDetails[0].LearningOutcomeObsId)
            setSubRemark(ListObservationDetails[0].subRemark)
        }
    }, [ListObservationDetails])
    useEffect(() => {
        const XseedDataBody: IGetXseedStudentsInfoBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId),
            asStandardDivisionId: Number(StandardDivisionId),
            asAssessmentId: Number(SelectTerm),
            asSubjectId: Number(SubjectId)
        }
        dispatch(CDAXseedStudentsdata(XseedDataBody))
    }, []);
    useEffect(() => {
        const LearningOutcomesForSubjectSectionBody: IGetLearningOutcomesForSubjectSectionBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId),
            asAssessmentId: Number(SelectTerm),
            asSubjectSectionConfigurationId: Number(subjectSection),
            asYearwiseStudentId: Number(student),
            asSubjectId: Number(SubjectId)
        }
        if (student !== '0' && subjectSection !== '0') {
            dispatch(CDALearningOutcomesForSubjectSection(LearningOutcomesForSubjectSectionBody))
            setHeaderGrade('0')
        }
    }, [student, subjectSection])

    useEffect(() => {
        if (ListLearningOutcomeDetails.length > 0) {
            console.log(`Hey there I'm here 😎`, ListLearningOutcomeDetails)
        }
    }, [ListLearningOutcomeDetails])

    // Actual code | useEffect() for Grade Values tracking and pre-formatting
    useEffect(() => {
        if (ListLearningOutcomeDetails.length > 0) {
            const initialGrades = ListLearningOutcomeDetails.reduce((acc, student) => {
                acc[student.Text1] = `${student.Text4}-${student.Text5}`;
                return acc;
            }, {});
            setGrades(initialGrades);
        }
    }, [ListLearningOutcomeDetails])

    // Control Functions | f() 
    function clickSubSection(value) {
        setSubjectSection(value)
    }
    function clickStudent(value) {
        setStudent(value)
    }
    function clickHeaderGrade(value) {
        setHeaderGrade(value)
        const updatedGrades = ListLearningOutcomeDetails.reduce((acc, student) => {
            acc[student.Text1] = `${value}-${student.Text5}`;
            return acc;
        }, {});
        setGrades(updatedGrades);
    }
    const clickBodyGrade = (learningOutcomeId, value, gradeConfigId) => {
        setGrades((prevGrades) => ({
            ...prevGrades,
            [learningOutcomeId]: `${value}-${gradeConfigId}`,
        }));
    }
    function saveLearningOutcomes() {
        const saveLearningOutcomeBody: IGetInsertStudentGradesBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId),
            asYearwiseStudentId: Number(student),
            asLearningOutcomeXML: learningOutcomeXML(),
            asInsertedById: Number(sessionStorage.getItem('Id')),
            asSubjectSectionConfigurationId: Number(subjectSection),
            asObservation: "",
            asAssessmentId: Number(SelectTerm),
            asLearningOutcomesObservationId: Number(LearningOutcomeObsId),
            asSubjectRemark: subRemark,
            asSubjectId: Number(SubjectId),
        }
        dispatch(CDAInsertStudentGrades(saveLearningOutcomeBody))
    }

    function learningOutcomeXML() {
        let sXML = '';
        ListLearningOutcomeDetails.forEach((student) => {
            const learningOutcomeConfigId = student.Text1;
            const gradeId = grades[learningOutcomeConfigId].split('-')[0];
            const learningOutcomeGradeId = grades[learningOutcomeConfigId].split('-')[1];
            sXML += `<LearningOutcomes GradeId='${gradeId}' LearningOutcomeConfigId='${learningOutcomeConfigId}' LearningOutcomeGradeId='${learningOutcomeGradeId}'/>`
        });
        sXML = `<LearningOutcomes>${sXML}</LearningOutcomes>`
        return sXML;
    }

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Assign Pre-Pri...',
                        path: '/extended-sidebar/Teacher/AssignPrePrimaryGrades' + '/' + SelectTerm + '/' + selectTeacher
                    },
                    {
                        title: 'Pre-Primary Progress Report Subject Grades',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <TextField
                            label={'Class'}
                            value={ClassName}
                            sx={{ bgcolor: '#F0F0F0', minWidth: '10vw' }}
                            disabled
                            size="small"
                            inputProps={{ style: { color: 'rgb(0, 0, 0)' } }}
                        />
                        <TextField
                            label={'Assessment'}
                            value={Assesment}
                            sx={{ bgcolor: '#F0F0F0', minWidth: '10vw' }}
                            disabled
                            size="small"
                            inputProps={{ style: { color: 'rgb(0, 0, 0)' } }}
                        />
                        <TextField
                            label={'Subject Name'}
                            value={SubjectName}
                            sx={{ bgcolor: '#F0F0F0', minWidth: '10vw' }}
                            disabled
                            size="small"
                            inputProps={{ style: { color: 'rgb(0, 0, 0)' } }}
                        />
                        {EditStatusId !== '3' && student !== '0' && subjectSection !== '0' &&
                            <Tooltip title={'Save'}>
                                <IconButton
                                    onClick={saveLearningOutcomes}
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
                        <Box>
                            <Tooltip title={`Assign grades to each student in the class for the selected subject section and click on 'Save'.
                                Once grades are submitted to class-teacher you can modify it from xseed results.`}>
                                <IconButton sx={{
                                    bgcolor: 'grey.500',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'grey.600'
                                    }
                                }}>
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>
                }
            />
            <Stack direction='row' spacing={2}>
                <SearchableDropdown
                    ItemList={XseedStudentsList}
                    defaultValue={student}
                    label={'Student '}
                    sx={{ minWidth: '20vw' }}
                    size={"small"}
                    onChange={clickStudent}
                    mandatory
                />
                <SearchableDropdown
                    ItemList={XseedSubjectSectionList}
                    defaultValue={subjectSection}
                    label={'Subject Section'}
                    sx={{ minWidth: '20vw' }}
                    size={"small"}
                    onChange={clickSubSection}
                    mandatory
                />
            </Stack>
            {EditStatusId === '3' &&
                <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', mt: 2 }}>
                    <b>Student grades are already submitted.</b>
                </Typography>}
            {student !== '0' && subjectSection !== '0' && ListLearningOutcomeDetails.length === 0 &&
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                    <b>No record found.</b>
                </Typography>}
            {student !== '0' && subjectSection !== '0' && ListLearningOutcomeDetails.length > 0 &&
                <Box sx={{ background: 'white', p: 2, mt: 2 }}>
                    <TableContainer component={Box} >
                        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                            <TableHead >
                                <TableRow>
                                    <TableCell sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', pt: '10px', pb: '10px', minWidth: '60vw' }}>
                                        <b>Learning Outcome</b>
                                    </TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', pt: '10px', pb: '10px' }}>
                                        <b>Grade</b>
                                    </TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', pt: '10px', pb: '10px' }}>
                                        <SearchableDropdown
                                            ItemList={XseedGradesList}
                                            defaultValue={headerGrade}
                                            label={''}
                                            sx={{ maxWidth: '20vw', backgroundColor: 'white', marginLeft: '5px' }}
                                            size={"small"}
                                            disabled={EditStatusId === '3' ? true : false}
                                            DisableClearable={true}
                                            onChange={clickHeaderGrade}
                                            mandatory
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ListLearningOutcomeDetails.length > 0 &&
                                    ListLearningOutcomeDetails.map((item, i) => (
                                        <TableRow key={i} >
                                            <TableCell sx={{ ...cellStyle }}>{item.Text2}</TableCell>
                                            <TableCell sx={{ ...cellStyle }} />
                                            <TableCell sx={{ ...cellStyle }} >
                                                <SearchableDropdown
                                                    ItemList={XseedGradesList}
                                                    defaultValue={grades[item.Text1]?.split('-')[0]}
                                                    label={''}
                                                    sx={{ width: '20vw', backgroundColor: 'white' }}
                                                    size={"small"}
                                                    disabled={EditStatusId === '3' ? true : false}
                                                    DisableClearable={true}
                                                    onChange={(value) => clickBodyGrade(item.Text1, value, item.Text5)}
                                                    mandatory
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>}
        </Box>
    )
}

export default AssignPrePrimarySubjectGrades;
