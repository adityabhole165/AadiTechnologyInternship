import PrintIcon from '@mui/icons-material/Print';
import QuestionMark from '@mui/icons-material/QuestionMark';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Box, Grid, IconButton, Stack, Tooltip } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { XMLParser } from "fast-xml-parser";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

import {
  IGetAllStudentTestprogressBody,
  IGetStudentNameListBody,
  IGetsingleStudentBody,
  IUnpublishedTestexamBody,
  IconfiguredExamBody
} from 'src/interfaces/VeiwResultAll/IViewResultAll';

import { IClassTeacherListBody } from 'src/interfaces/FinalResult/IFinalResult';
import { IViewBody } from 'src/interfaces/FinalResult/IFinalResultGenerateAll';
import { GetSchoolSettingsBody } from 'src/interfaces/ProgressReport/IprogressReport';
import { ClassTechersList } from 'src/requests/FinalResult/RequestFinalResult';
import { CDA_EntireStudentFinalResult } from 'src/requests/FinalResult/RequestFinalResultGenerateAll';
import { CDAGetSchoolSettings } from 'src/requests/ProgressReport/ReqProgressReport';
import { DataParserAndFormatter } from 'src/requests/VeiwAllResult/ProtoType';
import {
  GetStudentResultList,
  GetsingleStudentResultVA,
  StudentNameList,
  getiscofigred,
  getunpublishedexam
} from 'src/requests/VeiwAllResult/ReqveiwresultAll';
import { decodeURL } from '../Common/Util';
import ViewResultAllTable from './ViewResultAllTable';

type Props = {};
const ViewResultAll = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let {
    StandardDivisionId
  } = useParams();

  // Decode in-place
  useEffect(() => {
    if (StandardDivisionId !== undefined)
      StandardDivisionId = decodeURL(StandardDivisionId);
  }, [StandardDivisionId])

  const StandardDivisionIdse = (
    sessionStorage.getItem('StandardDivisionId')
  );
  const TeacherId = (sessionStorage.getItem('TeacherId'));
  const [selectTeacher, setSelectTeacher] = useState(StandardDivisionIdse)
  const [open, setOpen] = useState(false);
  const [isShowClicked, setIsShowClicked] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<string | null>(null);
  const [studentList, setStudentList] = useState('0');
  const [teacherList, setTeacherList] = useState([]);
  const ScreensAccessPermission = JSON.parse(sessionStorage.getItem('ScreensAccessPermission'));
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  const asUserId = Number(sessionStorage.getItem('Id'));
  const USClassTeachers = useSelector((state: RootState) => state.VeiwResult.ClassTeachers);
  const USStudentListDropDown = useSelector((state: RootState) => state.VeiwResult.StudentName);
  // All Students Result IN XML Format
  const USStudentResultList: any = useSelector((state: RootState) => state.VeiwResult.StudentResultList);
  // const GradesDetailsView = useSelector((state: RootState) => state.FinalResultGenerateAll.getGradesDetailsView);
  const EntireStudentFinalResult = useSelector((state: RootState) => state.FinalResultGenerateAll.ISEntireStudentFinalResult);
  const USSStudentsingleResult = useSelector((state: RootState) => state.VeiwResult.StudentsingleResult);
  const MarkDetailsView = useSelector((state: RootState) => state.VeiwResult.getMarkDetailsView);
  const SubjectDetailsView = useSelector((state: RootState) => state.VeiwResult.getSubjectDetailsView)
  const GradesDetailsView = useSelector((state: RootState) => state.VeiwResult.getGradesDetailsView);
  const TotalPerGradeView = useSelector((state: RootState) => state.VeiwResult.getTotalPerGradeView);
  const PercentageDetails = useSelector((state: RootState) => state.VeiwResult.getPerDetails);
  const Usisconfigred: any = useSelector((state: RootState) => state.VeiwResult.iscofigred);
  const Usunpublishedexam: any = useSelector((state: RootState) => state.VeiwResult.unpublishexam);
  const GetnotgenrateLists = useSelector((state: RootState) => state.VeiwResult.notResultList);
  useEffect(() => {
    // EntireStudentFinalResult
    //console.log('EntireStudentFinalResult', EntireStudentFinalResult);
  }, [EntireStudentFinalResult])
  const GetClassTeachers = useSelector(
    (state: RootState) => state.FinalResult.ClassTeachers
  );

  const Data3 = SubjectDetailsView.filter((item) => item.Grade == "")
  const Data4 = SubjectDetailsView.filter((item) => item.Marks == "")
  const showOnlyGrades = USSStudentsingleResult.some((item) => item.ShowOnlyGrades.trim() === 'true');
  const totalconsidration = SubjectDetailsView.filter((item) => item.Total_Consideration === "N")
  const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);
  const ToppersCount = UsGetSchoolSettings?.GetSchoolSettingsResult?.ToppersCount
  const [IsTotalConsiderForProgressReport, setIsTotalConsiderForProgressReport] = useState('');

  useEffect(() => {
    if (UsGetSchoolSettings != null)
      setIsTotalConsiderForProgressReport(UsGetSchoolSettings?.GetSchoolSettingsResult?.IsTotalConsiderForProgressReport);
  }, [UsGetSchoolSettings]);
  useEffect(() => {
    //console.log('USStudentListDropDown', USStudentListDropDown);

  }, [USStudentListDropDown])

  // const ClassTeachersBody: IClassTeacherBody = {
  //   asSchoolId,
  //   asAcademicYearId,
  // };



  const ClassTeachersNewBody: IClassTeacherListBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asTeacherId: TeacherId
  };


  const GetSchoolSettings: GetSchoolSettingsBody = {
    asSchoolId: Number(asSchoolId),
  };


  const StudentListDropDowntBody: IGetStudentNameListBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: Number(selectTeacher),
  };

  const StudentResultBody: IGetAllStudentTestprogressBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
    asStartIndex: 0,
    PageCount: 10,
    asTestId: 1,
  };
  const StudentResultBody1: IGetAllStudentTestprogressBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: 54,  // asAcademicYearId,
    asStdDivId: 1266, // asStandardDivisionId,
    asStartIndex: 0,
    PageCount: 10,
    asTestId: 608,  // 1
  };

  const iscofigred: IconfiguredExamBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
  };

  const unpublishexam: IUnpublishedTestexamBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
  };

  const StudentsingleresultBody: IGetsingleStudentBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: asAcademicYearId,
    asStudentId: Number(studentList),
    asInsertedById: Number(asUserId),
    asWithGrace: 1,


  }

  useEffect(() => {
    dispatch(GetsingleStudentResultVA(StudentsingleresultBody))
  }, [selectTeacher, studentList])

  useEffect(() => {
    dispatch(CDAGetSchoolSettings(GetSchoolSettings));

  }, []);


  const clickSelectClass = (value) => {
    setSelectTeacher(value);
  };

  const clickStudentList = (value) => {
    setOpen(false);
    setStudentList(value)
    setIsShowClicked(false);
  };
  // API Call to get Student Final Result Individual / All
  // API Body
  const GetViewResultBody: IViewBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStudentsIds: studentList === '0' ? [] : [studentList],
    asStdDivId: Number(selectTeacher),
    asWithGrace: 1,
  };
  const ClickShow = async (value) => {
    await dispatch(CDA_EntireStudentFinalResult(GetViewResultBody));
    setOpen(true)
    setIsShowClicked(true);
  }

  // useEffect(() => {
  //   dispatch(ClassTechersListt(ClassTeachersBody));
  // }, []);
  useEffect(() => {
    dispatch(ClassTechersList(ClassTeachersNewBody));
  }, []);

  useEffect(() => {
    dispatch(StudentNameList(StudentListDropDowntBody));
  }, [selectTeacher]);


  useEffect(() => {
    //dispatch(StudentNameList(StudentListDropDowntBody));
    if (USStudentListDropDown.length > 0)
      setStudentList(USStudentListDropDown[0].Id)
  }, [USStudentListDropDown]);


  useEffect(() => {
    if (StandardDivisionId !== undefined && teacherList.length === 1)
      setSelectTeacher(StandardDivisionId)
  }, [USStudentListDropDown]);

  // #region All Student View
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
    if (USStudentResultList !== null && USStudentResultList?.listMarksDetiles?.length > 0) {
      // const parser = new XMLParser();
      // const jsonData = parser.parse(AllStudentsProgressSheet.listStudentsMarksDetiles[0].Tests);
      const parsedData = USStudentResultList?.listMarksDetiles
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
      let finalFormat: any = parsedData?.map(item => DataParserAndFormatter(item));
      setParsedDataList(finalFormat);
      //console.log('⭐ AllStudentsProgressSheet => List No 1', USStudentResultList);
      //console.log('⭐ parsedData => List No 2', parsedData);
      //console.log('⭐ FinallList => List No 3', finalFormat);

    }
  }, [USStudentResultList])
  // #endregion






  useEffect(() => {

    dispatch(GetStudentResultList(studentList === '0' ? StudentResultBody1 : StudentResultBody));
  }, [selectTeacher, studentList]);

  useEffect(() => {
    dispatch(getiscofigred(iscofigred));
    dispatch(getunpublishedexam(unpublishexam));
  }, []);

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission && ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'Final veiw result') perm = item.IsFullAccess;
    });
    return perm;
  };

  const getStudentName = () => {
    let classStudentName = '';
    USStudentListDropDown.map((item) => {
      if (item.Value == studentList) classStudentName = item.Name;
    });

    return classStudentName;
  };
  let classTeacherList = [];
  const getClassTeacherName = () => {
    USClassTeachers.map((item) => {
      if (item.TeacherId == TeacherId) {
        classTeacherList.push({
          Id: item.Id,
          Value: item.Value,
          Name: item.Name
        });
      }
    });
    // if (classTeacherList.length > 1) {
    setTeacherList(classTeacherList)
    // }
  };
  const isgenrate = getStudentName()

  // const clickPrint = () => {
  //   window.open('https://schoolwebsite.regulusit.net/RITeSchool/Student/StudentAnnualResultPrint.aspx?eNXR1G7TvKnm53e4OO8B4kK13X5MkQwItrEc3d1VEwmx4YWMbwW4T3xnZE3Dc3QV4xnyziKPOKwj6nT8UFXzenNlqH5PQrTSymfl4ktp7WE/4fc29EcOQXYAkGBiAYJ4ubKxU+rY3xn5qTDv2PMcpA==q');
  // };


  useEffect(() => {
    if (USClassTeachers != null)
      setTeacherList(USClassTeachers);
    getClassTeacherName();
  }, [USClassTeachers])


  useEffect(() => {
    if (teacherList != null) {
      if (teacherList.length > 0)
        setSelectTeacher(teacherList[0].Id)
    }
  }, [teacherList]);

  // #region Print Preview

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
                  font-family: 'Roboto', sans-serif;
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
                  font-size: 16px;
                  margin-bottom: 8px;
                  text-align: center;
                }
                .MuiTableCell-root {
                  font-family: 'Roboto', sans-serif;
                }
                  
                .custom-typography {
                  font-family: 'Roboto', sans-serif;
                  color: #38548a;
                  font-size: 24px;
                  margin-top: 16px;
                  text-align: left;
                }
              </style>
          `;


      printWindow.document.write('<html><head><title>Print</title>' + styles + '</head><body>');

      printWindow.document.write(printContent); // Include the rest of the content
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };



  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Final Result',
            path: '/RITeSchool/Teacher/FinalResult/' + StandardDivisionId,
          },
          {
            title: 'View Result All',
            path: '',
          },
        ]}
        rightActions={<>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="left"
            gap={1}
            sx={{
              mt: { xs: 0, sm: 0 },
              flexWrap: { xs: 'nowrap', sm: 'nowrap' }
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              display="flex"
              justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
            >
              <SearchableDropdown
                sx={{
                  width: { xs: '60vw', sm: '18vw' }
                  , bgcolor: GetScreenPermission() === 'N' ? '#F0F0F0' : 'inherit'
                }}
                ItemList={GetClassTeachers}
                onChange={clickSelectClass}
                defaultValue={selectTeacher}
                size="small"
                label="Class Teacher"
                DisableClearable={GetScreenPermission() === 'N'}
                mandatory
                disabled={GetClassTeachers.length === 2}
              />
            </Grid>

            <Grid
              item
              xs={12}
              display="flex"
              justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
            >
              <SearchableDropdown
                ItemList={USStudentListDropDown}
                onChange={clickStudentList}
                defaultValue={studentList}
                label="Student Name "
                size="small"
                sx={{ width: { xs: '60vw', sm: '20vw' } }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              gap={1}
              display="flex"
              justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
            >
              <Tooltip title={'View result of all / selected student .'}>
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

              <Tooltip title={'Show'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: blue[500],
                    '&:hover': {
                      backgroundColor: blue[600]
                    }
                  }}
                  onClick={ClickShow}>
                  <VisibilityTwoToneIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={'Print'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: isShowClicked ? blue[500] : blue[200], // Disabled state color
                    '&:hover': {
                      backgroundColor: isShowClicked ? blue[600] : blue[200] // Prevent hover effect when disabled
                    }
                  }}
                  onClick={clickPrint}
                  disabled={!isShowClicked} // Disable based on state
                >
                  <PrintIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Stack>
        </>
        }
      />

      <Box sx={{ mt: 1, background: 'white' }} ref={printRef}>
        {open &&
          <>
            {
              EntireStudentFinalResult.length > 0 && EntireStudentFinalResult?.map((studentResult, key) => {
                return (
                  <>
                    <ViewResultAllTable stdFinalResult={studentResult} key={key}
                      IsTotalConsiderForProgressReport={IsTotalConsiderForProgressReport}
                      ToppersCount={ToppersCount}
                    />
                  </>
                )
              })
            }
          </>
        }
      </Box>
    </Box>
  );
};
export default ViewResultAll;
