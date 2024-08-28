import { QuestionMark } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetAllUsersReportingToGivenUserBody, IGetAllYearsBody } from "src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import { RGetAllUsersReportingToGivenUser, RGetAllYearsDropdown } from "src/requests/PerformanceGradeAssignmentBaseScreen/RequestPerformanceGradeAssignment";
import { RootState } from "src/store";
import CommonPageHeader from "../CommonPageHeader";

const PerformanceGradeAssignmentBaseScreen = () => {
    const dispatch = useDispatch();
    const GetAllYearsUS = useSelector(
        (state: RootState) => state.PerformanceGradeAssignment.GetAllYearsIS
    );
    console.log(GetAllYearsUS, "GetAllYearsUS");
    const GetAllUsersReportingToGivenUserUS = useSelector(
        (state: RootState) => state.PerformanceGradeAssignment.GetAllUsersReportingToGivenUserIS
    );
    console.log(GetAllUsersReportingToGivenUserUS, "GetAllUsersReportingToGivenUserUS");
    const GetAllYearBody: IGetAllYearsBody = {
        "asSchoolId": 18
    }
    const GetAllUsersReportingToGivenUserBody: IGetAllUsersReportingToGivenUserBody = {
        "asSchoolId": 18,
        "asUserID": 3443,
        "asYear": 51,
        "asShowPending": false
    }
    useEffect(() => {
        dispatch(RGetAllYearsDropdown(GetAllYearBody))
    }, []);
    useEffect(() => {
        dispatch(RGetAllUsersReportingToGivenUser(GetAllUsersReportingToGivenUserBody))
    }, []);
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
