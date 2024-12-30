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