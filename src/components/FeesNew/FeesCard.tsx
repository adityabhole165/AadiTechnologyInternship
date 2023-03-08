import { Grid } from '@mui/material'
import React from 'react'
import { BoxDetail, BoxDetail1, BoxDetail2 } from 'src/libraries/styled/CardStyle'

const FeesCard = ({ item }) => {
    return (
        <Grid item xs={10}>
            <BoxDetail>
                <BoxDetail2>{item.Text1}</BoxDetail2>
                <BoxDetail1>{item.Text2}<b>{item.Text3}</b>
                </BoxDetail1>
                <BoxDetail1>{item.Text4}</BoxDetail1>
            </BoxDetail>
        </Grid>
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