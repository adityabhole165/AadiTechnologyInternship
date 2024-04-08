import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Grid, IconButton, Modal, Pagination, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  IAllPrimaryClassTeachersBody,
  IGetAllStudentswiseRemarkDetailsBody,
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

  const UpdateRemark = () => {
    dispatch(
      CDAUpdateAllStudentsRemarkDetails(UpdateAllStudentsRemarkDetailsBody)
    );

    // dispatch(CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody)) ;
  };

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

  const clickStudentList = (value) => {
    SetStudentList(value);
  };

  useEffect(() => {
    if (USGetTestwiseTerm.length > 0) {
      SetSelectTerm(USGetTestwiseTerm[0].Value);
    }
  }, [USGetTestwiseTerm]);

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
            sx={{ minWidth: '200px' }}
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
            sx={{ minWidth: '200px' }}
            onChange={clickStudentList}
            defaultValue={StudentList}
            label={'StudentList'}
            size={"small"}
          />
        </>}
      />

      <Grid >
        <Paper sx={{ padding: 1, marginBottom: '10px' }}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography style={{ fontWeight: 'normal', fontSize: '20px' }}>Important Notes</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
              <Alert variant="filled" severity="info">{Note1}</Alert>
              <Alert variant="filled" severity="info">{Note2}</Alert>
              <Alert variant="filled" severity="info">{Note3}</Alert>
              <Alert variant="filled" severity="info">{Note4}</Alert>
              <Alert variant="filled" severity="info">{Note5}</Alert>

            </AccordionDetails>
          </Accordion>

        </Paper>

        <Grid item xs={6}>
          <Paper sx={{ padding: 2 }}>
            <Stack>
              <Typography style={{ fontWeight: 'normal', fontSize: '20px' }}>
                Left Students
              </Typography>
            </Stack>
            {/* <ResizableCommentsBox HeaderArray={HeaderArray} ItemList={Itemlist} NoteClick={ExamResult}   setTextValues={TextValues} setTextValues1={TextValues1} setTextValues2={TextValues2} setCharCounts={CharCounts1} charCounts={charCounts}/> */}
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
            <Box sx={{ margin: '8px' }} style={{ display: 'flex', justifyContent: 'center' }}>
              {/* Show some error in this component. Please check */}
              {/* <Box sx={{ marginInline: '10px' }}>
                  <ExportToExcel
                    File1={StudentswiseRemarkDetails}
                    File2={StudentswiseRemarkDetails1}
                    File3={StudentswiseRemarkDetails2}
                    ExportExcel={ExportButton}
                  />
                </Box> */}
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

            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={ExamResult}
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box>
              <Box>
                <Typography style={{ fontWeight: 'normal', fontSize: '20px' }}>Select Appropriate Template</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, margin: '12px' }}>
                <SearchableDropdown
                  ItemList={USStudentListDropDown}
                  sx={{ minWidth: '230px' }}
                  onChange={clickStudentList}
                  defaultValue={StudentList}
                  label={'Student Name'}
                  size={"small"}
                />
                <SearchableDropdown
                  ItemList={USClassTeachers}
                  sx={{ minWidth: '230px' }}
                  onChange={clickSelectClass}
                  defaultValue={selectTeacher}
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
