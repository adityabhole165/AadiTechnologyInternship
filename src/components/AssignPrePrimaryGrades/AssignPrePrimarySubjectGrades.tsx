import { QuestionMark } from "@mui/icons-material"
import { Box, IconButton, Stack, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { IGetXseedStudentsInfoBody } from "src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades"
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown"
import { CDAXseedStudentsdata } from "src/requests/AssignPrePrimaryGrades/ReqAssignPrePrimaryGrades"
import { RootState } from "src/store"
import CommonPageHeader from "../CommonPageHeader"

const AssignPrePrimarySubjectGrades = () => {
    const dispatch = useDispatch();
    const XseedStudentsList: any = useSelector(
        (state: RootState) =>
            state.AssignPrePrimaryGrades.ISXseedStudentsList
    );
    const XseedSubjectSectionList: any = useSelector(
        (state: RootState) =>
            state.AssignPrePrimaryGrades.ISXseedSubjectSectionList
    );

    const { EditStatusId, ClassName, Assesment, SubjectName, SubjectId, SelectTerm, StandardDivisionId, selectTeacher } = useParams();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

    // useState()
    const [student, setStudent] = useState('0')
    const [subjectSection, setSubjectSection] = useState('0')
    useEffect(() => {
        const XseedDataBody: IGetXseedStudentsInfoBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId),
            asStandardDivisionId: Number(StandardDivisionId),
            asAssessmentId: Number(SelectTerm),
            asSubjectId: Number(SubjectId)
        }
        dispatch(CDAXseedStudentsdata(XseedDataBody))
    }, [])

    function clickSubSection(value) {
        setSubjectSection(value)
    }
    function clickStudent(value) {
        setSubjectSection(value)
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
                            fullWidth
                            label={'Class'}
                            value={ClassName}
                            sx={{ bgcolor: '#F0F0F0' }}
                            disabled
                            size="small"
                            inputProps={{ style: { fontWeight: 'bold', color: 'rgb(0, 0, 0)' } }}
                        />
                        <TextField
                            fullWidth
                            label={'Assessment'}
                            value={Assesment}
                            sx={{ bgcolor: '#F0F0F0' }}
                            disabled
                            size="small"
                            inputProps={{ style: { fontWeight: 'bold', color: 'rgb(0, 0, 0)' } }}
                        />
                        <TextField
                            fullWidth
                            label={'Subject Name'}
                            value={SubjectName}
                            sx={{ bgcolor: '#F0F0F0' }}
                            disabled
                            size="small"
                            inputProps={{ style: { fontWeight: 'bold', color: 'rgb(0, 0, 0)' } }}
                        />

                        <Box>
                            <Tooltip title={`Assign grades to each student in the class for the selected subject section and click on 'Save'.
                                Once grades are submitted to class-teacher you can modify it from xseed result.`}>
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
            {EditStatusId === '3' &&
                <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                    <b>Student grades are already submitted.</b>
                </Typography>}

            <Stack direction='row' spacing={2}>
                <SearchableDropdown
                    ItemList={XseedStudentsList}
                    defaultValue={student}
                    label={'Student '}
                    sx={{ minWidth: '20vw' }}
                    size={"small"}
                    onChange={(value) => { setStudent(value) }}
                    mandatory
                />

                <SearchableDropdown
                    ItemList={XseedSubjectSectionList}
                    defaultValue={subjectSection}
                    label={'Subject Section'}
                    sx={{ minWidth: '20vw' }}
                    size={"small"}
                    onChange={(value) => { clickSubSection(value) }}
                    mandatory
                />
            </Stack>

            <Box sx={{ background: 'white', p: 2, mt: 2 }}>
                <TableContainer component={Box} >
                    <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                        <TableHead >
                            <TableRow>

                                <TableCell align={'center'} sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', textAlign: 'center', pt: '10px', pb: '10px' }}>
                                    <b>Learning Outcome</b>
                                </TableCell>
                                <TableCell align={'right'} sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', textAlign: 'right', pt: '10px', pb: '10px' }}>

                                </TableCell>

                                <TableCell align={'right'} sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', textAlign: 'right', pt: '10px', pb: '10px' }}>
                                    <b>Grade</b>
                                </TableCell>
                                <TableCell align={'left'} sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', textAlign: 'left', pt: '10px', pb: '10px' }}>
                                    <SearchableDropdown
                                        ItemList={XseedSubjectSectionList}
                                        defaultValue={subjectSection}
                                        label={''}
                                        sx={{ maxWidth: '20vw', backgroundColor: 'white' }}
                                        size={"small"}
                                        mandatory
                                    />
                                </TableCell>

                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Box>

        </Box>


    )
}


export default AssignPrePrimarySubjectGrades;
