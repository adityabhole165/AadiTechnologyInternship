import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import DropdownandList from 'src/libraries/Page/DropdownandList'
import IOnlineExamProgressReportBody from 'src/interfaces/Student/OnlineExamProgressReport';
import { getOnlineExams } from 'src/requests/Student/OnlineExamProgressReport';
import { Container } from '@mui/material';


function OnlineExamProgressReport() {
    const dispatch = useDispatch();
    const [exam, setExam] = useState("");

    const OnlineExams: any = useSelector(
        (state: RootState) => state.ExamOnlineReport.OnlineExams);

    const getExamDetailslist: any = useSelector(
        (state: RootState) => state.ExamOnlineReport.getExamDetailslist);

    useEffect(() => {
        const OnlineExamProgressReportBody: IOnlineExamProgressReportBody = {
            aiStudentId: sessionStorage.getItem('StudentId'),
            aiSchoolId: localStorage.getItem('localSchoolId'),
            aiAcademicYrId: sessionStorage.getItem('AcademicYearId'),
            asStdDivId: sessionStorage.getItem('StandardDivisionId')
        }
        dispatch(getOnlineExams(OnlineExamProgressReportBody));
    }, [])

    const onChangeExam = (value) => {
        let exam = ""
        value.map((item) => {
            if (item.IsActive)
                exam = item.Value
        })
        setExam(exam)
    }

    return (
        <Container>
            <DropdownandList heading={"Online Exam Progress Report"}
                Itemlist={OnlineExams} onChange={onChangeExam}
                Label={""} DefaultValue={exam}
                CardItemlist={getExamDetailslist.filter((item) => item.ExamId.toString() === exam.toString())}
            />
        </Container>
    )
}

export default OnlineExamProgressReport