
import { Box, IconButton, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetClassTeachersBody, IGetStudentNameDropdownBody, IStudentProgressReportBody,IGetPassedAcademicYearsBody } from "src/interfaces/ProgressReport/IprogressReport";
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetClassTeachers, CDAGetStudentName, CDAStudentProgressReport,CDAGetPassedAcademicYears } from 'src/requests/ProgressReport/ReqProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import QuestionMark from '@mui/icons-material/QuestionMark';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

import { grey } from '@mui/material/colors';

const ProgressReportNew = () => {
    const dispatch = useDispatch();
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const TeacherId = sessionStorage.getItem('TeacherId');
    const asUserId = Number(sessionStorage.getItem('Id'));
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const [selectTeacher, SetselectTeacher] = useState(TeacherId);
    const [StudentId, SetStudentId] = useState('');

    const ScreensAccessPermission = JSON.parse(
        sessionStorage.getItem('ScreensAccessPermission')
      );
    
    
      const GetScreenPermission = () => {
        let perm = 'N';
        ScreensAccessPermission?.map((item) => {
          if (item.ScreenName === 'Progress Report') perm = item.IsFullAccess;
        });
        return perm;
      };

    console.log(GetScreenPermission(), "GetScreenPermission");

    const USGetClassTeachers: any = useSelector(
        (state: RootState) => state.ProgressReportNew.ISGetClassTeachers
    );
    const USGetStudentNameDropdown: any = useSelector(
        (state: RootState) => state.ProgressReportNew.ISGetStudentNameDropdown
    );

    const USStudentProgressReport: any = useSelector(
        (state: RootState) => state.ProgressReportNew.ISStudentProgressReport
    );
   console.log(USStudentProgressReport,"USStudentProgressReport");
   
    const USGetPassedAcademicYears: any = useSelector((state: RootState) => state.ProgressReportNew.ISGetPassedAcademicYears);
    const USlistStudentsDetails : any = useSelector((state: RootState) => state.ProgressReportNew.ISlistStudentsDetails );
    const USlistSubjectsDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistSubjectsDetails);
    const USlistTestDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistTestDetails);
    const USlistSubjectIdDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistSubjectIdDetails);
    const USListSchoolWiseTestNameDetail: any = useSelector((state: RootState) => state.ProgressReportNew.ISListSchoolWiseTestNameDetail);
    const USListSubjectidDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListSubjectidDetails);
    const USListTestTypeIdDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListTestTypeIdDetails);
    const USListMarkssDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListMarkssDetails);
    const USListDisplayNameDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListDisplayNameDetails);

    const GetClassTeachersBody: IGetClassTeachersBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asTeacherId:  Number(GetScreenPermission() == 'Y' ? 0 : TeacherId)
    };

    const GetStudentNameDropdownBody: IGetStudentNameDropdownBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asStandardDivisionId: Number(asStandardDivisionId)

    };

    const StudentProgressReportBody: IStudentProgressReportBody = {
        asSchoolId: Number(asSchoolId),
        asAcadmeicYearId: Number(asAcademicYearId),
        asStudentId: 37608,
        asUserId: 4463


    };

    const GetPassedAcademicYearsBody: IGetPassedAcademicYearsBody = {
        asSchoolId: Number(asSchoolId),
        asStudent_Id: Number(StudentId),
        asIncludeCurrentYear:false


    };


    const clickSelectClass = (value) => {
        SetselectTeacher(value)
    };

    const clickStudentList = (value) => {
        SetStudentId(value);
    };

    useEffect(() => {
        if (USGetStudentNameDropdown.length > 0) {
        SetStudentId(USGetStudentNameDropdown[0].Value);
        }
      }, [USGetStudentNameDropdown]);

      useEffect(() => {
        if(GetScreenPermission() == 'Y'){
          if (USGetClassTeachers.length > 0) {
            SetselectTeacher(USGetClassTeachers[0].Value);
          }
        }
       
      }, [USGetClassTeachers]);


    useEffect(() => {
        dispatch(CDAGetClassTeachers(GetClassTeachersBody));

    }, []);

    useEffect(() => {
        dispatch(CDAGetStudentName(GetStudentNameDropdownBody));

    }, [selectTeacher]);

    useEffect(() => {
        dispatch(CDAStudentProgressReport(StudentProgressReportBody));

    }, []);

    useEffect(() => {
        dispatch(CDAGetPassedAcademicYears(GetPassedAcademicYearsBody));

    }, [StudentId]);

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Progress Report', path: '/extended-sidebar/Teacher/ProgressReportNew' }
                ]}
                rightActions={<>

                    <SearchableDropdown
                        label={"Subject Teacher"}
                        sx={{ pl: 0, minWidth: '350px', backgroundColor: GetScreenPermission() == 'N' ? '#f0e68c' : '', }}
                        ItemList={USGetClassTeachers}
                        onChange={clickSelectClass}
                        defaultValue={selectTeacher}
                        size={"small"} 
                        DisableClearable={GetScreenPermission() == 'N'}
                        disabled={GetScreenPermission() == 'N'}
                        
                        />

                    <SearchableDropdown
                        ItemList={USGetStudentNameDropdown}
                        sx={{ minWidth: '300px' }}
                        onChange={clickStudentList}
                        defaultValue={StudentId}
                        label={'Student Name'}
                        size={"small"} />

            <Box>
            <Tooltip title={'Displays  progress report of published exam of selected / all student.'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>
          </Box>

         <Box>
           <Tooltip title={'Show'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <VisibilityTwoToneIcon/>
              </IconButton>
            </Tooltip> 
        
           
          </Box>

                </>}
            />

            <Box>
                <hr />
                <Typography variant={"h4"} textAlign={'center'} color={"primary"} mb={1}>
                    Pawar Public Charitable Trust's
                </Typography>
                <hr />
                <Typography variant={"h3"} textAlign={'center'} color={"primary"} mb={1}>
                    PAWAR PUBLIC SCHOOL
                </Typography>
                <hr />
                <Typography variant={"h4"} textAlign={'center'} color={"primary"} mb={1}>
                  Progress Report
                </Typography>
                <hr />

                <Table>
                 <TableBody>
                   
                     
                       <TableRow sx={{ bgcolor: 'grey.200' }}>
                         <TableCell><b>Roll No:</b>{"6"} </TableCell>
                         <TableCell><b>Name:</b> {"Miss Jahnavi Bhaveshkumar Barot"}	</TableCell>
                         <TableCell><b>Class:</b> {"10 - C"} 	</TableCell>
                         <TableCell><b>Year:</b> {"2024-2025"}	</TableCell>
                       </TableRow>
                    
                
                 </TableBody>
               </Table>
            </Box>

            <Box sx={{ overflowX: 'auto' }}>

          
              <Table>
                <TableBody>
                  <TableRow>
                    <Typography variant={"h4"} textAlign={'left'} color={"primary"} mt={4}>
                      Subjects
                    </Typography>
                    {USlistStudentsDetails.map((subject) => (
                      <TableCell><b>{subject.Name}</b></TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <Typography variant={"h4"} textAlign={'left'} color={"primary"} mt={4}>
                      Marks
                    </Typography>
                    {USlistSubjectsDetails.map((marks) => (
                      <TableCell>{marks.Name}</TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <Typography variant={"h4"} textAlign={'left'} color={"primary"} mt={4}>
                      Grade
                    </Typography>
                    {USlistTestDetails.map((Grade) => (
                      <TableCell>{Grade.Name}
                      </TableCell>
                    )
                    )}
                  </TableRow>
                </TableBody>
              </Table>
          

          </Box>
            
        </Box>
    )
}

export default ProgressReportNew