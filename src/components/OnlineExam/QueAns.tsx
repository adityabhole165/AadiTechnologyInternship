import { Avatar, Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  IOnlineExamQuestions,
  ISubmitOnlineExamBody
} from 'src/interfaces/Student/OnlineExam';
import BackButton from 'src/libraries/button/BackButton';
import Attachments from 'src/libraries/buttons/Attachments';
import PageHeader from 'src/libraries/heading/PageHeader';
import ListCard from 'src/libraries/list/ListCard';
import ListSelect from 'src/libraries/list/ListSelect';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  AllExamData,
  GetExamSchedulesListList,
  GetSaveExam,
  GetSubmitExam,
  resetSaveMsg,
  resetSubmitMsg
} from 'src/requests/Student/OnlineExam';
import { RootState } from 'src/store';

const QueAns = () => {
  const dispatch = useDispatch();
  const Ref = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const EXAMid = localStorage.getItem('Examid');
  const Subjectid = localStorage.getItem('SubjectId');
  const [itemlist, setItemlist] = useState([]);
  const [listCardItems, setListCardItems] = useState([]);

  const [showSaveSubmit, setshowSaveSubmit] = useState(true);

  const GetAllAnswerQueListtt = useSelector(
    (state: RootState) => state.OnlineExam.ExamData
  );
  // console.log(GetAllAnswerQueListtt ,"GetAllAnswerQueListtt")

  const Getsubmitexam = useSelector(
    (state: RootState) => state.OnlineExam.SubmitExam
  );

  const Getsaveexam = useSelector(
    (state: RootState) => state.OnlineExam.SaveExam
  );

  const GetExamSchedules = useSelector(
    (state: RootState) => state.OnlineExam.ExamSchedulesList
  );

  const startTime =
    parseInt(GetExamSchedules[0].StartTime.split(':')[0]) * 60 * 60 +
    parseInt(GetExamSchedules[0].StartTime.split(':')[1]) * 60;
  const endTime =
    parseInt(GetExamSchedules[0].EndTime.split(':')[0]) * 60 * 60 +
    parseInt(GetExamSchedules[0].EndTime.split(':')[1]) * 60;
  const [time, setTime] = useState(
    localStorage.getItem('timerState') == '0'
      ? endTime - startTime
      : Number(localStorage.getItem('timerState'))
  );

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''
      }${remainingSeconds}`;
  };
  const OutofMarks = itemlist.map((item) => {
    return { AddMarks: item.Parent };
  });

  const totalMarks = () => {
    let totalMarks = 0;
    itemlist.map((item) => {
      item.Child.map((obj) => {
        if (
          obj.IsCorrectAnswer === true &&
          obj.IsCorrectAnswer === obj.isActive
        ) {
          totalMarks = totalMarks + item.Parent.Marks;
        }
      });
    });
    return totalMarks;
  };

  const OutOfMarks = OutofMarks.reduce(
    (total, currentValue) => (total = total + currentValue.AddMarks.Marks),
    0
  );

  const getQuestionAnser = () => {
    return itemlist.map((item, i) => {
      return {
        QuestionId: item.Parent.Id,
        AnswerId: getAnsweredQuestion(item),
        DescriptionFileName: ''
      };
    });
  };
  const getAnsweredQuestion = (value) => {
    const list = value.Child.filter((item) => {
      return item.isActive;
    });
    if (list.length > 0) return list[0].Id;
    else return '';
  };

  const saveBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiStandardId: asStandardId,
    aiStandardDivisionId: asStandardDivisionId,
    aiSubjectId: Subjectid,
    aiExamId: EXAMid,
    aiStudentId: asStudentId,
    aiTotalMarks: totalMarks().toString(),
    aiOutOfMarks: OutOfMarks,
    aiInsertedById: '',
    asAttachmentBase64String: '',
    alstQuestAnswerDetails: getQuestionAnser()
  };

  const SaveExam = () => {
    dispatch(GetSaveExam(saveBody));
  };
  const QuestionsForOnlineExam: IOnlineExamQuestions = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    asStandardId: asStandardId,
    asStdDivId: asStandardDivisionId,
    asSubjectId: Subjectid,
    asSchoolwiseTestId: EXAMid,
    asStudentId: asStudentId
  };
  const SubmitOnlineExam: ISubmitOnlineExamBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiStandardId: asStandardId,
    aiStandardDivisionId: asStandardDivisionId,
    aiSubjectId: Subjectid,
    aiExamId: EXAMid,
    aiStudentId: asStudentId
  };

  useEffect(() => {
    dispatch(GetExamSchedulesListList(QuestionsForOnlineExam));
    dispatch(AllExamData(QuestionsForOnlineExam));
  }, []);
  let IsExamSubmitted = '';
  useEffect(() => {
    if (GetAllAnswerQueListtt !== undefined) {
      const ii = GetAllAnswerQueListtt.map((item, i) => {
        return (IsExamSubmitted = item.Parent.IsExamSubmitted);
      });
    }
  }, [GetAllAnswerQueListtt]);

  useEffect(() => {
    if (Getsubmitexam !== null && Getsubmitexam !== '') {
      toast.success(Getsubmitexam, { toastId: 'success1' });
      dispatch(resetSubmitMsg());
      setTimeout(() => {
        window.location.href = '/RITeSchool/Student/OnlineExam';
      }, 2000);
    }
    if (Getsaveexam !== null && Getsaveexam !== '') {
      toast.success(Getsaveexam, { toastId: 'success1' });
      dispatch(resetSaveMsg());
    }
  }, [Getsubmitexam, Getsaveexam]);

  useEffect(() => {
    if (GetAllAnswerQueListtt.length > 0) {
      // setshowSaveSubmit(GetAllAnswerQueListtt[0].IsExamSubmitted)
      if (IsExamSubmitted) {
        setshowSaveSubmit(false);
      } else {
        setshowSaveSubmit(true);
      }
      setItemlist(GetAllAnswerQueListtt);
      setListCardItems(
        GetAllAnswerQueListtt.map((item, index) => {
          return {
            Id: item.Parent.Id,
            Name: index,
            SerialNo: item.Parent.SerialNo,
            IsAnswered: false
          };
        })
      );
    }
  }, [GetAllAnswerQueListtt]);

  let maxIndex = itemlist.length - 1;
  const onChange = (value) => {
    setItemlist((prev) =>
      prev.map((obj, i) => {
        if (i == currentIndex) return { Parent: obj.Parent, Child: value };
        else return obj;
      })
    );
    setListCardItems((prev) =>
      listCardItems.map((obj, i) => {
        if (i == currentIndex) {
          return { ...obj, IsAnswered: getIsAnswer(value) };
        } else return obj;
      })
    );
  };

  const getIsAnswer = (value) => {
    let returnValue = false;
    value.map((obj) => {
      if (obj.isActive) {
        returnValue = true;
      }
    });
    return returnValue;
  };
  const clickPrevNext = (counter) => {
    if (counter == 1) {
      if (currentIndex == maxIndex) {
        setCurrentIndex(0);
        return;
      }
    }
    if (counter == -1) {
      if (currentIndex == 0) {
        setCurrentIndex(maxIndex);
        return;
      }
    }
    setCurrentIndex((prev) => {
      return prev + counter;
    });
  };
  const clickItem = (value) => {
    setCurrentIndex(value);
  };

  const ClickSubmit = () => {
    let text = 'Are you sure you want to Submit the exam?';
    if (window.confirm(text) === true) {
      dispatch(GetSubmitExam(SubmitOnlineExam));
    }
    clearInterval(time);
  };

  useEffect(() => {
    localStorage.setItem('timerState', time.toString());

    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(interval);
        dispatch(GetSaveExam(saveBody));
        dispatch(GetSubmitExam(SubmitOnlineExam));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <>
      <PageHeader heading={'Online Exam'} subheading={''} />
      <Box sx={{ px: 2 }}>
        {GetAllAnswerQueListtt.map((item, i) => {
          return (
            item.Parent.IsExamSubmitted == true && (
              <BackButton FromRoute={'/Student/OnlineExam'} />
            )
          );
        })}
        <Card sx={{ py: 1 }}>
          {showSaveSubmit && (
            <>
              {GetExamSchedules.length > 0 && (
                <Box sx={{ textAlign: 'center' }}>
                  <p>
                    <b>Exam Time: </b> {formatTime(time)}
                  </p>
                </Box>
              )}
            </>
          )}

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            m={1}
          >
            <Box
              sx={{
                height: '150px',
                width: '320px',
                overflow: 'scroll',
                border: '1px solid grey'
              }}
              alignItems={'center'}
            >
              <ListCard
                itemList={listCardItems}
                selectedItem={currentIndex}
                clickItem={clickItem}
              />
            </Box>
          </Stack>
          <Grid container spacing={1} sx={{ mt: '-20px' }} p={1}>
            <Grid item xs={6}>
              <Box sx={{ px: 2 }}>
                <ButtonPrimary
                  fullWidth
                  onClick={() => {
                    clickPrevNext(-1);
                  }}
                >
                  Previous
                </ButtonPrimary>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ px: 2 }}>
                <ButtonPrimary
                  fullWidth
                  onClick={() => {
                    clickPrevNext(1);
                  }}
                >
                  Next
                </ButtonPrimary>
              </Box>
            </Grid>
          </Grid>

          {itemlist.length > 0 && (
            <>
              {/* <Typography>{Getsaveexam.Message}</Typography> */}
              <Grid container xs={12} flexDirection="row" sx={{ mt: '8px' }}>
                <Grid xs={10.3} />
                <Grid xs={1.7}>
                  {/* <Typography sx={{ textAlign: 'center', border: '1px solid grey' }} ><b> Marks: </b>{itemlist[currentIndex].Parent.Marks} </Typography> */}
                  <Avatar
                    sx={{
                      textAlign: 'center',
                      border: '1.5px solid grey',
                      backgroundColor: 'white',
                      color: '#4b4b4b',
                      width: 25,
                      height: 25,
                      fontSize: '10px'
                    }}
                  >
                    {itemlist[currentIndex].Parent.Marks}M{' '}
                  </Avatar>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={1}>
                  {listCardItems.map((item, i) => {
                    return (
                      <>
                        {' '}
                        {currentIndex == item.Name && (
                          <Typography key={i} pt={1} pl={1.8}>
                            {' '}
                            {item.SerialNo}{' '}
                          </Typography>
                        )}
                      </>
                    );
                  })}
                </Grid>
                <Grid item xs={11}>
                  <Typography p={1}>
                    {' '}
                    {itemlist[currentIndex].Parent.Name}
                  </Typography>
                  {itemlist[currentIndex].Parent.path && (
                    <Box ml={3}>
                      <Avatar
                        alt="user.name"
                        src={
                          localStorage.getItem('SiteURL') +
                          'RITeSchool/Uploads/OnlineExamImages/' +
                          itemlist[currentIndex].Parent.path
                        }
                        sx={{
                          width: '180px',
                          height: '160px',
                          border: '2px solid gray',
                          textAlign: 'center'
                        }}
                        variant="square"
                        aria-label="add"
                      ></Avatar>
                    </Box>
                  )}
                </Grid>
              </Grid>

              <ListSelect
                Itemlist={itemlist[currentIndex].Child}
                onChange={onChange}
                isSingleSelect={itemlist[currentIndex].Parent.isSingleSelect}
              ></ListSelect>
            </>
          )}

          {currentIndex == maxIndex && (
            <Box sx={{ mt: '-30px', mr: '11px', ml: '25px' }}>
              <Attachments />
            </Box>
          )}
          {showSaveSubmit && (
            <>
              <Grid container spacing={1} sx={{ mt: '-20px' }} p={1}>
                <>
                  <Grid container spacing={1} sx={{ mt: '-13px' }} p={1}></Grid>
                  <Grid item xs={6}>
                    <Box sx={{ px: 2 }}>
                      <ButtonPrimary fullWidth onClick={SaveExam}>
                        Save
                      </ButtonPrimary>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ px: 2 }}>
                      {currentIndex == maxIndex && (
                        <ButtonPrimary fullWidth onClick={ClickSubmit}>
                          Submit
                        </ButtonPrimary>
                      )}
                    </Box>
                  </Grid>
                </>
              </Grid>
            </>
          )}
        </Card>
      </Box>
    </>
  );
};

export default QueAns;
