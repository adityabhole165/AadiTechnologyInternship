import { Checkbox, Grid, Typography } from '@mui/material'
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox'

const QueAns = ({ Item, ChangeItem }) => {
    return (
        <div>
            <Grid container>
                <Grid item xs={12} p={1}>
                    <Typography pl={1}>{Item.Question}</Typography>
                </Grid>
                <Grid item xs={12} pl={2}>
                    {Item.QueType == 2 ?
                        <Grid item xs={12} md={12} m={1} pr={2}>
                            <ResizableTextField
                                name='description'
                                multiline
                                rows={3}
                                fullWidth
                                value={Item.Answer}
                                onChange={(e) => { ChangeItem(Item, e.target.value) }}
                                sx={{
                                    resize: 'both'
                                }}
                            />
                        </Grid>
                        : <>
                            <Checkbox checked={Item.Answer == "Yes"}
                                onChange={(e) => {
                                    ChangeItem(Item, e.target.checked ? "Yes" : "")
                                }} sx={{ pl: 1 }}>
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