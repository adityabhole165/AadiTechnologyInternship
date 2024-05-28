
import { Box, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetClassTeachersBody, IGetStudentNameDropdownBody, IStudentProgressReportBody,IGetPassedAcademicYearsBody } from "src/interfaces/ProgressReport/IprogressReport";
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetClassTeachers, CDAGetStudentName, CDAStudentProgressReport,CDAGetPassedAcademicYears } from 'src/requests/ProgressReport/ReqProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const ProgressReportNew = () => {
    const dispatch = useDispatch();
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const TeacherId = sessionStorage.getItem('TeacherId');
    const asUserId = Number(sessionStorage.getItem('Id'));
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const [selectTeacher, SetselectTeacher] = useState('');
    const [StudentId, SetStudentId] = useState('');
    console.log(StudentId, "StudentId");

    const USGetClassTeachers: any = useSelector(
        (state: RootState) => state.ProgressReportNew.ISGetClassTeachers
    );
    const USGetStudentNameDropdown: any = useSelector(
        (state: RootState) => state.ProgressReportNew.ISGetStudentNameDropdown
    );

    const USStudentProgressReport: any = useSelector(
        (state: RootState) => state.ProgressReportNew.ISStudentProgressReport
    );

    const USGetPassedAcademicYears: any = useSelector(
        (state: RootState) => state.ProgressReportNew.ISGetPassedAcademicYears
    );
    console.log(USGetPassedAcademicYears, "USGetPassedAcademicYears");


    const GetClassTeachersBody: IGetClassTeachersBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asTeacherId: Number(TeacherId)
    };

    const GetStudentNameDropdownBody: IGetStudentNameDropdownBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asStandardDivisionId: Number(asStandardDivisionId)

    };

    const StudentProgressReportBody: IStudentProgressReportBody = {
        asSchoolId: Number(asSchoolId),
        asAcadmeicYearId: Number(asAcademicYearId),
        asStudentId: Number(StudentId),
        asUserId: asUserId


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
        dispatch(CDAGetClassTeachers(GetClassTeachersBody));

    }, []);

    useEffect(() => {
        dispatch(CDAGetStudentName(GetStudentNameDropdownBody));

    }, [selectTeacher]);

    useEffect(() => {
        dispatch(CDAStudentProgressReport(StudentProgressReportBody));

    }, [StudentId]);

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
                        sx={{ pl: 0, minWidth: '350px' }}
                        ItemList={USGetClassTeachers}
                        onChange={clickSelectClass}
                        defaultValue={selectTeacher}
                        size={"small"} />

                    <SearchableDropdown
                        ItemList={USGetStudentNameDropdown}
                        sx={{ minWidth: '300px' }}
                        onChange={clickStudentList}
                        defaultValue={StudentId}
                        label={'Student Name'}
                        size={"small"} />
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
            
        </Box>
    )
}

export default ProgressReportNew