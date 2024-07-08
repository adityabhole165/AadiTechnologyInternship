import { Box } from '@mui/material';
import CommonPageHeader from '../CommonPageHeader';
const AddStudentRecord = () => {
    return (
        <Box sx={{ px: 2 }} maxWidth="xl">
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Student Record List',
                        path: '/extended-sidebar/Teacher/StudentRecords'
                    },
                    {
                        title: 'Student Record',
                        path: ''
                    }
                ]}
            />
        </Box>
    )
};

export default AddStudentRecord;