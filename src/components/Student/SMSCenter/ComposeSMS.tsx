import { Box, Button } from '@mui/material';
import CommonPageHeader from 'src/components/CommonPageHeader';

const ComposeSMSform = () => {


    return (
        <>

            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'Compose SMS',
                            path: '',
                        },
                    ]}
                    rightActions={
                        <>
                            <Button variant="contained" color="primary" onClick={() => alert('Action clicked!')}>
                                New Message
                            </Button>
                        </>
                    }
                />
            </Box>
        </>
    );
};

export default ComposeSMSform;
