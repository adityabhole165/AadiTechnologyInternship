import { QuestionMark, Save } from "@mui/icons-material"
import { Box, Grid, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, Tooltip, Typography } from "@mui/material"
import { green } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { IGetInsertStudentGradesBody, IGetLearningOutcomesForSubjectSectionBody, IGetXseedStudentsInfoBody } from "src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades"
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown"
import { CDAClearInsertStudentGrades, CDAInsertStudentGrades, CDALearningOutcomesForSubjectSection, CDAXseedStudentsdata } from "src/requests/AssignPrePrimaryGrades/ReqAssignPrePrimaryGrades"
import { RootState } from "src/store"
import { encodeURL, SchoolScreensAccessPermission } from "../Common/Util"
import CommonPageHeader from "../CommonPageHeader"

// THIS PAGE IS FOR XSEEED SUBJECT GRADES

const AssignPrePrimarySubjectGrades = () => {
    // Params Data Retrieval | useParams() / Hook
    // const { EditStatusId, ClassName, Assesment, SubjectName, SubjectId, SelectTerm, StandardDivisionId, selectTeacher } = useParams();
    const location = useLocation();
    const { EditStatusId, ClassName, Assesment, SelectTerm, SubjectName, SubjectId, StandardDivisionId, selectTeacher } = location.state || {};
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
    const Loading = useSelector((state: RootState) => state.AssignPrePrimaryGrades.Loading);
    const schoolId = localStorage.getItem('localSchoolId');
    // useState() | Hooks
    const [student, setStudent] = useState('0')
    const [subjectSection, setSubjectSection] = useState('0')
    const [headerGrade, setHeaderGrade] = useState("0")
    const [grades, setGrades] = useState({});
    const [LearningOutcomeObsId, setLearningOutcomeObsId] = useState('');
    const [subRemark, setSubRemark] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [facilitatorObs, setFacilitatorObs] = useState('');
    const [initialValue, setInitialValue] = useState('');
    const [initialFacilitatorObs, setInitialFacilitatorObs] = useState('');
    // useEffects() | Hooks
    const cellStyle = {
        padding: '0.2em 1.5em', // Adjust these values to reduce the height
    };

    useEffect(() => {
        if (ListObservationDetails.length > 0) {
            setLearningOutcomeObsId(ListObservationDetails[0].LearningOutcomeObsId)
            setSubRemark(ListObservationDetails[0].subRemark)
            setFacilitatorObs(ListObservationDetails[0].obs)
            setInitialFacilitatorObs(ListObservationDetails[0].obs)
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
    const LearningOutcomesForSubjectSectionBody: IGetLearningOutcomesForSubjectSectionBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asAssessmentId: Number(SelectTerm),
        asSubjectSectionConfigurationId: Number(subjectSection),
        asYearwiseStudentId: Number(student),
        asSubjectId: Number(SubjectId)
    }
    useEffect(() => {
        if (student !== '0' && subjectSection !== '0') {
            dispatch(CDALearningOutcomesForSubjectSection(LearningOutcomesForSubjectSectionBody))
            setHeaderGrade('0')
        }
    }, [student, subjectSection])
    useEffect(() => {
        if (InsertStudentGradesMsg !== '') {
            toast.success(InsertStudentGradesMsg);
            dispatch(CDAClearInsertStudentGrades());
            dispatch(CDALearningOutcomesForSubjectSection(LearningOutcomesForSubjectSectionBody))
            setHeaderGrade('0')
        }
    }, [InsertStudentGradesMsg])


    // Actual code | useEffect() for Grade Values tracking and pre-formatting
    useEffect(() => {
        if (ListLearningOutcomeDetails.length > 0) {
            const initialGrades = ListLearningOutcomeDetails.reduce((acc, student) => {
                acc[student.Text1] = `${student.Text4}-${student.Text5}`;
                return acc;
            }, {});
            setGrades(initialGrades);
            setInitialValue(JSON.stringify(initialGrades));

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
            asObservation: facilitatorObs,
            asAssessmentId: Number(SelectTerm),
            asLearningOutcomesObservationId: Number(LearningOutcomeObsId),
            asSubjectRemark: subRemark,
            asSubjectId: Number(SubjectId),
        }
        if (initialValue !== JSON.stringify(grades) || initialFacilitatorObs !== facilitatorObs) {
            dispatch(CDAInsertStudentGrades(saveLearningOutcomeBody));
        }
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
                        title: selectTeacher === 'RP' ? 'Pre-Primary Pro...' : 'Assign Pre-Pri...',
                        path: selectTeacher === 'RP' ? `/RITeSchool/Teacher/PrePrimaryResult/${encodeURL(SelectTerm)}/${encodeURL(StandardDivisionId)}` : '/RITeSchool/Teacher/AssignPrePrimaryGrades' + '/' + encodeURL(SelectTerm) + '/' + encodeURL(selectTeacher)
                    },
                    {
                        title: 'Pre-Primary Progress Report Subject Grades',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems="right"
                            gap={1}
                            sx={{
                                mt: { xs: 0, sm: 0 },
                                flexWrap: { xs: 'nowrap', sm: 'nowrap' }
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                            >
                                <TextField
                                    label={'Class'}
                                    value={ClassName}
                                    sx={{ bgcolor: '#F0F0F0', width: { xs: '40vw', sm: '12vw' } }}
                                    size="small"
                                    InputProps={{
                                        readOnly: true,
                                    }}

                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                            >
                                <TextField
                                    label={'Assessment'}
                                    value={Assesment}
                                    sx={{ bgcolor: '#F0F0F0', width: { xs: '40vw', sm: '12vw' } }}
                                    size="small"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                            >
                                <TextField
                                    label={'Subject Name'}
                                    value={SubjectName}
                                    sx={{ bgcolor: '#F0F0F0', width: { xs: '40vw', sm: '12vw' } }}
                                    size="small"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                gap={1}
                                display="flex"
                                justifyContent={{ xs: 'flex-start', sm: 'flex-end ' }}
                            >
                                {(EditStatusId !== '3' && EditStatusId !== '3P') && student !== '0' && subjectSection !== '0' &&
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

                                <Tooltip title={`Assign grades to each student in the class for the selected subject section and click on "Save".
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
                            </Grid>
                        </Stack>
                    </>
                }
            />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3} lg={3}>
                    <SearchableDropdown
                        ItemList={XseedStudentsList}
                        defaultValue={student}
                        label={'Student '}
                        sx={{ minWidth: '15vw' }}
                        size={"small"}
                        onChange={clickStudent}
                        mandatory
                    /></Grid>
                <Grid item xs={12} sm={4} md={3} lg={3}>
                    <SearchableDropdown
                        ItemList={XseedSubjectSectionList}
                        defaultValue={subjectSection}
                        label={'Subject Section'}
                        sx={{ minWidth: '15vw' }}
                        size={"small"}
                        onChange={clickSubSection}
                        mandatory
                    /></Grid>
            </Grid>
            {EditStatusId === '3' &&
                <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', mt: 2 }}>
                    <b>Student grades are already submitted.</b>
                </Typography>}
            {EditStatusId === '3P' &&
                <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', mt: 2 }}>
                    <b>Results for this assessment has been published. You need to unpublish the assessment to update the grades.</b>
                </Typography>}
            {/* {student !== '0' && subjectSection !== '0' && ListLearningOutcomeDetails.length === 0 &&
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                    <b>No record found.</b>
                </Typography>} */}
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
                                            disabled={EditStatusId === '3' || EditStatusId === '3P'}
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
                                                    disabled={EditStatusId === '3' || EditStatusId === '3P'}
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
                    {SchoolScreensAccessPermission() &&
                        <Grid container spacing={2} mt={0} alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" component="h3" sx={{ marginLeft: '18px' }}>
                                    Facilitator's Observation
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} container justifyContent="flex-end">
                                <TextareaAutosize
                                    minRows={2}
                                    maxRows={4}
                                    disabled={EditStatusId === '3' || EditStatusId === '3P'}
                                    style={{ backgroundColor: 'white', minWidth: '70vw', resize: 'vertical', border: '1px solid #d1d5db', outline: isFocused ? '1px solid grey' : 'none', }}
                                    value={facilitatorObs}
                                    onChange={(e) => { setFacilitatorObs(e.target.value) }}
                                    onFocus={() => setIsFocused(true)}    // Handle focus event
                                    onBlur={() => setIsFocused(false)}    // Handle blur event
                                    maxLength={1000}
                                />
                            </Grid>
                        </Grid>}
                </Box>}
        </Box>
    )
}

export default AssignPrePrimarySubjectGrades;
