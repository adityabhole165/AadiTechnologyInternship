import { Container, Typography, Grid, Card, Box } from '@mui/material'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IGetNoticeBoardDetailsBody } from "src/interfaces/Student/ISchoolNoticeBoard";
import { getSchoolNoticeBoard } from 'src/requests/SchoolNoticeBoard/requestSchoolNoticaBoard';
import { IGetAllActiveNoticesBody } from 'src/interfaces/Student/ISchoolNoticeBoard';
import { getAllActiveNotices } from 'src/requests/SchoolNoticeBoard/requestSchoolNoticaBoard';

import Marquee from "react-fast-marquee";
import { useNavigate } from 'react-router';
function SchoolNoticeBoard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserRoleId = sessionStorage.getItem('RoleId');
  const asUserId = sessionStorage.getItem('Id');

  const GetAllActiveNotices = useSelector((state: RootState) => state.SchoolNoticeBoard.AllActiveNotices);
  const GetNoticeBoardList = useSelector((state: RootState) => state.SchoolNoticeBoard.SchoolNoticeBoard);

  const NoticeBoardbody: IGetNoticeBoardDetailsBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiUserRoleId: asUserRoleId
  };
  const ActiveNoticesBody: IGetAllActiveNoticesBody = {
    asSchoolId: asSchoolId,
    asUserId: asUserId
  };

  useEffect(() => {
    dispatch(getSchoolNoticeBoard(NoticeBoardbody));
    dispatch(getAllActiveNotices(ActiveNoticesBody));
  }, []);

  useEffect(() => {
    let AllActiveNoticesId = GetAllActiveNotices.map((item) => {
      return item.Id
    })
    if (AllActiveNoticesId.length > 0) {
      if ((localStorage.getItem("AllActiveNotices") !== AllActiveNoticesId.toString())) {
        localStorage.setItem("AllActiveNotices", AllActiveNoticesId.toString())
        navigate('/extended-sidebar/Common/SchoolNotice');
      }
    }

  }, [GetAllActiveNotices])

  return (
    <Container>
      <Card component={Box} mt={2} p={0.6}>
        <Marquee delay={1}>
          {/* {GetNoticeBoardList.length !==0 && <>  🔶  </> }   */}
          {GetNoticeBoardList.map((item, i) => (
            <div key={i}>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ ml: "10px" }}> 🔶</Typography>
                <Typography sx={{ ml: "10px" }}>{item.Message}</Typography>
              </Box>

            </div>
          ))}
        </Marquee>
      </Card>


    </Container>
  )
}

export default SchoolNoticeBoard