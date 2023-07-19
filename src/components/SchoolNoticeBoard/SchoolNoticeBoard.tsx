import {  Container, Typography } from '@mui/material'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IGetNoticeBoardDetailsBody } from "src/interfaces/Student/ISchoolNoticeBoard";
import { getSchoolNoticeBoard } from 'src/requests/SchoolNoticeBoard/requestSchoolNoticaBoard';
import { NoteStyle } from 'src/libraries/styled/NoteStyle';
import { CardDetail2 } from 'src/libraries/styled/CardStyle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
function SchoolNoticeBoard() {
    
    const dispatch = useDispatch();
    const GetNoticeBoardList = useSelector(
        (state: RootState) => state.SchoolNoticeBoard.SchoolNoticeBoard
      );

      const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
      const asSchoolId = localStorage.getItem('localSchoolId');
      const asUserRoleId = sessionStorage.getItem('RoleId');
     
     

      const NoticeBoardbody: IGetNoticeBoardDetailsBody = {
        aiSchoolId:asSchoolId,
        aiAcademicYearId:asAcademicYearId,
        aiUserRoleId:asUserRoleId
      };

      useEffect(() => {
        dispatch(getSchoolNoticeBoard(NoticeBoardbody));
      }, []);
  return (
    <Container>
     
   
   
        <NoteStyle sx={{mt:"10px"}}>
        <CardDetail2>
        <b>Note :</b>
        { GetNoticeBoardList.map((item,i)=>{
                      return(
                          <div key={i} style={{display:'flex'}}>
                            <FiberManualRecordIcon sx={{fontSize:"10px", mt:"4px"}}/> 
                            <Typography ml={0.5}>  {item.Message}</Typography>
                           </div>
                      )
                  })
              }
        </CardDetail2>
      </NoteStyle>



    </Container>
  )
}

export default SchoolNoticeBoard