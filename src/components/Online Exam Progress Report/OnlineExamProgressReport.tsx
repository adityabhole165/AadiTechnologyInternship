import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import OnlineExamProgressReport, { OnlineExamResult, OnlineExams, MarkInformation }
    from "src/interfaces/Student/OnlineExamProgressReport";
import PageHeader from 'src/libraries/heading/PageHeader';
import {getHeader} from 'src/requests/Student/OnlineExamProgressReport';
import Card30 from 'src/libraries/card/Card30';
import { Container } from '@mui/material';
import MessageList from '../MessageCenter/MessageList';
function OnlineExamReport() {
    const dispatch = useDispatch();
    const  Header = useSelector(
        (state: RootState) => state.ExamOnlineReport.Header
    );

    useEffect(() => {
        localStorage.setItem("url",window.location.pathname)
        const ExamDetails: OnlineExamProgressReport = {
            aiStudentId: sessionStorage.getItem('StudentId'),
            aiSchoolId: localStorage.getItem('localSchoolId'),
            aiAcademicYrId: sessionStorage.getItem('AcademicYearId'),
            asStdDivId: sessionStorage.getItem('StandardDivisionId')
        };
        dispatch(getHeader(ExamDetails));
        
    }, []);
    return (
        <Container>
           
            <PageHeader heading={'Online Progress Report'} subheading={''} />
           
            <Card30 header={Header}></Card30>

        </Container>
    );
}
export default OnlineExamReport;
