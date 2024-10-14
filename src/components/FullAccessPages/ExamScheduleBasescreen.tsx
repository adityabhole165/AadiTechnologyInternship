import { Box } from "@mui/material"
import CommonPageHeader from "../CommonPageHeader"

const ExamScheduleBasescreen = () => {
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Schedule',
                        path: '/extended-sidebar/Teacher/ExamScheduleBasescreen',
                    },
                ]}
                rightActions={
                    <>

                    </>
                }
            />
        </Box>
    )
}

export default ExamScheduleBasescreen
