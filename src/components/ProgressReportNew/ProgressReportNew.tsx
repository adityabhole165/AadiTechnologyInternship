import QuestionMark from '@mui/icons-material/QuestionMark';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { XMLParser } from "fast-xml-parser";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IGetStudentPrrogressReportBody,
  IViewBody
} from 'src/interfaces/FinalResult/IFinalResultGenerateAll';
import { GetIsPrePrimaryBody, GetSchoolSettingsBody, IGetAcademicYearsOfStudentBody, IGetAllMarksGradeConfigurationBody, IGetAllStudentsProgressSheetBody, IGetClassTeachersBody, IgetIsFinalResultPublishedBody, IgetIsTermExamPublishedBody, IGetLatestExamIdBody, IGetOldStudentDetailsBody, IGetPassedAcademicYearsBody, IGetPrePrimaryExamPublishStatusBody, IGetSchoolSettingValuesBody, IGetStudentNameDropdownBody, IGetTeachersForPrePrimaryProgressReportBody, IIsXseedApplicableBody, IsGradingStandarBody, IsTestPublishedForStdDivBody, IsTestPublishedForStudentBody, IStudentProgressReportBody } from "src/interfaces/ProgressReport/IprogressReport";
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import Card5 from 'src/libraries/mainCard/Card5';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { StudentDetailsGA, ViewResultGA } from 'src/requests/FinalResult/RequestFinalResultGenerateAll';
import AllStudents from 'src/requests/ProgressReport/AllStudent';
import { DataParserAndFormatter } from 'src/requests/ProgressReport/PotoType';
import { CDAGetAcademicYearsOfStudent, CDAGetAllMarksGradeConfiguration, CDAGetClassTeachers, CDAgetIsFinalResultPublished, CDAGetIsPrePrimary, CDAgetIsTermExamPublished, CDAGetLatestExamId, CDAGetLatestExamId1, CDAgetOldstudentDetails, CDAGetPassedAcademicYears, CDAGetPrePrimaryExamPublishStatus, CDAGetProgressReport, CDAGetSchoolSettings, CDAGetStudentName, CDAGetTeachersForPrePrimaryProgressReport, CDAIsGradingStandard, CDAIsTestPublishedForStdDiv, CDAIsTestPublishedForStudent, CDAIsXseedApplicable, CDAStudentProgressReport, GetAllStudentsProgressSheet, GetSchoolSettingValues, resetProgressReportFileName } from 'src/requests/ProgressReport/ReqProgressReport';
import { RootState } from 'src/store';
import { getSchoolConfigurations, SchoolScreensAccessPermission } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import FinalResultTable from './FinalResultTable';
import GradeConfigurationDetails from './GradeConfigurationDetails';
import ProgressReportGradeView from './ProgressReportGradeView';
import ProgressReportMarkView from './ProgressReportMarkView';
import Studentdetails from './Studentdetails';
import { useLocation } from 'react-router-dom';
import {useParams } from 'react-router';
const ProgressReportNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    let { AcademicYearTopper,StudentidTopper,TeacherIdTopper} = useParams();


  const location = useLocation();
    const { state } = location;
    
    

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const TeacherIdsession = sessionStorage.getItem('TeacherId');

  const asUserId = Number(sessionStorage.getItem('Id'));
 
  
  const initialStudentId1 = state && state.newstudntid !== undefined  ? state.newstudntid :StudentidTopper ? StudentidTopper :0 ;

  const initialStudentId = state?.newstudntid ?? StudentidTopper ?? 0;
  const initialcademicYearId = state?.AcademicYear ?? AcademicYearTopper ?? asAcademicYearId;
  console.log(initialStudentId,initialcademicYearId,"oo");
  
  const initialcademicYearId1 = state && state.AcademicYear !== undefined  ? state.AcademicYear : AcademicYearTopper ? AcademicYearTopper :asAcademicYearId;
  const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));


  const userLoginId = sessionStorage.getItem("Userlogin")
  const [Error, SetError] = useState('');
  const [StudentId, SetStudentId] = useState(initialStudentId);
  const [AcademicYear, SetAcademicYear] = useState(initialcademicYearId);
  const Newvalue = state && state.Newvalue !== undefined  ? state.Newvalue : false ; 
  const [open, setOpen] = useState( Newvalue);
  const [open1, setOpen1] = useState(false);
  console.log("--",StudentId,AcademicYear);
 
  const [AllowProgressReportDownloadAtStudentLogin, setAllowProgressReportDownloadAtStudentLogin] = useState("")
  const [ShowProgressReportGraphOnMobileApp, setShowProgressReportGraphOnMobileApp] = useState("")
  const [ShowTotalAsPerOutOfMarks, setShowTotalAsPerOutOfMarks] = useState("");
  const [IsTotalConsiderForProgressReport, setIsTotalConsiderForProgressReport] = useState("");
  const [BlockProgressReportIfFeesArePending, setBlockProgressReportIfFeesArePending] = useState("")
  const [ShowProgressSheetNote, setShowProgressSheetNote] = useState("")
  const [ProgressSheetNote, setProgressSheetNote] = useState("")

  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );



  let CanEdit = getSchoolConfigurations(79)

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission?.map((item) => {
      if (item.ScreenName === 'Progress Report') perm = item.IsFullAccess;
    });
    return perm;
  };



  const initialTeacherId = state && state.TeacherID !== undefined  ? state.TeacherID : CanEdit == 'N' ? TeacherIdsession : '';


  const [selectTeacher, SetselectTeacher] = useState(CanEdit == 'N' ? TeacherIdsession : '');



  const USlistTestDetailsArr: any = useSelector(
    (state: RootState) => state.ProgressReportNew.ISlistTestDetailsArr
  );
  const USlistTestDetailsArr1: any = useSelector(
    (state: RootState) => state.ProgressReportNew.ISlistTestDetailsArr1
  );
  const USGetClassTeachers: any = useSelector(
    (state: RootState) => state.ProgressReportNew.ISGetClassTeachers
  );

  const USGetStudentNameDropdown: any = useSelector(
    (state: RootState) => state.ProgressReportNew.ISGetStudentNameDropdown
  );

  const USStudentProgressReport: any = useSelector(
    (state: RootState) => state.ProgressReportNew.ISStudentProgressReport
  );
  const AllStudentsProgressSheet: any = useSelector(
    (state: RootState) => state.ProgressReportNew.AllStudentsProgressSheet
  );
  //  Helper function to parse XML data with array normalization
  const parser = new XMLParser();
  const [parsedDataList, setParsedDataList] = useState([]);
  // Helper function to ensure array format
  const ensureArray = (data) => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  };
  const parseXMLData = (xmlString, path) => {
    if (!xmlString) return [];
    const parsed = parser.parse(xmlString);
    return ensureArray(path.split('.').reduce((obj, key) => obj?.[key], parsed));
  };
  useEffect(() => {
    if (AllStudentsProgressSheet !== null) {
      // const parser = new XMLParser();
      // const jsonData = parser.parse(AllStudentsProgressSheet.listStudentsMarksDetiles[0].Tests);
      const parsedData = AllStudentsProgressSheet.listStudentsMarksDetiles
        ?.map((item) => ({
          Student_id: item.Student_id,
          Header: parseXMLData(item.Header, 'NewDataSet.Table'),
          Marks: parseXMLData(item.Marks, 'NewDataSet.Table3'),
          Result: parseXMLData(item.Result, 'NewDataSet.Table4'),
          SubjectTestType: parseXMLData(item.SubjectTestType, 'NewDataSet.Table7'),
          SubjectTestTypeGroupTotal: parseXMLData(item.SubjectTestTypeGroupTotal, 'NewDataSet.Table6'),
          SubjectgroupTotal: parseXMLData(item.SubjectgroupTotal, 'NewDataSet.Table5'),
          Subjects: parseXMLData(item.Subjects, 'NewDataSet.Table1'),
          TestTypes: parseXMLData(item.TestTypes, 'NewDataSet.Table8'),
          Tests: parseXMLData(item.Tests, 'NewDataSet.Table2'),
          grades: parseXMLData(item.grades, 'NewDataSet.Table9'),
        }));
      let finalFormat: any = parsedData?.map(item => DataParserAndFormatter(item, AllStudentsProgressSheet.listDisplaynameDetiles))
      setParsedDataList(finalFormat);
     

    }
  }, [AllStudentsProgressSheet])

  const USGetPassedAcademicYears: any = useSelector((state: RootState) => state.ProgressReportNew.ISGetPassedAcademicYears);
  const ThirdHeaderColumn: any = useSelector((state: RootState) => state.ProgressReportNew.ISThirdHeaderColumn);
  const USlistStudentsDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistStudentsDetails);
  const USlistSubjectsDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistSubjectsDetails);
  const EntireDataList: any = useSelector((state: RootState) => state.ProgressReportNew.ISEntireDataList);
  const USlistTestDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistTestDetails);
  const USlistSubjectIdDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistSubjectIdDetails);
  const USListSchoolWiseTestNameDetail: any = useSelector((state: RootState) => state.ProgressReportNew.ISListSchoolWiseTestNameDetail);
  const USListSubjectidDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListSubjectidDetails);
  const USListTestTypeIdDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListTestTypeIdDetails);
  const USListMarkssDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListMarkssDetails);
  const ListDisplayNameDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListDisplayNameDetails);
  const USGetAllMarksGradeConfiguration = useSelector((state: RootState) => state.ProgressReportNew.ISGetAllMarksGradeConfiguration);
  const USGetAllMarksGradeConfiguration1 = useSelector((state: RootState) => state.ProgressReportNew.ISGetAllMarksGradeConfiguration1);
  const Data = USGetAllMarksGradeConfiguration.filter((item) => item.Standard_Id != "")
  const Data1 = USGetAllMarksGradeConfiguration1.filter((item) => item.Standard_Id != "")
  const Data3 = USlistSubjectIdDetails.filter((item) => item.SchoolWise_Test_Name !== "Total")
  const legendText = 'Legend : * Subject marks not considered in total marks';
  const formattedText = legendText.replace('*', '<span style="color: red;">*</span>');
  const USIsGradingStandard: any = useSelector((state: RootState) => state.ProgressReportNew.IsGradingStandarBodyIS);
  const USIsTestPublishedForStdDiv: any = useSelector((state: RootState) => state.ProgressReportNew.IsTestPublishedForStdDivBodyIS);
  const USIsTestPublishedForStudentIS: any = useSelector((state: RootState) => state.ProgressReportNew.RIsTestPublishedForStudentIS);
  const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);
  const hasTotalConsiderationN = USlistSubjectsDetails.some(subject => subject.Total_Consideration === "N");
  // const [IsTotalConsiderForProgressReport, setIsTotalConsiderForProgressReport] = useState('');
  const MarkDetailsList: any = useSelector((state: RootState) => state.ProgressReportNew.MarkDetailsList);
  const HeaderArray: any = useSelector((state: RootState) => state.ProgressReportNew.HeaderArray);
  const SubHeaderArray: any = useSelector((state: RootState) => state.ProgressReportNew.SubHeaderArray);
  const Loading: any = useSelector((state: RootState) => state.ProgressReportNew.Loading);

  const MarkDetailsList1: any = useSelector((state: RootState) => state.ProgressReportNew.MarkDetailsList1);
  const HeaderArray1: any = useSelector((state: RootState) => state.ProgressReportNew.HeaderArray1);
  const SubHeaderArray1: any = useSelector((state: RootState) => state.ProgressReportNew.SubHeaderArray1);

  const ShowOnlyGrades = EntireDataList?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true';
  const UsAcademicYearsOfStudent: any = useSelector((state: RootState) => state.ProgressReportNew.IsAcademicYearsOfStudent);
  const GetOldStudentDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISGetOldStudentDetails);

  const SchoolSettingValues: any = useSelector((state: RootState) => state.ProgressReportNew.SchoolSettingValues);
  const academictermsResult = useSelector((state: RootState) => state.ProgressReportNew.GetTerms);
  const IsPrePrimary = useSelector((state: RootState) => state.ProgressReportNew.IsPrePrimary);
  const PrePrimaryExamPublishStatus: any = useSelector((state: RootState) => state.ProgressReportNew.ISPrePrimaryExamPublishStatus);
  const ISPrePrimaryExamPublishStatus = useSelector((state: RootState) => state.ProgressReportNew.ISPrePrimaryExamPublishStatus);
  const getIsTermExamPublished = useSelector((state: RootState) => state.ProgressReportNew.ISgetIsTermExamPublished);

  const getIsFinalResultPublished = useSelector((state: RootState) => state.ProgressReportNew.ISgetIsFinalResultPublished);
  
  const USGetTeachersForPrePrimaryProgressReportBody = useSelector((state: RootState) => state.ProgressReportNew.ISGetTeachersForPrePrimaryProgressReport);

  const progressReportFilePath: any = useSelector((state: RootState) => state.ProgressReportNew.ProgressReportDownload);

  const LatestExamId: any = useSelector((state: RootState) => state.ProgressReportNew.ISLatestExamId);
  const LatestExamId1: any = useSelector((state: RootState) => state.ProgressReportNew.ISLatestExamId1);
  const USIsXseedApplicable: any = useSelector((state: RootState) => state.ProgressReportNew.IsXseedApplicable);
  const USErrorMessage: any = useSelector((state: RootState) => state.ProgressReportNew.ISErrorMessage);


  // useEffect(() => {
  //   if (UsGetSchoolSettings != null)
  //     setIsTotalConsiderForProgressReport(UsGetSchoolSettings?.GetSchoolSettingsResult?.IsTotalConsiderForProgressReport);
  //   // setIsTotalConsiderForProgressReport('False');
  // }, [UsGetSchoolSettings])


  // Final result Data



  const SubjectDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getSubjectDetails);
  const ViewProgress = useSelector((state: RootState) => state.FinalResultGenerateAll.getViewResult);
  const MarkDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getMarkDetailsView);
  const SubjectDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getSubjectDetailsView);
  const GradesDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getGradesDetailsView);
  const showOnlyGrades = ViewProgress.some((item) => item.ShowOnlyGrades.trim() === 'true');
  const totalconsidration = SubjectDetailsView.filter((item) => item.Total_Consideration === "N")
  const ToppersCount = UsGetSchoolSettings?.GetSchoolSettingsResult?.ToppersCount
  const TotalPerGradeView = useSelector((state: RootState) => state.FinalResultGenerateAll.getTotalPerGradeView);
  const PercentageDetails = useSelector((state: RootState) => state.FinalResultGenerateAll.getPerDetails);
  const hasTopRanks = TotalPerGradeView?.some((item) =>
    [1, 2, 3].includes(item.rank)
  );



  const [IsTotalConsiderForProgressReport1, setIsTotalConsiderForProgressReport1] = useState('');
  useEffect(() => {
    if (UsGetSchoolSettings != null)
      setIsTotalConsiderForProgressReport1(UsGetSchoolSettings?.GetSchoolSettingsResult?.IsTotalConsiderForProgressReport);
  }, [UsGetSchoolSettings])




  // Fianl result data end here 


  let headerArray = [
    { Id: 1, Header: 'Percentage' },
    { Id: 2, Header: 'Grade Name' },
    { Id: 3, Header: 'Remarks' }

  ]
  const [totalCount, setTotalCount] = useState('0');
  useEffect(() => {
    if (UsGetSchoolSettings != null)
      setTotalCount(UsGetSchoolSettings?.GetSchoolSettingsResult?.ToppersCount.toString());
  }, [UsGetSchoolSettings])
  const [isFailCriteria, setIsFailCriteria] = useState('N');
  useEffect(() => {

    if (USlistStudentsDetails?.length > 0) {
      setIsFailCriteria(USlistStudentsDetails[0]?.IsFailCriteriaNotApplicable);
    }

  }, [USlistStudentsDetails])

  const [ShowTopppers, setShowTopppers] = useState(false);
  useEffect(() => {
    if (UsGetSchoolSettings != null)
      setShowTopppers(UsGetSchoolSettings?.GetSchoolSettingsResult?.ShowTopppers);


  }, [UsGetSchoolSettings])


  useEffect(() => {
    if (StudentidTopper != undefined)
      setOpen(true);


  }, [StudentidTopper])


  

  
  const [progressReportMessage, setProgressReportMessage] = useState(null);
  useEffect(() => {
    if (USlistStudentsDetails?.length > 0) {
      const message = USlistStudentsDetails.map((item, index) => (
        <b key={index}>
          Progress Report is not available for the student : {item.Roll_No} - {item.Student_Name}.
        </b>
      ));
      setProgressReportMessage(message);
    }
  }, [USlistStudentsDetails]);

  const FStudentName = () => {
    let classStudentName = '';
    UsAcademicYearsOfStudent.map((item) => {
      if (item.Value == AcademicYear) classStudentName = item.Name;
    });
    return classStudentName;
  };

  const GetClassTeacher = () => {
    let returnVal = false
    USlistStudentsDetails.map((item) => {
      if (item.Standard_Division_Id == selectTeacher) {
        returnVal = item.Standard_Id
      }
    })
    return returnVal
  };


  const StandardDivisionId = () => {
    let returnVal = 0
    USGetClassTeachers.map((item) => {
      if (item.Value == selectTeacher) {
        returnVal = item.Id
      }
    })
    return returnVal
  };

  useEffect(() => {
    if (progressReportFilePath != null) {

      const filePath = progressReportFilePath.FilePath.replace(/\\/g, '/');
      let downloadPathOfProgressReport = 'https://schoolwebsite.regulusit.net/' + filePath;
      window.open(downloadPathOfProgressReport);
      dispatch(resetProgressReportFileName())

    }
  }, [progressReportFilePath])


  const Standard_Id = () => {
    let returnVal = 0
    USGetClassTeachers.map((item) => {
      if (item.Value == selectTeacher) {
        returnVal = item.asStandardId
      }
    })
    return returnVal
  };

  const hasEmptyMarks = USlistSubjectIdDetails.some((item) => item.Marks_Scored === "");
  const hasGrade = USlistSubjectIdDetails.some((item) => item.Grade === "");

  const StudentName = () => {
    let classStudentName = '';
    USGetStudentNameDropdown.map((item) => {
      if (item.Value == StudentId) classStudentName = item.Name;
    });
    return classStudentName;
  };



  useEffect(() => {
    StandardDivisionId()
    Standard_Id()
  }, [selectTeacher]);

  const GetClassTeachersBody: IGetClassTeachersBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asTeacherId: Number(CanEdit == 'Y' ? 0 : TeacherIdsession)
  };

  const GetStudentNameDropdownBody: IGetStudentNameDropdownBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivisionId: StandardDivisionId()

  };
  const GetAllStudentsProgressSheetBody: IGetAllStudentsProgressSheetBody = {
    asSchoolId: Number(asSchoolId),
    asAcadmicYearId: Number(asAcademicYearId),
    asStdDivId: StandardDivisionId()
  }
  const StudentProgressReportBody: IStudentProgressReportBody = {
    asSchoolId: Number(asSchoolId),
    asAcadmeicYearId: Number(AcademicYear),
    asStudentId: GetOldStudentDetails.StudentId,
    asUserId: asUserId,
    IsTotalConsiderForProgressReport: IsTotalConsiderForProgressReport,

  };

  const GetPassedAcademicYearsBody: IGetPassedAcademicYearsBody = {
    asSchoolId: Number(asSchoolId),
    asStudent_Id: Number(StudentId),
    asIncludeCurrentYear: false


  };
  const GetSchoolSettings: GetSchoolSettingsBody = {
    asSchoolId: Number(asSchoolId),



  };


  const GetAllMarksGradeConfigurationBody1: IGetAllMarksGradeConfigurationBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYrId: Number(asAcademicYearId),
    asStandardId: Number(Standard_Id()),
    asIsCoCurricular: true
  };

  const IsGradingStandard: IsGradingStandarBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(AcademicYear),
    asStandardId: GetOldStudentDetails.StandardId

  };

  const IsTestPublishedForStdDiv: IsTestPublishedForStdDivBody = {
    asSchoolId: Number(asSchoolId),
    asAcadmicYearId: Number(AcademicYear),
    asStdDivId: GetOldStudentDetails.StandardDivisionId

  };

  const IsTestPublishedForStudent: IsTestPublishedForStudentBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(AcademicYear),
    asStandardDivId: GetOldStudentDetails.StandardDivisionId,
    asStudentId: GetOldStudentDetails.StudentId

  };

  const AcademicYearsOfStudentBody: IGetAcademicYearsOfStudentBody = {
    aiSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    aiStudentId: StudentId

  };

  const OldStudentDetailsBody: IGetOldStudentDetailsBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: AcademicYear,
    aiStudentId: StudentId
  }


  const GetSchoolSettingValuesBody: IGetSchoolSettingValuesBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: AcademicYear,
    asKey: "BlockProgressReportIfFeesArePending,ShowProgressSheetNote,ProgressSheetNote,AllowProgressReportDownloadAtStudentLogin,ShowTotalAsPerOutOfMarks,IsTotalConsiderForProgressReport,ShowProgressReportGraphOnMobileApp"

  }

  const IsPrePrimaryBody: GetIsPrePrimaryBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: AcademicYear,
    asStandardId: GetOldStudentDetails.StandardId
  }


  const GetPrePrimaryExamPublishStatus: IGetPrePrimaryExamPublishStatusBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: AcademicYear,
    aiYearwiseStudentId: GetOldStudentDetails.StudentId,
  }

  const getIsTermExamPublishedBody: IgetIsTermExamPublishedBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: AcademicYear,
    asStandardDivisionId: GetOldStudentDetails.StandardDivisionId,
  }

  const IsXseedApplicableBody: IIsXseedApplicableBody = {
    asSchoolId: Number(asSchoolId),
    asAcadmicYearId: Number(AcademicYear),
    asStandardDivisionId: GetOldStudentDetails.StandardDivisionId,
    asStandardId: GetOldStudentDetails.StandardId,

  }

  const getIsFinalResultPublishedBody: IgetIsFinalResultPublishedBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: AcademicYear,
    asStandardDivisionId: GetOldStudentDetails.StandardDivisionId,
  }

  const GetLatestExamIdBody: IGetLatestExamIdBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: AcademicYear,
    asStandardDivId: GetOldStudentDetails.StandardDivisionId,
    asStandardId: "0"
  }

  const GetLatestExamIdBody1: IGetLatestExamIdBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: AcademicYear,
    asStandardDivId: "0",
    asStandardId: GetOldStudentDetails.StandardId
  }
  useEffect(() => {
    dispatch(CDAGetLatestExamId(GetLatestExamIdBody));

  }, [AcademicYear, GetOldStudentDetails.StandardDivisionId]);
  useEffect(() => {
    dispatch(CDAIsXseedApplicable(IsXseedApplicableBody));

  }, [AcademicYear, GetOldStudentDetails.StandardDivisionId,GetOldStudentDetails.StandardId]);


  
  useEffect(() => {
    dispatch(CDAGetLatestExamId1(GetLatestExamIdBody1));

  }, [AcademicYear, GetOldStudentDetails.StandardId]);


  useEffect(() => {
    const GetViewResultBody: IViewBody = {
      asSchoolId: Number(asSchoolId),
      asAcademicYearId: Number(AcademicYear),
      asStudentId: Number(GetOldStudentDetails.StudentId),
      asWithGrace: 0,
    };
    dispatch(ViewResultGA(GetViewResultBody));
  }, [GetOldStudentDetails.StudentId, AcademicYear]);

  useEffect(() => {
    const GetStudentPrrogressReportBody: IGetStudentPrrogressReportBody = {
      asSchoolId: Number(asSchoolId),
      asAcadmeicYearId: Number(AcademicYear),
      asStudentId: Number(GetOldStudentDetails.StudentId),
      asUserId: Number(asUserId)
    };

    dispatch(StudentDetailsGA(GetStudentPrrogressReportBody, IsTotalConsiderForProgressReport, totalCount));
  }, [IsTotalConsiderForProgressReport, AcademicYear, GetOldStudentDetails.StudentId]);


  const downloadProgress = (termId) => {

    const getProgressReportBody: any = {
      aiSchoolId: asSchoolId,
      aiAcademicYearId: parseInt(`${AcademicYear}`),
      aiStudentId: GetOldStudentDetails.StudentId,
      aiLoginUserId: asUserId,
      aiTermId: termId,
      aiStandardId: GetOldStudentDetails.StandardId,
      aiStandardDivisionId: GetOldStudentDetails.StandardDivisionId
    };
    dispatch(CDAGetProgressReport(getProgressReportBody));
  };



  const GetAllMarksGradeConfigurationBody: IGetAllMarksGradeConfigurationBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYrId: Number(AcademicYear),
    asStandardId: GetOldStudentDetails.StandardId,
    asIsCoCurricular: false
  };


  const clickSelectClass = (value) => {
    setOpen(false);
    SetselectTeacher(value)
  };

  const AcademicRecords = (value) => {
    alert("Old Academic Records Page Not Devloped ")
  };

  const clickStudentList = (value) => {
    setOpen(false);
    SetStudentId(value);
  };


  const ClickAcademicYear = (value) => {
    setOpen(false);
    SetAcademicYear(value);
  };

  const ClickShow = (value) => {

    if(USIsXseedApplicable){
      let state1 = { GetOldStudentDetails, AcademicYear ,USIsXseedApplicable,Acadamicyearname,StudentId,selectTeacher};
      navigate('/extended-sidebar/Teacher/PreprimaryProgressReport1' , { state: state1 });
      return
     }

    if (selectTeacher === '0') {
      SetError('Class Teacher should be selected.');
      return;
    }
    setOpen(true);
    if (StudentId === '0') {
      dispatch(GetAllStudentsProgressSheet(GetAllStudentsProgressSheetBody));
    }
    SetError('')
  }



  useEffect(() => {
    dispatch(CDAIsGradingStandard(IsGradingStandard));

  }, [AcademicYear, GetOldStudentDetails.StandardId]);

  useEffect(() => {
    dispatch(CDAGetSchoolSettings(GetSchoolSettings));

  }, [asSchoolId, AcademicYear]);



  useEffect(() => {
    dispatch(CDAIsTestPublishedForStudent(IsTestPublishedForStudent));

  }, [GetOldStudentDetails.StandardDivisionId, GetOldStudentDetails.StudentId, AcademicYear]);

  useEffect(() => {
    dispatch(CDAIsTestPublishedForStdDiv(IsTestPublishedForStdDiv));

  }, [GetOldStudentDetails.StandardDivisionId, AcademicYear]);

  const GetTeachersForPrePrimaryProgressReportBody: IGetTeachersForPrePrimaryProgressReportBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(AcademicYear),
    asSchoolWise_Standard_Division_Id: GetOldStudentDetails.StandardDivisionId,
    
  };
  useEffect(() => {
    dispatch(CDAGetTeachersForPrePrimaryProgressReport(GetTeachersForPrePrimaryProgressReportBody));

  }, [GetOldStudentDetails.StandardDivisionId, AcademicYear]);


  // useEffect(() => {
  //   if (CanEdit == 'Y') {
  //     if (USGetClassTeachers.length > 0) {
  //       SetselectTeacher(USGetClassTeachers[0].Value);
  //     }
  //   }

  // }, [USGetClassTeachers]);


  // useEffect(() => {
  //   if(AcademicYearTopper !== undefined){
  //     SetAcademicYear(AcademicYearTopper)
  //   }
  
  //   }, [AcademicYearTopper]);
  //   useEffect(() => {
  //     if(StudentidTopper !== undefined){
  //       SetStudentId(StudentidTopper)
  //     }}, [StudentidTopper]);

  //     console.log(StudentidTopper,"StudentidTopper");
      
    
  useEffect(() => {
    if (USGetClassTeachers.length > 0) {
        if (state?.Newvalue) {
            SetselectTeacher(state.TeacherID); // Set the value from state
        } else if (CanEdit === 'Y') {
            SetselectTeacher(USGetClassTeachers[0].Value); // Set the first teacher if CanEdit is 'Y'
        } else if(TeacherIdTopper !== undefined){
          SetselectTeacher(TeacherIdTopper)
        }
    }
}, [USGetClassTeachers, state?.Newvalue, state?.TeacherID, CanEdit]);




  useEffect(() => {
    GetClassTeacher()

  }, []);

  useEffect(() => {
    dispatch(CDAGetClassTeachers(GetClassTeachersBody));

  }, []);

  useEffect(() => {
    dispatch(CDAGetStudentName(GetStudentNameDropdownBody));
  }, [selectTeacher, StandardDivisionId()]);

  // useEffect(() => {
  //   if (StudentId === '0') {
  //     dispatch(GetAllStudentsProgressSheet(GetAllStudentsProgressSheetBody));
  //   }
  //   // dispatch(CDAStudentProgressReport(StudentProgressReportBody, IsGradingStandard));
  // }, [selectTeacher]);
  useEffect(() => {
    if (StudentId !== '0') {
      dispatch(CDAStudentProgressReport(StudentProgressReportBody, IsGradingStandard, totalCount, isFailCriteria));
    }
  }, [IsTotalConsiderForProgressReport, AcademicYear, GetOldStudentDetails.StudentId,totalCount,isFailCriteria])
  // }, [AcademicYear, GetOldStudentDetails.StudentId, IsTotalConsiderForProgressReport]);

  useEffect(() => {
    dispatch(CDAGetPassedAcademicYears(GetPassedAcademicYearsBody));
  }, [StudentId]);

  useEffect(() => {
    dispatch(CDAGetAllMarksGradeConfiguration(GetAllMarksGradeConfigurationBody));
  }, [GetOldStudentDetails.StandardId, AcademicYear]);




  useEffect(() => {
    dispatch(CDAGetAcademicYearsOfStudent(AcademicYearsOfStudentBody));
  }, [StudentId]);


  useEffect(() => {
    dispatch(CDAgetOldstudentDetails(OldStudentDetailsBody));
  }, [StudentId, AcademicYear]);

  useEffect(() => {
    dispatch(GetSchoolSettingValues(GetSchoolSettingValuesBody));
  }, [AcademicYear]);

  useEffect(() => {
    dispatch(CDAGetIsPrePrimary(IsPrePrimaryBody));
  }, [AcademicYear, GetOldStudentDetails.StandardId]);

  useEffect(() => {
    dispatch(CDAGetPrePrimaryExamPublishStatus(GetPrePrimaryExamPublishStatus));
  }, [AcademicYear, GetOldStudentDetails.StudentId]);


  useEffect(() => {
    dispatch(CDAgetIsTermExamPublished(getIsTermExamPublishedBody));
  }, [AcademicYear, GetOldStudentDetails.StandardDivisionId]);


  useEffect(() => {
    dispatch(CDAgetIsFinalResultPublished(getIsFinalResultPublishedBody));
  }, [AcademicYear, GetOldStudentDetails.StandardDivisionId]);


  const getStudentName = () => {
    let classStudentName = '';
    UsAcademicYearsOfStudent.map((item) => {
      if (item.Value == AcademicYear) classStudentName = item.Name;
    });
    return classStudentName;
  };

  const Acadamicyearname = getStudentName();

  useEffect(() => {
    if (SchoolSettingValues.length > 0) {
      SchoolSettingValues.map((Item) => {
        if (Item.Key == "BlockProgressReportIfFeesArePending") {
          setBlockProgressReportIfFeesArePending(Item.Value)
        }
        else if (Item.Key == "ShowProgressSheetNote") {
          setShowProgressSheetNote(Item.Value)
        }
        else if (Item.Key == "ProgressSheetNote") {
          setProgressSheetNote(Item.Value)
        }
        else if (Item.Key == "AllowProgressReportDownloadAtStudentLogin") {
          setAllowProgressReportDownloadAtStudentLogin(Item.Value)
        }
        else if (Item.Key == "ShowProgressReportGraphOnMobileApp") {
          setShowProgressReportGraphOnMobileApp(Item.Value)
        } else if (Item.Key == "ShowTotalAsPerOutOfMarks") {
          setShowTotalAsPerOutOfMarks(Item.Value)
        }
        else if (Item.Key == "IsTotalConsiderForProgressReport") {
          setIsTotalConsiderForProgressReport(Item.Value)
        }
      })
    }
  }, [SchoolSettingValues])


  useEffect(() => {
    dispatch(CDAGetSchoolSettings(GetSchoolSettings));

  }, []);


  const handleClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    setOpen1(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen1(false); // Close the dialog
  };
  const getListDisplayName = (ShortName) => {
    let returnVal = ""
    ListDisplayNameDetails.map((Item) => {
      if (Item.ShortName == ShortName)
        returnVal = Item.DisplayName
    })
    return returnVal

  }


  const printRef = useRef<HTMLDivElement>(null);

  const clickPrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open('', '', 'height=600,width=800');
      const styles = `
      <style>
        body {
          font-family: 'Roboto', sans-serif;
          margin: 0;
          padding: 20px;
        }
        h1, h2, h3, h4 {
          margin: 0 0 10px;

        }
        table {
        
          width: 100%;
          border-collapse: collapse;
        }
          
        table, th, td {
          border: 1px solid black;
        
        }
        th, td {
          padding: 8px;
          text-align: center;
            
        }
        .MuiTypography-root {
          font-family: 'Roboto', sans-serif;
           width:80px;
        }
        .MuiTableCell-root {
          font-family: 'Roboto', sans-serif;
           width:80px;
        }
      </style>
    `;
      printWindow.document.write('<html><head><title>Print</title>' + styles + '</head><body>');
      printWindow.document.write(printContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Print reference is not available');
    }
  };




  const Toppers = (value) => {
    const progressreporttppper = true
    navigate('/extended-sidebar/Teacher/Toppers/' + selectTeacher + '/' + GetOldStudentDetails.StandardDivisionId + '/' + GetOldStudentDetails.StandardId + '/' + AcademicYear + '/' + LatestExamId + '/' + progressreporttppper + '/' +  StudentId + '/'+ true);
  };

  const shouldShowToppersButton = !IsPrePrimary && AcademicYear !== asAcademicYearId && !USIsGradingStandard && ShowTopppers;
  const ShowDownlodebutton = IsPrePrimary &&  PrePrimaryExamPublishStatus.IsTerm1AssessmentPublished == true ;
  const ShowDownlodebutton1 = IsPrePrimary &&  PrePrimaryExamPublishStatus.IsTerm2AssessmentPublished == true ;



 
  // useEffect(() => {
  //  if(USIsXseedApplicable){
  //   let state1 = { GetOldStudentDetails, AcademicYear ,USIsXseedApplicable,Acadamicyearname,StudentId,selectTeacher};
  //   navigate('/extended-sidebar/Teacher/PreprimaryProgressReport1' , { state: state1 });

  //  }
  // }, [USIsXseedApplicable]);
  
  

  return (
    <Box sx={{ px: 2 }}>
      {(Loading) && <SuspenseLoader />}
      {AllStudentsProgressSheet?.length === 0 && <SuspenseLoader />}

      <CommonPageHeader
        navLinks={[
          { title: 'Progress Report', path: '/extended-sidebar/Teacher/ProgressReportNew' }
        ]}
        rightActions={<>

          <SearchableDropdown
            label={"Subject Teacher"}
            sx={{ pl: 0, minWidth: '350px', backgroundColor: CanEdit == 'N' ? '#F0F0F0' : '', }}
            ItemList={USGetClassTeachers}
            mandatory
            onChange={clickSelectClass}
            disabled={CanEdit == 'N'}
            defaultValue={selectTeacher}
            size={"small"}


          />

          <SearchableDropdown
            ItemList={USGetStudentNameDropdown}
            sx={{ minWidth: '300px' }}
            onChange={clickStudentList}
            defaultValue={StudentId}
            label={'Student Name'}
            size={"small"} />

          {StudentId == "0"  ? <span></span> :
            <SearchableDropdown
              ItemList={UsAcademicYearsOfStudent}
              sx={{ minWidth: '300px' }}
              onChange={ClickAcademicYear}
              defaultValue={AcademicYear}
              label={'Academic Years '}
              size={"small"} />}





          <Box>
            <Tooltip title={'Displays  progress report of published exam of selected / all student.'}>
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
          </Box>



          <Tooltip title={'Show'}>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: blue[500],
                '&:hover': {
                  backgroundColor: blue[600]
                }
              }}
              onClick={!Loading ? ClickShow : () => { }}>
              <VisibilityTwoToneIcon />
            </IconButton>
          </Tooltip>





          {((shouldShowToppersButton && open) && SchoolScreensAccessPermission() ) && <Tooltip title="Toppers">
            <span>
              <IconButton
                onClick={Toppers}
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600],
                  },
                }}
              >
                <WorkspacePremiumIcon />
              </IconButton>
            </span>
          </Tooltip>}
        </>}

      />

{USlistStudentsDetails.length>0 &&
      <Grid container sx={{ mt: 2 }} >
        <Grid xs={8}>
          {open && (<div >

            {
              AcademicYear === asAcademicYearId ? (
                <span></span>
              ) : (
                ((EntireDataList?.listStudentsDetails || []).length !== 0 && StudentId !== "0") && (getIsTermExamPublished && AcademicYear >= "50") ? (
                  <ErrorMessage1 Error={"On publish, you will see download buttons to download Term 1/2 progress report."}></ErrorMessage1>
                ) : (
                  <span></span>
                )
              )
            }

            {AcademicYear !== asAcademicYearId && StudentId !== "0" ? <ErrorMessage1 Error={`You are viewing data of old academic year ${getStudentName()}.`}></ErrorMessage1> :
              <span></span>
            }
          </div>)}
        </Grid>
        {(!SchoolScreensAccessPermission()  && AcademicYear !== asAcademicYearId )&& 
          <Grid xs={4}>
            {(open && !IsPrePrimary)&& (
              <Box display={'flex'} sx={{ justifyContent: 'flex-end' }}>
                <Box sx={{mr:1}}>
                {( getIsTermExamPublished && AcademicYear >= "50") &&
                  <Card5
                    text1={ asSchoolId == "11" ? 'DOWNLOAD PDF' :  academictermsResult[0]?.TermName}
                    text2=""
                    clickIcon={() => { downloadProgress(1); }}
                  />
                 }</Box>
                <Box>
                {(getIsFinalResultPublished && AcademicYear >= "50") &&
                  <Card5
                    text1={academictermsResult[1]?.TermName}
                    text2=""
                    clickIcon={() => { downloadProgress(2); }}
                  />
                }</Box>
              </Box>
            )}
          </Grid>
          }
          

      </Grid> }

      <ErrorMessage1 Error={Error}></ErrorMessage1>
 
      {open && (
        <span>
          {StudentId !== "0" ? (

            USIsTestPublishedForStdDiv === true || USIsTestPublishedForStudentIS === true || AcademicYear !== asAcademicYearId ? (
              < Box ref={printRef}>
                {StudentId !== "0" ? EntireDataList?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true' ? //USIsGradingStandard == true ?
                  <>
                   {USlistStudentsDetails.length>0 &&
                    <GradeConfigurationDetails
                      handleClick={handleClick}
                      open1={open1}
                      handleClose={handleClose}
                      USGetAllMarksGradeConfiguration={USGetAllMarksGradeConfiguration}
                      USGetAllMarksGradeConfiguration1={USGetAllMarksGradeConfiguration1}
                      headerArray={headerArray}
                    />}
                    <Studentdetails
                      USlistStudentsDetails={USlistStudentsDetails}
                    />

                    {hasTotalConsiderationN && (
                      <div
                        style={{ backgroundColor: 'white', padding: '8px' }}
                        dangerouslySetInnerHTML={{ __html: formattedText }}
                      />

                    )}
                    <Box sx={{ overflowX: 'auto' }}>
                      <ProgressReportGradeView
                    
                      USlistStudentsDetails={USlistStudentsDetails}
                      progressReportMessage={USErrorMessage}
                        totalCount={totalCount}
                        isFailCriteria={isFailCriteria}
                        EntireDataList={EntireDataList}
                        IsTotalConsiderForProgressReport={IsTotalConsiderForProgressReport}
                        HeaderArray1={HeaderArray1}
                        SubHeaderArray1={SubHeaderArray1}
                        MarkDetailsList1={IsTotalConsiderForProgressReport.toLowerCase() === 'true' ? MarkDetailsList : MarkDetailsList1}
                      />
                    </Box>
                  </>
                  :
                  <> {USlistStudentsDetails.length>0 &&
                    <GradeConfigurationDetails
                      handleClick={handleClick}
                      open1={open1}
                      handleClose={handleClose}
                      USGetAllMarksGradeConfiguration={USGetAllMarksGradeConfiguration}
                      USGetAllMarksGradeConfiguration1={USGetAllMarksGradeConfiguration1}
                      headerArray={headerArray}
                    />}
                    <Studentdetails
                      USlistStudentsDetails={USlistStudentsDetails}
                    />
                    {hasTotalConsiderationN && (
                      <div
                        style={{ backgroundColor: 'white', padding: '8px' }}
                        dangerouslySetInnerHTML={{ __html: formattedText }}
                      />

                    )}
                    <Box sx={{ overflowX: 'auto' }}>
                      <ProgressReportMarkView
                      USlistStudentsDetails={USlistStudentsDetails}
                      progressReportMessage={USErrorMessage}
                        isFailCriteria={isFailCriteria}
                        totalCount={totalCount}
                        HeaderArray={HeaderArray}
                        SubHeaderArray={SubHeaderArray}
                        MarkDetailsList={MarkDetailsList}
                        ListDisplayNameDetails={ListDisplayNameDetails}
                        IsTotalConsiderForProgressReport={IsTotalConsiderForProgressReport}
                        USListSchoolWiseTestNameDetail={USListSchoolWiseTestNameDetail}
                        USListMarkssDetails={USListMarkssDetails}
                        ListTestTypeIdDetails={USListTestTypeIdDetails}
                        ThirdHeaderRow={ThirdHeaderColumn}
                        EntireDataList={EntireDataList}
                      />
                    </Box>
                  </>
                  :
                  null
                }



              </ Box>

            ) : (<Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                marginTop: 4,
                backgroundColor: '#324b84',
                padding: 1,
                borderRadius: 2,
                color: 'white',
              }}
            >
              <b> No exam of this class has been published for the  year ( {FStudentName()} )  </b>
            </Typography>

            )
          )
            : null}



        </span>
      )}

      {open && (
        <div>
          {StudentId == "0" && parsedDataList?.length > 0 &&
            parsedDataList.map((parsedItem, i) => (
              <AllStudents key={i} isFailCriteria={isFailCriteria} totalCount={totalCount} data1={IsTotalConsiderForProgressReport} IStudentList={parsedItem}
                handleClose={handleClose} handleClick={handleClick} open1={open1} formattedText={formattedText}
                USGetAllMarksGradeConfiguration={USGetAllMarksGradeConfiguration}
                USGetAllMarksGradeConfiguration1={USGetAllMarksGradeConfiguration1}
                USlistStudentsDetails={USlistStudentsDetails}
                USErrorMessage={USErrorMessage}
              />
              
            ))

          }


        </div>
      )}

      {(SchoolScreensAccessPermission() && getIsFinalResultPublished)&&
        <Grid xs={6} >
          {open && (
            <>
              {StudentId !== "0" && AcademicYear !== asAcademicYearId &&
                <FinalResultTable
                  ViewProgress={ViewProgress}
                  totalconsidration={totalconsidration}
                  SubjectDetailsView={SubjectDetailsView}
                  IsTotalConsiderForProgressReport={IsTotalConsiderForProgressReport1}
                  showOnlyGrades={showOnlyGrades}
                  ToppersCount={ToppersCount}
                  hasTopRanks={hasTopRanks}
                  PercentageDetails={PercentageDetails}
                  TotalPerGradeView={TotalPerGradeView}
                  GradesDetailsView={GradesDetailsView}
                  MarkDetailsView={MarkDetailsView}
                  IsView={EntireDataList?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true'}



                />
              }

            </>

          )}

        </Grid>}

    </Box>
  )
}

export default ProgressReportNew