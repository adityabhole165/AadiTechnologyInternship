import { Container, Typography, Grid, Card, Box } from '@mui/material'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IGetNoticeBoardDetailsBody } from "src/interfaces/Student/ISchoolNoticeBoard";
import { getSchoolNoticeBoard } from 'src/requests/SchoolNoticeBoard/requestSchoolNoticaBoard';
import { NoteStyle } from 'src/libraries/styled/NoteStyle';
import { CardDetail2 } from 'src/libraries/styled/CardStyle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { makeStyles } from '@mui/styles';
import Marquee from "react-fast-marquee";
// const useStyles = makeStyles((theme) => ({
//   scrollingText: {

//     width:"1000px",
//     animation: `$scroll 15s linear  infinite`,

//     animationDuration:"15s"


//   },
//   '@keyframes scroll': {
//     '0%': { transform: 'translateX(100%)' },
//     '100%': { transform: 'translateX(-100%)' },
//   },

// }));
function SchoolNoticeBoard() {
  // const classes = useStyles();

  const dispatch = useDispatch();
  const GetNoticeBoardList = useSelector(
    (state: RootState) => state.SchoolNoticeBoard.SchoolNoticeBoard
  );

  console.log(GetNoticeBoardList, "GetNoticeBoardList")

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserRoleId = sessionStorage.getItem('RoleId');



  const NoticeBoardbody: IGetNoticeBoardDetailsBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId,
    aiUserRoleId: asUserRoleId
  };

  useEffect(() => {
    dispatch(getSchoolNoticeBoard(NoticeBoardbody));
  }, []);



  const marqueeContent = GetNoticeBoardList.map(item => item.Message).join("   🔶  ").toString();

  return (
    <Container>
      <Card component={Box} mt={2} p={0.6}>
        <Marquee delay={1}>
          {/* {GetNoticeBoardList.length !==0 && <>  🔶  </> }   */}
          {GetNoticeBoardList.map((item, i) => (
          <div key={i}>
            <Box sx={{display:"flex"}}>
              <Typography sx={{ml:"10px"}}> 🔶</Typography>
            <Typography sx={{ml:"10px"}}>{item.Message}</Typography>
            </Box>
             
          </div>
          ))}
        </Marquee>
      </Card>


    </Container>
  )
}

export default SchoolNoticeBoard