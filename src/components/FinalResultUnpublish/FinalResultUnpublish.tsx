import { Grid, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import PageHeader from 'src/libraries/heading/PageHeader'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { RootState } from 'src/store';
import { IUnPublishFinalResultBody,IUnPublishFinalResultResult } from "src/interfaces/FinalResultUnpublish/IFinalResultUnpublish";
import { UnPublishclick } from 'src/requests/FinalResultUnpublish/RequestFinalResultUnpublish';

const FinalResultUnpublish = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
      const {SelectTeacher,TeacherName } = useParams();

      const[Reason,setReason]=useState('');
    const[ReasonError,setReasonError]=useState('');

      const asSchoolId = Number(localStorage.getItem('localSchoolId'));
      const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

      const UnPublishFinalResult = useSelector((state: RootState) => state.Finalunpublish.UnPublishfinal)
    console.log("UnPublishFinalResult", UnPublishFinalResult)



        
            const UnPublishBody: IUnPublishFinalResultBody = {

                asSchoolId:asSchoolId,
                asAcademicYearId:asAcademicYearId,
                asStandardDivId:Number(SelectTeacher),
                asUnPublishReason:Reason
                    }

         useEffect(() => {
            dispatch(UnPublishclick(UnPublishBody))
          }, []);

          const Exam = ["Final Result"]
        
    const onClickUnpublish = () => {

        let isError = false;
        if (Reason == '') {
            setReasonError('Field should not be blank')
          isError = true
      
        } 
        if (!isError) {
            dispatch(UnPublishclick(UnPublishBody))
       
        }  
        if (!isError) {
            ResetForm()  
        } 
        if(Reason != ''){
            navigate('/extended-sidebar/Teacher/FinalResult')
            }
      }

     

      const ResetForm = () => {
        setReason('');
    };

    const onClickCancel = () => {
        navigate('/extended-sidebar/Teacher/FinalResult')
      }

  return (
    <div>
      <PageHeader heading='Enter Reason For Unpublish' />

      <div style={{ textAlign: 'right', color: 'red', paddingRight: '20px' }}>
          Mandatory Fields *
        </div>

        <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={1}>
    <Typography >
    <b>Exam :</b>
    </Typography>
  </Grid>
  
  <Grid item xs={2}>
  <TextField value={Exam}/>
  </Grid>
  </Grid>
  <br></br>


  <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={1}>
    <Typography >
    <b>Class Teacher :</b>
    </Typography>
  </Grid>
  
  <Grid item xs={2}>
  <TextField value={TeacherName}/>
  </Grid>
  </Grid>
  <br></br>

  <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={1}>
    <Typography >
    <b>Reason for Unpublish :</b>
    </Typography>
  </Grid>
  
  <Grid item xs={2}>
  <TextField value={Reason} onChange={(e) => setReason(e.target.value)} 
        error={ReasonError !== ''} helperText={ReasonError} multiline style={{ resize: 'both', overflow: 'auto' }}/>  


         <div style={{  color: 'red' }}>
         *
        </div>
  </Grid>
  </Grid>
  
  <br></br>
  <br></br>

  <div >
  <Grid container spacing={2} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
  <Grid item xs={1}>
<ButtonPrimary onClick={onClickUnpublish}  variant="contained" >
              <b>UNPUBLISH</b>
            </ButtonPrimary>
            </Grid> 
            
        <Grid item xs={1}>
            <ButtonPrimary onClick={onClickCancel} variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
               CLOSE
            </ButtonPrimary> 
            </Grid>
      </Grid> 
      </div>
    </div>
  )
}

export default FinalResultUnpublish
