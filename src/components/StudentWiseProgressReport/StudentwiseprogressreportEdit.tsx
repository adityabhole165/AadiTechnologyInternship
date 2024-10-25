
import { CheckCircle, Save, Unpublished } from '@mui/icons-material';
import FactCheck from '@mui/icons-material/FactCheck';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { GetProgressReportDetailsBody, IGetStandardwiseAssessmentDetailsBody, ManageStudentWiseAssessmentGradesBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';
import { IGetClassTeacherXseedSubjectsBody } from 'src/interfaces/PrePrimaryResult/IPrePrimaryResult';
import { IGetUserDetailsBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import { IGetAssessmentDropdownBody } from 'src/interfaces/StudentWiseProgressReport/IStudentWiseProgressReport';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetStandardwiseAssessmentDetails, CDAManageStudentWiseAssessmentGrades, CDAProgressReportDetails, resetMessage } from 'src/requests/PreprimaryProgressReport/PreprimaryProgressReport';
import { TeacherXseedSubjects } from 'src/requests/PrePrimaryResult/RequestPrePrimaryResult';
import { getUserDetailss } from 'src/requests/SchoolSetting/schoolSetting';
import { CDAAssessmentDropdown } from 'src/requests/StudentWiseProgressReport/ReqStudentWiseProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
const StudentwiseprogressreportEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Assessment, YearwiseStudentId, StandardId } = useParams();
    const [AssessmentId, setAssessmentId]: any = useState(Assessment);
    const [headerGrade, setHeaderGrade] = useState("0");
    const [grades, setGrades] = useState({});
    const { showAlert, closeAlert } = useContext(AlertContext);

    const [headerGrade1, setHeaderGrade1] = useState("0");
    const [grades1, setGrades1] = useState({});
    const [textall, setTextall] = useState('');
    const maxChars = 300;
    const [ReasonError, setReasonError] = useState('');
    const [ReasonError1, setReasonError1] = useState('');
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const RoleId = sessionStorage.getItem('RoleId');
    const userId = sessionStorage.getItem('Id');
    const USAssessmentPublishStatus: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISAssessmentPublishStatus);
    const AssessmentPublishStatus = USAssessmentPublishStatus.map(item => item.AssessmentPublishStatus);
    const StudentWiseAssessmentPublishStatus = USAssessmentPublishStatus.map(item => item.StudentWiseAssessmentPublishStatus);
    const USFillSubjectSections: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillSubjectSections);
    const USFillSchoolDetails: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillSchoolDetails);
    const USFillGradeDetails: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillGradeDetails);
    const USFillXseedRemarks: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillXseedRemarks);
    const USFillNonXseedSubjectGrades: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillNonXseedSubjectGrades);
    const USFillStudentDetails: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillStudentDetails);
    const USFillStudentAttendance: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillStudentAttendance);
    const GradeDetailsfilteredAndSortedData = USFillGradeDetails.filter(item => item.ConsideredAsAbsent !== "1" && item.ConsideredAsExempted !== "1").sort((a, b) => parseInt(a.SortOrder) - parseInt(b.SortOrder));
    const USFillStudentsLearningOutcomes: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillStudentsLearningOutcomes);
    const USGetStandardwiseAssessmentDetails: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISGetStandardwiseAssessmentDetails);
    console.log(USFillStudentsLearningOutcomes, "USFillStudentsLearningOutcomes");
    const FillStudentsLearningOutcomessortedOutcomes = [...USFillStudentsLearningOutcomes].sort((a, b) => {
        return parseInt(a.LearningOutcomeSortOrder) - parseInt(b.LearningOutcomeSortOrder);
    });
    const USManageStudentWiseAssessmentGrades: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISManageStudentWiseAssessmentGrades);
    const USFillStudentsLearningOutcomeObservations: any = useSelector((state: RootState) => state.PreprimaryProgressReport.ISFillStudentsLearningOutcomeObservations);

    const USlistpublishstatusDetails = useSelector(
        (state: RootState) => state.PrePrimaryResult.ISlistpublishstatusDetails
    );

    const IsPublished = USlistpublishstatusDetails.length > 0 ? USlistpublishstatusDetails[0].IsPublished : "";
    const PublishStatus = USlistpublishstatusDetails.length > 0 ? USlistpublishstatusDetails[0].PublishStatus : "";
    console.log(USFillNonXseedSubjectGrades, "--");

    const UserDetail: any = useSelector((state: RootState) => state.getSchoolSettings.getUserDetails);

    const USAssessmentDrop = useSelector((state: RootState) => state.Studentwiseprogress.ISAssessmentDropdown);

    const hasValidLearningOutcomeGrade = (outcome: any) => {


        return outcome.LearningOutcomeGradeId !== "0";
    };

    const filteredOutcomes = USFillStudentsLearningOutcomes.map((outcome: any) => hasValidLearningOutcomeGrade(outcome));
    const allOutcomesValid = filteredOutcomes.every((outcomeValid: boolean) => outcomeValid);
    console.log(allOutcomesValid, "allOutcomesValid");

    useEffect(() => {
        const remark = USFillXseedRemarks.filter(item => item.Remark);
        if (remark.length > 0) {
            setTextall(remark[0].Remark);
        }
    }, [USFillXseedRemarks]);

    const GetProgressReportDetailsBody: GetProgressReportDetailsBody =
    {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: Number(YearwiseStudentId),
        asYearwiseStudentId: Number(StandardId),
        asAssessmentId: Number(AssessmentId)

    };

    const GetStandardwiseAssessmentDetailBody: IGetStandardwiseAssessmentDetailsBody =
    {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId: Number(YearwiseStudentId),


    };

    const SubjectsList: IGetClassTeacherXseedSubjectsBody = {
        asSchoolId: asSchoolId,
        asAcadmeicYearId: asAcademicYearId,
        asStdDivId: Number(YearwiseStudentId),
        asAssessmentId: Number(AssessmentId)
    };

    const GetAssessmentDropdown_Body: IGetAssessmentDropdownBody = {
        asAcademicYearId: Number(asAcademicYearId),
        asSchoolId: Number(asSchoolId),
    };

    useEffect(() => {
        dispatch(CDAAssessmentDropdown(GetAssessmentDropdown_Body));
    }, []);

    useEffect(() => {
        const UserDetailBody: IGetUserDetailsBody = {
            asSchoolId: String(asSchoolId),
            asUserId: userId,
            asRoleId: RoleId
        };
        dispatch(getUserDetailss(UserDetailBody));
    }, [userId, RoleId]);


    const clickAssessmentId = (value) => {
        setAssessmentId(value);


    };

    useEffect(() => {
        dispatch(CDAProgressReportDetails(GetProgressReportDetailsBody));
    }, [AssessmentId, YearwiseStudentId, StandardId]);

    useEffect(() => {
        dispatch(CDAGetStandardwiseAssessmentDetails(GetStandardwiseAssessmentDetailBody));
    }, [YearwiseStudentId]);

    useEffect(() => {
        dispatch(TeacherXseedSubjects(SubjectsList));
    }, [AssessmentId]);

    useEffect(() => {
        if (USFillStudentsLearningOutcomes.length > 0) {
            const initialGrades = USFillStudentsLearningOutcomes.reduce((acc, student) => {
                acc[student.LearningOutcomeConfigId] = student.GradeId;
                return acc;
            }, {});
            setGrades(initialGrades);
        }
    }, [USFillStudentsLearningOutcomes])

    function clickHeaderGrade(value) {
        setHeaderGrade(value);
        const updatedGrades = USFillStudentsLearningOutcomes.reduce((acc, student) => {
            acc[student.LearningOutcomeConfigId] = value;
            return acc;
        }, {});
        setGrades(updatedGrades);
    }

    const clickGrade = (value, LearningOutcomeConfigId) => {
        setGrades((prevGrades) => ({
            ...prevGrades,
            [LearningOutcomeConfigId]: value,
        }));
    };



    useEffect(() => {
        if (USFillNonXseedSubjectGrades.length > 0) {
            const initialGrades = USFillNonXseedSubjectGrades.reduce((acc, student) => {
                acc[student.GradeId] = student.GradeId;
                return acc;
            }, {});
            setGrades1(initialGrades);
        }
    }, [USFillNonXseedSubjectGrades])

    function clickHeaderGrade1(value) {
        setHeaderGrade1(value);
        const updatedGrades = USFillNonXseedSubjectGrades.reduce((acc, student) => {
            acc[student.GradeId] = value;
            return acc;
        }, {});
        setGrades1(updatedGrades);
    }


    const clickGrade1 = (value, GradeId) => {
        setGrades1((prevGrades) => ({
            ...prevGrades,
            [GradeId]: value,
        }));
    };

    function learningOutcomeXML() {
        let sXML = '';

        USFillStudentsLearningOutcomes.forEach((student) => {
            const learningOutcomeConfigId = student.LearningOutcomeConfigId;
            const gradeId = grades[learningOutcomeConfigId];
            const subjectSectionConfigId = student.SubjectSectionConfigId;
            const learningOutcomesObservationId = USFillStudentsLearningOutcomeObservations
                .filter(observation => observation.SubjectSectionConfigId === subjectSectionConfigId)
                .map(observation => observation.LearningOutcomesObservationId)[0];

            const learningOutcomeGradeId = USFillSubjectSections
                .filter(section => section.SubjectSectionConfigId === subjectSectionConfigId)
                .map(section => student.LearningOutcomeGradeId)[0];


            sXML += `<LearningOutcomes GradeId='${gradeId}' Observation='' LearningOutcomesObservationId='${learningOutcomesObservationId}' SubjectSectionConfigurationId='${subjectSectionConfigId}' LearningOutcomeConfigId='${learningOutcomeConfigId}' LearningOutcomeGradeId='${learningOutcomeGradeId}' />`;
        });

        sXML = `<LearningOutcomes>${sXML}</LearningOutcomes>`;
        return sXML;
    }

    function learningOutcomeXML1() {
        let sXML = '';
        USFillNonXseedSubjectGrades.forEach((student) => {
            const learningOutcomeConfigId = student.GradeId;
            const gradeId = grades1[learningOutcomeConfigId]
            console.log(gradeId, "gradeIddubmmd");

            const SubjectId = student.SubjectId;
            sXML += `<NonXseedSubjectGrades  GradeId='${gradeId}' Observation='' SubjectId='${SubjectId}'/>`
        });
        sXML = `<NonXseedSubjectGrades>${sXML}</NonXseedSubjectGrades>`
        return sXML;
    }
    const Detailschnageall3 = (event) => {
        if (event.target.value.length <= maxChars) {
            setTextall(event.target.value);
        }
    };

    // const clicksave = () => {
    //     const gradeKeysWithZeroValue = USFillStudentsLearningOutcomes.filter(outcome => grades[outcome.LearningOutcomeConfigId] == "0");
    //     const gradeKeysWithZeroValue1 = USFillNonXseedSubjectGrades.filter(outcome => grades1[outcome.GradeId] == "0");

    //     if (gradeKeysWithZeroValue.length > 0) {
    //         const subjectNames = USFillSubjectSections.map(subjectSection => {
    //             const outcomes = USFillStudentsLearningOutcomes.filter(
    //                 outcome => outcome.SubjectSectionConfigId === subjectSection.SubjectSectionConfigurationId && grades[outcome.LearningOutcomeConfigId] === "0"
    //             );
    //             if (outcomes.length > 0) {
    //                 const outcomeIndices = outcomes.map((_, index) => index + 1).join(', ');
    //                 return `${subjectSection.SubjectSectionName} : ${outcomeIndices}`;
    //             }
    //             return null;
    //         }).filter(Boolean); 


    //         const allSubjectNamesString = subjectNames.join('.\n');
    //         setReasonError(`Grade should be selected for Learning Outcome(s): ${allSubjectNamesString}`);
    //         return;
    //     }

    //     if (gradeKeysWithZeroValue1.length > 0) {
    //         const subjectNames = USFillNonXseedSubjectGrades.map((row) => row.SubjectName).join(", ");
    //         setReasonError1(`Grade should be selected for co-curricular subject(s): ${subjectNames}`);
    //         return;
    //     }

    //     const ManageStudentWiseAssessmentGradeBody: ManageStudentWiseAssessmentGradesBody = {
    //         asSchoolId: asSchoolId,
    //         asAcademicYearId: asAcademicYearId,
    //         asYearwiseStudentId: Number(StandardId),
    //         asStandardDivisionId: Number(YearwiseStudentId),
    //         asAssessmentId: Number(AssessmentId),
    //         asInsertedById: asUserId,
    //         asLearningOutcomeXML: learningOutcomeXML(),
    //         asXseedGradesXML: learningOutcomeXML1(),
    //         asMode: "Save",
    //         asRemark: textall
    //     };

    //     dispatch(CDAManageStudentWiseAssessmentGrades(ManageStudentWiseAssessmentGradeBody));
    // };


    const clicksave = () => {
        let isError = false;

        const gradeKeysWithZeroValue = USFillStudentsLearningOutcomes.filter(outcome => grades[outcome.LearningOutcomeConfigId] == "0");
        const gradeKeysWithZeroValue1 = USFillNonXseedSubjectGrades.filter(outcome => grades1[outcome.GradeId] == "0");
        // Check for missing grades in USFillStudentsLearningOutcomes
        if (gradeKeysWithZeroValue.length > 0) {
            const subjectNames = USFillSubjectSections.map(subjectSection => {
                const outcomes = USFillStudentsLearningOutcomes.filter(
                    outcome => outcome.SubjectSectionConfigId === subjectSection.SubjectSectionConfigurationId && grades[outcome.LearningOutcomeConfigId] === "0"
                );
                if (outcomes.length > 0) {
                    const outcomeIndices = outcomes.map((_, index) => index + 1).join(', ');
                    return `${subjectSection.SubjectSectionName} : ${outcomeIndices}`;
                }
                return null;
            }).filter(Boolean);

            if (subjectNames.length > 0) {
                const allSubjectNamesString = subjectNames.join('.\n');
                setReasonError(`Grade should be selected for Learning Outcome(s): ${allSubjectNamesString}`);
                isError = true;
            } else {
                setReasonError("");
            }
        } else {
            setReasonError("");
        }


        if (gradeKeysWithZeroValue1.length > 0) {
            const subjectNames = USFillNonXseedSubjectGrades.map(row => row.SubjectName).join(", ");
            setReasonError1(`Grade should be selected for co-curricular subject(s): ${subjectNames}`);
            isError = true;
        } else {
            setReasonError1("");
        }


        if (!isError) {
            const ManageStudentWiseAssessmentGradeBody: ManageStudentWiseAssessmentGradesBody = {
                asSchoolId: asSchoolId,
                asAcademicYearId: asAcademicYearId,
                asYearwiseStudentId: Number(StandardId),
                asStandardDivisionId: Number(YearwiseStudentId),
                asAssessmentId: Number(AssessmentId),
                asInsertedById: asUserId,
                asLearningOutcomeXML: learningOutcomeXML(),
                asXseedGradesXML: learningOutcomeXML1(),
                asMode: "Save",
                asRemark: textall
            };

            dispatch(CDAManageStudentWiseAssessmentGrades(ManageStudentWiseAssessmentGradeBody));
        }
    };







    const Clickpublish = () => {
        const ManageStudentWiseAssessmentGradeBody: ManageStudentWiseAssessmentGradesBody =
        {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            asYearwiseStudentId: Number(StandardId),
            asStandardDivisionId: Number(YearwiseStudentId),
            asAssessmentId: Number(AssessmentId),
            asInsertedById: asUserId,
            asLearningOutcomeXML: learningOutcomeXML(),
            asXseedGradesXML: learningOutcomeXML1(),
            asMode: "Publish",
            asRemark: textall

        };

        const confirmationMessage = 'Once you publish the result it will be visible to parents/student. Are you sure you want to continue?';

        showAlert({
            title: 'Please Confirm',
            message: confirmationMessage,
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(CDAManageStudentWiseAssessmentGrades(ManageStudentWiseAssessmentGradeBody))
                closeAlert();
            }
        });
    };


    const ClickUnpublish = () => {
        const ManageStudentWiseAssessmentGradeBody: ManageStudentWiseAssessmentGradesBody =
        {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            asYearwiseStudentId: Number(StandardId),
            asStandardDivisionId: Number(YearwiseStudentId),
            asAssessmentId: Number(AssessmentId),
            asInsertedById: asUserId,
            asLearningOutcomeXML: learningOutcomeXML(),
            asXseedGradesXML: learningOutcomeXML1(),
            asMode: "Unpublish",
            asRemark: textall

        };

        const confirmationMessage = 'Once you unpublish the result it will not be visible to parents/student. Are you sure you want to continue?';

        showAlert({
            title: 'Please Confirm',
            message: confirmationMessage,
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(CDAManageStudentWiseAssessmentGrades(ManageStudentWiseAssessmentGradeBody))
                closeAlert();
            }
        });
    };



    const ClickShow = () => {

        navigate('/extended-sidebar/Teacher/PreprimaryProgressReportView/' +
            AssessmentId + '/' +
            YearwiseStudentId + '/' +
            StandardId

        );
    };

    useEffect(() => {
        if (USManageStudentWiseAssessmentGrades != "") {
            toast.success(USManageStudentWiseAssessmentGrades);
            dispatch(resetMessage());
            dispatch(CDAProgressReportDetails(GetProgressReportDetailsBody));
            setReasonError('')
            setReasonError1('')
        }
    }, [USManageStudentWiseAssessmentGrades]);

    console.log(AssessmentPublishStatus, "AssessmentPublishStatusAssessmentPublishStatus");


    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Student Wise Progress Report ', path: '/extended-sidebar/Teacher/StudentwiseProgressReport/' + AssessmentId },
                    { title: 'Progress Report', path: '/extended-sidebar/Teacher/PreprimaryProgressReport' },
                ]}
                rightActions={
                    <>
                        {/* <SearchableDropdown
                            ItemList={USGetStandardwiseAssessmentDetails}
                            sx={{ minWidth: '250px' }}
                            onChange={clickAssessmentId}
                            defaultValue={AssessmentId}
                            label={'Assessment'}
                            size={"small"}

                        /> */}

                        <SearchableDropdown
                            sx={{ minWidth: '15vw' }}
                            ItemList={USAssessmentDrop}
                            onChange={clickAssessmentId}
                            label={'Assessment:'}
                            defaultValue={AssessmentId}
                            size={"small"}
                        />

                        <Tooltip title={'Assign,publish student grades and view students progress report.'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],

                                    height: '36px !important',
                                    ':hover': { backgroundColor: grey[600] }
                                }}
                            >
                                <QuestionMarkIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={'View Progress Report'}>
                            <span>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: blue[500],
                                        '&:hover': {
                                            backgroundColor: blue[600]
                                        }
                                    }}
                                    disabled={StudentWiseAssessmentPublishStatus == "N" || allOutcomesValid == false}

                                    onClick={ClickShow}>
                                    <FactCheck />
                                </IconButton>
                            </span>
                        </Tooltip>



                        {
                            UserDetail.CanPublishUnpublishExam == true ? (
                                <Tooltip title={StudentWiseAssessmentPublishStatus[0] == "N" ? "Publish" : "Unpublish"}>
                                    <span>
                                        <IconButton
                                            sx={{
                                                color: 'white',
                                                backgroundColor: StudentWiseAssessmentPublishStatus[0] == "N" ? blue[500] : red[500],
                                                '&:hover': {
                                                    backgroundColor: StudentWiseAssessmentPublishStatus[0] == "N" ? blue[600] : red[600],
                                                },
                                            }}
                                            disabled={
                                                (AssessmentPublishStatus[0] == "Y" || allOutcomesValid == false)
                                            }
                                            onClick={StudentWiseAssessmentPublishStatus[0] == "N" ? Clickpublish : ClickUnpublish}
                                        >
                                            {StudentWiseAssessmentPublishStatus[0] == "N" ? <CheckCircle /> : <Unpublished />}
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            ) : <span></span>
                        }





                        <Tooltip title={'Save'}>
                            <span>
                                <IconButton
                                    onClick={clicksave}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: green[500],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: green[600] },
                                    }}
                                    disabled={AssessmentPublishStatus == "Y" || StudentWiseAssessmentPublishStatus == "Y"}
                                >
                                    <Save />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </>}
            />

            <ErrorMessage1 Error={ReasonError}></ErrorMessage1>
            <ErrorMessage1 Error={ReasonError1}></ErrorMessage1>

            <Box border="1px solid grey" mb={4} sx={{ px: 2, background: 'white' }}>
                <Box sx={{ pt: 2, background: 'white' }}>
                    <Grid container spacing={3}>
                        {USFillSchoolDetails.map((detail) => (
                            <Grid item xs={12} >
                                <Box sx={{
                                    backgroundColor: '#F0F0F0',
                                    textAlign: 'center',
                                    borderLeft: '1px solid grey',
                                    borderRight: '1px solid grey'
                                }} >
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={0}>

                                        {detail.OrganizationName}

                                    </Typography>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={0} >

                                        {detail.School_Name}

                                    </Typography>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={0}>

                                        Progress Report

                                    </Typography>
                                    <hr />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Table>
                    <TableBody>
                        {USFillStudentDetails.map((detail) => (
                            <TableRow sx={{ bgcolor: '#38548A' }}>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No :  {detail.RollNo} </b></TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name:  {detail.StudentName} </b></TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class :  {detail.Class} </b></TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year :  {detail.AcademicYear} </b></TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Assessment : {detail.Assessment} </b></TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Attendance :  {USFillStudentAttendance.filter(
                                    (attendance) =>
                                        attendance.YearwiseStudentId == detail.YearWiseStudentId &&
                                        attendance.IsPresent == "true"
                                ).length} / {

                                        USFillStudentAttendance.filter(
                                            (item) => item.YearwiseStudentId == detail.YearWiseStudentId
                                        ).length

                                    } </b></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div>
                    <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} mt={2}>
                        Key to Curricular and Co-Curricular
                    </Typography>
                    <TableContainer component={Box} >
                        <Table aria-label="simple table" sx={{ border: '1px solid lightgrey' }}>
                            <TableHead>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                    <TableCell sx={{
                                        textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                        py: 1
                                    }}>Grade Name</TableCell>
                                    <TableCell sx={{
                                        textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                        py: 1
                                    }}>Description</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {GradeDetailsfilteredAndSortedData.map((row) => (
                                    <TableRow key={row.GradeId}>
                                        <TableCell sx={{ py: 1 }}>{row.Name}</TableCell>
                                        <TableCell sx={{ py: 1 }}>{row.Description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box mt={1}>
                        <Table aria-label="simple table" sx={{ border: '1px solid lightgrey' }}>
                            <TableBody>
                                <TableRow sx={{ bgcolor: '#F0F0F0', border: '1px solid lightgrey' }}>
                                    <TableCell sx={{ textAlign: 'left', py: 1, color: 'black', p: 1 }}><b>Note :&nbsp; </b> Ab - Absent &nbsp; &nbsp; &nbsp;  Ex - Exempted </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </div>
                <>
                    <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} mt={2}>
                        Pre-Primary Curricular Subjects
                    </Typography>

                    <TableContainer component={Box} sx={{ border: '1px solid lightgrey' }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                    <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Sr. No.</TableCell>
                                    <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Learning Outcome</TableCell>
                                    {/* <TableCell align="left" sx={{ color: (theme) => theme.palette.common.white, py: 1 }}>Grade</TableCell> */}
                                    <TableCell sx={{ textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main, color: 'white', pt: '10px', pb: '10px' }}>
                                        <SearchableDropdown
                                            ItemList={USFillGradeDetails}
                                            defaultValue={headerGrade}
                                            label={''}
                                            sx={{ maxWidth: '20vw', backgroundColor: 'white', marginLeft: '5px' }}
                                            size={"small"}
                                            DisableClearable={true}
                                            onChange={clickHeaderGrade}
                                            mandatory
                                            disabled={(StudentWiseAssessmentPublishStatus == "Y" && AssessmentPublishStatus == "N") || (IsPublished == 'Y' && PublishStatus == "Y")}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {USFillSubjectSections.map(subjectSection => (
                                    <React.Fragment key={subjectSection.SubjectSectionConfigurationId}>
                                        <TableRow sx={{ backgroundColor: '#F0F0F0', alignItems: 'center' }}>
                                            <TableCell sx={{ py: 1.5, fontWeight: 'bold' }} colSpan={4}>
                                                {subjectSection.SubjectSectionName}
                                            </TableCell>
                                        </TableRow>

                                        {FillStudentsLearningOutcomessortedOutcomes.filter(outcome => outcome.SubjectSectionConfigId === subjectSection.SubjectSectionConfigurationId)
                                            .map((outcome, index) => (
                                                <TableRow key={outcome.YearwiseStudentId}>
                                                    <TableCell sx={{ py: 1 }}>{index + 1}</TableCell>
                                                    <TableCell sx={{ py: 1 }}>{outcome.LearningOutcome}</TableCell>
                                                    {/* <TableCell sx={{ py: 1, borderRight: '1px solid lightgrey' }}>{outcome.ShortName}</TableCell> */}
                                                    <TableBody>
                                                        {outcome.SubjectSectionConfigId === subjectSection.SubjectSectionConfigurationId && (
                                                            <TableRow>
                                                                <TableCell sx={{ py: 1 }}>

                                                                    <SearchableDropdown
                                                                        key={outcome.LearningOutcomeConfigId}
                                                                        ItemList={USFillGradeDetails}
                                                                        defaultValue={grades[outcome.LearningOutcomeConfigId]}
                                                                        label={''}
                                                                        sx={{ width: '20vw', backgroundColor: 'white' }}
                                                                        size={"small"}
                                                                        DisableClearable={true}
                                                                        onChange={(value) => clickGrade(value, outcome.LearningOutcomeConfigId)}
                                                                        mandatory
                                                                        disabled={(StudentWiseAssessmentPublishStatus == "Y" && AssessmentPublishStatus == "N") || (IsPublished == 'Y' && PublishStatus == "Y")}

                                                                    />

                                                                </TableCell>

                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </TableRow>
                                            ))}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
                {
                    USFillNonXseedSubjectGrades.length > 0 ? (
                        <div>
                            <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} mt={2}>
                                Co-Curricular Subjects
                            </Typography>
                            <TableContainer component={Box}>
                                <Table aria-label="simple table" sx={{ border: '1px solid lightgrey' }}>
                                    <TableHead>
                                        <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                            <TableCell sx={{
                                                textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                                py: 1
                                            }}>Subject</TableCell>

                                            <TableCell sx={{
                                                textTransform: 'capitalize', backgroundColor: (theme) => theme.palette.secondary.main,
                                                color: 'white', pt: '10px', pb: '10px'
                                            }}>
                                                <SearchableDropdown
                                                    ItemList={USFillGradeDetails}
                                                    defaultValue={headerGrade1}
                                                    label={''}
                                                    sx={{ maxWidth: '20vw', backgroundColor: 'white', marginLeft: '5px' }}
                                                    size={"small"}
                                                    DisableClearable={true}
                                                    onChange={clickHeaderGrade1}
                                                    mandatory
                                                    disabled={(StudentWiseAssessmentPublishStatus === "Y" && AssessmentPublishStatus === "N") || (IsPublished === 'Y' && PublishStatus === "Y")}
                                                />
                                            </TableCell>

                                            {/* Conditionally render the "Facilitator's Observation" header based on asSchoolId */}
                                            {asSchoolId !== 18 && (
                                                <TableCell sx={{
                                                    textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                                    py: 1
                                                }}>Facilitator's Observation</TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {USFillNonXseedSubjectGrades.map((row) => (
                                            <TableRow key={row.YearwiseStudentId}>
                                                <TableCell sx={{ py: 1 }}>{row.SubjectName}</TableCell>
                                                <TableCell key={row.GradeId}>
                                                    <SearchableDropdown
                                                        ItemList={USFillGradeDetails}
                                                        defaultValue={grades1[row.GradeId]}
                                                        label={''}
                                                        sx={{ width: '20vw', backgroundColor: 'white' }}
                                                        size={"small"}
                                                        DisableClearable={true}
                                                        onChange={(value) => clickGrade1(value, row.GradeId)}
                                                        mandatory
                                                        disabled={(StudentWiseAssessmentPublishStatus === "Y" && AssessmentPublishStatus === "N") || (IsPublished === 'Y' && PublishStatus === "Y")}
                                                    />
                                                </TableCell>
                                                {/* Conditionally render the observation cell based on asSchoolId */}
                                                {asSchoolId !== 18 && (
                                                    <TableCell sx={{ py: 1 }}>{row.Observation}</TableCell>
                                                )}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    ) : null
                }

                <br></br>
                <Box>
                    <TextField
                        label={
                            <div>
                                Remark {/* Remark <span style={{ color: 'red' }}>*</span> */}
                            </div>
                        }
                        multiline
                        value={textall}
                        onChange={Detailschnageall3}
                        fullWidth
                        disabled={(StudentWiseAssessmentPublishStatus == "Y" && AssessmentPublishStatus == "N") || (IsPublished == 'Y' && PublishStatus == "Y")}

                    />
                    <Typography variant="caption" align="right" display="block" color="textSecondary">
                        ({maxChars - textall.length} )
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
export default StudentwiseprogressreportEdit;
