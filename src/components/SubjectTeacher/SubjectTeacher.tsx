import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import PageHeader from 'src/libraries/heading/PageHeader';
import List2 from 'src/libraries/mainCard/List2';
import { CardDetail1 } from 'src/libraries/styled/CardStyle';
import { getSubjectList } from 'src/requests/Student/SubjectTeacher';
import { RootState } from 'src/store';
import ISubjectTeacher, {
  GetSubjectTeacherResult
} from '../../interfaces/Student/SubjectTeacher';
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
  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getSubjectList(body));
  }, []);

  let navigate = useNavigate();
  const clickItem = (value) => {
    value.map((item) => {
      if (item.IsActive) {
        localStorage.setItem(
          'ViewMessageData',
          JSON.stringify({
            From: item.header,
            FromUserID: item.UserId,
            Text: '',
            Attachment: '',
            ID: ''
          })
        );
        navigate(item.NavPath);
      }
    });
  };
  const Data = SubjectTeachers.map((item, index) => {
    return {
      Id: index,
      UserId: item.UserId,
      header: item.TeacherName,
      text1: item.Subject,
      Icon: <MailOutlineIcon />,
      color: '#35abd9',
      NavPath: '/RITeSchool/MessageCenter/Compose/',
      IsActive: false
    };
  });
  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Subject  Teachers'} subheading={''} />

      {ClassTeachers.map((items: GetSubjectTeacherResult, i) => (
        <CardDetail1 key={i}>
          {'Class Teacher'} : {items.TeacherName}
        </CardDetail1>
      ))}

      {loading ? (
        <SuspenseLoader />
      ) : (
        <List2 itemList={Data} clickItem={clickItem} />
      )}
    </Box>
  );
}

export default SubjectTeacher;
