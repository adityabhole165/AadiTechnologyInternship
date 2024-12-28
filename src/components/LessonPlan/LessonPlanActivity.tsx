import { Grid, TextField, Typography, alpha } from '@mui/material';
import { useEffect } from 'react';

const LessonPlanActivity = ({
    ApprovalData = [],
    errorComment = '',
    onChangeApproverComment = (e, i) => { }
}) => {
    useEffect(() => {
        if (ApprovalData) {
            //console.log('ApprovalData😶', ApprovalData);
        }
    }, [ApprovalData])
    return (
        <>
            <Typography variant="h5" mb={1}>
                Activity
            </Typography>
            {ApprovalData.map((item, index) => (
                <Grid
                    key={`${item.Text1}-${index}`}
                    container
                    spacing={1}
                    sx={{ mb: 2 }}
                >
                    <Grid
                        item
                        xs={2}
                        sx={{
                            border: (theme) => `1px solid ${theme.palette.primary.light}`,
                            p: 1,
                            background: (theme) => alpha(theme.palette.primary.main, 0.1)
                        }}
                    >
                        <Typography color="primary" fontWeight="bold">
                            {item.Text1}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            border: (theme) => `1px solid ${theme.palette.primary.light}`,
                            p: 1,
                            background: (theme) => alpha(theme.palette.primary.main, 0.1)
                        }}
                    >
                        <Typography color="primary">
                            {item.Text2}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        sx={{
                            border: (theme) => `1px solid ${theme.palette.primary.light}`,
                            p: 1,
                            background: (theme) => alpha(theme.palette.primary.main, 0.1)
                        }}
                    >
                        <Typography color="primary" fontWeight="bold">
                            {item.Text3}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            border: (theme) => `1px solid ${theme.palette.primary.light}`,
                            p: 1,
                            background: (theme) => alpha(theme.palette.primary.main, 0.1)
                        }}
                    >
                        <Typography color="primary">
                            {item.Text4}
                        </Typography>
                    </Grid>
                    {item.ApprovalSortOrder !== "0" && (
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                label="Comment"
                                variant="outlined"
                                rows={3}
                                disabled={
                                    item.IsPublished === 'True' ||
                                    item.ReportingUserId !== localStorage.getItem('UserId')
                                }
                                value={item.Text5 || ''}
                                onChange={(e) => {
                                    onChangeApproverComment(e.target.value, index);
                                }}
                                error={
                                    errorComment !== '' &&
                                    item.ReportingUserId === localStorage.getItem('UserId')
                                }
                                helperText={
                                    errorComment !== '' &&
                                        item.ReportingUserId === localStorage.getItem('UserId')
                                        ? errorComment
                                        : ''
                                }
                                sx={{
                                    mt: 2,
                                    '& .MuiOutlinedInput-root': {
                                        resize: 'vertical'
                                    }
                                }}
                            />
                        </Grid>
                    )}
                </Grid>
            ))}
        </>
    );
};

export default LessonPlanActivity;