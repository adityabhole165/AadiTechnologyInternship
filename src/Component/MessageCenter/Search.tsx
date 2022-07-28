

import React, { useState, useEffect } from "react";
import  { getYearsList,getAllMonthList } from "src/Client_Api/MessageCenter/MessaageCenter";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { RootState } from "src/store";
import {styled,useTheme} from '@mui/material';
import {Iyears,IGetAllMonths} from "src/Interface/MessageCenter/Search";
import PageHeader from "src/UI_Library/heading/PageHeader";
import { Container} from '@mui/material';
import http from 'src/Client_Api/SchoolService/schoolServices';
import { useNavigate } from 'react-router-dom';
import Form2 from "src/UI_Library/form/form2";

function Search() {

    const dispatch = useDispatch();
    const YearsList = useSelector((state:RootState)=>state.MessageCenter.YearsList);
    const AllMonthList = useSelector((state:RootState)=>state.MessageCenter.AllMonthList)
    console.log("YearsList", YearsList);
   
     const body: Iyears = {
    "asSchoolId":"120"
       };
  const Mbody: IGetAllMonths = {
    "asAcademicYearId":"8",
    "asSchoolId":"120",
           };

    useEffect(() => {
        dispatch(getYearsList(body));
        dispatch(getAllMonthList(Mbody))
        
    },[])
    

  return(
  <>
  <Form2 YearsList={YearsList} allMonthList={AllMonthList}/>
  </>
  
  )
  }

export default Search;
