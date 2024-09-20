import { QuestionMark } from "@mui/icons-material";
import ChevronRightTwoTone from "@mui/icons-material/ChevronRightTwoTone";
import HomeTwoTone from "@mui/icons-material/HomeTwoTone";
import { Breadcrumbs, IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { IGetPerformanceEvaluationDetailsBody } from "src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment";
import { CDAGetDetailsForAttachment } from "src/requests/PerformanceGradeAssignmentBaseScreen/RequestPerformanceGradeAssignment";


///

import { Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import SuspenseLoader from "src/layouts/components/SuspenseLoader";
import Datepicker3 from "src/libraries/DateSelector/Datepicker3";
import { formatDate } from "../Common/Util";
import UploadDocument from "./UploadDocument";
// import DatePicker from "react-multi-date-picker";
const getTodayDate = () => {
    const today = new Date(); // Get the current date
    const day = String(today.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with zero if needed
    const year = today.getFullYear(); // Get full year
    return `${day}-${month}-${year}`; // Format to 'DD-MM-YYYY'
};

///

const PerEvalViewReport = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { asUserId, asYear } = location.state || {};

    const listSchoolOrgNameDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistSchoolOrgNameDetails);
    const listUserNameDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistUserNameDetails);
    const listDescriptionDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistDescriptionDetails);
    const listOriginalSkillIdDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistOriginalSkillIdDetails);
    const listTecherTitleDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistTeacherTitleDetails);
    const listParameterIdDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistParameterIdDetails);
    const listIsFinalApproverDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistIsFinalApproverDetails);
    const gradeDropddownList = useSelector((state: any) => state.PerformanceGradeAssignment.ISgradeDropDownList);
    const attachmentDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISAttachmentDetails);
    const ListIsPublishDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistIsPublishedDetails);
    const listEnableRejectButtonDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistEnableRejectButtonDetails);
    const SubmitStaffPerformanceDetailsMsg = useSelector((state: any) => state.PerformanceGradeAssignment.ISSubmitStaffPerformanceDetailsMsg);
    const PublishStaffPerformanceDetailsMsg = useSelector((state: any) => state.PerformanceGradeAssignment.ISPublishStaffPerformanceDetailsMsg);
    const SaveStaffPerformanceEvalDetailsMsg = useSelector((state: any) => state.PerformanceGradeAssignment.ISSaveStaffPerformanceEvalDetailsMsg);
    const loading = useSelector((state: any) => state.PerformanceGradeAssignment.Loading);

    const [incrementDate, setIncrementDate] = useState('');
    const [effectiveDate, setEffectiveDate] = useState('');
    const [classTaught, setClassTaught] = useState('');
    const [teachingSub, setTeachingSub] = useState('');
    const [uploadDoc, setUploadDoc] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [uploadDocUserName, setUploadDocUserName] = useState('');
    const [uploadDocUserId, setUploadDocUserId] = useState('');
    const [initialStaffPerfEval, setInitialStaffPerfEval] = useState({});
    const todayDate = getTodayDate();

    useEffect(() => {
        if (listUserNameDetails.length > 0) {
            setEffectiveDate(listUserNameDetails[0]?.Text13 === '' ? todayDate : listUserNameDetails[0]?.Text13);
            setIncrementDate(listUserNameDetails[0]?.Text12 === '' ? undefined : listUserNameDetails[0]?.Text12)
        }
    }, [listUserNameDetails])
    useEffect(() => {
        if (listUserNameDetails?.length > 0) {
            setTeachingSub(listUserNameDetails[0]?.Text9);
            setClassTaught(listUserNameDetails[0]?.Text8);
        }
    }, [listUserNameDetails])

    const PerformanceEvaluationDetailsBody: IGetPerformanceEvaluationDetailsBody = {
        asSchoolId: Number(localStorage.getItem('SchoolId')),
        asUserId: Number(asUserId),
        asReportingUserId: Number(sessionStorage.getItem('Id')),
        asYear: Number(asYear),
        asAcademicYearId: Number(asYear)
    }
    useEffect(() => {
        dispatch(CDAGetDetailsForAttachment(PerformanceEvaluationDetailsBody))
    }, [dispatch])

    // f()
    function isFinalApprover() {
        let flag = false;
        let filteredArray = listIsFinalApproverDetails.filter((item) => item.Text3 === sessionStorage.getItem('Id'));
        if (filteredArray.length > 0 && filteredArray[0].Text4 === 'True') {
            flag = true;
        }
        return flag;
    }
    function getFinalApproverName(id) {
        let filteredObserver = listIsFinalApproverDetails.filter((item) => item.Text3 === id);
        return filteredObserver[0]?.Text1
    }
    function isSelfUserBody(id) {
        let flag = false;
        let localUserId = sessionStorage.getItem('Id');
        if (id === localUserId && status === '2') {
            flag = true;
        }
        return flag;
    }
    const parseJSON = (jsonString) => {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return null;
        }
    };
    const updateStaffPerfEvalObs = (key, observation) => {
        const updatedFields = {
            observation: observation
        }
        setInitialStaffPerfEval(prevState => {
            const newState = { ...prevState };
            if (newState[key]) {
                const currentValue = JSON.parse(newState[key]);
                const updatedValue = { ...currentValue, ...updatedFields };
                newState[key] = JSON.stringify(updatedValue);
            }
            return newState;
        });
    };

    function isNotEditable() {
        let flag = true;
        if (listEnableRejectButtonDetails.length > 0) {
            const data = listEnableRejectButtonDetails[0];
            if (data?.Text2 === 'True' && data?.Text3 === 'True') {
                flag = false;
            }
        }
        return flag;
    }

    const updateStaffPerfEvalGrade = (key, gradeId) => {
        const updatedFields = {
            gradeId: gradeId
        }
        setInitialStaffPerfEval(prevState => {
            const newState = { ...prevState };
            if (newState[key]) {
                const currentValue = JSON.parse(newState[key]);
                const updatedValue = { ...currentValue, ...updatedFields };
                newState[key] = JSON.stringify(updatedValue);
            }
            return newState;
        });
    };
    function getGradeName(gradeId) {
        let gradeName = '';
        if (gradeDropddownList.length > 0) {
            gradeDropddownList.map((item, i) => {
                if (item.Id === gradeId && gradeId !== '0') {
                    gradeName = item.Name
                } else if (item.Id === gradeId && gradeId === '0') {
                    gradeName = '';
                }
            });
        }
        return gradeName;
    }
    function getGradeName1(parameterId, reportingUserId) {
        let filteredArr = listParameterIdDetails.filter(item => item.Text2 === parameterId && item.Text5 === reportingUserId);
        if (filteredArr.length > 0) {
            return getGradeName(filteredArr[0].Text3);
        } else {
            return '';
        }
    }

    function getObsName1(parameterId, reportingUserId) {
        let filteredArr = listParameterIdDetails.filter(item => item.Text2 === parameterId && item.Text5 === reportingUserId);
        if (filteredArr.length > 0) {
            return filteredArr[0].Text4;
        } else {
            return '';
        }
    }

    useEffect(() => {
        if (listOriginalSkillIdDetails.length > 0) {
            const initialEvalRowValues = listOriginalSkillIdDetails.reduce((acc, item1) => {
                const matchedItems2 = listTecherTitleDetails.filter(item2 => item2.Text4 === item1.Text1);
                matchedItems2.forEach(matchedItem2 => {
                    const matchedItems3 = listParameterIdDetails.filter(item3 => item3.Text2 === matchedItem2.Text1);
                    matchedItems3.forEach(matchedItem3 => {
                        const key = `${item1.Text1}-${matchedItem2.Text1}-${matchedItem3.Text1}-${matchedItem3.Text5}-${item1.Text7}`;
                        const value = JSON.stringify({
                            id: matchedItem3.Text1,
                            parameterId: matchedItem3.Text2,
                            gradeId: matchedItem3.Text3,
                            observation: matchedItem3.Text4,
                            reportingUserId: matchedItem3.Text5
                        });
                        acc[key] = value;
                    });
                });
                return acc;
            }, {});
            setInitialStaffPerfEval(initialEvalRowValues);
            console.log(`-->`, initialEvalRowValues);
        }
    }, [listOriginalSkillIdDetails, listTecherTitleDetails, listParameterIdDetails]);




    return (
        <>
            <Box sx={{ px: 2 }}>
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                        pt: 5,
                        pb: 2
                    }}
                >
                    <Box>
                        <Breadcrumbs
                            aria-label="breadcrumb"
                            separator={<ChevronRightTwoTone fontSize="small" />}
                            sx={{
                                '& .MuiBreadcrumbs-separator': {
                                    marginLeft: '4px',
                                    marginRight: '4px'
                                }
                            }}
                        >
                            <Link
                                to={'/extended-sidebar/landing/landing'}
                                color="inherit"
                                style={{ textDecoration: 'none' }}
                            >
                                <IconButton
                                    sx={{
                                        background: (theme) => theme.palette.common.white,
                                        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)'
                                    }}
                                >
                                    <HomeTwoTone color="primary" />
                                </IconButton>
                            </Link>
                            <Typography
                                variant={'h3'}
                                fontSize={'18px'}
                                fontWeight={'normal'}
                                color={'text.primary'}
                                sx={{
                                    '&:hover': {
                                        fontWeight: 'bold'
                                    }, cursor: 'pointer'
                                }}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                Performance Evaluation
                            </Typography>

                            <Typography variant={'h3'} fontSize={'18px'} color="text.primary">
                                View Report
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
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
                    </Stack>
                </Stack>

                {/* Form View */}
                {loading ? <SuspenseLoader /> :
                    <Box border={1} sx={{ p: 2, background: 'white' }}>
                        {/* {teachingSubError !== '' && */}
                        <Grid container spacing={3}>
                            {listSchoolOrgNameDetails?.map((item, i) => (
                                <Grid item xs={12} key={item.UserId}>
                                    <Table>
                                        <TableRow sx={{ backgroundColor: '#F0F0F0' }}>
                                            <TableCell align="center" sx={{ border: '1px solid black' }}>
                                                <Typography variant={"h4"} color={"#38548a"}>
                                                    {item.schoolOrgName}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ backgroundColor: '#F0F0F0' }}>
                                            <TableCell align="center" sx={{ border: '1px solid black' }}>
                                                <Typography variant={"h4"} color={"#38548a"}>
                                                    {item.schoolName}
                                                </Typography></TableCell>
                                        </TableRow>
                                        <TableRow sx={{ backgroundColor: '#F0F0F0' }}>
                                            <TableCell align="center" sx={{ border: '1px solid black' }}>      <Typography variant={"h4"} color={"#38548a"}>
                                                {item.address}
                                            </Typography></TableCell>
                                        </TableRow>
                                        <TableRow sx={{ backgroundColor: '#F0F0F0' }}>
                                            <TableCell align="center" sx={{ border: '1px solid black' }}>
                                                <Typography variant={"h4"} color={"#38548a"}>
                                                    Staff Performance Evaluation
                                                </Typography></TableCell>
                                        </TableRow>
                                    </Table>
                                    <br />
                                    {listUserNameDetails.length > 0 && listUserNameDetails.map((item, i) => (
                                        <>
                                            <Box sx={{ backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', pr: 7 }}>
                                                {/* Left Column */}
                                                <Box>
                                                    <Typography variant="h5" pb={0.5}>{item.Text7}</Typography>
                                                    {[
                                                        { label: 'Status :', value: item.Text3 },
                                                        { label: 'Name :', value: item.Text1 },
                                                        { label: 'Employee Code :', value: item.Text4 },
                                                        { label: 'Date of Joining :', value: formatDate(item.Text5.split(' ')[0]) },
                                                        { label: 'Address :', value: item.Text14 }
                                                    ].map((field, index) => (
                                                        <Box key={index} mb={1} display="flex" alignItems="center">
                                                            <Box
                                                                display="inline-block"
                                                                border={1}
                                                                borderRadius={4}
                                                                width="10vw"
                                                                pl={1}
                                                                mr={1}
                                                            >
                                                                {field.label}
                                                            </Box>
                                                            <Typography variant="h5" component="span" sx={{ textWrap: 'wrap', maxWidth: field.label === 'Address :' ? '35vw' : 'auto' }}>
                                                                {field.value}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </Box>

                                                {/* Right Column */}
                                                <Box>
                                                    {[
                                                        { label: 'Year :', value: item.Text11 },
                                                        { label: 'Post :', value: item.Text2 },
                                                        { label: 'Length Of Service :', value: item.Text6 }
                                                    ].map((field, index) => (
                                                        <Box key={index} mb={1} display="flex" alignItems="center">
                                                            <Box
                                                                display="inline-block"
                                                                border={1}
                                                                borderRadius={4}
                                                                width="15vw"
                                                                pl={1}
                                                                mr={1}
                                                            >
                                                                {field.label}
                                                            </Box>
                                                            <Typography variant="h5" component="span">
                                                                {field.value}
                                                            </Typography>
                                                        </Box>
                                                    ))}

                                                    <Box display="flex" alignItems="center" mb={1}>
                                                        <Box
                                                            display="inline-flex"
                                                            alignItems="center"
                                                            border={1}
                                                            borderRadius={4}
                                                            pl={1}
                                                            mr={1}
                                                            sx={{ height: '5vh', width: '15vw' }}
                                                        >
                                                            Date of Last Increment:
                                                        </Box>
                                                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                                            {isFinalApprover() === false ? <Typography variant="h5" component="span">
                                                                {item.Text12 !== '' ? formatDate(item.Text12.split(' ')[0]) : '-'}
                                                            </Typography> :
                                                                <Datepicker3
                                                                    disabled={true}
                                                                    maxDate={true}
                                                                    DateValue={incrementDate}
                                                                    onDateChange={(value) => { setIncrementDate(value) }}
                                                                    label={''}
                                                                    size={"small"}
                                                                    fullWidth={false}
                                                                />}
                                                        </Box>
                                                    </Box>

                                                    <Box display="flex" alignItems="center">
                                                        <Box
                                                            display="inline-block"
                                                            border={1}
                                                            borderRadius={4}
                                                            width="15vw"
                                                            pl={1}
                                                            mr={1}
                                                        >
                                                            Highest Education Qualification and Year of Passing:
                                                        </Box>
                                                        <Typography variant="h5" sx={{ textWrap: 'wrap', maxWidth: '35vw' }}>
                                                            {item.Text15}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box py={1}>
                                                <Box
                                                    display="inline-flex"
                                                    border={1}
                                                    borderRadius={4}
                                                    alignItems="center"
                                                    width="12vw"
                                                    height="4.5vh"
                                                    pl={1}
                                                    mr={1}
                                                >
                                                    Classes Taught:
                                                </Box>
                                                <TextField
                                                    id="outlined-basic"
                                                    value={classTaught}
                                                    required
                                                    label=""
                                                    variant="outlined"
                                                    onChange={() => { }}
                                                    size="small"
                                                    inputProps={{ maxLength: 100, readOnly: true }}
                                                    sx={{ height: "2vh", minWidth: "76vw" }}
                                                />
                                                <span style={{ color: 'red' }}> *</span>
                                            </Box>
                                            <Box py={0.5}>
                                                <Box
                                                    display="inline-flex"
                                                    border={1}
                                                    borderRadius={4}
                                                    alignItems="center"
                                                    width="12vw"
                                                    height="4.5vh"
                                                    pl={1}
                                                    mr={1}
                                                >
                                                    Teaching Subjects:
                                                </Box>
                                                <TextField
                                                    id="outlined-basic"
                                                    value={teachingSub}
                                                    required
                                                    label=""
                                                    onChange={() => { }}
                                                    inputProps={{ maxLength: 100, readOnly: true, }}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ height: "2vh", minWidth: "76vw" }}
                                                />
                                                <span style={{ color: 'red' }}> *</span>
                                            </Box>

                                            {isFinalApprover() && <Box py={1}>
                                                <Box
                                                    display="inline-flex"
                                                    alignItems="center"
                                                    border={1}
                                                    borderRadius={4}
                                                    pl={1}
                                                    mr={1}
                                                    sx={{ height: '5vh', width: '12vw' }}
                                                >
                                                    Effective From Date:
                                                </Box>
                                                <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                                    <Datepicker3
                                                        disabled={true}
                                                        minDate={true}
                                                        DateValue={effectiveDate}
                                                        onDateChange={(value) => {
                                                            setEffectiveDate(value)
                                                        }}
                                                        label={''}
                                                        size={"small"}
                                                        fullWidth={false}
                                                    />
                                                </Box>
                                            </Box>}
                                        </>

                                    ))}
                                </Grid>
                            ))}
                        </Grid>

                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#19bed4' }}>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            paddingTop: '5px',
                                            paddingBottom: '5px',
                                            border: '1px solid rgba(224, 224, 224, 1)',
                                            width: '100px'
                                        }}
                                    >
                                        Sr. No.
                                    </TableCell>
                                    <TableCell colSpan={2}
                                        sx={{
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            paddingTop: '5px',
                                            paddingBottom: '5px',
                                            border: '1px solid rgba(224, 224, 224, 1)',
                                            minWidth: '70vw',
                                        }}
                                    >
                                        Performance Parameter
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(initialStaffPerfEval).length > 0 && listOriginalSkillIdDetails?.length > 0 &&
                                    listOriginalSkillIdDetails.map((item, i) => (
                                        <React.Fragment key={i}>
                                            <TableRow sx={{ backgroundColor: '#e5e7eb' }}>
                                                <TableCell
                                                    colSpan={3}
                                                    sx={{
                                                        textAlign: 'left',
                                                        fontWeight: 'bold',
                                                        color: 'black',
                                                        paddingTop: '5px',
                                                        paddingBottom: '5px',
                                                        border: '1px solid rgba(224, 224, 224, 1)',
                                                    }}
                                                >
                                                    {item.Text2}
                                                </TableCell>
                                            </TableRow>

                                            {/* Counter Initialization */}
                                            {listTecherTitleDetails?.length > 0 &&
                                                (() => {
                                                    let count = 0; // Initialize counter
                                                    return listTecherTitleDetails.map(
                                                        (item1, i1) =>
                                                            item1.Text4 === item.Text1 && (
                                                                <React.Fragment key={i1}>
                                                                    <TableRow>
                                                                        <TableCell
                                                                            sx={{
                                                                                textAlign: 'center',
                                                                                paddingTop: '5px',
                                                                                paddingBottom: '5px',
                                                                                border: '1px solid rgba(224, 224, 224, 1)',
                                                                                borderBottom: '1px solid white'
                                                                            }}
                                                                        >
                                                                            {++count} {/* Increment and display the counter */}
                                                                        </TableCell>
                                                                        <TableCell colSpan={2}
                                                                            sx={{
                                                                                paddingTop: '5px',
                                                                                paddingBottom: '5px',
                                                                                border: '1px solid rgba(224, 224, 224, 1)',
                                                                                fontWeight: 'bolder',
                                                                            }}
                                                                        >
                                                                            {item1.Text2}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell
                                                                            sx={{
                                                                                textAlign: 'left',
                                                                                fontWeight: 'bold',
                                                                                color: 'black',
                                                                                paddingTop: '5px',
                                                                                paddingBottom: '5px',
                                                                                border: '1px solid rgba(224, 224, 224, 1)',
                                                                                borderBottom: '1px solid white'
                                                                                // width: '150px', // Add fixed width here
                                                                            }}
                                                                        >

                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                backgroundColor: '#f3f4f6',
                                                                                textAlign: 'left',
                                                                                fontWeight: 'bold',
                                                                                color: 'black',
                                                                                paddingTop: '5px',
                                                                                paddingBottom: '5px',
                                                                                border: '1px solid rgba(224, 224, 224, 1)'
                                                                            }}
                                                                        >
                                                                            Observer
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                backgroundColor: '#f3f4f6',
                                                                                textAlign: 'left',
                                                                                fontWeight: 'bold',
                                                                                color: 'black',
                                                                                paddingTop: '5px',
                                                                                paddingBottom: '5px',
                                                                                border: '1px solid rgba(224, 224, 224, 1)',
                                                                                // minWidth: '10vw'

                                                                            }}
                                                                        >
                                                                            {item.Text7 === '2' ? 'Observation' : 'Grade'}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    {item.Text8 === 'False' ? <>
                                                                        <TableRow>
                                                                            <TableCell sx={{
                                                                                paddingTop: '5px',
                                                                                paddingBottom: '5px',
                                                                                border: '1px solid rgba(224, 224, 224, 1)',

                                                                            }}></TableCell>
                                                                            <TableCell sx={{
                                                                                paddingTop: '5px',
                                                                                paddingBottom: '5px',
                                                                                border: '1px solid rgba(224, 224, 224, 1)',

                                                                            }}>
                                                                                {getFinalApproverName(asUserId)}
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={{
                                                                                    padding: item.Text7 === '2' && isSelfUserBody(asUserId) ? '0' : '5px',
                                                                                    border: '1px solid rgba(224, 224, 224, 1)',
                                                                                    height: '100%', // Ensure the cell takes full height
                                                                                }}
                                                                            >
                                                                                {/* // listOriginalSkillIdDetails.Text1-listTecherTitleDetails.Text1-0-listParameterIdDetails.Text5-listOriginalSkillIdDetails.Text7
                                                                                id: '0',
                                                                                parameterId: matchedItem3.Text2,
                                                                                gradeId: matchedItem3.Text3,
                                                                                observation: matchedItem3.Text4,
                                                                                reportingUserId: matchedItem3.Text5 */}
                                                                                {item.Text7 === '2' && getObsName1(item1.Text1, asUserId)}

                                                                                {item.Text7 === '3' && getGradeName1(item1.Text1, asUserId)}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </> : listIsFinalApproverDetails.map((item7, i7) => {
                                                                        return (
                                                                            <>
                                                                                <TableRow key={i7}>
                                                                                    <TableCell sx={{
                                                                                        paddingTop: '5px',
                                                                                        paddingBottom: '5px',
                                                                                        border: '1px solid rgba(224, 224, 224, 1)',

                                                                                    }}></TableCell>
                                                                                    <TableCell sx={{
                                                                                        paddingTop: '5px',
                                                                                        paddingBottom: '5px',
                                                                                        border: '1px solid rgba(224, 224, 224, 1)',

                                                                                    }}>
                                                                                        {getFinalApproverName(item7.Text3)}
                                                                                    </TableCell>
                                                                                    <TableCell
                                                                                        sx={{
                                                                                            padding: item.Text7 === '2' && isSelfUserBody(item7.Text3) ? '0' : '5px',
                                                                                            border: '1px solid rgba(224, 224, 224, 1)',
                                                                                            height: '100%', // Ensure the cell takes full height
                                                                                        }}
                                                                                    >
                                                                                        {item.Text7 === '2' && getObsName1(item1.Text1, item7.Text3)}

                                                                                        {item.Text7 === '3' && getGradeName1(item1.Text1, item7.Text3)}
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            </>
                                                                        )
                                                                    })}


                                                                </React.Fragment>
                                                            )
                                                    );
                                                })()}
                                        </React.Fragment>
                                    ))}
                                <TableRow>
                                    <TableCell colSpan={3}
                                        sx={{
                                            backgroundColor: '#e5e7eb',
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                            color: 'black',
                                            paddingTop: '5px',
                                            paddingBottom: '5px',
                                            border: '1px solid rgba(224, 224, 224, 1)'
                                        }}
                                    >
                                        Attachment
                                    </TableCell>
                                </TableRow>
                                {attachmentDetails.length > 0 && attachmentDetails.map((item4, i4) => {
                                    return (
                                        <>
                                            <TableRow key={i4}>
                                                <TableCell
                                                    sx={{
                                                        paddingTop: '5px',
                                                        paddingBottom: '5px',
                                                        border: '1px solid rgba(224, 224, 224, 1)',
                                                    }}
                                                ></TableCell>
                                                <TableCell
                                                    sx={{
                                                        paddingTop: '5px',
                                                        paddingBottom: '5px',
                                                        border: '1px solid rgba(224, 224, 224, 1)',
                                                    }}
                                                >
                                                    {item4.Text1}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        paddingTop: '5px',
                                                        paddingBottom: '5px',
                                                        border: '1px solid rgba(224, 224, 224, 1)',
                                                    }}
                                                >
                                                    <span
                                                        onClick={() => {
                                                            setUploadDoc(true);
                                                            setUploadDocUserName(item4.Text1);
                                                            setUploadDocUserId(item4.Text3);
                                                        }}
                                                        onMouseEnter={() => setHoveredRow(i4)}
                                                        onMouseLeave={() => setHoveredRow(null)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: '#6366f1',
                                                            textDecoration: hoveredRow === i4 ? 'underline' : 'none', // Apply underline only to hovered row
                                                        }}
                                                    >
                                                        {`${item4.Text8 === '' ? '0' : item4.Text8} Files Uploaded`}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                                })}
                            </TableBody>
                        </Table>

                    </Box>}
            </Box>

            <UploadDocument Id={asUserId} ReportingUserId={uploadDocUserId} yearId={asYear}
                saveButton={listEnableRejectButtonDetails[0]?.Text3}
                open={uploadDoc} handleClose={(newFile) => {
                    setUploadDoc(false);
                    if (newFile) {
                        console.log('NewFile ->', newFile)
                        dispatch(CDAGetDetailsForAttachment(PerformanceEvaluationDetailsBody));
                    }
                    setHoveredRow(null);
                }} RefreshList={() => { }} />

        </>
    )
}

export default PerEvalViewReport;




////








