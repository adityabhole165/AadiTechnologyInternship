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

  const body: ISubjectTeacher = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asStandardId: asStandardId,
    asDivisionId: asDivisionId,
    asUserId: asUserId
  };
  useEffect(() => {
    localStorage.setItem("url",window.location.pathname)
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
    <>
      <PageHeader heading={'Subject  Teachers'} subheading={''} />
      <Container>
        {ClassTeachers.map((items: GetSubjectTeacherResult, i) => (
          <>
            <div style={{ flexDirection: 'row' }}>
              <Typography
                variant="body2"
                fontSize="0.8rem"
                marginLeft="0.2rem"
                marginBottom="1rem"
                key={i}
              >
                <b>
                  {'Class Teacher'} : {items.TeacherName}
                </b>
              </Typography>
            </div>
          </>
        ))}
      </Container>

      {<List1 items={Data}></List1>}
    </>
  );
}

export default SubjectTeacher;
