import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { RootState } from 'src/store'
import {  IGetAllHomeworkDocumentsBody } from "src/interfaces/AssignHomework/IHomeworkDocuments";
import {   GetAllHomeworkDocuments } from "src/requests/AssignHomework/requestHomeworkDocuments";
import { useNavigate, useParams } from "react-router"
import Assignedhomeworklist from "src/libraries/ResuableComponents/Assignedhomeworklist1"
import { toast } from 'react-toastify';
import PageHeader from 'src/libraries/heading/PageHeader';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import CancelIcon from '@mui/icons-material/Cancel';

import { Grid } from '@mui/material';

const HomeworkDocuments = () => {
  const dispatch = useDispatch();
  const { Id} = useParams();
  alert(Id)
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  const asUpdatedById = localStorage.getItem('Id');
  const asTeacherId = sessionStorage.getItem('TeacherId');

  const HeaderList = ["FileName ", "Delete", ]
    const IconList = [{
            Id: 1,
            Icon: (<CancelIcon />),
            Action: "View"
    }]

  const AllHomeworkDocuments = useSelector((state: RootState) => state.Homeworkdocument.GetAllHomeworkDocuments);
  console.log(AllHomeworkDocuments, "AllHomeworkDocuments....")

  const IGetAllHomeworkDocuments: IGetAllHomeworkDocumentsBody = {
    asSchoolId: asSchoolId,
    asHomeworkId: Number(Id),
    asAcademicyearId: asAcademicYearId
  }
  useEffect(() => {
    dispatch(GetAllHomeworkDocuments(IGetAllHomeworkDocuments))
  }, []);
  const ClickDelete = (Id) =>{


  }


  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      
      <PageHeader heading={'Documents'}/>
        
      
      <Grid item xs={12}>
                {AllHomeworkDocuments != undefined && 
                <DynamicList2 HeaderList={HeaderList} ItemList={AllHomeworkDocuments}
                ClickItem={ClickDelete} IconList={IconList}/>
            }
            </Grid>
      
       </div>
  )
}

export default HomeworkDocuments 
