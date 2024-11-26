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
import { IGenerateTransportFeeEntriesBody, IUpdateStudentTrackingDetailsBody } from 'src/interfaces/StudentDetails/IStudentDetails';
import { IAddStudentAdditionalDetailsBody, IUpdateStudentBody, IUpdateStudentStreamwiseSubjectDetailsBody } from 'src/interfaces/Students/IStudentUI';
import SingleFile from 'src/libraries/File/SingleFile3';
import { CDAGetSchoolSettings } from 'src/requests/ProgressReport/ReqProgressReport';
import { CDAGenerateTransportFeeEntries, GetFormNumber } from 'src/requests/StudentDetails/RequestStudentDetails';
import { CDAAddStudentAdditionalDetails, CDAFeeAreaNames, CDAGetMasterData, CDAGetSingleStudentDetails, CDAGetStudentAdditionalDetails, CDARetriveStudentStreamwiseSubject, CDAUpdateStudent, CDAUpdateStudentStreamwiseSubjectDetails } from 'src/requests/Students/RequestStudentUI';
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
  //console.log('LOcation', location.state);

  // Session & Local Variables
  const schoolId = localStorage.getItem('SchoolId');
  const academicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const teacherId = sessionStorage.getItem('Id');

  const [currentTab, setCurrentTab] = useState(0);
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

  const [tabCompletion, setTabCompletion] = useState({
    admission: 0,
    personal: 0,
    family: 0,
  });

  const [profileCompletion, setProfileCompletion] = useState(0);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);

  const [admissionDetailsData, setAdmissionDetailsData] = useState<RAdmissionDetails>({});
  const [personalDetailsData, setPersonalDetailsData] = useState<IPersonalDetails>({});
  const [familyDetailsData, setFamilyDetailsData] = useState<RFamilyDetails>({});
  const [additionalInfoData, setAdditionalInfoData] = useState<RAdditionalInfoDetails>({});
  const [streamwiseSubjectData, setStreamwiseSubjectData] = useState<RStreamwiseSubjectDetails>({});

  const [form, setForm] = useState({
    admission: {
      userName: '',
      sendSMS: false,
      newAdmission: false,
      isRTEApplicable: false,
      rteCategory: '',
      rteApplicationForm: '',
      formNumber: '',
      registrationNumber: '',
      admissionDate: '',
      joiningDate: '',
      studentRollNumber: '',
      UDISENumber: '',
      boardRegistrationNumber: '',
      saralNo: '',
      PENNumber: '',
      secondlanguage: '',
      thirdlanguage: '',
      applicableRules: '',
      staffUserRole: '',
      staffName: '',
      residenceTypes: '',
      feeAreaNames: '',
      RFID: '',
      isStaffKid: false,
      isOnlyChild: false,
      isRiseAndShine: false,
      isMinority: false,
      isForDayBoarding: false,
      isDayBoardingFeePaid: false,
      isHandicapped: false,
    },
    personal: {
      firstName: '',
      middleName: '',
      lastName: '',
      motherName: '',
      motherNumber: '',
      parentName: '',
      fatherNumber: '',
      email: '',
      parentOccupation: '',
      address: '',
      city: '',
      state: '',
      pin: '',
      placeOfBirth: '',
      birthTaluka: '',
      birthDistrict: '',
      birthState: '',
      religion: '',
      casteAndSubCaste: '',
      category: '',
      dateOfBirth: '',
      nationality: '',
      motherTongue: '',
      gender: '',
      bloodGroup: '',
      aadharCardNumber: '',
      nameOnAadharCard: '',
      aadharCardScanCopy: '', // This will store the file object
      photoFilePath: null,
      photoFilePathImage: null,
    },
    family: {
      // Father's Information
      fatherQualification: '',
      fatherEmail: '',
      fatherOfficeName: '',
      fatherOfficeAddress: '',
      fatherDesignation: '',
      fatherDOB: '',
      fatherPhoto: '',
      fatherWeight: 0,
      fatherHeight: 0,
      fatherBloodGroup: '',
      fatherAadharCard: '',
      fatherAnnualIncome: 0,

      // Mother's Information
      motherOccupation: '',
      motherQualification: '',
      motherEmail: '',
      motherOfficeName: '',
      motherOfficeAddress: '',
      motherDesignation: '',
      motherDOB: '',
      motherPhoto: '',
      motherWeight: 0,
      motherHeight: 0,
      motherAadharCard: '',
      motherBloodGroup: '',
      motherAnnualIncome: 0,

      // Family Information
      marriageAnniversaryDate: '',
      localGuardianPhoto: '',
      familyMonthlyIncome: 0.0,
      cwsn: '',
      relativeFullName: '',
      residencePhoneNumber: '',
      neighbourPhoneNumber: '',
      officePhoneNumber: '',
      familyPhoto: '',
      name1: '',
      name2: '',
      age1: 0,
      age2: 0,
      institution1: '',
      institution2: '',
      standard1: '',
      standard2: '',
    },
    additional: {
      lastSchoolName: '',
      lastSchoolAddress: '',
      standard: '',
      schoolUDISENo: '',
      schoolBoardName: '',
      isRecognised: '',
      // lastSchoolRollNumber: '',
      //  lastSchoolYear: '',
      houseNumber: '',
      mainArea: '', // New field
      subareaName: '', // New field
      landmark: '', // New field
      taluka: '', // New field
      district: '', // New field

      admissionStandard: '', // New field
      admissionAcademicYear: '', // New field
      previousMarksObtained: '', // New field
      previousMarksOutOf: '', // New field
      subjectNames: '', // New field
      previousYearOfPassing: '', // New field
      currentAcademicYear: '', // New field
      currentStandard: '' // New field
    },
    streamwiseSubject: {
      streamId: '',
      groupId: '',
      compulsorySubjects: '',
      optionalSubject: '',
      optionalSubject1: '',
      optionalSubject2: '',
      competitiveExams: '',
    },

  });

  const requiredFieldsMap = {
    admission: ['registrationNumber', 'admissionDate', 'joiningDate', 'studentRollNumber'],
    personal: [
      'firstName',
      'parentName',
      'address',
      'city',
      'pin',
      'state',
      'dateOfBirth',
      'placeOfBirth',
      'casteAndSubCaste',
    ],
    family: ['fatherDOB', 'motherDOB', 'marriageAnniversaryDate'],
  };

  const calculateCompletion = (tabName: string, data: any) => {
    // Get required fields dynamically from the map
    const requiredFields = requiredFieldsMap[tabName] || [];

    // Calculate completed and unfilled fields
    const completedFields = requiredFields.filter((field) => !!data[field]).length;
    const unfilledFields = requiredFields.filter((field) => !data[field]);

    // Calculate completion percentage
    const completionPercentage = (completedFields / requiredFields.length) * 100;

    // Update the tabCompletion state
    setTabCompletion((prev) => ({
      ...prev,
      [tabName]: completionPercentage,
    }));

    return { unfilledFields, tabName };
  };

  useEffect(() => {
    // Calculate overall profile completion dynamically
    const totalTabs = Object.keys(tabCompletion).length;
    const totalProgress = Object.values(tabCompletion).reduce((acc, curr) => acc + curr, 0);
    setProfileCompletion(Math.round(totalProgress / totalTabs));
  }, [tabCompletion]);

  useEffect(() => {
    // Dynamically loop through all tabs in the map
    Object.keys(requiredFieldsMap).forEach((tabName) => {
      calculateCompletion(tabName, form[tabName]);
    });
  }, [form]); // Trigger recalculation whenever the form changes


  //#region Validation
  const handleValidation = () => {
    const allMessages = [];

    const admissionValidation = calculateCompletion('admission', form.admission);
    const personalValidation = calculateCompletion('personal', form.personal);
    const familyValidation = calculateCompletion('family', form.family);

    //Collect unfilled fields for each tab
    [admissionValidation, personalValidation, familyValidation].forEach(({ unfilledFields, tabName }) => {
      unfilledFields.forEach((field) => {
        allMessages.push(`"${field}" is missing in ${tabName} tab.`);
      });
    });

    // Update validation messages state
    setValidationMessages(allMessages);

    // Return true if there are no unfilled fields
    return allMessages.length === 0;
  };

  // useEffect(() => {
  //   handleValidation();
  // }, [admissionDetailsData, personalDetailsData, familyDetailsData]);

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
  const onAdmissionTab = (updatedData) => {
    setAdmissionDetailsData(updatedData);
    // calculateCompletion('admission', updatedData);
    console.log('1️⃣Admission', admissionDetailsData);
  };

  const onPersonalTab = (updatedData) => {
    setPersonalDetailsData(updatedData);
    // calculateCompletion('personal', updatedData);
    console.log('2️⃣Personal', personalDetailsData);
  };

  const onFamilyTab = (updatedData) => {
    setFamilyDetailsData(updatedData);
    // calculateCompletion('family', updatedData);
    console.log('3️⃣Family', familyDetailsData);
  };

  const onAdditionalInfoTab = (updateddata) => {
    setAdditionalInfoData(updateddata);
    console.log('4️⃣Additional', additionalInfoData);
  }

  const onStudentStreamwiseSubjectTab = (updateddata) => {
    setStreamwiseSubjectData(updateddata);
    console.log('5️⃣StreamwiseSubject', streamwiseSubjectData);
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

  //#region UseSelectors
  const USGetSingleStudentDetails = useSelector((state: RootState) => state.StudentUI.ISGetSingleStudentDetails);
  const GetStudentAdditionalDetails = useSelector((state: RootState) => state.StudentUI.ISGetStudentAdditionalDetails);
  const GetFromNumber = useSelector((state: RootState) => state.GetStandardwiseMinMaxDOB.IGetFormNumber);
  const GetStudentStreamwiseSubjectDetails = useSelector((state: RootState) => state.StudentUI.ISGetStudentStreamwiseSubjectDetails);

  useEffect(() => {
    if ((USGetSingleStudentDetails && USGetSingleStudentDetails.length > 0) ||
      (GetStudentAdditionalDetails && Object.keys(GetStudentAdditionalDetails).length > 0) ||
      (GetFromNumber && GetFromNumber.length > 0)) {
      const studentData = USGetSingleStudentDetails[0];
      const AdditionalData: any = GetStudentAdditionalDetails; // Get first item from array
      const FormNumber = GetFromNumber[0];
      const StreamwiseSubject = GetStudentStreamwiseSubjectDetails[0];

      // Split optional subjects if StreamId is 3
      let optionalSubject1 = "";
      let optionalSubject2 = "";

      if (StreamwiseSubject.StreamId === "3" && StreamwiseSubject.OptionalSubjects) {
        const optionalSubjects = StreamwiseSubject.OptionalSubjects.split(',');
        optionalSubject1 = optionalSubjects[0] || "";
        optionalSubject2 = optionalSubjects[1] || "";
      } else {
        optionalSubject1 = StreamwiseSubject.OptionalSubjects || "";
      }

      // Initialize competitive exams
      const competitiveExams = StreamwiseSubject.CompitativeExam?.split(',').map(Number) || [];

      setForm((prevForm) => ({
        ...prevForm,
        admission: {
          ...prevForm.admission,
          userName: studentData.User_Login || '',
          sendSMS: studentData.Send_SMS === 'False' ? false : true,
          newAdmission: studentData.Is_New_Student === 'False' ? false : true,
          isRTEApplicable: studentData.Is_RTE_Student === 'False' ? false : true,
          rteCategory: studentData.RTECategoryId || '',
          rteApplicationForm: studentData.RTEApplicationFormNo || '',
          formNumber: FormNumber?.FormNumber || '',
          registrationNumber: studentData.Enrolment_Number || '0',
          admissionDate: studentData.Admission_date || '',
          joiningDate: studentData.Joining_Date || '',
          studentRollNumber: studentData.Roll_No || '',
          UDISENumber: studentData.UDISENumber || '',
          BoardRegistrationNumber: studentData.BoardRegistrationNo || '',
          SaralNo: studentData.SaralNo || '',
          PENNumber: studentData.PENNumber || '',
          secondlanguage: studentData.SecondLanguageSubjectId || '',
          thirdlanguage: studentData.ThirdLanguageSubjectId || '',
          applicableRules: studentData.Rule_Id || '',
          staffUserRole: studentData.User_Role_Id || '',
          staffName: studentData.staffName || '',
          residenceTypes: studentData.ResidenceTypeId || '',
          feeAreaNames: AdditionalData?.FeeAreaName || '',
          RFID: AdditionalData?.RFID || '',
          isStaffKid: studentData.IsStaffKid === 'False' ? false : true,
          isOnlyChild: studentData.IsOnlyChild === 'False' ? false : true,
          isRiseAndShine: studentData.IsRiseAndShine === 'False' ? false : true,
          isMinority: studentData.Minority === 'False' ? false : true,
          isForDayBoarding: studentData.IsForDayBoarding === 'False' ? false : true,
          isDayBoardingFeePaid: studentData.IsDayBoardingFeePaid === 'False' ? false : true,
          isHandicapped: AdditionalData?.IsHandicapped || false,
        },
        personal: {
          ...prevForm.personal,
          firstName: studentData.First_Name || '',
          middleName: studentData.Middle_Name || '',
          lastName: studentData.Last_Name || '',
          motherName: studentData.Mother_Name || '',
          motherNumber: studentData.Mobile_Number || '',
          parentName: studentData.Parent_Name || '',
          fatherNumber: studentData.Mobile_Number2 || '',
          email: studentData.Email_Address || '',
          parentOccupation: studentData.Parent_Occupation || '',
          address: studentData.Address || '',
          city: studentData.City || '',
          state: studentData.State || '',
          pin: studentData.Pincode || '',
          placeOfBirth: studentData.Birth_Place || '',
          birthTaluka: AdditionalData.BirthTaluka || '',
          birthDistrict: AdditionalData.BirthDistrict || '',
          birthState: AdditionalData.BirthState || '',
          religion: studentData.Religion || '',
          casteAndSubCaste: studentData.CasteAndSubCaste || '',
          category: studentData.Category_Id || '',
          dateOfBirth: formatDOB(studentData.DOB) || '',
          nationality: studentData.Nationality || '',
          motherTongue: studentData.Mother_Tongue || '',
          gender: studentData.Sex || '',
          bloodGroup: studentData.Blood_Group || '',
          aadharCardNumber: studentData.AadharCardNo || '',
          nameOnAadharCard: studentData.NameOnAadharCard || '',
          aadharCardScanCopy: studentData?.AadharCard_Photo_Copy_Path || '',
          photoFilePath: studentData.Photo_File_Path || null,
          photoFilePathImage: studentData.Photo_file_Path_Image || null,
        },
        family: {
          ...prevForm.family,
          fatherQualification: AdditionalData?.FatherQualification || "",
          fatherEmail: AdditionalData?.FatherEmail || "",
          fatherOfficeName: AdditionalData?.FatherOfficeName || "",
          fatherOfficeAddress: AdditionalData?.FatherOfficeAddress || "",
          fatherDesignation: AdditionalData?.FatherDesignation || "",
          fatherDOB: formatDOB(AdditionalData?.FatherDOB) || "",
          fatherPhoto: AdditionalData?.FatherPhoto || "",
          fatherWeight: AdditionalData?.FatherWeight || "",
          fatherHeight: AdditionalData?.FatherHeight || "",
          fatherBloodGroup: AdditionalData?.FatherBloodGroup || "",
          fatherAadharCard: AdditionalData?.FatherAadharcardNo || "",
          fatherAnnualIncome: AdditionalData?.FatherAnnualIncome || "",

          // Mother's Information
          motherOccupation: AdditionalData?.MotherOccupation || "",
          motherQualification: AdditionalData?.MotherQualification || "",
          motherEmail: AdditionalData?.MotherEmail || "",
          motherOfficeName: AdditionalData?.MotherOfficeName || "",
          motherOfficeAddress: AdditionalData?.MotherOfficeAddress || "",
          motherDesignation: AdditionalData?.MotherDesignation || "",
          motherDOB: formatDOB(AdditionalData?.MotherDOB) || "",
          motherPhoto: AdditionalData?.MotherPhoto || "",
          motherWeight: AdditionalData?.MotherWeight || "",
          motherHeight: AdditionalData?.MotherHeight || "",
          motherAadharCard: AdditionalData?.MotherAadharcardNo || "",
          motherBloodGroup: AdditionalData?.MotherBloodGroup || "",
          motherAnnualIncome: AdditionalData?.MotherAnnualIncome || "",

          // Family Information
          marriageAnniversaryDate: formatDOB(AdditionalData?.AnniversaryDate) || "",
          localGuardianPhoto: AdditionalData?.GuardianPhoto || "",
          familyMonthlyIncome: AdditionalData?.FamilyMonthlyIncome || "",
          cwsn: AdditionalData?.CWSN || "",
          relativeFullName: AdditionalData?.RelativeName || "",
          residencePhoneNumber: studentData?.Residence_Phone_Number || "",  //Single 
          neighbourPhoneNumber: studentData?.Neighbour_Number || "",
          officePhoneNumber: studentData?.Office_Number || "",
          familyPhoto: studentData?.Family_Photo_Copy_Path || "",           //Single
          name1: AdditionalData?.Name1 || "",
          name2: AdditionalData?.Name2 || "",
          age1: AdditionalData?.Age1 || "",
          age2: AdditionalData?.Age2 || "",
          institution1: AdditionalData?.Institution1 || "",
          institution2: AdditionalData?.Institution2 || "",
          standard1: AdditionalData?.StandardName1 || "",
          standard2: AdditionalData?.StandardName2 || "",
        },
        additional: {
          ...prevForm.additional,
          lastSchoolName: studentData?.LastSchoolName || '',
          lastSchoolAddress: studentData?.LastSchoolAddress || '',
          standard: studentData?.LastCompletedStd || '',
          schoolUDISENo: studentData?.LastSchoolUDISENo || '',
          schoolBoardName: studentData?.LastCompletedBoard || '',
          isRecognised: studentData?.IsRecognisedBoard === "True" ? 'Yes' : 'No',
          // lastSchoolRollNumber: '',
          //  lastSchoolYear: '',
          houseNumber: AdditionalData.HouseNoPlotNo || '',
          mainArea: AdditionalData.MainArea || '',
          subareaName: AdditionalData.SubareaName || '',
          landmark: AdditionalData.Landmark || '',
          taluka: AdditionalData.Taluka || '',
          district: AdditionalData.District || '',

          admissionStandard: AdditionalData.AddmissionStandard || '',
          admissionAcademicYear: AdditionalData.AddmissionAcademicYear || '',
          previousMarksObtained: AdditionalData.PreviousMarksObtained || '',
          previousMarksOutOf: AdditionalData.PreviousMarksOutOff || '',
          subjectNames: AdditionalData.SubjectNames || '',
          previousYearOfPassing: AdditionalData.PreviousYearOfPassing || '',
          currentAcademicYear: AdditionalData.CurrentAcademicYear || '',
          currentStandard: AdditionalData.CurrentStandard || '',
        },
        streamwiseSubject: {
          ...prevForm.streamwiseSubject,
          streamId: StreamwiseSubject.StreamId || "",
          groupId: StreamwiseSubject.GroupId || "",
          compulsorySubjects: StreamwiseSubject.CompulsorySubjects || "",
          optionalSubject1,
          optionalSubject2,
          competitiveExams,
        },
      }));
    }
  }, [USGetSingleStudentDetails, GetStudentAdditionalDetails, GetFromNumber, GetStudentStreamwiseSubjectDetails]);

  useEffect(() => {
    console.log('Nested Form🆕', form);
  }, [form]);
  //#endregion

  //#region Read APIs.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const GetSchoolSettings = {
          asSchoolId: Number(schoolId),
        };

        const GetStudentRecordDataResult = {
          asSchoolId: Number(localStorage.getItem('localSchoolId')),
          asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
          asStandardId: standardId,
          asDivisionId: DivisionId
        };

        const GetSingleStudentDetails = {
          asSchoolId: Number(localStorage.getItem('localSchoolId')),
          asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
          asStudentId: SchoolWise_Student_Id // Number(sessionStorage.getItem('Id'))
        };

        const GetStudentAdditionalDetailsBody = {
          asSchoolId: Number(localStorage.getItem('localSchoolId')),
          //asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
          asStudentId: SchoolWise_Student_Id // Number(sessionStorage.getItem('Id'))
        };

        const FeeAreaNamesBody = {
          asSchoolId: Number(localStorage.getItem('localSchoolId')),
        };

        const FormNumberBody = {
          asSchoolId: Number(localStorage.getItem('localSchoolId')),
          asStudentId: SchoolWise_Student_Id
        };

        const RetriveStudentStreamwiseSubjectBody = {
          asSchoolId: 122,
          asAcademicYearId: 10,
          asStudentId: 4584
        };

        await Promise.all([
          dispatch(CDAGetSchoolSettings(GetSchoolSettings)),
          dispatch(CDAGetMasterData(GetStudentRecordDataResult)),
          dispatch(CDAGetSingleStudentDetails(GetSingleStudentDetails)),
          dispatch(CDAGetStudentAdditionalDetails(GetStudentAdditionalDetailsBody)),
          dispatch(CDAFeeAreaNames(FeeAreaNamesBody)),
          dispatch(GetFormNumber(FormNumberBody)),
          dispatch(CDARetriveStudentStreamwiseSubject(RetriveStudentStreamwiseSubjectBody))
        ]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [schoolId, standardId, DivisionId, SchoolWise_Student_Id]);

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
  //console.log('⚙️UsGetSchoolSettings:', UsGetSchoolSettings);
  const IsAdditionalFieldsApplicable = UsGetSchoolSettings?.GetSchoolSettingsResult?.IsAdditionalFieldsApplicable || false;

  const UpdateStudentBody: IUpdateStudentBody = {
    "asSchoolId": Number(localStorage.getItem('localSchoolId')),
    "asStudentId": SchoolWise_Student_Id,
    "asInsertedById": Number(teacherId), // Missing
    "asID": 0, // Missing
    "asAcademicYearId": academicYearId,
    "asFormNumber": Number(form.admission?.formNumber) || 0, // Missing
    "asPhoto_file_Path": form.personal?.photoFilePath || "", // Missing
    "asFirst_Name": form.personal?.firstName || "",
    "asMiddle_Name": form.personal?.middleName || "",
    "asLast_Name": form.personal?.lastName || "",
    "asMother_Name": form.personal?.motherName || "",
    "asBlood_Group": form.personal?.bloodGroup || "",
    "asEnrolment_Number": form.admission?.registrationNumber || "",
    "asParent_Name": form.personal?.parentName || "",
    "asParent_Occupation": form.personal?.parentOccupation || "",
    "asOther_Occupation": "",
    "asAddress": form.personal?.address || "",
    "asCity": form.personal?.city || "",
    "asState": form.personal?.state || "",
    "asPincode": form.personal?.pin || "",
    "asResidence_Phone_Number": "9224286937",
    "asMobile_Number": form.personal?.motherNumber || "",
    "asMobile_Number2": form.personal?.fatherNumber || "",
    "asOffice_Number": "9270362059",
    "asNeighbour_Number": "",
    "asUpdated_By_Id": teacherId,
    "asUpdate_Date": "2024-10-10",
    "asDOB": formatDOB(form.personal?.dateOfBirth) || "2011-03-29",
    "asBirth_Place": form.personal?.placeOfBirth || "",
    "asNationality": form.personal?.nationality || "",
    "asSex": form.personal?.gender || "",
    "asSalutation_Id": "6",
    "asCategory_Id": form.personal?.category || "",
    "asCasteAndSubCaste": form.personal?.casteAndSubCaste || "",
    "asAdmission_Date": formatDOB(form.admission?.admissionDate) || "",
    "asJoining_Date": formatDOB(form.admission?.joiningDate) || "",
    "asDateOfBirthInText": "Twenty One March Two Thousand Eleven",
    "asOptional_Subject_Id": "0",
    "asMother_Tongue": form.personal?.motherTongue || "",
    "asLastSchoolName": "",
    "asLastSchoolAddress": "",
    "asLastCompletedStd": "",
    "asLastSchoolUDISENo": "",
    "asLastCompletedBoard": "",
    "asIsRecognisedBoard": "True",
    "asAadharCardNo": form.personal?.aadharCardNumber || "",
    "asNameOnAadharCard": form.personal?.nameOnAadharCard || "",
    "asAadharCard_Photo_Copy_Path": form.personal?.aadharCardScanCopy || "",
    "asFamily_Photo_Copy_Path": "",
    "asUDISENumber": form.admission?.UDISENumber || "",
    "asBoardRegistrationNo": form.admission?.boardRegistrationNumber || "",
    "asIsRiseAndShine": form.admission?.isRiseAndShine === false ? "False" : "True",
    "asAdmissionSectionId": "0",
    "asGRNumber": "",
    "asStudentUniqueNo": "",
    "asSaralNo": form.admission?.saralNo || "",
    "asIsOnlyChild": form.admission?.isOnlyChild === false ? "False" : "True",
    "asMinority": form.admission?.isMinority === false ? "False" : "True",
    "asRoll_No": form.admission?.studentRollNumber || "",
    "asRule_Id": form.admission?.applicableRules || "",
    "asIsStaffKid": form.admission?.isStaffKid === false ? false : true,
    "asHeight": 0,
    "asWeight": 0,
    "asUpdated_By_id": Number(teacherId),
    "asRTECategoryId": Number(form.admission?.rteCategory) || 0,
    "asSecondLanguageSubjectId": form.admission?.secondlanguage || "",
    "asThirdLanguageSubjectId": form.admission?.thirdlanguage || "",
    "asIsForDayBoarding": form.admission?.isForDayBoarding === false ? false : true,
    "asFeeCategoryDetailsId": "0",     // ❌This is the cause of problem
    "asRTEApplicationFormNo": form.admission?.rteApplicationForm || "",
    "asAnnualIncome": 0,
    "asStandard_Id": standardId, // Missing
    "asDivision_Id": DivisionId, // Missing
    "asReligion": form.personal?.religion || "",
    "asYearWise_Student_Id": YearWise_Student_Id,
    "asParentUserId": 0
  }

  const AddStudentAdditionalDetailsBody: IAddStudentAdditionalDetailsBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId')),
    asAdmissionAcadmicYear: form.additional?.admissionAcademicYear || "",
    asAdmissionStandard: form.additional?.admissionStandard || "",
    asCurrentAcademicYear: form.additional?.currentAcademicYear || "",
    asCurrentStandard: form.additional?.currentStandard || "",
    asIsHandicapped: form.admission?.isHandicapped || false,
    asPreviousMarksObtained: form.additional?.previousMarksObtained || "",
    asPreviousMarksOutOff: form.additional?.previousMarksOutOf || "",
    asPreviousYearOfPassing: form.additional?.previousYearOfPassing || "",
    asSubjectNames: form.additional?.subjectNames || "",
    asSchoolwiseStudentId: 3556,
    asUserid: 4463,
    asReligion: form.personal?.religion || "",
    asBirthTaluka: form.personal?.birthTaluka || "",
    asBirthDistrict: form.personal?.birthDistrict || "",
    asHouseNoPlotNo: form.additional?.houseNumber || "",
    asMainArea: form.additional?.mainArea || "",
    asSubareaName: form.additional?.subareaName || "",
    asLandmark: form.additional?.landmark || "",
    asTaluka: form.additional?.taluka || "",
    asDistrict: form.additional?.district || "",
    asFeeAreaName: Number(form.admission?.feeAreaNames) || 0,
    asFatherOccupation: familyDetailsData?.fatherOccupation || "",
    asFatherQualification: form.family?.fatherQualification || "",
    asFatherEmail: form.family?.fatherEmail || "",
    asFatherOfficeName: form.family?.fatherOfficeName || "",
    asFatherOfficeAddress: form.family?.fatherOfficeAddress || "",
    asMotherOccupation: form.family?.motherOccupation || "",
    asMotherQualification: form.family?.motherQualification || "",
    asMotherEmail: form.family?.motherEmail || "",
    asMotherOfficeName: form.family?.motherOfficeName || "",
    asMotherOfficeAddress: form.family?.motherOfficeAddress || "",
    asFatherDOB: formatDOB(form.family?.fatherDOB) || "",
    asMotherDOB: formatDOB(form.family?.motherDOB) || "",
    asFatherDesignation: form.family?.fatherDesignation || "",
    asMotherDesignation: form.family?.motherDesignation || "",
    asFatherPhoto: form.family?.fatherPhoto || "",
    asMotherPhoto: form.family?.motherPhoto || "",
    asAnniversaryDate: form.family?.marriageAnniversaryDate || "",
    asLocalGuardianPhoto: form.family?.localGuardianPhoto || "",
    asRelativeName: form.family?.relativeFullName || "",
    asFatherBinaryPhoto: null,       //Need to work on this
    asMotherBinaryPhoto: null,
    asRelativeBinaryPhoto: null,
    asFatherWeight: form.family?.fatherWeight || 0,
    asMotherWeight: form.family?.motherWeight || 0,
    asFatherHeight: form.family?.fatherHeight || 0,
    asMotherHeight: form.family?.motherHeight || 0,
    asFatherAadharcardNo: form.family?.fatherAadharCard || "",
    asMotherAadharcardNo: form.family?.motherAadharCard || "",
    asFatherBloodGroup: form.family?.fatherBloodGroup || "",
    asMotherBloodGroup: form.family?.motherBloodGroup || "",
    asFamilyMonthlyIncome: form.family?.familyMonthlyIncome || 0.00,
    asCWSN: form.family?.cwsn || "",
    asFatherAnnualIncome: form.family?.fatherAnnualIncome || 0.00,
    asMotherAnnualIncome: form.family?.motherAnnualIncome || 0.00,
    asBirthState: form.personal?.birthState || "",
    asName1: form.family?.name1 || "",
    asAge1: form.family?.age1 || 0,
    asInstitute1: form.family?.institution1 || "",
    asStandard1: form.family?.standard1 || "",
    asName2: form.family?.name2 || "",
    asAge2: form.family?.age2 || 0,
    asInstitute2: form.family?.institution2 || "",
    asStandard2: form.family?.standard2 || "",
    asResidenceType: Number(form.admission?.residenceTypes) || 0,
    asRFID: form.admission?.RFID || "",
  }

  const UpdateStudentStreamwiseSubjectDetailsBody: IUpdateStudentStreamwiseSubjectDetailsBody = {
    asSchoolId: 122,
    asStudentId: 4584,
    asStreamId: Number(form.streamwiseSubject?.streamId) || 0,
    GroupId: Number(form.streamwiseSubject?.groupId) || 0,
    CompulsorySubject: form.streamwiseSubject?.compulsorySubjects || '',
    chkCompitativeExams: form.streamwiseSubject?.competitiveExams || "0",
    OptSubjectOne: Number(form.streamwiseSubject?.optionalSubject1) || 0,
    OptSubjectTwo: Number(form.streamwiseSubject?.optionalSubject2) || 0,
  }

  const transportFeeBody: IGenerateTransportFeeEntriesBody = {
    asSchoolId: Number(schoolId),
    asAcademicYearId: Number(academicYearId),
    asStudentId: Number(SchoolWise_Student_Id),
    asUpdatedById: Number(teacherId),
  };

  const executeApiCalls = async (updateStudentBody, additionalDetailsBody, streamwiseSubjectDetailsBody, transportFeeBody) => {
    try {
      // Update Student Details
      console.log('Sending update with data:', updateStudentBody);
      await dispatch(CDAUpdateStudent(updateStudentBody));

      // Add Additional Student Details
      if (additionalDetailsBody) {
        console.log('Sending additional details:', additionalDetailsBody);
        await dispatch(CDAAddStudentAdditionalDetails(additionalDetailsBody));
      }

      // Update Streamwise Subject Details
      if (streamwiseSubjectDetailsBody) {
        console.log('Updating streamwise subject details:', streamwiseSubjectDetailsBody);
        await dispatch(CDAUpdateStudentStreamwiseSubjectDetails(streamwiseSubjectDetailsBody));
      }

      // Generate Transport Fee Entries
      if (transportFeeBody) {
        console.log('Generating transport fee entries:', transportFeeBody);
        await dispatch(CDAGenerateTransportFeeEntries(transportFeeBody));
      }

      console.log('API calls completed successfully.');
    } catch (error) {
      console.error('Error during API calls:', error);
    }
  };

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate the form
    const isFormValid = handleValidation();

    if (!isFormValid) {
      console.log('😶 Form submission halted due to validation errors.');
      return;
    }

    // Validation passed, proceed with API calls
    try {
      console.log('Validation passed! Proceeding with API calls...');

      await executeApiCalls(
        UpdateStudentBody,
        AddStudentAdditionalDetailsBody,
        UpdateStudentStreamwiseSubjectDetailsBody,
        transportFeeBody,
      );

      // Success message or further actions
      console.log('✅ Form submitted successfully with all API calls completed!');
    } catch (error) {
      console.error('🚨 Error during form submission or API calls:', error);
    }
  };

  const handleAdmissionChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      admission: {
        ...prevForm.admission,
        [name]: value,
      },
    }));

  };

  // Updating a property in personal
  const handlePersonalChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      personal: {
        ...prevForm.personal,
        [name]: value,
      },
    }));
  };

  // Updating a property in family
  const handleFamilyChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      family: {
        ...prevForm.family,
        [name]: value,
      },
    }));
  };

  // Updating a property in additional
  const handleAdditionalChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      additional: {
        ...prevForm.additional,
        [name]: value,
      },
    }));
  };

  // Updating a property in additional
  const handleStreamwiseSubjectChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      streamwiseSubject: {
        ...prevForm.streamwiseSubject,
        [name]: value,
      },
    }));
  };


  // const handleUpdate = () => {
  //   console.log('Sending update with data:', UpdateStudentBody);

  //   dispatch(CDAUpdateStudent(UpdateStudentBody));
  //   //❌SHUTING DOWN API CALLS TEMPORARILY
  //   dispatch(CDAAddStudentAdditionalDetails(AddStudentAdditionalDetailsBody));
  //   dispatch(CDAUpdateStudentStreamwiseSubjectDetails(UpdateStudentStreamwiseSubjectDetailsBody));


  //   dispatch(CDAGenerateTransportFeeEntries({ asSchoolId: Number(schoolId), asAcademicYearId: Number(academicYearId), asStudentId: Number(SchoolWise_Student_Id), asUpdatedById: Number(teacherId) }));
  // };

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
                onClick={handleFormSubmission}
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
        {validationMessages.length > 0 && (
          <div className="">
            <ul>
              {validationMessages.map((message, index) => (
                <li key={index} style={{ color: 'red', fontWeight: 'bold' }}>
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
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
          // onChange={(data) => handleDataChange('user', data)}
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
          {IsAdditionalFieldsApplicable && (
            <Tab
              sx={{ m: 2, maxWidth: 200 }}
              icon={<FamilyRestroomIcon />}
              label="Family Details"
            />
          )}
          {IsAdditionalFieldsApplicable && (
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
              <AdmissionDetails admission={form.admission} onChange={handleAdmissionChange} onTabChange={onAdmissionTab} />
            </Grid>
          </Grid>
        )}
        {currentTab === 1 && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <PersonalDetails personal={form.personal} onChange={handlePersonalChange} onTabChange={onPersonalTab} />
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
              <FamilyDetails family={form.family} onChange={handleFamilyChange} onTabChange={onFamilyTab} />
            </Grid>
          </Grid>
        )}
        {currentTab === 4 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            </Grid>
            <Grid item xs={12}>
              <AdditionalDetails additional={form.additional} onChange={handleAdditionalChange} onTabChange={onAdditionalInfoTab} />
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
              <StudentSubjectDetails streamwiseSubject={form.streamwiseSubject} onChange={handleStreamwiseSubjectChange} onTabChange={onStudentStreamwiseSubjectTab} />
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
