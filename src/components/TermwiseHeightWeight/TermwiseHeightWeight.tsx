import { Box, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  IClassTeacherDropdownBody,
  IStudentsListBody,
  ITermDropdownBody,
  IUpdateStudentDetailsBody
} from 'src/interfaces/TermwiseHeightWeight/ITermwiseHeightWeight';
import Notes from 'src/libraries/ResuableComponents/Notes';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import TermwiseHeightWeightList from 'src/libraries/ResuableComponents/TermwiseHeightWeightList';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import DotLegend from 'src/libraries/summary/DotLegend';

import {
  getTeacherNameList,
  getTermList,
  getstudentdetails,
  getupdatestudentlist
} from 'src/requests/TermwiseHeightWeight/RequestTermwiseHeightWeight';
import { RootState } from 'src/store';

const TermwiseHeightWeight = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [SelectTeacher, setSelectTeacher] = useState(0);
  const [SelectTerm, setSelectTerm] = useState(0);
  const [Itemlist, setItemlist] = useState([]);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  const UserId = Number(localStorage.getItem('UserId'));

  const ClassTeacherDropdown = useSelector((state: RootState) => state.TermwiseHtWt.ClassTeacherList);
  console.log('ClassTeacherDropdown', ClassTeacherDropdown);
  const TermDropdown = useSelector((state: RootState) => state.TermwiseHtWt.TermwiseTermList);
  console.log('TermDropdown', TermDropdown);
  const StudentList = useSelector((state: RootState) => state.TermwiseHtWt.Student);
  console.log('StudentList', StudentList);
  const UpdateStudentDetails = useSelector((state: RootState) => state.TermwiseHtWt.UpdateStudent);
  console.log('UpdateStudentDetails', UpdateStudentDetails);

  const Note = [
    'User can not change or update any data once summative exam is published.'];
  const Header = ['Note:'];
  const HeaderOfTable = [
    { Id: 1, Header: 'Roll No.' },
    { Id: 2, Header: 'Student Name' },
    { Id: 3, Header: 'Height (Cm)' },
    { Id: 4, Header: 'Weight (Kg)' }
  ];

  useEffect(() => {
    const ClassTeacherBody: IClassTeacherDropdownBody = {
      asSchoolId: asSchoolId,
      asAcademicYearID: asAcademicYearId
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
    if (ClassTeacherDropdown.length > 0)
      setSelectTeacher(ClassTeacherDropdown[0].Id);
  }, [ClassTeacherDropdown]);

  useEffect(() => {
    if (TermDropdown.length > 0)
      setSelectTerm(TermDropdown[0].Id);
  }, [TermDropdown]);

  useEffect(() => {
    const StudentlistBody: IStudentsListBody = {
      asStdDivId: SelectTeacher,
      asAcademic_Year_Id: asAcademicYearId,
      asSchoolId: asSchoolId,
      asTerm_Id: SelectTerm
    };
    dispatch(getstudentdetails(StudentlistBody));
  }, [SelectTeacher, SelectTerm]);

  useEffect(() => {
    setItemlist(StudentList);
  }, [StudentList]);

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
        Item.Text3 +
        '</Height><Weight>' +
        Item.Text4 +
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
    // console.log(value, "teacherid")
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
      asStandardDivisionId: SelectTeacher,
      aiUserId: UserId,
      StudentHeightWeightDetailsXML: getXML() // "<ArrayOfStudentInfoForHeightWeight xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37608</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37609</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37610</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37611</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37612</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37613</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37614</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37615</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37616</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37617</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37618</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37619</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37620</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37621</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37622</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37623</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37625</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37652</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37626</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37627</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37628</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37629</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37630</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37631</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37632</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37633</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37634</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37635</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37636</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37637</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37638</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37639</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37640</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37641</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37642</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37643</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37644</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37645</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37646</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37647</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37648</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37649</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37650</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37651</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight><StudentInfoForHeightWeight><RollNo>0</RollNo><YearWiseStudentId>37624</YearWiseStudentId><Height>0.0</Height><Weight>0.00</Weight><IsLeftStudent>0</IsLeftStudent></StudentInfoForHeightWeight></ArrayOfStudentInfoForHeightWeight>"
    };
    dispatch(getupdatestudentlist(UpdateStudentlistBody));

    if (UpdateStudentDetails !== '') {
      toast.success(UpdateStudentDetails, { toastId: 'success1' });
    }
  };

  const onClickBack = () => {
    navigate('/extended-sidebar/Teacher/ExamResultBase');
  };

  return (
    <>
      <br></br>
      <br></br>
      <PageHeader heading="Termwise Height-Weight" />
      <div style={{ textAlign: 'right', color: 'red', paddingRight: '20px' }}>
        Mandatory Fields *
      </div>
      <br></br>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={1}>
            <Typography>
              <b>Class Teacher:</b>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <SearchableDropdown
              sx={{ minWidth: '300px' }}
              ItemList={ClassTeacherDropdown}
              onChange={clickTeacherDropdown}
              label={'Class Teacher'}
              defaultValue={SelectTeacher.toString()} // Convert number to string
              mandatory
              size={"small"}
            />
            <br></br>

          </Grid>
          <div style={{ textAlign: 'right', color: 'red' }}>*</div>
          <Grid item xs={1}>
            <Typography>
              <b>Term :</b>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <SearchableDropdown
              sx={{ minWidth: '300px' }}
              ItemList={TermDropdown}
              onChange={clickTermDropdown}
              label={'Term'}
              defaultValue={SelectTerm.toString()} // Convert number to string
              mandatory
              size={"small"}
            />
            <br></br>
          </Grid>
        </Grid>
        <br></br>
        <Stack>
          <DotLegend text="Left Students" color="error" />
        </Stack>
        <br></br>
        {SelectTeacher > 0 && (
          <div>
            <Grid item xs={6}>
              <Box sx={{ paddingBottom: '3px' }}>
                <Box
                  style={{
                    textAlign: 'left',
                    paddingBottom: '40px',
                    width: '400px'
                  }}
                >
                  <TermwiseHeightWeightList
                    ItemList={Itemlist}
                    onTextChange={ChangeHeight}
                    onTextChange2={ChangeWeight}
                    HeaderArray={HeaderOfTable}
                  />{' '}
                </Box>
              </Box>
            </Grid>
          </div>
        )}
        <Notes NoteDetail={Note} Header={Header} />
        <div></div>
        <br></br>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {SelectTeacher > 0 && (
                <div>
                  <ButtonPrimary onClick={onClickSave} variant="contained">
                    SAVE
                  </ButtonPrimary>
                  <br></br>
                  <br></br>
                </div>
              )}
            </Grid>

            <Grid item xs={6}>
              <ButtonPrimary
                onClick={onClickBack}
                variant="contained"
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                BACK
              </ButtonPrimary>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default TermwiseHeightWeight;
