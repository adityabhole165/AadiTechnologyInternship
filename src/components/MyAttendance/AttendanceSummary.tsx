import { Box, Grid, Stack, Typography } from '@mui/material';

const AttendanceSummary = ({ SummaryCountforAttendance, assignedDate }) => {
    return (
        <Grid container spacing={2}>
            {SummaryCountforAttendance.map((item, i) => {
                return (
                    <Grid item xs={3}>
                        <Box
                            sx={{
                                background: (theme) => theme.palette.common.white,
                                p: 2, textAlign: 'center'
                            }}>
                            <Typography variant={'h4'} color={item.Color}
                                sx={{ marginBottom: 1, fontSize: '18px !important', textTransform: 'capitalize' }}>
                                {item.Name}
                            </Typography>
                            <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-between'}>
                                <Grid container spacing={2}>
                                    {item.Values.map((itemChild, iChild) => {
                                        return (
                                            <Grid item xs={4} key={iChild}>
                                                <Typography variant={'subtitle2'}>{itemChild.Name}</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Typography variant={'body1'} textAlign={'center'}>
                                                        {itemChild.Value}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        )
                                    })
                                    }
                                </Grid>
                            </Stack>
                        </Box>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default AttendanceSummary