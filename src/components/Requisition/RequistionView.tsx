


import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { IGetRequisitionDetailsBody } from 'src/interfaces/Requisition/IAddRequisition';
import { CDAGetRequisitionDetails } from 'src/requests/Requisition/RequestAddRequisition';
import { RootState } from 'src/store';
import { getCalendarDateFormatDateNew } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import Requisioneditlist from './Requisioneditlist';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RequistionViewlist from './RequistionViewlist';
import Datepicker from './Datepicker';
import { grey } from '@mui/material/colors';

const RequistionView = () => {
    const dispatch = useDispatch();
    
    const { ViewId } = useParams();
    const ViewId1 = atob(ViewId)
    console.log(ViewId, "ViewId");
    const [StartDate, setStartDate]: any = useState(getCalendarDateFormatDateNew(new Date()));

    const calculateFutureDate = (start, daysToAdd) => {
        const futureDate = new Date(start);
        futureDate.setDate(start.getDate() + daysToAdd);
        return getCalendarDateFormatDateNew(futureDate);
      };
      useEffect(() => {
        const today = new Date();
        const futureDate = calculateFutureDate(today, 10);
        setStartDate(futureDate);
      }, []);

    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));

    const USGetRequisitionDetails: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetRequisitionDetails);
    const listGetRequisitionTeacherDetails: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetRequisitionDetails1);
    const listGetRequisitionPrincipalUserId: any = useSelector((state: RootState) => state.SliceAddRequisition.ISGetRequisitionDetails2);
    const RequisitionName = USGetRequisitionDetails.map(item => item.RequisitionName)
    const RequisitionDescription = USGetRequisitionDetails.map(item => item.RequisitionDescription)
    const ActionComment = USGetRequisitionDetails.map(item => item.ActionComment)



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

    const HeaderPublish1 = [
        { Id: 1, Header: 'Status Changed by' },
        { Id: 2, Header: 'Request Status' },
        { Id: 3, Header: 'Date' },


    ];

    


    const GetRequisitionDetailsBodynew: IGetRequisitionDetailsBody = {
        asSchoolId: asSchoolId,
        asRequisitionId: Number( ViewId1),
        asMode: "View"
    };

    useEffect(() => {
        dispatch(CDAGetRequisitionDetails(GetRequisitionDetailsBodynew));
    }, [atob(ViewId)]);


    return (
        <Box sx={{ px: 2 }}>

            <CommonPageHeader
                navLinks={[
                    { title: 'Requisition', path: '/extended-sidebar/Teacher/Requisition' },
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

            {USGetRequisitionDetails.length > 0 ?
                <Box mb={1} sx={{ p: 2, background: 'white' }}>

                    <RequistionViewlist
                        ItemList={USGetRequisitionDetails}
                        HeaderArray={HeaderPublish}

                    />


                    <br></br>
                    <Grid item xs={12}>
                        <TextField
                            label={
                                <span>
                                    Requisition Name
                                </span>
                            }
                            sx={{ bgcolor: '#F0F0F0', width: '100%' }}
                            rows={3}
                            value={RequisitionName[0]}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                        <TextField
                            label={
                                <span>
                                    Requisition Description
                                </span>
                            }
                            multiline
                            rows={3}
                            value={RequisitionDescription[0]}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <br></br>

                    <Grid item xs={12}>
                        <TextField
                            label={
                                <span>
                                    Comment
                                </span>
                            }
                            multiline
                            rows={3}
                            value={ActionComment[0]}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <br></br>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                     <Datepicker
                    DateValue={StartDate}
                    onDateChange={''}
                    label={'Expiry Date'}
                    size={"small"}
                 
                  />

                            
                        </Grid>

                    </Grid>

                </Box> : null}






            {listGetRequisitionTeacherDetails != '' && USGetRequisitionDetails.length > 0 ?
                <Box mb={1} sx={{ p: 2, background: 'white' }}>
                    <Requisioneditlist
                        ItemList={listGetRequisitionTeacherDetails}
                        HeaderArray={HeaderPublish1}

                    />
                </Box>
                : <span></span>

            }




        </Box>

    );
};

export default RequistionView;
