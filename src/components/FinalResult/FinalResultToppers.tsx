import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  IGetClassDropdownBodyCT,
  IGetClassSubjectDropdownBodyCT,
  IGetClassToppersListBOdyCT,
  IGetexamDropdownBodyCT
} from 'src/interfaces/FinalResult/IFinalResultToppers';
import {
  IGetStandardDropdownBodyST,
  IGetStandardExamDropdownBodyST,
  IGetStandardToppersListBOdyST,
  IGetSubjectDropdownBodyST
} from 'src/interfaces/FinalResult/IStandardToppers';
import {
  ClassExamListCT,
  ClassSubjectListCT,
  ClassTopperListCT,
  ClassdropdownListCT
} from 'src/requests/FinalResult/RequestFinalResultToppers';
import {
  StandardDropdownListST,
  StandardExamListST,
  StandardSubjectListST,
  StandardTopperListST
} from 'src/requests/FinalResult/RqstandardToppers';

import QuestionMark from '@mui/icons-material/QuestionMark';
import { grey } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import ToppersList from 'src/libraries/list/ToppersList';
import { RootState, useDispatch } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const FinalResultToppers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { TeacherId } = useParams();

  const [SelectClassCT, setClassCT] = useState(TeacherId);
  const [SelectExamCT, setExamCT] = useState('0');
  const [SelectSubjectCT, setSubjectCT] = useState('0');
  const [StandardRadioCT, setStandardRadioCT] = useState();
  const [SelectStandardST, setStandardST] = useState(TeacherId);
  const [SelectExamST, setExamST] = useState('0');
  const [SelectSubjectST, setSubjectST] = useState('0');
  const [showScreenOne, setShowScreenOne] = useState(true);
  const [radioBtn, setRadioBtn] = useState('1');

  const RadioListCT = [
    { Value: '1', Name: 'Class Toppers' },
    { Value: '2', Name: 'Standard Toppers' }
  ];

  const HeaderListCT = ['Rank', 'Roll No.', 'Student Name', 'Marks'];
  const HeaderList1CT = ['Roll No.', 'Student Name'];
  const HeaderListST = ['Rank', 'Class', 'Roll No.', 'Student Name', 'Marks'];
  const HeaderList1ST = ['Roll No.', 'Class', 'Student Name'];

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asTeacherId = Number(sessionStorage.getItem('TeacherId'));
  const Note: string =
    'Display the first three class/ standard toppers as well as subject toppers of your class/ standard for the selected exam';
  const GetClassdropdownCT = useSelector(
    (state: RootState) => state.FinalResultToppers.ClassDropdownListCT
  );
  const GetExamdropdownCT = useSelector(
    (state: RootState) => state.FinalResultToppers.ExamDropdownListCT
  );
  const GetSubjectdropdownCT: any = useSelector(
    (state: RootState) => state.FinalResultToppers.SubjectDropdownListCT
  );
  const GetToppersListCT = useSelector(
    (state: RootState) => state.FinalResultToppers.ClassToppersCT
  );
  const GetSubjectToppersListCT = useSelector(
    (state: RootState) => state.FinalResultToppers.SubjectToppersCT
  );
  //

  const GetStandarddropdownST = useSelector(
    (state: RootState) => state.StandardToppers.StandardDropdownST
  );
  const GetExamdropdownST = useSelector(
    (state: RootState) => state.StandardToppers.ExamDropdownListST
  );
  const GetSubjectdropdownST = useSelector(
    (state: RootState) => state.StandardToppers.SubjectDropdownListST
  );
  const GetStandardToppersListST = useSelector(
    (state: RootState) => state.StandardToppers.StandardTopperST
  );
  console.log(GetStandardToppersListST, 'GetStandardToppersListST');
  const GetSubjectToppersListST = useSelector(
    (state: RootState) => state.StandardToppers.StandardSubjectToppersST
  );
  //

  useEffect(() => {
    dispatch(ClassdropdownListCT(ClassDropdownBodyCT));
  }, [TeacherId]);
  useEffect(() => {
    dispatch(ClassExamListCT(ExamDropdownBodyCT));
  }, [SelectClassCT]);
  useEffect(() => {
    dispatch(ClassSubjectListCT(SujectDropdownBodyCT));
  }, [SelectClassCT, SelectExamCT]);
  useEffect(() => {
    dispatch(ClassTopperListCT(ToppersListBodyCT));
  }, [SelectClassCT, SelectExamCT, SelectSubjectCT]);

  useEffect(() => {
    if (GetClassdropdownCT.length > 0) setClassCT(GetClassdropdownCT[0].Id);
  }, [GetClassdropdownCT]);

  useEffect(() => {
    if (GetExamdropdownCT.length > 0) setExamCT(GetExamdropdownCT[0].Id);
  }, [GetExamdropdownCT]);

  useEffect(() => {
    if (GetSubjectdropdownCT.length > 0)
      setSubjectCT(GetSubjectdropdownCT[0].Id);
  }, [GetSubjectdropdownCT]);

  useEffect(() => {
    dispatch(StandardDropdownListST(StandardDropdownBodyST));
  }, [TeacherId]);
  useEffect(() => {
    dispatch(StandardExamListST(ExamDropdownBodyST));
  }, [SelectStandardST]);
  useEffect(() => {
    dispatch(StandardSubjectListST(SujectDropdownBodyST));
  }, [SelectStandardST, SelectExamST]);
  useEffect(() => {
    dispatch(StandardTopperListST(StandardToppersBodyST));
  }, [SelectStandardST, SelectExamST, SelectSubjectST]);

  useEffect(() => {
    if (GetStandarddropdownST.length > 0)
      setStandardST(GetStandarddropdownST[0].Id);
  }, [GetStandarddropdownST]);

  useEffect(() => {
    if (GetExamdropdownST.length > 0) setExamST(GetExamdropdownST[0].Id);
  }, [GetExamdropdownST]);

  useEffect(() => {
    if (GetSubjectdropdownST.length > 0)
      setSubjectST(GetSubjectdropdownST[0].Id);
  }, [GetSubjectdropdownST]);

  const ClassDropdownBodyCT: IGetClassDropdownBodyCT = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asTeacherId: Number(TeacherId)
  };
  const ExamDropdownBodyCT: IGetexamDropdownBodyCT = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: Number(SelectClassCT)
  };
  const SujectDropdownBodyCT: IGetClassSubjectDropdownBodyCT = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivId: Number(SelectClassCT),
    asExamId: Number(SelectExamCT)
  };
  const ToppersListBodyCT: IGetClassToppersListBOdyCT = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivId: Number(SelectClassCT),
    asExamId: Number(SelectExamCT),
    asSubjectId: Number(SelectSubjectCT)
  };

  const StandardDropdownBodyST: IGetStandardDropdownBodyST = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asTeacherId: Number(TeacherId)
  };
  const ExamDropdownBodyST: IGetStandardExamDropdownBodyST = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: Number(SelectStandardST)
  };
  const SujectDropdownBodyST: IGetSubjectDropdownBodyST = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: Number(SelectStandardST),
    asExamId: Number(SelectExamST)
  };
  const StandardToppersBodyST: IGetStandardToppersListBOdyST = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: Number(SelectStandardST),
    asExamId: Number(SelectExamST),
    asSubjectId: Number(SelectSubjectST)
  };
  const clickClassDropdownCT = (value) => {
    setClassCT(value);
  };
  const clickExamDropdownCT = (value) => {
    setExamCT(value);
  };
  const clickSubjectDropdownCT = (value) => {
    setSubjectCT(value);
  };
  //

  const clickStandardDropdownST = (value) => {
    setStandardST(value);
  };
  const clickExamDropdownST = (value) => {
    setExamST(value);
  };
  const clickSubjectDropdownST = (value) => {
    setSubjectST(value);
  };
  const ClickItemST = () => { };

  const ClickRadio = (value) => {
    setRadioBtn(value);
  };
  const onClickClose = () => {
    navigate('/extended-sidebar/Teacher/FinalResult');
  };

  const ClickItem = () => { };
  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader navLinks={[
        {
          title: "Final Result",
          path: "/extended-sidebar/Teacher/FinalResult"
        },
        {
          title: radioBtn === '1' ? "Class Toppers" : 'Standard Toppers',
          path: ""
        },
      ]}
        rightActions={<>
          {radioBtn === '1' ? (

            <Box>
              <Dropdown
                size={"small"}
                Array={GetClassdropdownCT}
                handleChange={clickClassDropdownCT}
                defaultValue={SelectClassCT}
                label={'Select Class'}
                width={'150px'}
                variant={"outlined"}
              />
            </Box>
          ) : (
            <Box>
              <Dropdown
                size={"small"}
                Array={GetStandarddropdownST}
                handleChange={clickStandardDropdownST}
                defaultValue={SelectStandardST}
                label={'Select Standard'}
                width={'150px'}
                variant={"outlined"}
              />
            </Box>
          )}
          <Box>
            <Dropdown
              size={"small"}
              Array={GetExamdropdownCT}
              handleChange={clickExamDropdownCT}
              defaultValue={SelectExamCT}
              label={'Select Exam'}
              width={'200px'}
              variant={"outlined"}
            />
          </Box>
          <Box>
            <Dropdown
              size={"small"}
              Array={GetSubjectdropdownCT}
              handleChange={clickSubjectDropdownCT}
              defaultValue={SelectSubjectCT}
              label={'Select Subject'}
              width={'150px'}
              variant={"outlined"}
            />
          </Box>
          <Box>
            <Tooltip title={Note}>
              <IconButton
                sx={{
                  color: 'White',
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
        </>}
      />
      <Box sx={{ background: 'white', p: 2 }}>

        <RadioButton1
          Array={RadioListCT}
          ClickRadio={ClickRadio}
          defaultValue={radioBtn}
          Label={''}
        />
        {radioBtn === '1' ? (
          <>
            <Box>

              <DynamicList2
                HeaderList={HeaderListCT}
                ItemList={GetToppersListCT}
                IconList={[]}
                ClickItem={ClickItem}
              />
              <Typography variant={"h4"} mt={4}>
                Subject Toppers
              </Typography>
              <Grid container>
                {GetSubjectToppersListCT.map((item, i) => {
                  return (
                    <>
                      {!(i % 3) && (
                        <Grid container item xs={12} justifyContent="center" mt={4}>
                          {/* <Grid item xl={12} xs={12} key={i} sx={{ flexGrow: 1 }}> */}
                          {/* <Box sx={{ px: 2 }}> */}
                          <Typography variant={"h4"}>
                            {item.Subject}
                          </Typography>
                          {/* </Box> */}
                        </Grid>
                      )}

                      <Grid item xs={4} justifyContent="center">
                        <Box sx={{ px: 2 }}>
                          <img src={item.Rank_Image} /> MarKs:{item.Marks}
                        </Box>
                        <ToppersList
                          headers={HeaderList1CT}
                          data={item.Students}
                        />
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Box>
          </>
        ) : (
          <Box>
            <DynamicList2
              HeaderList={HeaderListST}
              ItemList={GetStandardToppersListST}
              IconList={[]}
              ClickItem={ClickItemST}
            />
            <Typography variant={"h4"} mt={4}>
              Subject Toppers
            </Typography>
            <Grid container>
              {GetSubjectToppersListST.map((item, i) => {
                return (
                  <>
                    {!(i % 3) && (
                      <Grid container item xs={12} justifyContent="center">
                        {/* <Grid item xl={12} xs={12} key={i} sx={{ flexGrow: 1 }}> */}
                        {/* <Box sx={{ px: 2 }}> */}
                        {item.Subject}
                        {/* </Box> */}
                      </Grid>
                    )}

                    <Grid item xs={4} xl={4} justifyContent="center">
                      <Box sx={{ px: 2 }}>
                        <img src={item.Rank_Image} /> MarKs:{item.Marks}
                      </Box>
                      <br></br>
                      <ToppersList
                        headers={HeaderList1ST}
                        data={item.Students}
                      />
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          <Button
            onClick={onClickClose}
            variant="contained"
            color="error"
          >
            CLOSE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FinalResultToppers;
