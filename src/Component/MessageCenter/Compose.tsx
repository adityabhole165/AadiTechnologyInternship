import React, { useEffect } from 'react'
import PageHeader from "src/UI_Library/heading/PageHeader";
import Messagecenter from "src/Component/MessageCenter/Messagecenter";
import BackButton from 'src/UI_Library/button/BackButton'
import { Box, Grid } from '@mui/material';
import { IUserGroupList,IGetUsersInGroupResult} from "../../Interface/MessageCenter/MessageCenter";
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherList,getAdminstaffList } from 'src/Client_Api/MessageCenter/MessaageCenter';
import { RootState} from 'src/store';
import Form13 from './Composee'

export const Composee = () => {
 
  const dispatch = useDispatch()

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const asDivisionId = sessionStorage.getItem('DivisionId');
  const asUserId = sessionStorage.getItem('Id');


  const teacherList: IUserGroupList = {
    "asAcademicYearId": asAcademicYearId,
    "asSchoolId": asSchoolId,
    "asStdDivId": asDivisionId,
    "asUserId": asUserId,
    "asSelectedUserGroup": "2",
    "abIsSMSCenter": false
  }

  const AdminstaffList: IUserGroupList = {
    "asAcademicYearId": asAcademicYearId,
    "asSchoolId": asSchoolId,
    "asStdDivId": asDivisionId,
    "asUserId": asUserId,
    "asSelectedUserGroup": "6",
    "abIsSMSCenter": false
  }

  useEffect(() => {
    dispatch(getTeacherList(teacherList))
    dispatch(getAdminstaffList(AdminstaffList))
  }, [])


  return (
    <div>
      <PageHeader heading={"Compose Message"} subheading={""} />
         {/* <Form1/>  */}

       <Form13 />
    </div>
  )
}
export default Composee;