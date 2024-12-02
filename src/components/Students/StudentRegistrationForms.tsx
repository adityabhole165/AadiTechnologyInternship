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
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import {
  IDeleteStudentAchievementDetailsBody,
  IGenerateTransportFeeEntriesBody,
  IGetStudentAchievementDetailsBody,
  IGetStudentNameForAchievementControlBody,
  IGetStudentsAllAchievementDetailsBody,
  IGetStudentsSiblingDetailBody,
  ISaveStudentAchievementDetailsBody,
  IUpdateStudentTrackingDetailsBody
} from 'src/interfaces/StudentDetails/IStudentDetails';
import {
  IAddStudentAdditionalDetailsBody,
  IUpdateStudentBody,
  IUpdateStudentStreamwiseSubjectDetailsBody
} from 'src/interfaces/Students/IStudentUI';
import SingleFile from 'src/libraries/File/SingleFile3';
import { CDAGetSchoolSettings } from 'src/requests/ProgressReport/ReqProgressReport';
import {
  CDADeleteStudentAchievementDetailsMsg,
  CDAEditGetStudentAchievementDetails,
  CDAGenerateTransportFeeEntries,
  CDAGetStudentNameForAchievementControl,
  CDAGetStudentsAllAchievementList,
  CDAGetStudentsSiblingDetail,
  CDAResetDeleteStudentAchievementDetailsMsg,
  CDAResetSaveStudentAchievementDetailsMsg,
  CDASaveStudentAchievementDetailsMsg,
  GetFormNumber
} from 'src/requests/StudentDetails/RequestStudentDetails';
import {
  CDAAddStudentAdditionalDetails,
  CDAFeeAreaNames,
  CDAGetMasterData,
  CDAGetSingleStudentDetails,
  CDAGetStudentAdditionalDetails,
  CDARetriveStudentStreamwiseSubject,
  CDAUpdateStudent,
  CDAUpdateStudentStreamwiseSubjectDetails
} from 'src/requests/Students/RequestStudentUI';
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
  neighbourPhoneNumber?: string;
  officePhoneNumber?: string;
  familyPhoto?: string;
  name1?: string;
  name2?: string;
  age1?: number;
  age2?: number;
  institution1?: string;
  institution2?: string;
  standard1?: string;
  standard2?: string;
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
  const {
    Name,
    standardId,
    DivisionId,
    YearWise_Student_Id,
    SchoolWise_Student_Id,
    StandardDivision_Id,
    Enrolment_Number,
    Joining_Date
  } = location.state || {};
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
  const navigate = useNavigate();

  const [tabCompletion, setTabCompletion] = useState({
    admission: 0,
    personal: 0,
    family: 0
  });

  const [profileCompletion, setProfileCompletion] = useState(0);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);

  // const [admissionDetailsData, setAdmissionDetailsData] = useState<RAdmissionDetails>({});
  // const [personalDetailsData, setPersonalDetailsData] = useState<IPersonalDetails>({});
  const [familyDetailsData, setFamilyDetailsData] = useState<RFamilyDetails>(
    {}
  );
  // const [additionalInfoData, setAdditionalInfoData] = useState<RAdditionalInfoDetails>({});
  // const [streamwiseSubjectData, setStreamwiseSubjectData] = useState<RStreamwiseSubjectDetails>({});

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
      isHandicapped: false
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
      otherOccupation: '',
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
      photoFilePathImage: null
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
      standard2: ''
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
      competitiveExams: ''
    }
  });

  const requiredFieldsMap = {
    admission: [
      'registrationNumber',
      'admissionDate',
      'joiningDate',
      'studentRollNumber'
    ],
    personal: [
      'firstName',
      'parentName',
      'parentOccupation',
      'address',
      'city',
      'pin',
      'state',
      'dateOfBirth',
      'placeOfBirth',
      'casteAndSubCaste'
    ],
    family: ['fatherDOB', 'motherDOB', 'marriageAnniversaryDate']
  };

  const calculateCompletion = (tabName: string, data: any) => {
    // Get required fields dynamically from the map
    const requiredFields = requiredFieldsMap[tabName] || [];

    // Calculate completed and unfilled fields
    const completedFields = requiredFields.filter(
      (field) => !!data[field]
    ).length;
    const unfilledFields = requiredFields.filter((field) => !data[field]);

    // Calculate completion percentage
    const completionPercentage =
      (completedFields / requiredFields.length) * 100;

    // Update the tabCompletion state
    setTabCompletion((prev) => ({
      ...prev,
      [tabName]: completionPercentage
    }));

    return { unfilledFields, tabName };
  };

  useEffect(() => {
    // Calculate overall profile completion dynamically
    const totalTabs = Object.keys(tabCompletion).length;
    const totalProgress = Object.values(tabCompletion).reduce(
      (acc, curr) => acc + curr,
      0
    );
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

    const admissionValidation = calculateCompletion(
      'admission',
      form.admission
    );
    const personalValidation = calculateCompletion('personal', form.personal);
    const familyValidation = calculateCompletion('family', form.family);

    //Collect unfilled fields for each tab
    [admissionValidation, personalValidation, familyValidation].forEach(
      ({ unfilledFields, tabName }) => {
        unfilledFields.forEach((field) => {
          allMessages.push(`"${field}" is missing in ${tabName} tab.`);
        });
      }
    );

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
      setStatus((prevStatus) => ({
        ...prevStatus,
        admissionDetails: isSuccessful
      }));
    } else if (currentTab === 1) {
      setStatus((prevStatus) => ({
        ...prevStatus,
        personalDetails: isSuccessful
      }));
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
  // const onAdmissionTab = (updatedData) => {
  //   //setAdmissionDetailsData(updatedData);
  //   // calculateCompletion('admission', updatedData);
  //   //console.log('1️⃣Admission', admissionDetailsData);
  // };

  const onPersonalTab = (updatedData) => {
    //setPersonalDetailsData(updatedData);
    // calculateCompletion('personal', updatedData);
    //console.log('2️⃣Personal', personalDetailsData);
  };

  const onFamilyTab = (updatedData) => {
    //setFamilyDetailsData(updatedData);
    // calculateCompletion('family', updatedData);
    //console.log('3️⃣Family', familyDetailsData);
  };

  const onAdditionalInfoTab = (updateddata) => {
    //setAdditionalInfoData(updateddata);
    //console.log('4️⃣Additional', additionalInfoData);
  };

  const onStudentStreamwiseSubjectTab = (updateddata) => {
    //setStreamwiseSubjectData(updateddata);
    //console.log('5️⃣StreamwiseSubject', streamwiseSubjectData);
  };
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

  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
    setIsConfirm('true');
  };

  const ValidFileTypes = [
    'BMP',
    'DOC',
    'DOCX',
    'jpg',
    'JPEG',
    'PDF',
    'XLS',
    'XLSX'
  ];
  const MaxfileSize = 5000000;
  const [SelectDate, SetSelectDate] = useState(
    AssignedDate == undefined
      ? new Date().toISOString().split('T')[0]
      : getCalendarDateFormatDateNew(AssignedDate)
  );

  //#region UseSelectors
  const USGetSingleStudentDetails = useSelector(
    (state: RootState) => state.StudentUI.ISGetSingleStudentDetails
  );
  const GetStudentAdditionalDetails = useSelector(
    (state: RootState) => state.StudentUI.ISGetStudentAdditionalDetails
  );
  const GetFromNumber = useSelector(
    (state: RootState) => state.GetStandardwiseMinMaxDOB.IGetFormNumber
  );
  const GetStudentStreamwiseSubjectDetails = useSelector(
    (state: RootState) => state.StudentUI.ISGetStudentStreamwiseSubjectDetails
  );

  useEffect(() => {
    if (
      (USGetSingleStudentDetails && USGetSingleStudentDetails.length > 0) ||
      (GetStudentAdditionalDetails &&
        Object.keys(GetStudentAdditionalDetails).length > 0) ||
      (GetFromNumber && GetFromNumber.length > 0)
    ) {
      const studentData = USGetSingleStudentDetails[0];
      const AdditionalData: any = GetStudentAdditionalDetails; // Get first item from array
      const FormNumber = GetFromNumber[0];
      const StreamwiseSubject = GetStudentStreamwiseSubjectDetails[0];

      // // Split optional subjects if StreamId is 3
      // let optionalSubject1 = "";
      // let optionalSubject2 = "";

      // if (StreamwiseSubject.StreamId === "3" && StreamwiseSubject.OptionalSubjects) {
      //   const optionalSubjects = StreamwiseSubject.OptionalSubjects.split(',');
      //   optionalSubject1 = optionalSubjects[0] || "";
      //   optionalSubject2 = optionalSubjects[1] || "";
      // } else {
      //   optionalSubject1 = StreamwiseSubject.OptionalSubjects || "";
      // }

      // // Initialize competitive exams
      // const competitiveExams = StreamwiseSubject.CompitativeExam?.split(',').map(Number) || [];

      setForm((prevForm) => ({
        ...prevForm,
        admission: {
          ...prevForm.admission,
          userName: studentData?.User_Login || '',
          sendSMS: studentData?.Send_SMS === 'False' ? false : true,
          newAdmission: studentData?.Is_New_Student === 'False' ? false : true,
          isRTEApplicable:
            studentData?.Is_RTE_Student === 'False' ? false : true,
          rteCategory: studentData?.RTECategoryId || '',
          rteApplicationForm: studentData?.RTEApplicationFormNo || '',
          formNumber: FormNumber?.FormNumber || '',
          registrationNumber: studentData?.Enrolment_Number || '0',
          admissionDate: formatDOB(studentData?.Admission_date) || '',
          joiningDate: formatDOB(studentData?.Joining_Date) || '',
          studentRollNumber: studentData?.Roll_No || '',
          UDISENumber: studentData?.UDISENumber || '',
          BoardRegistrationNumber: studentData?.BoardRegistrationNo || '',
          SaralNo: studentData?.SaralNo || '',
          PENNumber: studentData?.PENNumber || '',
          secondlanguage: studentData?.SecondLanguageSubjectId || '',
          thirdlanguage: studentData?.ThirdLanguageSubjectId || '',
          applicableRules: studentData?.Rule_Id || '',
          staffUserRole: studentData?.User_Role_Id || '',
          staffName: studentData?.staffName || '',
          residenceTypes: studentData?.ResidenceTypeId || '',
          feeAreaNames: AdditionalData?.FeeAreaName || '',
          RFID: AdditionalData?.RFID || '',
          isStaffKid: studentData?.IsStaffKid === 'False' ? false : true,
          isOnlyChild: studentData?.IsOnlyChild === 'False' ? false : true,
          isRiseAndShine:
            studentData?.IsRiseAndShine === 'False' ? false : true,
          isMinority: studentData?.Minority === 'False' ? false : true,
          isForDayBoarding:
            studentData?.IsForDayBoarding === 'False' ? false : true,
          isDayBoardingFeePaid:
            studentData?.IsDayBoardingFeePaid === 'False' ? false : true,
          isHandicapped: AdditionalData?.IsHandicapped || false
        },
        personal: {
          ...prevForm.personal,
          firstName: studentData?.First_Name || '',
          middleName: studentData?.Middle_Name || '',
          lastName: studentData?.Last_Name || '',
          motherName: studentData?.Mother_Name || '',
          motherNumber: studentData?.Mobile_Number || '',
          parentName: studentData?.Parent_Name || '',
          fatherNumber: studentData?.Mobile_Number2 || '',
          email: studentData?.Email_Address || '',
          parentOccupation: studentData?.Parent_Occupation || '',
          otherOccupation: studentData?.Other_Occupation || '',
          address: studentData?.Address || '',
          city: studentData?.City || '',
          state: studentData?.State || '',
          pin: studentData?.Pincode || '',
          placeOfBirth: studentData?.Birth_Place || '',
          birthTaluka: AdditionalData.BirthTaluka || '',
          birthDistrict: AdditionalData.BirthDistrict || '',
          birthState: AdditionalData.BirthState || '',
          religion: studentData?.Religion || '',
          casteAndSubCaste: studentData?.CasteAndSubCaste || '',
          category: studentData?.Category_Id || '',
          dateOfBirth: formatDOB(studentData?.DOB) || '',
          nationality: studentData?.Nationality || '',
          motherTongue: studentData?.Mother_Tongue || '',
          gender: studentData?.Sex || '',
          bloodGroup: studentData?.Blood_Group || '',
          aadharCardNumber: studentData?.AadharCardNo || '',
          nameOnAadharCard: studentData?.NameOnAadharCard || '',
          aadharCardScanCopy: studentData?.AadharCard_Photo_Copy_Path || '',
          photoFilePath: studentData?.Photo_File_Path || null,
          photoFilePathImage: studentData?.Photo_file_Path_Image || null
        },
        family: {
          ...prevForm.family,
          fatherQualification: AdditionalData?.FatherQualification || '',
          fatherEmail: AdditionalData?.FatherEmail || '',
          fatherOfficeName: AdditionalData?.FatherOfficeName || '',
          fatherOfficeAddress: AdditionalData?.FatherOfficeAddress || '',
          fatherDesignation: AdditionalData?.FatherDesignation || '',
          fatherDOB: formatDOB(AdditionalData?.FatherDOB) || '',
          fatherPhoto: AdditionalData?.FatherPhoto || '',
          fatherWeight: AdditionalData?.FatherWeight || '',
          fatherHeight: AdditionalData?.FatherHeight || '',
          fatherBloodGroup: AdditionalData?.FatherBloodGroup || '',
          fatherAadharCard: AdditionalData?.FatherAadharcardNo || '',
          fatherAnnualIncome: AdditionalData?.FatherAnnualIncome || '',

          // Mother's Information
          motherOccupation: AdditionalData?.MotherOccupation || '',
          motherQualification: AdditionalData?.MotherQualification || '',
          motherEmail: AdditionalData?.MotherEmail || '',
          motherOfficeName: AdditionalData?.MotherOfficeName || '',
          motherOfficeAddress: AdditionalData?.MotherOfficeAddress || '',
          motherDesignation: AdditionalData?.MotherDesignation || '',
          motherDOB: formatDOB(AdditionalData?.MotherDOB) || '',
          motherPhoto: AdditionalData?.MotherPhoto || '',
          motherWeight: AdditionalData?.MotherWeight || '',
          motherHeight: AdditionalData?.MotherHeight || '',
          motherAadharCard: AdditionalData?.MotherAadharcardNo || '',
          motherBloodGroup: AdditionalData?.MotherBloodGroup || '',
          motherAnnualIncome: AdditionalData?.MotherAnnualIncome || '',

          // Family Information
          marriageAnniversaryDate:
            formatDOB(AdditionalData?.AnniversaryDate) || '',
          localGuardianPhoto: AdditionalData?.GuardianPhoto || '',
          familyMonthlyIncome: AdditionalData?.FamilyMonthlyIncome || '',
          cwsn: AdditionalData?.CWSN || '',
          relativeFullName: AdditionalData?.RelativeName || '',
          residencePhoneNumber: studentData?.Residence_Phone_Number || '', //Single
          neighbourPhoneNumber: studentData?.Neighbour_Number || '',
          officePhoneNumber: studentData?.Office_Number || '',
          familyPhoto: studentData?.Family_Photo_Copy_Path || '', //Single
          name1: AdditionalData?.Name1 || '',
          name2: AdditionalData?.Name2 || '',
          age1: AdditionalData?.Age1 || '',
          age2: AdditionalData?.Age2 || '',
          institution1: AdditionalData?.Institution1 || '',
          institution2: AdditionalData?.Institution2 || '',
          standard1: AdditionalData?.StandardName1 || '',
          standard2: AdditionalData?.StandardName2 || ''
        },
        additional: {
          ...prevForm.additional,
          lastSchoolName: studentData?.LastSchoolName || '',
          lastSchoolAddress: studentData?.LastSchoolAddress || '',
          standard: studentData?.LastCompletedStd || '',
          schoolUDISENo: studentData?.LastSchoolUDISENo || '',
          schoolBoardName: studentData?.LastCompletedBoard || '',
          isRecognised:
            studentData?.IsRecognisedBoard === 'True' ? 'Yes' : 'No',
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
          currentStandard: AdditionalData.CurrentStandard || ''
        },
        streamwiseSubject: {
          ...prevForm.streamwiseSubject
          // streamId: StreamwiseSubject.StreamId || "",
          // groupId: StreamwiseSubject.GroupId || "",
          // compulsorySubjects: StreamwiseSubject.CompulsorySubjects || "",
          // optionalSubject1,
          // optionalSubject2,
          // competitiveExams,
        }
      }));
    }
  }, [
    USGetSingleStudentDetails,
    GetStudentAdditionalDetails,
    GetFromNumber,
    GetStudentStreamwiseSubjectDetails
  ]);

  useEffect(() => {
    console.log('Nested Form🆕', form);
  }, [form]);
  //#endregion

  //#region Read APIs.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const GetSchoolSettings = {
          asSchoolId: Number(schoolId)
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
          asSchoolId: Number(localStorage.getItem('localSchoolId'))
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
          dispatch(
            CDAGetStudentAdditionalDetails(GetStudentAdditionalDetailsBody)
          ),
          dispatch(CDAFeeAreaNames(FeeAreaNamesBody)),
          dispatch(GetFormNumber(FormNumberBody)),
          dispatch(
            CDARetriveStudentStreamwiseSubject(
              RetriveStudentStreamwiseSubjectBody
            )
          )
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
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
  };

  function getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const numberToWords = (num) => {
    const ones = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine'
    ];
    const teens = [
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen'
    ];
    const tens = [
      '',
      'Ten',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety'
    ];

    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 11];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '')
      );

    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    return (
      ones[hundred] +
      ' Hundred' +
      (remainder ? ' ' + numberToWords(remainder) : '')
    );
  };

  const dateToText = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const dayText = numberToWords(day);
    const monthText = months[month - 1];
    const yearText = numberToWords(year).replace('Twenty', 'Two Thousand');

    return `${dayText} ${monthText} ${yearText}`;
  };
  //#endregion

  //#region API CAlls
  const UpdateStudentResult = useSelector(
    (state: RootState) => state.StudentUI.ISUpdateStudent
  );
  // console.log('🩸UpdateStudentResult:', UpdateStudentResult);
  const UsGetSchoolSettings: any = useSelector(
    (state: RootState) => state.ProgressReportNew.IsGetSchoolSettings
  );
  //console.log('⚙️UsGetSchoolSettings:', UsGetSchoolSettings);
  const IsAdditionalFieldsApplicable =
    UsGetSchoolSettings?.GetSchoolSettingsResult
      ?.IsAdditionalFieldsApplicable || false;

  const UpdateStudentBody: IUpdateStudentBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId')),
    asStudentId: SchoolWise_Student_Id,
    asInsertedById: Number(teacherId), // Missing
    asID: 0, // Missing
    asAcademicYearId: academicYearId,
    asFormNumber: Number(form.admission?.formNumber) || 0, // Missing
    asPhoto_file_Path: form.personal?.photoFilePath || '', // Missing
    asFirst_Name: form.personal?.firstName || '',
    asMiddle_Name: form.personal?.middleName || '',
    asLast_Name: form.personal?.lastName || '',
    asMother_Name: form.personal?.motherName || '',
    asBlood_Group: form.personal?.bloodGroup || '',
    asEnrolment_Number: form.admission?.registrationNumber || '',
    asParent_Name: form.personal?.parentName || '',
    asParent_Occupation: form.personal?.parentOccupation || '',
    asOther_Occupation: form.personal?.otherOccupation || '',
    asAddress: form.personal?.address || '',
    asCity: form.personal?.city || '',
    asState: form.personal?.state || '',
    asPincode: form.personal?.pin || '',
    asResidence_Phone_Number: form.family?.residencePhoneNumber || '9224286937',
    asMobile_Number: form.personal?.motherNumber || '',
    asMobile_Number2: form.personal?.fatherNumber || '',
    asOffice_Number: form.family?.officePhoneNumber || '9270362059',
    asNeighbour_Number: form.family?.neighbourPhoneNumber || '',
    asUpdated_By_Id: teacherId,
    asUpdate_Date: getCurrentDate() || '2024-12-10',
    asDOB: formatDOB(form.personal?.dateOfBirth) || '2011-03-29',
    asBirth_Place: form.personal?.placeOfBirth || '',
    asNationality: form.personal?.nationality || '',
    asSex: form.personal?.gender || '',
    asSalutation_Id: form.personal?.gender === 'F' ? '6' : '5',
    asCategory_Id: form.personal?.category || '',
    asCasteAndSubCaste: form.personal?.casteAndSubCaste || '',
    asAdmission_Date: formatDOB(form.admission?.admissionDate) || '',
    asJoining_Date: formatDOB(form.admission?.joiningDate) || '',
    asDateOfBirthInText:
      dateToText(form.personal?.dateOfBirth) ||
      'Twenty Lol One March Two Thousand Eleven',
    asOptional_Subject_Id: '0', // Missing
    asMother_Tongue: form.personal?.motherTongue || '',
    asLastSchoolName: form.additional?.lastSchoolName || '',
    asLastSchoolAddress: form.additional?.lastSchoolAddress || '',
    asLastCompletedStd: form.additional?.standard || '',
    asLastSchoolUDISENo: form.additional?.schoolUDISENo || '',
    asLastCompletedBoard: form.additional?.schoolBoardName || '',
    asIsRecognisedBoard:
      form.additional?.isRecognised === 'Yes' ? 'True' : 'False',
    asAadharCardNo: form.personal?.aadharCardNumber || '',
    asNameOnAadharCard: form.personal?.nameOnAadharCard || '',
    asAadharCard_Photo_Copy_Path: form.personal?.aadharCardScanCopy || '',
    asFamily_Photo_Copy_Path: form.family?.familyPhoto || '',
    asUDISENumber: form.admission?.UDISENumber || '',
    asBoardRegistrationNo: form.admission?.boardRegistrationNumber || '',
    asIsRiseAndShine:
      form.admission?.isRiseAndShine === false ? 'False' : 'True',
    asAdmissionSectionId: '0', //Only for SVP or SVNP
    asGRNumber: '', //Not Found on Screen or only for JOS school
    asStudentUniqueNo: '', //Not Found on Screen
    asSaralNo: form.admission?.saralNo || '',
    asIsOnlyChild: form.admission?.isOnlyChild === false ? 'False' : 'True',
    asMinority: form.admission?.isMinority === false ? 'False' : 'True',
    asRoll_No: form.admission?.studentRollNumber || '',
    asRule_Id: form.admission?.applicableRules || '',
    asIsStaffKid: form.admission?.isStaffKid === false ? false : true,
    asHeight: 0, //Not Found on Screen
    asWeight: 0, //Not Found on Screen
    asUpdated_By_id: Number(teacherId),
    asRTECategoryId: Number(form.admission?.rteCategory) || 0,
    asSecondLanguageSubjectId: form.admission?.secondlanguage || '',
    asThirdLanguageSubjectId: form.admission?.thirdlanguage || '',
    asIsForDayBoarding:
      form.admission?.isForDayBoarding === false ? false : true,
    asFeeCategoryDetailsId: '0', // ❌This is the cause of problem
    asRTEApplicationFormNo: form.admission?.rteApplicationForm || '',
    asAnnualIncome: 0, //Not Found on Screen
    asStandard_Id: standardId, // Missing
    asDivision_Id: DivisionId, // Missing
    asReligion: form.personal?.religion || '',
    asYearWise_Student_Id: YearWise_Student_Id,
    asParentUserId: 0
  };

  const AddStudentAdditionalDetailsBody: IAddStudentAdditionalDetailsBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId')),
    asAdmissionAcadmicYear: form.additional?.admissionAcademicYear || '',
    asAdmissionStandard: form.additional?.admissionStandard || '',
    asCurrentAcademicYear: form.additional?.currentAcademicYear || '',
    asCurrentStandard: form.additional?.currentStandard || '',
    asIsHandicapped: form.admission?.isHandicapped || false,
    asPreviousMarksObtained: form.additional?.previousMarksObtained || '',
    asPreviousMarksOutOff: form.additional?.previousMarksOutOf || '',
    asPreviousYearOfPassing: form.additional?.previousYearOfPassing || '',
    asSubjectNames: form.additional?.subjectNames || '',
    asSchoolwiseStudentId: 3556,
    asUserid: 4463,
    asReligion: form.personal?.religion || '',
    asBirthTaluka: form.personal?.birthTaluka || '',
    asBirthDistrict: form.personal?.birthDistrict || '',
    asHouseNoPlotNo: form.additional?.houseNumber || '',
    asMainArea: form.additional?.mainArea || '',
    asSubareaName: form.additional?.subareaName || '',
    asLandmark: form.additional?.landmark || '',
    asTaluka: form.additional?.taluka || '',
    asDistrict: form.additional?.district || '',
    asFeeAreaName: Number(form.admission?.feeAreaNames) || 0,
    asFatherOccupation: familyDetailsData?.fatherOccupation || '',
    asFatherQualification: form.family?.fatherQualification || '',
    asFatherEmail: form.family?.fatherEmail || '',
    asFatherOfficeName: form.family?.fatherOfficeName || '',
    asFatherOfficeAddress: form.family?.fatherOfficeAddress || '',
    asMotherOccupation: form.family?.motherOccupation || '',
    asMotherQualification: form.family?.motherQualification || '',
    asMotherEmail: form.family?.motherEmail || '',
    asMotherOfficeName: form.family?.motherOfficeName || '',
    asMotherOfficeAddress: form.family?.motherOfficeAddress || '',
    asFatherDOB: formatDOB(form.family?.fatherDOB) || '',
    asMotherDOB: formatDOB(form.family?.motherDOB) || '',
    asFatherDesignation: form.family?.fatherDesignation || '',
    asMotherDesignation: form.family?.motherDesignation || '',
    asFatherPhoto: form.family?.fatherPhoto || '',
    asMotherPhoto: form.family?.motherPhoto || '',
    asAnniversaryDate: form.family?.marriageAnniversaryDate || '',
    asLocalGuardianPhoto: form.family?.localGuardianPhoto || '',
    asRelativeName: form.family?.relativeFullName || '',
    asFatherBinaryPhoto: null, //Need to work on this
    asMotherBinaryPhoto: null,
    asRelativeBinaryPhoto: null,
    asFatherWeight: form.family?.fatherWeight || 0,
    asMotherWeight: form.family?.motherWeight || 0,
    asFatherHeight: form.family?.fatherHeight || 0,
    asMotherHeight: form.family?.motherHeight || 0,
    asFatherAadharcardNo: form.family?.fatherAadharCard || '',
    asMotherAadharcardNo: form.family?.motherAadharCard || '',
    asFatherBloodGroup: form.family?.fatherBloodGroup || '',
    asMotherBloodGroup: form.family?.motherBloodGroup || '',
    asFamilyMonthlyIncome: form.family?.familyMonthlyIncome || 0.0,
    asCWSN: form.family?.cwsn || '',
    asFatherAnnualIncome: form.family?.fatherAnnualIncome || 0.0,
    asMotherAnnualIncome: form.family?.motherAnnualIncome || 0.0,
    asBirthState: form.personal?.birthState || '',
    asName1: form.family?.name1 || '',
    asAge1: form.family?.age1 || 0,
    asInstitute1: form.family?.institution1 || '',
    asStandard1: form.family?.standard1 || '',
    asName2: form.family?.name2 || '',
    asAge2: form.family?.age2 || 0,
    asInstitute2: form.family?.institution2 || '',
    asStandard2: form.family?.standard2 || '',
    asResidenceType: Number(form.admission?.residenceTypes) || 0,
    asRFID: form.admission?.RFID || ''
  };

  const UpdateStudentStreamwiseSubjectDetailsBody: IUpdateStudentStreamwiseSubjectDetailsBody =
    {
      asSchoolId: 122,
      asStudentId: 4584,
      asStreamId: Number(form.streamwiseSubject?.streamId) || 0,
      GroupId: Number(form.streamwiseSubject?.groupId) || 0,
      CompulsorySubject: form.streamwiseSubject?.compulsorySubjects || '',
      chkCompitativeExams: form.streamwiseSubject?.competitiveExams || '0',
      OptSubjectOne: Number(form.streamwiseSubject?.optionalSubject1) || 0,
      OptSubjectTwo: Number(form.streamwiseSubject?.optionalSubject2) || 0
    };

  const transportFeeBody: IGenerateTransportFeeEntriesBody = {
    asSchoolId: Number(schoolId),
    asAcademicYearId: Number(academicYearId),
    asStudentId: Number(SchoolWise_Student_Id),
    asUpdatedById: Number(teacherId)
  };

  const executeApiCalls = async (
    updateStudentBody,
    additionalDetailsBody,
    streamwiseSubjectDetailsBody,
    transportFeeBody
  ) => {
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
        console.log(
          'Updating streamwise subject details:',
          streamwiseSubjectDetailsBody
        );
        await dispatch(
          CDAUpdateStudentStreamwiseSubjectDetails(streamwiseSubjectDetailsBody)
        );
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
        transportFeeBody
      );

      // Success message or further actions
      console.log(
        '✅ Form submitted successfully with all API calls completed!'
      );
    } catch (error) {
      console.error('🚨 Error during form submission or API calls:', error);
    }
  };

  useEffect(() => {
    const UpdateStudentTrackingDetailsBody: IUpdateStudentTrackingDetailsBody =
      {
        asSchoolId: Number(schoolId),
        asStudentId: SchoolWise_Student_Id,
        asInsertedById: Number(teacherId),
        asID: (UpdateStudentResult as any).iReturnValue, // Accessing iReturnValue here
        asAcademicYearId: Number(academicYearId)
      };
    //dispatch(CDAUpdateStudentTrackingDetails(UpdateStudentTrackingDetailsBody));
  }, [UpdateStudentResult]);

  //#region EventHandlers
  const handleAdmissionChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      admission: {
        ...prevForm.admission,
        [name]: value
      }
    }));
  };

  // Updating a property in personal
  const handlePersonalChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      personal: {
        ...prevForm.personal,
        [name]: value
      }
    }));
  };

  // Updating a property in family
  const handleFamilyChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      family: {
        ...prevForm.family,
        [name]: value
      }
    }));
  };

  // Updating a property in additional
  const handleAdditionalChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      additional: {
        ...prevForm.additional,
        [name]: value
      }
    }));
  };

  // Updating a property in additional
  const handleStreamwiseSubjectChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      streamwiseSubject: {
        ...prevForm.streamwiseSubject,
        [name]: value
      }
    }));
  };
  ///#endregion

  // const handleUpdate = () => {
  //   console.log('Sending update with data:', UpdateStudentBody);

  //   dispatch(CDAUpdateStudent(UpdateStudentBody));
  //   //❌SHUTING DOWN API CALLS TEMPORARILY
  //   dispatch(CDAAddStudentAdditionalDetails(AddStudentAdditionalDetailsBody));
  //   dispatch(CDAUpdateStudentStreamwiseSubjectDetails(UpdateStudentStreamwiseSubjectDetailsBody));

  //   dispatch(CDAGenerateTransportFeeEntries({ asSchoolId: Number(schoolId), asAcademicYearId: Number(academicYearId), asStudentId: Number(SchoolWise_Student_Id), asUpdatedById: Number(teacherId) }));
  // };

  //#region AddNotePopup
  const [achievementId, setAchievementId] = useState(0);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState('');
  const [base64URL2, setbase64URL2] = useState('');
  const [FileExtention, setFileExtention] = useState('');
  const [achievementDate, setAchievementDate] = useState('');
  const { showAlert, closeAlert } = useContext(AlertContext);
  const MaxAchievementfileSize = 1048576;

  const GetStudentNameForAchievementControl = useSelector(
    (state: RootState) =>
      state.GetStandardwiseMinMaxDOB.ISGetStudentNameForAchievementControl
  );
  //console.log('1️⃣AddNotePopup', GetStudentNameForAchievementControl);
  const GetStudentsAllAchievementList = useSelector(
    (state: RootState) =>
      state.GetStandardwiseMinMaxDOB.ISGetStudentsAllAchievementList
  );
  //console.log('2️⃣AchivementList', GetStudentsAllAchievementList);
  const GetStudentAchievementDetailsEdit = useSelector(
    (state: RootState) =>
      state.GetStandardwiseMinMaxDOB.ISGetStudentAchievementDetailsEdit
  );
  //console.log('3️⃣AchivementEdit', GetStudentAchievementDetailsEdit);
  const SaveStudentAchievementDetailsMsg = useSelector(
    (state: RootState) =>
      state.GetStandardwiseMinMaxDOB.ISSaveStudentAchievementDetailsMsg
  );
  //console.log('4️⃣SaveAchivement', SaveStudentAchievementDetailsMsg);
  const DeleteStudentAchievementDetailsMsg = useSelector(
    (state: RootState) =>
      state.GetStandardwiseMinMaxDOB.ISDeleteStudentAchievementDetailsMsg
  );
  //console.log('5️⃣DeleteAchivement', DeleteStudentAchievementDetailsMsg);

  const GetStudentsAllAchievementDetailsBody: IGetStudentsAllAchievementDetailsBody =
    {
      asSchoolId: Number(schoolId),
      asStudentId: SchoolWise_Student_Id
    };

  const handleOpenDialog = () => {
    //setIsConfirm('');
    //setShowRecipients(isRecipients);
    const GetStudentNameForAchievementControlBody: IGetStudentNameForAchievementControlBody =
      {
        asSchoolId: 18,
        asStudentId: 3556
      };
    dispatch(
      CDAGetStudentNameForAchievementControl(
        GetStudentNameForAchievementControlBody
      )
    );

    dispatch(
      CDAGetStudentsAllAchievementList(GetStudentsAllAchievementDetailsBody)
    );
    setOpenDialog(true);
  };

  useEffect(() => {
    return () => {
      resetFields();
    };
  }, []);

  useEffect(() => {
    if (
      GetStudentNameForAchievementControl &&
      GetStudentNameForAchievementControl.length > 0
    ) {
      const StNameRegNo = GetStudentNameForAchievementControl[0];
      setRegistrationNumber(StNameRegNo.RegistrationNo);
      setStudentName(StNameRegNo.StudentName);
    }
  }, [GetStudentNameForAchievementControl]);

  useEffect(() => {
    if (
      GetStudentAchievementDetailsEdit &&
      GetStudentAchievementDetailsEdit.length > 0
    ) {
      const EditAchievementDetails = GetStudentAchievementDetailsEdit[0];
      if (EditAchievementDetails) {
        setDescription(EditAchievementDetails.Description || '');
        setAttachment(EditAchievementDetails.Attachment || '');
        setAchievementDate(EditAchievementDetails.AchievementDate || '');
      }
    }
  }, [GetStudentAchievementDetailsEdit]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationNumber(value);
  };

  const handleDateChange = (name: string) => (date: Date | null) => {
    const formattedDate = date
      ? moment(date).format('DD-MM-YYYY HH:mm:ss') // Format the date
      : ''; // Use an empty string if the date is null

    //onChange(name, formattedDate); // Pass the formatted date to parent
    setAchievementDate(formattedDate);
  };

  const handleFileUpload = (file) => {
    console.log('File being uploaded:', file);
    const fileSize = file.size || file.Value.length * 0.75; // Estimate size if necessary
    console.log('File size:', fileSize);
    setbase64URL2(file.Value);
    setFileExtention(file.FileExtension);

    //setAttachment(file.Name);
    if (
      file &&
      ValidFileTypes.includes(`${file.FileExtension}`) &&
      fileSize <= MaxAchievementfileSize
    ) {
      setAttachment(file.Name); // Update state with the file name
    } else {
      alert('Invalid file type or size!');
    }
  };

  const handleEdit = (Id: number) => {
    console.log(`Edit row ${Id}`);
    setAchievementId(Id);
    const GetStudentAchievementDetailsBody: IGetStudentAchievementDetailsBody =
      {
        asAchievementId: Id,
        asSchoolId: Number(schoolId),
        asStudentId: SchoolWise_Student_Id
      };
    dispatch(
      CDAEditGetStudentAchievementDetails(GetStudentAchievementDetailsBody)
    );
  };

  const SaveStudentAchievementDetailsBody: ISaveStudentAchievementDetailsBody =
    {
      asAchievementId: achievementId,
      asStudentId: SchoolWise_Student_Id,
      asAchievementDate: formatDOB(achievementDate) || '2024-07-20',
      asDescription: description || 'LolOne',
      asAttachment: attachment || 'Lol.png',
      asSchoolId: Number(schoolId),
      asAcademicYearId: academicYearId,
      asUpdatedById: Number(teacherId),
      asSaveFeature: 'StudentAchievement',
      asFolderName: 'PPSN Website',
      asBase64String:
        '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'
    };

  const handleAchievemanetSave = () => {
    if (!description || !attachment || !achievementDate) {
      alert('Please fill in the required fields before saving.');
      return;
    }

    console.log('➖4️⃣CDA SAVECLICK', SaveStudentAchievementDetailsBody);
    dispatch(
      CDASaveStudentAchievementDetailsMsg(SaveStudentAchievementDetailsBody)
    );
    setAchievementId(0);
  };

  useEffect(() => {
    if (SaveStudentAchievementDetailsMsg !== '') {
      toast.success(SaveStudentAchievementDetailsMsg);
      //setForm((prevForm) => ({ ...prevForm, familyPhoto: '', }));              // delete photo
      dispatch(CDAResetSaveStudentAchievementDetailsMsg());
      resetFields();
      dispatch(
        CDAGetStudentsAllAchievementList(GetStudentsAllAchievementDetailsBody)
      );
    }
  }, [SaveStudentAchievementDetailsMsg]);

  let url =
    localStorage.getItem('SiteURL') +
    'RITeSchool/DOWNLOADS/StudentAchievement/';
  //const base64Image = `data:image/${FileExtention};base64,${base64URL2}`;

  const viewFile = () => {
    if (attachment !== '') {
      const fullImageUrl = `${url}${attachment}`;
      window.open(fullImageUrl, '_blank');

      //window.open(base64Image, '_blank');
    }
  };

  const handleDelete = (Id: number) => {
    console.log(`Delete row ${Id}`);
    const DeleteStudentAchievementDetailsBody: IDeleteStudentAchievementDetailsBody =
      {
        asSchoolId: Number(schoolId),
        asStudentId: SchoolWise_Student_Id,
        asAchievementId: Id,
        asUpdatedById: Number(teacherId)
      };
    showAlert({
      title: 'Please Confirm',
      message: 'Are you sure you want to delete this record?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(
          CDADeleteStudentAchievementDetailsMsg(
            DeleteStudentAchievementDetailsBody
          )
        );
        closeAlert();
      }
    });
  };

  useEffect(() => {
    if (DeleteStudentAchievementDetailsMsg !== '') {
      toast.success('Document deleted successfully.');
      dispatch(CDAResetDeleteStudentAchievementDetailsMsg());
      dispatch(
        CDAGetStudentsAllAchievementList(GetStudentsAllAchievementDetailsBody)
      );
    }
  }, [DeleteStudentAchievementDetailsMsg]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetFields();
    //setIsConfirm('true');
  };
  const resetFields = () => {
    setAttachment('');
    setDescription('');
    setAchievementDate('');
    setAchievementId(0);
  };
  //#endregion
  //#endregion
  //#region SiblingPopup
  const GetStudentsSiblingDetail = useSelector(
    (state: RootState) =>
      state.GetStandardwiseMinMaxDOB.IGetStudentsSiblingDetail
  );
  console.log('1️⃣SiblingPopup', GetStudentsSiblingDetail);

  const handleOpenDialog1 = () => {
    setOpenDialog1(true);
    const GetStudentsSiblingDetailBody: IGetStudentsSiblingDetailBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId'))
    };
    dispatch(CDAGetStudentsSiblingDetail(GetStudentsSiblingDetailBody));
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
  const handleNavigation = () => {
    navigate('/extended-sidebar/Teacher/EnterStudentSiblingDetails');
  };
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
                onClick={handleNavigation}
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
                onClick={() => handleOpenDialog()}
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
      <Box sx={{ backgroundColor: 'white', p: 1, mb: 1 }}>
        <StudentProfileHeader />
      </Box>
      <Box sx={{ backgroundColor: 'white', p: 2, mb: 1 }}>
        {validationMessages.length > 0 && (
          <Box pt={1}>
            {validationMessages.map((message, index) => (
              <Typography key={index} variant="h5" style={{ color: 'red' }}>
                {message}
              </Typography>
            ))}
          </Box>
        )}
        {/* Profile Completion Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            my: 1,
            backgroundColor: 'white',
            p: 1
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
              <AdmissionDetails
                admission={form.admission}
                onChange={handleAdmissionChange}
              />
            </Grid>
          </Grid>
        )}
        {currentTab === 1 && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <PersonalDetails
                personal={form.personal}
                onChange={handlePersonalChange}
              />
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
              <AddmissionDocumentInformation />
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
              <FamilyDetails
                family={form.family}
                onChange={handleFamilyChange}
                onTabChange={onFamilyTab}
              />
            </Grid>
          </Grid>
        )}
        {currentTab === 4 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
            <Grid item xs={12}>
              <AdditionalDetails
                additional={form.additional}
                onChange={handleAdditionalChange}
                onTabChange={onAdditionalInfoTab}
              />
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
              <StudentSubjectDetails
                streamwiseSubject={form.streamwiseSubject}
                onChange={handleStreamwiseSubjectChange}
                onTabChange={onStudentStreamwiseSubjectTab}
              />
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
                  name="registrationNumber"
                  label="Registration Number"
                  value={registrationNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="StudentName"
                  label="Student Name"
                  value={studentName}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Datepicker
                  DateValue={getCurrentDate()} //formatDOB(achievementDate)
                  onDateChange={handleDateChange('achievementDate')}
                  // label={'Start Date'}
                  size={'medium'}
                  label={'Attachment Date'}
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
                    FileName={attachment}
                    ChangeFile={handleFileUpload}
                    FileLabel={'Attachment'}
                    isMandatory={false}
                    height={'52px'}
                    width="100%"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <>
                  <Tooltip title={'View'}>
                    <IconButton
                      onClick={viewFile}
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
                  value={description || ''}
                  onChange={(e) => setDescription(e.target.value)}
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
                data={GetStudentsAllAchievementList}
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
              onClick={handleAchievemanetSave}
              sx={{
                color: 'green',
                '&:hover': {
                  color: 'green',
                  backgroundColor: green[100]
                }
              }}
              disabled={!description || !attachment}
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
              <b>Note : </b>If you click on save button selected Sibling Details
              will be replaced to the following sibling(s) :
              <b> Master Aadvik Prashant Dalavi</b>
            </Card>
            <Box>
              <CheckboxList itemList={GetStudentsSiblingDetail} />
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
