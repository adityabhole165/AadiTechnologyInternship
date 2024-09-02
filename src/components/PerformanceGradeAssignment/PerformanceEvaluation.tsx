import { CheckCircle, QuestionMark, Save } from "@mui/icons-material";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IGetPerformanceEvaluationDetailsBody } from "src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment";
import Datepicker2 from "src/libraries/DateSelector/Datepicker2";
import { CDAGetPerformanceEvaluationDetails } from "src/requests/PerformanceGradeAssignmentBaseScreen/RequestPerformanceGradeAssignment";
import { encodeURL, formatDate } from "../Common/Util";
import CommonPageHeader from "../CommonPageHeader";
// import DatePicker from "react-multi-date-picker";


const PerformanceEvaluation = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    // data is passed from the previous page using navigate's state property and accessed using useLocation hook 
    // and the Object is destructured for further use
    const { userId, asYear, status } = location.state || {};
    const schoolId = localStorage.getItem('SchoolId');
    const academicYearId = sessionStorage.getItem('AcademicYearId');
    const reportingUserId = sessionStorage.getItem('Id');
    const [effectiveDate, setEffectiveDate] = useState(new Date());
    // useSelectors and Store Data
    const listSchoolOrgNameDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistSchoolOrgNameDetails);
    const listUserNameDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistUserNameDetails);
    const listDescriptionDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistDescriptionDetails);
    const listOriginalSkillIdDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistOriginalSkillIdDetails);
    const listTecherTitleDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistTeacherTitleDetails);
    const ISlistParameterIdDetails = useSelector((state: any) => state.PerformanceGradeAssignment.ISlistParameterIdDetails);


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
                                                        <Datepicker2
                                                            DateValue={new Date(item.Text12)}
                                                            onDateChange={() => { }}
                                                            label={''}
                                                            size={"small"}
                                                            fullWidth={false}
                                                        />
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
                                                value={item.Text8}
                                                required
                                                label=""
                                                variant="outlined"
                                                size="small"
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
                                                value={item.Text9}
                                                required
                                                label=""
                                                variant="outlined"
                                                size="small"
                                                sx={{ height: "2vh", minWidth: "80vw" }}
                                            />
                                            <span style={{ color: 'red' }}> *</span>
                                        </Box>

                                        <Box py={0.5}>
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
                                        </Box>
                                    </>

                                ))}
                            </Grid>
                        ))}
                    </Grid>
                    {listDescriptionDetails.length > 0 &&
                        <Typography variant="h4" textAlign={'center'} color={"#38548a"} mb={1} sx={{ fontWeight: '800' }}>Key To Rate</Typography>
                    }
                    {listDescriptionDetails.length > 0 &&
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
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', color: 'white', paddingTop: '10px', paddingBottom: '10px', border: '1px solid rgba(224, 224, 224, 1)' }}>
                                    Sr. No.
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', color: 'white', paddingTop: '10px', paddingBottom: '10px', border: '1px solid rgba(224, 224, 224, 1)', minWidth: '50vw' }}>
                                    Performance Parameter
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listOriginalSkillIdDetails?.length > 0 && listOriginalSkillIdDetails.map((item, i) => (
                                <React.Fragment key={i}>
                                    <TableRow sx={{ backgroundColor: '#19bed4' }}>
                                        <TableCell colSpan={2} sx={{ textAlign: 'left', fontWeight: 'bold', color: 'white', paddingTop: '10px', paddingBottom: '10px', border: '1px solid rgba(224, 224, 224, 1)' }}>
                                            {item.Text2}
                                        </TableCell>
                                    </TableRow>
                                    {listTecherTitleDetails?.length > 0 && listTecherTitleDetails.map((item1, i1) => (
                                        item1.Text4 === item.Text1 && (
                                            <TableRow key={i1}>
                                                <TableCell sx={{ paddingTop: '5px', paddingBottom: '5px', border: '1px solid rgba(224, 224, 224, 1)' }}>{item1.Text3}</TableCell>
                                                <TableCell sx={{ paddingTop: '5px', paddingBottom: '5px', border: '1px solid rgba(224, 224, 224, 1)' }}>{item1.Text2}</TableCell>
                                            </TableRow>
                                        )
                                    ))}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </>
    )
}

export default PerformanceEvaluation;