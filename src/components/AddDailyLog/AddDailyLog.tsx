import React from 'react'
import PageHeader from 'src/libraries/heading/PageHeader'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store';
import { ISaveDailyLogBody,IGetAllHomeworkDailyLogsBody } from "src/interfaces/AddDailyLog/IAddDailyLog";
import { Savedailylog,getalldailylog } from 'src/requests/AddDailyLog/RequestAddDailyLog';

const AddDailyLog = () => {

  const dispatch = useDispatch();

  const SaveDailyLog = useSelector((state: RootState) => state.AddDailyLog.Savelog)
  console.log("SaveDailyLog", SaveDailyLog)
  const GetAllHomeworkDailyLogs = useSelector((state: RootState) => state.AddDailyLog.GetAllHomework)
  console.log("GetAllHomeworkDailyLogs", GetAllHomeworkDailyLogs)

  useEffect(() => {
    const SaveDailylogBody: ISaveDailyLogBody = {

        "asHomeWorkLogId":10,
        "asStdDivId":1266,
         "asAttachmentName":"ABC.pdf",
          "asSchoolId":18,
          "asAcademicYearId":54,
           "asInsertedById":4463
    }
    dispatch(Savedailylog(SaveDailylogBody))
  }, []);

//   useEffect(() => {
//     const GetAllHomeworkDailyLogsBody: IGetAllHomeworkDailyLogsBody = {

//         "asHomeWorkLogId":10,
//         "asStdDivId":1266,
//          "asAttachmentName":"ABC.pdf",
//           "asSchoolId":18,
//           "asAcademicYearId":54,
//            "asInsertedById":4463
//     }
//     dispatch(getalldailylog(GetAllHomeworkDailyLogsBody))
//   }, []);


  return (
    <div>
        <PageHeader heading='Add Daily Log' />
      
    </div>
  )
}

export default AddDailyLog
