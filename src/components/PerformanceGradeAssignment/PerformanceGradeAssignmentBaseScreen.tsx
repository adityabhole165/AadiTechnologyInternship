import { QuestionMark } from "@mui/icons-material";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetAllUsersReportingToGivenUserBody, IGetAllYearsBody } from "src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment";
import RadioButton1 from "src/libraries/RadioButton/RadioButton1";
import PerformanceGradeAList from "src/libraries/ResuableComponents/PerformanceGradeAList";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import { RGetAllUsersReportingToGivenUser, RGetAllYearsDropdown } from "src/requests/PerformanceGradeAssignmentBaseScreen/RequestPerformanceGradeAssignment";
import { RootState } from "src/store";
import CommonPageHeader from "../CommonPageHeader";

const PerformanceGradeAssignmentBaseScreen = () => {
    const dispatch = useDispatch();
    const [SelectYear, setSelectYear] = useState('0')
    const [HeaderLeave, setHeaderLeave] = useState([
        { Id: 1, Header: 'Staff Name (Designation)' },
        { Id: 2, Header: 'Performance Evaluation' },
    ]);
    const RadioListCT = [
        { Value: '1', Name: 'Submitted' },
        { Value: '2', Name: 'Pending' }
    ];
    const [radioBtn, setRadioBtn] = useState('2');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const GetAllYearsUS = useSelector(
        (state: RootState) => state.PerformanceGradeAssignment.GetAllYearsIS
    );
    console.log(GetAllYearsUS, "GetAllYearsUS");
    const GetAllUsersReportingToGivenUserUS = useSelector(
        (state: RootState) => state.PerformanceGradeAssignment.GetAllUsersReportingToGivenUserIS
    );
    console.log(GetAllUsersReportingToGivenUserUS, "GetAllUsersReportingToGivenUserUS");
    const GetAllYearBody: IGetAllYearsBody = {
        asSchoolId: asSchoolId
    }
    const GetAllUsersReportingToGivenUserBody: IGetAllUsersReportingToGivenUserBody = {
        asSchoolId: asSchoolId,
        asUserID: asUserId, /*3443,*/
        asYear: Number(SelectYear),
        asShowPending: false
    }
    useEffect(() => {
        dispatch(RGetAllYearsDropdown(GetAllYearBody))
    }, []);
    useEffect(() => {
        if (GetAllYearsUS.length > 0) {
            setSelectYear(GetAllYearsUS[0].Value)
        }
    }, [GetAllYearsUS])
    useEffect(() => {
        dispatch(RGetAllUsersReportingToGivenUser(GetAllUsersReportingToGivenUserBody))
    }, [SelectYear, radioBtn]);
    const clickYearDropdown = (value) => {
        setSelectYear(value)
    };
    const ClickRadio = (value) => {
        setRadioBtn(value);
        // if (value == '1') {
        //     setText(false)
        // }
        // else {
        //     setText(true)
        // }
    };
    const ClickAdd = (value) => {

    }

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
                                ItemList={GetAllYearsUS}
                                onChange={clickYearDropdown}
                                label={'Year'}
                                defaultValue={SelectYear}
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
            <Grid sx={{ backgroundColor: 'white', mb: 1, p: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant='h5'>Status: </Typography>
                    <RadioButton1
                        Array={RadioListCT}
                        ClickRadio={ClickRadio}
                        defaultValue={radioBtn}
                        Label={''}
                    />
                </Box>
            </Grid>
            <PerformanceGradeAList
                HeaderArray={HeaderLeave}
                ItemList={GetAllUsersReportingToGivenUserUS}
                clickView={ClickAdd}
            />
        </Box>
    )
}

export default PerformanceGradeAssignmentBaseScreen
