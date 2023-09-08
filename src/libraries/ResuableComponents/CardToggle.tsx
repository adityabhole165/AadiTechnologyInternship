import { ToggleButton, ToggleButtonGroup, Typography, Grid } from '@mui/material'
import React from 'react'

function CardToggle({ itemList, clickToggle, defaultvalue }) {

    return (
        <>
            <Grid container>
                {itemList.map((item, i) => (
                    <div key={i}>
                        <Grid item xs={2}>
                            <ToggleButtonGroup
                                color="primary"
                                value={defaultvalue}
                                exclusive
                                onChange={() => clickToggle(item.id)}
                                aria-label="Platform" >
                                <ToggleButton value={item.id}>{item.Text}</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        </div>
                ))}
                </Grid>
                </>

    )
}

export default CardToggle