import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import DropdownandList from 'src/libraries/Page/DropdownandList'


function OnlineExamProgressReport() {
    const dispatch = useDispatch();
    // const [exam, setExam] = useState("");

    // const OnlineExams: any = useSelector(
    //     (state: RootState) => state.ExamOnlineReport.OnlineExams);
        
    //     const getExamDetailslist: any = useSelector(
    //         (state: RootState) => state.ExamOnlineReport.getExamDetailslist);

    // useEffect(() => {
    //     dispatch(GetOnlineExamProgressReportDetails(GetOnlineExamProgressReportDetailsBody))
    // },[])

    // useEffect(()=> {
    //     dispatch(GetExamDetailsList(GetExamDetailsListBody));
    //      },[exam])

    // const onChangeExam = (value) => {
    //     let exam = ""
    //     value.map((item) => {
    //         if (item.IsActive)
    //             exam = item.Value
    //     })
    //     setExam(exam)
    // }

    return (
        <div>
            {/* <DropdownandList
                heading={"Online Exam Progress Report"}
                Itemlist={OnlineExams}
                onChange={onChangeExam}
                Label={"Exam"}
                DefaultValue={exam}
                CardItemlist={""}
            /> */}
        </div>
    )
}

export default OnlineExamProgressReport