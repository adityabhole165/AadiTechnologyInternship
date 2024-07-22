


import { Box, Checkbox, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {  IGetRequisitionDetailsBody } from 'src/interfaces/Requisition/IAddRequisition';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import { CDAGetRequisitionDetails } from 'src/requests/Requisition/RequestAddRequisition';
import RequistionViewlist from './RequistionViewlist';
import Requisioneditlist from './Requisioneditlist';



const RequistionView = () => {
    const dispatch = useDispatch();

    const { ViewId } = useParams();
    console.log(ViewId, "ViewId");

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
    ];

    const HeaderPublish1 = [
        { Id: 1, Header: 'Status Changed by' },
        { Id: 2, Header: 'Request Status' },
        { Id: 3, Header: 'Date' },


    ];


    const GetRequisitionDetailsBodynew: IGetRequisitionDetailsBody = {
        asSchoolId: asSchoolId,
        asRequisitionId: Number(ViewId),
        asMode: "View"
    };

    useEffect(() => {
        dispatch(CDAGetRequisitionDetails(GetRequisitionDetailsBodynew));
    }, [ViewId]);


    return (
        <Box sx={{ px: 2 }}>

            <CommonPageHeader
                navLinks={[
                    { title: 'Requisition', path: '/extended-sidebar/Teacher/Requisition' },
                    { title: 'Requisition Details', path: '/extended-sidebar/Teacher/AddRequisition' }
                ]}

                rightActions={
                    <>
                        
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
                                    Requisition Name <span style={{ color: 'red' }}>*</span>
                                </span>
                            }
                           
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
                                    Requisition Description <span style={{ color: 'red' }}>*</span>
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

                </Box> : null}

                
            {listGetRequisitionTeacherDetails != ''?
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
