import React, { useEffect, useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import { IStudentsDetails } from 'src/interfaces/Teacher/TAttendance';
import List26 from 'src/libraries/list/List26'
import { GetStudentDetailsList, GetStudentList } from 'src/requests/TAttendance/TAttendance';
import { RootState } from 'src/store';
import ITAttendance, { GetStandardDivisionsResult } from 'src/interfaces/Teacher/TAttendance';
import { getAttendanceDataList, getStandardList,GetAttendanceStatus } from 'src/requests/TAttendance/TAttendance';
import { Container, FormControl, NativeSelect, TextField } from '@mui/material';
import PageHeader from 'src/libraries/heading/PageHeader';


const TeacherAttendance = () => {
    const dispatch = useDispatch();

    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asStandardDivisionId = sessionStorage.getItem('DivisionId');
    const asTeacherId = sessionStorage.getItem('TeacherId');

    const [StandardId, setStandardId] = useState();


    const RollNoList = useSelector(
        (state: RootState) => state.AttendanceList.StudentList
      );
console.log("RollNoList",RollNoList);

const StandardAttendance: any = useSelector(
    (state: RootState) => state.StandardAttendance.StandardDivisionAttendance
  );

      const GetStudentDetails: IStudentsDetails = {
        asStdDivId: "86",
        asDate: "31-March-2022",
        asAcademicYearId: "8",
        asSchoolId: "120"
      };

      const TeacherStandard: ITAttendance = {
        asSchoolId: asSchoolId,
        asAcademicyearId: asAcademicYearId,
        asTeacherId: asTeacherId
      };
      
      useEffect(() => {
        dispatch(GetStudentList(GetStudentDetails));
      }, []);
      
  useEffect(() => {
    dispatch(getStandardList(TeacherStandard));
  }, [StandardId]);

  const handleChange = (e) => {
    setStandardId(e.target.value);
  };
  return (
    <>
      <PageHeader heading={'Attendance'} subheading={''} />
    <Container>
        {StandardAttendance.length > 1 ? (
          <FormControl variant="standard" fullWidth sx={{ m: 1, mb: 2 }}>
            <NativeSelect
              sx={{ mr: '14px', ml: '-8px' }}
              onChange={(e) => handleChange(e)}
            >
              <option>Select Class</option>
              {StandardAttendance.map(
                (items: GetStandardDivisionsResult, i) => {
                  return (
                    <>
                      <option value={items.Id} key={i}>
                        {items.Class}
                      </option>
                    </>
                  );
                }
              )}
            </NativeSelect>
          </FormControl>
        ) : (
          StandardAttendance.map((items: GetStandardDivisionsResult, i) => {
            return (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  label={'Class'}
                  variant="standard"
                  key={i}
                  value={items.Class}
                  sx={{ mt: '-0.3rem' }}
                >
                  {items.Class}
                </TextField>
              </>
            );
          })
        )}
      </Container>
<List26 Dataa={RollNoList}/>
    </>
  )
}

export default TeacherAttendance