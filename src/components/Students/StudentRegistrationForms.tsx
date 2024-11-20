import { QuestionMark, Visibility } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DocumentIcon from '@mui/icons-material/Description';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SaveIcon from '@mui/icons-material/Save';
import SchoolIcon from '@mui/icons-material/School';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { GetSchoolSettingsBody } from 'src/interfaces/ProgressReport/IprogressReport';
import { IGetFormNumberBody, IUpdateStudentTrackingDetailsBody } from 'src/interfaces/StudentDetails/IStudentDetails';
import { IAddStudentAdditionalDetailsBody, IGetFeeAreaNamesBody, IGetSingleStudentDetailsBody, IGetStudentAdditionalDetailsBody, IMasterDatastudentBody, IRetriveStudentStreamwiseSubjectBody, IUpdateStudentBody, IUpdateStudentStreamwiseSubjectDetailsBody } from 'src/interfaces/Students/IStudentUI';
import SingleFile from 'src/libraries/File/SingleFile3';
import { CDAGetSchoolSettings } from 'src/requests/ProgressReport/ReqProgressReport';
import { GetFormNumber } from 'src/requests/StudentDetails/RequestStudentDetails';
import { CDAFeeAreaNames, CDAGetMasterData, CDAGetSingleStudentDetails, CDAGetStudentAdditionalDetails, CDARetriveStudentStreamwiseSubject, CDAUpdateStudent } from 'src/requests/Students/RequestStudentUI';
import { RootState } from 'src/store';
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox';
import { getCalendarDateFormatDateNew } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import Datepicker from '../MessageCenter/DatepickerMessage';
import AdditionalDetails from './AdditionalDetails';
import AddmissionDocumentInformation from './AddmissionDocumentInformation';
import AddNotePopupList from './AddNotePopupList';
import AdmissionDetails from './AdmissionDetails ';
import FamilyDetails from './FamilyDetails';
import PersonalDetails from './PersonalDetails'; // Assuming PersonalDetails is already created
import CheckboxList from './SiblingDetailsCheckBoxList';
import StudentProfileHeader from './StudentProfileHeader';
import StudentSubjectDetails from './StudentSubjectDetails';

const initialData = [
  { className: '10-B', date: '05-Nov-2024', description: 'qqq' }
  // Add more rows if needed
];
//#region TabBodies 
//need to transfer from here
interface IPersonalDetails {
  aadharCardNumber?: string;
  aadharCardScanCopy?: string;
  address?: string;
  birthDistrict?: string;
  birthState?: string;
  birthTaluka?: string;
  bloodGroup?: string;
  casteAndSubCaste?: string;
  category?: string;
  city?: string;
  dateOfBirth?: string;
  email?: string;
  fatherNumber?: string;
  firstName?: string;
  gender?: string;
  lastName?: string;
  middleName?: string;
  motherName?: string;
  motherNumber?: string;
  motherTongue?: string;
  nameOnAadharCard?: string;
  nationality?: string;
  parentName?: string;
  parentOccupation?: string;
  photoFilePath?: string;
  pin?: string;
  placeOfBirth?: string;
  religion?: string;
  state?: string;
}

interface RAdmissionDetails {
  PENNumber?: string;
  RFID?: string;
  UDISENumber?: string;
  admissionDate?: string;
  applicableRules?: string;
  boardRegistrationNumber?: string;
  feeCategoryDetailsId?: string;
  feeAreaNames?: string;
  formNumber?: string;
  isDayBoardingFeePaid?: boolean;
  isForDayBoarding?: boolean;
  isHandicapped?: boolean;
  isMinority?: boolean;
  isOnlyChild?: boolean;
  isRTEApplicable?: boolean;
  isRiseAndShine?: boolean;
  isStaffKid?: boolean;
  joiningDate?: string;
  newAdmission?: boolean;
  registrationNumber?: string;
  residenceTypes?: string;
  rteApplicationForm?: string;
  rteCategory?: string;
  saralNo?: string;
  secondlanguage?: string;
  sendSMS?: boolean;
  staffName?: string;
  staffUserRole?: string;
  studentRollNumber?: string;
  thirdlanguage?: string;
  userName?: string;
}

interface RFamilyDetails {
  fatherOccupation?: string;
  fatherQualification?: string;
  fatherEmail?: string;
  fatherOfficeName?: string;
  fatherOfficeAddress?: string;
  fatherDesignation?: string;
  fatherDOB?: string;
  fatherPhoto?: string;
  fatherWeight?: number;
  fatherHeight?: number;
  fatherBloodGroup?: string;
  fatherAadharCard?: string;
  fatherAnnualIncome?: number;

  motherOccupation?: string;
  motherQualification?: string;
  motherEmail?: string;
  motherOfficeName?: string;
  motherOfficeAddress?: string;
  motherDesignation?: string;
  motherDOB?: string;
  motherPhoto?: string;
  motherWeight?: number;
  motherHeight?: number;
  motherAadharCard?: string;
  motherBloodGroup?: string;
  motherAnnualIncome?: number;

  marriageAnniversaryDate?: string;
  localGuardianPhoto?: string;
  familyMonthlyIncome?: number;
  cwsn?: string;
  relativeFullName?: string;
  residencePhoneNumber?: string;
  neighbourPhoneNumber?: string,
  officePhoneNumber?: string,
  familyPhoto?: string;
  name1?: string,
  name2?: string,
  age1?: number,
  age2?: number,
  institution1?: string,
  institution2?: string,
  standard1?: string,
  standard2?: string,

}
interface RAdditionalInfoDetails {
  admissionAcademicYear?: string;
  admissionStandard?: string;
  currentAcademicYear?: string;
  currentStandard?: string;
  district?: string;
  houseNumber?: string;
  isRecognised?: string;
  lastSchoolAddress?: string;
  lastSchoolName?: string;
  landmark?: string;
  mainArea?: string;
  previousMarksObtained?: string;
  previousMarksOutOf?: string;
  previousYearOfPassing?: string;
  schoolBoardName?: string;
  schoolUDISENo?: string;
  standard?: string;
  subjectNames?: string;
  subareaName?: string;
  taluka?: string;

}
interface RStreamwiseSubjectDetails {
  streamId?: string;
  groupId?: string;
  compulsorySubjects?: string;
  optionalSubject?: string;
  optionalSubject1?: string;
  optionalSubject2?: string;
  competitiveExams?: number[]; // Assuming this is an array of numbers

}
//#endRegion

const StudentRegistrationForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { Name, standardId, DivisionId, YearWise_Student_Id, SchoolWise_Student_Id, StandardDivision_Id, Enrolment_Number } = location.state || {};
  console.log('LOcation', location.state);

  // Session & Local Variables
  const schoolId = localStorage.getItem('SchoolId');
  const academicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const teacherId = sessionStorage.getItem('Id');
  console.log('teacherId', teacherId);
  const [currentTab, setCurrentTab] = useState(0);
  const [profileCompletion, setProfileCompletion] = useState(20);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [showRecipients, setShowRecipients] = useState(false);
  const [IsConfirm, setIsConfirm] = useState('');
  const [IsConfirm1, setIsConfirm1] = useState('');
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const [tableData, setTableData] = useState(initialData);
  const { AssignedDate } = useParams();

  const [admissionDetailsData, setAdmissionDetailsData] = useState<RAdmissionDetails>({});
  const [personalDetailsData, setPersonalDetailsData] = useState<IPersonalDetails>({});
  const [familyDetailsData, setFamilyDetailsData] = useState<RFamilyDetails>({});
  const [additionalInfoData, setAdditionalInfoData] = useState<RAdditionalInfoDetails>({});
  const [streamwiseSubjectData, setStreamwiseSubjectData] = useState<RStreamwiseSubjectDetails>({});

  //const [familyData, setFamilyData] = useState(false);


  const handleSave = (isSuccessful: boolean) => {
    if (currentTab === 0) {
      setStatus((prevStatus) => ({ ...prevStatus, admissionDetails: isSuccessful }));
    } else if (currentTab === 1) {
      setStatus((prevStatus) => ({ ...prevStatus, personalDetails: isSuccessful }));
    }

    if (isSuccessful) {
      // Slide to the next tab automatically if the form is successfully saved
      setCurrentTab((prevTab) => prevTab + 1);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  //#region CallBack
  const onAdmissionTab = (updateddata) => {
    setAdmissionDetailsData(updateddata);
    console.log('1️⃣admissionDetails data:', admissionDetailsData);
  }

  const onPersonalTab = (updateddata) => {
    setPersonalDetailsData(updateddata);
    // setAdmissionDetailsData(updateddata);
    console.log('personalDetails data:', personalDetailsData);
    // console.log('admissionDetails data:', admissionDetailsData);
  }
  const onFamilyTab = (updateddata) => {
    setFamilyDetailsData(updateddata);
    console.log('3️⃣familyDetailsData:', familyDetailsData);
  }

  const onAdditionalInfoTab = (updateddata) => {
    setAdditionalInfoData(updateddata);
    console.log('AdditionalInfo data:', additionalInfoData);
  }

  const onStudentStreamwiseSubjectTab = (updateddata) => {
    setStreamwiseSubjectData(updateddata);
    console.log('5️⃣StreamwiseSubjectDetailsData data:', streamwiseSubjectData);
  }
  //#endregion
  const handleNextTab = () => {
    setCurrentTab((prevTab) => Math.min(prevTab + 1, 5)); // Move to the next tab
  };

  const handlePreviousTab = () => {
    setCurrentTab((prevTab) => Math.max(prevTab - 1, 0)); // Move to the previous tab
  };
  // Track the validation status for each tab
  const [status, setStatus] = useState({
    admissionDetails: null,
    personalDetails: null,
    admissionDocuments: null,
    familyDetails: null,
    additionalDetails: null,
    streamDetails: null
  });
  const handleOpenDialog = (isRecipients) => {
    setIsConfirm('');
    setShowRecipients(isRecipients);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsConfirm('true');
  };
  const handleOpenDialog1 = (isRecipients) => {
    setIsConfirm1('');
    setShowRecipients(isRecipients);
    setOpenDialog1(true);
  };

  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
    setIsConfirm('true');
  };

  const ValidFileTypes = ['BMP', 'DOC', 'DOCX', 'JPG', 'JPEG', 'PDF', 'XLS', 'XLSX'];
  const MaxfileSize = 5000000;
  const [SelectDate, SetSelectDate] = useState(
    AssignedDate == undefined
      ? new Date().toISOString().split('T')[0]
      : getCalendarDateFormatDateNew(AssignedDate)
  );


  //#region Read APIs.
  useEffect(() => {
    const GetSchoolSettings: GetSchoolSettingsBody = {
      asSchoolId: Number(schoolId),
    };
    dispatch(CDAGetSchoolSettings(GetSchoolSettings));

    const GetStudentRecordDataResult: IMasterDatastudentBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
      asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
      asStandardId: standardId,
      asDivisionId: DivisionId
    };
    dispatch(CDAGetMasterData(GetStudentRecordDataResult));

    const GetSingleStudentDetails: IGetSingleStudentDetailsBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
      asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
      asStudentId: SchoolWise_Student_Id // Number(sessionStorage.getItem('Id'))
    };
    dispatch(CDAGetSingleStudentDetails(GetSingleStudentDetails));

    const GetStudentAdditionalDetailsBody: IGetStudentAdditionalDetailsBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
      //asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
      asStudentId: SchoolWise_Student_Id // Number(sessionStorage.getItem('Id'))
    };
    dispatch(CDAGetStudentAdditionalDetails(GetStudentAdditionalDetailsBody));

    const FeeAreaNamesBody: IGetFeeAreaNamesBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
    };
    dispatch(CDAFeeAreaNames(FeeAreaNamesBody));

    const FormNumberBody: IGetFormNumberBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
      asStudentId: SchoolWise_Student_Id
    };
    dispatch(GetFormNumber(FormNumberBody));

    const RetriveStudentStreamwiseSubjectBody: IRetriveStudentStreamwiseSubjectBody = {
      asSchoolId: 122,
      asAcademicYearId: 10,
      asStudentId: 4584
    }
    dispatch(CDARetriveStudentStreamwiseSubject(RetriveStudentStreamwiseSubjectBody));     //Get StreamDetails

  }, []);
  //#endregion

  //#region Date Formation
  const formatDOB = (date) => {
    try {
      // Handle DD-MM-YYYY format with or without time
      if (date.includes('-')) {
        const [day, month, year] = date.split(' ')[0].split('-');
        if (day.length === 2) {
          return `${year}-${month}-${day}`;
        }
      }

      // If already in YYYY-MM-DD format or needs conversion
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };//#endregion

  //#region API CAlls
  const UpdateStudentResult = useSelector((state: RootState) => state.StudentUI.ISUpdateStudent);
  // console.log('🩸UpdateStudentResult:', UpdateStudentResult);
  const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);
  console.log('⚙️UsGetSchoolSettings:', UsGetSchoolSettings);

  const UpdateStudentBody: IUpdateStudentBody = {
    "asSchoolId": Number(localStorage.getItem('localSchoolId')),
    "asStudentId": SchoolWise_Student_Id,
    "asInsertedById": Number(teacherId), // Missing
    "asID": 0, // Missing
    "asAcademicYearId": academicYearId,
    "asFormNumber": Number(admissionDetailsData?.formNumber) || 0, // Missing
    "asPhoto_file_Path": personalDetailsData?.photoFilePath || "", // Missing
    "asFirst_Name": personalDetailsData?.firstName || "",
    "asMiddle_Name": personalDetailsData?.middleName || "",
    "asLast_Name": personalDetailsData?.lastName || "",
    "asMother_Name": personalDetailsData?.motherName || "",
    "asBlood_Group": personalDetailsData?.bloodGroup || "",
    "asEnrolment_Number": admissionDetailsData?.registrationNumber || "",
    "asParent_Name": personalDetailsData?.parentName || "",
    "asParent_Occupation": personalDetailsData?.parentOccupation || "",
    "asOther_Occupation": "",
    "asAddress": personalDetailsData?.address || "",
    "asCity": personalDetailsData?.city || "",
    "asState": personalDetailsData?.state || "",
    "asPincode": personalDetailsData?.pin || "",
    "asResidence_Phone_Number": "9224286937",
    "asMobile_Number": personalDetailsData?.motherNumber || "",
    "asMobile_Number2": personalDetailsData?.fatherNumber || "",
    "asOffice_Number": "9270362059",
    "asNeighbour_Number": "",
    "asUpdated_By_Id": teacherId,
    "asUpdate_Date": "2024-10-10",
    "asDOB": formatDOB(personalDetailsData?.dateOfBirth) || "2011-03-29",
    "asBirth_Place": personalDetailsData?.placeOfBirth || "",
    "asNationality": personalDetailsData?.nationality || "",
    "asSex": personalDetailsData?.gender || "",
    "asSalutation_Id": "6",
    "asCategory_Id": personalDetailsData?.category || "",
    "asCasteAndSubCaste": personalDetailsData?.casteAndSubCaste || "",
    "asAdmission_Date": formatDOB(admissionDetailsData?.admissionDate) || "",
    "asJoining_Date": formatDOB(admissionDetailsData?.joiningDate) || "",
    "asDateOfBirthInText": "Twenty One March Two Thousand Eleven",
    "asOptional_Subject_Id": "0",
    "asMother_Tongue": personalDetailsData.motherTongue || "",
    "asLastSchoolName": "",
    "asLastSchoolAddress": "",
    "asLastCompletedStd": "",
    "asLastSchoolUDISENo": "",
    "asLastCompletedBoard": "",
    "asIsRecognisedBoard": "True",
    "asAadharCardNo": personalDetailsData?.aadharCardNumber || "",
    "asNameOnAadharCard": personalDetailsData?.nameOnAadharCard || "",
    "asAadharCard_Photo_Copy_Path": personalDetailsData?.aadharCardScanCopy || "",
    "asFamily_Photo_Copy_Path": "",
    "asUDISENumber": admissionDetailsData?.UDISENumber || "",
    "asBoardRegistrationNo": admissionDetailsData?.boardRegistrationNumber || "",
    "asIsRiseAndShine": admissionDetailsData?.isRiseAndShine === false ? "False" : "True",
    "asAdmissionSectionId": "0",
    "asGRNumber": "",
    "asStudentUniqueNo": "",
    "asSaralNo": admissionDetailsData?.saralNo || "",
    "asIsOnlyChild": admissionDetailsData?.isOnlyChild === false ? "False" : "True",
    "asMinority": admissionDetailsData?.isMinority === false ? "False" : "True",
    "asRoll_No": admissionDetailsData?.studentRollNumber || "",
    "asRule_Id": admissionDetailsData?.applicableRules || "",
    "asIsStaffKid": admissionDetailsData?.isStaffKid === false ? false : true,
    "asHeight": 0,
    "asWeight": 0,
    "asUpdated_By_id": Number(teacherId),
    "asRTECategoryId": Number(admissionDetailsData?.rteCategory) || 0,
    "asSecondLanguageSubjectId": admissionDetailsData?.secondlanguage || "",
    "asThirdLanguageSubjectId": admissionDetailsData?.thirdlanguage || "",
    "asIsForDayBoarding": admissionDetailsData?.isForDayBoarding === false ? false : true,
    "asFeeCategoryDetailsId": "0",     // ❌This is the cause of problem
    "asRTEApplicationFormNo": admissionDetailsData?.rteApplicationForm || "",
    "asAnnualIncome": 0,
    "asStandard_Id": standardId, // Missing
    "asDivision_Id": DivisionId, // Missing
    "asReligion": personalDetailsData?.religion || "",
    "asYearWise_Student_Id": YearWise_Student_Id,
    "asParentUserId": 0
  }

  const AddStudentAdditionalDetailsBody: IAddStudentAdditionalDetailsBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId')),
    asAdmissionAcadmicYear: additionalInfoData?.admissionAcademicYear || "",
    asAdmissionStandard: additionalInfoData?.admissionStandard || "",
    asCurrentAcademicYear: additionalInfoData?.currentAcademicYear || "",
    asCurrentStandard: additionalInfoData?.currentStandard || "",
    asIsHandicapped: admissionDetailsData?.isHandicapped || false,
    asPreviousMarksObtained: additionalInfoData?.previousMarksObtained || "",
    asPreviousMarksOutOff: additionalInfoData?.previousMarksOutOf || "",
    asPreviousYearOfPassing: additionalInfoData?.previousYearOfPassing || "",
    asSubjectNames: additionalInfoData?.subjectNames || "",
    asSchoolwiseStudentId: 3556,
    asUserid: 4463,
    asReligion: personalDetailsData?.religion || "",
    asBirthTaluka: personalDetailsData?.birthTaluka || "",
    asBirthDistrict: personalDetailsData?.birthDistrict || "",
    asHouseNoPlotNo: additionalInfoData?.houseNumber || "",
    asMainArea: additionalInfoData?.mainArea || "",
    asSubareaName: additionalInfoData?.subareaName || "",
    asLandmark: additionalInfoData?.landmark || "",
    asTaluka: additionalInfoData?.taluka || "",
    asDistrict: additionalInfoData?.district || "",
    asFeeAreaName: Number(admissionDetailsData?.feeAreaNames) || 0,
    asFatherOccupation: familyDetailsData?.fatherOccupation || "",
    asFatherQualification: familyDetailsData?.fatherQualification || "",
    asFatherEmail: familyDetailsData?.fatherEmail || "",
    asFatherOfficeName: familyDetailsData?.fatherOfficeName || "",
    asFatherOfficeAddress: familyDetailsData?.fatherOfficeAddress || "",
    asMotherOccupation: familyDetailsData?.motherOccupation || "",
    asMotherQualification: familyDetailsData?.motherQualification || "",
    asMotherEmail: familyDetailsData?.motherEmail || "",
    asMotherOfficeName: familyDetailsData?.motherOfficeName || "",
    asMotherOfficeAddress: familyDetailsData?.motherOfficeAddress || "",
    asFatherDOB: formatDOB(familyDetailsData?.fatherDOB) || "",
    asMotherDOB: formatDOB(familyDetailsData?.motherDOB) || "",
    asFatherDesignation: familyDetailsData?.fatherDesignation || "",
    asMotherDesignation: familyDetailsData?.motherDesignation || "",
    asFatherPhoto: familyDetailsData?.fatherPhoto || "",
    asMotherPhoto: familyDetailsData?.motherPhoto || "",
    asAnniversaryDate: familyDetailsData?.marriageAnniversaryDate || "",
    asLocalGuardianPhoto: familyDetailsData?.localGuardianPhoto || "",
    asRelativeName: familyDetailsData?.relativeFullName || "",
    asFatherBinaryPhoto: null,       //Need to work on this
    asMotherBinaryPhoto: null,
    asRelativeBinaryPhoto: null,
    asFatherWeight: familyDetailsData?.fatherWeight || 0,
    asMotherWeight: familyDetailsData?.motherWeight || 0,
    asFatherHeight: familyDetailsData?.fatherHeight || 0,
    asMotherHeight: familyDetailsData?.motherHeight || 0,
    asFatherAadharcardNo: familyDetailsData?.fatherAadharCard || "",
    asMotherAadharcardNo: familyDetailsData?.motherAadharCard || "",
    asFatherBloodGroup: familyDetailsData?.fatherBloodGroup || "",
    asMotherBloodGroup: familyDetailsData?.motherBloodGroup || "",
    asFamilyMonthlyIncome: familyDetailsData?.familyMonthlyIncome || 0.00,
    asCWSN: familyDetailsData?.cwsn || "",
    asFatherAnnualIncome: familyDetailsData?.fatherAnnualIncome || 0.00,
    asMotherAnnualIncome: familyDetailsData?.motherAnnualIncome || 0.00,
    asBirthState: personalDetailsData?.birthState || "",
    asName1: familyDetailsData?.name1 || "",
    asAge1: familyDetailsData?.age1 || 0,
    asInstitute1: familyDetailsData?.institution1 || "",
    asStandard1: familyDetailsData?.standard1 || "",
    asName2: familyDetailsData?.name2 || "",
    asAge2: familyDetailsData?.age2 || 0,
    asInstitute2: familyDetailsData?.institution2 || "",
    asStandard2: familyDetailsData?.standard2 || "",
    asResidenceType: Number(admissionDetailsData?.residenceTypes) || 0,
    asRFID: admissionDetailsData?.RFID || "",
  }

  const UpdateStudentStreamwiseSubjectDetailsBody: IUpdateStudentStreamwiseSubjectDetailsBody = {
    asSchoolId: 122,
    asStudentId: 4584,
    asStreamId: Number(streamwiseSubjectData?.streamId) || 0,
    GroupId: Number(streamwiseSubjectData?.groupId) || 0,
    CompulsorySubject: streamwiseSubjectData?.compulsorySubjects || '',
    chkCompitativeExams: Number(streamwiseSubjectData?.competitiveExams) || 0,
    OptSubjectOne: Number(streamwiseSubjectData?.optionalSubject1) || 0,
    OptSubjectTwo: Number(streamwiseSubjectData?.optionalSubject2) || 0,
  }
  const handleUpdate = () => {
    console.log('Sending update with data:', UpdateStudentBody);

    dispatch(CDAUpdateStudent(UpdateStudentBody));
    //❌SHUTING DOWN API CALLS TEMPORARILY
    // dispatch(CDAAddStudentAdditionalDetails(AddStudentAdditionalDetailsBody));
    // dispatch(CDAUpdateStudentStreamwiseSubjectDetails(UpdateStudentStreamwiseSubjectDetailsBody));

    //console.log('Saving data:', personalDetails);
    // dispatch(CDAGenerateTransportFeeEntries({ asSchoolId: Number(schoolId), asAcademicYearId: Number(academicYearId), asStudentId: Number(SchoolWise_Student_Id), asUpdatedById: Number(teacherId) }));
  };

  useEffect(() => {
    const UpdateStudentTrackingDetailsBody: IUpdateStudentTrackingDetailsBody = {
      asSchoolId: Number(schoolId),
      asStudentId: SchoolWise_Student_Id,
      asInsertedById: Number(teacherId),
      asID: (UpdateStudentResult as any).iReturnValue, // Accessing iReturnValue here
      asAcademicYearId: Number(academicYearId)
    }
    //dispatch(CDAUpdateStudentTrackingDetails(UpdateStudentTrackingDetailsBody));
  }, [UpdateStudentResult]);

  //#endregion
  const onSelectDate = (value) => {
    SetSelectDate(value);
  };
  const handleEdit = (rowIndex: number) => {
    console.log(`Edit row ${rowIndex}`);
  };
  const handleDelete = (rowIndex: number) => {
    console.log(`Delete row ${rowIndex}`);
    setTableData((prevData) =>
      prevData.filter((_, index) => index !== rowIndex)
    );
  };
  // const validateAllTabs = () => {
  //     const updatedStatus = {
  //         admissionDetails: validateAdmissionDetails(),
  //         personalDetails: validatePersonalDetails(),
  //         admissionDocuments: validateAdmissionDocuments(),
  //         familyDetails: validateFamilyDetails(),
  //         additionalDetails: validateAdditionalDetails(),
  //         streamDetails: validateStreamDetails(),
  //     };
  //     setStatus(updatedStatus);

  //     // Return true if all tabs are valid
  //     return Object.values(updatedStatus).every((isValid) => isValid);
  // };
  // const handleSaveClick = () => {
  //     const allValid = validateAllTabs();
  //     if (!allValid) {
  //         // Show an alert if any tab has unfilled required fields
  //         alert('Some fields are missing or incorrect.');
  //     } else {
  //         alert('All required fields are filled, saving draft!');
  //     }
  // };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Students', path: '/extended-sidebar/Teacher/Students' },
          {
            title: 'Enter Students Details',
            path: '/extended-sidebar/Teacher/Students/StudentRegistrationForm'
          }
        ]}
        rightActions={
          <>
            <Tooltip title={'Add/Edit student details and click on "Save".'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>

            <Tooltip title={'Add  Sibling Details'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
              >
                <PeopleOutlineIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={'Add Note'}>
              <IconButton
                onClick={() => handleOpenDialog(true)}
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
              >
                <NoteAddIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={'Save'}>
              <IconButton
                onClick={handleUpdate}
                sx={{
                  color: 'white',
                  backgroundColor: green[500],
                  '&:hover': {
                    backgroundColor: green[600]
                  }
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <Box sx={{ backgroundColor: 'white', p: 1 }}>
        <StudentProfileHeader />
      </Box>

      {/* Profile Completion Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 1,
          backgroundColor: 'white',
          p: 2
        }}
      >
        <Typography variant="body1" sx={{ mr: 2 }}>
          Completeness
        </Typography>
        <LinearProgress
          variant="determinate"
          value={profileCompletion}
          sx={{ flexGrow: 1, height: 10 }}
        />
        <Typography variant="body1" sx={{ ml: 2 }}>
          {profileCompletion}%
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: 'white',
          minHeight: '100px',
          display: 'flex',
          justifyContent: 'center',
          mb: 0
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false} // Disable the scroll arrows
          aria-label="Student Registration Tabs"
          sx={{
            '& .MuiTab-root': {
              minHeight: '60px',
              borderRadius: '10px',
              textTransform: 'none',
              color: '#38548A',
              backgroundColor: grey[200],

              // backgroundColor: tabValidity.admissionDetails ? green[100] : grey[200],
              '&:hover': {
                color: '#38548A',
                backgroundColor: grey[400]
              },
              '&.Mui-selected': {
                backgroundColor: blue[300],
                color: 'white'
              },
              '&.Mui-focusVisible': {
                outline: '2px solid blue'
              }
            },
            '& .MuiTabs-indicator': {
              display: 'none'
            }
          }}
        >
          <Tab
            sx={{ m: 2, maxWidth: 200 }}
            icon={<SchoolIcon />}
            label="Admission Details"
          />
          <Tab
            sx={{ m: 2, maxWidth: 200 }}
            icon={<AccountCircleIcon />}
            label="Personal Details"
          />
          <Tab
            sx={{ m: 2, maxWidth: 200 }}
            icon={<DocumentIcon />}
            label="Admission Documents"
          />
          {UsGetSchoolSettings?.GetSchoolSettingsResult?.IsAdditionalFieldsApplicable && (
            <Tab
              sx={{ m: 2, maxWidth: 200 }}
              icon={<FamilyRestroomIcon />}
              label="Family Details"
            />
          )}
          {UsGetSchoolSettings?.GetSchoolSettingsResult?.IsAdditionalFieldsApplicable && (
            <Tab
              sx={{ m: 2, maxWidth: 200 }}
              icon={<GroupAddIcon />}
              label="Additional Details"
            />
          )}
          <Tab
            sx={{ m: 2, maxWidth: 200, borderRadius: '100%' }}
            icon={<LocalLibraryIcon />}
            label="Stream Details"
          />
        </Tabs>
      </Box>

      <Box>
        {currentTab === 0 && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* {status.admissionDetails !== null && (
                                <Alert severity={status.admissionDetails ? 'success' : 'error'}>
                                    {status.admissionDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12}>
              <AdmissionDetails onTabChange={onAdmissionTab} />
            </Grid>
          </Grid>
        )}
        {currentTab === 1 && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12}>
              <PersonalDetails onTabChange={onPersonalTab} />
            </Grid>
          </Grid>
        )}
        {/* Add additional tab contents here */}
        {currentTab === 2 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12}>
              <AddmissionDocumentInformation onSave={handleSave} />
            </Grid>
          </Grid>
        )}
        {currentTab === 3 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12}>
              <FamilyDetails onTabChange={onFamilyTab} />
            </Grid>
          </Grid>
        )}
        {currentTab === 4 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12}>
              <AdditionalDetails onTabChange={onAdditionalInfoTab} />
            </Grid>
          </Grid>
        )}
        {currentTab === 5 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* {status.personalDetails !== null && (
                                <Alert severity={status.personalDetails ? 'success' : 'error'}>
                                    {status.personalDetails ? 'Draft saved successfully!' : 'Some fields are missing or incorrect.'}
                                </Alert>
                            )} */}
            </Grid>
            <Grid item xs={12}>
              <StudentSubjectDetails onTabChange={onStudentStreamwiseSubjectTab} />
            </Grid>
          </Grid>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'space-between' }, // Center buttons on smaller screens
          flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons vertically on smaller screens
          gap: 2, // Add some space between buttons
          p: { xs: 1, sm: 2 }, // Adjust padding for smaller screens
          backgroundColor: 'white'
        }}
      >
        <Button
          variant="contained"
          onClick={handlePreviousTab}
          disabled={currentTab === 0}
          sx={{
            backgroundColor: grey[100],
            color: 'blue',
            '&:hover': { color: 'blue', backgroundColor: blue[200] },
            width: { xs: '100%', sm: 'auto' } // Full width on smaller screens
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextTab}
          disabled={currentTab === 5} // Disable if on the last tab
          sx={{
            backgroundColor: grey[100],
            color: 'green',
            '&:hover': { color: 'green', backgroundColor: green[200] },
            width: { xs: '100%', sm: 'auto' } // Full width on smaller screens
          }}
        >
          Next
        </Button>
      </Box>
      <Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: '15px'
            }
          }}
        >
          <DialogTitle sx={{ bgcolor: '#223354', position: 'relative' }}>
            <ClearIcon
              onClick={handleCloseDialog}
              sx={{
                color: 'white',
                borderRadius: '7px',
                position: 'absolute',
                top: '5px',
                right: '8px',
                cursor: 'pointer',
                '&:hover': {
                  color: 'red'
                }
              }}
            />
          </DialogTitle>
          <Typography variant="h3" sx={{ pt: 1, pl: 2 }}>
            Student Achievement/Punishment Details
          </Typography>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="RegistrationNumber"
                  label="Registration Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="StudentName"
                  label="Student Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Datepicker
                  DateValue={SelectDate}
                  onDateChange={onSelectDate}
                  // label={'Start Date'}
                  size={'medium'}
                  label={'Joining Date'}
                  minDate={undefined}
                  maxDate={undefined}
                  display={undefined}
                />
              </Grid>
              <Grid item xs={4}>
                <Tooltip
                  title="Supports only .JPG, .JPEG, .PNG, .BMP, .PDF file type.
                   File size should not exceed 1MB."
                >
                  <SingleFile
                    ValidFileTypes={ValidFileTypes}
                    MaxfileSize={MaxfileSize}
                    // FileName={form.aadharCardScanCopy}
                    // ChangeFile={handleImageChange}
                    FileLabel={'Attachment'}
                    isMandatory={false}
                    height={'52px'}
                    width="100%"
                    ChangeFile={undefined}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <>
                  <Tooltip title={'View'}>
                    <IconButton
                      onClick={() => ''}
                      sx={{
                        color: '#223354',
                        mt: 0.7,
                        '&:hover': {
                          color: '#223354',
                          cursor: 'pointer'
                        }
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={'Delete'}>
                    <IconButton
                      onClick={() => ''}
                      sx={{
                        color: '#223354',
                        mt: 0.7,
                        '&:hover': {
                          color: 'red',
                          backgroundColor: red[100]
                        }
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                </>
              </Grid>
            </Grid>
            <Grid xs={12} spacing={2} mt={2}>
              <Grid item>
                <ResizableTextField
                  name="description"
                  label={<span>Description</span>}
                  sx={{
                    resize: 'both'
                  }}
                  multiline
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box py={2}>
              <AddNotePopupList
                data={tableData}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ m: 2 }}>
            <Button onClick={handleCloseDialog} color={'error'}>
              Close
            </Button>
            <Button
              onClick={undefined}
              sx={{
                color: 'green',
                '&:hover': {
                  color: 'green',
                  backgroundColor: green[100]
                }
              }}
            >
              save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box>
        <Dialog
          open={openDialog1}
          onClose={handleCloseDialog1}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: '15px'
            }
          }}
        >
          <DialogTitle sx={{ bgcolor: '#223354', position: 'relative' }}>
            <ClearIcon
              onClick={handleCloseDialog1}
              sx={{
                color: 'white',
                borderRadius: '7px',
                position: 'absolute',
                top: '5px',
                right: '8px',
                cursor: 'pointer',
                '&:hover': {
                  color: 'red'
                }
              }}
            />
          </DialogTitle>
          <Typography variant="h3" sx={{ pt: 1, pl: 3 }}>
            Sibling Details
          </Typography>
          <DialogContent>
            <Card sx={{ p: 1, mb: 1 }}>
              <b>Note : </b>If you click on save button selected Sibling Details will be
              replaced to the following sibling(s) :
              <b> Master Aadvik Prashant Dalavi</b>
            </Card>
            <Box>
              <CheckboxList />
            </Box>
          </DialogContent>
          <DialogActions sx={{ m: 2 }}>

            <Button onClick={handleCloseDialog1} color={'error'}>
              Close
            </Button>
            <Button
              onClick={undefined}
              sx={{
                color: 'green',
                '&:hover': {
                  color: 'green',
                  backgroundColor: green[100]
                }
              }}
            >
              save
            </Button>
          </DialogActions>

        </Dialog>
      </Box>
    </Box>
  );
};

export default StudentRegistrationForm;
