
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, IconButton, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetAllPrimaryClassTeacherssBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';
import { CDAAllPrimaryClassTeachers } from 'src/requests/PreprimaryProgressReport/PreprimaryProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { getSchoolConfigurations, GetScreenPermission } from '../Common/Util';

const PreprimaryProgressReport = () => {
    const dispatch = useDispatch();
    const [ClassTeacher, setClassTeacher]: any = useState();
    const  PreprimaryFullAccess = GetScreenPermission('Pre-Primary Progress Report');
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));

    const USAllPrimaryClassTeacherssBody: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISAllPrimaryClassTeacherss);
    const PrePrimaryClassTeacher = USAllPrimaryClassTeacherssBody.filter((teacher: any) => teacher.Is_PrePrimary === 'Y');
    const HeaderPublish = [
        { Id: 1, Header: 'Item Code' },
        { Id: 2, Header: 'Item Name' },
        { Id: 3, Header: 'Current Stock' },
        { Id: 4, Header: 'Item Quantity' },
        { Id: 5, Header: 'Original Qty' },
        { Id: 6, Header: 'Issued Qty' },
        { Id: 7, Header: 'Returned Qty' },
        { Id: 8, Header: 'Cancelled Qty' }
    ];


    const AllPrimaryClassTeachersBody: IGetAllPrimaryClassTeacherssBody =
    {
        asSchoolId: asSchoolId,
        asAcadmicYearId: asAcademicYearId,
        asTeacher_id: 0,

    };

     const clickClassTeacher = (value) => {
        setClassTeacher(value);
       
    };

    useEffect(() => {
        dispatch(CDAAllPrimaryClassTeachers(AllPrimaryClassTeachersBody));
    }, []);
    useEffect(() => {
        if (PrePrimaryClassTeacher.length > 0) {
            setClassTeacher(PrePrimaryClassTeacher[0].Value);
        }
      }, [PrePrimaryClassTeacher]);

    return (
        <Box sx={{ px: 2 }}>

            <CommonPageHeader
                navLinks={[
                    { title: 'Pre Primary Progress Report', path: '/extended-sidebar/Teacher/PreprimaryProgressReport' },

                ]}

                rightActions={
                    <>
                        <SearchableDropdown
                            ItemList={PrePrimaryClassTeacher}
                            sx={{ minWidth: '250px' }}
                            onChange={clickClassTeacher}
                            defaultValue={ClassTeacher}
                            label={'Class Teacher'}
                            size={"small"}
                        />
                        <Tooltip title={'Here you can create, modify, view, approve, denied requisition.'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],

                                    height: '36px !important',
                                    ':hover': { backgroundColor: grey[600] }
                                }}
                            >
                                <QuestionMarkIcon />
                            </IconButton>
                        </Tooltip>

                    </>}
            />

        </Box>

    );
};

export default PreprimaryProgressReport;
