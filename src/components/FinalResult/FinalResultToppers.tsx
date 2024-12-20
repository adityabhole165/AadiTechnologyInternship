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
  IGetClassexamDropdownBodyCT
} from 'src/interfaces/FinalResult/IFinalResultToppers';
import {
  ClassExamListCT,
  ClassSubjectListCT,
  ClassTopperListCT,
  ClassdropdownListCT
} from 'src/requests/FinalResult/RequestFinalResultToppers';

import QuestionMark from '@mui/icons-material/QuestionMark';
import { grey } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router';
import { IGetStandardDropdownBodyST, IGetStandardExamDropdownBodyST, IGetStandardToppersListBOdyST, IGetSubjectDropdownBodyST } from 'src/interfaces/FinalResult/IStandardToppers';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import ToppersList from 'src/libraries/list/ToppersList';
import { StandardDropdownListST, StandardExamListST, StandardSubjectListST, StandardTopperListST } from 'src/requests/FinalResult/RqstandardToppers';
import { RootState, useDispatch } from 'src/store';
// import BronzeMedal from '../../assets/img/medals/bronze-medal.png';
// import GoldMedal from '../../assets/img/medals/gold-medal.png';
// import SilverMedal from '/../assets/img/medals/silver-medal.png';

import CommonPageHeader from '../CommonPageHeader';

const FinalResultToppers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { TeacherId } = useParams();

  const [SelectClassCT, setClassCT] = useState(sessionStorage.getItem('StandardDivisionId'));
  const [SelectExamCT, setExamCT] = useState();
  const [SelectSubjectCT, setSubjectCT] = useState('0');
  const [StandardRadioCT, setStandardRadioCT] = useState();
  const [SelectStandardST, setStandardST] = useState(sessionStorage.getItem('StandardId'));
  const [SelectExamST, setExamST] = useState('0');
  const [SelectSubjectST, setSubjectST] = useState('0');
  const [showScreenOne, setShowScreenOne] = useState(true);
  const [radioBtn, setRadioBtn] = useState('1');
  const [HighlightStudentId, setHighlightStudentId] = useState('0')

  const [SubjectToppersListCT, setSubjectToppersListCT] = useState([])
  const [StandardToppersListST, setStandardToppersListST] = useState([])
  const [ClassToppersListCT, setClassToppersListCT] = useState([])
  const [SubjectToppersListST, setSubjectToppersListST] = useState([])
  console.log("ClassToppersListCT", ClassToppersListCT);

  const RadioListCT = [
    { Value: '1', Name: 'Class Toppers' },
    { Value: '2', Name: 'Standard Toppers' }
  ];

  const HeaderListCT = ['Rank', 'Roll No.', 'Student Name', 'Marks'];
  const HeaderList1CT = ['Roll No.', 'Student Name'];
  const HeaderListST = ['Rank', 'Class', 'Roll No.', 'Student Name', 'Marks'];
  const HeaderList1ST = ['Roll No.', 'Class', 'Student Name'];


  const data = [
    {
      rank: "1",
      students: [
        {
          rank: "1",
          rollNo: 3,
          studentName: "Student Name",
        },
      ]
    },
    {
      rank: "2",
      students: [
        {
          rank: "2",
          rollNo: 3,
          studentName: "Student Name",
        },

      ]
    },
    {
      rank: "3",
      students: [
        {
          rank: "3",
          rollNo: 3,
          studentName: "Student Name",
        },

      ]
    },
  ];

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
    (state: RootState) => state.StandardToppers.StandardDropdownListST
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
  // const getMedal = (rank) => {
  //   if (rank === 1) return GoldMedal;
  //   else if (rank === 2) return SilverMedal;
  //   else if (rank === 3) return BronzeMedal;
  //   else return null; // No medal for ranks beyond 3
  // };

  useEffect(() => {
    dispatch(ClassdropdownListCT(ClassDropdownBodyCT));
  }, []);



  useEffect(() => {
    dispatch(ClassExamListCT(ExamDropdownBodyCT));
  }, [SelectClassCT]);

  useEffect(() => {
    dispatch(ClassSubjectListCT(SujectDropdownBodyCT));
  }, [SelectClassCT, SelectExamCT]);

  useEffect(() => {
    dispatch(ClassTopperListCT(ToppersListBodyCT));
  }, [SelectClassCT, SelectExamCT, SelectSubjectCT]);

  // useEffect(() => {
  //   if (GetClassdropdownCT.length > 0) setClassCT(GetClassdropdownCT[0].Id);
  // }, [GetClassdropdownCT]);

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

  useEffect(() => {

    setClassToppersListCT(
      GetToppersListCT.map((Item) => {
        return {

          ...Item,
          IsHighlightStudent:
            Item.Id == HighlightStudentId ? true : false
        }
      })
    )
    setStandardToppersListST(
      GetStandardToppersListST.map((Item) => {
        return {
          ...Item,
          IsHighlightStudent:
            Item.Id == HighlightStudentId ? true : false
        }
      })
    )
    setSubjectToppersListCT(GetSubjectToppersListCT.map((Item) => {
      return {
        ...Item,
        Students: Item.Students.map((obj) => {
          return {
            ...obj,
            IsHighlightStudent:
              obj.Id == HighlightStudentId ? true : false
          }
        })
      }
    }))
    setSubjectToppersListST(GetSubjectToppersListST.map((Item) => {
      return {
        ...Item,
        Students: Item.Students.map((obj) => {
          return {
            ...obj,
            IsHighlightStudent:
              obj.Id == HighlightStudentId ? true : false
          }
        })
      }
    }))

  }, [HighlightStudentId])


  const ClassDropdownBodyCT: IGetClassDropdownBodyCT = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId

  };
  const ExamDropdownBodyCT: IGetClassexamDropdownBodyCT = {
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
    asAcademicYearId: asAcademicYearId
  };

  const ExamDropdownBodyST: IGetStandardExamDropdownBodyST = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: Number(SelectStandardST)
    // asSchoolId: 18,
    // asAcademicYearId: 54,
    // asStandardId: 1066
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
    setHighlightStudentId('0')
  };
  const onClickClose = () => {
    navigate('/RITeSchool/Teacher/FinalResult');
  };
  const clickHighlightStudent = (value) => {
    if (
      (radioBtn === '1' && SelectSubjectCT == "0") ||
      (radioBtn === '2' && SelectSubjectST == "0")
    )
      setHighlightStudentId(value)
    else
      setHighlightStudentId('0')
  }

  const ClickItem = () => { };
  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader navLinks={[
        {
          title: "Final Result",
          path: "/RITeSchool/Teacher/FinalResult"
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

          {radioBtn === '1' ? (

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
          ) : (
            <Box>
              <Dropdown
                size={"small"}
                Array={GetExamdropdownST}
                handleChange={clickExamDropdownST}
                defaultValue={SelectExamST}
                label={'Select Exam'}
                width={'200px'}
                variant={"outlined"}
              />
            </Box>
          )}

          {radioBtn === '1' ? (

            <Box>
              <Dropdown
                size={"small"}
                Array={GetSubjectdropdownCT}
                handleChange={clickSubjectDropdownCT}
                defaultValue={SelectSubjectCT}
                label={'Select Subject'}
                width={'200px'}
                variant={"outlined"}
              />
            </Box>
          ) : (
            <Box>
              <Dropdown
                size={"small"}
                Array={GetSubjectdropdownST}
                handleChange={clickSubjectDropdownST}
                defaultValue={SelectSubjectST}
                label={'Select Subject'}
                width={'200px'}
                variant={"outlined"}
              />
            </Box>
          )}


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
              {SelectExamCT && (
                <Typography variant="h3" sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white
                }}>

                  {GetExamdropdownCT.map((item) => {
                    return item.Value === SelectExamCT ? item.Name : null;
                  })}
                </Typography>
              )}

              <DynamicList2
                HeaderList={HeaderListCT}
                ItemList={ClassToppersListCT}
                IconList={[]}
                ClickItem={clickHighlightStudent}
              />
              <Typography variant={"h4"} mt={4}>
                Subject Toppers
              </Typography>
              <Grid container>
                {SubjectToppersListST.map((item, i) => {
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
                          {/* <img src={getMedal(i + 1)} /> */}
                          {/* Marks: {item.Marks} */}
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

            {SelectExamST && (
              <Typography variant="h3" sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white
              }}>

                {GetExamdropdownST.map((item) => {
                  return item.Value === SelectExamST ? item.Name : null;
                })}
              </Typography>
            )}

            <DynamicList2
              HeaderList={HeaderListST}
              ItemList={StandardToppersListST}
              IconList={[]}
              ClickItem={clickHighlightStudent}
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

export default FinalResultToppers;       //  FinalResultToppers
