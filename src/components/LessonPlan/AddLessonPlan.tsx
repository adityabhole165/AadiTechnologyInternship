import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Breadcrumbs, Container, Grid, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography, alpha, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { IClassListBody } from 'src/interfaces/LessonPlan/IAddLessonPlan';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { classnamelist } from 'src/requests/LessonPlan/RequestAddLessonPlan';
import { RootState } from 'src/store';

const HeaderStyledCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  border: '1px solid rgba(224, 224, 224, 1)',
}))

const StyledCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  border: '1px solid rgba(224, 224, 224, 1)',
}))

const AddLessonPlan = () => {
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
  const exampleLessonDetails = [
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
  ]

  const ClassListDropdown = useSelector(
    (state: RootState) => state.addlessonplan.ClassName
  );
  console.log('ClassListDropdown', ClassListDropdown);

  useEffect(() => {
    const ClassListBody: IClassListBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asTeacherId: TeacherId
    };
    dispatch(classnamelist(ClassListBody));
  }, [TeacherId]);

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
    navigate('/extended-sidebar/Teacher/LessonPlanBaseScreen');
  };

  return (
    <Container maxWidth="xl">
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          pt: 4,
          pb: 2
        }}
      >
        <Box>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<ChevronRightTwoTone />}
          >
            <Link
              to={'/extended-sidebar/landing/landing'}
              color="inherit"
              style={{ textDecoration: 'none' }}
            >
              <IconButton
                sx={{
                  background: (theme) => theme.palette.common.white,
                  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)'
                }}
              >
                <HomeTwoTone color="primary" />
              </IconButton>
            </Link>
            <Link
              to={'/extended-sidebar/Teacher/LessonPlanBaseScreen'}
              style={{ textDecoration: 'none' }}
            >
              <Typography
                variant={'h3'}
                fontSize={'23px'}
                fontWeight={'normal'}
                color={'text.primary'}
                sx={{
                  '&:hover': {
                    fontWeight: 'bold'
                  }
                }}
              >
                Lesson Plans
              </Typography>
            </Link>
            <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
              Lesson Plan Details
            </Typography>
          </Breadcrumbs>
        </Box>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
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
        </Stack>
      </Stack>
      <Box sx={{ p: 2, background: 'white' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label={<>
                Teacher <span style={{ color: 'red' }}>*</span>
              </>}
              value={TeacherName}
            />
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
              onChange={(e) => onSelectStartDate(e.target.value)}
            />
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
              onChange={(e) => onSelectEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <SearchableDropdown
              ItemList={ClassListDropdown}
              defaultValue='Select Class'
              label='Class'
              mandatory
              sx={{ width: '100%' }}
              onChange={(e) => setSelectClass(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {exampleLessonDetails.map((lesson, index) => (
              <Table key={index}>
                <TableHead>
                  <TableRow>
                    <HeaderStyledCell width={10}></HeaderStyledCell>
                    <HeaderStyledCell>
                      {lesson.lessonName}
                    </HeaderStyledCell>
                  </TableRow>
                  <TableRow>
                    <StyledCell width={10} sx={{ py: 1, background: (theme) => alpha(theme.palette.primary.main, 0.2) }}>Sr.No.</StyledCell>
                    <StyledCell sx={{ py: 1, background: (theme) => alpha(theme.palette.primary.main, 0.2) }}>
                      Parameter
                    </StyledCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lesson.planDetails.map((plan, index) => (
                    <TableRow key={index}>
                      <StyledCell sx={{ p: 1, verticalAlign: 'top' }}>
                        {index + 1}
                      </StyledCell>
                      <StyledCell sx={{ p: 1 }}>
                        <TextField
                          label={plan.label}
                          value={plan.value}
                          fullWidth
                          multiline
                          rows={4}
                        />
                        {plan.subPlanDetails && plan.subPlanDetails.length > 0 && plan.subPlanDetails.map((subPlan, subIndex) => (
                          <Table key={subIndex}>
                            <TableRow >
                              <StyledCell width={20} sx={{ py: 1, verticalAlign: 'top' }}>
                                {index + 1}.{subIndex + 1}
                              </StyledCell>
                              <StyledCell sx={{ p: 1 }}>
                                <TextField
                                  label={subPlan.label}
                                  value={subPlan.value}
                                  fullWidth
                                  multiline
                                  rows={4}
                                />
                              </StyledCell>
                            </TableRow>
                          </Table>
                        ))}
                      </StyledCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ))}
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
    </Container>
  );
};

export default AddLessonPlan;
