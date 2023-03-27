import { Box } from '@mui/material';
import React from 'react'
import PageHeader from 'src/libraries/heading/PageHeader';
import DropdownNew from '../dropdown/DropdownNew';
import CardItemList from './CardItemList';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
const DropdownandList = ({ heading, Itemlist, onChange, Label, DefaultValue, CardItemlist,getExamDetailslist }) => {
console.log("DefaultValue",DefaultValue)
  return (
    <div>
      <PageHeader heading={heading} />
      <DropdownNew Itemlist={Itemlist} onChange={onChange} Label={Label} DefaultValue={DefaultValue} />
      <Box sx={{mt:"12px"}}>
        {
              getExamDetailslist.length === 0 ? 
             
             <ErrorMessages Error={"Exam is not available"} />
             : <CardItemList CardItemList={CardItemlist} />
      }
      </Box>
      
    </div>
  )
}

export default DropdownandList
