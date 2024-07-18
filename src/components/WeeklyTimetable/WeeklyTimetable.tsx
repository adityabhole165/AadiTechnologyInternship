import QuestionMark from "@mui/icons-material/QuestionMark"
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Save from "@mui/icons-material/Save"
import Settings from "@mui/icons-material/Settings"
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, FormGroup, IconButton, MenuItem, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography, alpha, styled } from "@mui/material"
import { green, grey, red } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IGetTeacherAndStandardForTimeTableBody } from "src/interfaces/WeeklyTimeTable/IWeeklyTimetable"
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown"
import { CDAGetTeachersList } from "src/requests/WeeklyTimeTable/RequestWeeklyTimeTable"
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
    const [teacher, setTeacher] = useState<string>('');
    const TeachersList = useSelector((state: RootState) => state.WeeklyTimetable.ISTeachersList);

    useEffect(() => {
        const CDAGetTeachersListBody: IGetTeacherAndStandardForTimeTableBody = {
            asSchoolId: Number(localStorage.getItem('SchoolId')),
            asAcadmicYearId: Number(sessionStorage.getItem('AcademicYearId')),
            asTeacher_id: 0
        }
        dispatch(CDAGetTeachersList(CDAGetTeachersListBody))
    }, [])

    const handleTeacherSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTeacherSettingsAnchorEL(event.currentTarget);
    };

    const handleTeacherSettingsClose = () => {
        setTeacherSettingsAnchorEL(null);
    };

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
                            <Tooltip title={'Reset'}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: grey[500],
                                        '&:hover': {
                                            backgroundColor: red[600]
                                        }
                                    }}
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
                        </>
                    }
                />
                <Box sx={{ p: 2, background: 'white' }}>
                    <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={'space-between'}>
                        <Typography variant={"h4"}>Weekly Timetable for Mr. Devendra Kumar</Typography>
                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                            <Box>
                                <TextField
                                    label={"Filter By"}
                                    size={"small"}
                                    select
                                    value={filterBy}
                                    onChange={(e) => setFilterBy(e.target.value)}
                                >
                                    <MenuItem value={"Teacher"}>Teacher</MenuItem>
                                    <MenuItem value={"Class"}>Class Info</MenuItem>
                                </TextField>
                            </Box>
                            {filterBy === 'Teacher' && (
                                <>
                                    <Box>
                                        <SearchableDropdown
                                            onChange={(value) => { setTeacher(value) }}
                                            ItemList={TeachersList}
                                            defaultValue={teacher}
                                            label="Teacher"
                                            sx={{ minWidth: 250 }}
                                            size={"small"}
                                        />
                                    </Box>
                                    <Box>
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
                                        <SearchableDropdown
                                            onChange={(value) => { }}
                                            ItemList={[]}
                                            label="Standard"
                                            sx={{ minWidth: 150 }}
                                            size={"small"}
                                        />
                                    </Box>
                                    <Box>
                                        <SearchableDropdown
                                            onChange={(value) => { }}
                                            ItemList={[]}
                                            label="Division"
                                            sx={{ minWidth: 150 }}
                                            size={"small"}
                                        />
                                    </Box>
                                </>
                            )}
                            <Box>
                                <Button variant={"contained"}>
                                    Change Input
                                </Button>
                            </Box>
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
                        <Box sx={{ flex: 1 }}>
                            <Typography variant={"h4"} mt={1} mb={1.5}>Class-Subject Lecture Count</Typography>
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
                                        <TableRow>
                                            <StyledCell>6-A Library	</StyledCell>
                                            <StyledCell>2</StyledCell>
                                        </TableRow>
                                        {/* Fixed Footer */}
                                        <TableRow>
                                            <FooterStyledCell>Total Weekly Lectures	</FooterStyledCell>
                                            <FooterStyledCell>0</FooterStyledCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant={"h4"} mb={1} sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                                Additional Lectures
                                <Button
                                    variant={"contained"}
                                    onClick={() => setShowAddAdditionalLectures(true)}
                                >
                                    Add Additional Lectures
                                </Button>
                            </Typography>
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
                                        <TableRow>
                                            <StyledCell>6-A Library	</StyledCell>
                                            <StyledCell>2</StyledCell>
                                        </TableRow>
                                        {/* Fixed Footer */}
                                        <TableRow>
                                            <FooterStyledCell>Total Weekly Lectures	</FooterStyledCell>
                                            <FooterStyledCell>0</FooterStyledCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
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
                        <Typography variant={"h4"}>Assign Additional Lectures to Teacher</Typography>
                        <Stack gap={2} mt={2}>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown
                                    onChange={(value) => { }}
                                    ItemList={[]}
                                    label="Teacher"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown
                                    onChange={(value) => { }}
                                    ItemList={[]}
                                    label="Week Day"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown
                                    onChange={(value) => { }}
                                    ItemList={[]}
                                    label="Lecture Name"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown
                                    onChange={(value) => { }}
                                    ItemList={[]}
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