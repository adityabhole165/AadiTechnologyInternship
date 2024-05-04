import Download from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Grid, IconButton, Modal, Pagination, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  IAllPrimaryClassTeachersBody,
  IGetAllStudentswiseRemarkDetailsBody,
  IGetRemarksCategoryBody,
  IGetTestwiseTermBody,
  IStudentListDropDowntBody,
  IStudentswiseRemarkDetailsToExportBody,
  IUpdateAllStudentsRemarkDetailsBody
} from 'src/interfaces/ProgressRemarks/IProgressRemarks';
import ResizableCommentsBox from 'src/libraries/ResuableComponents/ResizableCommentsBox;';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import SubjectMarkList from 'src/libraries/ResuableComponents/SubjectMarkList';
import {
  CDAGetAllStudentswiseRemarkDetails,
  CDAGetClassTeachers,
  CDAGetRemarksCategory,
  CDAGetTestwiseTerm,
  CDAStudentListDropDown,
  CDAStudentswiseRemarkDetailsToExport,
  CDAUpdateAllStudentsRemarkDetails,
  CDAresetSaveMassage
} from 'src/requests/ProgressRemarks/ReqProgressRemarks';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';


const HeaderPublish = [
  { Id: 1, Header: ' Remark Template.	' },
];

const ProgressRemarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectTeacher, SetselectTeacher] = useState(
    sessionStorage.getItem('TeacherId')
  );
  const [SelectTerm, SetSelectTerm] = useState();
  const [StudentList, SetStudentList] = useState('');
  const [showScreenOne, setShowScreenOne] = useState(true);
  const [open, setOpen] = useState(false);
  const [StudentsList, setStudentsList] = useState([]);
  const [Remark, setRemark] = useState('')
  const toggleScreens = () => {
    setShowScreenOne(!showScreenOne);
  };
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asStandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const asUserId = Number(sessionStorage.getItem('Id'));
  const USGetTestwiseTerm: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetTestwiseTerm
  );
  console.log(USGetTestwiseTerm, 'USGetTestwiseTerm==1');

  const USClassTeachers: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetClassTeachers
  );

  const StudentswiseRemarkDetails: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISStudentswiseRemarkDetailsToExport
  );
  const StudentswiseRemarkDetails1: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISStudentswiseRemarkDetailsToExport1
  );
  const StudentswiseRemarkDetails2: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISStudentswiseRemarkDetailsToExport2
  );

  const UpdateAllStudentsRemarkDetail: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISUpdateAllStudentsRemarkDetailsBody
  );

  const USStudentListDropDown: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISStudentListDropDown
  );
  const GradeDropDown: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGradesForStandard
  );
  console.log("GradeDropdown", GradeDropDown)
  const RemarkDropDown: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetRemarksCategory
  );
  console.log("RemarkDropDown", RemarkDropDown)
  const RemarkTemplateDetails: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetRemarkTemplateDetail
  );
  console.log("RemarkTemplateDetails", RemarkTemplateDetails)

  const USGetAllStudentswiseRemarkDetails: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISGetAllStudentswiseRemarkDetails
  );

  const [Itemlist, setItemlist] = useState([]);

  useEffect(() => {
    setItemlist(USGetAllStudentswiseRemarkDetails);
  }, [USGetAllStudentswiseRemarkDetails]);

  //    const [charCounts, setCharCounts] = useState([]);
  //  useEffect(() => {
  //     setCharCounts(Itemlist.map((item) => 300 - item.Text3.length));
  //   }, [Itemlist]);

  //   const CharCounts1 =(value)=>{
  //     setCharCounts(value)

  //   }

  const TextValues = (value) => {
    setItemlist(value);

    console.log(value, 'value-----');
  };
  const TextValues1 = (value) => {
    setItemlist(value);
  };
  const TextValues2 = (value) => {
    setItemlist(value);
  };

  const Note1 = [
    'Attentive, Capable, Careful, Cheerful, Confident, Cooperative, Courteous, Creative, Dynamic, Eager, Energetic, Generous, Hardworking, Helpful, Honest, Imaginative, Independent, Industrious, Motivated, Organized Outgoing, Pleasant, Polite, Resourceful, Sincere, Unique.'
  ];
  const Hedaer1 = ['Suggested Adjectives:'];

  const Note2 = [
    'Always, Commonly, Consistently, Daily, Frequently, Monthly, Never, Occasionally, Often, Rarely, Regularly Typically, Usually, Weekly..'
  ];
  const Hedaer2 = ['Suggested Adverbs ::'];

  const Note3 = [
    'Click on the button available for each student and remark type to add configured Remark Templates.'
  ];
  const Hedaer3 = ['...'];

  const Note4 = [
    'After specific interval of time entered data will be saved automatically.'
  ];
  const Hedaer4 = ['Note:'];

  const Note5 = [
    'User can not change or update any data once summative exam is published.'
  ];
  const Hedaer5 = ['Note:'];

  const HeaderArray = [
    { Id: 1, Header: 'Roll No.' },
    { Id: 2, Header: 'Name' },
    { Id: 3, Header: 'Remark' },
    ,
    { Id: 4, Header: 'Behaviour' },
    ,
    { Id: 5, Header: 'Attitude' }
  ];

  const GetTestwiseTermBody: IGetTestwiseTermBody = {
    asSchoolId: asSchoolId
  };

  const ClassTeachersBody: IAllPrimaryClassTeachersBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asUserId: asUserId
  };

  const ExportButton = () => {
    const StudentswiseRemarkDetailsBody: IStudentswiseRemarkDetailsToExportBody =
    {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asStandardDivId: asStandardDivisionId,
      asStudentId: Number(StudentList),
      asTermId: SelectTerm
    };
    dispatch(
      CDAStudentswiseRemarkDetailsToExport(StudentswiseRemarkDetailsBody)
    );
  };

  const getXML = () => {
    let sXML =
      '<ArrayOfStudentwiseRemarkConfigDetails xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
    Itemlist.map((Item) => {
      sXML =
        sXML +
        '<StudentwiseRemarkConfigDetails>   <YearwiseStudentId>' +
        Item.Text11 +
        '</YearwiseStudentId>' +
        '<StudentwiseRemarkId>' +
        Item.Text12 +
        '</StudentwiseRemarkId>' +
        '<Remark>' +
        Item.Text3 +
        '</Remark>' +
        '<RemarkConfigId>' +
        Item.Text7 +
        '</RemarkConfigId>' +
        '<RemarkMaster><RemarkConfigId>' +
        Item.Text6 +
        '</RemarkConfigId></RemarkMaster>' +
        '<SalutationId>' +
        Item.Text8 +
        '</SalutationId>' +
        '<IsPassedAndPromoted>' +
        Item.Text9 +
        '</IsPassedAndPromoted>' +
        '<IsLeftStudent>' +
        Item.Text10 +
        '</IsLeftStudent>   </StudentwiseRemarkConfigDetails>';
    });
    sXML = sXML + '</ArrayOfStudentwiseRemarkConfigDetails>';

    console.log('XMLLLLLLLL', sXML);

    return sXML;
  };

  const UpdateAllStudentsRemarkDetailsBody: IUpdateAllStudentsRemarkDetailsBody =
  {
    StudentwiseRemarkXML: getXML(),
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asInsertedById: Number(selectTeacher),
    asStandardDivId: asStandardDivisionId,
    asTermId: Number(SelectTerm)
  };




  useEffect(() => {
    const RemarkCategoryBody: IGetRemarksCategoryBody =
    {

      asSchoolId: Number(asSchoolId),
      asAcadmicYearId: asAcademicYearId,

    };
    dispatch(CDAGetRemarksCategory(RemarkCategoryBody));
  }, []);
  // useEffect(() => {
  //   const RemarkTemplateBody: IGetRemarkTemplateDetailsBody =
  //   {

  //     asSchoolId: Number(asSchoolId),
  //   //  asRemarkId: Number,
  //   //  asSortExpression: string,
  //   //  asSortDirection: string,
  //    // asFilter: Number,
  //     asAcadmicYearId: asAcademicYearId,
  //   //  asMarksGradesConfigurationDetailsId: Number,
  //   //  asStandardId: Number

  //   };
  //   dispatch(CDAGetRemarksCategory(RemarkTemplateBody));
  // }, []);

  const UpdateRemark = () => {
    dispatch(
      CDAUpdateAllStudentsRemarkDetails(UpdateAllStudentsRemarkDetailsBody)
    );

    // dispatch(CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody)) ;
  };
  // export GetAllGradesForStandardBody: IGetAllGradesForStandardBody {
  //   asSchool_Id: asSchoolId,
  // asAcademic_Year_Id: asAcademicYearId,
  // asStandard_Id: Number,
  // asSubjectId: Number,
  // asTest_Id:Number
  // }

  useEffect(() => {
    if (UpdateAllStudentsRemarkDetail != '') {
      toast.success(UpdateAllStudentsRemarkDetail);
      dispatch(CDAresetSaveMassage());
      dispatch(
        CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody)
      );
    }
  }, [UpdateAllStudentsRemarkDetail]);

  const StudentListDropDowntBody: IStudentListDropDowntBody = {
    asStandard_Division_Id: asStandardDivisionId,
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asTerm_Id: SelectTerm
  };

  const GetAllStudentswiseRemarkDetailsBody: IGetAllStudentswiseRemarkDetailsBody =
  {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivId: asStandardDivisionId,
    asStudentId: Number(StudentList),
    asTermId: Number(SelectTerm)
  };

  const clickSelectTerm = (value) => {
    SetSelectTerm(value);
  };

  const clickSelectClass = (value) => {
    SetselectTeacher(value);
  };
  const clickRemark = (value) => {
    setRemark(value);
  };

  const clickStudentList = (value) => {
    SetStudentList(value);
  };
  // const getStudentName = () => {
  //   let StudentName = '';
  //   USStudentListDropDown.map((item) => {
  //     if (item.Value == StudentList) StudentName = item.Name;
  //   });
  //   return StudentName;
  // };

  const getStudentName = () => {
    let studentName = '';
    if (Array.isArray(USStudentListDropDown)) {
      const selectedValue = StudentList;
      const matchingStudent = USStudentListDropDown.find(item => item.Value === selectedValue);
      if (matchingStudent) {
        studentName = matchingStudent.Name;
      }
    }
    return studentName;
  };

  useEffect(() => {
    if (USGetTestwiseTerm.length > 0) {
      SetSelectTerm(USGetTestwiseTerm[0].Value);
    }
  }, [USGetTestwiseTerm]);
  useEffect(() => {
    if (RemarkDropDown.length > 0) {
      setRemark(RemarkDropDown[0].Value);
    }
  }, [RemarkDropDown]);

  // useEffect(() => {
  //   dispatch(CDAGradeDropDown(GetAllGradesForStandardBody));
  // }, []);
  useEffect(() => {
    dispatch(CDAGetClassTeachers(ClassTeachersBody));
  }, []);

  useEffect(() => {
    dispatch(CDAGetTestwiseTerm(GetTestwiseTermBody));
  }, []);

  useEffect(() => {
    dispatch(CDAStudentListDropDown(StudentListDropDowntBody));
  }, [selectTeacher]);

  useEffect(() => {
    dispatch(
      CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody)
    );
  }, [selectTeacher, SelectTerm, StudentList]);

  const ExamResult = (value) => {
    console.log(open, 'open modal')
    setOpen(!open)
  };
  const [page, setPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const Changevalue = (value) => {
    setStudentsList(value);
  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Exam Results', path: '/extended-sidebar/Teacher/ExamResultBase' },
          { title: 'Progress Remarks', path: '/extended-sidebar/Teacher/ProgressRemarks' }
        ]}
        rightActions={<>
          <SearchableDropdown
            ItemList={USClassTeachers}
            sx={{ minWidth: '300px' }}
            onChange={clickSelectClass}
            defaultValue={selectTeacher}
            label={'Subject Teacher'}
            size={"small"}
          />
          <SearchableDropdown
            ItemList={USGetTestwiseTerm}
            sx={{ minWidth: '200px' }}
            onChange={clickSelectTerm}
            defaultValue={SelectTerm}
            label={'Term'}
            size={"small"}
          />

          <SearchableDropdown
            ItemList={USStudentListDropDown}
            sx={{ minWidth: '300px' }}
            onChange={clickStudentList}
            defaultValue={StudentList}
            label={'StudentList'}
            size={"small"}
          />

          <Box>
            <Tooltip title={'Add/Edit/Delete student progress remarks.'}>
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
          </Box>
          <Box>
            <Tooltip title={'Export'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <Download />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title={'Save'}>
              <IconButton
                onClick={UpdateRemark}
                sx={{
                  color: 'white',
                  backgroundColor: 'green'
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </>}
      />
      <Paper sx={{ mb: '10px' }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>Important Notes</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
            <Alert variant="filled" severity="info"><b>Suggested Adjectives:</b> {Note1}</Alert>
            <Alert variant="filled" severity="info"><b>Suggested Adjectives:</b> {Note2}</Alert>
            <Alert variant="filled" severity="info">{Note3}</Alert>
            <Alert variant="filled" severity="info"><b>Note:</b> {Note4}</Alert>
            <Alert variant="filled" severity="info"><b>Note:</b> {Note5}</Alert>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Box sx={{ background: 'white', p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <ResizableCommentsBox
                HeaderArray={HeaderArray}
                ItemList={Itemlist}
                NoteClick={ExamResult}
                setTextValues={TextValues}
                setTextValues1={TextValues1}
                setTextValues2={TextValues2}
              />
              <Box sx={{ margin: '8px' }} style={{ display: 'flex', justifyContent: 'end' }}>
                <Pagination
                  count={5}
                  variant={"outlined"}
                  shape='rounded' showFirstButton
                  showLastButton
                  onChange={(event, value) => {
                    handlePageChange(value);
                  }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={"bold"} variant='h4' mb={1}>
              Legends
            </Typography>
            <Typography fontWeight={"bold"} display={"flex"} alignItems={"center"} gap={1}>
              <Box sx={{ height: '20px', width: '20px', background: red[500] }} />
              <Box>Left Students</Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={ExamResult}
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box>
              <Box>
                <Typography style={{ fontWeight: 'normal', fontSize: '20px' }}>Add Remark Template</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, margin: '12px' }}>
                {/* <SearchableDropdown
                  ItemList={USStudentListDropDown}
                  sx={{ minWidth: '230px' }}
                  onChange={clickStudentList}
                  defaultValue={StudentList}
                  label={'Student Name'}
                  size={"small"}
                /> */}

                <TextField
                  size={"small"}
                  fullWidth
                  label={"StudentList"}
                  value={getStudentName()}
                  sx={{ bgcolor: '#f0e68c' }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <SearchableDropdown
                  ItemList={RemarkDropDown}
                  sx={{ minWidth: '230px' }}
                  onChange={clickRemark}
                  defaultValue={Remark}
                  label={'Remark Category'}
                  size={"small"}
                />
                <SearchableDropdown
                  ItemList={USGetTestwiseTerm}
                  sx={{ minWidth: '230px' }}
                  onChange={clickSelectTerm}
                  defaultValue={SelectTerm}
                  label={'Grades'}
                  size={"small"}
                />

              </Box>
              <Paper sx={{ padding: 1, marginBottom: '10px' }}>
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
                  {StudentsList.length > 0 ? (
                    <SubjectMarkList
                      ItemList={StudentsList}
                      HeaderArray={HeaderPublish}
                      onChange={Changevalue}
                      clickchange={""}
                      clickTitle={""}
                    />
                  ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white', width: '700px' }}>
                      <b>No Record Found.</b>
                    </Typography>
                  )
                  }
                </Box>
              </Paper>
            </Box>
            <Box>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#324b84',
                  color: 'White',
                  marginRight: '10px'
                }}
              >
                SELECT
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: 'Red',
                  color: 'White',
                  marginRight: '10px'
                }}
                onClick={() => setOpen(!open)}
              >
                CLOSE
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProgressRemarks;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  bgcolor: '#EAF1F5',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};
