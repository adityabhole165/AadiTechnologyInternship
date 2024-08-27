import { QuestionMark } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import CommonPageHeader from "../CommonPageHeader";

const PerformanceGradeAssignmentBaseScreen = () => {
    const clickYearDropdown = (value) => {

    };

    return (

        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Performance Grade Assignment', path: '/extended-sidebar/Teacher/PerformanceGradeAssignmentBaseScreen' }
                ]}
                rightActions={
                    <>
                        <Box sx={{ background: 'white' }}>
                            <SearchableDropdown
                                sx={{ minWidth: '25vw' }}
                                ItemList={[0]}
                                onChange={clickYearDropdown}
                                label={'Year'}
                                defaultValue={""}
                                size={"small"}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title={"Displays user who report to the logged in teacher."}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: grey[500],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: grey[600] },
                                        marginRight: '-4px',
                                        // marginLeft: '8px', 
                                    }}
                                >
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>}
            />
        </Box>
    )
}

export default PerformanceGradeAssignmentBaseScreen
