import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AllExamData } from 'src/requests/Student/OnlineExam';
import { IOnlineExamQuestions } from 'src/interfaces/Student/OnlineExam';
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

    const msg = () => {
        alert("Are you sure you want to Submit the exam?")
        clearInterval(timer);
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

    return (
        <>
            <PageHeader heading={'Online Exam'} subheading={''} />
            <Container>
                <Typography sx={{ textAlign: 'center' }}><b>Exam Time: </b>{hours < 10 ? "0" + hours : hours}:{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</Typography>
                <Box sx={{ textAlign: 'center' }}> 
                <ListCard itemList={listCardItems} selectedItem={currentIndex} clickItem={clickItem} />
                </Box>
                {itemlist.length > 0 &&
                    <>
                        <Grid container xs={12} flexDirection='row'>
                            <Grid xs={10} />
                            <Grid xs={2}>
                                <Typography sx={{ textAlign: 'end', border: '1px solid grey' }}><b> Marks: </b>{itemlist[currentIndex].Parent.Marks} </Typography>
                            </Grid>
                        </Grid>
                        <Grid container xs={12}>
                            <Typography> {itemlist[currentIndex].Parent.Name}</Typography>
                        </Grid>
                        <ListSelect Itemlist={itemlist[currentIndex].Child} onChange={onChange} isSingleSelect={itemlist[currentIndex].Parent.isSingleSelect}></ListSelect>
                    </>
                }
                {currentIndex == maxIndex && <Box sx={{ mt: '-20px' }}><Attachments /></Box>}
                <Grid container spacing={2} sx={{ mt: '-10px' }}>
                    <Grid item xs={6}>
                        <ButtonPrimary fullWidth color='secondary' onClick={() => { clickPrevNext(-1) }}>
                            Previous
                        </ButtonPrimary>
                    </Grid>

                    <Grid item xs={6}>
                        {currentIndex == maxIndex ?
                            <ButtonPrimary fullWidth color='primary' onClick={msg}>
                                Submit
                            </ButtonPrimary>
                            :
                            <ButtonPrimary fullWidth color='primary' onClick={() => { clickPrevNext(1) }} >
                                Next
                            </ButtonPrimary>
                        }
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}

export default QueAns