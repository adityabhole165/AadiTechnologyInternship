import { Check, CheckCircle, FactCheck, QuestionMark, Save } from "@mui/icons-material";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { blue, green, grey, red } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AlertContext } from 'src/contexts/AlertContext';
import { IGetPerformanceEvaluationDetailsBody, IPublishStaffPerformanceDetailsBody, ISaveStaffPerformanceEvalDetailsBody, ISubmitStaffPerformanceDetailsBody } from "src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment";
import SuspenseLoader from "src/layouts/components/SuspenseLoader";
import Datepicker3 from "src/libraries/DateSelector/Datepicker3";
import SearchableDropdown1 from "src/libraries/ResuableComponents/SearchableDropdown1";
import { CDAGetDetailsForAttachment, CDAGetPerformanceEvaluationDetails, CDAPublishStaffPerformanceDetailsMsg, CDAResetPublishStaffPerformanceDetailsMsg, CDAResetSaveStaffPerformanceEvalDetailsMsg, CDAResetSubmitStaffPerformanceDetailsMsg, CDASaveStaffPerformanceEvalDetailsMsg, CDASubmitStaffPerformanceDetailsMsg } from "src/requests/PerformanceGradeAssignmentBaseScreen/RequestPerformanceGradeAssignment";
import { encodeURL, formatDate } from "../Common/Util";
import CommonPageHeader from "../CommonPageHeader";
import UploadDocument from "./UploadDocument";
// import DatePicker from "react-multi-date-picker";

const getTodayDate = () => {
    const today = new Date(); // Get the current date
    const day = String(today.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with zero if needed
    const year = today.getFullYear(); // Get full year
    return `${day}-${month}-${year}`; // Format to 'DD-MM-YYYY'
};

const PerformanceEvaluation = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showAlert, closeAlert } = useContext(AlertContext);
    const todayDate = getTodayDate();
    // useSelectors and Store Data
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
    const formType = listTecherTitleDetails[0]?.Text7;
    // data is passed from the previous page using navigate's state property and accessed using useLocation hook 
    // and the Object is destructured for further use
    let userNameDetails = listUserNameDetails[0];
    const { userId, asYear, status } = location.state || {};
    const schoolId = localStorage.getItem('SchoolId');
    const academicYearId = sessionStorage.getItem('AcademicYearId');
    const reportingUserId = sessionStorage.getItem('Id');
    const currentSignedInUser = sessionStorage.getItem('Id');
    const [effectiveDate, setEffectiveDate] = useState('');
    const [incrementDate, setIncrementDate] = useState('');
    const [classTaught, setClassTaught] = useState('');
    const [teachingSub, setTeachingSub] = useState('');
    const [uploadDoc, setUploadDoc] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [uploadDocUserName, setUploadDocUserName] = useState('');
    const [uploadDocUserId, setUploadDocUserId] = useState('');
    const [initialStaffPerfEval, setInitialStaffPerfEval] = useState({});
    const [classError, setClassError] = useState(false);
    const [teachingSubError, setTeachingSubError] = useState(false);
    const [gradeError, setGradeError] = useState('');
    const [obsError, setObsError] = useState('');
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
        dispatch(CDAGetDetailsForAttachment(PerformanceEvaluationDetailsBody))
        if (listSchoolOrgNameDetails.length > 0) {
            console.log(listSchoolOrgNameDetails)
        }
    }, [dispatch, userId, asYear]);
    function viewReport() {
        const dataPass = {
            asYear: asYear,
            asUserId: userId,
        }
        navigate(`/extended-sidebar/Teacher/PerfEvalViewReport`, { state: dataPass })
    }

    useEffect(() => {
        if (listUserNameDetails.length > 0) {
            console.log(`😎`, listUserNameDetails)
        }
    }, [listUserNameDetails])

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
    useEffect(() => {
        if (SubmitStaffPerformanceDetailsMsg !== '') {
            toast.success(SubmitStaffPerformanceDetailsMsg);
            dispatch(CDAResetSubmitStaffPerformanceDetailsMsg());
            dispatch(CDAGetPerformanceEvaluationDetails(PerformanceEvaluationDetailsBody));
        }
    }, [SubmitStaffPerformanceDetailsMsg])
    useEffect(() => {
        if (PublishStaffPerformanceDetailsMsg !== '') {
            toast.success(PublishStaffPerformanceDetailsMsg);
            dispatch(CDAResetPublishStaffPerformanceDetailsMsg());
            dispatch(CDAGetPerformanceEvaluationDetails(PerformanceEvaluationDetailsBody));
        }
    }, [PublishStaffPerformanceDetailsMsg])
    useEffect(() => {
        if (SaveStaffPerformanceEvalDetailsMsg !== '') {
            toast.success(SaveStaffPerformanceEvalDetailsMsg);
            dispatch(CDAResetSaveStaffPerformanceEvalDetailsMsg());
            dispatch(CDAGetPerformanceEvaluationDetails(PerformanceEvaluationDetailsBody));
        }
    }, [SaveStaffPerformanceEvalDetailsMsg])

    function showEffDate(userId) {
        let flag = false;
        let filteredArray = listIsFinalApproverDetails.filter((item) => item.Text3 === userId);
        if (filteredArray.length > 0 && (filteredArray[0]?.Text4 === 'True' || filteredArray[0]?.Text5 === 'True')) {
            flag = true;
        }
        return flag;
    }
    function isSelfUser() {
        // This function checks if currently signed-in user is viewing
        // his own form and submit status of form is Pending i.e, -> 2
        let flag = false;
        let localUserId = sessionStorage.getItem('Id');
        if (userId === localUserId && status === '2') {
            flag = true;
        }
        return flag;
    }
    function isSelfUserBody(id) {
        let flag = false;
        let localUserId = sessionStorage.getItem('Id');
        if (id === localUserId && !isSubmittedForm(id)) {
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
        let flag = false;
        if (status === '1') {
            flag = true;
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
    // Initial StaffPerformanceEvalDetailsLogic 

    // useEffect(() => {
    //     if (ListLearningOutcomeDetails.length > 0) {
    //         const initialGrades = ListLearningOutcomeDetails.reduce((acc, student) => {
    //             acc[student.Text1] = `${student.Text4}-${student.Text5}`;
    //             return acc;
    //         }, {});
    //         setGrades(initialGrades);
    //     }
    // }, [ListLearningOutcomeDetails])

    // #region Preformatting
    useEffect(() => {
        if (listOriginalSkillIdDetails.length > 0) {
            const initialEvalRowValues = listOriginalSkillIdDetails.reduce((acc, item1) => {
                const matchedItems2 = listTecherTitleDetails.filter(item2 => item2.Text4 === item1.Text1);
                matchedItems2.forEach(matchedItem2 => {
                    const matchedItems3 = listParameterIdDetails.filter(item3 => item3.Text2 === matchedItem2.Text1);
                    console.log(matchedItems3.length, 'this was length and items is', matchedItems3)
                    if (matchedItems3.length === 0) {
                        console.log('currently in zero lenght loop')
                        if (item1.Text8 === "True") {
                            listIsFinalApproverDetails.forEach(item7 => {
                                const key = `${item1.Text1}-${matchedItem2.Text1}-0-${item7.Text3}-${item1.Text7}`;
                                const value = JSON.stringify({
                                    id: '0',
                                    parameterId: matchedItem2.Text1,
                                    gradeId: '0',
                                    observation: '',
                                    reportingUserId: item7.Text3
                                })
                                acc[key] = value;
                                console.log('True key and value is', key, value)
                            })
                        }
                        if (item1.Text8 === "False") {
                            const key = `${item1.Text1}-${matchedItem2.Text1}-0-${userId}-${item1.Text7}`;
                            const value = JSON.stringify({
                                id: '0',
                                parameterId: matchedItem2.Text1,
                                gradeId: '0',
                                observation: '',
                                reportingUserId: userId
                            })
                            acc[key] = value;
                            console.log('False key and value is', key, value)
                        }
                    }
                    matchedItems3.forEach(matchedItem3 => {
                        // listOriginalSkillIdDetails.Text1-listTecherTitleDetails.Text1-0-listParameterIdDetails.Text5-listOriginalSkillIdDetails.Text7
                        const key = `${item1.Text1}-${matchedItem2.Text1}-0-${matchedItem3.Text5}-${item1.Text7}`;
                        const value = JSON.stringify({
                            id: '0',
                            parameterId: matchedItem3.Text2,
                            gradeId: matchedItem3.Text3,
                            observation: matchedItem3.Text4,
                            reportingUserId: matchedItem3.Text5
                        });
                        console.log('⛳current Key', key, 'and value is', value, 'question is', item1.Text2)
                        acc[key] = value;
                    });
                });
                return acc;
            }, {});
            setInitialStaffPerfEval(initialEvalRowValues);
            console.log(`-->`, initialEvalRowValues);
        }
    }, [listOriginalSkillIdDetails, listTecherTitleDetails, listParameterIdDetails, listIsFinalApproverDetails, userId]);
    // #endregion

    const parseJSON = (jsonString) => {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return null;
        }
    };

    const updateStaffPerfEvalGrade = (key, gradeId, parameterId, reportingUserId) => {
        console.log('🎃', initialStaffPerfEval);
        const updatedFields = {
            gradeId: gradeId
        }
        const newlyUpdatedFields = {
            id: '0',
            parameterId: parameterId,
            gradeId: gradeId,
            observation: '',
            reportingUserId: reportingUserId
        }
        setInitialStaffPerfEval(prevState => {
            const newState = { ...prevState };
            if (newState[key]) {
                const currentValue = JSON.parse(newState[key]);
                const updatedValue = { ...currentValue, ...updatedFields };
                newState[key] = JSON.stringify(updatedValue);
            } else {
                newState[key] = JSON.stringify(newlyUpdatedFields);
            }
            return newState;
        });

    };
    // id: '0',
    // parameterId: matchedItem3.Text2,
    // gradeId: matchedItem3.Text3,
    // observation: matchedItem3.Text4,
    // reportingUserId: matchedItem3.Text5
    // listOriginalSkillIdDetails.Text1-listTecherTitleDetails.Text1-0-listParameterIdDetails.Text5-listOriginalSkillIdDetails.Text7
    const updateStaffPerfEvalObs = (key, observation, parameterId, reportingUserId) => {
        const updatedFields = {
            observation: observation
        }
        const newlyUpdatedFields = {
            id: '0',
            parameterId: parameterId,
            gradeId: '0',
            observation: observation,
            reportingUserId: reportingUserId
        }
        setInitialStaffPerfEval(prevState => {
            const newState = { ...prevState };
            if (newState[key]) {
                const currentValue = JSON.parse(newState[key]);
                const updatedValue = { ...currentValue, ...updatedFields };
                newState[key] = JSON.stringify(updatedValue);
            } else {
                newState[key] = JSON.stringify(newlyUpdatedFields);
            }
            return newState;
        });
    };

    interface EvalRowValue {
        id: string;
        parameterId: string;
        gradeId: string;
        observation: string;
        reportingUserId: string;
    }
    function validateGrades(evalRowValues: Record<string, string>): { isValidGrade: boolean; errorMessage: string } {
        const invalidRows: number[] = [];
        let gradeRowCount = 0;

        Object.entries(evalRowValues).forEach(([key, value]) => {
            if (typeof value === 'string') {
                try {
                    const parsedValue: EvalRowValue = JSON.parse(value);
                    const [, , , , inputTypeId] = key.split('-');

                    // Check both conditions: matching reportingUserId and inputTypeId is '3'
                    if (parsedValue.reportingUserId === reportingUserId && inputTypeId === '3') {
                        gradeRowCount++; // Increment the count for each grade row
                        if (parsedValue.gradeId === '0') {
                            invalidRows.push(gradeRowCount);  // Use the grade row count instead of index
                        }
                    }
                } catch (error) {
                    console.error("Error parsing JSON value: ", error);
                }
            }
        });

        if (invalidRows.length > 0) {
            return {
                isValidGrade: false,
                errorMessage: `Grade should be selected for row(s): ${invalidRows.join(', ')}`
            };
        }

        return { isValidGrade: true, errorMessage: '' };
    }

    function validateObs() {
        console.log(`🏠`, initialStaffPerfEval)
        for (let key in initialStaffPerfEval) {
            const item = JSON.parse(initialStaffPerfEval[key]);

            // Split the key and check if the first part (input type) is '2'
            if (key.split('-')[4] === '2' && item.reportingUserId === reportingUserId && item.observation !== "") {
                return true;
            }
            else if (key.split('-')[4] === '2' && item.reportingUserId !== reportingUserId && item.observation !== "") {
                return true;
            }
        }
        return false;
    }

    function generatePerformanceXml(evalRowValues: Record<string, string>): string {
        const parser = new DOMParser();
        let xmlString = '';
        Object.keys(evalRowValues).forEach((key) => {
            const value: unknown = evalRowValues[key];

            // Ensure the value is a string before parsing
            if (typeof value === 'string') {
                try {
                    const parsedValue: EvalRowValue = JSON.parse(value);
                    // Construct XML string
                    if (parsedValue.reportingUserId === reportingUserId) {
                        xmlString += `<StaffPerformanceObservation>
                        <Id>0</Id>
                        <StaffPerformanceEvalDetailsId>0</StaffPerformanceEvalDetailsId>
                        <ParameterId>${parsedValue.parameterId}</ParameterId>
                        <GradeId>${parsedValue.gradeId}</GradeId>
                        <ReportingUserId>${parsedValue.reportingUserId}</ReportingUserId>
                        <Observation>${parsedValue.observation}</Observation>
                      </StaffPerformanceObservation>`;
                    }
                } catch (error) {
                    console.error("Error parsing JSON value: ", error);
                }
            }
        });

        xmlString = "<ArrayOfStaffPerformanceObservation xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'>" + xmlString + "</ArrayOfStaffPerformanceObservation>";
        return xmlString;
    }
    // const PerformanceEvaluationDetailsBody: IGetPerformanceEvaluationDetailsBody = {
    //     asSchoolId: Number(schoolId),
    //     asUserId: Number(userId),
    //     asReportingUserId: Number(reportingUserId),
    //     asYear: Number(asYear),
    //     asAcademicYearId: Number(academicYearId)
    // }
    const isValid = () => {
        let selfUser = isSelfUser();
        if (selfUser && classTaught.trim() !== '' && teachingSub.trim() !== '') {
            return true;
        } else if (selfUser === false) {
            return true
        } else {
            return false;
        }
    }
    const isSubmittedForm = (userId) => {
        let flag = false;
        if (ListIsPublishDetails?.length > 0) {
            const filteredArr = ListIsPublishDetails?.filter(item => item.Text3 === userId);
            if (filteredArr.length > 0) {
                filteredArr[0]?.Text2 === 'True' ? flag = true : flag = false;
            }
        }
        return flag;
    }
    const savePerfEval = (buttonType) => {
        console.log('🎃 ✅', initialStaffPerfEval);
        let flag = false;
        setObsError('');
        setGradeError('');
        setTeachingSubError(false);
        setClassError(false);
        const { isValidGrade, errorMessage } = validateGrades(initialStaffPerfEval);
        let data = generatePerformanceXml(initialStaffPerfEval);
        console.log(data);
        let selfUser = isSelfUser();
        const SaveStaffPerformanceEvalDetailBody: ISaveStaffPerformanceEvalDetailsBody = {
            asSchoolId: Number(schoolId),
            asUpdatedById: Number(reportingUserId),
            asUserId: Number(userId),
            asReportingUserId: Number(reportingUserId),
            asYear: Number(asYear),
            asPerformanceXml: generatePerformanceXml(initialStaffPerfEval),
            asClasses: classTaught.toString(),
            asSubjects: teachingSub.toString()
        }
        if (isValid() && isValidGrade && validateObs()) {
            flag = true;
            dispatch(CDASaveStaffPerformanceEvalDetailsMsg(SaveStaffPerformanceEvalDetailBody, buttonType));
            setClassError(false)
            setTeachingSubError(false)
        }
        if (selfUser && classTaught?.trim() === '') {
            setClassError(true)
        }
        if (selfUser && teachingSub?.trim() === '') {
            setTeachingSubError(true)
        }
        if (!isValidGrade) {
            setGradeError(errorMessage);
        }
        if (!validateObs()) {
            setObsError('Value for at least one observation should be set.')
        }

        return flag
    }
    function preValidation() {
        let flag = false;
        let selfUser = isSelfUser();
        setObsError('');
        setGradeError('');
        setTeachingSubError(false);
        setClassError(false);
        const { isValidGrade, errorMessage } = validateGrades(initialStaffPerfEval);
        if (isValid() && isValidGrade && validateObs()) {
            flag = true;
            setClassError(false)
            setTeachingSubError(false)
        }
        if (selfUser && classTaught?.trim() === '') {
            setClassError(true)
        }
        if (selfUser && teachingSub?.trim() === '') {
            setTeachingSubError(true)
        }
        if (!isValidGrade) {
            setGradeError(errorMessage);
        }
        if (!validateObs()) {
            setObsError('Value for at least one observation should be set.')
        }
        return flag
    }

    const submitEval = () => {
        // let flag = savePerfEval('submit');
        let selfUser = isSelfUser();
        const SubmitStaffPerformanceDetailBody: ISubmitStaffPerformanceDetailsBody = {
            asSchoolId: Number(schoolId),
            asUserId: Number(userId),
            asReportingUserId: Number(reportingUserId),
            asYear: Number(asYear),
            asIsSubmitAction: 1
        }
        if (isValid() && preValidation()) {
            showAlert({
                title: 'Please Confirm',
                message: 'This action will save and submit current details. Are you sure you want to continue?',
                variant: 'warning',
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                onConfirm: () => {
                    if (isValid() && savePerfEval('submit')) {
                        dispatch(CDASubmitStaffPerformanceDetailsMsg(SubmitStaffPerformanceDetailBody));
                        setClassError(false)
                        setTeachingSubError(false)
                    }
                    closeAlert();
                },
                onCancel: closeAlert
            });
            setClassError(false)
            setTeachingSubError(false)
        }
        if (selfUser && classTaught === '') {
            setClassError(true)
        } else {
            setClassError(false)
        }
        if (selfUser && teachingSub === '') {
            setTeachingSubError(true)
        } else {
            setTeachingSubError(false)
        }
    }
    const unsubmitEval = () => {
        const SubmitStaffPerformanceDetailBody: ISubmitStaffPerformanceDetailsBody = {
            asSchoolId: Number(schoolId),
            asUserId: Number(userId),
            asReportingUserId: Number(reportingUserId),
            asYear: Number(asYear),
            asIsSubmitAction: 0
        }
        showAlert({
            title: 'Please Confirm',
            message: 'This action will unsubmit current details. Are you sure you want to continue?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onConfirm: () => {
                dispatch(CDASubmitStaffPerformanceDetailsMsg(SubmitStaffPerformanceDetailBody))
                closeAlert();
            },
            onCancel: closeAlert
        });
    }
    const publishEval = () => {
        const PublishStaffPerformanceDetailBody: IPublishStaffPerformanceDetailsBody = {
            asSchoolId: Number(schoolId),
            asUserId: Number(userId),
            asReportingUserId: Number(reportingUserId),
            asYear: Number(asYear),
            asIsPublish: true,
            asAcademicYearId: Number(academicYearId),
            asEffectiveDate: effectiveDate,
            asLastIncrementDate: incrementDate
        }
        showAlert({
            title: 'Please Confirm',
            message: 'This action will publish current details. Are you sure you want to continue?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onConfirm: () => {
                dispatch(CDAPublishStaffPerformanceDetailsMsg(PublishStaffPerformanceDetailBody))
                closeAlert();
            },
            onCancel: closeAlert
        });
    }
    const unpublishEval = () => {
        const PublishStaffPerformanceDetailBody: IPublishStaffPerformanceDetailsBody = {
            asSchoolId: Number(schoolId),
            asUserId: Number(userId),
            asReportingUserId: Number(reportingUserId),
            asYear: Number(asYear),
            asIsPublish: false,
            asAcademicYearId: Number(academicYearId),
            asEffectiveDate: effectiveDate,
            asLastIncrementDate: incrementDate
        }
        showAlert({
            title: 'Please Confirm',
            message: 'This action will unpublish all published details. Are you sure you want to continue?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onConfirm: () => {
                dispatch(CDAPublishStaffPerformanceDetailsMsg(PublishStaffPerformanceDetailBody))
                closeAlert();
            },
            onCancel: closeAlert
        });
    }


    // #region Return Code
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
                            {isFinalApprover() &&
                                <>

                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Tooltip title={'View report'}>
                                            <span>
                                                <IconButton
                                                    disabled={!isSubmittedForm(reportingUserId)}
                                                    sx={{
                                                        color: 'white',
                                                        backgroundColor: blue[500],
                                                        '&:hover': {
                                                            backgroundColor: blue[600],
                                                        },
                                                    }}
                                                    onClick={viewReport}
                                                >
                                                    <FactCheck />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Box>
                                    {listEnableRejectButtonDetails?.length > 0 && listEnableRejectButtonDetails[0].Text4 === 'True' &&
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Tooltip title={'Publish'}>
                                                <span>
                                                    <IconButton
                                                        disabled={listEnableRejectButtonDetails?.length > 0 && listEnableRejectButtonDetails[0].Text4 === 'True' ? false : true}
                                                        sx={{
                                                            color: 'white',
                                                            backgroundColor: blue[500],
                                                            '&:hover': {
                                                                backgroundColor: blue[600],
                                                            },
                                                        }}
                                                        onClick={publishEval}
                                                    >
                                                        <CheckCircle />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </Box>}
                                </>}
                            {isFinalApprover() && listEnableRejectButtonDetails?.length > 0 && listEnableRejectButtonDetails[0].Text5 === "1" &&
                                <Tooltip title={'Unpublish'}>
                                    <span>
                                        <IconButton
                                            disabled={listEnableRejectButtonDetails?.length > 0 && listEnableRejectButtonDetails[0].Text5 === '1' ? false : true}
                                            sx={{
                                                color: 'white',
                                                backgroundColor: red[500],
                                                '&:hover': {
                                                    backgroundColor: red[600],
                                                },
                                            }}
                                            onClick={unpublishEval}
                                        >
                                            <UnpublishedIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>}
                            {isFinalApprover() && listEnableRejectButtonDetails?.length > 0 && listEnableRejectButtonDetails[0].Text3 === 'True' &&
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Tooltip title={'Submit'}>
                                        <span>
                                            <IconButton
                                                disabled={listEnableRejectButtonDetails?.length > 0 && listEnableRejectButtonDetails[0].Text3 === 'True' ? false : true}
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor: green[500],
                                                    '&:hover': {
                                                        backgroundColor: green[600],
                                                    },
                                                }}
                                                onClick={submitEval}
                                            >
                                                <Check />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Box>}
                            {!isFinalApprover() &&
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Tooltip title={'Submit'}>
                                        <span>
                                            <IconButton
                                                disabled={listEnableRejectButtonDetails?.length > 0 && listEnableRejectButtonDetails[0].Text3 === 'True' ? false : true}
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor: green[500],
                                                    '&:hover': {
                                                        backgroundColor: green[600],
                                                    },
                                                }}
                                                onClick={submitEval}
                                            >
                                                <Check />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Box>}

                            {isFinalApprover() && listEnableRejectButtonDetails.length > 0 && listEnableRejectButtonDetails[0]?.Text4 === 'True' &&
                                <Tooltip title={'Unsubmit'}>
                                    <span>
                                        <IconButton
                                            disabled={listEnableRejectButtonDetails?.length > 0 && listEnableRejectButtonDetails[0].Text4 === 'True' ? false : true}
                                            sx={{
                                                color: 'white',
                                                backgroundColor: red[500],
                                                '&:hover': {
                                                    backgroundColor: red[600],
                                                },
                                            }}
                                            onClick={unsubmitEval}
                                        >
                                            <EventBusyIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            }
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title={'Save'}>
                                    <span>
                                        <IconButton
                                            disabled={listEnableRejectButtonDetails?.length > 0 && listEnableRejectButtonDetails[0].Text2 === 'True' ? false : true}
                                            sx={{
                                                color: 'white',
                                                backgroundColor: green[500],
                                                '&:hover': {
                                                    backgroundColor: green[600]
                                                }
                                            }}
                                            onClick={() => { savePerfEval('save') }}
                                        >
                                            <Save />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                        </>}
                />
                {Object.keys(initialStaffPerfEval).length === 0 || attachmentDetails.length === 0 || loading ? <SuspenseLoader /> :
                    <Box border={1} sx={{ p: 2, background: 'white' }}>
                        <Box mb={1}>
                            {classError && <>
                                <div style={{ color: 'red', fontWeight: 'bolder' }}>Classes Taught should not be blank.</div>
                            </>}
                            {teachingSubError &&
                                <div style={{ color: 'red', fontWeight: 'bolder' }}>Teaching Subjects should not be blank.</div>}
                            {gradeError.length > 0 &&
                                <div style={{ color: 'red', fontWeight: 'bolder' }}>{gradeError}</div>}
                            {obsError.length > 0 &&
                                <div style={{ color: 'red', fontWeight: 'bolder' }}>{obsError}</div>}
                        </Box>
                        {/* {teachingSubError !== '' && */}
                        <Grid container spacing={3}>
                            {listSchoolOrgNameDetails?.map((item, i) => (
                                <Grid item xs={12} key={item.UserId}>
                                    <Table>
                                        <TableRow sx={{ backgroundColor: '#F0F0F0' }}>
                                            <TableCell align="center" sx={{ border: '1px solid black', py:1 }}>
                                                <Typography variant={"h4"} color={"#38548a"}>
                                                    {item.schoolOrgName}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ backgroundColor: '#F0F0F0' }}>
                                            <TableCell align="center" sx={{ border: '1px solid black', py:1  }}>
                                                <Typography variant={"h4"} color={"#38548a"}>
                                                    {item.schoolName}
                                                </Typography></TableCell>
                                        </TableRow>
                                        <TableRow sx={{ backgroundColor: '#F0F0F0' }}>
                                            <TableCell align="center" sx={{ border: '1px solid black', py:1  }}>      <Typography variant={"h4"} color={"#38548a"}>
                                                {item.address}
                                            </Typography></TableCell>
                                        </TableRow>
                                        <TableRow sx={{ backgroundColor: '#F0F0F0' }}>
                                            <TableCell align="center" sx={{ border: '1px solid black', py:1  }}>
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
                                                                    disabled={listEnableRejectButtonDetails[0]?.Text5 === '1' ? true : false}
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
                                                    onChange={(e) => {
                                                        isSelfUser() ? setClassTaught(e.target.value) : '';
                                                    }}
                                                    size="small"
                                                    inputProps={{ maxLength: 100, readOnly: isSelfUser() ? false : true, }}
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
                                                    onChange={(e) => {
                                                        isSelfUser() ? setTeachingSub(e.target.value) : '';
                                                    }}
                                                    inputProps={{ maxLength: 100, readOnly: isSelfUser() ? false : true, }}
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
                                                        disabled={listEnableRejectButtonDetails[0]?.Text5 === '1' ? true : false}
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
                                {listOriginalSkillIdDetails?.length > 0 &&
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
                                                                                {getFinalApproverName(userId)}
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={{
                                                                                    padding: item.Text7 === '2' && isSelfUserBody(userId) ? '0' : '5px',
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
                                                                                {item.Text7 === '2' && isSelfUserBody(userId) ? (
                                                                                    <textarea
                                                                                        maxLength={4000}
                                                                                        rows={3}
                                                                                        style={{
                                                                                            width: '100%',
                                                                                            height: '100%',
                                                                                            resize: 'vertical',
                                                                                            backgroundColor: 'white',
                                                                                            margin: 0,
                                                                                            padding: '5px',
                                                                                            border: '0.5px solid #f4f4f5',
                                                                                            boxSizing: 'border-box',
                                                                                            display: 'block', // Ensures the textarea behaves as a block element
                                                                                        }}
                                                                                        value={parseJSON(initialStaffPerfEval[`${item.Text1}-${item1.Text1}-0-${userId}-${item.Text7}`])?.observation ?? ''}
                                                                                        onChange={(e) => { updateStaffPerfEvalObs(`${item.Text1}-${item1.Text1}-0-${userId}-${item.Text7}`, e.target.value, item1.Text1, userId) }}
                                                                                        disabled={isSubmittedForm(userId)}
                                                                                    />
                                                                                ) : item.Text7 === '2' && getObsName1(item1.Text1, userId)}

                                                                                {item.Text7 === '3' && isSelfUserBody(userId) ? (
                                                                                    <SearchableDropdown1
                                                                                        defaultValue={parseJSON(initialStaffPerfEval[`${item.Text1}-${item1.Text1}-0-${userId}-${item.Text7}`])?.gradeId ?? '0'}
                                                                                        ItemList={gradeDropddownList}
                                                                                        size={"small"}
                                                                                        disabled={isSubmittedForm(userId)}
                                                                                        DisableClearable={true}
                                                                                        sx={{ maxWidth: '15vw' }}
                                                                                        onChange={(value) => { updateStaffPerfEvalGrade(`${item.Text1}-${item1.Text1}-0-${userId}-${item.Text7}`, value.Value, item1.Text1, userId) }}
                                                                                    />
                                                                                ) : item.Text7 === '3' && getGradeName1(item1.Text1, userId)}
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
                                                                                        {item.Text7 === '2' && isSelfUserBody(item7.Text3) ? (
                                                                                            <textarea
                                                                                                maxLength={4000}
                                                                                                rows={3}
                                                                                                style={{
                                                                                                    width: '100%',
                                                                                                    height: '100%',
                                                                                                    resize: 'vertical',
                                                                                                    backgroundColor: 'white',
                                                                                                    margin: 0,
                                                                                                    padding: '5px',
                                                                                                    border: '0.5px solid #f4f4f5',
                                                                                                    boxSizing: 'border-box',
                                                                                                    display: 'block', // Ensures the textarea behaves as a block element
                                                                                                }}
                                                                                                value={parseJSON(initialStaffPerfEval[`${item.Text1}-${item1.Text1}-0-${item7.Text3}-${item.Text7}`])?.observation ?? ''}
                                                                                                onChange={(e) => { updateStaffPerfEvalObs(`${item.Text1}-${item1.Text1}-0-${item7.Text3}-${item.Text7}`, e.target.value, item1.Text1, item7.Text3) }}
                                                                                                disabled={isSubmittedForm(item7.Text3)}
                                                                                            />
                                                                                        ) : item.Text7 === '2' && getObsName1(item1.Text1, item7.Text3)}

                                                                                        {item.Text7 === '3' && isSelfUserBody(item7.Text3) ? (
                                                                                            <SearchableDropdown1
                                                                                                defaultValue={parseJSON(initialStaffPerfEval[`${item.Text1}-${item1.Text1}-0-${item7.Text3}-${item.Text7}`])?.gradeId ?? '0'}
                                                                                                ItemList={gradeDropddownList}
                                                                                                size={"small"}
                                                                                                disabled={isSubmittedForm(item7.Text3)}
                                                                                                DisableClearable={true}
                                                                                                sx={{ maxWidth: '15vw' }}
                                                                                                onChange={(value) => { updateStaffPerfEvalGrade(`${item.Text1}-${item1.Text1}-0-${item7.Text3}-${item.Text7}`, value.Value, item1.Text1, item7.Text3) }}
                                                                                            />
                                                                                        ) : item.Text7 === '3' && getGradeName1(item1.Text1, item7.Text3)}
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            </>
                                                                        )
                                                                    }
                                                                    )}


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
            {/* const InvestmentDeatailsDocument = ({ Id, UserName, DocumentName, open, handleClose, RefreshList }) => { */}
            <UploadDocument Id={userId} ReportingUserId={uploadDocUserId} yearId={asYear}
                saveButton={status}
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
    // #endregion
}

export default PerformanceEvaluation;