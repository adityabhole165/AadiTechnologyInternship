import Download from '@mui/icons-material/Download';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Stack, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers/icons';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { SchoolScreensAccessPermission, decodeURL } from 'src/components/Common/Util';
import { AlertContext } from 'src/contexts/AlertContext';
import {
  IAllPrimaryClassTeachersBody,
  IGetAllGradesForStandardBody,
  IGetAllStudentswiseRemarkDetailsNewBody,
  IGetConfiguredMaxRemarkLengthBody,
  IGetFinalPublishedExamStatusBody,
  IGetRemarkTemplateDetailsBody,
  IGetRemarksCategoryBody,
  IGetTestwiseTermBody,
  IStudentListDropDowntBody,
  IStudentswiseRemarkDetailsToExportBody,
  IUpdateAllStudentsRemarkDetailsBody
} from 'src/interfaces/ProgressRemarks/IProgressRemarks';
import Legend from 'src/libraries/Legend/Legend';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import RemarkList from 'src/libraries/ResuableComponents/RemarkList';
import ResizableCommentsBox from 'src/libraries/ResuableComponents/ResizableCommentsBox;';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import SearchableDropdown1 from 'src/libraries/ResuableComponents/SearchableDropdown1';
import {
  CDAGetAllStudentswiseRemarkDetails,
  CDAGetClassTeachers,
  CDAGetConfiguredMaxRemarkLength,
  CDAGetFinalPublishedExamStatus,
  CDAGetRemarkTemplateDetails,
  CDAGetRemarksCategory,
  CDAGetTestwiseTerm,
  CDAGradeDropDown,
  CDAResetStudentDropdown,
  CDAStudentListDropDown,
  CDAStudentswiseRemarkDetailsToExport,
  CDAUpdateAllStudentsRemarkDetails,
  CDAresetSaveMassage
} from 'src/requests/ProgressRemarks/ReqProgressRemarks';
import { RootState } from 'src/store';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import ProgressRemarkTerm from './ProgressRemarkTerm';
import ProgressRemarksNotes from './ProgressRemarksNotes';

const ProgressRemarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [SelectTerm, SetSelectTerm] = useState();
  const [SelectGrade, SetSelectGrade] = useState();
  const [page, setPage] = useState(1)
  const [StudentList, SetStudentList] = useState('');
  const [showScreenOne, setShowScreenOne] = useState(true);
  const [open, setOpen] = useState(false);
  const [Itemlist, setItemlist] = useState([]);
  const [IsDirty, setIsDirty] = useState(false);
  const [page1, setPage1] = useState(0);
  const asStandardId = sessionStorage.getItem('StandardId');
  const [StudentId, setStudentId] = useState([]);
  const [Remark, setRemark] = useState('')
  const [remarkTemplates, setRemarkTemplates] = useState([]);
  //console.log(remarkTemplates, "remarkTemplates");
  const [termName, setTermName] = useState('');

  const toggleScreens = () => { setShowScreenOne(!showScreenOne); };
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const rowsPerPageOptions = [20, 50, 100, 200];
  const { showAlert, closeAlert } = useContext(AlertContext);
  let {
    StandardDivisionId,
    TestId
  } = useParams();

  // Decode in-place
  StandardDivisionId = decodeURL(StandardDivisionId);
  TestId = decodeURL(TestId);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;


  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );


  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission?.map((item) => {
      if (item.ScreenName === 'Progress Remarks') perm = item.IsFullAccess;
    });
    return perm;
  };


  let CanEdit = getSchoolConfigurations(266)

  //console.log(CanEdit, "CanEdit");

  // const determineInitialState = () => {
  //   return GetScreenPermission() === 'Y' ? '0' : sessionStorage.getItem('StandardDivisionId') || '';
  // };

  const [selectTeacher, SetselectTeacher] = useState(StandardDivisionId);


  const [HeaderPublish, setHeaderPublish] = useState([
    { Id: 1, Header: '', SortOrder: "asc" },
    { Id: 2, Header: 'Remark Template' },
  ]);
  const [HeaderArray, setHeaderArray] = useState([]);

  const USGetTestwiseTerm: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetTestwiseTerm
  );

  const USClassTeachers: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetClassTeachers
  );

  const StudentswiseRemarkDetails: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISStudentswiseRemarkDetailsToExport
  );
  const StudentswiseRemarkDetails1: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISStudentswiseRemarkDetailsToExport1
  );
  const StudentswiseRemarkDetails2: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISStudentswiseRemarkDetailsToExport2
  );

  const UpdateAllStudentsRemarkDetail: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISUpdateAllStudentsRemarkDetailsBody
  );

  const USStudentListDropDown: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISStudentListDropDown
  );
  const GradeDropDown: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGradesForStandard
  );

  const USRemarksCategory: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetRemarksCategoryList
  );

  const USRemarkTemplateDetails: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetRemarkTemplateDetail
  );

  const USGetAllStudentsForProgressRemark: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetAllStudentsForProgressRemark
  );

  const USGetFinalPublishedExamStatus: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISRGetFinalPublishedExamStatus
  );

  const USGetAllStudentswiseRemarkDetails: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISGetAllStudentswiseRemarkDetails
  );

  const countArray = USGetAllStudentsForProgressRemark.map((item: any) => item.TotalRows);


  const USRemarkDetailsHeaderList: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISRemarkDetailsHeaderList
  );


  const USGetConfiguredMaxRemarkLength: any = useSelector(
    (state: RootState) =>
      state.ProgressRemarkSlice.ISGetConfiguredMaxRemarkLength
  );

  const maxRemarkLength = USGetConfiguredMaxRemarkLength?.MaxRemarkLength;


  const StdDivisionId = () => {
    let returnVal = "0";
    USClassTeachers.forEach((Item) => {
      if (Item.Value && Item.Value !== "0") {
        returnVal = Item.Value;
      }
    });
    return returnVal;
  };


  useEffect(() => {
    //console.log(StudentswiseRemarkDetails, StudentswiseRemarkDetails1, StudentswiseRemarkDetails2, "StudentswiseRemarkDetails 🔥🔥🔥");

  }, [StudentswiseRemarkDetails, StudentswiseRemarkDetails1, StudentswiseRemarkDetails2]);

  useEffect(() => {
    if ((USClassTeachers.length > 0 && CanEdit == "N")) {
      SetselectTeacher(USClassTeachers[1].Value);
    }
  }, [USClassTeachers]);

  useEffect(() => {
    if ((USClassTeachers.length > 0 && CanEdit == "Y")) {
      SetselectTeacher(StandardDivisionId);
    }
  }, [USClassTeachers]);

  useEffect(() => {
    if ((USClassTeachers.length > 0 && CanEdit == "Y") && StandardDivisionId == undefined) {
      SetselectTeacher(USClassTeachers[0].Value);
    }
  }, [USClassTeachers]);


  useEffect(() => {
    let headerArray = [
      { Id: 1, Header: 'Roll No.' },
      { Id: 2, Header: 'Name' },
      ...(SelectTerm == 2 && !SchoolScreensAccessPermission() ? [{ Id: 3, Header: 'Old Remarks' }] : []),
    ];

    USRemarkDetailsHeaderList.map((Item, i) => {
      headerArray.push({ Id: i + (SelectTerm == 2 && !SchoolScreensAccessPermission() ? 4 : 3), Header: Item.RemarkName });
    });

    setHeaderArray(headerArray);
  }, [USRemarkDetailsHeaderList, SelectTerm, SchoolScreensAccessPermission()]);
  useEffect(() => {
    if (USGetTestwiseTerm.length > 0) {
      SetSelectTerm(USGetTestwiseTerm[0].Value);
      setTermName(USGetTestwiseTerm[0].Name)
    }
  }, [USGetTestwiseTerm]);

  // useEffect(() => {
  //   let headerArray = [
  //     { Id: 1, Header: 'Roll No.' },
  //     { Id: 2, Header: 'Name' },
  //     ...(SelectTerm == 2 ? [{ Id: 3, Header: 'Old Remarks' }] : []),
  //   ]
  //   USRemarkDetailsHeaderList.map((Item, i) => {
  //     headerArray.push({ Id: i + 3, Header: Item.RemarkName })
  //   })
  //   setHeaderArray(headerArray)
  // }, [USRemarkDetailsHeaderList])

  const getXML = () => {
    let sXML =
      '<ArrayOfStudentwiseRemarkConfigDetails xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';

    Itemlist.forEach((Item) => {
      Item.Remarks.forEach((remark) => {
        sXML +=
          '<StudentwiseRemarkConfigDetails>' +
          '<YearwiseStudentId>' + Item.Text11 + '</YearwiseStudentId>' +
          '<StudentwiseRemarkId>' + Item.Text12 + '</StudentwiseRemarkId>' +
          '<Remark>' + remark.Text3 + '</Remark>' +
          '<RemarkConfigId>' + remark.Text6 + '</RemarkConfigId>' +
          '<RemarkMaster><RemarkConfigId>' + remark.Text6 + '</RemarkConfigId></RemarkMaster>' +
          '<SalutationId>' + Item.Text8 + '</SalutationId>' +
          '<IsPassedAndPromoted>' + Item.Text9 + '</IsPassedAndPromoted>' +
          '<IsLeftStudent>' + Item.Text10 + '</IsLeftStudent>' +
          '</StudentwiseRemarkConfigDetails>';
      });
    });

    sXML += '</ArrayOfStudentwiseRemarkConfigDetails>';
    return sXML;
  };







  // const getXML = () => {
  //   let sXML =
  //     '<ArrayOfStudentwiseRemarkConfigDetails xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
  //   Itemlist.map((Item) => {
  //     sXML =
  //       sXML +
  //       '<StudentwiseRemarkConfigDetails>' +
  //       '<YearwiseStudentId>' + Item.Text11 + '</YearwiseStudentId>' +
  //       '<StudentwiseRemarkId>' + Item.Text12 + '</StudentwiseRemarkId>' +
  //       '<Remark>' + Item.Text3 + '</Remark>' +
  //       '<RemarkConfigId>' + Item.Text7 + '</RemarkConfigId>' +
  //       '<RemarkMaster><RemarkConfigId>' + Item.Text6 + '</RemarkConfigId></RemarkMaster>' +
  //       '<SalutationId>' + Item.Text8 + '</SalutationId>' +
  //       '<IsPassedAndPromoted>' + Item.Text9 + '</IsPassedAndPromoted>' +
  //       '<IsLeftStudent>' + Item.Text10 + '</IsLeftStudent> ' +
  //       '</StudentwiseRemarkConfigDetails>';
  //   });
  //   sXML = sXML + '</ArrayOfStudentwiseRemarkConfigDetails>';


  //   return sXML;
  // };

  // #region Export Logic
  // const { listStudentDetails, listRemarkDetails, listTermDetails } = data;
  const [StudentswiseRemarkDetails1State, setStudentswiseRemarkDetails1State] = useState<any>({});
  useEffect(() => {
    const StudentswiseRemarkDetailsBody: IStudentswiseRemarkDetailsToExportBody =
    {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asStandardDivId: getStdDivisionId(),
      asStudentId: Number(StudentList),
      asTermId: SelectTerm
    };
    dispatch(CDAStudentswiseRemarkDetailsToExport(StudentswiseRemarkDetailsBody))
  }, [selectTeacher, SelectTerm, StudentList, USClassTeachers, USGetTestwiseTerm]) // flag 🚩
  useEffect(() => {
    //console.log('this was caught', StudentswiseRemarkDetails1);

    if (Object.keys(StudentswiseRemarkDetails1).length > 0) {
      //console.log(StudentswiseRemarkDetails1, "checkitout");
      setStudentswiseRemarkDetails1State(StudentswiseRemarkDetails1);
    }
  }, [StudentswiseRemarkDetails1])

  // Helper function to get remarks for a student
  const getStudentRemarks = (yearwiseStudentId) => {
    return StudentswiseRemarkDetails2
      .filter(term => term.YearwiseStudentId === yearwiseStudentId)
      .reduce((acc, term) => {
        acc[term.RemarkName] = term.Remark;
        return acc;
      }, {});
  };

  // Convert data to CSV  
  const convertToCSV = () => {
    // Prepare headers
    const headers = [
      'Roll No.',
      'Class Name',
      'Student Name',
      'Term Name',
      ...StudentswiseRemarkDetails1State.map(remark => remark.RemarkName)
    ];

    // Prepare rows
    const rows = StudentswiseRemarkDetails.map(student => {
      const studentRemarks = getStudentRemarks(student.YearwiseStudentId);

      const row = [
        student.RollNo,
        student.ClassName,
        student.StudentName,
        USGetTestwiseTerm.filter(item => item.Value === SelectTerm)[0].Name ?? 'Term Name',
      ];

      // Add remarks for each remark type
      StudentswiseRemarkDetails1State.forEach(remarkType => {
        row.push(studentRemarks[remarkType.RemarkName] || '');
      });

      return row;
    });

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell =>
        // Escape commas and quotes
        `"${String(cell || '').replace(/"/g, '""')}"`
      ).join(','))
    ].join('\n');

    return csvContent;
  };

  // Download CSV as Excel file
  const exportToExcel = () => {
    const csvContent = convertToCSV();

    // Create Blob with CSV content
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });

    // Create download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `StudentRemarks_${termName}.csv`);
    link.style.visibility = 'hidden';

    // Append, click, and remove link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // #endregion



  const getStdDivisionId = () => {
    let returnVal = 0
    USClassTeachers.map((Item) => {
      if (Item.Value == selectTeacher)
        returnVal = Number(Item.Id)
    })
    return returnVal
  }

  const getStandardId = () => {
    let returnVal = 0
    USClassTeachers.map((Item) => {
      if (Item.Value == selectTeacher)
        returnVal = Item.asStandardId
    })
    return returnVal
  }


  const RemarkCategoryBody: IGetRemarksCategoryBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId
  };


  const GetConfiguredMaxRemarkLengthBody: IGetConfiguredMaxRemarkLengthBody =
  {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: getStandardId(),
    asTermId: SelectTerm
  };







  const GetTestwiseTermBody: IGetTestwiseTermBody = {
    asSchoolId: asSchoolId
  };
  const ClassTeachersBody: IAllPrimaryClassTeachersBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asUserId: Number(CanEdit == 'Y' ? 0 : asUserId
    )
  };
  const ExportButton = () => {
    //console.log('whats happening .. IDK');

    exportToExcel();
  };

  const GetAllGradesForStandardBody: IGetAllGradesForStandardBody = {
    asSchool_Id: asSchoolId,
    asAcademic_Year_Id: asAcademicYearId,
    asStandard_Id: 0,
    asSubjectId: 0,
    asTest_Id: 0
  }

  const RemarkTemplateDetailsBody: IGetRemarkTemplateDetailsBody = {
    asSchoolId: asSchoolId,
    asRemarkId: Number(Remark),
    asSortExpression: "Template",
    asSortDirection: ' ' + HeaderPublish[0].SortOrder,
    asFilter: '',
    asAcadmicYearId: asAcademicYearId,
    asMarksGradesConfigurationDetailsId: SelectGrade,
    asStandardId: getStandardId()
  }

  const StudentListDropDowntBody: IStudentListDropDowntBody = {
    asStandard_Division_Id: getStdDivisionId(),
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asTerm_Id: SelectTerm
  };


  const GetAllStudentswiseRemarkDetailsBody: IGetAllStudentswiseRemarkDetailsNewBody =
  {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivId: getStdDivisionId(),
    asStudentId: Number(StudentList),
    asTermId: Number(SelectTerm),
    TeacherId: Number(selectTeacher),
    asStartIndex: startIndex,
    asEndIndex: endIndex,
  };

  const GetFinalPublishedExamStatusBody: IGetFinalPublishedExamStatusBody =
  {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivId: getStdDivisionId(),
    asTerm_Id: Number(SelectTerm)
  };



  const getActiveTexts = () => {
    return remarkTemplates.filter(item => item.IsActive).map(item => item.Text1);
  }



  const [ColIndex, SetColIndex] = useState([-1])

  // const TextChange1 = () => {
  //   setItemlist(prevItemlist =>
  //     prevItemlist.map(item => {
  //       if (item.Id === StudentId) {
  //         const activeTexts = getActiveTexts().join(' ');
  //         return {
  //           ...item,
  //           Remarks: item.Remarks.map((remark, i) => {
  //             const newText3 = remark.Text3 + activeTexts;
  //             return { ...remark, Text3: (i == ColIndex) ? newText3.slice(0, 300) : remark.Text3  };
  //           })
  //         };
  //       }
  //       return item;
  //     })
  //   );
  // };
  const UpdateRemark = () => {
    const UpdateAllStudentsRemarkDetailsBody: IUpdateAllStudentsRemarkDetailsBody =
    {
      StudentwiseRemarkXML: getXML(),
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asInsertedById: Number(selectTeacher),
      asStandardDivId: getStdDivisionId(),
      asTermId: Number(SelectTerm)
    };

    dispatch(
      CDAUpdateAllStudentsRemarkDetails(UpdateAllStudentsRemarkDetailsBody),

    );[page, selectTeacher, SelectTerm]
  };

  const TextChange1 = () => {
    let showAlert1 = false;
    setItemlist(prevItemlist =>
      prevItemlist.map(item => {
        if (item.Id === StudentId) {
          const activeTexts = getActiveTexts().join(' ');
          const updatedRemarks = item.Remarks.map((remark, i) => {
            if (i === ColIndex) {
              const newText3 = remark.Text3 + activeTexts;
              if (newText3.length > maxRemarkLength) {
                showAlert1 = true;
                return remark; // Return the original remark without changes
              } else {
                setIsDirty(true)
                return { ...remark, Text3: newText3 };
              }
            }
            return remark;
          });
          if (showAlert1) {

            showAlert({
              title: 'Please Confirm',
              message: `Remarks length should not be more than ${maxRemarkLength}`,
              variant: 'warning',
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              onCancel: () => {
                closeAlert();
              },
              onConfirm: () => {

                closeAlert();
              }
            });


          }
          return {
            ...item,
            Remarks: updatedRemarks
          };
        }
        return item;
      })
    );
    return showAlert1;
  };

  const [message, setMessage] = useState("");
  useEffect(() => {
    if (USGetFinalPublishedExamStatus.IsPublishedStatus == 1) {
      <span> </span>
    }

    else {
      const autoSave = setInterval(() => {
        if (IsDirty) {
          UpdateRemark();
          setMessage("We are saving current progress remarks details.Please wait.");
        }
      }, 60000);

      return () => clearInterval(autoSave);

    }
  }, [IsDirty, UpdateRemark, USGetFinalPublishedExamStatus.IsPublishedStatus]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        if (IsDirty) {
          setMessage("");
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);



  const SelectClick = () => {

    if (getActiveTexts().length == 0) {
      showAlert({
        title: 'Please Confirm',
        message: 'At least one Remark Template should be selected.',
        variant: 'warning',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onCancel: () => {
          closeAlert();
        },
        onConfirm: () => {

          closeAlert();
        }
      });
      return;
    }
    const showAlert1 = TextChange1();
    if (!showAlert1) {
      setOpen(false);
      dispatch(CDAGetRemarkTemplateDetails(RemarkTemplateDetailsBody));
    }
  };



  const clickSelectTerm = (item) => {
    //console.log(item, '🎯🎯🎯🎯');

    if (SelectTerm != '') {
      const confirmMessage = "Data modification for last minute is auto saved but entered progress remarks after auto save on the current page will get lost with your action. Do you want to continue?";
      let confirmed = false
      if (IsDirty) {
        confirmed = window.confirm(confirmMessage);

        if (confirmed) {
          SetSelectTerm(item.Value);
          setTermName(item.Name)
        }
      }
      else
        SetSelectTerm(item.Value);
      setTermName(item.Name)

    }


  };
  const clickGrade = (value) => {
    SetSelectGrade(value);
  };


  // const clickSelectClass = (value) => {
  //   SetselectTeacher(value);
  // };

  const clickSelectClass = (value) => {
    if (selectTeacher != '') {
      const confirmMessage = "Data modification for last minute is auto saved but entered progress remarks after auto save on the current page will get lost with your action. Do you want to continue?";
      let confirmed = false
      if (IsDirty) {
        confirmed = window.confirm(confirmMessage);

        if (confirmed) {
          SetselectTeacher(value);
          setRowsPerPage(20)
          setPage(1)
        }
      }
      else
        SetselectTeacher(value);
      setRowsPerPage(20)
      setPage(1)

    }
  };

  const TextValues = (value) => {
    setIsDirty(true)
    setItemlist(value);

  };

  const clickRemark = (value) => {
    setRemark(value);
  };

  const clickStudentList = (value) => {
    SetStudentList(value);
  };


  const Exportremark = () => {
    const confirmMessage = "This Action will show only saved details. Do you want to continue?";


    showAlert({
      title: 'Please Confirm',
      message: confirmMessage,
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        ExportButton();
        //console.log('even IDK');

        closeAlert();
      }
    });

  };



  const getStudentName = () => {
    let classStudentName = '';
    USGetAllStudentswiseRemarkDetails.map((item) => {
      if (item.Value == StudentId) classStudentName = item.Name;
    });
    return classStudentName;
  };




  const FStudentName = () => {
    let classStudentName = '';
    Itemlist.map((item) => {
      if (item.Value == StudentId) classStudentName = item.FName;
    });
    return classStudentName;
  };

  const GEtSalutation = () => {
    let classStudentName = '';
    Itemlist.map((item) => {
      if (item.Value == StudentId) classStudentName = item.SalutationId;
    });
    return classStudentName;
  };





  const StudentFName = FStudentName()
  const PassSalutationId = GEtSalutation()





  const studentName = getStudentName();
  const ClickAppropriate = (Id, Index) => {
    setStudentId(Id)
    SetColIndex(Index)
    dispatch(CDAGetRemarkTemplateDetails(RemarkTemplateDetailsBody))
    dispatch(CDAGradeDropDown(GetAllGradesForStandardBody));
    dispatch(CDAGetRemarksCategory(RemarkCategoryBody));
    setOpen(!open)

  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };




  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, countArray[0]);
  const pagecount = Math.ceil(countArray[0] / rowsPerPage);
  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const PageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody));
  }, [page, selectTeacher, SelectTerm, rowsPerPage]);


  const Changevalue = (value) => {
    setRemarkTemplates(value);
  };

  const ClickHeader = (value) => {
    setHeaderPublish(value)
  }


  useEffect(() => {
    if (USRemarkTemplateDetails) {
      setRemarkTemplates(USRemarkTemplateDetails);
    }
  }, [USRemarkTemplateDetails]);
  useEffect(() => {
    setIsDirty(false)
    setItemlist(USGetAllStudentswiseRemarkDetails);
  }, [USGetAllStudentswiseRemarkDetails]);


  useEffect(() => {
    if (USStudentListDropDown.length > 0) {
      SetStudentList(USStudentListDropDown[0].Value);
    }
  }, [USStudentListDropDown]);



  useEffect(() => {
    if (GradeDropDown.length > 0) {
      SetSelectGrade(GradeDropDown[0].Value);
    }
  }, [GradeDropDown]);

  useEffect(() => {
    if (USRemarksCategory.length > 0) {
      setRemark(USRemarksCategory[0].Value);
    }
  }, [USRemarksCategory]);

  useEffect(() => {
    dispatch(CDAGetRemarkTemplateDetails(RemarkTemplateDetailsBody));
  }, [SelectGrade, Remark, HeaderPublish]);



  useEffect(() => {
    dispatch(CDAGetFinalPublishedExamStatus(GetFinalPublishedExamStatusBody));
  }, [SelectTerm]);

  useEffect(() => {
    dispatch(CDAGetClassTeachers(ClassTeachersBody));
  }, []);

  useEffect(() => {
    dispatch(CDAGetTestwiseTerm(GetTestwiseTermBody));
  }, []);

  useEffect(() => {
    dispatch(CDAGetConfiguredMaxRemarkLength(GetConfiguredMaxRemarkLengthBody));
  }, [SelectTerm, selectTeacher, getStandardId()]);




  useEffect(() => {
    dispatch(CDAStudentListDropDown(StudentListDropDowntBody));
  }, [SelectTerm, selectTeacher]);

  useEffect(() => {
    if (StudentList === '') {
      dispatch(CDAResetStudentDropdown());
    } else {
      dispatch(CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody));
    }
  }, [selectTeacher, SelectTerm, StudentList, page1, rowsPerPage]);

  useEffect(() => {
    if (UpdateAllStudentsRemarkDetail != '') {
      toast.success(UpdateAllStudentsRemarkDetail);
      setIsDirty(false)
      dispatch(CDAresetSaveMassage());
      CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody)
      const StudentswiseRemarkDetailsBody: IStudentswiseRemarkDetailsToExportBody =
      {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: getStdDivisionId(),
        asStudentId: Number(StudentList),
        asTermId: SelectTerm
      };
      dispatch(CDAStudentswiseRemarkDetailsToExport(StudentswiseRemarkDetailsBody))
    }
  }, [UpdateAllStudentsRemarkDetail]);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const is1024 = useMediaQuery('(min-width:1024px) and (max-width:1366px)');
  const LegendArray = [
    {
      id: 1,
      Name: 'Left Students',
      Value: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              height: '20px',
              width: '20px',
              background: red[500],
              borderRadius: '4px', // Optional: Adds rounded corners
            }}
          />
        </Box>
      )
    }
  ];
  const CustomTablePaginationActions = () => null;
  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Exam Results', path: '/RITeSchool/Teacher/ExamResultBase/' + getStdDivisionId() + '/' + TestId },
          { title: 'Progress Remarks', path: '/RITeSchool/Teacher/ProgressRemarks' }
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
              display="flex"
              justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
            >
              <SearchableDropdown
                label={"Subject Teacher"}
                sx={{ width: { xs: '73vw', sm: '20vw', md: '15vw', lg: '23vw' }, backgroundColor: CanEdit == 'N' ? '#F0F0F0' : '', }}
                ItemList={USClassTeachers}
                onChange={clickSelectClass}
                defaultValue={selectTeacher}
                mandatory
                size={"small"}

                disabled={CanEdit == 'N'}
              /></Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
            >
              <SearchableDropdown1
                ItemList={USGetTestwiseTerm}
                sx={{ width: { xs: '40vw', sm: '10vw', md: '13vw' } }}
                onChange={clickSelectTerm}
                defaultValue={SelectTerm}
                label={'Term'}
                size={"small"}
              /></Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
            >
              <SearchableDropdown
                ItemList={USStudentListDropDown}
                sx={{ width: { xs: '73vw', sm: '20vw', md: '15vw', lg: '23vw' } }}
                onChange={clickStudentList}
                defaultValue={StudentList}
                label={'Student List'}
                size={"small"}
              /></Grid>
            <Grid
              item
              xs={12}
              gap={1}
              display="flex"
              justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
            >
              <Tooltip title={'Add / Edit / Delete student progress remarks.'}>
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

              {USGetAllStudentswiseRemarkDetails.length > 0 && (
                <Tooltip title={'Export'}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: blue[500],
                      '&:hover': {
                        backgroundColor: blue[600]
                      }
                    }}
                    onClick={Exportremark}  >
                    <Download />
                  </IconButton>
                </Tooltip>)
              }

              {USGetAllStudentswiseRemarkDetails.length > 0 && (
                <Tooltip title={'Save'}>
                  <IconButton
                    onClick={UpdateRemark}
                    sx={{
                      color: 'white',
                      backgroundColor: 'green'
                    }}
                    disabled={USGetFinalPublishedExamStatus.IsPublishedStatus == 1}
                  >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              )

              }
            </Grid>
          </Stack>
        </>}
      />
      <Box >
        <ProgressRemarksNotes />
      </Box>

      <Box sx={{ mb: 2, mt: 1 }}>
        <Box sx={{ background: 'white', p: 1, mb: 2 }}>
          <Legend LegendArray={LegendArray} />
        </Box>
        <Box sx={{ background: 'white', p: 1 }}>
          <Grid container spacing={2}>

            {
              USGetAllStudentswiseRemarkDetails.length > 0 ? (
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ margin: '10px 0', textAlign: 'center', pt: 2 }}>
                    <Box component="span" fontWeight="fontWeightBold">
                      {startRecord} to {endRecord}
                    </Box>
                    {' '}out of{' '}
                    <Box component="span" fontWeight="fontWeightBold">
                      {countArray[0]}
                    </Box>{' '}
                    {countArray[0] === 1 ? 'record' : 'records'}
                  </Typography>
                </div>

              ) : (
                <span></span>

              )
            }

            <Grid item xs={12}>
              <Paper>

                {message && (
                  <Typography style={{ position: "fixed", top: "50%", left: "50%", padding: "10px", backgroundColor: "#e8eaf6", border: "1px solid #ccc", zIndex: 9999, width: '500px', font: "20px" }}>
                    {message}
                  </Typography>

                )}



                {USGetAllStudentswiseRemarkDetails.length > 0 ? (
                  <ProgressRemarkTerm.Provider value={{ maxRemarkLength, SelectTerm }}>
                    <ResizableCommentsBox
                      HeaderArray={HeaderArray}
                      ItemList={Itemlist}
                      NoteClick={ClickAppropriate}
                      setTextValues={TextValues}
                      IsPublishedStatus={USGetFinalPublishedExamStatus.IsPublishedStatus}
                    />
                  </ProgressRemarkTerm.Provider>
                ) : (
                  <span> </span>

                )}



              </Paper>
            </Grid>

          </Grid>
          {
            endRecord > 19 ? (
              <ButtonGroupComponent
                rowsPerPage={rowsPerPage}
                ChangeRowsPerPage={ChangeRowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                PageChange={PageChange}
                pagecount={pagecount}
              />

            ) : (
              <span></span>

            )
          }
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={ClickAppropriate}
        fullWidth
        maxWidth={is1024 ? 'md' : 'md'}
        PaperProps={{
          sx: {
            borderRadius: "15px",
            width: is1024 ? '100%' : 'auto',
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#324b84',
            position: 'relative'

          }}
        >

          <ClearIcon
            onClick={() => setOpen(!open)}
            sx={{
              color: 'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '8px',
              right: '10px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red',
              },
            }}
          />
        </DialogTitle>
        <Typography variant={isXs ? 'h4' : 'h3'} sx={{ pt: 1, pl: 2 }}>
          Select Appropriate Template
        </Typography>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Student Name"
                  value={studentName}
                  sx={{ bgcolor: '#F0F0F0' }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <SearchableDropdown
                  ItemList={USRemarksCategory}
                  onChange={clickRemark}
                  defaultValue={Remark}
                  label="Remark Category"
                  size="small"
                  sx={{ minWidth: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <SearchableDropdown
                  ItemList={GradeDropDown}
                  onChange={clickGrade}
                  defaultValue={SelectGrade}
                  label="Grades"
                  size="small"
                  sx={{ minWidth: '100%' }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              maxHeight: '320px',
              overflowY: 'auto',
              bgcolor: '#F9F9F9',
              p: 2,
              borderRadius: 1,
            }}
          >
            {remarkTemplates.length > 0 ? (
              <ProgressRemarkTerm.Provider value={{ StudentFName, StudentId, PassSalutationId }}>
                <RemarkList
                  ItemList={remarkTemplates}
                  HeaderArray={HeaderPublish}
                  onChange={Changevalue}
                  ClickHeader={ClickHeader}
                />
              </ProgressRemarkTerm.Provider>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  mt: 1,
                  bgcolor: '#324b84',
                  p: 1,
                  borderRadius: 2,
                  color: 'white',
                }}
              >
                <b>No record found.</b>
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: 'red',
              '&:hover': {
                bgcolor: 'rgba(255,0,0,0.1)',
              },
            }}
            onClick={() => setOpen(!open)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: 'green',
              '&:hover': {
                bgcolor: 'rgba(0,255,0,0.1)',
              },
            }}
            onClick={SelectClick}
            disabled={remarkTemplates.length === 0}
          >
            Select
          </Button>
        </DialogActions>
      </Dialog>


    </Box >
  );
};

export default ProgressRemarks;

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 800,
//   height: 500,
//   bgcolor: '#EAF1F5',
//   border: '2px solid #000',
// };


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 550,
  bgcolor: 'white',
  borderRadius: "15px",
};
