import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import OnlineExamProgressReport from "src/interfaces/Student/OnlineExamProgressReport";
import PageHeader from 'src/libraries/heading/PageHeader';
import { getHeader } from 'src/requests/Student/OnlineExamProgressReport';
import Card30 from 'src/libraries/card/Card30';
import { Container } from '@mui/material';
import Card28 from 'src/libraries/card/Card28';
import DropdownAllSelect from 'src/libraries/dropdown/DropdownAllSelect';

function OnlineExamReport() {
    const dispatch = useDispatch();
    const Header = useSelector(
        (state: RootState) => state.ExamOnlineReport.Header
    );
    console.log("Header",Header)
    // const GetOnlineProgressReport: any = useSelector(
    //     (state: RootState) => state.ExamOnlineReport.GetOnlineProgressReport
    // );

    const [user, setUser]= useState("");

    const ClickMe =(value)=>{
        setUser(value)
    }
    const UserArray2 = [
        {
            Name: "All",
            Id: "1"
        },
        {
            Name: "Test1",
            Id: "2"
        },
        {
            Name: "Test2",
            Id: "3"
        },];

    // useEffect(() => {
    //     localStorage.setItem("url", window.location.pathname)
    //     const ExamDetails: OnlineExamProgressReport = {
    //         aiStudentId: sessionStorage.getItem('StudentId'),
    //         aiSchoolId: localStorage.getItem('localSchoolId'),
    //         aiAcademicYrId: sessionStorage.getItem('AcademicYearId'),
    //         asStdDivId: sessionStorage.getItem('StandardDivisionId')
    //     };
    //     dispatch(getHeader(ExamDetails));

    // }, []);
    return (
        <Container>

            <PageHeader heading={'Online Exam Progress Report'} subheading={''} />
            <DropdownAllSelect
            Array={UserArray2}
            handleChange={ClickMe}
            defaultValue={user}/>

            {/* {Header === null ? null : <>
                <Card28 Student={Header.Students} />

                <Card30 header={Header.Header}></Card30>
            </>} */}
        </Container>
    );
}
export default OnlineExamReport;
