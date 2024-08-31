import { QuestionMark } from "@mui/icons-material";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IGetAllUsersReportingToGivenUserBody, IGetAllYearsBody } from "src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment";
import RadioButton1 from "src/libraries/RadioButton/RadioButton1";
import ButtonGroupComponent from "src/libraries/ResuableComponents/ButtonGroupComponent";
import PerformanceGradeAList from "src/libraries/ResuableComponents/PerformanceGradeAList";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import { RGetAllUsersReportingToGivenUser, RGetAllYearsDropdown } from "src/requests/PerformanceGradeAssignmentBaseScreen/RequestPerformanceGradeAssignment";
import { RootState } from "src/store";
import CommonPageHeader from "../CommonPageHeader";

const PerformanceGradeAssignmentBaseScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const [PagedLeave, setPagedLeave] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const [page, setPage] = useState(1);
    const filteredList = GetAllUsersReportingToGivenUserUS.filter((item) => item.TotalRows !== undefined);
    const TotalCount = filteredList.map((item) => item.TotalRows);
    const uniqueTotalCount = [...new Set(TotalCount)];
    const singleTotalCount = uniqueTotalCount[0];
    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
    const pagecount = Math.ceil(singleTotalCount / rowsPerPage);
    const GetAllUsersReportingToGivenUserPending: IGetAllUsersReportingToGivenUserBody = {
        asSchoolId: asSchoolId,
        asUserID: asUserId, /*3443,*/
        asYear: Number(SelectYear),
        asShowPending: true,
        asStartIndex: (page - 1) * rowsPerPage,
        asPageSize: page * rowsPerPage,
    }
    const GetAllUsersReportingToGivenUserSubmitted: IGetAllUsersReportingToGivenUserBody = {
        asSchoolId: asSchoolId,
        asUserID: asUserId, /*3443,*/
        asYear: Number(SelectYear),
        asShowPending: false,
        asStartIndex: (page - 1) * rowsPerPage,
        asPageSize: page * rowsPerPage,

    }
    useEffect(() => {
        dispatch(RGetAllYearsDropdown(GetAllYearBody))
    }, []);
    useEffect(() => {
        if (GetAllYearsUS.length > 0) {
            setSelectYear(GetAllYearsUS[0].Value)
        }
    }, [GetAllYearsUS])
    // useEffect(() => {
    //         dispatch(RGetAllUsersReportingToGivenUser(GetAllUsersReportingToGivenUserPending))
    //     }, [SelectYear, radioBtn]);
    useEffect(() => {
        if (radioBtn == '1') {
            dispatch(RGetAllUsersReportingToGivenUser(GetAllUsersReportingToGivenUserSubmitted))
        } else if (radioBtn == '2') {
            dispatch(RGetAllUsersReportingToGivenUser(GetAllUsersReportingToGivenUserPending))
        }
    }, [radioBtn, SelectYear, page, rowsPerPage,]);
    useEffect(() => {
        if (GetAllUsersReportingToGivenUserUS) {
            setPagedLeave(GetAllUsersReportingToGivenUserUS);
        }
    }, [GetAllUsersReportingToGivenUserUS]);
    const clickYearDropdown = (value) => {
        setSelectYear(value)
        setRowsPerPage(20)
        setPage(1);
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
        navigate('/extended-sidebar/Teacher/PerformanceEvaluation')
    }
    const PageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset to the first page when changing rows per page
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
                                sx={{ minWidth: '15vw' }}
                                ItemList={GetAllYearsUS}
                                onChange={clickYearDropdown}
                                label={'Year'}
                                defaultValue={SelectYear}
                                size={"small"}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title={"Displays user who report to the logged in user."}>
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
            {/* <PerformanceGradeAList
                HeaderArray={HeaderLeave}
                ItemList={GetAllUsersReportingToGivenUserUS}
                clickView={ClickAdd}
            /> */}
            <Box sx={{ background: 'white', p: 2 }}>
                {singleTotalCount > rowsPerPage ? <div style={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                        <Box component="span" fontWeight="fontWeightBold">
                            {startRecord} to {endRecord}
                        </Box>
                        {' '}out of{' '}
                        <Box component="span" fontWeight="fontWeightBold">
                            {singleTotalCount}
                        </Box>{' '}
                        {singleTotalCount === 1 ? 'record' : 'records'}
                    </Typography>
                </div> : <span> </span>}

                <PerformanceGradeAList
                    HeaderArray={HeaderLeave}
                    ItemList={GetAllUsersReportingToGivenUserUS}
                    clickView={ClickAdd}
                />
                {
                    endRecord > 19 ? (
                        <ButtonGroupComponent
                            rowsPerPage={rowsPerPage}
                            ChangeRowsPerPage={ChangeRowsPerPage}
                            rowsPerPageOptions={rowsPerPageOptions}
                            PageChange={PageChange}
                            pagecount={pagecount}
                        />
                    ) : (
                        <span></span>

                    )
                }
            </Box>


        </Box>
    )
}

export default PerformanceGradeAssignmentBaseScreen
