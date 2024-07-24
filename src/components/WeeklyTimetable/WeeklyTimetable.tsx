import AddIcon from '@mui/icons-material/Add'
import QuestionMark from "@mui/icons-material/QuestionMark"
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Save from "@mui/icons-material/Save"
import Settings from "@mui/icons-material/Settings"
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, FormGroup, IconButton, MenuItem, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography, alpha, styled } from "@mui/material"
import { green, grey, red } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify'
import { IGetDataForAdditionalClassesBody, IGetLectureCountsForTeachersBody } from "src/interfaces/Teacher/ITeacherTimeTable"
import { IGetDivisionForStdDropdownBody, IGetResetTimetableBody, IGetTeacherAndStandardForTimeTableBody } from "src/interfaces/WeeklyTimeTable/IWeeklyTimetable"
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown"
import SearchableDropdown1 from "src/libraries/ResuableComponents/SearchableDropdown1"
import { GetDataForAdditionalClasses, GetLectureCountsForTeachers } from "src/requests/Teacher/TMtimetable"
import { CDAGetDataForAdditionalClasses, CDAGetDivisionName, CDAGetResetTimetableMsgClear, CDAGetStandardNameList, CDAGetTeachersList, CDAResetTimetable } from "src/requests/WeeklyTimeTable/RequestWeeklyTimeTable"
import { RootState } from "src/store"
import CommonPageHeader from "../CommonPageHeader"

type Props = {}

const HeaderStyledCell = styled(TableCell)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    border: '1px solid rgba(224, 224, 224, 1)',
}))

const FooterStyledCell = styled(TableCell)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: alpha(theme.palette.primary.main, 0.4),
    fontWeight: 'bold',
    border: '1px solid rgba(224, 224, 224, 1)',
}))

const StyledCell = styled(TableCell)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    border: '1px solid rgba(224, 224, 224, 1)',
}))

const WeeklyTimetable = (props: Props) => {
    const dispatch = useDispatch();
    const [teacherSettingsAnchorEL, setTeacherSettingsAnchorEL] = useState<HTMLButtonElement | null>(null);
    const [filterBy, setFilterBy] = useState<string>('Teacher')
    const [showAddAdditionalLectures, setShowAddAdditionalLectures] = useState<boolean>(false);
    const [teacher, setTeacher] = useState<string>('0');
    const TeachersList = useSelector((state: RootState) => state.WeeklyTimetable.ISTeachersList);
    const [teacherName, setTeacherName] = useState<string>('');
    const [standard, setStandard] = useState<string>('0');
    const [division, setDivision] = useState<string>('0');
    const [standardName, setStandardName] = useState('');
    const [divisionName, setDivisionName] = useState('')

    const LectureCountsForTeachers = useSelector((state: RootState) => state.TMTimetable.ISGetLectureCountsForTeachers);
    const AdditionalClasses = useSelector((state: RootState) => state.TMTimetable.ISGetDataForAdditionalClasses);
    const AddLecWeekDays = useSelector((state: RootState) => state.WeeklyTimetable.ISAddClassesWeekDay);
    const AddLecLectureNumber = useSelector((state: RootState) => state.WeeklyTimetable.ISAddClassesLectureNumber);
    const AddLecSubjectName = useSelector((state: RootState) => state.WeeklyTimetable.ISAddClassesSubjectName);
    const ResetTimetableMsg = useSelector((state: RootState) => state.WeeklyTimetable.ISResetTimetableMsg);
    const StandardNameList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetStandardName);
    const DivisionNameList = useSelector((state: RootState) => state.WeeklyTimetable.ISGetDivisionName);


    useEffect(() => {
        const CDAGetTeachersListBody: IGetTeacherAndStandardForTimeTableBody = {
            asSchoolId: Number(localStorage.getItem('SchoolId')),
            asAcadmicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asTeacher_id: 0
        }

        dispatch(CDAGetTeachersList(CDAGetTeachersListBody))
        dispatch(CDAGetStandardNameList(CDAGetTeachersListBody))
    }, [])

    useEffect(() => {

        const DivisionDropdownBody: IGetDivisionForStdDropdownBody = {
            asSchoolId: Number(localStorage.getItem('SchoolId')),
            asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asStandardId: Number(standard)
        }

        if (standard !== '0') {
            dispatch(CDAGetDivisionName(DivisionDropdownBody))
            console.log(`standard was not 0`, standard, DivisionDropdownBody)
        }
    }, [standard])



    useEffect(() => {
        if (ResetTimetableMsg !== '') {
            toast.success(ResetTimetableMsg)
        }
        dispatch(CDAGetResetTimetableMsgClear())
    }, [ResetTimetableMsg])

    useEffect(() => {
        const GetLectureCountsForTeachersBody: IGetLectureCountsForTeachersBody = {
            asSchoolId: Number(localStorage.getItem('localSchoolId')),
            asTeacher_Id: Number(teacher),
            asConsiderAssembly: "Y",
            asConsiderMPT: "Y",
            asConsiderStayback: "Y",
            asConsiderWeeklyTest: "Y"
        }
        console.log("teacher count ", LectureCountsForTeachers)
        if (teacher !== '0') {
            dispatch(GetLectureCountsForTeachers(GetLectureCountsForTeachersBody))
        }
    }, [teacher])

    useEffect(() => {
        const AdditionalLectureBody: IGetDataForAdditionalClassesBody = {
            asSchoolId: Number(localStorage.getItem('localSchoolId')),
            asAcademicYearID: Number(sessionStorage.getItem('AcademicYearId')),
            asTeacher_Id: filterBy === 'Teacher' ? Number(teacher) : 0,
            asStandardDivision_Id: filterBy === 'Teacher' ? 0 : Number(standard)
        }
        if (teacher !== '0') {
            dispatch(GetDataForAdditionalClasses(AdditionalLectureBody))
        }
        if (standard !== '0' && division !== '0') {
            dispatch(GetDataForAdditionalClasses(AdditionalLectureBody))
        }
    }, [teacher, standard, division])

    const ClickAdditionalLecture = () => {
        setShowAddAdditionalLectures(true);
        const AdditionalLecturesBody: IGetDataForAdditionalClassesBody = {
            asSchoolId: Number(localStorage.getItem('localSchoolId')),
            asAcademicYearID: Number(sessionStorage.getItem('AcademicYearId')),
            asTeacher_Id: Number(teacher),
            asStandardDivision_Id: 0
        }
        dispatch(CDAGetDataForAdditionalClasses(AdditionalLecturesBody));
    }

    const handleTeacherSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTeacherSettingsAnchorEL(event.currentTarget);
    };

    const handleTeacherSettingsClose = () => {
        setTeacherSettingsAnchorEL(null);
    };

    const resetTimetable = () => {
        const ResetWeeklyTimetableBody: IGetResetTimetableBody = {
            asSchoolId: Number(localStorage.getItem('localSchoolId')),
            asAcadmicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asTeacher_id: filterBy === 'Teacher' ? Number(teacher) : 0,
            asStandardDivision_Id: filterBy === 'Teacher' ? 0 : Number(standard)
        }
        dispatch(CDAResetTimetable(ResetWeeklyTimetableBody));
    }

    const open = Boolean(teacherSettingsAnchorEL);
    const id = open ? 'teacher-settings-popover' : undefined;

    return (
        <>
            <Box sx={{ mb: 5, mx: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        { title: 'Weekly Timetable', path: '/extended-sidebar/Teacher/WeeklyTimetable' },
                    ]}
                    rightActions={
                        <>
                            <Tooltip title={'Define timetable for the selected teacher/class.'}>
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
                            {filterBy === 'Teacher' && teacher !== '0' && <>
                                <Tooltip title={'Reset'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: grey[500],
                                            '&:hover': {
                                                backgroundColor: red[600]
                                            }
                                        }}
                                        onClick={resetTimetable}
                                    >
                                        <RestartAltIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={'Save'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                    >
                                        <Save />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={'Additional Lectures'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                        onClick={ClickAdditionalLecture}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </>}
                            {filterBy === 'Class' && standard !== '0' && division !== '0' && <>
                                <Tooltip title={'Reset'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: grey[500],
                                            '&:hover': {
                                                backgroundColor: red[600]
                                            }
                                        }}
                                        onClick={resetTimetable}
                                    >
                                        <RestartAltIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={'Save'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                    >
                                        <Save />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={'Optional Subject Lectures'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                        onClick={ClickAdditionalLecture}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </>}
                        </>
                    }
                />
                <Box sx={{ p: 2, background: 'white' }}>
                    <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={'space-between'}>
                        {filterBy === 'Teacher' ? <Typography variant={"h4"}>Weekly Timetable for {teacher !== '0' ? teacherName : 'Teacher/Class Name'}</Typography> :
                            <Typography variant={"h4"}>Weekly Timetable for {standard !== '0' && division !== '0' ? `Class ${standardName} - ${divisionName}` : 'Teacher/Class Name'}</Typography>}
                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                            <Box>
                                <TextField
                                    label={"Filter By"}
                                    size={"small"}
                                    select
                                    value={filterBy}
                                    onChange={(e) => {
                                        setFilterBy(e.target.value)
                                        if (filterBy === 'Teacher') {
                                            setTeacher('0')
                                        } else if (filterBy === 'Class') {
                                            setDivision('0')
                                            setStandard('0')
                                        }
                                    }}
                                >
                                    <MenuItem value={"Teacher"}>Teacher</MenuItem>
                                    <MenuItem value={"Class"}>Class Info</MenuItem>
                                </TextField>
                            </Box>
                            {filterBy === 'Teacher' && (
                                <>
                                    <Box>
                                        <SearchableDropdown1
                                            onChange={(value) => {
                                                setTeacher(value.Value)
                                                setTeacherName(value.Name)
                                            }}
                                            ItemList={TeachersList}
                                            defaultValue={teacher}
                                            label="Teacher"
                                            sx={{ minWidth: 250 }}
                                            size={"small"}
                                        />
                                    </Box>
                                    <Box>
                                        {teacher !== '0' &&
                                            <Tooltip title={'Teacher Settings'}>
                                                <IconButton
                                                    onClick={handleTeacherSettingsClick}
                                                    sx={{
                                                        color: 'white',
                                                        backgroundColor: grey[500],
                                                        '&:hover': {
                                                            backgroundColor: grey[600]
                                                        }
                                                    }}
                                                >
                                                    <Settings />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={teacherSettingsAnchorEL}
                                            onClose={handleTeacherSettingsClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <Box sx={{ p: 2 }}>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox />} label="Is Assembly Applicable?" />
                                                    <FormControlLabel control={<Checkbox />} label="Is M.P.T. Applicable?" />
                                                    <FormControlLabel control={<Checkbox />} label="Is StayBack Applicable?" />
                                                    <FormControlLabel control={<Checkbox />} label="Is Weekly Test Applicable?" />
                                                </FormGroup>
                                            </Box>
                                        </Popover>
                                    </Box>
                                </>
                            )}
                            {filterBy === 'Class' && (
                                <>
                                    <Box>
                                        <SearchableDropdown1
                                            onChange={(value) => {
                                                setStandard(value.Value)
                                                setDivision('0')
                                                setStandardName(value.Name)
                                            }}
                                            ItemList={StandardNameList}
                                            label="Standard"
                                            defaultValue={standard}
                                            sx={{ minWidth: 150 }}
                                            size={"small"}
                                        />
                                    </Box>
                                    <Box>
                                        <SearchableDropdown1
                                            onChange={(value) => {
                                                setDivision(value.Value)
                                                setDivisionName(value.Name)
                                            }}
                                            ItemList={standard !== '0' ? DivisionNameList : []}
                                            label="Division"
                                            defaultValue={division}
                                            sx={{ minWidth: 150 }}
                                            size={"small"}
                                        />
                                    </Box>
                                </>
                            )}
                            {/* <Box>
                                <Button variant={"contained"}>
                                    Change Input
                                </Button>
                            </Box> */}
                        </Stack>
                    </Stack>
                    <Box sx={{ mt: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <HeaderStyledCell>{`Weekdays >>`}</HeaderStyledCell>
                                        <HeaderStyledCell>Monday</HeaderStyledCell>
                                        <HeaderStyledCell>Tuesday</HeaderStyledCell>
                                        <HeaderStyledCell>Wednesday</HeaderStyledCell>
                                        <HeaderStyledCell>Thursday</HeaderStyledCell>
                                        <HeaderStyledCell>Friday</HeaderStyledCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* Loopable content */}
                                    <TableRow>
                                        <StyledCell>1</StyledCell>
                                        <StyledCell>
                                            <SearchableDropdown
                                                onChange={(value) => { }}
                                                ItemList={[]}
                                                label="Select"
                                                sx={{ minWidth: 200 }}
                                                size={"small"}
                                            />
                                        </StyledCell>
                                        <StyledCell>
                                            <SearchableDropdown
                                                onChange={(value) => { }}
                                                ItemList={[]}
                                                label="Select"
                                                sx={{ minWidth: 200 }}
                                                size={"small"}
                                            />
                                        </StyledCell>
                                        <StyledCell>
                                            <SearchableDropdown
                                                onChange={(value) => { }}
                                                ItemList={[]}
                                                label="Select"
                                                sx={{ minWidth: 200 }}
                                                size={"small"}
                                            />
                                        </StyledCell>
                                        <StyledCell>
                                            <SearchableDropdown
                                                onChange={(value) => { }}
                                                ItemList={[]}
                                                label="Select"
                                                sx={{ minWidth: 200 }}
                                                size={"small"}
                                            />
                                        </StyledCell>
                                        <StyledCell>
                                            <SearchableDropdown
                                                onChange={(value) => { }}
                                                ItemList={[]}
                                                label="Select"
                                                sx={{ minWidth: 200 }}
                                                size={"small"}
                                            />
                                        </StyledCell>
                                    </TableRow>
                                    {/* Fixed Footer */}
                                    <TableRow>
                                        <FooterStyledCell>Total Lectures</FooterStyledCell>
                                        <FooterStyledCell>0</FooterStyledCell>
                                        <FooterStyledCell>0</FooterStyledCell>
                                        <FooterStyledCell>0</FooterStyledCell>
                                        <FooterStyledCell>0</FooterStyledCell>
                                        <FooterStyledCell>0</FooterStyledCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction={"row"} gap={2}>
                        {filterBy === 'Class' &&
                            <>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5, fontWeight: 'bold' }}>
                                        Additional / Optional Subject Lectures
                                    </Typography>
                                    {AdditionalClasses.length === 0 && standard !== '0' && division !== '0' &&

                                        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 5, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                            <b>No additional lectures assigned.</b>
                                        </Typography>
                                    }
                                    {AdditionalClasses.length > 0 &&
                                        <TableContainer sx={{ width: '100%' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <HeaderStyledCell>WeekDay</HeaderStyledCell>
                                                        <HeaderStyledCell>Lecture Number</HeaderStyledCell>
                                                        <HeaderStyledCell>Class</HeaderStyledCell>
                                                        <HeaderStyledCell>Subject </HeaderStyledCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {/* Loopable content */}
                                                    {AdditionalClasses.map((item, i) => (
                                                        <TableRow>
                                                            <StyledCell>{item.Text1}</StyledCell>
                                                            <StyledCell>{item.Text2}</StyledCell>
                                                            <StyledCell>{item.Text3}</StyledCell>
                                                            <StyledCell>{item.Text4}</StyledCell>
                                                        </TableRow>
                                                    ))}

                                                    {/* Fixed Footer */}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    }

                                </Box>
                            </>}
                        {filterBy === 'Teacher' &&
                            <Box sx={{ flex: 1 }}>
                                {/* <Typography variant={"h4"} mt={1} mb={1.5}>Class-Subject Lecture Count</Typography> */}
                                <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5, fontWeight: 'bold' }}>Class-Subject Lecture Count</Typography>

                                {teacher !== '0' &&
                                    <TableContainer sx={{ width: '100%' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <HeaderStyledCell>Class Subjects</HeaderStyledCell>
                                                    <HeaderStyledCell>Lecture Count</HeaderStyledCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* Loopable content */}
                                                {LectureCountsForTeachers?.map((item, i) => (
                                                    item.Text2 === 'Total Weekly Lectures' ?
                                                        <TableRow>
                                                            <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text2 }} />
                                                            <FooterStyledCell dangerouslySetInnerHTML={{ __html: item.Text3 }} />
                                                        </TableRow>
                                                        :
                                                        <TableRow>
                                                            <StyledCell>{item.Text2}</StyledCell>
                                                            <StyledCell>{item.Text3}</StyledCell>
                                                        </TableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>}
                            </Box>
                        }
                        {filterBy === 'Teacher' &&
                            <Box sx={{ flex: 1 }}>
                                {/* <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5 }}>Class-Subject Lecture Count</Typography> */}

                                <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', marginBottom: 0.5, fontWeight: 'bold' }}>
                                    Additional Lectures

                                </Typography>
                                {AdditionalClasses.length === 0 && teacher !== '0' &&

                                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 10, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                                        <b>No additional lectures assigned.</b>
                                    </Typography>
                                }
                                {AdditionalClasses.length > 0 &&
                                    <TableContainer sx={{ width: '100%' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <HeaderStyledCell>WeekDay</HeaderStyledCell>
                                                    <HeaderStyledCell>Lecture Number</HeaderStyledCell>
                                                    <HeaderStyledCell>Class</HeaderStyledCell>
                                                    <HeaderStyledCell>Subject </HeaderStyledCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* Loopable content */}
                                                {AdditionalClasses.map((item, i) => (
                                                    <TableRow>
                                                        <StyledCell>{item.Text1}</StyledCell>
                                                        <StyledCell>{item.Text2}</StyledCell>
                                                        <StyledCell>{item.Text3}</StyledCell>
                                                        <StyledCell>{item.Text4}</StyledCell>
                                                    </TableRow>
                                                ))}

                                                {/* Fixed Footer */}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }

                            </Box>
                        }
                    </Stack>
                </Box>
            </Box>
            {/* Add additional lectures */}
            <Dialog
                open={showAddAdditionalLectures}
                onClose={() => setShowAddAdditionalLectures(false)}
                maxWidth={'xs'}
                fullWidth
            >
                <DialogTitle
                    sx={{
                        py: 1,
                        backgroundColor: (theme) => theme.colors.primary.main,
                        color: (theme) => theme.palette.common.white
                    }}
                ></DialogTitle>
                <DialogContent dividers>
                    <Box>
                        <Typography variant={"h4"}>{filterBy === 'Teacher' ? `Assign Additional Lectures to Teacher` :
                            `Assign Optional Subject Lectures to Class`}</Typography>
                        <Stack gap={2} mt={2}>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown
                                    onChange={(value) => { }}
                                    ItemList={filterBy === 'Teacher' ? TeachersList : [{ Id: '0', Name: `${standardName} - ${divisionName}`, Value: '0' }]}
                                    defaultValue={filterBy === 'Teacher' ? teacher : "0"}
                                    label={filterBy === 'Teacher' ? 'Teacher' : 'Class'}
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                    disabled={true}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown
                                    onChange={(value) => { }}
                                    ItemList={AddLecWeekDays}
                                    label="Week Day"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown
                                    onChange={(value) => { }}
                                    ItemList={AddLecLectureNumber}
                                    label="Lecture Name"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown
                                    onChange={(value) => { }}
                                    ItemList={AddLecSubjectName}
                                    label="Class Subjects"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                />
                            </Box>
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ py: 2, px: 3 }}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            setShowAddAdditionalLectures(false)
                        }}
                        color={'error'}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={
                            () => { }
                        }
                        color={'primary'}
                        variant={'contained'}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default WeeklyTimetable