import { Box, Typography } from '@mui/material'

const AppraisalFormComponent = ({ Label, Text }) => {
    return (
        <>
            <Box mb={1} display="flex" alignItems="center">
                <Box
                    display="inline-block"
                    border={1}
                    borderRadius={4}
                    width="10vw"
                    pl={1}
                    mr={1}
                    sx={{
                        width: {
                            xs: '40vw', // 80% of the viewport width on extra-small screens
                            sm: '40vw', // 60% of the viewport width on small screens
                            md: '20vw', // 40% of the viewport width on medium screens
                            lg: '10vw', // 20% of the viewport width on large screens
                            xl: '10vw', // 10% of the viewport width on extra-large screens
                        },
                    }}
                >
                    {Label}
                </Box>
                <Typography variant="h5" component="span" sx={{ textWrap: 'wrap', maxWidth: 'auto' }}>
                    {Text}
                </Typography>
            </Box>
        </>
    )
}

export default AppraisalFormComponent