
import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { grey } from '@mui/material/colors';
import CommonPageHeader from '../CommonPageHeader';
import { CDAAllPrimaryClassTeachers } from 'src/requests/PreprimaryProgressReport/PreprimaryProgressReport';
import { IGetAllPrimaryClassTeacherssBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const PreprimaryProgressReport = () => {
    const dispatch = useDispatch();
    const [StartDate, setStartDate]: any = useState();
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));

    const USAllPrimaryClassTeacherssBody: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISAllPrimaryClassTeacherss);
     console.log(USAllPrimaryClassTeacherssBody);
     
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
  

    

    useEffect(() => {
        dispatch(CDAAllPrimaryClassTeachers(AllPrimaryClassTeachersBody));
    }, []);


    return (
        <Box sx={{ px: 2 }}>

            <CommonPageHeader
                navLinks={[
                    { title: 'Pre primary Progress Report', path: '/extended-sidebar/Teacher/Requisition' },
                    { title: 'Requisition Details', path: '/extended-sidebar/Teacher/AddRequisition' }
                ]}

                rightActions={
                    <>
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
