import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Styles } from 'src/assets/style/student-style';
import { getSchoolConfigurations } from '../Common/Util';
import {
  IClassTeacherDropdownBody,
  IGetFinalPublishedExamStatusBody,
  IStudentsListBody,
  ITermDropdownBody,
  IUpdateStudentDetailsBody
} from 'src/interfaces/TermwiseHeightWeight/ITermwiseHeightWeight';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import TermwiseHeightWeightList from 'src/libraries/ResuableComponents/TermwiseHeightWeightList';
import { DotLegend1, DotLegendStyled1 } from 'src/libraries/styled/DotLegendStyled';

import Save from '@mui/icons-material/Save';
import {
  getFinalPublishedExamStatus,
  getTeacherNameList,
  getTermList,
  getstudentdetails,
  getupdatestudentlist,
  resetupdatestudentlist
} from 'src/requests/TermwiseHeightWeight/RequestTermwiseHeightWeight';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const TermwiseHeightWeight = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { StandardDivisionId } = useParams();

 
  const [SelectTerm, setSelectTerm] = useState(0);
  const [Itemlist, setItemlist] = useState([]);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  const UserId = Number(localStorage.getItem('UserId'));
  const asUserId = Number(sessionStorage.getItem('UserId'));

  const ClassTeacherDropdown = useSelector((state: RootState) => state.TermwiseHtWt.ClassTeacherList);
  console.log(ClassTeacherDropdown, "ClassTeacherDropdown");

  let CanEdit = getSchoolConfigurations(247) 
  console.log(CanEdit, "CanEdit");

  const [SelectTeacher, setSelectTeacher] = useState(CanEdit =="Y"? 0 :StandardDivisionId);
console.log(SelectTeacher,"SelectTeacher");

  const TermDropdown = useSelector((state: RootState) => state.TermwiseHtWt.TermwiseTermList);
  const StudentList = useSelector((state: RootState) => state.TermwiseHtWt.Student);
  const UpdateStudentDetails = useSelector((state: RootState) => state.TermwiseHtWt.UpdateStudent);


  const GetFinalPublishedExamStatus: any = useSelector((state: RootState) => state.TermwiseHtWt.FinalPublishedExamStatus);
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );

  const ShowFlag = GetFinalPublishedExamStatus.ShowFlag;




  const Note = [
    'User can not change or update any data once summative exam is published.'];
  const Header = ['Note:'];
  const classes = Styles();
  const HeaderOfTable = [
    { Id: 1, Header: 'Roll No.' },
    { Id: 2, Header: 'Student Name' },
    { Id: 3, Header: 'Height (In Centimeters)' },
    { Id: 4, Header: 'Weight (In Kilograms)' }
  ];

  const GetScreenPermission = () => {
    let perm = 'N';
    let UserId = 0;
    console.log(ScreensAccessPermission, "ScreensAccessPermission");
    let ExamResultsAccess, TermwiseHeightWeightAccess = ""

    if (ScreensAccessPermission) {
      ScreensAccessPermission.forEach((item) => {
        if (item.ScreenName === 'Termwise Height-Weight') {
          TermwiseHeightWeightAccess = item.IsFullAccess
        }
        if (item.ScreenName === 'Exam Results') {
          ExamResultsAccess = item.IsFullAccess
        }
      });

      if (ExamResultsAccess == "N" && TermwiseHeightWeightAccess == "N") {
        UserId = asUserId;
      }
      else {
        UserId = 0;
      }
    }

    return { perm: ((TermwiseHeightWeightAccess == "N" && ExamResultsAccess == "N") ? "N" : "Y"), UserId: UserId }
  };

  

  


  
  
  useEffect(() => {
    const ClassTeacherBody: IClassTeacherDropdownBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
     
    };
    dispatch(getTeacherNameList(ClassTeacherBody));
  }, []);

  useEffect(() => {
    const TermDropdownBody: ITermDropdownBody = {
      asSchoolId: asSchoolId
    };
    dispatch(getTermList(TermDropdownBody));
  }, []);

  

  useEffect(() => {
    if (TermDropdown.length > 0)
      setSelectTerm(TermDropdown[0].Id);
  }, [TermDropdown]);


  const StudentlistBody: IStudentsListBody = {
    asStdDivId: Number(SelectTeacher),
    asAcademic_Year_Id: asAcademicYearId,
    asSchoolId: asSchoolId,
    asTerm_Id: SelectTerm
  };


 

  useEffect(() => {

    dispatch(getstudentdetails(StudentlistBody));
    dispatch(getFinalPublishedExamStatus(GetFinalPublishedExamStatusBody));

  }, [SelectTeacher, SelectTerm]);

  useEffect(() => {
    setItemlist(StudentList);
  }, [StudentList]);


  const GetFinalPublishedExamStatusBody: IGetFinalPublishedExamStatusBody = {
    asStandardDivId: Number(SelectTeacher),
    asTerm_Id: SelectTerm,
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };





  const [HeightXML, setHeightXML] = useState('');
  const [WeightXML, setWeightXML] = useState('');

  const getXML = () => {
    console.log(Itemlist, '----');
    let sXML =
      "<ArrayOfStudentInfoForHeightWeight xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'>";
    Itemlist.map((Item) => {
      sXML =
        sXML +
        '<StudentInfoForHeightWeight><RollNo>' +
        Item.Text1 +
        '</RollNo><YearWiseStudentId>' +
        Item.Text6 +
        '</YearWiseStudentId><Height>' +
        (Item.Text3 === "" ? "0" : Item.Text3) +
        '</Height><Weight>' +
        (Item.Text4 === "" ? "0" : Item.Text4) +
        '</Weight><IsLeftStudent>' +
        Item.Text5 +
        '</IsLeftStudent></StudentInfoForHeightWeight>';
    });
    sXML = sXML + '</ArrayOfStudentInfoForHeightWeight>';

    console.log('XMLLLLLLLL', sXML);
    return sXML;
  };

  const clickTeacherDropdown = (value) => {
    setSelectTeacher(value);

  };
  const clickTermDropdown = (value) => {
    setSelectTerm(value);
  };

  const ChangeHeight = (value) => {
    //setItemlist(value)
    //setHeightXML("<Height>" + getXML() + "</Height>")

    const regex = /^[0-9\b]+$/;
    if (value === '' || (regex.test(value) && value.length <= 2)) {
      setItemlist(value);
    }
  };
  const ChangeWeight = (value) => {
    setItemlist(value);
    //setWeightXML("<Weight>" + getXML() + "</Weight>")
  };

  const onClickSave = () => {
    const UpdateStudentlistBody: IUpdateStudentDetailsBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asTermId: SelectTerm,
      asStandardDivisionId:Number(SelectTeacher),
      aiUserId: UserId,
      StudentHeightWeightDetailsXML: getXML() // "<ArrayOfStudentInfoForHeightWeight xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37608</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37609</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37610</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37611</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37612</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37613</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37614</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37615</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37616</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37617</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37618</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37619</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37620</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37621</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37622</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37623</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37625</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37652</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37626</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37627</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37628</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37629</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37630</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37631</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37632</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37633</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37634</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37635</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37636</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37637</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37638</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37639</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37640</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37641</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37642</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37643</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37644</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37645</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37646</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37647</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37648</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37649</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37650</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37651</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37624</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight></ArrayOfStudentInfoForHeightWeight>"
    };
    dispatch(getupdatestudentlist(UpdateStudentlistBody));


  };
  useEffect(() => {
    if (UpdateStudentDetails !== '') {
      toast.success(UpdateStudentDetails, { toastId: 'success1' });
      dispatch(resetupdatestudentlist());
      dispatch(getstudentdetails(StudentlistBody));

    }
  }, [UpdateStudentDetails])

  const onClickBack = () => {
    navigate('/extended-sidebar/Teacher/ExamResultBase');
  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Exam Results', path: '/extended-sidebar/Teacher/ExamResultBase' },
          { title: 'Termwise Height-Weight', path: '/extended-sidebar/Teacher/TermwiseHeightWeight' },
        ]}
        rightActions={<>
          <SearchableDropdown
            sx={{
              minWidth: '20vw'
              , bgcolor: CanEdit == 'N' ? '#F0F0F0' : 'inherit'
            }}
            ItemList={ClassTeacherDropdown}
            onChange={clickTeacherDropdown}
            label={'Class Teacher'}
            defaultValue={SelectTeacher.toString()} // Convert number to string
            mandatory
            size={"small"}
            DisableClearable={CanEdit == 'N'}
            disabled={CanEdit == 'N'}
          />
          <SearchableDropdown
            sx={{ minWidth: '20vw' }}
            ItemList={TermDropdown}
            onChange={clickTermDropdown}
            label={'Term'}
            defaultValue={SelectTerm.toString()} // Convert number to string
            mandatory
            size={"small"}
          />
          <Tooltip title={Note}>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: '#fbc02d',
                '&:hover': {
                  backgroundColor: '#e1ac28'
                }
              }}
            >
              <PriorityHighIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Capture termwise students' height and weight."}>
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
          {Number(SelectTeacher) > 0 && (
            <Tooltip title={'Save'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: green[500],
                  '&:hover': {
                    backgroundColor: green[500]
                  }
                }}
                disabled={GetFinalPublishedExamStatus?.ShowFlag == "1"}
                onClick={onClickSave}
              >
                <Save />
              </IconButton>
            </Tooltip>
          )}
        </>}
      />

       <Box  sx={{backgroundColor:'white', mb:2, p:2}}>
        <Stack direction={'row'} gap={1} alignItems={'center'}  mb={0} >
          <Typography variant={'h4'} mb={0}>
            Legend
          </Typography>
          <DotLegend1 sx={{ alignItems: 'center', display: 'flex', mt:'0px' }}>
            <DotLegendStyled1
              className={classes.border}
              style={{ background: 'red' }}
            />
            Left Students
          </DotLegend1>
        </Stack>
        </Box>
      <Box sx={{ background: 'white', p:2}}>
        {/* New Table */}
        {/* <DataTable
          columns={
            [
              {
                id: 'rollNo',
                label: 'Roll No',
                renderCell: (rowData) => rowData.rollNo
              },
              {
                id: 'studentName',
                label: 'Student Name',
                renderCell: (rowData) => rowData.studentName
              },
              {
                id: 'height',
                label: 'Height (In Centimeters)',
                renderCell: (rowData) => (
                  <TextField
                    size={"small"}
                    fullWidth
                    value={rowData.height}
                    onChange={(e) => {
                      ChangeHeight(e.target.value);
                    }}
                    disabled={GetFinalPublishedExamStatus.IsPublishedStatus == "1"}
                  />
                )
              },
              {
                id: 'weight',
                label: 'Weight (In Kilograms)',
                renderCell: (rowData) => (
                  <TextField
                    size={"small"}
                    fullWidth
                    value={rowData.weight}
                    onChange={(e) => {
                      ChangeWeight(e.target.value);
                    }}
                    disabled={GetFinalPublishedExamStatus.IsPublishedStatus == "1"}
                  />
                )
              }
            ]
          }
          data={
            [
              {
                rollNo: 'Roll No',
                studentName: 'Student Name',
                height: 'Height (In Centimeters)',
                weight: 'Weight (In Kilograms)'
              }
            ]
          }
        /> */}
        {/* New Table End */}
       
        {StudentList.length > 0 ? (
          <>
            <TermwiseHeightWeightList
              ItemList={Itemlist}
              onTextChange={ChangeHeight}
              onTextChange2={ChangeWeight}
              HeaderArray={HeaderOfTable}
              IsPublishedStatus={GetFinalPublishedExamStatus.IsPublishedStatus}
            />
          </>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
            <b>No record found.</b>
          </Typography>
        )}
        
      </Box>
    </Box >
  );
};

export default TermwiseHeightWeight;