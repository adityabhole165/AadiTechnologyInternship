import Check from '@mui/icons-material/Check';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ExpandMore from '@mui/icons-material/ExpandMore';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography, alpha } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { IClassListBody } from 'src/interfaces/LessonPlan/IAddLessonPlan';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { GetAddOrEditLessonPlanDetails, classnamelist } from 'src/requests/LessonPlan/RequestAddLessonPlan';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

export const AddLessonPlan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [SelectClass, setSelectClass] = useState('');

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const TeacherId = Number(sessionStorage.getItem('TeacherId'));
    const TeacherName = sessionStorage.getItem('StudentName');
    const [exampleLessonDetails, setExampleLessonDetails] = useState([
        {
            lessonName: '6-C ( Marathi III )',
            subject: 'Marathi',
            planDetails: [
                {
                    label: "Topic / Sub topic",
                    value: ""
                },
                {
                    label: "Resources & References",
                    value: ""
                },
                {
                    label: "Instructional Objective and Learning Outcome",
                    value: ""
                },
                {
                    label: "Description of activities to be used to conduct the class",
                    value: "",
                    subPlanDetails: [
                        {
                            label: "Continuity of learning experience.",
                            value: ""
                        },
                        {
                            label: "Life Skills / Value based question.",
                            value: ""
                        },
                        {
                            label: "Multiple Intelligence / Subject Integration.",
                            value: ""
                        }
                    ]
                },
                {
                    label: "Homework Assigned",
                    value: ""
                }
            ],
        },
        {
            lessonName: '6-C ( Marathi III )',
            subject: 'Marathi',
            planDetails: [
                {
                    label: "Topic / Sub topic",
                    value: ""
                },
                {
                    label: "Resources & References",
                    value: ""
                },
                {
                    label: "Instructional Objective and Learning Outcome",
                    value: ""
                },
                {
                    label: "Description of activities to be used to conduct the class",
                    value: "",
                    subPlanDetails: [
                        {
                            label: "Continuity of learning experience.",
                            value: ""
                        },
                        {
                            label: "Life Skills / Value based question.",
                            value: ""
                        },
                        {
                            label: "Multiple Intelligence / Subject Integration.",
                            value: ""
                        }
                    ]
                },
                {
                    label: "Homework Assigned",
                    value: ""
                }
            ],
        }
    ]);

    const ClassListDropdown = useSelector(
        (state: RootState) => state.addlessonplan.ClassName
    );
    console.log('ClassListDropdown', ClassListDropdown);

    const AddOrEditLessonPlanDetails = useSelector((state: RootState) => state.addlessonplan.AddOrEditLessonPlanDetails);
    console.log("AddOrEditLessonPlanDetails", AddOrEditLessonPlanDetails);

    const SaveLessonPlan = useSelector((state: RootState) => state.addlessonplan.saveLessonPlanmsg);
    console.log("SaveLessonPlan", SaveLessonPlan);


    useEffect(() => {
        const ClassListBody: IClassListBody = {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            aTeacherId: TeacherId
        };
        dispatch(classnamelist(ClassListBody));
    }, [TeacherId]);

    useEffect(() => {
        dispatch(GetAddOrEditLessonPlanDetails);
    }, []);

    useEffect(() => {
        if (SaveLessonPlan !== '') {
            toast.success(SaveLessonPlan);
            dispatch(SaveLessonPlan); // Remove the parentheses after SaveLessonPlan
        }
    }, [SaveLessonPlan]);

    const onClickClass = (value) => {
        setSelectClass(value);
    };

    const onSelectStartDate = (value) => {
        setStartDate(value);
    };
    const onSelectEndDate = (value) => {
        setEndDate(value);
    };

    const onClickBack = () => {
        navigate('/RITeSchool/Teacher/LessonPlanBaseScreen');
    };

    return (
        <Box sx={{ px: 2 }} maxWidth="xl">
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Lesson Plans',
                        path: '/RITeSchool/Teacher/LessonPlanBaseScreen'
                    },
                    {
                        title: 'Lesson Plan Details',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <Box>
                            <Tooltip title={'Save/ Submit/ Approve lesson plan details.'}>
                                <IconButton
                                    sx={{
                                        backgroundColor: grey[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: grey[600]
                                        }
                                    }}
                                >
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'Submit'}>
                                <IconButton
                                    sx={{
                                        backgroundColor: blue[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: blue[600]
                                        }
                                    }}
                                >
                                    <Check />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'Save'}>
                                <IconButton
                                    sx={{
                                        backgroundColor: green[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: green[600]
                                        }
                                    }}
                                >
                                    <Save />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>
                }
            />
            <Box sx={{ p: 2, background: 'white' }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            label={<>
                                Teacher <span style={{ color: 'red' }}>*</span>
                            </>}
                            value={TeacherName} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            type='date'
                            label={'Start Date'}
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{
                                max: new Date().toISOString().split('T')[0]
                            }}
                            value={StartDate}
                            onChange={(e) => onSelectStartDate(e.target.value)} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            type='date'
                            label={'End Date'}
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{
                                max: new Date().toISOString().split('T')[0]
                            }}
                            value={EndDate}
                            onChange={(e) => onSelectEndDate(e.target.value)} />
                    </Grid>
                    <Grid item xs={3}>
                        <SearchableDropdown
                            ItemList={ClassListDropdown}
                            defaultValue={SelectClass}
                            label='Class'
                            mandatory
                            sx={{ width: '100%' }}
                            onChange={(e) => onClickClass(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            {/* <Button variant={"contained"} color={"success"}>
              Save
            </Button>
            <Button variant={"outlined"} color={"primary"} disabled>
              Submit
            </Button> */}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h5"} mb={1}>
                            Plan Details
                        </Typography>
                        {exampleLessonDetails.map((lesson, index) => (
                            <Accordion
                                // defaultExpanded
                                key={index}
                                sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}
                            >
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography variant={"h4"}>
                                        {index + 1}) {lesson.lessonName}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 0 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell width={10}></TableCell>
                                                <TableCell>
                                                    {lesson.lessonName}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width={10} sx={{ py: 1, background: (theme) => alpha(theme.palette.primary.main, 0.2) }}>Sr.No.</TableCell>
                                                <TableCell sx={{ py: 1, background: (theme) => alpha(theme.palette.primary.main, 0.2) }}>
                                                    Parameter
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {lesson.planDetails.map((plan, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ p: 1, verticalAlign: 'top' }}>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell sx={{ p: 1 }}>
                                                        <TextField
                                                            label={plan.label}
                                                            value={plan.value}
                                                            fullWidth
                                                            multiline
                                                            rows={4} />
                                                        {plan.subPlanDetails && plan.subPlanDetails.length > 0 && plan.subPlanDetails.map((subPlan, subIndex) => (
                                                            <Table key={subIndex}>
                                                                <TableRow>
                                                                    <TableCell width={20} sx={{ py: 1, verticalAlign: 'top' }}>
                                                                        {index + 1}.{subIndex + 1}
                                                                    </TableCell>
                                                                    <TableCell sx={{ p: 1 }}>
                                                                        <TextField
                                                                            label={subPlan.label}
                                                                            value={subPlan.value}
                                                                            fullWidth
                                                                            multiline
                                                                            rows={4} />
                                                                    </TableCell>
                                                                </TableRow>
                                                            </Table>
                                                        ))}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Box display={"flex"} justifyContent={"flex-end"} width={"100%"} p={2}>
                                        <Button variant={"outlined"} startIcon={<ContentCopy />}>
                                            Copy to other class
                                        </Button>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h5"} mb={1}>
                            Activity
                        </Typography>
                        <Grid container>
                            <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                                <Typography color={"primary"} fontWeight={"bold"}>
                                    Name:
                                </Typography>
                            </Grid>
                            <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                                <Typography color={"primary"}>
                                    Ms. Manjiri S. Phadke
                                </Typography>
                            </Grid>
                            <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                                <Typography color={"primary"} fontWeight={"bold"}>
                                    Submitted On:
                                </Typography>
                            </Grid>
                            <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                                <Typography color={"primary"}>
                                    Ms. Manjiri S. Phadke
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                                <Typography color={"primary"} fontWeight={"bold"}>
                                    Name:
                                </Typography>
                            </Grid>
                            <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                                <Typography color={"primary"}>
                                    Ms. Manjiri S. Phadke
                                </Typography>
                            </Grid>
                            <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                                <Typography color={"primary"} fontWeight={"bold"}>
                                    Approved On:
                                </Typography>
                            </Grid>
                            <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                                <Typography color={"primary"}>
                                    Ms. Manjiri S. Phadke
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                                <Typography color={"primary"} fontWeight={"bold"}>
                                    Name:
                                </Typography>
                            </Grid>
                            <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                                <Typography color={"primary"}>
                                    Ms. Manjiri S. Phadke
                                </Typography>
                            </Grid>
                            <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                                <Typography color={"primary"} fontWeight={"bold"}>
                                    Approved On:
                                </Typography>
                            </Grid>
                            <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                                <Typography color={"primary"}>
                                    Ms. Manjiri S. Phadke
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            {/* <Button variant={"contained"} color={"success"}>
              Save
            </Button>
            <Button variant={"outlined"} color={"primary"} disabled>
              Submit
            </Button> */}
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <PageHeader heading="Lesson Plan Details" />
              <br></br>
              <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={1}>
                  <Typography>
                    <b>Teacher :</b>
                  </Typography>
                </Grid>
      
                <Grid item xs={2}>
                  <TextField value={TeacherName} />
                </Grid>
              </Grid>
      
              <br></br>
      
              <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={1}>
                  <Typography>
                    <b>Start Date:</b>
                  </Typography>
                </Grid>
      
                <Grid item xs={2}>
                  <TextField
                    type="date"
                    value={StartDate}
                    onChange={(e) => {
                      onSelectStartDate(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <br></br>
              <br></br>
      
              <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={1}>
                  <Typography>
                    <b>End Date:</b>
                  </Typography>
                </Grid>
      
                <Grid item xs={2}>
                  <TextField
                    type="date"
                    value={EndDate}
                    onChange={(e) => {
                      onSelectEndDate(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <br></br>
              <br></br>
      
              <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={1}>
                  <Typography>
                    <b>Class:</b>
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <DropDown
                    width={"300px"}
                    itemList={ClassListDropdown}
                    ClickItem={onClickClass}
                    DefaultValue={SelectClass}
                    Label={'Select'}
                  />
                  <br></br>
                </Grid>
              </Grid>
      
              <br></br>
      
              <Stack spacing={3} direction="row">
                <DotLegend text="Submitted On" color="secondary" />
                <br></br>
                <DotLegend text="Approved Plan" color="info" />
                <br></br>
              </Stack>
              <br></br>
              <div>
                <Grid
                  container
                  spacing={2}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Grid item xs={6}>
                    <ButtonPrimary variant="contained">
                      <b>SAVE</b>
                    </ButtonPrimary>
                  </Grid>
      
                  <Grid item xs={6}>
                    <ButtonPrimary
                      variant="contained"
                      style={{ backgroundColor: '#4da0f7', color: 'white' }}
                    >
                      SUBMIT
                    </ButtonPrimary>
                  </Grid>
                </Grid>
              </div>
              <br></br>
              <ButtonPrimary
                variant="contained"
                onClick={onClickBack}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                BACK
              </ButtonPrimary>
            </div> */}
        </Box>
    );
};
