import { Box } from "@mui/material"
import CommonPageHeader from "../CommonPageHeader"

const PerformanceGradeAssignmentBaseScreen = () => {
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Performance Grade Assignment', path: '/extended-sidebar/Teacher/PerformanceGradeAssignmentBaseScreen' }
                ]}
                rightActions={
                    <>
                    </>}
            />
        </Box>
    )
}

export default PerformanceGradeAssignmentBaseScreen
