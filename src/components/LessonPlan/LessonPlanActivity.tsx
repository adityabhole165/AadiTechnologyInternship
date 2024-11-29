import { Grid, TextField, Typography, alpha } from '@mui/material';

const LessonPlanActivity = ({ ApprovalData, errorComment = '', onChangeApproverComment = (e, i) => { } }) => {
    return (
        <>
            <Typography variant={"h5"} mb={1}>
                Activity
            </Typography>
            {ApprovalData?.map((Item, i) => {

                return (<Grid container key={i}>
                    < Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                        <Typography color={"primary"} fontWeight={"bold"}>
                            {Item.Text1}
                        </Typography>
                    </Grid>
                    <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                        <Typography color={"primary"}>
                            {Item.Text2}
                        </Typography>
                    </Grid>< Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                        <Typography color={"primary"} fontWeight={"bold"}>
                            {Item.Text3}
                        </Typography>
                    </Grid>
                    <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                        <Typography color={"primary"}>
                            {Item.Text4}
                        </Typography>
                    </Grid>
                    {Item.ApprovalSortOrder != "0" &&
                        <Grid xs={12} md={12} item>
                            <TextField
                                disabled={Item.IsPublished == 'True' || Item.ReportingUserId != localStorage.getItem('UserId')}
                                multiline
                                value={Item.Text5}
                                onChange={(e) => {
                                    onChangeApproverComment(e.target.value, i);
                                }}
                                error={errorComment !== '' &&
                                    Item.ReportingUserId == localStorage.getItem('UserId')}
                                // helperText={errorComment}
                                fullWidth
                                label={"Comment"}
                                sx={{
                                    resize: 'both'
                                }}
                            />
                        </Grid>
                    }
                </Grid>)
            })
            }
        </>
    )
}

export default LessonPlanActivity