import { Checkbox, Grid, TextField, Typography } from '@mui/material'

const QueAns = ({ Item, ChangeItem }) => {
    return (
        <div>
            <Grid container>
                <Grid xs={12}>
                    <Typography>{Item.Question}</Typography>
                </Grid>
                <Grid xs={12}>
                    {Item.QueType == 1 ?
                        <TextField value={Item.Answer}
                            onChange={(e) => { ChangeItem(Item, e.target.value) }}></TextField>
                        : <>
                            <Checkbox checked={Item.Answer == "Yes"}
                                onChange={(e) => {
                                    ChangeItem(Item, e.target.checked ? "Yes" : "")
                                }}>
                            </Checkbox>Yes
                            <Checkbox checked={Item.Answer == "No"}
                                onChange={(e) => {
                                    ChangeItem(Item, e.target.checked ? "No" : "")
                                }}>
                            </Checkbox>No
                        </>
                    }

                </Grid>
            </Grid>
        </div>
    )
}

export default QueAns