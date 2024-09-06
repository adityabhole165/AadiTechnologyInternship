import { CheckCircle, FactCheck, QuestionMark, Save } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IGetPerformanceEvaluationDetailsBody } from "src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment";
import SuspenseLoader from "src/layouts/components/SuspenseLoader";
import Datepicker2 from "src/libraries/DateSelector/Datepicker2";
import SearchableDropdown1 from "src/libraries/ResuableComponents/SearchableDropdown1";
import { CDAGetPerformanceEvaluationDetails } from "src/requests/PerformanceGradeAssignmentBaseScreen/RequestPerformanceGradeAssignment";
import { encodeURL, formatDate } from "../Common/Util";
import CommonPageHeader from "../CommonPageHeader";
import UploadDocument from "./UploadDocument";
// import DatePicker from "react-multi-date-picker";


const PerformanceEvaluation = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    // useSelectors and Store Data
    const listSchoolOrgNameDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistSchoolOrgNameDetails);
    const listUserNameDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistUserNameDetails);
    const listDescriptionDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistDescriptionDetails);
    const listOriginalSkillIdDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistOriginalSkillIdDetails);
    const listTecherTitleDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistTeacherTitleDetails);
    const listParameterIdDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistParameterIdDetails);
    const listIsFinalApproverDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistIsFinalApproverDetails);
    const gradeDropddownList = useSelector((state: any) => state.PerformanceGradeAssignment.ISgradeDropDownList);
    const listEnableRejectButtonDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistEnableRejectButtonDetails);
    const loading = useSelector((state: any) => state.PerformanceGradeAssignment.Loading);
    const formType = listTecherTitleDetails[0]?.Text7;
    // data is passed from the previous page using navigate's state property and accessed using useLocation hook 
    // and the Object is destructured for further use
    let userNameDetails = listUserNameDetails[0];
    const { userId, asYear, status } = location.state || {};
    const schoolId = localStorage.getItem('SchoolId');
    const academicYearId = sessionStorage.getItem('AcademicYearId');
    const reportingUserId = sessionStorage.getItem('Id');
    const [effectiveDate, setEffectiveDate] = useState(new Date());
    const [classTaught, setClassTaught] = useState(userNameDetails?.Text8);
    const [teachingSub, setTeachingSub] = useState(userNameDetails?.Text9);
    const [uploadDoc, setUploadDoc] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [uploadDocUserName, setUploadDocUserName] = useState('');
    const [uploadDocUserId, setUploadDocUserId] = useState('');

    useEffect(() => { gradeDropddownList.length > 0 ? console.log(gradeDropddownList) : '' }, [gradeDropddownList]);
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

    function getFinalApproverName(id) {
        let filteredObserver = listIsFinalApproverDetails.filter((item) => item.Text3 === id);
        return filteredObserver[0]?.Text1
    }
    function isFinalApprover() {
        let flag = false;
        let filteredArray = listIsFinalApproverDetails.filter((item) => item.Text3 === sessionStorage.getItem('Id'));
        if (filteredArray.length > 0 && filteredArray[0].Text4 === 'True') {
            flag = true;
        }
        return flag;
    }
    function dynamicHeader(id) {
        let headerName = '';
        console.log('⭐⭐', listParameterIdDetails, id)
        let filteredArray = listParameterIdDetails.filter((item) => item.Text2 === id);
        console.log('⭐⭐', filteredArray)
        filteredArray = filteredArray[0];
        if (filteredArray?.Text3 === '0' && filteredArray?.Text4 === '') {
            headerName = 'Grade';
        } else if (filteredArray?.Text3 === '0' && filteredArray?.Text4 !== '') {
            headerName = 'Observation';
        } else if (filteredArray?.Text3 !== '0' && filteredArray?.Text4 === '') {
            headerName = 'Grade';
        }
        return headerName;
    }

    function showEffDate(userId) {
        let flag = false;
        let filteredArray = listIsFinalApproverDetails.filter((item) => item.Text3 === userId);
        if (filteredArray.length > 0 && (filteredArray[0]?.Text4 === 'True' || filteredArray[0]?.Text5 === 'True')) {
            flag = true;
        }
        return flag;
    }
    function isSelfUser() {
        let localUserId = sessionStorage.getItem('Id');
        let flag = false;
        if (userId === localUserId && status === '2') {
            flag = true;
        }
        return flag;
    }
    function isSelfUserBody(id) {
        let flag = false;
        let localUserId = sessionStorage.getItem('Id');
        if (id === localUserId && status === '2') {
            flag = true;
        }
        return flag;
    }
    // if (miSchoolId == Constants.SchoolId.PPS.ToInt())
    //     {
    //         if (QueryString["Year"].ToInt() >= 51)
    //         {
    //             var oTypeId = moStaffPerformanceEvaluationBL.PerformanceParameters.Select(PP => PP.AppraisalFormTypeId).FirstOrDefault();
    //             if (oTypeId == 2)
    //                 FillGrades();
    //         }
    //         else
    //             FillGrades();
    //     }
    //     else
    //         FillGrades();
    function showKeyToRate() {
        let flag = false;
        if (schoolId === '18') {
            if (Number(asYear) >= 51) {
                let formTypeId = listTecherTitleDetails[0]?.Text7;
                if (formTypeId === '2') {
                    flag = true;
                }
            } else {
                flag = true;
            }
        } else {
            flag = true;
        }
        return flag;
    }
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

    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        { title: `Performance Grade Assignment`, path: `/extended-sidebar/Teacher/PerformanceGradeAssignmentBaseScreen/${encodeURL(asYear)}/${encodeURL(status)}` },
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
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title={'View report'}>
                                    <span>
                                        <IconButton
                                            disabled={true}
                                            sx={{
                                                color: 'white',
                                                backgroundColor: blue[500],
                                                '&:hover': {
                                                    backgroundColor: blue[600],
                                                },
                                            }}
                                            onClick={() => { }}
                                        >
                                            <FactCheck />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                        </>}
                />
                {loading ? <SuspenseLoader /> :
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
                                            {item.address}
                                        </Typography>
                                        <hr />
                                        <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={1}>
                                            Staff Performance Evaluation
                                        </Typography>
                                        <hr />
                                    </Box>
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
                                                                <Datepicker2
                                                                    DateValue={new Date(item.Text12)}
                                                                    onDateChange={() => { }}
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
                                                    onChange={(e) => {
                                                        isNotEditable() ? setClassTaught(e.target.value) : '';
                                                    }}
                                                    size="small"
                                                    disabled={isNotEditable()}
                                                    sx={{ height: "2vh", minWidth: "80vw" }}
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
                                                    onChange={(e) => {
                                                        isNotEditable() ? setTeachingSub(e.target.value) : '';
                                                    }}
                                                    variant="outlined"
                                                    size="small"
                                                    disabled={isNotEditable()}
                                                    sx={{ height: "2vh", minWidth: "80vw" }}
                                                />
                                                <span style={{ color: 'red' }}> *</span>
                                            </Box>

                                            {isFinalApprover() && <Box py={0.5}>
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
                                                    <Datepicker2
                                                        DateValue={effectiveDate}
                                                        onDateChange={(value) => { setEffectiveDate(value) }}
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
                        {showKeyToRate() && listDescriptionDetails.length > 0 &&
                            <Typography variant="h4" textAlign={'center'} color={"#38548a"} mt={1} mb={1} sx={{ fontWeight: '800' }}>Key To Rate</Typography>
                        }
                        {showKeyToRate() && listDescriptionDetails.length > 0 &&
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ textAlign: "left", backgroundColor: '#19bed4' }}>
                                        <TableCell sx={{ fontWeight: 'bold', color: 'white', paddingTop: '10px', paddingBottom: '10px', border: '1px solid rgba(224, 224, 224, 1)' }}>
                                            Grade
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', color: 'white', paddingTop: '10px', paddingBottom: '10px', border: '1px solid rgba(224, 224, 224, 1)' }}>
                                            Description
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {listDescriptionDetails.map((item, i) => (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ paddingTop: '5px', paddingBottom: '5px', border: '1px solid rgba(224, 224, 224, 1)' }}>
                                                {item.Text5}
                                            </TableCell>
                                            <TableCell sx={{ paddingTop: '5px', paddingBottom: '5px', border: '1px solid rgba(224, 224, 224, 1)' }}>
                                                {item.Text2}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                ))}
                            </Table>
                        } <br />
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
                                            minWidth: '87vw',
                                        }}
                                    >
                                        Performance Parameter
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listOriginalSkillIdDetails?.length > 0 &&
                                    listOriginalSkillIdDetails.map((item, i) => (
                                        <React.Fragment key={i}>
                                            <TableRow sx={{ backgroundColor: '#19bed4' }}>
                                                <TableCell
                                                    colSpan={3}
                                                    sx={{
                                                        textAlign: 'left',
                                                        fontWeight: 'bold',
                                                        color: 'white',
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
                                                                                backgroundColor: '#19bed4',
                                                                                textAlign: 'left',
                                                                                fontWeight: 'bold',
                                                                                color: 'white',
                                                                                paddingTop: '5px',
                                                                                paddingBottom: '5px',
                                                                                border: '1px solid rgba(224, 224, 224, 1)'
                                                                            }}
                                                                        >
                                                                            Observer
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                backgroundColor: '#19bed4',
                                                                                textAlign: 'left',
                                                                                fontWeight: 'bold',
                                                                                color: 'white',
                                                                                paddingTop: '5px',
                                                                                paddingBottom: '5px',
                                                                                border: '1px solid rgba(224, 224, 224, 1)',
                                                                                // minWidth: '10vw'

                                                                            }}
                                                                        >
                                                                            {item.Text7 === '2' ? 'Observation' : 'Grade'}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    {listParameterIdDetails.length > 0 && listParameterIdDetails.map((item3, i3) => {
                                                                        return (
                                                                            <>
                                                                                {item3.Text2 === item1.Text1 && getFinalApproverName(item3.Text5) !== undefined &&
                                                                                    <TableRow key={i3}>
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
                                                                                            {getFinalApproverName(item3.Text5)}
                                                                                        </TableCell>
                                                                                        <TableCell sx={{
                                                                                            paddingTop: '5px',
                                                                                            paddingBottom: '5px',
                                                                                            border: '1px solid rgba(224, 224, 224, 1)',
                                                                                        }}>
                                                                                            {item.Text7 === '2' && isSelfUserBody(item3.Text5) ? <textarea
                                                                                                style={{ backgroundColor: 'white', width: '100%', resize: 'vertical', marginTop: '-5px', marginBottom: '-12px' }}
                                                                                                value={item3.Text4}
                                                                                                rows={3}
                                                                                                onChange={() => { }}
                                                                                                disabled={isNotEditable() ? true : false}
                                                                                            ></textarea> : item.Text7 === '2' && `${item3.Text4}`}
                                                                                            {item.Text7 === '3' && isSelfUserBody(item3.Text5) ? <SearchableDropdown1
                                                                                                defaultValue={item3.Text3}
                                                                                                ItemList={gradeDropddownList}
                                                                                                size={"small"}
                                                                                                DisableClearable={true}
                                                                                                sx={{ maxWidth: '15vw' }}
                                                                                                onChange={() => { }} /> : item.Text7 === '3' && getGradeName(item3.Text3)}
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                }
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
                                            backgroundColor: '#19bed4',
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            paddingTop: '5px',
                                            paddingBottom: '5px',
                                            border: '1px solid rgba(224, 224, 224, 1)'
                                        }}
                                    >
                                        Attachment
                                    </TableCell>
                                </TableRow>
                                {listIsFinalApproverDetails.length > 0 && listIsFinalApproverDetails.map((item4, i4) => {
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
            {/* const InvestmentDeatailsDocument = ({ Id, UserName, DocumentName, open, handleClose, RefreshList }) => { */}
            <UploadDocument Id={userId} ReportingUserId={uploadDocUserId} yearId={asYear}
                saveButton={listEnableRejectButtonDetails[0]?.Text3}
                open={uploadDoc} handleClose={() => { setUploadDoc(false) }} RefreshList={() => { }} />
        </>
    )
}

export default PerformanceEvaluation;