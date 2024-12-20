// import { Box, Card, Typography } from '@mui/material';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   IGetAllActiveNoticesBody,
//   IGetNoticeBoardDetailsBody
// } from 'src/interfaces/Student/ISchoolNoticeBoard';
// import {
//   getAllActiveNotices,
//   getSchoolNoticeBoard
// } from 'src/requests/SchoolNoticeBoard/requestSchoolNoticaBoard';
// import { RootState } from 'src/store';

// import Marquee from 'react-fast-marquee';
// import { useNavigate } from 'react-router';
// function SchoolNoticeBoard() {
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
//   const asSchoolId = localStorage.getItem('localSchoolId');
//   const asUserRoleId = sessionStorage.getItem('RoleId');
//   const asUserId = sessionStorage.getItem('Id');

//   const GetAllActiveNotices = useSelector(
//     (state: RootState) => state.SchoolNoticeBoard.AllActiveNotices
//   );
//   const GetNoticeBoardList = useSelector(
//     (state: RootState) => state.SchoolNoticeBoard.SchoolNoticeBoard
//   );

//   const NoticeBoardbody: IGetNoticeBoardDetailsBody = {
//     aiSchoolId: asSchoolId,
//     aiAcademicYearId: asAcademicYearId,
//     aiUserRoleId: asUserRoleId
//   };
//   const ActiveNoticesBody: IGetAllActiveNoticesBody = {
//     asSchoolId: asSchoolId,
//     asUserId: asUserId
//   };

//   useEffect(() => {
//     dispatch(getSchoolNoticeBoard(NoticeBoardbody));
//     dispatch(getAllActiveNotices(ActiveNoticesBody));
//   }, []);

//   useEffect(() => {
//     let AllActiveNoticesId = GetAllActiveNotices.map((item) => {
//       return item.Id;
//     });
//     if (AllActiveNoticesId.length > 0) {
//       if (
//         localStorage.getItem('AllActiveNotices') !==
//         AllActiveNoticesId.toString()
//       ) {
//         localStorage.setItem('AllActiveNotices', AllActiveNoticesId.toString());
//         navigate('/RITeSchool/Common/SchoolNotice');
//       }
//     }
//   }, [GetAllActiveNotices]);

//   return (
//     <Box sx={{ px: 0.2}}>
//       <Card component={Box} mt={3} p={0.5}>
//         <Marquee delay={1}>
//           {/* {GetNoticeBoardList.length !==0 && <>  🔶  </> }   */}
//           {GetNoticeBoardList.map((item, i) => (
//             <div key={i}>
//               <Box sx={{ display: 'flex' }}>
//                 <Typography sx={{ ml: '10px' }}> 🔶</Typography>
//                 <Typography sx={{ ml: '10px' }}>{item.Message}</Typography>
//               </Box>
//             </div>
//           ))}
//         </Marquee>
//       </Card>
//     </Box>
//   );
// }

// export default SchoolNoticeBoard;

import { Box, Card, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetAllActiveNoticesBody, IGetNoticeBoardDetailsBody } from "src/interfaces/Student/ISchoolNoticeBoard";
import { getAllActiveNotices, getSchoolNoticeBoard } from 'src/requests/SchoolNoticeBoard/requestSchoolNoticaBoard';
import { RootState } from 'src/store';

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
    let newNotice = false
    //check if active notice exists
    if (AllActiveNoticesId.length > 0) {
      let NoticeRead = sessionStorage.getItem("NoticeRead"),
        jsonNoticeRead = null, userReadNotice = false
      //check from session if logged in user has read notice 

      if (NoticeRead !== null && NoticeRead !== undefined) {
        jsonNoticeRead = JSON.parse(NoticeRead)
        jsonNoticeRead.map((item) => {
          if (item.UserId == asUserId && item.NoticeRead == "Y") {
            userReadNotice = true
          }
        })
      }

      //if user not read the notice then check which notices read
      if (!userReadNotice) {
        let arr = [], noticeObj = null, userExists = false
        if (localStorage.getItem("ImportantNotices") !== null) {
          noticeObj = JSON.parse(localStorage.getItem("ImportantNotices").toString())
          //use this variable if ImportantNotices exists but not for logged in user
          let userExists = false
          noticeObj.map((item) => {
            if (item.UserId == asUserId) {
              userExists = true
              //these are  notices read by user
              arr = item.ids.split(",")
              //loop active notices and see if these are not in read notices
              AllActiveNoticesId.map((item) => {
                if (!arr.includes(item.toString())) {
                  newNotice = true
                }
              })
            }
          })
          if (!userExists)
            newNotice = true
        }
        else {
          newNotice = true
        }
      }

      let json = []

      //if notices not read, then send to notice page
      if (newNotice) {
        if (jsonNoticeRead !== null && jsonNoticeRead.length > 0) {
          let userExistsJson = false
          jsonNoticeRead.map((item) => {
            if (item.UserId == asUserId) {
              userExistsJson = true
            }
          })
          if (userExistsJson) {
            json = jsonNoticeRead.map((item) => {
              return { ...item, NoticeRead: item.UserId == asUserId ? "Y" : item.NoticeRead }
            })
          } else {
            json = [...jsonNoticeRead, { UserId: asUserId, NoticeRead: "Y" }]
          }
        }
        else {
          json = [{ UserId: asUserId, NoticeRead: "Y" }]
        }
        sessionStorage.setItem("NoticeRead", JSON.stringify(json))
        //navigate('/RITeSchool/Common/ActiveSchoolNotice');
      }
    }

  }, [GetAllActiveNotices])

  return (

    <Box>
      <Card component={Box} mt={2} p={0.3}>
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


    </Box>
  )
}

export default SchoolNoticeBoard