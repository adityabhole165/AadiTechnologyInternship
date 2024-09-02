import { CheckCircle, QuestionMark, Save } from "@mui/icons-material";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IGetPerformanceEvaluationDetailsBody } from "src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import { CDAGetPerformanceEvaluationDetails } from "src/requests/PerformanceGradeAssignmentBaseScreen/RequestPerformanceGradeAssignment";
import { encodeURL } from "../Common/Util";
import CommonPageHeader from "../CommonPageHeader";


const PerformanceEvaluation = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    // data is passed from the previous page using navigate's state property and accessed using useLocation hook 
    // and the Object is destructured for further use
    const { userId, asYear, status } = location.state || {};
    const schoolId = localStorage.getItem('SchoolId');
    const academicYearId = sessionStorage.getItem('AcademicYearId');
    const reportingUserId = sessionStorage.getItem('Id');
    // useSelectors and Store Data
    const listSchoolOrgNameDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistSchoolOrgNameDetails);


    const PerformanceEvaluationDetailsBody: IGetPerformanceEvaluationDetailsBody = {
        asSchoolId: Number(schoolId),
        asUserId: Number(userId),
        asReportingUserId: Number(reportingUserId),
        asYear: Number(asYear),
        asAcademicYearId: Number(academicYearId)
    }
    // useEffects()
    useEffect(() => {
        dispatch(CDAGetPerformanceEvaluationDetails(PerformanceEvaluationDetailsBody))
        if (listSchoolOrgNameDetails.length > 0) {
            console.log(listSchoolOrgNameDetails)
        }
    }, [dispatch]);

    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        { title: 'Performance Grade Assignment', path: `/extended-sidebar/Teacher/PerformanceGradeAssignmentBaseScreen/${encodeURL(asYear)}/${encodeURL(status)}` },
                        { title: 'Performance Evaluation', path: '' }
                    ]}
                    rightActions={
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title={"Manage / display performance evaluation details."}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: grey[500],
                                            height: '36px !important',
                                            ':hover': { backgroundColor: grey[600] }
                                        }}
                                    >
                                        <QuestionMark />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title={'Save'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: green[500],
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                        onClick={() => { }}
                                    >
                                        <Save />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title={'Publish'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: blue[500],
                                            '&:hover': {
                                                backgroundColor: blue[600],
                                            },
                                        }}
                                        onClick={() => { }}
                                    >
                                        <CheckCircle />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title={'Publish'}>
                                    <IconButton
                                        sx={{
                                            color: 'white',
                                            backgroundColor: blue[500],
                                            '&:hover': {
                                                backgroundColor: blue[600],
                                            },
                                        }}
                                        onClick={() => { }}
                                    >
                                        <FileDownloadDoneIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </>}
                />
                <Box border={1} sx={{ p: 2, background: 'white' }}>
                    <Grid container spacing={3}>
                        {listSchoolOrgNameDetails?.map((item, i) => (
                            <Grid item xs={12} key={item.UserId}>
                                <Box sx={{
                                    backgroundColor: '#F0F0F0',
                                    textAlign: 'center', marginBottom: 2,

                                }}>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={1}>

                                        {item.schoolOrgName}

                                    </Typography>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={1} >

                                        {item.schoolName}

                                    </Typography>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={1}>

                                        INVESTMENT DECLARATION FORM FOR FINANCIAL YEAR {item.FinancialYear}

                                    </Typography>
                                    <hr />
                                </Box>
                                <Box sx={{ backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', marginBottom: 2, pr: 14 }}>
                                    <Box>
                                        <Typography variant="h6">
                                            <Box
                                                display="inline-block"
                                                border={1}
                                                borderRadius={40}
                                                pl={1}
                                                pr={7.4}
                                                mr={1}
                                                mt={0}
                                                component="span"
                                            >
                                                Name
                                            </Box>
                                            <Typography variant="h5" component="span">
                                                {item.UserName}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="body1">
                                            <Box
                                                display="inline-block"
                                                border={1}
                                                borderRadius={4}
                                                pl={1}
                                                pr={2}
                                                mr={1}
                                                component="span"
                                                mt={0.5}
                                            >
                                                Employee No
                                            </Box>
                                            <Typography variant="h5" component="span">
                                                {item.EmployeeNo}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="body1">
                                            <Box
                                                display="inline-block"
                                                border={1}
                                                borderRadius={4}
                                                pl={1}
                                                pr={5.5}
                                                mr={1}
                                                mt={0.5}
                                                component="span"
                                            >
                                                Address
                                            </Box>
                                            <Typography variant="h5" component="span">
                                                {item.Address}
                                            </Typography>
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body1">
                                            <Box
                                                display="inline-block"
                                                border={1}
                                                borderRadius={4}
                                                pl={1}
                                                pr={2}
                                                mr={1}
                                                mt={0}
                                                component="span"
                                            >
                                                Designation
                                            </Box>
                                            <Typography variant="h5" component="span">
                                                {item.Designation}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="body1">
                                            <Box
                                                display="inline-block"
                                                border={1}
                                                borderRadius={4}
                                                pl={1}
                                                pr={5}
                                                mr={1}
                                                mt={0.5}
                                                component="span"
                                            >
                                                PAN No
                                            </Box>
                                            <Typography variant="h5" component="span">
                                                {item.PanNo}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="body1">
                                            <Box
                                                display="inline-block"
                                                border={1}
                                                borderRadius={4}
                                                pl={1}
                                                pr={5.4}
                                                mr={1}
                                                mt={0.5}
                                                component="span"
                                            >
                                                Gender
                                            </Box>
                                            <Typography variant="h5" component="span">
                                                {item.Gender}
                                            </Typography>
                                        </Typography>


                                    </Box>

                                </Box>
                                <Box >
                                    <SearchableDropdown
                                        sx={{ maxWidth: '35vh' }}
                                        ItemList={[]}
                                        onChange={() => { }}
                                        label={'Regime'}
                                        defaultValue={''}
                                        size={"small"} />
                                </Box>

                                <Box>
                                    {/* {[].length > 0 &&
                                        <Grid container sx={{ maxWidth: '100%' }} >
                                            <IsSubmit.Provider value={isSubmittedArray.length > 0 ? isSubmittedArray[0] : ""}>
                                                <InvestmentSection clickDocumentDetails={ClickAppropriate}
                                                    refreshData={refreshData}></InvestmentSection>

                                            </IsSubmit.Provider>

                                        </Grid>} */}
                                </Box>
                            </Grid>

                        ))}

                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default PerformanceEvaluation;