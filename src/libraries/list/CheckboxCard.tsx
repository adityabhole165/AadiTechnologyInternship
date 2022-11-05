import { Grid,Box } from '@mui/material'
import React from 'react'
import CheckboxImg from '../card/CheckboxImg'

const CheckboxCard = ({Item, onClick}) => {
    const onChange = () => {
        onClick({Id:Item.Id, isActive:!Item.isActive})
    }
    return (
        <>
            <Grid container>
                <Grid item xs={1}>
                    <CheckboxImg
                        name={Item.Name}
                        value={Item.Value}
                        checked={Item.isActive}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={11}>
                    {Item.Name}
                </Grid>
            </Grid>
        </>
    )
}

export default CheckboxCard