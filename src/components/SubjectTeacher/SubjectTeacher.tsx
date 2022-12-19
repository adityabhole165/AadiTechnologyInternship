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

  const Data = SubjectTeachers.map((item, index) => {
    return {
      id: index,
      header: item.TeacherName,
      text1: item.Subject
    };
  });

  return (
    <Container>
      <PageHeader heading={'Subject  Teachers'} subheading={''} />

      {ClassTeachers.map((items: GetSubjectTeacherResult, i) => (
        <CardDetail1 marginBottom="1rem" key={i}>
          {'Class Teacher'} : {items.TeacherName}
        </CardDetail1>
      ))}

      {loading ?
        <SuspenseLoader />
        :
        <List1 items={Data}></List1>
      }
    </Container>
  );
}

export default SubjectTeacher;
