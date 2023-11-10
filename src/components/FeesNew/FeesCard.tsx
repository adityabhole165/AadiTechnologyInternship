import { Grid, Typography } from '@mui/material'
import React from 'react'
import { BoxDetail, BoxDetail1, BoxDetail2 } from 'src/libraries/styled/CardStyle'
import { getDateFormat, isFutureDate } from '../Common/Util';

const FeesCard = ({ item }) => {
  const dueDate = getDateFormat(item.DueDate)
  const todaysDate = getDateFormat(new Date())
    return ( 
            <BoxDetail>
                <BoxDetail2>{item.Text1}</BoxDetail2>
                <Typography>{item.Text2}<b>{item.Text3}</b></Typography>
                {(new Date(todaysDate)) > (new Date(dueDate)) ? <BoxDetail1 color="red" >{item.Text4}</BoxDetail1>: 
                 <BoxDetail1>{item.Text4}</BoxDetail1>
                 } 
            </BoxDetail>
     
  )
}
export interface ExampleFCProps {
    item:{ Text1: string;
    Text2: string;
    Text3: string;
    Text4: string;
  }
}
export default FeesCard