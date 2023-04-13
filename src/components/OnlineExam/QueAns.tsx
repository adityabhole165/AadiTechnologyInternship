import { Box, Card, Grid, Typography,Stack, Avatar } from '@mui/material'
import React, { useState } from 'react'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AllExamData,GetSubmitExam } from 'src/requests/Student/OnlineExam';
import { IOnlineExamQuestions, ISubmitOnlineExamBody } from 'src/interfaces/Student/OnlineExam';
import ListSelect from 'src/libraries/list/ListSelect';
import TimerCard from 'src/libraries/list/TimerCard';
import ListCard from 'src/libraries/list/ListCard';
import { Container } from '@mui/system';
import PageHeader from 'src/libraries/heading/PageHeader';
import Attachments from 'src/libraries/buttons/Attachments';

const QueAns = () => {

    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(0)
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asStandardId = sessionStorage.getItem('StandardId');
    const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
    const asStudentId = sessionStorage.getItem('StudentId');
    const EXAMid = localStorage.getItem('Examid')
    const Subjectid = localStorage.getItem('SubjectId')
    const [itemlist, setItemlist] = useState([]);
    const [listCardItems, setListCardItems] = useState([])
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const GetAllAnswerQueListtt = useSelector(
        (state: RootState) => state.OnlineExam.ExamData
    );
    console.log("GetAllAnswerQueListtt",GetAllAnswerQueListtt);
    
    const Getsubmitexam = useSelector(
        (state: RootState) => state.OnlineExam.SubmitExam
    );
    // console.log("Getsubmitexam",Getsubmitexam);
    
    const QuestionsForOnlineExam: IOnlineExamQuestions = {
        aiSchoolId: asSchoolId,
        aiAcademicYrId: asAcademicYearId,
        asStandardId: asStandardId,
        asStdDivId: asStandardDivisionId,
        asSubjectId: Subjectid,
        asSchoolwiseTestId: EXAMid,
        asStudentId: asStudentId,
    };
   
    useEffect(() => {
        dispatch(AllExamData(QuestionsForOnlineExam))
    }, [])

    useEffect(() => {
        setItemlist(GetAllAnswerQueListtt)
        setListCardItems(GetAllAnswerQueListtt.map((item, index) => {
            return {
                Id: item.Parent.Id,
                Name: index,
                SerialNo: item.Parent.SerialNo,
                IsAnswered: false
            }
        }))
    }, [GetAllAnswerQueListtt])

    let maxIndex = itemlist.length - 1;
    const onChange = (value) => {
        setItemlist(prev =>
            prev.map((obj, i) => {
                if (i == currentIndex)
                    return { Parent: obj.Parent, Child: value }
                else return obj
            })
        )
        setListCardItems((prev) =>
            listCardItems.map((obj, i) => {
                if (i == currentIndex) {
                    return { ...obj, IsAnswered: getIsAnswer(value) }
                }
                else
                    return obj

            })
        )
    }


    const getIsAnswer = (value) => {
        let returnValue = false;
        value.map((obj) => {
            if (obj.isActive) {
                returnValue = true
            }
        })
        return returnValue;
    }
    const clickPrevNext = (counter) => {
        if (counter == 1) {
            if (currentIndex == maxIndex) {
                setCurrentIndex(0)
                return
            }
        }
        if (counter == -1) {
            if (currentIndex == 0) {
                setCurrentIndex(maxIndex)
                return
            }
        }
        setCurrentIndex(prev => { return prev + counter })
    }
    const clickItem = (value) => {
        setCurrentIndex(value)
    }


    var timer;

    useEffect(() => {
        timer = setInterval(() => {

            setSeconds(seconds + 1);

            if (seconds === 59) {
                setMinutes(minutes + 1);
                setSeconds(0);
            } if (minutes === 59) {
                setHours(hours + 1);
            }
        }, 1000)

        return () => clearInterval(timer);
    });
const ClickSubmit =()=>{
    alert("Are you sure you want to Submit the exam?")
    clearInterval(timer);
    const SubmitOnlineExam: ISubmitOnlineExamBody = {
        aiSchoolId: asSchoolId,
        aiAcademicYrId: asAcademicYearId,
        aiStandardId: asStandardId,
        aiSatandardDivisionId: asStandardDivisionId,
        aiSubjectId: Subjectid,
        aiExamId: EXAMid,
        aiStudentId: asStudentId,
    };
    dispatch(GetSubmitExam(SubmitOnlineExam))
}


    return (
        <>
            <PageHeader heading={'Online Exam'} subheading={''} />
            <Container>
                <Card sx={{py:1}}>
                <Typography sx={{ textAlign: 'center' }}><b>Exam Time: </b>{hours < 10 ? "0" + hours : hours}:{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</Typography>
             
                <Stack
                 direction="row"
                 justifyContent="center"
                 alignItems="center"
                 m={1}
                      >
               <Box sx={{height:"150px",width:"320px",overflow:"scroll",border: '2px solid grey'}} alignItems={"center"}> 
                <ListCard itemList={listCardItems} selectedItem={currentIndex} clickItem={clickItem} />
                </Box>   
               </Stack> 
               
                
               
                {itemlist.length > 0 &&
                    <>
                        <Grid container xs={12} flexDirection='row'sx={{mt:"8px"}}>
                            <Grid xs={10.3} />
                            <Grid xs={1.7} >
                                {/* <Typography sx={{ textAlign: 'center', border: '1px solid grey' }} ><b> Marks: </b>{itemlist[currentIndex].Parent.Marks} </Typography> */}
                                <Avatar  sx={{ textAlign: 'center', border: '2.5px solid grey' , backgroundColor:"white" , color:"#4b4b4b", width: 29, height: 29, fontSize: '10px',}}>{itemlist[currentIndex].Parent.Marks}M </Avatar>
                            </Grid>
                        </Grid>
                        <Grid container xs={12}>
                            <Typography p={1}> {itemlist[currentIndex].Parent.Name}</Typography>
                        </Grid>
                        <ListSelect Itemlist={itemlist[currentIndex].Child} onChange={onChange} isSingleSelect={itemlist[currentIndex].Parent.isSingleSelect}></ListSelect>
                    </>
                }
                {currentIndex == maxIndex && <Box sx={{ mt: '-20px', mr:"7px" }}><Attachments /></Box>}
                <Grid container spacing={1} sx={{ mt: '-10px' }} p={1}>
                    <Grid item xs={6}>
                        <ButtonPrimary fullWidth color='secondary' onClick={() => { clickPrevNext(-1) }}>
                            Previous
                        </ButtonPrimary>
                    </Grid>

                    <Grid item xs={6} >
                        {currentIndex == maxIndex ?
                            <ButtonPrimary fullWidth color='primary' onClick={ClickSubmit}>
                                Submit
                            </ButtonPrimary>
                            :
                            <ButtonPrimary fullWidth color='primary' onClick={() => { clickPrevNext(1) }} >
                                Next
                            </ButtonPrimary>
                        }
                    </Grid>
                </Grid>
                </Card>
            </Container>

        </>
    )
}

export default QueAns