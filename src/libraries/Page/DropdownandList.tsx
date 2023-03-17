import { Box } from '@mui/material';
import React from 'react'
import PageHeader from 'src/libraries/heading/PageHeader';
import DropdownNew from '../dropdown/DropdownNew';
import CardItemList from './CardItemList';
const DropdownandList = ({ heading, Itemlist, onChange, Label, DefaultValue, CardItemlist }) => {

  return (
    <div>
      <PageHeader heading={heading} />
      <DropdownNew Itemlist={Itemlist} onChange={onChange} Label={Label} DefaultValue={DefaultValue} />
      <Box sx={{mt:"12px"}}>
      <CardItemList CardItemList={CardItemlist} />
      </Box>
      
    </div>
  )
}

export default DropdownandList
