import { Box, Grid, Paper, Stack, Switch, Typography } from '@mui/material';
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
import ExportToExcel from 'src/libraries/ResuableComponents/ExportToExcel';
import Notes from 'src/libraries/ResuableComponents/Notes';
import ResizableCommentsBox from 'src/libraries/ResuableComponents/ResizableCommentsBox;';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
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

const ProgressRemarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectTeacher, SetselectTeacher] = useState(
    sessionStorage.getItem('TeacherId')
  );
  const [SelectTerm, SetSelectTerm] = useState();
  const [StudentList, SetStudentList] = useState('');
  const [showScreenOne, setShowScreenOne] = useState(true);

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
    navigate('/extended-sidebar/Teacher/ExamResultBase');
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {showScreenOne ? 'Hide Notes' : ' Show Notes'}
        </Typography>
        <Switch
          checked={showScreenOne}
          onChange={() => setShowScreenOne(!showScreenOne)}
        />

      </Box>
      {showScreenOne ? (
        <Grid >
          <Paper sx={{ padding: '8px', marginBottom: '10px' }}>
            <Notes NoteDetail={Note1} Header={Hedaer1} />
            <Notes NoteDetail={Note2} Header={Hedaer2} />
            <Notes NoteDetail={Note3} Header={Hedaer3} />
            <Notes NoteDetail={Note4} Header={Hedaer4} />
            <Notes NoteDetail={Note5} Header={Hedaer5} />
          </Paper>

          <Grid item xs={6}>
            <Paper sx={{ padding: '8px' }}>
              <Stack>
                <Typography variant={'h4'} mb={1}>
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

              <Box sx={{ margin: '8px' }} style={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonPrimary
                  variant="contained"
                  style={{
                    backgroundColor: '#0091ea',
                    color: 'white',
                  }}
                  onClick={UpdateRemark}
                >
                  SAVE
                </ButtonPrimary>
                <Box sx={{ marginInline: '10px' }}>
                  <ExportToExcel
                    File1={StudentswiseRemarkDetails}
                    File2={StudentswiseRemarkDetails1}
                    File3={StudentswiseRemarkDetails2}
                    ExportExcel={ExportButton}
                  />
                </Box>
                <ButtonPrimary
                  variant="contained"
                  style={{
                    backgroundColor: 'Red',
                    color: 'White',
                    marginRight: '10px'
                  }}
                >
                  PREVIOUS
                </ButtonPrimary>
                <ButtonPrimary
                  variant="contained"
                  style={{ backgroundColor: '#0091ea', color: 'white' }}
                >
                  NEXT
                </ButtonPrimary>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={6}>
          <Paper sx={{ padding: '8px' }}>
            <Stack>
              <Typography variant={'h4'} mb={1}>
                Left Students
              </Typography>
            </Stack>
            <ResizableCommentsBox
              HeaderArray={HeaderArray}
              ItemList={Itemlist}
              NoteClick={ExamResult}
              setTextValues={TextValues}
              setTextValues1={TextValues1}
              setTextValues2={TextValues2}
            />

            <br></br>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <ButtonPrimary
                variant="contained"
                style={{
                  backgroundColor: '#0091ea',
                  color: 'white',
                  marginRight: '10px'
                }}
                onClick={UpdateRemark}
              >
                SAVE
              </ButtonPrimary>
              <ButtonPrimary
                variant="contained"
                style={{
                  backgroundColor: 'Red',
                  color: 'White',
                  marginRight: '10px'
                }}
              >
                PREVIOUS
              </ButtonPrimary>
              <ButtonPrimary
                variant="contained"
                style={{ backgroundColor: '#0091ea', color: 'white' }}
              >
                NEXT
              </ButtonPrimary>
            </Box>
          </Paper>
        </Grid>
      )}
    </Box>
  );
};

export default ProgressRemarks;
