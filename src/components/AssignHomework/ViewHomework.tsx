
import { Box } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams } from "react-router"
import { IGetHomeworkDetailBody } from 'src/interfaces/AssignHomework/IAddHomework';
import {  GetHomeworkDetails,  } from "src/requests/AssignHomework/requestViewHomework";
import { RootState } from 'src/store';

const ViewHomework = () => {
    const dispatch = useDispatch();
    const { Id} = useParams();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const HomeworkDetail :any = useSelector((state: RootState) => state.ViewHomework.GetHomeworkDetail);
  
    const GetHomeworkDetailBody: IGetHomeworkDetailBody = {
        asSchoolId: asSchoolId,
        asAcademicyearId: asAcademicYearId,
        asHomeworkId: Number(Id),
        
      }
      useEffect(() => {
        dispatch(GetHomeworkDetails(GetHomeworkDetailBody))
      }, []);
    return (
    <>
    <br></br>
    <br></br>
    <br></br>
        <Box>
            
        {HomeworkDetail.length>0 &&
        (<>Title:  {HomeworkDetail[0].Title}</>)
        
    } </Box>
    <br></br>
     {HomeworkDetail.length>0 &&
        (<>Subject:  {HomeworkDetail[0].Subject}</>)
        
    }
    <br />
    {HomeworkDetail.length>0 &&
        (<> CompleteByDate :   {HomeworkDetail[0]. CompleteByDate  }</>)
        
    }
    <br />
    {HomeworkDetail.length>0 &&
        (<> Attachment  :   {HomeworkDetail[0]. Attachment   }</>)
        
    }
    <br></br>
    {HomeworkDetail.length>0 &&
        (<> MoreAttachment: {HomeworkDetail[0].AttachmentPath   }</>)
        
    }
    <br></br>
    {HomeworkDetail.length>0 &&
        (<>  Details : {HomeworkDetail[0]. Details   }</>)
        
    }
    <br></br>
    </>
  )
}

export default ViewHomework