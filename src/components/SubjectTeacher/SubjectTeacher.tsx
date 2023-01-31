import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSubjectList } from 'src/requests/Student/SubjectTeacher';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import ISubjectTeacher, {
  GetSubjectTeacherResult
} from '../../interfaces/Student/SubjectTeacher';
import { Typography, useTheme, Container } from '@mui/material';
import PageHeader from 'src/libraries/heading/PageHeader';
import List1 from 'src/libraries/mainCard/List1';
import { CardDetail1 } from 'src/libraries/styled/CardStyle';
import { Header1 } from 'src/libraries/styled/AccordianStyled';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import List2 from 'src/libraries/mainCard/List2';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router';
import {IUsergroup} from 'src/interfaces/AdminSMSCenter/To1';
import {GetUser} from 'src/requests/AdminSMSCenter/To1';
function SubjectTeacher() {
  const dispatch = useDispatch();

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const asDivisionId = sessionStorage.getItem('DivisionId');
  const asUserId = sessionStorage.getItem('Id');

  const ClassTeachers: any = useSelector(
    (state: RootState) => state.SubjectTeacher.ClassTeachers
  );
  const SubjectTeachers = useSelector(
    (state: RootState) => state.SubjectTeacher.SubjectTeachers
  );
  const loading = useSelector(
    (state: RootState) => state.SubjectTeacher.Loading
  );
  const getuserlist: any = useSelector(
    (state: RootState) => state.getuser.GetUser
  );

  const body: ISubjectTeacher = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asStandardId: asStandardId,
    asDivisionId: asDivisionId,
    asUserId: asUserId
  };

  const getTeacherList = () => {
    // Teacher / Students / Other Staff / Admin Staff Body
  const getUsersInGroupAPIBody: IUsergroup = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asStdDivId: sessionStorage.getItem("StandardDivisionId"),
    asUserId: asUserId,
    asSelectedUserGroup: "2",
    abIsSMSCenter: false
  };
  dispatch(GetUser(getUsersInGroupAPIBody));
  }
  
  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getSubjectList(body));
    getTeacherList();
  }, []);

  let navigate = useNavigate();
  const clickItem = (value) =>  {
    value.map((item)=>{
      if(item.IsActive){
         const userArr = getuserlist.filter((obj)=>obj.Name.includes(item.header))
         let FromUserID = 0;
         if(userArr.length>0)
         {
          FromUserID = userArr[0].Id;
         }
         localStorage.setItem("ViewMessageData", JSON.stringify(
          {
            From: item.header,
            FromUserID: FromUserID,
            Text: "",
            Attachment: "",
            ID: ""
          }))
        navigate(item.NavPath)
      }
    })
  }
const Data = SubjectTeachers.map((item, index) => {
    return {
      Id: index,
      header: item.TeacherName,
      text1: item.Subject,
      Icon: < MailOutlineIcon/>,
      color: "#35abd9",
      NavPath:'/extended-sidebar/MessageCenter/Compose/'+ item.TeacherName, 
      IsActive: false
    };
  });
  return (
    <Container>
      <PageHeader heading={'Subject  Teachers'} subheading={''} />

      {ClassTeachers.map((items: GetSubjectTeacherResult, i) => (
        <CardDetail1  key={i}>
          {'Class Teacher'} : {items.TeacherName}
        </CardDetail1>
      ))}

      {loading ?
        <SuspenseLoader />
        :
        <List2 itemList={Data} clickItem={clickItem}/>
        
      }
    </Container>
  );
}

export default SubjectTeacher;
