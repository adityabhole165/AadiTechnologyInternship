
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetClassTeachersBody,IGetStudentNameDropdownBody } from "src/interfaces/ProgressReport/IprogressReport";
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetClassTeachers,CDAGetStudentName } from 'src/requests/ProgressReport/ReqProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const ProgressReportNew = () => {
    const dispatch = useDispatch();
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const TeacherId = sessionStorage.getItem('TeacherId');
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const [selectTeacher, SetselectTeacher] = useState('');
    const [StudentList, SetStudentList] = useState('');

    const USGetClassTeachers: any = useSelector(
        (state: RootState) => state.ProgressReportNew.ISGetClassTeachers
    );
    const USGetStudentNameDropdown: any = useSelector(
        (state: RootState) => state.ProgressReportNew.ISGetStudentNameDropdown
    );

    const GetClassTeachersBody: IGetClassTeachersBody ={
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asTeacherId: Number(TeacherId)
    };

    const GetStudentNameDropdownBody: IGetStudentNameDropdownBody ={
        asSchoolId:Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asStandardDivisionId:asStandardDivisionId
       
    };

    const clickSelectClass = (value) => {
      SetselectTeacher(value)
    };

    const clickStudentList = (value) => {
        SetStudentList(value);
      };
    


    useEffect(() => {
        dispatch(CDAGetClassTeachers(GetClassTeachersBody));

    }, []);

    useEffect(() => {
        dispatch(CDAGetStudentName(GetStudentNameDropdownBody));

    }, []);

    return (
        <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Progress Report', path: '/extended-sidebar/Teacher/ProgressReportNew' }
        ]}
        rightActions={<>
        
          <SearchableDropdown
            label={"Subject Teacher"}
            sx={{ pl: 0, minWidth: '350px' }}
            ItemList={ USGetClassTeachers}
            onChange={clickSelectClass }
            defaultValue={selectTeacher}
            size={"small"}/>

          <SearchableDropdown
            ItemList={USGetStudentNameDropdown}
            sx={{ minWidth: '300px' }}
            onChange={clickStudentList}
            defaultValue={StudentList}
            label={'Student Name'}
            size={"small"}/>
        </>}
      />
    </Box>
    )
}

export default ProgressReportNew